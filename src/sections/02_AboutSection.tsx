import React, { useEffect, useState, useRef } from 'react';
import { ChapterShell } from '../components/ChapterShell';
import { ArrowRight, Compass, Sparkles, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';

interface StepItem {
  num: string;
  name: string;
  subtitle: string;
  desc: string;
  accent: string;
  borderActive: string;
  bgActive: string;
  badgeBg: string;
}

const STEPS: StepItem[] = [
  {
    num: '01',
    name: 'Understand',
    subtitle: 'Concepts & Core Logic',
    desc: 'Break down complex hardware and software into clear intuition before complexity.',
    accent: '#0284C7',
    borderActive: 'border-[#0284C7]',
    bgActive: 'bg-[#F0F9FF]',
    badgeBg: 'bg-[#E0F2FE] text-[#0284C7]',
  },
  {
    num: '02',
    name: 'Design',
    subtitle: 'Schematics & Form',
    desc: 'Map functional circuit topologies, mechanical structures, and modular architecture.',
    accent: '#EA580C',
    borderActive: 'border-[#EA580C]',
    bgActive: 'bg-[#FFF7ED]',
    badgeBg: 'bg-[#FFEDD5] text-[#EA580C]',
  },
  {
    num: '03',
    name: 'Test',
    subtitle: 'Debug & Calibrate',
    desc: 'Measure live sensor telemetry, calibrate actuators, and troubleshoot errors rigorously.',
    accent: '#9333EA',
    borderActive: 'border-[#9333EA]',
    bgActive: 'bg-[#FAF5FF]',
    badgeBg: 'bg-[#F3E8FF] text-[#9333EA]',
  },
  {
    num: '04',
    name: 'Apply',
    subtitle: 'Real-World Builds',
    desc: 'Deploy working robotic, AI, and aerial prototypes to solve tangible everyday challenges.',
    accent: '#16A34A',
    borderActive: 'border-[#16A34A]',
    bgActive: 'bg-[#F0FDF4]',
    badgeBg: 'bg-[#DCFCE7] text-[#16A34A]',
  },
];

export const AboutSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Subtle auto-step through the 4 learning stages
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % STEPS.length);
    }, 3200);
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
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.04,
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
      className="relative w-full h-[100svh] overflow-hidden bg-[#FAF6EE] flex items-center justify-center select-none"
    >
      {/* Background ambient gentle wave curves */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-orange-100/30 rounded-full blur-3xl pointer-events-none" />

      {/* Main Viewport Container - Compact Vertical Padding to Guarantee 100vh Fit */}
      <div
        ref={containerRef}
        className="relative w-full h-full min-h-full flex-1 flex flex-col justify-center items-center pt-[calc(var(--header-h,64px)+2px)] pb-2 sm:pb-3 px-3 sm:px-6 lg:px-8 xl:px-10 box-border select-none z-10 max-w-[1300px] mx-auto overflow-hidden"
      >
        {/* Main Inset White Card Container - Compact & Proportional */}
        <div className="relative w-full my-auto bg-white rounded-2xl sm:rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.04)] border border-slate-200/80 p-3 sm:p-3.5 lg:p-4 flex flex-col justify-between box-border gap-1.5 sm:gap-2 max-h-[calc(100svh-var(--header-h,64px)-12px)]">

          {/* Top Section Header: Symmetrical Eyebrow + Clean Headline */}
          <div className="flex-none max-w-3xl mx-auto text-center flex flex-col items-center">
            <div className="editorial-reveal flex items-center justify-center gap-2 mb-0.5">
              <span className="h-[1px] w-6 sm:w-8 bg-[#b45309]/50" />
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-[#b45309] font-bold">
                AIM &amp; STRATEGIC VISION
              </span>
              <span className="h-[1px] w-6 sm:w-8 bg-[#b45309]/50" />
            </div>

            <h2 className="editorial-reveal font-serif text-lg sm:text-xl lg:text-[23px] font-bold text-[#0F172A] tracking-tight leading-tight mb-0.5 text-center">
              Making Technology Understandable &amp; Practical
            </h2>

            <p className="editorial-reveal font-sans text-[10.5px] sm:text-[11.5px] text-slate-500 leading-tight max-w-xl text-center font-normal">
              Transforming passive consumers of technology into active creators, thinkers, and real-world innovators.
            </p>
          </div>

          {/* Middle Row: 2-Column Balanced Architecture */}
          <div className="editorial-reveal grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-2.5 items-stretch">
            
            {/* Left Column (Span 7 of 12): Aim & Vision Narrative Cards */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-1.5 sm:gap-2">
              
              {/* Card 1: Our Aim */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-r from-sky-50/50 via-white to-white border border-sky-100 shadow-2xs">
                <div className="flex items-center justify-between mb-0.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4.5 h-4.5 rounded-md bg-sky-100 text-[#0284C7] flex items-center justify-center shrink-0">
                      <Compass className="w-3 h-3" />
                    </div>
                    <span className="font-mono text-[8.5px] sm:text-[9px] uppercase tracking-[0.2em] text-[#0284C7] font-bold">
                      OUR AIM
                    </span>
                  </div>
                  <span className="font-mono text-[8px] uppercase px-1.5 py-0.5 rounded-full bg-sky-100/70 text-[#0369A1] font-semibold">
                    Core Objective
                  </span>
                </div>
                <h3 className="font-serif text-[13px] sm:text-[14px] font-bold text-[#0F172A] tracking-tight mb-0.5">
                  Understandable Technology
                </h3>
                <p className="font-sans text-[10.5px] sm:text-[11px] text-slate-600 leading-snug font-normal line-clamp-2">
                  Making technology understandable through practical hardware and age-appropriate learning, connecting theory with real engineering principles.
                </p>
              </div>

              {/* Card 2: Our Vision */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-r from-purple-50/50 via-white to-white border border-purple-100 shadow-2xs">
                <div className="flex items-center justify-between mb-0.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4.5 h-4.5 rounded-md bg-purple-100 text-[#9333EA] flex items-center justify-center shrink-0">
                      <Sparkles className="w-3 h-3" />
                    </div>
                    <span className="font-mono text-[8.5px] sm:text-[9px] uppercase tracking-[0.2em] text-[#9333EA] font-bold">
                      OUR VISION
                    </span>
                  </div>
                  <span className="font-mono text-[8px] uppercase px-1.5 py-0.5 rounded-full bg-purple-100/70 text-[#7E22CE] font-semibold">
                    Long-Term Impact
                  </span>
                </div>
                <h3 className="font-serif text-[13px] sm:text-[14px] font-bold text-[#0F172A] tracking-tight mb-0.5">
                  Confident Builders &amp; Solvers
                </h3>
                <p className="font-sans text-[10.5px] sm:text-[11px] text-slate-600 leading-snug font-normal line-clamp-2">
                  Helping students become confident problem-solvers, creators, and responsible users equipped to troubleshoot, experiment, and innovate.
                </p>
              </div>

            </div>

            {/* Right Column (Span 5 of 12): Lab Photo Showcase */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="relative w-full h-[105px] sm:h-[115px] lg:h-[125px] rounded-xl overflow-hidden border border-slate-200/90 shadow-2xs group bg-slate-900">
                <img
                  src="/assets/aim_vision_lab_session.webp"
                  alt="School Laboratory Session"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                  loading="eager"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Top Pill */}
                <div className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="font-mono text-[8.5px] uppercase tracking-wider font-semibold">
                    Active Lab Session
                  </span>
                </div>

                {/* Bottom Caption */}
                <div className="absolute bottom-1.5 left-2 right-2 z-10 text-white">
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#FDBA74] font-bold block">
                    Physical Computing in Practice
                  </span>
                  <p className="font-serif text-[10.5px] text-white/95 leading-tight truncate">
                    Active circuit, sensor calibration &amp; microcontroller exploration.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Row: Full-Width 4-Stage Pedagogical Stepper (Compact & Beautiful) */}
          <div className="editorial-reveal pt-1.5 border-t border-slate-100">
            {/* Stepper Header */}
            <div className="flex items-center justify-between gap-1 mb-1.5">
              <span className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.2em] text-[#b45309] font-bold">
                The 4-Stage Engineering Learning Cycle
              </span>
              <span className="font-sans text-[10.5px] text-slate-400 hidden sm:inline">
                Moving beyond passive screen time into tangible design &amp; builds.
              </span>
            </div>

            {/* 4 Grand Stepper Cards Taking Full Width */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5">
              {STEPS.map((step, idx) => {
                const isActive = activeStepIndex === idx;

                return (
                  <button
                    key={step.name}
                    type="button"
                    onClick={() => setActiveStepIndex(idx)}
                    className={`group relative p-2 sm:p-2.5 rounded-xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                      isActive
                        ? `${step.borderActive} ${step.bgActive} shadow-xs -translate-y-0.5`
                        : 'border-slate-200/80 bg-slate-50/60 hover:bg-white hover:border-slate-300 hover:shadow-2xs'
                    }`}
                  >
                    <div>
                      {/* Step Number Badge & Status */}
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded transition-colors ${
                            isActive ? step.badgeBg : 'bg-slate-200/70 text-slate-600'
                          }`}
                        >
                          {step.num}
                        </span>
                        {isActive && (
                          <span className="flex items-center gap-1 font-mono text-[8px] uppercase tracking-wider text-[#b45309] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse" />
                            Active
                          </span>
                        )}
                      </div>

                      {/* Step Name & Subtitle */}
                      <div className="flex items-baseline gap-1.5">
                        <h4 className="font-serif text-[12.5px] sm:text-[13.5px] font-bold text-[#0F172A] leading-tight">
                          {step.name}
                        </h4>
                        <span className="font-sans text-[9.5px] sm:text-[10px] font-semibold text-slate-500 truncate">
                          {step.subtitle}
                        </span>
                      </div>
                    </div>

                    {/* Step Description */}
                    <p className="font-sans text-[9.5px] sm:text-[10px] text-slate-500 leading-tight line-clamp-1 mt-0.5">
                      {step.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Trailing Bar */}
          <div className="editorial-reveal flex-none pt-1.5 border-t border-slate-100 flex items-center justify-between">
            <div className="hidden sm:flex items-center gap-2.5 text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1 text-slate-600 font-medium">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                4 Domains
              </span>
              <span>&bull;</span>
              <span>100% Practical</span>
              <span>&bull;</span>
              <span>Grade 3–12</span>
            </div>

            <button
              onClick={handleScrollToNext}
              className="group inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-[#0F172A] hover:text-[#b45309] transition-colors ml-auto cursor-pointer"
            >
              <span>Discover Guiding Purpose &amp; Core Values</span>
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1 text-[#b45309]" />
            </button>
          </div>

        </div>
      </div>
    </ChapterShell>
  );
};

export default AboutSection;
