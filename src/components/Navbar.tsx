import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Search, LayoutDashboard, Store } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SearchModal } from './SearchModal';

interface NavbarProps {
  onSearchChange?: (query: string) => void;
  searchQuery?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearchChange, searchQuery = '' }) => {
  const { 
    settings,
    cartCount, 
    setIsCartOpen, 
    setIsFragranceFinderOpen, 
    setIsComparisonOpen,
    comparisonItems, 
    activeView, 
    setActiveView,
    isAdminAuthenticated,
    setActiveProductForDetail
  } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleReturnHome = () => {
    setActiveView('store');
    setIsCartOpen(false);
    setIsFragranceFinderOpen(false);
    setIsComparisonOpen(false);
    setActiveProductForDetail(null);
    if (onSearchChange) onSearchChange('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = '';
  };

  return (
    <nav className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EBE4D8] transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo (Takes user directly to Home Page and scrolls to top) */}
          <div 
            onClick={handleReturnHome}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
            title="العودة للصفحة الرئيسية لمتجر Oro Puro"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-gold-400/80 bg-white p-0.5 shadow-soft group-hover:scale-105 transition-all overflow-hidden flex items-center justify-center shrink-0">
              <img 
                src={settings.logoUrl || '/images/logo.png'} 
                alt={settings.storeName || 'Oro Puro Logo'}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/logo.png';
                }}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-lg sm:text-2xl font-black tracking-widest uppercase font-serif text-slate-900 group-hover:text-forest-800 transition-colors">
                  ORO PURO
                </span>
                <span className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded border border-gold-400 text-gold-700 bg-gold-50 font-bold font-mono">
                  PARFUMS
                </span>
              </div>
              <span className="text-[10px] sm:text-xs text-slate-500 tracking-wider">
                الذهب الخالص للعطور العالمية
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links (100% Customer Facing) */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <button
              onClick={handleReturnHome}
              className={`text-sm font-semibold transition-all hover:text-gold-600 ${
                activeView === 'store' ? 'text-forest-800 font-bold border-b-2 border-forest-800 pb-1' : 'text-slate-600'
              }`}
            >
              الرئيسية والتشكيلة
            </button>

            <button
              onClick={() => {
                setActiveView('store');
                window.location.hash = 'women';
                const el = document.getElementById('perfumes-women') || document.getElementById('perfumes-collection');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-xs text-rose-900 bg-rose-50 border border-rose-300 hover:bg-rose-100 flex items-center gap-1.5 hover:scale-105 active:scale-95"
            >
              <span>القسم النسائي</span>
              <span>🌸</span>
            </button>

            <button
              onClick={() => {
                setActiveView('advisor');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.location.hash = 'advisor';
              }}
              className={`text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs ${
                activeView === 'advisor'
                  ? 'bg-forest-800 text-white shadow-md'
                  : 'text-forest-800 bg-forest-50 border border-forest-700/30 hover:bg-forest-100'
              }`}
            >
              مستشار العطور الذكي
            </button>

            <button
              onClick={() => {
                setActiveView('comparison');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.location.hash = 'comparison';
              }}
              className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs ${
                activeView === 'comparison'
                  ? 'bg-gold-500 text-slate-950 font-black shadow-md'
                  : 'text-gold-900 bg-gold-50 border border-gold-300 hover:bg-gold-100'
              }`}
              title="مقارنة العطور والهرم العطري وقوة الثبات والفوحان"
            >
              <span>مقارنة العطور</span>
              {comparisonItems.length > 0 && (
                <span className={`w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center font-mono ${
                  activeView === 'comparison' ? 'bg-slate-900 text-gold-300' : 'bg-forest-800 text-white'
                }`}>
                  {comparisonItems.length}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveView('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.location.hash = 'contact';
              }}
              className={`text-sm font-semibold transition-all hover:text-gold-600 ${
                activeView === 'contact' ? 'text-forest-800 font-bold border-b-2 border-forest-800 pb-1' : 'text-slate-600'
              }`}
            >
              اتصل بنا وضمان الأصالة
            </button>
          </div>

          {/* Actions: Search, (Owner Toggle if authenticated), Cart */}
          <div className="flex items-center gap-3">
            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="p-2 sm:px-3 sm:py-2 rounded-full border border-[#E0D7C9] bg-white text-slate-700 hover:text-forest-800 hover:border-forest-700/50 hover:bg-forest-50/50 transition-all shadow-xs flex items-center gap-2 group"
              title="بحث ذكي في العطور واقتراح الكلمات المشابهة"
            >
              <Search className="w-4 h-4 text-gold-600 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-xs font-bold text-slate-600 group-hover:text-forest-900 max-w-[140px] truncate">
                {searchQuery ? `بحث: ${searchQuery}` : 'ابحث عن عطر...'}
              </span>
              {searchQuery && (
                <span 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSearchChange) onSearchChange('');
                  }}
                  className="w-4 h-4 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-[10px] ml-1"
                  title="مسح البحث"
                >
                  <X className="w-3 h-3" />
                </span>
              )}
            </button>

            {/* Owner Switcher - ONLY visible if owner has logged in via secret URL */}
            {isAdminAuthenticated && (
              <button
                onClick={() => setActiveView(activeView === 'store' ? 'admin' : 'store')}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-forest-800 text-white border border-forest-800 shadow-sm"
              >
                {activeView === 'store' ? (
                  <>
                    <LayoutDashboard className="w-4 h-4 text-gold-400" />
                    <span className="hidden sm:inline">لوحة الإدارة</span>
                  </>
                ) : (
                  <>
                    <Store className="w-4 h-4" />
                    <span className="hidden sm:inline">عرض المتجر</span>
                  </>
                )}
              </button>
            )}

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full btn-forest shadow-md hover:scale-105 transition-all"
              title="سلة المشتريات"
            >
              <ShoppingBag className="w-5 h-5 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gold-400 text-slate-900 font-black text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-forest-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown (100% Customer Facing) */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#E8E2D8] flex flex-col gap-3 bg-[#FAF7F2] px-2">
            {/* Mobile Search Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSearchModalOpen(true);
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-white border border-[#E0D7C9] text-forest-900 font-bold text-xs shadow-2xs hover:border-gold-500"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-gold-600" />
                <span>{searchQuery ? `البحث الحالي: ${searchQuery}` : 'ابحث عن عطر، ماركة، أو نوتة...'}</span>
              </div>
              <span className="text-[10px] bg-forest-50 text-forest-800 px-2 py-0.5 rounded-full border border-forest-200">
                بحث ذكي
              </span>
            </button>

            <button
              onClick={() => {
                handleReturnHome();
                setMobileMenuOpen(false);
              }}
              className={`text-right py-2 text-sm font-semibold transition-colors ${
                activeView === 'store' ? 'text-forest-800 font-bold' : 'text-slate-800'
              }`}
            >
              الرئيسية والتشكيلة
            </button>

            <button
              onClick={() => {
                setActiveView('store');
                setMobileMenuOpen(false);
                window.location.hash = 'women';
                const el = document.getElementById('perfumes-women') || document.getElementById('perfumes-collection');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-right py-2 px-3 text-sm font-bold text-rose-900 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between"
            >
              <span>القسم النسائي الملكي</span>
              <span>🌸</span>
            </button>
            <button
              onClick={() => {
                setActiveView('advisor');
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.location.hash = 'advisor';
              }}
              className={`text-right py-2 text-sm font-bold ${
                activeView === 'advisor' ? 'text-forest-900 bg-forest-50 px-2 rounded-lg' : 'text-forest-800'
              }`}
            >
              مستشار العطور الذكي
            </button>
            <button
              onClick={() => {
                setActiveView('comparison');
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.location.hash = 'comparison';
              }}
              className={`flex items-center justify-between py-2 text-sm font-bold ${
                activeView === 'comparison' ? 'text-gold-950 bg-gold-100/60 px-2 rounded-lg' : 'text-gold-900'
              }`}
            >
              <span>مقارنة العطور</span>
              {comparisonItems.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-forest-800 text-white text-[10px] font-bold font-mono">
                  {comparisonItems.length} عطور
                </span>
              )}
            </button>
            <button
              onClick={() => {
                setActiveView('contact');
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.location.hash = 'contact';
              }}
              className={`text-right py-2 text-sm font-semibold transition-colors ${
                activeView === 'contact' ? 'text-forest-800 font-bold bg-forest-50 px-2 rounded-lg' : 'text-slate-800'
              }`}
            >
              اتصل بنا وضمان الأصالة
            </button>
          </div>
        )}
      </div>

      {/* Smart Live Search Modal with Suggestions */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onApplySearch={(query) => {
          if (onSearchChange) onSearchChange(query);
        }}
        initialQuery={searchQuery}
      />
    </nav>
  );
};
