import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, LayoutGrid, Maximize, Minimize } from 'lucide-react';
import { Magnetic } from './motion/Magnetic';

interface PresentationControlsProps {
  currentSlideIndex: number;
  totalSlides: number;
  onNavigate: (index: number) => void;
  onOpenIndex: () => void;
}

export const PresentationControls: React.FC<PresentationControlsProps> = ({
  currentSlideIndex,
  totalSlides,
  onNavigate,
  onOpenIndex,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Auto-hide controls after 3 seconds of mouse inactivity for a clean presentation look
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const handleMouseMove = () => {
      setIsVisible(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsVisible(false);
      }, 3500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentSlideIndex > 0) {
      onNavigate(currentSlideIndex - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentSlideIndex < totalSlides - 1) {
      onNavigate(currentSlideIndex + 1);
    }
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 pointer-events-auto ${
        isVisible ? 'opacity-90 hover:opacity-100 translate-y-0' : 'opacity-25 hover:opacity-100'
      }`}
    >
      <Magnetic strength={0.22}>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1C2833]/90 text-white/90 backdrop-blur-md border border-white/15 shadow-2xl font-mono-tech text-xs select-none">
          
          {/* Previous Slide Button */}
          <button
            onClick={handlePrev}
            disabled={currentSlideIndex === 0}
            className="p-1 rounded-full hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Previous slide (← / ↑)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Slide Counter (e.g. 03 / 15) */}
          <span className="px-2 font-medium tracking-wider text-[11px] text-white">
            {String(currentSlideIndex + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(totalSlides).padStart(2, '0')}
          </span>

          {/* Next Slide Button */}
          <button
            onClick={handleNext}
            disabled={currentSlideIndex === totalSlides - 1}
            className="p-1 rounded-full hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Next slide (→ / ↓ / Space)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <span className="w-[1px] h-3 bg-white/20 mx-0.5" />

          {/* Deck Agenda / Overview */}
          <button
            onClick={onOpenIndex}
            className="p-1.5 rounded-full hover:bg-white/15 transition-colors text-white/80 hover:text-white"
            title="Slide Deck Agenda"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-full hover:bg-white/15 transition-colors text-white/80 hover:text-white"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen Presentation Mode'}
          >
            {isFullscreen ? (
              <Minimize className="w-3.5 h-3.5" />
            ) : (
              <Maximize className="w-3.5 h-3.5" />
            )}
          </button>

        </div>
      </Magnetic>
    </div>
  );
};
