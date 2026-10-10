import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Search, LayoutDashboard, Store, Sun, Moon, Globe } from 'lucide-react';
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
    setActiveProductForDetail,
    language,
    toggleLanguage,
    theme,
    toggleTheme,
    t
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
    <nav className="sticky top-0 z-40 bg-[#FAF7F2]/95 dark:bg-[#0A0D14]/95 backdrop-blur-md border-b border-[#EBE4D8] dark:border-[#1E2638] transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo (Takes user directly to Home Page and scrolls to top) */}
          <div 
            onClick={handleReturnHome}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
            title="Oro Puro Parfums"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-gold-400/80 bg-white dark:bg-[#121722] p-0.5 shadow-soft group-hover:scale-105 transition-all overflow-hidden flex items-center justify-center shrink-0">
              <img 
                src={settings.logoUrl || './images/logo.png'} 
                alt={settings.storeName || 'Oro Puro Logo'}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = './images/logo.png';
                }}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-lg sm:text-2xl font-black tracking-widest uppercase font-serif text-slate-900 dark:text-slate-100 group-hover:text-forest-800 dark:group-hover:text-gold-400 transition-colors">
                  ORO PURO
                </span>
                <span className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded border border-gold-400 text-gold-700 dark:text-gold-300 bg-gold-50 dark:bg-gold-950/40 font-bold font-mono">
                  PARFUMS
                </span>
              </div>
              <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 tracking-wider">
                {t('tagline')}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links (100% Customer Facing) */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <button
              onClick={handleReturnHome}
              className={`text-sm font-semibold transition-all hover:text-gold-600 dark:hover:text-gold-400 ${
                activeView === 'store' 
                  ? 'text-forest-800 dark:text-gold-400 font-bold border-b-2 border-forest-800 dark:border-gold-400 pb-1' 
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {t('navHome')}
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
                  : 'text-forest-800 dark:text-emerald-300 bg-forest-50 dark:bg-emerald-950/40 border border-forest-700/30 dark:border-emerald-700/40 hover:bg-forest-100 dark:hover:bg-emerald-900/40'
              }`}
            >
              {t('navAdvisor')}
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
                  : 'text-gold-900 dark:text-gold-300 bg-gold-50 dark:bg-gold-950/40 border border-gold-300 dark:border-gold-600/40 hover:bg-gold-100 dark:hover:bg-gold-900/40'
              }`}
              title="مقارنة العطور والهرم العطري"
            >
              <span>{t('navCompare')}</span>
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
              className={`text-sm font-semibold transition-all hover:text-gold-600 dark:hover:text-gold-400 ${
                activeView === 'contact' 
                  ? 'text-forest-800 dark:text-gold-400 font-bold border-b-2 border-forest-800 dark:border-gold-400 pb-1' 
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {t('navContact')}
            </button>
          </div>

          {/* Actions: Language, Theme, Search, Admin (if logged in), Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Switcher (AR / EN) */}
            <button
              onClick={toggleLanguage}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-full border border-[#E0D7C9] dark:border-[#222C3E] bg-white dark:bg-[#121722] text-slate-700 dark:text-slate-200 hover:text-forest-800 dark:hover:text-gold-400 hover:border-gold-400 transition-all shadow-xs flex items-center gap-1.5 text-xs font-bold"
              title={language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
              aria-label="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-gold-500 shrink-0" />
              <span className="font-sans font-black uppercase text-[11px] sm:text-xs">
                {language === 'ar' ? 'EN' : 'عربي'}
              </span>
            </button>

            {/* Dark / Light Theme Mode Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-[#E0D7C9] dark:border-[#222C3E] bg-white dark:bg-[#121722] text-slate-700 dark:text-slate-200 hover:text-gold-600 dark:hover:text-gold-400 hover:border-gold-400 transition-all shadow-xs flex items-center justify-center"
              title={theme === 'dark' ? t('themeToggleLight') : t('themeToggleDark')}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="p-2 sm:px-3 sm:py-2 rounded-full border border-[#E0D7C9] dark:border-[#222C3E] bg-white dark:bg-[#121722] text-slate-700 dark:text-slate-200 hover:text-forest-800 dark:hover:text-gold-400 hover:border-forest-700/50 hover:bg-forest-50/50 dark:hover:bg-[#192130] transition-all shadow-xs flex items-center gap-2 group"
              title="بحث ذكي في العطور"
            >
              <Search className="w-4 h-4 text-gold-600 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-xs font-bold text-slate-600 dark:text-slate-300 group-hover:text-forest-900 dark:group-hover:text-gold-300 max-w-[140px] truncate">
                {searchQuery ? `${searchQuery}` : t('navSearchBtn')}
              </span>
              {searchQuery && (
                <span 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSearchChange) onSearchChange('');
                  }}
                  className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-600 dark:text-slate-200 flex items-center justify-center text-[10px] ml-1"
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
                    <span className="hidden sm:inline">{t('navAdmin')}</span>
                  </>
                ) : (
                  <>
                    <Store className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('navStore')}</span>
                  </>
                )}
              </button>
            )}

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full btn-forest shadow-md hover:scale-105 transition-all"
              title={t('navCart')}
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
              className="md:hidden p-2 text-slate-700 dark:text-slate-200 hover:text-forest-800 dark:hover:text-gold-400"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#E8E2D8] dark:border-[#1E2638] flex flex-col gap-3 bg-[#FAF7F2] dark:bg-[#0D111A] px-2 transition-colors">
            {/* Quick Actions Row: Language & Theme */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#141A26] border border-[#E0D7C9] dark:border-[#222C3E]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {language === 'ar' ? 'المظهر واللغة' : 'Appearance & Language'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleLanguage}
                  className="px-3 py-1 rounded-lg text-xs font-bold border border-gold-400/60 bg-gold-50 dark:bg-gold-950/40 text-gold-900 dark:text-gold-300 flex items-center gap-1 font-sans"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'English' : 'العربية'}</span>
                </button>
                <button
                  onClick={toggleTheme}
                  className="p-1.5 rounded-lg text-xs font-bold border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center gap-1"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
                </button>
              </div>
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSearchModalOpen(true);
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-white dark:bg-[#141A26] border border-[#E0D7C9] dark:border-[#222C3E] text-forest-900 dark:text-gold-300 font-bold text-xs shadow-2xs hover:border-gold-500"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-gold-600" />
                <span>{searchQuery ? `${searchQuery}` : t('navSearchPlaceholder')}</span>
              </div>
              <span className="text-[10px] bg-forest-50 dark:bg-forest-950/40 text-forest-800 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-forest-200 dark:border-emerald-700/40">
                {language === 'ar' ? 'بحث ذكي' : 'Search'}
              </span>
            </button>

            <button
              onClick={() => {
                handleReturnHome();
                setMobileMenuOpen(false);
              }}
              className={`text-start py-2 text-sm font-semibold transition-colors ${
                activeView === 'store' ? 'text-forest-800 dark:text-gold-400 font-bold' : 'text-slate-800 dark:text-slate-200'
              }`}
            >
              {t('navHome')}
            </button>

            <button
              onClick={() => {
                setActiveView('advisor');
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.location.hash = 'advisor';
              }}
              className={`text-start py-2 text-sm font-bold ${
                activeView === 'advisor' ? 'text-forest-900 dark:text-gold-300 bg-forest-50 dark:bg-forest-950/40 px-2 rounded-lg' : 'text-forest-800 dark:text-emerald-300'
              }`}
            >
              {t('navAdvisor')}
            </button>

            <button
              onClick={() => {
                setActiveView('comparison');
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.location.hash = 'comparison';
              }}
              className={`flex items-center justify-between py-2 text-sm font-bold ${
                activeView === 'comparison' ? 'text-gold-950 dark:text-gold-200 bg-gold-100/60 dark:bg-gold-950/50 px-2 rounded-lg' : 'text-gold-900 dark:text-gold-400'
              }`}
            >
              <span>{t('navCompare')}</span>
              {comparisonItems.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-forest-800 dark:bg-gold-500 text-white dark:text-slate-950 text-[10px] font-bold font-mono">
                  {comparisonItems.length}
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
              className={`text-start py-2 text-sm font-semibold transition-colors ${
                activeView === 'contact' ? 'text-forest-800 dark:text-gold-400 font-bold bg-forest-50 dark:bg-forest-950/40 px-2 rounded-lg' : 'text-slate-800 dark:text-slate-200'
              }`}
            >
              {t('navContact')}
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
