-- ===================================================
-- مخطط قاعدة بيانات Supabase لمتجر ORO PURO للعطور
-- ===================================================
-- انسخ هذا الكود بالكامل، وافتحه في لوحة تحكم Supabase:
-- من القائمة الجانبية: SQL Editor -> New Query -> الصق الكود -> اضغط Run
-- ===================================================

-- 1. جدول العطور والمنتجات (products)
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    gender TEXT NOT NULL CHECK (gender IN ('men', 'women', 'unisex')),
    concentration TEXT NOT NULL,
    description TEXT,
    image TEXT NOT NULL,
    sizes JSONB NOT NULL DEFAULT '[]'::jsonb,
    notes JSONB DEFAULT '{"top":[], "heart":[], "base":[]}'::jsonb,
    fragrance_family TEXT DEFAULT 'oriental',
    rating NUMERIC DEFAULT 5.0,
    reviews_count INTEGER DEFAULT 1,
    is_featured BOOLEAN DEFAULT false,
    is_new BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. جدول طلبات الزبائن (orders)
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    alternate_phone TEXT,
    governorate TEXT NOT NULL,
    city_address TEXT NOT NULL,
    notes TEXT,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    subtotal NUMERIC NOT NULL,
    shipping_fee NUMERIC NOT NULL DEFAULT 0,
    total NUMERIC NOT NULL,
    payment_method TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'processing', 'shipped', 'delivered', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. جدول إعدادات المتجر والدفع والشحن (settings)
CREATE TABLE IF NOT EXISTS public.settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    store_name TEXT NOT NULL DEFAULT 'Oro Puro | أورو بورو',
    store_tagline TEXT DEFAULT 'الذهب الخالص للعطور العالمية الأصلية',
    whatsapp_number TEXT NOT NULL DEFAULT '201012345678',
    vodafone_cash_number TEXT DEFAULT '01012345678',
    instapay_address TEXT DEFAULT 'oropuro@instapay',
    instapay_account_name TEXT DEFAULT 'Oro Puro Fragrances',
    free_shipping_threshold NUMERIC DEFAULT 1500,
    shipping_rates JSONB DEFAULT '{"cairoGiza":45, "alexandria":55, "deltaCanal":60, "upperEgypt":75}'::jsonb,
    admin_pin TEXT DEFAULT '1234'
);

