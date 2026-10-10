import React from 'react';
import { Sparkles, Truck, ShieldCheck, PhoneCall } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AnnouncementBar: React.FC = () => {
  const { settings } = useStore();

  return (
    <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 border-b border-gold-500/20 text-xs py-2 px-4 text-gold-200">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
          <span>عطور عالمية أصلية 100% مختارة بعناية وفخامة تليق بك</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-gold-400" />
            <span>شحن سريع لجميع محافظات مصر (مجاناً للطلبات فوق {settings.freeShippingThreshold} ج.م)</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
            <span>دفع عبر انستاباي • فودافون كاش • الدفع عند الاستلام</span>
          </div>

          <a 
            href={`https://wa.me/${settings.whatsappNumber}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-gold-400 hover:text-gold-200 transition-colors"
          >
            <PhoneCall className="w-3 h-3" />
            <span>خدمة العملاء واتساب</span>
          </a>
        </div>
      </div>
    </div>
  );
};
