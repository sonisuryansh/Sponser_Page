import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ResponsibilityMatrix } from '../components/ResponsibilityMatrix';

gsap.registerPlugin(ScrollTrigger);

export const ResponsibilitiesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="slide-13"
      data-slide-index="12"
      ref={sectionRef}
      className="w-full min-h-screen relative z-10 flex flex-col justify-center py-10 sm:py-12 lg:py-14 px-4 sm:px-8 lg:px-12 xl:px-16 border-b border-[#203744]/10 bg-[#DFE6E7] tech-subtle-grid"
    >
      <div className="max-w-[1560px] 2xl:max-w-[1680px] mx-auto w-full lg:my-auto">
        {/* Parallel Header Row */}
        <div className="pb-2 mb-3 sm:mb-4 border-b border-[#203744]/10 text-center">
          <h2 className="font-serif-editorial text-2xl sm:text-3xl lg:text-[34px] xl:text-[36px] font-normal text-[#203744] tracking-tight leading-tight">
            School Requirements &amp;{' '}
            <span className="text-[#286D8B] font-bold italic">Delivery Responsibilities</span>
          </h2>
          <p className="font-sans-modern text-xs sm:text-sm text-[#203744]/80 max-w-2xl mx-auto mt-1 font-normal leading-relaxed">
            Transparent division of infrastructure, equipment, and teaching commitments for seamless operations.
          </p>
        </div>

        {/* Responsibility Matrix Component */}
        <ResponsibilityMatrix />

      </div>
    </section>
  );
};

export default ResponsibilitiesSection;
