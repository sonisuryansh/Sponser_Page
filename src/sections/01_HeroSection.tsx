import React, { useEffect, useState } from 'react';
import { siteConfig } from '../config/content.config';

interface HeroSectionProps {
  onNavigateNext: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateNext }) => {
  const [activeDomainIndex, setActiveDomainIndex] = useState(-1);

  // Sequentially illuminate the 4 domains on load, then stay still
  useEffect(() => {
    const timer = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        setActiveDomainIndex(index);
        index++;
        if (index >= siteConfig.hero.domains.length) {
          clearInterval(interval);
        }
      }, 350);
      return () => clearInterval(interval);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      data-chapter="01"
      className="relative w-full h-screen min-h-[680px] flex items-center justify-center overflow-hidden bg-[#0d1217] text-white select-none snap-start"
    >
      {/* Background Media with Lightened Legible Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={siteConfig.hero.backgroundImage}
          alt="MedhaArc Labs engineering background"
          className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.08] transform scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Soft, readable cinematic overlay maintaining >4.5:1 text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60 pointer-events-none" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        {/* Logo and Wordmark */}
        <div className="flex items-center gap-3.5 mb-6 animate-in fade-in duration-700">
          <img
            src="/assets/medha_arc_nav_logo.webp"
            alt="MedhaArc Labs Logo"
            className="w-10 h-10 md:w-12 md:h-12 object-contain brightness-110 drop-shadow-md"
          />
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white drop-shadow-sm">
            {siteConfig.hero.title}
          </h1>
        </div>

        {/* Subline */}
        <p className="text-sm sm:text-base md:text-lg uppercase tracking-[0.22em] text-[#c8a45d] font-sans font-medium mb-4">
          {siteConfig.hero.subline}
        </p>

        {/* Statement Tagline */}
        <h2 className="font-serif text-[clamp(32px,4.4vw,62px)] font-normal leading-[1.12] text-white max-w-4xl tracking-tight my-4 drop-shadow-md">
          {siteConfig.hero.tagline}
        </h2>

        {/* Quiet line of the four domains lighting up sequentially */}
        <div className="w-24 h-px bg-white/20 my-8" />

        <div className="flex flex-wrap items-center justify-center gap-y-2 text-xs sm:text-sm md:text-base tracking-wide font-sans text-white/50 max-w-3xl">
          {siteConfig.hero.domains.map((domain, idx) => {
            const isLit = activeDomainIndex >= idx;
            return (
              <React.Fragment key={domain}>
                <span
                  className={`transition-colors duration-700 ${
                    isLit ? 'text-white font-medium' : 'text-white/40'
                  }`}
                >
                  {domain}
                </span>
                {idx < siteConfig.hero.domains.length - 1 && (
                  <span className="mx-3 text-white/20 select-none">|</span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Hidden button for keyboard / assistive click navigation */}
        <button
          onClick={onNavigateNext}
          className="sr-only focus:not-sr-only focus:fixed focus:top-20 focus:left-6 px-4 py-2 bg-white text-black text-xs uppercase"
        >
          Skip to next section
        </button>
      </div>
    </section>
  );
};
