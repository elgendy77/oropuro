import type { Product } from '../types';

export function normalizeArabic(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/[ًٌٍَُِّْ]/g, '') // remove harakat
    .replace(/[-_]/g, ' ')
    .trim();
}

export interface SearchSuggestion {
  text: string;
  type: 'perfume' | 'brand' | 'family' | 'vibe';
  badge?: string;
}

export const POPULAR_SEARCH_KEYWORDS: SearchSuggestion[] = [
  { text: 'إيماجينيشن (Imagination)', type: 'perfume', badge: 'الأكثر طلباً' },
  { text: 'هوس آيس (Hawas Ice)', type: 'perfume', badge: 'انتعاش تريند' },
  { text: 'جساس عساف (Jassas)', type: 'perfume', badge: 'فخامة شرقية' },
  { text: 'سوفاج ديور (Sauvage)', type: 'perfume', badge: 'الأعلى مبيعاً' },
  { text: 'بلو دي شانيل (Bleu de Chanel)', type: 'perfume', badge: 'رجالي فخم' },
  { text: 'سترونجر ويذ يو (Stronger With You)', type: 'perfume', badge: 'جاذبية شتوية' },
  { text: 'أفنان 9 بي إم (Afnan 9 PM)', type: 'perfume', badge: 'بديل الترا ميل' },
  { text: 'أسد لطافة (Lattafa Asad)', type: 'perfume', badge: 'فوحان قوي' },
  { text: 'كريد أفينتوس (Creed Aventus)', type: 'perfume', badge: 'هيبة رجالية' },
  { text: 'عطور دار عساف (Assaf)', type: 'brand', badge: 'مجموعة عساف' },
  { text: 'عطور دار الرصاصي (Rasasi)', type: 'brand', badge: 'مجموعة هوس' }
];

