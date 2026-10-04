import React, { useState } from 'react';
import { BookOpen, Smartphone } from 'lucide-react';
import { AndroidInstallModal } from './AndroidInstallModal';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [showInstallModal, setShowInstallModal] = useState(false);
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20 pt-12 pb-10 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <BookOpen className="w-5 h-5 text-teal-400" />
              <span>فرهنگ لغت ترکی آذربایجانی ایران و فارسی</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm max-w-md">
              پایگاه تخصصی واژگان، اصطلاحات، امثال و حکم زبان ترکی آذربایجانی متداول در ایران (آذربایجان شرقی، غربی، اردبیل، زنجان و سایر مناطق) با انطباق دقیق رسم‌الخط عربی-فارسی و الفبای لاتین و معادل‌های فارسی.
            </p>
          </div>

          {/* Quick Access */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">بخش‌های واژه‌نامه</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-teal-300 transition-colors">
                  جستجوی دوطرفه واژگان
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('categories')} className="hover:text-teal-300 transition-colors">
                  دسته‌بندی‌های موضوعی
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('popular')} className="hover:text-teal-300 transition-colors">
                  واژگان پرکاربرد و محبوب
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('personal')} className="hover:text-teal-300 transition-colors">
                  مجموعه‌های نشان‌شده من
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setShowInstallModal(true)} 
                  className="hover:text-teal-300 transition-colors flex items-center gap-1.5 text-emerald-400 font-semibold"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>نصب نسخه اندروید (PWA)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Scientific Reference */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">پژوهش و راهنما</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => onNavigate('ai-linguist')} className="hover:text-teal-300 transition-colors">
                  دستیار هوش مصنوعی زبان‌شناسی
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-teal-300 transition-colors">
                  شیوه‌نامه نگارش ترکی در ایران
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-teal-300 transition-colors">
                  تفاوت‌های لهجه‌های تبریز، ارومیه و زنجان
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-teal-300 transition-colors">
                  ورود کارشناسان و ویراستاران
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom subtle bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© ۲۰۲۶ فرهنگ لغت سؤزلوک. پایگاه مستقل زبان و ادب ترکی آذربایجانی در ایران.</p>
          <div className="flex items-center gap-4">
            <span>رسم‌الخط استاندارد عربی-فارسی و لاتین</span>
            <span aria-hidden="true">·</span>
            <span>پشتیبانی از تفاوت‌های لهجه‌ای</span>
          </div>
        </div>
      </div>

      <AndroidInstallModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
      />
    </footer>
  );
};
