import { DictionaryEntry, DictionaryStats, PersonalList, SearchFilters, SearchResult } from '../types/dictionary';
import { CATEGORIES_CONFIG, SEED_DICTIONARY } from '../data/seedDictionary';
import {
  calculateTrigramSimilarity,
  detectLanguageAndScript,
  extractAzerbaijaniStems,
  normalizeAzerbaijani,
  normalizeLatin,
  normalizePersianArabic,
  transliterateLatinToPersianArabic
} from '../utils/linguistics';

const LOCAL_STORAGE_CUSTOM_ENTRIES = 'sozluk_custom_entries';
const LOCAL_STORAGE_MODIFIED_ENTRIES = 'sozluk_modified_entries';
const LOCAL_STORAGE_DELETED_IDS = 'sozluk_deleted_ids';
const LOCAL_STORAGE_LISTS = 'sozluk_personal_lists';
const LOCAL_STORAGE_SEARCH_COUNTS = 'sozluk_search_counts';

class ClientDictionaryEngine {
  private entries: DictionaryEntry[] = [];
  private isLoaded: boolean = false;
  private loadPromise: Promise<void> | null = null;
  private personalLists: PersonalList[] = [];

  constructor() {
    // Start initial loading in background
    this.ensureLoaded();
  }

  public async ensureLoaded(): Promise<void> {
    if (this.isLoaded) return;
    if (this.loadPromise) return this.loadPromise;

    this.loadPromise = (async () => {
      let baseEntries: DictionaryEntry[] = [];
      try {
        const res = await fetch('/data/dictionary.json');
        if (res.ok) {
          baseEntries = await res.json();
        } else {
          console.warn('Could not fetch /data/dictionary.json, falling back to seed');
          baseEntries = [...SEED_DICTIONARY];
        }
      } catch (err) {
        console.warn('Network error fetching /data/dictionary.json, using seed dictionary:', err);
        baseEntries = [...SEED_DICTIONARY];
      }

      // Merge local storage customizations (for offline/static edits)
      try {
        const deletedIdsStr = localStorage.getItem(LOCAL_STORAGE_DELETED_IDS);
        const deletedIds = new Set<string>(deletedIdsStr ? JSON.parse(deletedIdsStr) : []);

        const modifiedStr = localStorage.getItem(LOCAL_STORAGE_MODIFIED_ENTRIES);
        const modifiedMap: Record<string, Partial<DictionaryEntry>> = modifiedStr ? JSON.parse(modifiedStr) : {};

        const customStr = localStorage.getItem(LOCAL_STORAGE_CUSTOM_ENTRIES);
        const customEntries: DictionaryEntry[] = customStr ? JSON.parse(customStr) : [];

        const searchCountsStr = localStorage.getItem(LOCAL_STORAGE_SEARCH_COUNTS);
        const searchCounts: Record<string, number> = searchCountsStr ? JSON.parse(searchCountsStr) : {};

        // Filter and update base entries
        const processed = baseEntries
          .filter(e => !deletedIds.has(e.id))
          .map(e => {
            const mod = modifiedMap[e.id];
            const count = searchCounts[e.id] ?? e.search_count ?? 0;
            return mod ? { ...e, ...mod, search_count: count } : { ...e, search_count: count };
          });

        this.entries = [...customEntries, ...processed];

        // Load personal lists
        const listsStr = localStorage.getItem(LOCAL_STORAGE_LISTS);
        if (listsStr) {
          this.personalLists = JSON.parse(listsStr);
        } else {
          this.personalLists = [
            {
              id: 'list-sample-1',
              title: 'واژگان ضروری و روزمره',
              description: 'کلمات پرکاربرد برای مکالمات روزمره در آذربایجان',
              word_ids: ['entry-1', 'entry-3', 'entry-5', 'entry-10', 'entry-11'],
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          ];
        }
      } catch (e) {
        console.error('Error applying local storage modifications:', e);
        this.entries = baseEntries;
      }

      this.isLoaded = true;
    })();

    return this.loadPromise;
  }

  public async getAllEntries(): Promise<DictionaryEntry[]> {
    await this.ensureLoaded();
    return this.entries;
  }

  public async getEntryById(id: string): Promise<DictionaryEntry | null> {
    await this.ensureLoaded();
    const entry = this.entries.find(e => e.id === id) || null;
    if (entry) {
      this.incrementSearchCount(id);
    }
    return entry;
  }

  public incrementSearchCount(id: string) {
    const entry = this.entries.find(e => e.id === id);
    if (entry) {
      entry.search_count = (entry.search_count || 0) + 1;
      try {
        const counts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SEARCH_COUNTS) || '{}');
        counts[id] = entry.search_count;
        localStorage.setItem(LOCAL_STORAGE_SEARCH_COUNTS, JSON.stringify(counts));
      } catch (e) {
        console.error(e);
      }
    }
  }

  public async search(
    queryStr: string,
    filters?: SearchFilters,
    limit: number = 30,
    offset: number = 0
  ): Promise<{ results: SearchResult[]; total: number }> {
    await this.ensureLoaded();
    const q = (queryStr || '').trim();

    if (!q) {
      let filtered = [...this.entries];
      if (filters?.category) {
        filtered = filtered.filter(e => e.category === filters.category);
      }
      if (filters?.part_of_speech) {
        filtered = filtered.filter(e => e.part_of_speech === filters.part_of_speech);
      }
      if (filters?.dialect) {
        filtered = filtered.filter(e => e.dialect && e.dialect.includes(filters.dialect!));
      }
      if (filters?.usage_label) {
        filtered = filtered.filter(e => e.usage_label === filters.usage_label);
      }

      const total = filtered.length;
      const paginated = filtered.slice(offset, offset + limit).map(entry => ({
        entry,
        match_type: 'exact' as const,
        matched_field: 'az_word' as const,
        relevance_score: 100
      }));

      return { results: paginated, total };
    }

    const { script } = detectLanguageAndScript(q);
    const normQueryAz = normalizeAzerbaijani(q);
    const normQueryFa = normalizePersianArabic(q);
    const normQueryLatin = normalizeLatin(q);
    const stems = extractAzerbaijaniStems(q);
    const latinTranslit = script === 'latin' ? transliterateLatinToPersianArabic(normQueryLatin) : '';

    const scoredResults: SearchResult[] = [];

    for (const entry of this.entries) {
      if (filters?.category && entry.category !== filters.category) continue;
      if (filters?.part_of_speech && entry.part_of_speech !== filters.part_of_speech) continue;
      if (filters?.dialect && (!entry.dialect || !entry.dialect.includes(filters.dialect))) continue;
      if (filters?.usage_label && entry.usage_label !== filters.usage_label) continue;

      let score = 0;
      let matchType: SearchResult['match_type'] = 'fuzzy';
      let matchedField: SearchResult['matched_field'] = 'az_word';

      const normAz = normalizeAzerbaijani(entry.az_word);
      const normFa = normalizePersianArabic(entry.fa_word);
      const normLatin = normalizeLatin(entry.az_latin);
      const altSpellingsNorm = (entry.az_alternative_spellings || []).map(s => normalizeAzerbaijani(s));
      const faEquivalentsNorm = (entry.fa_alternative_equivalents || []).map(s => normalizePersianArabic(s));

      const checkDirection = filters?.direction || 'both';

      // 1. Exact Match on Azerbaijani Word
      if (checkDirection !== 'fa_to_az' && normAz === normQueryAz) {
        score = 100;
        matchType = 'exact';
        matchedField = 'az_word';
      }
      // 2. Exact Match on Latin
      else if (checkDirection !== 'fa_to_az' && normLatin === normQueryLatin) {
        score = 98;
        matchType = 'latin';
        matchedField = 'az_latin';
      }
      // 3. Exact Match on Persian Word
      else if (checkDirection !== 'az_to_fa' && (normFa === normQueryFa || faEquivalentsNorm.includes(normQueryFa))) {
        score = 97;
        matchType = 'exact';
        matchedField = 'fa_word';
      }
      // 4. Exact Match on Alternative Spellings
      else if (checkDirection !== 'fa_to_az' && altSpellingsNorm.includes(normQueryAz)) {
        score = 95;
        matchType = 'alt_spelling';
        matchedField = 'alt_spelling';
      }
      // 5. Prefix match
      else if (checkDirection !== 'fa_to_az' && normAz.startsWith(normQueryAz)) {
        score = 85;
        matchType = 'normalized';
        matchedField = 'az_word';
      }
      else if (checkDirection !== 'az_to_fa' && normFa.startsWith(normQueryFa)) {
        score = 83;
        matchType = 'normalized';
        matchedField = 'fa_word';
      }
      else if (checkDirection !== 'fa_to_az' && normLatin.startsWith(normQueryLatin)) {
        score = 82;
        matchType = 'latin';
        matchedField = 'az_latin';
      }
      // 6. Stem match
      else if (checkDirection !== 'fa_to_az' && stems.some(stem => stem === normAz || normAz.startsWith(stem))) {
        score = 75;
        matchType = 'stem';
        matchedField = 'az_word';
      }
      // 7. Substring contains match
      else if (checkDirection !== 'fa_to_az' && normAz.includes(normQueryAz)) {
        score = 65;
        matchType = 'partial';
        matchedField = 'az_word';
      }
      else if (checkDirection !== 'az_to_fa' && normFa.includes(normQueryFa)) {
        score = 64;
        matchType = 'partial';
        matchedField = 'fa_word';
      }
      else if (checkDirection !== 'fa_to_az' && normLatin.includes(normQueryLatin)) {
        score = 62;
        matchType = 'partial';
        matchedField = 'az_latin';
      }
      // 8. Latin transliteration match
      else if (latinTranslit && (normAz.includes(latinTranslit) || altSpellingsNorm.some(s => s.includes(latinTranslit)))) {
        score = 60;
        matchType = 'latin';
        matchedField = 'az_word';
      }
      // 9. Definition contains match
      else if (
        normalizePersianArabic(entry.fa_definition).includes(normQueryFa) ||
        (entry.az_definition && normalizeAzerbaijani(entry.az_definition).includes(normQueryAz))
      ) {
        score = 50;
        matchType = 'partial';
        matchedField = 'definition';
      }
      // 10. Trigram / Fuzzy similarity
      else if (filters?.match_mode !== 'exact') {
        const simAz = calculateTrigramSimilarity(normAz, normQueryAz);
        const simFa = calculateTrigramSimilarity(normFa, normQueryFa);
        const simLatin = calculateTrigramSimilarity(normLatin, normQueryLatin);
        const maxSim = Math.max(simAz, simFa, simLatin);

        if (maxSim >= 0.45) {
          score = Math.round(maxSim * 50);
          matchType = 'fuzzy';
          matchedField = simAz >= simFa && simAz >= simLatin ? 'az_word' : simFa >= simLatin ? 'fa_word' : 'az_latin';
        }
      }

      if (score > 0) {
        scoredResults.push({
          entry,
          match_type: matchType,
          matched_field: matchedField,
          relevance_score: score
        });
      }
    }

    scoredResults.sort((a, b) => {
      if (b.relevance_score !== a.relevance_score) {
        return b.relevance_score - a.relevance_score;
      }
      return (b.entry.search_count || 0) - (a.entry.search_count || 0);
    });

    const total = scoredResults.length;
    const paginated = scoredResults.slice(offset, offset + limit);

    return { results: paginated, total };
  }

  public async getAutocomplete(q: string, limit: number = 8): Promise<Array<{
    id: string;
    az_word: string;
    az_latin: string;
    fa_word: string;
    part_of_speech_fa: string;
  }>> {
    await this.ensureLoaded();
    if (!q || !q.trim()) return [];

    const normQ = normalizeAzerbaijani(q);
    const normQLatin = normalizeLatin(q);
    const normQFa = normalizePersianArabic(q);

    const matches: Array<{
      id: string;
      az_word: string;
      az_latin: string;
      fa_word: string;
      part_of_speech_fa: string;
      priority: number;
    }> = [];

    for (const e of this.entries) {
      const az = normalizeAzerbaijani(e.az_word);
      const latin = normalizeLatin(e.az_latin);
      const fa = normalizePersianArabic(e.fa_word);

      let prio = 0;
      if (az.startsWith(normQ)) prio = 3;
      else if (latin.startsWith(normQLatin)) prio = 3;
      else if (fa.startsWith(normQFa)) prio = 2;
      else if (az.includes(normQ) || latin.includes(normQLatin) || fa.includes(normQFa)) prio = 1;

      if (prio > 0) {
        matches.push({
          id: e.id,
          az_word: e.az_word,
          az_latin: e.az_latin,
          fa_word: e.fa_word,
          part_of_speech_fa: e.part_of_speech_fa,
          priority: prio
        });
      }
      if (matches.length >= limit * 3) break;
    }

    matches.sort((a, b) => b.priority - a.priority);
    return matches.slice(0, limit).map(({ id, az_word, az_latin, fa_word, part_of_speech_fa }) => ({
      id,
      az_word,
      az_latin,
      fa_word,
      part_of_speech_fa
    }));
  }

  public async getStats(): Promise<DictionaryStats> {
    await this.ensureLoaded();
    const categoriesCount: Record<string, number> = {};
    const dialectsCount: Record<string, number> = {};
    const posCount: Record<string, number> = {};
    let pendingCount = 0;
    let verifiedCount = 0;

    for (const e of this.entries) {
      if (e.category) {
        categoriesCount[e.category] = (categoriesCount[e.category] || 0) + 1;
      }
      if (e.dialect) {
        dialectsCount[e.dialect] = (dialectsCount[e.dialect] || 0) + 1;
      }
      if (e.part_of_speech) {
        posCount[e.part_of_speech] = (posCount[e.part_of_speech] || 0) + 1;
      }
      if (e.verification_status === 'verified') {
        verifiedCount++;
      } else {
        pendingCount++;
      }
    }

    const popular_words = [...this.entries]
      .sort((a, b) => (b.search_count || 0) - (a.search_count || 0))
      .slice(0, 10);

    return {
      total_words: this.entries.length,
      verified_words: verifiedCount,
      pending_words: pendingCount,
      categories_count: categoriesCount,
      pos_count: posCount,
      dialects_count: dialectsCount,
      popular_words
    };
  }

  public async getCategories(): Promise<Array<{ id: string; name: string; name_fa: string; description: string; count: number }>> {
    const stats = await this.getStats();
    return CATEGORIES_CONFIG.map(cat => ({
      ...cat,
      count: stats.categories_count[cat.id] || 0
    }));
  }

  public async getPopular(limit: number = 12): Promise<DictionaryEntry[]> {
    await this.ensureLoaded();
    return [...this.entries]
      .sort((a, b) => (b.search_count || 0) - (a.search_count || 0))
      .slice(0, limit);
  }

  public async getRecent(limit: number = 12): Promise<DictionaryEntry[]> {
    await this.ensureLoaded();
    return [...this.entries]
      .sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime())
      .slice(0, limit);
  }

  public async checkDuplicate(az_word: string, az_latin: string, fa_word: string, excludeId?: string): Promise<{ isDuplicate: boolean; matches: DictionaryEntry[] }> {
    await this.ensureLoaded();
    const normAz = normalizeAzerbaijani(az_word);
    const normLatin = normalizeLatin(az_latin);
    const normFa = normalizePersianArabic(fa_word);

    const matches = this.entries.filter(entry => {
      if (excludeId && entry.id === excludeId) return false;
      const entryAz = normalizeAzerbaijani(entry.az_word);
      const entryLatin = normalizeLatin(entry.az_latin);
      const entryFa = normalizePersianArabic(entry.fa_word);

      return (
        (normAz && entryAz === normAz) ||
        (normLatin && entryLatin === normLatin) ||
        (normFa && entryFa === normFa) ||
        (entry.az_alternative_spellings && entry.az_alternative_spellings.some(s => normalizeAzerbaijani(s) === normAz))
      );
    });

    return {
      isDuplicate: matches.length > 0,
      matches
    };
  }

  public async createEntry(data: Omit<DictionaryEntry, 'id' | 'created_at' | 'updated_at' | 'search_count'>): Promise<DictionaryEntry> {
    await this.ensureLoaded();
    const newEntry: DictionaryEntry = {
      ...data,
      id: `entry-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      search_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      verification_status: data.verification_status || 'verified',
    };
    this.entries.unshift(newEntry);

    try {
      const customStr = localStorage.getItem(LOCAL_STORAGE_CUSTOM_ENTRIES);
      const custom: DictionaryEntry[] = customStr ? JSON.parse(customStr) : [];
      custom.unshift(newEntry);
      localStorage.setItem(LOCAL_STORAGE_CUSTOM_ENTRIES, JSON.stringify(custom));
    } catch (e) {
      console.error(e);
    }

    return newEntry;
  }

  public async updateEntry(id: string, updates: Partial<DictionaryEntry>): Promise<DictionaryEntry | null> {
    await this.ensureLoaded();
    const idx = this.entries.findIndex(e => e.id === id);
    if (idx === -1) return null;

    this.entries[idx] = {
      ...this.entries[idx],
      ...updates,
      updated_at: new Date().toISOString()
    };

    try {
      const modStr = localStorage.getItem(LOCAL_STORAGE_MODIFIED_ENTRIES);
      const mod: Record<string, Partial<DictionaryEntry>> = modStr ? JSON.parse(modStr) : {};
      mod[id] = { ...mod[id], ...updates };
      localStorage.setItem(LOCAL_STORAGE_MODIFIED_ENTRIES, JSON.stringify(mod));
    } catch (e) {
      console.error(e);
    }

    return this.entries[idx];
  }

  public async deleteEntry(id: string): Promise<boolean> {
    await this.ensureLoaded();
    const prevLen = this.entries.length;
    this.entries = this.entries.filter(e => e.id !== id);

    try {
      const delStr = localStorage.getItem(LOCAL_STORAGE_DELETED_IDS);
      const del = new Set<string>(delStr ? JSON.parse(delStr) : []);
      del.add(id);
      localStorage.setItem(LOCAL_STORAGE_DELETED_IDS, JSON.stringify(Array.from(del)));

      // Also remove from custom if present
      const customStr = localStorage.getItem(LOCAL_STORAGE_CUSTOM_ENTRIES);
      if (customStr) {
        const custom: DictionaryEntry[] = JSON.parse(customStr);
        const filtered = custom.filter(c => c.id !== id);
        localStorage.setItem(LOCAL_STORAGE_CUSTOM_ENTRIES, JSON.stringify(filtered));
      }
    } catch (e) {
      console.error(e);
    }

    return this.entries.length !== prevLen;
  }

  public async importEntries(entries: Partial<DictionaryEntry>[]): Promise<{ added: number; skipped: number }> {
    await this.ensureLoaded();
    let added = 0;
    let skipped = 0;

    for (const item of entries) {
      if (!item.az_word || !item.fa_word) {
        skipped++;
        continue;
      }
      const dup = await this.checkDuplicate(item.az_word, item.az_latin || '', item.fa_word);
      if (dup.isDuplicate) {
        skipped++;
        continue;
      }
      await this.createEntry(item as any);
      added++;
    }

    return { added, skipped };
  }

  // Personal Lists
  public async getPersonalLists(): Promise<PersonalList[]> {
    await this.ensureLoaded();
    return this.personalLists;
  }

  public async savePersonalList(list: { id?: string; title: string; description?: string; word_ids: string[] }): Promise<PersonalList> {
    await this.ensureLoaded();
    let target: PersonalList;

    if (list.id) {
      const idx = this.personalLists.findIndex(l => l.id === list.id);
      if (idx !== -1) {
        this.personalLists[idx] = {
          ...this.personalLists[idx],
          title: list.title,
          description: list.description,
          word_ids: list.word_ids,
          updated_at: new Date().toISOString()
        };
        target = this.personalLists[idx];
      } else {
        target = {
          id: list.id,
          title: list.title,
          description: list.description,
          word_ids: list.word_ids,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        this.personalLists.push(target);
      }
    } else {
      target = {
        id: `list-${Date.now()}`,
        title: list.title,
        description: list.description,
        word_ids: list.word_ids,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      this.personalLists.push(target);
    }

    try {
      localStorage.setItem(LOCAL_STORAGE_LISTS, JSON.stringify(this.personalLists));
    } catch (e) {
      console.error(e);
    }

    return target;
  }

  public async deletePersonalList(id: string): Promise<boolean> {
    await this.ensureLoaded();
    const prevLen = this.personalLists.length;
    this.personalLists = this.personalLists.filter(l => l.id !== id);
    try {
      localStorage.setItem(LOCAL_STORAGE_LISTS, JSON.stringify(this.personalLists));
    } catch (e) {
      console.error(e);
    }
    return this.personalLists.length !== prevLen;
  }
}

export const clientDictionary = new ClientDictionaryEngine();