export const PERFUME_SEARCH_DICTIONARY: { name: string; brand: string; aliases: string[] }[] = [
  { name: 'Imagination', brand: 'Louis Vuitton', aliases: ['ايماجينيشن', 'إيماجينيشن', 'لويس فيتون', 'imagination', 'louis vuitton', 'شاي اسود', 'امبروكسان'] },
  { name: 'Jassas', brand: 'Assaf', aliases: ['جساس', 'عساف', 'جساس عساف', 'jassas', 'assaf', 'عود', 'عنبر'] },
  { name: 'Risk Comment', brand: 'Assaf', aliases: ['ريسك', 'ريسك كومينت', 'كومنت', 'عساف', 'risk comment', 'assaf'] },
  { name: 'Hawas Ice', brand: 'Rasasi', aliases: ['هوس ايس', 'هوس آيس', 'الرصاصي', 'هوس', 'hawas ice', 'rasasi', 'ثلجي', 'منعش'] },
  { name: 'Hawas Malibu', brand: 'Rasasi', aliases: ['هوس ماليبو', 'ماليبو', 'الرصاصي', 'hawas malibu', 'rasasi'] },
  { name: 'Hawas Tropical', brand: 'Rasasi', aliases: ['هوس تروبيكال', 'تروبيكال', 'الرصاصي', 'hawas tropical'] },
  { name: 'Hawas Rouge', brand: 'Rasasi', aliases: ['هوس روج', 'الرصاصي', 'hawas rouge'] },
  { name: 'Frankel Imagination', brand: 'Assaf', aliases: ['فرانكل', 'فرانكل ايماجينيشن', 'عساف', 'frankel imagination'] },
  { name: 'Frankel Aventus', brand: 'Assaf', aliases: ['فرانكل افينتوس', 'فرانكل', 'عساف', 'frankel aventus'] },
  { name: 'Wild Colt', brand: 'Assaf', aliases: ['وايلد كولت', 'كولت', 'عساف', 'wild colt'] },
  { name: 'Lattafa Asad', brand: 'Lattafa', aliases: ['اسد', 'أسد', 'لطافة', 'اسد لطافة', 'lattafa asad', 'asad', 'بديل سوفاج اليكسير'] },
  { name: 'Fakhar Lattafa', brand: 'Lattafa', aliases: ['فخر لطافة', 'فخر', 'لطافة', 'fakhar lattafa'] },
  { name: 'Afnan 9 PM', brand: 'Afnan', aliases: ['9 بي ام', '9 بي إم', 'افنان', 'أفنان 9 بي إم', 'afnan 9 pm', '9pm', 'الترا ميل'] },
  { name: 'His Confession', brand: 'Lattafa', aliases: ['هيز كونفيشن', 'كونفيشن', 'لطافة', 'his confession'] },
  { name: 'Sherlock', brand: 'Assaf', aliases: ['شيرلوك', 'عساف شيرلوك', 'sherlock assaf'] },
  { name: 'Private Barrel', brand: 'Assaf', aliases: ['برايفت باريل', 'باريل', 'عساف', 'private barrel'] },
  { name: 'Sauvage', brand: 'Dior', aliases: ['سوفاج', 'سوفاج ديور', 'ديور سوفاج', 'sauvage', 'dior', 'ديور', 'برغموت', 'امبروكسان'] },
  { name: 'Bleu de Chanel', brand: 'Chanel', aliases: ['بلو دي شانيل', 'بلو', 'شانيل بلو', 'شانيل', 'chanel', 'bleu', 'بخور'] },
  { name: 'Baccarat Rouge 540', brand: 'Maison Francis Kurkdjian', aliases: ['باكارات روج', 'باكارات', 'بكرات', 'بكره روج', 'كوركدجيان', 'فرانسيس', 'baccarat', 'rouge', 'زعفران'] },
  { name: 'Aventus', brand: 'Creed', aliases: ['افينتوس', 'أفينتوس', 'كريد', 'كريد افينتوس', 'aventus', 'creed', 'اناناس'] },
  { name: 'Black Orchid', brand: 'Tom Ford', aliases: ['بلاك اوركيد', 'بلاك أوركيد', 'توم فورد', 'اوركيد', 'black orchid', 'tom ford'] },
  { name: 'Coco Mademoiselle', brand: 'Chanel', aliases: ['كوكو مادموزيل', 'كوكو', 'مادموزيل', 'شانيل', 'coco', 'mademoiselle'] },
  { name: 'La Vie Est Belle', brand: 'Lancôme', aliases: ['لا في اي بيل', 'لافي اي بيل', 'لانكوم', 'la vie est belle', 'lancome', 'فانيليا'] },
  { name: 'Tobacco Vanille', brand: 'Tom Ford', aliases: ['توباكو فانيل', 'توباكو فانيليا', 'توباكو', 'توم فورد', 'tobacco vanille', 'تبغ'] },
  { name: 'Libre Intense', brand: 'Yves Saint Laurent', aliases: ['ليبر انتنس', 'ليبر إنتنس', 'ليبر', 'ايف سان لوران', 'ysl', 'libre', 'لافندر'] },
  { name: 'Acqua Di Giò Profondo', brand: 'Giorgio Armani', aliases: ['اكوا دي جيو', 'أكوا دي جيو', 'بروفوندو', 'ارماني', 'armani', 'acqua di gio', 'بحري'] },
  { name: 'Good Girl', brand: 'Carolina Herrera', aliases: ['جود جيرل', 'كارولينا هيريرا', 'كارولينا', 'good girl', 'carolina herrera'] },
  { name: "Terre d'Hermès", brand: 'Hermès', aliases: ['تير دي هيرميس', 'هيرميس', 'هرمز', 'terre d hermes', 'hermes', 'برتقال'] },
  { name: 'Oud Wood', brand: 'Tom Ford', aliases: ['عود وود', 'توم فورد عود', 'توم فورد', 'oud wood', 'tom ford', 'عود', 'صندل'] },
  { name: 'Santal 33', brand: 'Le Labo', aliases: ['سانتال 33', 'سانتال', 'لو لابو', 'لي لابو', 'santal 33', 'le labo', 'صندل'] },
  { name: "J'adore", brand: 'Dior', aliases: ['جادور', 'ديور جادور', 'ديور', 'jadore', 'dior', 'ياسمين'] },
  { name: 'Layton', brand: 'Parfums de Marly', aliases: ['ليتون', 'لايتون', 'دي مارلي', 'مارلي', 'layton', 'parfums de marly'] },
  { name: 'Eros', brand: 'Versace', aliases: ['ايروس', 'إيروس', 'فرزاتشي', 'فيرساتشي', 'فرساتشي', 'eros', 'versace', 'نعناع'] },
  { name: 'Black Phantom', brand: 'Kilian', aliases: ['بلاك فانتوم', 'كيليان', 'كليان', 'black phantom', 'kilian', 'قهوة', 'كراميل'] },
  { name: 'Mon Guerlain', brand: 'Guerlain', aliases: ['مون جيرلان', 'جيرلان', 'غيرلان', 'mon guerlain', 'guerlain', 'لافندر'] },
  { name: 'The One for Men', brand: 'Dolce & Gabbana', aliases: ['ذا ون', 'دولتشي اند غابانا', 'دولتشي', 'the one', 'dolce gabbana', 'تبغ'] },
  { name: 'Delina', brand: 'Parfums de Marly', aliases: ['ديلينا', 'مارلي ديلينا', 'دي مارلي', 'delina', 'parfums de marly', 'ورد'] },
  { name: 'Silver Mountain Water', brand: 'Creed', aliases: ['سيلفر ماونتن', 'سيلفر ماونتين', 'كريد سيلفر', 'silver mountain', 'creed'] },
  { name: 'Grand Soir', brand: 'Maison Francis Kurkdjian', aliases: ['جراند سوار', 'جراند سوير', 'كوركدجيان', 'grand soir', 'عنبر'] },
  { name: 'Alien', brand: 'Mugler', aliases: ['الين', 'ألين', 'موغلر', 'تييري موغلر', 'alien', 'mugler', 'ياسمين'] },
  { name: "L'Homme Idéal", brand: 'Guerlain', aliases: ['لوم ايديال', 'لوم إيديال', 'جيرلان', 'l homme ideal', 'guerlain', 'لوز'] },
  { name: 'Bloom', brand: 'Gucci', aliases: ['بلوم', 'قوتشي بلوم', 'غوتشي', 'قوتشي', 'bloom', 'gucci', 'ياسمين'] },
  { name: 'Explorer', brand: 'Montblanc', aliases: ['اكسبلورر', 'إكسبلورر', 'مونت بلانك', 'explorer', 'montblanc', 'برغموت'] },
  { name: 'Lost Cherry', brand: 'Tom Ford', aliases: ['لوست شيري', 'توم فورد كرز', 'توم فورد', 'lost cherry', 'tom ford', 'كرز'] },
  { name: 'Si Passione', brand: 'Giorgio Armani', aliases: ['سي باسيوني', 'سي باشون', 'ارماني', 'si passione', 'armani', 'كشمش'] },
  { name: 'Neroli Portofino', brand: 'Tom Ford', aliases: ['نيرولي بورتوفينو', 'نيرولي', 'توم فورد', 'neroli portofino', 'tom ford', 'حمضيات'] },
  { name: 'Spicebomb Extreme', brand: 'Viktor&Rolf', aliases: ['سبايس بومب', 'سبايس بومب اكستريم', 'فيكتور اند رولف', 'spicebomb', 'viktor rolf'] },
  { name: 'Miss Dior', brand: 'Dior', aliases: ['مس ديور', 'ميس ديور', 'ديور', 'miss dior', 'dior', 'ورد'] },
  { name: "Angels' Share", brand: 'Kilian', aliases: ['انجلز شير', 'أنجلز شير', 'كيليان', 'angels share', 'kilian', 'كونياك', 'قرفه'] },
  { name: 'Allure Homme Sport', brand: 'Chanel', aliases: ['الور هوم سبورت', 'ألور هوم', 'شانيل الور', 'allure homme sport', 'chanel'] },
  { name: 'Hypnotic Poison', brand: 'Dior', aliases: ['هيبنوتيك بويزن', 'بويزن ديور', 'ديور', 'hypnotic poison', 'dior', 'فانيليا'] },
  { name: 'Interlude Man', brand: 'Amouage', aliases: ['انترلود', 'إنترلود', 'امواج', 'أمواج', 'interlude', 'amouage', 'بخور', 'لبان'] },
  { name: 'Black Opium', brand: 'Yves Saint Laurent', aliases: ['بلاك اوبيوم', 'بلاك أوبيوم', 'ايف سان لوران', 'black opium', 'ysl', 'قهوه'] },
  { name: 'Colonia', brand: 'Acqua di Parma', aliases: ['كولونيا', 'اكوا دي بارما', 'colonia', 'acqua di parma', 'حمضيات'] },
  { name: 'Stronger With You', brand: 'Emporio Armani', aliases: ['سترونجر وذ يو', 'سترونجر ويذ يو', 'ارماني', 'stronger with you', 'armani'] },
  { name: 'Portrait of a Lady', brand: 'Frederic Malle', aliases: ['بورتريه اوف ا ليدي', 'بورتريه', 'فريدريك مال', 'portrait of a lady', 'ورد'] },
  { name: 'Naxos', brand: 'Xerjoff', aliases: ['ناكسوس', 'زيرجوف ناكسوس', 'زيرجوف', 'سيرجوف', 'naxos', 'xerjoff', 'عسل'] },
  { name: 'Dior Homme Intense', brand: 'Dior', aliases: ['ديور هوم انتنس', 'ديور هوم إنتنس', 'ديور هوم', 'dior homme intense', 'سوسن'] },
  { name: 'Pure Poison', brand: 'Dior', aliases: ['بيور بويزن', 'ديور بيور بويزن', 'pure poison', 'dior', 'زهور بيضاء'] },
  { name: 'Pegasus', brand: 'Parfums de Marly', aliases: ['بيغاسوس', 'بيجاسوس', 'مارلي', 'pegasus', 'parfums de marly', 'لوز'] },
  { name: 'Crystal Noir', brand: 'Versace', aliases: ['كريستال نوير', 'فرزاتشي كريستال', 'فرزاتشي', 'crystal noir', 'versace', 'جوز الهند'] },
  { name: "L'Aventure", brand: 'Al Haramain', aliases: ['لافينتشر', 'لافنتشر', 'الحرمين', 'l aventure', 'al haramain'] },
  { name: 'Soleil Blanc', brand: 'Tom Ford', aliases: ['سولاي بلان', 'توم فورد سولاي', 'soleil blanc', 'tom ford', 'جوز الهند'] },
  { name: 'Chance Eau Tendre', brand: 'Chanel', aliases: ['شانس او تندر', 'شانس', 'شانيل شانس', 'chance eau tendre', 'chanel'] },
  { name: 'Gentleman Reserve Privée', brand: 'Givenchy', aliases: ['جنتلمان', 'جيفنشي جنتلمان', 'جيفنشي', 'gentleman', 'givenchy'] },
  { name: 'Nomade', brand: 'Chloé', aliases: ['نوماد', 'كلوي نوماد', 'كلوي', 'nomade', 'chloe'] },
  { name: 'Oud Ispahan', brand: 'Dior', aliases: ['عود اصفهان', 'عود إصفهان', 'ديور عود', 'oud ispahan', 'dior', 'عود'] },
  { name: 'Hacivat', brand: 'Nishane', aliases: ['هاجيفات', 'هاسيفات', 'هاتشيفات', 'نيشاني', 'hacivat', 'nishane', 'اناناس'] },
  { name: 'Oro Puro Royal Elixir', brand: 'Oro Puro Signature', aliases: ['اورو بورو', 'أورو بورو', 'اكسير ملكي', 'oro puro', 'royal elixir', 'عود', 'عنبر'] }
];

