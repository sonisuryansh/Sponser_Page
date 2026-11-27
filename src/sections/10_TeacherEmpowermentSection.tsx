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
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col gap-4 px-4 pb-8 pt-[calc(var(--header-h,64px)+12px)] sm:px-6 lg:h-full lg:min-h-0 lg:overflow-hidden lg:px-8 lg:pb-5 xl:px-10">
        <header className="flex-none text-center">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#b45309] sm:text-xs">
            {content.eyebrow}
          </p>
          <h2 className="mt-1 font-serif text-2xl font-bold leading-tight tracking-tight text-[#0F172A] sm:text-3xl lg:text-[36px]">
            {content.headline}
          </h2>
          <p className="mx-auto mt-2 max-w-3xl font-sans text-sm leading-relaxed text-slate-600 sm:text-base">
            {content.message}
          </p>
        </header>

        <div className="grid flex-1 gap-4 lg:min-h-0 lg:grid-cols-[0.85fr_1.55fr] lg:gap-6">
          <article className="rounded-2xl border border-sky-200 bg-gradient-to-b from-sky-50/50 via-white to-white p-4 sm:p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-0.5 rounded-full bg-sky-100 text-[#0284C7] border border-sky-200">
                  {content.students.title}
                </span>
                <span className="font-mono text-[9px] font-bold text-slate-400">
                  TURNKEY
                </span>
              </div>
              <h3 className="font-serif text-base sm:text-lg lg:text-[19px] font-bold text-[#0F172A] leading-tight mb-3">
                {content.students.heading}
              </h3>
              <ul className="space-y-2.5">
                {content.students.details.map((detail) => {
                  const [label, ...rest] = detail.split(': ');
                  return (
                    <li key={detail} className="flex items-start gap-2 text-xs sm:text-[13px] leading-relaxed text-slate-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0284C7]" />
                      <span>
                        <strong className="text-slate-900 font-semibold">{label}: </strong>
                        <span className="text-slate-600">{rest.join(': ')}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-4 pt-3 border-t border-sky-100 flex flex-wrap items-center gap-1.5">
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

          <section className="flex min-h-[440px] flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5 lg:min-h-0">
            <p className="flex-none font-sans text-sm leading-relaxed text-slate-600">
              {content.workshopTiming}
            </p>

            <div className="mt-4 grid flex-1 gap-3 lg:min-h-0 lg:grid-cols-[minmax(190px,0.8fr)_1.5fr]">
              <div
                role="tablist"
                aria-label="Teacher workshop topics"
                className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:pb-0"
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
                    className={`min-w-[190px] rounded-xl border px-3 py-2 text-left text-xs font-semibold leading-snug transition-colors lg:min-w-0 lg:text-sm ${
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
                  className="min-h-0 overflow-y-auto rounded-xl bg-[#FAF9F6] p-4"
                >
                  <h3 className="font-serif text-lg font-bold leading-tight text-[#0F172A] sm:text-xl">
                    {activeTopic.title}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {activeTopic.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-slate-700">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#EA580C]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 border-t border-slate-200 pt-3 text-sm italic leading-relaxed text-slate-600">
                    {activeTopic.subtitle}
                  </p>
                </article>
              )}
            </div>
          </section>
        </div>

        <p className="flex-none border-t border-slate-200 pt-3 text-center font-serif text-base font-semibold text-[#0F172A] sm:text-lg">
          {content.closingLine}
        </p>
      </div>
    </ChapterShell>
  );
};

export default TeacherEmpowermentSection;
