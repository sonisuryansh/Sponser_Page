import React, { useRef, useEffect } from 'react';

export interface ChapterShellProps {
  id: string;
  chapterNumber: string;
  theme: 'dark' | 'light';
  media?: string;
  overlayOpacity?: number;
  steps?: number;
  children: React.ReactNode;
  className?: string;
  fullBleed?: boolean;
}

export const ChapterShell: React.FC<ChapterShellProps> = ({
  id,
  chapterNumber,
  theme,
  media,
  overlayOpacity,
  children,
  className = '',
  fullBleed = false,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const chapterIndex = parseInt(chapterNumber, 10) || 1;
  const isDark = theme === 'dark';
  const defaultOverlay = isDark ? 0.65 : 0;
  const activeOverlay = overlayOpacity !== undefined ? overlayOpacity : defaultOverlay;

  // Stacking z-index: Each chapter sits above the previous (10, 12, 14...)
  const zIndex = 10 + chapterIndex * 2;

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    // Failsafe: Ensure content is visible after 2.5s
    const failsafeTimer = setTimeout(() => {
      content.style.opacity = '1';
      content.style.transform = 'none';
      content.style.visibility = 'visible';
    }, 2500);

    return () => clearTimeout(failsafeTimer);
  }, []);

  return (
    <div
      id={id}
      data-chapter={chapterNumber}
      data-theme={theme}
      className={`chapter-wrapper w-full relative overflow-x-clip ${
        fullBleed ? 'h-[100svh] max-h-[100svh] overflow-hidden' : 'min-h-[100svh]'
      }`}
      style={{ zIndex }}
    >
      {/* 100svh Chapter Shell with tactile top shadow */}
      <div
        className={`chapter-shell w-full overflow-x-clip flex flex-col justify-between ${
          fullBleed ? 'h-[100svh] max-h-[100svh] overflow-hidden !p-0' : 'min-h-[100svh] pt-[calc(var(--header-h)+24px)] pb-6'
        } box-border ${
          isDark
            ? 'bg-[#0a0e14] text-white shadow-[0_-25px_60px_rgba(0,0,0,0.7)]'
            : 'bg-[#FAF6EE] text-[#111111] shadow-[0_-15px_40px_rgba(0,0,0,0.06)]'
        } ${className}`}
      >
        {/* Background Media Layer */}
        {media && (
          <div
            aria-hidden="true"
            className="chapter-media absolute inset-0 z-0 pointer-events-none overflow-hidden will-change-transform"
          >
            <img
              src={media}
              alt=""
              className="chapter-media-img w-full h-full object-cover object-center filter saturate-[0.75] contrast-[1.05] brightness-[0.85] transition-all will-change-transform"
            />
            {activeOverlay > 0 && (
              <div
                className="absolute inset-0 bg-black pointer-events-none"
                style={{ opacity: activeOverlay }}
              />
            )}
          </div>
        )}

        {/* 12-Column Centered Content Container OR Full-Bleed Container (Standardized 1240px) */}
        <div
          ref={contentRef}
          className={`chapter-content relative z-10 w-full flex-1 flex flex-col justify-between will-change-transform ${
            fullBleed ? 'h-full max-h-full min-h-0 max-w-none p-0 overflow-hidden' : 'max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
