import type { Product, StoreSettings } from '../types';

export const EGYPTIAN_GOVERNORATES = [
  { name: 'القاهرة', zone: 'cairoGiza' },
  { name: 'الجيزة', zone: 'cairoGiza' },
  { name: 'الإسكندرية', zone: 'alexandria' },
  { name: 'القليوبية', zone: 'deltaCanal' },
  { name: 'الشرقية', zone: 'deltaCanal' },
  { name: 'الدقهلية', zone: 'deltaCanal' },
  { name: 'الغربية', zone: 'deltaCanal' },
  { name: 'المنوفية', zone: 'deltaCanal' },
  { name: 'البحيرة', zone: 'deltaCanal' },
  { name: 'كفر الشيخ', zone: 'deltaCanal' },
  { name: 'دمياط', zone: 'deltaCanal' },
  { name: 'بورسعيد', zone: 'deltaCanal' },
  { name: 'الإسماعيلية', zone: 'deltaCanal' },
  { name: 'السويس', zone: 'deltaCanal' },
  { name: 'الفيوم', zone: 'upperEgypt' },
  { name: 'بني سويف', zone: 'upperEgypt' },
  { name: 'المنيا', zone: 'upperEgypt' },
  { name: 'أسيوط', zone: 'upperEgypt' },
  { name: 'سوهاج', zone: 'upperEgypt' },
  { name: 'قنا', zone: 'upperEgypt' },
  { name: 'الأقصر', zone: 'upperEgypt' },
  { name: 'أسوان', zone: 'upperEgypt' },
  { name: 'البحر الأحمر', zone: 'upperEgypt' },
  { name: 'جنوب سيناء', zone: 'upperEgypt' },
  { name: 'شمال سيناء', zone: 'upperEgypt' },
  { name: 'مطروح', zone: 'upperEgypt' },
  { name: 'الوادي الجديد', zone: 'upperEgypt' },
];

export const DEFAULT_ADMIN_USERS = [
  {
    id: 'admin_owner',
    name: 'المالك الرئيسي',
    username: 'admin',
    password: '1331',
    role: 'owner' as const,
    createdAt: '2026-10-01T00:00:00.000Z',
    isActive: true,
  },
  {
    id: 'admin_1791627868315',
    name: 'Youssef',
    username: 'youssef',
    password: '1234',
    role: 'manager' as const,
    createdAt: '2026-10-10T10:24:28.315Z',
    isActive: true,
  },
  {
    id: 'admin_1791627879189',
    name: 'karim',
    username: 'karim',
    password: '1234',
    role: 'staff' as const,
    createdAt: '2026-10-10T10:24:39.189Z',
    isActive: true,
  }
];

export const DEFAULT_SETTINGS: StoreSettings = {
  storeName: 'Oro Puro | أورو بورو',
  storeTagline: 'الذهب الخالص للعطور العالمية الأصلية',
  logoUrl: '/images/logo.png',
  whatsappNumber: '201012345678',
  vodafoneCashNumber: '01012345678',
  instapayAddress: 'oropuro@instapay',
  instapayAccountName: 'Oro Puro Fragrances',
  freeShippingThreshold: 1200,
  adminPin: '1331',
  adminUsers: DEFAULT_ADMIN_USERS,
  shippingRates: {
    cairoGiza: 45,
    alexandria: 55,
    deltaCanal: 60,
    upperEgypt: 75,
    admins: DEFAULT_ADMIN_USERS,
    logoUrl: '/images/logo.png',
    automationWebhookUrl: '',
  },
  automationWebhookUrl: '',
  siteContent: {
    announcementText: 'شحن مجاني عند طلب عطرين + عينة نيش فاخرة هدية | حق المعاينة والتجربة ورش الزجاجة قبل دفع جنيه واحد!',
    announcementBadge: 'عرض اليوم الحصري',
    announcementEnabled: true,
    announcementTimerText: 'ينتهي خلال:',
    heroBadge: 'الذهب الخالص للعطور الأصلية • تركيز عالي وفوحان كاسح',
    heroTitle: 'العطر الذي يجعل الجميع يسألك: ما هذا العطر؟',
    heroHighlight: 'ما هذا العطر؟',
    heroSubtitle: 'توليفات عطرية عالمية ساحرة تفرض هيبتك وتمنحك جاذبية استثنائية مع حق التجربة والمعاينة قبل الدفع!',
    heroImageUrl: 'https://images.unsplash.com/photo-1594913785162-e678a0c23ee9?auto=format&fit=crop&w=1600&q=80',
    heroCtaText: 'اطلب الآن مع حق المعاينة',
    heroSecondaryCtaText: 'مستشار العطور الذكي',
    promoBannerEnabled: true,
    promoBannerTitle: 'عرض الدويتو الشبابي الأكثر طلباً',
    promoBannerSubtitle: 'اطلب أي عطرين بخصم فوري إضافي وشحن مجاني لباب البيت مع حق المعاينة والتجربة',
    promoBannerBadge: 'عرض حصري لفترة محدودة 🔥',
    promoDiscountText: 'خصم 100 ج.م إضافي',
    promoBannerCtaText: 'اطلب العرض الآن',
    promoBannerTheme: 'emerald_gold',
    collectionBadge: 'التشكيلة الشبابية الأكثر مبيعاً والأعلى تقييماً ★★★★★',
    collectionTitle: 'عطور الحضور الطاغي • ثبات 48 ساعة يتحدى الغسيل',
    collectionSubtitle: 'زيوت عطرية أصلية 100% مستوردة من كبرى دور العطور بتركيزات Extrait نادرة. يحق لك فتح الشحنة وتجربة ورش العطر في وجود المندوب قبل دفع أي مليم.',
    trustFeature1Title: 'حق التجربة قبل الدفع',
    trustFeature1Desc: 'افتح الشحنة ورش وجرب ثبات وفوحان العطر مع المندوب قبل دفع جنيه واحد',
    trustFeature2Title: 'شحن سريع لكافة المحافظات',
    trustFeature2Desc: 'توصيل مباشر من مقرنا بالإسكندرية إلى باب بيتك في 24-48 ساعة فقط',
    trustFeature3Title: 'أعلى درجات التركيز والثبات',
    trustFeature3Desc: 'زيوت أصلية مركزة تدوم على الملابس لأيام دون بهتان أو تغير في الرائحة',
    whatsappFloatingText: 'هل تحتاج مساعدة في اختيار عطرك؟ اضغط هنا وتحدث معنا مباشرة!',
  }
};

