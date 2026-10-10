import React, { useState } from 'react';
import { 
  X, Plus, Sparkles, Scale, Trash2, ShoppingBag, 
  Search, Flame, Clock, Wind, Calendar
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { 
  FRAGRANTICA_PRESET_PERFUMES, 
  productToComparisonItem,
  type PerfumeComparisonItem 
} from '../data/fragranticaDatabase';
import type { PerfumeGender } from '../types';

export const PerfumeComparisonModal: React.FC = () => {
  const { 
    isComparisonOpen, 
    setIsComparisonOpen, 
    comparisonItems, 
    addToComparison, 
    removeFromComparison, 
    clearComparison,
    addToCart,
    products
  } = useStore();

  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'store' | 'fragrantica' | 'men' | 'women'>('all');

  // Custom perfume form state
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customForm, setCustomForm] = useState({
    name: '',
    brand: '',
    gender: 'unisex' as PerfumeGender,
    concentration: 'Eau de Parfum',
    topNotes: '',
    heartNotes: '',
    baseNotes: '',
    longevityHours: '+10 ساعات',
    longevityScore: 90,
    sillageRange: 'مترين',
    sillageScore: 88,
    vibe: '',
    occasions: 'السهرات والمناسبات الخاصة',
    seasons: 'الخريف والشتاء'
  });

  if (!isComparisonOpen) return null;

  // Filter available perfumes to add
  const allAvailablePerfumes: PerfumeComparisonItem[] = [
    ...products.map(p => productToComparisonItem(p)),
    ...FRAGRANTICA_PRESET_PERFUMES.filter(f => !products.some(p => p.id === f.id || p.id === f.storeProductId))
  ];

  const filteredAvailable = allAvailablePerfumes
    .filter(item => {
      // Don't show already selected
      if (comparisonItems.some(c => c.id === item.id || (item.storeProductId && c.id === item.storeProductId))) {
        return false;
      }
      // Filter tab
      if (activeFilter === 'store' && !item.inStore) return false;
      if (activeFilter === 'fragrantica' && item.inStore) return false;
      if (activeFilter === 'men' && item.gender !== 'men') return false;
      if (activeFilter === 'women' && item.gender !== 'women') return false;

      // Search
      if (searchTerm.trim() !== '') {
        const q = searchTerm.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchBrand = item.brand.toLowerCase().includes(q);
        return matchName || matchBrand;
      }
      return true;
    });

  const handleSelectPerfumeToAdd = (item: PerfumeComparisonItem) => {
    if (comparisonItems.length >= 4) {
      alert('الحد الأقصى للمقارنة هو 4 عطور في نفس الوقت لمشاهدة واضحة ومريحة');
      return;
    }
    addToComparison(item);
    setIsAddDrawerOpen(false);
    setSearchTerm('');
  };

  const handleAddCustomPerfume = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customForm.name.trim() || !customForm.brand.trim()) {
      alert('يرجى كتابة اسم العطر والماركة');
      return;
    }

    const newItem: PerfumeComparisonItem = {
      id: `custom_${Date.now()}`,
      name: customForm.name,
      brand: customForm.brand,
      gender: customForm.gender,
      concentration: customForm.concentration,
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
      inStore: false,
      notes: {
        top: customForm.topNotes.split('،').map(s => s.trim()).filter(Boolean),
        heart: customForm.heartNotes.split('،').map(s => s.trim()).filter(Boolean),
        base: customForm.baseNotes.split('،').map(s => s.trim()).filter(Boolean)
      },
      longevity: {
        label: `ثبات ${customForm.longevityHours}`,
        hours: customForm.longevityHours,
        score: customForm.longevityScore
      },
      sillage: {
        label: `فوحان ${customForm.sillageRange}`,
        range: customForm.sillageRange,
        score: customForm.sillageScore
      },
      vibe: customForm.vibe || 'عطر استثنائي ذو حضور جذاب ومميز',
      occasions: customForm.occasions.split('،').map(s => s.trim()).filter(Boolean),
      seasons: customForm.seasons.split('،').map(s => s.trim()).filter(Boolean),
      fragranceFamily: 'عطر مخصص من Fragrantica',
      fragranticaRating: 4.7,
      fragranticaVotes: 1500
    };

    addToComparison(newItem);
    setShowCustomForm(false);
    setIsAddDrawerOpen(false);
    setCustomForm({
      name: '',
      brand: '',
      gender: 'unisex',
      concentration: 'Eau de Parfum',
      topNotes: '',
      heartNotes: '',
      baseNotes: '',
      longevityHours: '+10 ساعات',
      longevityScore: 90,
      sillageRange: 'مترين',
      sillageScore: 88,
      vibe: '',
      occasions: 'السهرات والمناسبات الخاصة',
      seasons: 'الخريف والشتاء'
    });
  };

  const handleAddToCartFromComparison = (item: PerfumeComparisonItem) => {
    const storeProduct = products.find(p => p.id === item.storeProductId || p.id === item.id);
    if (storeProduct) {
      const defaultSize = storeProduct.sizes[0]?.size || '100 مل';
      addToCart(storeProduct, defaultSize, 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-fade-in font-arabic">
      <div className="relative w-full max-w-7xl bg-[#FAF7F2] border border-[#E2D9CC] rounded-3xl shadow-2xl overflow-hidden flex flex-col my-4 max-h-[92vh]">
        
        {/* Top Header */}
        <div className="p-4 sm:p-6 bg-white border-b border-[#E8E2D8] flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-forest-800 text-white flex items-center justify-center shadow-md">
              <Scale className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
                  استوديو مقارنة العطور
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold-100 text-gold-800 border border-gold-300">
                  Fragrantica Pro
                </span>
              </div>
              <p className="text-xs text-slate-500">
                مقارنة تفصيلية بين الهرم العطري، قوة الثبات، الفوحان، وطابع العطر والمناسبات الأنسب
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {comparisonItems.length < 4 && (
              <button
                onClick={() => setIsAddDrawerOpen(true)}
                className="btn-forest px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة عطر للمقارنة ({comparisonItems.length}/4)</span>
              </button>
            )}

            {comparisonItems.length > 0 && (
              <button
                onClick={clearComparison}
                className="p-2 sm:px-3 sm:py-2.5 rounded-xl text-xs font-bold bg-white border border-slate-300 text-slate-600 hover:text-rose-600 hover:border-rose-300 transition-colors flex items-center gap-1 shadow-sm"
                title="مسح المقارنة"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">مسح</span>
              </button>
            )}

            <button
              onClick={() => setIsComparisonOpen(false)}
              className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          
          {comparisonItems.length === 0 ? (
            /* Empty State */
            <div className="text-center py-20 flex flex-col items-center max-w-md mx-auto">
              <div className="w-20 h-20 rounded-full bg-forest-50 border-2 border-forest-200 flex items-center justify-center text-forest-800 mb-5 shadow-sm">
                <Scale className="w-10 h-10 text-gold-600" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">
                اختر عطورك لبدء المقارنة الفورية
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                يمكنك مقارنة حتى 4 عطور وجهاً لوجه من حيث الهرم العطري، قوة الثبات وساعات الفوحان، الطابع العطري، وتقييمات موقع Fragrantica العالمي.
              </p>
              <button
                onClick={() => setIsAddDrawerOpen(true)}
                className="btn-forest px-6 py-3 rounded-2xl text-sm font-bold shadow-md hover:scale-105 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>اختر أول عطر الآن</span>
              </button>
            </div>
          ) : (
            /* Comparison Grid / Table */
            <div className="space-y-8">
              
              {/* Top Cards Row */}
              <div className={`grid gap-4 ${
                comparisonItems.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
                comparisonItems.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto' :
                comparisonItems.length === 3 ? 'grid-cols-1 sm:grid-cols-3' :
                'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              }`}>
                {comparisonItems.map((item) => {
                  const storeProduct = products.find(p => p.id === item.storeProductId || p.id === item.id);
                  return (
                    <div 
                      key={item.id}
                      className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E5DDD0] shadow-luxury flex flex-col justify-between relative group hover:border-gold-400 transition-all"
                    >
                      {/* Delete button */}
                      <button
                        onClick={() => removeFromComparison(item.id)}
                        className="absolute top-3 left-3 p-1.5 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors z-10"
                        title="إزالة من المقارنة"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <div>
                        {/* Image */}
                        <div className="w-full aspect-square rounded-xl bg-[#FAF8F5] p-4 flex items-center justify-center mb-4 border border-[#F0EBE1] overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="max-h-full max-w-full object-contain filter group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Brand & Name */}
                        <p className="text-[11px] font-bold uppercase tracking-wider text-gold-700 mb-1">
                          {item.brand}
                        </p>
                        <h4 className="text-sm sm:text-base font-extrabold text-slate-900 line-clamp-2 mb-2 leading-tight">
                          {item.name}
                        </h4>

                        {/* Rating & Fragrantica Score */}
                        <div className="flex items-center gap-1.5 mb-3 bg-amber-50/60 border border-amber-200/80 px-2.5 py-1 rounded-lg w-fit">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span className="text-xs font-black text-amber-800 font-sans">
                            {item.fragranticaRating.toFixed(2)}
                          </span>
                          <span className="text-[10px] text-amber-700">/ 5</span>
                          <span className="text-[9px] text-slate-400 mr-1">
                            ({item.fragranticaVotes.toLocaleString('ar-EG')} صوت)
                          </span>
                        </div>
                      </div>

                      {/* Store availability & Action */}
                      <div className="pt-3 border-t border-slate-100 mt-2">
                        {storeProduct ? (
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <span className="text-[10px] text-slate-500 block">سعر المتجر:</span>
                              <span className="text-sm sm:text-base font-black text-slate-900 font-sans">
                                {(storeProduct.sizes[0]?.price || item.price || 0).toLocaleString('ar-EG')} ج.م
                              </span>
                            </div>
                            <button
                              onClick={() => handleAddToCartFromComparison(item)}
                              className="btn-forest px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm hover:scale-105"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>شراء</span>
                            </button>
                          </div>
                        ) : (
                          <div className="text-center py-1">
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full inline-block">
                              عطر مرجعي من Fragrantica 🌐
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dimension 1: نسبة الثبات والفوحان (Longevity & Sillage) */}
              <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#E8E2D8] shadow-sm">
                <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-slate-100">
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
                    <Flame className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900">
                      قوة الثبات والفوحان (Performance & Projection)
                    </h3>
                    <p className="text-xs text-slate-500">
                      تقييم دقيق بناءً على تجارب المستخدمين الرسمية في موقع Fragrantica
                    </p>
                  </div>
                </div>

                <div className={`grid gap-6 ${
                  comparisonItems.length === 1 ? 'grid-cols-1' :
                  comparisonItems.length === 2 ? 'grid-cols-1 sm:grid-cols-2' :
                  comparisonItems.length === 3 ? 'grid-cols-1 sm:grid-cols-3' :
                  'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                }`}>
                  {comparisonItems.map((item) => (
                    <div key={item.id} className="space-y-4 bg-[#FAF7F2] p-4 rounded-2xl border border-[#EAE3D6]">
                      <h5 className="font-extrabold text-xs text-slate-800 line-clamp-1">{item.name}</h5>

                      {/* Longevity Bar */}
                      <div>
                        <div className="flex justify-between items-center text-xs mb-1.5">
                          <span className="flex items-center gap-1 font-bold text-slate-700">
                            <Clock className="w-3.5 h-3.5 text-forest-700" />
                            <span>نسبة الثبات:</span>
                          </span>
                          <span className="font-bold text-forest-800 font-mono text-[11px] bg-forest-50 px-2 py-0.5 rounded border border-forest-200">
                            {item.longevity.hours}
                          </span>
                        </div>
                        <div className="w-full bg-[#E5DDD0] rounded-full h-2.5 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-forest-700 to-emerald-500 h-full rounded-full transition-all duration-700"
                            style={{ width: `${item.longevity.score}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1 font-medium">{item.longevity.label}</p>
                      </div>

                      {/* Sillage Bar */}
                      <div>
                        <div className="flex justify-between items-center text-xs mb-1.5">
                          <span className="flex items-center gap-1 font-bold text-slate-700">
                            <Wind className="w-3.5 h-3.5 text-gold-700" />
                            <span>مدى الفوحان:</span>
                          </span>
                          <span className="font-bold text-gold-800 font-mono text-[11px] bg-gold-50 px-2 py-0.5 rounded border border-gold-200">
                            {item.sillage.range}
                          </span>
                        </div>
                        <div className="w-full bg-[#E5DDD0] rounded-full h-2.5 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-gold-600 to-amber-400 h-full rounded-full transition-all duration-700"
                            style={{ width: `${item.sillage.score}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1 font-medium">{item.sillage.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dimension 2: الهرم العطري (Fragrance Pyramid) */}
              <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#E8E2D8] shadow-sm">
                <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-slate-100">
                  <div className="p-2 rounded-xl bg-forest-50 text-forest-800">
                    <Sparkles className="w-5 h-5 text-forest-700" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900">
                      الهرم العطري الكامل (Fragrance Notes Pyramid)
                    </h3>
                    <p className="text-xs text-slate-500">
                      مقارنة النوتات الافتتاحية والقلب والقاعدة لكل عطر
                    </p>
                  </div>
                </div>

                <div className={`grid gap-6 ${
                  comparisonItems.length === 1 ? 'grid-cols-1' :
                  comparisonItems.length === 2 ? 'grid-cols-1 sm:grid-cols-2' :
                  comparisonItems.length === 3 ? 'grid-cols-1 sm:grid-cols-3' :
                  'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                }`}>
                  {comparisonItems.map((item) => (
                    <div key={item.id} className="space-y-4">
                      <div className="font-extrabold text-xs text-slate-900 pb-2 border-b border-slate-100 line-clamp-1">
                        {item.name}
                      </div>

                      {/* Top Notes */}
                      <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E8E2D8]">
                        <span className="text-[11px] font-bold text-gold-700 block mb-1.5">
                          ☀️ قمة العطر (Top Notes):
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {item.notes.top.map((note, idx) => (
                            <span key={idx} className="text-[10px] bg-white text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Heart Notes */}
                      <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E8E2D8]">
                        <span className="text-[11px] font-bold text-forest-800 block mb-1.5">
                          💖 قلب العطر (Heart Notes):
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {item.notes.heart.map((note, idx) => (
                            <span key={idx} className="text-[10px] bg-white text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Base Notes */}
                      <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E8E2D8]">
                        <span className="text-[11px] font-bold text-amber-900 block mb-1.5">
                          🪵 قاعدة العطر (Base Notes):
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {item.notes.base.map((note, idx) => (
                            <span key={idx} className="text-[10px] bg-white text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dimension 3: طابع وتأثير العطر والمناسبات */}
              <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#E8E2D8] shadow-sm">
                <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-slate-100">
                  <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900">
                      طابع العطر والمناسبات والفصول الأنسب
                    </h3>
                    <p className="text-xs text-slate-500">
                      أفضل الأوقات والظروف لارتداء كل عطر للحصول على أعلى جاذبية
                    </p>
                  </div>
                </div>

                <div className={`grid gap-6 ${
                  comparisonItems.length === 1 ? 'grid-cols-1' :
                  comparisonItems.length === 2 ? 'grid-cols-1 sm:grid-cols-2' :
                  comparisonItems.length === 3 ? 'grid-cols-1 sm:grid-cols-3' :
                  'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                }`}>
                  {comparisonItems.map((item) => (
                    <div key={item.id} className="space-y-3 bg-[#FAF7F2] p-4 rounded-2xl border border-[#EAE3D6] flex flex-col justify-between">
                      <div>
                        <h5 className="font-extrabold text-xs text-slate-800 line-clamp-1 mb-2">{item.name}</h5>
                        
                        {/* Vibe / Effect */}
                        <div className="mb-3">
                          <span className="text-[11px] font-bold text-slate-700 block mb-1">
                            ✨ طابع وتأثير العطر:
                          </span>
                          <p className="text-xs text-slate-600 leading-relaxed bg-white p-2.5 rounded-xl border border-slate-200">
                            {item.vibe}
                          </p>
                        </div>

                        {/* Occasions */}
                        <div className="mb-3">
                          <span className="text-[11px] font-bold text-slate-700 block mb-1">
                            🎯 المناسبات الأنسب:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {item.occasions.map((occ, idx) => (
                              <span key={idx} className="text-[10px] bg-forest-50 text-forest-800 border border-forest-200 font-bold px-2 py-0.5 rounded-md">
                                {occ}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Seasons */}
                        <div>
                          <span className="text-[11px] font-bold text-slate-700 block mb-1">
                            🌤️ فصول السنة المثالية:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {item.seasons.map((season, idx) => (
                              <span key={idx} className="text-[10px] bg-amber-50 text-amber-900 border border-amber-200 font-bold px-2 py-0.5 rounded-md">
                                {season}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-200 mt-2 text-[10px] text-slate-500 font-mono">
                        العائلة: {item.fragranceFamily}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Bottom Drawer: Add Perfume Selection / Custom Perfume */}
        {isAddDrawerOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="w-full max-w-2xl bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col animate-slide-up">
              
              {/* Drawer Header */}
              <div className="p-5 border-b border-slate-200 bg-[#FAF7F2] flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">
                    {showCustomForm ? 'إضافة عطر مخصص جديد من Fragrantica' : 'اختر عطراً لإضافته إلى المقارنة'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {showCustomForm 
                      ? 'أدخل بيانات أي عطر تفضله لمقارنته فوراً مع بقية العطور' 
                      : 'ابحث في أشهر العطور العالمية أو اختر من عطور المتجر'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsAddDrawerOpen(false);
                    setShowCustomForm(false);
                  }}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-5">
                
                {showCustomForm ? (
                  /* Custom Perfume Entry Form */
                  <form onSubmit={handleAddCustomPerfume} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">اسم العطر *</label>
                        <input
                          type="text"
                          required
                          placeholder="مثال: Naxos أو Good Girl"
                          value={customForm.name}
                          onChange={(e) => setCustomForm({ ...customForm, name: e.target.value })}
                          className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-forest-700"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">الماركة العالمية *</label>
                        <input
                          type="text"
                          required
                          placeholder="مثال: Xerjoff أو Dior"
                          value={customForm.brand}
                          onChange={(e) => setCustomForm({ ...customForm, brand: e.target.value })}
                          className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-forest-700"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">الجنس</label>
                        <select
                          value={customForm.gender}
                          onChange={(e) => setCustomForm({ ...customForm, gender: e.target.value as PerfumeGender })}
                          className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-3 py-2 text-xs"
                        >
                          <option value="men">رجالي</option>
                          <option value="women">نسائي</option>
                          <option value="unisex">للجنسين</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">التركيز</label>
                        <select
                          value={customForm.concentration}
                          onChange={(e) => setCustomForm({ ...customForm, concentration: e.target.value })}
                          className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-3 py-2 text-xs"
                        >
                          <option value="Parfum Extrait">Parfum Extrait</option>
                          <option value="Eau de Parfum">Eau de Parfum</option>
                          <option value="Eau de Toilette">Eau de Toilette</option>
                        </select>
                      </div>
                    </div>

                    {/* Pyramid Notes Inputs */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">قمة العطر (مفصولة بفاصلة)</label>
                      <input
                        type="text"
                        placeholder="البرغموت، اللافندر، الليمون"
                        value={customForm.topNotes}
                        onChange={(e) => setCustomForm({ ...customForm, topNotes: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">قلب العطر (مفصولة بفاصلة)</label>
                      <input
                        type="text"
                        placeholder="العسل، القرفة، الياسمين"
                        value={customForm.heartNotes}
                        onChange={(e) => setCustomForm({ ...customForm, heartNotes: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">قاعدة العطر (مفصولة بفاصلة)</label>
                      <input
                        type="text"
                        placeholder="التبغ، الفانيليا، حبوب التونكا"
                        value={customForm.baseNotes}
                        onChange={(e) => setCustomForm({ ...customForm, baseNotes: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">ساعات الثبات</label>
                        <input
                          type="text"
                          value={customForm.longevityHours}
                          onChange={(e) => setCustomForm({ ...customForm, longevityHours: e.target.value })}
                          className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-3 py-2 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">مدى الفوحان</label>
                        <input
                          type="text"
                          value={customForm.sillageRange}
                          onChange={(e) => setCustomForm({ ...customForm, sillageRange: e.target.value })}
                          className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-3 py-2 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">طابع وتأثير العطر</label>
                      <input
                        type="text"
                        placeholder="مثال: عطر دافئ ساحر يوحي بالفخامة والهيبة"
                        value={customForm.vibe}
                        onChange={(e) => setCustomForm({ ...customForm, vibe: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        className="flex-1 btn-forest py-2.5 rounded-xl text-xs font-bold shadow-md"
                      >
                        إضافة العطر للمقارنة فوراً
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCustomForm(false)}
                        className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100"
                      >
                        إلغاء والعودة للقائمة
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Perfumes Selector List */
                  <div className="space-y-4">
                    {/* Search and Custom Button */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                        <input
                          type="text"
                          placeholder="ابحث عن اسم عطر أو ماركة (مثل Dior, Creed, Tom Ford)..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl pr-9 pl-4 py-2.5 text-xs focus:outline-none focus:border-forest-700"
                          autoFocus
                        />
                      </div>
                      <button
                        onClick={() => setShowCustomForm(true)}
                        className="px-3.5 py-2 rounded-xl bg-gold-50 border border-gold-300 text-gold-900 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-gold-100 transition-colors shadow-sm shrink-0"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                        <span>إدخال عطر مخصص</span>
                      </button>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex gap-1.5 overflow-x-auto pb-1">
                      {[
                        { id: 'all', label: 'الكل' },
                        { id: 'store', label: 'عطور متجرنا' },
                        { id: 'fragrantica', label: 'عطور Fragrantica العالمية' },
                        { id: 'men', label: 'رجالي' },
                        { id: 'women', label: 'نسائي' }
                      ].map(tab => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveFilter(tab.id as any)}
                          className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                            activeFilter === tab.id
                              ? 'bg-forest-800 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* List Items */}
                    <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
                      {filteredAvailable.length === 0 ? (
                        <div className="text-center py-8 text-slate-500 text-xs">
                          لا توجد عطور مطابقة لبحثك. يمكنك الضغط على "إدخال عطر مخصص" لكتابة اسمه!
                        </div>
                      ) : (
                        filteredAvailable.map(item => (
                          <div
                            key={item.id}
                            onClick={() => handleSelectPerfumeToAdd(item)}
                            className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF7F2] hover:bg-forest-50/50 border border-[#E8E2D8] hover:border-forest-600 cursor-pointer transition-all group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl bg-white p-1 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                                <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                              </div>
                              <div>
                                <span className="text-[10px] font-bold text-gold-700 block uppercase">
                                  {item.brand}
                                </span>
                                <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-forest-800">
                                  {item.name}
                                </h4>
                                <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-500">
                                  <span className="font-mono">ثبات: {item.longevity.hours}</span>
                                  <span>•</span>
                                  <span>فوحان: {item.sillage.range}</span>
                                  {item.inStore && (
                                    <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                                      متوفر بالمتجر
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <button className="px-3 py-1.5 rounded-xl bg-white group-hover:bg-forest-800 group-hover:text-white border border-slate-300 group-hover:border-forest-800 text-slate-700 text-xs font-bold transition-all shadow-sm flex items-center gap-1 shrink-0">
                              <Plus className="w-3.5 h-3.5" />
                              <span>إضافة</span>
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
