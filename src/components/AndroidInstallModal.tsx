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
  ShieldCheck,
  FileCode,
  Package,
  Layers,
  ArrowRight
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface AndroidInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidInstallModal: React.FC<AndroidInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [copied, setCopied] = useState(false);
  const [copiedCommands, setCopiedCommands] = useState(false);
  const [activeTab, setActiveTab] = useState<'install' | 'apk' | 'features'>('install');

  if (!isOpen) return null;

  const currentUrl = window.location.origin;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCapacitorCommands = () => {
    const commands = `npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "سؤزلوک" "com.sozluk.dictionary" --web-dir dist
npm run build
npx cap add android
npx cap open android`;
    navigator.clipboard.writeText(commands);
    setCopiedCommands(true);
    setTimeout(() => setCopiedCommands(false), 2500);
  };

  const handleDirectInstall = async () => {
    const success = await install();
    if (success) {
      onClose();
    }
  };

  const pwaBuilderUrl = `https://www.pwabuilder.com/reportcard?site=${encodeURIComponent(currentUrl)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden flex flex-col max-h-[92vh]"
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
                <h2 className="text-xl font-bold">نسخه اندروید و فایل نصبی APK سؤزلوک</h2>
                <span className="bg-emerald-400/25 border border-emerald-300/40 text-emerald-100 text-xs px-2 py-0.5 rounded-full font-mono">
                  آفلاین ۱۰۰٪
                </span>
              </div>
              <p className="text-xs text-teal-100 mt-1">
                راهنمای نصب مستقیم روی گوشی، دریافت فایل APK و عملکرد کاملاً آفلاین
              </p>
            </div>
          </div>

          {/* Navigation tabs */}
          <div className="flex gap-1.5 mt-4 pt-2 border-t border-white/15 text-xs font-medium overflow-x-auto">
            <button
              onClick={() => setActiveTab('install')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'install'
                  ? 'bg-white text-teal-900 font-semibold shadow-sm'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>نصب فوری روی گوشی (ساده‌ترین روش)</span>
            </button>
            <button
              onClick={() => setActiveTab('apk')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'apk'
                  ? 'bg-white text-teal-900 font-semibold shadow-sm'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>دریافت فایل نصبی APK</span>
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'features'
                  ? 'bg-white text-teal-900 font-semibold shadow-sm'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <WifiOff className="w-3.5 h-3.5" />
              <span>نحوه کارکرد آفلاین</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-700 text-sm">
          {/* TAB 1: DIRECT 1-CLICK WEBAPK INSTALLATION */}
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
                      <p className="text-xs text-emerald-700">مرورگر شما آماده نصب این برنامه روی گوشی است</p>
                    </div>
                  </div>
                  <button
                    onClick={handleDirectInstall}
                    className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <Download className="w-4 h-4" />
                    <span>نصب فوری روی گوشی</span>
                  </button>
                </div>
              )}

              {isInstalled && (
                <div className="bg-teal-50 border border-teal-200 rounded-xl p-3.5 flex items-center gap-2.5 text-teal-900 text-xs">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                  <span>اپلیکیشن سؤزلوک در حال حاضر به عنوان برنامه مستقل روی دستگاه شما نصب شده است.</span>
                </div>
              )}

              {/* Clarification banner */}
              <div className="bg-teal-50/70 border border-teal-200/80 rounded-xl p-3.5 text-xs text-teal-900 leading-relaxed flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <strong>چرا نصب مستقیم بهتر از فایل APK است؟</strong> سیستم‌عامل اندروید هنگام زدن گزینه «نصب برنامه»، خودکار یک پکیج <strong>WebAPK</strong> با آیکون اختصاصی و بدون نوار مرورگر در لیست برنامه‌ها نصب می‌کند و تمامی ۱۹۱۹ واژه را آفلاین در حافظه گوشی ذخیره می‌نماید، بدون اینکه نیاز به دانلود فایل‌های حجیم و خطر بدافزار باشد.
                </div>
              </div>

              {/* Step-by-Step Android Installation Guide */}
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-teal-600" />
                  راهنمای گام‌به‌گام نصب در مرورگر گوگل کروم یا سامسونگ اینترنت:
                </h3>

                <div className="grid gap-2.5">
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
                        با دکمه کپی لینک در پایین، آدرس را مستقیماً در موبایل باز نمایید.
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
                        روی منوی سه‌نقطه (⋮) در گوشه بالای کروم بزنید
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        در مرورگر سامسونگ، روی دکمه همبرگری (سه خط) پایین صفحه بزنید.
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
                        (در منوی انگلیسی: <strong>«Install app»</strong> یا <strong>«Add to Home screen»</strong>)
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
                        تمام! آیکون «سؤزلوک» روی صفحه گوشی قرار می‌گیرد
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        برنامه مثل سایر اپ‌های اندروید باز می‌شود و حتی بدون اینترنت تمام کلمات را جستجو می‌کند.
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
                        url: window.location.href,
                      }).catch(() => {});
                    }}
                    className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>ارسال لینک به گوشی</span>
                  </button>
                )}
              </div>
            </>
          )}

          {/* TAB 2: STANDALONE APK FILE GENERATION */}
          {activeTab === 'apk' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 leading-relaxed">
                <div className="flex items-center gap-2 font-bold text-amber-950 mb-1">
                  <Package className="w-4 h-4 text-amber-700" />
                  <span>آیا حتماً فایل مستقیم APK نیاز دارید؟</span>
                </div>
                اگر قصد دارید فایل فیزیکی <code>.apk</code> را در تلگرام یا واتساپ برای دیگران بفرستید، یا آن را در کافه بازار، مایکت یا گوگل‌پلی منتشر کنید، از دو روش زیر می‌توانید فایل نصبی را دریافت کنید:
              </div>

              {/* Method 1: PWABuilder (Official 1-Click APK Generator) */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-teal-700 text-white text-xs flex items-center justify-center font-bold">
                      ۱
                    </span>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                      تولید آنلاین فایل APK با یک کلیک (PWABuilder)
                    </h4>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                    بدون نیاز به کدنویسی
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  ابزار رسمی <strong>PWABuilder</strong> (توسعه‌داده شده توسط مایکروسافت و همگام با استانداردهای گوگل) مانیفست و سرویس‌ورکر این اپلیکیشن را دریافت کرده و مستقیماً بسته نصبی <strong>APK</strong> و <strong>AAB</strong> را برای شما خروجی می‌گیرد.
                </p>

                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <a
                    href={pwaBuilderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors text-center"
                  >
                    <span>تولید فایل APK در PWABuilder</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={handleCopyLink}
                    className="px-3 py-2.5 border border-slate-300 bg-white hover:bg-slate-100 rounded-lg text-xs font-medium text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>کپی آدرس سایت</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-500">
                  مراحل در سایت PWABuilder: وارد لینک شده و روی دکمه آبی <strong>Package for Stores</strong> بزنید، سپس گزینه <strong>Android</strong> را انتخاب و روی <strong>Generate Package</strong> کلیک کنید تا فایل APK تحویل داده شود.
                </p>
              </div>

              {/* Method 2: Capacitor / Android Studio */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-700 text-white text-xs flex items-center justify-center font-bold">
                      ۲
                    </span>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                      ساخت پروژه نیتیو APK با Capacitor و Android Studio
                    </h4>
                  </div>
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-medium">
                    مخصوص توسعه‌دهندگان
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  اگر سورس‌کد پروژه را در گیت‌هاب دارید، می‌توانید با ابزار <strong>Capacitor</strong> در عرض چند ثانیه پروژه اندروید استودیو بسازید و فایل <code>app-release.apk</code> را کامپایل کنید:
                </p>

                <div className="bg-slate-900 text-slate-100 p-3 rounded-lg text-xs font-mono relative text-left" dir="ltr">
                  <pre className="whitespace-pre-wrap overflow-x-auto text-[11px]">
{`# 1. نصب ابزارهای کاپاسیتور
npm install @capacitor/core @capacitor/cli @capacitor/android

