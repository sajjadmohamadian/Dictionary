/**
 * Azerbaijani Turkish (Iran) - Persian Dictionary Types
 */

export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'pronoun'
  | 'preposition'
  | 'conjunction'
  | 'interjection'
  | 'idiom'
  | 'proverb'
  | 'phrase';

export type UsageLabel =
  | 'formal'
  | 'colloquial'
  | 'literary'
  | 'archaic'
  | 'slang'
  | 'idiomatic';

export type VerificationStatus = 'verified' | 'pending' | 'community';

export interface ExampleSentence {
  az: string; // Azerbaijani sentence (Persian-Arabic script or Latin)
  az_latin?: string; // Optional Latin transcription of example
  fa: string; // Persian translation
  context?: string; // Optional context or register
}

export interface WordRelation {
  word: string;
  latin?: string;
  fa_equivalent?: string;
}

export interface EtymologyInfo {
  origin: string; // e.g. "تورکی باستان" (Old Turkic), "اوغوز" (Oghuz), "عربی" (Arabic loan), "فارسی" (Persian loan)
  root?: string; // Root word or reconstructed form (e.g. Proto-Turkic *köŋül)
  notes?: string; // Historical/comparative notes
}

export interface DictionaryEntry {
  id: string;
  az_word: string; // Main headword in Iranian Azerbaijani standard (Persian-Arabic script)
  az_latin: string; // Headword in Azerbaijani Latin alphabet
  az_alternative_spellings: string[]; // Variations (e.g. ["قاپو", "قاپی"], ["سوگی", "سئوگی"])
  fa_word: string; // Persian translation/equivalent(s)
  fa_alternative_equivalents?: string[]; // Multiple Persian equivalents
  az_pronunciation: string; // Phonetic transcription
  ipa: string; // International Phonetic Alphabet
  part_of_speech: PartOfSpeech;
  part_of_speech_fa: string; // e.g. "اسم", "فعل", "صفت", "اصطلاح", "ضرب‌المثل"
  fa_definition: string; // Complete definition and explanation in Persian
  az_definition?: string; // Definition/explanation in Azerbaijani
  az_examples: ExampleSentence[];
  fa_examples?: ExampleSentence[];
  synonyms: WordRelation[];
  antonyms: WordRelation[];
  related_words: string[];
  etymology?: EtymologyInfo;
  dialect?: string; // e.g. "تبریز", "ارومیه", "اردبیل", "زنجان", "قشقایی", "عمومی"
  usage_label: UsageLabel;
  usage_label_fa: string; // "رسمی", "محاوره‌ای/گفتاوری", "ادبی", "عامیانه", "اصطلاحی"
  category: string; // e.g. "everyday", "family", "food", "nature", "proverbs"
  category_fa: string; // e.g. "واژگان روزمره", "خانواده و پیوندها", "خوراک و آشپزی"
  source: string; // e.g. "فرهنگ جامع ترکی-فارسی آذربایجان ایران (ارک)", "میدانی و گفتاری"
  verification_status: VerificationStatus;
  search_count: number;
  created_at: string;
  updated_at: string;
}

export type SearchDirection = 'both' | 'az_to_fa' | 'fa_to_az';

export interface SearchFilters {
  category?: string;
  part_of_speech?: string;
  dialect?: string;
  usage_label?: string;
  match_mode?: 'all' | 'exact' | 'prefix' | 'fuzzy';
  direction?: SearchDirection;
}

export interface SearchResult {
  entry: DictionaryEntry;
  match_type: 'exact' | 'normalized' | 'latin' | 'alt_spelling' | 'stem' | 'partial' | 'fuzzy';
  matched_field: 'az_word' | 'az_latin' | 'fa_word' | 'alt_spelling' | 'definition';
  relevance_score: number;
}

export interface PersonalList {
  id: string;
  title: string;
  description?: string;
  word_ids: string[];
  created_at: string;
  updated_at: string;
}

export interface DictionaryStats {
  total_words: number;
  verified_words: number;
  pending_words: number;
  categories_count: Record<string, number>;
  pos_count: Record<string, number>;
  dialects_count: Record<string, number>;
  popular_words: DictionaryEntry[];
}