export const SAMPLE_LUXURY_PRODUCTS: Product[] = [
  {
    "id": "imagination-1",
    "name": "إيماجينيشن | Imagination",
    "brand": "لويس فيتون (Louis Vuitton)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "تحفة عطرية استثنائية تعيد تعريف الانتعاش الرجالي المترف. يمزج بين حمضيات كالابريا المتلألئة ودفء الشاي الأسود والزنجبيل الحار مع عمق أمبروكساني نقي يأسر الحواس.",
    "image": "https://images.unsplash.com/photo-1594913785162-e678a0c23ee9?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 450,
        "originalPrice": 550,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "السترون",
        "برغموت كالابريا",
        "البرتقال الصقلي"
      ],
      "heart": [
        "الزنجبيل النيجيري",
        "شاي سيلان الأسود النادر",
        "زهر البرتقال التونسي"
      ],
      "base": [
        "الأمبروكسان الفاخر",
        "خشب الغاياك",
        "اللبان"
      ]
    },
    "fragranceFamily": "fresh",
    "rating": 4.8,
    "reviewsCount": 35,
    "isFeatured": true,
    "isNew": false,
    "createdAt": "2026-10-10T08:15:51.912Z"
  },
  {
    "id": "jassas-4",
    "name": "جساس | Jassas",
    "brand": "عساف (Assaf)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "عطر رجالي قوي يفيض بالهيبة والوقار، صُمم خصيصاً للرجل الشرقي الواثق. نغمات العود والجلود الحادة تمتزج بنفحات الهيل لتمنحك حضوراً آسراً لا يُنسى.",
    "image": "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 450,
        "originalPrice": 550,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الهيل الجواتيمالي",
        "الفلفل الوردي",
        "الزعفران"
      ],
      "heart": [
        "العود الكمبودي",
        "خشب الأرز",
        "الجلد الفاخر"
      ],
      "base": [
        "العنبر الكريستالي",
        "نجيل الهند",
        "الباتشولي الداكن"
      ]
    },
    "fragranceFamily": "woody",
    "rating": 4.7,
    "reviewsCount": 56,
    "isFeatured": true,
    "isNew": false,
    "createdAt": "2026-10-10T07:15:51.913Z"
  },
  {
    "id": "assaf-risk-comment-8",
    "name": "عساف ريسك كومينت | Assaf Risk Comment",
    "brand": "عساف (Assaf)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "إصدار مميز من دار عساف يجمع بين المغامرة والجرأة. توليفة راقية من الأخشاب الفاخرة والتوابل المتزنة تضفي طابعاً رجولياً عصرياً جذاباً.",
    "image": "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 450,
        "originalPrice": 550,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "البرغموت الإيطالي",
        "الجريب فروت",
        "الفلفل الأسود"
      ],
      "heart": [
        "أوراق البنفسج",
        "الخزامى",
        "الهيل الإندونيسي"
      ],
      "base": [
        "خشب الصندل",
        "التونكا",
        "المسك الفاخر"
      ]
    },
    "fragranceFamily": "woody",
    "rating": 4.7,
    "reviewsCount": 84,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-10T06:15:51.913Z"
  },
  {
    "id": "hawas-ice-10",
    "name": "هوس آيس | Hawas Ice",
    "brand": "الرصاصي (Rasasi)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "النسخة الأحدث والأكثر انتعاشاً من الأيقونة هوس. انفجار ثلجي من الحمضيات الباردة والتفاح يتوازن مع قاعدة عنبرية مائية تمنحك فوحاناً استثنائياً يدوم طوال اليوم.",
    "image": "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 400,
        "originalPrice": 500,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الليمون المثلج",
        "التفاح الإيطالي",
        "البرغموت الصقلي",
        "الينسون النجمي"
      ],
      "heart": [
        "البرقوق",
        "زهر البرتقال",
        "الهيل الحار"
      ],
      "base": [
        "العنبر الحوتي",
        "خشب الطحلب",
        "المسك الأبيض",
        "الأخشاب الطافية"
      ]
    },
    "fragranceFamily": "fresh",
    "rating": 4.9,
    "reviewsCount": 28,
    "isFeatured": true,
    "isNew": true,
    "createdAt": "2026-10-10T05:15:51.913Z"
  },
  {
    "id": "hawas-malibu-11",
    "name": "هوس ماليبو | Hawas Malibu",
    "brand": "الرصاصي (Rasasi)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "عطر ينبض بروح الشواطئ المشمسة وأمواج ماليبو المنعشة، بمزيج فواكه استوائية نضرة وأعشاب بحرية راقية.",
    "image": "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 400,
        "originalPrice": 500,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "أمواج المحيط",
        "الأناناس",
        "الماندرين"
      ],
      "heart": [
        "المريمية",
        "الخزامى",
        "إبرة الراعي"
      ],
      "base": [
        "خشب الأرز",
        "العنبر الرمادي",
        "المسك"
      ]
    },
    "fragranceFamily": "fresh",
    "rating": 5,
    "reviewsCount": 35,
    "isFeatured": false,
    "isNew": true,
    "createdAt": "2026-10-10T04:15:51.913Z"
  },
  {
    "id": "hawas-tropical-12",
    "name": "هوس تروبيكال | Hawas Tropical",
    "brand": "الرصاصي (Rasasi)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "رحلة استوائية مفعمة بالحيوية والانطلاق، تجمع بين جاذبية الفواكه الاستوائية وأناقة الأخشاب الرجالية.",
    "image": "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 400,
        "originalPrice": 500,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "المانجو",
        "الباشن فروت",
        "الليمون الحامض"
      ],
      "heart": [
        "جوز الهند الخفيف",
        "زهر البرتقال",
        "الهيل"
      ],
      "base": [
        "خشب الصندل",
        "العنبر",
        "نجيل الهند"
      ]
    },
    "fragranceFamily": "fresh",
    "rating": 4.7,
    "reviewsCount": 42,
    "isFeatured": false,
    "isNew": true,
    "createdAt": "2026-10-10T03:15:51.913Z"
  },
  {
    "id": "hawas-rouge-13",
    "name": "هوس روج | Hawas Rouge",
    "brand": "الرصاصي (Rasasi)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "إصدار جريء ومغري من خط هوس، يتألق بنفحات التوابل الحارة والجلود مع لمسة سكرية مدخنة آسرة.",
    "image": "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 400,
        "originalPrice": 500,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الفلفل الأحمر",
        "الزعفران",
        "التوت البري"
      ],
      "heart": [
        "القرفة",
        "الجلود الناعمة",
        "الباتشولي"
      ],
      "base": [
        "خشب الأرز",
        "العنبر الدافئ",
        "الفانيليا المدخنة"
      ]
    },
    "fragranceFamily": "woody",
    "rating": 4.8,
    "reviewsCount": 49,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-10T02:15:51.913Z"
  },
  {
    "id": "frankel-imagination-14",
    "name": "فرانكل إيماجينيشن | Frankel Imagination",
    "brand": "عساف (Assaf)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "محاكاة فاخرة ومتقنة للغاية لعطر إيماجينيشن الأيقوني بلمسة دار عساف الخاصة، ثبات وفوحان فائق يناسب الصيف والمناسبات الفخمة.",
    "image": "https://images.unsplash.com/photo-1594913785162-e678a0c23ee9?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 500,
        "originalPrice": 600,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "البرغموت الإيطالي",
        "البرتقال المر",
        "السترون الصقلي"
      ],
      "heart": [
        "الزنجبيل",
        "أوراق الشاي الفاخرة",
        "براعم البرتقال"
      ],
      "base": [
        "الأمبروكسان النقي",
        "خشب الأرز",
        "اللبان العربي"
      ]
    },
    "fragranceFamily": "fresh",
    "rating": 4.9,
    "reviewsCount": 56,
    "isFeatured": false,
    "isNew": true,
    "createdAt": "2026-10-10T01:15:51.913Z"
  },
  {
    "id": "frankel-aventus-15",
    "name": "فرانكل أفينتوس | Frankel Aventus",
    "brand": "عساف (Assaf)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "عطر القوة والقيادة مستوحى من خطوط كريد أفينتوس الأسطورية بإشراف عساف. حضور ملكي يفيض بالفخامة والرجولة.",
    "image": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 500,
        "originalPrice": 600,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الأناناس المدخن",
        "الكشمش الأسود",
        "التفاح الأخضر",
        "البرغموت"
      ],
      "heart": [
        "أخشاب البتولا المدخنة",
        "الباتشولي",
        "الياسمين المغربي"
      ],
      "base": [
        "المسك الرمادي",
        "طحلب البلوط",
        "العنبر",
        "الفانيليا"
      ]
    },
    "fragranceFamily": "oriental",
    "rating": 5,
    "reviewsCount": 63,
    "isFeatured": false,
    "isNew": true,
    "createdAt": "2026-10-10T00:15:51.913Z"
  },
  {
    "id": "orget-comment-17",
    "name": "أورجيت كومنت عساف | Orget Comment",
    "brand": "عساف (Assaf)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "عطر رجالي راقٍ يناسب بيئات العمل واللقاءات الرسمية، يمنحك هالة من الثقة والجاذبية العصرية الهادئة.",
    "image": "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 450,
        "originalPrice": 550,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الميرمية الفرنسية",
        "الهيل الأخضر",
        "البرغموت"
      ],
      "heart": [
        "أزهار الخزامى",
        "السوسن",
        "الباتشولي"
      ],
      "base": [
        "خشب الأرز الأطلسي",
        "نجيل الهند",
        "المسك"
      ]
    },
    "fragranceFamily": "woody",
    "rating": 4.8,
    "reviewsCount": 77,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-09T23:15:51.913Z"
  },
  {
    "id": "orget-addict-18",
    "name": "أورجيت أديكت عساف | Orget Addict",
    "brand": "عساف (Assaf)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "عطر إدماني عميق للرجل الذي يبحث عن التميز والغموض في السهرات والمناسبات الشتوية والمسائية.",
    "image": "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 450,
        "originalPrice": 550,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الفلفل الأسود",
        "الهيل",
        "القرفة"
      ],
      "heart": [
        "الجلود الإيطالية",
        "التبغ الخفيف",
        "الخزامى"
      ],
      "base": [
        "التونكا البرازيلية",
        "الفانيليا",
        "خشب الصندل"
      ]
    },
    "fragranceFamily": "oriental",
    "rating": 4.9,
    "reviewsCount": 84,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-09T22:15:51.913Z"
  },
  {
    "id": "risk-assaf-19",
    "name": "ريسك عساف | Risk Assaf",
    "brand": "عساف (Assaf)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "عطر المغامرة والجرأة الرجولية المطلقة، يعكس شخصية جريئة تسعى دائماً إلى كسر المألوف.",
    "image": "https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 450,
        "originalPrice": 550,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "البرغموت",
        "الفلفل الوردي",
        "الليمون الحامض"
      ],
      "heart": [
        "الهيل",
        "الخزامى",
        "الباتشولي"
      ],
      "base": [
        "خشب الأرز",
        "العنبر",
        "نجيل الهند"
      ]
    },
    "fragranceFamily": "woody",
    "rating": 5,
    "reviewsCount": 91,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-09T21:15:51.913Z"
  },
  {
    "id": "klikat-blue-21",
    "name": "كليكات بلو | Klikat Blue",
    "brand": "عساف (Assaf)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "انتعاش بحري كريستالي أزرق يمنحك طاقة وحيوية تدوم لساعات، مثالي للاستخدام اليومي وأيام الصيف الحارة.",
    "image": "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 450,
        "originalPrice": 550,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "النعناع البارد",
        "الجريب فروت",
        "البرغموت البحري"
      ],
      "heart": [
        "إبرة الراعي",
        "الميرمية",
        "الفلفل الوردي"
      ],
      "base": [
        "خشب الأرز",
        "الباتشولي",
        "العنبر الأبيض"
      ]
    },
    "fragranceFamily": "fresh",
    "rating": 4.8,
    "reviewsCount": 35,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-09T20:15:51.913Z"
  },
  {
    "id": "klikat-jassas-23",
    "name": "كليكات جساس | Klikat Jassas",
    "brand": "عساف (Assaf)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "إصدار خاص وحصري يجمع بين تركيبة كليكات وجساس الأسطورية ليقدم توليفة شرقية تفيض بالفخامة والهيبة.",
    "image": "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 450,
        "originalPrice": 550,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الزعفران الإيراني",
        "الهيل",
        "التوت البري"
      ],
      "heart": [
        "العود المعتق",
        "أخشاب الغاياك",
        "الياسمين"
      ],
      "base": [
        "العنبر الملكي",
        "الجلود الفاخرة",
        "المسك الأسود"
      ]
    },
    "fragranceFamily": "woody",
    "rating": 5,
    "reviewsCount": 49,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-09T19:15:51.913Z"
  },
  {
    "id": "dior-sauvage-high-conc-24",
    "name": "ديور سوفاج (مغناطيس لوك تركيز عالي) | Dior Sauvage High Conc",
    "brand": "ديور (Dior)",
    "gender": "men",
    "concentration": "Parfum Extrait",
    "description": "النسخة الفاخرة ذات الغطاء المغناطيسي والتركيز العالي من سوفاج. نفحات برية خام تجمع بين البرغموت والأمبروكسان المركز لفوحان وثبات جبارين.",
    "image": "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 450,
        "originalPrice": 550,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "برغموت ريجيو دي كالابريا الحاد",
        "الفلفل الأسود الحار"
      ],
      "heart": [
        "الخزامى",
        "فلفل سيتشوان",
        "الينسون النجمي",
        "جوزة الطيب"
      ],
      "base": [
        "أمبروكسان خام بتركيز مضاعف",
        "فانيليا بابوا غينيا الجديدة",
        "أخشاب الأرز"
      ]
    },
    "fragranceFamily": "oriental",
    "rating": 4.7,
    "reviewsCount": 56,
    "isFeatured": true,
    "isNew": false,
    "createdAt": "2026-10-09T18:15:51.913Z"
  },
  {
    "id": "dior-sauvage-regular-25",
    "name": "ديور سوفاج (عادي) | Dior Sauvage Regular",
    "brand": "ديور (Dior)",
    "gender": "men",
    "concentration": "Eau de Toilette",
    "description": "العطر الرجالي الأكثر شهرة ومبيعاً حول العالم. تركيبة نقية ومنعشة تمنحك إحساساً بالنظافة والجاذبية في كل الأوقات.",
    "image": "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "برغموت كالابريا",
        "الفلفل الحار"
      ],
      "heart": [
        "فلفل سيتشوان",
        "الخزامى",
        "الباتشولي",
        "إبرة الراعي"
      ],
      "base": [
        "الأمبروكسان",
        "خشب الأرز",
        "اللابدانوم"
      ]
    },
    "fragranceFamily": "fresh",
    "rating": 4.8,
    "reviewsCount": 63,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-09T17:15:51.913Z"
  },
  {
    "id": "bleu-de-chanel-high-conc-26",
    "name": "بلو دي شانيل (مغناطيس تركيز عالي) | Bleu de Chanel High Conc",
    "brand": "شانيل (Chanel)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "أعلى وأعمق درجات التركيز من بلو دي شانيل بغطاء مغناطيسي فاخر. توليفة خشبية كريمية تنبض بالثقة المطلقة والأناقة الباريسية.",
    "image": "https://images.unsplash.com/photo-1593487568720-92097fb460fb?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 450,
        "originalPrice": 550,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "قشور الليمون",
        "البرغموت",
        "النعناع",
        "حب الهيل"
      ],
      "heart": [
        "الخزامى",
        "إبرة الراعي",
        "روائح عشبية خضراء"
      ],
      "base": [
        "خشب الصندل النيود كاليدوني",
        "الأرز",
        "اللبان",
        "التونكا",
        "خشب العنبر"
      ]
    },
    "fragranceFamily": "fresh",
    "rating": 4.9,
    "reviewsCount": 70,
    "isFeatured": true,
    "isNew": false,
    "createdAt": "2026-10-09T16:15:51.913Z"
  },
  {
    "id": "bleu-de-chanel-regular-27",
    "name": "بلو دي شانيل (عادي) | Bleu de Chanel Regular",
    "brand": "شانيل (Chanel)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "العطر الأزرق المثالي للرجل العصري، توازن ساحر بين الانتعاش الحمضي والدفء الخشبي المدخن بالبخور.",
    "image": "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الجريب فروت",
        "الليمون",
        "النعناع",
        "الفلفل الوردي"
      ],
      "heart": [
        "الزنجبيل",
        "جوزة الطيب",
        "الياسمين",
        "آيزو إي سوبر"
      ],
      "base": [
        "البخور",
        "نجيل الهند",
        "أخشاب الأرز",
        "خشب الصندل",
        "الباتشولي"
      ]
    },
    "fragranceFamily": "fresh",
    "rating": 5,
    "reviewsCount": 77,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-09T15:15:51.913Z"
  },
  {
    "id": "scandal-pour-homme-30",
    "name": "اسكندال بور هوم | Scandal Pour Homme",
    "brand": "جان بول غوتييه (Jean Paul Gaultier)",
    "gender": "men",
    "concentration": "Eau de Toilette",
    "description": "عطر الملاكم الجريء برائحة الكراميل البنية الجذابة والمريمية المنعشة، عطر شبابي مغري يضمن لك خطف الأنظار.",
    "image": "https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "المريمية المتصلبة",
        "الماندرين"
      ],
      "heart": [
        "الكراميل المكرمل الفاخر",
        "حبوب التونكا"
      ],
      "base": [
        "نجيل الهند الهايتي",
        "خشب الأرز"
      ]
    },
    "fragranceFamily": "woody",
    "rating": 4.9,
    "reviewsCount": 28,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-09T14:15:51.913Z"
  },
  {
    "id": "the-one-luminous-night-31",
    "name": "دولتشي آند غابانا ليل ساطع | The One Luminous Night",
    "brand": "دولتشي آند غابانا (Dolce & Gabbana)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "إصدار حصري ساحر مستوحى من سماء الليل الصحراوية المرصعة بالنجوم، نوتة التمر مع البخور الفاخر تخلق توليفة خيالية.",
    "image": "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الفلفل الأسود",
        "الريحان",
        "البرغموت"
      ],
      "heart": [
        "التمر الحلو",
        "المريمية",
        "إبرة الراعي"
      ],
      "base": [
        "البخور المدخن",
        "خشب الصندل",
        "العنبر"
      ]
    },
    "fragranceFamily": "oriental",
    "rating": 5,
    "reviewsCount": 35,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-09T13:15:51.913Z"
  },
  {
    "id": "the-one-royal-night-32",
    "name": "دولتشي آند غابانا ليل ملكي | The One Royal Night",
    "brand": "دولتشي آند غابانا (Dolce & Gabbana)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "عطر ملكي بكل معنى الكلمة، يجمع بين كلاسيكية ذا ون الإيطالية وسحر الهيل والأخشاب الشرقية الدافئة.",
    "image": "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "حب الهيل",
        "الريحان"
      ],
      "heart": [
        "خشب الكمثرى البري",
        "جوزة الطيب"
      ],
      "base": [
        "خشب الصندل",
        "خشب الأرز",
        "العنبر",
        "اللابدانوم"
      ]
    },
    "fragranceFamily": "woody",
    "rating": 4.7,
    "reviewsCount": 42,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-09T12:15:51.913Z"
  },
  {
    "id": "the-one-for-men-intense-34",
    "name": "دولتشي آند غابانا ذا ون إنتنس | The One For Men Intense",
    "brand": "دولتشي آند غابانا (Dolce & Gabbana)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "التجسيد الأقصى للجاذبية والرجولة الداكنة، عطر جلدي كثيف يعبر عن الرجل الكاريزمي الغامض.",
    "image": "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "حب الهيل",
        "النيرولي",
        "السرو"
      ],
      "heart": [
        "المسك الكشميري",
        "البنزوين (الجاوي)",
        "المريمية"
      ],
      "base": [
        "الجلود السوداء الفاخرة",
        "الباتشولي",
        "القريضة",
        "زهر البرتقال"
      ]
    },
    "fragranceFamily": "oriental",
    "rating": 4.9,
    "reviewsCount": 56,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-09T11:15:51.913Z"
  },
  {
    "id": "the-one-for-men-gold-35",
    "name": "دولتشي آند غابانا ذا ون جولد | The One For Men Gold",
    "brand": "دولتشي آند غابانا (Dolce & Gabbana)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "عطر ذهبي مشرق يحتفل بالأناقة الراقية واللمعان الملكي، بنفحات حمضية متبلة ببراعة على قاعدة خشبية دافئة.",
    "image": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "البرغموت الإيطالي",
        "البرتقال الأحمر",
        "الزنجبيل الحار"
      ],
      "heart": [
        "إبرة الراعي",
        "المريمية",
        "الهيل"
      ],
      "base": [
        "الباتشولي",
        "نجيل الهند الهايتي",
        "خشب العنبر"
      ]
    },
    "fragranceFamily": "oriental",
    "rating": 5,
    "reviewsCount": 63,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-09T10:15:51.913Z"
  },
  {
    "id": "the-one-for-men-edp-36",
    "name": "دولتشي آند غابانا ذا ون أو دو بارفيوم | The One For Men EDP",
    "brand": "دولتشي آند غابانا (Dolce & Gabbana)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "أحد أعظم عطور الإغواء والجاذبية في تاريخ العطور الرجالية. رائحة التبغ والعنبر والهيل تمنح دفئاً وأناقة لا تقاوم.",
    "image": "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الجريب فروت",
        "الكزبرة",
        "الريحان"
      ],
      "heart": [
        "الهيل",
        "الزنجبيل",
        "زهر البرتقال"
      ],
      "base": [
        "التبغ الفاخر",
        "العنبر الدافئ",
        "خشب الأرز"
      ]
    },
    "fragranceFamily": "oriental",
    "rating": 4.7,
    "reviewsCount": 70,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-09T09:15:51.913Z"
  },
  {
    "id": "stronger-with-you-intensely-37",
    "name": "سترونجر ويذ يو إنتنسلي | Stronger With You Intensely",
    "brand": "إمبوريو أرماني (Emporio Armani)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "عطر الحب والشغف الأكثر طلباً، مزيج سكري دافئ يجمع بين الكستناء المحمصة والفانيليا مع القرفة ليمنحك ثباتاً مبهراً.",
    "image": "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الفلفل الوردي",
        "العرعر",
        "البنفسج"
      ],
      "heart": [
        "الكستناء السكرية",
        "القرفة",
        "الخزامى",
        "المريمية"
      ],
      "base": [
        "الفانيليا",
        "التونكا",
        "العنبر",
        "جلد الغزال"
      ]
    },
    "fragranceFamily": "oriental",
    "rating": 4.8,
    "reviewsCount": 77,
    "isFeatured": true,
    "isNew": false,
    "createdAt": "2026-10-09T08:15:51.913Z"
  },
  {
    "id": "stronger-with-you-parfum-38",
    "name": "سترونجر ويذ يو بارفيوم | Stronger With You Parfum",
    "brand": "إمبوريو أرماني (Emporio Armani)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "إصدار البارفيوم المركز الأكثر عمقاً ونضجاً، بلمسة جلدية فاخرة تعزز النوتات السكرية الدافئة.",
    "image": "https://images.unsplash.com/photo-1615396899839-c99c121888b0?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الفلفل الوردي",
        "الفواكه الحمضية"
      ],
      "heart": [
        "الخزامى",
        "الكستناء",
        "المريمية"
      ],
      "base": [
        "الجلود",
        "التونكا",
        "الفانيليا",
        "العنبر"
      ]
    },
    "fragranceFamily": "oriental",
    "rating": 4.9,
    "reviewsCount": 84,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-09T07:15:51.913Z"
  },
  {
    "id": "stronger-with-you-intensely-metal-cap-39",
    "name": "سترونجر ويذ يو إنتنسلي (غطاء معدن) | Stronger With You Intensely Metal Cap",
    "brand": "إمبوريو أرماني (Emporio Armani)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "الإصدار المميز ذو الغطاء المعدني الثقيل والتركيبة الأكثر تركيزاً وثباتاً، عطر شتوي لا غنى عنه.",
    "image": "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 400,
        "originalPrice": 500,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الفلفل الوردي المركز",
        "توت العرعر"
      ],
      "heart": [
        "الكستناء المحلاة",
        "القرفة السيلانية",
        "الخزامى"
      ],
      "base": [
        "الفانيليا المدخنة",
        "التونكا",
        "العنبر الكريستالي"
      ]
    },
    "fragranceFamily": "oriental",
    "rating": 5,
    "reviewsCount": 91,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-09T06:15:51.913Z"
  },
  {
    "id": "stronger-with-you-absolutely-metal-cap-40",
    "name": "سترونجر ويذ يو أبسولوتلي (غطاء معدن) | Stronger With You Absolutely Metal Cap",
    "brand": "إمبوريو أرماني (Emporio Armani)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "إصدار الغطاء المعدني الفاخر من أبسولوتلي، يتميز بنوتة الروم المسكرة مع الكستناء والفانيليا لجاذبية مغناطيسية.",
    "image": "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 400,
        "originalPrice": 500,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "البرغموت",
        "اتفاق الروم الدافئ",
        "راتنج الإيليمي"
      ],
      "heart": [
        "الخزامى الفرنسي",
        "الدفانا العشبية",
        "الكستناء"
      ],
      "base": [
        "فانيليا مدغشقر",
        "خشب الأرز",
        "الباتشولي"
      ]
    },
    "fragranceFamily": "woody",
    "rating": 4.7,
    "reviewsCount": 28,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-09T05:15:51.913Z"
  },
  {
    "id": "stronger-with-you-absolutely-41",
    "name": "سترونجر ويذ يو أبسولوتلي | Stronger With You Absolutely",
    "brand": "إمبوريو أرماني (Emporio Armani)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "أفخم وأقوى إصدارات خط سترونجر ويذ يو، تركيبة كحولية دافئة تمنحك إحساساً بالنضج والفخامة.",
    "image": "https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "البرغموت",
        "اتفاق الروم",
        "الإيليمي"
      ],
      "heart": [
        "الخزامى",
        "الدفانا",
        "الكستناء المزججة"
      ],
      "base": [
        "فانيليا مدغشقر",
        "خشب الأرز",
        "الباتشولي"
      ]
    },
    "fragranceFamily": "woody",
    "rating": 4.8,
    "reviewsCount": 35,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-09T04:15:51.913Z"
  },
  {
    "id": "lattafa-asad-zanzibar-51",
    "name": "لطافة أسد (زنجبار / بني) | Lattafa Asad Zanzibar",
    "brand": "لطافة (Lattafa)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "عطر رجالي مميز من لطافة يأخذك إلى جزيرة زنجبار بنفحات التوابل الحارة وجوز الهند الكريمي والفانيليا الغنية.",
    "image": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 400,
        "originalPrice": 500,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الفلفل الأسود",
        "اللافندر"
      ],
      "heart": [
        "ماء جوز الهند",
        "السوسن",
        "الملح البحري"
      ],
      "base": [
        "الفانيليا",
        "البخور",
        "الباتشولي"
      ]
    },
    "fragranceFamily": "oriental",
    "rating": 5,
    "reviewsCount": 35,
    "isFeatured": true,
    "isNew": false,
    "createdAt": "2026-10-09T03:15:51.913Z"
  },
  {
    "id": "lattafa-asad-30ml-52",
    "name": "لطافة أسد (30 مل) | Lattafa Asad 30ml",
    "brand": "لطافة (Lattafa)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "حجم الجيب والتنقل العملي من عطر أسد الشهير، البديل الأبرز لعطر سوفاج إلكسير بفوحان استثنائي.",
    "image": "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "30 مل",
        "price": 200,
        "originalPrice": 300,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الفلفل الأسود",
        "التبغ",
        "الأناناس"
      ],
      "heart": [
        "القهوة المحمصة",
        "الباتشولي",
        "السوسن"
      ],
      "base": [
        "العنبر",
        "الفانيليا",
        "الأخشاب الجافة",
        "البنزوين"
      ]
    },
    "fragranceFamily": "oriental",
    "rating": 4.7,
    "reviewsCount": 42,
    "isFeatured": false,
    "isNew": true,
    "createdAt": "2026-10-09T02:15:51.913Z"
  },
  {
    "id": "fakhar-lattafa-black-55",
    "name": "فخر لطافة أسود | Fakhar Lattafa Black",
    "brand": "لطافة (Lattafa)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "البديل الأقوى والأشهر لعطر إيف سان لوران واي (Y EDP)، انتعاش تفاحي أخضر متبل بالزنجبيل يمنحك نظافة وجاذبية مطلقة.",
    "image": "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 400,
        "originalPrice": 500,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "التفاح الأخضر",
        "البرغموت",
        "الزنجبيل الحار"
      ],
      "heart": [
        "المريمية",
        "الخزامى",
        "توت العرعر",
        "إبرة الراعي"
      ],
      "base": [
        "خشب العنبر",
        "التونكا",
        "الأرز",
        "نجيل الهند"
      ]
    },
    "fragranceFamily": "fresh",
    "rating": 5,
    "reviewsCount": 63,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-09T01:15:51.913Z"
  },
  {
    "id": "wild-colt-assaf-69",
    "name": "وايلد كولت عساف | Wild Colt Assaf",
    "brand": "عساف (Assaf)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "أشهر عطور دار عساف وأكثرها مبيعاً، يجسد قوة الحصان العربي الجامح بمزيج متفرد من الجلود والبخور والعنبر.",
    "image": "https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 400,
        "originalPrice": 500,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الزعفران",
        "توت العرعر",
        "الزعتر البري"
      ],
      "heart": [
        "الجلود الإيطالية",
        "التوت الأسود",
        "اللبان العربي"
      ],
      "base": [
        "العنبر",
        "خشب الأرز",
        "الباتشولي"
      ]
    },
    "fragranceFamily": "woody",
    "rating": 4.8,
    "reviewsCount": 91,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-09T00:15:51.913Z"
  },
  {
    "id": "creed-aventus-73",
    "name": "كريد أفينتوس | Creed Aventus",
    "brand": "كريد (Creed)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "ملك العطور الرجالية على الإطلاق وعطر القادة والناجحين. مزيج أسطوري لا يتكرر يجمع بين فاكهية الأناناس ودخانية البتولا.",
    "image": "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 450,
        "originalPrice": 550,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الأناناس الملكي",
        "البرغموت",
        "التفاح",
        "الكشمش الأسود"
      ],
      "heart": [
        "أخشاب البتولا المدخنة",
        "الباتشولي",
        "الورد المغربي",
        "الياسمين"
      ],
      "base": [
        "المسك الرمادي",
        "طحلب السنديان",
        "العنبر",
        "الفانيليا"
      ]
    },
    "fragranceFamily": "oriental",
    "rating": 4.8,
    "reviewsCount": 49,
    "isFeatured": true,
    "isNew": false,
    "createdAt": "2026-10-08T23:15:51.913Z"
  },
  {
    "id": "azzaro-wanted-by-night-74",
    "name": "أزارو وانتد باي نايت | Azzaro Wanted By Night",
    "brand": "أزارو (Azzaro)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "عطر السهرات والمغامرات الليلية بامتياز، مزيج دافئ وحار من القرفة والتبغ واليوسفي يمنحك هالة من الجاذبية المطلقة.",
    "image": "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "القرفة",
        "اليوسفي",
        "الخزامى",
        "الليمون"
      ],
      "heart": [
        "الفواكه الحمراء",
        "البخور",
        "الكمون",
        "الأرز الأحمر"
      ],
      "base": [
        "التبغ",
        "الفانيليا",
        "الجلد",
        "خشب السرو",
        "الباتشولي"
      ]
    },
    "fragranceFamily": "woody",
    "rating": 4.9,
    "reviewsCount": 56,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-08T22:15:51.913Z"
  },
  {
    "id": "paco-rabanne-invictus-77",
    "name": "باكو رابان إنفكتوس | Paco Rabanne Invictus",
    "brand": "باكو رابان (Paco Rabanne)",
    "gender": "men",
    "concentration": "Eau de Toilette",
    "description": "عطر النصر والبطولة، انتعاش مائي حاد يقابله دفء خشب الغاياك والعنبر في زجاجة تمثل كأس الفوز.",
    "image": "https://images.unsplash.com/photo-1594913785162-e678a0c23ee9?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "نسيم البحر",
        "الجريب فروت",
        "الماندرين"
      ],
      "heart": [
        "ورق الغار",
        "الياسمين الهادئ"
      ],
      "base": [
        "العنبر الحوتي",
        "أخشاب الغاياك",
        "خشب الأرز",
        "طحلب البلوط"
      ]
    },
    "fragranceFamily": "fresh",
    "rating": 4.8,
    "reviewsCount": 77,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-08T21:15:51.913Z"
  },
  {
    "id": "parfums-de-marly-layton-84",
    "name": "دي مارلي ليتون رجالي | Parfums de Marly Layton",
    "brand": "بيرفيومز دي مارلي (Parfums de Marly)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "تحفة النيش الفرنسية الأكثر شهرة، عطر أرستقراطي راقٍ يمزج بين حلاوة التفاح وفخامة الفانيليا والهيل.",
    "image": "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 400,
        "originalPrice": 500,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "التفاح الهش",
        "الخزامى",
        "البرغموت",
        "الماندرين"
      ],
      "heart": [
        "إبرة الراعي",
        "البنفسج",
        "الياسمين"
      ],
      "base": [
        "الفانيليا",
        "الهيل",
        "خشب الصندل",
        "الفلفل",
        "الباتشولي",
        "الغاياك"
      ]
    },
    "fragranceFamily": "floral",
    "rating": 4.7,
    "reviewsCount": 56,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-08T20:15:51.913Z"
  },
  {
    "id": "versace-eros-men-85",
    "name": "فيرزاتشي إيروس رجالي | Versace Eros Men",
    "brand": "فيرزاتشي (Versace)",
    "gender": "men",
    "concentration": "Eau de Toilette",
    "description": "عطر إله الحب والرغبة المستوحى من الأساطير اليونانية، توليفة شبابية مغرية تفوح بانتعاش النعناع وحلاوة الفانيليا.",
    "image": "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "أوراق النعناع",
        "التفاح الأخضر",
        "الليمون الإيطالي"
      ],
      "heart": [
        "حبوب التونكا",
        "إبرة الراعي",
        "الأمبروكسان"
      ],
      "base": [
        "فانيليا مدغشقر",
        "خشب الأرز",
        "نجيل الهند",
        "طحلب السنديان"
      ]
    },
    "fragranceFamily": "oriental",
    "rating": 4.8,
    "reviewsCount": 63,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-08T19:15:51.913Z"
  },
  {
    "id": "montblanc-legend-night-88",
    "name": "مونت بلانك ليجند نايت (عسلي) | Montblanc Legend Night",
    "brand": "مونت بلانك (Montblanc)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "عطر ليلي دافئ يعبر عن الرجل الجنتلمان الهادئ والواثق، بنغمات خشبية عسلية مريحة وفخمة.",
    "image": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "حب الهيل",
        "النعناع",
        "الميرمية",
        "البرغموت"
      ],
      "heart": [
        "التفاح",
        "الخزامى",
        "الراتنجات",
        "خشب الأرز",
        "البنفسج"
      ],
      "base": [
        "الفانيليا السوداء",
        "خشب أكيغالا",
        "المسك",
        "الباتشولي"
      ]
    },
    "fragranceFamily": "woody",
    "rating": 4.7,
    "reviewsCount": 84,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-08T18:15:51.913Z"
  },
  {
    "id": "montblanc-legend-edp-89",
    "name": "مونت بلانك ليجند أسود | Montblanc Legend EDP",
    "brand": "مونت بلانك (Montblanc)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "تأكيد قوي على الرجولة الكلاسيكية المعاصرة، رائحة جلدية وأروماتيكية نظيفة تناسب كل الفصول.",
    "image": "https://images.unsplash.com/photo-1615396899839-c99c121888b0?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "أوراق البنفسج",
        "البرغموت"
      ],
      "heart": [
        "أخشاب الغابات",
        "الياسمين",
        "الماغنوليا"
      ],
      "base": [
        "الجلود",
        "طحلب البلوط",
        "الأخشاب"
      ]
    },
    "fragranceFamily": "oriental",
    "rating": 4.8,
    "reviewsCount": 91,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-08T17:15:51.913Z"
  },
  {
    "id": "mercedes-benz-man-club-black-96",
    "name": "مرسيدس بنز مان / كلوب بلاك | Mercedes-Benz Man / Club Black",
    "brand": "مرسيدس بنز (Mercedes-Benz)",
    "gender": "men",
    "concentration": "Eau de Toilette",
    "description": "جوهرة عطور الفانيليا الرجالية المدخنة، أداء أسطوري ورائحة شرقية فاخرة تنافس أعتى دور النيش.",
    "image": "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "البرغموت الإيطالي"
      ],
      "heart": [
        "البخور",
        "البخور المدخن",
        "الياسمين"
      ],
      "base": [
        "الفانيليا البوربون",
        "البنزوين (الجاوي)",
        "الأمبروكسان",
        "الأخشاب"
      ]
    },
    "fragranceFamily": "oriental",
    "rating": 4.7,
    "reviewsCount": 70,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-08T16:15:51.913Z"
  },
  {
    "id": "spicebomb-98",
    "name": "سبايس بومب | Spicebomb",
    "brand": "فيكتور آند رولف (Viktor&Rolf)",
    "gender": "men",
    "concentration": "Eau de Toilette",
    "description": "قنبلة من التوابل الحارة والجلود والتبغ، عطر شتوي ناري يمنحك دفئاً وجاذبية لافتة.",
    "image": "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الفلفل الوردي",
        "الإيليمي",
        "البرغموت",
        "الجريب فروت"
      ],
      "heart": [
        "القرفة",
        "الزعفران",
        "الفلفل الحلو (البابريكا)"
      ],
      "base": [
        "التبغ",
        "الجلد الفاخر",
        "نجيل الهند"
      ]
    },
    "fragranceFamily": "woody",
    "rating": 4.9,
    "reviewsCount": 84,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-08T15:15:51.913Z"
  },
  {
    "id": "paco-rabanne-1-million-99",
    "name": "باكو رابان ون مليون | Paco Rabanne 1 Million",
    "brand": "باكو رابان (Paco Rabanne)",
    "gender": "men",
    "concentration": "Eau de Toilette",
    "description": "سبيكة الذهب الشهيرة التي أحدثت ثورة في عالم العطور، رائحة حلوة متبلة تشع فخامة وتألقاً.",
    "image": "https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "اليوسفي الدموي",
        "الجريب فروت",
        "النعناع"
      ],
      "heart": [
        "القرفة الحارة",
        "التوابل",
        "الورد"
      ],
      "base": [
        "الجلود",
        "العنبر",
        "خشب الباتشولي",
        "الأخشاب البيضاء"
      ]
    },
    "fragranceFamily": "woody",
    "rating": 5,
    "reviewsCount": 91,
    "isFeatured": true,
    "isNew": false,
    "createdAt": "2026-10-08T14:15:51.913Z"
  },
  {
    "id": "1-million-elixir-100",
    "name": "ون مليون إكسير | 1 Million Elixir",
    "brand": "باكو رابان (Paco Rabanne)",
    "gender": "men",
    "concentration": "Parfum Extrait",
    "description": "إكسير غني ومكثف يجمع بين الفواكه الداكنة والفانيليا الملكية ليمنحك ثباتاً خارقاً.",
    "image": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "التفاح",
        "زهر الدفانا العطري"
      ],
      "heart": [
        "الورد الدمشقي",
        "الأوسمانثوس",
        "خشب الأرز"
      ],
      "base": [
        "فانيليا مدغشقر",
        "التونكا",
        "الباتشولي"
      ]
    },
    "fragranceFamily": "oriental",
    "rating": 4.7,
    "reviewsCount": 28,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-08T13:15:51.913Z"
  },
  {
    "id": "1-million-royal-101",
    "name": "ون مليون رويال / جولد | 1 Million Royal",
    "brand": "باكو رابان (Paco Rabanne)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "تعبير ملكي جديد عن القوة والتميز، توليفة خشبية فاخرة تبتعد عن السكرية المفرطة لصالح الأناقة.",
    "image": "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "حب الهيل",
        "اليوسفي",
        "البرغموت"
      ],
      "heart": [
        "الخزامى الفرنسي",
        "المريمية",
        "أوراق البنفسج"
      ],
      "base": [
        "البنزوين",
        "خشب الأرز",
        "الباتشولي"
      ]
    },
    "fragranceFamily": "woody",
    "rating": 4.8,
    "reviewsCount": 35,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-08T12:15:51.913Z"
  },
  {
    "id": "one-man-show-102",
    "name": "ون مان شو | One Man Show",
    "brand": "جاك بوغارت (Jacques Bogart)",
    "gender": "men",
    "concentration": "Eau de Toilette",
    "description": "العطر الكلاسيكي العريق للجيل الذهبي، رائحة خشبية خضراء حادة ترمز إلى الرجولة التقليدية الراسخة.",
    "image": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الريحان",
        "البرغموت",
        "الشيح",
        "الكراوية",
        "الجلبانوم"
      ],
      "heart": [
        "إبر الصنوبر",
        "القرنفل",
        "جوزة الطيب",
        "الباتشولي",
        "الياسمين"
      ],
      "base": [
        "طحلب البلوط",
        "الجلود",
        "أخشاب الأرز",
        "العنبر",
        "خشب الصندل"
      ]
    },
    "fragranceFamily": "woody",
    "rating": 4.9,
    "reviewsCount": 42,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-08T11:15:51.913Z"
  },
  {
    "id": "pure-xs-103",
    "name": "بيور إكس إس | Pure XS",
    "brand": "باكو رابان (Paco Rabanne)",
    "gender": "men",
    "concentration": "Eau de Toilette",
    "description": "تناقض حارق وبارد في آن واحد، إحساس حسي لا يقاوم يجمع بين برودة الزنجبيل وحرارة الفانيليا والخمور الفاخرة.",
    "image": "https://images.unsplash.com/photo-1615396899839-c99c121888b0?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الزنجبيل المثلج",
        "الماندرين الأخضر",
        "الزعتر",
        "البرغموت"
      ],
      "heart": [
        "الفانيليا",
        "الليكيور",
        "القرفة",
        "الجلود"
      ],
      "base": [
        "المر",
        "السكر",
        "خشب الأرز",
        "الباتشولي",
        "الكشميران"
      ]
    },
    "fragranceFamily": "oriental",
    "rating": 5,
    "reviewsCount": 49,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-08T10:15:51.913Z"
  },
  {
    "id": "black-xs-l-exces-104",
    "name": "بلاك إكس إس لكزيس | Black XS L'Exces",
    "brand": "باكو رابان (Paco Rabanne)",
    "gender": "men",
    "concentration": "Eau de Toilette",
    "description": "عطر الروك آند رول المفعم بالطاقة والحيوية، حمضيات متفجرة مع لمسة باتشولي داكنة.",
    "image": "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "ليمون أمالفي",
        "الخزامى المنعشة"
      ],
      "heart": [
        "أوزيليا (نغمات بحرية خضراء)",
        "السرو"
      ],
      "base": [
        "الباتشولي",
        "خشب العنبر"
      ]
    },
    "fragranceFamily": "woody",
    "rating": 4.7,
    "reviewsCount": 56,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-08T09:15:51.913Z"
  },
  {
    "id": "y-eau-de-parfum-107",
    "name": "إيف سان لوران واي أو دو بارفيوم | Y Eau de Parfum",
    "brand": "إيف سان لوران (Yves Saint Laurent)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "العطر الأزرق الأكثر تكاملاً وجاذبية للرجل الطموح، انتعاش نظيف وقاعدة خشبية عنبرية تدوم طويلاً.",
    "image": "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "التفاح الأخضر الهش",
        "الزنجبيل",
        "البرغموت"
      ],
      "heart": [
        "المريمية",
        "توت العرعر",
        "إبرة الراعي"
      ],
      "base": [
        "خشب العنبر",
        "التونكا",
        "خشب الأرز",
        "اللبان",
        "نجيل الهند"
      ]
    },
    "fragranceFamily": "woody",
    "rating": 5,
    "reviewsCount": 77,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-08T08:15:51.913Z"
  },
  {
    "id": "212-sexy-men-metal-cap-108",
    "name": "212 سكسي مين (نبيتي غطاء مغناطيس) | 212 Sexy Men Metal Cap",
    "brand": "كارولينا هيريرا (Carolina Herrera)",
    "gender": "men",
    "concentration": "Eau de Toilette",
    "description": "النسخة المغناطيسية الفاخرة من 212 سكسي مين، عطر غامض وجذاب يجسد أضواء ليالي مانهاتن الدافئة.",
    "image": "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 450,
        "originalPrice": 550,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الماندرين",
        "البرغموت",
        "أوراق خضراء"
      ],
      "heart": [
        "حب الهيل",
        "الفلفل",
        "بتلات الزهور"
      ],
      "base": [
        "الفانيليا",
        "خشب الغاياك",
        "خشب الصندل",
        "العنبر",
        "المسك"
      ]
    },
    "fragranceFamily": "oriental",
    "rating": 4.7,
    "reviewsCount": 84,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-08T07:15:51.913Z"
  },
  {
    "id": "212-vip-black-109",
    "name": "212 في آي بي بلاك | 212 VIP Black",
    "brand": "كارولينا هيريرا (Carolina Herrera)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "عطر الحفلات الحصرية والجاذبية المطلقة، افتتاحية مسكرة ومبتكرة من الأفسنتين تليها فانيليا ساحرة.",
    "image": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 400,
        "originalPrice": 500,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الأفسنتين (Absinthe)",
        "اليانسون",
        "الشمر"
      ],
      "heart": [
        "الخزامى الفرنسي الفاخر"
      ],
      "base": [
        "الفانيليا السوداء",
        "المسك الداكن"
      ]
    },
    "fragranceFamily": "oriental",
    "rating": 4.8,
    "reviewsCount": 91,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-08T06:15:51.913Z"
  },
  {
    "id": "212-vip-men-silver-110",
    "name": "212 في آي بي مين فضي | 212 VIP Men Silver",
    "brand": "كارولينا هيريرا (Carolina Herrera)",
    "gender": "men",
    "concentration": "Eau de Toilette",
    "description": "عطر الشخصيات المهمة، زجاجة فضية فاخرة تعكس أجواء احتفالات نيويورك بنكهات الكوكتيلات الراقية والأخشاب.",
    "image": "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 400,
        "originalPrice": 500,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الليمون الكافيار",
        "الماراكويا",
        "الزنجبيل",
        "الفلفل الأسود"
      ],
      "heart": [
        "الفودكا",
        "الجين",
        "النعناع المنعش",
        "التوابل"
      ],
      "base": [
        "العنبر",
        "الجلود",
        "خشب الكينغ وود"
      ]
    },
    "fragranceFamily": "woody",
    "rating": 4.9,
    "reviewsCount": 28,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-08T05:15:51.913Z"
  },
  {
    "id": "armani-code-profumo-114",
    "name": "أرماني كود بروفيومو / أبسولو (عسلي) | Armani Code Profumo",
    "brand": "جورجيو أرماني (Giorgio Armani)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "عطر الجاذبية المغناطيسية والبدلة الرسمية الفاخرة، مزيج عنبري عسلي عميق مع التونكا والهيل.",
    "image": "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "حب الهيل",
        "الماندرين الأخضر",
        "التفاح الأخضر"
      ],
      "heart": [
        "جوزة الطيب",
        "الخزامى",
        "براعم البرتقال"
      ],
      "base": [
        "حبوب التونكا",
        "العنبر العسلي الدافئ",
        "الجلود"
      ]
    },
    "fragranceFamily": "oriental",
    "rating": 4.9,
    "reviewsCount": 56,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-08T04:15:51.913Z"
  },
  {
    "id": "acqua-di-gio-profumo-115",
    "name": "أكوا دي جيو بروفومو (أسود) | Acqua Di Gio Profumo",
    "brand": "جورجيو أرماني (Giorgio Armani)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "التقاء أمواج البحر العاتية بالصخور البركانية السوداء، عطر أيقوني يجمع بين الانتعاش البحري وفخامة البخور.",
    "image": "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الروائح البحرية",
        "البرغموت المنعش"
      ],
      "heart": [
        "إكليل الجبل (الروزماري)",
        "المريمية",
        "إبرة الراعي"
      ],
      "base": [
        "البخور المدخن الفاخر",
        "الباتشولي"
      ]
    },
    "fragranceFamily": "fresh",
    "rating": 5,
    "reviewsCount": 63,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-08T03:15:51.913Z"
  },
  {
    "id": "acqua-di-gio-profondo-116",
    "name": "أكوا دي جيو بروفوندو (أزرق) | Acqua Di Gio Profondo",
    "brand": "جورجيو أرماني (Giorgio Armani)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "غوص عميق في زرقة المحيطات، انتعاش حاد ونقي يمنحك شعوراً فورياً بالنشاط والانتعاش الفاخر.",
    "image": "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "النوتات البحرية الأوزونية",
        "الماندرين الأخضر",
        "البرغموت"
      ],
      "heart": [
        "إكليل الجبل",
        "الخزامى",
        "السرو",
        "المستكة"
      ],
      "base": [
        "المسك المعدني",
        "الباتشولي",
        "العنبر"
      ]
    },
    "fragranceFamily": "fresh",
    "rating": 4.7,
    "reviewsCount": 70,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-08T02:15:51.913Z"
  },
  {
    "id": "acqua-di-gio-edp-117",
    "name": "أكوا دي جيو أو دو بارفيوم | Acqua Di Gio EDP",
    "brand": "جورجيو أرماني (Giorgio Armani)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "إعادة صياغة حديثة ومستدامة للأيقونة أكوا دي جيو، بثبات مضاعف ونقاء طبيعي استثنائي.",
    "image": "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "النوتات البحرية",
        "الماندرين الأخضر"
      ],
      "heart": [
        "الميرمية",
        "إبرة الراعي",
        "الخزامى"
      ],
      "base": [
        "الباتشولي",
        "نجيل الهند",
        "أخشاب الأرز"
      ]
    },
    "fragranceFamily": "fresh",
    "rating": 4.8,
    "reviewsCount": 77,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-08T01:15:51.913Z"
  },
  {
    "id": "dior-homme-intense-118",
    "name": "ديور هوم إنتنس | Dior Homme Intense",
    "brand": "ديور (Dior)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "قمة الأناقة والرقي المخملي، عطر السوسن الأسطوري الذي يعشقه الملايين، مناسب للسهرات والمناسبات الكبرى.",
    "image": "https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الخزامى التوسكاني"
      ],
      "heart": [
        "السوسن التوسكاني البودري الفاخر",
        "الأمبريت (مسك الملوخية)",
        "الكمثرى"
      ],
      "base": [
        "خشب الأرز الفرجيني",
        "نجيل الهند"
      ]
    },
    "fragranceFamily": "woody",
    "rating": 4.9,
    "reviewsCount": 84,
    "isFeatured": true,
    "isNew": false,
    "createdAt": "2026-10-08T00:15:51.913Z"
  },
  {
    "id": "dior-homme-intense-metal-cap-119",
    "name": "ديور هوم إنتنس (غطاء معدن) | Dior Homme Intense Metal Cap",
    "brand": "ديور (Dior)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "الإصدار المتميز بغطاء معدني وجودة استثنائية تحاكي الباتشات الأولى من ديور هوم إنتنس الخالدة.",
    "image": "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 450,
        "originalPrice": 550,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الخزامى المركز",
        "البرغموت"
      ],
      "heart": [
        "السوسن الفلورنسي المركز",
        "مسك الأمبريت"
      ],
      "base": [
        "خشب الأرز",
        "نجيل الهند",
        "الجلود الناعمة"
      ]
    },
    "fragranceFamily": "woody",
    "rating": 5,
    "reviewsCount": 91,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-07T23:15:51.913Z"
  },
  {
    "id": "valentino-uomo-130",
    "name": "فالنتينو أومو | Valentino Uomo",
    "brand": "فالنتينو (Valentino)",
    "gender": "men",
    "concentration": "Eau de Toilette",
    "description": "سحر الأرستقراطية الإيطالية في روما، عطر دافئ يفيض برائحة البندق والشوكولاتة الإيطالية والجلود الناعمة.",
    "image": "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "البرغموت",
        "نبات الآس"
      ],
      "heart": [
        "الشوكولاتة",
        "حبوب البن المحمصة",
        "كريمة البندق"
      ],
      "base": [
        "الجلود البيضاء الفاخرة",
        "خشب الأرز"
      ]
    },
    "fragranceFamily": "oriental",
    "rating": 4.9,
    "reviewsCount": 28,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-07T22:15:51.913Z"
  },
  {
    "id": "valentino-uomo-intense-133",
    "name": "فالنتينو أومو إنتنس | Valentino Uomo Intense",
    "brand": "فالنتينو (Valentino)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "أحد أجمل عطور السوسن والجلود على الإطلاق، يعكس هيبة البدلة السوداء والأناقة الساحرة في المناسبات المسائية.",
    "image": "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "زيت الماندرين",
        "المريمية المتصلبة"
      ],
      "heart": [
        "السوسن البودري الفاخر",
        "حبوب التونكا"
      ],
      "base": [
        "الجلود السوداء",
        "الفانيليا"
      ]
    },
    "fragranceFamily": "floral",
    "rating": 4.8,
    "reviewsCount": 49,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-07T21:15:51.913Z"
  },
  {
    "id": "carolina-herrera-bad-boy-134",
    "name": "كارولينا هيريرا باد بوي | Carolina Herrera Bad Boy",
    "brand": "كارولينا هيريرا (Carolina Herrera)",
    "gender": "men",
    "concentration": "Eau de Toilette",
    "description": "عطر الصاعقة الجريء، يعبر عن ازدواجية الرجل العصري الواثق الذي يجمع بين القوة الرصينة والرقة الجذابة.",
    "image": "https://images.unsplash.com/photo-1615396899839-c99c121888b0?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 400,
        "originalPrice": 500,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الفلفل الأبيض",
        "الفلفل الأسود",
        "البرغموت الإيطالي"
      ],
      "heart": [
        "خشب الأرز",
        "المريمية"
      ],
      "base": [
        "حبوب التونكا",
        "الكاكاو الداكن",
        "خشب العنبر"
      ]
    },
    "fragranceFamily": "oriental",
    "rating": 4.9,
    "reviewsCount": 56,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-07T20:15:51.913Z"
  },
  {
    "id": "amouage-interlude-man-142",
    "name": "أمواج إنترلود مان | Amouage Interlude Man",
    "brand": "أمواج (Amouage)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "الملقب بـ 'الوحش الأزرق'، عطر الملوك والصلابة الشرقية، إعصار من البخور والجلود والراتنجات بثبات يدوم أياماً.",
    "image": "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 400,
        "originalPrice": 500,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الأوريغانو (الزعتر البري)",
        "الفلفل الحلو",
        "البرغموت"
      ],
      "heart": [
        "البخور العماني",
        "الجاوي",
        "القريضة",
        "العنبر"
      ],
      "base": [
        "الجلود المدخنة",
        "العود",
        "الباتشولي",
        "خشب الصندل"
      ]
    },
    "fragranceFamily": "woody",
    "rating": 4.9,
    "reviewsCount": 42,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-07T19:15:51.913Z"
  },
  {
    "id": "his-confession-regular-box-145",
    "name": "هيز كونفيشن (بوكس عادي) | His Confession Regular Box",
    "brand": "لطافة (Lattafa)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "عطر رجالي ساحر من لطافة يحاكي أفخم العطور النيشية الشتوية بتركيبة غنية من التوابل والأخشاب والفانيليا.",
    "image": "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 450,
        "originalPrice": 550,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "القرفة",
        "الخزامى",
        "اليوسفي"
      ],
      "heart": [
        "البنزوين",
        "الباتشولي",
        "الأرز"
      ],
      "base": [
        "الفانيليا",
        "العنبر",
        "التونكا",
        "اللبان"
      ]
    },
    "fragranceFamily": "woody",
    "rating": 4.8,
    "reviewsCount": 63,
    "isFeatured": false,
    "isNew": true,
    "createdAt": "2026-10-07T18:15:51.913Z"
  },
  {
    "id": "his-confession-original-box-146",
    "name": "هيز كونفيشن (بوكس أوريجينال) | His Confession Original Box",
    "brand": "لطافة (Lattafa)",
    "gender": "men",
    "concentration": "Parfum Extrait",
    "description": "الإصدار الأصلي الكامل بالعلبة الملكية الفاخرة من هيز كونفيشن، فخامة مطلقة وأداء فائق للمناسبات الخاصة والهدايا الراقية.",
    "image": "https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 1000,
        "originalPrice": 1100,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "القرفة الفاخرة",
        "الخزامى المنقى",
        "اليوسفي"
      ],
      "heart": [
        "البنزوين",
        "الباتشولي الإندونيسي",
        "السوسن"
      ],
      "base": [
        "فانيليا بوربون",
        "العنبر الأسود",
        "خشب الأرز"
      ]
    },
    "fragranceFamily": "woody",
    "rating": 4.9,
    "reviewsCount": 70,
    "isFeatured": false,
    "isNew": true,
    "createdAt": "2026-10-07T17:15:51.913Z"
  },
  {
    "id": "dior-fahrenheit-149",
    "name": "ديور فهرنهايت | Dior Fahrenheit",
    "brand": "ديور (Dior)",
    "gender": "men",
    "concentration": "Eau de Toilette",
    "description": "الأسطورة الثورية التي لا تشبه أي عطر آخر. نوتة الجلود والوقود المتوازنة بأوراق البنفسج تجسد التميز والشخصية الفريدة.",
    "image": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "أزهار جوزة الطيب",
        "الخزامى",
        "أرز",
        "الماندرين",
        "البابونج",
        "الزعرور",
        "البرغموت"
      ],
      "heart": [
        "أوراق البنفسج",
        "جوزة الطيب",
        "خشب الأرز",
        "خشب الصندل",
        "زهر القرنفل"
      ],
      "base": [
        "الجلود",
        "نجيل الهند",
        "المسك",
        "العنبر",
        "الباتشولي",
        "التونكا"
      ]
    },
    "fragranceFamily": "oriental",
    "rating": 4.8,
    "reviewsCount": 91,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-07T16:15:51.913Z"
  },
  {
    "id": "givenchy-gentleman-152",
    "name": "جيفنشي جنتلمان | Givenchy Gentleman",
    "brand": "جيفنشي (Givenchy)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "عطر الرجل النبيل صاحب الحضور الكلاسيكي الدافئ، السوسن مع الفلفل الأسود والفانيليا البلسمية يقدمان توليفة مخملية لا تُقاوم.",
    "image": "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الفلفل الأسود",
        "الخزامى",
        "البرغموت"
      ],
      "heart": [
        "السوسن",
        "القرفة",
        "القرنفل"
      ],
      "base": [
        "الفانيليا السوداء",
        "بلسم التولو",
        "التونكا",
        "الجلود",
        "الباتشولي"
      ]
    },
    "fragranceFamily": "woody",
    "rating": 4.7,
    "reviewsCount": 42,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-07T15:15:51.913Z"
  },
  {
    "id": "afnan-9-pm-plastic-cap-160",
    "name": "أفنان 9 بي إم (غطاء بلاستيك) | Afnan 9 PM Plastic Cap",
    "brand": "أفنان (Afnan)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "عطر السهرات الأشهر والأكثر شعبية، بديل أسطوري لعطر ألترا ميل بفوحان خارق ورائحة تفاحية فانيلا ساحرة.",
    "image": "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 450,
        "originalPrice": 550,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "التفاح",
        "القرفة",
        "الخزامى البرية",
        "البرغموت"
      ],
      "heart": [
        "زهر البرتقال",
        "زنبق الوادي"
      ],
      "base": [
        "الفانيليا",
        "التونكا",
        "العنبر",
        "خشب الأرز"
      ]
    },
    "fragranceFamily": "oriental",
    "rating": 4.7,
    "reviewsCount": 28,
    "isFeatured": true,
    "isNew": false,
    "createdAt": "2026-10-07T14:15:51.913Z"
  },
  {
    "id": "afnan-9-pm-metal-cap-161",
    "name": "أفنان 9 بي إم (غطاء معدن) | Afnan 9 PM Metal Cap",
    "brand": "أفنان (Afnan)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "إصدار الغطاء المعدني الثقيل المميز بأعلى جودة وثبات، للمزيد من الفخامة والفوحان طويل الأمد.",
    "image": "https://images.unsplash.com/photo-1615396899839-c99c121888b0?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 500,
        "originalPrice": 600,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "التفاح الأخضر المنعش",
        "القرفة السيلانية",
        "اللافندر"
      ],
      "heart": [
        "زهر البرتقال",
        "التوابل الدافئة"
      ],
      "base": [
        "الفانيليا المركزة",
        "العنبر",
        "حبوب التونكا",
        "الأرز"
      ]
    },
    "fragranceFamily": "oriental",
    "rating": 4.8,
    "reviewsCount": 35,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-07T13:15:51.913Z"
  },
  {
    "id": "afnan-9-pm-rebel-elixir-162",
    "name": "أفنان 9 بي إم إكسير / ريبيل | Afnan 9 PM Rebel / Elixir",
    "brand": "أفنان (Afnan)",
    "gender": "men",
    "concentration": "Parfum Extrait",
    "description": "الإصدار الأحدث والأكثر تميزاً في عائلة 9 بي إم، توليفة استوائية غورماند تجمع بين طاقة الأناناس وحلاوة الكراميل.",
    "image": "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 450,
        "originalPrice": 550,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الأناناس",
        "التفاح",
        "البرغموت"
      ],
      "heart": [
        "الخزامى",
        "الكراميل",
        "طحلب البلوط"
      ],
      "base": [
        "الفانيليا",
        "العنبر",
        "الأخشاب الجافة"
      ]
    },
    "fragranceFamily": "woody",
    "rating": 4.9,
    "reviewsCount": 42,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-07T12:15:51.913Z"
  },
  {
    "id": "private-barrel-assaf-167",
    "name": "برايفت باريل عساف | Private Barrel Assaf",
    "brand": "عساف (Assaf)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "مستوحى من عراقة البراميل الخشبية المعتقة، عطر أرستقراطي مهيب يليق بالرجل صاحب الذوق الكلاسيكي الرفيع.",
    "image": "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 500,
        "originalPrice": 600,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الروم المعتق",
        "البرغموت",
        "الفلفل الأسود"
      ],
      "heart": [
        "خشب البلوط",
        "القرفة",
        "التبغ النبيل"
      ],
      "base": [
        "الفانيليا البوربون",
        "خشب الأرز",
        "العنبر الداكن"
      ]
    },
    "fragranceFamily": "woody",
    "rating": 5,
    "reviewsCount": 77,
    "isFeatured": false,
    "isNew": true,
    "createdAt": "2026-10-07T11:15:51.913Z"
  },
  {
    "id": "sherlock-assaf-168",
    "name": "شيرلوك عساف | Sherlock Assaf",
    "brand": "عساف (Assaf)",
    "gender": "men",
    "concentration": "Eau de Parfum",
    "description": "عطر الغموض والذكاء الحاد المستوحى من الشخصية الشهيرة شيرلوك هولمز، توليفة شتوية دافئة تفيض بالهيبة والتفرد.",
    "image": "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "100 مل",
        "price": 500,
        "originalPrice": 600,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الزعفران",
        "الفلفل الأسود",
        "الهيل"
      ],
      "heart": [
        "التبغ الإنجليزي الفاخر",
        "الجلود",
        "الباتشولي"
      ],
      "base": [
        "العود",
        "خشب الصندل",
        "العنبر القديم"
      ]
    },
    "fragranceFamily": "oriental",
    "rating": 4.7,
    "reviewsCount": 84,
    "isFeatured": false,
    "isNew": true,
    "createdAt": "2026-10-07T10:15:51.913Z"
  }
