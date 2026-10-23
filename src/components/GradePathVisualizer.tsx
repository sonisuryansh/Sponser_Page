import React from 'react';
import { GRADE_LEVELS } from '../data/slidesData';

const GRADE_METADATA = [
  { phase: 'Foundations' },
  { phase: 'Syntax & Text Code' },
  { phase: 'Control Loops' },
  { phase: 'Connected IoT' },
  { phase: 'Data Science' },
  { phase: 'Applied AI' },
  { phase: 'Capstone Engineering' },
];

const GRADE_GROUPS = [
  { title: 'Middle School', range: 'Grades 5-8', start: 0, end: 3 },
  { title: 'High School', range: 'Grades 9-12', start: 3, end: GRADE_LEVELS.length },
];

const formatGrade = (grade: string) => grade.replace(/^Grades?\s*/i, 'Gr. ');

export const GradePathVisualizer: React.FC = () => (
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 items-stretch">
    {GRADE_GROUPS.map((group) => (
      <section key={group.title} className="min-w-0 rounded-2xl border border-[#203744]/12 bg-white/95 p-2.5 sm:p-3 shadow-md">
        <header className="flex items-center justify-between gap-3 pb-2 mb-2.5 border-b border-[#203744]/10">
          <h3 className="font-serif-editorial text-lg sm:text-xl font-bold text-[#203744]">{group.title}</h3>
          <span className="font-mono-tech text-[9px] uppercase tracking-wide text-[#286D8B]">{group.range}</span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {GRADE_LEVELS.slice(group.start, group.end).map((level, offset) => {
            const meta = GRADE_METADATA[group.start + offset];
            return (
              <article key={level.grade} className="min-w-0 rounded-xl border border-[#203744]/10 bg-[#F7F9F9] p-3 sm:p-3.5 flex flex-col">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-mono-tech text-[11px] font-bold text-[#286D8B]">{formatGrade(level.grade)}</span>
                  <span className="font-mono-tech text-[9px] sm:text-[10px] uppercase text-[#203744]/55 text-right">{meta.phase}</span>
                </div>
                <h4 className="font-serif-editorial text-base sm:text-lg font-bold text-[#203744] leading-tight">{level.stage}</h4>
                <p className="font-sans-modern text-xs sm:text-[13px] text-[#203744]/75 leading-relaxed mt-1.5">{level.focus}</p>
                <ul className="mt-2.5 grid grid-cols-2 gap-x-2 gap-y-1.5">
                  {level.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-1.5 font-sans-modern text-[10px] sm:text-[11px] text-[#203744]/80 leading-snug">
                      <span aria-hidden="true" className="mt-1.5 w-1 h-1 rounded-full bg-[#286D8B] shrink-0" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>
    ))}
  </div>
);
