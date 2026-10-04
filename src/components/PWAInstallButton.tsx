import React, { useState } from 'react';
import { Smartphone, Download, Check } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { AndroidInstallModal } from './AndroidInstallModal';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'navbar' | 'floating' | 'banner' | 'footer';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ 
  className = '',
  variant = 'navbar'
}) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [showModal, setShowModal] = useState<boolean>(false);

  // If already running standalone and variant is floating or banner, we can hide it
  if (isInstalled && (variant === 'floating' || variant === 'banner')) {
    return null;
  }

  const handleClick = async () => {
    if (isInstallable) {
      const outcome = await install();
      if (!outcome) {
        setShowModal(true);
      }
    } else {
      setShowModal(true);
    }
  };

  if (variant === 'banner') {
    return (
      <>
        <div className="bg-gradient-to-r from-teal-800 to-emerald-700 text-white px-4 py-2.5 shadow-md flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-white/20 rounded-lg">
              <Smartphone className="w-4 h-4 text-emerald-200" />
            </div>
            <div>
              <span className="font-bold">نصب نسخه اندروید سؤزلوک:</span>{' '}
              <span className="text-teal-100 hidden sm:inline">دسترسی سریع و آفلاین بدون باز کردن مرورگر</span>
            </div>
          </div>
          <button
            onClick={handleClick}
            className="px-3.5 py-1.5 bg-white text-teal-800 hover:bg-teal-50 font-bold rounded-lg shadow-sm transition-all flex items-center gap-1.5 text-xs whitespace-nowrap active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>نصب روی گوشی</span>
          </button>
        </div>
        <AndroidInstallModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </>
    );
  }

  if (variant === 'floating') {
    return (
      <>
        <button
          onClick={handleClick}
          className={`fixed bottom-5 left-5 z-40 bg-teal-700 hover:bg-teal-800 text-white px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 text-xs font-semibold border border-teal-500/30 transition-all hover:scale-105 active:scale-95 sm:hidden ${className}`}
        >
          <Smartphone className="w-4 h-4 text-emerald-300" />
          <span>نصب اپ اندروید</span>
        </button>
        <AndroidInstallModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </>
    );
  }

  // Default navbar variant
  return (
    <>
      <button
        onClick={handleClick}
        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 border border-teal-600/30 bg-teal-50 text-teal-800 hover:bg-teal-100 active:scale-95 ${className}`}
        title="نصب نسخه اندروید با قابلیت آفلاین و اجرای سریع"
      >
        <Smartphone className="w-3.5 h-3.5 text-teal-700" />
        <span className="hidden sm:inline">نصب نسخه اندروید</span>
        <span className="sm:hidden">نصب اپ</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
      </button>
      <AndroidInstallModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};
