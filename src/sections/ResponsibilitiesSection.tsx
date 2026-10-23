import React from 'react';
import { ResponsibilityMatrix } from '../components/ResponsibilityMatrix';

export const ResponsibilitiesSection: React.FC = () => {
  return (
    <section
      id="slide-13"
      data-slide-index="12"
      className="w-full min-h-screen relative flex flex-col justify-center py-16 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 border-b border-[#203744]/10 bg-gradient-to-b from-[#DFE6E7] to-[#D5E2E5]/50 tech-subtle-grid"
    >
      <div className="max-w-[1560px] 2xl:max-w-[1680px] mx-auto w-full my-auto flex flex-col justify-center">
        
        {/* Parallel Header Row */}
        <div className="pb-4 mb-6 sm:mb-8 border-b border-[#203744]/10">
          <h2 className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] font-normal text-[#203744] tracking-tight leading-tight">
            School Requirements &{' '}
            <span className="text-[#286D8B] font-bold italic">Delivery Responsibilities</span>
          </h2>
          <p className="font-sans-modern text-xs sm:text-[14px] text-[#203744]/80 max-w-2xl mt-1.5 font-normal leading-normal">
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
