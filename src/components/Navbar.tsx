import React, { useState } from 'react';
import { BookOpen, Search, Grid, TrendingUp, Bookmark, Sparkles, Info, Shield, Menu, X } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, extra?: any) => void;
  savedWordsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, savedWordsCount = 0 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'جستجو', icon: Search },
    { id: 'categories', label: 'موضوعات', icon: Grid },
    { id: 'popular', label: 'واژگان پربازدید', icon: TrendingUp },
    { id: 'personal', label: 'واژگان من', icon: Bookmark, badge: savedWordsCount > 0 ? savedWordsCount : null },
    { id: 'ai-linguist', label: 'دستیار زبانی', icon: Sparkles },
    { id: 'about', label: 'راهنمای لغت‌نامه', icon: Info },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-xl font-bold tracking-tight text-slate-900 hover:text-teal-700 transition-colors flex items-center gap-2 text-right"
          >
            <BookOpen className="w-6 h-6 text-teal-600 stroke-[2.2]" />
            <span className="font-semibold text-slate-900">سؤزلوک</span>
            <span className="text-slate-400 font-normal text-sm font-mono tracking-tight">| Sözlük</span>
          </button>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`transition-colors whitespace-nowrap relative py-1 text-sm ${
                    isActive
                      ? 'text-teal-700 font-semibold border-b-2 border-teal-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.label}
                    {link.badge && (
                      <span className="text-xs bg-teal-100 text-teal-800 font-mono px-1.5 py-0.2 rounded-full font-bold">
                        {link.badge}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2.5">
            <PWAInstallButton variant="navbar" />

            <button
              onClick={() => handleNavClick('admin')}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                currentView === 'admin'
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>پنل مدیریت</span>
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="منو"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-teal-50 text-teal-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-slate-500" />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="text-xs bg-teal-100 text-teal-800 font-mono px-2 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-100">
            <PWAInstallButton variant="banner" />
          </div>
        </div>
      )}
    </header>
  );
};
