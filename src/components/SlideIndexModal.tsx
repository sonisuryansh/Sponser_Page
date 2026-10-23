import React, { useEffect } from 'react';
import { SLIDES } from '../data/slidesData';
import { X, ArrowRight, BookOpen, Layers, Sparkles, Building2, Cpu } from 'lucide-react';

interface SlideIndexModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
  onSelectSlide: (index: number) => void;
}

export const SlideIndexModal: React.FC<SlideIndexModalProps> = ({
  isOpen,
  onClose,
  currentIndex,
  onSelectSlide,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Overview': return <BookOpen className="w-3.5 h-3.5" />;
      case 'Domain': return <Cpu className="w-3.5 h-3.5" />;
      case 'Pedagogy': return <Layers className="w-3.5 h-3.5" />;
      case 'Curriculum': return <Sparkles className="w-3.5 h-3.5" />;
      case 'Partnership': return <Building2 className="w-3.5 h-3.5" />;
      default: return <BookOpen className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#203744]/70 backdrop-blur-md transition-opacity animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[88vh] bg-[#DFE6E7] border border-[#203744]/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-5 border-b border-[#203744]/10 bg-white/70 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono-tech text-xs uppercase tracking-wider text-[#398BB0]">
                Interactive Blueprint
              </span>
              <span className="text-xs text-[#203744]/40">•</span>
              <span className="font-mono-tech text-xs text-[#203744]/60">15 Chapters</span>
            </div>
            <h3 className="font-serif-editorial text-2xl font-medium text-[#203744] mt-0.5">
              Presentation Chapters Index
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#203744] hover:bg-white border border-transparent hover:border-[#203744]/15 transition-all"
            aria-label="Close Index"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chapters Grid */}
        <div className="overflow-y-auto p-6 space-y-2.5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {SLIDES.map((slide, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => {
                    onSelectSlide(index);
                    onClose();
                  }}
                  className={`group text-left p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between relative overflow-hidden ${
                    isActive
                      ? 'bg-white border-[#398BB0] shadow-md ring-1 ring-[#398BB0]/30'
                      : 'bg-white/60 hover:bg-white border-[#203744]/10 hover:border-[#398BB0]/50 hover:shadow-sm'
                  }`}
                >
                  {/* Active Indicator Bar */}
                  {isActive && (
                    <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#398BB0]" />
                  )}

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono-tech text-xs font-semibold text-[#398BB0]">
                        {slide.label}
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono-tech text-[10px] text-[#203744]/60 bg-[#D5E2E5]/50 px-2 py-0.5 rounded-full">
                        {getCategoryIcon(slide.category)}
                        {slide.category}
                      </span>
                    </div>

                    <h4 className="font-serif-editorial text-base font-semibold text-[#203744] group-hover:text-[#398BB0] transition-colors leading-snug">
                      {slide.title}
                    </h4>

                    {slide.headline && (
                      <p className="font-sans-modern text-xs text-[#203744]/70 mt-1 line-clamp-2 leading-relaxed">
                        {slide.headline}
                      </p>
                    )}
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#203744]/8 flex items-center justify-between text-[11px] font-mono-tech text-[#398BB0] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Navigate to section</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#D5E2E5]/60 border-t border-[#203744]/10 flex items-center justify-between text-xs text-[#203744]/70 font-sans-modern">
          <span>Click any card to jump immediately. Press ESC to return.</span>
          <span className="font-mono-tech text-[11px] text-[#398BB0]">MedhaArc Labs School Partnership</span>
        </div>

      </div>
    </div>
  );
};
