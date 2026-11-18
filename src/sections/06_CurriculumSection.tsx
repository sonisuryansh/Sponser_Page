import React, { useState } from 'react';
import { siteConfig } from '../config/content.config';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const CurriculumSection: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  // Combine stages based on toggle
  const allStages = [
    ...siteConfig.curriculum.stages,
    ...(siteConfig.showBeyondGrade10 ? siteConfig.curriculum.beyondGrade10 : []),
  ];

  const currentStage = allStages[activeStageIndex];

  return (
    <section
      id="curriculum"
      data-chapter="06"
      className="relative w-full min-h-screen py-24 md:py-32 flex flex-col justify-between bg-[#f8fafb] text-[#111111] select-none snap-start"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full flex-1 flex flex-col justify-between">
        {/* Section Header */}
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-3">
            {siteConfig.curriculum.eyebrow}
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <h2 className="font-serif text-[clamp(32px,3.8vw,52px)] font-normal leading-[1.15] tracking-tight text-[#111111] max-w-2xl">
              {siteConfig.curriculum.headline}
            </h2>
            <p className="text-xs uppercase tracking-wider text-[#5b5b5b] font-mono">
              {siteConfig.curriculum.subnote}
            </p>
          </div>

          {/* Thin Progress Rail (4 -> 10) */}
          <div className="border-t border-b border-black/10 py-3 my-6 flex items-center justify-between overflow-x-auto no-scrollbar gap-2">
            {allStages.map((stage, idx) => {
              const isCurrent = activeStageIndex === idx;
              const isPast = activeStageIndex > idx;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageIndex(idx)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-[2px] transition-all text-xs font-mono uppercase tracking-wider shrink-0 cursor-pointer ${
                    isCurrent
                      ? 'bg-[#111111] text-white font-medium'
                      : isPast
                      ? 'text-[#111111] hover:bg-black/5'
                      : 'text-[#5b5b5b]/60 hover:text-[#111111]'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-[#c8a45d]' : 'bg-current'}`} />
                  <span>{stage.gradeLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Card (Approx 80% viewport card feel, clean typography) */}
        <div className="my-auto py-6">
          <div className="relative w-full max-w-4xl mx-auto bg-white border border-black/10 p-8 sm:p-12 md:p-14 rounded-[2px] shadow-sm transition-all duration-300">
            {/* Top Grade Meta */}
            <div className="flex items-center justify-between border-b border-black/10 pb-6 mb-8">
              <span className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-mono">
                Stage 0{activeStageIndex + 1} of {allStages.length}
              </span>
              <span className="text-sm uppercase tracking-widest font-mono text-[#5b5b5b]">
                {currentStage.gradeLabel}
              </span>
            </div>

            {/* Stage Title and Large Focus Line */}
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#111111] mb-6">
              {currentStage.title}
            </h3>

            <p className="text-lg sm:text-xl md:text-2xl text-[#5b5b5b] font-normal leading-relaxed max-w-3xl mb-10">
              {currentStage.focus}
            </p>

            {/* Up to 3 Short Chips */}
            <div className="flex flex-wrap items-center gap-2.5 pt-6 border-t border-black/10">
              {currentStage.chips.map((chip) => (
                <span
                  key={chip}
                  className="px-3 py-1.5 bg-[#f0f4f6] text-[#111111] text-xs font-mono uppercase tracking-wider rounded-[2px] border border-black/5"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Presenter Stage Controls (Next / Prev) */}
        <div className="flex items-center justify-between border-t border-black/10 pt-6 text-xs text-[#5b5b5b]">
          <span className="font-mono">
            Grades 4 through 10 Structured Pathway
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveStageIndex((prev) => Math.max(0, prev - 1))}
              disabled={activeStageIndex === 0}
              className="flex items-center gap-1 px-3 py-1.5 border border-black/15 text-[#111111] disabled:opacity-30 rounded-[2px] hover:border-black transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous Grade</span>
            </button>
            <button
              onClick={() => setActiveStageIndex((prev) => Math.min(allStages.length - 1, prev + 1))}
              disabled={activeStageIndex === allStages.length - 1}
              className="flex items-center gap-1 px-3 py-1.5 border border-black/15 text-[#111111] disabled:opacity-30 rounded-[2px] hover:border-black transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <span>Next Grade</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
