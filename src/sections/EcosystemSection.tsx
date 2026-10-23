import React from 'react';
import { EcosystemDiagram } from '../components/EcosystemDiagram';

export const EcosystemSection: React.FC = () => {
  return (
    <section
      id="slide-4"
      data-slide-index="3"
      className="min-h-screen relative flex flex-col justify-center py-20 px-4 sm:px-8 border-b border-[#203744]/10 bg-[#DFE6E7]"
    >
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Headline */}
        <div className="mb-8">
          <h2 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-[#203744] tracking-tight">
            The Technology Ecosystem
          </h2>
          <p className="font-sans-modern text-base sm:text-lg text-[#203744]/75 max-w-3xl mt-2">
            Four primary engineering domains interconnected by Mathematical & Computational Foundations as their unifying supporting base.
          </p>
        </div>

        {/* Interactive Ecosystem Diagram Component */}
        <EcosystemDiagram />

      </div>
    </section>
  );
};
