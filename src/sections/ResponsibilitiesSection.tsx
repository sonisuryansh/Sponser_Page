import React from 'react';
import { ResponsibilityMatrix } from '../components/ResponsibilityMatrix';

export const ResponsibilitiesSection: React.FC = () => {
  return (
    <section
      id="slide-13"
      data-slide-index="12"
      className="w-full relative z-10 py-8 sm:py-10 lg:py-12 px-4 sm:px-8 lg:px-12 xl:px-16 border-b border-[#203744]/10 bg-gradient-to-b from-[#DFE6E7] to-[#D5E2E5]/50 tech-subtle-grid"
    >
      <div className="max-w-[1560px] 2xl:max-w-[1680px] mx-auto w-full">
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
