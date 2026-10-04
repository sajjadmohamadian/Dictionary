import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DictionaryEntry } from '../src/types/dictionary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../.data');
const DICTIONARY_FILE = path.join(DATA_DIR, 'dictionary.json');

const entries: DictionaryEntry[] = JSON.parse(fs.readFileSync(DICTIONARY_FILE, 'utf-8'));
console.log(`Starting container words correction. Total entries: ${entries.length}`);

// 1. Fix "سرکه‌دان" -> "سیرکه‌لیک" (sirkəlik / sirkə qabı)
const sirkedan = entries.find(e => e.id === 'entry-fin-1791091165700-71' || e.az_word.trim() === 'سرکه‌دان');
if (sirkedan) {
  sirkedan.az_word = 'سیرکه‌لیک';
  sirkedan.az_latin = 'sirkəlik';
  sirkedan.az_alternative_spellings = ['سیرکه قابێ', 'سیرکه قابی', 'سیرکه شوشه‌سی'];
  sirkedan.fa_word = 'سرکه‌دان، ظرف سرکه، شیشه سرکه سفره';
  sirkedan.fa_alternative_equivalents = ['سرکه‌دان', 'ظرف سرکه', 'شیشه سرکه'];
  sirkedan.az_pronunciation = 'Sirkəlik [siɾcæˈlic] / Sirkə qabı [siɾˈcæ gɑˈbɯ]';
  sirkedan.ipa = '/siɾcæˈlic/';
  sirkedan.fa_definition = 'ظرف یا شیشه سرکه بر سر سفره غذا؛ در زبان ترکی آذربایجانی به جای پسوند فارسی «-دان»، از پسوند بومی «-لیک» استفاده شده و «سیرکه‌لیک» یا ترکیب اضافی «سیرکه قابی» گفته می‌شود.';
  sirkedan.az_definition = 'سفره اوستونده سرکه تؤکمک اوچون ایشلنن مخصوص شوشه و یا ظرف.';
  sirkedan.az_examples = [
    {
      az: 'سفره‌یه دوزلوقلا بیرلیکده سیرکه‌لیگی ده قویدولار.',
      az_latin: 'Süfrəyə duzluqla birlikdə sirkəliyi də qoydular.',
      fa: 'سر سفره به همراه نمکدان، ظرف سرکه (سرکه‌دان) را نیز نهادند.'
    },
    {
      az: 'سیرکه قابینین قاپاغینی باغلایین تا اییی اوچماسین.',
      az_latin: 'Sirkə qabının qapağını bağlayın ta iyi uçmasın.',
      fa: 'درِ ظرف سرکه را ببندید تا بوی تند آن نپرد.'
    }
  ];
  sirkedan.related_words = ['سیرکه', 'دوزلوق', 'سفره'];
  if (sirkedan.etymology) {
    sirkedan.etymology.notes = 'اصلاح شده: جایگزینی واژه اصیل ترکی سیرکه‌لیک به جای ترکیب غیرترکی سرکه‌دان';
  }
  console.log('Fixed سرکه‌دان -> سیرکه‌لیک');
}

// 2. Fix "نمکدان" -> "دوزلوق" (duzluq / duz qabı)
const duzdan = entries.find(e => e.id === 'entry-fin-1791091165700-68' || e.az_word.trim() === 'نمکدان');
if (duzdan) {
  duzdan.az_word = 'دوزلوق';
  duzdan.az_latin = 'duzluq';
  duzdan.az_alternative_spellings = ['دوز قابێ', 'دوز قابی'];
  duzdan.fa_word = 'نمکدان سفالی یا بلورین سر سفره';
  duzdan.fa_alternative_equivalents = ['نمکدان', 'ظرف نمک'];
  duzdan.az_pronunciation = 'Duzluq [duzˈlux]';
  duzdan.ipa = '/duzˈlux/';
  duzdan.fa_definition = 'نمکدان سر سفره؛ در ترکی آذربایجانی از بن «دوز» (نمک) و پسوند ابزارساز «-لوق» واژه اصیل «دوزلوق» ساخته شده است.';
  duzdan.az_definition = 'سفره اوستونده دوز سپمک اوچون ایشلنن مخصوص قابیق.';
  duzdan.az_examples = [
    {
      az: 'دوزلوغو وئر منه، بو شوربانین دوزو آزدیر.',
      az_latin: 'Duzluğu ver mənə, bu şorbanın duzu azdır.',
      fa: 'نمکدان را به من بده، نمک این شوربا کم است.'
    }
  ];
  duzdan.related_words = ['دوز', 'سفره', 'شوربا'];
  console.log('Fixed نمکدان -> دوزلوق');
}

