import React from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';

interface HeroSectionProps {
  onNavigateNext: () => void;
  onOpenContact?: () => void;
  onExploreCurriculum?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateNext,
}) => {
  const handleDomainClick = () => {
    window.dispatchEvent(new CustomEvent('go-to-slide', { detail: 4 }));
  };

  return (
    <ChapterShell
      id="home"
      chapterNumber="01"
      theme="dark"
      media={siteConfig.hero.backgroundImage}
      overlayOpacity={0.62}
      fullBleed={true}
      className="select-none relative flex items-center justify-center min-h-[100svh] w-full"
    >
      <div className="w-full flex-1 flex flex-col justify-center items-center text-center py-4 sm:py-6 relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 my-auto box-border">
        {/* Eyebrow: WE ARE */}
        <p className="font-mono text-[11px] sm:text-xs md:text-sm font-semibold uppercase tracking-[0.35em] text-white/85 mb-1 sm:mb-1.5 drop-shadow">
          WE ARE
        </p>

        {/* Big Animated Title: MEDHAARC LABS on a single line */}
        <h1 className="animated-hero-text font-serif font-black whitespace-nowrap text-[8.5vw] sm:text-[7vw] md:text-[68px] lg:text-[84px] xl:text-[98px] leading-[0.95] tracking-tight uppercase select-none drop-shadow-2xl text-center">
          MEDHAARC LABS
        </h1>

        {/* Sub-headline: NEXT-GENERATION K-12 HANDS-ON INNOVATION ECOSYSTEM */}
        <h2 className="font-mono text-[10px] sm:text-xs md:text-[13px] lg:text-sm font-bold text-white tracking-[0.16em] sm:tracking-[0.24em] uppercase mt-2.5 sm:mt-3 drop-shadow-md whitespace-nowrap max-[380px]:whitespace-normal">
          NEXT-GENERATION K-12 HANDS-ON INNOVATION ECOSYSTEM
        </h2>

        {/* Tagline / Description */}
        <p className="font-sans text-xs sm:text-sm md:text-[15px] text-white/80 font-normal tracking-wide mt-2 sm:mt-2.5 max-w-lg mx-auto drop-shadow leading-relaxed">
          Explore Our Technology Curriculum &amp; Innovative School Lab Experiences<br className="hidden sm:inline" /> Here.
        </p>

        {/* 4 Technology Domains Horizontal Strip (Matching Image 1) */}
        <div className="w-full max-w-4xl mx-auto mt-5 sm:mt-6 pt-1">
          {/* Tagline above glowing line */}
          <p className="font-serif italic text-xs sm:text-[13.5px] md:text-sm text-[#F5C572] font-normal tracking-wider drop-shadow-md mb-2 sm:mb-2.5">
            &ldquo;From Curiosity to Engineering and Innovation.&rdquo;
          </p>

          {/* Dual-Tone Glowing Divider Line (Cyan/Blue on Left to Amber/Orange on Right) */}
          <div className="relative w-full max-w-2xl mx-auto mb-3.5 sm:mb-4">
            <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#00C2FF] via-50% to-[#FF8A00] to-transparent shadow-[0_0_14px_rgba(0,194,255,0.6)]" />
          </div>

          {/* 4 Domains Row */}
          <div
            onClick={handleDomainClick}
            className="grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-3.5 sm:gap-5 md:gap-7 lg:gap-9 max-w-3xl mx-auto px-2 cursor-pointer group/strip"
            title="Explore our 4 Technology Domains"
          >
            {/* 1. Robotics & Automation */}
            <div className="flex items-center gap-2.5 text-left group-hover/strip:opacity-95 transition-opacity">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 text-[#00C2FF] drop-shadow-[0_0_10px_rgba(0,194,255,0.7)]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 20h10" />
                <rect x="4" y="17" width="6" height="3" rx="0.75" />
                <circle cx="7" cy="17" r="1.5" />
                <path d="M7 17L12 9" />
                <circle cx="12" cy="9" r="1.5" />
                <path d="M12 9l6 3" />
                <circle cx="18" cy="12" r="1" />
                <path d="M18 12v3" />
                <path d="M16 15h4" />
                <path d="M16 15v2M20 15v2" />
              </svg>
              <div className="flex flex-col leading-tight">
                <span className="font-sans text-[11px] sm:text-xs font-semibold text-white tracking-wide whitespace-nowrap">
                  Robotics &amp;
                </span>
                <span className="font-sans text-[11px] sm:text-xs font-semibold text-white tracking-wide whitespace-nowrap">
                  Automation
                </span>
              </div>
            </div>

            {/* Divider 1 */}
            <div className="hidden sm:block w-px h-7 bg-white/20 shrink-0" />

            {/* 2. AI & Machine Learning */}
            <div className="flex items-center gap-2.5 text-left group-hover/strip:opacity-95 transition-opacity">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 text-[#C084FC] drop-shadow-[0_0_10px_rgba(192,132,252,0.7)]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="5" y="5" width="14" height="14" rx="2.5" />
                <text
                  x="12"
                  y="14.5"
                  textAnchor="middle"
                  fill="currentColor"
                  stroke="none"
                  fontSize="7"
                  fontWeight="bold"
                  fontFamily="sans-serif"
                  letterSpacing="0.2"
                >
                  AI
                </text>
                <path d="M8 2.5v2.5M12 2.5v2.5M16 2.5v2.5" />
                <path d="M8 19v2.5M12 19v2.5M16 19v2.5" />
                <path d="M2.5 8h2.5M2.5 12h2.5M2.5 16h2.5" />
                <path d="M19 8h2.5M19 12h2.5M19 16h2.5" />
              </svg>
              <div className="flex flex-col leading-tight">
                <span className="font-sans text-[11px] sm:text-xs font-semibold text-white tracking-wide whitespace-nowrap">
                  AI &amp;
                </span>
                <span className="font-sans text-[11px] sm:text-xs font-semibold text-white tracking-wide whitespace-nowrap">
                  Machine Learning
                </span>
              </div>
            </div>

            {/* Divider 2 */}
            <div className="hidden sm:block w-px h-7 bg-white/20 shrink-0" />

            {/* 3. Data Analytics */}
            <div className="flex items-center gap-2.5 text-left group-hover/strip:opacity-95 transition-opacity">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 text-[#22D3EE] drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="14" width="3.5" height="7" rx="0.5" />
                <rect x="8.5" y="10" width="3.5" height="11" rx="0.5" />
                <rect x="14" y="6" width="3.5" height="15" rx="0.5" />
                <path d="M17 3h4v4" />
                <path d="M20.5 3.5L14 10l-4-2-7 7" strokeWidth="1.8" />
              </svg>
              <div className="flex flex-col leading-tight">
                <span className="font-sans text-[11px] sm:text-xs font-semibold text-white tracking-wide whitespace-nowrap">
                  Data
                </span>
                <span className="font-sans text-[11px] sm:text-xs font-semibold text-white tracking-wide whitespace-nowrap">
                  Analytics
                </span>
              </div>
            </div>

            {/* Divider 3 */}
            <div className="hidden sm:block w-px h-7 bg-white/20 shrink-0" />

            {/* 4. Aerial Systems */}
            <div className="flex items-center gap-2.5 text-left group-hover/strip:opacity-95 transition-opacity">
              <svg
                className="w-7 h-6 sm:w-8 sm:h-7 shrink-0 text-[#FB923C] drop-shadow-[0_0_10px_rgba(251,146,60,0.7)]"
                viewBox="0 0 32 26"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <ellipse cx="16" cy="13" rx="3.5" ry="2.8" />
                <circle cx="16" cy="13" r="1.2" fill="currentColor" />
                <path d="M13.2 11.2L7.5 7.5M18.8 11.2l5.7-3.7M13.2 14.8l-5.7 3.7M18.8 14.8l5.7 3.7" />
                <ellipse cx="6" cy="7" rx="3.5" ry="1.5" />
                <ellipse cx="26" cy="7" rx="3.5" ry="1.5" />
                <ellipse cx="6" cy="19" rx="3.5" ry="1.5" />
                <ellipse cx="26" cy="19" rx="3.5" ry="1.5" />
              </svg>
              <div className="flex flex-col leading-tight">
                <span className="font-sans text-[11px] sm:text-xs font-semibold text-white tracking-wide whitespace-nowrap">
                  Aerial
                </span>
                <span className="font-sans text-[11px] sm:text-xs font-semibold text-white tracking-wide whitespace-nowrap">
                  Systems
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden button for assistive navigation */}
        <button
          onClick={onNavigateNext}
          className="sr-only focus:not-sr-only focus:fixed focus:top-20 focus:left-6 px-4 py-2 bg-white text-black text-xs uppercase"
        >
          Skip to next section
        </button>
      </div>
    </ChapterShell>
  );
};
