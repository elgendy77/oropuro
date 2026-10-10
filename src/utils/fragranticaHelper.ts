export interface AccordItem {
  nameAr: string;
  nameEn: string;
  percentage: number;
  bgColor: string;
  textColor: string;
}

export interface NoteItem {
  name: string;
  icon: string;
  category: 'citrus' | 'spicy' | 'woody' | 'floral' | 'oriental' | 'fresh' | 'sweet' | 'leather';
}

// Map individual note string to appropriate icon and category
export function parseNote(rawName: string): NoteItem {
  const n = rawName.trim();

  if (/برغموت|ليمون|برتقال|حمضيات|جريب فروت|مندرين|سترون|كافيار/.test(n)) {
    return { name: n, icon: '🍋', category: 'citrus' };
  }
  if (/هيل|فلفل|قرفة|زعفران|زنجبيل|توابل|بهارات|ينسون|جوزة الطيب/.test(n)) {
    return { name: n, icon: '🌶️', category: 'spicy' };
  }
  if (/عود|أرز|صندل|غاياك|بتولا|أخشاب|طحلب|خشب|نجيل الهند/.test(n)) {
    return { name: n, icon: '🪵', category: 'woody' };
  }
  if (/لافندر|خزامى|نعناع|شاي|إكليل الجبل|مريمية|ميرمية|ريحان|أفسنتين/.test(n)) {
    return { name: n, icon: '🌿', category: 'fresh' };
  }
  if (/ورد|ياسمين|زهر البرتقال|سوسن|بنفسج|إبرة الراعي/.test(n)) {
    return { name: n, icon: '🌸', category: 'floral' };
  }
  if (/عنبر|لبان|بخور|أمبروكسان|مسك|صمغ|راتنج|بنزوين|بلسم/.test(n)) {
    return { name: n, icon: '✨', category: 'oriental' };
  }
  if (/فانيليا|كراميل|تونكا|شوكولاتة|عسل|كستناء|قهوة|بندق|تمر/.test(n)) {
    return { name: n, icon: '🍮', category: 'sweet' };
  }
  if (/جلد|جلود|تبغ|دخان/.test(n)) {
    return { name: n, icon: '👞', category: 'leather' };
  }
  if (/بحر|مياه|أمواج|نسيم|ثلج|مائي/.test(n)) {
    return { name: n, icon: '🌊', category: 'fresh' };
  }
  if (/تفاح|أناناس|توت|برقوق|فواكه/.test(n)) {
    return { name: n, icon: '🍎', category: 'sweet' };
  }

  return { name: n, icon: '✨', category: 'oriental' };
}

