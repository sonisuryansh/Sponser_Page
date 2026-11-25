import React, { useEffect, useState, useRef } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { Target, Sparkles, Layers, ArrowRight, CheckCircle2, Compass } from 'lucide-react';
import gsap from 'gsap';

interface FocusStep {
  num: string;
  word: string;
  label: string;
  activeColor: string;
  defaultColor: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
}

const FOCUS_STEPS: FocusStep[] = [
  {
    num: '01',
    word: 'Understand',
    label: 'Concepts & Logic',
    activeColor: 'bg-[#0284C7] text-white border-[#0284C7] shadow-md shadow-[#0284C7]/20 scale-[1.03]',
    defaultColor: 'bg-[#F0F9FF] text-[#0369A1] border-[#BAE6FD]',
    badgeBg: 'bg-[#E0F2FE]',
    badgeText: 'text-[#0284C7]',
    borderColor: '#38BDF8',
  },
  {
    num: '02',
    word: 'Design',
    label: 'Schematics & Form',
    activeColor: 'bg-[#D97706] text-white border-[#D97706] shadow-md shadow-[#D97706]/20 scale-[1.03]',
    defaultColor: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
    badgeBg: 'bg-[#FEF3C7]',
    badgeText: 'text-[#D97706]',
    borderColor: '#FB923C',
  },
  {
    num: '03',
    word: 'Test',
    label: 'Debug & Calibrate',
    activeColor: 'bg-[#7C3AED] text-white border-[#7C3AED] shadow-md shadow-[#7C3AED]/20 scale-[1.03]',
    defaultColor: 'bg-[#FAF5FF] text-[#6D28D9] border-[#E9D5FF]',
    badgeBg: 'bg-[#F3E8FF]',
    badgeText: 'text-[#7C3AED]',
    borderColor: '#A855F7',
  },
  {
    num: '04',
    word: 'Apply',
    label: 'Real-World Builds',
    activeColor: 'bg-[#16A34A] text-white border-[#16A34A] shadow-md shadow-[#16A34A]/20 scale-[1.03]',
    defaultColor: 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]',
    badgeBg: 'bg-[#DCFCE7]',
    badgeText: 'text-[#16A34A]',
    borderColor: '#4ADE80',
  },
];

