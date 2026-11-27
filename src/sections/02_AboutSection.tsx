import React, { useEffect, useState, useRef } from 'react';
import { ChapterShell } from '../components/ChapterShell';
import { ArrowRight, Compass, Sparkles, Layers, Cpu, Award } from 'lucide-react';

interface StepItem {
  num: string;
  name: string;
  badge: string;
  desc: string;
  icon: string;
}

const STEPS: StepItem[] = [
  {
    num: '01',
    name: 'Understand',
    badge: 'Explore Concepts',
    desc: 'Break down complex systems into clear, age-appropriate intuition before building.',
    icon: '/assets/stages/stage_1_understand.png',
  },
  {
    num: '02',
    name: 'Design',
    badge: 'Create & Design',
    desc: 'Plan schematic layouts, system architecture, and 3D component structures.',
    icon: '/assets/stages/stage_2_design.png',
  },
  {
    num: '03',
    name: 'Test',
    badge: 'Experiment & Improve',
    desc: 'Measure telemetry, debug circuit connections, and calibrate precision sensors.',
    icon: '/assets/stages/stage_3_test.png',
  },
  {
    num: '04',
    name: 'Apply',
    badge: 'Build Real Solutions',
    desc: 'Deploy working robotic, aerial, and AI platforms that solve authentic problems.',
    icon: '/assets/stages/stage_4_apply.png',
  },
];