# 2. بیلد کدهای وب و دیتابیس لغت‌نامه
npm run build

# 3. افزودن پلتفرم اندروید و باز کردن پروژه
npx cap add android
npx cap open android`}
                  </pre>
                  <button
                    onClick={handleCopyCapacitorCommands}
                    className="absolute top-2 right-2 p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title="کپی دستورات"
                  >
                    {copiedCommands ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500">
                  در اندروید استودیو با زدن منوی <code>Build &gt; Build Bundle(s) / APK(s) &gt; Build APK(s)</code> فایل APK آماده می‌شود.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: OFFLINE FEATURES */}
          {activeTab === 'features' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-950 leading-relaxed flex items-start gap-3">
                <WifiOff className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-teal-900 mb-1">
                    چرا و چگونه اپلیکیشن کاملاً آفلاین کار می‌کند؟
                  </h4>
                  پایگاه داده کامل <strong>۱۹۱۹ مدخل لغت‌نامه ترکی آذربایجانی و فارسی</strong> با تمام جزئیات (آوانگاری، لهجه‌ها، ریشه‌شناسی و معادل‌های فارسی) به شکل یک فایل بهینه‌شده به همراه کدهای موتور جستجو در حافظه داخلی دستگاه شما (از طریق Service Worker و IndexedDB) ذخیره می‌شود. بنابراین حتی اگر اینترنت شما قطع باشد یا در سفر و نقاط بدون آنتن باشید:
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-teal-100 text-teal-800 shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-xs">جستجوی آنی بدون تأخیر</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      موتور هوشمند جستجو با تصحیح املایی و تلفظ مستقیماً روی پردازنده گوشی اجرا می‌شود.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-teal-100 text-teal-800 shrink-0">
                    <WifiOff className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-xs">عملکرد در حالت پرواز</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      حتی با قطع کامل دیتا و وای‌فای، تمامی صفحات واژه‌ها، دسته‌بندی‌ها و نشان‌شده‌ها باز می‌شوند.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-teal-100 text-teal-800 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-xs">بدون مصرف اینترنت</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      پس از نخستین بارگذاری، نیازی به مصرف حتی یک کیلوبایت اینترنت برای جستجوهای بعدی ندارید.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-teal-100 text-teal-800 shrink-0">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-xs">حجم سبک (کمتر از ۳ مگابایت)</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      برخلاف برنامه‌های سنگین ۵۰ مگابایتی، کل این فرهنگ‌لغت تنها ۳ مگابایت فضا اشغال می‌کند.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                <strong>نکته دستیار هوش مصنوعی (AI Linguist):</strong> بخش تحلیل عمیق زبانی توسط هوش مصنوعی جمینای به دلیل پردازش در سرور نیازمند اتصال به اینترنت است، اما تمامی لغات، جستجوها و امکانات فرهنگ لغت ۱۰۰٪ آفلاین هستند.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => setActiveTab(activeTab === 'install' ? 'apk' : 'install')}
            className="text-xs text-teal-700 hover:text-teal-900 font-medium flex items-center gap-1 transition-colors"
          >
            <span>{activeTab === 'install' ? 'نمایش گزینه‌های دانلود فایل APK' : 'بازگشت به راهنمای نصب مستقیم روی گوشی'}</span>
            <ArrowRight className="w-3 h-3 rotate-180" />
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors shadow-sm"
          >
            بستن پنجره
          </button>
        </div>
      </div>
    </div>
  );
};
