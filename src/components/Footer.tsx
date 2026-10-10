import React from 'react';
import { Sparkles, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { settings, setActiveView, language, t } = useStore();

  return (
    <footer id="contact" className="bg-[#FAF7F2] dark:bg-[#0A0D14] border-t border-[#E8E2D8] dark:border-[#1E2638] text-slate-600 dark:text-slate-400 text-xs pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Guarantees Grid */}
        <div id="guarantees" className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-[#E8E2D8] dark:border-[#1E2638]">
          <div className="bg-white dark:bg-[#121722] p-5 rounded-2xl border border-[#E8E2D8] dark:border-[#1E2638] flex items-start gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-forest-50 dark:bg-gold-500/10 border border-forest-200 dark:border-gold-500/30 flex items-center justify-center text-forest-700 dark:text-gold-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                {t('footerGuar1Title')}
              </h4>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                {t('footerGuar1Desc')}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#121722] p-5 rounded-2xl border border-[#E8E2D8] dark:border-[#1E2638] flex items-start gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-forest-50 dark:bg-gold-500/10 border border-forest-200 dark:border-gold-500/30 flex items-center justify-center text-forest-700 dark:text-gold-400 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                {t('footerGuar2Title')}
              </h4>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                {t('footerGuar2Desc')}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#121722] p-5 rounded-2xl border border-[#E8E2D8] dark:border-[#1E2638] flex items-start gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-forest-50 dark:bg-gold-500/10 border border-forest-200 dark:border-gold-500/30 flex items-center justify-center text-forest-700 dark:text-gold-400 shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                {t('footerGuar3Title')}
              </h4>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                {t('footerGuar3Desc')}
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full border border-gold-400/80 bg-white dark:bg-[#121722] p-0.5 shadow-sm overflow-hidden flex items-center justify-center">
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
                <span className="text-xl font-black uppercase font-serif text-slate-900 dark:text-white tracking-widest">
                  ORO PURO
                </span>
                <span className="text-[10px] block text-slate-500 dark:text-gold-400/90 font-bold">
                  {t('tagline')}
                </span>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm">
              {t('footerAbout')}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${(settings.whatsappNumber || '201012345678').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#25D366] text-white font-bold text-xs hover:bg-[#1EBE5D] transition-colors shadow-sm"
              >
                <span>{t('footerWhatsAppSales')}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
              {language === 'ar' ? 'روابط المتجر' : 'Quick Links'}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => {
                    setActiveView('store');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    window.location.hash = '';
                  }}
                  className="hover:text-forest-800 dark:hover:text-gold-400 transition-colors font-medium text-slate-700 dark:text-slate-300"
                >
                  {t('navHome')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('advisor');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    window.location.hash = 'advisor';
                  }}
                  className="hover:text-forest-800 dark:hover:text-gold-400 transition-colors text-forest-700 dark:text-gold-400 font-bold"
                >
                  <span>{t('navAdvisor')}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('comparison');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    window.location.hash = 'comparison';
                  }}
                  className="hover:text-gold-800 dark:hover:text-gold-300 transition-colors text-gold-900 dark:text-gold-400 font-bold"
                >
                  <span>{t('navCompare')}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    window.location.hash = 'contact';
                  }}
                  className="hover:text-forest-800 dark:hover:text-gold-400 transition-colors font-medium text-slate-700 dark:text-slate-300"
                >
                  <span>{t('navContact')}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact and Payment details */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
              {language === 'ar' ? 'الدفع والتوصيل' : 'Payment & Delivery'}
            </h4>
            <div className="space-y-3">
              <div>
                <span className="text-[11px] text-slate-400 block">
                  {language === 'ar' ? 'طرق السداد المعتمدة:' : 'Accepted Payment:'}
                </span>
                <span className="text-slate-800 dark:text-slate-200 font-bold">InstaPay • Vodafone Cash • COD</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">
                  {language === 'ar' ? 'عنوان انستاباي:' : 'InstaPay IPA:'}
                </span>
                <span className="text-slate-900 dark:text-white font-mono font-bold" dir="ltr">{settings.instapayAddress}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">
                  {language === 'ar' ? 'رقم فودافون كاش:' : 'Vodafone Cash:'}
                </span>
                <span className="text-slate-900 dark:text-white font-mono font-bold" dir="ltr">{settings.vodafoneCashNumber}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[#E8E2D8] dark:border-[#1E2638] flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} ORO PURO PARFUMS. {t('footerRights')}</p>
          <p className="flex items-center gap-1">
            <span>{language === 'ar' ? 'صُمم بفخامة تليق بعشاق العطور العالمية الراقية' : 'Designed for true connoisseurs of luxury fragrances'}</span>
            <Sparkles className="w-3 h-3 text-gold-500" />
          </p>
        </div>

      </div>
    </footer>
  );
};
