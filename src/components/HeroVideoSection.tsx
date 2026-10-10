import React, { useRef, useState, useEffect } from 'react';
import { 
  Sparkles, Play, Pause, Volume2, VolumeX, 
  ChevronRight, ChevronLeft 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../context/StoreContext';

interface SlideData {
  id: string;
  type: 'video' | 'image';
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  image?: string;
  videoSrc?: string;
  accentColor: string;
  primaryCtaText: string;
  primaryCtaAction: 'scroll' | 'finder' | 'compare' | 'product';
  secondaryCtaText?: string;
  secondaryCtaAction?: 'spray' | 'finder' | 'compare';
  perfumeId?: string;
}

export const HeroVideoSection: React.FC = () => {
  const { 
    setIsFragranceFinderOpen, 
    setIsComparisonOpen, 
    products, 
    setActiveProductForDetail,
    settings
  } = useStore();

  const customContent = settings.siteContent;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isSprayed, setIsSprayed] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Slides configuration (Driven dynamically by Admin CMS with high conversion neuro-marketing)
  const slides: SlideData[] = [
    {
      id: 'mist-video',
      type: 'video',
      badge: customContent?.heroBadge || 'الذهب الخالص للعطور الأصلية • تركيز عالي وفوحان كاسح',
      title: customContent?.heroTitle || 'العطر الذي يجعل الجميع يسألك: ما هذا العطر؟',
      highlight: customContent?.heroHighlight || 'ما هذا العطر؟',
      subtitle: customContent?.heroSubtitle || 'توليفات عطرية عالمية ساحرة تفرض هيبتك وتمنحك جاذبية استثنائية مع حق التجربة والمعاينة قبل الدفع!',
      videoSrc: '/videos/perfume-mist.webm',
      image: customContent?.heroImageUrl || '/images/hero-perfume-spray.jpg',
      accentColor: 'from-amber-500/30 to-gold-600/10',
      primaryCtaText: customContent?.heroCtaText || 'اطلب الآن مع حق المعاينة',
      primaryCtaAction: 'scroll',
      secondaryCtaText: customContent?.heroSecondaryCtaText || 'مستشار العطور الذكي',
      secondaryCtaAction: 'finder'
    },
    {
      id: 'imagination-trend',
      type: 'image',
      badge: 'العطر الأوسع انتشاراً عالمياً • انتعاش الشاي الأسود والحمضيات',
      title: 'إيماجينيشن لويس فيتون الملكي',
      highlight: 'إيماجينيشن',
      subtitle: 'أيقونة الأناقة المترفة، مزيج بارد ومميز من حمضيات كالابريا والشاي الأسود النادر والزنجبيل وعمق أمبروكساني نقي.',
      image: 'https://images.unsplash.com/photo-1594913785162-e678a0c23ee9?auto=format&fit=crop&q=80&w=1600',
      accentColor: 'from-blue-950/80 via-black/80 to-amber-950/80',
      primaryCtaText: 'اقتنِ العطر الآن',
      primaryCtaAction: 'product',
      secondaryCtaText: 'مقارنة العطور',
      secondaryCtaAction: 'compare',
      perfumeId: 'imagination-1'
    },
    {
      id: 'jassas-hawas',
      type: 'image',
      badge: 'الأعلى طلباً في مصر والخليج • فوحان نفاذ Beast Mode',
      title: 'جساس عساف & هوس آيس الرصاصي',
      highlight: 'جساس & هوس آيس',
      subtitle: 'العطران الأكثر ثباتاً وفوحاناً. ثبات يتحدى العمل والحر والشمس، ويوفر عليك 70% من سعر التوكيل بنفس الزيت الأصلي 100%.',
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1600',
      accentColor: 'from-slate-950/90 via-black/80 to-blue-950/80',
      primaryCtaText: 'اطلب الأكثر مبيعاً الآن',
      primaryCtaAction: 'scroll',
      secondaryCtaText: 'مستشار العطور الذكي',
      secondaryCtaAction: 'finder'
    },
    {
      id: 'youth-niche-trend',
      type: 'image',
      badge: 'انتعاش الصيف والسهرات • ثبات أسطوري لا ينطفئ',
      title: 'عطور الطاقة والجاذبية الرجالية العصرية',
      highlight: 'الجاذبية العصرية',
      subtitle: 'حمضيات منعشة وأخشاب فاخرة تمنحك حيوية وثقة تدوم طوال اليوم. صُممت خصيصاً للشباب المحبين للتميز وجذب الإطراءات.',
      image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=1600',
      accentColor: 'from-blue-950/80 via-black/80 to-emerald-950/80',
      primaryCtaText: 'تسوق التشكيلة الرجالية',
      primaryCtaAction: 'scroll',
      secondaryCtaText: 'مقارنة العطور',
      secondaryCtaAction: 'compare'
    }
  ];

  // Auto-play timer (changes automatically every 5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSpray = () => {
    setIsSprayed(true);
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#D4AF37', '#064E3B', '#F5ECCF', '#10B981'],
      scalar: 0.8,
      gravity: 0.85,
    });
    setTimeout(() => setIsSprayed(false), 2000);
  };

  const scrollToProducts = () => {
    const section = document.getElementById('perfumes-collection');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCtaAction = (action?: string, perfumeId?: string) => {
    if (action === 'scroll') {
      scrollToProducts();
    } else if (action === 'finder') {
      setIsFragranceFinderOpen(true);
    } else if (action === 'compare') {
      setIsComparisonOpen(true);
    } else if (action === 'spray') {
      handleSpray();
    } else if (action === 'product' && perfumeId) {
      const prod = products.find(p => p.id === perfumeId);
      if (prod) {
        setActiveProductForDetail(prod);
      } else {
        scrollToProducts();
      }
    }
  };

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      // Swiped left
      handleNext();
    } else if (diff < -50) {
      // Swiped right
      handlePrev();
    }
    setTouchStartX(null);
  };

  const activeSlideData = slides[currentSlide];

  return (
    <section className="relative w-full bg-[#FAF7F2] pt-2 sm:pt-4 pb-8 sm:pb-12 px-2 sm:px-4 lg:px-6 font-arabic">
      <div 
        className="max-w-[1550px] w-full mx-auto"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Full-Width Slider Container with Beautiful Curvature */}
        <div className="relative w-full h-[500px] sm:h-[580px] lg:h-[640px] rounded-2xl sm:rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-2xl border-2 border-[#E6DDD0] bg-black select-none">
          
          {/* Slides Carousel */}
          {slides.map((slide, idx) => {
            const isActive = idx === currentSlide;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {/* Media Background */}
                {slide.type === 'video' ? (
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="absolute inset-0 w-full h-full object-cover filter brightness-75 scale-105"
                    />
                    <video
                      ref={videoRef}
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-70"
                    >
                      <source src={slide.videoSrc} type="video/webm" />
                    </video>
                  </div>
                ) : (
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className={`absolute inset-0 w-full h-full object-cover filter brightness-75 transition-transform duration-7000 ease-out ${
                        isActive ? 'scale-110' : 'scale-100'
                      }`}
                    />
                  </div>
                )}

                {/* Subtle Cinematic Vignette & Gradients */}
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.accentColor} opacity-90`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />

                {/* Slide Foreground Content */}
                <div className="absolute inset-0 flex flex-col justify-end sm:justify-center p-4 sm:p-12 lg:p-20 pb-12 sm:pb-12 z-20 max-w-4xl text-right">
                  
                  {/* Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-gold-300 text-[10px] sm:text-sm font-bold w-fit mb-2 sm:mb-4 shadow-sm animate-fade-in">
                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-400" />
                    <span>{slide.badge}</span>
                  </div>

                  {/* Title */}
                  <h1 className="text-xl sm:text-4xl lg:text-6xl font-black text-white tracking-tight leading-snug sm:leading-tight mb-2 sm:mb-4 drop-shadow-md">
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-[11px] sm:text-base lg:text-lg text-slate-200 leading-relaxed max-w-2xl mb-4 sm:mb-8 drop-shadow line-clamp-2 sm:line-clamp-none">
                    {slide.subtitle}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <button
                      onClick={() => handleCtaAction(slide.primaryCtaAction, slide.perfumeId)}
                      className="btn-forest px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold shadow-xl hover:scale-105 active:scale-95 transition-all"
                    >
                      <span>{slide.primaryCtaText}</span>
                    </button>

                    {slide.secondaryCtaText && (
                      <button
                        onClick={() => handleCtaAction(slide.secondaryCtaAction, slide.perfumeId)}
                        className={`px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold shadow-lg backdrop-blur-md transition-all ${
                          slide.secondaryCtaAction === 'spray'
                            ? `bg-gold-500/90 hover:bg-gold-400 text-slate-950 font-black ${isSprayed ? 'scale-95 ring-4 ring-gold-300' : 'hover:scale-105'}`
                            : 'bg-white/15 hover:bg-white/25 text-white border border-white/30 hover:scale-105'
                        }`}
                      >
                        <span>{slide.secondaryCtaText}</span>
                      </button>
                    )}
                  </div>

                  {/* High-Converting Risk-Reversal Strip */}
                  <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-5 text-[10px] sm:text-xs font-bold text-slate-200">
                    <span className="flex items-center gap-1.5 text-gold-300 bg-black/30 px-2 sm:px-2.5 py-1 rounded-full border border-gold-400/30 backdrop-blur-xs">
                      <span>🛡️</span> حق المعاينة قبل الدفع
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-300 bg-black/30 px-2 sm:px-2.5 py-1 rounded-full border border-emerald-400/30 backdrop-blur-xs">
                      <span>⚡</span> ثبات 48 ساعة
                    </span>
                    <span className="hidden sm:flex items-center gap-1.5 text-slate-200 bg-black/30 px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-xs">
                      <span>🔄</span> استبدال فوري 14 يوماً
                    </span>
                  </div>

                </div>

              </div>
            );
          })}

          {/* Video Controls (Floating on video slide) */}
          {activeSlideData.type === 'video' && (
            <div className="absolute top-4 sm:top-5 left-4 sm:left-5 z-30 flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="p-2 sm:p-2.5 rounded-full bg-black/60 text-white/90 hover:text-white backdrop-blur-md hover:bg-black/80 transition-all border border-white/20 shadow-md"
                title={isPlaying ? 'إيقاف الفيديو' : 'تشغيل الفيديو'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              </button>
              <button
                onClick={toggleMute}
                className="p-2 sm:p-2.5 rounded-full bg-black/60 text-white/90 hover:text-white backdrop-blur-md hover:bg-black/80 transition-all border border-white/20 shadow-md"
                title={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              </button>
            </div>
          )}

          {/* Navigation Arrows (Prev / Next) - Desktop & Tablet (Mobile uses touch swipe) */}
          <button
            onClick={handlePrev}
            className="hidden sm:flex absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/40 hover:bg-black/75 text-white/90 hover:text-white backdrop-blur-md border border-white/20 items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-95"
            title="السابق"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="hidden sm:flex absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/40 hover:bg-black/75 text-white/90 hover:text-white backdrop-blur-md border border-white/20 items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-95"
            title="التالي"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Bottom Indicators & Progress Pills */}
          <div className="absolute bottom-5 sm:bottom-7 inset-x-0 z-30 flex items-center justify-center gap-2 sm:gap-3 px-4">
            {slides.map((s, i) => {
              const isSelected = i === currentSlide;
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(i)}
                  className={`group relative h-2.5 sm:h-3 rounded-full transition-all duration-500 overflow-hidden ${
                    isSelected 
                      ? 'w-12 sm:w-16 bg-gold-400 shadow-md' 
                      : 'w-2.5 sm:w-3 bg-white/40 hover:bg-white/70'
                  }`}
                  title={s.title}
                >
                  {isSelected && (
                    <div 
                      className="h-full bg-white/80 rounded-full animate-progress"
                      style={{ animationDuration: '2s' }}
                    />
                  )}
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