// 3. Fix "بیبردان" -> "ایستیوْتلوک" (istiotluq / istiot qabı)
const biberdan = entries.find(e => e.id === 'entry-fin-1791091165700-69' || e.az_word.trim() === 'بیبردان');
if (biberdan) {
  biberdan.az_word = 'ایستیوْتلوک';
  biberdan.az_latin = 'istiotluq';
  biberdan.az_alternative_spellings = ['ایستیوْت قابێ', 'بیبرلیک'];
  biberdan.fa_word = 'فلفل‌پاش، ظرف فلفل سر سفره';
  biberdan.fa_alternative_equivalents = ['فلفل‌پاش', 'ظرف فلفل'];
  biberdan.az_pronunciation = 'İstiotluq [is.ti.otˈlux]';
  biberdan.ipa = '/is.ti.otˈlux/';
  biberdan.fa_definition = 'فلفل‌پاش سر سفره غذا؛ در ترکی آذربایجانی اصیل به فلفل «ایستیوْت» و به ظرف آن «ایستیوْتلوک» یا «ایستیوْت قابی» می‌گویند.';
  duzdan && biberdan.az_examples ? (biberdan.az_examples = [
    {
      az: 'کباب یئین زامان ایستیوْتلوگو دولاندیراردیلار.',
      az_latin: 'Kabab yeyən zaman istiotluğu dolandırardılar.',
      fa: 'هنگام کباب خوردن فلفل‌پاش را دست به دست می‌گرداندند.'
    }
  ]) : null;
  biberdan.related_words = ['ایستیوْت', 'دوزلوق', 'کباب'];
  console.log('Fixed بیبردان -> ایستیوْتلوک');
}

// 4. Fix "سماق‌دان" -> "سۇماقلیق" (sumaqlıq / sumaq qabı)
const sumaqdan = entries.find(e => e.id === 'entry-fin-1791091165700-70' || e.az_word.trim() === 'سماق‌دان');
if (sumaqdan) {
  sumaqdan.az_word = 'سۇماقلیق';
  sumaqdan.az_latin = 'sumaqlıq';
  sumaqdan.az_alternative_spellings = ['سۇماق قابێ', 'سوماق قابی'];
  sumaqdan.fa_word = 'سماق‌پاش، ظرف سماق سفره کباب سنتی بناب و تبریز';
  sumaqdan.fa_alternative_equivalents = ['سماق‌پاش', 'ظرف سماق'];
  sumaqdan.az_pronunciation = 'Sumaqlıq [su.mɑxˈlɯx]';
  sumaqdan.ipa = '/su.mɑxˈlɯx/';
  sumaqdan.fa_definition = 'ظرف ویژه سماق‌پاشی بر روی چلوکباب در آذربایجان.';
  sumaqdan.az_examples = [
    {
      az: 'بناب کبابینین یانیندا حتمی سۇماقلیق اولار.',
      az_latin: 'Binab kababının yanında hətmi sumaqlıq olar.',
      fa: 'کنار کباب سنتی بناب حتماً سماق‌پاش می‌گذارند.'
    }
  ];
  sumaqdan.related_words = ['سوماق', 'کباب', 'سفره'];
  console.log('Fixed سماق‌دان -> سۇماقلیق');
}

// 5. Fix "آبغوره‌دان" -> "قوْرالیق" (qoralıq / abğora qabı)
const abquradan = entries.find(e => e.id === 'entry-fin-1791091165700-72' || e.az_word.trim() === 'آبغوره‌دان');
if (abquradan) {
  abquradan.az_word = 'قوْرالیق';
  abquradan.az_latin = 'qoralıq';
  abquradan.az_alternative_spellings = ['قوْرا سویو قابێ', 'آبغورا قابی'];
  abquradan.fa_word = 'شیشه آبغوره خانگی سر سفره، ظرف غوره و چاشنی ترش';
  abquradan.fa_alternative_equivalents = ['شیشه آبغوره', 'ظرف آبغوره'];
  abquradan.az_pronunciation = 'Qoralıq [go.rɑˈlɯx]';
  abquradan.ipa = '/go.rɑˈlɯx/';
  abquradan.fa_definition = 'شیشه یا بطری نگهداری آبغوره طبیعی برای چاشنی سالاد و آش‌های سنتی.';
  console.log('Fixed آبغوره‌دان -> قوْرالیق');
}

