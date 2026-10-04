import React from 'react';
import { BookOpen, CheckCircle, HelpCircle, Layers, Globe, ShieldCheck } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          درباره لغت‌نامه و شیوه‌نامه نگارش ترکی آذربایجانی در ایران
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          اصول زبان‌شناختی، سیستم آوانگاری و تمایزهای ترکی آذربایجانی در ایران با سایر شاخه‌های خانواده زبان‌های ترکی
        </p>
      </div>

      {/* Section 1: Specificity of Iranian Azerbaijani */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-teal-800 font-bold text-base">
          <Globe className="w-5 h-5 text-teal-600" />
          <h2>۱. ویژگی‌های ترکی آذربایجانی متداول در ایران</h2>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed font-fa">
          ترکی آذربایجانی رایج در ایران از شاخه اوغوز زبان‌های ترکی است که سده‌ها در پیوند عمیق و هم‌زیستی فرهنگی و ادبی با زبان فارسی بالیده است. این زبان اگرچه از نظر ریشه و دستور با ترکی جمهوری آذربایجان و ترکی ترکیه اشتراکات بنیادین دارد، اما از جنبه‌های کلیدی زیر هویتی متمایز دارد:
        </p>

        <ul className="space-y-3 text-xs sm:text-sm text-slate-600 pr-4 list-disc marker:text-teal-600 leading-relaxed">
          <li>
            <strong className="text-slate-800">رسم‌الخط مستمر تاریخی:</strong> برخلاف جمهوری آذربایجان که خط رسمی آن به کریلیک و سپس لاتین تغییر یافت، در ایران متون، دیوان‌ها و کتب همواره با خط عربی-فارسی کتابت شده‌اند.
          </li>
          <li>
            <strong className="text-slate-800">تنوعات لهجه‌ای گسترده:</strong> گویش‌های تبریز، ارومیه، اردبیل، زنجان، قشقایی، خلخال، سراب و مراغه هر یک ویژگی‌های فونتیک بومی خود را حفظ کرده‌اند (برای نمونه تفاوت تلفظ «ک» در پایانه واژگان در تبریز به صورت «ح» یا «خ» مانند چؤره‌ک / چؤره‌ح).
          </li>
          <li>
            <strong className="text-slate-800">تعامل واژگانی متقابل:</strong> صدها واژه، ضرب‌المثل، تشبیه و استعاره مشترک و وام‌گیری دوسویه میان زبان فارسی و ترکی آذربایجانی در طی قرون به وجود آمده است.
          </li>
        </ul>
      </section>

      {/* Section 2: Orthography & The 9 Vowels */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-5">
        <div className="flex items-center gap-2 text-teal-800 font-bold text-base">
          <BookOpen className="w-5 h-5 text-teal-600" />
          <h2>۲. شیوه‌نامه نگارش ۹ مصوت ترکی با الفبای عربی-فارسی</h2>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed font-fa">
          زبان ترکی دارای ۹ مصوت (صداهای صدادار) است که بر اساس جایگاه زبان به دو گروه «قالین» (پسین/ضخیم) و «اینجه» (پیشین/نازک) تقسیم می‌شوند:
        </p>

        {/* Vowel Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right border-collapse border border-slate-200">
            <thead>
              <tr className="bg-slate-50 text-slate-700 border-b border-slate-200">
                <th className="p-3 border-l border-slate-200">مصوت</th>
                <th className="p-3 border-l border-slate-200">الفبای عربی-فارسی</th>
                <th className="p-3 border-l border-slate-200">الفبای لاتین</th>
                <th className="p-3 border-l border-slate-200">نوع صوت</th>
                <th className="p-3">نمونه واژه در ایران</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600 font-mono">
              <tr>
                <td className="p-3 border-l border-slate-200 font-bold text-slate-800">A / آ</td>
                <td className="p-3 border-l border-slate-200 font-fa">آ / ــا</td>
                <td className="p-3 border-l border-slate-200">a</td>
                <td className="p-3 border-l border-slate-200 font-fa">قالین (پسین)</td>
                <td className="p-3 font-fa">آتا (پدر)، آتا‌لار</td>
              </tr>
              <tr>
                <td className="p-3 border-l border-slate-200 font-bold text-slate-800">Ə / اَ</td>
                <td className="p-3 border-l border-slate-200 font-fa">اَ / ــه / ه</td>
                <td className="p-3 border-l border-slate-200">ə</td>
                <td className="p-3 border-l border-slate-200 font-fa">اینجه (پیشین)</td>
                <td className="p-3 font-fa">ال (دست)، گلمک (آمدن)</td>
              </tr>
              <tr>
                <td className="p-3 border-l border-slate-200 font-bold text-slate-800">E / ائ</td>
                <td className="p-3 border-l border-slate-200 font-fa">ائـ / ئـ</td>
                <td className="p-3 border-l border-slate-200">e</td>
                <td className="p-3 border-l border-slate-200 font-fa">اینجه (پیشین)</td>
                <td className="p-3 font-fa">ائو (خانه)، گئتمک (رفتن)</td>
              </tr>
              <tr>
                <td className="p-3 border-l border-slate-200 font-bold text-slate-800">I / ایـ خفه</td>
                <td className="p-3 border-l border-slate-200 font-fa">ایـ / ی</td>
                <td className="p-3 border-l border-slate-200">ı</td>
                <td className="p-3 border-l border-slate-200 font-fa">قالین (پسین)</td>
                <td className="p-3 font-fa">قاپی / قاپو (در)، یاغیش (باران)</td>
              </tr>
              <tr>
                <td className="p-3 border-l border-slate-200 font-bold text-slate-800">İ / ای</td>
                <td className="p-3 border-l border-slate-200 font-fa">ایـ / ی</td>
                <td className="p-3 border-l border-slate-200">i</td>
                <td className="p-3 border-l border-slate-200 font-fa">اینجه (پیشین)</td>
                <td className="p-3 font-fa">دیل (زبان)، بیلمک (دانستن)</td>
              </tr>
              <tr>
                <td className="p-3 border-l border-slate-200 font-bold text-slate-800">O / اوْ</td>
                <td className="p-3 border-l border-slate-200 font-fa">اوْ / وْ</td>
                <td className="p-3 border-l border-slate-200">o</td>
                <td className="p-3 border-l border-slate-200 font-fa">قالین (پسین)</td>
                <td className="p-3 font-fa">اون (ده)، اوت (علف)</td>
              </tr>
              <tr>
                <td className="p-3 border-l border-slate-200 font-bold text-slate-800">Ö / اؤ</td>
                <td className="p-3 border-l border-slate-200 font-fa">اؤ / ؤ</td>
                <td className="p-3 border-l border-slate-200">ö</td>
                <td className="p-3 border-l border-slate-200 font-fa">اینجه (پیشین)</td>
                <td className="p-3 font-fa">گؤز (چشم)، کؤنول (دل)</td>
              </tr>
              <tr>
                <td className="p-3 border-l border-slate-200 font-bold text-slate-800">U / او</td>
                <td className="p-3 border-l border-slate-200 font-fa">او / و</td>
                <td className="p-3 border-l border-slate-200">u</td>
                <td className="p-3 border-l border-slate-200 font-fa">قالین (پسین)</td>
                <td className="p-3 font-fa">اولدوز (ستاره)، سو (آب)</td>
              </tr>
              <tr>
                <td className="p-3 border-l border-slate-200 font-bold text-slate-800">Ü / اۆ</td>
                <td className="p-3 border-l border-slate-200 font-fa">او / اۆ / ۆ</td>
                <td className="p-3 border-l border-slate-200">ü</td>
                <td className="p-3 border-l border-slate-200 font-fa">اینجه (پیشین)</td>
                <td className="p-3 font-fa">اوره‌ک / اۆرک (قلب)، گونش (خورشید)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Smart Search & Normalization Engine */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-teal-800 font-bold text-base">
          <ShieldCheck className="w-5 h-5 text-teal-600" />
          <h2>۳. معماری و خطایابی هوشمند موتور جستجو</h2>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed font-fa">
          یکی از بزرگترین موانع جستجو در فرهنگ‌های لغت ترکی در ایران، تفاوت تایپ کلمات در کیبوردهای مختلف، عدم درج حرکات یا وجود پسوندهای صرفی متعدد است. لغت‌نامه سؤزلوک مجهز به لایه نرمال‌سازی محاسباتی است که:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1">
            <h4 className="font-bold text-slate-800">یکسان‌سازی حروف فارسی و عربی</h4>
            <p className="text-slate-600">
              تبدیل خودکار «ي» عربی به «ی»، «ك» به «ک»، و حذف اعراب‌های زائد حین جستجو.
            </p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1">
            <h4 className="font-bold text-slate-800">پوشش املاهای متداول</h4>
            <p className="text-slate-600">
              جستجوی «سوگی» شما را مستقیماً به «سئوگی»، و «قاپو» را به «قاپی» هدایت می‌کند.
            </p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1">
            <h4 className="font-bold text-slate-800">پیوند خط لاتین و عربی</h4>
            <p className="text-slate-600">
              اگر کلمه را به لاتین بنویسید (مانند sevgı یا konul)، مدخل عربی-فارسی آن بلادرنگ پیدا می‌شود.
            </p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1">
            <h4 className="font-bold text-slate-800">شناسایی ریشه و پسوندزدایی</h4>
            <p className="text-slate-600">
              جداسازی پسوندهای جمع (-لار/لر)، پسوندهای ملکی و حالت‌های دستوری برای استخراج ریشه.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Android App & Offline PWA Capabilities */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-teal-800 font-bold text-base">
          <Layers className="w-5 h-5 text-teal-600" />
          <h2>۴. نسخه اندروید و قابلیت استفاده آفلاین (PWA / WebAPK)</h2>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed font-fa">
          اپلیکیشن سؤزلوک به صورت پیشرو (Progressive Web App) طراحی شده است تا کاربران گوشی‌های اندروید بتوانند بدون نیاز به دانلود فایل‌های حجیم و وابستگی به مارکت‌های واسط، نرم‌افزار را با تمام امکانات نصب و استفاده کنند:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1.5">
            <h4 className="font-bold text-slate-800 text-sm">نصب مستقیم روی گوشی</h4>
            <p className="text-slate-600 leading-relaxed">
              با فشردن دکمه «نصب نسخه اندروید» یا گزینه Install App مرورگر، آیکون برنامه در لانچر اندروید ظاهر می‌شود.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1.5">
            <h4 className="font-bold text-slate-800 text-sm">عملکرد مستقل و آفلاین</h4>
            <p className="text-slate-600 leading-relaxed">
              پایگاه داده لغات جستجو شده و رابط کاربری کش شده و در مواقع قطعی یا عدم دسترسی به اینترنت کاملاً فعال است.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1.5">
            <h4 className="font-bold text-slate-800 text-sm">اجرای تمام‌صفحه نیتیو</h4>
            <p className="text-slate-600 leading-relaxed">
              بدون نوار آدرس و ابزارهای اضافه مرورگر، دقیقاً با حس و حال یک اپلیکیشن بومی اندرویدی اجرا می‌شود.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
