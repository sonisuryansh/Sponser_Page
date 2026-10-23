import React from 'react';
import { SLIDES } from '../data/slidesData';
import { LayoutGrid, ChevronUp, ChevronDown, Maximize, Minimize } from 'lucide-react';

interface HeaderProps {
  currentSlideIndex: number;
  progress: number;
  onOpenIndex: () => void;
  onNavigate: (index: number) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSlideIndex,
  progress,
  onOpenIndex,
  onNavigate,
  isFullscreen,
  onToggleFullscreen,
}) => {
  const currentSlide = SLIDES[currentSlideIndex] || SLIDES[0];

  return (
    <>
      {/* Top Global Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-[#DFE6E7]/30">
        <div
          className="h-full bg-gradient-to-r from-[#398BB0] via-[#286D8B] to-[#203744] transition-all duration-150 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
        />
      </div>

      {/* Main Sticky Header */}
      <header className="fixed top-1 left-0 right-0 z-40 px-4 sm:px-8 lg:px-12 xl:px-16 py-3.5 backdrop-blur-md bg-[#DFE6E7]/85 border-b border-[#203744]/10 transition-colors duration-300">
        <div className="max-w-[1560px] 2xl:max-w-[1680px] mx-auto flex items-center justify-between">
          
          {/* Brand Mark */}
          <button
            onClick={() => onNavigate(0)}
            className="flex items-center gap-3 text-left group focus:outline-none"
            aria-label="MedhaArc Labs Home"
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-white/90 shadow-xs border border-[#203744]/10 p-1 group-hover:border-[#398BB0] transition-colors">
              <img
                src="/assets/page_07.png"
                alt="MedhaArc Emblem"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-editorial text-lg sm:text-xl font-semibold tracking-tight text-[#203744] leading-none">
                MedhaArc Labs
              </span>
              <span className="font-mono-tech text-[10px] tracking-widest uppercase text-[#398BB0] mt-0.5">
                School Tech Initiative
              </span>
            </div>
          </button>

          {/* Chapter Status Indicator */}
          <div className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/60 border border-[#203744]/10 shadow-xs">
            <span className="font-mono-tech text-xs font-semibold text-[#398BB0]">
              {currentSlide.label}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#203744]/30" />
            <span className="font-sans-modern text-xs font-medium text-[#203744] max-w-[200px] truncate">
              {currentSlide.title}
            </span>
          </div>

          {/* Quick Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Slide Index Modal Button */}
            <button
              onClick={onOpenIndex}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#203744] bg-white/70 hover:bg-white border border-[#203744]/10 hover:border-[#398BB0] transition-all shadow-xs"
              title="View all 15 chapters"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-[#398BB0]" />
              <span className="hidden sm:inline font-mono-tech uppercase tracking-wider text-[11px]">
                Index (15)
              </span>
            </button>

            {/* Prev / Next Buttons */}
            <div className="flex items-center rounded-full bg-white/70 border border-[#203744]/10 p-0.5 shadow-xs">
              <button
                onClick={() => onNavigate(Math.max(0, currentSlideIndex - 1))}
                disabled={currentSlideIndex === 0}
                className="p-1 rounded-full text-[#203744] hover:bg-[#398BB0] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#203744] transition-colors"
                aria-label="Previous Chapter"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate(Math.min(SLIDES.length - 1, currentSlideIndex + 1))}
                disabled={currentSlideIndex === SLIDES.length - 1}
                className="p-1 rounded-full text-[#203744] hover:bg-[#398BB0] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#203744] transition-colors"
                aria-label="Next Chapter"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={onToggleFullscreen}
              className="p-1.5 rounded-full text-[#203744] bg-white/70 hover:bg-white border border-[#203744]/10 hover:border-[#398BB0] transition-colors shadow-xs"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Presentation Mode'}
              aria-label="Toggle Fullscreen"
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4 text-[#398BB0]" />
              ) : (
                <Maximize className="w-4 h-4 text-[#398BB0]" />
              )}
            </button>
          </div>

        </div>
      </header>
    </>
  );
};
