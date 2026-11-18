import React from 'react';
import { siteConfig } from '../config/content.config';
import { ShieldCheck, ArrowRight, Check } from 'lucide-react';

export const TeacherEmpowermentSection: React.FC = () => {
  return (
    <section
      id="teacher-empowerment"
      data-chapter="10"
      className="relative w-full min-h-screen py-24 md:py-32 flex items-center bg-[#f9f9fa] text-[#111111] border-t border-black/5 snap-start"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        {/* Eyebrow & Message */}
        <div className="mb-14 max-w-3xl">
          <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-3">
            {siteConfig.teacherEmpowerment.eyebrow}
          </div>
          <h2 className="font-serif text-[clamp(32px,4vw,56px)] font-normal leading-[1.14] tracking-tight text-[#111111] mb-2">
            {siteConfig.teacherEmpowerment.headline}
          </h2>
          <p className="text-xl text-[#5b5b5b] font-serif italic">
            &ldquo;{siteConfig.teacherEmpowerment.message}&rdquo;
          </p>
        </div>

        {/* Three Columns: Train, Guide, Assist */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-black/10 pt-10 mb-14">
          {siteConfig.teacherEmpowerment.columns.map((col, idx) => (
            <div
              key={col.title}
              className="p-7 bg-white border border-black/10 rounded-[2px] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-[0.18em] text-[#5b5b5b] font-mono">
                    Column 0{idx + 1}
                  </span>
                  {col.badge && (
                    <span className="px-2 py-0.5 bg-[#c8a45d]/20 text-[#111111] text-[10px] uppercase font-mono tracking-wider rounded-[2px]">
                      {col.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-2xl font-medium tracking-tight text-[#111111] mb-3">
                  {col.title}
                </h3>
              </div>
              <p className="text-[16px] md:text-[17px] leading-relaxed text-[#5b5b5b]">
                {col.description}
              </p>
            </div>
          ))}
        </div>

        {/* Small Flow Diagram: Teacher sets the task → AI drafts → Teacher reviews and edits → Class uses it */}
        <div className="bg-white border border-black/10 p-6 md:p-8 rounded-[2px] mb-14">
          <div className="text-xs uppercase tracking-[0.2em] text-[#5b5b5b] font-mono mb-6">
            Human-in-the-Loop Workflow
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            {siteConfig.teacherEmpowerment.flow.map((step, idx) => (
              <React.Fragment key={step}>
                <div className="flex items-center gap-3 px-4 py-2.5 bg-[#fafafa] border border-black/10 rounded-[2px]">
                  <span className="w-5 h-5 flex items-center justify-center rounded-full bg-black text-white text-[11px] font-mono">
                    {idx + 1}
                  </span>
                  <span className="text-sm font-medium text-[#111111]">{step}</span>
                </div>
                {idx < siteConfig.teacherEmpowerment.flow.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-black/30 shrink-0 hidden sm:block" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* 4 Short Examples */}
          <div className="mt-8 pt-6 border-t border-black/10">
            <div className="text-xs uppercase tracking-wider text-[#5b5b5b] mb-4">
              Practical Workflow Examples
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#5b5b5b]">
              {siteConfig.teacherEmpowerment.examples.map((ex, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-black font-bold mr-1">•</span>
                  <span>{ex}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* On-Screen Guardrails */}
        <div className="border border-black/15 bg-[#fafafa] p-6 rounded-[2px]">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-mono mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>Ethical & Data Guardrails</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {siteConfig.teacherEmpowerment.guardrails.map((gd) => (
              <div key={gd} className="flex items-center gap-2.5 text-sm font-medium text-[#111111]">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{gd}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
