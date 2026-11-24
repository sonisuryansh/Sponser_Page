import React, { useEffect, useState, useRef } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import gsap from 'gsap';

const wordColorMap: Record<string, { active: string; default: string }> = {
  Understand: {
    active: 'bg-cyan-600 text-white border-cyan-600 shadow-xs scale-105',
    default: 'bg-cyan-50/80 text-cyan-800 border-cyan-200/70',
  },
  Design: {
    active: 'bg-[#c8a45d] text-white border-[#c8a45d] shadow-xs scale-105',
    default: 'bg-amber-50/80 text-amber-900 border-amber-200/70',
  },
  Test: {
    active: 'bg-indigo-600 text-white border-indigo-600 shadow-xs scale-105',
    default: 'bg-indigo-50/80 text-indigo-800 border-indigo-200/70',
  },
  Apply: {
    active: 'bg-emerald-600 text-white border-emerald-600 shadow-xs scale-105',
    default: 'bg-emerald-50/80 text-emerald-800 border-emerald-200/70',
  },
};

export const AboutSection: React.FC = () => {
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sequential light-up of the 4 Focus words
  useEffect(() => {
    const words = siteConfig.about.panels[2].highlightWords || ['Understand', 'Design', 'Test', 'Apply'];
    const interval = setInterval(() => {
      setActiveWordIndex((prev) => (prev + 1) % words.length);
    }, 1300);
    return () => clearInterval(interval);
  }, []);

  // Smooth editorial reveal on mount
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
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: 'power3.out',
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const handleScrollToNext = () => {
    window.dispatchEvent(new CustomEvent('go-to-slide', { detail: 2 }));
  };

  return (
    <ChapterShell
      id="about"
      chapterNumber="02"
      theme="light"
      fullBleed={true}
      className="relative w-full h-[100svh] overflow-hidden bg-[#FAF6EE]"
    >
      {/* Main Viewport Container (Centered in 100svh window, Standardized 1240px) */}
      <div
        ref={containerRef}
        className="relative w-full h-full min-h-full flex-1 flex flex-col justify-between pt-[calc(var(--header-h,64px)+12px)] pb-6 px-4 sm:px-6 lg:px-8 box-border select-none z-10 max-w-[1240px] mx-auto"
      >
        {/* Top Header Bar: Strategic Focus, Aim & Vision */}
        <div className="editorial-reveal flex-none flex flex-wrap items-center justify-between gap-3 pb-2.5 border-b border-black/10">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#0284c7] font-bold">
              STRATEGIC FOCUS
            </span>
            <span className="text-black/30 select-none font-mono text-xs">—</span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#555555] font-semibold">
              AIM &amp; VISION
            </span>
          </div>

          <p className="font-serif italic text-xs sm:text-[13px] text-[#666666] hidden md:block text-right">
            &ldquo;Transforming passive consumers of technology into active creators, thinkers, and innovators.&rdquo;
          </p>
        </div>

        {/* 3-Column Editorial Core Composition (Aim, Photo Hero, Vision & Focus) */}
        <div className="flex-1 my-auto py-2 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center">

            {/* Left Column: Our Aim & Core Objective (Span 3 of 12) */}
            <div className="editorial-reveal lg:col-span-3 flex flex-col justify-center">
              <h2 className="font-serif text-[clamp(28px,3vw,42px)] font-bold text-[#111111] leading-[1.08] mb-2 tracking-tight">
                Our aim <br />
                <span className="italic font-normal text-[#0284c7]">
                  is to make tech understandable
                </span>
              </h2>

              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#777777] font-bold block mb-2.5">
                CORE OBJECTIVE
              </span>

              <p className="font-sans text-xs sm:text-[12.5px] text-[#555555] leading-relaxed mb-4">
                {siteConfig.about.panels[0].description}
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-black/10 text-[11px] font-mono font-medium text-[#0284c7] shadow-xs">
                  4 Pillars
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-black/10 text-[11px] font-mono font-medium text-[#059669] shadow-xs">
                  Hands-On Labs
                </span>
              </div>
            </div>

            {/* Center Column: School Lab Session Photo Card (Span 5 of 12) */}
            <div className="editorial-reveal lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-[500px] aspect-[4/3.1] rounded-2xl overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.12)] border border-black/10 group bg-neutral-900">
                <img
                  src="/assets/aim_vision_lab_session.webp"
                  alt="School Laboratory Session"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />

                {/* Dark Gradient Overlay for the School Lab Caption */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-10 pb-3.5 px-4 sm:px-5 flex flex-col justify-end">
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-cyan-400 font-bold block mb-1">
                    SCHOOL LABORATORY SESSION
                  </span>
                  <p className="font-serif italic text-xs text-white/95 leading-snug">
                    Active circuit, sensor calibration &amp; microcontroller exploration
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Statement, Our Vision, and Interactive Focus (Span 4 of 12) */}
            <div className="editorial-reveal lg:col-span-4 flex flex-col justify-center space-y-3.5">
              {/* Mentorship hairline callout */}
              <div className="border-l-2 border-[#0284c7] pl-3 py-0.5">
                <p className="font-sans text-[11.5px] sm:text-xs text-[#555555] leading-relaxed font-normal">
                  Curriculum and mentorship rooted in curiosity, precision, and hands-on excellence.
                </p>
              </div>

              {/* Main serif statement */}
              <h3 className="font-serif text-[clamp(17px,1.75vw,22px)] text-[#111111] font-normal leading-[1.24] tracking-tight">
                Making technology understandable through practical building across hardware, software, and sensors.
              </h3>

              {/* Our Vision Block */}
              <div>
                <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-[#0284c7] font-bold block mb-1">
                  OUR VISION:
                </span>
                <p className="font-sans text-xs text-[#555555] leading-relaxed">
                  {siteConfig.about.panels[1].description}
                </p>
              </div>

              {/* Our Focus Block with 4 Interactive Sequential Pills */}
              <div className="pt-2 border-t border-black/10">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-[#c8a45d] font-bold block mb-1">
                  OUR FOCUS:
                </span>
                <p className="font-sans text-[11.5px] text-[#555555] leading-relaxed mb-2">
                  {siteConfig.about.panels[2].description}
                </p>
                <div className="flex flex-wrap items-center gap-1.5">
                  {siteConfig.about.panels[2].highlightWords?.map((word, idx) => {
                    const isCurrent = activeWordIndex === idx;
                    const style = wordColorMap[word] || {
                      active: 'bg-black text-white border-black',
                      default: 'bg-black/5 text-[#555] border-black/10',
                    };

                    return (
                      <span
                        key={word}
                        className={`font-mono text-[9.5px] uppercase tracking-wider px-2 py-0.5 rounded-[2px] border transition-all duration-300 font-semibold select-none ${isCurrent ? style.active : style.default
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
        <div className="editorial-reveal flex-none pt-2.5 border-t border-black/10 flex items-center justify-center">
          <button
            onClick={handleScrollToNext}
            className="group flex items-center justify-center text-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c8a45d] cursor-pointer max-w-xl mx-auto"
          >
            <span className="h-[1px] bg-black/20 group-hover:bg-[#c8a45d] transition-all w-8 sm:w-12 mr-3" />
            <span className="font-sans font-bold text-[10px] sm:text-[10.5px] uppercase tracking-[0.22em] text-[#111111] group-hover:text-[#c8a45d] transition-colors shrink-0">
              Discover our guiding purpose & core values
            </span>
            <span className="h-[1px] bg-black/20 group-hover:bg-[#c8a45d] transition-all w-8 sm:w-12 ml-3" />
          </button>
        </div>
      </div>
    </ChapterShell>
  );
};

export default AboutSection;
