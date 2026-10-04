/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { SearchResultsView } from './views/SearchResultsView';
import { EntryDetailView } from './views/EntryDetailView';
import { CategoriesView } from './views/CategoriesView';
import { PopularWordsView } from './views/PopularWordsView';
import { PersonalListsView } from './views/PersonalListsView';
import { AiAssistantView } from './views/AiAssistantView';
import { AboutView } from './views/AboutView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { DictionaryEntry, SearchDirection } from './types/dictionary';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchDirection, setSearchDirection] = useState<SearchDirection>('both');
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [aiWordContext, setAiWordContext] = useState<DictionaryEntry | null>(null);
  const [aiPrompt, setAiPrompt] = useState<string>('');

  // Bookmarks persistence in localStorage
  const [savedWordIds, setSavedWordIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('sozluk_bookmarks');
      return stored ? JSON.parse(stored) : ['entry-1', 'entry-3', 'entry-7'];
    } catch {
      return ['entry-1', 'entry-3', 'entry-7'];
    }
  });

  // Search history persistence in localStorage
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('sozluk_history');
      return stored ? JSON.parse(stored) : ['سئوگی', 'قاپو', 'کؤنول'];
    } catch {
      return ['سئوگی', 'قاپو', 'کؤنول'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sozluk_bookmarks', JSON.stringify(savedWordIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedWordIds]);

  useEffect(() => {
    try {
      localStorage.setItem('sozluk_history', JSON.stringify(searchHistory));
    } catch (e) {
      console.error(e);
    }
  }, [searchHistory]);

  const handleToggleBookmark = (wordId: string) => {
    setSavedWordIds((prev) =>
      prev.includes(wordId) ? prev.filter((id) => id !== wordId) : [...prev, wordId]
    );
  };

  const handleSearch = (query: string, direction: SearchDirection = 'both') => {
    if (!query.trim()) return;

    // Add to search history if not duplicate of first item
    setSearchHistory((prev) => {
      const filtered = prev.filter((q) => q !== query.trim());
      return [query.trim(), ...filtered].slice(0, 25);
    });

    setSearchQuery(query);
    setSearchDirection(direction);
    setSelectedCategory(undefined);
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectWord = (wordId: string) => {
    setSelectedWordId(wordId);
    setCurrentView('entry');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: string, extra?: any) => {
    if (view === 'categories' && extra?.selectedCategory) {
      setSelectedCategory(extra.selectedCategory);
      setSearchQuery('');
      setCurrentView('results');
    } else if (view === 'ai-linguist') {
      if (extra?.prompt) setAiPrompt(extra.prompt);
      if (extra?.wordContext) setAiWordContext(extra.wordContext);
      setCurrentView('ai-linguist');
    } else {
      setSelectedCategory(undefined);
      setCurrentView(view);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateAiLinguist = (wordContext: DictionaryEntry) => {
    setAiWordContext(wordContext);
    setAiPrompt(`بررسی ساختاری، ریشه‌شناختی و کاربردهای لهجه‌ای واژه «${wordContext.az_word}» (${wordContext.az_latin}) در ترکی آذربایجانی ایران`);
    setCurrentView('ai-linguist');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* Universal Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        savedWordsCount={savedWordIds.length}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            onSearch={handleSearch}
            onSelectWord={handleSelectWord}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'results' && (
          <SearchResultsView
            initialQuery={searchQuery}
            initialDirection={searchDirection}
            initialCategory={selectedCategory}
            onSelectWord={handleSelectWord}
            onNavigate={handleNavigate}
            savedWordIds={savedWordIds}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {currentView === 'entry' && selectedWordId && (
          <EntryDetailView
            wordId={selectedWordId}
            onBack={() => setCurrentView('results')}
            onSelectWord={handleSelectWord}
            onSearchWord={(q) => handleSearch(q, 'both')}
            onNavigateAiLinguist={handleNavigateAiLinguist}
            isBookmarked={savedWordIds.includes(selectedWordId)}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {currentView === 'categories' && (
          <CategoriesView
            onSelectCategory={(catId) => {
              setSelectedCategory(catId);
              setSearchQuery('');
              setCurrentView('results');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'popular' && (
          <PopularWordsView
            onSelectWord={handleSelectWord}
            savedWordIds={savedWordIds}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {currentView === 'personal' && (
          <PersonalListsView
            savedWordIds={savedWordIds}
            onToggleBookmark={handleToggleBookmark}
            onSelectWord={handleSelectWord}
            searchHistory={searchHistory}
            onSearchQuery={(q) => handleSearch(q, 'both')}
            onClearHistory={() => setSearchHistory([])}
          />
        )}

        {currentView === 'ai-linguist' && (
          <AiAssistantView
            initialPrompt={aiPrompt}
            wordContext={aiWordContext}
            onNavigateEntry={handleSelectWord}
          />
        )}

        {currentView === 'about' && <AboutView />}

        {currentView === 'admin' && (
          <AdminDashboardView onSelectWord={handleSelectWord} />
        )}
      </main>

      {/* Universal Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Android Install Button on Mobile */}
      <PWAInstallButton variant="floating" />

      {/* Offline Status Toast */}
      <OfflineIndicator />
    </div>
  );
}
