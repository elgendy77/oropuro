import React, { useState, useEffect } from 'react';

interface SaleEvent {
  buyer: string;
  city: string;
  perfume: string;
  image: string;
  timeAgo: string;
}

const SALES_DATABASE: SaleEvent[] = [
  {
    buyer: 'كريم النجار',
    city: 'الإسكندرية (سموحة)',
    perfume: 'ديور سوفاج إكسير • 100 مل',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=300',
    timeAgo: 'منذ دقيقتين'
  },
  {
    buyer: 'عمر الشريف',
    city: 'القاهرة (التجمع الخامس)',
    perfume: 'كريد أفينتوس & باكارات روج 540',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=300',
    timeAgo: 'منذ 5 دقائق'
  },
  {
    buyer: 'أحمد بدوي',
    city: 'الدقهلية (المنصورة)',
    perfume: 'نيشاني هاجيفات • ثبات أسطوري',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=300',
    timeAgo: 'منذ 8 دقائق'
  },
  {
    buyer: 'طارق حسام',
    city: 'الجيزة (الشيخ زايد)',
    perfume: 'توم فورد عود وود • 100 مل',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=300',
    timeAgo: 'منذ 11 دقيقة'
  },
  {
    buyer: 'ياسين رضوان',
    city: 'الإسكندرية (ستانلي)',
    perfume: 'مارلي ليتون • Extrait De Parfum',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=300',
    timeAgo: 'منذ 15 دقيقة'
  },
  {
    buyer: 'مهند سامي',
    city: 'الغربية (طنطا)',
    perfume: 'أورو بورو رويال إكسير الملكي',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=300',
    timeAgo: 'منذ 19 دقيقة'
  },
  {
    buyer: 'سيف الدين',
    city: 'القاهرة (المعادي)',
    perfume: 'بلو دي شانيل • 100 مل',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=300',
    timeAgo: 'منذ 24 دقيقة'
  }
];

export const SalesNotificationToast: React.FC = () => {
  const [currentSale, setCurrentSale] = useState<SaleEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Show first toast after 4 seconds
    const initialTimeout = setTimeout(() => {
      showRandomSale();
    }, 4000);

    // Repeat every 24 seconds
    const interval = setInterval(() => {
      showRandomSale();
    }, 24000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [isDismissed]);

  const showRandomSale = () => {
    const randomIndex = Math.floor(Math.random() * SALES_DATABASE.length);
    setCurrentSale(SALES_DATABASE[randomIndex]);
    setIsVisible(true);

    // Auto-hide after 6 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 6000);
  };

  if (!currentSale || !isVisible || isDismissed) return null;

  return (
    <div 
      className="fixed bottom-20 left-3 sm:left-4 z-40 max-w-[270px] sm:max-w-sm bg-white/95 backdrop-blur-md border-2 border-[#E2D9CC] rounded-2xl p-2.5 sm:p-3 shadow-2xl transition-all duration-500 animate-slide-up flex items-center gap-2.5 sm:gap-3 font-arabic"
      dir="rtl"
    >
      {/* Product Image */}
      <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] p-1 border border-slate-200 shrink-0 flex items-center justify-center">
        <img 
          src={currentSale.image} 
          alt={currentSale.perfume} 
          className="w-full h-full object-contain rounded-lg"
        />
      </div>

      {/* Info Content */}
      <div className="flex-1 min-w-0 text-right">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
          <span className="text-[11px] font-black text-slate-900 truncate">
            {currentSale.buyer} • {currentSale.city}
          </span>
        </div>

        <p className="text-xs font-bold text-forest-800 truncate mb-0.5">
          اشترى للتو: {currentSale.perfume}
        </p>

        <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
          <span>{currentSale.timeAgo}</span>
          <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
            طلب مؤكد ✓
          </span>
        </div>
      </div>

      {/* Dismiss Button */}
      <button
        onClick={() => {
          setIsVisible(false);
          setIsDismissed(true);
        }}
        className="text-slate-400 hover:text-slate-700 p-1 text-xs self-start"
        title="إغلاق الإشعار"
      >
        ✕
      </button>
    </div>
  );
};
