import React, { useEffect, useState } from 'react';
import { ArrowLeft, BookOpen, Layers } from 'lucide-react';
import { fetchCategories } from '../services/api';

interface CategoriesViewProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState<Array<{ id: string; name: string; name_fa: string; description: string; count: number }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.error('Failed to load categories:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">دسته‌بندی‌های موضوعی لغت‌نامه</h1>
        <p className="text-sm text-slate-600 mt-2">
          مرور فرهنگ واژگان ترکی آذربایجانی بر اساس شاخه‌های موضوعی، زندگی بومی، فرهنگ عامه و علوم
        </p>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <div className="inline-block w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-teal-400 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {cat.name_fa}
                  </h3>
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 bg-slate-100 group-hover:bg-teal-50 group-hover:text-teal-800 rounded-lg text-slate-600 transition-colors">
                    {cat.count} واژه
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-teal-700 font-medium">
                <span>مشاهده واژگان این دسته</span>
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
