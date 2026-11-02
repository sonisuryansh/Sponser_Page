import React from 'react';
import { StackingGradeCards } from '../components/StackingGradeCards';

export const GradePathSection: React.FC = () => {
  return (
    <section
      id="slide-10"
      data-slide-index="9"
      className="w-full relative z-10 border-b border-[#203744]/10 bg-[#DFE6E7] tech-subtle-grid"
    >
      <StackingGradeCards />
    </section>
  );
};

export default GradePathSection;
