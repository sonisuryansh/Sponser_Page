import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

const stageImages = [
  '/assets/stage_grade_01.webp',
  '/assets/stage_grade_02.webp',
  '/assets/stage_grade_03.webp',
  '/assets/stage_grade_04.webp',
  '/assets/stage_grade_05.webp',
  '/assets/stage_grade_06.webp',
  '/assets/stage_grade_06.webp',
];

export const CurriculumSection: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isSectionActive, setIsSectionActive] = useState(false);
  const steppableRef = useRef<HTMLDivElement>(null);
  const activeStageIndexRef = useRef(activeStageIndex);
  const contentAreaRef = useRef<HTMLDivElement>(null);
  const imageAreaRef = useRef<HTMLDivElement>(null);

  const allStages = [
    ...siteConfig.curriculum.stages,
    ...(siteConfig.showBeyondGrade10 ? siteConfig.curriculum.beyondGrade10 : []),
  ];

  useEffect(() => {
    activeStageIndexRef.current = activeStageIndex;
  }, [activeStageIndex]);

  // Detect whether Section 06 is currently visible and active in viewport
  useEffect(() => {
    const el = contentAreaRef.current;
    if (!el) return;

    const checkActive = () => {
      const slideWrapper = el.closest<HTMLElement>('.slide-item');
      if (slideWrapper) {
        const visible = slideWrapper.style.visibility === 'visible' && slideWrapper.style.opacity !== '0';
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
        // Forward scroll (down): step forward through grades (0 -> 1 -> 2 -> 3 -> 4 -> 5)
        if (cur < allStages.length - 1) {
          e.preventDefault();
          setActiveStageIndex(cur + 1);
        }
        // At the last grade (Grade 10), e.preventDefault() is NOT called,
        // so SlideTransitions naturally proceeds to Slide 07!
      } else if (dir < 0) {
        // Reverse scroll (up): step backward through grades (5 -> 4 -> 3 -> 2 -> 1 -> 0)
        if (cur > 0) {
          e.preventDefault();
          setActiveStageIndex(cur - 1);
        }
        // At the first grade (Grade 4), e.preventDefault() is NOT called,
        // so SlideTransitions naturally returns to Slide 05!
      }
    };

    const handleEnter = (e: Event) => {
      const customEvent = e as CustomEvent<{ direction: number }>;
      const dir = customEvent.detail?.direction || 1;
      if (dir > 0) {
        // Entering going forward (from slide 05) -> start at first grade (Grade 4)
        setActiveStageIndex(0);
      } else {
        // Entering going backward (from slide 07) -> start at last grade (Grade 10)
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
        { opacity: 0.2, y: 14 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
      );
    }
    if (imageAreaRef.current) {
      gsap.fromTo(
        imageAreaRef.current,
        { opacity: 0.4, scale: 1.02 },
        { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' }
      );
    }
  }, [activeStageIndex]);

  const currentStage = allStages[activeStageIndex];
  const activeImage = stageImages[activeStageIndex] || stageImages[0];

  const handlePrev = () => {
    setActiveStageIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveStageIndex((prev) => Math.min(allStages.length - 1, prev + 1));
  };

  return (
    <ChapterShell
      id="curriculum"
      chapterNumber="06"
      theme="light"
      fullBleed={true}
      className="relative w-full h-[100svh] overflow-hidden bg-[#FAF6EE]"
    >
      {/* Main Viewport Container */}
      <div
        ref={steppableRef}
        data-steppable="true"
        className="relative w-full h-full min-h-full flex-1 flex flex-col justify-center items-center pt-[calc(var(--header-h,64px)+10px)] pb-6 px-4 sm:px-6 lg:px-8 box-border select-none z-10"
      >

        {/* Main Split Container - Standardized 1240px & Scaled to Match Other Section Cards */}
        <div className="relative w-full my-auto h-[460px] sm:h-[490px] lg:h-[515px] xl:h-[525px] max-h-[calc(100svh-115px)] max-w-[1240px] bg-white border border-black/10 shadow-[0_18px_50px_rgba(0,0,0,0.05)] flex items-stretch overflow-hidden rounded-[4px]">

          {/* Left Vertical Numbering Rail */}
          <div className="w-24 sm:w-28 lg:w-[124px] border-r border-black/10 bg-[#FAF9F6] flex flex-col justify-between py-5 lg:py-6 select-none shrink-0">
            {/* Top Indicator */}
            <div className="px-2.5 sm:px-3">
              <span className="font-mono text-[9px] sm:text-[9.5px] uppercase tracking-widest text-[#888888] font-semibold block mb-3.5 sm:mb-4 px-1">
                GRADES
              </span>

              {/* Grade Buttons List */}
              <div className="flex flex-col gap-2 sm:gap-2.5 lg:gap-3">
                {allStages.map((stage, idx) => {
                  const isActive = activeStageIndex === idx;
                  const displayGrade = stage.gradeLabel;

                  return (
                    <button
                      key={stage.id}
                      onClick={() => setActiveStageIndex(idx)}
                      className={`group relative flex items-center justify-between text-left cursor-pointer transition-colors focus:outline-none px-2 sm:px-2.5 py-1 rounded-[2px] ${
                        isActive
                          ? 'text-[#c8a45d] bg-[#c8a45d]/10 font-bold'
                          : 'text-[#666666] hover:text-[#111111] hover:bg-black/[0.03]'
                      }`}
                      aria-label={`Go to ${stage.gradeLabel}`}
                    >
                      <span className="font-mono text-[11px] sm:text-[11.5px] lg:text-[12.5px] tracking-wide whitespace-nowrap">
                        {displayGrade}
                      </span>
                      {isActive && (
                        <span
                          className="w-[3px] h-full bg-[#c8a45d] rounded-l absolute right-0 top-0"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Rail Label */}
            <div className="px-3.5 pt-3.5 border-t border-black/5">
              <span className="font-mono text-[8.5px] sm:text-[9px] uppercase tracking-widest text-[#888888] font-bold block">
                ROADMAP
              </span>
            </div>
          </div>

          {/* Middle Content Area (Stage Details) */}
          <div
            ref={contentAreaRef}
            className="flex-1 flex flex-col justify-between p-6 sm:p-7 lg:p-8 overflow-hidden bg-white"
          >
            {/* Top Section Eyebrow, Grade Badge & Stage Title */}
            <div>
              <div className="stage-anim flex items-center justify-between gap-3 mb-2">
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#c8a45d] font-bold">
                  {siteConfig.curriculum.eyebrow}
                </span>
                <span className="px-2.5 py-0.5 rounded-[2px] bg-[#c8a45d]/10 border border-[#c8a45d]/40 text-[#8c6b24] font-mono text-[10.5px] sm:text-[11px] font-semibold tracking-wider">
                  {currentStage.gradeLabel}
                </span>
              </div>

              {/* Stage Title */}
              <h2 className="stage-anim font-serif text-2xl sm:text-[28px] lg:text-[32px] xl:text-[34px] font-medium text-[#111111] leading-[1.15] tracking-tight mb-2.5">
                {currentStage.title}
              </h2>

              {/* Focus Description */}
              <p className="stage-anim font-sans text-xs sm:text-[13px] text-[#555555] leading-relaxed max-w-xl mb-3 sm:mb-3.5 font-normal">
                {currentStage.focus}
              </p>

              {/* Chips / Topics */}
              <div className="stage-anim flex flex-wrap gap-2 sm:gap-2.5 pt-2 border-t border-black/10">
                {currentStage.chips.map((chip) => (
                  <div
                    key={chip}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-[#FAF9F6] border border-black/10 font-sans text-[11px] sm:text-[11.5px] text-[#222222]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8a45d]" />
                    <span>{chip}</span>
                  </div>
                ))}
              </div>

              {/* Learning Outcome / 1-2 Line Description */}
              {currentStage.outcome && (
                <div className="stage-anim mt-3.5 pt-3 border-t border-black/8">
                  <span className="font-mono text-[9px] sm:text-[9.5px] uppercase tracking-wider text-[#c8a45d] font-bold block mb-1">
                    LEARNING OUTCOME
                  </span>
                  <p className="font-sans text-xs sm:text-[13px] text-[#555555] leading-relaxed max-w-xl font-normal">
                    {currentStage.outcome}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Metadata Strip */}
            <div className="stage-anim pt-3.5 mt-auto border-t border-black/10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <span className="font-mono text-[9px] sm:text-[9.5px] uppercase tracking-widest text-[#888888] block mb-1">
                    STAGE
                  </span>
                  <span className="font-sans text-[12.5px] sm:text-[13px] font-semibold text-[#111111]">
                    Stage 0{activeStageIndex + 1} ({currentStage.gradeLabel})
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[9px] sm:text-[9.5px] uppercase tracking-widest text-[#888888] block mb-1">
                    FOUNDATION
                  </span>
                  <span className="font-sans text-[12.5px] sm:text-[13px] font-semibold text-[#111111]">
                    {currentStage.chips[0] || 'Core Engineering'}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[9px] sm:text-[9.5px] uppercase tracking-widest text-[#888888] block mb-1">
                    MILESTONE
                  </span>
                  <span className="font-sans text-[12.5px] sm:text-[13px] font-semibold text-[#111111]">
                    {currentStage.chips[currentStage.chips.length - 1] || 'Hands-on Build'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Showcase Panel with < | > Top-Right Controls (Exact Image 2 Style) */}
          <div className="hidden md:block w-[42%] lg:w-[46%] xl:w-[48%] relative overflow-hidden bg-[#FAF9F6] shrink-0 self-stretch">
            {/* Stage Showcase Photograph */}
            <div ref={imageAreaRef} className="absolute inset-0 w-full h-full">
              <img
                src={activeImage}
                alt={currentStage.title}
                className="w-full h-full object-cover object-center filter saturate-[0.85] contrast-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10 pointer-events-none" />
            </div>

            {/* Top-Right Arrow Navigation Controls (< | >) */}
            <div className="absolute top-0 right-0 bg-black/85 text-white flex items-center px-4 py-2.5 gap-4 z-20 shadow-md">
              <button
                onClick={handlePrev}
                disabled={activeStageIndex === 0}
                className="text-white/70 hover:text-white disabled:opacity-30 cursor-pointer transition-colors focus:outline-none"
                aria-label="Previous grade"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="w-px h-3.5 bg-white/20" />
              <button
                onClick={handleNext}
                disabled={activeStageIndex === allStages.length - 1}
                className="text-white/70 hover:text-white disabled:opacity-30 cursor-pointer transition-colors focus:outline-none"
                aria-label="Next grade"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </ChapterShell>
  );
};

export default CurriculumSection;
