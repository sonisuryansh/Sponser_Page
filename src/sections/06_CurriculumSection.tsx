import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import {
  Code2,
  Cpu,
  Binary,
  Plane,
  BarChart3,
  Network,
  Cloud,
  Target,
  ArrowLeft,
  ArrowRight,
  Wrench,
  Sliders,
  Wind,
} from 'lucide-react';
import gsap from 'gsap';

interface GradeMeta {
  icon: React.ReactNode;
  iconColor: string;
  image: string;
  chipIcons: [React.ReactNode, React.ReactNode, React.ReactNode];
}

interface ChipDetail {
  title: string;
  subtitle: string;
}

const STAGE_CHIP_DETAILS: Record<string, [ChipDetail, ChipDetail, ChipDetail]> = {
  'grade-3-4': [
    { title: 'Block-Based Coding', subtitle: 'Sequential loops, logic & visual sprites' },
    { title: 'Foundational Design', subtitle: 'Interactive canvas & spatial coordinates' },
    { title: 'Algorithmic Thinking', subtitle: 'Problem decomposition & step logic' },
  ],
  'grade-5-6': [
    { title: 'Physical Computing', subtitle: 'Breadboard circuits & DC motor control' },
    { title: 'Sensory Feedback', subtitle: 'Light & tactile sensors with live triggers' },
    { title: 'Visual Programming', subtitle: 'Bridging digital code with mechanical builds' },
  ],
  'grade-7-8': [
    { title: 'Python Programming', subtitle: 'Text-based syntax, functions & structures' },
    { title: 'Microcontroller Logic', subtitle: 'Real-time GPIO sensor input & PWM motors' },
    { title: 'Data Structures', subtitle: 'Telemetry arrays, sensor logs & debugging' },
  ],
  'grade-9': [
    { title: 'Connected Sensors', subtitle: 'Multi-node IoT telemetry & data logging' },
    { title: 'Systems Thinking', subtitle: 'Closed-loop feedback & flight aerodynamics' },
    { title: 'Showcase Prototype', subtitle: 'Annual engineering exhibition readiness' },
  ],
  'grade-10': [
    { title: 'Data Analytics', subtitle: 'Data wrangling, cleaning & statistical trends' },
    { title: 'Hypothesis Testing', subtitle: 'Variance analysis, outliers & sensor verification' },
    { title: 'Capstone Portfolio', subtitle: 'End-to-end prototype build & peer defense' },
  ],
  'grade-11': [
    { title: 'Model Architecture', subtitle: 'Supervised weights, loss curves & inference' },
    { title: 'Statistical Inference', subtitle: 'Predictive metrics, feature modeling & data' },
    { title: 'Applied Exploration', subtitle: 'Edge intelligence & ethical guardrails' },
  ],
  'grade-12': [
    { title: 'Vision Models', subtitle: 'Neural camera classification & object detection' },
    { title: 'Integrated Robotics', subtitle: '3-DOF inverse kinematics & feedback control' },
    { title: 'Senior Portfolio', subtitle: 'Comprehensive accredited capstone defense' },
  ],
};

