import React, { useState } from 'react';
import { 
  ShieldCheck, Truck, RotateCcw, Phone, MessageSquare, 
  MapPin, Clock, CheckCircle2, Star, Send, 
  ChevronRight, Sparkles, Crown, HeartHandshake,
  Check, Zap
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { settings, setActiveView } = useStore();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formGovernorate, setFormGovernorate] = useState('الإسكندرية');
  const [formMessage, setFormMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleDirectWhatsApp = (customMsg?: string) => {
    const phone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const text = customMsg || `مرحباً دار Oro Puro للعطور، أود الاستفسار عن العطور المتوفرة لديكم وطرق التوصيل.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) return;

    const msg = `مرحباً Oro Puro 👋%0A*اسم العميل:* ${encodeURIComponent(formName)}%0A*رقم الهاتف:* ${encodeURIComponent(formPhone)}%0A*المحافظة:* ${encodeURIComponent(formGovernorate)}%0A*الرسالة:* ${encodeURIComponent(formMessage || 'أود الاستفسار عن العطور وطرق الشحن.')}`;
    const phone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
    setIsSent(true);
    setTimeout(() => setIsSent(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-24 font-arabic text-slate-900" dir="rtl">
      
      {/* Top Breadcrumbs */}
      <div className="bg-white border-b border-[#E8E2D8] sticky top-16 sm:top-20 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <button 
              onClick={() => { setActiveView('store'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-slate-600 hover:text-gold-700 transition-colors font-medium"
            >
              الرئيسية
            </button>
            <ChevronRight className="w-4 h-4 text-slate-400 rotate-180" />
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-forest-700" />
              اتصل بنا وضمان الأصالة
            </span>
          </div>

          <button
            onClick={() => { setActiveView('store'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-xs font-bold text-slate-700 hover:text-slate-900 border border-slate-300 px-3.5 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-slate-100 transition-colors"
          >
            العودة للمتجر والتشكيلة
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        
        {/* Main Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-50 border border-gold-300 text-gold-950 text-xs font-bold mb-4 shadow-xs">
            <img 
              src={settings.logoUrl || '/images/logo.png'} 
              alt="Oro Puro" 
              className="w-4 h-4 rounded-full object-cover" 
              onError={(e) => { (e.target as HTMLImageElement).src = '/images/logo.png'; }}
            />
            <span>دار Oro Puro | الذهب الخالص للعطور الأصلية</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            معايير الأصالة المطلقة والتواصل المباشر
          </h1>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            مقرنا الرئيسي في عروس البحر الأبيض المتوسط <strong className="text-forest-800 font-bold underline decoration-gold-400 underline-offset-4">الإسكندرية</strong>، ونصلك بكل فخر وعناية فائقة أينما كنت في أي قرية أو محافظة داخل جمهورية مصر العربية مع حق المعاينة والتجربة الكاملة قبل الاستلام.
          </p>
        </div>

        {/* 1. MARKETING AUTHENTICITY GUARANTEE - LIGHT LUXURY THEME (High Contrast, Crystal Clear Text) */}
        <section className="mb-16">
          <div className="bg-white rounded-3xl p-6 sm:p-12 border-2 border-[#E2D9CC] shadow-luxury relative overflow-hidden">
            
            {/* Top Guarantee Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-8 border-b border-[#E8E2D8]">
              <div>
                <div className="flex items-center gap-2 text-gold-800 font-bold text-xs uppercase tracking-widest mb-1.5">
                  <Sparkles className="w-4 h-4 text-gold-600" />
                  <span>ميثاق الجودة الملكي (The Royal Trust Promise)</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
                  لماذا تشتري من Oro Puro وأنت مطمئن البال بنسبة 100%؟
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  نحن لا نبيع مجرد عطور، بل نمنحك تجربة تسوق آمنة ومريحة تضمن لك كامل حقوقك قبل دفع أي مليم.
                </p>
              </div>

              <div className="flex items-center gap-3 bg-[#FAF7F2] border border-[#E0D7C9] px-4 py-3 rounded-2xl shrink-0 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-forest-800 text-gold-400 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-500 block font-medium">شهادة الأمان</span>
                  <span className="text-xs font-black text-forest-900">معاينة وتجربة قبل الدفع</span>
                </div>
              </div>
            </div>

            {/* 6 High-Converting Pillars Grid with Clear Dark Text */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              
              {/* Pillar 1 */}
              <div className="bg-[#FAF8F5] border border-[#EAE3D6] rounded-2xl p-6 hover:border-forest-700 hover:bg-white transition-all shadow-xs group">
                <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-200 flex items-center justify-center text-forest-800 mb-4 shadow-xs group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                  1. أصالة العطر ومطابقة المكونات 100%
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  نستورد أرقى الزيوت العطرية النقية من كبرى دور العطور في فرنسا وسويسرا، بتركيبات مطابقة تماماً للروائح الأصلية بهرمها العطري الكامل (قمة، قلب، وقاعدة العطر) دون أي تغيير.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="bg-[#FAF8F5] border border-[#EAE3D6] rounded-2xl p-6 hover:border-forest-700 hover:bg-white transition-all shadow-xs group">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-4 shadow-xs group-hover:scale-105 transition-transform">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                  2. حق المعاينة ورش العطر قبل السداد
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  نثق بجودة عطورنا لأقصى مدى! يحق لك فتح الشحنة بحضور مندوب التوصيل وفحص الزجاجة وتجربة الرائحة قبل دفع أي مبلغ. إن لم تطابق تطلعاتك، تعود الشحنة دون أي تكلفة عليك.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="bg-[#FAF8F5] border border-[#EAE3D6] rounded-2xl p-6 hover:border-forest-700 hover:bg-white transition-all shadow-xs group">
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-4 shadow-xs group-hover:scale-105 transition-transform">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                  3. ضمان الاستبدال والاسترداد الذهبي
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  إذا ظهرت أي ملاحظة على ثبات العطر أو فوحانه خلال 14 يوماً من الشراء، نلتزم فوراً باستبدال الزجاجة أو استرداد كامل قيمة طلبك برحابة صدر تامة ودون أي إجراءات معقدة.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="bg-[#FAF8F5] border border-[#EAE3D6] rounded-2xl p-6 hover:border-forest-700 hover:bg-white transition-all shadow-xs group">
                <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 mb-4 shadow-xs group-hover:scale-105 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                  4. تركيزات نقية فائقة الثبات (Extrait & EDP)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  لا نقدم عطوراً مخففة بالكحول التجاري؛ بل نعبئ عطورنا بتركيزات زيتية مكثفة تصل من 30% إلى 40% لتضمن بقاء العطر فواحاً وثابتاً على الملابس لأيام متتالية حتى بعد الغسيل.
                </p>
              </div>

              {/* Pillar 5 */}
              <div className="bg-[#FAF8F5] border border-[#EAE3D6] rounded-2xl p-6 hover:border-forest-700 hover:bg-white transition-all shadow-xs group">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 mb-4 shadow-xs group-hover:scale-105 transition-transform">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                  5. تغليف ملكي فاخر وآمن ضد الصدمات
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  كل زجاجة تأتي في صندوق أنيق محمي بوسائد هوائية خاصة ومحكمة تمنع أي كسر أو تسريب، لتصلك التحفة العطرية بحالة المصنع لتليق بك أو كهدية فاخرة تُشرفك.
                </p>
              </div>

              {/* Pillar 6 */}
              <div className="bg-[#FAF8F5] border border-[#EAE3D6] rounded-2xl p-6 hover:border-forest-700 hover:bg-white transition-all shadow-xs group">
                <div className="w-12 h-12 rounded-xl bg-gold-50 border border-gold-300 flex items-center justify-center text-gold-700 mb-4 shadow-xs group-hover:scale-105 transition-transform">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                  6. متابعة لحظية للشحنة وخدمة عملاء راقية
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  فريقنا متواجد معك عبر الواتساب والهاتف خطوة بخطوة من لحظة تأكيد الطلب، مع تزويدك برقم البوليصة والمتابعة حتى استلامك للعطر بنفسك والتأكد من رضاك الكامل.
                </p>
              </div>

            </div>

            {/* Bottom Guarantee Action Banner */}
            <div className="flex flex-col sm:flex-row items-center justify-between p-5 rounded-2xl bg-forest-900 text-white gap-4 shadow-md">
              <div className="flex items-center gap-3">
                <Star className="w-6 h-6 text-gold-400 fill-current shrink-0" />
                <p className="text-xs sm:text-sm text-slate-100 font-bold">
                  انضم لأكثر من 5,000 عميل يثقون في عطور Oro Puro في جميع أنحاء مصر.
                </p>
              </div>

              <button
                onClick={() => { setActiveView('store'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold shadow-md shrink-0 w-full sm:w-auto text-center"
              >
                تسوق التشكيلة الفاخرة الآن
              </button>
            </div>

          </div>
        </section>

        {/* 2. EGYPT SHIPPING NETWORK HUB - CLEAN & CRYSTAL CLEAR (No noisy lines or confusing drawings) */}
        <section className="mb-16">
          <div className="bg-white rounded-3xl border-2 border-[#E2D9CC] p-6 sm:p-10 shadow-luxury">
            
            {/* Hub Header */}
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-50 text-forest-800 text-xs font-bold border border-forest-200 mb-3">
                <MapPin className="w-4 h-4 text-forest-700" />
                <span>المقر الرئيسي: الإسكندرية • ونشحن لكل ربوع مصر</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mb-2">
                شبكة الشحن والتوزيع السريع لكافة المحافظات
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                تنطلق شحناتنا يومياً من مستودعاتنا المركزية في عروس البحر الأبيض المتوسط بالإسكندرية عبر أسرع شركات الشحن والتوصيل حتى باب بيتك.
              </p>
            </div>

            {/* Headquarters Central Hub Card */}
            <div className="bg-[#021F17] bg-gradient-to-r from-[#021F17] via-[#064E3B] to-[#021F17] text-white rounded-2xl p-6 mb-8 shadow-md border border-amber-400/40 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-right">
                <div className="w-14 h-14 rounded-2xl bg-gold-400 text-slate-950 flex items-center justify-center font-black shadow-md shrink-0 overflow-hidden p-0.5 border border-gold-300">
                  <img 
                    src={settings.logoUrl || '/images/logo.png'} 
                    alt="Oro Puro Logo" 
                    className="w-full h-full object-cover rounded-xl"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/images/logo.png'; }}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl sm:text-2xl font-black text-gold-300">
                      محافظة الإسكندرية
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-400 text-slate-950 font-bold">
                      المقر الرئيسي ومستودعات التوزيع
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 font-medium">
                    توصيل فوري خلال <strong>24 ساعة فقط</strong> داخل الإسكندرية، مع إمكانية التوصيل في نفس اليوم لطلبات الصباح.
                  </p>
                </div>
              </div>

              <div className="bg-white/10 border border-white/15 px-5 py-3 rounded-xl backdrop-blur-md text-center shrink-0">
                <span className="text-[11px] text-gold-300 block font-bold">سعر الشحن بالإسكندرية</span>
                <span className="text-xl font-black text-white font-mono">{settings.shippingRates.alexandria || 55} ج.م</span>
              </div>
            </div>

            {/* Visual Clean Trajectory Corridors (Direct, Clear Arrows from Alexandria to Egypt) */}
            <div className="mb-8">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-forest-700" />
                <span>مسارات الشحن المنطلقة يومياً من الإسكندرية لجميع المحافظات:</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Route 1: Cairo & Giza */}
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] hover:border-forest-700 transition-all shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-forest-900 bg-forest-100 px-2.5 py-1 rounded-lg">
                          الإسكندرية ◄───► القاهرة والجيزة
                        </span>
                      </div>
                      <span className="text-sm font-black text-slate-900 font-mono bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                        {settings.shippingRates.cairoGiza || 45} ج.م
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 mb-1">
                      القاهرة الكبرى، الجيزة، ومدينة السادس من أكتوبر، والتجمع
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      توصيل سريع من <strong>24 إلى 48 ساعة</strong> كحد أقصى حتى باب المنزل أو العمل.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#EAE3D6] flex items-center justify-between text-[11px] text-slate-500 font-bold">
                    <span>زمن التوصيل: 24 - 48 ساعة</span>
                    <span className="text-emerald-700 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      متاح الدفع عند الاستلام
                    </span>
                  </div>
                </div>

                {/* Route 2: Delta & Canal */}
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] hover:border-forest-700 transition-all shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-forest-900 bg-forest-100 px-2.5 py-1 rounded-lg">
                          الإسكندرية ◄───► الدلتا والقناة
                        </span>
                      </div>
                      <span className="text-sm font-black text-slate-900 font-mono bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                        {settings.shippingRates.deltaCanal || 60} ج.م
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 mb-1">
                      طنطا، المنصورة، الزقازيق، كفر الشيخ، دمياط، بورسعيد، الإسماعيلية، السويس
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      توصيل شامل لجميع مدن وقرى الدلتا والقناة خلال <strong>48 ساعة</strong> كحد أقصى.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#EAE3D6] flex items-center justify-between text-[11px] text-slate-500 font-bold">
                    <span>زمن التوصيل: 48 ساعة</span>
                    <span className="text-emerald-700 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      متاح الدفع عند الاستلام
                    </span>
                  </div>
                </div>

                {/* Route 3: Upper Egypt (الصعيد) */}
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] hover:border-forest-700 transition-all shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-forest-900 bg-forest-100 px-2.5 py-1 rounded-lg">
                          الإسكندرية ◄───► محافظات الصعيد
                        </span>
                      </div>
                      <span className="text-sm font-black text-slate-900 font-mono bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                        {settings.shippingRates.upperEgypt || 75} ج.م
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 mb-1">
                      الفيوم، بني سويف، المنيا، أسيوط، سوهاج، قنا، الأقصر، وأسوان
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      تغطية شاملة لكل محافظات مصر العليا ومراكزها خلال <strong>48 إلى 72 ساعة</strong>.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#EAE3D6] flex items-center justify-between text-[11px] text-slate-500 font-bold">
                    <span>زمن التوصيل: 48 - 72 ساعة</span>
                    <span className="text-emerald-700 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      متاح الدفع عند الاستلام
                    </span>
                  </div>
                </div>

                {/* Route 4: Coastal, Red Sea & Sinai */}
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] hover:border-forest-700 transition-all shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-forest-900 bg-forest-100 px-2.5 py-1 rounded-lg">
                          الإسكندرية ◄───► السواحل وسيناء
                        </span>
                      </div>
                      <span className="text-sm font-black text-slate-900 font-mono bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                        {settings.shippingRates.upperEgypt || 75} ج.م
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 mb-1">
                      الغردقة، الجونة، شرم الشيخ، دهب، مرسى مطروح، والساحل الشمالي
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      شحن مؤمن لجميع المناطق السياحية والساحلية خلال <strong>48 إلى 72 ساعة</strong>.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#EAE3D6] flex items-center justify-between text-[11px] text-slate-500 font-bold">
                    <span>زمن التوصيل: 48 - 72 ساعة</span>
                    <span className="text-emerald-700 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      متاح الدفع عند الاستلام
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Free Shipping Alert Box */}
            <div className="p-4 rounded-2xl bg-gold-50 border-2 border-gold-300 text-gold-950 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-400 text-slate-950 flex items-center justify-center font-black shrink-0">
                  <Sparkles className="w-5 h-5 text-slate-950" />
                </div>
                <div>
                  <span className="text-sm font-black text-slate-900 block">
                    عرض الشحن المجاني الملكي:
                  </span>
                  <span className="text-xs text-slate-700 font-medium">
                    اطلب أي عطرين أو أكثر (بقيمة {settings.freeShippingThreshold} ج.م فما فوق) واحصل على <strong>شحن مجاني بالكامل</strong> لأي محافظة في مصر!
                  </span>
                </div>
              </div>

              <button
                onClick={() => { setActiveView('store'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="btn-forest px-5 py-2 rounded-xl text-xs font-bold shrink-0 shadow-sm"
              >
                تصفح العطور الآن
              </button>
            </div>

          </div>
        </section>

        {/* 3. STORE CONTACT & VERIFIED PAYMENT DETAILS (Crystal Clear Dark Text) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Official Contact Info Card */}
          <div className="lg:col-span-6 bg-white rounded-3xl border-2 border-[#E2D9CC] p-6 sm:p-8 shadow-luxury flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#EAE3D6]">
                <div className="w-12 h-12 rounded-2xl bg-forest-800 text-gold-400 flex items-center justify-center shadow-md">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    بيانات التواصل الرسمية المعتمدة
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">
                    تواصل معنا في أي وقت، فريق الدعم مستعد لخدمتك والرد على استفساراتك
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                
                {/* Headquarters Location */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D6] flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-forest-50 border border-forest-200 flex items-center justify-center text-forest-800 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-forest-700" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-600 block mb-0.5">المقر الرئيسي ومستودعات التوزيع:</span>
                    <span className="text-sm font-extrabold text-slate-900 block">
                      محافظة الإسكندرية، جمهورية مصر العربية
                    </span>
                    <span className="text-xs text-slate-600 mt-0.5 block font-medium">
                      مركز تجهيز وشحن الطلبات اليومية لجميع المحافظات
                    </span>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-300 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-emerald-950 block mb-0.5">محادثة واتساب الرسمية (خدمة العملاء والطلبات):</span>
                      <span className="text-base font-extrabold text-emerald-900 font-mono tracking-wider block">
                        +{settings.whatsappNumber}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDirectWhatsApp()}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs shrink-0"
                  >
                    <span>فتح واتساب</span>
                  </button>
                </div>

                {/* Direct Phone Line */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D6] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-forest-800 text-white flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-600 block mb-0.5">رقم الاتصال المباشر والطلبات:</span>
                      <span className="text-base font-extrabold text-slate-900 font-mono tracking-wider block">
                        {settings.vodafoneCashNumber}
                      </span>
                    </div>
                  </div>

                  <a
                    href={`tel:${settings.vodafoneCashNumber}`}
                    className="px-4 py-2 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-bold transition-all shadow-xs shrink-0"
                  >
                    <span>اتصل الآن</span>
                  </a>
                </div>

                {/* Customer Service Hours */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D6] flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-gold-50 border border-gold-300 flex items-center justify-center text-gold-800 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5 text-gold-700" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-600 block mb-0.5">ساعات العمل والرد السريع:</span>
                    <span className="text-sm font-extrabold text-slate-900 block">
                      يومياً من الساعة 10:00 صباحاً حتى 11:00 مساءً
                    </span>
                    <span className="text-xs text-slate-600 block mt-0.5 font-medium">
                      جاهزون للرد الفوري على مدار الساعة لخدمتكم
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Payment Details Section */}
            <div className="pt-6 border-t border-[#EAE3D6]">
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-gold-600" />
                <span>طرق السداد المعتمدة لدى دار Oro Puro:</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* InstaPay */}
                <div className="p-3.5 rounded-xl border border-purple-200 bg-purple-50/50 shadow-xs flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-purple-900 block mb-0.5">حساب إنستاباي المعتمد (InstaPay):</span>
                    <span className="text-xs font-mono font-extrabold text-purple-950 block mb-1">
                      {settings.instapayAddress}
                    </span>
                    <span className="text-[10px] text-slate-600 block font-medium">
                      الاسم: {settings.instapayAccountName}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(settings.instapayAddress, 'instapay')}
                    className="mt-2 text-[10px] font-bold text-purple-800 hover:text-purple-950"
                  >
                    {copiedField === 'instapay' ? (
                      <span className="text-emerald-700 font-bold">تم نسخ العنوان!</span>
                    ) : (
                      <span>نسخ عنوان إنستاباي</span>
                    )}
                  </button>
                </div>

                {/* Vodafone Cash */}
                <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/50 shadow-xs flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-rose-900 block mb-0.5">محفظة فودافون كاش (Vodafone Cash):</span>
                    <span className="text-xs font-mono font-extrabold text-rose-950 block mb-1">
                      {settings.vodafoneCashNumber}
                    </span>
                    <span className="text-[10px] text-slate-600 block font-medium">
                      التحويل المباشر مع إرسال صورة إيصال التحويل
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(settings.vodafoneCashNumber, 'vodafone')}
                    className="mt-2 text-[10px] font-bold text-rose-800 hover:text-rose-950"
                  >
                    {copiedField === 'vodafone' ? (
                      <span className="text-emerald-700 font-bold">تم نسخ الرقم!</span>
                    ) : (
                      <span>نسخ رقم المحفظة</span>
                    )}
                  </button>
                </div>

              </div>
            </div>

          </div>

          {/* Quick Contact & Inquiries Form Card */}
          <div className="lg:col-span-6 bg-white rounded-3xl border-2 border-[#E2D9CC] p-6 sm:p-8 shadow-luxury flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#EAE3D6]">
                <div className="w-12 h-12 rounded-2xl bg-gold-50 border border-gold-300 text-gold-800 flex items-center justify-center shadow-xs">
                  <Send className="w-6 h-6 text-gold-700" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    أرسل لنا استفسارك أو طلبك
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">
                    املأ بياناتك وسيتم التواصل معك مباشرة لتأكيد طلبك أو الرد على استفسارك
                  </p>
                </div>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    الاسم بالكامل *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: كريم النجار"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:border-forest-700 bg-[#FAF8F5] text-slate-900 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      رقم الهاتف / الواتساب *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="010XXXXXXXX"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:border-forest-700 bg-[#FAF8F5] font-mono text-right text-slate-900 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      المحافظة
                    </label>
                    <select
                      value={formGovernorate}
                      onChange={(e) => setFormGovernorate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:border-forest-700 bg-[#FAF8F5] text-slate-900 font-bold"
                    >
                      <option value="الإسكندرية">الإسكندرية (المقر الرئيسي)</option>
                      <option value="القاهرة">القاهرة</option>
                      <option value="الجيزة">الجيزة</option>
                      <option value="القليوبية">القليوبية</option>
                      <option value="الشرقية">الشرقية</option>
                      <option value="الدقهلية">الدقهلية (المنصورة)</option>
                      <option value="الغربية">الغربية (طنطا)</option>
                      <option value="البحيرة">البحيرة</option>
                      <option value="بورسعيد">بورسعيد</option>
                      <option value="السويس">السويس</option>
                      <option value="الإسماعيلية">الإسماعيلية</option>
                      <option value="المنيا">المنيا</option>
                      <option value="أسيوط">أسيوط</option>
                      <option value="سوهاج">سوهاج</option>
                      <option value="قنا">قنا</option>
                      <option value="الأقصر">الأقصر</option>
                      <option value="أسوان">أسوان</option>
                      <option value="البحر الأحمر">البحر الأحمر (الغردقة)</option>
                      <option value="جنوب سيناء">جنوب سيناء (شرم الشيخ)</option>
                      <option value="مطروح">مطروح والساحل الشمالي</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    الرسالة أو العطور التي تود الاستفسار عنها
                  </label>
                  <textarea
                    rows={4}
                    placeholder="اكتب استفسارك، أو أسماء العطور التي ترغب بطلبها ومعرفة تفاصيل أكثر عنها..."
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:border-forest-700 bg-[#FAF8F5] text-slate-900 font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-forest py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center shadow-md hover:scale-101 transition-all"
                >
                  <span>إرسال الطلب والتواصل الفوري عبر الواتساب</span>
                </button>

                {isSent && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold text-center flex items-center justify-center gap-1.5 animate-fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>تم فتح الواتساب بنجاح، فريقنا معك الآن!</span>
                  </div>
                )}

              </form>
            </div>

            <div className="pt-6 border-t border-[#EAE3D6] text-center">
              <p className="text-xs text-slate-600 font-medium">
                أو يمكنك الاتصال المباشر على الهاتف <strong className="text-slate-900 font-mono font-bold">+{settings.whatsappNumber}</strong>
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
