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
      {/* Hero Scroll Cue (Shown only on Section 01) */}
      {isHero && (
        <div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-none select-none text-white/70 animate-bounce transition-opacity duration-500"
          aria-hidden="true"
        >
          <span className="text-[11px] uppercase tracking-[0.25em] font-sans font-light mb-1">
            Scroll
          </span>
          <ChevronDown className="w-4 h-4 opacity-60" />
        </div>
      )}

      {/* Chapter Counter & Minimal Presenter Control in Bottom Right Corner */}
      <aside
        aria-label="Chapter Indicator"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-10 z-40 flex items-center gap-3.5 bg-black/40 backdrop-blur-md border border-white/10 px-3.5 py-2 rounded-[2px] text-white select-none pointer-events-auto"
      >
        {/* Active Chapter Title (Hidden on tiny screens) */}
        <span className="hidden sm:inline text-xs tracking-wider text-white/60 font-sans border-r border-white/10 pr-3 max-w-[160px] truncate">
          {currentTitle}
        </span>

        {/* Counter: 01/14 */}
        <div className="flex items-baseline font-mono text-xs tracking-widest">
          <span className="text-white font-semibold">{currentNumStr}</span>
          <span className="text-white/30 mx-1">/</span>
          <span className="text-white/50">{totalNumStr}</span>
        </div>

        {/* Quiet Presenter Navigation Arrows */}
        <div className="flex items-center gap-1 pl-2 border-l border-white/10">
          <button
            onClick={onPrev}
            disabled={currentIndex === 0}
            aria-label="Previous chapter"
            className="p-1 hover:text-white text-white/60 disabled:opacity-20 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white rounded-[2px] cursor-pointer disabled:cursor-not-allowed"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onNext}
            disabled={currentIndex === totalCount - 1}
            aria-label="Next chapter"
            className="p-1 hover:text-white text-white/60 disabled:opacity-20 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white rounded-[2px] cursor-pointer disabled:cursor-not-allowed"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>
    </>
  );
};
