import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DictionaryEntry } from '../src/types/dictionary';
import { HEYDARBABA_VERBS } from './data_heydarbaba_verbs';
import { HEYDARBABA_NOUNS } from './data_heydarbaba_nouns';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../.data');
const DICTIONARY_FILE = path.join(DATA_DIR, 'dictionary.json');

const entries: DictionaryEntry[] = JSON.parse(fs.readFileSync(DICTIONARY_FILE, 'utf-8'));
console.log(`Current dictionary size: ${entries.length}`);

// Combine new items to add
const ALL_HB_ITEMS = [...HEYDARBABA_VERBS, ...HEYDARBABA_NOUNS];

let addedCount = 0;
let updatedCount = 0;

for (const item of ALL_HB_ITEMS) {
  if (!item.az_word) continue;

  // Check if exists
  const existing = entries.find(
    e => e.az_word.trim() === item.az_word!.trim() ||
    (e.az_alternative_spellings && e.az_alternative_spellings.includes(item.az_word!.trim()))
  );

  if (existing) {
    // Enrich existing with Heydar Baba example & source
    if (!existing.source.includes('شهریار')) {
      existing.source = `${existing.source} | منظومه حیدربابایه سلام - استاد محمدحسین شهریار`;
    }
    if (item.az_examples && item.az_examples.length > 0) {
      const hasHbEx = existing.az_examples.some(ex => ex.az.includes('حیدربابا') || ex.az.includes('شهریار'));
      if (!hasHbEx) {
        existing.az_examples.unshift(item.az_examples[0]);
      }
    }
    if (item.az_alternative_spellings) {
      existing.az_alternative_spellings = Array.from(new Set([...(existing.az_alternative_spellings || []), ...item.az_alternative_spellings]));
    }
    if (item.related_words) {
      existing.related_words = Array.from(new Set([...(existing.related_words || []), ...item.related_words]));
    }
    updatedCount++;
    console.log(`Enriched existing entry: ${existing.az_word}`);
  } else {
    // Add new entry
    const newEntry: DictionaryEntry = {
      id: `entry-hb-${Date.now()}-${addedCount + 1}`,
      az_word: item.az_word!,
      az_latin: item.az_latin || '',
      az_alternative_spellings: item.az_alternative_spellings || [],
      fa_word: item.fa_word || '',
      fa_alternative_equivalents: item.fa_alternative_equivalents || [item.fa_word || ''],
      az_pronunciation: item.az_pronunciation || '',
      ipa: item.ipa || '',
      part_of_speech: item.part_of_speech || 'noun',
      part_of_speech_fa: item.part_of_speech_fa || (item.part_of_speech === 'verb' ? 'فعل' : 'اسم'),
      fa_definition: item.fa_definition || '',
      az_definition: item.az_definition || '',
      az_examples: item.az_examples || [],
      synonyms: item.synonyms || [],
      antonyms: item.antonyms || [],
      related_words: item.related_words || ['حیدربابا', 'شهریار'],
      etymology: {
        origin: 'ترکی آذربایجانی اصیل',
        notes: 'از افعال و واژگان منظومه حیدربابایه سلام استاد شهریار'
      },
      dialect: 'تبریز و قره‌چمن (آذربایجان شرقی)',
      usage_label: 'literary',
      usage_label_fa: 'ادبی و فولکلوریک اصیل',
      category: item.category || 'culture',
      category_fa: item.category_fa || 'ادبیات و حیدربابا',
      source: 'منظومه حیدربابایه سلام - استاد محمدحسین شهریار',
      verification_status: 'verified',
      search_count: 50,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    entries.push(newEntry);
    addedCount++;
    console.log(`Added new Heydar Baba entry: ${newEntry.az_word} (${newEntry.az_latin})`);
  }
}

// Also add literary tags and examples to iconic existing words from Heydar Baba
const HB_FEATURED_WORDS: { word: string; lineAz: string; lineLatin: string; lineFa: string }[] = [
  {
    word: 'کهلیک',
    lineAz: 'حیدربابا، کهلیک‌لرون اوچاندا، کول دیبینن دووشان قالخوب قاچاندا.',
    lineLatin: 'Heydərbaba, kəkliklərin uçanda, kol dibinnən dovşan qalxub qaçanda.',
    lineFa: 'حیدربابا، وقتی کبک‌هایت پر می‌کشند و از بیخ بوته‌ها خرگوش جسته و می‌گریزد.'
  },
  {
    word: 'دووشان',
    lineAz: 'کول دیبینن دووشان قالخوب قاچاندا، باغچالارون چیچکلنوب آچاندا.',
    lineLatin: 'Kol dibinnən dovşan qalxub qaçanda, bağçaların çiçəklənüb açanda.',
    lineFa: 'هنگامی که خرگوش از زیر بوته می‌جهد و باغچه‌هایت پر از شکوفه و گل می‌شوند.'
  },
  {
    word: 'سئل',
    lineAz: 'سئللر، سولار شاققیلدییوب آخاندا، قیزلار اونا صف باغلایوب باخاندا.',
    lineLatin: 'Sellər, sular şaqqıldıyub axanda, qızlar ona səf bağlayub baxanda.',
    lineFa: 'چون سیلاب‌ها خروشان سرازیر می‌شوند و دختران ده برای تماشای آن صف می‌بندند.'
  },
  {
    word: 'ائل',
    lineAz: 'سلام اولسون شوکتوزه، ائلوزه! منیم ده بیر آدیم گلسین دیلوزه!',
    lineLatin: 'Salam olsun şövkətüzə, elüzə! Mənim də bir adım gəlsin dilüzə!',
    lineFa: 'درود بر جاه و جلال و مردم باوفایت باد! نامی از من نیز بر زبانتان جاری باد!'
  },
  {
    word: 'ایگید',
    lineAz: 'حیدربابا، ایگیت اَمک ایتیرمز، عؤمور کئچر، افسوس بَرَ بئترمز!',
    lineLatin: 'Heydərbaba, igid əmək itirməz, ömür keçər, əfsus bərə bitirməz!',
    lineFa: 'حیدربابا، جوانمرد حق زحمت و نمک را ضایع نمی‌کند؛ افسوس که عمر می‌گذرد و این بندها پایدار نمی‌ماند!'
  },
  {
    word: 'تندیر',
    lineAz: 'تنور ایچی یاپبا یاپماق، فتیر کوکه پیشیرمک چاغی گلدی.',
    lineLatin: 'Təndir içi yapba yapmaq, fətir kökə bişirmək çağı gəldi.',
    lineFa: 'هنگام نان‌پزی تنوری و بوی خوش کلوچه و فطیر در خانه روستایی فرا رسید.'
  }
];

for (const feat of HB_FEATURED_WORDS) {
  const e = entries.find(x => x.az_word.trim() === feat.word.trim());
  if (e) {
    if (!e.az_examples.some(x => x.az.includes('حیدربابا'))) {
      e.az_examples.unshift({
        az: feat.lineAz,
        az_latin: feat.lineLatin,
        fa: feat.lineFa
      });
      console.log(`Attached Heydar Baba stanza to existing word: ${e.az_word}`);
    }
  }
}

// Save back to file
fs.writeFileSync(DICTIONARY_FILE, JSON.stringify(entries, null, 2), 'utf-8');
console.log(`\nDone! Added ${addedCount} entries, updated ${updatedCount} entries. Total entries now: ${entries.length}`);