export const AboutSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isUserHovering, setIsUserHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Subtle auto-step through the 4 learning stages if not hovered by user
  useEffect(() => {
    if (isUserHovering) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % STEPS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isUserHovering]);

  const handleScrollToNext = () => {
    window.dispatchEvent(new CustomEvent('go-to-slide', { detail: 2 }));
  };

  return (
    <ChapterShell
      id="about"
      chapterNumber="02"
      theme="light"
      fullBleed={true}
      className="relative w-full min-h-[100svh] lg:h-[100svh] overflow-y-auto lg:overflow-hidden bg-[#FAF6EE] flex flex-col lg:items-center lg:justify-center select-none"
    >
      {/* Background ambient gentle wave curves */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-purple-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-100/30 rounded-full blur-3xl pointer-events-none" />

      {/* Main Viewport Container - Centered on desktop, naturally scrollable on mobile */}
      <div
        ref={containerRef}
        className="relative w-full h-auto lg:h-full max-h-none lg:max-h-full min-h-0 flex-1 flex flex-col justify-between items-center pt-[calc(var(--header-h,64px)+10px)] pb-8 lg:pb-3 px-3 sm:px-5 lg:px-6 xl:px-8 box-border select-none z-10 max-w-[1440px] mx-auto overflow-visible lg:overflow-hidden"
      >
        {/* Main Inset Grand White Card Container */}
        <div className="relative w-full h-auto lg:h-full max-h-none lg:max-h-[820px] xl:lg:max-h-[860px] min-h-0 flex-1 lg:my-auto bg-white rounded-2xl sm:rounded-3xl shadow-[0_16px_50px_rgba(0,0,0,0.04)] border border-slate-200/80 p-3 sm:p-4 lg:p-5 flex flex-col justify-between box-border gap-2 sm:gap-2.5 overflow-visible lg:overflow-hidden">

          {/* Top Section Header: Symmetrical Eyebrow + Clean Headline */}
          <div className="flex-none max-w-4xl mx-auto text-center flex flex-col items-center">
            <div className="editorial-reveal flex items-center justify-center gap-2 mb-0.5">
              <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-r from-transparent to-[#b45309]" />
              <span className="font-mono text-[10.5px] sm:text-[11.5px] uppercase tracking-[0.24em] text-[#b45309] font-bold">
                AIM &amp; STRATEGIC VISION
              </span>
              <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-l from-transparent to-[#b45309]" />
            </div>

            <h2 className="editorial-reveal font-serif text-lg sm:text-2xl lg:text-[26px] xl:text-[29px] font-bold text-[#0F172A] tracking-tight leading-tight mb-0.5 text-center">
              Making Technology Understandable &amp; Practical
            </h2>

            <p className="editorial-reveal font-sans text-[12.5px] sm:text-[13.5px] text-slate-600 leading-snug max-w-2xl text-center font-normal">
              Transforming passive consumers of technology into active creators, thinkers, and real-world innovators.
            </p>
          </div>

          {/* Middle Row: Balanced 2-Column Split */}
          <div className="editorial-reveal grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 xl:gap-5 items-stretch flex-1 min-h-0 overflow-visible lg:overflow-hidden">

            {/* Left Column (Span 5 of 12): Aim, Vision & School Lab Photo */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-2 sm:gap-2.5 min-h-0">

              {/* Dual Cards: Our Aim & Our Vision Side-by-Side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 flex-none">
                {/* Card 1: Our Aim */}
                <div className="p-2 sm:p-2.5 lg:p-3 rounded-xl bg-gradient-to-br from-sky-50/70 via-white to-white border border-sky-100/90 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-md bg-sky-100 text-[#0284C7] flex items-center justify-center shrink-0 shadow-2xs">
                          <Compass className="w-3 h-3" />
                        </div>
                        <span className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.2em] text-[#0284C7] font-bold">
                          OUR AIM
                        </span>
                      </div>
                      <span className="font-mono text-[9px] uppercase px-1.5 py-0.2 rounded-full bg-sky-100/70 text-[#0369A1] font-bold">
                        Core
                      </span>
                    </div>
                    <h3 className="font-serif text-[13.5px] sm:text-[14px] lg:text-[14.5px] font-bold text-[#0F172A] tracking-tight mb-0.5">
                      Understandable Technology
                    </h3>
                    <p className="font-sans text-[11.5px] sm:text-[12px] text-slate-700 leading-snug font-normal">
                      Making technology understandable through practical hardware &amp; age-appropriate learning.
                    </p>
                  </div>
                </div>

                {/* Card 2: Our Vision */}
                <div className="p-2 sm:p-2.5 lg:p-3 rounded-xl bg-gradient-to-br from-purple-50/70 via-white to-white border border-purple-100/90 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-md bg-purple-100 text-[#9333EA] flex items-center justify-center shrink-0 shadow-2xs">
                          <Sparkles className="w-3 h-3" />
                        </div>
                        <span className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.2em] text-[#9333EA] font-bold">
                          OUR VISION
                        </span>
                      </div>
                      <span className="font-mono text-[9px] uppercase px-1.5 py-0.2 rounded-full bg-purple-100/70 text-[#7E22CE] font-bold">
                        Impact
                      </span>
                    </div>
                    <h3 className="font-serif text-[13.5px] sm:text-[14px] lg:text-[14.5px] font-bold text-[#0F172A] tracking-tight mb-0.5">
                      Confident Builders &amp; Solvers
                    </h3>
                    <p className="font-sans text-[11.5px] sm:text-[12px] text-slate-700 leading-snug font-normal">
                      Helping students become confident problem-solvers, creators, and responsible users.
                    </p>
                  </div>
                </div>
              </div>

              {/* Lab Photo Showcase */}
              <div className="relative w-full h-44 sm:h-52 lg:h-full flex-1 min-h-[140px] sm:min-h-[160px] lg:min-h-[180px] rounded-xl overflow-hidden border border-slate-200/90 shadow-2xs group bg-slate-900">
                <img
                  src="/assets/learning_cycle_students.png"
                  alt="School Laboratory Session"
                  className="w-full h-full object-cover object-[center_35%] transition-transform duration-700 ease-out group-hover:scale-103"
                  loading="eager"
                  onError={(e) => {
                    // Fallback to high-res lab session image if png not available
                    const target = e.target as HTMLImageElement;
                    if (target.src !== '/assets/aim_vision_lab_session.webp') {
                      target.src = '/assets/aim_vision_lab_session.webp';
                    }
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                {/* Top Pill */}
                <div className="absolute top-2 left-2 z-10 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/55 backdrop-blur-md border border-white/20 text-white shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[8.5px] uppercase tracking-wider font-semibold">
                    Active School Lab Session
                  </span>
                </div>

                {/* Bottom Caption */}
                <div className="absolute bottom-2 left-2.5 right-2.5 z-10 text-white">
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#FDBA74] font-bold block mb-0.5">
                    PHYSICAL COMPUTING IN PRACTICE
                  </span>
                  <p className="font-serif text-[11px] text-white/95 leading-tight">
                    Active circuit, sensor calibration &amp; microcontroller exploration.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column (Span 7 of 12): The 4-Stage Learning Cycle Vertical Sequence */}
            <div
              onMouseEnter={() => setIsUserHovering(true)}
              onMouseLeave={() => setIsUserHovering(false)}
              className="lg:col-span-7 flex flex-col justify-between rounded-xl sm:rounded-2xl border border-slate-200/90 bg-[#FFFDF9] p-2.5 sm:p-3 lg:p-3.5 shadow-2xs min-h-0"
            >
              {/* Methodology Header */}
              <div className="flex items-center justify-between pb-1.5 border-b border-amber-100/90 mb-1.5 sm:mb-2 flex-none">
                <div>
                  <span className="font-mono text-[8.5px] sm:text-[9px] uppercase tracking-[0.2em] text-[#b45309] font-bold block">
                    OUR LEARNING METHODOLOGY
                  </span>
                  <h3 className="font-serif font-bold text-[13px] sm:text-[14px] lg:text-[15px] text-[#0F172A] tracking-tight">
                    The <span className="text-[#EA580C]">4-Stage</span> Engineering Learning Cycle
                  </h3>
                  <p className="font-sans text-[10px] sm:text-[10.5px] text-slate-500 leading-tight">
                    A practical journey from curiosity to real-world innovation.
                  </p>
                </div>
                <span className="font-mono text-[8px] sm:text-[8.5px] uppercase px-2 py-0.5 rounded-full bg-orange-100 text-[#EA580C] font-bold border border-orange-200 shrink-0">
                  Active Cycle
                </span>
              </div>

              {/* 4 Connected Vertical Step Cards */}
              <div className="relative flex flex-col justify-between gap-1.5 sm:gap-2 flex-1 my-auto min-h-0">
                {/* Continuous Vertical Connecting Line */}
                <div
                  className="absolute left-[18px] sm:left-[21px] top-[24px] bottom-[24px] w-[2px] bg-slate-200 z-0 pointer-events-none"
                  aria-hidden="true"
                />

                {STEPS.map((step, idx) => {
                  const isActive = activeStepIndex === idx;

                  return (
                    <div
                      key={step.name}
                      onClick={() => setActiveStepIndex(idx)}
                      onMouseEnter={() => setActiveStepIndex(idx)}
                      className={`relative z-10 p-2 sm:p-2.5 rounded-xl border text-left transition-all duration-300 cursor-pointer flex items-center gap-2.5 sm:gap-3 shrink-0 ${isActive
                        ? 'bg-[#FFF7ED] border-[#EA580C] shadow-sm -translate-x-0.5'
                        : 'bg-white/95 border-slate-200/80 hover:bg-[#FAF9F5] hover:border-slate-300'
                        }`}
                    >
                      {/* Step Number Circle (on top of continuous vertical line) */}
                      <span
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono font-bold text-[11px] sm:text-[12px] shrink-0 transition-all ${isActive
                          ? 'bg-[#EA580C] text-white shadow-xs ring-4 ring-[#FFEDD5]'
                          : 'bg-slate-100 text-slate-600 ring-4 ring-white'
                          }`}
                      >
                        {step.num}
                      </span>

                      {/* Illustrated Stage Icon */}
                      <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 flex items-center justify-center">
                        <img
                          src={step.icon}
                          alt={step.name}
                          className={`w-full h-full object-contain transition-transform duration-300 ${isActive ? 'scale-105' : 'opacity-85'}`}
                        />
                      </div>

                      {/* Content: Title, Description, and Action Pill */}
                      <div className="flex-1 min-w-0 pr-1">
                        <div className="flex items-center justify-between mb-0.5">
                          <h4 className={`font-serif font-bold text-[13.5px] sm:text-[14.5px] leading-tight ${isActive ? 'text-[#EA580C]' : 'text-[#0F172A]'}`}>
                            {step.name}
                          </h4>
                          <span
                            className={`font-mono text-[9px] sm:text-[9.5px] font-bold px-2 py-0.5 rounded-full transition-colors ${isActive
                              ? 'text-[#EA580C] bg-[#FFEDD5] border border-orange-200/80'
                              : 'text-slate-500 bg-slate-100 border border-slate-200/60'
                              }`}
                          >
                            {step.badge}
                          </span>
                        </div>
                        <p className="font-sans text-[11.5px] sm:text-[12px] text-slate-700 leading-snug line-clamp-2 font-normal">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

          {/* Bottom Trailing Area: 3 Structured Cards + Next Section Button */}
          <div className="editorial-reveal flex-none pt-2 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-2.5">
            {/* 3 Structured Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full md:w-auto flex-1 max-w-3xl">
              {/* Card 1: 4 Core Domains */}
              <div className="flex items-center gap-2 p-1.5 px-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                <div className="w-6 h-6 rounded-md bg-sky-100 text-[#0284C7] flex items-center justify-center shrink-0">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="font-sans font-bold text-[12px] text-[#0F172A] block leading-tight truncate">
                    4 Core Domains
                  </span>
                  <span className="font-sans text-[10.5px] text-slate-600 font-medium block leading-tight truncate">
                    Robotics &bull; Electronics &bull; AI &bull; Drone
                  </span>
                </div>
              </div>

              {/* Card 2: 100% Practical */}
              <div className="flex items-center gap-2 p-1.5 px-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                <div className="w-6 h-6 rounded-md bg-orange-100 text-[#EA580C] flex items-center justify-center shrink-0">
                  <Cpu className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="font-sans font-bold text-[12px] text-[#0F172A] block leading-tight truncate">
                    100% Practical
                  </span>
                  <span className="font-sans text-[10.5px] text-slate-600 font-medium block leading-tight truncate">
                    Hands-on, Project-based Learning
                  </span>
                </div>
              </div>

              {/* Card 3: Grade 3 – 12 Pathway */}
              <div className="flex items-center gap-2 p-1.5 px-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                <div className="w-6 h-6 rounded-md bg-emerald-100 text-[#16A34A] flex items-center justify-center shrink-0">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="font-sans font-bold text-[12px] text-[#0F172A] block leading-tight truncate">
                    Grade 3–12 Pathway
                  </span>
                  <span className="font-sans text-[10.5px] text-slate-600 font-medium block leading-tight truncate">
                    Structured journey for every age group
                  </span>
                </div>
              </div>
            </div>

            {/* Next Section CTA */}
            <button
              type="button"
              onClick={handleScrollToNext}
              className="group inline-flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-[#0F172A] hover:text-[#b45309] transition-colors ml-auto shrink-0 cursor-pointer pt-1 md:pt-0"
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
