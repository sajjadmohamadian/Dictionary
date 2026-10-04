import React, { useEffect, useState } from 'react';
import {
  Shield, Plus, Edit, Trash2, Download, Upload, Search, CheckCircle2,
  AlertTriangle, RefreshCw, BarChart2, Layers, BookOpen, KeyRound, X
} from 'lucide-react';
import { DictionaryEntry, DictionaryStats, PartOfSpeech, UsageLabel, VerificationStatus } from '../types/dictionary';
import {
  fetchDictionaryEntries, createEntry, updateEntry, deleteEntry,
  fetchStats, importEntries, checkDuplicate
} from '../services/api';
import { CATEGORIES_CONFIG, DIALECTS_LIST } from '../data/seedDictionary';

interface AdminDashboardViewProps {
  onSelectWord: (wordId: string) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ onSelectWord }) => {
  // Simple administrative passkey
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('sozluk_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Stats & Words table
  const [stats, setStats] = useState<DictionaryStats | null>(null);
  const [words, setWords] = useState<DictionaryEntry[]>([]);
  const [totalWords, setTotalWords] = useState(0);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Word Editor Modal State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<DictionaryEntry>>({
    az_word: '',
    az_latin: '',
    az_alternative_spellings: [],
    fa_word: '',
    fa_alternative_equivalents: [],
    az_pronunciation: '',
    ipa: '',
    part_of_speech: 'noun',
    part_of_speech_fa: 'اسم',
    fa_definition: '',
    az_definition: '',
    dialect: 'عمومی',
    usage_label: 'formal',
    usage_label_fa: 'رسمی',
    category: 'everyday',
    category_fa: 'واژگان روزمره',
    source: 'فرهنگ جامع ارک / تبریز',
    verification_status: 'verified',
    az_examples: [{ az: '', fa: '' }],
    synonyms: [],
    antonyms: [],
    related_words: [],
    etymology: { origin: 'تورکی باستان (Old Turkic)', root: '', notes: '' }
  });

  // Duplicate warning
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);

  // Import Modal State
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  // Authentication check
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default passkey for testing and editing
    if (passwordInput === 'admin' || passwordInput === 'admin123' || passwordInput === 'sozluk') {
      setIsAuthenticated(true);
      localStorage.setItem('sozluk_admin_auth', 'true');
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('sozluk_admin_auth');
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadStats();
      loadWords();
    }
  }, [isAuthenticated, page, searchQuery]);

  const loadStats = async () => {
    try {
      const data = await fetchStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load admin stats:', err);
    }
  };

  const loadWords = async () => {
    setLoading(true);
    try {
      const data = await fetchDictionaryEntries(searchQuery, undefined, page, 15);
      setWords(data.results.map((r) => r.entry));
      setTotalWords(data.total);
    } catch (err) {
      console.error('Failed to load admin words list:', err);
    } finally {
      setLoading(false);
    }
  };

  // Open editor for new entry
  const handleNewWord = () => {
    setEditingEntryId(null);
    setDuplicateWarning(null);
    setFormData({
      az_word: '',
      az_latin: '',
      az_alternative_spellings: [],
      fa_word: '',
      fa_alternative_equivalents: [],
      az_pronunciation: '',
      ipa: '',
      part_of_speech: 'noun',
      part_of_speech_fa: 'اسم',
      fa_definition: '',
      az_definition: '',
      dialect: 'عمومی',
      usage_label: 'formal',
      usage_label_fa: 'رسمی',
      category: 'everyday',
      category_fa: 'واژگان روزمره',
      source: 'فرهنگ جامع ارک',
      verification_status: 'verified',
      az_examples: [{ az: '', fa: '' }],
      synonyms: [],
      antonyms: [],
      related_words: [],
      etymology: { origin: 'تورکی باستان (Old Turkic)', root: '', notes: '' }
    });
    setIsEditorOpen(true);
  };

  // Open editor for existing entry
  const handleEditWord = (entry: DictionaryEntry) => {
    setEditingEntryId(entry.id);
    setDuplicateWarning(null);
    setFormData({
      ...entry,
      az_examples: entry.az_examples && entry.az_examples.length > 0 ? entry.az_examples : [{ az: '', fa: '' }],
      etymology: entry.etymology || { origin: '', root: '', notes: '' }
    });
    setIsEditorOpen(true);
  };

  // Check duplicate real-time on blur
  const handleCheckDuplicate = async () => {
    if (!formData.az_word && !formData.fa_word) return;
    try {
      const res = await checkDuplicate(
        formData.az_word || '',
        formData.az_latin || '',
        formData.fa_word || '',
        editingEntryId || undefined
      );
      if (res.isDuplicate) {
        setDuplicateWarning(`توجه: واژه‌ای مشابه («${res.matches[0]?.az_word}» / «${res.matches[0]?.fa_word}») از قبل در پایگاه ثبت است.`);
      } else {
        setDuplicateWarning(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Save entry
  const handleSaveEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.az_word || !formData.fa_word) {
      alert('لطفاً عنوان ترکی و معادل فارسی را وارد کنید.');
      return;
    }

    try {
      if (editingEntryId) {
        await updateEntry(editingEntryId, formData);
      } else {
        await createEntry(formData);
      }
      setIsEditorOpen(false);
      loadWords();
      loadStats();
    } catch (err: any) {
      alert(err.message || 'خطا در ثبت واژه');
    }
  };

  // Delete entry
  const handleDeleteWord = async (id: string, word: string) => {
    if (!confirm(`آیا از حذف واژه «${word}» اطمینان کامل دارید؟`)) return;
    try {
      await deleteEntry(id);
      loadWords();
      loadStats();
    } catch (err: any) {
      alert(err.message || 'خطا در حذف واژه');
    }
  };

  // Import JSON / CSV text
  const handleImportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let parsed: any[] = [];
      const trimmed = importJsonText.trim();

      if (trimmed.startsWith('[')) {
        parsed = JSON.parse(trimmed);
      } else {
        // Simple CSV parser
        const lines = trimmed.split('\n').filter((l) => l.trim().length > 0);
        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(',').map((c) => c.trim().replace(/^["']|["']$/g, ''));
          if (cols.length >= 2) {
            parsed.push({
              az_word: cols[0],
              fa_word: cols[1],
              az_latin: cols[2] || '',
              part_of_speech_fa: cols[3] || 'اسم',
              category: cols[4] || 'everyday'
            });
          }
        }
      }

      const res = await importEntries(parsed);
      setImportStatus({
        success: true,
        message: `تعداد ${res.added} واژه جدید با موفقیت اضافه شد. (${res.skipped} واژه به دلیل تکرار نادیده گرفته شد)`
      });
      loadWords();
      loadStats();
      setTimeout(() => {
        setIsImportOpen(false);
        setImportStatus(null);
      }, 2500);
    } catch (err: any) {
      setImportStatus({ success: false, message: 'خطا در پردازش داده‌ها: ' + err.message });
    }
  };

  // Export dictionary JSON
  const handleExport = () => {
    window.open('/api/dictionary/export', '_blank');
  };

  // If not authenticated, show password gate
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6 text-center">
          <div className="w-12 h-12 bg-teal-50 text-teal-700 rounded-full flex items-center justify-center mx-auto">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">ورود به پنل مدیریت لغت‌نامه</h1>
            <p className="text-xs text-slate-500 mt-1">
              جهت افزودن، ویرایش و مدیریت واژگان، رمز عبور سرپرست را وارد فرمایید (رمز پیش‌فرض: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-teal-800 font-mono">admin</code>).
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-right">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">رمز عبور مدیر</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setAuthError(false);
                }}
                placeholder="رمز عبور..."
                required
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-hidden focus:border-teal-600 text-left font-mono"
              />
              {authError && (
                <p className="text-xs text-rose-600 mt-1">رمز عبور نامعتبر است. (رمز آزمایشی: admin)</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors"
            >
              تأیید و ورود به پنل
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-900 text-white rounded-xl">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">سامانه مدیریت و ویرایش لغت‌نامه سؤزلوک</h1>
            <p className="text-xs text-slate-500 mt-0.5">افزودن، پالایش، ایمپورت، اکسپورت و رصد آماری داده‌ها</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleNewWord}
            className="px-3.5 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>افزودن واژه جدید</span>
          </button>

          <button
            onClick={() => setIsImportOpen(true)}
            className="px-3 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>ورود دسته‌جمعی (CSV/JSON)</span>
          </button>

          <button
            onClick={handleExport}
            className="px-3 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
            title="پشتیبان با فرمت JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>دریافت نسخه پشتیبان (JSON)</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-2 text-xs text-rose-600 hover:text-rose-800 font-medium"
          >
            خروج از پنل
          </button>
        </div>
      </div>

      {/* Stats Summary Cards */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500">کل مدخل‌های فعال</span>
            <p className="text-2xl font-bold text-slate-900 font-mono mt-1">{stats.total_words}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500">مدخل‌های کارشناسی‌شده</span>
            <p className="text-2xl font-bold text-teal-800 font-mono mt-1">{stats.verified_words}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500">دسته‌بندی‌های موضوعی</span>
            <p className="text-2xl font-bold text-slate-900 font-mono mt-1">{Object.keys(stats.categories_count).length}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500">پوشش گویشی</span>
            <p className="text-2xl font-bold text-slate-900 font-mono mt-1">{Object.keys(stats.dialects_count).length} لهجه</p>
          </div>
        </div>
      )}

      {/* Words Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {/* Table Search & Filter Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              placeholder="جستجو در واژگان برای ویرایش..."
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pr-9 pl-3 py-2 text-slate-800 focus:outline-hidden focus:border-teal-600"
            />
          </div>

          <span className="text-xs text-slate-500 font-mono">
            {totalWords} واژه ثبت‌شده
          </span>
        </div>

        {/* Table List */}
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">واژه ترکی</th>
                <th className="py-3 px-4">لاتین</th>
                <th className="py-3 px-4">معادل فارسی</th>
                <th className="py-3 px-4">نقش</th>
                <th className="py-3 px-4">لهجه</th>
                <th className="py-3 px-4">دسته‌بندی</th>
                <th className="py-3 px-4 text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    در حال بارگذاری جدول...
                  </td>
                </tr>
              ) : words.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    واژه‌ای یافت نشد.
                  </td>
                </tr>
              ) : (
                words.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 text-sm">
                      <button
                        onClick={() => onSelectWord(item.id)}
                        className="hover:text-teal-700 hover:underline"
                      >
                        {item.az_word}
                      </button>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500 font-az-latin">
                      {item.az_latin}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800 max-w-xs truncate">
                      {item.fa_word}
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {item.part_of_speech_fa}
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {item.dialect || 'عمومی'}
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {item.category_fa}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEditWord(item)}
                          className="p-1 text-slate-500 hover:text-teal-700 rounded transition-colors"
                          title="ویرایش کامل"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteWord(item.id, item.az_word)}
                          className="p-1 text-slate-500 hover:text-rose-600 rounded transition-colors"
                          title="حذف واژه"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded disabled:opacity-40"
          >
            صفحه قبلی
          </button>
          <span>صفحه {page}</span>
          <button
            disabled={words.length < 15}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded disabled:opacity-40"
          >
            صفحه بعدی
          </button>
        </div>
      </div>

      {/* Editor Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">
                {editingEntryId ? 'ویرایش مدخل واژه‌نامه' : 'افزودن مدخل جدید به لغت‌نامه'}
              </h2>
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Duplicate warning box */}
            {duplicateWarning && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{duplicateWarning}</span>
              </div>
            )}

            <form onSubmit={handleSaveEntry} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">واژه ترکی (عربی-فارسی) *</label>
                  <input
                    type="text"
                    required
                    value={formData.az_word}
                    onChange={(e) => setFormData({ ...formData, az_word: e.target.value })}
                    onBlur={handleCheckDuplicate}
                    placeholder="مثلاً: سئوگی، قاپو..."
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-hidden focus:border-teal-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">آوانویسی لاتین *</label>
                  <input
                    type="text"
                    required
                    value={formData.az_latin}
                    onChange={(e) => setFormData({ ...formData, az_latin: e.target.value })}
                    placeholder="e.g. sevgi, qapı"
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg p-2 font-mono font-az-latin focus:outline-hidden focus:border-teal-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">معادل اصلی فارسی *</label>
                  <input
                    type="text"
                    required
                    value={formData.fa_word}
                    onChange={(e) => setFormData({ ...formData, fa_word: e.target.value })}
                    onBlur={handleCheckDuplicate}
                    placeholder="مثلاً: عشق، در، نان..."
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-hidden focus:border-teal-600"
                  />
                </div>
              </div>

              {/* Alt Spellings & IPA */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">املاهای متداول دیگر در ایران (با کاما)</label>
                  <input
                    type="text"
                    value={formData.az_alternative_spellings?.join('، ')}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        az_alternative_spellings: e.target.value.split(/[,،]/).map((s) => s.trim()).filter(Boolean)
                      })
                    }
                    placeholder="مثلاً: سوگی، قاپی"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-hidden focus:border-teal-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">آوانگاری IPA</label>
                  <input
                    type="text"
                    value={formData.ipa}
                    onChange={(e) => setFormData({ ...formData, ipa: e.target.value })}
                    placeholder="e.g. /sæwˈɟi/"
                    className="w-full font-mono bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-hidden focus:border-teal-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">تلفظ ساده فونتیک</label>
                  <input
                    type="text"
                    value={formData.az_pronunciation}
                    onChange={(e) => setFormData({ ...formData, az_pronunciation: e.target.value })}
                    placeholder="e.g. Sevgi"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-hidden focus:border-teal-600"
                  />
                </div>
              </div>

              {/* Grammatical Properties & Classification */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">نقش دستوری</label>
                  <select
                    value={formData.part_of_speech}
                    onChange={(e) => {
                      const pos = e.target.value as PartOfSpeech;
                      const faMap: Record<string, string> = {
                        noun: 'اسم',
                        verb: 'فعل',
                        adjective: 'صفت',
                        adverb: 'قید',
                        pronoun: 'ضمیر',
                        proverb: 'ضرب‌المثل',
                        idiom: 'اصطلاح',
                        phrase: 'عبارت'
                      };
                      setFormData({
                        ...formData,
                        part_of_speech: pos,
                        part_of_speech_fa: faMap[pos] || 'اسم'
                      });
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2"
                  >
                    <option value="noun">اسم</option>
                    <option value="verb">فعل</option>
                    <option value="adjective">صفت</option>
                    <option value="adverb">قید</option>
                    <option value="proverb">ضرب‌المثل</option>
                    <option value="idiom">اصطلاح</option>
                    <option value="phrase">عبارت</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">دسته‌بندی موضوعی</label>
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      const catId = e.target.value;
                      const catObj = CATEGORIES_CONFIG.find((c) => c.id === catId);
                      setFormData({
                        ...formData,
                        category: catId,
                        category_fa: catObj?.name_fa || 'واژگان روزمره'
                      });
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2"
                  >
                    {CATEGORIES_CONFIG.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name_fa}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">منطقه و لهجه</label>
                  <select
                    value={formData.dialect}
                    onChange={(e) => setFormData({ ...formData, dialect: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2"
                  >
                    {DIALECTS_LIST.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">سبک کاربرد</label>
                  <select
                    value={formData.usage_label}
                    onChange={(e) => {
                      const label = e.target.value as UsageLabel;
                      const faMap: Record<string, string> = {
                        formal: 'رسمی',
                        colloquial: 'محاوره‌ای/گفتاوری',
                        literary: 'ادبی',
                        idiomatic: 'اصطلاحی'
                      };
                      setFormData({
                        ...formData,
                        usage_label: label,
                        usage_label_fa: faMap[label] || 'رسمی'
                      });
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2"
                  >
                    <option value="formal">رسمی</option>
                    <option value="colloquial">محاوره‌ای/گفتاوری</option>
                    <option value="literary">ادبی</option>
                    <option value="idiomatic">اصطلاحی</option>
                  </select>
                </div>
              </div>

              {/* Definitions */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">تعریف و توضیح به زبان فارسی *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.fa_definition}
                  onChange={(e) => setFormData({ ...formData, fa_definition: e.target.value })}
                  placeholder="شرح دقیق لغوی..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-hidden focus:border-teal-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">توضیح به زبان ترکی آذربایجانی (اختیاری)</label>
                <textarea
                  rows={2}
                  value={formData.az_definition}
                  onChange={(e) => setFormData({ ...formData, az_definition: e.target.value })}
                  placeholder="آذربایجان تورکجه‌سینده آچیقلاما..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-hidden focus:border-teal-600"
                />
              </div>

              {/* Example Sentences */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                <span className="font-semibold text-slate-800 block">نمونه جمله کاربردی:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={formData.az_examples?.[0]?.az || ''}
                    onChange={(e) => {
                      const cur = [...(formData.az_examples || [{ az: '', fa: '' }])];
                      cur[0] = { ...cur[0], az: e.target.value };
                      setFormData({ ...formData, az_examples: cur });
                    }}
                    placeholder="جمله ترکی (مثلاً: آنا سئوگیسی دونیانین ان تمیز سئوگیسیدیر)"
                    className="w-full bg-white border border-slate-200 rounded-lg p-2"
                  />
                  <input
                    type="text"
                    value={formData.az_examples?.[0]?.fa || ''}
                    onChange={(e) => {
                      const cur = [...(formData.az_examples || [{ az: '', fa: '' }])];
                      cur[0] = { ...cur[0], fa: e.target.value };
                      setFormData({ ...formData, az_examples: cur });
                    }}
                    placeholder="ترجمه فارسی جمله"
                    className="w-full bg-white border border-slate-200 rounded-lg p-2"
                  />
                </div>
              </div>

              {/* Etymology */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                <span className="font-semibold text-slate-800 block">ریشه‌شناسی موثق:</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={formData.etymology?.origin || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        etymology: { ...(formData.etymology || { origin: '' }), origin: e.target.value }
                      })
                    }
                    placeholder="خاستگاه (مثلاً: تورکی باستان / اوغوز)"
                    className="w-full bg-white border border-slate-200 rounded-lg p-2"
                  />
                  <input
                    type="text"
                    value={formData.etymology?.root || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        etymology: { ...(formData.etymology || { origin: '' }), root: e.target.value }
                      })
                    }
                    placeholder="ریشه باستانی (e.g. *seb-)"
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 font-mono"
                  />
                  <input
                    type="text"
                    value={formData.etymology?.notes || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        etymology: { ...(formData.etymology || { origin: '' }), notes: e.target.value }
                      })
                    }
                    placeholder="توضیح تاریخی یا تطبیقی"
                    className="w-full bg-white border border-slate-200 rounded-lg p-2"
                  />
                </div>
              </div>

              {/* Form buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-lg transition-colors"
                >
                  {editingEntryId ? 'ذخیره تغییرات' : 'ثبت واژه در لغت‌نامه'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Import Modal */}
      {isImportOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Upload className="w-4 h-4 text-teal-600" />
                <span>ورود دسته‌جمعی واژگان (CSV یا JSON)</span>
              </h3>
              <button onClick={() => setIsImportOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              می‌توانید آرایه‌ای از اشیای JSON یا خطوط CSV (با ساختار: az_word, fa_word, az_latin, ...) را در این کادر قرار دهید:
            </p>

            <form onSubmit={handleImportSubmit} className="space-y-3">
              <textarea
                rows={8}
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder={`[
  {
    "az_word": "سحر",
    "fa_word": "صبح، بامداد",
    "az_latin": "səhər",
    "part_of_speech_fa": "اسم",
    "category": "everyday"
  }
]`}
                required
                className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-hidden focus:border-teal-600 text-left"
                dir="ltr"
              />

              {importStatus && (
                <div
                  className={`p-3 rounded-xl text-xs ${
                    importStatus.success ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                  }`}
                >
                  {importStatus.message}
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsImportOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600"
                >
                  بستن
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-lg"
                >
                  پردازش و افزودن
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
