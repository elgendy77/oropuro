import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HeroVideoSection } from './components/HeroVideoSection';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { FragranceAdvisorPage } from './components/FragranceAdvisorPage';
import { PerfumeComparisonPage } from './components/PerfumeComparisonPage';
import { ContactPage } from './components/ContactPage';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { TopUrgencyBanner } from './components/TopUrgencyBanner';
import { SalesNotificationToast } from './components/SalesNotificationToast';
import { FloatingWhatsAppAssistant } from './components/FloatingWhatsAppAssistant';
import './App.css';

const MainContent: React.FC = () => {
  const { activeView, setActiveView } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  // Handle URL hash changes & secret admin parameters
  useEffect(() => {
    const handleNavigation = () => {
      const params = new URLSearchParams(window.location.search);
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();

      if (
        params.get('admin') === 'oropuro' ||
        params.get('admin') === 'true' ||
        hash === '#admin' ||
        hash === '#oropuro' ||
        path.endsWith('/admin') ||
        path.endsWith('/portal')
      ) {
        setActiveView('admin');
      } else if (hash === '#advisor' || hash === '#quiz' || hash === '#finder') {
        setActiveView('advisor');
      } else if (hash === '#comparison' || hash === '#compare') {
        setActiveView('comparison');
      } else if (hash === '#contact' || hash === '#guarantees') {
        setActiveView('contact');
      }
    };

    handleNavigation();
    window.addEventListener('hashchange', handleNavigation);
    return () => window.removeEventListener('hashchange', handleNavigation);
  }, [setActiveView]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] dark:bg-[#0A0D14] text-slate-800 dark:text-slate-100 font-arabic selection:bg-gold-500 selection:text-white transition-colors duration-200">
      {/* High-Converting Scarcity Urgency Banner (Non-admin) */}
      {activeView !== 'admin' && <TopUrgencyBanner />}

      {/* Global Luxury Navbar (100% Customer Facing) */}
      <Navbar onSearchChange={setSearchQuery} searchQuery={searchQuery} />

      {/* View Switcher: Store vs Comparison Page vs Advisor Page vs Admin Dashboard */}
      <main className="flex-1">
        {activeView === 'store' && (
          <>
            {/* Cinematic Hero Slider */}
            <HeroVideoSection />

            {/* Perfumes Collection & Filtering */}
            <ProductGrid 
              searchQuery={searchQuery} 
              onClearSearch={() => setSearchQuery('')}
              onSelectSearchKeyword={(kw) => setSearchQuery(kw)}
            />

            {/* Clean, elegant brand footer */}
            <Footer />
          </>
        )}

        {activeView === 'advisor' && (
          <>
            <FragranceAdvisorPage />
            <Footer />
          </>
        )}

        {activeView === 'comparison' && (
          <>
            <PerfumeComparisonPage />
            <Footer />
          </>
        )}

        {activeView === 'contact' && (
          <>
            <ContactPage />
            <Footer />
          </>
        )}

        {activeView === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* Global Customer Shopping Modals */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />

      {/* Live Sales Social Proof Toast (FOMO) & Floating WhatsApp Closing Bubble */}
      {activeView !== 'admin' && (
        <>
          <SalesNotificationToast />
          <FloatingWhatsAppAssistant />
        </>
      )}
    </div>
  );
};

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Oro Puro Application Error:', error, errorInfo);
  }

  handleReset = () => {
    localStorage.removeItem('oro_puro_products');
    localStorage.removeItem('oro_puro_settings');
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF7F2] text-slate-800 flex items-center justify-center p-4 font-arabic" dir="rtl">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#E8E2D8] shadow-xl text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
              <span className="text-2xl">✨</span>
            </div>
            <h2 className="text-xl font-black text-slate-900">
              متجر Oro Puro للعطور
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              حدث خطأ مؤقت أثناء تحميل المتجر، يمكنك تحديث الصفحة أو الضغط على الزر أدناه لإعادة التهيئة.
            </p>
            {this.state.error && (
              <pre className="text-[10px] text-rose-600 bg-rose-50 p-3 rounded-xl overflow-x-auto text-left" dir="ltr">
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={this.handleReset}
              className="w-full py-3 bg-forest-800 text-white rounded-xl font-bold text-xs hover:bg-forest-900 transition-colors shadow-sm"
            >
              إعادة تحميل وتحديث المتجر
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export function App() {
  return (
    <ErrorBoundary>
      <StoreProvider>
        <MainContent />
      </StoreProvider>
    </ErrorBoundary>
  );
}

export default App;
