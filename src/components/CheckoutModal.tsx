import React, { useState } from 'react';
import { X, Check, Copy, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../context/StoreContext';
import { EGYPTIAN_GOVERNORATES } from '../data/initialData';
import type { PaymentMethod, Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    settings,
    createOrder,
    clearCart,
  } = useStore();

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const [governorate, setGovernorate] = useState(EGYPTIAN_GOVERNORATES[0].name);
  const [cityAddress, setCityAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('instapay');

  // Copy status
  const [copiedText, setCopiedText] = useState<string | null>(null);

  if (!isCheckoutOpen) return null;

  // Calculate Shipping fee
  const selectedGovObj = EGYPTIAN_GOVERNORATES.find(g => g.name === governorate);
  const zone = selectedGovObj?.zone || 'cairoGiza';
  
  const rates = settings?.shippingRates || { cairoGiza: 45, alexandria: 55, deltaCanal: 60, upperEgypt: 75 };
  const baseShippingRate = 
    zone === 'cairoGiza' ? (rates.cairoGiza || 45) :
    zone === 'alexandria' ? (rates.alexandria || 55) :
    zone === 'deltaCanal' ? (rates.deltaCanal || 60) :
    (rates.upperEgypt || 75);

  const freeThreshold = Number(settings.freeShippingThreshold) || 1200;
  const isFreeShipping = cartSubtotal >= freeThreshold;
  const shippingFee = isFreeShipping ? 0 : baseShippingRate;
  const total = cartSubtotal + shippingFee;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !phone.trim() || !cityAddress.trim()) {
      alert('يرجى ملء جميع الحقول الإلزامية (الاسم، الهاتف، العنوان بالتفصيل)');
      return;
    }

    // Create order in store
    const order = createOrder({
      customerName,
      phone,
      alternatePhone: alternatePhone || undefined,
      governorate,
      cityAddress,
      notes: notes || undefined,
      items: cart,
      subtotal: cartSubtotal,
      shippingFee,
      total,
      paymentMethod,
    });

    setCreatedOrder(order);
    setStep('success');

    // Confetti celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#047857', '#D4AF37', '#10B981', '#F5ECCF'],
    });

    // Generate WhatsApp Invoice Message
    const paymentLabel = 
      paymentMethod === 'instapay' ? 'انستاباي (InstaPay)' :
      paymentMethod === 'vodafone_cash' ? 'محفظة فودافون كاش' :
      'الدفع عند الاستلام (COD)';

    const itemsSummary = cart
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.name}*\n   الماركة: ${item.brand}\n   الحجم: ${item.selectedSize} × ${item.quantity}\n   السعر: ${(item.price * item.quantity).toLocaleString('ar-EG')} ج.م`
      )
      .join('\n\n');

    const whatsappMessage = `✨ *طلب جديد من متجر ORO PURO للعطور* ✨
--------------------------------
👑 *رقم الطلب:* #${order.id}
👤 *اسم العميل:* ${customerName}
📱 *رقم الموبايل:* ${phone}${alternatePhone ? `\n📱 *رقم بديل:* ${alternatePhone}` : ''}
📍 *المحافظة:* ${governorate}
🏠 *العنوان:* ${cityAddress}
${notes ? `📝 *ملاحظات التوصيل:* ${notes}\n` : ''}--------------------------------
🛍️ *تفاصيل العطور:*
${itemsSummary}

--------------------------------
💰 *المجموع الفرعي:* ${cartSubtotal.toLocaleString('ar-EG')} ج.م
🚚 *مصاريف الشحن:* ${shippingFee === 0 ? 'مجاني (عرض الشحن المجاني)' : `${shippingFee.toLocaleString('ar-EG')} ج.م`}
💎 *الإجمالي الكلي:* ${total.toLocaleString('ar-EG')} ج.م
💳 *طريقة الدفع المختارة:* ${paymentLabel}
--------------------------------
${
  paymentMethod === 'instapay'
    ? `⚠️ *يرجى إرفاق صورة إشعار تحويل انستاباي لحساب:* ${settings.instapayAddress}`
    : paymentMethod === 'vodafone_cash'
    ? `⚠️ *يرجى إرفاق صورة إشعار تحويل فودافون كاش لرقم:* ${settings.vodafoneCashNumber}`
    : '🚚 الدفع كاش عند استلام ومعاينة الطرد'
}

