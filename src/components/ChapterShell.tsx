import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  steps = 1,
  children,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // Failsafe: Ensure content is visible even if animation fails or takes too long
    const failsafeTimer = setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.style.opacity = '1';
        contentRef.current.style.visibility = 'visible';
      }
    }, 2500);

    // If reduced motion or mobile, do not pin; normal natural flow
    if (prefersReducedMotion || isMobile) {
      if (contentRef.current) {
        contentRef.current.style.opacity = '1';
      }
      return () => clearTimeout(failsafeTimer);
    }

    // Pin timeline with ScrollTrigger
    const ctx = gsap.context(() => {
      // Subtle background parallax scale on scroll if media exists
      if (mediaRef.current) {
        gsap.to(mediaRef.current, {
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      }

      // Exit transition: when scrolling past, gentle lift and fade out
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          yPercent: -6,
          opacity: 0.1,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: el,
            start: 'bottom 40%',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, el);

    return () => {
      clearTimeout(failsafeTimer);
      ctx.revert();
    };
  }, [steps, media]);

  const isDark = theme === 'dark';
  const defaultOverlay = isDark ? 0.6 : 0;
  const activeOverlay = overlayOpacity !== undefined ? overlayOpacity : defaultOverlay;

  return (
    <section
      id={id}
      ref={containerRef}
      data-chapter={chapterNumber}
      data-theme={theme}
      className={`chapter-shell ${
        isDark ? 'bg-[#0a0e14] text-white' : 'bg-[#ffffff] text-[#111111]'
      } ${className}`}
    >
      {/* Background Media Layer */}
      {media && (
        <div
          ref={mediaRef}
          aria-hidden="true"
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden will-change-transform"
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

      {/* Main 12-Column Centered Content Grid */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-[1200px] mx-auto px-[clamp(20px,5vw,80px)] flex-1 flex flex-col justify-between"
      >
        {children}
      </div>
    </section>
  );
};
