import React, { useState } from 'react';
import { X, Star, MessageSquare } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { FragranticaNotesVisualizer } from './FragranticaNotesVisualizer';

export const ProductDetailModal: React.FC = () => {
  const { activeProductForDetail, setActiveProductForDetail, addToCart, addReview, getProductReviews, settings, language, t } = useStore();
  const product = activeProductForDetail;

  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizes?.[0]?.size || '100 مل'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');

  // New review form state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!product) return null;

  const currentSizeObj = (product.sizes || []).find(s => s.size === selectedSize) || product.sizes?.[0];
  const price = currentSizeObj ? currentSizeObj.price : 0;

  const reviews = getProductReviews(product.id);

  const handleAddToCart = () => {
    if (isSoldOut) {
      alert(language === 'ar' ? 'عذراً، هذا العطر نفد من المخزون حالياً' : 'Sorry, this fragrance is currently out of stock');
      return;
    }
    addToCart(product, selectedSize, quantity);
    setActiveProductForDetail(null);
  };

  const isSoldOut = Boolean(
    product.isSoldOut || 
    (product.sizes && product.sizes.length > 0 && product.sizes.every(s => s.inStock === false))
  );

  const handleDirectWhatsAppBuy = () => {
    const cleanPhone = (settings.whatsappNumber || '201012345678').replace(/[^0-9]/g, '');
    const currencyStr = language === 'ar' ? 'ج.م' : 'EGP';
    const msg = isSoldOut
      ? (language === 'ar'
          ? `مرحباً دار Oro Puro للعطور 👋%0Aأود الاستفسار عن إمكانية حجز أو توفير هذا العطر (نفد من المخزون):%0A*العطر:* ${encodeURIComponent(product.name)} (${encodeURIComponent(product.brand)})%0A*الحجم:* ${encodeURIComponent(selectedSize)}%0Aأرجو إبلاغي فور توفر دفعة جديدة.`
          : `Hello Oro Puro Parfums 👋%0AI would like to inquire about reserving this fragrance (Sold Out):%0A*Fragrance:* ${encodeURIComponent(product.name)} (${encodeURIComponent(product.brand)})%0A*Size:* ${encodeURIComponent(selectedSize)}%0APlease let me know when restocked.`)
      : (language === 'ar'
          ? `مرحباً دار Oro Puro للعطور 👋%0Aأود طلب هذا العطر مباشرة الآن:%0A*العطر:* ${encodeURIComponent(product.name)} (${encodeURIComponent(product.brand)})%0A*الحجم:* ${encodeURIComponent(selectedSize)}%0A*الكمية:* ${quantity}%0A*الإجمالي:* ${(price * quantity).toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US')} ${currencyStr}%0Aيرجى تأكيد الشحن مع حق المعاينة ورش الزجاجة قبل السداد.`
          : `Hello Oro Puro Parfums 👋%0AI would like to order this fragrance right now:%0A*Fragrance:* ${encodeURIComponent(product.name)} (${encodeURIComponent(product.brand)})%0A*Size:* ${encodeURIComponent(selectedSize)}%0A*Quantity:* ${quantity}%0A*Total:* ${(price * quantity).toLocaleString('en-US')} ${currencyStr}%0APlease confirm delivery with test & inspect before payment.`);
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;

    addReview(product.id, reviewName, reviewRating, reviewComment);
    setReviewSubmitted(true);
    setReviewName('');
    setReviewComment('');
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto overscroll-y-contain bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-start justify-center p-2 sm:p-6 animate-fade-in font-arabic"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Click outside backdrop to close */}
      <div className="fixed inset-0 -z-10" onClick={() => setActiveProductForDetail(null)} />

      <div className="relative w-full max-w-4xl bg-white dark:bg-[#121722] border border-[#E8E2D8] dark:border-[#1E2638] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-2 sm:my-8 z-10 transition-colors">
        
        {/* Close Button */}
        <button
          onClick={() => setActiveProductForDetail(null)}
          className={`absolute top-4 ${language === 'ar' ? 'left-4' : 'right-4'} z-20 p-2.5 rounded-full bg-white/90 dark:bg-[#1A2234]/90 border border-slate-200 dark:border-[#2A364F] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors shadow-sm`}
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Image & Badges */}
          <div className="relative bg-[#FAF7F2] dark:bg-[#0A0D14] p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-l dark:border-[#1E2638] border-[#EBE4D8]">
            <div className="w-full max-w-sm aspect-square relative rounded-2xl overflow-hidden bg-white dark:bg-[#121722] p-6 flex items-center justify-center shadow-sm border border-[#E8E2D8] dark:border-[#1E2638]">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain filter drop-shadow-md"
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {isSoldOut && (
                <span className="text-xs px-3 py-1 rounded-full bg-rose-600 text-white font-black shadow-sm animate-pulse">
                  {t('soldOutFull')}
                </span>
              )}
              <span className="text-xs px-3 py-1 rounded-full bg-white dark:bg-[#1A2234] text-gold-700 dark:text-gold-400 border border-[#E0D7C9] dark:border-[#2A364F] font-bold shadow-sm">
                {product.brand}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-white dark:bg-[#1A2234] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#2A364F] font-mono shadow-sm">
                {product.concentration}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-white dark:bg-[#1A2234] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#2A364F] shadow-sm">
                {product.gender === 'men' ? (language === 'ar' ? 'عطر رجالي' : "Men's") : product.gender === 'women' ? (language === 'ar' ? 'عطر نسائي' : "Women's") : (language === 'ar' ? 'عطر للجنسين' : 'Unisex')}
              </span>
            </div>
          </div>

          {/* Right Column: Information, Pyramid, Reviews, Buy */}
          <div className="p-4 sm:p-8 flex flex-col justify-between md:max-h-[85vh] md:overflow-y-auto bg-white dark:bg-[#121722] transition-colors">
            <div>
              {/* Brand & Title */}
              <p className="text-xs font-bold uppercase tracking-wider text-gold-700 dark:text-gold-400 mb-1">
                {product.brand}
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-current'
                          : 'stroke-current text-slate-300 dark:text-slate-600'
                      }`}
                    />
                  ))}
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100 mr-2">{product.rating}</span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  ({product.reviewsCount} {language === 'ar' ? 'تقييم حقيقي' : 'reviews'})
                </span>
              </div>

              {/* Live Urgency & Scarcity Banner or Sold Out Notice */}
              {isSoldOut ? (
                <div className="mb-5 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-950 dark:text-rose-200 text-xs font-bold flex flex-wrap items-center justify-between gap-2 shadow-2xs">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-600 inline-block" />
                    <span>{language === 'ar' ? '⚠️ هذا العطر نفد من المخزون حالياً نظراً لزيادة الطلب' : '⚠️ This fragrance is currently sold out due to high demand'}</span>
                  </span>
                  <span className="text-[10px] bg-white dark:bg-rose-900 text-rose-900 dark:text-rose-100 px-2.5 py-1 rounded-full border border-rose-300 dark:border-rose-700 font-black">
                    {language === 'ar' ? 'يمكنك مراسلتنا لحجزه مع الدفعة القادمة' : 'Contact us to pre-order next batch'}
                  </span>
                </div>
              ) : (
                <div className="mb-5 p-3 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-amber-950 dark:text-amber-200 text-xs font-bold flex flex-wrap items-center justify-between gap-2 shadow-2xs">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                    <span>{language === 'ar' ? '🔥 يتابع هذا العطر الآن 18 متسوقاً في مصر' : '🔥 18 shoppers in Egypt are viewing this scent'}</span>
                  </span>
                  <span className="text-[10px] bg-white dark:bg-amber-900 text-amber-900 dark:text-amber-100 px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-700 font-black">
                    {language === 'ar' ? 'متبقي 3 زجاجات فقط بسعر العرض' : 'Only 3 bottles left at promo price'}
                  </span>
                </div>
              )}

              {/* Tabs: Details / Reviews */}
              <div className="flex border-b border-slate-200 dark:border-[#1E2638] mb-6 gap-6">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2.5 text-sm font-bold transition-colors ${
                    activeTab === 'details'
                      ? 'text-forest-800 dark:text-gold-400 border-b-2 border-forest-800 dark:border-gold-400'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {t('detailsTab')}
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2.5 text-sm font-bold transition-colors flex items-center gap-1.5 ${
                    activeTab === 'reviews'
                      ? 'text-forest-800 dark:text-gold-400 border-b-2 border-forest-800 dark:border-gold-400'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{language === 'ar' ? `آراء العملاء (${reviews.length})` : `Reviews (${reviews.length})`}</span>
                </button>
              </div>

              {activeTab === 'details' ? (
                <>
                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Fragrance Pyramid & Accords (Fragrantica Style) */}
                  <div className="mb-6">
                    <FragranticaNotesVisualizer product={product} />
                  </div>

                  {/* Size Selection */}
                  <div className="mb-6">
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                      {language === 'ar' ? 'اختر الحجم المتوفر:' : 'Available bottle size:'}
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {product.sizes.map((s) => (
                        <button
                          key={s.size}
                          type="button"
                          onClick={() => setSelectedSize(s.size)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                            selectedSize === s.size
                              ? 'bg-forest-50 dark:bg-gold-500/10 text-forest-800 dark:text-gold-400 border-forest-700 dark:border-gold-500 shadow-sm'
                              : 'bg-white dark:bg-[#1A2234] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-[#2A364F] hover:border-slate-400'
                          }`}
                        >
                          <span>{s.size}</span>
                          <span className="text-slate-800 dark:text-slate-200 font-sans">({s.price} {t('currency')})</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                /* Reviews Tab */
                <div className="space-y-6">
                  {/* Add Review Form */}
                  <form onSubmit={handleReviewSubmit} className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#1A2234] border border-[#E8E2D8] dark:border-[#2A364F]">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-3">
                      {language === 'ar' ? 'أضف تقييمك وتجربتك للعطر' : 'Leave your review & experience'}
                    </h4>
                    
                    {reviewSubmitted && (
                      <p className="text-xs text-green-600 dark:text-green-400 mb-3 font-semibold">
                        {language === 'ar' ? 'شكرًا لك! تمت إضافة تقييمك بنجاح.' : 'Thank you! Your review has been added.'}
                      </p>
                    )}

                    <div className="space-y-3">
                      <div>
                        <label className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">
                          {language === 'ar' ? 'التقييم:' : 'Rating:'}
                        </label>
                        <div className="flex items-center gap-1 text-amber-500">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setReviewRating(star)}
                              className="focus:outline-none"
                            >
                              <Star className={`w-5 h-5 ${star <= reviewRating ? 'fill-current' : 'text-slate-300 dark:text-slate-600'}`} />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <input
                          type="text"
                          placeholder={language === 'ar' ? 'اسمك الكريم...' : 'Your name...'}
                          value={reviewName}
                          onChange={(e) => setReviewName(e.target.value)}
                          className="w-full bg-white dark:bg-[#121722] border border-slate-300 dark:border-[#2A364F] rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-forest-700 dark:focus:border-gold-500"
                          required
                        />
                      </div>

                      <div>
                        <textarea
                          placeholder={language === 'ar' ? 'رأيك في ثبات وفوحان العطر...' : 'Your feedback on performance, longevity & projection...'}
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          className="w-full bg-white dark:bg-[#121722] border border-slate-300 dark:border-[#2A364F] rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-forest-700 dark:focus:border-gold-500 h-16"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn-forest px-4 py-1.5 rounded-lg text-xs font-bold"
                      >
                        {language === 'ar' ? 'إرسال التقييم' : 'Submit Review'}
                      </button>
                    </div>
                  </form>

                  {/* Existing Reviews List */}
                  <div className="space-y-3 max-h-56 overflow-y-auto">
                    {reviews.length === 0 ? (
                      <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-4">
                        {language === 'ar' ? 'كن أول من يقيم هذا العطر!' : 'Be the first to review this fragrance!'}
                      </p>
                    ) : (
                      reviews.map((r) => (
                        <div key={r.id} className="p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#1A2234] border border-[#E8E2D8] dark:border-[#2A364F] text-xs">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-slate-800 dark:text-slate-200">{r.userName}</span>
                            <span className="text-[10px] text-slate-400">{r.date}</span>
                          </div>
                          <div className="flex text-amber-500 mb-1.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < r.rating ? 'fill-current' : 'text-slate-300 dark:text-slate-600'}`} />
                            ))}
                          </div>
                          <p className="text-slate-600 dark:text-slate-300">{r.comment}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions: Quantity, Price, Add to Cart & Instant WhatsApp Order */}
            <div className="pt-6 border-t border-slate-200 dark:border-[#1E2638] mt-6 space-y-4">
              <div className="flex flex-col gap-4">
                {/* Price and Quantity Row */}
                <div className="flex items-center justify-between gap-4 w-full">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t('selectedPrice')}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-sans">
                        {(price * quantity).toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US')}
                      </span>
                      <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">{t('currency')}</span>
                    </div>
                  </div>

                  {/* Quantity buttons */}
                  <div className="flex items-center border border-slate-300 dark:border-[#2A364F] rounded-xl bg-white dark:bg-[#1A2234] overflow-hidden shadow-xs">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#253248] transition-colors text-base font-bold active:scale-95"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-sm font-bold text-slate-800 dark:text-white font-mono min-w-[28px] text-center">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#253248] transition-colors text-base font-bold active:scale-95"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Buttons Row */}
                <div className="flex flex-col sm:flex-row gap-2.5 w-full">
                  {/* Add to cart */}
                  {isSoldOut ? (
                    <button
                      type="button"
                      disabled
                      className="bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed flex-1 py-3.5 px-6 rounded-xl text-sm font-bold text-center shadow-none"
                    >
                      {t('soldOutBadge')}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="btn-forest flex-1 py-3.5 px-6 rounded-xl text-sm font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-all text-center"
                    >
                      {t('addToCartBtn')}
                    </button>
                  )}

                  {/* Instant 1-Click WhatsApp Quick Buy or Inquiry */}
                  <button
                    type="button"
                    onClick={handleDirectWhatsAppBuy}
                    className="bg-[#25D366] hover:bg-[#1EBE5D] text-white flex-1 py-3.5 px-6 rounded-xl text-sm font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-all text-center"
                  >
                    {isSoldOut ? t('orderWhatsAppInquiry') : t('orderWhatsAppBtn')}
                  </button>
                </div>
              </div>

              {/* Guarantees Strip */}
              <div className="pt-3 border-t border-slate-100 dark:border-[#1E2638] flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                <span className="text-forest-900 dark:text-gold-400 font-bold">{t('modalGuarantee1')}</span>
                <span className="text-emerald-800 dark:text-emerald-400 font-bold">{t('modalGuarantee2')}</span>
                <span className="text-gold-900 dark:text-amber-400 font-bold">{t('modalGuarantee3')}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