-- 4. جدول تقييمات العملاء (reviews)
CREATE TABLE IF NOT EXISTS public.reviews (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    user_name TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ===================================================
-- بذر البيانات الأولية (Seed Data)
-- ===================================================

-- إدخال الإعدادات الافتراضية
INSERT INTO public.settings (id, store_name, store_tagline, whatsapp_number, vodafone_cash_number, instapay_address, instapay_account_name, free_shipping_threshold, shipping_rates, admin_pin)
VALUES (
    'default',
    'Oro Puro | أورو بورو',
    'الذهب الخالص للعطور العالمية الأصلية',
    '201012345678',
    '01012345678',
    'oropuro@instapay',
    'Oro Puro Fragrances',
    1500,
    '{"cairoGiza":45, "alexandria":55, "deltaCanal":60, "upperEgypt":75}'::jsonb,
    '1234'
)
ON CONFLICT (id) DO NOTHING;

-- إدخال العطور الملكية الأولية الفاخرة
INSERT INTO public.products (id, name, brand, gender, concentration, description, image, sizes, notes, fragrance_family, rating, reviews_count, is_featured, is_new)
VALUES 
(
    'oro-signature-01',
    'أورو بورو رويال إكسير | Oro Puro Royal Elixir',
    'Oro Puro Signature',
    'unisex',
    'Parfum Extrait',
    'تحفة عطرية استثنائية تجسد جوهر الذهب الخالص والفخامة الملكية. مزيج ساحر يجمع بين العود الكمبودي النادر ونفحات العنبر الكريستالي مع لمسة دافئة من الفانيليا الملكية وخشب الصندل.',
    '/images/perfume-sample-1.jpg',
    '[{"size": "50 مل", "price": 1850, "originalPrice": 2200, "inStock": true}, {"size": "100 مل", "price": 2950, "originalPrice": 3400, "inStock": true}]'::jsonb,
    '{"top": ["البرغموت الإيطالي", "الزعفران الملكي", "الهيل الفاخر"], "heart": ["العود الكمبودي", "الورد الجوري الدمشقي", "خشب الأرز"], "base": ["العنبر الذهبي", "المسك الأبيض", "الفانيليا الفاخرة", "الجلد الفاخر"]}'::jsonb,
    'oriental',
    5.0,
    38,
    true,
    true
),
(
    'dior-sauvage-elixir',
    'ديور سوفاج إكسير | Dior Sauvage Elixir',
    'Dior',
    'men',
    'Parfum Extrait',
    'عطر رجالي أيقوني فائق التركيز والجاذبية. يجمع بين انتعاش الجريب فروت مع نفحات التوابل الدافئة وخلاصة اللافندر البري مع قاعدة عميقة من الأخشاب الغنية.',
    'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
    '[{"size": "60 مل", "price": 3450, "originalPrice": 3800, "inStock": true}, {"size": "100 مل", "price": 4700, "originalPrice": 5100, "inStock": true}]'::jsonb,
    '{"top": ["القرفة", "الهيل", "جوزة الطيب", "الجريب فروت"], "heart": ["اللافندر الفرنسي النقي"], "base": ["خشب الصندل", "العنبر", "الباتشولي", "نجيل الهند"]}'::jsonb,
    'woody',
    4.9,
    64,
    true,
    false
),
(
    'aurora-crystal-gold',
    'أورورا باريس كريستال جولد | Aurora Paris Crystal Gold',
    'Aurora Paris',
    'women',
    'Eau de Parfum',
    'أيقونة الأنوثة العصرية والسحر الباريسي. نفحات زهرية رقيقة تتناغم مع حلاوة الكراميل الذهبي والعنبر الدافئ لتمنحك حضوراً آسراً لا يقاوم.',
    '/images/perfume-sample-2.jpg',
    '[{"size": "50 مل", "price": 1650, "originalPrice": 1950, "inStock": true}, {"size": "100 مل", "price": 2600, "originalPrice": 3100, "inStock": true}]'::jsonb,
    '{"top": ["زهور البرتقال", "المندرين الإيطالي", "التوت البري"], "heart": ["الياسمين الملكي", "مسك الروم", "الكراميل الناعم"], "base": ["العنبر البلوري", "فانيليا مدغشقر", "خشب الكشمير"]}'::jsonb,
    'floral',
    4.9,
    42,
    true,
    true
),
(
    'creed-aventus',
    'كريد أفينتوس | Creed Aventus',
    'Creed',
    'men',
    'Eau de Parfum',
    'عطر النبلاء والانتصار. يحتفي بالقوة والرؤية والنجاح. يبدأ بنفحات فواحة من الأناناس الدخاني والبرغموت وينتهي بقاعدة جلدية خشبية أسطورية تحبس الأنفاس.',
    'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800',
    '[{"size": "50 مل", "price": 4200, "originalPrice": 4700, "inStock": true}, {"size": "100 مل", "price": 6800, "originalPrice": 7500, "inStock": true}]'::jsonb,
    '{"top": ["الأناناس الملكي", "البرغموت", "التفاح الأخضر", "الكشمش الأسود"], "heart": ["أخشاب البتولا الدخانية", "الباتشولي", "الياسمين المغربي", "الورد"], "base": ["المسك الفاخر", "طحلب البلوط", "العنبر الرمادي", "الفانيليا"]}'::jsonb,
    'fresh',
    5.0,
    89,
    true,
    false
),
(
    'tom-ford-oud-wood',
    'توم فورد عود وود | Tom Ford Oud Wood',
    'Tom Ford',
    'unisex',
    'Eau de Parfum',
    'أحد أشهر وأفخم ابتكارات العود في العالم الغربي. عطر ناعم، راقٍ وغامض يجمع بين العود الثمين وخشب الورد البرازيلي وحبوب التونكا المحمصة.',
    'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=800',
    '[{"size": "50 مل", "price": 3900, "originalPrice": 4400, "inStock": true}, {"size": "100 مل", "price": 5900, "originalPrice": 6500, "inStock": true}]'::jsonb,
    '{"top": ["خشب الورد", "الهيل النيبالي", "الفلفل الصيني"], "heart": ["خشب العود النادر", "خشب الصندل", "نجيل الهند"], "base": ["حبوب التونكا", "الفانيليا الدخانية", "العنبر الذهبي"]}'::jsonb,
    'woody',
    4.8,
    51,
    false,
    false
),
(
    'ysl-libre-intense',
    'إيف سان لوران ليبر إنتنس | YSL Libre Intense',
    'Yves Saint Laurent',
    'women',
    'Eau de Parfum',
    'تجسيد حقيقي للحرية والجاذبية الصارخة. تناغم ملحمي بين روعة اللافندر الفرنسي وزهر البرتقال المغربي المعزز بعبير الأوركيد البري والفانيليا.',
    'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=800',
    '[{"size": "50 مل", "price": 2750, "originalPrice": 3100, "inStock": true}, {"size": "90 مل", "price": 3800, "originalPrice": 4200, "inStock": true}]'::jsonb,
    '{"top": ["اللافندر", "المندرين", "البرغموت"], "heart": ["زهر البرتقال المغربي", "الأوركيد النادر", "الياسمين"], "base": ["فانيليا مدغشقر", "حبوب التونكا", "العنبر الذهبي", "نجيل الهند"]}'::jsonb,
    'amber',
    4.9,
    73,
    true,
    false
)
ON CONFLICT (id) DO NOTHING;

-- ===================================================
-- تفعيل سياسات الأمان والحماية (Row Level Security - RLS)
-- ===================================================

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- حذف السياسات السابقة إن وُجدت لمنع أي تضارب
DROP POLICY IF EXISTS "Public can read products" ON public.products;
DROP POLICY IF EXISTS "Public can read settings" ON public.settings;
DROP POLICY IF EXISTS "Public can read reviews" ON public.reviews;
DROP POLICY IF EXISTS "Public can insert orders" ON public.orders;
DROP POLICY IF EXISTS "Public can insert reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admin full access products" ON public.products;
DROP POLICY IF EXISTS "Admin full access orders" ON public.orders;
DROP POLICY IF EXISTS "Admin full access settings" ON public.settings;
DROP POLICY IF EXISTS "Enable all operations for anon" ON public.products;
DROP POLICY IF EXISTS "Enable all operations for anon" ON public.orders;
DROP POLICY IF EXISTS "Enable all operations for anon" ON public.settings;
DROP POLICY IF EXISTS "Enable all operations for anon" ON public.reviews;

-- تمكين القراءة والتعديل لجميع العمليات بسلاسة عبر واجهة المتجر ولوحة التحكم
CREATE POLICY "Enable all operations for anon" ON public.products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all operations for anon" ON public.orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all operations for anon" ON public.settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all operations for anon" ON public.reviews FOR ALL USING (true) WITH CHECK (true);
