import React, { useEffect, useState } from 'react';
import { Volume2, ArrowLeft, Sparkles, BookOpen, Layers, Award, Heart, CheckCircle2, Smartphone, Download, WifiOff } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { DictionaryEntry, DictionaryStats, SearchDirection } from '../types/dictionary';
import { fetchPopularWords, fetchStats } from '../services/api';
import { playPronunciation } from '../utils/audio';
import { AndroidInstallModal } from '../components/AndroidInstallModal';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface HomeViewProps {
  onSearch: (query: string, direction: SearchDirection) => void;
  onSelectWord: (wordId: string) => void;
  onNavigate: (view: string, extra?: any) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSearch, onSelectWord, onNavigate }) => {
  const [popularWords, setPopularWords] = useState<DictionaryEntry[]>([]);
  const [featuredWord, setFeaturedWord] = useState<DictionaryEntry | null>(null);
  const [stats, setStats] = useState<DictionaryStats | null>(null);
  const { isInstallable, install } = usePWAInstall();
  const [showInstallModal, setShowInstallModal] = useState<boolean>(false);

  useEffect(() => {
    fetchStats()
      .then((data) => setStats(data))
      .catch((err) => console.error('Failed to load stats:', err));

    fetchPopularWords(8)
      .then((words) => {
        setPopularWords(words);
        if (words.length > 0) {
          // Select an interesting word of the day
          const wordOfTheDay = words.find((w) => w.id === 'entry-1') || words[0];
          setFeaturedWord(wordOfTheDay);
        }
      })
      .catch((err) => console.error('Failed to load popular words:', err));
  }, []);

  const sampleKeywords = [
    { label: 'سئوگی (عشق)', q: 'سئوگی' },
    { label: 'کؤنول (دل)', q: 'کؤنول' },
    { label: 'قاپو (در)', q: 'قاپو' },
    { label: 'چؤره‌ک (نان)', q: 'چؤره‌ک' },
    { label: 'یاغیش (باران)', q: 'یاغیش' },
    { label: 'یورولمایاسان (خسته نباشی)', q: 'یورولمایاسان' },
    { label: 'آغیر اوتور، باتمان گل', q: 'آغیر اوتور، باتمان گل' },
    { label: 'کوفته تبریزی', q: 'کوفته' },
  ];

  const handleAudio = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    playPronunciation(text);
  };

  return (
    <div className="space-y-16 py-6 sm:py-10">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          فرهنگ لغت ترکی آذربایجانی (ایران) و فارسی
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          واژه‌نامه تخصصی دوطرفه با پشتیبانی از رسم‌الخط اصیل عربی-فارسی و الفبای لاتین، بررسی تفاوت‌های لهجه‌ای تبریز، ارومیه، اردبیل و زنجان، و راهنمای ریشه‌شناسی.
        </p>

        {/* Quick Stats Badge */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-teal-50 text-teal-800 border border-teal-200/80 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
            <span>بیش از {stats?.total_words?.toLocaleString('fa-IR') || '۱,۸۰۰'} مدخل اصیل و کاربردی</span>
          </div>
        </div>

        {/* Search Bar Container */}
        <div className="mt-8 max-w-2xl mx-auto">
          <SearchBar
            onSearch={onSearch}
            onSelectWord={onSelectWord}
            autoFocus={true}
            size="large"
          />

          {/* Quick Keywords */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-500">
            <span className="ml-1 text-slate-400">واژه‌های پیشنهادی:</span>
            {sampleKeywords.map((item) => (
              <button
                key={item.q}
                type="button"
                onClick={() => onSearch(item.q, 'both')}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 rounded-md border border-slate-200 transition-colors shadow-2xs"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Word of the Day (واژه روز) */}
      {featuredWord && (
        <section className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 hover:border-teal-300 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 text-xs text-teal-700 font-semibold mb-2">
                  <Award className="w-4 h-4 text-teal-600" />
                  <span>واژه برگزیده روز (گونون سؤزو)</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">{featuredWord.az_word}</h2>
                  <span className="text-base text-slate-400 font-mono tracking-tight font-az-latin">
                    {featuredWord.az_latin}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => handleAudio(e, featuredWord.az_latin || featuredWord.az_word)}
                    className="p-1.5 text-slate-400 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
                    title="پخش تلفظ صوتی"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                  <span>{featuredWord.part_of_speech_fa}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-slate-400">{featuredWord.ipa}</span>
                  <span aria-hidden="true">·</span>
                  <span>کاربرد: {featuredWord.usage_label_fa}</span>
                  <span aria-hidden="true">·</span>
                  <span>لهجه: {featuredWord.dialect || 'عمومی'}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectWord(featuredWord.id)}
                className="self-start sm:self-center px-4 py-2 bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>مشاهده مدخل کامل</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div>
                <h3 className="text-xs font-semibold text-slate-400 mb-1">معادل و معنی در فارسی</h3>
                <p className="text-base font-semibold text-slate-800 mb-2">{featuredWord.fa_word}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{featuredWord.fa_definition}</p>
              </div>

              {featuredWord.az_examples && featuredWord.az_examples.length > 0 && (
                <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-100">
                  <h3 className="text-xs font-semibold text-slate-500 mb-2">نمونه کاربرد در جمله</h3>
                  <p className="text-sm font-semibold text-slate-900 mb-1 leading-relaxed">
                    «{featuredWord.az_examples[0].az}»
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ترجمه: {featuredWord.az_examples[0].fa}
                  </p>
                </div>
              )}
            </div>

            {featuredWord.etymology && (
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <span className="font-medium text-slate-700">ریشه‌شناسی:</span>
                <span>{featuredWord.etymology.origin}</span>
                {featuredWord.etymology.root && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-teal-700">{featuredWord.etymology.root}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Explore by Subject Sections */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">دسته‌بندی‌های واژگان ترکی آذربایجانی</h2>
            <p className="text-xs text-slate-500 mt-1">مرور سازمان‌یافته بر اساس موضوعات فرهنگی، زبانی و علمی</p>
          </div>
          <button
            onClick={() => onNavigate('categories')}
            className="text-xs font-medium text-teal-700 hover:text-teal-800 flex items-center gap-1"
          >
            <span>مشاهده همه موضوعات</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { id: 'everyday', name: 'واژگان روزمره', desc: 'سلام، احوالپرسی، اشیاء و زمان', count: 'بیش از ۴۰ واژه' },
            { id: 'family', name: 'خانواده و خویشاوندی', desc: 'آنا، آتا، باجی، قارداش و روابط', count: 'واژگان اصیل' },
            { id: 'emotions', name: 'احساسات و عواطف', desc: 'سئوگی، کؤنول، سئودا و مهر', count: 'اصطلاحات عاطفی' },
            { id: 'food', name: 'خوراک و آشپزی سنتی', desc: 'کوفته تبریزی، تاوا کباب، چؤره‌ک', count: 'فرهنگ غذایی' },
            { id: 'proverbs', name: 'ضرب‌المثل‌ها (آتالار سؤزو)', desc: 'حکمت‌های مردمی و تمثیل‌ها', count: 'گنجینه امثال' },
            { id: 'verbs', name: 'افعال و افعال ترکیبی', desc: 'گلمک، گئتمک، ایسته‌مک، دئمک', count: 'ریشه‌های صرفی' },
            { id: 'nature', name: 'طبیعت و محیط‌زیست', desc: 'یاغیش، گونش، ساوالان، اولدوز', count: 'پدیده‌های طبیعی' },
            { id: 'culture', name: 'فرهنگ، هنر و آیین‌ها', desc: 'موسیقی آشیقی، شب چله، بایرام', count: 'میراث بومی' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => onNavigate('categories', { selectedCategory: cat.id })}
              className="p-4 bg-white rounded-xl border border-slate-200/90 hover:border-teal-400 hover:shadow-xs transition-all text-right group flex flex-col justify-between"
            >
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{cat.desc}</p>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-2xs text-slate-400">
                <span>{cat.count}</span>
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform text-teal-600" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Linguistic Spotlight: Iranian Azerbaijani Orthography */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2 text-teal-400 text-xs font-semibold">
              <BookOpen className="w-4 h-4" />
              <span>پژوهش و آواشناسی زبان‌شناختی</span>
            </div>
            <h2 className="text-2xl font-bold">ویژگی‌های رسم‌الخط ترکی آذربایجانی در ایران</h2>
            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
              ترکی آذربایجانی در ایران دارای ۹ مصوت (صداهای ا، اَ، اِ، ائ، او، اوْ، اؤ، ای، ایـ با صدای خفه ı) است. موتور جستجوی هوشمند سؤزلوک به گونه‌ای طراحی شده که حتی در صورت عدم درج حرکات یا اختلاف در املاهایی چون «قاپو / قاپی» یا «سئوگی / سوگی»، واژه مطلوب را بی‌درنگ شناسایی کند.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
              <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
                <span className="font-bold text-teal-300 block mb-1">مصوت‌های باز و بسته</span>
                <span className="text-slate-400">تفکیک صوتی بین «اؤ» (کؤنول) و «او» (اولدوز) و تطابق کامل با نگارش الفبایی.</span>
              </div>
              <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
                <span className="font-bold text-teal-300 block mb-1">تنوعات لهجه‌ای محلی</span>
                <span className="text-slate-400">ثبت تلفظ‌های اصیل تبریزی (چؤره‌ح، گلماخ) در کنار املای استاندارد (چؤره‌ک، گلمک).</span>
              </div>
              <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
                <span className="font-bold text-teal-300 block mb-1">جستجوی ریشه‌ای و پسوندی</span>
                <span className="text-slate-400">حذف هوشمند پسوندهای حالت، ملکی (-یم، -ین) و جمع (-لار، -لر) حین جستجو.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Android Mobile App Showcase Section */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 border border-teal-500/30 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
                <Smartphone className="w-3.5 h-3.5" />
                <span>نسخه اندروید اپلیکیشن (PWA / WebAPK)</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                «سؤزلوک» را مستقیماً روی گوشی اندروید خود نصب کنید
              </h3>
              <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
                بدون نیاز به دانلود فایل‌های سنگین یا مراجعه به گوگل‌پلی و کافه بازار؛ با یک اشاره برنامه را با آیکون اختصاصی روی صفحه گوشی داشته باشید و همیشه به صورت آفلاین از لغت‌نامه بهره‌مند شوید.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-300">
                <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  حجم فوق‌العاده سبک (&lt; ۳ مگابایت)
                </span>
                <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
                  <WifiOff className="w-3.5 h-3.5 text-emerald-400" />
                  جستجوی سریع و آفلاین
                </span>
                <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  اجرای تمام‌صفحه بدون مرورگر
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={async () => {
                  if (isInstallable) {
                    const outcome = await install();
                    if (!outcome) setShowInstallModal(true);
                  } else {
                    setShowInstallModal(true);
                  }
                }}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-bold rounded-xl transition-all shadow-lg text-sm flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap"
              >
                <Download className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                <span>نصب نسخه اندروید</span>
              </button>

              <button
                type="button"
                onClick={() => setShowInstallModal(true)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl border border-white/20 transition-colors text-xs flex items-center justify-center gap-1.5"
              >
                <Smartphone className="w-3.5 h-3.5 text-slate-300" />
                <span>راهنمای مراحل نصب</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Callout */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-linear-to-r from-teal-50 via-white to-slate-50 border border-teal-200/80 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-right">
            <div className="flex items-center gap-2 text-teal-800 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>دستیار هوشمند زبان‌شناسی سؤزلوک</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">سؤالی درباره گرامر، ریشه یا ضرب‌المثل‌های ترکی دارید؟</h3>
            <p className="text-sm text-slate-600 max-w-xl leading-relaxed">
              با استفاده از هوش مصنوعی متخصص زبان ترکی آذربایجانی ایران، ساختار جملات را تحلیل کنید، وام‌واژه‌های فارسی-ترکی را مقایسه نمایید و از ظرافت‌های معنایی مطلع شوید.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('ai-linguist')}
            className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-sm text-sm flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>گفتگو با دستیار زبانی</span>
          </button>
        </div>
      </section>

      {/* Android Install Guidance Modal */}
      <AndroidInstallModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
      />
    </div>
  );
};
