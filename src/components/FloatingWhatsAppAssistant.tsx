import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

export const FloatingWhatsAppAssistant: React.FC = () => {
  const { settings } = useStore();
  const [isTooltipOpen, setIsTooltipOpen] = useState(true);

  const cleanPhone = (settings.whatsappNumber || '201012345678').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent('مرحباً دار Oro Puro للعطور 👋 أود الاستفسار عن عروض اليوم وأفضل العطور الرجالية الأكثر ثباتاً ومناسباً لذوقي.')}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end font-arabic" dir="rtl">
      
      {/* Persuasive Sales Tooltip */}
      {isTooltipOpen && (
        <div className="mb-2 bg-white border-2 border-emerald-500 rounded-2xl p-3 shadow-2xl max-w-xs text-right relative animate-fade-in">
          <button 
            onClick={() => setIsTooltipOpen(false)}
            className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] hover:bg-slate-300"
            title="إغلاق"
          >
            ✕
          </button>
          
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-black text-slate-900">مستشارك العطري متاح الآن</span>
          </div>

          <p className="text-xs text-slate-700 leading-snug mb-2 font-medium">
            {settings.siteContent?.whatsappFloatingText || 'محتار تختار العطر الأنسب لك؟ اضغط هنا للدردشة المباشرة وسنساعدك تختار عطرك بثبات 48 ساعة ومعاينة قبل الدفع!'}
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-xs font-bold bg-[#25D366] hover:bg-[#1EBE5D] text-white py-1.5 px-3 rounded-xl transition-all shadow-xs"
          >
            محادثة سريعة عبر واتساب
          </a>
        </div>
      )}

      {/* Floating Main Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-3 px-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
        title="تواصل معنا فوراً عبر واتساب"
      >
        <span className="text-xs font-black hidden sm:inline">
          طلب سريع عبر واتساب
        </span>
        <span className="text-lg">💬</span>
      </a>

    </div>
  );
};
