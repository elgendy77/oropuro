import React from 'react';
import type { Product } from '../types';
import { generateAccords, parseNote } from '../utils/fragranticaHelper';

interface FragranticaNotesVisualizerProps {
  product: Product;
}

export const FragranticaNotesVisualizer: React.FC<FragranticaNotesVisualizerProps> = ({ product }) => {
  const accords = generateAccords(
    product.notes,
    product.fragranceFamily,
    product.description
  );

  const topNotes = (product.notes?.top || []).map(parseNote);
  const heartNotes = (product.notes?.heart || []).map(parseNote);
  const baseNotes = (product.notes?.base || []).map(parseNote);

  // Determine season weights based on fragrance family
  const isFresh = product.fragranceFamily === 'fresh';
  const isWoody = product.fragranceFamily === 'woody';
  const isOriental = product.fragranceFamily === 'oriental';

  const seasonRatings = [
    { name: 'الصيف', icon: '☀️', score: isFresh ? 96 : isWoody ? 60 : 45 },
    { name: 'الربيع', icon: '🌸', score: isFresh ? 90 : 75 },
    { name: 'الخريف', icon: '🍂', score: isOriental || isWoody ? 92 : 70 },
    { name: 'الشتاء', icon: '❄️', score: isOriental || isWoody ? 98 : 40 },
  ];

  const nightPercent = isFresh ? 45 : 75;
  const dayPercent = 100 - nightPercent;

  return (
    <div className="space-y-6">
      {/* 1. Main Accords Bar Chart (الأكوردات العطرية الأساسية - Fragrantica Style) */}
      <div className="bg-white dark:bg-[#1A2234] p-5 rounded-2xl border border-[#E8E2D8] dark:border-[#2A364F] shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>الأكوردات العطرية الرئيسية</span>
              <span className="text-[10px] font-mono text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                Fragrantica Chart
              </span>
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              التوزيع البياني الدقيق للهوية والنغمات الطاغية في زجاجة العطر
            </p>
          </div>
        </div>

        {/* Horizontal Stacked Accord Bars */}
        <div className="space-y-2">
          {accords.map((accord, idx) => (
            <div key={idx} className="relative">
              <div
                className="h-8 rounded-lg flex items-center justify-between px-3 text-xs font-bold transition-all shadow-xs"
                style={{
                  width: `${accord.percentage}%`,
                  backgroundColor: accord.bgColor,
                  color: accord.textColor,
                  minWidth: '120px',
                  maxWidth: '100%'
                }}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="font-sans font-black">{accord.nameAr}</span>
                  <span className="text-[10px] opacity-80 uppercase tracking-wider font-mono">({accord.nameEn})</span>
                </div>
                <span className="text-[11px] font-mono opacity-90">{accord.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Visual Fragrance Notes Evolution & Pyramid (تدرج النوتات بمرور الوقت) */}
      <div className="bg-gradient-to-b from-[#FAF7F2] to-white dark:from-[#1A2234] dark:to-[#121722] p-5 rounded-2xl border border-[#E8E2D8] dark:border-[#2A364F] shadow-xs">
        <div className="mb-4">
          <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>تدرج النوتات العطرية (الهرم التفاعلي)</span>
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            كيف يتدرج العطر على بشرتك وملابسك من لحظة الرش وحتى ثبات القاعدة
          </p>
        </div>

        <div className="space-y-4 relative">
          {/* Top Notes Layer */}
          {topNotes.length > 0 && (
            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-[#121722]/80 border border-amber-200/60 dark:border-amber-500/30 shadow-2xs relative">
              <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
                <span className="text-xs font-black text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block animate-pulse"></span>
                  الافتتاحية (Top Notes)
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                  0 - 30 دقيقة • الرذاذ المنعش الأول
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {topNotes.map((note, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-700/50 px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-amber-400 transition-colors"
                  >
                    <span className="text-base">{note.icon}</span>
                    <span>{note.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Transition Connector Arrow */}
          <div className="flex items-center justify-center -my-2 z-10 relative">
            <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px] text-slate-500 dark:text-slate-400 font-bold shadow-2xs">
              ↓
            </div>
          </div>

          {/* Heart Notes Layer */}
          {heartNotes.length > 0 && (
            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-[#121722]/80 border border-emerald-200/60 dark:border-emerald-500/30 shadow-2xs relative">
              <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
                <span className="text-xs font-black text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                  قلب العطر (Heart Notes)
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                  1 - 5 ساعات • جوهر وشخصية العطر
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {heartNotes.map((note, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-700/50 px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-emerald-400 transition-colors"
                  >
                    <span className="text-base">{note.icon}</span>
                    <span>{note.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Transition Connector Arrow */}
          <div className="flex items-center justify-center -my-2 z-10 relative">
            <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px] text-slate-500 dark:text-slate-400 font-bold shadow-2xs">
              ↓
            </div>
          </div>

          {/* Base Notes Layer */}
          {baseNotes.length > 0 && (
            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-[#121722]/80 border border-yellow-300/80 dark:border-yellow-500/30 shadow-2xs relative">
              <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
                <span className="text-xs font-black text-yellow-900 dark:text-yellow-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-yellow-600 inline-block"></span>
                  قاعدة العطر (Base Notes)
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                  6 - +14 ساعة • الثبات الأسطوري والعمق
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {baseNotes.map((note, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 bg-yellow-50/70 dark:bg-yellow-950/40 border border-yellow-200/80 dark:border-yellow-700/50 px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-yellow-400 transition-colors"
                  >
                    <span className="text-base">{note.icon}</span>
                    <span>{note.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Performance & Seasonality Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Longevity & Sillage Gauges */}
        <div className="bg-white dark:bg-[#1A2234] p-4 rounded-2xl border border-[#E8E2D8] dark:border-[#2A364F] space-y-3">
          <h5 className="text-xs font-black text-slate-900 dark:text-white">مؤشرات الأداء العطري</h5>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-bold text-slate-700 dark:text-slate-300">ثبات العطر (Longevity):</span>
              <span className="text-forest-800 dark:text-gold-400 font-black font-mono">طويل جداً (+12 ساعة)</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
              <div className="bg-forest-800 dark:bg-gold-500 h-full rounded-full" style={{ width: '94%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-bold text-slate-700 dark:text-slate-300">الفوحان والانتشار (Sillage):</span>
              <span className="text-amber-700 dark:text-amber-400 font-black font-mono">قوي ومسيطر (مترين)</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: '90%' }}></div>
            </div>
          </div>
        </div>

        {/* Seasonality & Day/Night */}
        <div className="bg-white dark:bg-[#1A2234] p-4 rounded-2xl border border-[#E8E2D8] dark:border-[#2A364F] space-y-3">
          <h5 className="text-xs font-black text-slate-900 dark:text-white">ملاءمة الفصول وأوقات الاستخدام</h5>

          {/* 4 Seasons Pills */}
          <div className="grid grid-cols-4 gap-1.5 text-center">
            {seasonRatings.map((s, idx) => (
              <div
                key={idx}
                className={`p-1.5 rounded-lg border text-center transition-all ${
                  s.score >= 80
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 font-black'
                    : 'bg-slate-50 dark:bg-[#121722] border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
                }`}
              >
                <div className="text-sm">{s.icon}</div>
                <div className="text-[10px] mt-0.5">{s.name}</div>
                <div className="text-[9px] font-mono opacity-80">{s.score}%</div>
              </div>
            ))}
          </div>

          {/* Day vs Night Bar */}
          <div>
            <div className="flex justify-between text-[11px] mb-1 font-bold">
              <span className="text-amber-800 dark:text-amber-400">نهاري: {dayPercent}%</span>
              <span className="text-indigo-900 dark:text-indigo-300">ليلي وسهرات: {nightPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full overflow-hidden flex">
              <div className="bg-amber-400 h-full" style={{ width: `${dayPercent}%` }}></div>
              <div className="bg-indigo-950 dark:bg-indigo-700 h-full" style={{ width: `${nightPercent}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
