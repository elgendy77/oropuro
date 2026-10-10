import React, { useState, useMemo, useEffect } from 'react';
import { Sparkles, SlidersHorizontal, ArrowUpDown, Search } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { matchProductWithQuery, getSimilarKeywords } from '../utils/searchHelper';

interface ProductGridProps {
  searchQuery?: string;
  onClearSearch?: () => void;
  onSelectSearchKeyword?: (keyword: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  searchQuery = '',
  onClearSearch,
  onSelectSearchKeyword
}) => {
  const { products, loadDemoProducts, setActiveView, setIsComparisonOpen, comparisonItems, settings, language, t } = useStore();
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const customContent = settings.siteContent;

  // When a search is triggered, reset category tabs to 'all' so results from all categories are immediately visible
  useEffect(() => {
    if (searchQuery.trim() !== '') {
      setSelectedGender('all');
      setSelectedBrand('all');
    }
  }, [searchQuery]);

  // Support #women or #ladies in URL hash
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#women' || hash === '#ladies') {
        setSelectedGender('women');
        const el = document.getElementById('perfumes-women') || document.getElementById('perfumes-collection');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Unique brands
  const brands = useMemo(() => {
    const list = Array.from(new Set(products.map(p => p.brand).filter(Boolean)));
    return list;
  }, [products]);

  // Live similar keywords for search
  const similarKeywords = useMemo(() => {
    return searchQuery.trim() ? getSimilarKeywords(searchQuery) : [];
  }, [searchQuery]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const hasSearch = searchQuery.trim() !== '';

    return products
      .map(product => {
        if (!hasSearch) {
          return { product, score: 0, matched: true };
        }
        const matchRes = matchProductWithQuery(product, searchQuery);
        return { product, score: matchRes.score, matched: matchRes.matched };
      })
      .filter(({ product, matched }) => {
        // Search filter
        if (hasSearch && !matched) {
          return false;
        }

        // Gender & Category filter
        if (selectedGender === 'featured') {
          if (!product.isFeatured) return false;
        } else if (selectedGender === 'women') {
          if (product.gender !== 'women') return false;
        } else if (selectedGender === 'men') {
          if (product.gender !== 'men') return false;
        } else if (selectedGender === 'unisex') {
          if (product.gender !== 'unisex') return false;
        } else if (selectedGender === 'fresh') {
          if (product.fragranceFamily !== 'fresh') return false;
        } else if (selectedGender === 'beast') {
          if (product.fragranceFamily !== 'oriental' && product.fragranceFamily !== 'woody') return false;
        } else if (selectedGender !== 'all' && product.gender !== selectedGender) {
          return false;
        }

        // Brand filter
        if (selectedBrand !== 'all' && product.brand !== selectedBrand) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        // If searching with default sort, sort by highest search relevance score
        if (hasSearch && sortBy === 'featured') {
          return b.score - a.score;
        }

        const priceA = a.product.sizes?.[0]?.price || 0;
        const priceB = b.product.sizes?.[0]?.price || 0;

        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        if (sortBy === 'rating') return b.product.rating - a.product.rating;
        // featured default
        if (a.product.isFeatured && !b.product.isFeatured) return -1;
        if (!a.product.isFeatured && b.product.isFeatured) return 1;
        return 0;
      })
      .map(item => item.product);
  }, [products, selectedGender, selectedBrand, sortBy, searchQuery]);

  return (
    <section id="perfumes-collection" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
        <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-black text-xs uppercase tracking-widest mb-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/50 px-3.5 sm:px-4 py-1.5 rounded-full shadow-xs">
          <span>{language === 'en' ? t('collectionBadge') : (customContent?.collectionBadge || t('collectionBadge'))}</span>
        </div>
        <h2 className="text-2xl sm:text-5xl font-black text-slate-950 dark:text-slate-100 tracking-tight">
          {language === 'en' ? t('collectionTitle') : (customContent?.collectionTitle || t('collectionTitle'))}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-xl font-bold leading-relaxed px-2">
          {language === 'en' ? t('collectionSubtitle') : (customContent?.collectionSubtitle || t('collectionSubtitle'))}
        </p>
        <div className="w-16 h-1 bg-amber-400 rounded-full mt-3 sm:mt-4" />
      </div>

      {/* Dynamic Promotional Banner from Admin CMS */}
      {customContent?.promoBannerEnabled !== false && customContent?.promoBannerTitle && (
        <div 
          className={`mb-8 sm:mb-12 p-4 sm:p-9 rounded-2xl sm:rounded-3xl border-2 shadow-2xl relative overflow-hidden transition-all ${
            customContent?.promoBannerTheme === 'black_gold'
              ? 'bg-[#0A0A0C] bg-gradient-to-r from-black via-[#1C1917] to-black border-amber-400 text-white'
              : customContent?.promoBannerTheme === 'royal_navy'
              ? 'bg-[#071324] bg-gradient-to-r from-[#040C18] via-[#0F294D] to-[#040C18] border-amber-400 text-white'
              : 'bg-[#03261D] bg-gradient-to-r from-[#021F17] via-[#064E3B] to-[#021F17] border-amber-400 text-white'
          }`}
        >
          {/* Subtle Ambient Glow Effects */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
            <div className="max-w-2xl text-right">
              <span className="bg-amber-400 text-slate-950 text-[11px] sm:text-xs font-black px-3.5 py-1 sm:py-1.5 rounded-full uppercase tracking-wider inline-block mb-2 sm:mb-3 shadow-sm border border-amber-300">
                {customContent.promoBannerBadge || 'عرض حصري لفترة محدودة 🔥'}
              </span>
              <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-2 leading-snug drop-shadow-md">
                {customContent.promoBannerTitle}
              </h3>
              <p className="text-xs sm:text-base text-amber-100 font-bold leading-relaxed drop-shadow-xs">
                {customContent.promoBannerSubtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full md:w-auto shrink-0">
              {customContent.promoDiscountText && (
                <div className="w-full sm:w-auto bg-black/60 backdrop-blur-md border-2 border-amber-400 px-5 py-3 sm:px-6 sm:py-3.5 rounded-2xl text-center shadow-lg">
                  <span className="block text-2xl sm:text-3xl font-black text-amber-300 tracking-wide font-sans">
                    {customContent.promoDiscountText}
                  </span>
                  <span className="text-[11px] text-white font-black block mt-0.5">
                    شحن مجاني + معاينة قبل الدفع
                  </span>
                </div>
              )}

              <a
                href="#perfumes-catalog"
                className="w-full sm:w-auto text-center px-6 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg hover:scale-105 transition-all cursor-pointer border border-amber-300"
              >
                {customContent.promoBannerCtaText || 'اطلب العرض الآن'}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* DEDICATED WOMEN'S LUXURY SHOWCASE (القسم النسائي الملكي) */}
      <div 
        id="perfumes-women"
        className="mb-8 sm:mb-10 p-4 sm:p-9 rounded-2xl sm:rounded-3xl border-2 border-rose-300/80 shadow-2xl relative overflow-hidden bg-gradient-to-r from-[#1C0510] via-[#3B0A21] to-[#1C0510] text-white"
      >
        {/* Ambient Glows */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-rose-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
          <div className="max-w-2xl text-right">
            <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
              <span className="bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[11px] sm:text-xs font-black px-3.5 py-1 sm:py-1.5 rounded-full uppercase tracking-wider inline-block shadow-sm border border-rose-300">
                {t('womenBannerBadge')}
              </span>
              <span className="text-[10px] sm:text-[11px] px-2.5 py-0.5 sm:py-1 rounded-full bg-white/10 text-rose-200 border border-white/20 font-bold">
                {products.filter(p => p.gender === 'women').length} {language === 'en' ? 'Luxury Fragrances' : 'عطر نسائي فاخر'}
              </span>
            </div>

            <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-2 leading-snug drop-shadow-md">
              {t('womenBannerTitle')}
            </h3>
            <p className="text-xs sm:text-base text-rose-100/90 font-medium leading-relaxed drop-shadow-xs">
              {t('womenBannerSubtitle')}
            </p>

            {/* Micro Highlights */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-2.5 sm:pt-3">
              <span className="text-[10px] sm:text-[11px] px-2.5 sm:px-3 py-1 rounded-lg bg-black/40 border border-rose-300/30 text-rose-200 font-bold">
                🌸 {language === 'en' ? 'Rose & Peony Accords' : 'زهور الورد والفاوانيا'}
              </span>
              <span className="text-[10px] sm:text-[11px] px-2.5 sm:px-3 py-1 rounded-lg bg-black/40 border border-rose-300/30 text-rose-200 font-bold">
                🍯 {language === 'en' ? 'Vanilla & Praline' : 'الفانيليا والبرالين'}
              </span>
              <span className="text-[10px] sm:text-[11px] px-2.5 sm:px-3 py-1 rounded-lg bg-black/40 border border-rose-300/30 text-rose-200 font-bold">
                👑 {language === 'en' ? 'Niche & Evening Classics' : 'عطور النيش والسهرات'}
              </span>
              <span className="text-[10px] sm:text-[11px] px-2.5 sm:px-3 py-1 rounded-lg bg-black/40 border border-rose-300/30 text-rose-200 font-bold">
                🎁 {language === 'en' ? 'Free Niche Sample with 2 Bottles' : 'عينة نيش هدية مع كل عطرين'}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <button
              type="button"
              onClick={() => {
                setSelectedGender('women');
                const el = document.getElementById('perfumes-catalog') || document.getElementById('perfumes-collection');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto text-center px-6 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-rose-400 via-pink-400 to-rose-300 hover:from-rose-300 hover:to-pink-300 text-slate-950 font-black text-xs sm:text-sm shadow-xl hover:scale-105 transition-all cursor-pointer border border-rose-200 flex items-center justify-center gap-2"
            >
              <span>{t('womenBannerCta')}</span>
              <span>🌸</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Trust Features Badges from Admin CMS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#121722] border border-[#E8E2D8] dark:border-[#1E2638] flex items-center gap-3 shadow-2xs">
          <span className="text-2xl">✨</span>
          <div>
            <h4 className="text-xs font-black text-slate-900 dark:text-slate-100">{language === 'en' ? t('trust1Title') : (customContent?.trustFeature1Title || t('trust1Title'))}</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{language === 'en' ? t('trust1Desc') : (customContent?.trustFeature1Desc || t('trust1Desc'))}</p>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#121722] border border-[#E8E2D8] dark:border-[#1E2638] flex items-center gap-3 shadow-2xs">
          <span className="text-2xl">⚡</span>
          <div>
            <h4 className="text-xs font-black text-slate-900 dark:text-slate-100">{language === 'en' ? t('trust2Title') : (customContent?.trustFeature2Title || t('trust2Title'))}</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{language === 'en' ? t('trust2Desc') : (customContent?.trustFeature2Desc || t('trust2Desc'))}</p>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#121722] border border-[#E8E2D8] dark:border-[#1E2638] flex items-center gap-3 shadow-2xs">
          <span className="text-2xl">💎</span>
          <div>
            <h4 className="text-xs font-black text-slate-900 dark:text-slate-100">{language === 'en' ? t('trust3Title') : (customContent?.trustFeature3Title || t('trust3Title'))}</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{language === 'en' ? t('trust3Desc') : (customContent?.trustFeature3Desc || t('trust3Desc'))}</p>
          </div>
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      {products.length > 0 && (
        <div id="perfumes-catalog" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#E8E2D8] dark:border-[#1E2638]">
          
          {/* Gender & Category Tabs - Smooth touch scroll on mobile */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0 sm:flex-wrap w-full sm:w-auto -mx-2 px-2 sm:mx-0 sm:px-0 scroll-smooth">
            {[
              { id: 'all', label: t('catAll') },
              { id: 'women', label: t('catWomen') },
              { id: 'men', label: t('catMen') },
              { id: 'unisex', label: t('catUnisex') },
              { id: 'featured', label: t('catFeatured') },
              { id: 'fresh', label: t('catFresh') },
              { id: 'beast', label: t('catBeast') },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedGender(tab.id)}
                className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedGender === tab.id
                    ? tab.id === 'women'
                      ? 'bg-rose-700 text-white shadow-md'
                      : 'btn-forest shadow-sm'
                    : 'bg-white dark:bg-[#121722] text-slate-700 dark:text-slate-200 border border-[#E0D7C9] dark:border-[#222C3E] hover:border-forest-700 dark:hover:border-gold-500'
                }`}
              >
                {tab.label}
              </button>
            ))}

            {/* Compare Perfumes Button - Next to Tabs */}
            <button
              onClick={() => setIsComparisonOpen(true)}
              className="shrink-0 whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all bg-gradient-to-r from-amber-50 to-gold-50 dark:from-amber-950/40 dark:to-gold-950/40 border border-gold-400 dark:border-gold-600/60 text-gold-900 dark:text-gold-300 hover:bg-gold-100 dark:hover:bg-gold-900/40 flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95"
              title="مقارنة العطور والهرم العطري"
            >
              <span>{t('compareAction')}</span>
              {comparisonItems.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-forest-800 dark:bg-gold-500 text-white dark:text-slate-950 text-[10px] font-black flex items-center justify-center font-mono">
                  {comparisonItems.length}
                </span>
              )}
            </button>
          </div>

          {/* Brand & Sort Dropdowns */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            {/* Brand Filter */}
            {brands.length > 0 && (
              <div className="relative flex-1 sm:flex-none">
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full sm:w-auto bg-white dark:bg-[#121722] border border-[#E0D7C9] dark:border-[#222C3E] text-slate-700 dark:text-slate-200 text-xs rounded-xl px-3 py-2 pr-7 focus:outline-none focus:border-forest-700 dark:focus:border-gold-500 cursor-pointer appearance-none shadow-sm font-medium"
                >
                  <option value="all">{t('allBrands')}</option>
                  {brands.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                <SlidersHorizontal className="w-3.5 h-3.5 text-gold-600 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            )}

            {/* Sort Filter */}
            <div className="relative flex-1 sm:flex-none">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full sm:w-auto bg-white dark:bg-[#121722] border border-[#E0D7C9] dark:border-[#222C3E] text-slate-700 dark:text-slate-200 text-xs rounded-xl px-3 py-2 pr-7 focus:outline-none focus:border-forest-700 dark:focus:border-gold-500 cursor-pointer appearance-none shadow-sm font-medium"
              >
                <option value="featured">{t('sortFeatured')}</option>
                <option value="price-asc">{t('sortPriceAsc')}</option>
                <option value="price-desc">{t('sortPriceDesc')}</option>
                <option value="rating">{t('sortRating')}</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-gold-600 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      )}

      {/* Search Results Notification Banner */}
      {searchQuery.trim() !== '' && (
        <div className="mb-6 p-4 rounded-2xl bg-forest-50/80 border border-forest-200 flex flex-wrap items-center justify-between gap-3 animate-fade-in shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-forest-800 text-gold-400 flex items-center justify-center shrink-0">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-slate-900">
                  نتائج البحث عن: <span className="font-black text-forest-900 underline decoration-gold-400">"{searchQuery}"</span>
                </span>
                <span className="text-[11px] bg-white text-forest-800 font-extrabold px-2 py-0.5 rounded-full border border-forest-300 font-mono">
                  {filteredProducts.length} عطور
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                تم البحث في كافة العطور والماركات والمكونات العطرية والأسماء المشابهة
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onClearSearch && (
              <button
                onClick={onClearSearch}
                className="text-xs font-bold text-slate-600 hover:text-rose-700 px-3.5 py-1.5 rounded-xl bg-white border border-[#E0D7C9] hover:border-rose-300 transition-colors shadow-2xs"
                title="إلغاء البحث والعودة لعرض كل العطور"
              >
                إلغاء البحث
              </button>
            )}
          </div>
        </div>
      )}

      {/* Grid or Empty State */}
      {products.length === 0 ? (
        /* Empty Store State with clean options */
        <div className="bg-white rounded-3xl p-8 sm:p-14 text-center max-w-2xl mx-auto border border-[#E8E2D8] shadow-sm">
          <div className="w-16 h-16 rounded-full bg-forest-50 border border-forest-200 flex items-center justify-center mx-auto mb-5">
            <Sparkles className="w-8 h-8 text-forest-700" />
          </div>

          <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
            المتجر جاهز ومخصص لعطورك الفاخرة!
          </h3>
          <p className="text-sm text-slate-600 mb-8 leading-relaxed">
            وفقاً لطلبك، المتجر يبدأ فارغاً لتتمكن من إدخال أول عطر بنفسك من لوحة التحكم بكل سهولة، أو يمكنك تجربة تحميل باقة عطور عالمية تجريبية (Dior, Creed, Tom Ford) لمعاينة الواجهة والسلة فوراً.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setActiveView('admin')}
              className="btn-forest px-6 py-3 rounded-xl text-sm font-bold shadow-md hover:scale-105"
            >
              إضافة عطر جديد من لوحة التحكم
            </button>

            <button
              onClick={loadDemoProducts}
              className="btn-gold px-6 py-3 rounded-xl text-sm font-bold shadow-md hover:scale-105"
            >
              تحميل باقة عطور تجريبية للمعاينة
            </button>
          </div>
        </div>
      ) : filteredProducts.length === 0 ? (
        /* No results for current filter or search */
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto border border-[#E8E2D8] shadow-sm space-y-4 my-8">
          <div className="w-14 h-14 rounded-full bg-amber-50 text-gold-600 flex items-center justify-center mx-auto border border-amber-200">
            <Search className="w-7 h-7" />
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-1">
              {searchQuery.trim() !== '' 
                ? `لم نجد عطوراً مطابقة لكلمة "${searchQuery}"`
                : 'لا توجد عطور مطابقة للفلاتر المحددة'}
            </h3>
            <p className="text-xs text-slate-500">
              {searchQuery.trim() !== ''
                ? 'جرب البحث بكلمات مشابهة أو اسم الماركة بالعربية أو الإنجليزية:'
                : 'يمكنك تجربة تغيير التصنيف أو إعادة تعيين الفلاتر.'}
            </p>
          </div>

          {/* Similar keywords suggestions pills */}
          {searchQuery.trim() !== '' && similarKeywords.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold text-slate-400 block">
                اقتراحات مشابهة قد تهمك:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {similarKeywords.map((kw, idx) => {
                  const cleaned = kw.includes('•') ? kw.split('•')[0].trim() : kw.replace(/\(.*?\)/g, '').trim();
                  return (
                    <button
                      key={idx}
                      onClick={() => onSelectSearchKeyword ? onSelectSearchKeyword(cleaned) : undefined}
                      className="px-3.5 py-1.5 rounded-xl bg-forest-50 hover:bg-forest-100 text-forest-900 text-xs font-bold border border-forest-200 transition-all shadow-2xs hover:scale-105"
                    >
                      {kw}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Reset / Clear Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            {searchQuery.trim() !== '' && onClearSearch && (
              <button
                onClick={onClearSearch}
                className="btn-forest px-6 py-2.5 rounded-xl text-xs font-bold shadow-sm"
              >
                مسح البحث وعرض كل العطور
              </button>
            )}
            
            <button
              onClick={() => {
                setSelectedGender('all');
                setSelectedBrand('all');
                if (onClearSearch) onClearSearch();
              }}
              className="text-xs text-slate-600 hover:text-forest-800 font-bold underline px-3 py-2"
            >
              إعادة تعيين الفلاتر
            </button>
          </div>
        </div>
      ) : (
        /* Products Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
