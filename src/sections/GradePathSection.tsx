import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GradePathVisualizer } from '../components/GradePathVisualizer';
import { GRADE_LEVELS } from '../data/slidesData';

gsap.registerPlugin(ScrollTrigger);

export const GradePathSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedGradeIndex, setSelectedGradeIndex] = useState<number>(0);

  // Scroll Lock (Pin): locks the section in viewport so scrolling cycles through grades without flying past
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        id: 'grade-path-pin',
        trigger: container,
        start: 'top top',
        end: '+=1200',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const targetIndex = Math.min(
            GRADE_LEVELS.length - 1,
            Math.floor(self.progress * GRADE_LEVELS.length)
          );
          setSelectedGradeIndex(targetIndex);
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="slide-10"
      data-slide-index="9"
      ref={containerRef}
      className="min-h-screen lg:h-screen lg:max-h-screen relative flex flex-col justify-center py-6 sm:py-8 px-4 sm:px-8 lg:px-12 xl:px-16 border-b border-[#203744]/10 bg-[#DFE6E7] tech-subtle-grid overflow-hidden"
    >
      <div className="max-w-[1560px] 2xl:max-w-[1680px] mx-auto w-full my-auto flex flex-col justify-center">
        
        {/* Clean, Uncluttered Header */}
        <div className="pb-3 mb-4 border-b border-[#203744]/10">
          <h2 className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] font-normal text-[#203744] tracking-tight leading-tight">
            Grade-Wise Technology{' '}
            <span className="text-[#286D8B] font-bold italic">Learning Path</span>
          </h2>
          <p className="font-sans-modern text-xs sm:text-[13.5px] text-[#203744]/80 mt-1 max-w-2xl font-normal leading-relaxed">
            Multi-year progression guiding students from foundational logic to autonomous robotics and AI.
          </p>
        </div>

        {/* Clean Interactive Grade Path Visualizer */}
        <GradePathVisualizer
          selectedIndex={selectedGradeIndex}
          onSelectIndex={setSelectedGradeIndex}
        />

      </div>
    </section>
  );
};
