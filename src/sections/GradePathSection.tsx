import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GradePathVisualizer } from '../components/GradePathVisualizer';

gsap.registerPlugin(ScrollTrigger);

export const GradePathSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const media = gsap.matchMedia();
    media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        ScrollTrigger.create({
          id: 'grade-path-hold-for-emerging-tech',
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.round(window.innerHeight * 1.2)}`,
          pin: section,
          pinSpacing: true,
          anticipatePin: 1,
        });
      }, section);

      return () => context.revert();
    });

    return () => media.revert();
  }, []);

  return (
    <section
      id="slide-10"
      data-slide-index="9"
      ref={sectionRef}
      className="w-full min-h-screen xl:h-screen xl:max-h-screen relative z-10 flex flex-col justify-center py-5 sm:py-6 lg:py-8 px-4 sm:px-8 lg:px-12 xl:px-16 border-b border-[#203744]/10 bg-[#DFE6E7] tech-subtle-grid xl:overflow-hidden"
    >
      <div className="max-w-[1560px] 2xl:max-w-[1680px] mx-auto w-full">
        <div className="pb-3 mb-4 border-b border-[#203744]/10 text-center">
          <h2 className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] font-normal text-[#203744] tracking-tight leading-tight">
            Grade-Wise Technology{' '}
            <span className="text-[#286D8B] font-bold italic">Learning Path</span>
          </h2>
          <p className="font-sans-modern text-sm sm:text-base text-[#203744]/80 mt-1 mx-auto max-w-2xl font-normal leading-relaxed">
            Multi-year progression guiding students from foundational logic to autonomous robotics and AI.
          </p>
        </div>

        <GradePathVisualizer />
      </div>
    </section>
  );
};

export default GradePathSection;
