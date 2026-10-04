import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/usePWAInstall';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-600/95 text-white px-3.5 py-2 text-xs font-medium shadow-xl backdrop-blur-sm border border-amber-400/40 animate-fade-in" dir="rtl">
      <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
      <WifiOff className="w-3.5 h-3.5" />
      <span>حالت آفلاین — استفاده از داده‌های ذخیره شده در دستگاه</span>
    </div>
  );
};
