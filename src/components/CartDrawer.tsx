import React from 'react';
import { X, Trash2, ShoppingBag, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    settings,
    setIsCheckoutOpen,
  } = useStore();

  if (!isCartOpen) return null;

  // Dynamic Free Shipping threshold controlled strictly by Admin Settings
  const shippingThreshold = Number(settings.freeShippingThreshold) || 1200;
  const freeShippingLeft = Math.max(0, shippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(
    100,
    (cartSubtotal / shippingThreshold) * 100
  );

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleDirectWhatsAppCartCheckout = () => {
    const cleanPhone = (settings.whatsappNumber || '201012345678').replace(/[^0-9]/g, '');
    const itemsList = cart.map((item, i) => `${i + 1}. ${item.name} (${item.brand}) - حجم ${item.selectedSize} × ${item.quantity} = ${(item.price * item.quantity).toLocaleString('ar-EG')} ج.م`).join('%0A');
    const msg = `مرحباً دار Oro Puro للعطور 👋%0Aأود تأكيد طلبي مباشرة عبر واتساب من سلة المتجر:%0A%0A${itemsList}%0A%0A*الإجمالي:* ${cartSubtotal.toLocaleString('ar-EG')} ج.م%0Aيرجى شحن الطلب مع حق المعاينة ورش الزجاجة قبل الدفع.`;
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#E8E2D8] text-slate-800 flex flex-col justify-between shadow-2xl">
          
          {/* Header */}
          <div className="p-5 border-b border-[#EBE4D8] flex items-center justify-between bg-[#FAF7F2]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-forest-800" />
              <h3 className="font-bold text-lg text-slate-900">سلة المشتريات</h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-forest-50 text-forest-800 font-bold font-mono border border-forest-200">
                {cart.length} أصناف
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-[#F8F5EE] px-5 py-3 border-b border-[#E8E2D8]">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              <span className="flex items-center gap-1.5 text-slate-700">
                <Truck className="w-3.5 h-3.5 text-forest-700" />
                {freeShippingLeft === 0 ? (
                  <span className="text-forest-700 font-bold">تهانينا! حصلت على شحن مجاني لكافة المحافظات 🎉</span>
                ) : (
                  <span>
                    أضف عطوراً بقيمة <strong className="text-forest-800 font-bold">{freeShippingLeft.toLocaleString('ar-EG')} ج.م</strong> للشحن المجاني
                  </span>
                )}
              </span>
            </div>

            <div className="w-full bg-[#E8E1D3] rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-forest-700 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-forest-50 border border-forest-200 flex items-center justify-center text-forest-700 mb-4">
                  <ShoppingBag className="w-8 h-8 opacity-70" />
                </div>
                <p className="text-base font-bold text-slate-800 mb-1">سلتك فارغة حالياً</p>
                <p className="text-xs text-slate-500 mb-6">
                  استكشف تشكيلة العطور الفاخرة واختر ما يعبر عن حضورك
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="btn-forest px-6 py-2.5 rounded-full text-xs font-bold"
                >
                  تصفح العطور الآن
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#FAF7F2] p-3.5 rounded-2xl flex gap-3.5 items-center relative border border-[#E8E2D8] group"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl bg-white p-1 flex items-center justify-center border border-slate-200 shrink-0 shadow-sm">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-gold-700 uppercase tracking-wider font-bold">
                      {item.brand}
                    </p>
                    <h4 className="text-xs font-bold text-slate-900 truncate mb-1">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 mb-2">
                      الحجم: <span className="text-slate-800 font-bold">{item.selectedSize}</span>
                    </p>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden shadow-sm">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-left font-sans">
                        <span className="text-sm font-black text-slate-900">
                          {(item.price * item.quantity).toLocaleString('ar-EG')}
                        </span>
                        <span className="text-[10px] text-slate-500 mr-1">ج.م</span>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                    title="حذف من السلة"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#E8E2D8] bg-[#FAF7F2] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>المجموع الفرعي:</span>
                  <span className="font-bold font-sans text-slate-900">
                    {cartSubtotal.toLocaleString('ar-EG')} ج.م
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>الشحن:</span>
                  <span>
                    {freeShippingLeft === 0 ? (
                      <span className="text-forest-700 font-bold">مجاني</span>
                    ) : (
                      'يُحسب عند اختيار المحافظة'
                    )}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                <span className="text-sm font-bold text-slate-900">الإجمالي:</span>
                <span className="text-2xl font-black text-forest-800 font-sans">
                  {cartSubtotal.toLocaleString('ar-EG')} ج.م
                </span>
              </div>

              {/* Stock Reservation Urgency */}
              <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-bold text-center flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping shrink-0" />
                <span>عطورك محجوزة بالسعر المخفض لمدة 15 دقيقة فقط لتفادي نفاد الكمية</span>
              </div>

              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full btn-forest py-3.5 rounded-xl text-sm font-bold shadow-md hover:scale-[1.01] transition-all text-center"
              >
                متابعة لإنهاء الطلب والدفع
              </button>

              <button
                type="button"
                onClick={handleDirectWhatsAppCartCheckout}
                className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 rounded-xl text-xs sm:text-sm font-bold shadow-md hover:scale-[1.01] transition-all text-center flex items-center justify-center"
              >
                تأكيد الطلب فوراً عبر واتساب
              </button>

              <div className="text-center space-y-1">
                <p className="text-[11px] text-forest-900 font-bold flex items-center justify-center gap-1">
                  <span>🛡️ حق المعاينة ورش الزجاجة قبل دفع جنيه واحد</span>
                </p>
                <p className="text-[10px] text-slate-500">
                  دفع ميسر عبر انستاباي أو فودافون كاش أو عند الاستلام
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
