export type PerfumeConcentration = 
  | 'Eau de Parfum' 
  | 'Eau de Toilette' 
  | 'Parfum Extrait' 
  | 'Parfum'
  | 'Cologne';

export type PerfumeGender = 'men' | 'women' | 'unisex';

export type FragranceFamily = 'oriental' | 'woody' | 'fresh' | 'floral' | 'amber' | 'leather';

export interface PerfumeSize {
  size: string; // e.g. "50 مل" or "100 مل"
  price: number; // in EGP
  originalPrice?: number; // for discounts
  inStock: boolean;
}

export interface PerfumeNotes {
  top: string[]; // قمة العطر
  heart: string[]; // قلب العطر
  base: string[]; // قاعدة العطر
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  gender: PerfumeGender;
  concentration: PerfumeConcentration;
  description: string;
  image: string;
  sizes: PerfumeSize[];
  notes: PerfumeNotes;
  fragranceFamily: FragranceFamily;
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
  isNew?: boolean;
  isSoldOut?: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  id: string; // unique item id (productId + size)
  productId: string;
  name: string;
  brand: string;
  image: string;
  selectedSize: string;
  price: number;
  quantity: number;
}

export type PaymentMethod = 'instapay' | 'vodafone_cash' | 'cod';

export type OrderStatus = 'new' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string; // e.g. "ORO-9421"
  customerName: string;
  phone: string;
  alternatePhone?: string;
  governorate: string;
  cityAddress: string;
  notes?: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
}

export interface SiteContentSettings {
  // 1. Top Urgency Banner
  announcementText: string;
  announcementBadge: string;
  announcementEnabled: boolean;
  announcementTimerText: string;

  // 2. Hero Section
  heroBadge: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  heroImageUrl: string;
  heroCtaText: string;
  heroSecondaryCtaText: string;

  // 3. Sales Offer & Marketing Promo Banner
  promoBannerEnabled?: boolean;
  promoBannerTitle: string;
  promoBannerSubtitle: string;
  promoBannerBadge: string;
  promoDiscountText: string;
  promoBannerCtaText?: string;
  promoBannerTheme?: 'emerald_gold' | 'black_gold' | 'royal_navy';

  // 4. Products Collection Section
  collectionBadge?: string;
  collectionTitle?: string;
  collectionSubtitle?: string;

  // 5. Trust / Guarantees Badges
  trustFeature1Title: string;
  trustFeature1Desc: string;
  trustFeature2Title: string;
  trustFeature2Desc: string;
  trustFeature3Title: string;
  trustFeature3Desc: string;

  // 6. WhatsApp & Floating Contact
  whatsappFloatingText: string;
  logoUrl?: string; // Optional logo URL inside site content
}

export type AdminRole = 'owner' | 'manager' | 'staff';

export interface AdminUser {
  id: string;
  name: string;
  username: string;
  password: string;
  role: AdminRole;
  createdAt: string;
  isActive: boolean;
}

export interface StoreSettings {
  storeName: string;
  storeTagline: string;
  logoUrl?: string; // Brand logo image URL
  whatsappNumber: string; // Format e.g. "201001234567"
  vodafoneCashNumber: string; // e.g. "01012345678"
  instapayAddress: string; // e.g. "oropuro@instapay"
  instapayAccountName: string; // e.g. "Oro Puro Fragrance"
  freeShippingThreshold: number; // in EGP
  adminPin?: string; // PIN to protect admin dashboard
  adminUsers?: AdminUser[]; // Multi-admin team members
  shippingRates: {
    cairoGiza: number;
    alexandria: number;
    deltaCanal: number;
    upperEgypt: number;
    admins?: AdminUser[]; // Sync carrier for Supabase JSONB
    logoUrl?: string; // Sync carrier for Supabase JSONB
    automationWebhookUrl?: string; // Sync carrier for Supabase JSONB
    telegramBotToken?: string; // Sync carrier for Supabase JSONB
    telegramChatId?: string; // Sync carrier for Supabase JSONB
  };
  automationWebhookUrl?: string; // AI Automation Webhook URL (Make.com / n8n / Zapier / Custom Webhooks)
  telegramBotToken?: string; // Telegram Bot API Token from @BotFather
  telegramChatId?: string; // Telegram Chat ID or Group/Channel ID
  siteContent?: SiteContentSettings;
}


