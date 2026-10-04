import React, { useEffect, useState } from 'react';
import { Volume2, Bookmark, ArrowRight, Sparkles, BookOpen, Share2, Check, ExternalLink, HelpCircle } from 'lucide-react';
import { DictionaryEntry } from '../types/dictionary';
import { fetchEntryById } from '../services/api';
import { playPronunciation } from '../utils/audio';

interface EntryDetailViewProps {
  wordId: string;
  onBack: () => void;
  onSelectWord: (wordId: string) => void;
  onSearchWord: (query: string) => void;
  onNavigateAiLinguist: (wordContext: DictionaryEntry) => void;
  isBookmarked: boolean;
  onToggleBookmark: (wordId: string) => void;
}

export const EntryDetailView: React.FC<EntryDetailViewProps> = ({
  wordId,
  onBack,
  onSelectWord,
  onSearchWord,
  onNavigateAiLinguist,
  isBookmarked,
  onToggleBookmark
}) => {
  const [entry, setEntry] = useState<DictionaryEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchEntryById(wordId)
      .then((data) => setEntry(data))
      .catch((err) => console.error('Failed to load entry:', err))
      .finally(() => setLoading(false));
  }, [wordId]);

  const handleAudio = () => {
    if (entry) {
      playPronunciation(entry.az_latin || entry.az_word);
    }
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="inline-block w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-3 text-xs text-slate-500 font-medium">در حال بارگذاری مدخل واژه‌نامه...</p>
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-base text-slate-800 font-semibold">مدخل مورد نظر در لغت‌نامه یافت نشد.</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors inline-flex items-center gap-2"
        >
          <ArrowRight className="w-4 h-4" />
          <span>بازگشت به جستجو</span>
        </button>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Navigation & Action Row */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-teal-800 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>بازگشت به فهرست نتایج</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
            title="کپی پیوند این مدخل"
          >
            {copied ? <Check className="w-4 h-4 text-teal-600" /> : <Share2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? 'پیوند کپی شد' : 'اشتراک‌گذاری'}</span>
          </button>

          <button
            onClick={() => onToggleBookmark(entry.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
              isBookmarked
                ? 'bg-teal-50 text-teal-800 font-semibold'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            <span>{isBookmarked ? 'نشان شده' : 'افزودن به نشان‌ها'}</span>
          </button>
        </div>
      </div>

      {/* Main Headword Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                {entry.az_word}
              </h1>
              <span className="text-xl sm:text-2xl font-mono text-slate-400 font-az-latin tracking-tight">
                {entry.az_latin}
              </span>
              <button
                type="button"
                onClick={handleAudio}
                className="p-2 bg-teal-50 text-teal-700 hover:bg-teal-100 rounded-xl transition-colors shrink-0"
                title="پخش تلفظ صوتی"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Pronunciation & IPA & Verification */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="text-teal-800 font-semibold">{entry.part_of_speech_fa}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-slate-500">آوانویسی: {entry.az_pronunciation}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-slate-500">IPA: {entry.ipa}</span>
              <span aria-hidden="true">·</span>
              <span>{entry.category_fa}</span>
              {entry.verification_status === 'verified' && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-700 font-medium">مدخل تأییدشده</span>
                </>
              )}
            </div>
          </div>

          {/* Quick AI consultation button */}
          <button
            onClick={() => onNavigateAiLinguist(entry)}
            className="self-start sm:self-center px-4 py-2 bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-semibold rounded-xl transition-colors flex items-center gap-2 border border-teal-200/70"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>مشورت با دستیار هوش مصنوعی</span>
          </button>
        </div>

        {/* Alternative Spellings in Iranian Azerbaijani */}
        {entry.az_alternative_spellings && entry.az_alternative_spellings.length > 0 && (
          <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600">
            <span className="font-semibold text-slate-700">املاهای متداول در ایران:</span>
            <div className="flex items-center gap-2 flex-wrap">
              {entry.az_alternative_spellings.map((spelling, idx) => (
                <span key={idx} className="bg-slate-100 px-2 py-0.5 rounded-md text-slate-800 font-medium">
                  {spelling}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Persian Equivalent & Definition */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-4">
        <div>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            معادل‌های اصلی در زبان فارسی
          </h2>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            {entry.fa_word}
          </p>
          {entry.fa_alternative_equivalents && entry.fa_alternative_equivalents.length > 1 && (
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-600">
              <span className="text-slate-400">سایر برابرهای فارسی:</span>
              <span>{entry.fa_alternative_equivalents.join(' · ')}</span>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-slate-100">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            تعریف و شرح لغوی به فارسی
          </h3>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-fa">
            {entry.fa_definition}
          </p>
        </div>

        {/* Azerbaijani Definition if available */}
        {entry.az_definition && (
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              آذربایجان تورکجه‌سینده آچیقلاما
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {entry.az_definition}
            </p>
          </div>
        )}
      </section>

      {/* Examples in Azerbaijani with Persian Translations */}
      {entry.az_examples && entry.az_examples.length > 0 && (
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-teal-600" />
            <span>شواهد و نمونه‌های کاربردی در جمله</span>
          </h2>

          <div className="space-y-4 divide-y divide-slate-100">
            {entry.az_examples.map((ex, idx) => (
              <div key={idx} className={`${idx > 0 ? 'pt-4' : ''} space-y-2`}>
                <div className="flex items-start justify-between gap-3">
                  <p className="text-base font-bold text-slate-900 leading-relaxed">
                    «{ex.az}»
                  </p>
                  {ex.az_latin && (
                    <button
                      type="button"
                      onClick={() => playPronunciation(ex.az_latin || ex.az)}
                      className="p-1 text-slate-400 hover:text-teal-700 shrink-0"
                      title="پخش صوت جمله"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {ex.az_latin && (
                  <p className="text-xs text-slate-400 font-mono font-az-latin">
                    {ex.az_latin}
                  </p>
                )}

                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="font-semibold text-slate-500">ترجمه فارسی:</span>
                  <span>{ex.fa}</span>
                  {ex.context && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-teal-700 text-2xs">({ex.context})</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Linguistic Notes: Etymology, Dialects, Usage */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Etymology */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>ریشه‌شناسی و پیشینه تاریخی</span>
          </h3>
          {entry.etymology ? (
            <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">خاستگاه:</span>
                <span className="text-teal-800 font-medium">{entry.etymology.origin}</span>
              </div>
              {entry.etymology.root && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700">ریشه بازسازی‌شده:</span>
                  <span className="font-mono text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                    {entry.etymology.root}
                  </span>
                </div>
              )}
              {entry.etymology.notes && (
                <p className="text-slate-600 pt-1 border-t border-slate-100">
                  {entry.etymology.notes}
                </p>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-400">اطلاعات ریشه‌شناختی مستند ثبت نشده است.</p>
          )}
        </div>

        {/* Dialectal & Usage Variations */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>تنوعات گویشی و سبک کاربرد</span>
          </h3>
          <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">گستره جغرافیایی در ایران:</span>
              <span className="text-slate-800">{entry.dialect || 'سرتاسر آذربایجان ایران (عمومی)'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">سطح کاربرد زبانی:</span>
              <span className="text-slate-800">{entry.usage_label_fa}</span>
            </div>
            {entry.source && (
              <div className="flex items-center gap-2 pt-1 border-t border-slate-100 text-2xs text-slate-500">
                <span className="font-semibold text-slate-600">منبع استناد:</span>
                <span>{entry.source}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lexical Relationships: Synonyms, Antonyms, Related Words */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-5">
        <h2 className="text-base font-bold text-slate-900">روابط واژگانی و همنشین‌ها</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          {/* Synonyms */}
          <div>
            <h3 className="font-bold text-slate-700 mb-2">مترادف‌ها (سینونیم‌لر)</h3>
            {entry.synonyms && entry.synonyms.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {entry.synonyms.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSearchWord(s.word)}
                    className="px-2.5 py-1 bg-slate-50 hover:bg-teal-50 hover:text-teal-800 border border-slate-200 rounded-lg text-slate-700 transition-colors"
                  >
                    <span>{s.word}</span>
                    {s.fa_equivalent && <span className="text-slate-400 text-2xs mr-1">({s.fa_equivalent})</span>}
                  </button>
                ))}
              </div>
            ) : (
              <span className="text-slate-400">مترادفی ثبت نشده است.</span>
            )}
          </div>

          {/* Antonyms */}
          <div>
            <h3 className="font-bold text-slate-700 mb-2">متضادها (آنتونیم‌لر)</h3>
            {entry.antonyms && entry.antonyms.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {entry.antonyms.map((a, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSearchWord(a.word)}
                    className="px-2.5 py-1 bg-slate-50 hover:bg-rose-50 hover:text-rose-800 border border-slate-200 rounded-lg text-slate-700 transition-colors"
                  >
                    <span>{a.word}</span>
                    {a.fa_equivalent && <span className="text-slate-400 text-2xs mr-1">({a.fa_equivalent})</span>}
                  </button>
                ))}
              </div>
            ) : (
              <span className="text-slate-400">متضادی ثبت نشده است.</span>
            )}
          </div>

          {/* Related Words */}
          <div>
            <h3 className="font-bold text-slate-700 mb-2">واژگان مرتبط و هم‌خانواده</h3>
            {entry.related_words && entry.related_words.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {entry.related_words.map((r, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSearchWord(r)}
                    className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 transition-colors"
                  >
                    {r}
                  </button>
                ))}
              </div>
            ) : (
              <span className="text-slate-400">واژه مرتبطی ثبت نشده است.</span>
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA: Consult AI Linguist */}
      <section className="bg-linear-to-r from-teal-50 to-slate-50 border border-teal-200/70 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">نیاز به توضیحات و مثال‌های بیشتری درباره «{entry.az_word}» دارید؟</h3>
          <p className="text-xs text-slate-600 mt-1">
            دستیار هوش مصنوعی سؤزلوک می‌تواند کاربرد این واژه را در ضرب‌المثل‌ها، شعر آشیقی و متون معاصر آذربایجان تحلیل کند.
          </p>
        </div>
        <button
          onClick={() => onNavigateAiLinguist(entry)}
          className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 shrink-0 whitespace-nowrap"
        >
          <Sparkles className="w-4 h-4" />
          <span>تحلیل زبانی با Gemini</span>
        </button>
      </section>
    </article>
  );
};
