import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

export const CurriculumSection: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const allStages = [
    ...siteConfig.curriculum.stages,
    ...(siteConfig.showBeyondGrade10 ? siteConfig.curriculum.beyondGrade10 : []),
  ];

  // Listen to step navigation events (wheel scroll & arrow keys)
  useEffect(() => {
    const handleStep = (e: Event) => {
      const el = containerRef.current;
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

  // Gentle card transition when stage changes
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0.3, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    }
  }, [activeStageIndex]);

  const currentStage = allStages[activeStageIndex];

  return (
    <ChapterShell id="curriculum" chapterNumber="06" theme="dark" steps={allStages.length}>
      <div ref={containerRef} className="w-full flex-1 flex flex-col justify-between py-2 select-none">
        {/* Section Header */}
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-1.5">
            {siteConfig.curriculum.eyebrow}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4">
            <h2 className="font-serif text-[clamp(26px,3.5vw,46px)] font-normal leading-[1.14] tracking-tight text-white max-w-2xl">
              {siteConfig.curriculum.headline}
            </h2>
            <p className="text-[11px] uppercase tracking-wider text-white/50 font-mono">
              {siteConfig.curriculum.subnote}
            </p>
          </div>

          {/* Thin Progress Rail (4 -> 10) */}
          <div className="border-t border-b border-white/10 py-2.5 my-2 flex items-center justify-between overflow-x-auto no-scrollbar gap-2">
            {allStages.map((stage, idx) => {
              const isCurrent = activeStageIndex === idx;
              const isPast = activeStageIndex > idx;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageIndex(idx)}
                  className={`flex items-center gap-2 px-3 py-1 rounded-[2px] transition-all text-xs font-mono uppercase tracking-wider shrink-0 cursor-pointer ${
                    isCurrent
                      ? 'bg-white text-black font-semibold'
                      : isPast
                      ? 'text-white/80 hover:bg-white/10'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-[#c8a45d]' : 'bg-current'}`} />
                  <span>{stage.gradeLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Card Presentation */}
        <div className="my-auto max-w-4xl mx-auto w-full">
          <div
            ref={cardRef}
            className="p-6 sm:p-8 rounded-[2px] bg-white/[0.04] border border-white/15 backdrop-blur-md relative overflow-hidden"
          >
            {/* Stage Title and Grade Pill */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#c8a45d] block mb-1">
                  STAGE 0{activeStageIndex + 1} OF 0{allStages.length}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                  {currentStage.title}
                </h3>
              </div>
              <span className="inline-block px-3 py-1 rounded-[2px] border border-[#c8a45d]/40 text-[#c8a45d] text-xs font-mono tracking-wider shrink-0">
                {currentStage.gradeLabel}
              </span>
            </div>

            {/* Core Focus Narrative */}
            <p className="text-sm sm:text-base text-white/80 font-sans leading-relaxed mb-6">
              {currentStage.focus}
            </p>

            {/* Chips Grid */}
            <div className="flex flex-wrap gap-2.5 mb-6">
              {currentStage.chips.map((chip) => (
                <div
                  key={chip}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] bg-white/[0.03] border border-white/10 text-xs sm:text-sm text-white/90 font-sans"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8a45d]" />
                  <span>{chip}</span>
                </div>
              ))}
            </div>

            {/* Stage Navigation Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <span className="text-xs text-white/60 font-mono">
                Hands-on practical progression
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveStageIndex((prev) => Math.max(0, prev - 1))}
                  disabled={activeStageIndex === 0}
                  className="p-1 rounded-[2px] text-white/50 hover:text-white disabled:opacity-20 cursor-pointer"
                  aria-label="Previous stage"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveStageIndex((prev) => Math.min(allStages.length - 1, prev + 1))}
                  disabled={activeStageIndex === allStages.length - 1}
                  className="p-1 rounded-[2px] text-white/50 hover:text-white disabled:opacity-20 cursor-pointer"
                  aria-label="Next stage"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stage Index Indicator */}
        <div className="border-t border-white/10 pt-2 flex items-center justify-end text-[11px] font-mono text-white/40">
          <span>{currentStage.gradeLabel} Level Framework</span>
        </div>
      </div>
    </ChapterShell>
  );
};