export const AboutSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-cycle through the 4 engineering steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % FOCUS_STEPS.length);
    }, 2000);
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
      {/* Background Soft Pastel Ambient Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-amber-200/25 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-sky-200/25 blur-3xl" />
      </div>

      {/* Main Viewport Container (Centered in 100svh window) */}
      <div
        ref={containerRef}
        className="relative w-full h-full min-h-full flex-1 flex flex-col justify-center pt-14 pb-8 lg:py-6 px-3 sm:px-6 lg:px-8 xl:px-12 box-border select-none z-10 max-w-[1360px] mx-auto min-h-[100svh] lg:min-h-0"
      >
        {/* Main Inset Grand White Card Container */}
        <div className="relative w-full my-auto bg-white rounded-3xl sm:rounded-[32px] shadow-[0_20px_60px_rgba(15,23,42,0.06)] border border-slate-200/80 p-5 sm:p-6 lg:p-7 xl:p-8 flex flex-col justify-between box-border">

          {/* Top Section Header: Symmetrical Eyebrow + Standardized Headline + Subtitle */}
          <div className="flex-none max-w-4xl mx-auto text-center flex flex-col items-center mb-3 sm:mb-4 lg:mb-5">
            <div className="editorial-reveal flex items-center justify-center gap-3 mb-1 sm:mb-1.5">
              <span className="h-[1px] w-6 sm:w-10 bg-[#b45309]/50" />
              <span className="font-mono text-[10.5px] sm:text-xs uppercase tracking-[0.24em] text-[#b45309] font-bold">
                AIM &amp; STRATEGIC VISION
              </span>
              <span className="h-[1px] w-6 sm:w-10 bg-[#b45309]/50" />
            </div>

            <h2 className="editorial-reveal font-serif text-[28px] sm:text-3xl lg:text-[38px] xl:text-[42px] font-bold text-[#0F172A] tracking-tight leading-tight mb-1 sm:mb-1.5 text-center">
              Making Technology Understandable &amp; Practical
            </h2>

            <p className="editorial-reveal font-sans text-xs sm:text-[13px] lg:text-[13.5px] text-[#475569] leading-relaxed max-w-3xl text-center font-normal">
              Transforming passive consumers of technology into active creators, thinkers, and real-world innovators.
            </p>
          </div>

          {/* Core Content Grid: 2 Columns (7 cols Left Cards & Flow + 5 cols Right Photo Showcase) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 lg:gap-5 items-stretch my-auto">

            {/* Left Column (Span 7 of 12): Aim Card, Vision Card, and 4-Stage Pedagogical Stepper */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-3 sm:gap-3.5">

              {/* Row 1: Dual Architecture Cards (Our Aim vs Our Vision) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                
                {/* Card 1: Our Aim (Core Objective) */}
                <div className="editorial-reveal relative bg-gradient-to-br from-[#F0F9FF] via-white to-[#F0F9FF]/50 border border-[#BAE6FD] rounded-2xl p-4 sm:p-4.5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-[#E0F2FE] border border-[#BAE6FD] flex items-center justify-center text-[#0284C7]">
                          <Target className="w-4 h-4" />
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0284C7] font-bold">
                          OUR AIM
                        </span>
                      </div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#E0F2FE]/80 text-[10px] font-mono font-semibold text-[#0284C7]">
                        Core Objective
                      </span>
                    </div>

                    <h3 className="font-serif text-[17px] sm:text-[18px] font-bold text-[#0F172A] tracking-tight mb-1.5">
                      Understandable Technology
                    </h3>

                    <p className="font-sans text-xs sm:text-[12.5px] text-[#475569] leading-relaxed">
                      {siteConfig.about.panels[0].description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#BAE6FD]/60 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[10.5px] font-sans font-medium text-[#0369A1]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7]" />
                      Age-Appropriate
                    </span>
                    <span className="text-slate-300">&bull;</span>
                    <span className="inline-flex items-center gap-1 text-[10.5px] font-sans font-medium text-[#0369A1]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7]" />
                      Real Hardware
                    </span>
                  </div>
                </div>

                {/* Card 2: Our Vision (Strategic Impact) */}
                <div className="editorial-reveal relative bg-gradient-to-br from-[#FAF5FF] via-white to-[#FAF5FF]/50 border border-[#E9D5FF] rounded-2xl p-4 sm:p-4.5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-[#F3E8FF] border border-[#E9D5FF] flex items-center justify-center text-[#9333EA]">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9333EA] font-bold">
                          OUR VISION
                        </span>
                      </div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#F3E8FF]/80 text-[10px] font-mono font-semibold text-[#9333EA]">
                        Long-Term Impact
                      </span>
                    </div>

                    <h3 className="font-serif text-[17px] sm:text-[18px] font-bold text-[#0F172A] tracking-tight mb-1.5">
                      Confident Builders &amp; Solvers
                    </h3>

                    <p className="font-sans text-xs sm:text-[12.5px] text-[#475569] leading-relaxed">
                      {siteConfig.about.panels[1].description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#E9D5FF]/60 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[10.5px] font-sans font-medium text-[#7E22CE]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#9333EA]" />
                      Responsible AI
                    </span>
                    <span className="text-slate-300">&bull;</span>
                    <span className="inline-flex items-center gap-1 text-[10.5px] font-sans font-medium text-[#7E22CE]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#9333EA]" />
                      Critical Thinking
                    </span>
                  </div>
                </div>

              </div>

              {/* Card 3: Our Focus (Interactive 4-Stage Pedagogical Stepper) */}
              <div className="editorial-reveal relative bg-gradient-to-br from-[#FFFBEB] via-white to-[#FFFBEB]/40 border border-[#FDE68A] rounded-2xl p-4 sm:p-4.5 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center text-[#D97706]">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D97706] font-bold block leading-none">
                        OUR FOCUS
                      </span>
                      <span className="font-serif text-sm sm:text-[15px] font-bold text-[#0F172A]">
                        The 4-Stage Engineering Learning Cycle
                      </span>
                    </div>
                  </div>

                  <p className="font-sans text-[11px] text-[#64748B] sm:text-right">
                    Moving beyond passive screen time into tangible design.
                  </p>
                </div>

                {/* 4 Interactive Flow Steps */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {FOCUS_STEPS.map((step, idx) => {
                    const isActive = activeStepIndex === idx;

                    return (
                      <button
                        key={step.word}
                        onClick={() => setActiveStepIndex(idx)}
                        className={`relative flex flex-col p-2.5 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                          isActive ? step.activeColor : step.defaultColor
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`font-mono text-[9.5px] font-bold px-1.5 py-0.2 rounded ${
                              isActive ? 'bg-white/20 text-white' : `${step.badgeBg} ${step.badgeText}`
                            }`}
                          >
                            {step.num}
                          </span>
                          <span className={`text-[10px] ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                            &rarr;
                          </span>
                        </div>

                        <span className="font-serif text-[14px] font-bold leading-tight tracking-tight">
                          {step.word}
                        </span>

                        <span className={`font-sans text-[10px] mt-0.5 leading-snug ${isActive ? 'text-white/90' : 'text-slate-500'}`}>
                          {step.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Column (Span 5 of 12): Real Classroom Photo Showcase */}
            <div className="editorial-reveal lg:col-span-5 flex flex-col justify-between">
              <div className="relative w-full h-full min-h-[290px] sm:min-h-[330px] rounded-2xl overflow-hidden border border-slate-200/90 shadow-[0_12px_36px_rgba(15,23,42,0.1)] group bg-slate-900 flex flex-col justify-between">
                
                {/* Background Lab Photo */}
                <img
                  src="/assets/aim_vision_lab_session.webp"
                  alt="School Laboratory Session"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />

                {/* Subtle dark gradient overlay to ensure crystal clear readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/30 pointer-events-none" />

                {/* Top Badge: Active School Session */}
                <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white font-bold">
                      ACTIVE SCHOOL LAB SESSION
                    </span>
                  </div>

                  <span className="font-mono text-[10px] text-white/80 bg-white/10 backdrop-blur-md px-2 py-0.5 rounded border border-white/15">
                    K-12 LAB
                  </span>
                </div>

                {/* Bottom Frosted Glass Legend Card */}
                <div className="relative z-10 p-4 sm:p-4.5 bg-gradient-to-t from-black/95 via-black/85 to-transparent pt-8">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-400 font-bold block mb-1">
                    PHYSICAL COMPUTING IN PRACTICE
                  </span>
                  
                  <p className="font-serif text-sm sm:text-[14.5px] text-white font-medium leading-snug mb-2">
                    Active circuit, sensor calibration &amp; microcontroller exploration.
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-white/15">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-white/90">
                      <Compass className="w-3 h-3 text-cyan-400" />
                      Guided Mentorship
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-white/90">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      Real Hardware
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Bottom Trailing Line CTA (advancing smoothly to Section 03) */}
          <div className="editorial-reveal flex-none pt-3 sm:pt-3.5 mt-3 sm:mt-3.5 border-t border-slate-100 flex items-center justify-between">
            <div className="hidden sm:flex items-center gap-4 text-[11px] font-mono text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                4 Interconnected Domains
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
                100% Hands-On Practical
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