شكراً لاختياركم ORO PURO!`;

    // Clear cart
    clearCart();

    // Clean phone number for WhatsApp link
    const cleanWhatsapp = (settings?.whatsappNumber || '201012345678').replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto overscroll-y-contain bg-black/60 backdrop-blur-sm flex items-start justify-center p-2 sm:p-6 animate-fade-in font-arabic"
      dir="rtl"
    >
      {/* Click outside backdrop to close */}
      <div className="fixed inset-0 -z-10" onClick={() => setIsCheckoutOpen(false)} />

      <div className="relative w-full max-w-2xl bg-white border border-[#E8E2D8] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-2 sm:my-8 z-10">
        
        {/* Header - Sticky so user can always close and see status */}
        <div className="sticky top-0 z-20 px-5 py-4 sm:p-6 border-b border-[#E8E2D8] bg-[#FAF7F2]/95 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-forest-700" />
            <h3 className="font-extrabold text-base sm:text-xl text-slate-900">
              {step === 'form' ? 'إتمام الطلب وتأكيد الفاتورة' : 'تم استلام طلبك بنجاح!'}
            </h3>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmitOrder} className="p-4 sm:p-8 space-y-6">
            
            {/* 1. Customer Details */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>1. بيانات الشحن والتوصيل</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    الاسم بالكامل *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: أحمد محمد الشريف"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-4 py-2.5 text-base sm:text-sm text-slate-900 focus:outline-none focus:border-forest-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    رقم الموبايل (واتساب) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="مثال: 01012345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-4 py-2.5 text-base sm:text-sm text-slate-900 focus:outline-none focus:border-forest-700 font-mono text-left"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    رقم موبايل إضافي (اختياري)
                  </label>
                  <input
                    type="tel"
                    placeholder="01xxxxxxxxx"
                    value={alternatePhone}
                    onChange={(e) => setAlternatePhone(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-4 py-2.5 text-base sm:text-sm text-slate-900 focus:outline-none focus:border-forest-700 font-mono text-left"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    المحافظة *
                  </label>
                  <select
                    value={governorate}
                    onChange={(e) => setGovernorate(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-4 py-2.5 text-base sm:text-sm text-slate-900 focus:outline-none focus:border-forest-700 cursor-pointer font-medium"
                  >
                    {EGYPTIAN_GOVERNORATES.map((gov) => (
                      <option key={gov.name} value={gov.name}>
                        {gov.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    العنوان بالتفصيل (المنطقة، الشارع، رقم العمارة والشقة) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: المعادي، شارع 9، عمارة 15 الدور الرابع، بجوار..."
                    value={cityAddress}
                    onChange={(e) => setCityAddress(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-4 py-2.5 text-base sm:text-sm text-slate-900 focus:outline-none focus:border-forest-700"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    ملاحظات للمندوب أو وقت التوصيل (اختياري)
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: يرجى الاتصال قبل الوصول بنصف ساعة"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-4 py-2.5 text-base sm:text-sm text-slate-900 focus:outline-none focus:border-forest-700"
                  />
                </div>
              </div>
            </div>

            {/* 2. Payment Method Selection */}
            <div className="pt-4 border-t border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center justify-between">
                <span>2. طريقة الدفع وتفاصيل السداد</span>
                <span className="text-[11px] text-slate-500 font-normal">اختر المناسب لك</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                
                {/* InstaPay */}
                <div
                  onClick={() => setPaymentMethod('instapay')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'instapay'
                      ? 'bg-purple-50 border-purple-600 shadow-sm'
                      : 'bg-[#FAF7F2] border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900">انستاباي</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-100 text-purple-700 font-bold">
                      InstaPay
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">تحويل لحظي مباشر</p>
                </div>

                {/* Vodafone Cash */}
                <div
                  onClick={() => setPaymentMethod('vodafone_cash')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'vodafone_cash'
                      ? 'bg-red-50 border-red-600 shadow-sm'
                      : 'bg-[#FAF7F2] border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900">فودافون كاش</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-red-100 text-red-700 font-bold">
                      محفظة
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">تحويل لأي محفظة كاش</p>
                </div>

                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'bg-emerald-50 border-emerald-600 shadow-sm'
                      : 'bg-[#FAF7F2] border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900">عند الاستلام</span>
                    <Truck className="w-4 h-4 text-forest-700" />
                  </div>
                  <p className="text-[11px] text-slate-500">سداد نقدي عند المعاينة</p>
                </div>

              </div>

              {/* Dynamic Payment Instruction Card */}
              {paymentMethod === 'instapay' && (
                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 font-bold">عنوان الدفع اللحظي (IPA):</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-purple-900 font-bold text-sm bg-white px-2.5 py-1 rounded-lg border border-purple-200">
                        {settings.instapayAddress}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(settings.instapayAddress, 'ipa')}
                        className="p-1.5 rounded-lg bg-white border border-purple-200 text-purple-700 hover:bg-purple-100"
                        title="نسخ عنوان انستاباي"
                      >
                        {copiedText === 'ipa' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-slate-600 text-[11px]">
                    <span>اسم صاحب الحساب:</span>
                    <span className="text-slate-900 font-bold">{settings.instapayAccountName}</span>
                  </div>

                  <p className="text-[11px] text-purple-800 pt-1 border-t border-purple-200">
                    💡 بمجرد الضغط على تأكيد الطلب، ستفتح محادثة واتساب لإرفاق صورة التحويل وتأكيد الشحن فوراً.
                  </p>
                </div>
              )}

              {paymentMethod === 'vodafone_cash' && (
                <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200 text-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 font-bold">رقم محفظة فودافون كاش:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-red-900 font-bold text-sm bg-white px-2.5 py-1 rounded-lg border border-red-200" dir="ltr">
                        {settings.vodafoneCashNumber}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(settings.vodafoneCashNumber, 'voda')}
                        className="p-1.5 rounded-lg bg-white border border-red-200 text-red-700 hover:bg-red-100"
                        title="نسخ رقم فودافون كاش"
                      >
                        {copiedText === 'voda' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-red-800 pt-1 border-t border-red-200">
                    💡 حوّل المبلغ إلى رقم المحفظة، وعند الضغط على تأكيد الطلب ستفتح محادثة واتساب لتأكيد الشحن فوراً.
                  </p>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-slate-700">
                  <p className="flex items-center gap-1.5 text-emerald-900 font-bold mb-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>الدفع نقداً عند استلام الشحنة</span>
                  </p>
                  <p className="text-[11px] text-slate-600">
                    يحق لك فحص ومعاينة الطرد وسلامة زجاجة العطر قبل السداد للمندوب.
                  </p>
                </div>
              )}
            </div>

            {/* 3. Order Summary & Price Breakdown */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>قيمة العطور:</span>
                <span className="font-bold font-sans text-slate-900">{cartSubtotal.toLocaleString('ar-EG')} ج.م</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>الشحن إلى {governorate}:</span>
                <span>
                  {isFreeShipping ? (
                    <span className="text-forest-700 font-bold">مجاني 🎉</span>
                  ) : (
                    <span className="font-bold font-sans">{shippingFee.toLocaleString('ar-EG')} ج.م</span>
                  )}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-slate-900">
                <span className="text-sm font-bold">الإجمالي النهائي:</span>
                <span className="text-2xl font-black text-forest-800 font-sans">
                  {total.toLocaleString('ar-EG')} ج.م
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full btn-forest py-4 rounded-2xl text-base font-bold flex items-center justify-center shadow-md hover:scale-[1.01]"
            >
              <span>تأكيد الطلب وإرسال الفاتورة عبر واتساب</span>
            </button>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs font-bold text-center space-y-1">
              <p className="flex items-center justify-center gap-1.5 text-forest-900 font-extrabold">
                <ShieldCheck className="w-4 h-4 text-forest-700" />
                <span>ضمان ذهبي: لك حق فتح الشحنة ورش وتجربة العطر قبل دفع أي مليم للمندوب</span>
              </p>
              <p className="text-[11px] text-slate-600 font-medium">
                إن لم تطابق الرائحة توقعاتك بنسبة 100%، يمكنك رفض الاستلام فوراً دون أي تكلفة عليك.
              </p>
            </div>

          </form>
        ) : (
          /* Success Screen */
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
              <Check className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-forest-50 text-forest-800 border border-forest-200">
                رقم الطلب: #{createdOrder?.id}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 mb-2">
                تهانينا! تم تسجيل طلبك بنجاح
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                شكراً لاختيارك متجر <strong>ORO PURO</strong>. تم إرسال تفاصيل الفاتورة وجاري تجهيز عطورك الفاخرة للشحن فوراً.
              </p>
            </div>

            {/* Quick WhatsApp Re-open button */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] max-w-md mx-auto text-xs space-y-3">
              <p className="text-slate-600">
                إذا لم تفتح محادثة واتساب تلقائياً، يمكنك فتحها الآن بضغطة زر لتأكيد تفاصيل الطلب:
              </p>
              <a
                href={`https://wa.me/${(settings?.whatsappNumber || '201012345678').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-2.5 rounded-xl transition-all shadow-md"
              >
                <span>فتح محادثة واتساب المتجر</span>
              </a>
            </div>

            <div>
              <button
                type="button"
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setStep('form');
                }}
                className="btn-forest px-8 py-3 rounded-full text-sm font-bold"
              >
                العودة للتسوق
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
