import React, { useState } from 'react';
import { Star } from 'lucide-react';
import type { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setActiveProductForDetail, addToComparison } = useStore();
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
      className="group bg-white rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-luxury relative border border-[#EAE3D6]"
    >
      {/* Top Badges */}
      <div className="absolute top-3 inset-x-3 z-10 flex items-center justify-between pointer-events-none">
        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#E0D7C9] text-slate-800 shadow-sm">
          {getGenderLabel(product.gender)}
        </span>

        {isSoldOut ? (
          <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-rose-600 text-white shadow-sm flex items-center gap-1">
            <span>نفد من المخزون</span>
          </span>
        ) : product.isFeatured ? (
          <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-gold-400 text-slate-950 flex items-center gap-1 shadow-sm animate-pulse">
            <span>🔥 الأكثر طلباً</span>
          </span>
        ) : (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs">
            معاينة قبل الدفع ✓
          </span>
        )}
      </div>

      {/* Image container */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#FAF8F5] flex items-center justify-center p-6 border-b border-[#F0EBE1]">
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
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center">
            <span className="bg-rose-600/95 text-white font-black text-xs px-3.5 py-1.5 rounded-full shadow-lg border border-white/30 tracking-wide">
              نفد من المخزون (Sold Out)
            </span>
          </div>
        )}

        {/* Quick View Hover Overlay */}
        {!isSoldOut && (
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-white/95 text-slate-800 border border-slate-200 text-xs px-3.5 py-1.5 rounded-full shadow-md font-bold">
              معاينة العطر
            </span>
          </div>
        )}

        {/* Concentration badge */}
        <div className="absolute bottom-2 left-2 text-[10px] px-2 py-0.5 rounded bg-white/90 text-slate-600 border border-slate-200 font-mono shadow-sm">
          {product.concentration}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand */}
          <p className="text-xs font-bold uppercase tracking-wider text-gold-700 mb-1">
            {product.brand}
          </p>

          {/* Name */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-forest-800 transition-colors line-clamp-1 mb-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-xs font-bold text-slate-700 mr-1">{product.rating}</span>
            </div>
            <span className="text-xs text-slate-400">({product.reviewsCount} تقييم)</span>
          </div>

          {/* Fragrance Notes Highlights */}
          {Array.isArray(product.notes?.top) && product.notes.top.length > 0 && (
            <div className="mb-4">
              <p className="text-[11px] text-slate-500 mb-1">قمة العطر:</p>
              <div className="flex flex-wrap gap-1">
                {product.notes.top.slice(0, 3).map((note, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-[#FAF7F2] text-slate-600 border border-[#E8E2D8]"
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
              <p className="text-[11px] text-slate-500 mb-1.5">الحجم:</p>
              <div className="flex flex-wrap gap-1.5">
                {productSizes.map((s) => (
                  <button
                    key={s.size}
                    type="button"
                    onClick={() => setSelectedSize(s.size)}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                      selectedSize === s.size
                        ? 'bg-forest-50 text-forest-800 border-forest-700 font-bold'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
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
        <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-extrabold text-slate-900 font-sans">
                {price.toLocaleString('ar-EG')}
              </span>
              <span className="text-xs text-slate-500">ج.م</span>
            </div>
            {originalPrice && originalPrice > price && (
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[11px] text-slate-400 line-through">
                  {originalPrice.toLocaleString('ar-EG')} ج.م
                </span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
                  وفر {originalPrice - price} ج.م
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
              className="px-3 py-2 rounded-xl border border-[#E0D7C9] bg-white hover:bg-gold-50 hover:border-gold-400 text-xs font-bold text-slate-700 hover:text-gold-900 transition-all shadow-xs"
              title="مقارنة هذا العطر في استوديو المقارنة"
            >
              مقارنة
            </button>

            {isSoldOut ? (
              <button
                type="button"
                disabled
                className="bg-slate-200 text-slate-500 cursor-not-allowed px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-none"
                title="هذا العطر نفد من المخزون حالياً"
              >
                نفد من المخزون
              </button>
            ) : (
              <button
                type="button"
                onClick={handleAddToCart}
                className="btn-forest px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-md hover:scale-105 active:scale-95 transition-all"
                title="أضف لسلة المشتريات فوراً"
              >
                شراء فوري
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
