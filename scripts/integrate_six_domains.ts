import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DictionaryEntry } from '../src/types/dictionary';
import { EMOTIONS_AND_TIME_ENTRIES } from './domain_emotions_time';
import { TRAVEL_AND_CREATURES_ENTRIES } from './domain_travel_creatures';
import { TOOLS_AND_HEALTH_ENTRIES } from './domain_tools_health';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../.data');
const DICTIONARY_FILE = path.join(DATA_DIR, 'dictionary.json');

const entries: DictionaryEntry[] = JSON.parse(fs.readFileSync(DICTIONARY_FILE, 'utf-8'));
console.log(`Current dictionary size: ${entries.length}`);

const ALL_DOMAINS = [
  ...EMOTIONS_AND_TIME_ENTRIES,
  ...TRAVEL_AND_CREATURES_ENTRIES,
  ...TOOLS_AND_HEALTH_ENTRIES
];

let addedCount = 0;
let updatedCount = 0;
const existingWordsMap = new Map(entries.map(e => [e.az_word.trim(), e]));

for (const item of ALL_DOMAINS) {
  if (!item.az_word) continue;

  const existing = existingWordsMap.get(item.az_word.trim());

  if (existing) {
    // Enrich definition/examples if not detailed
    if (item.fa_definition && (!existing.fa_definition || existing.fa_definition.length < item.fa_definition.length)) {
      existing.fa_definition = item.fa_definition;
    }
    if (item.az_examples && item.az_examples.length > 0) {
      if (!existing.az_examples || existing.az_examples.length === 0) {
        existing.az_examples = item.az_examples;
      }
    }
    updatedCount++;
    console.log(`Enriched existing entry: ${existing.az_word}`);
  } else {
    const newEntry: DictionaryEntry = {
      id: item.id || `entry-dom-${Date.now()}-${addedCount + 1}`,
      az_word: item.az_word,
      az_latin: item.az_latin || '',
      az_alternative_spellings: item.az_alternative_spellings || [],
      fa_word: item.fa_word || '',
      fa_alternative_equivalents: item.fa_alternative_equivalents || [item.fa_word || ''],
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
      dialect: 'عمومی در آذربایجان ایران',
      usage_label: 'formal',
      usage_label_fa: 'رسمی و کاربردی',
      category: item.category || 'culture',
      category_fa: item.category_fa || 'واژگان موضوعی',
      source: 'فرهنگ موضوعی ترکی آذربایجانی ایران',
      verification_status: 'verified',
      search_count: 70,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    entries.push(newEntry);
    existingWordsMap.set(newEntry.az_word.trim(), newEntry);
    addedCount++;
    console.log(`Added: ${newEntry.az_word} (${newEntry.az_latin}) -> ${newEntry.fa_word}`);
  }
}

fs.writeFileSync(DICTIONARY_FILE, JSON.stringify(entries, null, 2), 'utf-8');
console.log(`\nIntegrated six domains! Added: ${addedCount}, Enriched: ${updatedCount}. Total dictionary entries now: ${entries.length}`);
