import React from 'react';
import { Sparkles, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { settings, setActiveView } = useStore();

  return (
    <footer id="contact" className="bg-[#FAF7F2] border-t border-[#E8E2D8] text-slate-600 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Guarantees Grid */}
        <div id="guarantees" className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-[#E8E2D8]">
          <div className="bg-white p-5 rounded-2xl border border-[#E8E2D8] flex items-start gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-200 flex items-center justify-center text-forest-700 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">أصالة العطور 100%</h4>
              <p className="text-slate-500 leading-relaxed">
                نلتزم بتقديم أرقى العطور العالمية الأصلية من الوكلاء والشركات المعتمدة، مع ضمان المعاينة الكاملة عند الاستلام.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8E2D8] flex items-start gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-200 flex items-center justify-center text-forest-700 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">شحن لجميع المحافظات</h4>
              <p className="text-slate-500 leading-relaxed">
                توصيل سريع وموثوق للقاهرة والجيزة والإسكندرية وجميع محافظات مصر مع تغليف ملكي فاخر ومحكم.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8E2D8] flex items-start gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-200 flex items-center justify-center text-forest-700 shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">دفع ميسر وحق المعاينة</h4>
              <p className="text-slate-500 leading-relaxed">
                سدد عبر انستاباي اللحظي أو محفظة فودافون كاش أو الدفع نقداً عند استلام ومعاينة الزجاجة.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full border border-gold-400/80 bg-white p-0.5 shadow-sm overflow-hidden flex items-center justify-center">
                <img 
                  src={settings.logoUrl || '/images/logo.png'} 
                  alt={settings.storeName || 'Oro Puro Logo'}
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/logo.png';
                  }}
                />
              </div>
              <div>
                <span className="text-xl font-black uppercase font-serif text-slate-900 tracking-widest">
                  ORO PURO
                </span>
                <span className="text-[10px] block text-slate-500 font-bold">الذهب الخالص للعطور العالمية</span>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed max-w-sm">
              وجهتكم الأولى لاقتناء العطور العالمية الراقية وتجربة النشوة العطرية الحقيقية بلمسات ملكية وتوصيل معتمد لكافة أنحاء مصر.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${(settings.whatsappNumber || '201012345678').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#25D366] text-white font-bold text-xs hover:bg-[#1EBE5D] transition-colors shadow-sm"
              >
                <span>واتساب المبيعات</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-4">روابط المتجر</h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => {
                    setActiveView('store');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    window.location.hash = '';
                  }}
                  className="hover:text-forest-800 transition-colors font-medium"
                >
                  الصفحة الرئيسية والتشكيلة
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('advisor');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    window.location.hash = 'advisor';
                  }}
                  className="hover:text-forest-800 transition-colors text-forest-700 font-bold"
                >
                  <span>مستشار العطور الذكي</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('comparison');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    window.location.hash = 'comparison';
                  }}
                  className="hover:text-gold-800 transition-colors text-gold-900 font-bold"
                >
                  <span>استوديو مقارنة العطور</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    window.location.hash = 'contact';
                  }}
                  className="hover:text-forest-800 transition-colors font-medium"
                >
                  <span>اتصل بنا وضمان الأصالة</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact and Payment details */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-4">الدفع والتوصيل</h4>
            <div className="space-y-3">
              <div>
                <span className="text-[11px] text-slate-400 block">طرق السداد المعتمدة:</span>
                <span className="text-slate-800 font-bold">InstaPay • Vodafone Cash • عند الاستلام</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">عنوان انستاباي:</span>
                <span className="text-slate-900 font-mono font-bold" dir="ltr">{settings.instapayAddress}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">رقم فودافون كاش:</span>
                <span className="text-slate-900 font-mono font-bold" dir="ltr">{settings.vodafoneCashNumber}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[#E8E2D8] flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} ORO PURO PARFUMS. جميع الحقوق محفوظة لمتجر أورو بورو للعطور.</p>
          <p className="flex items-center gap-1">
            <span>صُمم بفخامة تليق بعشاق العطور العالمية الراقية</span>
            <Sparkles className="w-3 h-3 text-gold-500" />
          </p>
        </div>

      </div>
    </footer>
  );
};
