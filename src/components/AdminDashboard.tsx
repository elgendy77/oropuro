import React, { useState, useEffect } from 'react';
import { 
  Package, Settings, Plus, Trash2, Edit3, Check, 
  Phone, MessageSquare, Sparkles, RefreshCw, Eye, Lock, LogOut, KeyRound,
  Megaphone, ShieldCheck, Search, Users, UserPlus, EyeOff, Shield, Crown,
  Upload, Image as ImageIcon, FileSpreadsheet, Download, Copy, Table,
  LayoutGrid, Truck, CheckCircle2, Clock
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import type { Product, OrderStatus, StoreSettings, PerfumeGender, PerfumeConcentration, FragranceFamily, SiteContentSettings, AdminUser, AdminRole } from '../types';
import { DEFAULT_SETTINGS } from '../data/initialData';
import { 
  downloadOrdersCSV, 
  copyOrdersToClipboard, 
  copyCourierSnippet, 
  getPaymentMethodLabel
} from '../utils/orderExport';

export const AdminDashboard: React.FC = () => {
  const { 
    products, 
    orders, 
    settings, 
    addProduct, 
    updateProduct, 
    toggleProductSoldOut,
    deleteProduct, 
    loadDemoProducts, 
    clearAllProducts,
    createOrder,
    updateOrderStatus,
    updateSettings,
    setActiveView,
    isAdminAuthenticated,
    adminUsers,
    currentAdminUser,
    loginAdmin,
    logoutAdmin,
    addAdminUser,
    updateAdminUser,
    deleteAdminUser
  } = useStore();

  // Multi-Admin Login State
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginErrorMsg, setLoginErrorMsg] = useState('');

  // Multi-Admin Management Tab State
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [editingAdminId, setEditingAdminId] = useState<string | null>(null);
  const [adminFormData, setAdminFormData] = useState<{
    name: string;
    username: string;
    password: string;
    role: AdminRole;
    isActive: boolean;
  }>({
    name: '',
    username: '',
    password: '',
    role: 'manager',
    isActive: true,
  });
  const [showPasswordMap, setShowPasswordMap] = useState<Record<string, boolean>>({});
  const [showAdminFormPass, setShowAdminFormPass] = useState(false);

  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'settings' | 'content' | 'admins'>('products');

  // Product table search & filter state
  const [productSearch, setProductSearch] = useState('');
  const [productStockFilter, setProductStockFilter] = useState<'all' | 'in_stock' | 'sold_out'>('all');
  const [productGenderFilter, setProductGenderFilter] = useState<'all' | 'men' | 'women' | 'unisex'>('all');
  const [settingsStockSearch, setSettingsStockSearch] = useState('');
  const [showSettingsPin, setShowSettingsPin] = useState(false);

  // Orders management, search, filters & spreadsheet export state
  const [orderSearchTerm, setOrderSearchTerm] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | OrderStatus>('all');
  const [orderPaymentFilter, setOrderPaymentFilter] = useState<'all' | 'instapay' | 'vodafone_cash' | 'cod'>('all');
  const [orderViewMode, setOrderViewMode] = useState<'spreadsheet' | 'cards'>('spreadsheet');
  const [orderFeedbackMessage, setOrderFeedbackMessage] = useState<string | null>(null);

  const showOrderFeedback = (msg: string) => {
    setOrderFeedbackMessage(msg);
    setTimeout(() => setOrderFeedbackMessage(null), 3500);
  };

  const handleAddDemoOrder = () => {
    const demoEgyptianCustomers = [
      { name: 'أحمد محمود النجار', phone: '01012345678', altPhone: '01123456789', gov: 'القاهرة', address: 'التجمع الخامس، شارع التسعين الشمالي، كمبوند ماونتن فيو، عمارة 12 شقة 4', notes: 'يرجى الاتصال قبل الوصول بنصف ساعة' },
      { name: 'سارة خالد الدسوقي', phone: '01234567890', altPhone: '', gov: 'الجيزة', address: 'الدقي، شارع مصدق، برج الأطباء، الدور السادس', notes: 'التسليم بعد الساعة 5 مساءً' },
      { name: 'محمد عبد الرحمن الشيخ', phone: '01555667788', altPhone: '01099887766', gov: 'الإسكندرية', address: 'سموحة، شارع فوزي معاذ، أمام نادي سموحة', notes: 'الدفع نقداً عند الاستلام' },
      { name: 'نورهان طارق الباز', phone: '01198765432', altPhone: '', gov: 'المنصورة', address: 'شارع المشاية السفلية، بجوار جزيرة الورد', notes: 'تغليف هدية راقي لو تكرمتم' },
    ];
    const customer = demoEgyptianCustomers[Math.floor(Math.random() * demoEgyptianCustomers.length)];
    const samplePerfume = products.length > 0 
      ? products[Math.floor(Math.random() * products.length)]
      : { id: 'p1', name: 'عطر أورو الذهبي الملكي', brand: 'Oro Puro', image: '/images/perfume-sample-1.jpg', sizes: [{ size: '100 مل', price: 1000 }] };
    
    const size = samplePerfume.sizes && samplePerfume.sizes[0] ? samplePerfume.sizes[0].size : '100 مل';
    const price = samplePerfume.sizes && samplePerfume.sizes[0] ? samplePerfume.sizes[0].price : 1000;
    const qty = 1;
    const subtotal = price * qty;
    const shippingFee = subtotal >= (settings.freeShippingThreshold || 1200) ? 0 : 50;

    createOrder({
      customerName: customer.name,
      phone: customer.phone,
      alternatePhone: customer.altPhone,
      governorate: customer.gov,
      cityAddress: customer.address,
      notes: customer.notes,
      items: [{
        id: `${samplePerfume.id}_${size}`,
        productId: samplePerfume.id,
        name: samplePerfume.name,
        brand: samplePerfume.brand,
        image: samplePerfume.image || '/images/perfume-sample-1.jpg',
        selectedSize: size,
        price: price,
        quantity: qty
      }],
      subtotal: subtotal,
      shippingFee: shippingFee,
      total: subtotal + shippingFee,
      paymentMethod: Math.random() > 0.5 ? 'cod' : 'instapay',
    });
    showOrderFeedback(`تم إنشاء طلب تجريبي جديد باسم (${customer.name}) بنجاح!`);
  };

  // Content Customizer (CMS) state
  const [contentForm, setContentForm] = useState<SiteContentSettings>(() => ({
    ...(DEFAULT_SETTINGS.siteContent as SiteContentSettings),
    ...(settings.siteContent || {})
  }));
  const [contentSaved, setContentSaved] = useState(false);

  useEffect(() => {
    if (settings.siteContent) {
      setContentForm(prev => ({
        ...prev,
        ...settings.siteContent
      }));
    }
  }, [settings.siteContent]);

  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      ...settings,
      siteContent: contentForm
    });
    setContentSaved(true);
    setTimeout(() => setContentSaved(false), 3500);
  };
  
  // Product Modal Form state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    name: string;
    brand: string;
    gender: PerfumeGender;
    concentration: PerfumeConcentration;
    fragranceFamily: FragranceFamily;
    description: string;
    image: string;
    isFeatured: boolean;
    isSoldOut: boolean;
    sizes: Array<{ size: string; price: number; originalPrice?: number; inStock: boolean }>;
    topNotes: string;
    heartNotes: string;
    baseNotes: string;
  }>({
    name: '',
    brand: '',
    gender: 'men',
    concentration: 'Eau de Parfum',
    fragranceFamily: 'oriental',
    description: '',
    image: '/images/perfume-sample-1.jpg',
    isFeatured: false,
    isSoldOut: false,
    sizes: [
      { size: '50 مل', price: 1500, originalPrice: 1800, inStock: true },
      { size: '100 مل', price: 2500, originalPrice: 2900, inStock: true }
    ],
    topNotes: 'البرغموت، اللافندر',
    heartNotes: 'العود، الهيل',
    baseNotes: 'العنبر، خشب الصندل'
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<StoreSettings>(settings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    setSettingsForm(settings);
  }, [settings]);

  // Open modal for new product
  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setFormData({
      name: '',
      brand: '',
      gender: 'men',
      concentration: 'Eau de Parfum',
      fragranceFamily: 'oriental',
      description: '',
      image: '/images/perfume-sample-1.jpg',
      isFeatured: false,
      isSoldOut: false,
      sizes: [
        { size: '50 مل', price: 1500, originalPrice: 1800, inStock: true },
        { size: '100 مل', price: 2500, originalPrice: 2900, inStock: true }
      ],
      topNotes: 'البرغموت، الهيل',
      heartNotes: 'العود، خشب الأرز',
      baseNotes: 'العنبر، المسك'
    });
    setIsProductModalOpen(true);
  };

  // Open modal for editing product
  const handleOpenEditProduct = (p: Product) => {
    const isPProductSoldOut = Boolean(p.isSoldOut || (p.sizes && p.sizes.length > 0 && p.sizes.every(s => !s.inStock)));
    setEditingProductId(p.id);
    setFormData({
      name: p.name,
      brand: p.brand,
      gender: p.gender,
      concentration: p.concentration,
      fragranceFamily: p.fragranceFamily || 'oriental',
      description: p.description,
      image: p.image,
      isFeatured: !!p.isFeatured,
      isSoldOut: isPProductSoldOut,
      sizes: p.sizes.length > 0 ? p.sizes : [{ size: '100 مل', price: 1000, inStock: !isPProductSoldOut }],
      topNotes: p.notes?.top?.join('، ') || '',
      heartNotes: p.notes?.heart?.join('، ') || '',
      baseNotes: p.notes?.base?.join('، ') || '',
    });
    setIsProductModalOpen(true);
  };

  // Save product (Add or Edit)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const productPayload = {
      name: formData.name,
      brand: formData.brand,
      gender: formData.gender,
      concentration: formData.concentration,
      fragranceFamily: formData.fragranceFamily,
      description: formData.description,
      image: formData.image,
      isFeatured: formData.isFeatured,
      isSoldOut: formData.isSoldOut,
      sizes: formData.isSoldOut ? formData.sizes.map(s => ({ ...s, inStock: false })) : formData.sizes,
      notes: {
        top: formData.topNotes.split(/[،,]/).map(s => s.trim()).filter(Boolean),
        heart: formData.heartNotes.split(/[،,]/).map(s => s.trim()).filter(Boolean),
        base: formData.baseNotes.split(/[،,]/).map(s => s.trim()).filter(Boolean),
      },
      rating: 5.0,
      reviewsCount: 1,
    };

    if (editingProductId) {
      updateProduct(editingProductId, productPayload);
    } else {
      addProduct(productPayload);
    }

    setIsProductModalOpen(false);
  };

  // Add size variation to form
  const handleAddSizeRow = () => {
    setFormData(prev => ({
      ...prev,
      sizes: [...prev.sizes, { size: '30 مل', price: 1000, inStock: true }]
    }));
  };

  // Update size variation
  const handleUpdateSizeRow = (index: number, field: string, value: any) => {
    setFormData(prev => {
      const updated = [...prev.sizes];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, sizes: updated };
    });
  };

  // Remove size variation
  const handleRemoveSizeRow = (index: number) => {
    if (formData.sizes.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index)
    }));
  };

  // Logo file upload handler
  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('حجم الصورة كبير جداً، يرجى اختيار صورة أقل من 2 ميجابايت لضمان سرعة تحميل الموقع.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setSettingsForm(prev => ({
          ...prev,
          logoUrl: result
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Hero image file upload handler
  const handleHeroFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('حجم الصورة كبير جداً، يرجى اختيار صورة أقل من 2 ميجابايت لضمان سرعة تحميل الموقع.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setContentForm(prev => ({
          ...prev,
          heroImageUrl: result
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Save settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  // Admin Team modal handlers
  const handleOpenAddAdmin = () => {
    setEditingAdminId(null);
    setAdminFormData({
      name: '',
      username: '',
      password: '',
      role: 'manager',
      isActive: true,
    });
    setIsAdminModalOpen(true);
  };

  const handleOpenEditAdmin = (admin: AdminUser) => {
    setEditingAdminId(admin.id);
    setAdminFormData({
      name: admin.name,
      username: admin.username,
      password: admin.password,
      role: admin.role,
      isActive: admin.isActive,
    });
    setIsAdminModalOpen(true);
  };

  const handleSaveAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUsername = adminFormData.username.trim().toLowerCase();
    const cleanName = adminFormData.name.trim();
    const cleanPass = adminFormData.password.trim();

    if (!cleanUsername || !cleanPass || !cleanName) {
      alert('يرجى تعبئة كافة الحقول المطلوبة (الاسم، اسم المستخدم، وكلمة المرور)');
      return;
    }

    const exists = adminUsers.find(
      u => u.username.toLowerCase() === cleanUsername && u.id !== editingAdminId
    );
    if (exists) {
      alert('اسم المستخدم هذا مستخدم بالفعل، يرجى اختيار اسم مستخدم مميز.');
      return;
    }

    if (editingAdminId) {
      updateAdminUser(editingAdminId, {
        name: cleanName,
        username: cleanUsername,
        password: cleanPass,
        role: adminFormData.role,
        isActive: adminFormData.isActive,
      });
    } else {
      addAdminUser({
        name: cleanName,
        username: cleanUsername,
        password: cleanPass,
        role: adminFormData.role,
        isActive: adminFormData.isActive,
      });
    }

    setIsAdminModalOpen(false);
  };

  // Order stats
  const totalSales = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  // Security Login Check (Username + Password / PIN)
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-[#FAF7F2] dark:bg-[#0A0D14] transition-colors">
        <div className="w-full max-w-md bg-white dark:bg-[#121722] border border-[#E8E2D8] dark:border-[#1E2638] rounded-3xl p-8 shadow-xl text-center">
          <div className="w-16 h-16 rounded-full bg-forest-50 dark:bg-gold-500/10 border border-forest-200 dark:border-gold-500/30 text-forest-800 dark:text-gold-400 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Lock className="w-8 h-8" />
          </div>
          
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">
            بوابة الإدارة والمشرفين
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium">
            متجر أورو بورو | Oro Puro Parfums
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLoginErrorMsg('');
              const success = loginAdmin(loginUsername, loginPassword);
              if (!success) {
                setLoginErrorMsg('بيانات الدخول غير صحيحة أو الحساب غير مفعل.');
              }
            }}
            className="space-y-4 text-right"
          >
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                اسم المستخدم (Username)
              </label>
              <input
                type="text"
                value={loginUsername}
                onChange={(e) => {
                  setLoginUsername(e.target.value);
                  setLoginErrorMsg('');
                }}
                placeholder="أدخل اسم المستخدم المصرح به..."
                className="w-full bg-[#FAF7F2] dark:bg-[#1A2234] border border-slate-300 dark:border-[#2A364F] rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-forest-700 dark:focus:border-gold-500 focus:ring-2 focus:ring-forest-700/20 transition-all font-medium text-right"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                كلمة المرور أو رمز PIN السري
              </label>
              <div className="relative">
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                    setLoginErrorMsg('');
                  }}
                  placeholder="••••••••"
                  className="w-full bg-[#FAF7F2] dark:bg-[#1A2234] border border-slate-300 dark:border-[#2A364F] rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-forest-700 dark:focus:border-gold-500 focus:ring-2 focus:ring-forest-700/20 transition-all font-medium pl-10 text-right"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1"
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginErrorMsg && (
              <p className="text-xs text-rose-600 dark:text-rose-400 font-bold bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 rounded-xl p-2.5 text-center animate-pulse">
                {loginErrorMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-forest-800 hover:bg-forest-900 dark:bg-gold-500 dark:hover:bg-gold-600 text-white dark:text-slate-950 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>تسجيل الدخول إلى لوحة التحكم</span>
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-[#1E2638] flex flex-col gap-2 text-xs text-slate-500 dark:text-slate-400 text-center">
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/50 rounded-xl py-2 px-3">
              <Shield className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>منطقة محميّة ومخصصة للإدارة والمشرفين المصرح لهم فقط</span>
            </div>
            <button
              type="button"
              onClick={() => setActiveView('store')}
              className="text-forest-800 dark:text-gold-400 hover:underline font-bold mt-2"
            >
              العودة لواجهة المتجر &larr;
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-[#E8E2D8]">
          <div>
            <div className="flex items-center gap-2 text-forest-700 text-xs font-bold uppercase tracking-wider mb-1 flex-wrap">
              <Sparkles className="w-4 h-4" />
              <span>نظام الإدارة والتحكم الداخلي</span>
              {currentAdminUser && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300">
                  <Crown className="w-3.5 h-3.5 text-amber-700" />
                  <span>
                    {currentAdminUser.name} ({currentAdminUser.role === 'owner' ? 'المالك الرئيسي' : currentAdminUser.role === 'manager' ? 'مدير متجر' : 'مسؤول مبيعات'})
                  </span>
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              لوحة تحكم متجر <span className="gold-gradient-text">ORO PURO</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('store')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white border border-[#DCD3C5] text-slate-700 hover:text-forest-800 hover:border-forest-700 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Eye className="w-4 h-4 text-forest-700" />
              <span>معاينة واجهة المتجر</span>
            </button>
            <button
              onClick={logoutAdmin}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 transition-colors flex items-center gap-2 shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>قفل وخروج</span>
            </button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex border-b border-[#E8E2D8] gap-2 sm:gap-4 mb-8 overflow-x-auto no-scrollbar scroll-smooth -mx-2 px-2 sm:mx-0 sm:px-0">
          <button
            onClick={() => setActiveTab('products')}
            className={`shrink-0 whitespace-nowrap flex items-center gap-2 pb-3 px-3 sm:px-4 text-xs sm:text-sm font-bold transition-all border-b-2 ${
              activeTab === 'products'
                ? 'border-forest-800 text-forest-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>إدارة العطور ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`shrink-0 whitespace-nowrap flex items-center gap-2 pb-3 px-3 sm:px-4 text-xs sm:text-sm font-bold transition-all border-b-2 relative ${
              activeTab === 'orders'
                ? 'border-forest-800 text-forest-800 bg-forest-50/60 rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span className="font-mono font-black tracking-wide">Orders</span>
            <span>(طلبات العملاء)</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-black ${
              orders.length > 0 ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-slate-100 text-slate-600'
            }`}>
              {orders.length}
            </span>
            {orders.filter(o => o.status === 'new').length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-white animate-pulse shadow-xs">
                جديد {orders.filter(o => o.status === 'new').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`shrink-0 whitespace-nowrap flex items-center gap-2 pb-3 px-3 sm:px-4 text-xs sm:text-sm font-bold transition-all border-b-2 ${
              activeTab === 'settings'
                ? 'border-forest-800 text-forest-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>إعدادات الدفع والواتساب</span>
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`shrink-0 whitespace-nowrap flex items-center gap-2 pb-3 px-3 sm:px-4 text-xs sm:text-sm font-bold transition-all border-b-2 ${
              activeTab === 'content'
                ? 'border-forest-800 text-forest-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Megaphone className="w-4 h-4 text-gold-600" />
            <span>تعديل نصوص وصور وعروض الموقع (CMS)</span>
          </button>

          <button
            onClick={() => setActiveTab('admins')}
            className={`shrink-0 whitespace-nowrap flex items-center gap-2 pb-3 px-3 sm:px-4 text-xs sm:text-sm font-bold transition-all border-b-2 ${
              activeTab === 'admins'
                ? 'border-forest-800 text-forest-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4 text-forest-700" />
            <span>فريق الإدارة والمشرفين ({adminUsers.length})</span>
          </button>
        </div>

        {/* TAB 1: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (() => {
          const soldOutCount = products.filter(p => p.isSoldOut || (p.sizes && p.sizes.length > 0 && p.sizes.every(s => !s.inStock))).length;
          const inStockCount = products.length - soldOutCount;
          const womenCount = products.filter(p => p.gender === 'women').length;
          const menCount = products.filter(p => p.gender === 'men').length;
          const unisexCount = products.filter(p => p.gender === 'unisex').length;

          const filteredAdminProducts = products.filter(p => {
            const isSoldOut = Boolean(p.isSoldOut || (p.sizes && p.sizes.length > 0 && p.sizes.every(s => !s.inStock)));
            if (productStockFilter === 'in_stock' && isSoldOut) return false;
            if (productStockFilter === 'sold_out' && !isSoldOut) return false;
            if (productGenderFilter !== 'all' && p.gender !== productGenderFilter) return false;
            if (productSearch.trim()) {
              const q = productSearch.toLowerCase().trim();
              const matchName = p.name.toLowerCase().includes(q);
              const matchBrand = p.brand.toLowerCase().includes(q);
              return matchName || matchBrand;
            }
            return true;
          });

          return (
            <div className="space-y-6">
              
              {/* Actions & Filters Toolbar */}
              <div className="p-4 rounded-2xl bg-white border border-[#E8E2D8] shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleOpenAddProduct}
                      className="btn-forest px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>إضافة عطر جديد</span>
                    </button>

                    <button
                      onClick={loadDemoProducts}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#FAF7F2] text-slate-800 border border-[#DCD3C5] hover:border-forest-700 transition-colors flex items-center gap-1.5"
                      title="تحميل عينات عطور عالمية تجريبية"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-forest-700" />
                      <span>تحميل عطور تجريبية جاهزة</span>
                    </button>
                  </div>

                  {products.length > 0 && (
                    <button
                      onClick={() => {
                        if (confirm('هل أنت متأكد من تفريغ كافة المنتجات؟')) {
                          clearAllProducts();
                        }
                      }}
                      className="text-xs text-red-600 hover:text-red-700 font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>تفريغ كل العطور</span>
                    </button>
                  )}
                </div>

                {/* Search & Stock Status Filters */}
                {products.length > 0 && (
                  <div className="pt-3 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    {/* Filter Pills Group */}
                    <div className="flex flex-wrap items-center gap-2 overflow-x-auto no-scrollbar">
                      {/* Gender Pills */}
                      <button
                        onClick={() => setProductGenderFilter('all')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                          productGenderFilter === 'all'
                            ? 'bg-slate-900 text-white shadow-xs'
                            : 'bg-[#FAF7F2] text-slate-700 border border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        الكل ({products.length})
                      </button>

                      <button
                        onClick={() => setProductGenderFilter('women')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                          productGenderFilter === 'women'
                            ? 'bg-rose-700 text-white shadow-xs'
                            : 'bg-rose-50 text-rose-800 border border-rose-200 hover:border-rose-400'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-rose-400" />
                        <span>🌸 نسائي ({womenCount})</span>
                      </button>

                      <button
                        onClick={() => setProductGenderFilter('men')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                          productGenderFilter === 'men'
                            ? 'bg-forest-800 text-white shadow-xs'
                            : 'bg-forest-50 text-forest-800 border border-forest-200 hover:border-forest-400'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-forest-400" />
                        <span>👔 رجالي ({menCount})</span>
                      </button>

                      <button
                        onClick={() => setProductGenderFilter('unisex')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                          productGenderFilter === 'unisex'
                            ? 'bg-amber-700 text-white shadow-xs'
                            : 'bg-amber-50 text-amber-800 border border-amber-200 hover:border-amber-400'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        <span>✨ للجنسين ({unisexCount})</span>
                      </button>

                      <div className="h-4 w-px bg-slate-300 mx-1 hidden sm:block" />

                      {/* Stock Pills */}
                      <button
                        onClick={() => setProductStockFilter('in_stock')}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                          productStockFilter === 'in_stock'
                            ? 'bg-emerald-700 text-white shadow-xs'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:border-emerald-400'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>المتوفر ({inStockCount})</span>
                      </button>

                      <button
                        onClick={() => setProductStockFilter('sold_out')}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                          productStockFilter === 'sold_out'
                            ? 'bg-rose-700 text-white shadow-xs'
                            : 'bg-rose-50 text-rose-800 border border-rose-200 hover:border-rose-400'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        <span>نفد ({soldOutCount})</span>
                      </button>
                    </div>

                    {/* Search Field */}
                    <div className="relative w-full md:w-64">
                      <input
                        type="text"
                        placeholder="بحث بالاسم أو الماركة..."
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl pl-3 pr-8 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-forest-700"
                      />
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                )}
              </div>

              {/* Products Table */}
              {products.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-white border border-dashed border-[#DCD3C5] shadow-sm">
                  <Package className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-slate-900 mb-1">لا توجد عطور مضافة حالياً</h3>
                  <p className="text-xs text-slate-500 mb-6">
                    المتجر فارغ تماماً وفقاً لاختيارك. يمكنك البدء بإضافة عطرك الأول أو تحميل باقة عطور عالمية جاهزة بضغطة زر.
                  </p>
                  <div className="flex justify-center gap-3">
                    <button onClick={handleOpenAddProduct} className="btn-forest px-5 py-2 rounded-xl text-xs font-bold">
                      إضافة عطر الآن
                    </button>
                    <button onClick={loadDemoProducts} className="px-5 py-2 rounded-xl text-xs font-bold bg-[#FAF7F2] text-slate-800 border border-[#DCD3C5]">
                      تحميل عطور تجريبية
                    </button>
                  </div>
                </div>
              ) : filteredAdminProducts.length === 0 ? (
                <div className="p-10 text-center rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-600">
                  <p className="font-bold text-sm">لا توجد عطور مطابقة للفلاتر أو كلمة البحث الحالية</p>
                  <button
                    onClick={() => { setProductSearch(''); setProductStockFilter('all'); }}
                    className="mt-3 text-xs text-forest-700 font-bold underline"
                  >
                    إعادة ضبط الفلاتر وعرض كل العطور
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-[#E8E2D8] bg-white shadow-sm">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-[#FAF7F2] text-slate-800 font-bold border-b border-[#E8E2D8]">
                      <tr>
                        <th className="p-4">الصورة</th>
                        <th className="p-4">اسم العطر والماركة</th>
                        <th className="p-4">الفئة والتركيز</th>
                        <th className="p-4">الأحجام والأسعار</th>
                        <th className="p-4">حالة المخزون (Sold Out)</th>
                        <th className="p-4">التقييم</th>
                        <th className="p-4 text-center">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0EBE1]">
                      {filteredAdminProducts.map((p) => {
                        const isSoldOut = Boolean(p.isSoldOut || (p.sizes && p.sizes.length > 0 && p.sizes.every(s => !s.inStock)));
                        return (
                          <tr key={p.id} className="hover:bg-[#FAF8F5] transition-colors">
                            <td className="p-4">
                              <div className="w-12 h-12 rounded-lg bg-[#FAF7F2] p-1 flex items-center justify-center border border-slate-200">
                                <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
                              </div>
                            </td>
                            <td className="p-4">
                              <p className="font-bold text-slate-900 text-sm">{p.name}</p>
                              <p className="text-[11px] text-gold-700 font-bold">{p.brand}</p>
                            </td>
                            <td className="p-4">
                              <span className="px-2 py-0.5 rounded bg-[#FAF7F2] text-slate-700 border border-slate-200 ml-1.5 font-bold">
                                {p.gender === 'men' ? 'رجالي' : p.gender === 'women' ? 'نسائي' : 'للجنسين'}
                              </span>
                              <span className="text-slate-500 font-mono">{p.concentration}</span>
                            </td>
                            <td className="p-4">
                              <div className="flex flex-col gap-1">
                                {p.sizes.map((s) => (
                                  <span key={s.size} className="text-slate-700 font-sans">
                                    {s.size}: <strong className="text-slate-900">{s.price.toLocaleString('ar-EG')} ج.م</strong>
                                  </span>
                                ))}
                              </div>
                            </td>

                            {/* One-Click Instant Sold Out Toggle */}
                            <td className="p-4">
                              {isSoldOut ? (
                                <button
                                  type="button"
                                  onClick={() => toggleProductSoldOut(p.id)}
                                  className="px-3 py-1.5 rounded-xl text-xs font-black bg-rose-50 border border-rose-300 text-rose-700 hover:bg-rose-100 flex items-center gap-1.5 shadow-2xs transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
                                  title="العطر معلّم كـ نفد من المخزون - انقر لتحويله إلى متوفر"
                                >
                                  <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
                                  <span>نفد من المخزون (Sold Out)</span>
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => toggleProductSoldOut(p.id)}
                                  className="px-3 py-1.5 rounded-xl text-xs font-black bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-emerald-100 flex items-center gap-1.5 shadow-2xs transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
                                  title="العطر متوفر للبيع - انقر لتعليمه كـ نفد من المخزون"
                                >
                                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                                  <span>متوفر بالمخزون ✓</span>
                                </button>
                              )}
                            </td>

                            <td className="p-4 font-sans text-amber-500 font-bold whitespace-nowrap">
                              ⭐ {p.rating} ({p.reviewsCount})
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => handleOpenEditProduct(p)}
                                  className="p-1.5 rounded-lg bg-[#FAF7F2] border border-slate-200 text-slate-700 hover:text-forest-800"
                                  title="تعديل العطر"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm(`هل أنت متأكد من حذف ${p.name}؟`)) {
                                      deleteProduct(p.id);
                                    }
                                  }}
                                  className="p-1.5 rounded-lg bg-red-50 border border-red-200 text-red-600 hover:text-red-700"
                                  title="حذف العطر"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

            </div>
          );
        })()}

        {/* TAB 2: ORDERS MANAGEMENT & EXCEL / CSV SPREADSHEET */}
        {activeTab === 'orders' && (() => {
          // Computed metrics
          const newOrders = orders.filter(o => o.status === 'new');
          const processingOrders = orders.filter(o => o.status === 'processing');
          const shippedOrders = orders.filter(o => o.status === 'shipped');
          const deliveredOrders = orders.filter(o => o.status === 'delivered');
          const cancelledOrders = orders.filter(o => o.status === 'cancelled');
          const activeOrders = orders.filter(o => o.status !== 'cancelled');
          const avgOrderValue = activeOrders.length > 0 ? Math.round(totalSales / activeOrders.length) : 0;

          // Filtered list
          const filteredOrders = orders.filter(o => {
            // Status filter
            if (orderStatusFilter !== 'all' && o.status !== orderStatusFilter) {
              return false;
            }
            // Payment method filter
            if (orderPaymentFilter !== 'all' && o.paymentMethod !== orderPaymentFilter) {
              return false;
            }
            // Search term
            if (orderSearchTerm.trim()) {
              const q = orderSearchTerm.toLowerCase().trim();
              const matchId = o.id.toLowerCase().includes(q);
              const matchName = o.customerName.toLowerCase().includes(q);
              const matchPhone = o.phone.includes(q) || (o.alternatePhone && o.alternatePhone.includes(q));
              const matchGov = o.governorate.toLowerCase().includes(q);
              const matchAddress = o.cityAddress.toLowerCase().includes(q);
              const matchItems = o.items.some(item => item.name.toLowerCase().includes(q));
              return matchId || matchName || matchPhone || matchGov || matchAddress || matchItems;
            }
            return true;
          });

          return (
            <div className="space-y-6">
              {/* Feedback Toast Notification */}
              {orderFeedbackMessage && (
                <div className="p-4 rounded-2xl bg-emerald-900 text-emerald-100 border border-emerald-500/50 shadow-lg flex items-center justify-between gap-3 animate-fade-in">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span className="text-xs sm:text-sm font-bold">{orderFeedbackMessage}</span>
                  </div>
                  <button 
                    onClick={() => setOrderFeedbackMessage(null)}
                    className="text-xs text-emerald-300 hover:text-white underline font-bold px-2 py-1"
                  >
                    إغلاق
                  </button>
                </div>
              )}

              {/* Top Summary Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E2D8] shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[11px] sm:text-xs text-slate-500 font-bold">إجمالي المبيعات المحققة</p>
                    <span className="w-2 h-2 rounded-full bg-forest-600" />
                  </div>
                  <p className="text-xl sm:text-2xl font-black text-forest-800 font-sans">
                    {totalSales.toLocaleString('ar-EG')} ج.م
                  </p>
                  <p className="text-[10px] text-slate-600 mt-1">من الطلبات المؤكدة والنشطة</p>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E2D8] shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[11px] sm:text-xs text-slate-500 font-bold">إجمالي الطلبات المسجلة</p>
                    <FileSpreadsheet className="w-4 h-4 text-slate-400" />
                  </div>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 font-sans">
                    {orders.length} طلب
                  </p>
                  <p className="text-[10px] text-slate-600 mt-1">كافة الفواتير في النظام</p>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E2D8] shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[11px] sm:text-xs text-amber-700 font-bold">طلبات جديدة للشحن</p>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                  </div>
                  <p className="text-xl sm:text-2xl font-black text-amber-600 font-sans">
                    {newOrders.length} طلب جديد
                  </p>
                  <p className="text-[10px] text-amber-800 mt-1">تحتاج تأكيد وتجهيز</p>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E2D8] shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[11px] sm:text-xs text-slate-500 font-bold">متوسط قيمة السلة</p>
                    <Clock className="w-4 h-4 text-slate-400" />
                  </div>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 font-sans">
                    {avgOrderValue.toLocaleString('ar-EG')} ج.م
                  </p>
                  <p className="text-[10px] text-slate-600 mt-1">متوسط الصرف لكل عميل</p>
                </div>
              </div>

              {/* EXCEL & CSV EXPORT CONTROL CENTER */}
              <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#021F17] via-[#064E3B] to-[#021F17] border-2 border-amber-400 text-white shadow-md space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-md">
                      <FileSpreadsheet className="w-6 h-6 text-slate-950" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base sm:text-lg font-black text-white">
                          مركز استخراج وسحب الطلبات إلى Excel & CSV
                        </h3>
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 font-mono font-bold">
                          UTF-8 BOM (عربي 100%)
                        </span>
                      </div>
                      <p className="text-xs text-slate-200 mt-0.5 max-w-2xl">
                        تصدير مباشر لكافة الفواتير وأرقام العملاء وعناوين الشحن. تفتح الملفات في برنامج <strong className="text-amber-300">Microsoft Excel</strong> و <strong className="text-amber-300">Google Sheets</strong> وشركات الشحن (بوسطة، مايلرز، أرامكس) فوراً وبدون أي أخطاء في الحروف العربية أو الأرقام.
                      </p>
                    </div>
                  </div>

                  {/* Add Demo Order Button */}
                  <button
                    type="button"
                    onClick={handleAddDemoOrder}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                    title="إضافة طلب تجريبي سريع لعميل مصري لاختبار السحب والتصدير"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-300" />
                    <span>+ إضافة أوردر تجريبي للاختبار</span>
                  </button>
                </div>

                {/* Primary Export Actions Bar */}
                <div className="pt-2 border-t border-emerald-800/60 flex flex-wrap items-center gap-2.5 sm:gap-3">
                  {/* Export All Orders */}
                  <button
                    type="button"
                    onClick={() => {
                      if (orders.length === 0) {
                        alert('لا توجد طلبات مسجلة حالياً لتصديرها.');
                        return;
                      }
                      const dateStr = new Date().toISOString().slice(0, 10);
                      downloadOrdersCSV(orders, `طلبات_ORO_PURO_الكاملة_${dateStr}.csv`);
                      showOrderFeedback(`تم تحميل ملف CSV لكافة الطلبات (${orders.length} طلب) بنجاح!`);
                    }}
                    disabled={orders.length === 0}
                    className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all shadow-md ${
                      orders.length > 0
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 hover:scale-[1.02] cursor-pointer'
                        : 'bg-white/10 text-white/40 cursor-not-allowed border border-white/10'
                    }`}
                  >
                    <Download className="w-4 h-4 text-slate-950" />
                    <span>تصدير كافة الطلبات إلى Excel / CSV ({orders.length})</span>
                  </button>

                  {/* Export New Orders Only */}
                  <button
                    type="button"
                    onClick={() => {
                      if (newOrders.length === 0) {
                        alert('لا توجد طلبات جديدة بانتظار الشحن حالياً.');
                        return;
                      }
                      const dateStr = new Date().toISOString().slice(0, 10);
                      downloadOrdersCSV(newOrders, `طلبات_جديدة_بانتظار_الشحن_${dateStr}.csv`);
                      showOrderFeedback(`تم استخراج شيت الطلبات الجديدة لشركة الشحن (${newOrders.length} طلب)!`);
                    }}
                    disabled={newOrders.length === 0}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                      newOrders.length > 0
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs cursor-pointer hover:scale-[1.02]'
                        : 'bg-white/5 text-white/30 cursor-not-allowed border border-white/5'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-emerald-200" />
                    <span>سحب الطلبات الجديدة لشركة الشحن ({newOrders.length})</span>
                  </button>

                  {/* Copy to Clipboard (TSV for direct paste into Excel) */}
                  <button
                    type="button"
                    onClick={async () => {
                      if (filteredOrders.length === 0) {
                        alert('لا توجد طلبات مطابقة للنسخ.');
                        return;
                      }
                      const success = await copyOrdersToClipboard(filteredOrders);
                      if (success) {
                        showOrderFeedback(`تم نسخ بيانات (${filteredOrders.length}) طلب للحافظة! افتح Excel واضغط Ctrl+V.`);
                      } else {
                        alert('تعذر نسخ البيانات للحافظة.');
                      }
                    }}
                    disabled={filteredOrders.length === 0}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all bg-white/10 hover:bg-white/20 text-white border border-white/20 ${
                      filteredOrders.length === 0 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
                    }`}
                  >
                    <Copy className="w-3.5 h-3.5 text-amber-300" />
                    <span>نسخ الشيت للحافظة (Ctrl+V في إكسيل)</span>
                  </button>

                  {/* Export Filtered results if filtered */}
                  {filteredOrders.length > 0 && filteredOrders.length !== orders.length && (
                    <button
                      type="button"
                      onClick={() => {
                        const dateStr = new Date().toISOString().slice(0, 10);
                        downloadOrdersCSV(filteredOrders, `طلبات_مفلترة_ORO_PURO_${dateStr}.csv`);
                        showOrderFeedback(`تم تصدير نتائج التصفية (${filteredOrders.length} طلب) كـ CSV!`);
                      }}
                      className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 border border-amber-400/40 flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>تصدير نتائج الفلترة الحالية ({filteredOrders.length})</span>
                    </button>
                  )}
                </div>
              </div>

              {/* SEARCH, STATUS FILTER & VIEW TOGGLES TOOLBAR */}
              <div className="p-4 rounded-2xl bg-white border border-[#E8E2D8] shadow-sm space-y-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  
                  {/* Search Input */}
                  <div className="relative flex-1 max-w-md">
                    <input
                      type="text"
                      placeholder="بحث بكود الطلب #ORO، اسم العميل، الهاتف، المحافظة، أو العطر..."
                      value={orderSearchTerm}
                      onChange={(e) => setOrderSearchTerm(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl pl-3 pr-9 py-2 text-xs text-slate-900 focus:outline-none focus:border-forest-700"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* Payment Method Selector & View Switcher */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* Payment Method filter */}
                    <select
                      value={orderPaymentFilter}
                      onChange={(e) => setOrderPaymentFilter(e.target.value as any)}
                      className="text-xs font-bold bg-[#FAF7F2] border border-slate-300 text-slate-800 rounded-xl px-3 py-2 cursor-pointer focus:outline-none focus:border-forest-700"
                    >
                      <option value="all">كل طرق الدفع</option>
                      <option value="cod">الدفع عند الاستلام (COD)</option>
                      <option value="instapay">انستاباي (InstaPay)</option>
                      <option value="vodafone_cash">فودافون كاش</option>
                    </select>

                    {/* View Switcher: Spreadsheet vs Cards */}
                    <div className="flex items-center bg-[#FAF7F2] border border-slate-300 rounded-xl p-1 gap-1">
                      <button
                        type="button"
                        onClick={() => setOrderViewMode('spreadsheet')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                          orderViewMode === 'spreadsheet'
                            ? 'bg-forest-800 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                        title="عرض جدول إكسيل مباشر"
                      >
                        <Table className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">جدول إكسيل</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setOrderViewMode('cards')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                          orderViewMode === 'cards'
                            ? 'bg-forest-800 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                        title="عرض البطاقات التفصيلية"
                      >
                        <LayoutGrid className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">بطاقات</span>
                      </button>
                    </div>

                  </div>
                </div>

                {/* Status Pills Filter */}
                <div className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                  <button
                    onClick={() => setOrderStatusFilter('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      orderStatusFilter === 'all'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-[#FAF7F2] text-slate-700 border border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    كافة الطلبات ({orders.length})
                  </button>

                  <button
                    onClick={() => setOrderStatusFilter('new')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      orderStatusFilter === 'new'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-amber-50 text-amber-800 border border-amber-200 hover:border-amber-400'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>طلبات جديدة ({newOrders.length})</span>
                  </button>

                  <button
                    onClick={() => setOrderStatusFilter('processing')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      orderStatusFilter === 'processing'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-blue-50 text-blue-800 border border-blue-200 hover:border-blue-400'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>قيد التجهيز ({processingOrders.length})</span>
                  </button>

                  <button
                    onClick={() => setOrderStatusFilter('shipped')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      orderStatusFilter === 'shipped'
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-purple-50 text-purple-800 border border-purple-200 hover:border-purple-400'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    <span>تم الشحن ({shippedOrders.length})</span>
                  </button>

                  <button
                    onClick={() => setOrderStatusFilter('delivered')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      orderStatusFilter === 'delivered'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:border-emerald-400'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>مكتمل ومسلّم ({deliveredOrders.length})</span>
                  </button>

                  <button
                    onClick={() => setOrderStatusFilter('cancelled')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      orderStatusFilter === 'cancelled'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-rose-50 text-rose-800 border border-rose-200 hover:border-rose-400'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>ملغي ({cancelledOrders.length})</span>
                  </button>
                </div>
              </div>

              {/* ORDERS DISPLAY AREA */}
              {orders.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-white border border-[#E8E2D8] shadow-sm space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
                    <FileSpreadsheet className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">لا توجد طلبات واردة بعد</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    عند قيام العملاء بالشراء من السلة، ستظهر الطلبات هنا فوراً مقسمة بتنسيق جداول Excel وقابلة للسحب والتصدير بضغطة زر واحدة.
                  </p>
                  <button
                    type="button"
                    onClick={handleAddDemoOrder}
                    className="btn-forest px-5 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة طلب تجريبي الآن لتجربة التصدير</span>
                  </button>
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="p-10 text-center rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-600 space-y-3">
                  <p className="font-bold text-sm">لا توجد طلبات مطابقة للبحث أو التصفية الحالية</p>
                  <button
                    onClick={() => { setOrderSearchTerm(''); setOrderStatusFilter('all'); setOrderPaymentFilter('all'); }}
                    className="text-xs text-forest-700 font-bold underline cursor-pointer"
                  >
                    إعادة ضبط الفلاتر وعرض كل الطلبات ({orders.length})
                  </button>
                </div>
              ) : orderViewMode === 'spreadsheet' ? (
                /* SPREADSHEET TABLE VIEW */
                <div className="overflow-x-auto rounded-2xl border border-[#E8E2D8] bg-white shadow-sm">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-[#FAF7F2] text-slate-800 font-bold border-b border-[#E8E2D8] whitespace-nowrap">
                      <tr>
                        <th className="p-3.5"># كود الطلب</th>
                        <th className="p-3.5">التاريخ والوقت</th>
                        <th className="p-3.5">العميل والهاتف</th>
                        <th className="p-3.5">المحافظة والعنوان</th>
                        <th className="p-3.5">الأصناف والكميات</th>
                        <th className="p-3.5">الحساب والمجموع</th>
                        <th className="p-3.5">طريقة الدفع</th>
                        <th className="p-3.5">حالة الطلب</th>
                        <th className="p-3.5 text-center">سحب وتصدير (CSV / شحن)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0EBE1]">
                      {filteredOrders.map((o) => {
                        const orderDate = new Date(o.createdAt);
                        const dateFormatted = !isNaN(orderDate.getTime()) 
                          ? `${orderDate.toLocaleDateString('ar-EG')} - ${orderDate.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}` 
                          : o.createdAt;

                        return (
                          <tr key={o.id} className="hover:bg-[#FAF8F5] transition-colors">
                            {/* Order ID */}
                            <td className="p-3.5 font-mono font-bold text-forest-900 whitespace-nowrap">
                              <span className="px-2.5 py-1 rounded-lg bg-forest-50 border border-forest-200">
                                #{o.id}
                              </span>
                            </td>

                            {/* Date */}
                            <td className="p-3.5 text-slate-600 whitespace-nowrap font-sans text-[11px]">
                              {dateFormatted}
                            </td>

                            {/* Customer & Phone */}
                            <td className="p-3.5 min-w-[160px]">
                              <p className="font-bold text-slate-900 text-xs">{o.customerName}</p>
                              <p className="text-[11px] text-slate-600 font-mono mt-0.5" dir="ltr">{o.phone}</p>
                              {o.alternatePhone && (
                                <p className="text-[10px] text-slate-400 font-mono" dir="ltr">بديل: {o.alternatePhone}</p>
                              )}
                              <div className="flex items-center gap-1.5 mt-1.5">
                                <a
                                  href={`https://wa.me/${o.phone.replace(/[^0-9]/g, '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-2 py-0.5 rounded bg-[#25D366]/10 text-[#128C7E] border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-colors flex items-center gap-1 text-[10px] font-bold"
                                  title="مراسلة العميل عبر واتساب"
                                >
                                  <MessageSquare className="w-2.5 h-2.5" />
                                  <span>واتساب</span>
                                </a>
                                <a
                                  href={`tel:${o.phone}`}
                                  className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300 hover:bg-slate-200 transition-colors flex items-center gap-1 text-[10px] font-bold"
                                  title="اتصال هاتفي بالعميل"
                                >
                                  <Phone className="w-2.5 h-2.5" />
                                  <span>اتصال</span>
                                </a>
                              </div>
                            </td>

                            {/* Governorate & Address */}
                            <td className="p-3.5 max-w-[220px]">
                              <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 font-bold text-[11px] inline-block mb-1">
                                {o.governorate}
                              </span>
                              <p className="text-[11px] text-slate-700 leading-snug line-clamp-2" title={o.cityAddress}>
                                {o.cityAddress}
                              </p>
                              {o.notes && (
                                <p className="text-[10px] text-amber-700 mt-1 bg-amber-50/60 px-1.5 py-0.5 rounded border border-amber-200/50">
                                  ملاحظة: {o.notes}
                                </p>
                              )}
                            </td>

                            {/* Items */}
                            <td className="p-3.5 max-w-[240px]">
                              <div className="space-y-1">
                                {o.items.map((item, idx) => (
                                  <div key={idx} className="flex items-center justify-between gap-1.5 text-[11px] bg-[#FAF7F2] px-2 py-1 rounded border border-slate-200">
                                    <span className="font-bold text-slate-900 truncate">{item.name}</span>
                                    <span className="font-mono text-slate-600 shrink-0 font-bold">
                                      ({item.selectedSize}) ×{item.quantity}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </td>

                            {/* Calculations */}
                            <td className="p-3.5 whitespace-nowrap font-sans">
                              <p className="text-[10px] text-slate-500">المنتجات: {o.subtotal.toLocaleString('ar-EG')} ج.م</p>
                              <p className="text-[10px] text-slate-500">الشحن: {o.shippingFee === 0 ? 'مجاني' : `${o.shippingFee} ج.م`}</p>
                              <p className="text-sm font-black text-forest-800 mt-0.5">
                                {o.total.toLocaleString('ar-EG')} ج.م
                              </p>
                            </td>

                            {/* Payment Method */}
                            <td className="p-3.5 whitespace-nowrap">
                              <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold border block text-center bg-slate-50 text-slate-800 border-slate-200">
                                {getPaymentMethodLabel(o.paymentMethod)}
                              </span>
                            </td>

                            {/* Status Selector */}
                            <td className="p-3.5 whitespace-nowrap">
                              <select
                                value={o.status}
                                onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                                className={`text-[11px] font-bold rounded-xl px-2.5 py-1.5 border cursor-pointer focus:outline-none ${
                                  o.status === 'new' ? 'bg-amber-50 text-amber-900 border-amber-300' :
                                  o.status === 'processing' ? 'bg-blue-50 text-blue-900 border-blue-300' :
                                  o.status === 'shipped' ? 'bg-purple-50 text-purple-900 border-purple-300' :
                                  o.status === 'delivered' ? 'bg-green-50 text-green-900 border-green-300' :
                                  'bg-red-50 text-red-900 border-red-300'
                                }`}
                              >
                                <option value="new">🟡 طلب جديد</option>
                                <option value="processing">🔵 قيد التجهيز</option>
                                <option value="shipped">🟣 تم الشحن</option>
                                <option value="delivered">🟢 مكتمل ومسلّم</option>
                                <option value="cancelled">🔴 ملغي</option>
                              </select>
                            </td>

                            {/* Single Order Export Actions */}
                            <td className="p-3.5 whitespace-nowrap text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                {/* Download Single Order CSV */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    downloadOrdersCSV([o], `طلب_${o.id}_${o.customerName.replace(/\s+/g, '_')}.csv`);
                                    showOrderFeedback(`تم تحميل ملف CSV للطلب #${o.id}!`);
                                  }}
                                  className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                                  title="تحميل ملف CSV مخصص لهذا الطلب بمفرده (لبرنامج Excel)"
                                >
                                  <Download className="w-3.5 h-3.5 text-emerald-700" />
                                  <span>سحب CSV</span>
                                </button>

                                {/* Copy Courier Dispatch Text */}
                                <button
                                  type="button"
                                  onClick={async () => {
                                    const copied = await copyCourierSnippet(o);
                                    if (copied) {
                                      showOrderFeedback(`تم نسخ بوليصة شحن الطلب #${o.id} لشركة الشحن!`);
                                    }
                                  }}
                                  className="px-2 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-slate-200 text-slate-700 border border-slate-300 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                                  title="نسخ بيانات الطلب الكاملة لشركة الشحن (بوسطة/مايلرز)"
                                >
                                  <Copy className="w-3 h-3 text-slate-600" />
                                  <span>بوليصة</span>
                                </button>
                              </div>
                            </td>

                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                /* CARDS VIEW */
                <div className="space-y-4">
                  {filteredOrders.map((o) => (
                    <div key={o.id} className="bg-white p-5 rounded-2xl border border-[#E8E2D8] space-y-4 shadow-sm hover:border-forest-700/40 transition-colors">
                      {/* Card Top Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#F0EBE1]">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-forest-50 text-forest-800 border border-forest-200">
                            #{o.id}
                          </span>
                          <span className="text-sm font-bold text-slate-900">{o.customerName}</span>
                          <span className="text-xs px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-bold">
                            {o.governorate}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-500 font-sans">
                            {new Date(o.createdAt).toLocaleString('ar-EG')}
                          </span>

                          {/* Status Select */}
                          <select
                            value={o.status}
                            onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                            className={`text-xs font-bold rounded-lg px-3 py-1.5 border cursor-pointer ${
                              o.status === 'new' ? 'bg-amber-50 text-amber-800 border-amber-300' :
                              o.status === 'processing' ? 'bg-blue-50 text-blue-800 border-blue-300' :
                              o.status === 'shipped' ? 'bg-purple-50 text-purple-800 border-purple-300' :
                              o.status === 'delivered' ? 'bg-green-50 text-green-800 border-green-300' :
                              'bg-red-50 text-red-800 border-red-300'
                            }`}
                          >
                            <option value="new">🟡 طلب جديد</option>
                            <option value="processing">🔵 قيد التجهيز والتغليف</option>
                            <option value="shipped">🟣 تم الشحن مع المندوب</option>
                            <option value="delivered">🟢 مكتمل ومسلّم</option>
                            <option value="cancelled">🔴 ملغي</option>
                          </select>
                        </div>
                      </div>

                      {/* Customer & Address Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                        <div>
                          <p className="text-slate-500 mb-1">بيانات التواصل:</p>
                          <p className="text-slate-900 font-mono font-bold mb-1" dir="ltr">{o.phone}</p>
                          {o.alternatePhone && (
                            <p className="text-slate-500 font-mono text-[11px] mb-1" dir="ltr">هاتف بديل: {o.alternatePhone}</p>
                          )}
                          <div className="flex gap-2 mt-2">
                            <a
                              href={`https://wa.me/${o.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded-lg bg-[#25D366]/10 text-[#128C7E] border border-[#25D366]/40 flex items-center gap-1 font-bold text-xs"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>واتساب العميل</span>
                            </a>
                            <a
                              href={`tel:${o.phone}`}
                              className="px-2.5 py-1 rounded-lg bg-[#FAF7F2] text-slate-700 border border-slate-300 flex items-center gap-1 font-bold text-xs"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              <span>اتصال</span>
                            </a>
                          </div>
                        </div>

                        <div>
                          <p className="text-slate-500 mb-1">العنوان بالتفصيل:</p>
                          <p className="text-slate-800 leading-relaxed font-medium">{o.cityAddress}</p>
                          {o.notes && (
                            <p className="text-amber-800 mt-1.5 text-[11px] bg-amber-50 p-2 rounded-lg border border-amber-200">
                              ملاحظة العميل: {o.notes}
                            </p>
                          )}
                        </div>

                        <div>
                          <p className="text-slate-500 mb-1">طريقة الدفع والحساب:</p>
                          <span className="font-bold text-slate-900">
                            {getPaymentMethodLabel(o.paymentMethod)}
                          </span>
                          <div className="mt-2 font-sans space-y-0.5">
                            <div className="text-[11px] text-slate-500 flex justify-between">
                              <span>قيمة المنتجات:</span>
                              <span>{o.subtotal.toLocaleString('ar-EG')} ج.م</span>
                            </div>
                            <div className="text-[11px] text-slate-500 flex justify-between">
                              <span>مصاريف الشحن:</span>
                              <span>{o.shippingFee === 0 ? 'مجاني' : `${o.shippingFee} ج.م`}</span>
                            </div>
                            <div className="pt-1 border-t border-slate-200 flex justify-between items-center">
                              <span className="font-bold text-slate-700">المبلغ النهائي:</span>
                              <span className="text-forest-800 font-black text-sm">{o.total.toLocaleString('ar-EG')} ج.م</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="pt-2 border-t border-[#F0EBE1]">
                        <p className="text-[11px] text-slate-500 mb-1.5">الأصناف المطلوبة:</p>
                        <div className="flex flex-wrap gap-2">
                          {o.items.map((item, idx) => (
                            <div key={idx} className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] text-xs border border-slate-200 flex items-center gap-2">
                              <span className="text-slate-900 font-bold">{item.name}</span>
                              <span className="text-forest-700 font-bold font-mono">({item.selectedSize})</span>
                              <span className="text-slate-500 font-mono">× {item.quantity}</span>
                              <span className="text-slate-400 text-[10px]">[{item.price} ج.م]</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer Export Bar */}
                      <div className="pt-3 border-t border-[#F0EBE1] flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              downloadOrdersCSV([o], `طلب_${o.id}_${o.customerName.replace(/\s+/g, '_')}.csv`);
                              showOrderFeedback(`تم تحميل ملف CSV للطلب #${o.id}!`);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5 text-emerald-700" />
                            <span>سحب هذا الطلب كـ Excel / CSV</span>
                          </button>

                          <button
                            type="button"
                            onClick={async () => {
                              const copied = await copyCourierSnippet(o);
                              if (copied) {
                                showOrderFeedback(`تم نسخ بوليصة شحن الطلب #${o.id}!`);
                              }
                            }}
                            className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Copy className="w-3.5 h-3.5 text-slate-600" />
                            <span>نسخ بوليصة الشحن</span>
                          </button>
                        </div>

                        <span className="text-[11px] text-slate-400 font-mono">
                          ID: {o.id}
                        </span>
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </div>
          );
        })()}

        {/* TAB 3: SETTINGS & PAYMENT METHODS */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2D8] shadow-sm max-w-3xl space-y-6">
            
            {settingsSaved && (
              <div className="p-4 rounded-xl bg-green-50 border border-green-300 text-green-800 text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>تم حفظ إعدادات المتجر والدفع بنجاح!</span>
              </div>
            )}

            {/* Quick CMS Gateway Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-forest-950 via-forest-900 to-forest-950 text-white flex flex-wrap items-center justify-between gap-4 shadow-sm border border-gold-500/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-400 text-slate-950 flex items-center justify-center shrink-0 shadow-xs">
                  <Megaphone className="w-5 h-5 text-slate-950" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-gold-300">
                    محرر نصوص وصور وعروض الموقع الترويجية (CMS)
                  </h4>
                  <p className="text-[11px] text-slate-200 mt-0.5">
                    يمكنك تعديل أي نصوص، صور، لافتات ترويجية، وإعلانات المتجر بنقرة واحدة
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('content')}
                className="px-4 py-2.5 rounded-xl bg-gold-400 hover:bg-gold-300 text-slate-950 text-xs font-black transition-all shadow-md hover:scale-105"
              >
                تعديل نصوص وصور الموقع ➔
              </button>
            </div>

            {/* Store Logo Section */}
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-forest-700" />
                    <span>أيقونة وشعار المتجر الرسمي (Store Logo)</span>
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    الشعار يظهر في شريط التنقل العلوي (النافبار) وفي أسفل الصفحة (الفوتر) وعلى كامل واجهة المتجر
                  </p>
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold">
                  قابلة للتغيير والرفع
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-5 pt-1">
                {/* Logo Preview */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <div className="w-20 h-20 rounded-full border-2 border-gold-400 bg-white p-1 shadow-md overflow-hidden flex items-center justify-center">
                    <img 
                      src={settingsForm.logoUrl || '/images/logo.png'} 
                      alt="معاينة اللوجو" 
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/logo.png';
                      }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-600">المعاينة الحالية</span>
                </div>

                {/* Upload & URL Controls */}
                <div className="flex-1 w-full space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      رفع صورة لوجو جديدة من جهازك أو هاتفك
                    </label>
                    <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-forest-300 bg-white hover:bg-forest-50/60 cursor-pointer transition-all text-xs font-bold text-forest-800 shadow-2xs">
                      <Upload className="w-4 h-4" />
                      <span>اضغط هنا لاختيار صورة من هاتفك / حاسوبك</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleLogoFileUpload}
                        className="hidden" 
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      أو أدخل رابط صورة اللوجو (Image URL)
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: /images/logo.png أو رابط خارجي https://..."
                      value={settingsForm.logoUrl || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, logoUrl: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-forest-700 font-mono dir-ltr text-right"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setSettingsForm({ ...settingsForm, logoUrl: '/images/logo.png' })}
                      className="text-[11px] text-forest-700 hover:text-forest-900 underline font-bold"
                    >
                      استعادة لوجو Oro Puro الذهبي الفاخر الافتراضي
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Settings className="w-4 h-4 text-forest-700" />
                <span>بيانات التواصل واستقبال الفواتير</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    رقم الواتساب الرسمي للمتجر (مع الكود الدولي) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="201012345678"
                    value={settingsForm.whatsappNumber}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-4 py-2 text-xs font-mono text-left text-slate-900 focus:outline-none focus:border-forest-700"
                    dir="ltr"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">يُفتح تلقائياً عند ضغط العميل على تأكيد الطلب</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    شعار المتجر النصي
                  </label>
                  <input
                    type="text"
                    value={settingsForm.storeTagline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, storeTagline: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-forest-700"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-4">
                بيانات الدفع الإلكتروني المصري (انستاباي وفودافون كاش)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    عنوان الدفع اللحظي لانستاباي (InstaPay IPA / Account)
                  </label>
                  <input
                    type="text"
                    placeholder="example@instapay"
                    value={settingsForm.instapayAddress}
                    onChange={(e) => setSettingsForm({ ...settingsForm, instapayAddress: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-4 py-2 text-xs font-mono text-left text-slate-900 focus:outline-none focus:border-forest-700"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    اسم صاحب حساب انستاباي
                  </label>
                  <input
                    type="text"
                    placeholder="Oro Puro Parfums"
                    value={settingsForm.instapayAccountName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, instapayAccountName: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-forest-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    رقم محفظة فودافون كاش / المحافظ الإلكترونية
                  </label>
                  <input
                    type="text"
                    placeholder="010xxxxxxxx"
                    value={settingsForm.vodafoneCashNumber}
                    onChange={(e) => setSettingsForm({ ...settingsForm, vodafoneCashNumber: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-4 py-2 text-xs font-mono text-left text-slate-900 focus:outline-none focus:border-forest-700"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    الحد الأدنى للشحن المجاني (جنيه مصري) *
                  </label>
                  <input
                    type="number"
                    value={settingsForm.freeShippingThreshold}
                    onChange={(e) => setSettingsForm({ ...settingsForm, freeShippingThreshold: Number(e.target.value) })}
                    className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-forest-700 font-bold"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    يتحكم تلقائياً وبشكل ديناميكي في سلة المشتريات والدفع وشريط التقدم (حالياً: {settingsForm.freeShippingThreshold} ج.م)
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700 mb-0 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-forest-700" />
                      <span>رمز PIN السري لدخول لوحة التحكم</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowSettingsPin(!showSettingsPin)}
                      className="text-slate-400 hover:text-slate-700 text-xs flex items-center gap-1 font-bold"
                    >
                      {showSettingsPin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span className="text-[10px]">{showSettingsPin ? 'إخفاء' : 'إظهار'}</span>
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showSettingsPin ? 'text' : 'password'}
                      maxLength={8}
                      value={settingsForm.adminPin || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, adminPin: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-4 py-2 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-forest-700 tracking-wider"
                      placeholder="••••••••"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">
                    يمكنك تغيير هذا الرمز في أي وقت لحماية لوحة التحكم ومنع أي شخص من الدخول إليها.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-4">
                تكاليف الشحن حسب المناطق المصرية (ج.م)
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1 font-bold">القاهرة والجيزة</label>
                  <input
                    type="number"
                    value={settingsForm.shippingRates.cairoGiza}
                    onChange={(e) => setSettingsForm({
                      ...settingsForm,
                      shippingRates: { ...settingsForm.shippingRates, cairoGiza: Number(e.target.value) }
                    })}
                    className="w-full bg-[#FAF7F2] border border-slate-300 rounded-lg p-2 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-600 mb-1 font-bold">الإسكندرية</label>
                  <input
                    type="number"
                    value={settingsForm.shippingRates.alexandria}
                    onChange={(e) => setSettingsForm({
                      ...settingsForm,
                      shippingRates: { ...settingsForm.shippingRates, alexandria: Number(e.target.value) }
                    })}
                    className="w-full bg-[#FAF7F2] border border-slate-300 rounded-lg p-2 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-600 mb-1 font-bold">الدلتا والقناة</label>
                  <input
                    type="number"
                    value={settingsForm.shippingRates.deltaCanal}
                    onChange={(e) => setSettingsForm({
                      ...settingsForm,
                      shippingRates: { ...settingsForm.shippingRates, deltaCanal: Number(e.target.value) }
                    })}
                    className="w-full bg-[#FAF7F2] border border-slate-300 rounded-lg p-2 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-600 mb-1 font-bold">الصعيد والحدودية</label>
                  <input
                    type="number"
                    value={settingsForm.shippingRates.upperEgypt}
                    onChange={(e) => setSettingsForm({
                      ...settingsForm,
                      shippingRates: { ...settingsForm.shippingRates, upperEgypt: Number(e.target.value) }
                    })}
                    className="w-full bg-[#FAF7F2] border border-slate-300 rounded-lg p-2 text-xs text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Quick Stock & Sold Out Manager Card inside Settings */}
            <div className="pt-6 border-t border-slate-200">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div>
                  <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
                    <span>إدارة المنتجات المنتهية من المخزون (Sold Out)</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    يمكنك تحديد أي عطر كـ (Sold Out) لمنع طلبه أو إعادة توفيره للبيع بضغطة زر واحدة مباشرة
                  </p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 font-bold font-mono">
                  {products.filter(p => p.isSoldOut || (p.sizes && p.sizes.length > 0 && p.sizes.every(s => !s.inStock))).length} عطور نافدة
                </span>
              </div>

              {/* Search box for perfumes in settings */}
              <div className="relative mb-3">
                <input
                  type="text"
                  placeholder="ابحث عن عطر لتغيير حالة توفره في المخزون..."
                  value={settingsStockSearch}
                  onChange={(e) => setSettingsStockSearch(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl pl-3 pr-9 py-2 text-xs text-slate-900 focus:outline-none focus:border-forest-700"
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Mini Scrollable List of Perfumes */}
              <div className="max-h-60 overflow-y-auto space-y-2 border border-slate-200 rounded-xl p-2 bg-[#FAF8F5]">
                {products
                  .filter(p => !settingsStockSearch.trim() || p.name.toLowerCase().includes(settingsStockSearch.toLowerCase()) || p.brand.toLowerCase().includes(settingsStockSearch.toLowerCase()))
                  .map(p => {
                    const isSoldOut = Boolean(p.isSoldOut || (p.sizes && p.sizes.length > 0 && p.sizes.every(s => !s.inStock)));
                    return (
                      <div key={p.id} className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between gap-3 hover:border-slate-300 transition-colors">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img src={p.image} alt={p.name} className="w-8 h-8 object-contain rounded bg-[#FAF7F2] p-0.5 border border-slate-100 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-900 truncate">{p.name}</p>
                            <p className="text-[10px] text-gold-700 font-semibold">{p.brand}</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleProductSoldOut(p.id)}
                          className={`shrink-0 px-3 py-1 rounded-lg text-xs font-black transition-all shadow-2xs cursor-pointer ${
                            isSoldOut
                              ? 'bg-rose-100 text-rose-800 border border-rose-300 hover:bg-rose-200'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                          }`}
                        >
                          {isSoldOut ? '🔴 نفد (Sold Out)' : '🟢 متوفر بالمخزون'}
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* SECTION: AI Automation & Notifications (Webhooks) */}
            <div className="pt-6 border-t border-slate-200">
              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-forest-700" />
                      <span>الربط التلقائي والإشعارات الفورية (AI Automation & Webhooks)</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      اربط لوحة التحكم بأي نظام أوتوميشن ذكي (Make.com أو n8n أو Telegram Bot أو WhatsApp API) لتلقي إشعار فوري عند كل طلب جديد
                    </p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                    جاهز للربط ⚡
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    رابط الـ Webhook الخاص بنظام الأوتوميشن (Make / n8n / Zapier / Custom API)
                  </label>
                  <input
                    type="url"
                    placeholder="https://hook.eu2.make.com/... أو https://n8n.example.com/webhook/..."
                    value={settingsForm.automationWebhookUrl || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, automationWebhookUrl: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-mono text-left text-slate-900 focus:outline-none focus:border-forest-700"
                    dir="ltr"
                  />
                  <div className="mt-2 text-[11px] text-slate-600 bg-white/80 p-3 rounded-xl border border-slate-200 space-y-1.5">
                    <p className="font-bold text-forest-800 flex items-center gap-1">
                      <span>💡 كيف يعمل الربط التلقائي؟</span>
                    </p>
                    <p>
                      1. بمجرد قيام أي عميل بتأكيد طلبه، يظهر الطلب في <strong>لوحة التحكم</strong> وقاعدة البيانات فوراً دون تحويله إلى واتساب.
                    </p>
                    <p>
                      2. إذا قمت بوضع رابط Webhook هنا، سيقوم النظام تلقائياً وبشكل فوري بإرسال بيانات الطلب (الاسم، الهاتف، المحافظة، العنوان، العطور المطلوبة، الإجمالي) إلى نظامك ليرسل لك إشعاراً على <strong>تليجرام أو واتساب</strong>.
                    </p>
                    <p>
                      3. يمكنك أيضاً ربط قاعدة بيانات Supabase مباشرة من <strong>Database Webhooks</strong> على جدول <code>orders</code>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn-forest px-8 py-3 rounded-xl text-sm font-bold shadow-sm"
            >
              حفظ الإعدادات وتطبيقها فوراً
            </button>
          </form>
        )}

        {/* TAB 4: SITE CONTENT & PROMOS (CMS) */}
        {activeTab === 'content' && (
          <form onSubmit={handleSaveContent} className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2D8] shadow-sm space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2 text-gold-700 text-xs font-bold uppercase tracking-wider mb-1">
                  <Megaphone className="w-4 h-4 text-gold-600" />
                  <span>لوحة التحكم في المحتوى التسويقي (CMS)</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  تعديل نصوص وصور وعروض الموقع الترويجية
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  تحكم بشكل كامل في أي كلام أو عروض تظهر لعملائك على الموقع لتجديد حملاتك التسويقية في أي وقت
                </p>
              </div>

              {contentSaved && (
                <div className="flex items-center gap-2 text-emerald-800 bg-emerald-50 border border-emerald-300 px-4 py-2 rounded-xl text-xs font-bold shadow-sm animate-fade-in">
                  <Check className="w-4 h-4" />
                  <span>تم حفظ وتطبيق التعديلات على الموقع بنجاح!</span>
                </div>
              )}
            </div>

            {/* SECTION 1: Top Urgency Announcement Banner */}
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-gold-500"></span>
                  <span>شريط الإعلانات العاجلة بأعلى الموقع (Top Urgency Bar)</span>
                </h3>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={contentForm.announcementEnabled}
                    onChange={(e) => setContentForm({ ...contentForm, announcementEnabled: e.target.checked })}
                    className="w-4 h-4 accent-forest-700 rounded cursor-pointer"
                  />
                  <span>إظهار الشريط للعملاء</span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">بادج الإعلان</label>
                  <input
                    type="text"
                    value={contentForm.announcementBadge}
                    onChange={(e) => setContentForm({ ...contentForm, announcementBadge: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-forest-700"
                    placeholder="مثال: عرض اليوم الحصري"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">نص العرض الترويجي الرئيسي *</label>
                  <input
                    type="text"
                    value={contentForm.announcementText}
                    onChange={(e) => setContentForm({ ...contentForm, announcementText: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-forest-700 font-medium"
                    placeholder="اكتب تفاصيل العرض مثل: شحن مجاني عند طلب عطرين..."
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: Hero Section (Main Headline & Image) */}
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-forest-600"></span>
                <span>الواجهة الرئيسية (Hero Section Headline & Visuals)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">بادج أعلى العنوان</label>
                  <input
                    type="text"
                    value={contentForm.heroBadge}
                    onChange={(e) => setContentForm({ ...contentForm, heroBadge: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-forest-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الكلمة المظللة بالعنوان (Highlight)</label>
                  <input
                    type="text"
                    value={contentForm.heroHighlight}
                    onChange={(e) => setContentForm({ ...contentForm, heroHighlight: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-forest-700"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">العنوان الرئيسي الأكبر *</label>
                  <input
                    type="text"
                    value={contentForm.heroTitle}
                    onChange={(e) => setContentForm({ ...contentForm, heroTitle: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-forest-700 font-bold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">الوصف التسويقي للواجهة *</label>
                  <textarea
                    rows={2}
                    value={contentForm.heroSubtitle}
                    onChange={(e) => setContentForm({ ...contentForm, heroSubtitle: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-forest-700 leading-relaxed"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">صورة الواجهة الرئيسية (Hero Image)</label>
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <input
                      type="text"
                      placeholder="رابط الصورة أو مسارها..."
                      value={contentForm.heroImageUrl}
                      onChange={(e) => setContentForm({ ...contentForm, heroImageUrl: e.target.value })}
                      className="flex-1 w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-left text-slate-900 focus:outline-none focus:border-forest-700"
                      dir="ltr"
                    />
                    <label className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-forest-50 border border-forest-200 text-forest-800 text-xs font-bold cursor-pointer hover:bg-forest-100 transition-colors shadow-2xs">
                      <Upload className="w-3.5 h-3.5" />
                      <span>رفع صورة</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleHeroFileUpload}
                        className="hidden" 
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">نص زر الطلب الرئيسي (CTA)</label>
                  <input
                    type="text"
                    value={contentForm.heroCtaText}
                    onChange={(e) => setContentForm({ ...contentForm, heroCtaText: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-forest-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">نص الزر الثانوي</label>
                  <input
                    type="text"
                    value={contentForm.heroSecondaryCtaText}
                    onChange={(e) => setContentForm({ ...contentForm, heroSecondaryCtaText: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-forest-700"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 3: Sales Promo Banner */}
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  <span>لافتة العروض والخصومات الترويجية (Promo Offer Banner)</span>
                </h3>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={contentForm.promoBannerEnabled !== false}
                    onChange={(e) => setContentForm({ ...contentForm, promoBannerEnabled: e.target.checked })}
                    className="w-4 h-4 accent-forest-700 rounded cursor-pointer"
                  />
                  <span>تفعيل وإظهار اللافتة بالمتجر</span>
                </label>
              </div>

              {/* Live Preview Card */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                  <span>معاينة حيّة للافتة في المتجر:</span>
                  <span className="text-amber-400 font-mono">عالي التباين وواضح 100%</span>
                </div>
                <div className={`p-5 rounded-2xl border-2 transition-all ${
                  contentForm.promoBannerTheme === 'black_gold'
                    ? 'bg-[#0A0A0C] bg-gradient-to-r from-black via-[#1C1917] to-black border-amber-400 text-white'
                    : contentForm.promoBannerTheme === 'royal_navy'
                    ? 'bg-[#071324] bg-gradient-to-r from-[#040C18] via-[#0F294D] to-[#040C18] border-amber-400 text-white'
                    : 'bg-[#03261D] bg-gradient-to-r from-[#021F17] via-[#064E3B] to-[#021F17] border-amber-400 text-white'
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="text-right max-w-md">
                      <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full inline-block mb-1 shadow-xs">
                        {contentForm.promoBannerBadge || 'عرض حصري'}
                      </span>
                      <h4 className="text-lg sm:text-xl font-black text-white leading-tight">
                        {contentForm.promoBannerTitle || 'عنوان العرض'}
                      </h4>
                      <p className="text-xs text-amber-100 font-bold mt-1">
                        {contentForm.promoBannerSubtitle || 'تفاصيل العرض...'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {contentForm.promoDiscountText && (
                        <div className="bg-black/60 border border-amber-400 px-3 py-1.5 rounded-xl text-center">
                          <span className="text-sm font-black text-amber-300 block">{contentForm.promoDiscountText}</span>
                          <span className="text-[9px] text-white font-bold">شحن مجاني</span>
                        </div>
                      )}
                      <span className="px-3.5 py-2 rounded-xl bg-amber-400 text-slate-950 font-black text-xs">
                        {contentForm.promoBannerCtaText || 'اطلب الآن'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">طابع وألوان خلفية اللافتة</label>
                  <select
                    value={contentForm.promoBannerTheme || 'emerald_gold'}
                    onChange={(e) => setContentForm({ ...contentForm, promoBannerTheme: e.target.value as any })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-forest-700 font-bold"
                  >
                    <option value="emerald_gold">زمردي فاخر مع ذهبي (الأفخم والأعلى وضوحاً)</option>
                    <option value="black_gold">أسود ملكي مع ذهبي خالص</option>
                    <option value="royal_navy">كحلي إمبراطوري مع ذهبي</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">بادج العرض (الوسم الصغير)</label>
                  <input
                    type="text"
                    value={contentForm.promoBannerBadge}
                    onChange={(e) => setContentForm({ ...contentForm, promoBannerBadge: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-forest-700"
                    placeholder="مثال: عرض حصري لفترة محدودة 🔥"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">نص الخصم البارز</label>
                  <input
                    type="text"
                    value={contentForm.promoDiscountText}
                    onChange={(e) => setContentForm({ ...contentForm, promoDiscountText: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-forest-700 font-bold"
                    placeholder="مثال: خصم 100 ج.م إضافي"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">عنوان العرض الترويجي الكبير *</label>
                  <input
                    type="text"
                    value={contentForm.promoBannerTitle}
                    onChange={(e) => setContentForm({ ...contentForm, promoBannerTitle: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-forest-700 font-bold"
                    placeholder="مثال: عرض الدويتو الشبابي الأكثر طلباً"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">نص زر الشراء على اللافتة</label>
                  <input
                    type="text"
                    value={contentForm.promoBannerCtaText || 'اطلب العرض الآن'}
                    onChange={(e) => setContentForm({ ...contentForm, promoBannerCtaText: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-forest-700 font-bold"
                    placeholder="اطلب العرض الآن"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 mb-1">تفاصيل ووصف العرض التسويقي *</label>
                  <textarea
                    rows={2}
                    value={contentForm.promoBannerSubtitle}
                    onChange={(e) => setContentForm({ ...contentForm, promoBannerSubtitle: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-forest-700 leading-relaxed font-medium"
                    placeholder="اكتب وصف العرض وما يتضمنه..."
                  />
                </div>
              </div>
            </div>

            {/* SECTION 4: Products Catalog Header */}
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Package className="w-4 h-4 text-forest-700" />
                <span>عناوين وبادج قسم تشكيلة العطور (Products Catalog Section)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">بادج أعلى التشكيلة</label>
                  <input
                    type="text"
                    value={contentForm.collectionBadge || ''}
                    onChange={(e) => setContentForm({ ...contentForm, collectionBadge: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-forest-700"
                    placeholder="التشكيلة الشبابية الأكثر مبيعاً والأعلى تقييماً ★★★★★"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">العنوان الرئيسي لقسم العطور</label>
                  <input
                    type="text"
                    value={contentForm.collectionTitle || ''}
                    onChange={(e) => setContentForm({ ...contentForm, collectionTitle: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-forest-700 font-bold"
                    placeholder="عطور الحضور الطاغي • ثبات 48 ساعة يتحدى الغسيل"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">الوصف التسويقي أسفل عنوان التشكيلة</label>
                  <textarea
                    rows={2}
                    value={contentForm.collectionSubtitle || ''}
                    onChange={(e) => setContentForm({ ...contentForm, collectionSubtitle: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-forest-700 leading-relaxed font-medium"
                    placeholder="زيوت عطرية أصلية 100% مستوردة..."
                  />
                </div>
              </div>
            </div>

            {/* SECTION 4: Trust Guarantees Badges */}
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>بنود الثقة والضمانات الـ 3 (Trust Guarantees)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Feature 1 */}
                <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2">
                  <span className="text-xs font-black text-slate-800 block">البند الأول:</span>
                  <input
                    type="text"
                    placeholder="العنوان"
                    value={contentForm.trustFeature1Title}
                    onChange={(e) => setContentForm({ ...contentForm, trustFeature1Title: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 text-xs font-bold text-slate-900"
                  />
                  <textarea
                    rows={2}
                    placeholder="الوصف"
                    value={contentForm.trustFeature1Desc}
                    onChange={(e) => setContentForm({ ...contentForm, trustFeature1Desc: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 text-[11px] text-slate-700"
                  />
                </div>

                {/* Feature 2 */}
                <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2">
                  <span className="text-xs font-black text-slate-800 block">البند الثاني:</span>
                  <input
                    type="text"
                    placeholder="العنوان"
                    value={contentForm.trustFeature2Title}
                    onChange={(e) => setContentForm({ ...contentForm, trustFeature2Title: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 text-xs font-bold text-slate-900"
                  />
                  <textarea
                    rows={2}
                    placeholder="الوصف"
                    value={contentForm.trustFeature2Desc}
                    onChange={(e) => setContentForm({ ...contentForm, trustFeature2Desc: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 text-[11px] text-slate-700"
                  />
                </div>

                {/* Feature 3 */}
                <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2">
                  <span className="text-xs font-black text-slate-800 block">البند الثالث:</span>
                  <input
                    type="text"
                    placeholder="العنوان"
                    value={contentForm.trustFeature3Title}
                    onChange={(e) => setContentForm({ ...contentForm, trustFeature3Title: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 text-xs font-bold text-slate-900"
                  />
                  <textarea
                    rows={2}
                    placeholder="الوصف"
                    value={contentForm.trustFeature3Desc}
                    onChange={(e) => setContentForm({ ...contentForm, trustFeature3Desc: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 text-[11px] text-slate-700"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 5: Floating WhatsApp Prompt */}
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-2">
              <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>رسالة مساعد الواتساب العائم للزبائن</span>
              </label>
              <input
                type="text"
                value={contentForm.whatsappFloatingText}
                onChange={(e) => setContentForm({ ...contentForm, whatsappFloatingText: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-forest-700"
                placeholder="اكتب الرسالة الترحيبية..."
              />
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                type="submit"
                className="btn-forest px-8 py-3 rounded-xl text-sm font-bold shadow-md hover:scale-105 transition-all"
              >
                حفظ وتطبيق التعديلات على المتجر فوراً
              </button>
              {contentSaved && (
                <span className="text-xs font-bold text-emerald-700">✓ تم تطبيق التعديل بنجاح</span>
              )}
            </div>
          </form>
        )}

        {/* TAB 5: ADMINS MANAGEMENT */}
        {activeTab === 'admins' && (
          <div className="space-y-6 animate-fade-in">
            {/* Header Card */}
            <div className="bg-white border border-[#E8E2D8] rounded-3xl p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-forest-700 text-xs font-bold uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>فريق الإدارة والمسؤولين</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                  إدارة المشرفين وصلاحيات الدخول ({adminUsers.length})
                </h2>
                <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                  يمكنك إضافة حتى مديرين إضافيين أو أكثر للمتجر، وتعيين اسم مستخدم وكلمة مرور مستقلة لكل منهم للتحكم بالمنتجات والطلبات بكل أمان.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAddAdmin}
                className="btn-forest px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md hover:scale-105 transition-all"
              >
                <UserPlus className="w-4 h-4" />
                <span>إضافة مشرف / مدير جديد</span>
              </button>
            </div>

            {/* Role explainer banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 text-right">
                <div className="flex items-center gap-2 text-amber-900 font-black text-xs mb-1">
                  <Crown className="w-4 h-4 text-amber-700" />
                  <span>المالك الرئيسي (Owner)</span>
                </div>
                <p className="text-[11px] text-amber-800/90 leading-relaxed font-medium">
                  كامل الصلاحيات لإدارة المشرفين، إعدادات المتجر، أرقام الدفع، الأسعار والمنتجات.
                </p>
              </div>

              <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 text-right">
                <div className="flex items-center gap-2 text-blue-900 font-black text-xs mb-1">
                  <Shield className="w-4 h-4 text-blue-700" />
                  <span>مدير متجر (Manager)</span>
                </div>
                <p className="text-[11px] text-blue-800/90 leading-relaxed font-medium">
                  إدارة المنتجات، تحديث حالات المخزون (Sold Out)، وإدارة وتحديث طلبات العملاء.
                </p>
              </div>

              <div className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-4 text-right">
                <div className="flex items-center gap-2 text-purple-900 font-black text-xs mb-1">
                  <Users className="w-4 h-4 text-purple-700" />
                  <span>مسؤول مبيعات (Staff)</span>
                </div>
                <p className="text-[11px] text-purple-800/90 leading-relaxed font-medium">
                  متابعة طلبات العملاء وتحديث حالات الشحن والتسليم والتواصل عبر الواتساب.
                </p>
              </div>
            </div>

            {/* Admins Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {adminUsers.map((admin) => {
                const isOwner = admin.role === 'owner';
                const isShowingPass = Boolean(showPasswordMap[admin.id]);
                const isCurrent = currentAdminUser?.id === admin.id;

                return (
                  <div 
                    key={admin.id}
                    className={`bg-white border rounded-3xl p-5 shadow-sm transition-all relative flex flex-col justify-between ${
                      isOwner ? 'border-amber-300 ring-1 ring-amber-200/50' : 'border-[#E8E2D8] hover:border-forest-600/40'
                    }`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-1.5">
                          {isOwner ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-amber-100 text-amber-900 border border-amber-300">
                              <Crown className="w-3 h-3 text-amber-700" />
                              <span>المالك الرئيسي</span>
                            </span>
                          ) : admin.role === 'manager' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-blue-100 text-blue-900 border border-blue-300">
                              <Shield className="w-3 h-3 text-blue-700" />
                              <span>مدير متجر</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-purple-100 text-purple-900 border border-purple-300">
                              <Users className="w-3 h-3 text-purple-700" />
                              <span>مسؤول مبيعات</span>
                            </span>
                          )}

                          {isCurrent && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              أنت الآن
                            </span>
                          )}
                        </div>

                        {/* Active toggle */}
                        {isOwner ? (
                          <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            نشط دائماً
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => updateAdminUser(admin.id, { isActive: !admin.isActive })}
                            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full transition-colors border ${
                              admin.isActive
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                                : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                            }`}
                          >
                            {admin.isActive ? '✓ نشط' : '✕ معطل'}
                          </button>
                        )}
                      </div>

                      {/* Admin Info */}
                      <div className="flex items-center gap-3.5 mb-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-base shadow-sm ${
                          isOwner 
                            ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                            : admin.role === 'manager'
                            ? 'bg-blue-100 text-blue-900 border border-blue-200'
                            : 'bg-purple-100 text-purple-900 border border-purple-200'
                        }`}>
                          {admin.name.slice(0, 1) || 'U'}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-extrabold text-slate-900 text-sm truncate">
                            {admin.name}
                          </h3>
                          <p className="text-xs font-mono font-bold text-forest-800 dir-ltr text-right">
                            @{admin.username}
                          </p>
                        </div>
                      </div>

                      {/* Password Field Box */}
                      <div className="bg-[#FAF7F2] border border-[#E8E2D8] rounded-2xl p-3 mb-4 space-y-1">
                        <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                          <span>كلمة المرور / الرمز:</span>
                          <button
                            type="button"
                            onClick={() => setShowPasswordMap(prev => ({ ...prev, [admin.id]: !prev[admin.id] }))}
                            className="text-forest-700 hover:text-forest-900 flex items-center gap-1 font-bold"
                          >
                            {isShowingPass ? (
                              <>
                                <EyeOff className="w-3 h-3" />
                                <span>إخفاء</span>
                              </>
                            ) : (
                              <>
                                <Eye className="w-3 h-3" />
                                <span>إظهار</span>
                              </>
                            )}
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="font-mono text-xs font-black text-slate-800 tracking-wider">
                            {isShowingPass ? admin.password : '••••••••'}
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard?.writeText(admin.password);
                              alert(`تم نسخ كلمة مرور (${admin.name}) بنجاح`);
                            }}
                            className="text-[10px] text-slate-400 hover:text-slate-700 underline font-medium"
                          >
                            نسخ
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEditAdmin(admin)}
                        className="flex-1 py-2 rounded-xl text-xs font-bold bg-[#FAF7F2] hover:bg-forest-50 hover:text-forest-800 text-slate-700 border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>تعديل</span>
                      </button>

                      {!isOwner && (
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`هل أنت متأكد من حذف المشرف (${admin.name})؟ لن يتمكن من تسجيل الدخول مجدداً.`)) {
                              deleteAdminUser(admin.id);
                            }
                          }}
                          className="py-2 px-3 rounded-xl text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors flex items-center justify-center gap-1"
                          title="حذف هذا المشرف"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* MODAL: ADD / EDIT ADMIN */}
      {isAdminModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="relative w-full max-w-md bg-white border border-[#E8E2D8] rounded-3xl shadow-2xl overflow-hidden my-8">
            <div className="p-6 border-b border-[#E8E2D8] bg-[#FAF7F2] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {editingAdminId ? 'تعديل بيانات المشرف' : 'إضافة مشرف جديد للفريق'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    حدد اسم المستخدم وكلمة المرور الخاصة به
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAdminModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAdmin} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">الاسم الكامل *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: أحمد مصطفى"
                  value={adminFormData.name}
                  onChange={(e) => setAdminFormData({ ...adminFormData, name: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-forest-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">اسم المستخدم (للدخول) *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: ahmed_admin"
                  value={adminFormData.username}
                  onChange={(e) => setAdminFormData({ ...adminFormData, username: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-forest-700 dir-ltr text-right font-mono"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  اسم المستخدم الذي سيكتبه عند فتح لوحة التحكم
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 mb-0">كلمة المرور للدخول *</label>
                  <button
                    type="button"
                    onClick={() => setShowAdminFormPass(!showAdminFormPass)}
                    className="text-slate-400 hover:text-slate-700 text-xs flex items-center gap-1 font-bold"
                  >
                    {showAdminFormPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span className="text-[10px]">{showAdminFormPass ? 'إخفاء' : 'إظهار'}</span>
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showAdminFormPass ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={adminFormData.password}
                    onChange={(e) => setAdminFormData({ ...adminFormData, password: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-forest-700 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">الدور والصلاحية</label>
                <select
                  value={adminFormData.role}
                  onChange={(e) => setAdminFormData({ ...adminFormData, role: e.target.value as AdminRole })}
                  disabled={editingAdminId ? adminUsers.find(u => u.id === editingAdminId)?.role === 'owner' : false}
                  className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-forest-700 font-medium"
                >
                  <option value="manager">مدير متجر (إدارة المنتجات، المخزون، والطلبات)</option>
                  <option value="staff">مسؤول مبيعات (متابعة وتحديث الطلبات فقط)</option>
                  {adminFormData.role === 'owner' && (
                    <option value="owner">المالك الرئيسي (كامل الصلاحيات)</option>
                  )}
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="adminIsActive"
                  checked={adminFormData.isActive}
                  onChange={(e) => setAdminFormData({ ...adminFormData, isActive: e.target.checked })}
                  className="w-4 h-4 accent-emerald-700 rounded cursor-pointer"
                />
                <label htmlFor="adminIsActive" className="text-xs text-slate-800 font-bold cursor-pointer">
                  حساب المشرف مفعل ونشط (يمكنه تسجيل الدخول)
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAdminModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-600 hover:text-slate-900"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="btn-forest px-6 py-2.5 rounded-xl text-xs font-bold shadow-md hover:scale-105 transition-all"
                >
                  {editingAdminId ? 'حفظ التعديلات' : 'إضافة المشرف الآن'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT PRODUCT */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white border border-[#E8E2D8] rounded-3xl shadow-2xl overflow-hidden my-8">
            <div className="p-6 border-b border-[#E8E2D8] bg-[#FAF7F2] flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                {editingProductId ? 'تعديل بيانات العطر' : 'إضافة عطر فاخر جديد'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">اسم العطر *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: ديور سوفاج إكسير"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-forest-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الماركة (Brand) *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: Dior أو Chanel أو Creed"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-forest-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الفئة المستهدفة</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-forest-700"
                  >
                    <option value="men">رجالي</option>
                    <option value="women">نسائي</option>
                    <option value="unisex">للجنسين</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">درجة التركيز</label>
                  <select
                    value={formData.concentration}
                    onChange={(e) => setFormData({ ...formData, concentration: e.target.value as any })}
                    className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-forest-700 font-mono"
                  >
                    <option value="Eau de Parfum">Eau de Parfum (EDP)</option>
                    <option value="Parfum Extrait">Parfum Extrait (مركز جداً)</option>
                    <option value="Eau de Toilette">Eau de Toilette (EDT)</option>
                    <option value="Parfum">Parfum</option>
                    <option value="Cologne">Cologne</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">العائلة العطرية</label>
                  <select
                    value={formData.fragranceFamily}
                    onChange={(e) => setFormData({ ...formData, fragranceFamily: e.target.value as any })}
                    className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-forest-700"
                  >
                    <option value="oriental">شرقي (عود، عنبر، بخور)</option>
                    <option value="woody">خشبي (صندل، أرز، نجيل هند)</option>
                    <option value="fresh">منعش وحمضيات وبحري</option>
                    <option value="floral">أزهار وفواكه</option>
                    <option value="amber">عنبر وفانيليا</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">رابط صورة العطر (URL)</label>
                  <input
                    type="text"
                    placeholder="/images/perfume-sample-1.jpg أو رابط خارجي"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-forest-700 font-mono text-left"
                    dir="ltr"
                  />
                  <div className="flex gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: '/images/perfume-sample-1.jpg' })}
                      className="text-[10px] text-forest-700 underline font-bold"
                    >
                      صورة زجاجة Oro Puro
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: '/images/perfume-sample-2.jpg' })}
                      className="text-[10px] text-forest-700 underline font-bold"
                    >
                      صورة زجاجة كريستال
                    </button>
                  </div>
                </div>
              </div>

              {/* Sizes and Prices */}
              <div className="pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700">الأحجام والأسعار المتوفرة *</label>
                  <button
                    type="button"
                    onClick={handleAddSizeRow}
                    className="text-[11px] text-forest-700 hover:text-forest-800 font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>إضافة حجم آخر</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.sizes.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="الحجم (مثال: 50 مل)"
                        value={s.size}
                        onChange={(e) => handleUpdateSizeRow(idx, 'size', e.target.value)}
                        className="w-1/3 bg-[#FAF7F2] border border-slate-300 rounded-lg p-2 text-xs text-slate-900"
                        required
                      />
                      <input
                        type="number"
                        placeholder="السعر (ج.م)"
                        value={s.price}
                        onChange={(e) => handleUpdateSizeRow(idx, 'price', Number(e.target.value))}
                        className="w-1/3 bg-[#FAF7F2] border border-slate-300 rounded-lg p-2 text-xs text-slate-900"
                        required
                      />
                      <input
                        type="number"
                        placeholder="السعر قبل الخصم (اختياري)"
                        value={s.originalPrice || ''}
                        onChange={(e) => handleUpdateSizeRow(idx, 'originalPrice', e.target.value ? Number(e.target.value) : undefined)}
                        className="w-1/3 bg-[#FAF7F2] border border-slate-300 rounded-lg p-2 text-xs text-slate-900"
                      />
                      {formData.sizes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveSizeRow(idx)}
                          className="p-1.5 text-red-600 hover:text-red-700"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Fragrance Notes */}
              <div className="pt-2 border-t border-slate-200 space-y-2">
                <label className="block text-xs font-bold text-slate-700">الهرم العطري (مفصولة بفاصلة)</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-500 block mb-0.5">قمة العطر (Top Notes):</span>
                    <input
                      type="text"
                      placeholder="برغموت، هيل، جريب فروت"
                      value={formData.topNotes}
                      onChange={(e) => setFormData({ ...formData, topNotes: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-slate-300 rounded-lg p-2 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block mb-0.5">قلب العطر (Heart Notes):</span>
                    <input
                      type="text"
                      placeholder="عود، ياسمين، لافندر"
                      value={formData.heartNotes}
                      onChange={(e) => setFormData({ ...formData, heartNotes: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-slate-300 rounded-lg p-2 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block mb-0.5">قاعدة العطر (Base Notes):</span>
                    <input
                      type="text"
                      placeholder="عنبر، مسك، فانيليا، صندل"
                      value={formData.baseNotes}
                      onChange={(e) => setFormData({ ...formData, baseNotes: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-slate-300 rounded-lg p-2 text-xs text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">وصف العطر وإيحاءاته</label>
                <textarea
                  rows={3}
                  placeholder="اكتب وصفاً جذاباً يعبر عن حضور العطر ومناسباته..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-forest-700"
                />
              </div>

              {/* Featured toggle */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4 accent-emerald-700 rounded"
                />
                <label htmlFor="isFeatured" className="text-xs text-slate-800 font-bold cursor-pointer">
                  تمييز هذا العطر في الصفحة الرئيسية كـ (عطر مميز ⭐)
                </label>
              </div>

              {/* Sold Out toggle */}
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-50 border border-rose-200">
                <input
                  type="checkbox"
                  id="isSoldOut"
                  checked={formData.isSoldOut}
                  onChange={(e) => setFormData({ ...formData, isSoldOut: e.target.checked })}
                  className="w-4 h-4 accent-rose-600 rounded cursor-pointer"
                />
                <label htmlFor="isSoldOut" className="text-xs text-rose-950 font-bold cursor-pointer flex-1">
                  تحديد هذا العطر كـ (نفد من المخزون / Sold Out) - إيقاف زر الشراء في واجهة المتجر وعرض شارة نفاد الكمية
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs text-slate-600 hover:text-slate-900"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="btn-forest px-7 py-2.5 rounded-xl text-xs font-bold"
                >
                  {editingProductId ? 'حفظ التعديلات' : 'إضافة العطر للمتجر'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
