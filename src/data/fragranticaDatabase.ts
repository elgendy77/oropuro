import type { Product, PerfumeGender } from '../types';

export interface PerfumeComparisonItem {
  id: string;
  name: string;
  brand: string;
  gender: PerfumeGender;
  concentration: string;
  image: string;
  price?: number;
  inStore?: boolean;
  storeProductId?: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  longevity: {
    label: string; // e.g. "ثبات وحشي (+12 ساعة)"
    hours: string; // "+12 ساعة"
    score: number; // 0 - 100
  };
  sillage: {
    label: string; // e.g. "فوحان قوي جداً مسافة مترين"
    range: string; // "مترين فأكثر"
    score: number; // 0 - 100
  };
  vibe: string;
  occasions: string[];
  seasons: string[];
  fragranceFamily: string;
  fragranticaRating: number;
  fragranticaVotes: number;
}

export const FRAGRANTICA_PRESET_PERFUMES: PerfumeComparisonItem[] = [
  {
    id: 'imagination-1',
    name: 'إيماجينيشن | Imagination',
    brand: 'لويس فيتون (Louis Vuitton)',
    gender: 'men',
    concentration: 'Eau de Parfum',
    image: 'https://images.unsplash.com/photo-1594913785162-e678a0c23ee9?auto=format&fit=crop&w=800&q=80',
    price: 450,
    inStore: true,
    storeProductId: 'imagination-1',
    notes: {
      top: ['السترون', 'برغموت كالابريا', 'البرتقال الصقلي'],
      heart: ['الزنجبيل النيجيري', 'شاي سيلان الأسود النادر', 'زهر البرتقال التونسي'],
      base: ['الأمبروكسان الفاخر', 'خشب الغاياك', 'اللبان']
    },
    longevity: {
      label: 'ثبات أسطوري منعش',
      hours: '+12 ساعة',
      score: 95
    },
    sillage: {
      label: 'فوحان فخم ومميز',
      range: 'مترين',
      score: 93
    },
    vibe: 'تحفة عطرية استثنائية تعيد تعريف الانتعاش المترف، تمازج راقٍ بين حمضيات كالابريا ودفء الشاي الأسود والزنجبيل مع عمق أمبروكساني نقي.',
    occasions: ['الاجتماعات والمناسبات الراقية', 'العمل والصباح المترف', 'الأمسيات الصيفية'],
    seasons: ['الصيف ☀️', 'الربيع 🌸', 'الخريف 🍂'],
    fragranceFamily: 'حمضيات - أروماتك (Citrus Aromatic)',
    fragranticaRating: 4.88,
    fragranticaVotes: 14200
  },
  {
    id: 'jassas-4',
    name: 'جساس | Jassas',
    brand: 'عساف (Assaf)',
    gender: 'men',
    concentration: 'Eau de Parfum',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
    price: 450,
    inStore: true,
    storeProductId: 'jassas-4',
    notes: {
      top: ['الهيل الجواتيمالي', 'الفلفل الوردي', 'الزعفران'],
      heart: ['العود الكمبودي', 'خشب الأرز', 'الجلد الفاخر'],
      base: ['العنبر الكريستالي', 'نجيل الهند', 'الباتشولي الداكن']
    },
    longevity: {
      label: 'ثبات جبار ومهيب',
      hours: '+14 ساعة',
      score: 97
    },
    sillage: {
      label: 'فوحان طاغٍ مسيطر',
      range: 'أكثر من مترين',
      score: 96
    },
    vibe: 'عطر يفيض بالهيبة والوقار، صُمم خصيصاً للرجل الشرقي الواثق بنغمات العود والجلود الحادة ولمسات الهيل الآسرة.',
    occasions: ['المناسبات الكبرى', 'الأعراس والمحافل الرسمية', 'أمسيات الشتاء والبرد'],
    seasons: ['الشتاء ❄️', 'الخريف 🍂'],
    fragranceFamily: 'شرقي - خشبي حار (Oriental Woody Spicy)',
    fragranticaRating: 4.82,
    fragranticaVotes: 9850
  },
  {
    id: 'hawas-ice-10',
    name: 'هوس آيس | Hawas Ice',
    brand: 'الرصاصي (Rasasi)',
    gender: 'men',
    concentration: 'Eau de Parfum',
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80',
    price: 400,
    inStore: true,
    storeProductId: 'hawas-ice-10',
    notes: {
      top: ['الليمون المثلج', 'التفاح الإيطالي', 'البرغموت الصقلي', 'الينسون النجمي'],
      heart: ['البرقوق', 'زهر البرتقال', 'الهيل الحار'],
      base: ['العنبر الحوتي', 'خشب الطحلب', 'المسك الأبيض', 'الأخشاب الطافية']
    },
    longevity: {
      label: 'ثبات ممتاز ونقي',
      hours: '+10 ساعات',
      score: 92
    },
    sillage: {
      label: 'فوحان منعش كاسح',
      range: 'متر ونصف إلى مترين',
      score: 91
    },
    vibe: 'انفجار ثلجي مائي منعش يجمع حمضيات كالابريا والتفاح مع قاعدة عنبرية حوتية تمنحك طاقة لا تتوقف.',
    occasions: ['الاستخدام اليومي', 'الخروجات الصيفية والشاطئ', 'الجيم والرياضة'],
    seasons: ['الصيف ☀️', 'الربيع 🌸'],
    fragranceFamily: 'أروماتك - مائي منعش (Aromatic Aquatic)',
    fragranticaRating: 4.75,
    fragranticaVotes: 11300
  },
  {
    id: 'creed-aventus-73',
    name: 'كريد أفينتوس | Creed Aventus',
    brand: 'كريد (Creed)',
    gender: 'men',
    concentration: 'Eau de Parfum',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80',
    price: 450,
    inStore: true,
    storeProductId: 'creed-aventus-73',
    notes: {
      top: ['الأناناس الملكي', 'البرغموت', 'الكشمش الأسود', 'التفاح الأخضر'],
      heart: ['أخشاب البتولا المدخنة', 'الباتشولي', 'الياسمين المغربي', 'الورد'],
      base: ['المسك الأبيض', 'طحلب البلوط', 'العنبر', 'الفانيليا']
    },
    longevity: {
      label: 'ثبات كلاسيكي ملكي',
      hours: '+11 ساعة',
      score: 93
    },
    sillage: {
      label: 'فوحان جذاب أسطوري',
      range: 'مترين',
      score: 94
    },
    vibe: 'رمز النجاح والقيادة الرجالية، حوار متناغم بين انتعاش الأناناس الملكي ودخان أخشاب البتولا الفاخرة.',
    occasions: ['الاجتماعات القيادية', 'المناسبات المميزة', 'كل الأوقات'],
    seasons: ['كافة الفصول 🍂🌸☀️❄️'],
    fragranceFamily: 'تشيبر - فواكه ملكي (Chypre Fruity)',
    fragranticaRating: 4.9,
    fragranticaVotes: 18500
  }
];

