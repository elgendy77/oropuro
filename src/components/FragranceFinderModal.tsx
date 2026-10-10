import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import type { Product } from '../types';

export const FragranceFinderModal: React.FC = () => {
  const { isFragranceFinderOpen, setIsFragranceFinderOpen, products, addToCart, setActiveProductForDetail } = useStore();

  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<{
    gender: 'men' | 'women' | 'unisex' | null;
    vibe: 'oriental' | 'fresh' | 'woody' | 'floral' | null;
    occasion: 'daily' | 'events' | 'gift' | null;
  }>({
    gender: null,
    vibe: null,
    occasion: null,
  });

  if (!isFragranceFinderOpen) return null;

  const handleGenderSelect = (gender: 'men' | 'women' | 'unisex') => {
    setAnswers(prev => ({ ...prev, gender }));
    setStep(2);
  };

  const handleVibeSelect = (vibe: 'oriental' | 'fresh' | 'woody' | 'floral') => {
    setAnswers(prev => ({ ...prev, vibe }));
    setStep(3);
  };

  const handleOccasionSelect = (occasion: 'daily' | 'events' | 'gift') => {
    setAnswers(prev => ({ ...prev, occasion }));
    setStep(4);
  };

  const resetQuiz = () => {
    setStep(1);
    setAnswers({ gender: null, vibe: null, occasion: null });
  };

  // Find matches
  const matchedProducts: Product[] = products.filter(p => {
    // Gender match
    if (answers.gender && answers.gender !== 'unisex') {
      if (p.gender !== answers.gender && p.gender !== 'unisex') return false;
    }
    // Vibe match if available
    if (answers.vibe && p.fragranceFamily) {
      if (p.fragranceFamily === answers.vibe) return true;
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white border border-[#E8E2D8] rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-6 border-b border-[#E8E2D8] bg-[#FAF7F2] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-forest-50 border border-forest-200">
              <Sparkles className="w-5 h-5 text-forest-700" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">
                مستشار العطور الذكي (Fragrance Finder)
              </h3>
              <p className="text-xs text-slate-500">
                أجب على 3 أسئلة سريعة لنقترح لك عطرك المثالي بدقة
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsFragranceFinderOpen(false)}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-forest-800">
            <span>الخطوة {step} من 3</span>
          </div>

          <div className="flex gap-1.5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step ? 'w-8 bg-forest-700' : s < step ? 'w-4 bg-forest-300' : 'w-4 bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Quiz Steps */}
        <div className="p-6 sm:p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h4 className="text-xl font-bold text-slate-900 mb-2">
                  1. لمن تبحث عن العطر؟
                </h4>
                <p className="text-xs text-slate-500">
                  حدد الفئة التي ترغب في استكشاف عطورها الفاخرة
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'men', title: 'عطر رجالي', desc: 'حضور قوي، هيبة وجاذبية كلاسيكية أو عصرية', emoji: '👑' },
                  { id: 'women', title: 'عطر نسائي', desc: 'أنوثة آسرة، نعومة وسحر دافئ لا يقاوم', emoji: '✨' },
                  { id: 'unisex', title: 'عطر للجنسين', desc: 'توليفات نادرة تجمع بين الفخامة والتميز', emoji: '💎' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleGenderSelect(opt.id as any)}
                    className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] hover:border-forest-700 hover:bg-forest-50 text-right transition-all group flex flex-col justify-between"
                  >
                    <span className="text-3xl mb-3">{opt.emoji}</span>
                    <div>
                      <h5 className="font-bold text-slate-900 group-hover:text-forest-800 text-sm mb-1">
                        {opt.title}
                      </h5>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h4 className="text-xl font-bold text-slate-900 mb-2">
                  2. ما هو الطابع العطري الذي يلامس حواسك؟
                </h4>
                <p className="text-xs text-slate-500">
                  العائلة العطرية الأقرب إلى مزاجك وذوقك الخاص
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'oriental', title: 'شرقي بالعود والعنبر والزعفران', desc: 'دافئ، غني، ملكي مع فوحان وثبات طويل جداً', icon: '🔥' },
                  { id: 'fresh', title: 'منعش وحمضيات وبحري', desc: 'حيوي ونظيف يمنحك طاقة ونشاطاً متجدداً طوال اليوم', icon: '🌊' },
                  { id: 'woody', title: 'خشبي وجلدي وتوابل دافئة', desc: 'عميق، راقٍ وغامض يفرض حضوره في الجلسات الراقية', icon: '🌲' },
                  { id: 'floral', title: 'أزهار نقية وفواكه ناعمة وفانيليا', desc: 'رومانسي، رقيق ومبهج يبعث على البهجة والإعجاب', icon: '🌸' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleVibeSelect(opt.id as any)}
                    className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] hover:border-forest-700 hover:bg-forest-50 text-right transition-all group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{opt.icon}</span>
                      <h5 className="font-bold text-slate-900 group-hover:text-forest-800 text-sm">
                        {opt.title}
                      </h5>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{opt.desc}</p>
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>العودة للخطوة السابقة</span>
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h4 className="text-xl font-bold text-slate-900 mb-2">
                  3. ما هي المناسبة الأساسية لاستخدام العطر؟
                </h4>
                <p className="text-xs text-slate-500">
                  لنضمن ملاءمة فوحان العطر لأوقاتك
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'daily', title: 'يومي وعمل ودوام', desc: 'أنيق وغير مزعج ومريح للاستخدام المتكرر', icon: '💼' },
                  { id: 'events', title: 'سهرات ومناسبات خاصة', desc: 'فواح جداً ويترك أثراً عطرياً لا يُنسى بالمكان', icon: '🥂' },
                  { id: 'gift', title: 'هدية فاخرة لشخص مميز', desc: 'عطر أيقوني يعشقه الجميع ومضمون الإعجاب', icon: '🎁' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleOccasionSelect(opt.id as any)}
                    className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] hover:border-forest-700 hover:bg-forest-50 text-right transition-all group"
                  >
                    <span className="text-3xl mb-3 block">{opt.icon}</span>
                    <h5 className="font-bold text-slate-900 group-hover:text-forest-800 text-sm mb-1">
                      {opt.title}
                    </h5>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{opt.desc}</p>
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>العودة للخطوة السابقة</span>
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            /* Results Screen */
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-forest-50 text-forest-800 border border-forest-200 text-xs font-bold mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-forest-700" />
                  <span>تحليل الذوق العطري مكتمل</span>
                </div>
                <h4 className="text-2xl font-black text-slate-900">
                  ترشيحاتنا الخاصة لك وفقاً لذوقك!
                </h4>
                <p className="text-xs text-slate-500">
                  بناءً على تفضيلاتك، هذه العطور هي الأكثر تطابقاً مع شخصيتك ومناسبتك
                </p>
              </div>

              {matchedProducts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-slate-600 text-sm mb-4">
                    لا توجد عطور حالياً في المتجر بهذا التصنيف، أضف عطوراً جديدة من لوحة التحكم!
                  </p>
                  <button
                    onClick={resetQuiz}
                    className="btn-forest px-4 py-2 rounded-xl text-xs font-bold"
                  >
                    إعادة الاختبار
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-72 overflow-y-auto p-1">
                  {matchedProducts.slice(0, 4).map(p => (
                    <div
                      key={p.id}
                      className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] flex items-center gap-3 relative"
                    >
                      <div className="w-16 h-16 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 border border-slate-200 shadow-sm">
                        <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-forest-700 font-bold block">
                          98% تطابق مع ذوقك ⭐
                        </span>
                        <h5 className="text-xs font-bold text-slate-900 truncate mb-1">{p.name}</h5>
                        <p className="text-[11px] text-slate-900 font-sans font-bold">
                          {p.sizes[0]?.price.toLocaleString('ar-EG')} ج.م
                        </p>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => {
                              setIsFragranceFinderOpen(false);
                              setActiveProductForDetail(p);
                            }}
                            className="text-[10px] px-2 py-1 rounded bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
                          >
                            التفاصيل
                          </button>
                          <button
                            onClick={() => {
                              addToCart(p, p.sizes[0]?.size || '100 مل', 1);
                              setIsFragranceFinderOpen(false);
                            }}
                            className="btn-forest text-[10px] px-2.5 py-1 rounded font-bold"
                          >
                            شراء فوراً
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-center pt-2">
                <button
                  onClick={resetQuiz}
                  className="text-xs text-slate-500 hover:text-forest-800 flex items-center gap-1.5 font-bold"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>إعادة تحديد الذوق العطري</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