// Generate the authentic Fragrantica Accords based on perfume composition
export function generateAccords(
  notes: { top?: string[]; heart?: string[]; base?: string[] },
  fragranceFamily: string,
  description: string = ''
): AccordItem[] {
  const allNotes = [
    ...(notes.top || []),
    ...(notes.heart || []),
    ...(notes.base || [])
  ].join(' ') + ' ' + description;

  const accords: AccordItem[] = [];

  // Check categories and score them
  const hasCitrus = /برغموت|ليمون|برتقال|حمضيات|جريب فروت|مندرين|سترون/.test(allNotes);
  const hasWoody = /عود|أرز|صندل|غاياك|بتولا|أخشاب|طحلب|خشب|نجيل الهند/.test(allNotes);
  const hasSpicy = /هيل|فلفل|قرفة|زعفران|زنجبيل|توابل|بهارات|ينسون/.test(allNotes);
  const hasAmber = /عنبر|أمبروكسان|راتنج|بنزوين|لبان/.test(allNotes);
  const hasAromatic = /لافندر|خزامى|نعناع|شاي|إكليل الجبل|مريمية|فوجير/.test(allNotes);
  const hasSweet = /فانيليا|كراميل|تونكا|عسل|كستناء|قهوة/.test(allNotes);
  const hasAquatic = /بحر|مائي|أمواج|مياه مثلجة|نسيم/.test(allNotes);
  const hasLeather = /جلد|جلود|تبغ/.test(allNotes);
  const hasSmoky = /بخور|دخان|لبان|مدخن/.test(allNotes);
  const hasFruity = /تفاح|أناناس|برقوق|فواكه/.test(allNotes);

  let score = 100;

  if (fragranceFamily === 'fresh' || hasAquatic || hasCitrus) {
    if (hasCitrus) {
      accords.push({ nameAr: 'حمضيات متلألئة', nameEn: 'Citrus', percentage: score, bgColor: '#84cc16', textColor: '#1a2e05' });
      score -= 15;
    }
    if (hasAquatic) {
      accords.push({ nameAr: 'مائي منعش', nameEn: 'Aquatic / Marine', percentage: score, bgColor: '#0284c7', textColor: '#ffffff' });
      score -= 15;
    }
    if (hasAromatic) {
      accords.push({ nameAr: 'أروماتك نضر', nameEn: 'Aromatic', percentage: score, bgColor: '#10b981', textColor: '#ffffff' });
      score -= 15;
    }
    if (hasAmber) {
      accords.push({ nameAr: 'عنبري دافئ', nameEn: 'Amber', percentage: score, bgColor: '#d97706', textColor: '#ffffff' });
      score -= 15;
    }
    if (hasWoody) {
      accords.push({ nameAr: 'خشبي راقٍ', nameEn: 'Woody', percentage: score, bgColor: '#78350f', textColor: '#ffffff' });
      score -= 15;
    }
  } else if (fragranceFamily === 'woody' || hasWoody) {
    accords.push({ nameAr: 'خشبي فاخر', nameEn: 'Woody', percentage: score, bgColor: '#78350f', textColor: '#ffffff' });
    score -= 15;
    if (hasSpicy) {
      accords.push({ nameAr: 'تابلي دافئ', nameEn: 'Warm Spicy', percentage: score, bgColor: '#ea580c', textColor: '#ffffff' });
      score -= 15;
    }
    if (hasAmber) {
      accords.push({ nameAr: 'عنبري ملكي', nameEn: 'Amber', percentage: score, bgColor: '#d97706', textColor: '#ffffff' });
      score -= 15;
    }
    if (hasAromatic) {
      accords.push({ nameAr: 'أروماتك فوجير', nameEn: 'Aromatic', percentage: score, bgColor: '#10b981', textColor: '#ffffff' });
      score -= 15;
    }
    if (hasCitrus) {
      accords.push({ nameAr: 'حمضيات منعشة', nameEn: 'Fresh Citrus', percentage: score, bgColor: '#84cc16', textColor: '#1a2e05' });
      score -= 15;
    }
  } else {
    // Oriental / Default
    if (hasAmber || hasSmoky) {
      accords.push({ nameAr: 'عنبري شرقي', nameEn: 'Amber', percentage: score, bgColor: '#d97706', textColor: '#ffffff' });
      score -= 15;
    }
    if (hasSpicy) {
      accords.push({ nameAr: 'تابلي حار', nameEn: 'Warm Spicy', percentage: score, bgColor: '#ea580c', textColor: '#ffffff' });
      score -= 15;
    }
    if (hasWoody) {
      accords.push({ nameAr: 'خشبي عميق', nameEn: 'Woody', percentage: score, bgColor: '#78350f', textColor: '#ffffff' });
      score -= 15;
    }
    if (hasSweet) {
      accords.push({ nameAr: 'فانيليا دافئة', nameEn: 'Vanilla Sweet', percentage: score, bgColor: '#ca8a04', textColor: '#ffffff' });
      score -= 15;
    }
    if (hasLeather) {
      accords.push({ nameAr: 'جلدي مدخن', nameEn: 'Leather', percentage: score, bgColor: '#1c1917', textColor: '#ffffff' });
      score -= 15;
    }
    if (hasFruity) {
      accords.push({ nameAr: 'فاكهي حلو', nameEn: 'Fruity', percentage: score, bgColor: '#ec4899', textColor: '#ffffff' });
      score -= 15;
    }
  }

  // Fallback defaults if few accords detected
  if (accords.length < 3) {
    if (!accords.some(a => a.nameEn === 'Aromatic')) {
      accords.push({ nameAr: 'أروماتك جذاب', nameEn: 'Aromatic', percentage: 55, bgColor: '#10b981', textColor: '#ffffff' });
    }
    if (!accords.some(a => a.nameEn === 'Amber')) {
      accords.push({ nameAr: 'عنبري دافئ', nameEn: 'Amber', percentage: 45, bgColor: '#d97706', textColor: '#ffffff' });
    }
  }

  return accords.slice(0, 5);
}
