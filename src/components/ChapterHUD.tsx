import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface ChapterHUDProps {
  currentIndex: number; // 0-based
  totalCount: number; // 14
  currentTitle: string;
  onPrev: () => void;
  onNext: () => void;
}

export const ChapterHUD: React.FC<ChapterHUDProps> = ({
  currentIndex,
  totalCount,
  currentTitle,
  onPrev,
  onNext,
}) => {
  const currentNumStr = (currentIndex + 1).toString().padStart(2, '0');
  const totalNumStr = totalCount.toString().padStart(2, '0');
  const isHero = currentIndex === 0;

  return (
    <>
      {/* Hero Scroll Cue (Shown only on Section 01, positioned cleanly below all content) */}
      {isHero && (
        <div
          className="fixed bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-none select-none text-white/60 animate-bounce transition-opacity duration-500"
          aria-hidden="true"
        >
          <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-light mb-0.5">
            Scroll
          </span>
          <ChevronDown className="w-3.5 h-3.5 opacity-60" />
        </div>
      )}

      {/* Chapter Counter in Bottom-Left Corner: Small, Transparent, mix-blend-mode: difference */}
      <aside
        aria-label="Chapter Indicator"
        className="fixed bottom-3 left-3 sm:bottom-8 sm:left-12 z-40 flex items-center gap-2 sm:gap-3 select-none pointer-events-auto mix-blend-difference text-white"
      >
        {/* Counter: 01 / 14 */}
        <div className="flex items-baseline font-mono text-[11px] sm:text-xs tracking-widest">
          <span className="font-semibold">{currentNumStr}</span>
          <span className="opacity-40 mx-1">/</span>
          <span className="opacity-60">{totalNumStr}</span>
        </div>

        {/* Divider dot & title (hidden on mobile, visible on tablet/desktop) */}
        <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-white opacity-40" />
        <span className="hidden sm:inline text-[11px] uppercase tracking-[0.16em] opacity-75 font-mono max-w-[180px] truncate">
          {currentTitle}
        </span>

        {/* Quiet Presenter Navigation Arrows */}
        <div className="flex items-center gap-0.5 ml-1 sm:ml-2 border-l border-white/20 pl-1.5 sm:pl-2">
          <button
            onClick={onPrev}
            disabled={currentIndex === 0}
            aria-label="Previous chapter"
            className="p-1 hover:opacity-100 opacity-60 disabled:opacity-20 transition-opacity focus:outline-none focus-visible:ring-1 focus-visible:ring-white rounded-[2px] cursor-pointer disabled:cursor-not-allowed"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onNext}
            disabled={currentIndex === totalCount - 1}
            aria-label="Next chapter"
            className="p-1 hover:opacity-100 opacity-60 disabled:opacity-20 transition-opacity focus:outline-none focus-visible:ring-1 focus-visible:ring-white rounded-[2px] cursor-pointer disabled:cursor-not-allowed"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>
    </>
  );
};
