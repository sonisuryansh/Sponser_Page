import React from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { Globe } from 'lucide-react';

interface HeroSectionProps {
  onNavigateNext: () => void;
  onOpenContact?: () => void;
  onExploreCurriculum?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateNext,
  onOpenContact,
  onExploreCurriculum,
}) => {
  const handleExplore = () => {
    if (onExploreCurriculum) {
      onExploreCurriculum();
    } else {
      const target = document.getElementById('curriculum') || document.getElementById('domains');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        onNavigateNext();
      }
    }
  };

  const handleConnect = () => {
    if (onOpenContact) {
      onOpenContact();
    } else {
      const target = document.getElementById('closing');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
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

        {/* Action Buttons Row */}
        <div className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4.5">
          <button
            type="button"
            onClick={handleExplore}
            className="border border-white/85 text-white hover:bg-white hover:text-black px-6 sm:px-7 py-2.5 sm:py-3 font-mono font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-md cursor-pointer bg-black/30 backdrop-blur-xs active:scale-95"
          >
            EXPLORE LAB CURRICULUM
          </button>

          <button
            type="button"
            onClick={handleConnect}
            className="border border-white/85 text-white hover:bg-white hover:text-black px-6 sm:px-7 py-2.5 sm:py-3 font-mono font-semibold text-xs sm:text-sm tracking-wider uppercase inline-flex items-center gap-2 transition-all duration-300 shadow-md cursor-pointer bg-black/30 backdrop-blur-xs active:scale-95"
          >
            <span>CONNECT WITH US</span>
            <span className="text-base leading-none font-sans">→</span>
          </button>
        </div>

        {/* Social Links Row (Globe, LinkedIn, Instagram) */}
        <div className="mt-6 sm:mt-7 flex items-center justify-center gap-3.5 sm:gap-4.5">
          {/* Globe / Web */}
          <a
            href="https://medhaarc.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="MedhaArc Official Website"
            title="MedhaArc Official Website"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/60 hover:border-white flex items-center justify-center text-white/90 hover:text-white bg-black/40 backdrop-blur-sm hover:scale-110 hover:bg-white/15 transition-all duration-300 shadow-lg"
          >
            <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>

          {/* LinkedIn ('in' outline) */}
          <a
            href="https://www.linkedin.com/company/medhaarc"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/60 hover:border-white flex items-center justify-center text-white/90 hover:text-white bg-black/40 backdrop-blur-sm hover:scale-110 hover:bg-white/15 transition-all duration-300 shadow-lg"
          >
            <span className="font-sans font-bold text-sm sm:text-base text-white/90 leading-none">
              in
            </span>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/medhaarc"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            title="Instagram"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/60 hover:border-white flex items-center justify-center text-white/90 hover:text-white bg-black/40 backdrop-blur-sm hover:scale-110 hover:bg-white/15 transition-all duration-300 shadow-lg"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-white/90"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
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
