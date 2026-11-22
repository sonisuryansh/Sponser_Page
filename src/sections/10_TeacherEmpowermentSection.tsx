import React, { useRef, useEffect } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { ShieldCheck, Check, GraduationCap, BookOpen, Sparkles } from 'lucide-react';
import gsap from 'gsap';

const pillarIcons = [
  <GraduationCap key="1" className="w-4 h-4 text-[#c8a45d]" />,
  <BookOpen key="2" className="w-4 h-4 text-cyan-600" />,
  <Sparkles key="3" className="w-4 h-4 text-emerald-600" />,
];

const pillarDetails = [
  [
    'Session facilitation protocols',
    'Hardware troubleshooting & safety',
    'Student mentoring frameworks',
  ],
  [
    'Turnkey session plans & safety notes',
    'Rubrics & assessment check-ins',
    'Grade-wise activity workbooks',
  ],
  [
    'AI-drafted quizzes & handouts',
    'Activity note summarization',
    'Teacher-in-the-loop task agents',
  ],
];

export const TeacherEmpowermentSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    if (prefersReducedMotion || isMobile) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.editorial-reveal'),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.07,
          ease: 'power3.out',
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const handleScrollToNext = () => {
    window.dispatchEvent(new CustomEvent('go-to-slide', { detail: 10 }));
  };

  return (
    <ChapterShell
      id="teacher-empowerment"
      chapterNumber="10"
      theme="light"
      fullBleed={true}
      className="relative w-full h-[100svh] overflow-hidden bg-[#FAF6EE]"
    >
      {/* Main Viewport Container (Centered in 100svh window) */}
      <div
        ref={containerRef}
        className="relative w-full my-auto flex flex-col justify-center py-2 sm:py-3 px-4 sm:px-8 lg:px-12 box-border select-none z-10 max-w-[1320px] mx-auto overflow-hidden"
      >
        {/* Top Header: Eyebrow, Main Title & Narrative Message (Centered & Proportional) */}
        <div className="flex-none max-w-3xl mx-auto text-center flex flex-col items-center mb-2.5">
          <div className="editorial-reveal flex items-center justify-center mb-1">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#c8a45d] font-bold">
              {siteConfig.teacherEmpowerment.eyebrow}
            </span>
          </div>

          <h2
            ref={headlineRef}
            className="editorial-reveal font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal leading-tight tracking-tight text-[#111111] mb-1 text-center"
          >
            {siteConfig.teacherEmpowerment.headline}
          </h2>

          <p className="editorial-reveal font-serif text-xs sm:text-sm text-[#555555] italic mb-1 text-center">
            &ldquo;{siteConfig.teacherEmpowerment.message}&rdquo;
          </p>

          <p className="editorial-reveal font-sans text-[11px] sm:text-xs text-[#666666] leading-relaxed max-w-xl text-center font-normal">
            Technology in the classroom should reduce educator friction, not amplify it. We combine comprehensive faculty training, turnkey lesson blueprints, and AI assistance with strict human oversight.
          </p>
        </div>

        {/* 3 Core Pillars: Train, Guide, Assist (Refined Architectural Cards) */}
        <div className="editorial-reveal flex-none my-1 sm:my-2 flex flex-col justify-center min-h-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-5">
            {siteConfig.teacherEmpowerment.columns.map((col, idx) => {
              const borderAccents = [
                'hover:border-[#c8a45d] hover:shadow-[0_8px_30px_rgba(200,164,93,0.12)]',
                'hover:border-cyan-500 hover:shadow-[0_8px_30px_rgba(6,182,212,0.12)]',
                'hover:border-emerald-500 hover:shadow-[0_8px_30px_rgba(16,185,129,0.12)]',
              ];
              const tagColors = [
                'text-[#c8a45d]',
                'text-cyan-600',
                'text-emerald-600',
              ];

              return (
                <div
                  key={col.title}
                  className={`group relative flex flex-col justify-between p-3.5 sm:p-4 bg-white/90 border border-black/10 rounded-[3px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 ${borderAccents[idx]}`}
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-1.5 border-b border-black/5 pb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span>{pillarIcons[idx]}</span>
                        <span className={`font-mono text-[10px] uppercase tracking-[0.2em] font-bold ${tagColors[idx]}`}>
                          0{idx + 1} / {col.title}
                        </span>
                      </div>
                      {col.badge && (
                        <span className="px-1.5 py-0.5 text-[9px] uppercase font-mono tracking-wider rounded-[2px] border border-[#c8a45d]/40 bg-[#c8a45d]/10 text-[#8c6b24] font-semibold">
                          {col.badge}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-lg sm:text-xl font-medium text-[#111111] tracking-tight mb-1 group-hover:text-[#c8a45d] transition-colors">
                      {col.title}
                    </h3>

                    {/* Description */}
                    <p className="font-sans text-[11px] sm:text-xs text-[#555555] leading-normal mb-2">
                      {col.description}
                    </p>
                  </div>

                  {/* Concrete Deliverable Bullet Points */}
                  <div className="pt-2 border-t border-black/5 mt-auto">
                    <ul className="space-y-0.5">
                      {pillarDetails[idx].map((point) => (
                        <li key={point} className="flex items-center gap-2 text-[10.5px] sm:text-[11px] text-[#666666] font-sans">
                          <span className="w-1 h-1 rounded-full bg-black/30 shrink-0" />
                          <span className="truncate">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Human-in-the-Loop AI Workflow & Ethical Guardrails Banner */}
        <div className="editorial-reveal flex-none bg-white/95 border border-black/10 p-3 sm:p-3.5 rounded-[3px] shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
          {/* Workflow Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2 pb-1.5 border-b border-black/5">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-[#888888] font-bold">
              Human-in-the-Loop AI Workflow
            </span>
            <span className="font-mono text-[10px] text-[#c8a45d] font-semibold">
              Teacher Oversight at Every Stage
            </span>
          </div>

          {/* 4 Step Nodes Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2.5">
            {siteConfig.teacherEmpowerment.flow.map((step, idx) => (
              <div
                key={step}
                className="flex items-center gap-2 px-2.5 py-1.5 bg-[#FAF9F6] border border-black/10 rounded-[2px]"
              >
                <span className="w-4 h-4 flex items-center justify-center rounded-full bg-[#111111] text-white text-[9px] font-mono font-bold shrink-0">
                  {idx + 1}
                </span>
                <span className="font-sans text-[11px] sm:text-xs font-semibold text-[#111111] leading-tight truncate">
                  {step}
                </span>
              </div>
            ))}
          </div>

          {/* Ethical Guardrails Footer */}
          <div className="pt-2 border-t border-black/10 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-[#c8a45d] font-mono font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Ethical Guardrails:</span>
            </div>
            {siteConfig.teacherEmpowerment.guardrails.map((gd) => (
              <div key={gd} className="flex items-center gap-1.5 text-[10.5px] sm:text-[11px] text-[#333333] font-sans">
                <Check className="w-3 h-3 text-emerald-600 shrink-0 stroke-[2.5]" />
                <span>{gd}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Trailing Link CTA (Centered) */}
        <div className="editorial-reveal flex-none pt-2 border-t border-black/10 flex items-center justify-center">
          <button
            onClick={handleScrollToNext}
            className="group flex items-center justify-center text-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c8a45d] cursor-pointer max-w-xl mx-auto"
          >
            <span className="h-[1px] bg-black/20 group-hover:bg-[#c8a45d] transition-all w-8 sm:w-12 mr-3" />
            <span className="font-sans font-bold text-[10px] sm:text-[10.5px] uppercase tracking-[0.22em] text-[#111111] group-hover:text-[#c8a45d] transition-colors shrink-0">
              Discover student & school institutional benefits
            </span>
            <span className="h-[1px] bg-black/20 group-hover:bg-[#c8a45d] transition-all w-8 sm:w-12 ml-3" />
          </button>
        </div>
      </div>
    </ChapterShell>
  );
};

export default TeacherEmpowermentSection;
