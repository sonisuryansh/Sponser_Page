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
}

export const ChapterShell: React.FC<ChapterShellProps> = ({
  id,
  chapterNumber,
  theme,
  media,
  overlayOpacity,
  children,
  className = '',
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
      className="chapter-wrapper w-full h-[100svh] min-h-[100svh] relative overflow-hidden"
      style={{ zIndex }}
    >
      {/* 100svh Chapter Shell with tactile top shadow */}
      <div
        className={`chapter-shell w-full h-full min-h-[100svh] overflow-hidden flex flex-col justify-between pt-[calc(var(--header-h)+24px)] pb-6 box-border ${
          isDark
            ? 'bg-[#0a0e14] text-white shadow-[0_-25px_60px_rgba(0,0,0,0.7)]'
            : 'bg-[#ffffff] text-[#111111] shadow-[0_-15px_40px_rgba(0,0,0,0.08)]'
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
              className="w-full h-full object-cover object-center filter brightness-[0.8] contrast-[1.05]"
            />
            {activeOverlay > 0 && (
              <div
                className="absolute inset-0 bg-black pointer-events-none"
                style={{ opacity: activeOverlay }}
              />
            )}
          </div>
        )}

        {/* 12-Column Centered Content Container */}
        <div
          ref={contentRef}
          className="chapter-content relative z-10 w-full max-w-[1200px] mx-auto px-[clamp(20px,5vw,80px)] flex-1 flex flex-col justify-between will-change-transform"
        >
          {children}
        </div>
      </div>
    </div>
  );
};
