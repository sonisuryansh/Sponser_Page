import React, { useState } from 'react';
import { ChapterShell } from '../components/ChapterShell';
import { siteConfig } from '../config/content.config';

export const TeacherEmpowermentSection: React.FC = () => {
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const content = siteConfig.teacherEmpowerment;
  const activeTopic = content.workshops[activeTopicIndex] ?? content.workshops[0];

  return (
    <ChapterShell
      id="teacher-empowerment"
      chapterNumber="10"
      theme="light"
      fullBleed={true}
      className="relative min-h-[100svh] w-full overflow-y-auto bg-[#FAF6EE] lg:h-[100svh] lg:overflow-hidden"
    >
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col gap-2.5 sm:gap-3 px-4 pb-3 sm:pb-4 pt-[calc(var(--header-h,64px)+4px)] sm:px-6 lg:h-full lg:min-h-0 lg:overflow-hidden lg:px-8 lg:pb-3.5 xl:px-10">
        <header className="flex-none text-center">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#b45309] sm:text-xs">
            {content.eyebrow}
          </p>
          <h2 className="mt-0.5 font-serif text-xl font-bold leading-tight tracking-tight text-[#0F172A] sm:text-2xl lg:text-[28px]">
            {content.headline}
          </h2>
          <p className="mx-auto mt-1 max-w-2xl font-sans text-xs sm:text-[13px] leading-snug text-slate-600">
            {content.message}
          </p>
        </header>

        <div className="grid flex-1 gap-3 lg:min-h-0 lg:grid-cols-[0.85fr_1.55fr] lg:gap-4 my-0.5">
          <article className="rounded-2xl border border-sky-200 bg-gradient-to-b from-sky-50/50 via-white to-white p-3 sm:p-4 lg:p-3.5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-0.5 rounded-full bg-sky-100 text-[#0284C7] border border-sky-200">
                  {content.students.title}
                </span>
                <span className="font-mono text-[9px] font-bold text-slate-400">
                  TURNKEY
                </span>
              </div>
              <h3 className="font-serif text-base sm:text-lg lg:text-[18px] font-bold text-[#0F172A] leading-tight mb-2">
                {content.students.heading}
              </h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {content.students.details.map((detail) => {
                  const [label, ...rest] = detail.split(': ');
                  return (
                    <li key={detail} className="flex items-start gap-2 text-xs sm:text-[12.5px] leading-snug text-slate-700">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0284C7]" />
                      <span>
                        <strong className="text-slate-900 font-semibold">{label}: </strong>
                        <span className="text-slate-600">{rest.join(': ')}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-2.5 pt-2 border-t border-sky-100 flex flex-wrap items-center gap-1.5">
              {content.students.chips.map((chip) => (
                <span
                  key={chip}
                  className="font-mono text-[8px] sm:text-[8.5px] px-2 py-0.5 rounded-full bg-white text-sky-800 font-semibold border border-sky-200 shadow-2xs"
                >
                  {chip}
                </span>
              ))}
            </div>
          </article>

          <section className="flex min-h-[440px] flex-col rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 lg:p-3.5 shadow-xs lg:min-h-0">
            <p className="flex-none font-sans text-xs sm:text-[13px] leading-snug text-slate-600">
              {content.workshopTiming}
            </p>

            <div className="mt-2.5 grid flex-1 gap-2.5 lg:min-h-0 lg:grid-cols-[minmax(180px,0.8fr)_1.5fr]">
              <div
                role="tablist"
                aria-label="Teacher workshop topics"
                className="flex gap-2 overflow-x-auto pb-1.5 lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:pb-0"
              >
                {content.workshops.map((topic, index) => (
                  <button
                    key={topic.title}
                    type="button"
                    role="tab"
                    id={`teacher-topic-tab-${index}`}
                    aria-selected={activeTopicIndex === index}
                    aria-controls="teacher-topic-panel"
                    onClick={() => setActiveTopicIndex(index)}
                    className={`min-w-[180px] rounded-xl border px-3 py-1.5 text-left text-xs font-semibold leading-snug transition-colors lg:min-w-0 lg:text-sm ${
                      activeTopicIndex === index
                        ? 'border-[#EA580C] bg-orange-50 text-[#9A3412]'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {topic.title}
                  </button>
                ))}
              </div>

              {activeTopic && (
                <article
                  id="teacher-topic-panel"
                  role="tabpanel"
                  aria-labelledby={`teacher-topic-tab-${activeTopicIndex}`}
                  className="min-h-0 overflow-y-auto rounded-xl bg-[#FAF9F6] p-3 sm:p-3.5 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold leading-tight text-[#0F172A]">
                      {activeTopic.title}
                    </h3>
                    <ul className="mt-2 space-y-1.5">
                      {activeTopic.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs sm:text-[12.5px] leading-snug text-slate-700">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#EA580C]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="mt-2 border-t border-slate-200 pt-1.5 text-xs italic leading-snug text-slate-600">
                    {activeTopic.subtitle}
                  </p>
                </article>
              )}
            </div>
          </section>
        </div>

        <p className="flex-none border-t border-slate-200 pt-1.5 text-center font-serif text-sm font-semibold text-[#0F172A] sm:text-base">
          {content.closingLine}
        </p>
      </div>
    </ChapterShell>
  );
};

export default TeacherEmpowermentSection;
