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
      <div className="w-full flex-1 flex flex-col justify-center items-center text-center py-6 sm:py-8 relative z-10 max-w-6xl mx-auto px-4 my-auto">
        {/* Eyebrow: WE ARE */}
        <p className="font-mono text-[11px] sm:text-xs md:text-sm font-semibold uppercase tracking-[0.35em] text-white/85 mb-1 sm:mb-1.5 drop-shadow">
          WE ARE
        </p>

        {/* Big Animated Title: MEDHAARC LAB on a single line */}
        <h1 className="animated-hero-text font-serif font-black whitespace-nowrap text-[8.5vw] sm:text-[7vw] md:text-[68px] lg:text-[84px] xl:text-[98px] leading-[0.95] tracking-tight uppercase select-none drop-shadow-2xl text-center">
          MEDHAARC LAB
        </h1>

        {/* Sub-headline: NEXT-GENERATION K-12 HANDS-ON INNOVATION ECOSYSTEM */}
        <h2 className="font-mono text-[10px] sm:text-xs md:text-[13px] lg:text-sm font-bold text-white tracking-[0.16em] sm:tracking-[0.24em] uppercase mt-2.5 sm:mt-3 drop-shadow-md whitespace-nowrap">
          NEXT-GENERATION K-12 HANDS-ON INNOVATION ECOSYSTEM
        </h2>

        {/* Tagline / Description */}
        <p className="font-sans text-xs sm:text-sm md:text-[15px] text-white/80 font-normal tracking-wide mt-2.5 sm:mt-3 max-w-lg mx-auto drop-shadow leading-relaxed">
          Explore Our Technology Curriculum &amp; Innovative School Lab Experiences<br className="hidden sm:inline" /> Here.
        </p>

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