,
  {
    "id": "miss-dior-blooming",
    "name": "ميس ديور بلومينغ بوكيه | Miss Dior Blooming Bouquet",
    "brand": "كريستيان ديور (Christian Dior)",
    "gender": "women",
    "concentration": "Eau de Parfum",
    "description": "أيقونة الأنوثة الفرنسية الرقيقة. باقة زهرية منعشة من الورد الدمشقي والفاوانيا المتفتحة مع لمسة برغموت كالابريا ودفء المسك الأبيض.",
    "image": "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "50 مل",
        "price": 200,
        "originalPrice": 300,
        "inStock": true
      },
      {
        "size": "100 مل",
        "price": 450,
        "originalPrice": 550,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "البرغموت الكالابري",
        "اليوسفي الصقلي"
      ],
      "heart": [
        "الورد الدمشقي الوردي",
        "الفاوانيا الوردية",
        "المشمش",
        "الخوخ"
      ],
      "base": [
        "المسك الأبيض الحريري",
        "الباتشولي الإندونيسي"
      ]
    },
    "fragranceFamily": "floral",
    "rating": 4.9,
    "reviewsCount": 142,
    "isFeatured": true,
    "isNew": true,
    "createdAt": "2026-10-10T11:48:22.771Z"
  },
  {
    "id": "coco-mademoiselle",
    "name": "كوكو مادموزيل | Chanel Coco Mademoiselle",
    "brand": "شانيل (Chanel)",
    "gender": "women",
    "concentration": "Eau de Parfum",
    "description": "جوهر المرأة المستقلة والساحرة. افتتاحية برتقالية نضرة تقود إلى قلب أنثوي من الياسمين والورد التركي مع قاعدة غنية بالباتشولي والفانيليا الفاخرة.",
    "image": "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "50 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      },
      {
        "size": "100 مل",
        "price": 500,
        "originalPrice": 600,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "البرتقال",
        "المندرين",
        "زهر البرتقال",
        "البرغموت"
      ],
      "heart": [
        "الميموزا",
        "الياسمين",
        "الورد التركي",
        "الإيلنغ"
      ],
      "base": [
        "الباتشولي",
        "حبوب التونكا",
        "الفانيليا",
        "المسك الأبيض",
        "نجيل الهند"
      ]
    },
    "fragranceFamily": "oriental",
    "rating": 5,
    "reviewsCount": 289,
    "isFeatured": true,
    "isNew": false,
    "createdAt": "2026-10-10T11:48:22.771Z"
  },
  {
    "id": "ysl-libre-intense",
    "name": "إيف سان لوران ليبر إنتنس | YSL Libre Intense",
    "brand": "إيف سان لوران (Yves Saint Laurent)",
    "gender": "women",
    "concentration": "Eau de Parfum",
    "description": "عطر الحرية والجرأة للمرأة القوية الواثقة. مزيج فريد ومبتكر يجمع بين اللافندر الفرنسي وزهر البرتقال المغربي الحسي المغلف بفانيليا مدغشقر.",
    "image": "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "50 مل",
        "price": 200,
        "originalPrice": 300,
        "inStock": true
      },
      {
        "size": "100 مل",
        "price": 450,
        "originalPrice": 550,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "اللافندر الفرنسي",
        "المندرين",
        "البرغموت"
      ],
      "heart": [
        "زهر البرتقال التونسي",
        "ياسمين السامباك",
        "أوركيد الكاتليا"
      ],
      "base": [
        "فانيليا مدغشقر",
        "حبوب التونكا",
        "العنبر الكريستالي",
        "نجيل الهند"
      ]
    },
    "fragranceFamily": "floral",
    "rating": 4.9,
    "reviewsCount": 198,
    "isFeatured": true,
    "isNew": true,
    "createdAt": "2026-10-10T11:48:22.771Z"
  },
  {
    "id": "la-vie-est-belle",
    "name": "لا في إيه بيل | Lancôme La Vie Est Belle",
    "brand": "لانكوم (Lancôme)",
    "gender": "women",
    "concentration": "Eau de Parfum",
    "description": "عطر الحياة الجميلة والسعادة المطلقة. مزيج سكري زهري ناعم من السوسن الفلورنسي الفاخر مع الفانيليا وحلوى البرالين المغرية.",
    "image": "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "50 مل",
        "price": 200,
        "originalPrice": 300,
        "inStock": true
      },
      {
        "size": "100 مل",
        "price": 450,
        "originalPrice": 550,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الكشمش الأسود",
        "الكمثرى الناضجة"
      ],
      "heart": [
        "السوسن الفلورنسي",
        "الياسمين",
        "زهر البرتقال"
      ],
      "base": [
        "حلوى البرالين",
        "الفانيليا",
        "الباتشولي",
        "حبوب التونكا"
      ]
    },
    "fragranceFamily": "floral",
    "rating": 4.8,
    "reviewsCount": 165,
    "isFeatured": true,
    "isNew": false,
    "createdAt": "2026-10-10T11:48:22.771Z"
  },
  {
    "id": "good-girl-carolina",
    "name": "كارولينا هيريرا جود جيرل | Good Girl",
    "brand": "كارولينا هيريرا (Carolina Herrera)",
    "gender": "women",
    "concentration": "Eau de Parfum",
    "description": "العطر المغري والغامض للمرأة العصرية. ثنائية مذهلة تجمع بين الضوء الأبيض لمسك الروم والياسمين مع ظلمة الكاكاو المحمص وحبوب التونكا.",
    "image": "https://images.unsplash.com/photo-1594913785162-e678a0c23ee9?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "50 مل",
        "price": 200,
        "originalPrice": 300,
        "inStock": true
      },
      {
        "size": "100 مل",
        "price": 450,
        "originalPrice": 550,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "اللوز المحمص",
        "القهوة",
        "البرغموت",
        "الليمون"
      ],
      "heart": [
        "مسك الروم",
        "ياسمين سامباك",
        "زهر البرتقال",
        "السوسن"
      ],
      "base": [
        "حبوب التونكا",
        "الكاكاو",
        "الفانيليا",
        "حلوى البرالين",
        "خشب الصندل"
      ]
    },
    "fragranceFamily": "oriental",
    "rating": 4.9,
    "reviewsCount": 220,
    "isFeatured": true,
    "isNew": false,
    "createdAt": "2026-10-10T11:48:22.771Z"
  },
  {
    "id": "good-girl-blush",
    "name": "جود جيرل بلش | Good Girl Blush",
    "brand": "كارولينا هيريرا (Carolina Herrera)",
    "gender": "women",
    "concentration": "Eau de Parfum",
    "description": "إعادة ابتكار رومانسية مبهجة لعطر جود جيرل الشهير. انفجار من الفاوانيا وماء الورد مع أنوثة الإيلنغ والفانيليا الباودرية الرقيقة.",
    "image": "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "50 مل",
        "price": 200,
        "originalPrice": 300,
        "inStock": true
      },
      {
        "size": "100 مل",
        "price": 450,
        "originalPrice": 550,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "البرغموت الإيطالي",
        "الماندرين",
        "اللوز المر"
      ],
      "heart": [
        "الفاوانيا الوردية",
        "الإيلنغ الإيلنغ",
        "ماء الورد"
      ],
      "base": [
        "الفانيليا الحسية",
        "حبوب التونكا"
      ]
    },
    "fragranceFamily": "floral",
    "rating": 4.8,
    "reviewsCount": 94,
    "isFeatured": false,
    "isNew": true,
    "createdAt": "2026-10-10T11:48:22.771Z"
  },
  {
    "id": "delina-marly",
    "name": "بارفيومز دي مارلي ديلينا | Delina Parfums de Marly",
    "brand": "بارفيومز دي مارلي (Parfums de Marly)",
    "gender": "women",
    "concentration": "Parfum Extrait",
    "description": "عطر الأنوثة الملكية الفاخرة والأكثر شهرة في عالم عطور النيش. باقة وردية مخملية من الورد التركي والليتشي والراوند مع الفانيليا الناعمة.",
    "image": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "50 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      },
      {
        "size": "100 مل",
        "price": 500,
        "originalPrice": 600,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الليتشي",
        "الراوند",
        "البرغموت",
        "جوزة الطيب"
      ],
      "heart": [
        "الورد التركي المخملي",
        "الفاوانيا",
        "المسك",
        "البتالية"
      ],
      "base": [
        "أخشاب الكشمير",
        "خشب الأرز",
        "البخور",
        "الفانيليا"
      ]
    },
    "fragranceFamily": "floral",
    "rating": 5,
    "reviewsCount": 310,
    "isFeatured": true,
    "isNew": true,
    "createdAt": "2026-10-10T11:48:22.771Z"
  },
  {
    "id": "delina-exclusif",
    "name": "ديلينا إكسكلوسيف | Delina Exclusif",
    "brand": "بارفيومز دي مارلي (Parfums de Marly)",
    "gender": "women",
    "concentration": "Parfum Extrait",
    "description": "نسخة أكثر تركيزاً وعمقاً وسحراً من ديلينا الملكي. نفحات دخانية خفيفة من البخور والعود تعانق الورد التركي والعنبر لإطلالة ليلية مبهرة.",
    "image": "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "50 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      },
      {
        "size": "100 مل",
        "price": 500,
        "originalPrice": 600,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الكمثرى",
        "الليتشي",
        "الجريب فروت"
      ],
      "heart": [
        "الورد التركي",
        "البخور",
        "العود"
      ],
      "base": [
        "الفانيليا",
        "العنبر",
        "الأخشاب الفاخرة"
      ]
    },
    "fragranceFamily": "oriental",
    "rating": 5,
    "reviewsCount": 175,
    "isFeatured": false,
    "isNew": true,
    "createdAt": "2026-10-10T11:48:22.771Z"
  },
  {
    "id": "lost-cherry-tf",
    "name": "توم فورد لوست تشيري | Tom Ford Lost Cherry",
    "brand": "توم فورد (Tom Ford)",
    "gender": "women",
    "concentration": "Eau de Parfum",
    "description": "رحلة حسية شهية ومترفة إلى عالم الكرز الأسود المسكر الممزوج باللوز المر والليكور وقاعدة دافئة من حبوب التونكا وبلسم البيرو.",
    "image": "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "50 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      },
      {
        "size": "100 مل",
        "price": 500,
        "originalPrice": 600,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الكرز الأسود",
        "الليكور المسكر",
        "اللوز المر"
      ],
      "heart": [
        "الكرز الحامض",
        "البرقوق",
        "الورد التركي",
        "ياسمين سامباك"
      ],
      "base": [
        "الفانيليا",
        "حبوب التونكا",
        "بلسم البيرو",
        "القرفة",
        "خشب الصندل"
      ]
    },
    "fragranceFamily": "amber",
    "rating": 4.9,
    "reviewsCount": 184,
    "isFeatured": true,
    "isNew": true,
    "createdAt": "2026-10-10T11:48:22.771Z"
  },
  {
    "id": "black-opium-ysl",
    "name": "إيف سان لوران بلاك أوبيوم | YSL Black Opium",
    "brand": "إيف سان لوران (Yves Saint Laurent)",
    "gender": "women",
    "concentration": "Eau de Parfum",
    "description": "جرعة الأدرينالين والإثارة الليلية التي لا تُقاوم. التناقض الجذاب بين قوة القهوة السوداء الحيوية ونعومة الأزهار البيضاء مع الفانيليا الدافئة.",
    "image": "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "50 مل",
        "price": 200,
        "originalPrice": 300,
        "inStock": true
      },
      {
        "size": "100 مل",
        "price": 450,
        "originalPrice": 550,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الكمثرى",
        "الفلفل الوردي",
        "زهر البرتقال"
      ],
      "heart": [
        "القهوة السوداء المركزة",
        "الياسمين",
        "اللوز المر",
        "عرق السوس"
      ],
      "base": [
        "الفانيليا",
        "الباتشولي",
        "خشب الكشمير",
        "خشب الأرز"
      ]
    },
    "fragranceFamily": "oriental",
    "rating": 4.8,
    "reviewsCount": 245,
    "isFeatured": true,
    "isNew": false,
    "createdAt": "2026-10-10T11:48:22.771Z"
  },
  {
    "id": "si-passione-armani",
    "name": "جورجيو أرماني سي باسيوني | Giorgio Armani Sì Passione",
    "brand": "جورجيو أرماني (Giorgio Armani)",
    "gender": "women",
    "concentration": "Eau de Parfum",
    "description": "إشراقة الشغف والأنوثة الجريئة في زجاجة حمراء آسرة. يفتتح بالكشمش الأسود اللامع والفلفل الوردي مع قلب من الورد والياسمين وقاعدة فانيليا دافئة.",
    "image": "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "50 مل",
        "price": 200,
        "originalPrice": 300,
        "inStock": true
      },
      {
        "size": "100 مل",
        "price": 450,
        "originalPrice": 550,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الكمثرى",
        "الكشمش الأسود",
        "الفلفل الوردي",
        "الجريب فروت"
      ],
      "heart": [
        "الأناناس",
        "الورد الجوري",
        "الياسمين",
        "الهيليوتروب"
      ],
      "base": [
        "الفانيليا",
        "خشب الأرز",
        "خشب العنبر",
        "الباتشولي"
      ]
    },
    "fragranceFamily": "floral",
    "rating": 4.8,
    "reviewsCount": 132,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-10T11:48:22.771Z"
  },
  {
    "id": "scandal-jpg",
    "name": "جان بول غوتييه سكاندال | Jean Paul Gaultier Scandal",
    "brand": "جان بول غوتييه (Jean Paul Gaultier)",
    "gender": "women",
    "concentration": "Eau de Parfum",
    "description": "عطر الإغراء والعسل اللذيذ للمرأة الجريئة. نفحات منعشة من البرتقال الدموي تقود إلى قلب غني بالعسل الشهي والغاردينيا مع قاعدة عميقة من الباتشولي.",
    "image": "https://images.unsplash.com/photo-1594913785162-e678a0c23ee9?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "50 مل",
        "price": 200,
        "originalPrice": 300,
        "inStock": true
      },
      {
        "size": "100 مل",
        "price": 450,
        "originalPrice": 550,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "البرتقال الدموي",
        "المندرين"
      ],
      "heart": [
        "العسل الطبيعي",
        "الغاردينيا",
        "زهر البرتقال",
        "الخوخ"
      ],
      "base": [
        "شمع العسل",
        "الكراميل",
        "الباتشولي",
        "عرق السوس"
      ]
    },
    "fragranceFamily": "floral",
    "rating": 4.9,
    "reviewsCount": 187,
    "isFeatured": true,
    "isNew": false,
    "createdAt": "2026-10-10T11:48:22.771Z"
  },
  {
    "id": "narciso-for-her",
    "name": "نارسيسو رودريغيز فور هير الوردي | Narciso Rodriguez For Her",
    "brand": "نارسيسو رودريغيز (Narciso Rodriguez)",
    "gender": "women",
    "concentration": "Eau de Parfum",
    "description": "سحر المسك الأنثوي الحريري الأكثر نقاءً وجاذبية. يتألق بقلب من المسك النادر محاط بنفحات الورد والخوخ المخملي وقاعدة من الباتشولي وخشب الصندل.",
    "image": "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "50 مل",
        "price": 200,
        "originalPrice": 300,
        "inStock": true
      },
      {
        "size": "100 مل",
        "price": 450,
        "originalPrice": 550,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الورد الوردي الفاتن",
        "لب الخوخ المخملي"
      ],
      "heart": [
        "المسك الحريري النادر",
        "العنبر"
      ],
      "base": [
        "الباتشولي",
        "خشب الصندل"
      ]
    },
    "fragranceFamily": "floral",
    "rating": 4.9,
    "reviewsCount": 156,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-10T11:48:22.771Z"
  },
  {
    "id": "love-dont-be-shy",
    "name": "كيليان لوف دونت بي شاي | Kilian Love Don't Be Shy",
    "brand": "كيليان (Kilian)",
    "gender": "women",
    "concentration": "Eau de Parfum",
    "description": "عطر المارشملو والعسل والجاذبية التي لا تُقاوم. زهر البرتقال وزهر العسل يذوبان في حلاوة السكر والمارشملو وقاعدة الكراميل والفانيليا.",
    "image": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "50 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      },
      {
        "size": "100 مل",
        "price": 500,
        "originalPrice": 600,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "زهر البرتقال",
        "البرغموت",
        "الفلفل الوردي",
        "الكزبرة"
      ],
      "heart": [
        "زهر العسل",
        "السوسن",
        "الياسمين",
        "الورد"
      ],
      "base": [
        "المارشملو",
        "السكر المحمص",
        "الفانيليا",
        "الكراميل",
        "المسك"
      ]
    },
    "fragranceFamily": "floral",
    "rating": 5,
    "reviewsCount": 260,
    "isFeatured": true,
    "isNew": true,
    "createdAt": "2026-10-10T11:48:22.771Z"
  },
  {
    "id": "flowerbomb-vr",
    "name": "فيكتور آند رولف فلاور بومب | Viktor&Rolf Flowerbomb",
    "brand": "فيكتور آند رولف (Viktor&Rolf)",
    "gender": "women",
    "concentration": "Eau de Parfum",
    "description": "انفجار مذهل من أزهار الربيع الفاتنة في عطر واحد. يجمع بين آلاف البتلات من الياسمين السامباك، أوركيد الكاتليا، والورد الجوري مع هدوء الباتشولي.",
    "image": "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "50 مل",
        "price": 200,
        "originalPrice": 300,
        "inStock": true
      },
      {
        "size": "100 مل",
        "price": 450,
        "originalPrice": 550,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الشاي",
        "البرغموت",
        "الأوسمانثوس"
      ],
      "heart": [
        "أوركيد الكاتليا",
        "ياسمين السامباك",
        "الفريزيا",
        "الورد الجوري"
      ],
      "base": [
        "الباتشولي",
        "المسك",
        "الفانيليا"
      ]
    },
    "fragranceFamily": "floral",
    "rating": 4.8,
    "reviewsCount": 140,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-10T11:48:22.771Z"
  },
  {
    "id": "bright-crystal-versace",
    "name": "فيرساتشي برايت كريستال أبسولو | Versace Bright Crystal Absolu",
    "brand": "فيرساتشي (Versace)",
    "gender": "women",
    "concentration": "Eau de Parfum",
    "description": "الجوهرة المشرقة المنعشة. مزيج بلوري نقي من حبات الرمان المثلج واليوزو المضيء مع رقة الماغنوليا والفاوانيا وزهر اللوتس الساحر.",
    "image": "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "50 مل",
        "price": 200,
        "originalPrice": 300,
        "inStock": true
      },
      {
        "size": "100 مل",
        "price": 400,
        "originalPrice": 500,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الرمان المثلج",
        "اليوزو الياباني",
        "نفحات الجليد"
      ],
      "heart": [
        "الفاوانيا",
        "توت العليق المشرق",
        "اللوتس",
        "الماغنوليا"
      ],
      "base": [
        "المسك الأبيض",
        "خشب الماهوجني",
        "العنبر"
      ]
    },
    "fragranceFamily": "fresh",
    "rating": 4.8,
    "reviewsCount": 110,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-10T11:48:22.771Z"
  },
  {
    "id": "mon-guerlain",
    "name": "غيرلان مون غيرلان | Guerlain Mon Guerlain",
    "brand": "غيرلان (Guerlain)",
    "gender": "women",
    "concentration": "Eau de Parfum",
    "description": "قصيدة للأنوثة المعاصرة. لقاء شاعري بين لافندر كارلا الاستثنائي وفانيليا تاهيتي الحسية مع رقة ياسمين السامباك ودفء خشب الصندل.",
    "image": "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "50 مل",
        "price": 200,
        "originalPrice": 300,
        "inStock": true
      },
      {
        "size": "100 مل",
        "price": 450,
        "originalPrice": 550,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "لافندر كارلا الفرنسي",
        "البرغموت"
      ],
      "heart": [
        "ياسمين سامباك",
        "السوسن",
        "الورد"
      ],
      "base": [
        "فانيليا تاهيتي",
        "خشب الصندل الأسترالي",
        "الكومارين",
        "البنزوين"
      ]
    },
    "fragranceFamily": "oriental",
    "rating": 4.9,
    "reviewsCount": 168,
    "isFeatured": false,
    "isNew": false,
    "createdAt": "2026-10-10T11:48:22.771Z"
  },
  {
    "id": "chance-eau-tendre",
    "name": "شانيل شانس أو تندر | Chanel Chance Eau Tendre",
    "brand": "شانيل (Chanel)",
    "gender": "women",
    "concentration": "Eau de Parfum",
    "description": "عطر الحظ والبهجة الأنثوية الراقية. تناغم رومانسي ناعم يجمع بين السفرجل المشرق والجريب فروت مع باقة الياسمين والياقوتية والمسك الأبيض.",
    "image": "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "50 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      },
      {
        "size": "100 مل",
        "price": 500,
        "originalPrice": 600,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "السفرجل",
        "الجريب فروت"
      ],
      "heart": [
        "الياقوتية",
        "الياسمين"
      ],
      "base": [
        "المسك الأبيض",
        "السوسن",
        "خشب الأرز",
        "العنبر"
      ]
    },
    "fragranceFamily": "floral",
    "rating": 4.9,
    "reviewsCount": 215,
    "isFeatured": true,
    "isNew": true,
    "createdAt": "2026-10-10T11:48:22.771Z"
  },
  {
    "id": "burberry-her-elixir",
    "name": "بيربري هير إكسير | Burberry Her Elixir",
    "brand": "بيربري (Burberry)",
    "gender": "women",
    "concentration": "Parfum",
    "description": "إكسير التوت والفراولة اللندني المترف. نفحات فاكهية حلوة وكريمية تذوب في الفانيليا والعنبر وخشب الصندل لحضور أنثوي شهي لا يُنسى.",
    "image": "https://images.unsplash.com/photo-1594913785162-e678a0c23ee9?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "50 مل",
        "price": 200,
        "originalPrice": 300,
        "inStock": true
      },
      {
        "size": "100 مل",
        "price": 450,
        "originalPrice": 550,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "الفراولة البرية",
        "توت العليق الأسود"
      ],
      "heart": [
        "الياسمين",
        "الورد"
      ],
      "base": [
        "الفانيليا الكريمة",
        "العنبر",
        "خشب الصندل"
      ]
    },
    "fragranceFamily": "floral",
    "rating": 4.8,
    "reviewsCount": 122,
    "isFeatured": false,
    "isNew": true,
    "createdAt": "2026-10-10T11:48:22.771Z"
  },
  {
    "id": "baccarat-rouge-540-ext",
    "name": "باكارات روج 540 إكستريت | Baccarat Rouge 540 Extrait",
    "brand": "ميزون فرانسيس كوركدجيان (MFK)",
    "gender": "women",
    "concentration": "Parfum Extrait",
    "description": "العطر الأيقوني الأكثر طلباً وفوحاناً في العالم. هالة كهرمانية ساحرة تجمع بين حلاوة السكر المغزول واللوز المر والزعفران والعنبر الحوتي النادر.",
    "image": "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
    "sizes": [
      {
        "size": "50 مل",
        "price": 350,
        "originalPrice": 450,
        "inStock": true
      },
      {
        "size": "100 مل",
        "price": 500,
        "originalPrice": 600,
        "inStock": true
      }
    ],
    "notes": {
      "top": [
        "اللوز المر المغربي",
        "الزعفران الإيراني النقي"
      ],
      "heart": [
        "ياسمين الغرانديفلوروم المصري",
        "خشب الأرز"
      ],
      "base": [
        "الآمبرغريس الفاخر (العنبر الحوتي)",
        "الأخشاب المسكية"
      ]
    },
    "fragranceFamily": "amber",
    "rating": 5,
    "reviewsCount": 390,
    "isFeatured": true,
    "isNew": true,
    "createdAt": "2026-10-10T11:48:22.771Z"
  }
];
