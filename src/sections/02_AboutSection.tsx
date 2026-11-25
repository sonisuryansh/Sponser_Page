import React, { useEffect, useState, useRef } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

const STEPS = [
  { num: '01', name: 'Understand', desc: 'Concepts & core logic' },
  { num: '02', name: 'Design', desc: 'Schematics & architecture' },
  { num: '03', name: 'Test', desc: 'Calibration & debugging' },
  { num: '04', name: 'Apply', desc: 'Real-world physical builds' },
];

export const AboutSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Subtle auto-step through the 4 learning stages
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % STEPS.length);
    }, 2400);
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
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
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
      className="relative w-full h-[100svh] overflow-hidden bg-[#FAF6EE] flex items-center justify-center"
    >
      {/* Main Viewport Container */}
      <div
        ref={containerRef}
        className="relative w-full h-full min-h-full flex-1 flex flex-col justify-center py-6 px-4 sm:px-6 lg:px-8 box-border select-none z-10 max-w-[1140px] mx-auto min-h-[100svh] lg:min-h-0"
      >
        {/* Compact, Minimal White Card Container */}
        <div className="relative w-full my-auto bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-slate-200/70 p-5 sm:p-7 lg:p-8 flex flex-col justify-between box-border">

          {/* Top Section Header: Symmetrical Eyebrow + Clean Headline */}
          <div className="flex-none max-w-3xl mx-auto text-center flex flex-col items-center mb-4 sm:mb-5">
            <div className="editorial-reveal flex items-center justify-center gap-3 mb-1 sm:mb-1.5">
              <span className="h-[1px] w-6 sm:w-10 bg-[#b45309]/50" />
              <span className="font-mono text-[10.5px] sm:text-xs uppercase tracking-[0.24em] text-[#b45309] font-bold">
                AIM &amp; STRATEGIC VISION
              </span>
              <span className="h-[1px] w-6 sm:w-10 bg-[#b45309]/50" />
            </div>

            <h2 className="editorial-reveal font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#0F172A] tracking-tight leading-snug mb-1 text-center">
              Making Technology Understandable &amp; Practical
            </h2>

            <p className="editorial-reveal font-sans text-xs sm:text-[13px] text-slate-500 leading-relaxed max-w-xl text-center font-normal">
              Transforming passive consumers of technology into active creators, thinkers, and builders.
            </p>
          </div>

          {/* Core Content Grid: 2 Clean Balanced Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-center my-auto">

            {/* Left Column (Span 7 of 12): Pure Typographic Narrative & Learning Flow */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">

              {/* Block 1: Our Aim */}
              <div className="editorial-reveal border-l-2 border-[#0284C7] pl-3.5 sm:pl-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0284C7] font-bold block mb-0.5">
                  OUR AIM &bull; CORE OBJECTIVE
                </span>
                <h3 className="font-serif text-base sm:text-[17px] font-bold text-[#0F172A] tracking-tight mb-1">
                  Understandable Technology
                </h3>
                <p className="font-sans text-xs sm:text-[12.5px] text-slate-600 leading-relaxed font-normal">
                  {siteConfig.about.panels[0].description} We break down complex hardware and software into clear intuition so students understand concepts before complexity.
                </p>
              </div>

              {/* Block 2: Our Vision */}
              <div className="editorial-reveal border-l-2 border-[#9333EA] pl-3.5 sm:pl-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9333EA] font-bold block mb-0.5">
                  OUR VISION &bull; LONG-TERM IMPACT
                </span>
                <h3 className="font-serif text-base sm:text-[17px] font-bold text-[#0F172A] tracking-tight mb-1">
                  Confident Problem-Solvers &amp; Builders
                </h3>
                <p className="font-sans text-xs sm:text-[12.5px] text-slate-600 leading-relaxed font-normal">
                  {siteConfig.about.panels[1].description} Equipping young minds with the confidence to troubleshoot, experiment, and innovate responsibly.
                </p>
              </div>

              {/* Block 3: The 4-Stage Learning Cycle (Clean Minimal Step Flow) */}
              <div className="editorial-reveal pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#b45309] font-bold">
                    PEDAGOGICAL CYCLE
                  </span>
                  <span className="text-[11px] font-sans text-slate-500 hidden sm:inline">
                    Move beyond simply using technology
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {STEPS.map((step, idx) => {
                    const isCurrent = activeStepIndex === idx;

                    return (
                      <React.Fragment key={step.name}>
                        <button
                          type="button"
                          onClick={() => setActiveStepIndex(idx)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                            isCurrent
                              ? 'bg-[#0F172A] text-white shadow-xs'
                              : 'bg-slate-50 text-slate-600 border border-slate-200/80 hover:bg-slate-100 hover:text-slate-900'
                          }`}
                        >
                          <span className={`mr-1.5 text-[10px] ${isCurrent ? 'text-amber-300 font-bold' : 'text-slate-400'}`}>
                            {step.num}
                          </span>
                          <span>{step.name}</span>
                        </button>
                        {idx < STEPS.length - 1 && (
                          <span className="text-slate-300 text-xs font-mono select-none">&rarr;</span>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                <p className="font-sans text-[11px] text-slate-500 mt-1.5 italic">
                  Current focus: <span className="font-medium text-[#0F172A] not-italic">{STEPS[activeStepIndex].name}</span> — {STEPS[activeStepIndex].desc}
                </p>
              </div>

            </div>

            {/* Right Column (Span 5 of 12): Clean Lab Photo Showcase */}
            <div className="editorial-reveal lg:col-span-5 flex flex-col justify-center">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-slate-200/80 shadow-sm group bg-slate-900">
                <img
                  src="/assets/aim_vision_lab_session.webp"
                  alt="School Laboratory Session"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                  loading="eager"
                />

                {/* Subtle dark gradient overlay for caption legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                {/* Minimal Top Pill */}
                <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="font-mono text-[9.5px] uppercase tracking-wider font-semibold">
                    School Lab Session
                  </span>
                </div>

                {/* Minimal Bottom Caption */}
                <div className="absolute bottom-3 left-3 right-3 z-10 text-white">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-300 font-bold block mb-0.5">
                    HANDS-ON LEARNING
                  </span>
                  <p className="font-serif text-xs text-white/95 leading-snug">
                    Active circuit, sensor calibration &amp; microcontroller exploration.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Trailing Line CTA */}
          <div className="editorial-reveal flex-none pt-3 mt-3 sm:mt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="hidden sm:flex items-center gap-3 text-[11px] font-mono text-slate-400">
              <span>4 Core Domains</span>
              <span>&bull;</span>
              <span>Real Hardware</span>
              <span>&bull;</span>
              <span>Grade 3–12 Pathway</span>
            </div>

            <button
              onClick={handleScrollToNext}
              className="group inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-[0.16em] text-[#0F172A] hover:text-[#b45309] transition-colors ml-auto cursor-pointer"
            >
              <span>Discover Guiding Purpose &amp; Core Values</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#b45309]" />
            </button>
          </div>

        </div>
      </div>
    </ChapterShell>
  );
};

export default AboutSection;
