import React, { useEffect, useState } from 'react';
import { Volume2, Bookmark, Filter, X, ArrowLeft, SlidersHorizontal, BookOpen, AlertCircle, Sparkles } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { DictionaryEntry, SearchDirection, SearchFilters, SearchResult } from '../types/dictionary';
import { fetchDictionaryEntries } from '../services/api';
import { playPronunciation } from '../utils/audio';
import { CATEGORIES_CONFIG, DIALECTS_LIST } from '../data/seedDictionary';

interface SearchResultsViewProps {
  initialQuery: string;
  initialDirection: SearchDirection;
  initialCategory?: string;
  onSelectWord: (wordId: string) => void;
  onNavigate: (view: string, extra?: any) => void;
  savedWordIds: string[];
  onToggleBookmark: (wordId: string) => void;
}

export const SearchResultsView: React.FC<SearchResultsViewProps> = ({
  initialQuery,
  initialDirection,
  initialCategory,
  onSelectWord,
  onNavigate,
  savedWordIds,
  onToggleBookmark
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [direction, setDirection] = useState<SearchDirection>(initialDirection);
  const [filters, setFilters] = useState<SearchFilters>({
    category: initialCategory || '',
    part_of_speech: '',
    dialect: '',
    usage_label: '',
    match_mode: 'all',
    direction: initialDirection
  });

  const [results, setResults] = useState<SearchResult[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    setQuery(initialQuery);
    setDirection(initialDirection);
    setFilters((prev) => ({
      ...prev,
      direction: initialDirection,
      category: initialCategory || prev.category
    }));
  }, [initialQuery, initialDirection, initialCategory]);

  useEffect(() => {
    loadResults();
  }, [query, filters, page]);

  const loadResults = async () => {
    setLoading(true);
    try {
      const data = await fetchDictionaryEntries(query, filters, page, 20);
      setResults(data.results);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error('Failed to load search results:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (newQuery: string, newDirection: SearchDirection) => {
    setQuery(newQuery);
    setDirection(newDirection);
    setFilters((prev) => ({ ...prev, direction: newDirection }));
    setPage(1);
  };

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
    setPage(1);
  };

  const clearAllFilters = () => {
    setFilters({
      category: '',
      part_of_speech: '',
      dialect: '',
      usage_label: '',
      match_mode: 'all',
      direction
    });
    setPage(1);
  };

  const handleAudio = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    playPronunciation(text);
  };

  const hasActiveFilters = Boolean(
    filters.category ||
    filters.part_of_speech ||
    filters.dialect ||
    filters.usage_label ||
    filters.match_mode !== 'all'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Search Controls */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-2xs">
        <SearchBar
          initialQuery={query}
          initialDirection={direction}
          onSearch={handleSearchSubmit}
          onSelectWord={onSelectWord}
          size="compact"
        />

        {/* Results summary header */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>
              {query ? (
                <>
                  نتایج جستجو برای <strong className="text-slate-900 font-bold">«{query}»</strong>
                </>
              ) : (
                'نمایش واژگان لغت‌نامه'
              )}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-teal-800 font-bold">{total} واژه یافت شد</span>
          </div>

          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-rose-600 hover:text-rose-800 font-medium flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>حذف فیلترها</span>
              </button>
            )}

            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>فیلترهای پیشرفته</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Filter Sidebar + Results List */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Desktop Sidebar Filters */}
        <aside
          className={`${
            mobileFilterOpen ? 'block' : 'hidden'
          } lg:block lg:col-span-1 bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-5`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Filter className="w-4 h-4 text-teal-600" />
              <span>فیلترهای تخصصی</span>
            </h3>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-2xs text-slate-500 hover:text-slate-800"
              >
                پاک‌سازی
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">دسته‌بندی موضوعی</label>
            <select
              value={filters.category || ''}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-800 focus:outline-hidden focus:border-teal-600"
            >
              <option value="">همه موضوعات</option>
              {CATEGORIES_CONFIG.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name_fa}
                </option>
              ))}
            </select>
          </div>

          {/* Part of Speech Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">نقش دستوری</label>
            <select
              value={filters.part_of_speech || ''}
              onChange={(e) => handleFilterChange('part_of_speech', e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-800 focus:outline-hidden focus:border-teal-600"
            >
              <option value="">همه نقش‌ها</option>
              <option value="noun">اسم</option>
              <option value="verb">فعل</option>
              <option value="adjective">صفت</option>
              <option value="adverb">قید</option>
              <option value="proverb">ضرب‌المثل (آتالار سؤزو)</option>
              <option value="idiom">اصطلاح</option>
              <option value="phrase">عبارت کاربردی</option>
            </select>
          </div>

          {/* Dialect Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">لهجه و منطقه</label>
            <select
              value={filters.dialect || ''}
              onChange={(e) => handleFilterChange('dialect', e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-800 focus:outline-hidden focus:border-teal-600"
            >
              <option value="">همه لهجه‌ها</option>
              {DIALECTS_LIST.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Usage Label Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">سطح کاربرد</label>
            <select
              value={filters.usage_label || ''}
              onChange={(e) => handleFilterChange('usage_label', e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-800 focus:outline-hidden focus:border-teal-600"
            >
              <option value="">همه سطوح</option>
              <option value="formal">رسمی و نوشتاری</option>
              <option value="colloquial">محاوره‌ای و گفتاوری</option>
              <option value="literary">ادبی و کهن</option>
              <option value="idiomatic">اصطلاحی و کنایی</option>
            </select>
          </div>

          {/* Match Mode */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">نوع تطابق جستجو</label>
            <div className="space-y-1.5 text-xs text-slate-700">
              {[
                { id: 'all', label: 'هوشمند (کامل، ریشه‌ای، فازی)' },
                { id: 'exact', label: 'فقط تطابق دقیق' },
                { id: 'prefix', label: 'شروع با عبارت' },
              ].map((m) => (
                <label key={m.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="match_mode"
                    value={m.id}
                    checked={filters.match_mode === m.id}
                    onChange={(e) => handleFilterChange('match_mode', e.target.value)}
                    className="text-teal-600 focus:ring-teal-500"
                  />
                  <span>{m.label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Results List */}
        <main className="lg:col-span-3 space-y-4">
          {loading ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <div className="inline-block w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-3 text-xs text-slate-500 font-medium">در حال واکاوی و جستجوی واژگان...</p>
            </div>
          ) : results.length === 0 ? (
            /* Empty State */
            <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 shadow-2xs space-y-4">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">واژه‌ای با این مشخصات یافت نشد</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
                  می‌توانید املای واژه را به صورت لاتین یا با حروف دیگر امتحان کنید، یا فیلترهای اعمال شده را کاهش دهید.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors"
                >
                  حذف تمامی فیلترها
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('ai-linguist', { prompt: `معنی و کاربرد واژه «${query}» در ترکی آذربایجانی ایران چیست؟` })}
                  className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>پرسش از دستیار هوش مصنوعی درباره «{query}»</span>
                </button>
              </div>
            </div>
          ) : (
            /* Results Cards */
            <div className="space-y-3">
              {results.map(({ entry, match_type }) => {
                const isBookmarked = savedWordIds.includes(entry.id);
                return (
                  <div
                    key={entry.id}
                    onClick={() => onSelectWord(entry.id)}
                    className="bg-white rounded-xl p-5 border border-slate-200 hover:border-teal-400 hover:shadow-xs transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Left: Main Word & Info */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-baseline gap-2.5">
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                            {entry.az_word}
                          </h3>
                          <span className="text-sm font-mono text-slate-400 tracking-tight font-az-latin">
                            {entry.az_latin}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleAudio(e, entry.az_latin || entry.az_word)}
                            className="p-1 text-slate-400 hover:text-teal-700 hover:bg-teal-50 rounded-md transition-colors"
                            title="پخش تلفظ"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Metadata row adhering to zero-pill discipline */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <span className="text-teal-800 font-medium">{entry.part_of_speech_fa}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono text-slate-400">{entry.ipa}</span>
                          {entry.dialect && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span>لهجه: {entry.dialect}</span>
                            </>
                          )}
                          <span aria-hidden="true">·</span>
                          <span>{entry.category_fa}</span>
                          {entry.az_alternative_spellings && entry.az_alternative_spellings.length > 0 && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="text-slate-400">
                                املای دیگر: {entry.az_alternative_spellings.join('، ')}
                              </span>
                            </>
                          )}
                        </div>

                        {/* Persian Translation & Definition Excerpt */}
                        <div className="pt-1">
                          <p className="text-sm font-semibold text-slate-800">
                            {entry.fa_word}
                          </p>
                          <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                            {entry.fa_definition}
                          </p>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleBookmark(entry.id);
                          }}
                          className={`p-2 rounded-lg transition-colors ${
                            isBookmarked
                              ? 'text-teal-700 bg-teal-50'
                              : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                          }`}
                          title={isBookmarked ? 'نشان‌شده در واژگان من' : 'نشان کردن واژه'}
                        >
                          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                        </button>

                        <span className="text-slate-400 group-hover:text-teal-600 group-hover:-translate-x-0.5 transition-transform p-1">
                          <ArrowLeft className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pt-6 flex items-center justify-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors"
              >
                صفحه قبل
              </button>
              <span className="text-xs text-slate-500 font-mono px-3">
                {page} از {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors"
              >
                صفحه بعد
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
