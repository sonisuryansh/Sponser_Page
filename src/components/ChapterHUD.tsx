import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ChapterHUDProps {
  currentIndex: number; // 0-based
  totalCount?: number;
  currentTitle?: string;
  onPrev?: () => void;
  onNext?: () => void;
}

export const ChapterHUD: React.FC<ChapterHUDProps> = ({
  currentIndex,
}) => {
  const isHero = currentIndex === 0;

  if (!isHero) return null;

  return (
    <div
      className="fixed bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-none select-none text-white/60 animate-bounce transition-opacity duration-500"
      aria-hidden="true"
    >
      <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-light mb-0.5">
        Scroll
      </span>
      <ChevronDown className="w-3.5 h-3.5 opacity-60" />
    </div>
  );
};

