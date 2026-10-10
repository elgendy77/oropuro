import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, StoreSettings, CartItem, Order, Review, OrderStatus, AdminUser } from '../types';
import { DEFAULT_SETTINGS, SAMPLE_LUXURY_PRODUCTS, DEFAULT_ADMIN_USERS } from '../data/initialData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { 
  FRAGRANTICA_PRESET_PERFUMES, 
  productToComparisonItem, 
  type PerfumeComparisonItem 
} from '../data/fragranticaDatabase';
import { translations, type Language, type Theme } from '../utils/translations';

export type ActiveView = 'store' | 'admin' | 'comparison' | 'advisor' | 'contact';

interface StoreContextType {
  products: Product[];
  settings: StoreSettings;
  cart: CartItem[];
  orders: Order[];
  reviews: Review[];
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  // Modals & Navigation
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isFragranceFinderOpen: boolean;
  setIsFragranceFinderOpen: (open: boolean) => void;
  isComparisonOpen: boolean;
  setIsComparisonOpen: (open: boolean) => void;
  comparisonItems: PerfumeComparisonItem[];
  addToComparison: (item: PerfumeComparisonItem | Product) => void;
  removeFromComparison: (id: string) => void;
  clearComparison: () => void;
  activeProductForDetail: Product | null;
  setActiveProductForDetail: (product: Product | null) => void;
  // Admin Authentication & Team
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (auth: boolean) => void;
  adminUsers: AdminUser[];
  currentAdminUser: AdminUser | null;
  loginAdmin: (usernameOrPin: string, password?: string) => boolean;
  logoutAdmin: () => void;
  addAdminUser: (admin: Omit<AdminUser, 'id' | 'createdAt'>) => void;
  updateAdminUser: (id: string, updated: Partial<AdminUser>) => void;
  deleteAdminUser: (id: string) => void;
  // Product actions
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  toggleProductSoldOut: (id: string) => void;
  deleteProduct: (id: string) => void;
  loadDemoProducts: () => void;
  clearAllProducts: () => void;
  // Settings actions
  updateSettings: (settings: StoreSettings) => void;
  // Cart actions
  addToCart: (product: Product, selectedSize: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  // Order actions
  createOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  // Review actions
  addReview: (productId: string, userName: string, rating: number, comment: string) => void;
  getProductReviews: (productId: string) => Review[];
  // Language & Theme
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  t: (key: keyof typeof translations.ar) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language state (Persisted in localStorage)
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('oro_puro_language');
      if (saved === 'ar' || saved === 'en') return saved;
    } catch {}
    return 'ar';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('oro_puro_language', lang);
    } catch {}
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  // Theme state (Persisted in localStorage)
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('oro_puro_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {}
    return 'light';
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('oro_puro_theme', newTheme);
    } catch {}
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [language, theme]);

  const t = (key: keyof typeof translations.ar): string => {
    return translations[language]?.[key] || translations.ar[key] || (key as string);
  };

  // 1. Products
  const [products, setProducts] = useState<Product[]>(() => {
    // Clear legacy caches to prevent stale product pricing or missing categories
    try {
      localStorage.removeItem('oro_puro_products');
      localStorage.removeItem('oro_puro_products_v2');
      localStorage.removeItem('oro_puro_products_v3');
    } catch {
      // ignore in environments without localStorage
    }

    const saved = localStorage.getItem('oro_puro_products_v4');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= SAMPLE_LUXURY_PRODUCTS.length && parsed.some(p => p.gender === 'women')) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse products', e);
      }
    }
    return SAMPLE_LUXURY_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('oro_puro_products_v4', JSON.stringify(products));
  }, [products]);

  // 2. Settings
  const [settings, setSettings] = useState<StoreSettings>(() => {
    let localSiteContent = DEFAULT_SETTINGS.siteContent;
    try {
      const savedContent = localStorage.getItem('oro_puro_site_content');
      if (savedContent) {
        localSiteContent = { ...DEFAULT_SETTINGS.siteContent, ...JSON.parse(savedContent) };
      }
    } catch {
      // ignore
    }

    const saved = localStorage.getItem('oro_puro_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return {
            ...DEFAULT_SETTINGS,
            ...parsed,
            shippingRates: { ...DEFAULT_SETTINGS.shippingRates, ...(parsed.shippingRates || {}) },
            siteContent: { ...localSiteContent, ...(parsed.siteContent || {}) },
          };
        }
      } catch (e) {
        console.error('Failed to parse settings', e);
      }
    }
    return { ...DEFAULT_SETTINGS, siteContent: localSiteContent };
  });

  useEffect(() => {
    localStorage.setItem('oro_puro_settings', JSON.stringify(settings));
    if (settings.siteContent) {
      localStorage.setItem('oro_puro_site_content', JSON.stringify(settings.siteContent));
    }
  }, [settings]);

  // 2.5 Admin Users Team
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() => {
    const local = localStorage.getItem('oro_puro_admin_users');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Failed to parse admin users', e);
      }
    }
    if (settings.shippingRates?.admins && Array.isArray(settings.shippingRates.admins) && settings.shippingRates.admins.length > 0) {
      return settings.shippingRates.admins;
    }
    return DEFAULT_ADMIN_USERS;
  });

  useEffect(() => {
    localStorage.setItem('oro_puro_admin_users', JSON.stringify(adminUsers));
  }, [adminUsers]);

  const [currentAdminUser, setCurrentAdminUser] = useState<AdminUser | null>(() => {
    const saved = sessionStorage.getItem('oro_puro_current_admin');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse current admin', e);
      }
    }
    return null;
  });

  // 3. Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('oro_puro_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('oro_puro_cart', JSON.stringify(cart));
  }, [cart]);

  // 4. Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('oro_puro_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse orders', e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('oro_puro_orders', JSON.stringify(orders));
  }, [orders]);

  // 5. Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('oro_puro_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse reviews', e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('oro_puro_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Sync with Supabase Cloud on mount if configured
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    // Fetch Products from Supabase
    supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      .then(async ({ data, error }) => {
        if (!error && data && data.length > 0) {
          const mapped: Product[] = data.map(p => {
            const sizes = Array.isArray(p.sizes) ? p.sizes : [];
            const isAllSizesOutOfStock = sizes.length > 0 && sizes.every((s: any) => s.inStock === false);
            return {
              id: p.id,
              name: p.name,
              brand: p.brand,
              gender: p.gender,
              concentration: p.concentration,
              description: p.description || '',
              image: p.image,
              sizes: sizes,
              notes: p.notes || { top: [], heart: [], base: [] },
              fragranceFamily: p.fragrance_family || 'oriental',
              rating: Number(p.rating) || 5.0,
              reviewsCount: Number(p.reviews_count) || 1,
              isFeatured: Boolean(p.is_featured),
              isNew: Boolean(p.is_new),
              isSoldOut: Boolean(p.is_sold_out || isAllSizesOutOfStock),
              createdAt: p.created_at,
            };
          });
          setProducts(mapped);
        } else if (!error && data && data.length === 0) {
          // Table exists in Supabase but has no products yet: seed initial luxury collection
          const initialPayload = SAMPLE_LUXURY_PRODUCTS.map(item => ({
            id: item.id,
            name: item.name,
            brand: item.brand,
            gender: item.gender,
            concentration: item.concentration,
            description: item.description,
            image: item.image,
            sizes: item.sizes,
            notes: item.notes,
            fragrance_family: item.fragranceFamily,
            rating: item.rating,
            reviews_count: item.reviewsCount,
            is_featured: item.isFeatured,
            is_new: item.isNew,
            created_at: item.createdAt,
          }));
          if (supabase) {
            await supabase.from('products').insert(initialPayload);
          }
          setProducts(SAMPLE_LUXURY_PRODUCTS);
        }
      });

    // Fetch Settings from Supabase
    supabase
      .from('settings')
      .select('*')
      .single()
      .then(({ data, error }) => {
        if (!error && data) {
          if (data.shipping_rates?.admins && Array.isArray(data.shipping_rates.admins) && data.shipping_rates.admins.length > 0) {
            setAdminUsers(data.shipping_rates.admins);
            localStorage.setItem('oro_puro_admin_users', JSON.stringify(data.shipping_rates.admins));
          }
          setSettings(prev => {
            const remoteLogo = data.shipping_rates?.logoUrl || prev.logoUrl || DEFAULT_SETTINGS.logoUrl || '/images/logo.png';
            return {
              ...prev,
              storeName: data.store_name,
              storeTagline: data.store_tagline,
              logoUrl: remoteLogo,
              whatsappNumber: data.whatsapp_number,
              vodafoneCashNumber: data.vodafone_cash_number,
              instapayAddress: data.instapay_address,
              instapayAccountName: data.instapay_account_name,
              freeShippingThreshold: Number(data.free_shipping_threshold),
              shippingRates: data.shipping_rates || DEFAULT_SETTINGS.shippingRates,
              adminPin: data.admin_pin || '1234',
              siteContent: prev.siteContent || DEFAULT_SETTINGS.siteContent,
            };
          });
        }
      });

    // Fetch Orders from Supabase
    supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) {
          const mapped: Order[] = data.map(o => ({
            id: o.id,
            customerName: o.customer_name,
            phone: o.phone,
            alternatePhone: o.alternate_phone,
            governorate: o.governorate,
            cityAddress: o.city_address,
            notes: o.notes,
            items: o.items || [],
            subtotal: Number(o.subtotal),
            shippingFee: Number(o.shipping_fee),
            total: Number(o.total),
            paymentMethod: o.payment_method,
            status: o.status,
            createdAt: o.created_at,
          }));
          setOrders(mapped);
        }
      });
  }, []);

  // Navigation and Modals state
  const [activeView, setActiveView] = useState<ActiveView>('store');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isFragranceFinderOpen, setIsFragranceFinderOpenState] = useState(false);
  const [isComparisonOpen, setIsComparisonOpenState] = useState(false);
  const [activeProductForDetail, setActiveProductForDetail] = useState<Product | null>(null);

  const setIsFragranceFinderOpen = (open: boolean) => {
    setIsFragranceFinderOpenState(open);
    if (open) {
      setActiveView('advisor');
    }
  };

  const setIsComparisonOpen = (open: boolean) => {
    setIsComparisonOpenState(open);
    if (open) {
      setActiveView('comparison');
    }
  };

  // Perfume comparison state (supports up to 4 perfumes)
  const [comparisonItems, setComparisonItems] = useState<PerfumeComparisonItem[]>(() => {
    const saved = localStorage.getItem('oro_puro_comparison');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Failed to parse comparison items', e);
      }
    }
    return [
      FRAGRANTICA_PRESET_PERFUMES[0],
      FRAGRANTICA_PRESET_PERFUMES[1]
    ];
  });

  useEffect(() => {
    localStorage.setItem('oro_puro_comparison', JSON.stringify(comparisonItems));
  }, [comparisonItems]);

  const addToComparison = (item: PerfumeComparisonItem | Product) => {
    const compItem: PerfumeComparisonItem = 'longevity' in item 
      ? item 
      : productToComparisonItem(item);

    setComparisonItems(prev => {
      const exists = prev.some(p => p.id === compItem.id || (compItem.storeProductId && p.id === compItem.storeProductId));
      if (exists) return prev;
      if (prev.length >= 4) {
        return [...prev.slice(0, 3), compItem];
      }
      return [...prev, compItem];
    });
    setActiveView('comparison');
  };

  const removeFromComparison = (id: string) => {
    setComparisonItems(prev => prev.filter(p => p.id !== id && p.storeProductId !== id));
  };

  const clearComparison = () => {
    setComparisonItems([]);
  };

  // Admin authentication state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('oro_puro_admin_auth') === 'true';
  });

  const loginAdmin = (usernameOrPin: string, password?: string): boolean => {
    const trimmedInput = (usernameOrPin || '').trim().toLowerCase();
    const trimmedPass = (password || '').trim();

    // Both username and password are strictly required
    if (!trimmedInput || !trimmedPass) {
      return false;
    }

    // Must strictly match an existing active user in the database (adminUsers)
    const user = adminUsers.find(
      u => u.username.trim().toLowerCase() === trimmedInput && 
           u.password.trim() === trimmedPass && 
           u.isActive !== false
    );

    if (user) {
      setIsAdminAuthenticated(true);
      setCurrentAdminUser(user);
      sessionStorage.setItem('oro_puro_admin_auth', 'true');
      sessionStorage.setItem('oro_puro_current_admin', JSON.stringify(user));
      setActiveView('admin');
      return true;
    }

    // No bypasses allowed - strictly reject if username/password does not match database
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setCurrentAdminUser(null);
    sessionStorage.removeItem('oro_puro_admin_auth');
    sessionStorage.removeItem('oro_puro_current_admin');
    setActiveView('store');
  };

  // Cart calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Cart actions
  const addToCart = (product: Product, selectedSize: string, quantity = 1) => {
    const sizeObj = product.sizes.find(s => s.size === selectedSize) || product.sizes[0];
    if (product.isSoldOut || (sizeObj && sizeObj.inStock === false)) {
      alert('عذراً، هذا العطر نفد من المخزون حالياً (Sold Out)');
      return;
    }
    const price = sizeObj ? sizeObj.price : 0;
    const itemId = `${product.id}_${selectedSize}`;

    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === itemId);
      if (existing) {
        return prevCart.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prevCart,
        {
          id: itemId,
          productId: product.id,
          name: product.name,
          brand: product.brand,
          image: product.image,
          selectedSize: selectedSize,
          price: price,
          quantity: quantity,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const clearCart = () => setCart([]);

  // Product actions
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: `oro_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setProducts(prev => [newProduct, ...prev]);

    // Sync to Supabase
    if (supabase) {
      supabase.from('products').insert([{
        id: newProduct.id,
        name: newProduct.name,
        brand: newProduct.brand,
        gender: newProduct.gender,
        concentration: newProduct.concentration,
        description: newProduct.description,
        image: newProduct.image,
        sizes: newProduct.sizes,
        notes: newProduct.notes,
        fragrance_family: newProduct.fragranceFamily,
        rating: newProduct.rating,
        reviews_count: newProduct.reviewsCount,
        is_featured: newProduct.isFeatured,
        is_new: newProduct.isNew,
        created_at: newProduct.createdAt,
      }]).then(({ error }) => {
        if (error) console.error('Supabase addProduct error:', error);
      });
    }
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    let nextSizes: any = undefined;
    setProducts(prev =>
      prev.map(p => {
        if (p.id === id) {
          const nextSoldOut = updatedFields.isSoldOut !== undefined ? updatedFields.isSoldOut : p.isSoldOut;
          const calculatedSizes = updatedFields.sizes 
            ? updatedFields.sizes 
            : updatedFields.isSoldOut !== undefined 
              ? p.sizes.map(s => ({ ...s, inStock: !updatedFields.isSoldOut }))
              : p.sizes;
          nextSizes = calculatedSizes;
          return {
            ...p,
            ...updatedFields,
            sizes: calculatedSizes,
            isSoldOut: nextSoldOut
          };
        }
        return p;
      })
    );

    // Sync to Supabase
    if (supabase) {
      const payload: any = { ...updatedFields };
      if (updatedFields.fragranceFamily) payload.fragrance_family = updatedFields.fragranceFamily;
      if (updatedFields.reviewsCount) payload.reviews_count = updatedFields.reviewsCount;
      if (updatedFields.isFeatured !== undefined) payload.is_featured = updatedFields.isFeatured;
      if (nextSizes) payload.sizes = nextSizes;
      delete payload.fragranceFamily;
      delete payload.reviewsCount;
      delete payload.isFeatured;
      delete payload.isSoldOut;

      supabase.from('products').update(payload).eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase updateProduct error:', error);
      });
    }
  };

  const toggleProductSoldOut = (id: string) => {
    const target = products.find(p => p.id === id);
    if (!target) return;
    const nextSoldOut = !target.isSoldOut;
    const updatedSizes = target.sizes.map(s => ({ ...s, inStock: !nextSoldOut }));
    updateProduct(id, {
      isSoldOut: nextSoldOut,
      sizes: updatedSizes
    });
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));

    // Sync to Supabase
    if (supabase) {
      supabase.from('products').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase deleteProduct error:', error);
      });
    }
  };

  const loadDemoProducts = () => {
    setProducts(SAMPLE_LUXURY_PRODUCTS);
  };

  const clearAllProducts = () => {
    setProducts([]);
  };

  // Settings
  const updateSettings = (newSettings: StoreSettings) => {
    // Ensure admins list is always preserved for Supabase persistence
    const currentAdmins = (newSettings.adminUsers && newSettings.adminUsers.length > 0)
      ? newSettings.adminUsers
      : (newSettings.shippingRates?.admins && newSettings.shippingRates.admins.length > 0
          ? newSettings.shippingRates.admins
          : adminUsers);

    // If adminPin changed, sync owner user's password to match
    let adminsToPersist = currentAdmins;
    if (newSettings.adminPin && newSettings.adminPin !== settings.adminPin) {
      adminsToPersist = currentAdmins.map(u => u.role === 'owner' ? { ...u, password: newSettings.adminPin! } : u);
      setAdminUsers(adminsToPersist);
      try {
        localStorage.setItem('oro_puro_admin_users', JSON.stringify(adminsToPersist));
      } catch {}
    }

    const shippingWithLogoAndAdmins = {
      ...newSettings.shippingRates,
      admins: adminsToPersist,
      logoUrl: newSettings.logoUrl,
    };
    const settingsToSave: StoreSettings = {
      ...newSettings,
      adminUsers: adminsToPersist,
      shippingRates: shippingWithLogoAndAdmins,
    };
    setSettings(settingsToSave);

    // Sync to Supabase
    if (supabase) {
      supabase.from('settings').upsert({
        id: 'default',
        store_name: settingsToSave.storeName,
        store_tagline: settingsToSave.storeTagline,
        whatsapp_number: settingsToSave.whatsappNumber,
        vodafone_cash_number: settingsToSave.vodafoneCashNumber,
        instapay_address: settingsToSave.instapayAddress,
        instapay_account_name: settingsToSave.instapayAccountName,
        free_shipping_threshold: settingsToSave.freeShippingThreshold,
        shipping_rates: settingsToSave.shippingRates,
        admin_pin: settingsToSave.adminPin || '1331',
      }).then(({ error }) => {
        if (error) console.error('Supabase updateSettings error:', error);
      });
    }
  };

  // Multi-Admin Team Management (Database Synced)
  const addAdminUser = (newAdmin: Omit<AdminUser, 'id' | 'createdAt'>) => {
    const created: AdminUser = {
      ...newAdmin,
      id: `admin_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [...adminUsers, created];
    setAdminUsers(updated);
    try {
      localStorage.setItem('oro_puro_admin_users', JSON.stringify(updated));
    } catch {}

    const updatedRates = {
      ...settings.shippingRates,
      admins: updated,
    };
    const updatedSettings: StoreSettings = {
      ...settings,
      adminUsers: updated,
      shippingRates: updatedRates,
    };
    setSettings(updatedSettings);

    if (supabase) {
      supabase.from('settings').update({
        shipping_rates: updatedRates
      }).eq('id', 'default').then(({ error }) => {
        if (error) console.error('Supabase addAdminUser error:', error);
      });
    }
  };

  const updateAdminUser = (id: string, updatedFields: Partial<AdminUser>) => {
    const updated = adminUsers.map(u => (u.id === id ? { ...u, ...updatedFields } : u));
    setAdminUsers(updated);
    try {
      localStorage.setItem('oro_puro_admin_users', JSON.stringify(updated));
    } catch {}

    if (currentAdminUser?.id === id) {
      const nextCurrent = { ...currentAdminUser, ...updatedFields };
      setCurrentAdminUser(nextCurrent);
      sessionStorage.setItem('oro_puro_current_admin', JSON.stringify(nextCurrent));
    }

    const updatedRates = {
      ...settings.shippingRates,
      admins: updated,
    };
    const updatedSettings: StoreSettings = {
      ...settings,
      adminUsers: updated,
      shippingRates: updatedRates,
    };
    setSettings(updatedSettings);

    if (supabase) {
      supabase.from('settings').update({
        shipping_rates: updatedRates
      }).eq('id', 'default').then(({ error }) => {
        if (error) console.error('Supabase updateAdminUser error:', error);
      });
    }
  };

  const deleteAdminUser = (id: string) => {
    const target = adminUsers.find(u => u.id === id);
    if (target?.role === 'owner') {
      alert('لا يمكن حذف حساب المالك الرئيسي للنظام');
      return;
    }
    const updated = adminUsers.filter(u => u.id !== id);
    setAdminUsers(updated);
    try {
      localStorage.setItem('oro_puro_admin_users', JSON.stringify(updated));
    } catch {}

    const updatedRates = {
      ...settings.shippingRates,
      admins: updated,
    };
    const updatedSettings: StoreSettings = {
      ...settings,
      adminUsers: updated,
      shippingRates: updatedRates,
    };
    setSettings(updatedSettings);

    if (supabase) {
      supabase.from('settings').update({
        shipping_rates: updatedRates
      }).eq('id', 'default').then(({ error }) => {
        if (error) console.error('Supabase deleteAdminUser error:', error);
      });
    }
  };

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `ORO-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    setOrders(prev => [newOrder, ...prev]);

    // Sync to Supabase
    if (supabase) {
      supabase.from('orders').insert([{
        id: newOrder.id,
        customer_name: newOrder.customerName,
        phone: newOrder.phone,
        alternate_phone: newOrder.alternatePhone,
        governorate: newOrder.governorate,
        city_address: newOrder.cityAddress,
        notes: newOrder.notes,
        items: newOrder.items,
        subtotal: newOrder.subtotal,
        shipping_fee: newOrder.shippingFee,
        total: newOrder.total,
        payment_method: newOrder.paymentMethod,
        status: newOrder.status,
        created_at: newOrder.createdAt,
      }]).then(({ error }) => {
        if (error) console.error('Supabase createOrder error:', error);
      });
    }

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status } : o))
    );

    // Sync to Supabase
    if (supabase) {
      supabase.from('orders').update({ status }).eq('id', orderId).then(({ error }) => {
        if (error) console.error('Supabase updateOrderStatus error:', error);
      });
    }
  };

  // Reviews
  const addReview = (productId: string, userName: string, rating: number, comment: string) => {
    const newReview: Review = {
      id: `rev_${Date.now()}`,
      productId,
      userName,
      rating,
      comment,
      date: new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }),
    };

    setReviews(prev => [newReview, ...prev]);

    // Recalculate product rating
    setProducts(prev =>
      prev.map(p => {
        if (p.id === productId) {
          const currentReviews = reviews.filter(r => r.productId === productId);
          const totalRating = currentReviews.reduce((sum, r) => sum + r.rating, rating);
          const newCount = currentReviews.length + 1;
          const avgRating = Number((totalRating / newCount).toFixed(1));
          return { ...p, rating: avgRating, reviewsCount: newCount };
        }
        return p;
      })
    );

    // Sync to Supabase
    if (supabase) {
      supabase.from('reviews').insert([{
        id: newReview.id,
        product_id: productId,
        user_name: userName,
        rating,
        comment,
        created_at: new Date().toISOString(),
      }]).then(({ error }) => {
        if (error) console.error('Supabase addReview error:', error);
      });
    }
  };

  const getProductReviews = (productId: string) => {
    return reviews.filter(r => r.productId === productId);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        settings,
        cart,
        orders,
        reviews,
        activeView,
        setActiveView,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isFragranceFinderOpen,
        setIsFragranceFinderOpen,
        isComparisonOpen,
        setIsComparisonOpen,
        comparisonItems,
        addToComparison,
        removeFromComparison,
        clearComparison,
        activeProductForDetail,
        setActiveProductForDetail,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        adminUsers,
        currentAdminUser,
        loginAdmin,
        logoutAdmin,
        addAdminUser,
        updateAdminUser,
        deleteAdminUser,
        addProduct,
        updateProduct,
        toggleProductSoldOut,
        deleteProduct,
        loadDemoProducts,
        clearAllProducts,
        updateSettings,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        createOrder,
        updateOrderStatus,
        addReview,
        getProductReviews,
        language,
        setLanguage,
        toggleLanguage,
        theme,
        setTheme,
        toggleTheme,
        t,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
