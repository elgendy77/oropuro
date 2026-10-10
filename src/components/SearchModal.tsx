import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Sparkles, TrendingUp, Tag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { 
  POPULAR_SEARCH_KEYWORDS, 
  getSimilarKeywords, 
  matchProductWithQuery 
} from '../utils/searchHelper';
import type { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySearch: (query: string) => void;
  initialQuery?: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onApplySearch,
  initialQuery = ''
}) => {
  const { products, setActiveProductForDetail, setActiveView } = useStore();
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSearchTerm(initialQuery);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, initialQuery]);

  if (!isOpen) return null;

  // Compute live suggestions (similar words)
  const similarWords = getSimilarKeywords(searchTerm);

  // Compute matching products
  const matchingProducts = searchTerm.trim() === ''
    ? []
    : products
        .filter(p => p.gender !== 'women')
        .map(p => ({ product: p, ...matchProductWithQuery(p, searchTerm) }))
        .filter(res => res.matched)
        .sort((a, b) => b.score - a.score)
        .slice(0, 6)
        .map(res => res.product);

  const handleSelectKeyword = (keyword: string) => {
    // Extract base keyword if format is "Alias • Name"
    const cleaned = keyword.includes('•') ? keyword.split('•')[0].trim() : keyword.replace(/\(.*?\)/g, '').trim();
    setSearchTerm(cleaned);
    onApplySearch(cleaned);
    setActiveView('store');
    
    // Smooth scroll to product grid
    setTimeout(() => {
      onClose();
      const el = document.getElementById('perfumes-collection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleSelectProduct = (product: Product) => {
    onClose();
    setActiveProductForDetail(product);
  };

  const handleViewAllResults = () => {
    onApplySearch(searchTerm);
    setActiveView('store');
    onClose();
    setTimeout(() => {
      const el = document.getElementById('perfumes-collection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleClear = () => {
    setSearchTerm('');
    onApplySearch('');
    inputRef.current?.focus();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-start justify-center p-3 sm:p-6 animate-fade-in font-arabic" dir="rtl">
      
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-white border border-[#E8E2D8] rounded-3xl shadow-2xl overflow-hidden my-6 sm:my-12 z-10 flex flex-col max-h-[88vh]">
        
        {/* Top Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#EAE3D6] bg-[#FAF8F5] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-forest-50 border border-forest-200 text-forest-800 flex items-center justify-center shrink-0">
            <Search className="w-5 h-5 text-forest-700" />
          </div>

          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="ابحث باسم العطر أو الماركة (مثال: سوفاج، ديور، شانيل، افينتوس، فانيليا)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleViewAllResults();
                } else if (e.key === 'Escape') {
                  onClose();
                }
              }}
              className="w-full pl-8 pr-3 py-2.5 text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:border-forest-700 focus:ring-2 focus:ring-forest-700/20 shadow-xs"
            />
            {searchTerm && (
              <button
                onClick={handleClear}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* SIMILAR KEYWORDS & SUGGESTIONS */}
          {searchTerm.trim() !== '' && similarWords.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-2.5">
                <Tag className="w-3.5 h-3.5 text-gold-600" />
                <span>الكلمات المشابهة والاقتراحات المقترنة بـ "{searchTerm}":</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {similarWords.map((word, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectKeyword(word)}
                    className="text-xs font-bold px-3 py-1.5 rounded-xl bg-forest-50 hover:bg-forest-100 text-forest-900 border border-forest-200 transition-all flex items-center shadow-2xs hover:scale-102"
                  >
                    <span>{word}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* INSTANT LIVE MATCHING PERFUMES */}
          {searchTerm.trim() !== '' && (
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-3">
                <span className="flex items-center gap-1.5 text-forest-900 font-extrabold text-sm">
                  <Sparkles className="w-4 h-4 text-gold-600" />
                  العطور المطابقة فوراً ({matchingProducts.length}):
                </span>

                {matchingProducts.length > 0 && (
                  <button
                    onClick={handleViewAllResults}
                    className="text-xs text-gold-800 hover:text-gold-950 font-bold underline"
                  >
                    عرض كل النتائج في المتجر
                  </button>
                )}
              </div>

              {matchingProducts.length === 0 ? (
                <div className="text-center py-8 bg-[#FAF8F5] rounded-2xl border border-[#EAE3D6] p-6">
                  <p className="text-sm font-bold text-slate-700 mb-1">
                    لم نجد عطوراً مطابقة تماماً لكلمة "{searchTerm}"
                  </p>
                  <p className="text-xs text-slate-500 mb-4">
                    جرب البحث باسم الماركة (ديور، شانيل، توم فورد، كريد) أو نوتات مثل (فانيليا، عود، حمضيات)
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <span className="text-xs font-bold text-slate-400">اقتراحات سريعة:</span>
                    {['سوفاج', 'بلو دي شانيل', 'أفينتوس', 'باكارات روج'].map(s => (
                      <button
                        key={s}
                        onClick={() => handleSelectKeyword(s)}
                        className="text-xs font-bold px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-slate-700 hover:border-gold-500"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {matchingProducts.map((product) => {
                    const price = product.sizes?.[0]?.price || 400;
                    return (
                      <div
                        key={product.id}
                        onClick={() => handleSelectProduct(product)}
                        className="p-3 rounded-2xl border border-[#E8E2D8] bg-[#FAF8F5] hover:bg-white hover:border-forest-700 hover:shadow-md cursor-pointer transition-all flex items-center justify-between gap-3 group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-xl bg-white border border-[#EAE3D6] p-1.5 flex items-center justify-center shrink-0">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-contain filter group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-gold-700 uppercase block">
                              {product.brand}
                            </span>
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-forest-800 transition-colors line-clamp-1">
                              {product.name}
                            </h4>
                            <span className="text-[10px] text-slate-500 block">
                              {product.gender === 'men' ? 'رجالي' : product.gender === 'women' ? 'نسائي' : 'للجنسين'} • {product.concentration}
                            </span>
                          </div>
                        </div>

                        <div className="text-left shrink-0">
                          <span className="text-sm font-black text-slate-900 font-mono block">
                            {price} ج.م
                          </span>
                          <span className="text-[10px] text-forest-700 font-bold group-hover:underline">
                            معاينة ←
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* DEFAULT STATE: POPULAR / TRENDING SEARCHES */}
          {searchTerm.trim() === '' && (
            <div className="space-y-6">
              
              {/* Popular Searches Pills */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600 mb-3">
                  <TrendingUp className="w-4 h-4 text-gold-600" />
                  <span>عمليات البحث الأكثر شيوعاً في متجر Oro Puro:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {POPULAR_SEARCH_KEYWORDS.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectKeyword(item.text)}
                      className="p-3 rounded-xl border border-[#EAE3D6] bg-[#FAF8F5] hover:bg-forest-50 hover:border-forest-600 text-right transition-all flex items-center justify-between group shadow-2xs"
                    >
                      <div>
                        <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-forest-900">
                          {item.text}
                        </span>
                      </div>

                      {item.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold-100 text-gold-900 border border-gold-300">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Brand Explorer */}
              <div className="pt-4 border-t border-[#EAE3D6]">
                <span className="text-xs font-bold text-slate-400 block mb-2">تصفح أشهر الماركات بنقرة واحدة:</span>
                <div className="flex flex-wrap gap-1.5">
                  {['ديور (Dior)', 'شانيل (Chanel)', 'توم فورد (Tom Ford)', 'كريد (Creed)', 'إيف سان لوران (YSL)', 'أرماني (Armani)', 'كيليان (Kilian)', 'نيشاني (Nishane)', 'فرزاتشي (Versace)'].map((b) => (
                    <button
                      key={b}
                      onClick={() => handleSelectKeyword(b)}
                      className="text-xs px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-gold-500 hover:text-gold-900 transition-colors font-medium"
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer with Action */}
        {searchTerm.trim() !== '' && matchingProducts.length > 0 && (
          <div className="p-4 bg-[#FAF8F5] border-t border-[#EAE3D6] flex items-center justify-between">
            <span className="text-xs text-slate-500">
              اضغط Enter أو الزر للذهاب لكافة نتائج البحث
            </span>

            <button
              onClick={handleViewAllResults}
              className="btn-forest px-5 py-2 rounded-xl text-xs font-bold shadow-sm flex items-center"
            >
              <span>مشاهدة النتائج في المتجر</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
