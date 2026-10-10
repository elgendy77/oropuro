import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

export const FloatingWhatsAppAssistant: React.FC = () => {
  const { settings, language, t } = useStore();
  const [isTooltipOpen, setIsTooltipOpen] = useState(true);

  const cleanPhone = (settings.whatsappNumber || '201012345678').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    language === 'ar'
      ? 'مرحباً دار Oro Puro للعطور 👋 أود الاستفسار عن عروض اليوم وأفضل العطور الأكثر ثباتاً ومناسباً لذوقي.'
      : 'Hello Oro Puro Parfums 👋 I would like to inquire about today offers and long-lasting fragrances.'
  )}`;

  return (
    <div className={`fixed bottom-5 ${language === 'ar' ? 'right-5' : 'left-5'} z-40 flex flex-col items-end font-arabic`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Persuasive Sales Tooltip */}
      {isTooltipOpen && (
        <div className="mb-2 bg-white dark:bg-[#121722] border-2 border-emerald-500 rounded-2xl p-3 shadow-2xl max-w-xs text-right relative animate-fade-in transition-colors">
          <button 
            onClick={() => setIsTooltipOpen(false)}
            className={`absolute -top-2 ${language === 'ar' ? '-left-2' : '-right-2'} w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-[10px] hover:bg-slate-300`}
            title="Close"
          >
            ✕
          </button>
          
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-black text-slate-900 dark:text-white">
              {t('floatingAssistantTitle')}
            </span>
          </div>

          <p className="text-xs text-slate-700 dark:text-slate-300 leading-snug mb-2 font-medium">
            {settings.siteContent?.whatsappFloatingText || (
              language === 'ar'
                ? 'محتار تختار العطر الأنسب لك؟ اضغط هنا للدردشة المباشرة وسنساعدك تختار عطرك بثبات 48 ساعة ومعاينة قبل الدفع!'
                : 'Need help picking your scent? Chat with us live for 48-hr long-lasting recommendations with test before pay!'
            )}
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-xs font-bold bg-[#25D366] hover:bg-[#1EBE5D] text-white py-1.5 px-3 rounded-xl transition-all shadow-xs"
          >
            {t('floatingAssistantBtn')}
          </a>
        </div>
      )}

      {/* Floating Main Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-3 px-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
        title="WhatsApp"
      >
        <span className="text-xs font-black hidden sm:inline">
          {t('floatingAssistantBtn')}
        </span>
        <span className="text-lg">💬</span>
      </a>

    </div>
  );
};
