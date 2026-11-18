import React, { useEffect, useState, useRef } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onNavigateNext: () => void;
}

const heroDomainColors: Record<string, { dot: string; text: string }> = {
  'Robotics & Automation': {
    dot: 'bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.9)]',
    text: 'text-cyan-200',
  },
  'AI & Machine Learning': {
    dot: 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.9)]',
    text: 'text-emerald-200',
  },
  'Data Analytics': {
    dot: 'bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.9)]',
    text: 'text-amber-200',
  },
  'Aerial Systems': {
    dot: 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]',
    text: 'text-sky-200',
  },
};

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateNext }) => {
  const [activeDomainIndex, setActiveDomainIndex] = useState(-1);
  const headlineRef = useRef<HTMLDivElement>(null);
  const domainsRef = useRef<HTMLDivElement>(null);

  // Sequentially illuminate the 4 domains on load
  useEffect(() => {
    const timer = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        setActiveDomainIndex(index);
        index++;
        if (index >= siteConfig.hero.domains.length) {
          clearInterval(interval);
        }
      }, 300);
      return () => clearInterval(interval);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ChapterShell
      id="home"
      chapterNumber="01"
      theme="dark"
      media={siteConfig.hero.backgroundImage}
      overlayOpacity={0.65}
      className="select-none relative"
    >
      {/* Subtle Cinematic Ambient Color Aura behind Hero */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(200,164,93,0.14) 0%, rgba(6,182,212,0.06) 40%, transparent 75%)',
        }}
      />

      <div className="w-full flex-1 flex flex-col justify-between items-center text-center py-4 relative z-10">
        {/* Top Header Clearance Space */}
        <div className="pt-2">
          {/* Logo and Wordmark */}
          <div className="inline-flex items-center gap-3.5 mb-3">
            <img
              src="/assets/medha_arc_nav_logo.webp"
              alt="MedhaArc Labs Logo"
              className="w-9 h-9 md:w-11 md:h-11 object-contain brightness-110 drop-shadow-md"
            />
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-white drop-shadow-sm">
              {siteConfig.hero.title}
            </h1>
          </div>

          {/* Subline */}
          <p className="text-xs sm:text-sm uppercase tracking-[0.22em] text-[#c8a45d] font-sans font-medium">
            {siteConfig.hero.subline}
          </p>
        </div>

        {/* Center: Statement Tagline */}
        <div ref={headlineRef} className="my-auto max-w-4xl px-2">
          <h2 className="font-serif text-[clamp(34px,5vw,68px)] font-normal leading-[1.12] text-white tracking-tight drop-shadow-md">
            {siteConfig.hero.tagline}
          </h2>
        </div>

        {/* Bottom: Line of four domains with colorful illuminated dots */}
        <div ref={domainsRef} className="pb-10 md:pb-12 w-full max-w-3xl">
          <div className="w-20 h-px bg-white/20 mx-auto mb-5" />
          <div className="flex flex-wrap items-center justify-center gap-y-2 text-xs sm:text-sm md:text-base tracking-wide font-sans text-white/50">
            {siteConfig.hero.domains.map((domain, idx) => {
              const isLit = activeDomainIndex >= idx;
              const colorInfo = heroDomainColors[domain] || {
                dot: 'bg-white',
                text: 'text-white',
              };

              return (
                <React.Fragment key={domain}>
                  <span
                    className={`inline-flex items-center gap-2 transition-all duration-500 ${
                      isLit ? `${colorInfo.text} font-medium` : 'text-white/40'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                        isLit ? colorInfo.dot : 'bg-white/20'
                      }`}
                    />
                    <span>{domain}</span>
                  </span>
                  {idx < siteConfig.hero.domains.length - 1 && (
                    <span className="mx-2.5 sm:mx-3 text-white/20 select-none">|</span>
                  )}
                </React.Fragment>
              );
            })}
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
