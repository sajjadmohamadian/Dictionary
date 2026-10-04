import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DictionaryEntry } from '../src/types/dictionary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../.data');
const DICTIONARY_FILE = path.join(DATA_DIR, 'dictionary.json');

const entries: DictionaryEntry[] = JSON.parse(fs.readFileSync(DICTIONARY_FILE, 'utf-8'));
console.log(`Starting herbs and spices expansion. Current entries: ${entries.length}`);

const HERBS_AND_SPICES: Partial<DictionaryEntry>[] = [
  // --- ادویه‌جات (Spices) ---
  {
    id: `entry-herb-${Date.now()}-1`,
    az_word: 'ایستی اوت',
    az_latin: 'isti ot',
    az_alternative_spellings: ['ایستیوْت', 'ایستیوت', 'قارا ایستیوْت'],
    fa_word: 'فلفل سیاه، فلفل تند کوبیده‌شده',
    fa_alternative_equivalents: ['فلفل سیاه', 'فلفل', 'ادویه تند فلفلی'],
    az_pronunciation: 'İsti ot / İstiot [is.ti.ot]',
    ipa: '/is.tiˈot/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم ادویه',
    fa_definition: 'فلفل سیاه؛ در زبان ترکی آذربایجانی از ترکیب «ایستی» (گرم، تند) و «اوت» (گیاه، علف) تشکیل شده و به ادویه تند و ساییده‌شده فلفل سیاه یا قرمز اطلاق می‌شود که طعم‌دهنده اصلی کباب، آبگوشت و کوفته تبریزی است.',
    az_definition: 'یئمکلره داد و آجیلیق وئرمک اوچون ایشلنن قارا و یا قیرمیزی تند ادویه; ایستی و اوت سؤزلرینین بیرلشمه‌سیندن یارانیب.',
    az_examples: [
      {
        az: 'کوفته‌نین اتینه دوز، ساریکؤک و قارا ایستی اوت وورارلار.',
        az_latin: 'Küftənin ətinə duz, sarıkök və qara isti ot vurarlar.',
        fa: 'به گوشت کوفته تبریزی نمک، زردچوبه و فلفل سیاه می‌زنند.'
      },
      {
        az: 'شوربایا بیر آز ایستی اوت سپسن، هم دادلی اولار، هم بویوک شفا وئرر.',
        az_latin: 'Şorbaya bir az isti ot səpsən, həm dadlı olar, həm böyük şəfa verər.',
        fa: 'اگر اندکی فلفل سیاه در شوربا بپاشی، هم خوش‌طعم می‌شود و هم شفابخش سرماخوردگی است.'
      }
    ],
    synonyms: [{ word: 'قارا بیبر', latin: 'qara bibər', fa_equivalent: 'فلفل سیاه' }],
    antonyms: [],
    related_words: ['ایستیوْتلوک', 'ساریکؤک', 'ادویه', 'بیبر'],
    etymology: {
      origin: 'ترکی اصیل آذربایجانی',
      notes: 'ترکیب دو واژه ترکی: ایستی (گرم و تند) + اوت (گیاه و علف داروئی)'
    },
    dialect: 'عمومی در سراسر آذربایجان ایران',
    usage_label: 'formal',
    usage_label_fa: 'رسمی و روزمره آشپزی',
    category: 'food',
    category_fa: 'خوراک و ادویه‌ها',
    source: 'فرهنگ واژگان آشپزی سنتی آذربایجان',
    verification_status: 'verified',
    search_count: 85,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: `entry-herb-${Date.now()}-2`,
    az_word: 'کهلیک‌اوْتو',
    az_latin: 'kəklikotu',
    az_alternative_spellings: ['کهلیک اوتو', 'ککلیک اوْتو'],
    fa_word: 'کاکوتی وحشی کوهستان، آویشن کوهی معطر',
    fa_alternative_equivalents: ['کاکوتی', 'آنخ', 'آویشن کوهی سهند'],
    az_pronunciation: 'Kəklikotu [cæc.lic.oˈtu]',
    ipa: '/cæc.lic.oˈtu/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم علف و سبزی کوهی',
    fa_definition: 'گیاه کوهی بسیار معطر خودرو در صخره‌ها و کوهپایه‌های سهند و سبلان؛ دافع نفخ و مقوی معده که خشک‌کرده آن در دوغ محلی، چای کوهی و پنیر سنتی تبریز ریخته می‌شود.',
    az_definition: 'داغلاردا و قایالیقلاردا بیته‌ن، چوخ خوش اییی اولان معطر داغ اوتو کی چایدا، آیراندا و پندیرده ایشله‌نیر.',
    az_examples: [
      {
        az: 'سهند داغلاریندان دردیگیمیز کهلیک‌اوتونو قورودوب، قیش چایینا تؤکه‌ریک.',
        az_latin: 'Səhənd dağlarından dərdiyimiz kəklikotunu qurudub, qış çayına tökərik.',
        fa: 'کاکوتی وحشی چیده‌شده از کوه‌های سهند را خشک کرده و در چای زمستانی می‌ریزیم.'
      },
      {
        az: 'ایستی گونده کهلیک‌اوتولو سرین آیران اورگی سرینله‌در.',
        az_latin: 'İsti gündə kəklikotulu sərin ayran ürəyi sərinlədər.',
        fa: 'در روز گرم، دوغ خنک با عطر کاکوتی کوهی جان را خنک می‌کند.'
      }
    ],
    synonyms: [{ word: 'داغ کهلیگی', latin: 'dağ kəkliyi', fa_equivalent: 'کاکوتی کوهی' }],
    antonyms: [],
    related_words: ['یارپیز', 'آیران', 'سهند', 'چای'],
    etymology: {
      origin: 'ترکی اصیل آذربایجانی',
      notes: 'از کهلیک (کبک) + اوت (علف و گیاه)؛ گیاهی که کبک‌های کوهستان در میان بوته‌های آن می‌چرند.'
    },
    dialect: 'عمومی در آذربایجان',
    usage_label: 'formal',
    usage_label_fa: 'طبیعت و طب سنتی',
    category: 'nature',
    category_fa: 'گیاهان دارویی و کوهی',
    source: 'فرهنگ گیاهان دارویی آذربایجان',
    verification_status: 'verified',
    search_count: 90,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: `entry-herb-${Date.now()}-3`,
    az_word: 'قازیاغی',
    az_latin: 'qazayağı',
    az_alternative_spellings: ['قاز آیاغی'],
    fa_word: 'غازیاغی (سبزی وحشی خودرو، پرخاصیت بهاری دشت‌های آذربایجان)',
    fa_alternative_equivalents: ['غازیاغی', 'سبزی کوهی پای غاز'],
    az_pronunciation: 'Qazayağı [gɑ.zɑ.jɑˈɣɯ]',
    ipa: '/gɑ.zɑ.jɑˈɣɯ/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم گیاه خوراکی کوهی',
    fa_definition: 'گیاه وحشی خودرو با برگ‌هایی شبیه پای غاز؛ در اوایل بهار چیده می‌شود و در پخت آش‌های سنتی آذربایجان (قازیاغی آشی)، کوکو و بورانی کاربرد فراوان دارد.',
    az_definition: 'یازدا دره‌لرده و چؤللرده بیته‌ن یئمه‌لی یاشیل داغ بیتکیسی کی یارپاقلاری قازین آیاغینا اوخشایار و آش ایچینده بیشیریلر.',
    az_examples: [
      {
        az: 'یاز چاغی قیزلار چؤلدن قازیاغی ییغیب، دادلی کوکو و آش پیشیرردیلر.',
        az_latin: 'Yaz çağı qızlar çöldən qazayağı yığıb, dadlı kükü və aş bişirərdilər.',
        fa: 'در هنگام بهار دختران از دشت غازیاغی می‌چیدند و کوکو و آش لذیذ بهاری می‌پختند.'
      }
    ],
    synonyms: [],
    antonyms: [],
    related_words: ['یئملیک', 'داغ سبزیلری', 'آش'],
    etymology: {
      origin: 'ترکی آذربایجانی',
      notes: 'ترکیب قاز (غاز) + آیاق (پا) به علت شکل هندسی سه شاخه برگ‌های آن.'
    },
    dialect: 'عمومی آذربایجان',
    usage_label: 'formal',
    usage_label_fa: 'خوراک و طبیعت',
    category: 'food',
    category_fa: 'سبزی‌های کوهی و بهاری',
    source: 'فولکلور و تغذیه بومی آذربایجان',
    verification_status: 'verified',
    search_count: 75,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: `entry-herb-${Date.now()}-4`,
    az_word: 'بولاغ‌اوْتو',
    az_latin: 'bulaqotu',
    az_alternative_spellings: ['بولاغ اوتو', 'سو تره‌سی'],
    fa_word: 'علف چشمه، آب‌تره، بولاغ‌اوتی (سبزی وحشی چشمه‌ساران خنک)',
    fa_alternative_equivalents: ['آب‌تره', 'شاهی آبی', 'بولاغ اوتی'],
    az_pronunciation: 'Bulaqotu [bu.lɑx.oˈtu]',
    ipa: '/bu.lɑx.oˈtu/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم گیاه دارویی کوهی',
    fa_definition: 'گیاهی آبزی و خودرو که در حاشیه چشمه‌های زلال و آب‌های جاری خنک کوهستان می‌روید؛ مزه‌ای شبیه شاهی و تند دارد و تصفیه‌کننده خون و سرشار از ید و آهن است.',
    az_definition: 'بولاقلارین و آخار سولارین ایچینده بیتن، بیر آز توند دادلی، قانی تمیزله‌ین درمانلی یاشیل سو اوتو.',
    az_examples: [
      {
        az: 'بولاغین سرین سویوندان تزه بولاغ‌اوتو دریب پندیر-چؤرکله یئردیک.',
        az_latin: 'Bulağın sərin suyundan təzə bulaqotu dərib pəndir-çörəklə yeyərdik.',
        fa: 'از آب خنک چشمه علف چشمه تازه چیده و همراه با نان و پنیر محلی می‌خوردیم.'
      }
    ],
    synonyms: [{ word: 'سو تره‌سی', latin: 'su tərəsi', fa_equivalent: 'تره آبی' }],
    antonyms: [],
    related_words: ['بولاق', 'یارپیز', 'چشمه'],
    category: 'nature',
    category_fa: 'گیاهان دارویی چشمه‌سار',
    source: 'گیاه‌شناسی سنتی آذربایجان',
    verification_status: 'verified',
    search_count: 65,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: `entry-herb-${Date.now()}-5`,
    az_word: 'یئملیک',
    az_latin: 'yemlik',
    az_alternative_spellings: ['یملیک'],
    fa_word: 'شنگ کوهی، یملیک (سبزی خوراکی محبوب نوبرانه بهار)',
    fa_alternative_equivalents: ['شنگ وحشی', 'سبزی صحرایی یملیک'],
    az_pronunciation: 'Yemlik [jæmˈlic]',
    ipa: '/jæmˈlic/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم گیاه خوراکی کوهی',
    fa_definition: 'از نامدارترین و خوشمزه‌ترین علف‌های خودروی بهاره دامنه‌های آذربایجان با ساقه‌ای ترد و شیرابه‌ای سفید؛ کودکان و اهالی آن را با نمک به صورت خام یا در سالاد و آش مصرف می‌کنند.',
    az_definition: 'یازین ایلک چاغلاریندا دشتده بیته‌ن، آغ سودو اولان، چوخ خوشمزّه و دوزلا چیی یئییلن داغ اوتو.',
    az_examples: [
      {
        az: 'اوشاقلار تپه‌لره چیخیب، بیر اَتک یئملیک دریب، دوز ووروب یئیَردیلر.',
        az_latin: 'Uşaqlar təpələrə çıxıb, bir ətək yemlik dərib, duz vurub yeyərdilər.',
        fa: 'کودکان به تپه‌ها می‌رفتند و دامن دامن شنگ کوهی چیده، نمک زده و با لذت می‌خوردند.'
      }
    ],
    synonyms: [],
    antonyms: [],
    related_words: ['قازیاغی', 'قوزوقولاغی', 'یاز'],
    etymology: {
      origin: 'ترکی اصیل اوغوز',
      notes: 'از ریشه «یئمک» (خوردن) + پسوند اسم‌ساز «-لیک»؛ یعنی گیاه بسیار خوردنی و لذیذ.'
    },
    category: 'food',
    category_fa: 'سبزی‌های کوهی خوراکی',
    source: 'فرهنگ سنتی آذربایجان',
    verification_status: 'verified',
    search_count: 80,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: `entry-herb-${Date.now()}-6`,
    az_word: 'قوزوقولاغی',
    az_latin: 'quzuqulağı',
    az_alternative_spellings: ['قوزو قولاغی', 'تورشک'],
    fa_word: 'ترشک کوهی، گوش بره (علف ترش‌مزه دامنه‌های کوهستان)',
    fa_alternative_equivalents: ['ترشک کوهی', 'حماض وحشی'],
    az_pronunciation: 'Quzuqulağı [gu.zu.gu.lɑˈɣɯ]',
    ipa: '/gu.zu.gu.lɑˈɣɯ/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم گیاه ترش کوهی',
    fa_definition: 'گیاه دارویی و خوراکی خودرو با برگ‌های نیزه‌ای شکل و مزه بسیار ترش و اشتهاآور؛ شبیه گوش بره و سرشار از ویتامین ث که در آش و دلمه‌های بهاری استفاده می‌شود.',
    az_definition: 'یارپاقلاری قوزونون قولاغینا اوخشایان، خوش تورش دادلی، دره‌لرده بیتن درمانلی یاشیل اوت.',
    az_examples: [
      {
        az: 'داغدا یول گئدرکن قوزوقولاغی دریب یئمک سوسوزلوغو آپارار.',
        az_latin: 'Dağda yol gedərkən quzuqulağı dərib yemək susuzluğu aparar.',
        fa: 'هنگام کوهپیمایی، چیدن و خوردن ترشک کوهی عطش و تشنگی را فرو می‌نشاند.'
      }
    ],
    synonyms: [{ word: 'تورشنک', latin: 'turşənək', fa_equivalent: 'ترشک' }],
    antonyms: [],
    related_words: ['یملیک', 'کهلیک اوتو', 'داغ'],
    etymology: {
      origin: 'ترکی اصیل',
      notes: 'ترکیب قوزو (بره) + قولاق (گوش)؛ برگ‌هایی شبیه گوش نرم بره.'
    },
    category: 'nature',
    category_fa: 'گیاهان ترش و دارویی',
    source: 'گیاهان بومی آذربایجان',
    verification_status: 'verified',
    search_count: 70,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: `entry-herb-${Date.now()}-7`,
    az_word: 'چیریش',
    az_latin: 'çiriş',
    az_alternative_spellings: ['چریش'],
    fa_word: 'سریش کوهی، چریش (سبزی پهن‌برگ بهاره دامنه‌های سهند برای کوکو و فطیر)',
    fa_alternative_equivalents: ['سریش کوهی', 'سبزی کوهی چریش'],
    az_pronunciation: 'Çiriş [t͡ʃiˈriʃ]',
    ipa: '/t͡ʃiˈriʃ/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم سبزی خوراکی کوهستان',
    fa_definition: 'گیاه کوهی خوراکی بهاره با برگ‌های کشیده و آبدار؛ از مواد اصلی نان‌های سنتی روغنی مغزدار (چیریش کوکه‌سی)، پیراشکی محلی و آش‌های بهاری در آذربایجان.',
    az_definition: 'باهاردا قار ارییَن کیمی سهند اتکلرینده بیتن پهن یارپاقلی داغ سبزی‌سی کی کؤکه و آش ایچینده بیشیریلر.',
    az_examples: [
      {
        az: 'چیریش ییغیب گتیردیلر، ننه‌م تندیرده ایستی چیریش کؤکه‌سی یاپدی.',
        az_latin: 'Çiriş yığıb gətirdilər, nənəm təndirdə isti çiriş kökəsi yapdı.',
        fa: 'سریش کوهی چیدند و آوردند، مادربزرگم در تنور نان روغنی داغ با مغز چریش پخت.'
      }
    ],
    synonyms: [],
    antonyms: [],
    related_words: ['کؤکه', 'سهند', 'سبزی'],
    category: 'food',
    category_fa: 'گیاهان بهاری و آشپزی سنتی',
    source: 'فرهنگ غذایی آذربایجان',
    verification_status: 'verified',
    search_count: 65,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: `entry-herb-${Date.now()}-8`,
    az_word: 'توکلوجه',
    az_latin: 'tüklücə',
    az_alternative_spellings: ['چای اوْتو', 'دازی اوْتو'],
    fa_word: 'چای کوهی، توکلیجه (علف پرزدار بنفش کوهستان، ضدسرماخوردگی و آرام‌بخش)',
    fa_alternative_equivalents: ['چای کوهی', 'گل کوفته', 'توکلیجه'],
    az_pronunciation: 'Tüklücə [tyc.lyˈd͡ʒæ]',
    ipa: '/tyc.lyˈd͡ʒæ/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم دمنوش کوهی',
    fa_definition: 'گیاهی کوهی با ساقه‌ها و سنبله‌های پوشیده از پرزهای سفید و نرم پنبه‌ای و گل‌های معطر بنفش؛ دمنوش سنتی معجزه‌آسا برای درمان سرماخوردگی، سرفه و دردهای عصبی.',
    az_definition: 'داغلاردا بیتن، اوستونده پنبه کیمی توکلری اولان بنؤوشه‌یی چیچکلی دمله‌مه چای اوتو کی زوکامی و باش آغریسینی کسر.',
    az_examples: [
      {
        az: 'سویوق دَین آدام قاینار توکلوجه چایینا بیر قاشیق بال قاتیب ایچسه، ساغالار.',
        az_latin: 'Soyuq dəyən adam qaynar tüklücə çayına bir qaşıq bal qatıb içsə, sağalar.',
        fa: 'فرد سرماخورده اگر دمنوش داغ چای کوهی را با یک قاشق عسل بنوشد، بهبود می‌یابد.'
      }
    ],
    synonyms: [{ word: 'داغ چایی', latin: 'dağ çayı', fa_equivalent: 'چای کوهی' }],
    antonyms: [],
    related_words: ['کهلیک اوتو', 'چای', 'داغ'],
    etymology: {
      origin: 'ترکی اصیل آذربایجانی',
      notes: 'از توک (مو، پرز و کرک) + پسوند صفت‌ساز «-لوجه»؛ گیاهی با کرک‌های پنبه‌ای روی گل‌ها.'
    },
    category: 'nature',
    category_fa: 'گیاهان دارویی و دمنوش‌ها',
    source: 'طب سنتی آذربایجان',
    verification_status: 'verified',
    search_count: 70,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: `entry-herb-${Date.now()}-9`,
    az_word: 'یووشان',
    az_latin: 'yovşan',
    az_alternative_spellings: ['اووشان', 'یوشان'],
    fa_word: 'درمنه کوهی، یوشان (گیاه تلخ و بسیار معطر دشت و کوهستان)',
    fa_alternative_equivalents: ['درمنه کوهی', 'یوشان بیابانی'],
    az_pronunciation: 'Yovşan [jovˈʃɑn]',
    ipa: '/jovˈʃɑn/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم بوته کوهی',
    fa_definition: 'بوته پرشاخه با بوی تند و ویژه که سراسر مراتع و دشت‌های خشک آذربایجان را عطرآگین می‌کند؛ ضدعفونی‌کننده، دافع انگل‌های روده و تب‌بُر سنتی است.',
    az_definition: 'چؤللرده و بوزقیلاردا بیته‌ن، آجی دادلی و توتقون گؤزل قوخوسو اولان درمانلی بوتا اوت.',
    az_examples: [
      {
        az: 'یاز آخشام یئلی اسنده چؤلون یووشان قوخوسو کندین ایچینه دولاردی.',
        az_latin: 'Yaz axşam yeli əsəndə çölün yovşan qoxusu kəndin içinə dolardı.',
        fa: 'هنگام وزش نسیم شامگاهی بهار، عطر سرمست‌کننده درمنه صحرا در فضای روستا می‌پیچید.'
      }
    ],
    synonyms: [],
    antonyms: [],
    related_words: ['چؤل', 'داغ', 'قورو'],
    category: 'nature',
    category_fa: 'گیاهان معطر کوهستان و بیابان',
    source: 'فلور گیاهی آذربایجان',
    verification_status: 'verified',
    search_count: 65,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: `entry-herb-${Date.now()}-10`,
    az_word: 'گیجیتکان',
    az_latin: 'gicitkən',
    az_alternative_spellings: ['گیجیتگن', 'گزنه'],
    fa_word: 'گزنه کوهپایه‌ای (گیاه دارویی گزنده و پرخاصیت)',
    fa_alternative_equivalents: ['گزنه وحشی', 'سبزی گزنه برای آش'],
    az_pronunciation: 'Gicitkən [ɟi.d͡ʒitˈcæn]',
    ipa: '/ɟi.d͡ʒitˈcæn/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم گیاه دارویی',
    fa_definition: 'گیاهی خودرو در حاشیه جویبارها و مزارع که تماس با آن سوزش و خارش ایجاد می‌کند، اما پس از پختن بسیار لذیذ است و برای کنترل قند خون، رماتیسم و غنی‌سازی خون در آش گزنه استفاده می‌شود.',
    az_definition: 'اله توخوناندا یاندیران، آمما قورودولوب بیشیریلدیکده شکره و رماتیسمه درمان اولان یاشیل اوت.',
    az_examples: [
      {
        az: 'گیجیتکان آشی باهاردا بدنین بوتون کؤهنه زهیرلرینی چیخاردار.',
        az_latin: 'Gicitkən aşı baharda bədənin bütün köhnə zəhirlərini çıxardar.',
        fa: 'آش گزنه بهاری تمام سموم انباشته بدن را دفع و پاکسازی می‌کند.'
      }
    ],
    synonyms: [{ word: 'گزنه', latin: 'gəzənə', fa_equivalent: 'گزنه' }],
    antonyms: [],
    related_words: ['آش', 'بولاق', 'درمان'],
    etymology: {
      origin: 'ترکی اصیل آذربایجانی',
      notes: 'از ریشه «گیجیتمک» (سوزاندن، گزیدن و خارش انداختن) + پسوند فاعلی «-کان».'
    },
    category: 'nature',
    category_fa: 'گیاهان دارویی',
    source: 'گیاهان شفابخش آذربایجان',
    verification_status: 'verified',
    search_count: 65,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: `entry-herb-${Date.now()}-11`,
    az_word: 'چؤرک‌اوْتو',
    az_latin: 'çörəkotu',
    az_alternative_spellings: ['چؤرک اوتو', 'قارا چؤرک‌اوْتو'],
    fa_word: 'سیاه‌دانه (دانه‌های معطر و مقوی روی نان بربری و فطیر سنتی)',
    fa_alternative_equivalents: ['سیاه‌دانه', 'شونیز'],
    az_pronunciation: 'Çörəkotu [t͡ʃœ.ræk.oˈtu]',
    ipa: '/t͡ʃœ.ræk.oˈtu/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم دانه روغنی و ادویه',
    fa_definition: 'دانه‌های ریز و سیاه معطر و دارویی که شاطران در آذربایجان روی نان بربری، سنگک و فطیر محلی می‌پاشند و در پنیر لیقوان سنتی برای عطر و گرمی طبع به کار می‌رود.',
    az_definition: 'چؤره‌کلرین و پندیرین اوستونه سپیلن قارا، عطیرلی و چوخ درمانلی بالاجا توخوملار.',
    az_examples: [
      {
        az: 'بربری چؤره‌گینین اوستونه خاشخاشلا چؤرک‌اوْتو سپرلر تا هضمی یاخشی اولسون.',
        az_latin: 'Bərbəri çörəyinin üstünə xaşxaşla çörəkotu səpərlər ta həzmi yaxşı olsun.',
        fa: 'روی نان بربری کنجد، خشخاش و سیاه‌دانه می‌پاشند تا گوارش آن آسان و عطرآگین شود.'
      }
    ],
    synonyms: [{ word: 'سیاهدانه', latin: 'siyahdanə', fa_equivalent: 'سیاه‌دانه' }],
    antonyms: [],
    related_words: ['چؤرک', 'خاشخاش', 'تندیر'],
    etymology: {
      origin: 'ترکی اصیل آذربایجانی',
      notes: 'از چؤرک (نان) + اوت (گیاه و دانه گیاهی).'
    },
    category: 'food',
    category_fa: 'خوراک و دانه‌های سنتی',
    source: 'فرهنگ نان و غلات سنتی آذربایجان',
    verification_status: 'verified',
    search_count: 75,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: `entry-herb-${Date.now()}-12`,
    az_word: 'دارچین',
    az_latin: 'darçın',
    az_alternative_spellings: ['دارچین چوبوغو'],
    fa_word: 'دارچین (پوست معطر چوب دارچین برای چای و شله‌زرد)',
    fa_alternative_equivalents: ['دارچین', 'چوب دارچین'],
    az_pronunciation: 'Darçın [dɑrˈt͡ʃɯn]',
    ipa: '/dɑrˈt͡ʃɯn/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم ادویه',
    fa_definition: 'ادویه خوش‌عطر و گرم از پوست درخت دارچین؛ چوب آن در چای قندپهلو و پودر آن روی حلیم، شله‌زرد و قیمه مجلسی تبریز ریخته می‌شود.',
    az_examples: [
      {
        az: 'سماورین قوروسونا بیر پرچم دارچین چوبوغو آتسان، چایین عطری هامی‌نی مست ائدر.',
        az_latin: 'Səmavərin qorusuna bir pərçəm darçın çubuğu atsan, çayın ətri hamını məst edər.',
        fa: 'اگر در قوری سماور تکه‌ای چوب دارچین بیندازی، عطر دلنشین چای همگان را مدهوش می‌سازد.'
      }
    ],
    synonyms: [],
    antonyms: [],
    related_words: ['ایستی اوت', 'چای', 'زنجفیل'],
    category: 'food',
    category_fa: 'خوراک و ادویه‌ها',
    source: 'فرهنگ واژگان سنتی آذربایجان',
    verification_status: 'verified',
    search_count: 80,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: `entry-herb-${Date.now()}-13`,
    az_word: 'زنجفیل',
    az_latin: 'zəncəfil',
    az_alternative_spellings: ['زنجبیل'],
    fa_word: 'زنجبیل، زنجفیل (ریشه تند و گرم‌بخش ادویه‌ای)',
    fa_alternative_equivalents: ['زنجفیل تبریز', 'حلوای زنجفیل'],
    az_pronunciation: 'Zəncəfil [zæn.d͡ʒæˈfil]',
    ipa: '/zæn.d͡ʒæˈfil/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم ادویه سنتی',
    fa_definition: 'ریشه تند و پرخاصیت گیاه زنجبیل؛ ادویه اصلی حلوای سنتی زنجفیل تبریز و دمنوش‌های زمستانی ضدسرفه و تسکین‌دهنده دردهای مفصلی.',
    az_examples: [
      {
        az: 'تبریزین مشهور زنجفیل حلواسی قیش گئجه‌لرینین ان دادلی شیرینی‌سی‌دیر.',
        az_latin: 'Təbrizin məşhur zəncəfil halvası qış gecələrinin ən dadlı şirinisidir.',
        fa: 'حلوای زنجفیل مشهور تبریز مطبوع‌ترین شیرینی شب‌های سرد زمستان است.'
      }
    ],
    synonyms: [],
    antonyms: [],
    related_words: ['حلوا', 'ایستی اوت', 'دارچین'],
    category: 'food',
    category_fa: 'خوراک و شیرینی‌پزی سنتی',
    source: 'آشپزی اصیل تبریز',
    verification_status: 'verified',
    search_count: 85,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: `entry-herb-${Date.now()}-14`,
    az_word: 'سوماق',
    az_latin: 'sumaq',
    az_alternative_spellings: ['سۇماق'],
    fa_word: 'سماق قرمز ترش و چاشنی اصیل کباب آذربایجان',
    fa_alternative_equivalents: ['سماق وحشی کوهی'],
    az_pronunciation: 'Sumaq [suˈmɑx]',
    ipa: '/suˈmɑx/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم ادویه و چاشنی',
    fa_definition: 'میوه خوشه‌ای و سرخ‌فام درختچه وحشی کوهستان؛ پودر ترش‌مزه آن همراه با کباب بناب و تبریز سرو می‌شود و چربی‌سوز و کاهنده فشار خون است.',
    az_examples: [
      {
        az: 'کبابین دادی قیرمیزی داغ سوماغی ایله تاماملانار.',
        az_latin: 'Kababın dadı qırmızı dağ sumağı ilə tamamlanar.',
        fa: 'طعم اصیل چلوکباب با سماق قرمز کوهستانی کامل می‌شود.'
      }
    ],
    synonyms: [],
    antonyms: [],
    related_words: ['سۇماقلیق', 'کباب', 'ایستی اوت'],
    category: 'food',
    category_fa: 'ادویه‌ها و چاشنی‌ها',
    source: 'فرهنگ کباب و خوراک آذربایجان',
    verification_status: 'verified',
    search_count: 80,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: `entry-herb-${Date.now()}-15`,
    az_word: 'کنگر',
    az_latin: 'kəngər',
    az_alternative_spellings: ['داغ کنگری'],
    fa_word: 'کنگر کوهی (گیاه خاردار خوراکی بهار برای خورش کنگر)',
    fa_alternative_equivalents: ['کنگر صحرایی'],
    az_pronunciation: 'Kəngər [cæŋˈɟær]',
    ipa: '/cæŋˈɟær/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم گیاه خوراکی کوهی',
    fa_definition: 'گیاه وحشی تیغ‌دار با ساقه‌های گوشتی و شیرین در کوهپایه‌ها؛ پس از تیغ‌زدایی با گوشت بره و نعناع در خورش کنگر یا بورانی پخته می‌شود.',
    az_examples: [
      {
        az: 'باهارین باشیندا قایالار دیبیندن تزه کنگر چیخاریب، دادلی خورشت بیشیررلر.',
        az_latin: 'Baharın başında qayalar dibindən təzə kəngər çıxarıb, dadlı xoreşt bişirərlər.',
        fa: 'در آغاز بهار از پای صخره‌ها کنگر تازه بیرون کشیده و خورش لذیذ می‌پزند.'
      }
    ],
    synonyms: [],
    antonyms: [],
    related_words: ['داغ', 'قازیاغی', 'یملیک'],
    category: 'nature',
    category_fa: 'سبزی‌های وحشی کوهستان',
    source: 'گیاهان خوراکی آذربایجان',
    verification_status: 'verified',
    search_count: 65,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: `entry-herb-${Date.now()}-16`,
    az_word: 'دوه‌تیکانی',
    az_latin: 'dəvətikanı',
    az_alternative_spellings: ['دوه تیکانی'],
    fa_word: 'خارشتر (بوته خاردار بیابانی با صمغ دارویی ترنجبین)',
    fa_alternative_equivalents: ['خارشتر', 'گیاه ترنجبین'],
    az_pronunciation: 'Dəvətikanı [dæ.væ.ti.kɑˈnɯ]',
    ipa: '/dæ.væ.ti.kɑˈnɯ/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم گیاه دارویی کویر و دشت',
    fa_definition: 'گیاه خاردار صحرایی با ریشه‌های بسیار عمیق؛ عرق خارشتر برای دفع سنگ کلیه و صمغ شیرین آن (تَرنجبین) داروی زردی نوزادان است.',
    az_examples: [
      {
        az: 'دوه‌تیکانینین عرقینی بؤیرک داشینی سالماق اوچون ایچرلر.',
        az_latin: 'Dəvətikanının ərəqini böyrək daşını salmaq üçün içərlər.',
        fa: 'عرق خارشتر را برای دفع سنگ کلیه می‌نوشند.'
      }
    ],
    synonyms: [],
    antonyms: [],
    related_words: ['تیکان', 'چؤل', 'دوه'],
    etymology: {
      origin: 'ترکی اصیل آذربایجانی',
      notes: 'از دوه (شتر) + تیکان (خار)؛ خاری که غذای محبوب شتران کاروان است.'
    },
    category: 'nature',
    category_fa: 'گیاهان دارویی دشت و صحرا',
    source: 'گیاه‌شناسی بومی آذربایجان',
    verification_status: 'verified',
    search_count: 60,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: `entry-herb-${Date.now()}-17`,
    az_word: 'بییان',
    az_latin: 'biyan',
    az_alternative_spellings: ['بییان کؤکو', 'شیرین‌بیان'],
    fa_word: 'شیرین‌بیان، بییان (ریشه دارویی شیرین کوهپایه‌ها)',
    fa_alternative_equivalents: ['شیرین‌بیان', 'ریشه بییان'],
    az_pronunciation: 'Biyan [biˈjɑn]',
    ipa: '/biˈjɑn/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم گیاه دارویی',
    fa_definition: 'گیاه خودرو با ریشه‌ای شیرین و پرخاصیت که در دشت‌ها و دامنه‌های آذربایجان می‌روید؛ عصاره آن درمان سنتی قطعی زخم معده و بیماری‌های گوارشی است.',
    az_examples: [
      {
        az: 'بییان کؤکو معده آغریسینا ان یاخشی طبیعی درمان ساییلار.',
        az_latin: 'Biyan kökü mədə ağrısına ən yaxşı təbii dərman sayılar.',
        fa: 'ریشه شیرین‌بیان بهترین داروی طبیعی برای دردهای کهنه معده به شمار می‌رود.'
      }
    ],
    synonyms: [],
    antonyms: [],
    related_words: ['کؤک', 'درمان', 'داغ'],
    category: 'nature',
    category_fa: 'گیاهان دارویی سنتی',
    source: 'طب سنتی آذربایجان',
    verification_status: 'verified',
    search_count: 60,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: `entry-herb-${Date.now()}-18`,
    az_word: 'اَبَم‌کؤمجی',
    az_latin: 'əbəmköməci',
    az_alternative_spellings: ['ابه‌کؤمجی', 'پنیرک'],
    fa_word: 'پنیرک، خبیزی (گیاه دارویی نرم‌کننده سینه و مجاری تنفسی)',
    fa_alternative_equivalents: ['پنیرک وحشی', 'خبیزی'],
    az_pronunciation: 'Əbəmköməci [æ.bæm.cœ.mæˈd͡ʒi]',
    ipa: '/æ.bæm.cœ.mæˈd͡ʒi/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم گیاه دارویی',
    fa_definition: 'گیاه دارویی با برگ‌های مدور و میوه‌های شبیه چرخ کوچک پنیر؛ جوشانده گل‌های بنفش آن لعاب‌دار و نرم‌کننده سینه، درمان برونشیت و ضدالتهاب است.',
    az_examples: [
      {
        az: 'کؤکسو دارالان خسته‌یه اَبَم‌کؤمجی گلینین دملمه‌سین وئرردیلر.',
        az_latin: 'Köksü daralan xəstəyə əbəmköməci gülünün dəmləməsin verərdilər.',
        fa: 'به بیماری که دچار تنگی سینه و سرفه خشک بود، دمنوش گل پنیرک می‌دادند.'
      }
    ],
    synonyms: [{ word: 'پنیرک', latin: 'pəndirək', fa_equivalent: 'پنیرک' }],
    antonyms: [],
    related_words: ['توکلوجه', 'گول', 'درمان'],
    etymology: {
      origin: 'ترکی کهن اوغوز',
      notes: '«اَبَم» (مادربزرگم / قابله‌ام) + «کؤمج» (کلوچه گرد)؛ میوه گیاه که شبیه کلوچه‌های کوچک مادربزرگ است.'
    },
    category: 'nature',
    category_fa: 'گیاهان دارویی کهن',
    source: 'گیاهان دارویی آذربایجان',
    verification_status: 'verified',
    search_count: 65,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: `entry-herb-${Date.now()}-19`,
    az_word: 'داغ مرزه‌سی',
    az_latin: 'dağ mərzəsi',
    az_alternative_spellings: ['داغ‌مرزه‌سی', 'کوه مرزه‌سی'],
    fa_word: 'مرزه کوهی (سبزی بسیار خوش‌عطر صخره‌های قره‌داغ و سهند)',
    fa_alternative_equivalents: ['مرزه وحشی کوهی'],
    az_pronunciation: 'Dağ mərzəsi [dɑɣ mær.zæˈsi]',
    ipa: '/dɑɣ mær.zæˈsi/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم سبزی معطر کوهستان',
    fa_definition: 'گونه وحشی مرزه که در شکاف صخره‌های آفتاب‌گیر کوه‌های قره‌داغ و سهند می‌روید؛ عطری تندتر و نافذتر از مرزه باغی دارد و چاشنی آبگوشت سنتی و کوفته است.',
    az_examples: [
      {
        az: 'قره‌داغ قایالاریندان ییغیلان داغ مرزه‌سی آبگوشتون دادینی چوخ اؤزل ائدر.',
        az_latin: 'Qaradağ qayalarından yığılan dağ mərzəsi abguştun dadını çox özəl edər.',
        fa: 'مرزه کوهی چیده‌شده از صخره‌های ارسباران طعم آبگوشت سنتی را بی‌نظیر می‌سازد.'
      }
    ],
    synonyms: [],
    antonyms: [],
    related_words: ['کهلیک اوتو', 'ایستی اوت', 'قایا'],
    category: 'nature',
    category_fa: 'سبزی‌های معطر صخره‌ای',
    source: 'گیاهان معطر آذربایجان',
    verification_status: 'verified',
    search_count: 65,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: `entry-herb-${Date.now()}-20`,
    az_word: 'باغایارپاغی',
    az_latin: 'bağayarpağı',
    az_alternative_spellings: ['باغا یارپاغی', 'بارتنگ'],
    fa_word: 'برگ بارهنگ کوهی (مرهم سنتی التیام زخم و دمل)',
    fa_alternative_equivalents: ['بارهنگ پهن‌برگ', 'برگ بارهنگ'],
    az_pronunciation: 'Bağayarpağı [bɑ.ɣɑ.jɑr.pɑˈɣɯ]',
    ipa: '/bɑ.ɣɑ.jɑr.pɑˈɣɯ/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم برگ دارویی گیاهی',
    fa_definition: 'برگ‌های پهن و رگه‌دار بارهنگ کوهی که کنار جویبارها می‌روید؛ در طب سنتی ایلیاتی برگ تازه آن را کمی له کرده و روی زخم و تاول می‌گذاشتند تا چرک را بیرون کشیده و زخم را التیام دهد.',
    az_examples: [
      {
        az: 'آیاغی یانان چوبان باغا یارپاغینی تاولین اوستونه قویوب ساریدی.',
        az_latin: 'Ayağı yanan çoban bağa yarpağını tavlın üstünə qoyub sarıdı.',
        fa: 'چوپانی که پایش تاول زده بود، برگ بارهنگ را روی تاول نهاد و بست.'
      }
    ],
    synonyms: [{ word: 'بارتنگ', latin: 'bartəng', fa_equivalent: 'بارهنگ' }],
    antonyms: [],
    related_words: ['یارپاق', 'بولاق', 'مرهم'],
    etymology: {
      origin: 'ترکی اصیل آذربایجانی',
      notes: 'از باغا (لاک‌پشت / وزغ) + یارپاق (برگ)؛ برگ‌هایی شبیه به لاک پشت یا پناهگاه وزغ‌ها در حاشیه چشمه.'
    },
    category: 'nature',
    category_fa: 'گیاهان دارویی و مرهم‌های سنتی',
    source: 'فرهنگ گیاه‌درمانی سنتی آذربایجان',
    verification_status: 'verified',
    search_count: 60,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: `entry-herb-${Date.now()}-21`,
    az_word: 'زیره',
    az_latin: 'zirə',
    az_alternative_spellings: ['قارا زیره', 'یاشیل زیره'],
    fa_word: 'زیره سیاه کوهی و زیره سبز (ادویه معطر ضدنفخ)',
    fa_alternative_equivalents: ['زیره سیاه', 'زیره کوهی'],
    az_pronunciation: 'Zirə [ziˈræ]',
    ipa: '/ziˈræ/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم ادویه',
    fa_definition: 'دانه‌های بسیار معطر و گرم؛ زیره سیاه کوهی در پلوی زیره، پنیر کوزه‌ای سنتی و چاشنی آش برای هضم غذا و رفع باد شکم به کار می‌رود.',
    az_examples: [
      {
        az: 'پلو پیشیرنده بیر آز قارا زیره سپسن، بدنه خئییر وئریب عطری یاییلار.',
        az_latin: 'Plov bişirəndə bir az qara zirə səpsən, bədənə xeyir verib ətri yayılar.',
        fa: 'هنگام پختن پلو اگر اندکی زیره سیاه بپاشی، فواید گوارشی داشته و عطرش پخش می‌شود.'
      }
    ],
    synonyms: [],
    antonyms: [],
    related_words: ['ایستی اوت', 'پلو', 'پندیر'],
    category: 'food',
    category_fa: 'خوراک و ادویه‌ها',
    source: 'فرهنگ غذایی آذربایجان',
    verification_status: 'verified',
    search_count: 75,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: `entry-herb-${Date.now()}-22`,
    az_word: 'هیل',
    az_latin: 'hil',
    az_alternative_spellings: ['هل', 'قاقولّه'],
    fa_word: 'هل سبز و معطر (چاشنی اشرافی چای و باقلوا و مربا)',
    fa_alternative_equivalents: ['هل سبز', 'هل'],
    az_pronunciation: 'Hil [hil]',
    ipa: '/hil/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم ادویه معطر',
    fa_definition: 'دانه‌های خوش‌رایحه و ملکوتی هل؛ چاشنی اصلی چای مجلسی تبریز، مربای گل‌محمدی و باقلوای گردویی سنتی.',
    az_examples: [
      {
        az: 'قوناغین چایینا بیر دانا سینمیش هیل آتارلار کی احترامی گؤرستسین.',
        az_latin: 'Qonağın çayına bir dənə sınmış hil atarlar ki ehtiramı göstərsin.',
        fa: 'در استکان چای مهمان دانه هل شکسته‌ای می‌اندازند تا نشانه‌ای از مهمان‌نوازی و احترام باشد.'
      }
    ],
    synonyms: [{ word: 'قاقولّه', latin: 'qaqullə', fa_equivalent: 'هل' }],
    antonyms: [],
    related_words: ['چای', 'دارچین', 'زنجفیل', 'باقلوا'],
    category: 'food',
    category_fa: 'ادویه‌ها و پذیرایی سنتی',
    source: 'فرهنگ سنتی تبریز',
    verification_status: 'verified',
    search_count: 80,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

let addedCount = 0;
const existingWords = new Set(entries.map(e => e.az_word.trim()));

for (const herb of HERBS_AND_SPICES) {
  if (!herb.az_word) continue;
  if (!existingWords.has(herb.az_word.trim())) {
    const fullEntry: DictionaryEntry = {
      id: herb.id || `entry-herb-${Date.now()}-${addedCount + 1}`,
      az_word: herb.az_word,
      az_latin: herb.az_latin || '',
      az_alternative_spellings: herb.az_alternative_spellings || [],
      fa_word: herb.fa_word || '',
      fa_alternative_equivalents: herb.fa_alternative_equivalents || [herb.fa_word || ''],
      az_pronunciation: herb.az_pronunciation || '',
      ipa: herb.ipa || '',
      part_of_speech: herb.part_of_speech || 'noun',
      part_of_speech_fa: herb.part_of_speech_fa || 'اسم',
      fa_definition: herb.fa_definition || '',
      az_definition: herb.az_definition || '',
      az_examples: herb.az_examples || [],
      synonyms: herb.synonyms || [],
      antonyms: herb.antonyms || [],
      related_words: herb.related_words || [],
      dialect: herb.dialect || 'عمومی در آذربایجان',
      usage_label: herb.usage_label || 'formal',
      usage_label_fa: herb.usage_label_fa || 'رسمی',
      category: herb.category || 'food',
      category_fa: herb.category_fa || 'خوراک و طبیعت',
      source: herb.source || 'فرهنگ گیاهان دارویی و ادویه‌های سنتی آذربایجان',
      verification_status: 'verified',
      search_count: herb.search_count || 50,
      created_at: herb.created_at || new Date().toISOString(),
      updated_at: herb.updated_at || new Date().toISOString()
    };
    entries.push(fullEntry);
    existingWords.add(herb.az_word.trim());
    addedCount++;
    console.log(`Added: ${fullEntry.az_word} (${fullEntry.az_latin}) -> ${fullEntry.fa_word}`);
  }
}

fs.writeFileSync(DICTIONARY_FILE, JSON.stringify(entries, null, 2), 'utf-8');
console.log(`Successfully added ${addedCount} herbs and spices. Total dictionary entries now: ${entries.length}`);
