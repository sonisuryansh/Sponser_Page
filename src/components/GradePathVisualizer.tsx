import React from 'react';
import { GRADE_LEVELS } from '../data/slidesData';

const GRADE_GROUPS = [
  { title: 'Middle School', range: 'Grades 5-8', start: 0, end: 3 },
  { title: 'High School', range: 'Grades 9-12', start: 3, end: GRADE_LEVELS.length },
];

const formatGrade = (grade: string) => grade.replace(/^Grades?\s*/i, 'Gr. ');

export const GradePathVisualizer: React.FC = () => (
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 items-stretch">
    {GRADE_GROUPS.map((group) => (
      <section key={group.title} className="min-w-0 rounded-2xl border border-[#203744]/12 bg-white/95 p-2.5 sm:p-3 shadow-md">
        <header className="flex items-center justify-between gap-3 pb-2.5 mb-2 border-b border-[#203744]/10">
          <h3 className="font-serif-editorial text-xl sm:text-2xl font-bold text-[#203744]">{group.title}</h3>
          <span className="font-mono-tech text-[10px] sm:text-xs uppercase tracking-wide text-[#286D8B]">{group.range}</span>
        </header>

        <div className={group.title === 'Middle School' ? 'divide-y divide-[#203744]/10' : 'grid grid-cols-1 md:grid-cols-2 gap-2'}>
          {GRADE_LEVELS.slice(group.start, group.end).map((level) => (
            <article
              key={level.grade}
              className={group.title === 'Middle School'
                ? 'grid grid-cols-[4.5rem_minmax(0,1fr)] sm:grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-x-3 py-3.5 first:pt-1 last:pb-1'
                : 'min-w-0 rounded-xl border border-[#203744]/10 bg-[#F7F9F9] p-3.5 sm:p-4 flex flex-col justify-center min-h-[132px]'}
            >
              <span className={group.title === 'Middle School'
                ? 'row-span-2 font-mono-tech text-sm sm:text-base font-bold text-[#286D8B]'
                : 'font-mono-tech text-[11px] sm:text-xs font-bold text-[#286D8B] mb-1.5'}>
                {formatGrade(level.grade)}
              </span>
              <h4 className="font-serif-editorial text-lg sm:text-xl font-bold text-[#203744] leading-tight">{level.stage}</h4>
              <p className={group.title === 'Middle School'
                ? 'font-sans-modern text-sm sm:text-base text-[#203744]/75 leading-relaxed mt-1'
                : 'font-sans-modern text-sm sm:text-[15px] text-[#203744]/75 leading-relaxed mt-1.5'}>
                {level.focus}
              </p>
            </article>
          ))}
        </div>
      </section>
    ))}
  </div>
);