// Returns instant suggested keywords matching the query
export function getSimilarKeywords(query: string): string[] {
  const q = normalizeArabic(query);
  if (!q) return [];

  const suggestions = new Set<string>();

  // Check dictionary
  for (const item of PERFUME_SEARCH_DICTIONARY) {
    const normName = normalizeArabic(item.name);
    const normBrand = normalizeArabic(item.brand);

    if (normName.includes(q) || normBrand.includes(q)) {
      suggestions.add(`${item.name} (${item.brand})`);
    }

    for (const alias of item.aliases) {
      const normAlias = normalizeArabic(alias);
      if (normAlias.includes(q) || q.includes(normAlias)) {
        suggestions.add(`${alias} • ${item.name}`);
      }
    }

    if (suggestions.size >= 6) break;
  }

  // Also check popular suggestions
  for (const pop of POPULAR_SEARCH_KEYWORDS) {
    if (normalizeArabic(pop.text).includes(q)) {
      suggestions.add(pop.text);
    }
    if (suggestions.size >= 6) break;
  }

  return Array.from(suggestions).slice(0, 6);
}

// Searches products with fuzzy matching across all fields and aliases
export function matchProductWithQuery(product: Product, rawQuery: string): { matched: boolean; score: number } {
  const q = normalizeArabic(rawQuery);
  if (!q) return { matched: true, score: 0 };

  const normName = normalizeArabic(product.name || '');
  const normBrand = normalizeArabic(product.brand || '');
  const normDesc = normalizeArabic(product.description || '');
  const normFamily = normalizeArabic(product.fragranceFamily || '');
  const normGender = product.gender === 'men' ? 'رجالي رجال' : product.gender === 'women' ? 'نسائي نساء بنات' : 'للجنسين نيش مشترك';
  
  const allNotes = [
    ...(product.notes?.top || []),
    ...(product.notes?.heart || []),
    ...(product.notes?.base || [])
  ].map(n => normalizeArabic(n)).join(' ');

  let score = 0;

  // 1. Direct name match (highest score)
  if (normName === q) score += 100;
  else if (normName.startsWith(q)) score += 80;
  else if (normName.includes(q)) score += 60;

  // 2. Direct brand match
  if (normBrand === q) score += 90;
  else if (normBrand.includes(q)) score += 50;

  // 3. Dictionary & Alias matches
  const dictEntry = PERFUME_SEARCH_DICTIONARY.find(d => 
    normalizeArabic(d.name) === normName || normName.includes(normalizeArabic(d.name))
  );

  if (dictEntry) {
    for (const alias of dictEntry.aliases) {
      const normA = normalizeArabic(alias);
      if (normA === q) {
        score += 85;
      } else if (normA.includes(q) || q.includes(normA)) {
        score += 45;
      }
    }
  }

  // 4. Notes match
  if (allNotes.includes(q)) {
    score += 35;
  }

  // 5. Gender / Family match
  if (normGender.includes(q)) {
    score += 30;
  }
  if (normFamily.includes(q)) {
    score += 30;
  }

  // 6. Description match
  if (normDesc.includes(q)) {
    score += 20;
  }

  // 7. Commercial High-Intent Keywords (ثبات، فوحان، بيست مود، صيفي، سهرة، أصلي، شراء)
  if (q.includes('ثبات') || q.includes('فوحان') || q.includes('بيست مود') || q.includes('beast')) {
    if (product.concentration?.toLowerCase().includes('extrait') || product.isFeatured) {
      score += 45;
    }
  }
  if (q.includes('صيف') || q.includes('منعش') || q.includes('حر')) {
    if (product.fragranceFamily === 'fresh') {
      score += 45;
    }
  }
  if (q.includes('سهر') || q.includes('شتا') || q.includes('دافي') || q.includes('عود') || q.includes('عنبر')) {
    if (product.fragranceFamily === 'oriental' || product.fragranceFamily === 'woody') {
      score += 45;
    }
  }
  if (q.includes('اصلي') || q.includes('شراء') || q.includes('عرض') || q.includes('افضل')) {
    if (product.isFeatured) {
      score += 40;
    }
  }

  // Multi-word partial match
  const words = q.split(' ').filter(w => w.length > 1);
  if (words.length > 1) {
    const allWordsMatch = words.every(w => 
      normName.includes(w) || normBrand.includes(w) || allNotes.includes(w) || (dictEntry && dictEntry.aliases.some(a => normalizeArabic(a).includes(w)))
    );
    if (allWordsMatch) score += 40;
  }

  return { matched: score > 0, score };
}
