import React, { useState } from 'react';
import { Star } from 'lucide-react';
import type { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setActiveProductForDetail, addToComparison, language, t } = useStore();
  const productSizes = Array.isArray(product?.sizes) && product.sizes.length > 0 ? product.sizes : [{ size: '100 مل', price: 1000, inStock: true }];
  const [selectedSize, setSelectedSize] = useState<string>(productSizes[0].size);

  const currentSizeObj = productSizes.find(s => s.size === selectedSize) || productSizes[0];
  const price = currentSizeObj ? currentSizeObj.price : 0;
  const originalPrice = currentSizeObj?.originalPrice;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedSize, 1);
  };

  const getGenderLabel = (gender: string) => {
    if (language === 'en') {
      switch (gender) {
        case 'men':
          return "Men's";
        case 'women':
          return "Women's";
        default:
          return 'Unisex';
      }
    }
    switch (gender) {
      case 'men':
        return 'رجالي';
      case 'women':
        return 'نسائي';
      default:
        return 'للجنسين';
    }
  };

  const isSoldOut = Boolean(
    product.isSoldOut || 
    (product.sizes && product.sizes.length > 0 && product.sizes.every(s => s.inStock === false))
  );

  return (
    <div
      onClick={() => setActiveProductForDetail(product)}
      className="group bg-white dark:bg-[#121722] rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-luxury relative border border-[#EAE3D6] dark:border-[#1E2638] dark:hover:border-gold-500/50"
    >
      {/* Top Badges */}
      <div className="absolute top-3 inset-x-3 z-10 flex items-center justify-between pointer-events-none">
        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/95 dark:bg-[#161D2B]/95 backdrop-blur-md border border-[#E0D7C9] dark:border-[#263349] text-slate-800 dark:text-slate-200 shadow-sm">
          {getGenderLabel(product.gender)}
        </span>

        {isSoldOut ? (
          <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-rose-600 text-white shadow-sm flex items-center gap-1">
            <span>{t('soldOutBadge')}</span>
          </span>
        ) : product.isFeatured ? (
          <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-gold-400 text-slate-950 flex items-center gap-1 shadow-sm animate-pulse">
            <span>🔥 {t('bestSeller')}</span>
          </span>
        ) : (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/50 shadow-2xs">
            {t('inspectBeforePay')}
          </span>
        )}
      </div>

      {/* Image container */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#FAF8F5] dark:bg-[#0E131E] flex items-center justify-center p-6 border-b border-[#F0EBE1] dark:border-[#1E2638]">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-contain filter group-hover:scale-105 transition-transform duration-500 ${
            isSoldOut ? 'opacity-70 grayscale-[25%]' : ''
          }`}
          loading="lazy"
        />

        {/* Sold out overlay */}
        {isSoldOut && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
            <span className="bg-rose-600/95 text-white font-black text-xs px-3.5 py-1.5 rounded-full shadow-lg border border-white/30 tracking-wide">
              {t('soldOutFull')}
            </span>
          </div>
        )}

        {/* Quick View Hover Overlay */}
        {!isSoldOut && (
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-white/95 dark:bg-[#161D2B]/95 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 text-xs px-3.5 py-1.5 rounded-full shadow-md font-bold">
              {t('viewDetail')}
            </span>
          </div>
        )}

        {/* Concentration badge */}
        <div className="absolute bottom-2 left-2 text-[10px] px-2 py-0.5 rounded bg-white/90 dark:bg-[#161D2B]/90 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-mono shadow-sm">
          {product.concentration}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand */}
          <p className="text-xs font-bold uppercase tracking-wider text-gold-700 dark:text-gold-400 mb-1">
            {product.brand}
          </p>

          {/* Name */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-forest-800 dark:group-hover:text-gold-400 transition-colors line-clamp-1 mb-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mr-1">{product.rating}</span>
            </div>
            <span className="text-xs text-slate-400 dark:text-slate-500">({product.reviewsCount} {t('reviewsCount')})</span>
          </div>

          {/* Fragrance Notes Highlights */}
          {Array.isArray(product.notes?.top) && product.notes.top.length > 0 && (
            <div className="mb-4">
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-1">{t('topNotesLabel')}</p>
              <div className="flex flex-wrap gap-1">
                {product.notes.top.slice(0, 3).map((note, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-[#FAF7F2] dark:bg-[#182030] text-slate-600 dark:text-slate-300 border border-[#E8E2D8] dark:border-[#263349]"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector Pills */}
          {productSizes.length > 1 && (
            <div className="mb-4" onClick={(e) => e.stopPropagation()}>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-1.5">{t('sizeLabel')}</p>
              <div className="flex flex-wrap gap-1.5">
                {productSizes.map((s) => (
                  <button
                    key={s.size}
                    type="button"
                    onClick={() => setSelectedSize(s.size)}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                      selectedSize === s.size
                        ? 'bg-forest-50 dark:bg-forest-950/60 text-forest-800 dark:text-emerald-300 border-forest-700 dark:border-emerald-600 font-bold'
                        : 'bg-white dark:bg-[#161D2B] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Price & Add to Cart */}
        <div className="pt-3 border-t border-[#F0EBE1] dark:border-[#1E2638] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100 font-sans">
                {language === 'ar' ? price.toLocaleString('ar-EG') : price.toLocaleString('en-US')}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{t('currency')}</span>
            </div>
            {originalPrice && originalPrice > price && (
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[11px] text-slate-400 line-through">
                  {language === 'ar' ? originalPrice.toLocaleString('ar-EG') : originalPrice.toLocaleString('en-US')} {t('currency')}
                </span>
                <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-1 py-0.2 rounded border border-emerald-200 dark:border-emerald-700/50">
                  {t('saveDiscount')} {originalPrice - price} {t('currency')}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                addToComparison(product);
              }}
              className="px-3 py-2 rounded-xl border border-[#E0D7C9] dark:border-[#263349] bg-white dark:bg-[#161D2B] hover:bg-gold-50 dark:hover:bg-gold-950/40 hover:border-gold-400 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-gold-900 dark:hover:text-gold-300 transition-all shadow-xs"
              title="مقارنة العطور"
            >
              {t('compareCardBtn')}
            </button>

            {isSoldOut ? (
              <button
                type="button"
                disabled
                className="bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-none"
              >
                {t('soldOutBadge')}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleAddToCart}
                className="btn-forest px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                {t('instantBuyBtn')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
