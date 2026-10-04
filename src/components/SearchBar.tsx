import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowLeftRight, X, Volume2, ArrowRight } from 'lucide-react';
import { SearchDirection } from '../types/dictionary';
import { fetchAutocomplete } from '../services/api';
import { playPronunciation } from '../utils/audio';

interface SearchBarProps {
  initialQuery?: string;
  initialDirection?: SearchDirection;
  onSearch: (query: string, direction: SearchDirection) => void;
  onSelectWord?: (wordId: string) => void;
  autoFocus?: boolean;
  size?: 'large' | 'compact';
}

export const SearchBar: React.FC<SearchBarProps> = ({
  initialQuery = '',
  initialDirection = 'both',
  onSearch,
  onSelectWord,
  autoFocus = false,
  size = 'large'
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [direction, setDirection] = useState<SearchDirection>(initialDirection);
  const [suggestions, setSuggestions] = useState<Array<{
    id: string;
    az_word: string;
    az_latin: string;
    fa_word: string;
    part_of_speech_fa: string;
  }>>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    setDirection(initialDirection);
  }, [initialDirection]);

  // Handle autocomplete fetch with debounce
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const list = await fetchAutocomplete(query);
        setSuggestions(list);
        setIsOpen(list.length > 0);
      } catch (err) {
        console.error('Autocomplete error:', err);
      }
    }, 180);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (selectedIndex >= 0 && suggestions[selectedIndex]) {
      const selected = suggestions[selectedIndex];
      if (onSelectWord) {
        onSelectWord(selected.id);
      } else {
        onSearch(selected.az_word, direction);
      }
      setIsOpen(false);
      return;
    }
    if (query.trim()) {
      onSearch(query.trim(), direction);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        e.preventDefault();
        const selected = suggestions[selectedIndex];
        if (onSelectWord) {
          onSelectWord(selected.id);
        } else {
          onSearch(selected.az_word, direction);
        }
        setIsOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleAudioClick = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    playPronunciation(text);
  };

  const isLarge = size === 'large';

  return (
    <div ref={wrapperRef} className="w-full relative">
      {/* Direction Segmented Control */}
      <div className="flex items-center justify-center mb-3">
        <div className="inline-flex p-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-600 border border-slate-200/80">
          <button
            type="button"
            onClick={() => setDirection('both')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              direction === 'both' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'hover:text-slate-900'
            }`}
          >
            هر دو زبان
          </button>
          <button
            type="button"
            onClick={() => setDirection('az_to_fa')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              direction === 'az_to_fa' ? 'bg-white text-teal-800 shadow-xs font-semibold' : 'hover:text-slate-900'
            }`}
          >
            ترکی به فارسی
          </button>
          <button
            type="button"
            onClick={() => setDirection('fa_to_az')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              direction === 'fa_to_az' ? 'bg-white text-teal-800 shadow-xs font-semibold' : 'hover:text-slate-900'
            }`}
          >
            فارسی به ترکی
          </button>
        </div>
      </div>

      {/* Main Search Input Form */}
      <form onSubmit={handleSubmit} className="relative w-full">
        <div
          className={`flex items-center w-full bg-white rounded-xl border transition-all ${
            isLarge
              ? 'px-4 py-3 text-base shadow-sm hover:shadow-md border-slate-300 focus-within:border-teal-600 focus-within:ring-2 focus-within:ring-teal-600/20'
              : 'px-3 py-2 text-sm shadow-xs border-slate-300 focus-within:border-teal-600'
          }`}
        >
          <Search className={`${isLarge ? 'w-6 h-6' : 'w-4 h-4'} text-slate-400 shrink-0 ml-3`} />

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (suggestions.length > 0) setIsOpen(true);
            }}
            placeholder={
              direction === 'az_to_fa'
                ? 'جستجوی واژه ترکی (عربی-فارسی یا لاتین: سئوگی، könül، قاپو)...'
                : direction === 'fa_to_az'
                ? 'جستجوی واژه فارسی (عشق، در، باران، خانه)...'
                : 'جستجوی واژه به ترکی یا فارسی (مانند: سئوگی، عشق، qapı، دوست)...'
            }
            className="w-full bg-transparent border-0 outline-hidden text-slate-900 placeholder:text-slate-400 text-right font-medium"
            autoFocus={autoFocus}
            dir="auto"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSuggestions([]);
                inputRef.current?.focus();
              }}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 mr-2"
              aria-label="پاک کردن متن"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="submit"
            className={`${
              isLarge ? 'px-5 py-2 text-sm' : 'px-3 py-1.5 text-xs'
            } bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-lg transition-colors shrink-0 flex items-center gap-1.5`}
          >
            <span>جستجو</span>
            <ArrowRight className="w-4 h-4 rotate-180" />
          </button>
        </div>
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in-50 duration-150">
          <div className="p-2 border-b border-slate-100 flex items-center justify-between text-xs text-slate-400 px-3">
            <span>پیشنهادهای هوشمند لغت‌نامه</span>
            <span>کلیدهای ↑ و ↓ برای مرور</span>
          </div>
          <ul className="max-h-72 overflow-y-auto divide-y divide-slate-100">
            {suggestions.map((item, index) => {
              const isSelected = selectedIndex === index;
              return (
                <li
                  key={item.id}
                  className={`flex items-center justify-between px-3 py-2 transition-colors ${
                    isSelected ? 'bg-teal-50 text-teal-900' : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectWord) {
                        onSelectWord(item.id);
                      } else {
                        onSearch(item.az_word, direction);
                      }
                      setIsOpen(false);
                    }}
                    className="flex-1 text-right flex items-center justify-between cursor-pointer py-1"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 text-base">{item.az_word}</span>
                        <span className="text-xs text-slate-400 font-mono tracking-tight font-az-latin">
                          ({item.az_latin})
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{item.fa_word}</p>
                    </div>

                    <div className="text-xs text-slate-400 flex items-center gap-1.5 ml-2">
                      <span>{item.part_of_speech_fa}</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleAudioClick(e, item.az_latin || item.az_word)}
                    className="p-1.5 rounded-md text-slate-400 hover:text-teal-700 hover:bg-teal-50 transition-colors mr-2 shrink-0"
                    title="تلفظ صوتی"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
