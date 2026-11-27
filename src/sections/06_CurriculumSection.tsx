import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  Wrench,
  Sliders,
  Wind,
  CheckCircle2,
  ArrowRight,
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
  const lastStepTimeRef = useRef(0);
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

  // Step forward or backward through grades with rate limiting & boundary check
  const stepStage = useCallback(
    (dir: number): boolean => {
      const now = Date.now();
      // 360ms rate limit ensures each wheel tick advances exactly one grade cleanly without skipping
      if (now - lastStepTimeRef.current < 360) {
        return true; // Still within cooldown: swallow momentum scroll events!
      }

      const cur = activeStageIndexRef.current;
      if (dir > 0) {
        if (cur < allStages.length - 1) {
          lastStepTimeRef.current = now;
          const next = cur + 1;
          activeStageIndexRef.current = next;
          setActiveStageIndex(next);
          return true;
        }
        return false; // Boundary reached (Grade 12): allow slide transition
      } else if (dir < 0) {
        if (cur > 0) {
          lastStepTimeRef.current = now;
          const prev = cur - 1;
          activeStageIndexRef.current = prev;
          setActiveStageIndex(prev);
          return true;
        }
        return false; // Boundary reached (Grades 3–4): allow slide transition back
      }
      return false;
    },
    [allStages.length]
  );

  // Step through grades on scroll / gesture, and only advance slide when reaching boundary
  useEffect(() => {
    const el = steppableRef.current;
    if (!el) return;

    const handleStep = (e: Event) => {
      const customEvent = e as CustomEvent<{ direction: number }>;
      const dir = customEvent.detail?.direction || 1;
      const handled = stepStage(dir);
      if (handled) {
        e.preventDefault();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      if (Math.abs(e.deltaY) < 14) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      const handled = stepStage(dir);
      if (handled) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleEnter = (e: Event) => {
      const customEvent = e as CustomEvent<{ direction: number }>;
      const dir = customEvent.detail?.direction || 1;
      const targetIdx = dir > 0 ? 0 : allStages.length - 1;
      activeStageIndexRef.current = targetIdx;
      setActiveStageIndex(targetIdx);
    };

    el.addEventListener('slide:step', handleStep);
    el.addEventListener('slide:enter', handleEnter);
    el.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      el.removeEventListener('slide:step', handleStep);
      el.removeEventListener('slide:enter', handleEnter);
      el.removeEventListener('wheel', handleWheel);
    };
  }, [stepStage, allStages.length]);

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

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const handled = stepStage(1);
        if (handled) {
          e.preventDefault();
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const handled = stepStage(-1);
        if (handled) {
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSectionActive, stepStage]);

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
      className="relative w-full min-h-[100svh] lg:h-[100svh] overflow-y-auto lg:overflow-hidden bg-[#FAF6EE] select-none"
    >
      {/* Main Viewport Container - Exact same outer dimensions as Section 02 */}
      <div
        ref={steppableRef}
        data-steppable="true"
        className="relative w-full h-auto lg:h-full max-h-none lg:max-h-full min-h-0 flex-1 flex flex-col justify-between items-center pt-[calc(var(--header-h,64px)+10px)] pb-8 lg:pb-3 px-3 sm:px-5 lg:px-6 xl:px-8 box-border select-none z-10 max-w-[1440px] mx-auto overflow-visible lg:overflow-hidden"
      >
        {/* Main Unified Inset Card - Matches Section 02 Executive Size & Border */}
        <div className="relative w-full h-auto lg:h-full max-h-none lg:max-h-[820px] xl:lg:max-h-[860px] min-h-0 flex-1 lg:my-auto bg-white rounded-2xl sm:rounded-3xl shadow-[0_16px_50px_rgba(0,0,0,0.04)] border border-slate-200/80 p-3 sm:p-4 lg:p-4.5 flex flex-col justify-between box-border gap-2 sm:gap-2.5 overflow-visible lg:overflow-hidden">

          {/* Middle Layout (Sidebar + Main Content + Photo) */}
          <div className="flex-1 flex flex-col sm:flex-row items-stretch min-h-0 gap-2.5 sm:gap-3.5 lg:gap-4 overflow-hidden">

            {/* ─── Left Sidebar: "LEARNING JOURNEY" & Vertical Grade Tabs with Icons ─── */}
            <div className="w-full sm:w-44 lg:w-48 xl:w-52 border-b sm:border-b-0 sm:border-r border-slate-200/80 bg-[#FAF9F6] rounded-xl sm:rounded-2xl flex flex-col justify-between py-2 sm:py-3.5 px-2 sm:px-2.5 select-none shrink-0">
              <div className="h-full flex flex-col justify-between">
                {/* Header Label with mobile swipe hint */}
                <div className="flex items-center justify-between px-2 pt-1 mb-1.5 sm:mb-2.5">
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
                  role="tablist"
                  aria-label="Grade level curriculum tabs"
                  className="flex sm:flex-col gap-1 sm:gap-1.5 xl:gap-2 overflow-x-auto sm:overflow-y-auto sm:max-h-[calc(100svh-var(--header-h,64px)-110px)] pb-1 sm:pb-0 touch-pan-x overscroll-x-contain scroll-smooth no-scrollbar w-full flex-1 justify-between"
                  style={{ WebkitOverflowScrolling: 'touch' }}
                >
                  {allStages.map((stage, idx) => {
                    const isActive = activeStageIndex === idx;
                    const itemMeta = GRADE_META[idx] || GRADE_META[0];

                    return (
                      <button
                        key={stage.id}
                        role="tab"
                        aria-selected={isActive}
                        ref={(el) => {
                          tabButtonRefs.current[idx] = el;
                        }}
                        onClick={() => setActiveStageIndex(idx)}
                        className={`group relative flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 xl:py-2.5 text-left cursor-pointer transition-all rounded-xl text-[11px] sm:text-[11.5px] xl:text-[12px] font-semibold shrink-0 sm:shrink-0 whitespace-nowrap ${
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

            {/* ─── Main Content Column ─── */}
            <div
              ref={contentAreaRef}
              className="flex-1 flex flex-col justify-between overflow-hidden h-full min-h-0 py-0.5 px-0.5 sm:px-1"
            >
              <div className="flex-1 flex flex-col justify-between min-h-0">
                {/* 1. Large Grade Headline with Orange Accent */}
                <div className="stage-anim">
                  <h2 className="font-serif text-xl sm:text-2xl lg:text-[27px] font-bold text-[#0F172A] tracking-tight leading-none mb-1">
                    {renderGradeHeadline(currentStage.gradeLabel)}
                  </h2>

                  {/* Orange Accent Bar Under Headline */}
                  <div className="w-10 sm:w-12 h-1 bg-[#EA580C] rounded-full mb-1.5" />
                </div>

                {/* 2. Stage Title */}
                <h3 className="stage-anim font-serif text-base sm:text-lg lg:text-[18px] font-bold text-[#0F172A] leading-tight tracking-tight mb-0.5">
                  {currentStage.title}
                </h3>

                {/* 3. Focus / Subtitle */}
                <p className="stage-anim font-sans text-[11px] sm:text-[11.5px] text-[#64748B] leading-snug mb-1.5 font-normal max-w-xl">
                  {currentStage.focus}
                </p>

                {/* 4. 3 Enriched Feature Chips */}
                {(() => {
                  const stageChips = STAGE_CHIP_DETAILS[currentStage.id] || STAGE_CHIP_DETAILS['grade-10'];
                  return (
                    <div className="stage-anim grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                      {/* Chip 1: Blue Theme */}
                      <div className="flex items-start gap-2 p-2 sm:p-2.5 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] shadow-xs">
                        <div className="w-5 h-5 rounded-md bg-[#E0F2FE] flex items-center justify-center shrink-0 mt-0.5">
                          {meta.chipIcons[0]}
                        </div>
                        <div className="min-w-0">
                          <span className="font-sans text-[11px] sm:text-[11.5px] font-bold text-[#0F172A] leading-tight block">
                            {stageChips[0].title}
                          </span>
                          <span className="font-sans text-[9.5px] sm:text-[10px] text-[#0284C7] leading-tight block mt-0.5 font-medium line-clamp-1">
                            {stageChips[0].subtitle}
                          </span>
                        </div>
                      </div>

                      {/* Chip 2: Purple Theme */}
                      <div className="flex items-start gap-2 p-2 sm:p-2.5 rounded-xl bg-[#FAF5FF] border border-[#E9D5FF] shadow-xs">
                        <div className="w-5 h-5 rounded-md bg-[#F3E8FF] flex items-center justify-center shrink-0 mt-0.5">
                          {meta.chipIcons[1]}
                        </div>
                        <div className="min-w-0">
                          <span className="font-sans text-[11px] sm:text-[11.5px] font-bold text-[#0F172A] leading-tight block">
                            {stageChips[1].title}
                          </span>
                          <span className="font-sans text-[9.5px] sm:text-[10px] text-[#9333EA] leading-tight block mt-0.5 font-medium line-clamp-1">
                            {stageChips[1].subtitle}
                          </span>
                        </div>
                      </div>

                      {/* Chip 3: Green Theme */}
                      <div className="flex items-start gap-2 p-2 sm:p-2.5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] shadow-xs">
                        <div className="w-5 h-5 rounded-md bg-[#DCFCE7] flex items-center justify-center shrink-0 mt-0.5">
                          {meta.chipIcons[2]}
                        </div>
                        <div className="min-w-0">
                          <span className="font-sans text-[11px] sm:text-[11.5px] font-bold text-[#0F172A] leading-tight block">
                            {stageChips[2].title}
                          </span>
                          <span className="font-sans text-[9.5px] sm:text-[10px] text-[#16A34A] leading-tight block mt-0.5 font-medium line-clamp-1">
                            {stageChips[2].subtitle}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* 5. "Students can..." Callout Box */}
                {currentStage.outcome && (
                  <div className="stage-anim p-2 sm:p-2.5 rounded-xl bg-gradient-to-r from-[#FFF7ED] via-[#FFFAF0] to-white border border-[#FED7AA] flex items-start gap-2.5 shadow-xs mb-2">
                    <div className="w-5 h-5 rounded-full bg-[#FFEDD5] border border-[#FDBA74] flex items-center justify-center shrink-0 text-[#EA580C] shadow-inner mt-0.5">
                      <Target className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-serif font-bold text-[11.5px] sm:text-[12px] text-[#C2410C] block leading-tight mb-0.5">
                        Students can...
                      </span>
                      <p className="font-sans text-[11px] sm:text-[11.5px] text-[#475569] leading-snug font-normal line-clamp-2">
                        {currentStage.outcome}
                      </p>
                    </div>
                  </div>
                )}

                {/* 5b. Hands-on Term Capstone & Hardware Lab Platform Cards */}
                {currentStage.termProject && (
                  <div className="stage-anim grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 flex-1 min-h-0 items-stretch">
                    {/* Term Project Card */}
                    <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#FAF9F6] border border-black/8 shadow-2xs hover:border-[#EA580C]/40 transition-colors flex flex-col justify-between overflow-hidden min-h-0 h-full">
                      <div className="min-h-0 flex flex-col">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-wider text-[#C2410C] font-bold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
                            Hands-on Term Project
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-[14px] sm:text-[15px] text-[#0F172A] leading-tight mb-0.5">
                          {currentStage.termProject}
                        </h4>
                        <p className="font-sans text-[11.5px] sm:text-[12px] text-[#475569] leading-snug mb-1.5 line-clamp-2 font-normal">
                          {currentStage.termProjectDesc}
                        </p>

                        {/* Term Project Key Highlights */}
                        {currentStage.termProjectHighlights && currentStage.termProjectHighlights.length > 0 && (
                          <div className="pt-1.5 border-t border-black/6">
                            <span className="font-mono text-[9px] sm:text-[9.5px] uppercase tracking-wider text-[#64748B] font-bold block mb-1">
                              Key Build Deliverables
                            </span>
                            <ul className="space-y-1">
                              {currentStage.termProjectHighlights.slice(0, 2).map((hl, i) => (
                                <li key={i} className="flex items-start gap-1.5 text-[11px] sm:text-[11.5px] text-[#334155] leading-snug font-medium">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] shrink-0 mt-1 shadow-2xs" />
                                  <span>{hl}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Practical Competency Tags */}
                        {currentStage.termProjectSkills && (
                          <div className="flex flex-wrap gap-1 mt-1.5 pt-1.5 border-t border-black/5">
                            {currentStage.termProjectSkills.slice(0, 3).map((skill, i) => (
                              <span key={i} className="px-2 py-0.5 rounded-[4px] bg-[#FFF7ED] border border-[#FED7AA] text-[#C2410C] font-mono text-[9px] sm:text-[9.5px] font-bold">
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Milestone Footer Badge */}
                      {currentStage.termProjectDeliverable && (
                        <div className="mt-2 pt-1.5 border-t border-black/6">
                          <div className="px-2 py-1 rounded-md bg-[#FFF7ED] border border-[#FED7AA] flex items-center gap-1.5 min-w-0">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
                            <span className="font-mono text-[9px] sm:text-[9.5px] uppercase font-bold text-[#C2410C] shrink-0">Milestone:</span>
                            <span className="font-sans text-[10.5px] sm:text-[11px] font-bold text-[#9A3412] truncate">
                              {currentStage.termProjectDeliverable.replace(/^Milestone:\s*/, '')}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Lab Hardware & Tools Card */}
                    <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#FAF9F6] border border-black/8 shadow-2xs hover:border-[#0284C7]/40 transition-colors flex flex-col justify-between overflow-hidden min-h-0 h-full">
                      <div className="min-h-0 flex flex-col">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-wider text-[#0284C7] font-bold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                            Lab Platform &amp; Hardware
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-[14px] sm:text-[15px] text-[#0F172A] leading-tight mb-0.5">
                          {currentStage.hardwarePlatform}
                        </h4>
                        <p className="font-sans text-[11.5px] sm:text-[12px] text-[#475569] leading-snug mb-1.5 line-clamp-2 font-normal">
                          {currentStage.hardwarePlatformDesc}
                        </p>

                        {/* Hardware & Tools Specification Highlights */}
                        {currentStage.hardwarePlatformTools && currentStage.hardwarePlatformTools.length > 0 && (
                          <div className="pt-1.5 border-t border-black/6">
                            <span className="font-mono text-[9px] sm:text-[9.5px] uppercase tracking-wider text-[#64748B] font-bold block mb-1">
                              Hardware &amp; Toolchain Setup
                            </span>
                            <ul className="space-y-1">
                              {currentStage.hardwarePlatformTools.slice(0, 2).map((tool, i) => (
                                <li key={i} className="flex items-start gap-1.5 text-[11px] sm:text-[11.5px] text-[#334155] leading-snug font-medium">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] shrink-0 mt-1 shadow-2xs" />
                                  <span>{tool}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Lab Architecture Tags */}
                        {currentStage.hardwareTags && (
                          <div className="flex flex-wrap gap-1 mt-1.5 pt-1.5 border-t border-black/5">
                            {currentStage.hardwareTags.slice(0, 3).map((tag, i) => (
                              <span key={i} className="px-2 py-0.5 rounded-[4px] bg-[#F0F9FF] border border-[#BAE6FD] text-[#0284C7] font-mono text-[9px] sm:text-[9.5px] font-bold">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Lab Standard Environment Footer Badge */}
                      {currentStage.hardwareEnvironment && (
                        <div className="mt-2 pt-1.5 border-t border-black/6">
                          <div className="px-2 py-1 rounded-md bg-[#F0F9FF] border border-[#BAE6FD] flex items-center gap-1.5 min-w-0">
                            <Cpu className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
                            <span className="font-mono text-[9px] sm:text-[9.5px] uppercase font-bold text-[#0284C7] shrink-0">Standard:</span>
                            <span className="font-sans text-[10.5px] sm:text-[11px] font-bold text-[#0369A1] truncate">
                              {currentStage.hardwareEnvironment.replace(/^Standard:\s*/, '')}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ─── Right Photo Column ─── */}
            <div
              ref={imageAreaRef}
              className="hidden lg:flex w-[260px] lg:w-[290px] xl:w-[320px] shrink-0 items-stretch h-full pb-0.5"
            >
              <div className="relative w-full h-full min-h-[360px] lg:min-h-[400px] rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs group bg-slate-900 flex flex-col justify-between">
                <img
                  src={meta.image}
                  alt={`${currentStage.gradeLabel} hardware and curriculum session`}
                  className="absolute inset-0 w-full h-full object-cover object-center filter saturate-[0.92] contrast-[1.04] group-hover:scale-104 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Corner Branding Tag */}
                <div className="relative z-10 m-3 self-end bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-black/10 shadow-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
                  <span className="font-mono text-[9px] font-bold text-[#0F172A] uppercase tracking-wider">
                    {currentStage.gradeLabel}
                  </span>
                </div>

                {/* Bottom Overlay Title */}
                <div className="relative z-10 p-3.5 sm:p-4 text-white">
                  <span className="font-mono text-[8.5px] uppercase tracking-wider block opacity-95 text-[#FDBA74] font-bold mb-0.5">
                    Hands-On Student Platform
                  </span>
                  <span className="font-serif text-[14px] sm:text-[15px] font-bold leading-tight text-white block">
                    {currentStage.termProject || currentStage.title}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* ─── Bottom Trailing Bar (Matching Section 02) ─── */}
          <div className="editorial-reveal flex-none pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2.5">
            {/* 3 Structured Metric Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-[10.5px] sm:text-[11px] font-sans font-medium text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
                <span className="font-bold text-[#0F172A]">Grade 3–12</span> Spiral Engineering Pathway
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-[10.5px] sm:text-[11px] font-sans font-medium text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                <span className="font-bold text-[#0F172A]">7 Milestone</span> Hardware Capstones
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-[10.5px] sm:text-[11px] font-sans font-medium text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                <span className="font-bold text-[#0F172A]">100% Tangible</span> Portfolio Defense
              </div>
            </div>

            {/* Next Action Button */}
            <button
              type="button"
              onClick={() => {
                if (activeStageIndex < allStages.length - 1) {
                  setActiveStageIndex(activeStageIndex + 1);
                } else {
                  window.dispatchEvent(new CustomEvent('go-to-slide', { detail: 6 }));
                }
              }}
              className="group inline-flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-[#0F172A] hover:text-[#EA580C] transition-colors ml-auto shrink-0 cursor-pointer pt-1 sm:pt-0"
            >
              <span>{activeStageIndex < allStages.length - 1 ? `Next Grade: ${allStages[activeStageIndex + 1].gradeLabel}` : 'Discover Student Showcase'}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#EA580C]" />
            </button>
          </div>

        </div>
      </div>
    </ChapterShell>
  );
};

export default CurriculumSection;