const GRADE_META: GradeMeta[] = [
  {
    // Grades 3–4
    icon: <Code2 className="w-4 h-4" />,
    iconColor: '#0284C7',
    image: '/assets/stage_grade_01.webp',
    chipIcons: [
      <Code2 key="1" className="w-4 h-4 text-[#0284C7]" />,
      <Sliders key="2" className="w-4 h-4 text-[#9333EA]" />,
      <Wind key="3" className="w-4 h-4 text-[#16A34A]" />,
    ],
  },
  {
    // Grades 5–6
    icon: <Cpu className="w-4 h-4" />,
    iconColor: '#0284C7',
    image: '/assets/stage_grade_02.webp',
    chipIcons: [
      <Wrench key="1" className="w-4 h-4 text-[#0284C7]" />,
      <Cpu key="2" className="w-4 h-4 text-[#9333EA]" />,
      <Wind key="3" className="w-4 h-4 text-[#16A34A]" />,
    ],
  },
  {
    // Grades 7–8
    icon: <Binary className="w-4 h-4" />,
    iconColor: '#D97706',
    image: '/assets/stage_grade_03.webp',
    chipIcons: [
      <Code2 key="1" className="w-4 h-4 text-[#0284C7]" />,
      <Sliders key="2" className="w-4 h-4 text-[#9333EA]" />,
      <Cpu key="3" className="w-4 h-4 text-[#16A34A]" />,
    ],
  },
  {
    // Grade 9
    icon: <Plane className="w-4 h-4" />,
    iconColor: '#EA580C',
    image: '/assets/stage_grade_04.webp',
    chipIcons: [
      <Plane key="1" className="w-4 h-4 text-[#0284C7]" />,
      <Sliders key="2" className="w-4 h-4 text-[#9333EA]" />,
      <Wind key="3" className="w-4 h-4 text-[#16A34A]" />,
    ],
  },
  {
    // Grade 10
    icon: <BarChart3 className="w-4 h-4" />,
    iconColor: '#0D9488',
    image: '/assets/stage_grade_05.webp',
    chipIcons: [
      <BarChart3 key="1" className="w-4 h-4 text-[#0284C7]" />,
      <Sliders key="2" className="w-4 h-4 text-[#9333EA]" />,
      <Target key="3" className="w-4 h-4 text-[#16A34A]" />,
    ],
  },
  {
    // Grade 11
    icon: <Network className="w-4 h-4" />,
    iconColor: '#9333EA',
    image: '/assets/stage_grade_06.webp',
    chipIcons: [
      <Network key="1" className="w-4 h-4 text-[#0284C7]" />,
      <Sliders key="2" className="w-4 h-4 text-[#9333EA]" />,
      <Target key="3" className="w-4 h-4 text-[#16A34A]" />,
    ],
  },
  {
    // Grade 12
    icon: <Cloud className="w-4 h-4" />,
    iconColor: '#2563EB',
    image: '/assets/stage_grade_06.webp',
    chipIcons: [
      <Cloud key="1" className="w-4 h-4 text-[#0284C7]" />,
      <Cpu key="2" className="w-4 h-4 text-[#9333EA]" />,
      <Target key="3" className="w-4 h-4 text-[#16A34A]" />,
    ],
  },
];

