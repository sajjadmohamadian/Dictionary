import React, { useState } from 'react';
import { 
  Smartphone, 
  Download, 
  CheckCircle2, 
  X, 
  Share2, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles,
  WifiOff,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface AndroidInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidInstallModal: React.FC<AndroidInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'install' | 'features'>('install');

  if (!isOpen) return null;

  const currentUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDirectInstall = async () => {
    const success = await install();
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col max-h-[92vh]"
        dir="rtl"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 px-6 py-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/15 p-2 flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-inner">
              <Smartphone className="w-7 h-7 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">نسخه اندروید اپلیکیشن سؤزلوک</h2>
                <span className="bg-emerald-400/25 border border-emerald-300/40 text-emerald-100 text-xs px-2 py-0.5 rounded-full font-mono">
                  PWA / WebAPK
                </span>
              </div>
              <p className="text-xs text-teal-100 mt-1">
                قابلیت نصب مستقیم، آیکون اختصاصی و عملکرد آفلاین روی تمامی گوشی‌های اندروید
              </p>
            </div>
          </div>

          {/* Navigation tabs */}
          <div className="flex gap-2 mt-4 pt-2 border-t border-white/15 text-xs font-medium">
            <button
              onClick={() => setActiveTab('install')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'install'
                  ? 'bg-white text-teal-900 font-semibold shadow-sm'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>مراحل نصب روی گوشی</span>
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'features'
                  ? 'bg-white text-teal-900 font-semibold shadow-sm'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>مزایای نسخه اندروید</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-700 text-sm">
          {activeTab === 'install' && (
            <>
              {/* Direct install trigger if browser supports beforeinstallprompt */}
              {isInstallable && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-600 text-white">
                      <Download className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-950 text-sm">نصب مستقیم هم‌اکنون</h4>
                      <p className="text-xs text-emerald-700">مرورگر شما از نصب مستقیم با یک کلیک پشتیبانی می‌کند</p>
                    </div>
                  </div>
                  <button
                    onClick={handleDirectInstall}
                    className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <Download className="w-4 h-4" />
                    <span>نصب فوری برنامه</span>
                  </button>
                </div>
              )}

              {isInstalled && (
                <div className="bg-teal-50 border border-teal-200 rounded-xl p-3.5 flex items-center gap-2.5 text-teal-900 text-xs">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                  <span>برنامه در حال حاضر به عنوان اپلیکیشن مستقل روی دستگاه شما نصب است.</span>
                </div>
              )}

              {/* Step-by-Step Android Installation Guide */}
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-teal-600" />
                  راهنمای گام‌به‌گام نصب در مرورگر گوگل کروم یا سامسونگ:
                </h3>

                <div className="grid gap-3">
                  {/* Step 1 */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      ۱
                    </span>
                    <div>
                      <p className="font-medium text-slate-900 text-xs sm:text-sm">
                        لینک اپلیکیشن را در مرورگر کروم (Chrome) گوشی باز کنید
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        می‌توانید با کلیک روی دکمه کپی لینک زیر، آدرس را مستقیماً در مرورگر موبایل باز کنید.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      ۲
                    </span>
                    <div>
                      <p className="font-medium text-slate-900 text-xs sm:text-sm">
                        روی علامت سه‌نقطه (⋮) در گوشه بالای مرورگر بزنید
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        منوی تنظیمات مرورگر باز خواهد شد.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      ۳
                    </span>
                    <div>
                      <p className="font-medium text-slate-900 text-xs sm:text-sm">
                        گزینه «نصب برنامه» یا «افزودن به صفحه اصلی» را انتخاب کنید
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        در منوی انگلیسی: <strong>«Install app»</strong> یا <strong>«Add to Home screen»</strong>
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      ۴
                    </span>
                    <div>
                      <p className="font-medium text-slate-900 text-xs sm:text-sm">
                        آیکون اختصاصی «سؤزلوک» روی صفحه گوشی اندروید قرار می‌گیرد
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        اپلیکیشن با لمس آیکون باز شده، نوار مرورگر حذف می‌شود و درست مثل یک اپ نیتیو اندروید بدون مزاحمت اجرا می‌گردد.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share / Copy Link for Mobile */}
              <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleCopyLink}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                  <span>{copied ? 'آدرس کپی شد!' : 'کپی لینک برنامه جهت باز کردن در موبایل'}</span>
                </button>

                {navigator.share && (
                  <button
                    onClick={() => {
                      navigator.share({
                        title: 'سؤزلوک: لغت‌نامه ترکی آذربایجانی',
                        text: 'نصب اپلیکیشن لغت‌نامه ترکی آذربایجانی - فارسی سؤزلوک',
                        url: currentUrl,
                      }).catch(() => {});
                    }}
                    className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>اشتراک‌گذاری در گوشی</span>
                  </button>
                )}
              </div>
            </>
          )}

          {activeTab === 'features' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-teal-100 text-teal-800 shrink-0">
                    <WifiOff className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-xs">پشتیبانی کامل آفلاین</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      تمامی صفحات اصلی و جستجوهای قبلی حتی بدون اتصال به اینترنت در دسترس هستند.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-teal-100 text-teal-800 shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-xs">سرعت آنی و حجم اندک</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      حجم برنامه تنها کمتر از ۳ مگابایت است و مانند فایل‌های سنگین APK حافظه گوشی را اشغال نمی‌کند.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-teal-100 text-teal-800 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-xs">به‌روزرسانی خودکار</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      هر واژه یا قابلیت جدیدی که اضافه شود به شکل خودکار و بدون نیاز به دانلود دستی نسخه جدید، آپدیت می‌شود.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-teal-100 text-teal-800 shrink-0">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-xs">تجربه تمام‌صفحه نیتیو</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      نوار آدرس مرورگر ناپدید شده و اپلیکیشن دقیقا مشابه برنامه‌های بومی بازار یا گوگل‌پلی اجرا می‌شود.
                    </p>
                  </div>
                </div>
              </div>

              {/* Note on APK packaging */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                <strong>نکته فنی برای انتشار در کافه بازار یا مایکت:</strong> این اپلیکیشن با استاندارد مدرن Google PWA و WebAPK طراحی شده است. همچنین با ابزارهایی مانند <code>Bubblewrap CLI</code> یا <code>PWABuilder</code> به سادگی می‌توان خروجی <code>.apk</code> و <code>.aab</code> رسمی برای ثبت در مارکت‌های اندرویدی نیز ایجاد نمود.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors shadow-sm"
          >
            متوجه شدم و بستن
          </button>
        </div>
      </div>
    </div>
  );
};
