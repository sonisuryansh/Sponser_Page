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
          <p className="mx-auto mt-0.5 max-w-2xl font-sans text-xs sm:text-[13px] leading-snug text-slate-600">
            {content.message}
          </p>
          {/* Shifted "For Students" Turnkey Delivery Banner */}
          <div className="mt-1.5 mx-auto inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 py-0.5 rounded-full bg-sky-50 border border-sky-200/80 text-slate-700 text-[10.5px] sm:text-[11.5px] shadow-2xs">
            <span className="inline-flex items-center gap-1 font-mono text-[8.5px] sm:text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-100 text-[#0284C7] border border-sky-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
              For Students
            </span>
            <span className="font-medium text-slate-700">
              Curriculum delivered entirely by MedhaArc Labs Instructors/Mentors &mdash; zero extra preparation or load for school teachers.
            </span>
          </div>
        </header>

        <div className="grid flex-1 gap-2.5 lg:min-h-0 lg:grid-cols-[0.85fr_1.55fr] lg:gap-3.5 my-0.5 items-stretch">
          {/* Left Card: AI Educator Image & Workshop Core Value */}
          <article className="rounded-2xl border border-slate-200/90 bg-white p-2.5 sm:p-3 shadow-xs flex flex-col justify-between overflow-hidden">
            {/* AI Generated Image with Overlay Badge */}
            <div className="relative w-full h-40 sm:h-48 lg:h-[200px] xl:h-[220px] rounded-xl overflow-hidden border border-slate-200/80 bg-slate-100 shrink-0 shadow-2xs">
              <img
                src="/assets/teacher_ai_empowerment.jpg"
                alt="AI Educator Empowerment Workshop"
                className="w-full h-full object-cover object-[center_45%] filter brightness-100 contrast-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent pointer-events-none" />
              
              <div className="absolute top-2 left-2 flex items-center gap-1.5">
                <span className="font-mono text-[8.5px] sm:text-[9px] font-bold uppercase tracking-[0.16em] px-2 py-0.5 rounded-full bg-white/95 text-orange-700 shadow-sm border border-orange-200/60 backdrop-blur-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  AI Educator Workshop
                </span>
              </div>
              
              <div className="absolute bottom-2 left-2.5 right-2.5 text-white text-left pointer-events-none">
                <p className="font-serif text-xs sm:text-[13.5px] font-bold leading-tight drop-shadow-md">
                  Practical AI Upskilling for Faculty
                </p>
                <p className="font-sans text-[10px] sm:text-[10.5px] text-white/90 leading-tight drop-shadow-sm mt-0.5">
                  4–5 focused hands-on sessions to master modern teaching AI tools
                </p>
              </div>
            </div>

            {/* Workshop Features / Value Points */}
            <div className="flex-1 flex flex-col justify-between pt-2 min-h-0">
              <div className="space-y-1 font-sans">
                <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-0.5">
                  <span>Core Workshop Capabilities</span>
                  <span className="text-orange-600 font-semibold">Hands-on</span>
                </div>
                <ul className="space-y-1 sm:space-y-1.5 text-[11px] sm:text-[11.5px] text-slate-700 leading-snug">
                  <li className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-1.5" />
                    <span>
                      <strong className="text-slate-900 font-semibold">Smart Notes &amp; Summaries: </strong>
                      <span className="text-slate-600">Convert textbook chapters into structured classroom revision aids.</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-1.5" />
                    <span>
                      <strong className="text-slate-900 font-semibold">Automated Assessments: </strong>
                      <span className="text-slate-600">Generate instant MCQs, quizzes, and evaluation forms without manual typing.</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-1.5" />
                    <span>
                      <strong className="text-slate-900 font-semibold">Generative Lesson Prep: </strong>
                      <span className="text-slate-600">Create creative teaching activities and differentiated explanations in minutes.</span>
                    </span>
                  </li>
                </ul>
              </div>

              {/* Bottom Pills */}
              <div className="pt-1.5 mt-1 border-t border-slate-100 flex flex-wrap items-center gap-1.5 shrink-0">
                {['Zero Extra Load', 'Lifetime Faculty Asset', 'Classroom-Ready'].map((chip) => (
                  <span
                    key={chip}
                    className="font-mono text-[8px] sm:text-[8.5px] px-2 py-0.5 rounded-full bg-orange-50 text-orange-800 font-semibold border border-orange-200/80 shadow-2xs"
                  >
                    {chip}
                  </span>
                ))}
              </div>
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

        <footer className="flex-none border-t border-slate-200 pt-1 pr-10 sm:pr-14 flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left text-xs text-slate-600">
          <div className="flex items-center gap-1.5 font-sans">
            <span className="font-mono text-[8.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-100 text-[#0284C7] border border-sky-200">
              Student Delivery
            </span>
            <span>100% conducted by MedhaArc Mentors &bull; Zero preparation or grading load on school faculty</span>
          </div>
          <p className="font-serif text-xs sm:text-sm font-semibold text-[#0F172A]">
            {content.closingLine}
          </p>
        </footer>
      </div>
    </ChapterShell>
  );
};

export default TeacherEmpowermentSection;
