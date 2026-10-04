import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DictionaryEntry, DictionaryStats, PersonalList, SearchFilters, SearchResult } from '../types/dictionary';
import { SEED_DICTIONARY } from '../data/seedDictionary';
import {
  calculateTrigramSimilarity,
  detectLanguageAndScript,
  extractAzerbaijaniStems,
  normalizeAzerbaijani,
  normalizeLatin,
  normalizePersianArabic,
  transliterateLatinToPersianArabic
} from '../utils/linguistics';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../.data');
const DICTIONARY_FILE = path.join(DATA_DIR, 'dictionary.json');
const LISTS_FILE = path.join(DATA_DIR, 'personal_lists.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

class StorageEngine {
  private entries: DictionaryEntry[] = [];
  private lists: PersonalList[] = [];

  constructor() {
    this.init();
  }

  private init() {
    ensureDataDir();

    // Load or initialize dictionary
    if (fs.existsSync(DICTIONARY_FILE)) {
      try {
        const raw = fs.readFileSync(DICTIONARY_FILE, 'utf-8');
        this.entries = JSON.parse(raw);
      } catch (e) {
        console.error('Failed to parse dictionary.json, restoring seed data:', e);
        this.entries = [...SEED_DICTIONARY];
        this.saveDictionary();
      }
    } else {
      this.entries = [...SEED_DICTIONARY];
      this.saveDictionary();
    }

    // Load or initialize personal lists
    if (fs.existsSync(LISTS_FILE)) {
      try {
        const raw = fs.readFileSync(LISTS_FILE, 'utf-8');
        this.lists = JSON.parse(raw);
      } catch (e) {
        this.lists = [];
        this.saveLists();
      }
    } else {
      this.lists = [
        {
          id: 'list-sample-1',
          title: 'واژگان ضروری و روزمره',
          description: 'کلمات پرکاربرد برای مکالمات روزمره در آذربایجان',
          word_ids: ['entry-1', 'entry-3', 'entry-5', 'entry-10', 'entry-11'],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      this.saveLists();
    }
  }

  private saveDictionary() {
    ensureDataDir();
    fs.writeFileSync(DICTIONARY_FILE, JSON.stringify(this.entries, null, 2), 'utf-8');
  }

  private saveLists() {
    ensureDataDir();
    fs.writeFileSync(LISTS_FILE, JSON.stringify(this.lists, null, 2), 'utf-8');
  }

  public getAllEntries(): DictionaryEntry[] {
    return this.entries;
  }

  public getEntryById(id: string): DictionaryEntry | null {
    return this.entries.find(e => e.id === id) || null;
  }

  public incrementSearchCount(id: string) {
    const entry = this.entries.find(e => e.id === id);
    if (entry) {
      entry.search_count = (entry.search_count || 0) + 1;
      this.saveDictionary();
    }
  }

  public createEntry(data: Omit<DictionaryEntry, 'id' | 'created_at' | 'updated_at' | 'search_count'>): DictionaryEntry {
    const newEntry: DictionaryEntry = {
      ...data,
      id: `entry-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      search_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      verification_status: data.verification_status || 'verified',
    };
    this.entries.unshift(newEntry);
    this.saveDictionary();
    return newEntry;
  }

  public updateEntry(id: string, updates: Partial<DictionaryEntry>): DictionaryEntry | null {
    const idx = this.entries.findIndex(e => e.id === id);
    if (idx === -1) return null;

    this.entries[idx] = {
      ...this.entries[idx],
      ...updates,
      updated_at: new Date().toISOString()
    };
    this.saveDictionary();
    return this.entries[idx];
  }

  public deleteEntry(id: string): boolean {
    const prevLen = this.entries.length;
    this.entries = this.entries.filter(e => e.id !== id);
    if (this.entries.length !== prevLen) {
      this.saveDictionary();
      return true;
    }
    return false;
  }

  public checkDuplicate(az_word: string, az_latin: string, fa_word: string, excludeId?: string): { isDuplicate: boolean; matches: DictionaryEntry[] } {
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

  public search(
    queryStr: string,
    filters?: SearchFilters,
    limit: number = 30,
    offset: number = 0
  ): { results: SearchResult[]; total: number } {
    const q = (queryStr || '').trim();
    if (!q) {
      // Return filtered list if no query
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
      // Apply filters if provided
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
      // 5. Prefix match (Starts with)
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
      // 6. Stem match (suffix stripped)
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

    // Sort by relevance score descending, then search count descending
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

  public getAutocomplete(q: string, limit: number = 8): Array<{
    id: string;
    az_word: string;
    az_latin: string;
    fa_word: string;
    part_of_speech_fa: string;
  }> {
    if (!q || !q.trim()) return [];
    const { results } = this.search(q, { match_mode: 'all' }, limit);
    return results.map(r => ({
      id: r.entry.id,
      az_word: r.entry.az_word,
      az_latin: r.entry.az_latin,
      fa_word: r.entry.fa_word,
      part_of_speech_fa: r.entry.part_of_speech_fa
    }));
  }

  public getStats(): DictionaryStats {
    const verified_words = this.entries.filter(e => e.verification_status === 'verified').length;
    const pending_words = this.entries.filter(e => e.verification_status === 'pending').length;

    const categories_count: Record<string, number> = {};
    const pos_count: Record<string, number> = {};
    const dialects_count: Record<string, number> = {};

    for (const e of this.entries) {
      categories_count[e.category] = (categories_count[e.category] || 0) + 1;
      pos_count[e.part_of_speech] = (pos_count[e.part_of_speech] || 0) + 1;
      if (e.dialect) {
        dialects_count[e.dialect] = (dialects_count[e.dialect] || 0) + 1;
      }
    }

    const popular_words = [...this.entries]
      .sort((a, b) => (b.search_count || 0) - (a.search_count || 0))
      .slice(0, 10);

    return {
      total_words: this.entries.length,
      verified_words,
      pending_words,
      categories_count,
      pos_count,
      dialects_count,
      popular_words
    };
  }

  public getPopular(limit: number = 12): DictionaryEntry[] {
    return [...this.entries]
      .sort((a, b) => (b.search_count || 0) - (a.search_count || 0))
      .slice(0, limit);
  }

  public getRecent(limit: number = 12): DictionaryEntry[] {
    return [...this.entries]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, limit);
  }

  public importEntries(newEntries: Partial<DictionaryEntry>[]): { added: number; skipped: number } {
    let added = 0;
    let skipped = 0;

    for (const item of newEntries) {
      if (!item.az_word || !item.fa_word) {
        skipped++;
        continue;
      }

      const dupCheck = this.checkDuplicate(item.az_word, item.az_latin || '', item.fa_word);
      if (dupCheck.isDuplicate) {
        skipped++;
        continue;
      }

      this.createEntry({
        az_word: item.az_word,
        az_latin: item.az_latin || '',
        az_alternative_spellings: item.az_alternative_spellings || [],
        fa_word: item.fa_word,
        fa_alternative_equivalents: item.fa_alternative_equivalents || [],
        az_pronunciation: item.az_pronunciation || '',
        ipa: item.ipa || '',
        part_of_speech: item.part_of_speech || 'noun',
        part_of_speech_fa: item.part_of_speech_fa || 'اسم',
        fa_definition: item.fa_definition || '',
        az_definition: item.az_definition || '',
        az_examples: item.az_examples || [],
        synonyms: item.synonyms || [],
        antonyms: item.antonyms || [],
        related_words: item.related_words || [],
        etymology: item.etymology,
        dialect: item.dialect || 'عمومی',
        usage_label: item.usage_label || 'formal',
        usage_label_fa: item.usage_label_fa || 'رسمی',
        category: item.category || 'everyday',
        category_fa: item.category_fa || 'واژگان روزمره',
        source: item.source || 'ورود دسته‌جمعی داده‌ها',
        verification_status: 'verified'
      });
      added++;
    }

    return { added, skipped };
  }

  // Personal Lists
  public getPersonalLists(): PersonalList[] {
    return this.lists;
  }

  public savePersonalList(listData: Omit<PersonalList, 'id' | 'created_at' | 'updated_at'> & { id?: string }): PersonalList {
    if (listData.id) {
      const idx = this.lists.findIndex(l => l.id === listData.id);
      if (idx !== -1) {
        this.lists[idx] = {
          ...this.lists[idx],
          ...listData,
          updated_at: new Date().toISOString()
        };
        this.saveLists();
        return this.lists[idx];
      }
    }

    const newList: PersonalList = {
      id: `list-${Date.now()}`,
      title: listData.title,
      description: listData.description || '',
      word_ids: listData.word_ids || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.lists.push(newList);
    this.saveLists();
    return newList;
  }

  public deletePersonalList(id: string): boolean {
    const prev = this.lists.length;
    this.lists = this.lists.filter(l => l.id !== id);
    if (this.lists.length !== prev) {
      this.saveLists();
      return true;
    }
    return false;
  }
}

export const storage = new StorageEngine();
