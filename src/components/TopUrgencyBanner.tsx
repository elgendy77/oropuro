import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';

export const TopUrgencyBanner: React.FC = () => {
  const { setActiveView, settings } = useStore();
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 42, seconds: 19 });

  const content = settings.siteContent;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 4, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (content && content.announcementEnabled === false) {
    return null;
  }

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  const handleScrollToOffers = () => {
    setActiveView('store');
    const el = document.getElementById('perfumes-collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const badgeText = content?.announcementBadge || 'عرض اليوم الحصري';
  const bannerText = content?.announcementText || 'شحن مجاني عند طلب عطرين + عينة نيش فاخرة هدية | حق المعاينة والتجربة ورش الزجاجة قبل دفع جنيه واحد!';
  const timerLabel = content?.announcementTimerText || 'ينتهي خلال:';

  return (
    <div className="bg-[#021F17] bg-gradient-to-r from-[#021F17] via-[#064E3B] to-[#021F17] text-white border-b border-amber-400/40 relative z-50 shadow-md select-none">
      {/* Mobile View: Natural, ultra-slim single strip ("شريط طبيعي بس مش اكتر") */}
      <div 
        onClick={handleScrollToOffers}
        className="sm:hidden flex items-center justify-between gap-2 px-3 py-1.5 cursor-pointer active:bg-black/20 transition-colors"
        title="انقر لتصفح عروض اليوم الحصرية"
      >
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <span className="bg-gold-400 text-slate-950 font-black px-1.5 py-0.5 rounded text-[9px] shrink-0 animate-pulse">
            🔥 {badgeText}
          </span>
          <span className="text-[11px] font-bold text-slate-100 truncate">
            {bannerText}
          </span>
        </div>

        {/* Compact timer badge on the side */}
        <div className="flex items-center gap-1 font-mono text-[10px] bg-black/40 px-2 py-0.5 rounded-md border border-gold-500/30 text-gold-300 font-bold shrink-0">
          <span>{formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}</span>
        </div>
      </div>

      {/* Desktop / Tablet View: Full rich announcement bar with full text, detailed timer and CTA */}
      <div className="hidden sm:flex max-w-7xl mx-auto items-center justify-between gap-4 py-2 px-4 sm:px-6 text-xs text-right">
        {/* Main Hook & Free Shipping Offer */}
        <div className="flex-1 flex items-center justify-start gap-2.5">
          <span className="bg-gold-400 text-slate-950 font-black px-2 py-0.5 rounded text-[10px] animate-pulse shrink-0">
            {badgeText}
          </span>
          <span className="font-bold text-xs text-slate-100">
            {bannerText}
          </span>
        </div>

        {/* Countdown Timer & Action */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1 font-mono text-[11px] bg-black/40 px-2.5 py-1 rounded-lg border border-gold-500/30 text-gold-300 font-bold">
            <span className="text-slate-300 text-[10px] ml-1">{timerLabel}</span>
            <span>{formatNumber(timeLeft.hours)}</span>:
            <span>{formatNumber(timeLeft.minutes)}</span>:
            <span className="text-white">{formatNumber(timeLeft.seconds)}</span>
          </div>

          <button
            onClick={handleScrollToOffers}
            className="text-[11px] font-black px-3.5 py-1 rounded-lg bg-gold-400 hover:bg-gold-300 text-slate-950 transition-all shadow-xs hover:scale-105 active:scale-95"
          >
            اغتنم العرض الآن
          </button>
        </div>
      </div>
    </div>
  );
};
