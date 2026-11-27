import React, { useEffect, useState, useRef } from 'react';
import { ChapterShell } from '../components/ChapterShell';
import { ArrowRight, Compass, Layers, Cpu, Award } from 'lucide-react';

interface StepItem {
  num: string;
  name: string;
  badge: string;
  desc: string;
  detail: string;
  icon: string;
  inAction: string;
  tags: string[];
}

const STEPS: StepItem[] = [
  {
    num: '01',
    name: 'Understand',
    badge: 'Explore Concepts',
    desc: 'Break down complex systems into clear, age-appropriate intuition before building.',
    detail: 'Physical circuit intuition, logic fundamentals & real analogies',
    icon: '/assets/stages/stage_1_understand.png',
    inAction: 'Students physically inspect circuit boards and sensors, understanding fundamentals before writing any software.',
    tags: ['Hands-on Breadboards', 'Intuition First', 'Zero Tech Anxiety'],
  },
  {
    num: '02',
    name: 'Design',
    badge: 'Create & Design',
    desc: 'Plan schematic layouts, system architecture, and 3D component structures.',
    detail: 'Breadboard wiring, 3D CAD modeling & embedded architecture',
    icon: '/assets/stages/stage_2_design.png',
    inAction: 'Students architect component pinouts, draw system schematics, and design custom 3D chassis frames in CAD.',
    tags: ['Schematic CAD', 'Structural 3D', 'Engineering Logic'],
  },
  {
    num: '03',
    name: 'Test',
    badge: 'Experiment & Improve',
    desc: 'Measure telemetry, debug circuit connections, and calibrate precision sensors.',
    detail: 'Hardware debugging, signal verification & code calibration',
    icon: '/assets/stages/stage_3_test.png',
    inAction: 'Real-time telemetry logging, oscilloscope checks, and sensor calibration to master scientific troubleshooting.',
    tags: ['Live Telemetry', 'Fault Debugging', 'Iterative Tuning'],
  },
  {
    num: '04',
    name: 'Apply',
    badge: 'Build Real Solutions',
    desc: 'Deploy working robotic, aerial, and AI platforms that solve authentic problems.',
    detail: 'Autonomous rover missions, drone avionics & real AI vision',
    icon: '/assets/stages/stage_4_apply.png',
    inAction: 'Deploying autonomous obstacle-avoiding rovers, camera-tracking drones, and verifiable digital engineering portfolios.',
    tags: ['Robotic Missions', 'Drone Flight', 'Student Portfolio'],
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
                FOUNDATIONAL AIM &amp; METHODOLOGY
              </span>
              <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-l from-transparent to-[#b45309]" />
            </div>

            <h2 className="editorial-reveal font-serif text-lg sm:text-2xl lg:text-[26px] xl:text-[29px] font-bold text-[#0F172A] tracking-tight leading-tight mb-0.5 text-center">
              Making Technology Understandable &amp; Practical
            </h2>

            <p className="editorial-reveal font-sans text-[12.5px] sm:text-[13.5px] text-slate-600 leading-snug max-w-2xl text-center font-normal">
              Demystifying complex technology through hands-on physical computing, tangible circuits, and structured age-appropriate learning.
            </p>
          </div>

          {/* Middle Row: Balanced 6:6 Split - Our Aim Grand on Left, 4 Stages on Right */}
          <div className="editorial-reveal grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 xl:gap-5 items-stretch flex-1 min-h-0 overflow-visible lg:overflow-hidden">

            {/* Left Column (Span 6 of 12): Dedicated Grand Aim Card + Lab Photo */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-2.5 sm:gap-3 min-h-0">

              {/* Grand Our Aim Card (Spacious, Clear & Prominent) */}
              <div className="p-3 sm:p-3.5 lg:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-sky-50/90 via-[#F8FAFC] to-white border-2 border-sky-200/90 shadow-xs hover:border-sky-400/80 transition-all flex flex-col justify-between flex-none">
                <div>
                  {/* Header: Icon, Tag & Badge */}
                  <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-7 h-7 rounded-lg bg-sky-100 text-[#0284C7] flex items-center justify-center shrink-0 shadow-2xs">
                        <Compass className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <span className="font-mono text-[10.5px] sm:text-[11px] uppercase tracking-[0.2em] text-[#0284C7] font-bold">
                        OUR AIM
                      </span>
                    </div>
                    <span className="font-mono text-[8.5px] sm:text-[9px] uppercase px-2 py-0.5 rounded-full bg-sky-100/90 text-[#0369A1] font-bold border border-sky-200">
                      Core Foundation
                    </span>
                  </div>

                  {/* Grand Title */}
                  <h3 className="font-serif text-[17px] sm:text-[19px] lg:text-[21px] font-bold text-[#0F172A] tracking-tight leading-snug mb-1">
                    Understandable Technology
                  </h3>

                  {/* Rich Legible Description */}
                  <p className="font-sans text-[12px] sm:text-[12.5px] lg:text-[13px] text-slate-700 leading-snug font-normal mb-2">
                    Making technology understandable through tangible hardware, intuitive physical computing, and structured age-appropriate learning from Grade 3.
                  </p>
                </div>

                {/* 3 Concrete Foundational Principles */}
                <div className="pt-2 border-t border-sky-100/90 flex flex-col gap-1 text-[11px] sm:text-[11.5px] text-[#0369A1] font-sans font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] shrink-0" />
                    <span>Physical breadboard circuits &amp; real sensors — no hidden black boxes</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] shrink-0" />
                    <span>Intuitive physical computing before abstract mathematical complexity</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] shrink-0" />
                    <span>Zero technology anxiety through guided, iterative hands-on experiments</span>
                  </div>
                </div>

                {/* Grounded Responsibility Bar */}
                <div className="mt-2 pt-1.5 border-t border-sky-100/80 flex items-center justify-between text-[8.5px] sm:text-[9px] font-mono text-[#0284C7]">
                  <span className="font-bold uppercase tracking-wider">Pedagogical Standard</span>
                  <span className="font-semibold text-slate-600">100% Hands-On Hardware Intuition</span>
                </div>
              </div>

              {/* Lab Photo Showcase (Balanced Height, Rich Landscape Framing) */}
              <div className="relative w-full h-40 sm:h-48 lg:h-full flex-1 min-h-[140px] sm:min-h-[170px] rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs group bg-slate-900">
                <img
                  src="/assets/learning_cycle_students.png"
                  alt="School Laboratory Session"
                  className="w-full h-full object-cover object-[center_55%] transition-transform duration-700 ease-out group-hover:scale-103"
                  loading="eager"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== '/assets/aim_vision_lab_session.webp') {
                      target.src = '/assets/aim_vision_lab_session.webp';
                    }
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                {/* Top Pill */}
                <div className="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[9px] uppercase tracking-wider font-semibold">
                    Active School Lab Session
                  </span>
                </div>

                {/* Bottom Caption */}
                <div className="absolute bottom-2.5 left-3 right-3 z-10 text-white">
                  <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-[#FDBA74] font-bold block mb-0.5">
                    PHYSICAL COMPUTING IN PRACTICE
                  </span>
                  <p className="font-serif text-[12px] text-white/95 leading-tight">
                    Active circuit, sensor calibration &amp; microcontroller exploration.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column (Span 6 of 12): The 4-Stage Learning Cycle Placed Balanced */}
            <div
              onMouseEnter={() => setIsUserHovering(true)}
              onMouseLeave={() => setIsUserHovering(false)}
              className="lg:col-span-6 flex flex-col justify-between rounded-xl sm:rounded-2xl border border-slate-200/90 bg-[#FFFDF9] p-2.5 sm:p-3 lg:p-3.5 shadow-2xs min-h-0"
            >
              {/* Methodology Header */}
              <div className="flex items-center justify-between pb-1.5 border-b border-amber-100/90 mb-1 sm:mb-1.5 flex-none">
                <div>
                  <span className="font-mono text-[8.5px] sm:text-[9px] uppercase tracking-[0.2em] text-[#b45309] font-bold block mb-0.5">
                    OUR LEARNING METHODOLOGY
                  </span>
                  <h3 className="font-serif font-bold text-[13.5px] sm:text-[14.5px] lg:text-[15.5px] text-[#0F172A] tracking-tight leading-tight">
                    The <span className="text-[#EA580C]">4-Stage</span> Learning Cycle
                  </h3>
                  <p className="font-sans text-[10px] sm:text-[10.5px] text-slate-500 leading-tight">
                    A practical journey from curiosity to real innovation.
                  </p>
                </div>
                <span className="font-mono text-[8px] sm:text-[8.5px] uppercase px-2 py-0.5 rounded-full bg-orange-100 text-[#EA580C] font-bold border border-orange-200 shrink-0">
                  Active Cycle
                </span>
              </div>

              {/* 4 Connected Vertical Step Cards - CONCISE & BALANCED (NO EXCESSIVE SPACING) */}
              <div className="relative flex flex-col justify-between gap-1 sm:gap-1.5 flex-1 min-h-0 py-0.5">
                {/* Continuous Vertical Connecting Line anchored strictly from center of step 1 to center of step 4 */}
                <div
                  className="absolute left-[13px] sm:left-[15px] top-4 bottom-4 w-[2px] bg-slate-200 z-0 pointer-events-none"
                  aria-hidden="true"
                />

                {STEPS.map((step, idx) => {
                  const isActive = activeStepIndex === idx;

                  return (
                    <div
                      key={step.name}
                      onClick={() => setActiveStepIndex(idx)}
                      onMouseEnter={() => setActiveStepIndex(idx)}
                      className={`relative z-10 p-1.5 sm:p-2 rounded-xl border text-left transition-all duration-300 cursor-pointer flex items-start gap-2 sm:gap-2.5 ${isActive
                        ? 'bg-[#FFF7ED] border-[#EA580C] shadow-xs -translate-x-0.5'
                        : 'bg-white/95 border-slate-200/80 hover:bg-[#FAF9F5] hover:border-slate-300'
                        }`}
                    >
                      {/* Step Number Circle (on top of continuous vertical line) */}
                      <span
                        className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center font-mono font-bold text-[9px] sm:text-[10px] shrink-0 mt-0.5 transition-all ${isActive
                          ? 'bg-[#EA580C] text-white shadow-xs ring-3 ring-[#FFEDD5]'
                          : 'bg-slate-100 text-slate-600 ring-3 ring-white'
                          }`}
                      >
                        {step.num}
                      </span>

                      {/* Illustrated Stage Icon */}
                      <div className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 flex items-center justify-center mt-0.5">
                        <img
                          src={step.icon}
                          alt={step.name}
                          className={`w-full h-full object-contain transition-transform duration-300 ${isActive ? 'scale-105' : 'opacity-85'}`}
                        />
                      </div>

                      {/* Content: Title, Description, and Active Spotlight Extension */}
                      <div className="flex-1 min-w-0 pr-0.5">
                        <div className="flex items-center justify-between mb-0.5">
                          <h4 className={`font-serif font-bold text-[12.5px] sm:text-[13.5px] leading-tight ${isActive ? 'text-[#EA580C]' : 'text-[#0F172A]'}`}>
                            {step.name}
                          </h4>
                          <span
                            className={`font-mono text-[7.5px] sm:text-[8px] font-bold px-1.5 py-0.5 rounded-full transition-colors ${isActive
                              ? 'text-[#EA580C] bg-[#FFEDD5] border border-orange-200/80'
                              : 'text-slate-500 bg-slate-100 border border-slate-200/60'
                              }`}
                          >
                            {step.badge}
                          </span>
                        </div>
                        <p className="font-sans text-[10px] sm:text-[10.5px] text-slate-600 leading-snug line-clamp-1 sm:line-clamp-2 font-normal">
                          {step.desc}
                        </p>

                        {/* Interactive In-Practice Spotlight directly inside the active step */}
                        {isActive && (
                          <div className="mt-1 pt-1 border-t border-orange-200/70 flex flex-col gap-0.5">
                            <p className="font-sans text-[9.5px] sm:text-[10px] text-slate-700 leading-tight font-medium line-clamp-2">
                              {step.inAction}
                            </p>
                            <div className="flex flex-wrap items-center gap-1 pt-0.5">
                              {step.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="font-mono text-[7px] sm:text-[7.5px] px-1.5 py-0.5 rounded bg-white text-[#EA580C] font-semibold border border-orange-200/70"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
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
              <span>Discover Our Strategic Vision</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#b45309]" />
            </button>
          </div>

        </div>
      </div>
    </ChapterShell>
  );
};

export default AboutSection;