// Helper to convert any store product into a comparison item
export function productToComparisonItem(product: Product): PerfumeComparisonItem {
  const existingPreset = FRAGRANTICA_PRESET_PERFUMES.find(p => p.storeProductId === product.id || p.id === product.id);
  if (existingPreset) return existingPreset;

  const top = Array.isArray(product.notes?.top) ? product.notes.top : [];
  const heart = Array.isArray(product.notes?.heart) ? product.notes.heart : [];
  const base = Array.isArray(product.notes?.base) ? product.notes.base : [];

  return {
    id: product.id,
    name: product.name,
    brand: product.brand,
    gender: product.gender,
    concentration: product.concentration,
    image: product.image,
    price: product.sizes?.[0]?.price || 0,
    inStore: true,
    storeProductId: product.id,
    notes: { top, heart, base },
    longevity: {
      label: product.gender === 'women' ? 'ثبات ناعم يدوم طويلاً (+12 ساعة)' : 'ثبات ممتاز (+10 ساعات)',
      hours: product.gender === 'women' ? '12 - 24 ساعة' : '10 - 12 ساعة',
      score: 93
    },
    sillage: {
      label: product.gender === 'women' ? 'فوحان أنثوي آسر وهالة ساحرة' : 'فوحان قوي مسافة مترين',
      range: 'مترين',
      score: 91
    },
    vibe: product.description || (product.gender === 'women' ? 'عطر نسائي ساحر يفيض بالأنوثة الطاغية والجاذبية والرقة' : 'عطر راقٍ ذو حضور قوي وتدرج عطري فاخر'),
    occasions: product.gender === 'women' 
      ? ['المناسبات الراقية', 'السهرات واللقاءات الخاصة', 'الاستخدام اليومي المترف'] 
      : ['المناسبات الفخمة', 'الاستخدام اليومي الراقي', 'السهرات'],
    seasons: ['كافة الفصول'],
    fragranceFamily: product.fragranceFamily || 'oriental',
    fragranticaRating: product.rating || 4.8,
    fragranticaVotes: (product.reviewsCount || 10) * 15
  };
}
