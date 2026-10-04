import { DictionaryEntry } from '../src/types/dictionary';

export const EMOTIONS_AND_TIME_ENTRIES: Partial<DictionaryEntry>[] = [
  // --- احساسات و عواطف (Emotions & Feelings) ---
  {
    az_word: 'سئوگی',
    az_latin: 'sevgi',
    az_alternative_spellings: ['سویگی', 'محبت'],
    fa_word: 'عشق، محبت، مهر عمیق قلبی، دوست داشتن',
    fa_alternative_equivalents: ['عشق', 'مهر', 'محبت'],
    az_pronunciation: 'Sevgi [sævˈɟi]',
    ipa: '/sævˈɟi/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم عاطفی',
    fa_definition: 'عالی‌ترین و پاک‌ترین حس قلبی انسان نسبت به خانواده، میهن، معشوق و انسان‌ها.',
    az_definition: 'اینسانین بیر کسه‌، وطنه و یا اینسانیته بسله‌دیگی ان یوکسک دویغو و رغبت.',
    az_examples: [
      {
        az: 'آنا سئوگیسی دونیانین ان موقدس و اؤلمز سئوگی‌سی‌دیر.',
        az_latin: 'Ana sevgisi dünyanın ən müqəddəs və ölməz sevgisidir.',
        fa: 'مهر مادری مقدس‌ترین و جاودانه‌ترین عشق جهان است.'
      }
    ],
    synonyms: [{ word: 'محبت', latin: 'məhəbbət', fa_equivalent: 'محبت' }],
    antonyms: [{ word: 'نیفرت', latin: 'nifrət', fa_equivalent: 'کینه و نفرت' }],
    related_words: ['سئومک', 'سئوگیلی', 'اورک'],
    category: 'emotions',
    category_fa: 'احساسات و عواطف'
  },
  {
    az_word: 'سئوینج',
    az_latin: 'sevinc',
    az_alternative_spellings: ['شادلیق', 'شنلیک'],
    fa_word: 'شادی، شادمانی، سرور، خوشحالی زایدالوصف',
    fa_alternative_equivalents: ['شادمانی', 'خوشحالی', 'سرور'],
    az_pronunciation: 'Sevinc [sæˈvind͡ʒ]',
    ipa: '/sæˈvind͡ʒ/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم عاطفی',
    fa_definition: 'حالت خوشایند و شادمانه روح از دیدن موفقیت، وصال یا فرا رسیدن عید و مژده نیک.',
    az_definition: 'اورگی فرحلندیرن، کؤنولو آچان خوش و شاد حالت.',
    az_examples: [
      {
        az: 'کندیمیزه یاغیش یاغاندا هامینین گؤزلرینده سئوینج پارلادی.',
        az_latin: 'Kəndimizə yağış yağanda hamının gözlərində sevinc parladı.',
        fa: 'با باریدن باران بر دهستان ما، در چشمان همگان برق شادی درخشید.'
      }
    ],
    synonyms: [{ word: 'فرح', latin: 'fərəh', fa_equivalent: 'سرور' }],
    antonyms: [{ word: 'کدر', latin: 'kədər', fa_equivalent: 'اندوه' }],
    related_words: ['سئوینمک', 'شنلیک', 'گولمک'],
    category: 'emotions',
    category_fa: 'احساسات و عواطف'
  },
  {
    az_word: 'کدر',
    az_latin: 'kədər',
    az_alternative_spellings: ['غم', 'غوصّه'],
    fa_word: 'اندوه، غم، ملال، اندوهگینی دل',
    fa_alternative_equivalents: ['اندوه', 'غم', 'ملال'],
    az_pronunciation: 'Kədər [cæˈdæɾ]',
    ipa: '/cæˈdæɾ/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم عاطفی',
    fa_definition: 'سنگینی و گرفتگی دل ناشی از فقدان عزیزان، هجران یا ناملایمات روزگار.',
    az_definition: 'ایتگی، آیریلیق و چتینلیکدن اورکده یارانان آغیر غصه و غم.',
    az_examples: [
      {
        az: 'کدرین آرتیق اولاندا دوستون صمیمی باخیشی اورگی ساکیتلشدیرر.',
        az_latin: 'Kədərin artıq olanda dostun səmimi baxışı ürəyi sakitləşdirər.',
        fa: 'هنگام فزونی اندوه، نگاه صمیمانه دوست دل را آرام می‌سازد.'
      }
    ],
    synonyms: [{ word: 'حوزن', latin: 'hüzn', fa_equivalent: 'حزن' }],
    antonyms: [{ word: 'سئوینج', latin: 'sevinc', fa_equivalent: 'شادی' }],
    related_words: ['کدرلنمک', 'آغلاماق', 'اورک'],
    category: 'emotions',
    category_fa: 'احساسات و عواطف'
  },
  {
    az_word: 'قورخو',
    az_latin: 'qorxu',
    az_alternative_spellings: ['هراس', 'واهیمه'],
    fa_word: 'ترس، بیم، هراس، وحشت',
    fa_alternative_equivalents: ['ترس', 'بیم', 'هراس'],
    az_pronunciation: 'Qorxu [gorˈxu]',
    ipa: '/gorˈxu/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم عاطفی',
    fa_definition: 'احساس ناامنی و اضطراب ناشی از خطر احتمالی یا ناشناخته.',
    az_definition: 'تهلوکه‌دن و خطردن اینساندا یارانان ایچسل چکینمه حیسّی.',
    az_examples: [
      {
        az: 'قورددان قورخان قویون ساخلاماز.',
        az_latin: 'Qurddan qorxan qoyun saxlamaz.',
        fa: 'آنکه از گرگ بهراسد، گله‌داری نمی‌کند (ضرب‌المثل).'
      }
    ],
    synonyms: [{ word: 'هول', latin: 'hvl', fa_equivalent: 'وحشت' }],
    antonyms: [{ word: 'جسارت', latin: 'cəsarət', fa_equivalent: 'شجاعت' }],
    related_words: ['قورخماق', 'قورخاق', 'اورک'],
    category: 'emotions',
    category_fa: 'احساسات و عواطف'
  },
  {
    az_word: 'اوتانماق',
    az_latin: 'utanmaq',
    az_alternative_spellings: ['شرم ائتمک', 'خیجالت چکمک'],
    fa_word: 'شرم کردن، خجالت کشیدن، حیا ورزیدن',
    fa_alternative_equivalents: ['خجالت کشیدن', 'حیا کردن'],
    az_pronunciation: 'Utanmaq [u.tɑnˈmɑq]',
    ipa: '/u.tɑnˈmɑq/',
    part_of_speech: 'verb',
    part_of_speech_fa: 'فعل عاطفی',
    fa_definition: 'احساس حیا و شرمندگی از خطای خود یا در حضور بزرگان و میهمانان.',
    az_definition: 'حیا و عیفتدن دولایی اوزونین قیزارماسی و چکینمک.',
    az_examples: [
      {
        az: 'اوتانما، سؤزونو آچیق و اورکدن دئ کی بیله‌ک نه ایسته‌ییرسن.',
        az_latin: 'Utanma, sözünü açıq və ürəkdən de ki bilək nə istəyirsən.',
        fa: 'خجالت نکش، سخنت را آشکار و از صمیم قلب بگو تا بدانیم چه می‌خواهی.'
      }
    ],
    synonyms: [{ word: 'حیا ائتمک', latin: 'həya etmək', fa_equivalent: 'شرم داشتن' }],
    antonyms: [{ word: 'حیاتسیزلاشماق', latin: 'həyasızlaşmaq', fa_equivalent: 'بی‌حیا شدن' }],
    related_words: ['اوتانجاق', 'حیا', 'شرم'],
    category: 'emotions',
    category_fa: 'احساسات و اخلاق'
  },
  {
    az_word: 'نیگرانچیلیق',
    az_latin: 'nigarançılıq',
    az_alternative_spellings: ['دلوواپسی', 'اضطراب'],
    fa_word: 'نگرانی، دلواپسی، چشم‌انتظاری پردلهره',
    fa_alternative_equivalents: ['دلواپسی', 'اضطراب'],
    az_pronunciation: 'Nigarançılıq [ni.gɑ.rɑn.t͡ʃɯˈlɯx]',
    ipa: '/ni.gɑ.rɑn.t͡ʃɯˈlɯx/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم عاطفی',
    fa_definition: 'تشویش خاطر مادران و عزیزان نسبت به مسافر غریب یا فرزند.',
    az_definition: 'مسافرین و یا عزیزین احوالیندان خبرسیز قالاندا اورکده اولان تشویش.',
    az_examples: [
      {
        az: 'تئلئفون ائله‌ییب آنامین نیگرانچیلیغینا سون قویدوم.',
        az_latin: 'Telefon eyləyib anamın nigarançılığına son qoydum.',
        fa: 'تلفن زدم و به نگرانی و دلواپسی مادرم پایان دادم.'
      }
    ],
    synonyms: [{ word: 'تشویش', latin: 'təşviş', fa_equivalent: 'تشویش' }],
    antonyms: [{ word: 'آرامیلیق', latin: 'aramlıq', fa_equivalent: 'آرامش' }],
    related_words: ['نیگران', 'اورک', 'آنا'],
    category: 'emotions',
    category_fa: 'احساسات و عواطف'
  },
  {
    az_word: 'اومود',
    az_latin: 'umud',
    az_alternative_spellings: ['امید'],
    fa_word: 'امید، رجا، چشم‌داشت نیک به فردا',
    fa_alternative_equivalents: ['امید', 'دلگرمی'],
    az_pronunciation: 'Umud [uˈmud]',
    ipa: '/uˈmud/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم عاطفی',
    fa_definition: 'نوری در دل انسان که انگیزه تلاش و شکیبایی در برابر سختی‌هاست.',
    az_definition: 'گله‌جکده ایشلرین یاخشی اولاجاغینا اینام و کؤنول ایسیلیگی.',
    az_examples: [
      {
        az: 'اومود اینسانین ان بؤیوک سیلاحی و یاشاماق سندی‌دیر.',
        az_latin: 'Umud insanın ən böyük silahı və yaşamaq sənədidir.',
        fa: 'امید بزرگ‌ترین سلاح انسان و انگیزه زنده بودن است.'
      }
    ],
    synonyms: [{ word: 'رجا', latin: 'rəca', fa_equivalent: 'امیدواری' }],
    antonyms: [{ word: 'اومودسوزلوق', latin: 'umudsuzluq', fa_equivalent: 'ناامیدی' }],
    related_words: ['اومودلو', 'اینام', 'سحر'],
    category: 'emotions',
    category_fa: 'احساسات و امید'
  },

  // --- روزها، ماه‌ها، فصل‌ها، زمان (Days, Seasons, Time) ---
  {
    az_word: 'یاز',
    az_latin: 'yaz',
    az_alternative_spellings: ['باهار'],
    fa_word: 'بهار (نخستین فصل سال)، بهاران دلپذیر',
    fa_alternative_equivalents: ['بهار', 'فصل گل و سنبل'],
    az_pronunciation: 'Yaz [jɑz]',
    ipa: '/jɑz/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم زمان / فصل',
    fa_definition: 'فصل رویش طبیعت، آب شدن برف‌ها، سر برآوردن قارچیچگی و نوروزگولو.',
    az_definition: 'ایلین ایلک فصلی کی هاوا ایستی‌لنر و داغ-داش یاشیللیغا بورونر.',
    az_examples: [
      {
        az: 'یاز گلنده کندین باغلاری چیچک آچار، بولاقلار جوشار.',
        az_latin: 'Yaz gələndə kəndin bağları çiçək açar, bulaqlar coşar.',
        fa: 'با فرارسیدن بهار، باغات روستا شکوفه می‌زنند و چشمه‌ها به جوش می‌آیند.'
      }
    ],
    synonyms: [{ word: 'باهار', latin: 'bahar', fa_equivalent: 'بهار' }],
    antonyms: [{ word: 'پاییز', latin: 'payız', fa_equivalent: 'پاییز' }],
    related_words: ['نوروز', 'چیچکلنمک', 'یای'],
    category: 'time',
    category_fa: 'فصول و تقویم'
  },
  {
    az_word: 'یای',
    az_latin: 'yay',
    az_alternative_spellings: ['یای فصلی'],
    fa_word: 'تابستان (فصل گرما و درو و چیدن میوه‌ها)',
    fa_alternative_equivalents: ['تابستان', 'موسم درو'],
    az_pronunciation: 'Yay [jɑj]',
    ipa: '/jɑj/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم زمان / فصل',
    fa_definition: 'گرم‌ترین فصل سال، زمان کوچ ایلیاتی به یایلاق، خرمن‌کوبی و برداشت غلات.',
    az_definition: 'ایلین ایکینجی و ان ایستی فصلی کی بوغدا بیچینی و یایلاغا گئتمک واختی‌دیر.',
    az_examples: [
      {
        az: 'یایین ایستی‌سینده سهندین سرین یایلاغی جان دَرمانی‌دیر.',
        az_latin: 'Yayın istisində Səhəndin sərin yaylağı can dərmanıdır.',
        fa: 'در گرمای تابستان، ییلاق خنک سهند داروی جان و آرامش دل است.'
      }
    ],
    synonyms: [],
    antonyms: [{ word: 'قیش', latin: 'qış', fa_equivalent: 'زمستان' }],
    related_words: ['یایلاق', 'بیچین', 'خرمن'],
    category: 'time',
    category_fa: 'فصول و تقویم'
  },
  {
    az_word: 'پاییز',
    az_latin: 'payız',
    az_alternative_spellings: ['خزان'],
    fa_word: 'پاییز، خزان، موسم زرد شدن برگ‌ها و دوشاب‌پزان',
    fa_alternative_equivalents: ['پاییز', 'خزان'],
    az_pronunciation: 'Payız [pɑˈjɯz]',
    ipa: '/pɑˈjɯz/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم زمان / فصل',
    fa_definition: 'سومین فصل سال، هنگام انگورچینی، خنک شدن هوا و وزش بادهای سازاق.',
    az_definition: 'ایلین اوچونجو فصلی کی یارپاقلار سارالار، هاوا سازاقلاشار و محصول ییغیلار.',
    az_examples: [
      {
        az: 'کت-کؤشنین پاییزلاری، یازلاری / گدیکلرین سازاخ چالان سازلاری.',
        az_latin: 'Kənd-köşənin payızları, yazları / Gədiklərin sazaq çalan sazları.',
        fa: 'خزان‌ها و بهاران روستا و کشتزارانش، و نغمه‌های باد سرد در گردنه‌های کوهستان (شهریار).'
      }
    ],
    synonyms: [{ word: 'خزان', latin: 'xəzan', fa_equivalent: 'خزان' }],
    antonyms: [{ word: 'یاز', latin: 'yaz', fa_equivalent: 'بهار' }],
    related_words: ['سازاق', 'دوشاب', 'سولماق'],
    category: 'time',
    category_fa: 'فصول و تقویم'
  },
  {
    az_word: 'قیش',
    az_latin: 'qış',
    az_alternative_spellings: ['قێش'],
    fa_word: 'زمستان (فصل سرما و برف و کرسی)',
    fa_alternative_equivalents: ['زمستان', 'چله'],
    az_pronunciation: 'Qış [gɯʃ]',
    ipa: '/gɯʃ/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم زمان / فصل',
    fa_definition: 'چهارمین فصل سال با سرمای استخوان‌سوز، بارش برف‌های سنگین و شب‌نشینی‌های گرم پای کرسی.',
    az_definition: 'ایلین سونونجو و ان سویوق فصلی کی قار و کولک باسیلار و کورسی قورولار.',
    az_examples: [
      {
        az: 'قیش گئجه‌سی طؤوله‌لرین اوتاغی، کندلیلرین اوتورماغی، چیراغی.',
        az_latin: 'Qış gecəsi tövlələrin otağı, kəndlilərin oturmağı, çırağı.',
        fa: 'شب‌های برفی زمستان و گرمای اتاق طویله، حلقه زدن دهقانان و روشنایی چراغ (شهریار).'
      }
    ],
    synonyms: [],
    antonyms: [{ word: 'یای', latin: 'yay', fa_equivalent: 'تابستان' }],
    related_words: ['بوران', 'کولک', 'کرسی', 'چیله'],
    category: 'time',
    category_fa: 'فصول و تقویم'
  },
  {
    az_word: 'دان یئری',
    az_latin: 'dan yeri',
    az_alternative_spellings: ['دان سؤکولنده'],
    fa_word: 'سپیده‌دم، فلق، افق سحرگاهی پیش از طلوع آفتاب',
    fa_alternative_equivalents: ['سپیده‌دم', 'فلق'],
    az_pronunciation: 'Dan yeri [dɑn jæˈri]',
    ipa: '/dɑn jæˈri/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم زمان',
    fa_definition: 'هنگام شکافتن سپیده و روشن شدن آسمان در افق خاور.',
    az_definition: 'گونش چیخمامیشدان قاباق گؤی اوزونون آغاردیغی ایلک سحر واقتی.',
    az_examples: [
      {
        az: 'دان یئری سؤکولنده ناخیرچی داواری داغ دؤشونه سورردی.',
        az_latin: 'Dan yeri söküləndə naxırçı davarı dağ döşünə sürərdi.',
        fa: 'چون سپیده دم می‌شکافت، گاوبان رمه را به دامنه کوه می‌راند.'
      }
    ],
    synonyms: [{ word: 'فلق', latin: 'fələq', fa_equivalent: 'فلق' }],
    antonyms: [{ word: 'آخشام چاغی', latin: 'axşam çağı', fa_equivalent: 'شامگاه' }],
    related_words: ['سحر', 'گون چیخان', 'خوروز بانی'],
    category: 'time',
    category_fa: 'زمان و اوقات شبانه‌روز'
  },
  {
    az_word: 'گونورتا',
    az_latin: 'günorta',
    az_alternative_spellings: ['گون اورتا'],
    fa_word: 'ظهر، نیمروز، هنگام استراحت و اذان ظهر',
    fa_alternative_equivalents: ['ظهر', 'نیمروز'],
    az_pronunciation: 'Günorta [ɟyn.oɾˈtɑ]',
    ipa: '/ɟyn.oɾˈtɑ/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم زمان',
    fa_definition: 'میانه روز زمانی که خورشید در بالاترین نقطه آسمان قرار دارد.',
    az_definition: 'گونون یاریسی، ساعات اون ایکی چاغی کی گونش تام تپه‌ده اولار.',
    az_examples: [
      {
        az: 'گونورتا چاغی دروچولر کؤلگه‌ده اوتوروب آیریلی چؤرک یئردیلر.',
        az_latin: 'Günorta çağı dərvəçilər kölgədə oturub ayranlı çörək yeyərdilər.',
        fa: 'هنگام ظهر، دروگران در سایه‌سار درخت نشسته و نان و دوغ می‌خوردند.'
      }
    ],
    synonyms: [{ word: 'ظهر', latin: 'zöhr', fa_equivalent: 'ظهر' }],
    antonyms: [{ word: 'یاریم گئجه', latin: 'yarım gecə', fa_equivalent: 'نیمه‌شب' }],
    related_words: ['گون', 'سحر', 'آخشام'],
    category: 'time',
    category_fa: 'زمان و اوقات شبانه‌روز'
  },
  {
    az_word: 'آخشام چاغی',
    az_latin: 'axşam çağı',
    az_alternative_spellings: ['آخشام', 'گون باتاندا'],
    fa_word: 'شامگاهان، غروب آفتاب، سر شب',
    fa_alternative_equivalents: ['غروب', 'شامگاه'],
    az_pronunciation: 'Axşam çağı [ɑxˈʃɑm t͡ʃɑˈɣɯ]',
    ipa: '/ɑxˈʃɑm t͡ʃɑˈɣɯ/',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم زمان',
    fa_definition: 'هنگام فرو نشستن خورشید در مغرب و بازگشت رمه‌ها به خانه.',
    az_definition: 'گونش باتان زامان و گئجه‌نین قاپینی دؤیدوگو واخت.',
    az_examples: [
      {
        az: 'کندین گونو باتاندا اوشاقلارین شامین یئیوب یاتاردیلار.',
        az_latin: 'Kəndin günü batanda uşaqların şamın yeyüb yatardılar.',
        fa: 'چون آفتاب ده غروب می‌کرد، کودکان شامشان را خورده و می‌آرامیدند (شهریار).'
      }
    ],
    synonyms: [{ word: 'قاش قارالان', latin: 'qaş qaralan', fa_equivalent: 'گرگ و میش غروب' }],
    antonyms: [{ word: 'سحر تئزدن', latin: 'səhər tezdən', fa_equivalent: 'صبح زود' }],
    related_words: ['گون باتار', 'گئجه', 'شام'],
    category: 'time',
    category_fa: 'زمان و اوقات شبانه‌روز'
  },
  {
    az_word: 'سیراغابیرگون',
    az_latin: 'sırağabirgün',
    az_alternative_spellings: ['سیراغا گون'],
    fa_word: 'پریروز، دو روز قبل',
    fa_alternative_equivalents: ['پریروز', 'دو روز پیش'],
    az_pronunciation: 'Sırağabirgün [sɯ.rɑ.ɣɑ.biɾˈɟyn]',
    ipa: '/sɯ.rɑ.ɣɑ.biɾˈɟyn/',
    part_of_speech: 'adverb',
    part_of_speech_fa: 'قید زمان',
    fa_definition: 'روز پیش از دیروز.',
    az_definition: 'دونندن قاباقکی گون.',
    az_examples: [
      {
        az: 'سیراغابیرگون شهردن قوناغیمیز گلدی و بیزه شادلیق گتیردی.',
        az_latin: 'Sırağabirgün şəhərdən qonağımız gəldi və bizə şadlıq gətirdi.',
        fa: 'پریروز میهمانمان از شهر آمد و برایمان شادمانی آورد.'
      }
    ],
    synonyms: [],
    antonyms: [{ word: 'بیریسی گون', latin: 'birisi gün', fa_equivalent: 'پس‌فردا' }],
    related_words: ['دونن', 'بو گون', 'صاباح'],
    category: 'time',
    category_fa: 'قیدهای زمان'
  },
  {
    az_word: 'بیریسی گون',
    az_latin: 'birisi gün',
    az_alternative_spellings: ['بیریس گون'],
    fa_word: 'پس‌فردا، دو روز بعد',
    fa_alternative_equivalents: ['پس‌فردا', 'دو روز دیگر'],
    az_pronunciation: 'Birisi gün [bi.riˈsi ɟyn]',
    ipa: '/bi.riˈsi ɟyn/',
    part_of_speech: 'adverb',
    part_of_speech_fa: 'قید زمان',
    fa_definition: 'روز پس از فردا.',
    az_definition: 'صاباحسی گوندن سونرا گلن گون.',
    az_examples: [
      {
        az: 'بیریسی گون کندین بازاری قورولاجاق، اورایا گئده‌ریک.',
        az_latin: 'Birisi gün kəndin bazarı qurulacaq, oraya gedərik.',
        fa: 'پس‌فردا بازار هفتگی روستا برپا خواهد شد و به آنجا خواهیم رفت.'
      }
    ],
    synonyms: [],
    antonyms: [{ word: 'سیراغابیرگون', latin: 'sırağabirgün', fa_equivalent: 'پریروز' }],
    related_words: ['صاباح', 'بو گون'],
    category: 'time',
    category_fa: 'قیدهای زمان'
  }
];
