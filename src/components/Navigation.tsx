import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';



interface NavigationProps {
  progress: number;
  currentSlideIndex: number;
  onNavigate: (index: number) => void;
  onOpenIndex: () => void;
  onOpenPartnership: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  progress,
  currentSlideIndex,
  onNavigate,
  onOpenIndex,
  onOpenPartnership,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', slideIndex: 0 },
    { label: 'Ecosystem', slideIndex: 3 },
    { label: 'Robotics', slideIndex: 4 },
    { label: 'AI & Data', slideIndex: 5 },
    { label: 'Aerial', slideIndex: 7 },
    { label: 'Curriculum', slideIndex: 9 },
    { label: 'Partnership', slideIndex: 12 },
  ];

  return (
    <>
      {/* Ultra-thin Top Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-black/5">
        <div
          className="h-full bg-gradient-to-r from-[#203744] via-[#398BB0] to-[#286D8B] transition-all duration-100 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
        />
      </div>

      {/* Main Luxury Sticky Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-6 sm:px-10 py-4 ${
          isScrolled
            ? 'bg-[#DFE6E7]/85 backdrop-blur-md border-b border-[#203744]/10 shadow-xs'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Wordmark & Monogram */}
          <button
            onClick={() => onNavigate(0)}
            className="flex items-center gap-3 text-left group focus:outline-none"
            aria-label="MedhaArc Labs Home"
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-white/90 border border-[#203744]/10 p-1 shadow-xs group-hover:border-[#398BB0] transition-colors">
              <img
                src="/assets/medhaarc_metallic_logo.png"
                alt="MedhaArc Crest"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-editorial text-xl font-medium tracking-tight text-[#203744] leading-none">
                MedhaArc Labs
              </span>
              <span className="font-mono-tech text-[9px] tracking-widest uppercase text-[#398BB0] mt-0.5">
                School Technology Initiative
              </span>
            </div>
          </button>

          {/* Desktop Editorial Section Anchors */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-sans-modern text-[#203744]/75">
            {navLinks.map((link) => {
              const isActive =
                currentSlideIndex >= link.slideIndex &&
                (link.slideIndex === 12
                  ? true
                  : currentSlideIndex < (navLinks[navLinks.indexOf(link) + 1]?.slideIndex ?? 15));
              return (
                <button
                  key={link.label}
                  onClick={() => onNavigate(link.slideIndex)}
                  className={`transition-colors duration-200 hover:text-[#203744] relative py-1 ${
                    isActive ? 'text-[#203744] font-semibold' : ''
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#398BB0] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Pill Controls */}
          <div className="flex items-center gap-3">
            
            {/* Deck Chapters Button (Clean Presentation Style without slide numbers) */}
            <button
              onClick={onOpenIndex}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono-tech text-[#203744] bg-white/70 hover:bg-white border border-[#203744]/10 transition-all shadow-xs cursor-pointer"
              title="View presentation deck agenda"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#398BB0] animate-pulse" />
              <span className="tracking-wider uppercase font-medium">Deck Agenda</span>
            </button>

            {/* CTA Pill Button (Like 'Learn More ✦' or 'Meet The Team ✦' in video) */}
            <button
              onClick={onOpenPartnership}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#203744] text-white hover:bg-[#286D8B] text-xs font-sans-modern font-medium transition-all shadow-xs"
            >
              <span>Partner With Us</span>
              <Sparkles className="w-3 h-3 text-[#38bdf8]" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-[#203744] lg:hidden hover:bg-white/60"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#203744]/10 shadow-lg space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  onNavigate(link.slideIndex);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 px-3 rounded-lg text-sm font-sans-modern text-[#203744] hover:bg-[#DFE6E7]/50"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-[#203744]/10">
              <button
                onClick={() => {
                  onOpenPartnership();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-lg bg-[#203744] text-white font-sans-modern text-xs font-semibold text-center"
              >
                Partner With Us
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
