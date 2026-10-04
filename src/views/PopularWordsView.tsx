import React, { useEffect, useState } from 'react';
import { TrendingUp, Volume2, ArrowLeft, Bookmark } from 'lucide-react';
import { DictionaryEntry } from '../types/dictionary';
import { fetchPopularWords } from '../services/api';
import { playPronunciation } from '../utils/audio';

interface PopularWordsViewProps {
  onSelectWord: (wordId: string) => void;
  savedWordIds: string[];
  onToggleBookmark: (wordId: string) => void;
}

export const PopularWordsView: React.FC<PopularWordsViewProps> = ({
  onSelectWord,
  savedWordIds,
  onToggleBookmark
}) => {
  const [words, setWords] = useState<DictionaryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopularWords(24)
      .then((data) => setWords(data))
      .catch((err) => console.error('Failed to load popular words:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleAudio = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    playPronunciation(text);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-teal-50 text-teal-700 rounded-xl">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">واژگان پربازدید و متداول</h1>
          <p className="text-xs text-slate-500 mt-1">کلماتی که بیشترین جستجو و رجوع را توسط کاربران داشته‌اند</p>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <div className="inline-block w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {words.map((entry, index) => {
            const isBookmarked = savedWordIds.includes(entry.id);
            return (
              <div
                key={entry.id}
                onClick={() => onSelectWord(entry.id)}
                className="bg-white rounded-xl p-5 border border-slate-200/90 hover:border-teal-400 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-slate-400 font-bold">#{index + 1}</span>
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
                        {entry.dialect && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{entry.dialect}</span>
                          </>
                        )}
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
                        className={`p-1 rounded-md transition-colors ${
                          isBookmarked ? 'text-teal-700' : 'text-slate-400 hover:text-slate-700'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-slate-800 line-clamp-1">
                    {entry.fa_word}
                  </p>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {entry.fa_definition}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-2xs text-slate-400">
                  <span className="font-mono">{entry.search_count || 0} بار جستجو</span>
                  <span className="text-teal-700 font-medium group-hover:-translate-x-0.5 transition-transform flex items-center gap-1">
                    مشاهده مدخل
                    <ArrowLeft className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
