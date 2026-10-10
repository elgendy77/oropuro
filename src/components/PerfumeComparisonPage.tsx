import React, { useState } from 'react';
import { 
  Scale, Sparkles, Search, 
  Clock, Wind, ChevronRight, X
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { 
  FRAGRANTICA_PRESET_PERFUMES, 
  productToComparisonItem,
  type PerfumeComparisonItem 
} from '../data/fragranticaDatabase';
import type { PerfumeGender } from '../types';

export const PerfumeComparisonPage: React.FC = () => {
  const { 
    comparisonItems, 
    addToComparison, 
    removeFromComparison, 
    clearComparison, 
    addToCart, 
    products, 
    setActiveView,
    setActiveProductForDetail
  } = useStore();

  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'men' | 'women' | 'unisex' | 'fragrantica'>('all');
  const [addedFeedback, setAddedFeedback] = useState<Record<string, boolean>>({});

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

  // Filter available perfumes to add (excluding women perfumes per user request)
  const allAvailablePerfumes: PerfumeComparisonItem[] = [
    ...products.filter(p => p.gender !== 'women').map(p => productToComparisonItem(p)),
    ...FRAGRANTICA_PRESET_PERFUMES.filter(f => f.gender !== 'women' && !products.some(p => p.id === f.id || p.id === f.storeProductId))
  ];

  const filteredAvailable = allAvailablePerfumes.filter(item => {
    // Don't show already selected
    if (comparisonItems.some(c => c.id === item.id || (item.storeProductId && c.id === item.storeProductId))) {
      return false;
    }
    // Filter tab
    if (activeFilter === 'men' && item.gender !== 'men') return false;
    if (activeFilter === 'unisex' && item.gender !== 'unisex') return false;
    if (activeFilter === 'fragrantica' && item.inStore) return false;

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
      alert('الحد الأقصى للمقارنة هو 4 عطور معاً لمشاهدة واضحة ومريحة');
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
      setAddedFeedback(prev => ({ ...prev, [item.id]: true }));
      setTimeout(() => {
        setAddedFeedback(prev => ({ ...prev, [item.id]: false }));
      }, 2000);
    }
  };

  // Popular presets
  const loadPresetComparison = (ids: string[]) => {
    clearComparison();
    ids.forEach(id => {
      const storeP = products.find(p => p.id.includes(id) || p.id === id);
      if (storeP) {
        addToComparison(storeP);
      } else {
        const preset = FRAGRANTICA_PRESET_PERFUMES.find(f => f.id.includes(id) || f.id === id);
        if (preset) addToComparison(preset);
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-24 font-arabic" dir="rtl">
      
      {/* Top Breadcrumb & Header */}
      <div className="bg-white border-b border-[#E8E2D8] sticky top-16 sm:top-20 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <button 
              onClick={() => { setActiveView('store'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-slate-500 hover:text-gold-700 transition-colors font-medium"
            >
              الرئيسية
            </button>
            <ChevronRight className="w-4 h-4 text-slate-400 rotate-180" />
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-gold-600" />
              استوديو مقارنة العطور (Fragrance Comparison)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { setActiveView('advisor'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-xs font-bold text-forest-800 bg-forest-50 border border-forest-200 px-3.5 py-1.5 rounded-lg hover:bg-forest-100 transition-colors shadow-xs"
            >
              مستشار العطور الذكي
            </button>

            <button
              onClick={() => { setActiveView('store'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-200 px-3.5 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-slate-100 transition-colors"
            >
              العودة للمتجر
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        
        {/* Main Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-50 border border-gold-300 text-gold-900 text-xs font-bold mb-4 shadow-xs">
            <span>نظام مقارنة العطور بالمعايير العالمية (Fragrantica Standard)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            استوديو مقارنة العطور
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            قارن بين ما يصل إلى 4 عطور جنباً إلى جنب: دقة الهرم العطري، قوة الثبات وساعات الفوحان، المناسبات الملائمة، وأفضل الأسعار لطلبك مباشرة.
          </p>
        </div>

        {/* Toolbar & Quick Actions */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#E8E2D8] mb-8 flex flex-wrap items-center justify-between gap-4 shadow-soft">
          <div className="flex flex-wrap items-center gap-3">
            {comparisonItems.length < 4 ? (
              <button
                onClick={() => setIsAddDrawerOpen(true)}
                className="btn-forest px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm"
              >
                إضافة عطر للمقارنة ({comparisonItems.length}/4)
              </button>
            ) : (
              <span className="text-xs font-bold text-forest-800 bg-forest-50 px-3 py-2 rounded-xl border border-forest-200">
                وصلت للحد الأقصى (4 عطور)
              </span>
            )}

            {comparisonItems.length > 0 && (
              <button
                onClick={clearComparison}
                className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-white border border-slate-300 text-slate-600 hover:text-rose-600 hover:border-rose-300 transition-colors shadow-xs"
              >
                تفريغ المقارنة
              </button>
            )}
          </div>

          {/* Quick Comparison Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400">مقارنات شائعة:</span>
            <button
              onClick={() => loadPresetComparison(['sauvage', 'bleu-de-chanel'])}
              className="text-xs px-2.5 py-1 rounded-lg bg-[#FAF7F2] border border-[#E0D7C9] text-slate-700 hover:border-gold-500 hover:text-gold-900 transition-colors font-medium"
            >
              سوفاج vs بلو دي شانيل
            </button>
            <button
              onClick={() => loadPresetComparison(['aventus', 'hacivat'])}
              className="text-xs px-2.5 py-1 rounded-lg bg-[#FAF7F2] border border-[#E0D7C9] text-slate-700 hover:border-gold-500 hover:text-gold-900 transition-colors font-medium"
            >
              أفينتوس vs هاجيفات
            </button>
            <button
              onClick={() => loadPresetComparison(['baccarat', 'grand-soir'])}
              className="text-xs px-2.5 py-1 rounded-lg bg-[#FAF7F2] border border-[#E0D7C9] text-slate-700 hover:border-gold-500 hover:text-gold-900 transition-colors font-medium"
            >
              باكارات روج vs جراند سوار
            </button>
          </div>
        </div>

        {/* Content Area */}
        {comparisonItems.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl border border-[#E8E2D8] p-12 sm:p-20 text-center max-w-xl mx-auto shadow-luxury">
            <div className="w-20 h-20 rounded-full bg-gold-50 border-2 border-gold-300 flex items-center justify-center text-gold-700 mx-auto mb-6 shadow-sm">
              <Scale className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-3">
              لم تختر أي عطور للمقارنة بعد
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-8">
              اختر عطورك المفضلة من المتجر أو قارن بين العطور العالمية الرائجة لمعرفة الفوارق الدقيقة في الهرم العطري، قوة الثبات والفوحان، وأيها أنسب لذوقك.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setIsAddDrawerOpen(true)}
                className="btn-forest px-8 py-3.5 rounded-2xl text-sm font-bold shadow-md hover:scale-105 w-full sm:w-auto text-center"
              >
                اختر أول عطر الآن
              </button>

              <button
                onClick={() => loadPresetComparison(['sauvage', 'bleu-de-chanel'])}
                className="btn-gold px-6 py-3.5 rounded-2xl text-sm font-bold shadow-md hover:scale-105 w-full sm:w-auto text-center"
              >
                مقارنة سوفاج وبلو دي شانيل
              </button>
            </div>
          </div>
        ) : (
          /* Comparison Cards & Rows */
          <div className="space-y-8 animate-fade-in">
            
            {/* Cards Grid */}
            <div className={`grid gap-6 ${
              comparisonItems.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
              comparisonItems.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' :
              comparisonItems.length === 3 ? 'grid-cols-1 md:grid-cols-3' :
              'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            }`}>
              {comparisonItems.map((item) => {
                const storeProduct = products.find(p => p.id === item.storeProductId || p.id === item.id);
                const isAdded = addedFeedback[item.id];
                const price = storeProduct?.sizes?.[0]?.price || item.price || 400;

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl border-2 border-[#E8E2D8] overflow-hidden flex flex-col justify-between shadow-soft hover:shadow-luxury transition-all relative"
                  >
                    {/* Remove button */}
                    <button
                      onClick={() => removeFromComparison(item.id)}
                      className="absolute top-3 left-3 z-10 w-7 h-7 rounded-full bg-white/90 border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-300 flex items-center justify-center transition-colors shadow-xs"
                      title="إزالة من المقارنة"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    {/* Gender badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/95 border border-[#E0D7C9] text-slate-700 shadow-xs">
                        {item.gender === 'men' ? 'رجالي' : item.gender === 'women' ? 'نسائي' : 'للجنسين'}
                      </span>
                    </div>

                    {/* Image & Header */}
                    <div className="p-6 pb-4 flex flex-col items-center text-center border-b border-[#F0EBE1] bg-[#FAF8F5]">
                      <div 
                        onClick={() => storeProduct && setActiveProductForDetail(storeProduct)}
                        className="w-36 h-36 aspect-square rounded-2xl bg-white p-3 flex items-center justify-center border border-[#E8E2D8] mb-4 shadow-xs cursor-pointer group"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain filter group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <span className="text-[11px] font-bold uppercase tracking-wider text-gold-700 mb-1">
                        {item.brand}
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900 line-clamp-1 mb-1">
                        {item.name}
                      </h3>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200 font-mono">
                        {item.concentration}
                      </span>
                    </div>

                    {/* Metrics Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-6">
                      
                      {/* Metric 1: Longevity (الثبات) */}
                      <div>
                        <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
                          <span className="flex items-center gap-1.5 text-forest-900">
                            <Clock className="w-3.5 h-3.5 text-forest-700" />
                            ثبات العطر:
                          </span>
                          <span className="text-forest-800 font-mono text-[11px] bg-forest-50 px-2 py-0.5 rounded border border-forest-200">
                            {item.longevity.hours}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-linear-to-r from-forest-600 to-emerald-500 rounded-full"
                            style={{ width: `${item.longevity.score}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-slate-500 mt-1 block">
                          {item.longevity.label}
                        </span>
                      </div>

                      {/* Metric 2: Sillage (الفوحان) */}
                      <div>
                        <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
                          <span className="flex items-center gap-1.5 text-amber-900">
                            <Wind className="w-3.5 h-3.5 text-amber-600" />
                            فوحان العطر:
                          </span>
                          <span className="text-amber-800 font-mono text-[11px] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            {item.sillage.range}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-linear-to-r from-amber-500 to-gold-500 rounded-full"
                            style={{ width: `${item.sillage.score}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-slate-500 mt-1 block">
                          {item.sillage.label}
                        </span>
                      </div>

                      {/* Metric 3: Fragrance Pyramid (الهرم العطري) */}
                      <div className="space-y-3 pt-2 border-t border-[#EAE3D6]">
                        <div>
                          <p className="text-[11px] font-bold text-slate-600 mb-1">قمة العطر (Top):</p>
                          <div className="flex flex-wrap gap-1">
                            {item.notes.top.map((note, idx) => (
                              <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-[#FAF7F2] text-slate-700 border border-[#E8E2D8]">
                                {note}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-[11px] font-bold text-slate-600 mb-1">قلب العطر (Heart):</p>
                          <div className="flex flex-wrap gap-1">
                            {item.notes.heart.map((note, idx) => (
                              <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-[#FAF7F2] text-slate-700 border border-[#E8E2D8]">
                                {note}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-[11px] font-bold text-slate-600 mb-1">قاعدة العطر (Base):</p>
                          <div className="flex flex-wrap gap-1">
                            {item.notes.base.map((note, idx) => (
                              <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-[#FAF7F2] text-slate-700 border border-[#E8E2D8]">
                                {note}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Best Occasions & Vibe */}
                      <div className="pt-2 border-t border-[#EAE3D6] space-y-2">
                        <div>
                          <p className="text-[11px] font-bold text-slate-500 mb-0.5">طابع العطر:</p>
                          <p className="text-[11px] text-slate-700 leading-relaxed">
                            {item.vibe}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] font-bold text-slate-500 mb-0.5">المناسبات الأنسب:</p>
                          <p className="text-[11px] text-slate-700">
                            {item.occasions.join(' • ')}
                          </p>
                        </div>
                      </div>

                      {/* Pricing & Add to cart */}
                      <div className="pt-4 border-t border-[#EAE3D6] mt-auto">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xl font-black text-slate-900 font-mono">
                            {price} <span className="text-xs font-normal">ج.م</span>
                          </span>
                          <span className="text-[10px] font-bold text-forest-700 bg-forest-50 px-2 py-0.5 rounded border border-forest-200">
                            حجم 100 مل
                          </span>
                        </div>

                        {storeProduct ? (
                          <button
                            onClick={() => handleAddToCartFromComparison(item)}
                            className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center shadow-sm transition-all ${
                              isAdded
                                ? 'bg-emerald-600 text-white'
                                : 'btn-forest'
                            }`}
                          >
                            {isAdded ? 'تمت الإضافة للسلة!' : 'طلب هذا العطر'}
                          </button>
                        ) : (
                          <div className="text-center py-2 text-xs font-bold text-slate-400 bg-slate-50 rounded-xl border border-slate-200">
                            مرجع من Fragrantica
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>

      {/* Add Perfume Selection Drawer / Modal */}
      {isAddDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="relative w-full max-w-3xl bg-white border border-[#E8E2D8] rounded-3xl shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]">
            
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#E8E2D8] bg-[#FAF7F2] flex items-center justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  اختر عطراً لإضافته إلى المقارنة
                </h3>
                <p className="text-xs text-slate-500">
                  ابحث بين العطور المتوفرة أو أضف عطراً مخصصاً من Fragrantica
                </p>
              </div>

              <button
                onClick={() => setIsAddDrawerOpen(false)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Tabs & Search Bar */}
            <div className="p-6 pb-2 border-b border-[#EAE3D6] space-y-4">
              
              <div className="relative">
                <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="ابحث باسم العطر أو الماركة (مثال: Sauvage, Dior, ديور, Aventus)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:border-forest-700"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'all', label: 'جميع العطور' },
                    { id: 'men', label: 'رجالي' },
                    { id: 'unisex', label: 'للجنسين' },
                    { id: 'fragrantica', label: 'عطور فراجرانتيكا' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveFilter(tab.id as any)}
                      className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${
                        activeFilter === tab.id
                          ? 'bg-forest-800 text-white shadow-xs'
                          : 'bg-[#FAF7F2] text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setShowCustomForm(!showCustomForm)}
                  className="text-xs font-bold text-gold-800 bg-gold-50 border border-gold-300 px-3.5 py-1.5 rounded-lg hover:bg-gold-100 transition-colors"
                >
                  {showCustomForm ? 'إخفاء الإضافة المخصصة' : 'إضافة عطر مخصص'}
                </button>
              </div>

            </div>

            {/* Custom Perfume Addition Form */}
            {showCustomForm && (
              <form onSubmit={handleAddCustomPerfume} className="p-6 bg-gold-50/40 border-b border-gold-200 space-y-4">
                <h4 className="text-sm font-bold text-gold-950 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-gold-700" />
                  <span>إدخال بيانات عطر مخصص من موقع فراجرانتيكا:</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="اسم العطر (مثال: Ombré Leather)"
                    value={customForm.name}
                    onChange={(e) => setCustomForm(prev => ({ ...prev, name: e.target.value }))}
                    className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white"
                    required
                  />
                  <input
                    type="text"
                    placeholder="اسم الماركة (مثال: Tom Ford)"
                    value={customForm.brand}
                    onChange={(e) => setCustomForm(prev => ({ ...prev, brand: e.target.value }))}
                    className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="قمة العطر (مفصولة بفاصلة)"
                    value={customForm.topNotes}
                    onChange={(e) => setCustomForm(prev => ({ ...prev, topNotes: e.target.value }))}
                    className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white"
                  />
                  <input
                    type="text"
                    placeholder="قلب العطر"
                    value={customForm.heartNotes}
                    onChange={(e) => setCustomForm(prev => ({ ...prev, heartNotes: e.target.value }))}
                    className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white"
                  />
                  <input
                    type="text"
                    placeholder="قاعدة العطر"
                    value={customForm.baseNotes}
                    onChange={(e) => setCustomForm(prev => ({ ...prev, baseNotes: e.target.value }))}
                    className="p-2.5 text-xs rounded-xl border border-slate-300 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold shadow-sm"
                >
                  إضافة العطر للمقارنة الآن
                </button>
              </form>
            )}

            {/* Perfume List */}
            <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredAvailable.length === 0 ? (
                <div className="col-span-2 text-center py-10 text-xs text-slate-500">
                  لم يتم العثور على عطور تطابق بحثك.
                </div>
              ) : (
                filteredAvailable.map((perfume) => (
                  <div
                    key={perfume.id}
                    onClick={() => handleSelectPerfumeToAdd(perfume)}
                    className="p-3 rounded-2xl border border-[#E8E2D8] bg-[#FAF8F5] hover:bg-white hover:border-forest-700 hover:shadow-md cursor-pointer transition-all flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white border border-[#EAE3D6] p-1.5 flex items-center justify-center shrink-0">
                        <img
                          src={perfume.image}
                          alt={perfume.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-gold-700 uppercase block">
                          {perfume.brand}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-forest-800 transition-colors line-clamp-1">
                          {perfume.name}
                        </h4>
                        <span className="text-[10px] text-slate-400">
                          {perfume.gender === 'men' ? 'رجالي' : perfume.gender === 'women' ? 'نسائي' : 'للجنسين'} • {perfume.concentration}
                        </span>
                      </div>
                    </div>

                    <button
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-forest-50 text-forest-800 group-hover:bg-forest-800 group-hover:text-white transition-colors shrink-0"
                    >
                      إضافة
                    </button>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
