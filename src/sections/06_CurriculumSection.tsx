import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const CurriculumSection: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsStackRef = useRef<HTMLDivElement>(null);

  const allStages = [
    ...siteConfig.curriculum.stages,
    ...(siteConfig.showBeyondGrade10 ? siteConfig.curriculum.beyondGrade10 : []),
  ];

  // GSAP Pin + Scrub: Each card slides up and covers previous as user scrolls
  useEffect(() => {
    const el = containerRef.current;
    const stack = cardsStackRef.current;
    if (!el || !stack) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    if (prefersReducedMotion || isMobile || !document.documentElement.classList.contains('js-motion')) {
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: `+=${allStages.length * 75}%`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.min(allStages.length - 1, Math.floor(self.progress * allStages.length));
          setActiveStageIndex(idx);
        },
      });
    });

    return () => ctx.revert();
  }, [allStages.length]);

  const currentStage = allStages[activeStageIndex];

  return (
    <ChapterShell id="curriculum" chapterNumber="06" theme="dark">
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

        {/* Active Stacking Card (~80% viewport width feel, large grade number) */}
        <div ref={cardsStackRef} className="my-auto py-2">
          <div className="stack-grade-card relative w-full max-w-3xl mx-auto bg-[#121822] border border-white/15 p-6 sm:p-10 rounded-[2px] shadow-2xl transition-all duration-300">
            {/* Top Grade Meta */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-mono">
                Stage 0{activeStageIndex + 1} of {allStages.length}
              </span>
              <span className="text-base uppercase tracking-widest font-mono text-white/80 font-bold">
                {currentStage.gradeLabel}
              </span>
            </div>

            {/* Stage Title and Large Focus Line */}
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-white mb-4">
              {currentStage.title}
            </h3>

            <p className="text-base sm:text-lg md:text-xl text-white/70 font-normal leading-relaxed max-w-2xl mb-8">
              {currentStage.focus}
            </p>

            {/* Up to 3 Short Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/10">
              {currentStage.chips.map((chip) => (
                <span
                  key={chip}
                  className="px-3 py-1 bg-white/5 text-white/90 text-xs font-mono uppercase tracking-wider rounded-[2px] border border-white/10"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Presenter Grade Navigation */}
        <div className="flex items-center justify-end border-t border-white/10 pt-4 text-xs text-white/50">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveStageIndex((prev) => Math.max(0, prev - 1))}
              disabled={activeStageIndex === 0}
              className="flex items-center gap-1 px-3 py-1 border border-white/20 text-white disabled:opacity-30 rounded-[2px] hover:border-white transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
            <button
              onClick={() => setActiveStageIndex((prev) => Math.min(allStages.length - 1, prev + 1))}
              disabled={activeStageIndex === allStages.length - 1}
              className="flex items-center gap-1 px-3 py-1 border border-white/20 text-white disabled:opacity-30 rounded-[2px] hover:border-white transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </ChapterShell>
  );
};
