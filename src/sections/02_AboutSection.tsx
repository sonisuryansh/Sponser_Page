import React, { useEffect, useState, useRef } from 'react';
import { ChapterShell } from '../components/ChapterShell';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
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
  numBg: string;
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
    badgeBg: 'text-[#0284C7] bg-[#E0F2FE]',
    numBg: 'bg-[#0284C7]',
  },
  {
    num: '02',
    name: 'Design',
    subtitle: 'Schematics & CAD Form',
    desc: 'Map functional circuit topologies, mechanical structures, and modular system architecture.',
    accent: '#EA580C',
    borderActive: 'border-[#EA580C]',
    bgActive: 'bg-[#FFF7ED]',
    badgeBg: 'text-[#EA580C] bg-[#FFEDD5]',
    numBg: 'bg-[#EA580C]',
  },
  {
    num: '03',
    name: 'Test',
    subtitle: 'Debug & Calibrate',
    desc: 'Measure live sensor telemetry, calibrate actuators, and troubleshoot errors with rigorous testing.',
    accent: '#9333EA',
    borderActive: 'border-[#9333EA]',
    bgActive: 'bg-[#FAF5FF]',
    badgeBg: 'text-[#9333EA] bg-[#F3E8FF]',
    numBg: 'bg-[#9333EA]',
  },
  {
    num: '04',
    name: 'Apply',
    subtitle: 'Real-World Builds',
    desc: 'Deploy working robotic, AI, and aerial prototypes to solve tangible everyday engineering challenges.',
    accent: '#16A34A',
    borderActive: 'border-[#16A34A]',
    bgActive: 'bg-[#F0FDF4]',
    badgeBg: 'text-[#16A34A] bg-[#DCFCE7]',
    numBg: 'bg-[#16A34A]',
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
      <div className="absolute top-0 left-0 w-80 h-80 bg-purple-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-100/30 rounded-full blur-3xl pointer-events-none" />

      {/* Main Viewport Container - Centered and Proportional */}
      <div
        ref={containerRef}
        className="relative w-full h-full min-h-full flex-1 flex flex-col justify-center items-center pt-[calc(var(--header-h,64px)+2px)] pb-2 sm:pb-3 px-3 sm:px-6 lg:px-8 xl:px-10 box-border select-none z-10 max-w-[1300px] mx-auto overflow-hidden"
      >
        {/* Main Inset Grand White Card Container - Matches Page 3 Shape & Elegance */}
        <div className="relative w-full my-auto bg-white rounded-2xl sm:rounded-3xl shadow-[0_16px_50px_rgba(0,0,0,0.04)] border border-slate-200/80 p-4 sm:p-5 lg:p-6 flex flex-col justify-between box-border gap-3 sm:gap-4 max-h-[calc(100svh-var(--header-h,64px)-12px)]">

          {/* Top Section Header: Symmetrical Eyebrow + Clean Headline */}
          <div className="flex-none max-w-3xl mx-auto text-center flex flex-col items-center">
            <div className="editorial-reveal flex items-center justify-center gap-2 mb-0.5">
              <span className="h-[1px] w-6 sm:w-8 bg-[#b45309]/50" />
              <span className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.22em] text-[#b45309] font-bold">
                AIM &amp; STRATEGIC VISION
              </span>
              <span className="h-[1px] w-6 sm:w-8 bg-[#b45309]/50" />
            </div>

            <h2 className="editorial-reveal font-serif text-xl sm:text-2xl lg:text-[26px] font-bold text-[#0F172A] tracking-tight leading-tight mb-0.5 text-center">
              Making Technology Understandable &amp; Practical
            </h2>

            <p className="editorial-reveal font-sans text-xs sm:text-[12.5px] text-slate-500 leading-snug max-w-2xl text-center font-normal">
              Transforming passive consumers of technology into active creators, thinkers, and real-world innovators.
            </p>
          </div>

          {/* Middle Row: Balanced 2-Column Split (Left: Aim/Vision + Photo; Right: 4-Stage Learning Cycle) */}
          <div className="editorial-reveal grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch">
            
            {/* Left Column (Span 6 of 12): Aim, Vision & Full-Height Lab Photo */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-3">
              
              {/* Dual Cards: Our Aim & Our Vision Side-by-Side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {/* Card 1: Our Aim */}
                <div className="p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-sky-50/70 via-white to-white border border-sky-100/90 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-md bg-sky-100 text-[#0284C7] flex items-center justify-center shrink-0">
                          <Compass className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#0284C7] font-bold">
                          OUR AIM
                        </span>
                      </div>
                      <span className="font-mono text-[8px] uppercase px-1.5 py-0.5 rounded-full bg-sky-100/70 text-[#0369A1] font-semibold">
                        Core
                      </span>
                    </div>
                    <h3 className="font-serif text-[13.5px] font-bold text-[#0F172A] tracking-tight mb-1">
                      Understandable Technology
                    </h3>
                    <p className="font-sans text-[11px] text-slate-600 leading-relaxed font-normal">
                      Making technology understandable through practical hardware &amp; age-appropriate learning.
                    </p>
                  </div>
                </div>

                {/* Card 2: Our Vision */}
                <div className="p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-50/70 via-white to-white border border-purple-100/90 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-md bg-purple-100 text-[#9333EA] flex items-center justify-center shrink-0">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#9333EA] font-bold">
                          OUR VISION
                        </span>
                      </div>
                      <span className="font-mono text-[8px] uppercase px-1.5 py-0.5 rounded-full bg-purple-100/70 text-[#7E22CE] font-semibold">
                        Impact
                      </span>
                    </div>
                    <h3 className="font-serif text-[13.5px] font-bold text-[#0F172A] tracking-tight mb-1">
                      Confident Builders &amp; Solvers
                    </h3>
                    <p className="font-sans text-[11px] text-slate-600 leading-relaxed font-normal">
                      Helping students become confident problem-solvers, creators, and responsible users.
                    </p>
                  </div>
                </div>
              </div>

              {/* Lab Photo Showcase (Natural Aspect Ratio with Faces Fully Visible) */}
              <div className="relative w-full h-[215px] sm:h-[225px] rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs group bg-slate-900">
                <img
                  src="/assets/aim_vision_lab_session.webp"
                  alt="School Laboratory Session"
                  className="w-full h-full object-cover object-[center_32%] transition-transform duration-700 ease-out group-hover:scale-103"
                  loading="eager"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                {/* Top Pill */}
                <div className="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[9px] uppercase tracking-wider font-semibold">
                    Active School Lab Session
                  </span>
                </div>

                {/* Bottom Caption */}
                <div className="absolute bottom-2.5 left-3 right-3 z-10 text-white">
                  <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-[#FDBA74] font-bold block mb-0.5">
                    PHYSICAL COMPUTING IN PRACTICE
                  </span>
                  <p className="font-serif text-xs text-white/95 leading-snug">
                    Active circuit, sensor calibration &amp; microcontroller exploration.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column (Span 6 of 12): The 4-Stage Learning Cycle Taking Full Space */}
            <div className="lg:col-span-6 flex flex-col justify-between rounded-xl sm:rounded-2xl border border-amber-200/80 bg-[#FFFDF9] p-3.5 sm:p-4 shadow-2xs">
              
              {/* Stepper Header */}
              <div className="flex items-center justify-between pb-2 border-b border-amber-100 mb-2">
                <div>
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-[#b45309] font-bold block">
                    OUR PEDAGOGICAL APPROACH
                  </span>
                  <h3 className="font-serif font-bold text-sm sm:text-[15px] text-[#0F172A] tracking-tight">
                    The 4-Stage Engineering Learning Cycle
                  </h3>
                </div>
                <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded-full bg-amber-100 text-[#b45309] font-semibold">
                  Active Cycle
                </span>
              </div>

              {/* 4 Grand Stepper Cards Taking Full Height with Generous Typography */}
              <div className="flex flex-col gap-2 flex-1 justify-between">
                {STEPS.map((step, idx) => {
                  const isActive = activeStepIndex === idx;

                  return (
                    <button
                      key={step.name}
                      type="button"
                      onClick={() => setActiveStepIndex(idx)}
                      className={`group relative p-2.5 rounded-xl border text-left transition-all duration-300 cursor-pointer flex items-center gap-3 ${
                        isActive
                          ? `${step.borderActive} ${step.bgActive} shadow-xs -translate-x-0.5`
                          : 'border-slate-200/80 bg-white hover:bg-slate-50/80 hover:border-slate-300'
                      }`}
                    >
                      {/* Step Number Badge */}
                      <span
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-2xs transition-colors ${
                          isActive
                            ? `${step.numBg} text-white`
                            : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                        }`}
                      >
                        {step.num}
                      </span>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <h4 className="font-serif font-bold text-xs sm:text-[13px] text-[#0F172A] leading-tight">
                            {step.name}
                          </h4>
                          <span
                            className={`font-mono text-[9px] sm:text-[9.5px] font-semibold px-1.5 py-0.2 rounded transition-colors ${
                              isActive ? step.badgeBg : 'text-slate-500 bg-slate-100'
                            }`}
                          >
                            {step.subtitle}
                          </span>
                        </div>
                        <p className="font-sans text-[11px] sm:text-[11.5px] text-slate-600 leading-snug">
                          {step.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

            </div>

          </div>

          {/* Bottom Trailing Line CTA (advancing smoothly to Section 03) */}
          <div className="editorial-reveal flex-none pt-2 sm:pt-2.5 border-t border-slate-100 flex items-center justify-between">
            <div className="hidden sm:flex items-center gap-3.5 text-[11px] font-mono text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                4 Core Domains
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
                100% Practical
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                Grade 3–12 Pathway
              </span>
            </div>

            <button
              onClick={handleScrollToNext}
              className="group inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.18em] text-[#0F172A] hover:text-[#b45309] transition-colors ml-auto cursor-pointer"
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