// 6. Fix "دوشاب‌دان" -> "دوشاب قابی" (doşab qabı)
const doshabdan = entries.find(e => e.id === 'entry-fin-1791091165700-73' || e.az_word.trim() === 'دوشاب‌دان');
if (doshabdan) {
  doshabdan.az_word = 'دوشاب قابی';
  doshabdan.az_latin = 'doşab qabı';
  doshabdan.az_alternative_spellings = ['دوشاب کوپو', 'دوشابلیق'];
  doshabdan.fa_word = 'کوزه یا ظرف سفالی نگهداری دوشاب انگور';
  doshabdan.fa_alternative_equivalents = ['کوزه دوشاب', 'ظرف شیره انگور'];
  doshabdan.az_pronunciation = 'Doşab qabı [doˈʃɑb gɑˈbɯ]';
  doshabdan.ipa = '/doˈʃɑb gɑˈbɯ/';
  doshabdan.fa_definition = 'کوزه یا ظرف سفالین دهان‌گشاد برای نگهداری شیره انگور غلیظ خانگی در زیرزمین‌های خنک.';
  console.log('Fixed دوشاب‌دان -> دوشاب قابی');
}

// 7. Fix "کاهدان" -> "سامانلیق" (samanlıq)
const kahdan = entries.find(e => e.id === 'entry-reg-1791091082038-201' || e.az_word.trim() === 'کاهدان');
if (kahdan) {
  kahdan.az_word = 'سامانلیق';
  kahdan.az_latin = 'samanlıq';
  kahdan.az_alternative_spellings = ['ساماندیق'];
  kahdan.fa_word = 'کاهدان سنتی مسقف در حیاط روستا، انبار کاه غلات';
  kahdan.fa_alternative_equivalents = ['انبار کاه', 'کاهدان'];
  kahdan.az_pronunciation = 'Samanlıq [sɑ.mɑnˈlɯx]';
  kahdan.ipa = '/sɑ.mɑnˈlɯx/';
  kahdan.fa_definition = 'انبار سرپوشیده در حیاط روستایی برای ذخیره‌سازی کاه و علوفه گوسفندان و دام‌ها در طول زمستان؛ در زبان ترکی با پسوند اصیل -لیق «سامانلیق» نامیده می‌شود.';
  kahdan.az_examples = [
    {
      az: 'قیشین قورخوسوندان سامانلیغی آغزینا کیمی سامانلا دولدوراردیلار.',
      az_latin: 'Qışın qorxusundan samanlığı ağzına kimi samanla doldurardılar.',
      fa: 'از بیم سرمای سخت زمستان، کاهدان را تا لبه از کاه انباشته می‌کردند.'
    }
  ];
  console.log('Fixed کاهدان -> سامانلیق');
}

// 8. Fix "قندان" / "قنددان" -> "قندلیق" (qəndlik / qənd qabı)
const qendan = entries.find(e => e.id === 'entry-fin-1791091165699-50' || e.az_word.trim() === 'قندان');
if (qendan) {
  qendan.az_word = 'قندلیق';
  qendan.az_latin = 'qəndlik';
  qendan.az_alternative_spellings = ['قند قابێ', 'قند قابی'];
  qendan.fa_word = 'قندان بلورین یا مسی تراش‌خورده تبریز سر سینی چای';
  qendan.fa_alternative_equivalents = ['قندان', 'ظرف قند'];
  qendan.az_pronunciation = 'Qəndlik [gændˈlic]';
  qendan.ipa = '/gændˈlic/';
  qendan.fa_definition = 'ظرف نگهداری حبه‌های قند سر سفره یا سینی چای در کنار استکان کمرباریک؛ در ترکی آذربایجانی «قندلیق» یا «قند قابی» خوانده می‌شود.';
  console.log('Fixed قندان -> قندلیق');
}

const qenddanGen = entries.find(e => e.id === 'entry-gen-1790966417466-gwjw9');
if (qenddanGen) {
  qenddanGen.az_word = 'قند قابێ';
  qenddanGen.az_latin = 'qənd qabı';
  qenddanGen.az_alternative_spellings = ['قندلیق'];
  qenddanGen.fa_word = 'قندان سنتی سفره چای';
}

// Also check if any other entry contains 'سرکه‌دان'
entries.forEach(e => {
  if (e.az_word.includes('سرکه‌دان')) {
    e.az_word = e.az_word.replace(/سرکه‌دان/g, 'سیرکه‌لیک');
  }
  if (e.az_alternative_spellings) {
    e.az_alternative_spellings = e.az_alternative_spellings.map(s => s.replace(/سرکه‌دان/g, 'سیرکه‌لیک'));
  }
});

// Save to disk
fs.writeFileSync(DICTIONARY_FILE, JSON.stringify(entries, null, 2), 'utf-8');
console.log('Successfully saved corrected dictionary.');
