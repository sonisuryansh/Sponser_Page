import React, { useState } from 'react';
import { Compass } from 'lucide-react';
import { SLIDES } from '../data/slidesData';

interface ChapterHUDProps {
  currentSlideIndex: number;
  onNavigate: (index: number) => void;
}

/**
 * ChapterHUD (Inspired by Yes526-tech / cinematic-website ChapterIndicator):
 * Minimal vertical chapter navigator styled in clean creamish-white educational theme.
 */
export const ChapterHUD: React.FC<ChapterHUDProps> = ({
  currentSlideIndex,
  onNavigate,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const activeSlide = SLIDES[currentSlideIndex] || SLIDES[0];

  return (
    <div
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end pointer-events-auto select-none"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Active Chapter Floating Card Pill (Creamish-White Institutional Aesthetic) */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-3.5 py-2 rounded-xl mb-3 bg-white/90 backdrop-blur-md border border-[#203744]/15 shadow-lg flex items-center gap-2.5 cursor-pointer hover:border-[#398BB0]/50 transition-all duration-300"
      >
        <div className="w-2 h-2 rounded-full bg-[#398BB0] animate-pulse" />
        <div className="text-right">
          <p className="text-[10px] uppercase font-mono-tech tracking-widest text-[#398BB0] font-bold">
            Chapter {String(currentSlideIndex + 1).padStart(2, '0')}
          </p>
          <h4 className="font-serif-editorial text-xs text-[#203744] font-semibold tracking-tight max-w-[150px] truncate">
            {activeSlide.title}
          </h4>
        </div>
        <Compass className="w-3.5 h-3.5 text-[#398BB0] transition-transform duration-500 hover:rotate-45" />
      </div>

      {/* Vertical 15-Chapter Dot Track */}
      <div className="flex flex-col items-center gap-1.5 py-2.5 px-2 rounded-full bg-white/85 backdrop-blur-md border border-[#203744]/12 shadow-md">
        {SLIDES.map((slide, idx) => {
          const isActive = currentSlideIndex === idx;
          return (
            <button
              key={slide.id}
              onClick={() => onNavigate(idx)}
              className="group relative flex items-center justify-center p-0.5 cursor-pointer"
              title={`Slide ${idx + 1}: ${slide.title}`}
            >
              {/* Dot */}
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-2 h-4 bg-[#398BB0] shadow-[0_0_8px_rgba(57,139,176,0.5)]'
                    : 'w-1.5 h-1.5 bg-[#203744]/25 group-hover:bg-[#398BB0]/70 group-hover:scale-125'
                }`}
              />

              {/* Hover Flyout Label (visible when expanded or hovered) */}
              {isExpanded && (
                <span className="absolute right-6 px-2 py-0.5 rounded bg-white text-[#203744] font-mono-tech text-[10px] whitespace-nowrap shadow-md border border-[#203744]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  {String(idx + 1).padStart(2, '0')}. {slide.title}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
