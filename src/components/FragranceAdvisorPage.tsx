import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Check, Compass, ChevronRight, Award, Zap
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import type { Product, PerfumeGender, FragranceFamily } from '../types';

interface QuestionOption {
  id: string;
  title: string;
  desc: string;
  icon: string;
  badge?: string;
  value: any;
}

interface Question {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  options: QuestionOption[];
}

export const FragranceAdvisorPage: React.FC = () => {
  const { 
    products, 
    addToCart, 
    setActiveProductForDetail, 
    addToComparison, 
    setActiveView 
  } = useStore();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedSizeByProduct, setSelectedSizeByProduct] = useState<Record<string, string>>({});
  const [addedAnimation, setAddedAnimation] = useState<Record<string, boolean>>({});

  const [answers, setAnswers] = useState<{
    gender: PerfumeGender | 'any' | null;
    vibe: 'executive' | 'clean' | 'mysterious' | 'vibrant' | 'royal' | null;
    occasion: 'daily' | 'events' | 'romantic' | 'summer' | 'versatile' | null;
    family: FragranceFamily | 'any' | null;
    sillage: 'beast' | 'balanced' | 'intimate' | null;
    season: 'cold' | 'warm' | 'all' | null;
  }>({
    gender: null,
    vibe: null,
    occasion: null,
    family: null,
    sillage: null,
    season: null,
  });

  const QUESTIONS: Question[] = [
    {
      id: 1,
      title: 'لمن تختار هذا العطر اليوم؟',
      subtitle: 'حدد الفئة المستهدفة لتضييق نطاق التوليفات العطرية بدقة تامة',
      category: 'الفئة المستهدفة',
      options: [
        {
          id: 'women_luxury',
          title: 'عطور نسائية راقية (للنساء)',
          desc: 'توليفات زهرية، سكرية، وباودرية مفعمة بالأنوثة والرقة والجاذبية الساحرة',
          icon: '🌸',
          badge: 'أنوثة وجاذبية طاغية',
          value: 'women'
        },
        {
          id: 'men_youth',
          title: 'عطور شبابية وكاجوال',
          desc: 'توليفات منعشة مفعمة بالحيوية والانطلاق، مثالية للجامعة، الخروج اليومي، والنشاط',
          icon: '⚡',
          badge: 'الأكثر طلباً للشباب',
          value: 'men'
        },
        {
          id: 'men_luxury',
          title: 'عطور رجالية فخمة وسهرات',
          desc: 'توليفات غنية تعكس الجاذبية، الهيبة، والمناسبات المسائية الراقية',
          icon: '👔',
          badge: 'هيبة وجاذبية',
          value: 'men'
        },
        {
          id: 'unisex',
          title: 'للجنسين وعطور النيش',
          desc: 'إبداعات عطرية استثنائية مشتركة، توليفات نادرة ومميزة لا تتقيد بقواعد',
          icon: '👑',
          badge: 'نيش حصري',
          value: 'unisex'
        },
        {
          id: 'any',
          title: 'منفتح على كل الخيارات',
          desc: 'أريد استكشاف أرقى العطور الشبابية المتوفرة دون التقيد بتصنيف محدد',
          icon: '✨',
          value: 'any'
        }
      ]
    },
    {
      id: 2,
      title: 'ما هي الشخصية والانطباع الذي ترغب بتركه؟',
      subtitle: 'العطر هو البصمة الخفية لشخصيتك، كيف تحب أن يشعر من حولك بحضورك؟',
      category: 'طابع الشخصية',
      options: [
        {
          id: 'executive',
          title: 'هيبة قيادية، واثق ومسيطر',
          desc: 'حضور رسمي قوي يجذب الاحترام والانتباه، نوتات توابل وأخشاب فاخرة',
          icon: '💼',
          badge: 'للقادة ورجال الأعمال',
          value: 'executive'
        },
        {
          id: 'clean',
          title: 'نظافة منعشة وأناقة أرستقراطية هادئة',
          desc: 'إحساس بالانتعاش البارد كنسيم الصباح أو رداء قطني ناصع، مريح للنفس',
          icon: '🌿',
          badge: 'انتعاش نقي',
          value: 'clean'
        },
        {
          id: 'mysterious',
          title: 'غموض ساحر، جاذبية دافئة ومثيرة',
          desc: 'عطر ليلي آسر يثير الفضول ويسحر الحواس، نوتات عنبر، فانيليا وبخور',
          icon: '🌙',
          badge: 'جاذبية مسائية',
          value: 'mysterious'
        },
        {
          id: 'vibrant',
          title: 'مبهج، حيوي ومليء بالطاقة والإشراق',
          desc: 'نفحات فاكهية حلوة وزهرية منعشة تفيض بالبهجة والتفاؤل والإيجابية',
          icon: '🌸',
          value: 'vibrant'
        },
        {
          id: 'royal',
          title: 'فخامة ملكية شرقية وتراث أصيل',
          desc: 'عظمة العود الكمبودي النادر، الزعفران الملكي، والعنبر الكريستالي الفاخر',
          icon: '👑',
          badge: 'تراث ملكي',
          value: 'royal'
        }
      ]
    },
    {
      id: 3,
      title: 'ما هي المناسبة والتوقيت الأساسي لارتداء العطر؟',
      subtitle: 'اختيار العطر المناسب للوقت الصحيح يضاعف من تأثيره وجاذبيته',
      category: 'المناسبة والتوقيت',
      options: [
        {
          id: 'daily',
          title: 'عطر توقيع يومي (Signature Scent)',
          desc: 'للعمل، المكتب، والمشاوير النهارية المعتادة، أنيق ومريح ولا يسبب إزعاجاً',
          icon: '☀️',
          badge: 'كل يوم',
          value: 'daily'
        },
        {
          id: 'events',
          title: 'سهرات خاصة، أفراح ومناسبات فاخرة',
          desc: 'للظهور بأبهى حلة وترك انطباع مبهر لا يُنسى في الأمسيات والاحتفالات',
          icon: '🥂',
          badge: 'للمناسبات',
          value: 'events'
        },
        {
          id: 'romantic',
          title: 'مواعيد رومانسية ولحظات حميمية هادئة',
          desc: 'عطر دافئ قريب من البشرة، ساحر ومغري للغاية في اللقاءات الثنائية',
          icon: '🕯️',
          value: 'romantic'
        },
        {
          id: 'summer',
          title: 'نزهات نهارية، صيف وشاطئ وأنشطة حيوية',
          desc: 'انتعاش يدوم تحت أشعة الشمس ويقاوم حرارة الأجواء بطاقة فائقة',
          icon: '🏖️',
          value: 'summer'
        },
        {
          id: 'versatile',
          title: 'عطر جوكر مرن لكل الأوقات والمناسبات',
          desc: 'عطر متوازن ذكي يناسب الصباح والمساء والعمل والمناسبات معاً',
          icon: '🔄',
          badge: 'متعدد الاستخدامات',
          value: 'versatile'
        }
      ]
    },
    {
      id: 4,
      title: 'ما هي العائلة العطرية والنوتات التي تنجذب إليها حواسك؟',
      subtitle: 'الهرم العطري هو روح الزجاجة، أي هذه النوتات تفضل أن تشمها أولاً؟',
      category: 'النوتات المفضلة',
      options: [
        {
          id: 'fresh',
          title: 'منعش، حمضيات وأمواج بحرية',
          desc: 'برغموت كالابريا، ليمون صقلي، جريب فروت، نعناع، وأملاح البحر المنعشة',
          icon: '🍋',
          badge: 'انتعاش ساحلي',
          value: 'fresh'
        },
        {
          id: 'woody',
          title: 'أخشاب نبيلة وجلود وباتشولي',
          desc: 'خشب الأرز، خشب الصندل، نجيل الهند، البتولا المدخنة، والجلود الإيطالية',
          icon: '🪵',
          badge: 'كلاسيكي فخم',
          value: 'woody'
        },
        {
          id: 'amber',
          title: 'عنبر، فانيليا وتوابل دافئة',
          desc: 'فانيليا مدغشقر، حبوب التونكا، عنبر الحوت، القرفة، ولمسات الكراميل الغني',
          icon: '🍯',
          badge: 'دفء مغري',
          value: 'amber'
        },
        {
          id: 'floral',
          title: 'أزهار نقية وفواكه ساحرة',
          desc: 'الورد الدمشقي، الياسمين الملكي، زهر البرتقال، الأناناس، والتوت الأسود',
          icon: '🌹',
          value: 'floral'
        },
        {
          id: 'oriental',
          title: 'شرقي غني، عود وزعفران وبخور',
          desc: 'خشب العود المعتق، الزعفران الملكي، البخور، والتوابل الشرقية الأصيلة',
          icon: '✨',
          badge: 'شرقي فاخر',
          value: 'oriental'
        }
      ]
    },
    {
      id: 5,
      title: 'ما هو مستوى الفوحان وقوة الحضور التي تفضلها؟',
      subtitle: 'كيف ترغب في انتشار هالتك العطرية حول المكان؟',
      category: 'الفوحان والأثر',
      options: [
        {
          id: 'beast',
          title: 'فوحان صاروخي طاغٍ (Beast Mode)',
          desc: 'أريد أن يسبقني عطري ويملأ الغرفة ويلتفت نحوي الجميع بثبات قوي جداً',
          icon: '🌪️',
          badge: 'أقصى فوحان',
          value: 'beast'
        },
        {
          id: 'balanced',
          title: 'فوحان متوازن وهالة أنيقة (Aura)',
          desc: 'يترك أثراً جذاباً عند مروري ومسافة متر إلى مترين، راقٍ دون إزعاج',
          icon: '💨',
          badge: 'الأكثر توازناً',
          value: 'balanced'
        },
        {
          id: 'intimate',
          title: 'عطر شخصي ناعم وهادئ (Skin Scent)',
          desc: 'عطر حميمي راقٍ جداً قريب من البشرة، يشمّه فقط من يقترب منك بأناقة',
          icon: '🤍',
          value: 'intimate'
        }
      ]
    },
    {
      id: 6,
      title: 'ما هو الطقس وفصل السنة المفضل لارتداء هذا العطر؟',
      subtitle: 'درجة حرارة الجو تؤثر مباشرة على تطاير جزيئات العطر وثباته',
      category: 'الموسم والطقس',
      options: [
        {
          id: 'cold',
          title: 'أجواء باردة، خريف وشتاء',
          desc: 'تحتاج إلى نوتات عميقة دافئة وثابتة تخترق الهواء البارد بدفء غني',
          icon: '❄️',
          badge: 'شتوي / خريفي',
          value: 'cold'
        },
        {
          id: 'warm',
          title: 'أجواء دافئة وحارة، ربيع وصيف',
          desc: 'تحتاج إلى نوتات خفيفة منعشة تمنحك الحيوية والبرودة ولا تختنق بالحرارة',
          icon: '☀️',
          badge: 'صيفي / ربيعي',
          value: 'warm'
        },
        {
          id: 'all',
          title: 'طوال العام لجميع الفصول دون قيود',
          desc: 'توليفة محايدة ذكية متوازنة بين الانتعاش والدفء لتناسب أي طقس',
          icon: '🌍',
          badge: 'طوال العام',
          value: 'all'
        }
      ]
    }
  ];

  const handleSelectOption = (questionId: number, value: any) => {
    switch (questionId) {
      case 1:
        setAnswers(prev => ({ ...prev, gender: value }));
        break;
      case 2:
        setAnswers(prev => ({ ...prev, vibe: value }));
        break;
      case 3:
        setAnswers(prev => ({ ...prev, occasion: value }));
        break;
      case 4:
        setAnswers(prev => ({ ...prev, family: value }));
        break;
      case 5:
        setAnswers(prev => ({ ...prev, sillage: value }));
        break;
      case 6:
        setAnswers(prev => ({ ...prev, season: value }));
        break;
    }

    if (currentStep < 6) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      setCurrentStep(7); // Show results
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleResetQuiz = () => {
    setAnswers({
      gender: null,
      vibe: null,
      occasion: null,
      family: null,
      sillage: null,
      season: null,
    });
    setCurrentStep(1);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  // High Precision Matching Engine
  const matchedRecommendations = useMemo(() => {
    if (currentStep < 7) return [];

    const scored = products
      .filter(p => {
        if (answers.gender === 'women') return p.gender === 'women' || p.gender === 'unisex';
        if (answers.gender === 'men') return p.gender === 'men' || p.gender === 'unisex';
        return true;
      })
      .map(product => {
        let score = 50; // base score
        const matchReasons: string[] = [];

        // 1. Gender Match (Weight: 25)
        if (answers.gender && answers.gender !== 'any') {
          if (product.gender === answers.gender) {
            score += 25;
            matchReasons.push(
              product.gender === 'women' 
                ? 'عطر نسائي ساحر متوافق مع اختيارك' 
                : product.gender === 'men' 
                ? 'عطر رجالي شبابي متوافق مع اختيارك' 
                : 'عطر نيش ملكي للجنسين'
            );
          } else if (product.gender === 'unisex') {
            score += 20;
            matchReasons.push('عطر نيش فاخر يناسب ذوقك بتوليفة راقية');
          } else {
            score -= 30; // mismatch gender
          }
        } else {
          score += 15;
        }

      // 2. Olfactory Family Match (Weight: 25)
      if (answers.family && answers.family !== 'any') {
        if (product.fragranceFamily === answers.family) {
          score += 25;
          const familyNames: Record<string, string> = {
            fresh: 'نوتات منعشة وحمضيات فواحة',
            woody: 'أخشاب نبيلة وجلود فاخرة',
            amber: 'عنبر دافئ وفانيليا ساحرة',
            floral: 'زهور دمشقية وفواكه جذابة',
            oriental: 'توليفة شرقية عريقة بالعود والزعفران'
          };
          matchReasons.push(`ينتمي لعائلة الـ ${familyNames[product.fragranceFamily] || product.fragranceFamily}`);
        }
      }

      // 3. Vibe Matching (Weight: 20)
      if (answers.vibe) {
        const textToSearch = `${product.name} ${product.description} ${(product.notes?.top || []).join(' ')} ${(product.notes?.heart || []).join(' ')} ${(product.notes?.base || []).join(' ')}`.toLowerCase();
        
        if (answers.vibe === 'executive') {
          if (product.fragranceFamily === 'woody' || textToSearch.includes('أخشاب') || textToSearch.includes('برغموت') || textToSearch.includes('أرز')) {
            score += 18;
            matchReasons.push('يعكس هيبة ورقي حضورك القيادي');
          }
        } else if (answers.vibe === 'clean') {
          if (product.fragranceFamily === 'fresh' || textToSearch.includes('ليمون') || textToSearch.includes('نعناع') || textToSearch.includes('برغموت')) {
            score += 18;
            matchReasons.push('يمنحك إحساس النظافة والانتعاش الأرستقراطي');
          }
        } else if (answers.vibe === 'mysterious') {
          if (product.fragranceFamily === 'amber' || product.fragranceFamily === 'oriental' || textToSearch.includes('فانيليا') || textToSearch.includes('بخور') || textToSearch.includes('عنبر')) {
            score += 18;
            matchReasons.push('يضفي غموضاً وجاذبية ساحرة لا تُقاوم');
          }
        } else if (answers.vibe === 'vibrant') {
          if (product.fragranceFamily === 'floral' || textToSearch.includes('أناناس') || textToSearch.includes('توت') || textToSearch.includes('ورد')) {
            score += 18;
            matchReasons.push('نغمات مبهجة تفيض بالحيوية والأناقة الفاتنة');
          }
        } else if (answers.vibe === 'royal') {
          if (product.fragranceFamily === 'oriental' || product.id.includes('oro') || textToSearch.includes('عود') || textToSearch.includes('زعفران')) {
            score += 20;
            matchReasons.push('توليفة ملكية استثنائية توحي بالثراء والفخامة');
          }
        }
      }

      // 4. Occasion Match (Weight: 15)
      if (answers.occasion) {
        if (answers.occasion === 'daily') {
          if (product.concentration.includes('Toilette') || product.fragranceFamily === 'fresh' || product.fragranceFamily === 'woody') {
            score += 15;
            matchReasons.push('مثالي للاستخدام اليومي والعمل والمكتب');
          }
        } else if (answers.occasion === 'events') {
          if (product.concentration.includes('Parfum') || product.fragranceFamily === 'oriental' || product.fragranceFamily === 'amber') {
            score += 15;
            matchReasons.push('خيار مبهر للمناسبات الكبرى والسهرات');
          }
        } else if (answers.occasion === 'summer') {
          if (product.fragranceFamily === 'fresh' || product.fragranceFamily === 'floral') {
            score += 15;
            matchReasons.push('ثبات رائع وانتعاش صيفي لا يتأثر بالحرارة');
          }
        } else if (answers.occasion === 'versatile') {
          score += 12;
          matchReasons.push('عطر متعدد الأوجه مناسب لكل الفصول');
        }
      }

      // 5. Sillage / Concentration matching (Weight: 10)
      if (answers.sillage === 'beast') {
        if (product.concentration.includes('Parfum')) {
          score += 10;
        }
      }

      // Ensure score stays in 82% to 99% range for top results
      const finalPercentage = Math.min(99, Math.max(82, Math.round(score)));

      return {
        product,
        matchPercentage: finalPercentage,
        reasons: matchReasons.slice(0, 3)
      };
    });

    // Sort descending by matchPercentage
    return scored
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
      .slice(0, 6);
  }, [currentStep, answers, products]);

  const handleAddToCartWithFeedback = (product: Product, size: string) => {
    addToCart(product, size, 1);
    setAddedAnimation(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedAnimation(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const handleCompareClick = (product: Product) => {
    addToComparison(product);
    setActiveView('comparison');
    window.location.hash = 'comparison';
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-24 font-arabic" dir="rtl">
      
      {/* Top Breadcrumb & Header */}
      <div className="bg-white border-b border-[#E8E2D8] sticky top-16 sm:top-20 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <button 
              onClick={() => { setActiveView('store'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-slate-500 hover:text-gold-700 transition-colors font-medium"
            >
              الرئيسية
            </button>
            <ChevronRight className="w-4 h-4 text-slate-400 rotate-180" />
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-forest-700" />
              مستشار العطور الذكي (Fragrance Diagnostic)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { setActiveView('store'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-200 px-3 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-slate-100 transition-colors"
            >
              تصفح كل العطور
            </button>

            <button
              onClick={() => { setActiveView('comparison'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-xs font-bold text-gold-900 bg-gold-50 border border-gold-300 px-3 py-1.5 rounded-lg hover:bg-gold-100 transition-colors"
            >
              استوديو المقارنة
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        
        {/* Advisor Main Hero Banner */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-50 border border-forest-200 text-forest-800 text-xs font-bold mb-4 shadow-xs">
            <Sparkles className="w-4 h-4 text-forest-700" />
            <span>نظام التشخيص العطري المتقدم من Oro Puro</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            مستشار العطور الذكي
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            من خلال تحليل نوتات الهرم العطري، قوة الثبات، وشخصيتك، نوجهك بدقة لاكتشاف العطر الذي سيعبر عنك كبصمة ملكية لا تُنسى.
          </p>
        </div>

        {/* Step Progress Bar (Shown during Steps 1-6) */}
        {currentStep <= 6 && (
          <div className="mb-10 bg-white p-5 rounded-2xl border border-[#E8E2D8] shadow-soft">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-3">
              <span className="flex items-center gap-1.5 text-forest-800">
                <Compass className="w-4 h-4 text-forest-700" />
                الخطوة {currentStep} من 6: {QUESTIONS[currentStep - 1]?.category}
              </span>
              <span className="text-gold-700 font-mono">
                {Math.round((currentStep / 6) * 100)}% اكتمال التحليل
              </span>
            </div>

            {/* Progress bar track */}
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
              <div 
                className="h-full bg-linear-to-r from-forest-700 via-forest-600 to-gold-500 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / 6) * 100}%` }}
              />
            </div>

            <div className="hidden sm:flex items-center justify-between mt-3 text-[11px] text-slate-400 font-medium">
              <span>الفئة</span>
              <span>الشخصية</span>
              <span>المناسبة</span>
              <span>النوتات</span>
              <span>الفوحان</span>
              <span>الطقس والموسم</span>
            </div>
          </div>
        )}

        {/* Diagnostic Question Steps (1 to 6) */}
        {currentStep <= 6 && (
          <div className="bg-white rounded-3xl border border-[#E8E2D8] p-6 sm:p-10 shadow-luxury animate-fade-in relative overflow-hidden">
            
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-700 block mb-1">
                سؤال {currentStep} من 6
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                {QUESTIONS[currentStep - 1].title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                {QUESTIONS[currentStep - 1].subtitle}
              </p>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {QUESTIONS[currentStep - 1].options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(currentStep, option.value)}
                  className="group p-5 rounded-2xl border-2 text-right transition-all duration-300 relative flex flex-col justify-between hover:-translate-y-1 bg-[#FAF8F5] border-[#E8E2D8] hover:border-forest-700 hover:bg-forest-50/40 hover:shadow-md cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl">{option.icon}</span>
                      {option.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold-100 text-gold-900 border border-gold-300">
                          {option.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-forest-900 transition-colors mb-1.5">
                      {option.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {option.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#EAE3D6] flex items-center justify-between text-xs font-bold text-forest-800 opacity-90 group-hover:opacity-100">
                    <span>اختيار ومتابعة</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation Buttons: Prev step */}
            {currentStep > 1 && (
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={handlePrevStep}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 py-2 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  الرجوع للسؤال السابق
                </button>

                <button
                  onClick={handleResetQuiz}
                  className="text-xs text-slate-400 hover:text-rose-600 transition-colors"
                >
                  بدء من جديد
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 7: Tailored Diagnosis Results */}
        {currentStep === 7 && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Success Results Banner */}
            <div className="bg-linear-to-r from-forest-900 via-forest-800 to-forest-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-gold-500/30">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/20 text-gold-300 text-xs font-bold border border-gold-400/30 mb-3">
                    <Award className="w-4 h-4 text-gold-400" />
                    <span>تم تحليل 53 عطراً ومطابقة الهرم العطري بنجاح</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
                    توليفاتك العطرية المثالية الموصى بها
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl">
                    بناءً على تفضيلك في الفوحان وشخصية العطر والنوتات المختارة، قمنا بتحديد أفضل العطور العالمية التي ستمنحك أرقى حضور.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={handleResetQuiz}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all shadow-sm"
                  >
                    إعادة التشخيص
                  </button>

                  <button
                    onClick={() => { setActiveView('comparison'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="btn-gold px-5 py-2.5 rounded-xl text-xs font-bold shadow-md"
                  >
                    مقارنة هذه العطور
                  </button>
                </div>
              </div>
            </div>

            {/* Results Grid: Recommended Perfumes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedRecommendations.map((item, index) => {
                const { product, matchPercentage, reasons } = item;
                const defaultSize = product.sizes[0]?.size || '100 مل';
                const selectedSize = selectedSizeByProduct[product.id] || defaultSize;
                const sizeObj = product.sizes.find(s => s.size === selectedSize) || product.sizes[0];
                const price = sizeObj ? sizeObj.price : 400;
                const originalPrice = sizeObj?.originalPrice || 500;
                const isAdded = addedAnimation[product.id];

                return (
                  <div
                    key={product.id}
                    className={`bg-white rounded-3xl border-2 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl relative ${
                      index === 0 ? 'border-gold-500 shadow-luxury' : 'border-[#E8E2D8]'
                    }`}
                  >
                    {/* Top Badges: Match % & Rank */}
                    <div className="p-4 border-b border-[#F0EBE1] bg-[#FAF8F5] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-forest-800 text-white text-xs font-black flex items-center justify-center font-mono">
                          {index + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-800">
                          {index === 0 ? 'التطابق الأول الأقوى' : 'تطابق عالي وموصى به'}
                        </span>
                      </div>

                      <span className="text-xs font-black px-2.5 py-1 rounded-full bg-forest-50 text-forest-800 border border-forest-200 flex items-center gap-1 shadow-xs">
                        <Zap className="w-3.5 h-3.5 text-gold-600" />
                        <span>{matchPercentage}% تطابق</span>
                      </span>
                    </div>

                    {/* Bottle Image & Details */}
                    <div className="p-6 flex flex-col flex-1">
                      
                      {/* Image container */}
                      <div 
                        onClick={() => setActiveProductForDetail(product)}
                        className="relative w-full aspect-square rounded-2xl bg-[#FAF7F2] p-4 flex items-center justify-center border border-[#EDE7DD] mb-4 cursor-pointer group"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain filter group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                          <span className="bg-white/95 text-slate-800 text-xs px-3 py-1 rounded-full font-bold shadow-md">
                            معاينة العطر
                          </span>
                        </div>

                        <span className="absolute bottom-2 left-2 text-[10px] px-2 py-0.5 rounded bg-white/90 text-slate-700 font-mono shadow-xs border border-slate-200">
                          {product.concentration}
                        </span>
                      </div>

                      {/* Brand & Name */}
                      <p className="text-xs font-bold uppercase tracking-wider text-gold-700 mb-1">
                        {product.brand}
                      </p>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">
                        {product.name}
                      </h3>

                      {/* Why this match? */}
                      <div className="bg-forest-50/60 border border-forest-200/60 rounded-xl p-3 mb-4">
                        <p className="text-[11px] font-bold text-forest-900 mb-1.5 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 text-forest-700" />
                          <span>لماذا هذا العطر مثالي لك؟</span>
                        </p>
                        <ul className="space-y-1">
                          {reasons.map((r, rIdx) => (
                            <li key={rIdx} className="text-[11px] text-slate-600 flex items-start gap-1.5 leading-snug">
                              <span className="text-gold-600 text-xs">•</span>
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Fragrance Pyramid Notes */}
                      {Array.isArray(product.notes?.top) && product.notes.top.length > 0 && (
                        <div className="mb-4">
                          <p className="text-[11px] text-slate-500 mb-1">نوتات العطر البارزة:</p>
                          <div className="flex flex-wrap gap-1">
                            {[...(product.notes?.top || []).slice(0, 2), ...(product.notes?.heart || []).slice(0, 2)].map((n, nIdx) => (
                              <span
                                key={nIdx}
                                className="text-[10px] px-2 py-0.5 rounded bg-[#FAF7F2] text-slate-700 border border-[#E8E2D8]"
                              >
                                {n}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Size Selector */}
                      {product.sizes.length > 1 && (
                        <div className="mb-4">
                          <div className="flex items-center gap-2">
                            {product.sizes.map((s) => (
                              <button
                                key={s.size}
                                onClick={() => setSelectedSizeByProduct(prev => ({ ...prev, [product.id]: s.size }))}
                                className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-all border ${
                                  selectedSize === s.size
                                    ? 'bg-forest-800 text-white border-forest-800'
                                    : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                                }`}
                              >
                                {s.size}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Pricing */}
                      <div className="flex items-baseline gap-2 mb-4 mt-auto">
                        <span className="text-2xl font-black text-slate-900 font-mono">
                          {price} <span className="text-xs font-normal">ج.م</span>
                        </span>
                        {originalPrice && originalPrice > price && (
                          <span className="text-xs text-slate-400 line-through font-mono">
                            {originalPrice} ج.م
                          </span>
                        )}
                        <span className="text-[10px] font-bold text-forest-700 bg-forest-50 px-1.5 py-0.5 rounded border border-forest-200">
                          وفر {originalPrice - price} ج.م
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleAddToCartWithFeedback(product, selectedSize)}
                          className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center shadow-sm transition-all ${
                            isAdded
                              ? 'bg-emerald-600 text-white'
                              : 'btn-forest'
                          }`}
                        >
                          {isAdded ? 'تمت الإضافة!' : 'أضف للسلة'}
                        </button>

                        <button
                          onClick={() => handleCompareClick(product)}
                          className="w-full py-2.5 rounded-xl text-xs font-bold border border-gold-400 text-gold-900 bg-gold-50/60 hover:bg-gold-100 transition-colors shadow-xs"
                          title="قارن هذا العطر مع عطور أخرى"
                        >
                          قارن العطر
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Navigation Bar */}
            <div className="p-6 bg-white rounded-3xl border border-[#E8E2D8] flex flex-wrap items-center justify-between gap-4 shadow-soft">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  هل ترغب في استكشاف المزيد أو مقارنة عطور أخرى؟
                </h4>
                <p className="text-xs text-slate-500">
                  يمكنك مراجعة جميع العطور المتوفرة في المتجر أو فتح استوديو المقارنة الكامل.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setActiveView('store'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="btn-forest px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md"
                >
                  تصفح تشكيلة العطور كاملة
                </button>

                <button
                  onClick={() => { setActiveView('comparison'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="btn-gold px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md"
                >
                  فتح استوديو المقارنة
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
