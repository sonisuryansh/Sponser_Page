import React, { useEffect, useState, useRef } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import gsap from 'gsap';

const wordColorMap: Record<string, { active: string; default: string }> = {
  Understand: {
    active: 'bg-cyan-500 text-white border-cyan-500 shadow-sm scale-105',
    default: 'bg-cyan-50/60 text-cyan-800 border-cyan-200/60',
  },
  Design: {
    active: 'bg-[#c8a45d] text-white border-[#c8a45d] shadow-sm scale-105',
    default: 'bg-amber-50/60 text-amber-900 border-amber-200/60',
  },
  Test: {
    active: 'bg-indigo-600 text-white border-indigo-600 shadow-sm scale-105',
    default: 'bg-indigo-50/60 text-indigo-800 border-indigo-200/60',
  },
  Apply: {
    active: 'bg-emerald-600 text-white border-emerald-600 shadow-sm scale-105',
    default: 'bg-emerald-50/60 text-emerald-800 border-emerald-200/60',
  },
};

export const AboutSection: React.FC = () => {
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  // Sequential light-up of the 4 Focus words
  useEffect(() => {
    const words = siteConfig.about.panels[2].highlightWords || ['Understand', 'Design', 'Test', 'Apply'];
    const interval = setInterval(() => {
      setActiveWordIndex((prev) => (prev + 1) % words.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // Smooth editorial reveal on mount/scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    if (prefersReducedMotion || isMobile) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.editorial-reveal'),
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const handleScrollToNext = () => {
    const dots = document.querySelectorAll<HTMLButtonElement>('.slide-progress-button');
    if (dots[2]) {
      dots[2].click();
    }
  };

  return (
    <ChapterShell
      id="about"
      chapterNumber="02"
      theme="light"
      fullBleed={true}
      className="relative w-full h-[100svh] overflow-hidden bg-[#FAF6EE]"
    >
      {/* Main Viewport Container */}
      <div
        ref={containerRef}
        className="relative w-full h-full flex flex-col justify-between pt-[calc(var(--header-h,64px)+16px)] pb-8 px-4 sm:px-8 lg:px-14 box-border select-none z-10 max-w-[1360px] mx-auto"
      >
        {/* Top Eyebrow & Main Statement Headline */}
        <div className="flex-none max-w-4xl">
          <div className="editorial-reveal flex items-center gap-3 mb-2.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#c8a45d] font-bold">
              {siteConfig.about.eyebrow}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#c8a45d]" />
            <span className="font-mono text-[11px] text-[#888888] tracking-wider">
              02 / 14
            </span>
          </div>

          <h2
            ref={headlineRef}
            className="editorial-reveal font-serif text-[clamp(26px,3.6vw,48px)] font-normal leading-[1.16] tracking-tight text-[#111111] mb-2"
          >
            {siteConfig.about.headline}
          </h2>

          <p className="editorial-reveal font-sans text-xs sm:text-[13.5px] text-[#666666] leading-relaxed max-w-2xl font-normal">
            At MedhaArc Labs, our foundational pillars ensure every lesson transitions from theoretical comprehension to physical engineering and real-world mastery.
          </p>
        </div>

        {/* 3 Balanced Architectural Pillar Panels (Aim, Vision, Focus) */}
        <div className="flex-1 my-auto py-4 flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8">
            
            {/* Panel 1: Our Aim */}
            <div className="editorial-reveal group relative flex flex-col justify-between p-6 lg:p-7 bg-white/90 border border-black/10 rounded-[3px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-[#c8a45d] hover:shadow-[0_8px_30px_rgba(200,164,93,0.12)] transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-black/5 pb-2.5">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#c8a45d] font-bold">
                    01 / Aim
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#c8a45d]" />
                </div>
                <h3 className="font-serif text-2xl lg:text-[26px] font-medium text-[#111111] tracking-tight mb-2.5 group-hover:text-[#c8a45d] transition-colors">
                  {siteConfig.about.panels[0].title}
                </h3>
              </div>
              <p className="font-sans text-[13px] sm:text-[13.5px] text-[#555555] leading-[1.65] font-normal mt-2">
                {siteConfig.about.panels[0].description}
              </p>
            </div>

            {/* Panel 2: Our Vision */}
            <div className="editorial-reveal group relative flex flex-col justify-between p-6 lg:p-7 bg-white/90 border border-black/10 rounded-[3px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-cyan-500 hover:shadow-[0_8px_30px_rgba(6,182,212,0.12)] transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-black/5 pb-2.5">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-cyan-600 font-bold">
                    02 / Vision
                  </span>
                  <span className="w-2 h-2 rounded-full bg-cyan-500" />
                </div>
                <h3 className="font-serif text-2xl lg:text-[26px] font-medium text-[#111111] tracking-tight mb-2.5 group-hover:text-cyan-600 transition-colors">
                  {siteConfig.about.panels[1].title}
                </h3>
              </div>
              <p className="font-sans text-[13px] sm:text-[13.5px] text-[#555555] leading-[1.65] font-normal mt-2">
                {siteConfig.about.panels[1].description}
              </p>
            </div>

            {/* Panel 3: Our Focus */}
            <div className="editorial-reveal group relative flex flex-col justify-between p-6 lg:p-7 bg-white/90 border border-black/10 rounded-[3px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-emerald-500 hover:shadow-[0_8px_30px_rgba(16,185,129,0.12)] transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-black/5 pb-2.5">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-emerald-600 font-bold">
                    03 / Focus
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <h3 className="font-serif text-2xl lg:text-[26px] font-medium text-[#111111] tracking-tight mb-2.5 group-hover:text-emerald-600 transition-colors">
                  {siteConfig.about.panels[2].title}
                </h3>
                <p className="font-sans text-[13px] sm:text-[13.5px] text-[#555555] leading-[1.65] font-normal mb-4">
                  {siteConfig.about.panels[2].description}
                </p>
              </div>

              {/* 4 Interactive Sequential Focus Pills */}
              <div className="pt-3 border-t border-black/10">
                <div className="flex flex-wrap items-center gap-2">
                  {siteConfig.about.panels[2].highlightWords?.map((word, idx) => {
                    const isCurrent = activeWordIndex === idx;
                    const style = wordColorMap[word] || {
                      active: 'bg-black text-white border-black',
                      default: 'bg-black/5 text-[#555] border-black/10',
                    };

                    return (
                      <span
                        key={word}
                        className={`font-mono text-[10.5px] uppercase tracking-wider px-2.5 py-1 rounded-[2px] border transition-all duration-300 font-semibold select-none ${
                          isCurrent ? style.active : style.default
                        }`}
                      >
                        {word}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Trailing Line CTA (advancing smoothly to Section 03) */}
        <div className="editorial-reveal flex-none pt-4 border-t border-black/10 flex items-center">
          <button
            onClick={handleScrollToNext}
            className="group flex items-center text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c8a45d] cursor-pointer w-full max-w-2xl"
          >
            <span className="font-sans font-bold text-[10.5px] sm:text-[11px] uppercase tracking-[0.22em] text-[#111111] group-hover:text-[#c8a45d] transition-colors shrink-0">
              Discover our guiding purpose & core values
            </span>
            <span className="h-[1px] bg-black/20 group-hover:bg-[#c8a45d] transition-all flex-1 ml-4" />
          </button>
        </div>
      </div>
    </ChapterShell>
  );
};

export default AboutSection;
