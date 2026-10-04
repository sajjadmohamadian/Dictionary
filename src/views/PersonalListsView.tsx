import React, { useEffect, useState } from 'react';
import { Bookmark, Plus, Trash2, FolderPlus, Download, Volume2, ArrowLeft, BookOpen, Clock } from 'lucide-react';
import { DictionaryEntry, PersonalList } from '../types/dictionary';
import { fetchPersonalLists, savePersonalList, deletePersonalList, fetchEntryById } from '../services/api';
import { playPronunciation } from '../utils/audio';

interface PersonalListsViewProps {
  savedWordIds: string[];
  onToggleBookmark: (wordId: string) => void;
  onSelectWord: (wordId: string) => void;
  searchHistory: string[];
  onSearchQuery: (q: string) => void;
  onClearHistory: () => void;
}

export const PersonalListsView: React.FC<PersonalListsViewProps> = ({
  savedWordIds,
  onToggleBookmark,
  onSelectWord,
  searchHistory,
  onSearchQuery,
  onClearHistory
}) => {
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'collections' | 'history'>('bookmarks');
  const [bookmarkedWords, setBookmarkedWords] = useState<DictionaryEntry[]>([]);
  const [loadingBookmarks, setLoadingBookmarks] = useState(false);
  const [customLists, setCustomLists] = useState<PersonalList[]>([]);
  const [isCreatingList, setIsCreatingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');
  const [newListDesc, setNewListDesc] = useState('');
  const [selectedList, setSelectedList] = useState<PersonalList | null>(null);
  const [listWords, setListWords] = useState<DictionaryEntry[]>([]);
  const [loadingListWords, setLoadingListWords] = useState(false);

  // Load Bookmarked Words details
  useEffect(() => {
    if (savedWordIds.length === 0) {
      setBookmarkedWords([]);
      return;
    }
    setLoadingBookmarks(true);
    Promise.all(savedWordIds.map((id) => fetchEntryById(id).catch(() => null)))
      .then((results) => {
        setBookmarkedWords(results.filter((w): w is DictionaryEntry => w !== null));
      })
      .finally(() => setLoadingBookmarks(false));
  }, [savedWordIds]);

  // Load Custom Lists
  useEffect(() => {
    loadLists();
  }, []);

  const loadLists = () => {
    fetchPersonalLists()
      .then((data) => setCustomLists(data))
      .catch((err) => console.error('Failed to load lists:', err));
  };

  // When a custom list is clicked, load its entries
  useEffect(() => {
    if (!selectedList || !selectedList.word_ids || selectedList.word_ids.length === 0) {
      setListWords([]);
      return;
    }
    setLoadingListWords(true);
    Promise.all(selectedList.word_ids.map((id) => fetchEntryById(id).catch(() => null)))
      .then((results) => {
        setListWords(results.filter((w): w is DictionaryEntry => w !== null));
      })
      .finally(() => setLoadingListWords(false));
  }, [selectedList]);

  const handleCreateList = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListTitle.trim()) return;
    try {
      const created = await savePersonalList({
        title: newListTitle.trim(),
        description: newListDesc.trim(),
        word_ids: []
      });
      setCustomLists([...customLists, created]);
      setNewListTitle('');
      setNewListDesc('');
      setIsCreatingList(false);
      setSelectedList(created);
    } catch (err) {
      console.error('Failed to create list:', err);
    }
  };

  const handleDeleteList = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('آیا از حذف این مجموعه اطمینان دارید؟')) return;
    try {
      await deletePersonalList(id);
      setCustomLists(customLists.filter((l) => l.id !== id));
      if (selectedList?.id === id) {
        setSelectedList(null);
      }
    } catch (err) {
      console.error('Failed to delete list:', err);
    }
  };

  const handleExportBookmarks = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(bookmarkedWords, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'my-azerbaijani-bookmarks.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleAudio = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    playPronunciation(text);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header and Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">واژگان و مجموعه‌های شخصی من</h1>
          <p className="text-xs text-slate-500 mt-1">مدیریت واژه‌های نشان‌شده، پوشه‌های یادگیری و تاریخچه جستجو</p>
        </div>

        {/* Tab segmented control */}
        <div className="inline-flex p-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-600 self-start sm:self-center">
          <button
            onClick={() => {
              setActiveTab('bookmarks');
              setSelectedList(null);
            }}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'bookmarks' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'hover:text-slate-900'
            }`}
          >
            نشان‌شده‌ها ({savedWordIds.length})
          </button>
          <button
            onClick={() => setActiveTab('collections')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'collections' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'hover:text-slate-900'
            }`}
          >
            مجموعه‌های موضوعی ({customLists.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('history');
              setSelectedList(null);
            }}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'history' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'hover:text-slate-900'
            }`}
          >
            تاریخچه جستجو ({searchHistory.length})
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              {bookmarkedWords.length} واژه نشان‌شده در دسترس است
            </span>
            {bookmarkedWords.length > 0 && (
              <button
                onClick={handleExportBookmarks}
                className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>خروجی گرفتن (JSON)</span>
              </button>
            )}
          </div>

          {loadingBookmarks ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <div className="inline-block w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : bookmarkedWords.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 shadow-2xs space-y-2">
              <Bookmark className="w-8 h-8 text-slate-300 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800">هیچ واژه‌ای نشان نشده است</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                هنگام جستجو یا مرور مدخل‌ها، با کلیک روی آیکون نشان، می‌توانید واژه‌های مورد نظرتان را برای مرور بعدی اینجا ذخیره کنید.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookmarkedWords.map((entry) => (
                <div
                  key={entry.id}
                  onClick={() => onSelectWord(entry.id)}
                  className="bg-white rounded-xl p-5 border border-slate-200 hover:border-teal-400 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                            {entry.az_word}
                          </h3>
                          <span className="text-xs font-mono text-slate-400 font-az-latin">
                            {entry.az_latin}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-2xs text-slate-500 mt-1">
                          <span>{entry.part_of_speech_fa}</span>
                          <span aria-hidden="true">·</span>
                          <span>{entry.category_fa}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={(e) => handleAudio(e, entry.az_latin || entry.az_word)}
                          className="p-1 text-slate-400 hover:text-teal-700 rounded-md"
                          title="پخش تلفظ"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleBookmark(entry.id);
                          }}
                          className="p-1 text-teal-700 hover:text-rose-600 rounded-md transition-colors"
                          title="حذف از نشان‌ها"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-slate-800 line-clamp-1">{entry.fa_word}</p>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{entry.fa_definition}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-2xs text-slate-400">
                    <span>{entry.dialect || 'عمومی'}</span>
                    <span className="text-teal-700 font-medium flex items-center gap-1 group-hover:-translate-x-0.5 transition-transform">
                      مشاهده جزئیات
                      <ArrowLeft className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Collections Tab */}
      {activeTab === 'collections' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              دسته‌بندی‌های شخصی برای یادگیری و مرور دسته‌جمعی
            </span>
            <button
              onClick={() => setIsCreatingList(!isCreatingList)}
              className="px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>مجموعه جدید</span>
            </button>
          </div>

          {/* Create List Form Modal / Inline Box */}
          {isCreatingList && (
            <form onSubmit={handleCreateList} className="bg-white p-5 rounded-2xl border border-teal-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900">ایجاد مجموعه واژگان شخصی جدید</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">نام مجموعه</label>
                  <input
                    type="text"
                    value={newListTitle}
                    onChange={(e) => setNewListTitle(e.target.value)}
                    placeholder="مثلاً: واژگان سفر تبریز، افعال پرکاربرد..."
                    required
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">توضیح اختیاری</label>
                  <input
                    type="text"
                    value={newListDesc}
                    onChange={(e) => setNewListDesc(e.target.value)}
                    placeholder="یادداشت یا هدف از این مجموعه..."
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-600"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingList(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  ذخیره مجموعه
                </button>
              </div>
            </form>
          )}

          {/* List of Collections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {customLists.map((list) => {
              const isSelected = selectedList?.id === list.id;
              return (
                <div
                  key={list.id}
                  onClick={() => setSelectedList(isSelected ? null : list)}
                  className={`bg-white rounded-xl p-5 border transition-all cursor-pointer group flex flex-col justify-between ${
                    isSelected ? 'border-teal-600 ring-2 ring-teal-600/10 shadow-xs' : 'border-slate-200 hover:border-teal-300'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                        {list.title}
                      </h3>
                      <button
                        type="button"
                        onClick={(e) => handleDeleteList(list.id, e)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded-md transition-colors"
                        title="حذف مجموعه"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {list.description && (
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                        {list.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-2xs text-slate-400">
                    <span className="font-mono">{list.word_ids?.length || 0} واژه</span>
                    <span className="text-teal-700 font-medium">
                      {isSelected ? 'بستن مدخل‌ها' : 'مشاهده واژگان'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected List Words Preview */}
          {selectedList && (
            <div className="mt-8 bg-slate-50/70 rounded-2xl p-6 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="text-sm font-bold text-slate-900">
                  واژگان موجود در «{selectedList.title}»
                </h3>
                <span className="text-xs text-slate-500 font-mono">
                  {listWords.length} واژه
                </span>
              </div>

              {loadingListWords ? (
                <div className="py-8 text-center">
                  <div className="inline-block w-6 h-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : listWords.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-4">
                  هنوز واژه‌ای در این مجموعه قرار نگرفته است. از صفحه جستجو یا جزئیات هر واژه می‌توانید آن را اضافه کنید.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {listWords.map((entry) => (
                    <div
                      key={entry.id}
                      onClick={() => onSelectWord(entry.id)}
                      className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-teal-400 cursor-pointer transition-all flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{entry.az_word}</span>
                          <span className="text-xs font-mono text-slate-400">{entry.az_latin}</span>
                        </div>
                        <span className="text-xs text-slate-500 line-clamp-1">{entry.fa_word}</span>
                      </div>
                      <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Search History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">عباراتی که اخیراً جستجو کرده‌اید</span>
            {searchHistory.length > 0 && (
              <button
                onClick={onClearHistory}
                className="text-xs text-rose-600 hover:text-rose-800 font-medium"
              >
                پاک کردن تاریخچه
              </button>
            )}
          </div>

          {searchHistory.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 shadow-2xs space-y-2">
              <Clock className="w-8 h-8 text-slate-300 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800">تاریخچه جستجویی وجود ندارد</h3>
              <p className="text-xs text-slate-500">کلماتی که جستجو می‌کنید در اینجا برای دسترسی سریع‌تر ذخیره می‌شوند.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
              {searchHistory.map((queryText, idx) => (
                <div
                  key={idx}
                  onClick={() => onSearchQuery(queryText)}
                  className="px-5 py-3 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-800 font-fa">«{queryText}»</span>
                  </div>
                  <span className="text-xs text-teal-700 font-medium flex items-center gap-1">
                    جستجوی مجدد
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
