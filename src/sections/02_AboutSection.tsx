import React from 'react';
import { Compass, Eye, Layers, Check } from 'lucide-react';
import { ChapterShell } from '../components/ChapterShell';
import { siteConfig } from '../config/content.config';

export const AboutSection: React.FC = () => {
  return (
    <ChapterShell
      id="about"
      chapterNumber="02"
      theme="light"
      fullBleed={true}
      className="relative flex min-h-[100svh] w-full flex-col bg-[#FAF6EE] lg:h-[100svh] lg:items-center lg:justify-center select-none"
    >
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-1 flex-col items-center justify-between gap-3 overflow-visible px-4 pb-6 pt-[calc(var(--header-h,64px)+8px)] sm:px-6 lg:h-full lg:min-h-0 lg:overflow-hidden lg:px-8 lg:pb-4 xl:px-10">
        
        {/* Top Header */}
        <header className="flex-none text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-0.5">
            <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-r from-transparent to-[#b45309]" />
            <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#b45309]">
              {siteConfig.about.eyebrow}
            </span>
            <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-l from-transparent to-[#b45309]" />
          </div>
          <h2 className="font-serif text-2xl font-bold leading-tight tracking-tight text-[#0F172A] sm:text-3xl lg:text-[32px] xl:text-[34px]">
            {siteConfig.about.headline}
          </h2>
          <p className="mt-1 font-sans text-xs sm:text-[13px] text-slate-600 leading-snug">
            {siteConfig.about.subheadline}
          </p>
        </header>

        {/* 2-Column Balanced Grid */}
        <div className="grid w-full flex-1 gap-3.5 lg:min-h-0 lg:grid-cols-[1.25fr_0.85fr] xl:grid-cols-[1.3fr_0.9fr] lg:gap-5 my-0.5">
          {/* Left Column: 3 Structured Cards */}
          <div className="grid gap-2.5 sm:gap-3 sm:grid-cols-3 lg:grid-cols-1 lg:grid-rows-3 h-full min-h-0">
            
            {/* Card 1: Our Aim */}
            <article className="flex min-w-0 flex-col justify-center gap-1 sm:gap-1.5 lg:gap-2 rounded-xl sm:rounded-2xl border border-slate-200/90 border-l-[4px] border-l-[#0284C7] bg-white p-3 sm:p-3.5 lg:p-4 shadow-xs transition-shadow hover:shadow-sm">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg bg-sky-50 text-[#0284C7] border border-sky-100 shrink-0">
                      <Compass className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
                    </span>
                    <h3 className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-[#0284C7]">
                      Our Aim
                    </h3>
                  </div>
                  <span className="font-mono text-[8.5px] sm:text-[9px] uppercase px-2 py-0.5 rounded-full bg-sky-50 text-[#0369A1] font-bold border border-sky-200 shrink-0">
                    Core Foundation
                  </span>
                </div>
                <h4 className="font-serif text-sm sm:text-[15px] lg:text-base font-bold text-[#0F172A] leading-snug">
                  Demystifying Technology from Grade 3
                </h4>
                <p className="mt-0.5 font-sans text-[11px] sm:text-[12px] lg:text-[12.5px] text-slate-600 leading-snug">
                  Making technology transparent and understandable through tangible hardware, intuitive physical computing, and structured age-appropriate learning.
                </p>
              </div>

              <div className="pt-1 border-t border-slate-100 flex flex-col gap-1 sm:gap-1.5">
                <div className="flex items-start gap-1.5 text-[10.5px] sm:text-[11.5px] lg:text-[12px] text-slate-700 leading-tight">
                  <span className="w-3.5 h-3.5 rounded-full bg-sky-100 text-[#0284C7] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                  </span>
                  <span><strong className="font-semibold text-slate-900">Tangible Hardware First:</strong> Real breadboards, circuits &amp; sensors with zero hidden black boxes.</span>
                </div>
                <div className="flex items-start gap-1.5 text-[10.5px] sm:text-[11.5px] lg:text-[12px] text-slate-700 leading-tight">
                  <span className="w-3.5 h-3.5 rounded-full bg-sky-100 text-[#0284C7] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                  </span>
                  <span><strong className="font-semibold text-slate-900">Intuition Before Code:</strong> Core physics and logic intuition before abstract syntax and mathematics.</span>
                </div>
                <div className="flex items-start gap-1.5 text-[10.5px] sm:text-[11.5px] lg:text-[12px] text-slate-700 leading-tight">
                  <span className="w-3.5 h-3.5 rounded-full bg-sky-100 text-[#0284C7] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                  </span>
                  <span><strong className="font-semibold text-slate-900">Zero Tech Anxiety:</strong> Iterative, guided experiments that build genuine engineering self-reliance.</span>
                </div>
              </div>
            </article>

            {/* Card 2: Our Vision */}
            <article className="flex min-w-0 flex-col justify-center gap-1 sm:gap-1.5 lg:gap-2 rounded-xl sm:rounded-2xl border border-slate-200/90 border-l-[4px] border-l-[#7C3AED] bg-white p-3 sm:p-3.5 lg:p-4 shadow-xs transition-shadow hover:shadow-sm">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg bg-purple-50 text-[#7C3AED] border border-purple-100 shrink-0">
                      <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
                    </span>
                    <h3 className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-[#7C3AED]">
                      Our Vision
                    </h3>
                  </div>
                  <span className="font-mono text-[8.5px] sm:text-[9px] uppercase px-2 py-0.5 rounded-full bg-purple-50 text-[#6D28D9] font-bold border border-purple-200 shrink-0">
                    Strategic Impact
                  </span>
                </div>
                <h4 className="font-serif text-sm sm:text-[15px] lg:text-base font-bold text-[#0F172A] leading-snug">
                  Confident Builders &amp; Real-World Solvers
                </h4>
                <p className="mt-0.5 font-sans text-[11px] sm:text-[12px] lg:text-[12.5px] text-slate-600 leading-snug">
                  Transforming passive screen consumers into active creators, critical thinkers, and responsible innovators equipped with verifiable engineering competence.
                </p>
              </div>

              <div className="pt-1 border-t border-slate-100 flex flex-col gap-1 sm:gap-1.5">
                <div className="flex items-start gap-1.5 text-[10.5px] sm:text-[11.5px] lg:text-[12px] text-slate-700 leading-tight">
                  <span className="w-3.5 h-3.5 rounded-full bg-purple-100 text-[#7C3AED] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                  </span>
                  <span><strong className="font-semibold text-slate-900">Creation Over Consumption:</strong> Replacing screen-only tutorials with physical engineering builds.</span>
                </div>
                <div className="flex items-start gap-1.5 text-[10.5px] sm:text-[11.5px] lg:text-[12px] text-slate-700 leading-tight">
                  <span className="w-3.5 h-3.5 rounded-full bg-purple-100 text-[#7C3AED] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                  </span>
                  <span><strong className="font-semibold text-slate-900">Verifiable Capstones:</strong> Functional prototypes defended publicly before faculty, peers, and parents.</span>
                </div>
                <div className="flex items-start gap-1.5 text-[10.5px] sm:text-[11.5px] lg:text-[12px] text-slate-700 leading-tight">
                  <span className="w-3.5 h-3.5 rounded-full bg-purple-100 text-[#7C3AED] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                  </span>
                  <span><strong className="font-semibold text-slate-900">Responsible Innovation:</strong> Ethical AI literacy, lab safety compliance, and disciplined systems thinking.</span>
                </div>
              </div>
            </article>

            {/* Card 3: Our Focus */}
            <article className="flex min-w-0 flex-col justify-center gap-1 sm:gap-1.5 lg:gap-2 rounded-xl sm:rounded-2xl border border-slate-200/90 border-l-[4px] border-l-[#D97706] bg-white p-3 sm:p-3.5 lg:p-4 shadow-xs transition-shadow hover:shadow-sm">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg bg-amber-50 text-[#D97706] border border-amber-100 shrink-0">
                      <Layers className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
                    </span>
                    <h3 className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-[#D97706]">
                      Our Focus
                    </h3>
                  </div>
                  <span className="font-mono text-[8.5px] sm:text-[9px] uppercase px-2 py-0.5 rounded-full bg-amber-50 text-[#B45309] font-bold border border-amber-200 shrink-0">
                    The 4-Stage Cycle
                  </span>
                </div>
                <h4 className="font-serif text-sm sm:text-[15px] lg:text-base font-bold text-[#0F172A] leading-snug">
                  Iterative Hands-on Learning Cycle
                </h4>
                <p className="mt-0.5 font-sans text-[11px] sm:text-[12px] lg:text-[12.5px] text-slate-600 leading-snug">
                  A progressive engineering journey moving students from foundational intuition to working physical solutions:
                </p>
              </div>

              <div className="pt-1 border-t border-slate-100 flex flex-col gap-1 sm:gap-1.5">
                <div className="flex items-start gap-1.5 text-[10.5px] sm:text-[11.5px] lg:text-[12px] text-slate-700 leading-tight">
                  <span className="w-3.5 h-3.5 rounded-full bg-amber-100 text-[#D97706] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                  </span>
                  <span><strong className="font-semibold text-slate-900">Spiral Progression:</strong> Concept discovery connects directly to annual engineering capstone showcases.</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-0.5">
                  <div className="rounded-lg bg-amber-50/70 border border-amber-200/70 p-1.5 text-center">
                    <span className="font-mono text-[9px] text-[#B45309] font-bold block leading-none">01</span>
                    <span className="font-sans text-[10.5px] font-bold text-[#0F172A] block leading-tight mt-0.5">Understand</span>
                    <span className="font-sans text-[9px] text-slate-500 block leading-tight mt-0.5">Circuits &amp; Intuition</span>
                  </div>
                  <div className="rounded-lg bg-amber-50/70 border border-amber-200/70 p-1.5 text-center">
                    <span className="font-mono text-[9px] text-[#B45309] font-bold block leading-none">02</span>
                    <span className="font-sans text-[10.5px] font-bold text-[#0F172A] block leading-tight mt-0.5">Design</span>
                    <span className="font-sans text-[9px] text-slate-500 block leading-tight mt-0.5">CAD &amp; Schematics</span>
                  </div>
                  <div className="rounded-lg bg-amber-50/70 border border-amber-200/70 p-1.5 text-center">
                    <span className="font-mono text-[9px] text-[#B45309] font-bold block leading-none">03</span>
                    <span className="font-sans text-[10.5px] font-bold text-[#0F172A] block leading-tight mt-0.5">Test</span>
                    <span className="font-sans text-[9px] text-slate-500 block leading-tight mt-0.5">Signals &amp; Debug</span>
                  </div>
                  <div className="rounded-lg bg-amber-50/70 border border-amber-200/70 p-1.5 text-center">
                    <span className="font-mono text-[9px] text-[#B45309] font-bold block leading-none">04</span>
                    <span className="font-sans text-[10.5px] font-bold text-[#0F172A] block leading-tight mt-0.5">Apply</span>
                    <span className="font-sans text-[9px] text-slate-500 block leading-tight mt-0.5">Capstone Builds</span>
                  </div>
                </div>
              </div>
            </article>

          </div>

          {/* Right Column: Lab Photo with bottom badge overlay */}
          <figure className="relative min-h-[260px] overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200/90 bg-slate-100 shadow-xs sm:min-h-[360px] lg:min-h-0 h-full">
            <img
              src="/assets/aim_vision_lab_session.webp"
              alt="Students and a teacher working together in a classroom"
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading="eager"
            />
            {/* Clean bottom gradient vignette with caption */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent p-4 sm:p-5 flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-wider text-emerald-300 font-bold">
                  Active School Lab Session
                </span>
              </div>
              <h4 className="font-serif text-sm sm:text-base font-bold text-white leading-tight">
                Physical Computing in Practice
              </h4>
              <p className="font-sans text-[11px] sm:text-xs text-slate-300 leading-snug mt-0.5">
                Students wiring breadboards, calibrating sensors, and building functional autonomous rovers.
              </p>
            </div>
          </figure>
        </div>

      </div>
    </ChapterShell>
  );
};

export default AboutSection;
