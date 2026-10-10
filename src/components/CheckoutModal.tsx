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
    language,
    t,
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

    // Clear cart
    clearCart();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto overscroll-y-contain bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-start justify-center p-2 sm:p-6 animate-fade-in font-arabic"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Click outside backdrop to close */}
      <div className="fixed inset-0 -z-10" onClick={() => setIsCheckoutOpen(false)} />

      <div className="relative w-full max-w-2xl bg-white dark:bg-[#121722] border border-[#E8E2D8] dark:border-[#1E2638] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-2 sm:my-8 z-10 transition-colors">
        
        {/* Header - Sticky so user can always close and see status */}
        <div className="sticky top-0 z-20 px-5 py-4 sm:p-6 border-b border-[#E8E2D8] dark:border-[#1E2638] bg-[#FAF7F2]/95 dark:bg-[#0A0D14]/95 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-forest-700 dark:text-gold-400" />
            <h3 className="font-extrabold text-base sm:text-xl text-slate-900 dark:text-white">
              {step === 'form' ? t('checkoutTitle') : t('checkoutSuccessTitle')}
            </h3>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1A2234] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmitOrder} className="p-4 sm:p-8 space-y-6">
            
            {/* 1. Customer Details */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>{t('step1Title')}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {t('fullNameLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t('fullNamePlaceholder')}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#FAF7F2] dark:bg-[#1A2234] border border-slate-300 dark:border-[#2A364F] rounded-xl px-4 py-2.5 text-base sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-forest-700 dark:focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {t('phoneLabel')}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder={t('phonePlaceholder')}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#FAF7F2] dark:bg-[#1A2234] border border-slate-300 dark:border-[#2A364F] rounded-xl px-4 py-2.5 text-base sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-forest-700 dark:focus:border-gold-500 font-mono text-left"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {t('altPhoneLabel')}
                  </label>
                  <input
                    type="tel"
                    placeholder="01xxxxxxxxx"
                    value={alternatePhone}
                    onChange={(e) => setAlternatePhone(e.target.value)}
                    className="w-full bg-[#FAF7F2] dark:bg-[#1A2234] border border-slate-300 dark:border-[#2A364F] rounded-xl px-4 py-2.5 text-base sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-forest-700 dark:focus:border-gold-500 font-mono text-left"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {t('governorateLabel')}
                  </label>
                  <select
                    value={governorate}
                    onChange={(e) => setGovernorate(e.target.value)}
                    className="w-full bg-[#FAF7F2] dark:bg-[#1A2234] border border-slate-300 dark:border-[#2A364F] rounded-xl px-4 py-2.5 text-base sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-forest-700 dark:focus:border-gold-500 cursor-pointer font-medium"
                  >
                    {EGYPTIAN_GOVERNORATES.map((gov) => (
                      <option key={gov.name} value={gov.name} className="dark:bg-[#1A2234] dark:text-white">
                        {gov.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {t('addressLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t('addressPlaceholder')}
                    value={cityAddress}
                    onChange={(e) => setCityAddress(e.target.value)}
                    className="w-full bg-[#FAF7F2] dark:bg-[#1A2234] border border-slate-300 dark:border-[#2A364F] rounded-xl px-4 py-2.5 text-base sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-forest-700 dark:focus:border-gold-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {t('notesLabel')}
                  </label>
                  <input
                    type="text"
                    placeholder={language === 'ar' ? 'مثال: يرجى الاتصال قبل الوصول بنصف ساعة' : 'e.g. Please call 30 mins before delivery'}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#FAF7F2] dark:bg-[#1A2234] border border-slate-300 dark:border-[#2A364F] rounded-xl px-4 py-2.5 text-base sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-forest-700 dark:focus:border-gold-500"
                  />
                </div>
              </div>
            </div>

            {/* 2. Payment Method Selection */}
            <div className="pt-4 border-t border-slate-200 dark:border-[#1E2638]">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center justify-between">
                <span>{t('step2Title')}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                  {language === 'ar' ? 'اختر المناسب لك' : 'Select option'}
                </span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                
                {/* InstaPay */}
                <div
                  onClick={() => setPaymentMethod('instapay')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'instapay'
                      ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-600 dark:border-purple-400 shadow-sm'
                      : 'bg-[#FAF7F2] dark:bg-[#1A2234] border-slate-200 dark:border-[#2A364F] hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">انستاباي</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 font-bold">
                      InstaPay
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {language === 'ar' ? 'تحويل لحظي مباشر' : 'Instant transfer'}
                  </p>
                </div>

                {/* Vodafone Cash */}
                <div
                  onClick={() => setPaymentMethod('vodafone_cash')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'vodafone_cash'
                      ? 'bg-red-50 dark:bg-red-950/40 border-red-600 dark:border-red-400 shadow-sm'
                      : 'bg-[#FAF7F2] dark:bg-[#1A2234] border-slate-200 dark:border-[#2A364F] hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">فودافون كاش</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300 font-bold">
                      Wallet
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {language === 'ar' ? 'تحويل لأي محفظة كاش' : 'Mobile cash wallet'}
                  </p>
                </div>

                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-600 dark:border-emerald-400 shadow-sm'
                      : 'bg-[#FAF7F2] dark:bg-[#1A2234] border-slate-200 dark:border-[#2A364F] hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">عند الاستلام</span>
                    <Truck className="w-4 h-4 text-forest-700 dark:text-emerald-400" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {language === 'ar' ? 'سداد نقدي عند المعاينة' : 'Cash upon inspection'}
                  </p>
                </div>

              </div>

              {/* Dynamic Payment Instruction Card */}
              {paymentMethod === 'instapay' && (
                <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300 font-bold">
                      {language === 'ar' ? 'عنوان الدفع اللحظي (IPA):' : 'InstaPay Address (IPA):'}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-purple-900 dark:text-purple-200 font-bold text-sm bg-white dark:bg-[#121722] px-2.5 py-1 rounded-lg border border-purple-200 dark:border-purple-700">
                        {settings.instapayAddress}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(settings.instapayAddress, 'ipa')}
                        className="p-1.5 rounded-lg bg-white dark:bg-[#121722] border border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:bg-purple-100"
                        title="Copy InstaPay IPA"
                      >
                        {copiedText === 'ipa' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300 text-[11px]">
                    <span>{language === 'ar' ? 'اسم صاحب الحساب:' : 'Account Holder:'}</span>
                    <span className="text-slate-900 dark:text-white font-bold">{settings.instapayAccountName}</span>
                  </div>

                  <p className="text-[11px] text-purple-800 dark:text-purple-300 pt-1 border-t border-purple-200 dark:border-purple-800">
                    {language === 'ar' 
                      ? '💡 بمجرد الضغط على تأكيد الطلب، سيتم تسجيل طلبك مباشرة في لوحة التحكم وتجهيز شحنتك فوراً.' 
                      : '💡 Once confirmed, your order will be sent to our dashboard and dispatched promptly.'}
                  </p>
                </div>
              )}

              {paymentMethod === 'vodafone_cash' && (
                <div className="p-4 rounded-2xl bg-red-50/70 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300 font-bold">
                      {language === 'ar' ? 'رقم محفظة فودافون كاش:' : 'Vodafone Cash Wallet:'}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-red-900 dark:text-red-200 font-bold text-sm bg-white dark:bg-[#121722] px-2.5 py-1 rounded-lg border border-red-200 dark:border-red-700" dir="ltr">
                        {settings.vodafoneCashNumber}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(settings.vodafoneCashNumber, 'voda')}
                        className="p-1.5 rounded-lg bg-white dark:bg-[#121722] border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 hover:bg-red-100"
                        title="Copy Vodafone Cash Number"
                      >
                        {copiedText === 'voda' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-red-800 dark:text-red-300 pt-1 border-t border-red-200 dark:border-red-800">
                    {language === 'ar' 
                      ? '💡 حوّل المبلغ إلى رقم المحفظة ثم اضغط تأكيد الطلب لتسجيله في النظام وتجهيز شحنتك فوراً.' 
                      : '💡 Transfer amount to the wallet number and confirm to register your order immediately.'}
                  </p>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-slate-700 dark:text-slate-300">
                  <p className="flex items-center gap-1.5 text-emerald-900 dark:text-emerald-300 font-bold mb-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                    <span>{t('payCod')}</span>
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    {language === 'ar' ? 'يحق لك فحص ومعاينة الطرد وسلامة زجاجة العطر قبل السداد للمندوب.' : 'You have the full right to test and inspect package before payment.'}
                  </p>
                </div>
              )}
            </div>

            {/* 3. Order Summary & Price Breakdown */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#1A2234] border border-[#E8E2D8] dark:border-[#2A364F] space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>{language === 'ar' ? 'قيمة العطور:' : 'Perfumes Subtotal:'}</span>
                <span className="font-bold font-sans text-slate-900 dark:text-white">
                  {cartSubtotal.toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US')} {t('currency')}
                </span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>{language === 'ar' ? `الشحن إلى ${governorate}:` : `Shipping to ${governorate}:`}</span>
                <span>
                  {isFreeShipping ? (
                    <span className="text-forest-700 dark:text-emerald-400 font-bold">
                      {language === 'ar' ? 'مجاني 🎉' : 'Free 🎉'}
                    </span>
                  ) : (
                    <span className="font-bold font-sans text-slate-900 dark:text-white">
                      {shippingFee.toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US')} {t('currency')}
                    </span>
                  )}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-[#2A364F] flex justify-between items-baseline text-slate-900 dark:text-white">
                <span className="text-sm font-bold">{language === 'ar' ? 'الإجمالي النهائي:' : 'Final Total:'}</span>
                <span className="text-2xl font-black text-forest-800 dark:text-gold-400 font-sans">
                  {total.toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US')} {t('currency')}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full btn-forest py-4 rounded-2xl text-base font-bold flex items-center justify-center shadow-md hover:scale-[1.01]"
            >
              <span>{t('confirmOrderBtn')}</span>
            </button>

            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 text-xs font-bold text-center space-y-1">
              <p className="flex items-center justify-center gap-1.5 text-forest-900 dark:text-emerald-400 font-extrabold">
                <ShieldCheck className="w-4 h-4 text-forest-700 dark:text-emerald-400" />
                <span>{t('modalGuarantee1')}</span>
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                {language === 'ar' ? 'إن لم تطابق الرائحة توقعاتك بنسبة 100%، يمكنك رفض الاستلام فوراً دون أي تكلفة عليك.' : 'If the scent does not 100% match your expectations, decline receipt with zero fee.'}
              </p>
            </div>

          </form>
        ) : (
          /* Success Screen */
          <div className="p-6 sm:p-10 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
              <Check className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div>
              <span className="inline-block text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-forest-50 dark:bg-gold-500/10 text-forest-800 dark:text-gold-400 border border-forest-200 dark:border-gold-500/30">
                {language === 'ar' ? 'رقم الطلب المؤكد:' : 'Order ID:'} #{createdOrder?.id}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-3 mb-2">
                {t('checkoutSuccessTitle')}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
                {language === 'ar' 
                  ? 'تم استلام طلبك بنجاح وحفظه في لوحة التحكم! جاري مراجعة الطلب وتجهيز عطورك الملكية للشحن السريع فوراً.' 
                  : 'Your order has been received and logged in our store dashboard! Your perfumes are being prepared for rapid dispatch.'}
              </p>
            </div>

            {/* Order Details Card */}
            {createdOrder && (
              <div className="bg-[#FAF7F2] dark:bg-[#1A2234] border border-[#E8E2D8] dark:border-[#2A364F] rounded-2xl p-4 sm:p-5 text-right text-xs max-w-lg mx-auto space-y-3 shadow-xs">
                <div className="border-b border-slate-200 dark:border-[#2A364F] pb-2.5 flex justify-between items-center">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {language === 'ar' ? 'ملخص بيانات الشحنة' : 'Shipment Summary'}
                  </span>
                  <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    {language === 'ar' ? 'طلب جديد مؤكد' : 'Confirmed'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 dark:text-slate-300">
                  <p><span className="font-bold text-slate-900 dark:text-white">{language === 'ar' ? 'العميل:' : 'Customer:'}</span> {createdOrder.customerName}</p>
                  <p><span className="font-bold text-slate-900 dark:text-white">{language === 'ar' ? 'الهاتف:' : 'Phone:'}</span> <span className="font-mono" dir="ltr">{createdOrder.phone}</span></p>
                  <p className="sm:col-span-2"><span className="font-bold text-slate-900 dark:text-white">{language === 'ar' ? 'العنوان:' : 'Address:'}</span> {createdOrder.cityAddress} - {createdOrder.governorate}</p>
                  <p><span className="font-bold text-slate-900 dark:text-white">{language === 'ar' ? 'طريقة الدفع:' : 'Payment:'}</span> {
                    createdOrder.paymentMethod === 'instapay' ? (language === 'ar' ? 'تحويل انستاباي' : 'InstaPay') :
                    createdOrder.paymentMethod === 'vodafone_cash' ? (language === 'ar' ? 'محفظة فودافون كاش' : 'Vodafone Cash') :
                    (language === 'ar' ? 'دفع عند الاستلام (COD)' : 'Cash on Delivery')
                  }</p>
                  <p><span className="font-bold text-slate-900 dark:text-white">{language === 'ar' ? 'الإجمالي:' : 'Total:'}</span> <span className="font-bold text-forest-800 dark:text-gold-400 font-sans text-sm">{createdOrder.total.toLocaleString()} {t('currency')}</span></p>
                </div>

                {/* Items Ordered */}
                {createdOrder.items && createdOrder.items.length > 0 && (
                  <div className="pt-2 border-t border-slate-200 dark:border-[#2A364F] space-y-1.5">
                    <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">{language === 'ar' ? 'العطور المطلوبة:' : 'Ordered Items:'}</p>
                    {createdOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-[11px] text-slate-600 dark:text-slate-300">
                        <span>{item.name} ({item.selectedSize}) × {item.quantity}</span>
                        <span className="font-mono font-bold">{(item.price * item.quantity).toLocaleString()} {t('currency')}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Reassurance Notice */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-950 dark:text-emerald-200 max-w-lg mx-auto flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{language === 'ar' ? 'حق المعاينة وتجربة العطر بالكامل مكفول عند الاستلام لضمان ثقتك التامة.' : 'Inspection and spray testing right fully guaranteed before acceptance.'}</span>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setStep('form');
                }}
                className="btn-forest px-8 py-3.5 rounded-full text-sm font-bold shadow-md hover:scale-105 transition-all"
              >
                {language === 'ar' ? 'العودة للتسوق ومتابعة المتجر' : 'Continue Shopping'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
