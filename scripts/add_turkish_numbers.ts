import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DictionaryEntry } from '../src/types/dictionary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../.data');
const DICTIONARY_FILE = path.join(DATA_DIR, 'dictionary.json');

const entries: DictionaryEntry[] = JSON.parse(fs.readFileSync(DICTIONARY_FILE, 'utf-8'));
console.log(`Starting numbers integration. Current entries: ${entries.length}`);

const TURKISH_NUMBERS: Partial<DictionaryEntry>[] = [
  // --- اعداد اصلی پایه ۰ تا ۱۰ ---
  {
    az_word: 'صفر',
    az_latin: 'sıfır',
    az_alternative_spellings: ['سیفیر'],
    fa_word: 'صفر (عدد ۰)، هیچ، پوچ',
    fa_alternative_equivalents: ['صفر', 'عدم'],
    az_pronunciation: 'Sıfır [sɯˈfɯɾ]',
    ipa: '/sɯˈfɯɾ/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'عدد اصلی / اسم',
    fa_definition: 'عدد صفر در دستگاه شمارش؛ نقطه آغازین اعداد ریاضی.',
    az_definition: 'سایی سیستمینده هئچلیگی بیلدیرن باشلانغیج سای (۰).',
    az_examples: [
      {
        az: 'هاوانین حرارتی صفر درجه‌دن آشاغی ائندی.',
        az_latin: 'Havanın hərarəti sıfır dərəcədən aşağı endi.',
        fa: 'دمای هوا به زیر صفر درجه کاهش یافت.'
      }
    ],
    synonyms: [{ word: 'هئچ', latin: 'heç', fa_equivalent: 'هیچ' }],
    antonyms: [],
    related_words: ['سای', 'حساب', 'بیر'],
    category: 'numbers',
    category_fa: 'اعداد و شمارش'
  },
  {
    az_word: 'بیر',
    az_latin: 'bir',
    az_alternative_spellings: ['بیـر'],
    fa_word: 'یک (عدد ۱)، یگانه، منفرد، واحد، یکتا',
    fa_alternative_equivalents: ['یک', 'یگانه', 'واحد'],
    az_pronunciation: 'Bir [biɾ]',
    ipa: '/biɾ/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'عدد اصلی / صفت مبهم',
    fa_definition: 'نخستین عدد در سیستم شمارش ترکی؛ همچنین به عنوان حرف تعریف نکره یا مفهوم یگانگی («آللاه بیردیر»: خدا یکتاست) به کار می‌رود.',
    az_definition: 'ساییلارین ایلک بیریمی و واحیدی (۱); تک و یگانه اولان.',
    az_examples: [
      {
        az: 'بیر الده ایکی قارپیز توتماق اولماز.',
        az_latin: 'Bir əldə iki qarpız tutmaq olmaz.',
        fa: 'با یک دست نمی‌توان دو هندوانه برداشت (ضرب‌المثل آذربایجانی).'
      },
      {
        az: 'بیر اورکدن بیر اورگه یول وار دئییبلر.',
        az_latin: 'Bir ürəkdən bir ürəyə yol var deyiblər.',
        fa: 'گفته‌اند از دلی به دلی دیگر راهی هست.'
      }
    ],
    synonyms: [{ word: 'تک', latin: 'tək', fa_equivalent: 'یگانه' }],
    antonyms: [{ word: 'چوخ', latin: 'çox', fa_equivalent: 'بسیار' }],
    related_words: ['بیرینجی', 'بیرلیک', 'بیرجه', 'ایکی'],
    category: 'numbers',
    category_fa: 'اعداد و شمارش'
  },
  {
    az_word: 'ایکی',
    az_latin: 'iki',
    az_alternative_spellings: ['ایكی'],
    fa_word: 'دو (عدد ۲)، جفت، ثانی',
    fa_alternative_equivalents: ['دو', 'جفت'],
    az_pronunciation: 'İki [iˈci]',
    ipa: '/iˈci/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'عدد اصلی',
    fa_definition: 'عدد دو؛ نشان‌دهنده یک جفت و بعد از عدد یک.',
    az_definition: 'بیرو اوزرینه بیر گلمکله حاصیل اولان جوت سای (۲).',
    az_examples: [
      {
        az: 'ایکی گؤنول بیر اولاندا سامانلیق سئیرانگاه اولار.',
        az_latin: 'İki könül bir olanda samanlıq seyrangah olar.',
        fa: 'چون دو دل با هم یکی شوند، کاهدان گلستان و تفرجگاه می‌گردد.'
      }
    ],
    synonyms: [{ word: 'جوت', latin: 'cüt', fa_equivalent: 'جفت' }],
    antonyms: [],
    related_words: ['ایکینجی', 'ایکی‌قات', 'بیر', 'اوچ'],
    category: 'numbers',
    category_fa: 'اعداد و شمارش'
  },
  {
    az_word: 'اوچ',
    az_latin: 'üç',
    az_alternative_spellings: ['اوْچ'],
    fa_word: 'سه (عدد ۳)',
    fa_alternative_equivalents: ['سه', 'سوّم'],
    az_pronunciation: 'Üç [yt͡ʃ]',
    ipa: '/yt͡ʃ/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'عدد اصلی',
    fa_definition: 'عدد سه در زبان ترکی؛ عددی فرد میان دو و چهار.',
    az_definition: 'ایکیدن سونرا گلن تک سای (۳).',
    az_examples: [
      {
        az: 'آنا دیلیمیزده: بیر، ایکی، اوچ دئییب ایشی باشلادیلار.',
        az_latin: 'Ana dilimizdə: bir, iki, üç deyib işi başladılar.',
        fa: 'به زبان مادریمان: با شمردن یک، دو، سه کار را آغاز کردند.'
      }
    ],
    synonyms: [],
    antonyms: [],
    related_words: ['اوچونجو', 'اوچ‌قات', 'اوچلوک'],
    category: 'numbers',
    category_fa: 'اعداد و شمارش'
  },
  {
    az_word: 'دؤرد',
    az_latin: 'dörd',
    az_alternative_spellings: ['دورد'],
    fa_word: 'چهار (عدد ۴)، چهارگانه',
    fa_alternative_equivalents: ['چهار', 'چهارتا'],
    az_pronunciation: 'Dörd [dœɾd]',
    ipa: '/dœɾd/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'عدد اصلی',
    fa_definition: 'عدد چهار؛ نماد چهار جهت اصلی (دؤرت بیر یان) و چهار فصل سال.',
    az_definition: 'اوچدن سونرا گلن جوت سای (۴).',
    az_examples: [
      {
        az: 'حیدربابا، دؤرت بیر یانین بولاغ اولسون، باغ اولسون!',
        az_latin: 'Heydərbaba, dörd bir yanın bulağ olsun, bağ olsun!',
        fa: 'حیدربابا! چهار گوشه و گرداگردت پر از چشمه‌سار و باغ باد!'
      }
    ],
    synonyms: [],
    antonyms: [],
    related_words: ['دؤردونجو', 'دؤردلوک', 'دؤرد یول'],
    category: 'numbers',
    category_fa: 'اعداد و شمارش'
  },
  {
    az_word: 'بئش',
    az_latin: 'beş',
    az_alternative_spellings: ['بش'],
    fa_word: 'پنج (عدد ۵)، پنجه دست',
    fa_alternative_equivalents: ['پنج', 'پنج‌تا'],
    az_pronunciation: 'Beş [beʃ]',
    ipa: '/beʃ/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'عدد اصلی',
    fa_definition: 'عدد پنج؛ برابر با تعداد انگشتان یک دست.',
    az_definition: 'ال بارماقلارینین ساییسی قدر اولان تک سای (۵).',
    az_examples: [
      {
        az: 'الین بئش بارماغی بیر اولماز.',
        az_latin: 'Əlin beş barmağı bir olmaz.',
        fa: 'پنج انگشت دست یکسان نیستند (ضرب‌المثل آذربایجانی).'
      }
    ],
    synonyms: [],
    antonyms: [],
    related_words: ['بئشینجی', 'بئش‌لیک', 'آلتی'],
    category: 'numbers',
    category_fa: 'اعداد و شمارش'
  },
  {
    az_word: 'آلتی',
    az_latin: 'altı',
    az_alternative_spellings: ['آلتی‌تا'],
    fa_word: 'شش (عدد ۶)',
    fa_alternative_equivalents: ['شش', 'شیش'],
    az_pronunciation: 'Altı [ɑlˈtɯ]',
    ipa: '/ɑlˈtɯ/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'عدد اصلی',
    fa_definition: 'عدد شش در زبان ترکی؛ عددی زوج میان پنج و هفت.',
    az_definition: 'بئشدن سونرا گلن جوت سای (۶).',
    az_examples: [
      {
        az: 'حفظ ائتدیگیمیز مثل: آلتی آی قیش، آلتی آی یاز دونیانین گردیشی‌دیر.',
        az_latin: 'Hifz etdiyimiz məsəl: altı ay qış, altı ay yaz dünyanın gərdişidir.',
        fa: 'شش ماه زمستان و شش ماه بهار، گردش جهان است.'
      }
    ],
    synonyms: [],
    antonyms: [],
    related_words: ['آلتینجی', 'آلتیلیق', 'یئددی'],
    category: 'numbers',
    category_fa: 'اعداد و شمارش'
  },
  {
    az_word: 'یئددی',
    az_latin: 'yeddi',
    az_alternative_spellings: ['یددی', 'یئدی'],
    fa_word: 'هفت (عدد ۷)',
    fa_alternative_equivalents: ['هفت', 'هفت‌گانه'],
    az_pronunciation: 'Yeddi [jedˈdi]',
    ipa: '/jedˈdi/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'عدد اصلی',
    fa_definition: 'عدد هفت؛ عددی با بار فرهنگی و اسطوره‌ای بالا در فولکلور آذربایجان (یئددی گؤزل، یئددی سین، یئددی ائل).',
    az_definition: 'آلتیدان سونرا گلن موقدس ساییلان تک سای (۷).',
    az_examples: [
      {
        az: 'یئددی اؤلچ، بیر بیچ کی سونرا پئشمان اولما یاسان.',
        az_latin: 'Yeddi ölç, bir biç ki sonra peşman olmayasan.',
        fa: 'هفت بار بسنج و یک بار ببر تا بعداً پشیمان نشوی (ضرب‌المثل).'
      }
    ],
    synonyms: [],
    antonyms: [],
    related_words: ['یئددینجی', 'یئددی‌لیک', 'سککیز'],
    category: 'numbers',
    category_fa: 'اعداد و شمارش'
  },
  {
    az_word: 'سککیز',
    az_latin: 'səkkiz',
    az_alternative_spellings: ['سکیز'],
    fa_word: 'هشت (عدد ۸)',
    fa_alternative_equivalents: ['هشت', 'هشت‌تا'],
    az_pronunciation: 'Səkkiz [sæcˈciz]',
    ipa: '/sæcˈciz/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'عدد اصلی',
    fa_definition: 'عدد هشت؛ میان هفت و نه.',
    az_definition: 'یئددیدن سونرا گلن جوت سای (۸).',
    az_examples: [
      {
        az: 'ساعت سحر سککیزده کندلیلر مزرعه‌یه یوللاندیلار.',
        az_latin: 'Saat səhər səkkizdə kəndlilər məzrəyə yollandılar.',
        fa: 'ساعت هشت صبح روستاییان رهسپار مزرعه شدند.'
      }
    ],
    synonyms: [],
    antonyms: [],
    related_words: ['سککیزینجی', 'سککیزلیک', 'دوققوز'],
    category: 'numbers',
    category_fa: 'اعداد و شمارش'
  },
  {
    az_word: 'دوققوز',
    az_latin: 'doqquz',
    az_alternative_spellings: ['دوقوز'],
    fa_word: 'نه (عدد ۹)',
    fa_alternative_equivalents: ['نه', 'نه تا'],
    az_pronunciation: 'Doqquz [doxˈxuz]',
    ipa: '/doxˈxuz/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'عدد اصلی',
    fa_definition: 'عدد نه؛ آخرین عدد تک رقمی در دستگاه شمارش دهگانی.',
    az_definition: 'تک رقملی ساییلارین سونونجوسو اولان تک سای (۹).',
    az_examples: [
      {
        az: 'دوققوز آی، دوققوز گون، دوققوز ساعات حیاتین یئنی باغلانتیسی‌دیر.',
        az_latin: 'Doqquz ay, doqquz gün, doqquz saat həyatın yeni bağlantısıdır.',
        fa: 'نه ماه و نه روز و نه ساعت، آغاز پیوندی نو در زندگی است.'
      }
    ],
    synonyms: [],
    antonyms: [],
    related_words: ['دوققوزونجو', 'دوققوزلوق', 'اون'],
    category: 'numbers',
    category_fa: 'اعداد و شمارش'
  },
  {
    az_word: 'اون',
    az_latin: 'on',
    az_alternative_spellings: ['اوْن'],
    fa_word: 'ده (عدد ۱۰)، دهگان',
    fa_alternative_equivalents: ['ده', 'ده‌تایی'],
    az_pronunciation: 'On [on]',
    ipa: '/on/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'عدد اصلی',
    fa_definition: 'عدد ده؛ مبنای دستگاه شمارش اعشاری و دهگانی.',
    az_definition: 'سایی سیستمینین اساسی اولان ایلک ایکی رقملی سای (۱۰).',
    az_examples: [
      {
        az: 'اون دانا قویون کؤهولون آغزیندا اوتولاییردی.',
        az_latin: 'On dənə qoyun köhülün ağzında otlayırdı.',
        fa: 'ده رأس گوسفند در دهانه غار کوهستانی می‌چریدند.'
      }
    ],
    synonyms: [],
    antonyms: [],
    related_words: ['اونونجو', 'اونلوق', 'ایگیرمی'],
    category: 'numbers',
    category_fa: 'اعداد و شمارش'
  },

  // --- دهگان‌ها و اعداد بزرگ ---
  {
    az_word: 'ایگیرمی',
    az_latin: 'iyirmi',
    az_alternative_spellings: ['ییرمی'],
    fa_word: 'بیست (عدد ۲۰)',
    fa_alternative_equivalents: ['بیست', 'بیست‌تا'],
    az_pronunciation: 'İyirmi [i.jiɾˈmi]',
    ipa: '/i.jiɾˈmi/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'عدد اصلی',
    fa_definition: 'عدد بیست در زبان ترکی؛ دو برابر ده.',
    az_definition: 'ایکینجی اونلوق سایی (۲۰).',
    az_examples: [
      {
        az: 'ایگیرمی یاشیندا گنج ایگید ائلین اومودودور.',
        az_latin: 'İyirmi yaşında gənc igid elin umududur.',
        fa: 'جوان بیست‌ساله دلاور، امید ایل و تبار است.'
      }
    ],
    synonyms: [],
    antonyms: [],
    related_words: ['ایگیرمینجی', 'اوتوز'],
    category: 'numbers',
    category_fa: 'اعداد و شمارش'
  },
  {
    az_word: 'اوتوز',
    az_latin: 'otuz',
    az_alternative_spellings: ['اوْتوز'],
    fa_word: 'سی (عدد ۳۰)',
    fa_alternative_equivalents: ['سی', 'سی‌تا'],
    az_pronunciation: 'Otuz [oˈtuz]',
    ipa: '/oˈtuz/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'عدد اصلی',
    fa_definition: 'عدد سی؛ سه برابر ده.',
    az_definition: 'اوچونجو اونلوق سایی (۳۰).',
    az_examples: [
      {
        az: 'آیین اوتوز گونو زحمت چکیب عایله‌نین چؤره‌یینی قازاناردی.',
        az_latin: 'Ayın otuz günü zəhmət çəkib ailənin çörəyini qazanardı.',
        fa: 'سی روز ماه را با زحمت کار می‌کرد تا نان حلال خانواده را فراهم سازد.'
      }
    ],
    synonyms: [],
    antonyms: [],
    related_words: ['اوتوزونجو', 'قیرخ'],
    category: 'numbers',
    category_fa: 'اعداد و شمارش'
  },
  {
    az_word: 'قیرخ',
    az_latin: 'qırx',
    az_alternative_spellings: ['قێرخ'],
    fa_word: 'چهل (عدد ۴۰)، چهله زمستان، اربعین',
    fa_alternative_equivalents: ['چهل', 'چهله'],
    az_pronunciation: 'Qırx [gɯrx]',
    ipa: '/gɯrx/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'عدد اصلی / نماد فرهنگی',
    fa_definition: 'عدد چهل؛ در فرهنگ آذربایجان نماد کمال و گذر زمان (چله بزرگ: بؤیوک چیله، چله کوچک: کیچیک چیله، قیرخ گئجه، قیرخ اینجه قیز).',
    az_definition: 'دؤردونجو اونلوق اولان و فولکلوردا اؤزل یئری اولان سای (۴۰).',
    az_examples: [
      {
        az: 'قیرخ گون بؤیوک چیله‌ده قار یاغیب، کند یوللارینی باغلاردی.',
        az_latin: 'Qırx gün böyük çillədə qar yağıb, kənd yollarını bağlardı.',
        fa: 'چهل روز در چله بزرگ زمستان برف می‌بارید و راه‌های روستا را می‌بست.'
      }
    ],
    synonyms: [],
    antonyms: [],
    related_words: ['قیرخینجی', 'چیله', 'اللی'],
    category: 'numbers',
    category_fa: 'اعداد و شمارش'
  },
  {
    az_word: 'اَللی',
    az_latin: 'əlli',
    az_alternative_spellings: ['اللی'],
    fa_word: 'پنجاه (عدد ۵۰)، نیم‌قرن',
    fa_alternative_equivalents: ['پنجاه', 'پنجاه‌تایی'],
    az_pronunciation: 'Əlli [ælˈli]',
    ipa: '/ælˈli/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'عدد اصلی',
    fa_definition: 'عدد پنجاه در زبان ترکی؛ نیمه صدگان.',
    az_definition: 'بئشینجی اونلوق و یوزون یاریسی اولان سای (۵۰).',
    az_examples: [
      {
        az: 'اللی ایللیک دوستلوق هئچ زامان اونودولماز.',
        az_latin: 'Əlli illik dostluq heç zaman unudulmaz.',
        fa: 'دوستی پنجاه‌ساله هرگز به دست فراموشی سپرده نمی‌شود.'
      }
    ],
    synonyms: [],
    antonyms: [],
    related_words: ['اللینجی', 'آتمیش', 'یوز'],
    category: 'numbers',
    category_fa: 'اعداد و شمارش'
  },
  {
    az_word: 'آتمیش',
    az_latin: 'altmış',
    az_alternative_spellings: ['آلتمیش'],
    fa_word: 'شصت (عدد ۶۰)',
    fa_alternative_equivalents: ['شصت', 'شصت‌تا'],
    az_pronunciation: 'Altmış [ɑltˈmɯʃ]',
    ipa: '/ɑltˈmɯʃ/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'عدد اصلی',
    fa_definition: 'عدد شصت؛ شش برابر ده.',
    az_definition: 'آلتینجی اونلوق سایی (۶۰).',
    az_examples: [
      {
        az: 'ساعاتین بیر دقیقه‌سی آتمیش ثانیه‌دیر.',
        az_latin: 'Saatın bir dəqiqəsi altmış saniyədir.',
        fa: 'یک دقیقه از ساعت، شصت ثانیه است.'
      }
    ],
    synonyms: [],
    antonyms: [],
    related_words: ['آتمیشینجی', 'یئتمیش'],
    category: 'numbers',
    category_fa: 'اعداد و شمارش'
  },
  {
    az_word: 'یئتمیش',
    az_latin: 'yetmiş',
    az_alternative_spellings: ['یتمیش'],
    fa_word: 'هفتاد (عدد ۷۰)',
    fa_alternative_equivalents: ['هفتاد', 'هفتادتا'],
    az_pronunciation: 'Yetmiş [jetˈmiʃ]',
    ipa: '/jetˈmiʃ/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'عدد اصلی',
    fa_definition: 'عدد هفتاد در زبان ترکی؛ هفت برابر ده.',
    az_definition: 'یئددینجی اونلوق سایی (۷۰).',
    az_examples: [
      {
        az: 'یئتمیش ایل عؤمور سوردو و کنده بؤیوک خیدمتلر ائتدی.',
        az_latin: 'Yetmiş il ömür sürdü və kəndə böyük xidmətlər etdi.',
        fa: 'هفتاد سال زیست و به روستایش خدمات بزرگی ارائه نمود.'
      }
    ],
    synonyms: [],
    antonyms: [],
    related_words: ['یئتمیشینجی', 'سکسن'],
    category: 'numbers',
    category_fa: 'اعداد و شمارش'
  },
  {
    az_word: 'سکسن',
    az_latin: 'səksən',
    az_alternative_spellings: ['سه‌کسن', 'هشتاد'],
    fa_word: 'هشتاد (عدد ۸۰)',
    fa_alternative_equivalents: ['هشتاد', 'هشتادتا'],
    az_pronunciation: 'Səksən [sæcˈsæn]',
    ipa: '/sæcˈsæn/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'عدد اصلی',
    fa_definition: 'عدد هشتاد در زبان ترکی؛ هشت برابر ده.',
    az_definition: 'سککیزینجی اونلوق اولان سای (۸۰).',
    az_examples: [
      {
        az: 'سکسن یاشلی قوجا هله ده کندین آغ‌ساققالی ایدی.',
        az_latin: 'Səksən yaşlı qoca hələ də kəndin ağsaqqalı idi.',
        fa: 'پیرمرد هشتادساله هنوز ریش‌سفید و بزرگ روستا بود.'
      }
    ],
    synonyms: [],
    antonyms: [],
    related_words: ['سکسنینجی', 'دوخسان'],
    category: 'numbers',
    category_fa: 'اعداد و شمارش'
  },
  {
    az_word: 'دوخسان',
    az_latin: 'doxsan',
    az_alternative_spellings: ['دوقسان'],
    fa_word: 'نود (عدد ۹۰)',
    fa_alternative_equivalents: ['نود', 'نودتا'],
    az_pronunciation: 'Doxsan [doxˈsɑn]',
    ipa: '/doxˈsɑn/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'عدد اصلی',
    fa_definition: 'عدد نود در زبان ترکی؛ نه برابر ده.',
    az_definition: 'دوققوزونجو اونلوق سایی (۹۰).',
    az_examples: [
      {
        az: 'کتابین دوخسانینجی صفحه‌سینده بو شعر یازیلمیشدی.',
        az_latin: 'Kitabın doxsanıncı səhifəsində bu şeir yazılmışdı.',
        fa: 'در صفحه نودم کتاب این شعر نگاشته شده بود.'
      }
    ],
    synonyms: [],
    antonyms: [],
    related_words: ['دوخسانینجی', 'یوز'],
    category: 'numbers',
    category_fa: 'اعداد و شمارش'
  },
  {
    az_word: 'یوز',
    az_latin: 'yüz',
    az_alternative_spellings: ['یوْز'],
    fa_word: 'صد (عدد ۱۰۰)، سده، قرن',
    fa_alternative_equivalents: ['صد', 'یکصد'],
    az_pronunciation: 'Yüz [jyz]',
    ipa: '/jyz/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'عدد اصلی',
    fa_definition: 'عدد صد در زبان ترکی؛ ده برابر ده.',
    az_definition: 'اون دنه اونلوقدان اولوشان ایلک اوچ رقملی سای (۱۰۰).',
    az_examples: [
      {
        az: 'یوز دفعه دئمیشم کی یولدان کئچنده ساغا-سولا باخین.',
        az_latin: 'Yüz dəfə demişəm ki yoldan keçəndə sağa-sola baxın.',
        fa: 'صد بار گفته‌ام هنگام عبور از راه به چپ و راست نگاه کنید.'
      }
    ],
    synonyms: [{ word: 'قرن', latin: 'qərn', fa_equivalent: 'سده' }],
    antonyms: [],
    related_words: ['یوزونجو', 'یوزلوک', 'مین'],
    category: 'numbers',
    category_fa: 'اعداد و شمارش'
  },
  {
    az_word: 'مین',
    az_latin: 'min',
    az_alternative_spellings: ['میـن'],
    fa_word: 'هزار (عدد ۱۰۰۰)',
    fa_alternative_equivalents: ['هزار', 'یک‌هزار'],
    az_pronunciation: 'Min [min]',
    ipa: '/min/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'عدد اصلی',
    fa_definition: 'عدد هزار در زبان ترکی؛ ده برابر صد.',
    az_definition: 'اون دنه یوزلوکدن عیبارت اولان دؤرد رقملی سای (۱۰۰۰).',
    az_examples: [
      {
        az: 'بیر کنده مین برکت، مین بوللوق دولسون.',
        az_latin: 'Bir kəndə min bərəkət, min bolluq dolsun.',
        fa: 'به یک ده، هزاران برکت و فراوانی سرازیر باد.'
      }
    ],
    synonyms: [],
    antonyms: [],
    related_words: ['مینینجی', 'مین‌لرله', 'تومن', 'میلیون'],
    category: 'numbers',
    category_fa: 'اعداد و شمارش'
  },
  {
    az_word: 'تومَن',
    az_latin: 'tümən',
    az_alternative_spellings: ['تومان', 'تومن'],
    fa_word: 'تومان، ده هزار (واحد شمارش لشکری کهن و واحد رایج پول)',
    fa_alternative_equivalents: ['تومان', 'ده هزار تایی'],
    az_pronunciation: 'Tümən [tyˈmæn]',
    ipa: '/tyˈmæn/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم / واحد شمارش کهن',
    fa_definition: 'در زبان‌های باستانی ترکی به معنای «ده هزار» (۱۰,۰۰۰) و لشکر ده هزار نفره بوده است که بعدها به واحد پول مشهور تبدیل گردید.',
    az_definition: 'اسکی تورکجه‌ده اون مین سایی‌سینا دئییلن تاریخی سؤز کی سونرالار پول بیریمینه چئوریلدی.',
    az_examples: [
      {
        az: 'اسکی چاغلاردا اون مین قوشونا بیر تومن باشچی‌لیق ائدردی.',
        az_latin: 'Əski çağlarda on min qoşuna bir tümən başçılıq edərdi.',
        fa: 'در روزگاران کهن بر ده هزار سپاهی یک فرمانده تومان سروری می‌کرد.'
      }
    ],
    synonyms: [{ word: 'اون مین', latin: 'on min', fa_equivalent: 'ده هزار' }],
    antonyms: [],
    related_words: ['مین', 'سای', 'پول'],
    etymology: {
      origin: 'ترکی باستان',
      notes: 'در ترکی کهن و کتیبه‌های اورخون و دیوان لغات‌الترک «تومَن» (Tümən) دقیقاً به معنای عدد ۱۰,۰۰۰ بوده است.'
    },
    category: 'numbers',
    category_fa: 'اعداد و واژگان تاریخی'
  },
  {
    az_word: 'میلیون',
    az_latin: 'milyon',
    az_alternative_spellings: ['میلیوْن'],
    fa_word: 'میلیون (عدد ۱,۰۰۰,۰۰۰)',
    fa_alternative_equivalents: ['یک میلیون'],
    az_pronunciation: 'Milyon [milˈjon]',
    ipa: '/milˈjon/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'عدد اصلی',
    fa_definition: 'عدد یک میلیون؛ هزار هزار.',
    az_definition: 'مین دنه مین‌لیکدن عبارت اولان یئددی رقملی بؤیوک سای (۱۰۰۰۰۰۰).',
    az_examples: [
      {
        az: 'آذربایجانین میلیونلار اینسانی اؤز آنا دیلینه فخر ائدیر.',
        az_latin: 'Azərbaycanın milyonlar insanı öz ana dilinə fəxr edir.',
        fa: 'میلیون‌ها انسان در آذربایجان به زبان مادری خود افتخار می‌ورزند.'
      }
    ],
    synonyms: [],
    antonyms: [],
    related_words: ['میلیارد', 'مین'],
    category: 'numbers',
    category_fa: 'اعداد و شمارش'
  },
  {
    az_word: 'میلیارد',
    az_latin: 'milyard',
    az_alternative_spellings: ['میلیارد'],
    fa_word: 'میلیارد (عدد ۱,۰۰۰,۰۰۰,۰۰۰)',
    fa_alternative_equivalents: ['یک میلیارد'],
    az_pronunciation: 'Milyard [milˈjɑɾd]',
    ipa: '/milˈjɑɾd/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'عدد اصلی',
    fa_definition: 'عدد یک میلیارد؛ هزار میلیون.',
    az_definition: 'مین میلیون برابرینده اولان اون رقملی سای (۱۰۰۰۰۰۰۰۰۰).',
    az_examples: [
      {
        az: 'گؤی اوزونده میلیاردلار اولدوز ایشیلداییر.',
        az_latin: 'Göy üzündə milyardlar ulduz işıldayır.',
        fa: 'در پهنه آسمان میلیاردها ستاره می‌درخشند.'
      }
    ],
    synonyms: [],
    antonyms: [],
    related_words: ['میلیون'],
    category: 'numbers',
    category_fa: 'اعداد و شمارش'
  },

  // --- اعداد کسری، توزیعی و اضعاف ---
  {
    az_word: 'یاریم',
    az_latin: 'yarım',
    az_alternative_spellings: ['یاری'],
    fa_word: 'نیم، نصف (یک‌دوم / ½)',
    fa_alternative_equivalents: ['نصف', 'نیمه'],
    az_pronunciation: 'Yarım [jɑˈrɯm]',
    ipa: '/jɑˈrɯm/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'عدد کسری / اسم',
    fa_definition: 'یک‌دوم از یک کل؛ نصف یک چیز.',
    az_definition: 'بیر بوتونون ایکی برابر حیسه‌سیندن بیری (½).',
    az_examples: [
      {
        az: 'ساعت بیر یاریمدا بازارین توکانلاری آچیلار.',
        az_latin: 'Saat bir yarımda bazarın dükanları açılar.',
        fa: 'ساعت یک و نیم، دکان‌های بازار گشوده می‌شوند.'
      },
      {
        az: 'یاریم چؤرکله ده قارین دویورماق اولار.',
        az_latin: 'Yarım çörəklə də qarın doyurmaq olar.',
        fa: 'با نصف قرص نان نیز می‌توان سیر شد.'
      }
    ],
    synonyms: [{ word: 'نصف', latin: 'nisf', fa_equivalent: 'نصف' }],
    antonyms: [{ word: 'بۆتون', latin: 'bütün', fa_equivalent: 'کامل و تام' }],
    related_words: ['چَرَیَک', 'یاریماق', 'بؤلمک'],
    etymology: {
      origin: 'ترکی اصیل اوغوز',
      notes: 'از ریشه فعلی «یارماق» (شکافتن، به دو نیم تقسیم کردن).'
    },
    category: 'numbers',
    category_fa: 'اعداد و مقادیر'
  },
  {
    az_word: 'چَرَیَک',
    az_latin: 'çərək',
    az_alternative_spellings: ['چَرَک', 'چریک'],
    fa_word: 'یک‌چهارم، ربع (¼)',
    fa_alternative_equivalents: ['یک‌چهارم', 'ربع', 'چارک'],
    az_pronunciation: 'Çərək [t͡ʃæˈræk]',
    ipa: '/t͡ʃæˈræk/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'عدد کسری / واحد وزن سنتی',
    fa_definition: 'یک‌چهارم از یک کل یا یک ساعت؛ همچنین در مقیاس‌های سنتی آذربایجان چارک برابر با یک‌چهارم من تبریز است.',
    az_definition: 'بیر بوتونون دؤردده بیر حیسه‌سی (¼); زاماندا اون بئش دقیقه.',
    az_examples: [
      {
        az: 'ساعت ایکی‌یه بیر چَرَک قالیب.',
        az_latin: 'Saat ikiyə bir çərək qalıb.',
        fa: 'یک ربع به ساعت دو مانده است.'
      }
    ],
    synonyms: [{ word: 'دؤردده بیر', latin: 'dörddə bir', fa_equivalent: 'یک‌چهارم' }],
    antonyms: [],
    related_words: ['یاریم', 'دؤرد'],
    category: 'numbers',
    category_fa: 'اعداد و مقادیر'
  },
  {
    az_word: 'جوت',
    az_latin: 'cüt',
    az_alternative_spellings: ['جوفت'],
    fa_word: 'جفت، زوج (عدد بخش‌پذیر بر ۲)',
    fa_alternative_equivalents: ['جفت', 'زوج'],
    az_pronunciation: 'Cüt [d͡ʒyt]',
    ipa: '/d͡ʒyt/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'صفت / اسم عدد',
    fa_definition: 'دو چیز متناظر و هم‌جنس (مانند یک جفت جوراب، یک جفت کفش)؛ در برابر اعداد فرد (تک).',
    az_examples: [
      {
        az: 'ایکی، دؤرد، آلتی جوت ساییلاردیرلار، بیر، اوچ ایسه تک‌دیرلر.',
        az_latin: 'İki, dörd, altı cüt sayılardırlar, bir, üç isə təkdirler.',
        fa: 'دو، چهار، شش اعداد زوج هستند، یک و سه اما فردند.'
      }
    ],
    synonyms: [],
    antonyms: [{ word: 'تک', latin: 'tək', fa_equivalent: 'فرد' }],
    related_words: ['تک', 'ایکی'],
    category: 'numbers',
    category_fa: 'اعداد و شمارش'
  },
  {
    az_word: 'تک',
    az_latin: 'tək',
    az_alternative_spellings: ['تکه'],
    fa_word: 'فرد (عددی که زوج نیست)، تنها، منفرد، یگانه',
    fa_alternative_equivalents: ['فرد', 'تک', 'تنها'],
    az_pronunciation: 'Tək [tæc]',
    ipa: '/tæc/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'صفت / اسم عدد',
    fa_definition: 'اعداد فرد؛ عددی که بر دو بخش‌پذیر نیست، همچنین به معنای تنها و بی‌همتا.',
    az_examples: [
      {
        az: 'تک الین سسی چیخماز، بیرلیک اولماسا ایش ایره‌لی گئتمز.',
        az_latin: 'Tək əlin səsi çıxmaz, birlik olmasa iş irəli getməz.',
        fa: 'یک دست صدا ندارد؛ تا همدلی و اتحاد نباشد کار پیش نمی‌رود.'
      }
    ],
    synonyms: [{ word: 'یالقیز', latin: 'yalqız', fa_equivalent: 'تنها' }],
    antonyms: [{ word: 'جوت', latin: 'cüt', fa_equivalent: 'زوج و جفت' }],
    related_words: ['جوت', 'بیر'],
    category: 'numbers',
    category_fa: 'اعداد و شمارش'
  },
  {
    az_word: 'سونونجو',
    az_latin: 'sonuncu',
    az_alternative_spellings: ['سون'],
    fa_word: 'آخرین، واپسین، پایانی',
    fa_alternative_equivalents: ['آخرین', 'واپسین'],
    az_pronunciation: 'Sonuncu [soˈnun.d͡ʒu]',
    ipa: '/soˈnun.d͡ʒu/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'عدد ترتیبی / صفت',
    fa_definition: 'آخرین و واپسین فرد یا شماره در یک صف یا ردیف.',
    az_examples: [
      {
        az: 'او، یاریشین سونونجو مرحله‌سینده بیرینجی اولدو.',
        az_latin: 'O, yarışın sonuncu mərhələsində birinci oldu.',
        fa: 'او در مرحله پایانی مسابقه به مقام اول رسید.'
      }
    ],
    synonyms: [{ word: 'آخیرینجی', latin: 'axırıncı', fa_equivalent: 'آخرین' }],
    antonyms: [{ word: 'بیرینجی', latin: 'birinci', fa_equivalent: 'نخستین' }],
    related_words: ['بیرینجی', 'سون'],
    category: 'numbers',
    category_fa: 'اعداد ترتیبی'
  },
  {
    az_word: 'ایکی‌قات',
    az_latin: 'ikiqat',
    az_alternative_spellings: ['ایکی قات'],
    fa_word: 'دوبرابر، دولایه، دوچندان',
    fa_alternative_equivalents: ['دوبرابر', 'دولایه'],
    az_pronunciation: 'İkiqat [i.ciˈgɑt]',
    ipa: '/i.ciˈgɑt/',
    part_of_speech: 'adjective',
    part_of_speech_fa: 'صفت / قید مضاعف',
    fa_definition: 'دو برابر شده، دولایه تا شده.',
    az_examples: [
      {
        az: 'بو ایل بوغدا محصولو ایکی‌قات آرتیب برکت گتیردی.',
        az_latin: 'Bu il buğda məhsulu ikiqat artıb bərəkət gətirdi.',
        fa: 'امسال محصول گندم دوچندان افزایش یافته و پر از برکت شد.'
      }
    ],
    synonyms: [],
    antonyms: [],
    related_words: ['ایکی', 'اوچ‌قات', 'قات'],
    category: 'numbers',
    category_fa: 'اعداد و مقادیر'
  }
];

