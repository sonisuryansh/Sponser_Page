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
];

export const CurriculumSection: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isSectionActive, setIsSectionActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const contentAreaRef = useRef<HTMLDivElement>(null);
  const imageAreaRef = useRef<HTMLDivElement>(null);

  const allStages = [
    ...siteConfig.curriculum.stages,
    ...(siteConfig.showBeyondGrade10 ? siteConfig.curriculum.beyondGrade10 : []),
  ];

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

  // Automatically cycle through grades 1 to 6 while staying on this section
  useEffect(() => {
    if (!isSectionActive || isHovered || allStages.length <= 1) return;

    const timer = setInterval(() => {
      setActiveStageIndex((prev) => (prev + 1) % allStages.length);
    }, 3200);

    return () => clearInterval(timer);
  }, [isSectionActive, isHovered, allStages.length]);

  // Listen to step navigation events (wheel scroll & arrow keys)
  useEffect(() => {
    const handleStep = (e: Event) => {
      const el = contentAreaRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top >= -window.innerHeight * 0.5 && rect.bottom <= window.innerHeight * 1.5;
      if (!isVisible) return;

      const customEvent = e as CustomEvent<{ direction: number }>;
      const dir = customEvent.detail?.direction || 1;

      if (dir > 0 && activeStageIndex < allStages.length - 1) {
        e.preventDefault();
        setActiveStageIndex((s) => s + 1);
      } else if (dir < 0 && activeStageIndex > 0) {
        e.preventDefault();
        setActiveStageIndex((s) => s - 1);
      }
    };

    window.addEventListener('medhaarc:step', handleStep);
    return () => window.removeEventListener('medhaarc:step', handleStep);
  }, [activeStageIndex, allStages.length]);

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
      <div className="relative w-full h-full min-h-full flex-1 flex flex-col justify-center items-center pt-[calc(var(--header-h,64px)+10px)] pb-6 px-4 sm:px-6 lg:px-8 box-border select-none z-10">
        
        {/* Main Split Container - Standardized 1240px */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full my-auto h-[390px] sm:h-[405px] lg:h-[420px] max-h-[calc(100svh-120px)] max-w-[1240px] bg-white border border-black/10 shadow-[0_15px_45px_rgba(0,0,0,0.04)] flex items-stretch overflow-hidden"
        >
          
          {/* Left Vertical Numbering Rail */}
          <div className="w-14 sm:w-16 lg:w-20 border-r border-black/10 bg-[#FAF9F6] flex flex-col justify-between py-4 lg:py-5 select-none shrink-0">
            {/* Top Indicator */}
            <div className="px-3 sm:px-4">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#888888] font-semibold block mb-3 sm:mb-4">
                GRADES
              </span>

              {/* Number Buttons List */}
              <div className="flex flex-col gap-2.5 sm:gap-3">
                {allStages.map((stage, idx) => {
                  const isActive = activeStageIndex === idx;

                  return (
                    <button
                      key={stage.id}
                      onClick={() => setActiveStageIndex(idx)}
                      className={`group relative flex items-center justify-between text-left cursor-pointer transition-colors focus:outline-none ${
                        isActive ? 'text-[#c8a45d]' : 'text-[#888888] hover:text-[#111111]'
                      }`}
                      aria-label={`Go to ${stage.gradeLabel}`}
                    >
                      <span className="font-mono text-xs sm:text-sm lg:text-[15px] font-semibold tracking-wider">
                        0{idx + 1}
                      </span>
                      {isActive && (
                        <span
                          className="w-[3px] h-4 bg-[#c8a45d] rounded-l absolute -right-3 sm:-right-4"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Rail Label */}
            <div className="px-3 sm:px-4 pt-3 border-t border-black/5">
              <span className="font-mono text-[8.5px] uppercase tracking-widest text-[#888888] font-bold block">
                ROADMAP
              </span>
            </div>
          </div>

          {/* Middle Content Area (Stage Details) */}
          <div
            ref={contentAreaRef}
            className="flex-1 flex flex-col justify-between p-5 sm:p-6 lg:p-7 overflow-hidden bg-white"
          >
            {/* Top Section Eyebrow, Grade Badge & Stage Title */}
            <div>
              <div className="stage-anim flex items-center justify-between gap-3 mb-1.5">
                <span className="font-mono text-[10px] sm:text-[10.5px] uppercase tracking-[0.22em] text-[#c8a45d] font-bold">
                  {siteConfig.curriculum.eyebrow}
                </span>
                <span className="px-2 py-0.5 rounded-[2px] bg-[#c8a45d]/10 border border-[#c8a45d]/40 text-[#8c6b24] font-mono text-[10.5px] font-semibold tracking-wider">
                  {currentStage.gradeLabel}
                </span>
              </div>

              {/* Stage Title */}
              <h2 className="stage-anim font-serif text-xl sm:text-2xl lg:text-[28px] font-medium text-[#111111] leading-[1.15] tracking-tight mb-2">
                {currentStage.title}
              </h2>

              {/* Focus Description */}
              <p className="stage-anim font-sans text-xs sm:text-[12.5px] text-[#555555] leading-normal max-w-xl mb-2.5 font-normal">
                {currentStage.focus}
              </p>

              {/* Chips / Topics */}
              <div className="stage-anim flex flex-wrap gap-1.5 sm:gap-2 pt-1.5 border-t border-black/10">
                {currentStage.chips.map((chip) => (
                  <div
                    key={chip}
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[2px] bg-[#FAF9F6] border border-black/10 font-sans text-[10.5px] text-[#222222]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8a45d]" />
                    <span>{chip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Metadata Strip */}
            <div className="stage-anim pt-3 mt-auto border-t border-black/10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#888888] block mb-1">
                    STAGE
                  </span>
                  <span className="font-sans text-[12px] font-semibold text-[#111111]">
                    Stage 0{activeStageIndex + 1} ({currentStage.gradeLabel})
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#888888] block mb-1">
                    FOUNDATION
                  </span>
                  <span className="font-sans text-[12px] font-semibold text-[#111111]">
                    {currentStage.chips[0] || 'Core Engineering'}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#888888] block mb-1">
                    MILESTONE
                  </span>
                  <span className="font-sans text-[12px] font-semibold text-[#111111]">
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
