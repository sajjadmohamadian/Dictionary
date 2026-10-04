import React, { useState } from 'react';
import { Sparkles, Send, BookOpen, AlertTriangle, HelpCircle, ArrowLeft, RefreshCw, Copy, Check } from 'lucide-react';
import { DictionaryEntry } from '../types/dictionary';
import { askAiLinguist } from '../services/api';

interface AiAssistantViewProps {
  initialPrompt?: string;
  wordContext?: DictionaryEntry | null;
  onNavigateEntry?: (wordId: string) => void;
}

export const AiAssistantView: React.FC<AiAssistantViewProps> = ({
  initialPrompt = '',
  wordContext = null,
  onNavigateEntry
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [selectedType, setSelectedType] = useState('general');
  const [response, setResponse] = useState<string | null>(null);
  const [disclaimer, setDisclaimer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Suggested inquiries
  const presetInquiries = [
    {
      title: 'تحلیل صرفی و پسوندهای فعلی',
      desc: 'بررسی ریشه، هماهنگی اصوات (Vowel Harmony) و پسوندهای زمان در فعل‌های ترکی',
      prompt: 'ساختار دستوری و وجه‌های مختلف فعل «ایسته‌مک» و تفاوت صرف آن در لهجه‌های تبریز و ارومیه را توضیح دهید.',
      type: 'grammar_analysis'
    },
    {
      title: 'مقایسه معنایی کلمات مترادف',
      desc: 'تفاوت‌های ظریف بین دو واژه با معنی مشابه',
      prompt: 'تفاوت معنایی و حسی دقیق بین دو واژه «کؤنول» و «اوره‌ک» در ترکی آذربایجانی چیست؟ هر کدام در چه بافتی به کار می‌روند؟',
      type: 'compare_synonyms'
    },
    {
      title: 'ریشه‌شناسی و وام‌واژه‌ها',
      desc: 'بررسی ارتباط تاریخی با ترکی باستان و تأثیرات متقابل بر زبان فارسی',
      prompt: 'ریشه واژه «چؤره‌ک» و تحول آوایی آن از زبان‌های باستانی اوغوز تا ترکی آذربایجانی ایران را همراه با مدارک تاریخی شرح دهید.',
      type: 'etymology_roots'
    },
    {
      title: 'رمزگشایی ضرب‌المثل‌ها و کنایات',
      desc: 'معنی باطنی، شأن ورود و معادل فارسی امثال و حکم',
      prompt: 'ریشه و حکمت ضرب‌المثل «آغیر اوتور، باتمان گل» در فرهنگ آذربایجان ایران چیست و با چه نمونه‌هایی از زندگی روزمره تبیین می‌شود؟',
      type: 'proverb_idiom'
    },
    {
      title: 'شیوه رسم‌الخط و نگارش اصوات',
      desc: 'راهنمای نگارش ۹ مصوت ترکی با حروف عربی-فارسی در ایران',
      prompt: 'تفاوت نگارش مصوت‌های «اؤ» و «او» در رسم‌الخط عربی-فارسی ترکی آذربایجانی ایران چیست؟ چند مثال کاربردی با معادل فارسی ارائه کنید.',
      type: 'orthography_guide'
    }
  ];

  const handleSend = async (customPrompt?: string, customType?: string) => {
    const textToSend = customPrompt || prompt;
    if (!textToSend.trim() && !wordContext) return;

    setLoading(true);
    setError(null);

    try {
      const res = await askAiLinguist({
        prompt: textToSend,
        type: customType || selectedType,
        wordContext: wordContext
          ? {
              az_word: wordContext.az_word,
              az_latin: wordContext.az_latin,
              fa_word: wordContext.fa_word
            }
          : undefined
      });

      setResponse(res.response);
      setDisclaimer(res.disclaimer);
    } catch (err: any) {
      console.error('AI assistant error:', err);
      setError(err.message || 'خطا در برقراری ارتباط با مدل هوش مصنوعی زبان‌شناسی.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (response) {
      navigator.clipboard.writeText(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Context */}
      <div>
        <div className="flex items-center gap-2 text-teal-800 text-xs font-semibold mb-1">
          <Sparkles className="w-4 h-4 text-teal-600" />
          <span>هوش مصنوعی زبان‌شناسی (مبتنی بر Google Gemini)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          دستیار تخصصی ترکی آذربایجانی (ایران) و فارسی
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
          پژوهش علمی در ساختار صرفی، ریشه‌شناسی تطبیقی با متون اورخون و دیوان لغات الترک، تحلیل اصطلاحات بومی و راهنمای رسم‌الخط.
        </p>
      </div>

      {/* Word Context Badge if coming from a word page */}
      {wordContext && (
        <div className="bg-teal-50/80 border border-teal-200/90 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-teal-700 shrink-0" />
            <div>
              <span className="text-xs text-teal-900 font-semibold">واژه انتخابی برای تحلیل:</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-lg font-bold text-teal-950">{wordContext.az_word}</span>
                <span className="text-xs font-mono text-teal-800">({wordContext.az_latin})</span>
                <span className="text-xs text-teal-700">· {wordContext.fa_word}</span>
              </div>
            </div>
          </div>
          {onNavigateEntry && (
            <button
              onClick={() => onNavigateEntry(wordContext.id)}
              className="text-xs font-medium text-teal-800 hover:text-teal-950 underline"
            >
              مشاهده مدخل واژه‌نامه
            </button>
          )}
        </div>
      )}

      {/* Inquiry Input Box */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
        <label className="block text-xs font-semibold text-slate-700">
          پرسش یا موضوع زبانی مورد نظر را بنویسید:
        </label>
        <div className="relative">
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="مثلاً: هماهنگی مصوت‌ها در پسوندهای زبان ترکی آذربایجانی چگونه کار می‌کند؟ یا ریشه واژه «یولداش» چیست؟"
            className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-900 focus:outline-hidden focus:border-teal-600 focus:bg-white resize-none"
            dir="auto"
          />
        </div>

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>نوع تحلیل:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-slate-100 border border-slate-200 rounded-md px-2 py-1 text-slate-800 text-xs focus:outline-hidden"
            >
              <option value="general">تحلیل عمومی و کاربردی</option>
              <option value="grammar_analysis">ساختار دستوری و صرفی</option>
              <option value="etymology_roots">ریشه‌شناسی تاریخی</option>
              <option value="compare_synonyms">تفاوت کلمات مترادف</option>
              <option value="proverb_idiom">تفسیر ضرب‌المثل و اصطلاح</option>
            </select>
          </div>

          <button
            type="button"
            disabled={loading || (!prompt.trim() && !wordContext)}
            onClick={() => handleSend()}
            className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-2 shadow-xs shrink-0"
          >
            {loading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>در حال تحلیل زبانی...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>شروع تحلیل هوشمند</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preset Inquiries Grid */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          پرسش‌های پرتکرار زبان‌شناختی (یک کلیک برای شروع):
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {presetInquiries.map((inq, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setPrompt(inq.prompt);
                setSelectedType(inq.type);
                handleSend(inq.prompt, inq.type);
              }}
              className="p-3.5 bg-white hover:bg-teal-50/60 border border-slate-200/90 hover:border-teal-300 rounded-xl text-right transition-all group flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xs font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                  {inq.title}
                </h3>
                <p className="text-2xs text-slate-500 mt-1 leading-relaxed">
                  {inq.desc}
                </p>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-2xs text-teal-700">
                <span>طرح این پرسش</span>
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* AI Response Card */}
      {response && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 animate-in fade-in-50 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-teal-800 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>پاسخ و تحلیل دستیار زبان‌شناسی</span>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 p-1 rounded-md transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'کپی شد' : 'کپی متن'}</span>
            </button>
          </div>

          {/* Formatted Text Content */}
          <div className="text-slate-800 text-sm leading-relaxed whitespace-pre-line font-fa space-y-3">
            {response}
          </div>

          {/* Mandatory Clear AI Disclaimer */}
          <div className="mt-6 pt-4 border-t border-slate-100 bg-amber-50/70 border border-amber-200/70 rounded-xl p-3.5 flex items-start gap-2.5 text-2xs text-amber-900 leading-relaxed">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">برچسب رسمی محتوای هوش مصنوعی: </span>
              <span>
                {disclaimer ||
                  'این تحلیل توسط مدل هوش مصنوعی (Gemini) تولید شده است و به عنوان راهنمای کمکی ارائه می‌شود. این پاسخ‌ها مدخل رسمی یا تأییدشده لغت‌نامه محسوب نمی‌شوند و ممکن است نیاز به تدقیق با منابع مرجع داشته باشند.'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