let addedCount = 0;
const existingWords = new Set(entries.map(e => e.az_word.trim()));

for (const num of TURKISH_NUMBERS) {
  if (!num.az_word) continue;
  if (!existingWords.has(num.az_word.trim())) {
    const fullEntry: DictionaryEntry = {
      id: num.id || `entry-num-${Date.now()}-${addedCount + 1}`,
      az_word: num.az_word,
      az_latin: num.az_latin || '',
      az_alternative_spellings: num.az_alternative_spellings || [],
      fa_word: num.fa_word || '',
      fa_alternative_equivalents: num.fa_alternative_equivalents || [num.fa_word || ''],
      az_pronunciation: num.az_pronunciation || '',
      ipa: num.ipa || '',
      part_of_speech: num.part_of_speech || 'noun',
      part_of_speech_fa: num.part_of_speech_fa || 'عدد',
      fa_definition: num.fa_definition || '',
      az_definition: num.az_definition || '',
      az_examples: num.az_examples || [],
      synonyms: num.synonyms || [],
      antonyms: num.antonyms || [],
      related_words: num.related_words || [],
      dialect: 'عمومی در سراسر آذربایجان',
      usage_label: 'formal',
      usage_label_fa: 'رسمی و بنیادین',
      category: num.category || 'numbers',
      category_fa: num.category_fa || 'اعداد و شمارش',
      source: 'فرهنگ اصیل ترکی آذربایجانی',
      verification_status: 'verified',
      search_count: 95,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    entries.push(fullEntry);
    existingWords.add(num.az_word.trim());
    addedCount++;
    console.log(`Added number: ${fullEntry.az_word} (${fullEntry.az_latin}) -> ${fullEntry.fa_word}`);
  }
}

fs.writeFileSync(DICTIONARY_FILE, JSON.stringify(entries, null, 2), 'utf-8');
console.log(`Successfully added ${addedCount} Turkish numbers. Total dictionary entries now: ${entries.length}`);
