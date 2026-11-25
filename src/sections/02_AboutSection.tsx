import React, { useEffect, useState, useRef } from 'react';
import { siteConfig } from '../config/content.config';
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
    desc: 'Break down complex hardware and software into clear, age-appropriate intuition before complexity.',
    accent: '#0284C7',
    borderActive: 'border-[#0284C7]',
    bgActive: 'bg-[#F0F9FF]',
    badgeBg: 'bg-[#E0F2FE] text-[#0284C7]',
  },
  {
    num: '02',
    name: 'Design',
    subtitle: 'Schematics & Form',
    desc: 'Map functional circuit topologies, mechanical structures, and modular software architecture.',
    accent: '#EA580C',
    borderActive: 'border-[#EA580C]',
    bgActive: 'bg-[#FFF7ED]',
    badgeBg: 'bg-[#FFEDD5] text-[#EA580C]',
  },
  {
    num: '03',
    name: 'Test',
    subtitle: 'Debug & Calibrate',
    desc: 'Measure live sensor telemetry, calibrate actuators, and troubleshoot errors with rigorous testing.',
    accent: '#9333EA',
    borderActive: 'border-[#9333EA]',
    bgActive: 'bg-[#FAF5FF]',
    badgeBg: 'bg-[#F3E8FF] text-[#9333EA]',
  },
  {
    num: '04',
    name: 'Apply',
    subtitle: 'Real-World Builds',
    desc: 'Deploy working robotic, AI, and aerial prototypes to solve tangible everyday engineering challenges.',
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
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
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
      className="relative w-full h-[100svh] overflow-hidden bg-[#FAF6EE] flex items-center justify-center select-none"
    >
      {/* Background ambient gentle wave curves matching Slide 03 */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-purple-100/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-100/35 rounded-full blur-3xl pointer-events-none" />

      {/* Main Viewport Container - Standardized 1340px Width matching Page 3 */}
      <div
        ref={containerRef}
        className="relative w-full h-full min-h-full flex-1 flex flex-col justify-start sm:justify-center items-center pt-[calc(var(--header-h,64px)+10px)] pb-20 sm:pb-6 px-3 sm:px-6 lg:px-8 xl:px-12 box-border select-none z-10 max-w-[1340px] mx-auto overflow-y-auto lg:overflow-hidden"
      >
        {/* Main Inset Grand White Card Container - Matches Page 3 Shape */}
        <div className="relative w-full my-0 sm:my-auto bg-white rounded-3xl sm:rounded-[32px] shadow-[0_16px_50px_rgba(0,0,0,0.04)] border border-slate-200/80 p-5 sm:p-7 lg:p-8 xl:p-9 flex flex-col justify-between box-border gap-4 sm:gap-5">

          {/* Top Section Header: Symmetrical Eyebrow + Clean Headline */}
          <div className="flex-none max-w-4xl mx-auto text-center flex flex-col items-center">
            <div className="editorial-reveal flex items-center justify-center gap-3 mb-1 sm:mb-1.5">
              <span className="h-[1px] w-6 sm:w-10 bg-[#b45309]/50" />
              <span className="font-mono text-[10.5px] sm:text-xs uppercase tracking-[0.24em] text-[#b45309] font-bold">
                AIM &amp; STRATEGIC VISION
              </span>
              <span className="h-[1px] w-6 sm:w-10 bg-[#b45309]/50" />
            </div>

            <h2 className="editorial-reveal font-serif text-[28px] sm:text-3xl lg:text-[38px] xl:text-[42px] font-bold text-[#0F172A] tracking-tight leading-tight mb-1 text-center">
              Making Technology Understandable &amp; Practical
            </h2>

            <p className="editorial-reveal font-sans text-xs sm:text-[13px] text-slate-500 leading-relaxed max-w-2xl text-center font-normal">
              Transforming passive consumers of technology into active creators, thinkers, and real-world innovators.
            </p>
          </div>

          {/* Middle Row: 2-Column Balanced Architecture (Aim/Vision on Left, Lab Photo on Right) */}
          <div className="editorial-reveal grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch">
            
            {/* Left Column (Span 7 of 12): Aim & Vision Narrative Cards */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-3 sm:gap-3.5">
              
              {/* Card 1: Our Aim */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-50/60 via-white to-white border border-sky-100 shadow-2xs hover:shadow-xs transition-shadow">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-sky-100 text-[#0284C7] flex items-center justify-center shrink-0">
                      <Compass className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-mono text-[10px] sm:text-[10.5px] uppercase tracking-[0.22em] text-[#0284C7] font-bold">
                      OUR AIM
                    </span>
                  </div>
                  <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded-full bg-sky-100/70 text-[#0369A1] font-semibold">
                    Core Objective
                  </span>
                </div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#0F172A] tracking-tight mb-1">
                  Understandable Technology
                </h3>
                <p className="font-sans text-xs sm:text-[12.5px] text-slate-600 leading-relaxed font-normal">
                  {siteConfig.about.panels[0].description} We connect foundational theory with practical hardware so students understand principles intuitively.
                </p>
              </div>

              {/* Card 2: Our Vision */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-50/60 via-white to-white border border-purple-100 shadow-2xs hover:shadow-xs transition-shadow">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-purple-100 text-[#9333EA] flex items-center justify-center shrink-0">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-mono text-[10px] sm:text-[10.5px] uppercase tracking-[0.22em] text-[#9333EA] font-bold">
                      OUR VISION
                    </span>
                  </div>
                  <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded-full bg-purple-100/70 text-[#7E22CE] font-semibold">
                    Long-Term Impact
                  </span>
                </div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#0F172A] tracking-tight mb-1">
                  Confident Builders &amp; Solvers
                </h3>
                <p className="font-sans text-xs sm:text-[12.5px] text-slate-600 leading-relaxed font-normal">
                  {siteConfig.about.panels[1].description} Equipping young learners with the confidence to troubleshoot, experiment, and create responsibly.
                </p>
              </div>

            </div>

            {/* Right Column (Span 5 of 12): Lab Photo Showcase */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="relative w-full h-[180px] sm:h-[200px] lg:h-full min-h-[190px] rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs group bg-slate-900">
                <img
                  src="/assets/aim_vision_lab_session.webp"
                  alt="School Laboratory Session"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                  loading="eager"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Top Pill */}
                <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="font-mono text-[9.5px] uppercase tracking-wider font-semibold">
                    Active School Lab Session
                  </span>
                </div>

                {/* Bottom Caption */}
                <div className="absolute bottom-3 left-3 right-3 z-10 text-white">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#FDBA74] font-bold block mb-0.5">
                    Physical Computing in Practice
                  </span>
                  <p className="font-serif text-xs text-white/95 leading-snug">
                    Active circuit, sensor calibration &amp; microcontroller exploration.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Row: Full-Width 4-Stage Pedagogical Stepper (Requested Feature) */}
          <div className="editorial-reveal pt-3 sm:pt-4 border-t border-slate-100">
            {/* Stepper Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2.5 sm:mb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10.5px] sm:text-[11px] uppercase tracking-[0.22em] text-[#b45309] font-bold">
                  OUR FOCUS: The 4-Stage Engineering Learning Cycle
                </span>
              </div>
              <span className="font-sans text-[11px] sm:text-xs text-slate-500">
                Moving beyond passive screen time into tangible design &amp; builds.
              </span>
            </div>

            {/* 4 Grand Stepper Cards Taking Full Width */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
              {STEPS.map((step, idx) => {
                const isActive = activeStepIndex === idx;

                return (
                  <button
                    key={step.name}
                    type="button"
                    onClick={() => setActiveStepIndex(idx)}
                    className={`group relative p-3 sm:p-3.5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                      isActive
                        ? `${step.borderActive} ${step.bgActive} shadow-sm -translate-y-0.5`
                        : 'border-slate-200/80 bg-slate-50/60 hover:bg-white hover:border-slate-300 hover:shadow-xs'
                    }`}
                  >
                    <div>
                      {/* Step Number Badge & Status */}
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className={`font-mono text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded-lg transition-colors ${
                            isActive ? step.badgeBg : 'bg-slate-200/70 text-slate-600'
                          }`}
                        >
                          {step.num}
                        </span>
                        {isActive && (
                          <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-[#b45309] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse" />
                            Active
                          </span>
                        )}
                      </div>

                      {/* Step Name */}
                      <h4 className="font-serif text-sm sm:text-base font-bold text-[#0F172A] leading-tight mb-0.5">
                        {step.name}
                      </h4>

                      {/* Subtitle */}
                      <span className="font-sans text-[10.5px] sm:text-[11px] font-semibold text-slate-600 block mb-1">
                        {step.subtitle}
                      </span>
                    </div>

                    {/* Step Description */}
                    <p className="font-sans text-[10px] sm:text-[10.5px] text-slate-500 leading-snug line-clamp-2 mt-1">
                      {step.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Trailing Bar */}
          <div className="editorial-reveal flex-none pt-2 border-t border-slate-100 flex items-center justify-between">
            <div className="hidden sm:flex items-center gap-3 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                4 Interconnected Domains
              </span>
              <span>&bull;</span>
              <span>100% Hands-On Practical</span>
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