export const CurriculumSection: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isSectionActive, setIsSectionActive] = useState(false);
  const steppableRef = useRef<HTMLDivElement>(null);
  const activeStageIndexRef = useRef(activeStageIndex);
  const contentAreaRef = useRef<HTMLDivElement>(null);
  const imageAreaRef = useRef<HTMLDivElement>(null);
  const tabButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const allStages = [
    ...siteConfig.curriculum.stages,
    ...(siteConfig.showBeyondGrade10 ? siteConfig.curriculum.beyondGrade10 : []),
  ];

  useEffect(() => {
    activeStageIndexRef.current = activeStageIndex;
    const activeBtn = tabButtonRefs.current[activeStageIndex];
    const container = tabsContainerRef.current;
    if (activeBtn && container) {
      const scrollTarget = activeBtn.offsetLeft - container.clientWidth / 2 + activeBtn.clientWidth / 2;
      container.scrollTo({
        left: Math.max(0, scrollTarget),
        behavior: 'smooth',
      });
    }
  }, [activeStageIndex]);

  // Detect whether Section 06 is currently visible and active in viewport
  useEffect(() => {
    const el = contentAreaRef.current;
    if (!el) return;

    const checkActive = () => {
      const slideWrapper = el.closest<HTMLElement>('.slide-item');
      if (slideWrapper) {
        const visible =
          slideWrapper.style.visibility === 'visible' && slideWrapper.style.opacity !== '0';
        setIsSectionActive(visible);
        return visible;
      }
      setIsSectionActive(true);
      return true;
    };

    checkActive();

    const slideWrapper = el.closest<HTMLElement>('.slide-item');
    let observer: MutationObserver | null = null;
    if (slideWrapper) {
      observer = new MutationObserver(() => {
        checkActive();
      });
      observer.observe(slideWrapper, { attributes: true, attributeFilter: ['style', 'class'] });
    }

    const pollTimer = setInterval(checkActive, 500);

    return () => {
      observer?.disconnect();
      clearInterval(pollTimer);
    };
  }, []);

  // Step through grades on scroll / gesture, and only advance slide when reaching boundary
  useEffect(() => {
    const el = steppableRef.current;
    if (!el) return;

    const handleStep = (e: Event) => {
      const customEvent = e as CustomEvent<{ direction: number }>;
      const dir = customEvent.detail?.direction || 1;
      const cur = activeStageIndexRef.current;

      if (dir > 0) {
        if (cur < allStages.length - 1) {
          e.preventDefault();
          setActiveStageIndex(cur + 1);
        }
      } else if (dir < 0) {
        if (cur > 0) {
          e.preventDefault();
          setActiveStageIndex(cur - 1);
        }
      }
    };

    const handleEnter = (e: Event) => {
      const customEvent = e as CustomEvent<{ direction: number }>;
      const dir = customEvent.detail?.direction || 1;
      if (dir > 0) {
        setActiveStageIndex(0);
      } else {
        setActiveStageIndex(allStages.length - 1);
      }
    };

    el.addEventListener('slide:step', handleStep);
    el.addEventListener('slide:enter', handleEnter);

    return () => {
      el.removeEventListener('slide:step', handleStep);
      el.removeEventListener('slide:enter', handleEnter);
    };
  }, [allStages.length]);

  // Arrow key navigation when section is visible
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.querySelector('[aria-modal="true"]') ||
        !isSectionActive
      ) {
        return;
      }

      const cur = activeStageIndexRef.current;
      if (e.key === 'ArrowRight') {
        if (cur < allStages.length - 1) {
          e.preventDefault();
          setActiveStageIndex(cur + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (cur > 0) {
          e.preventDefault();
          setActiveStageIndex(cur - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSectionActive, allStages.length]);

  // Gentle transition when active stage changes
  useEffect(() => {
    if (contentAreaRef.current) {
      gsap.fromTo(
        contentAreaRef.current.querySelectorAll('.stage-anim'),
        { opacity: 0.25, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: 'power2.out' }
      );
    }
    if (imageAreaRef.current) {
      gsap.fromTo(
        imageAreaRef.current,
        { opacity: 0.35, scale: 1.02 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [activeStageIndex]);

  const currentStage = allStages[activeStageIndex];
  const meta = GRADE_META[activeStageIndex] || GRADE_META[0];

  const handlePrev = () => {
    setActiveStageIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveStageIndex((prev) => Math.min(allStages.length - 1, prev + 1));
  };

  // Format grade label into "Grade" + colored number (e.g. "Grade" & "9" or "Grades" & "3–4")
  const renderGradeHeadline = (label: string) => {
    const parts = label.split(' ');
    if (parts.length >= 2) {
      return (
        <>
          <span>{parts[0]}</span>{' '}
          <span className="text-[#EA580C] font-extrabold">{parts.slice(1).join(' ')}</span>
        </>
      );
    }
    return <span>{label}</span>;
  };

  return (
    <ChapterShell
      id="curriculum"
      chapterNumber="06"
      theme="light"
      fullBleed={true}
      className="relative w-full h-[100svh] overflow-hidden bg-[#FAF6EE] select-none"
    >
      {/* Main Viewport Container */}
      <div
        ref={steppableRef}
        data-steppable="true"
        className="relative w-full h-full min-h-full flex-1 flex flex-col justify-between items-center pt-[calc(var(--header-h,64px)+6px)] pb-3 sm:pb-4 px-3 sm:px-6 lg:px-10 xl:px-14 box-border select-none z-10 max-w-[1480px] mx-auto overflow-hidden"
      >
        {/* Main Unified Inset Card - Matches Reference Image 1 (Spacious) */}
        <div className="relative w-full my-auto bg-[#FFFFFD] shadow-[0_16px_50px_rgba(0,0,0,0.05)] border border-black/8 rounded-2xl sm:rounded-3xl flex flex-col sm:flex-row items-stretch overflow-hidden box-border flex-1 max-h-[calc(100svh-var(--header-h,64px)-14px)]">

          {/* ─── Left Sidebar: "LEARNING JOURNEY" & Vertical Grade Tabs with Icons ─── */}
          <div className="w-full sm:w-48 lg:w-52 xl:w-56 border-b sm:border-b-0 sm:border-r border-black/8 bg-[#FAF9F6]/80 flex flex-col justify-between py-2.5 sm:py-4 px-2 sm:px-3 select-none shrink-0">
            <div>
              {/* Header Label with mobile swipe hint */}
              <div className="flex items-center justify-between px-2 pt-1 mb-1.5 sm:mb-3">
                <span className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.22em] text-[#94A3B8] font-bold block">
                  Learning Journey
                </span>
                <span className="sm:hidden font-mono text-[9px] text-[#EA580C] font-semibold">
                  {activeStageIndex + 1}/{allStages.length}
                </span>
              </div>

              {/* Grade Buttons List with Colorful Icons & Touch Scroll */}
              <div
                ref={tabsContainerRef}
                className="flex sm:flex-col gap-1 sm:gap-1.5 overflow-x-auto sm:overflow-y-auto sm:max-h-[calc(100svh-var(--header-h,64px)-90px)] pb-1.5 sm:pb-0 touch-pan-x overscroll-x-contain scroll-smooth no-scrollbar w-full"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                {allStages.map((stage, idx) => {
                  const isActive = activeStageIndex === idx;
                  const itemMeta = GRADE_META[idx] || GRADE_META[0];

                  return (
                    <button
                      key={stage.id}
                      ref={(el) => {
                        tabButtonRefs.current[idx] = el;
                      }}
                      onClick={() => setActiveStageIndex(idx)}
                      className={`group relative flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 text-left cursor-pointer transition-all rounded-xl text-[11px] sm:text-[11.5px] xl:text-xs font-semibold shrink-0 sm:shrink-0 whitespace-nowrap ${
                        isActive
                          ? 'bg-[#FFF7ED] text-[#0F172A] border sm:border-0 border-[#EA580C]/40 sm:border-r-[3.5px] sm:border-[#EA580C] shadow-xs font-bold'
                          : 'text-[#64748B] hover:bg-black/[0.03] hover:text-[#0F172A] border border-transparent'
                      }`}
                      aria-label={`Go to ${stage.gradeLabel}`}
                    >
                      <span
                        className="shrink-0 transition-transform group-hover:scale-110"
                        style={{ color: isActive ? '#EA580C' : itemMeta.iconColor }}
                      >
                        {itemMeta.icon}
                      </span>
                      <span className="whitespace-nowrap tracking-tight">{stage.gradeLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ─── Main Content & Right Photo Layout (Matching Image 1) ─── */}
          <div className="flex-1 flex flex-col lg:flex-row items-stretch p-3.5 sm:p-4 lg:p-5 gap-3 sm:gap-4 lg:gap-5 overflow-hidden">

            {/* Left Content Column */}
            <div
              ref={contentAreaRef}
              className="flex-1 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* 1. Large Grade Headline with Orange Accent */}
                <div className="stage-anim">
                  <h2 className="font-serif text-xl sm:text-2xl lg:text-[28px] font-bold text-[#0F172A] tracking-tight leading-none mb-1">
                    {renderGradeHeadline(currentStage.gradeLabel)}
                  </h2>

                  {/* Orange Accent Bar Under Headline (Matching Image 1) */}
                  <div className="w-10 sm:w-12 h-1 bg-[#EA580C] rounded-full mb-2" />
                </div>

                {/* 2. Stage Title */}
                <h3 className="stage-anim font-serif text-base sm:text-lg lg:text-[19px] font-bold text-[#0F172A] leading-tight tracking-tight mb-1">
                  {currentStage.title}
                </h3>

                {/* 3. Focus / Subtitle */}
                <p className="stage-anim font-sans text-[11px] sm:text-xs text-[#64748B] leading-snug mb-2 font-normal max-w-lg">
                  {currentStage.focus}
                </p>

                {/* 4. 3 Enriched Feature Chips (Detailed Subtitles & Professional Architecture) */}
                {(() => {
                  const stageChips = STAGE_CHIP_DETAILS[currentStage.id] || STAGE_CHIP_DETAILS['grade-10'];
                  return (
                    <div className="stage-anim grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2 mb-2">
                      {/* Chip 1: Blue Theme */}
                      <div className="flex items-start gap-2 p-2 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] shadow-xs">
                        <div className="w-5 h-5 rounded-md bg-[#E0F2FE] flex items-center justify-center shrink-0 mt-0.5">
                          {meta.chipIcons[0]}
                        </div>
                        <div className="min-w-0">
                          <span className="font-sans text-[10.5px] sm:text-[11px] font-bold text-[#0F172A] leading-tight block">
                            {stageChips[0].title}
                          </span>
                          <span className="font-sans text-[9px] sm:text-[9.5px] text-[#0284C7] leading-tight block mt-0.5 font-medium line-clamp-1">
                            {stageChips[0].subtitle}
                          </span>
                        </div>
                      </div>

                      {/* Chip 2: Purple Theme */}
                      <div className="flex items-start gap-2 p-2 rounded-xl bg-[#FAF5FF] border border-[#E9D5FF] shadow-xs">
                        <div className="w-5 h-5 rounded-md bg-[#F3E8FF] flex items-center justify-center shrink-0 mt-0.5">
                          {meta.chipIcons[1]}
                        </div>
                        <div className="min-w-0">
                          <span className="font-sans text-[10.5px] sm:text-[11px] font-bold text-[#0F172A] leading-tight block">
                            {stageChips[1].title}
                          </span>
                          <span className="font-sans text-[9px] sm:text-[9.5px] text-[#9333EA] leading-tight block mt-0.5 font-medium line-clamp-1">
                            {stageChips[1].subtitle}
                          </span>
                        </div>
                      </div>

                      {/* Chip 3: Green Theme */}
                      <div className="flex items-start gap-2 p-2 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] shadow-xs">
                        <div className="w-5 h-5 rounded-md bg-[#DCFCE7] flex items-center justify-center shrink-0 mt-0.5">
                          {meta.chipIcons[2]}
                        </div>
                        <div className="min-w-0">
                          <span className="font-sans text-[10.5px] sm:text-[11px] font-bold text-[#0F172A] leading-tight block">
                            {stageChips[2].title}
                          </span>
                          <span className="font-sans text-[9px] sm:text-[9.5px] text-[#16A34A] leading-tight block mt-0.5 font-medium line-clamp-1">
                            {stageChips[2].subtitle}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* 5. "Students can..." Callout Box (Matching Image 1) */}
                {currentStage.outcome && (
                  <div className="stage-anim p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-[#FFF7ED] via-[#FFFAF0] to-white border border-[#FED7AA] flex items-start gap-2 shadow-xs mb-2">
                    <div className="w-6 h-6 rounded-full bg-[#FFEDD5] border border-[#FDBA74] flex items-center justify-center shrink-0 text-[#EA580C] shadow-inner mt-0.5">
                      <Target className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-serif font-bold text-[11px] sm:text-xs text-[#C2410C] block leading-tight mb-0.5">
                        Students can...
                      </span>
                      <p className="font-sans text-[10px] sm:text-[10.5px] text-[#475569] leading-snug font-normal line-clamp-2">
                        {currentStage.outcome}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* 6. Bottom Navigation Bar: Previous + 7 Dots + Next (Matching Image 1) */}
              <div className="stage-anim pt-2 border-t border-black/8 flex items-center justify-between text-xs font-mono-tech mt-auto gap-2">
                {/* Previous Button */}
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={activeStageIndex === 0}
                  className={`flex items-center gap-1 transition-colors cursor-pointer shrink-0 ${activeStageIndex === 0
                    ? 'opacity-30 cursor-not-allowed text-[#94A3B8]'
                    : 'text-[#475569] hover:text-[#EA580C] font-semibold'
                    }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Previous </span>
                  <span className="font-bold text-[#0F172A] truncate max-w-[85px] sm:max-w-none">
                    {activeStageIndex > 0 ? allStages[activeStageIndex - 1].gradeLabel : ''}
                  </span>
                </button>

                {/* 7 Dot Indicators */}
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  {allStages.map((_, dotIdx) => (
                    <button
                      type="button"
                      key={dotIdx}
                      onClick={() => setActiveStageIndex(dotIdx)}
                      className={`transition-all rounded-full cursor-pointer ${activeStageIndex === dotIdx
                        ? 'w-3.5 sm:w-5 h-2 bg-[#EA580C]'
                        : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#CBD5E1] hover:bg-[#94A3B8]'
                        }`}
                      aria-label={`Jump to grade ${dotIdx + 1}`}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={activeStageIndex === allStages.length - 1}
                  className={`flex items-center gap-1 transition-colors cursor-pointer shrink-0 text-right ${activeStageIndex === allStages.length - 1
                    ? 'opacity-30 cursor-not-allowed text-[#94A3B8]'
                    : 'text-[#475569] hover:text-[#EA580C] font-semibold'
                    }`}
                >
                  <span className="hidden sm:inline">Next </span>
                  <span className="font-bold text-[#0F172A] truncate max-w-[85px] sm:max-w-none">
                    {activeStageIndex < allStages.length - 1
                      ? allStages[activeStageIndex + 1].gradeLabel
                      : ''}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Right Photo Column (Matching Image 1) */}
            <div
              ref={imageAreaRef}
              className="hidden lg:flex w-[320px] xl:w-[360px] shrink-0 items-center justify-center"
            >
              <div className="relative w-full h-[320px] sm:h-[350px] lg:h-[370px] rounded-2xl overflow-hidden border border-black/10 shadow-lg group bg-black/5">
                <img
                  src={meta.image}
                  alt={`${currentStage.gradeLabel} hardware and curriculum session`}
                  className="w-full h-full object-cover object-center filter saturate-[0.92] contrast-[1.04] group-hover:scale-104 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Corner Branding Tag */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full border border-black/10 shadow-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
                  <span className="font-mono text-[9px] font-bold text-[#0F172A] uppercase tracking-wider">
                    {currentStage.gradeLabel}
                  </span>
                </div>

                {/* Bottom Overlay Title */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="font-mono text-[9px] uppercase tracking-wider block opacity-90 text-[#FDBA74] font-bold">
                    Hands-On Student Platform
                  </span>
                  <span className="font-serif text-[12.5px] font-medium leading-tight text-white/95 block">
                    {currentStage.termProject || currentStage.title}
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </ChapterShell>
  );
};

export default CurriculumSection;
