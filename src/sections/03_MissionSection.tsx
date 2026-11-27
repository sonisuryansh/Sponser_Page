import React from 'react';
import { Check } from 'lucide-react';
import { ChapterShell } from '../components/ChapterShell';
import { siteConfig } from '../config/content.config';

const VALUE_ILLUSTRATIONS = [
  '/assets/values/val_icon_1_hands_on.gif',
  '/assets/values/val_icon_2_problem_solving.gif',
  '/assets/values/val_icon_3_creativity.gif',
  '/assets/values/val_icon_4_responsible_tech.gif',
  '/assets/values/val_icon_5_continuous_learning.gif',
];

export const MissionSection: React.FC = () => (
  <ChapterShell
    id="mission"
    chapterNumber="03"
    theme="light"
    fullBleed={true}
    className="relative flex min-h-[100svh] w-full flex-col bg-[#FAF8F5] lg:h-[100svh] lg:items-center lg:justify-center select-none"
  >
    <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-1 flex-col items-center justify-between gap-3 sm:gap-4 overflow-visible px-4 pb-6 pt-[calc(var(--header-h,64px)+8px)] sm:px-6 lg:h-full lg:min-h-0 lg:overflow-hidden lg:px-8 lg:pb-4 xl:px-10">
      
      {/* Header */}
      <header className="max-w-4xl text-center flex-none">
        <div className="flex items-center justify-center gap-2 mb-0.5">
          <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-r from-transparent to-[#b45309]" />
          <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#b45309]">
            {siteConfig.mission.eyebrow}
          </span>
          <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-l from-transparent to-[#b45309]" />
        </div>
        <h2 className="font-serif text-xl sm:text-2xl lg:text-[28px] xl:text-[32px] font-bold leading-tight tracking-tight text-[#0F172A] sm:leading-snug">
          {siteConfig.mission.statement}
        </h2>
      </header>

      {/* 5 Value Cards */}
      <div className="grid w-full flex-1 gap-2.5 sm:gap-3 sm:grid-cols-2 lg:min-h-0 lg:grid-cols-5 lg:items-stretch my-0.5">
        {siteConfig.mission.values.map((value, index) => (
          <article
            key={value.name}
            className={`group relative flex min-w-0 flex-col justify-between rounded-xl sm:rounded-2xl border ${value.borderColor} ${value.bottomBorder} bg-white p-3 sm:p-3.5 lg:p-3 xl:p-3.5 text-center shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5`}
          >
            {/* Top Header Row: Number Pill & Pillar Badge */}
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className={`font-mono text-[9px] sm:text-[9.5px] font-bold px-2 py-0.5 rounded-full border ${value.numBg} ${value.numColor}`}>
                {value.num}
              </span>
              <span className="font-mono text-[7.5px] sm:text-[8px] xl:text-[8.5px] font-bold uppercase tracking-wider text-slate-400 truncate">
                {value.pillar}
              </span>
            </div>

            {/* Center 3D Illustration in soft glowing container */}
            <div className="my-auto py-1 sm:py-2 flex items-center justify-center">
              <div className={`w-16 h-16 sm:w-18 sm:h-18 lg:w-18 lg:h-18 xl:w-24 xl:h-24 rounded-2xl ${value.glowBg} border flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform duration-300`}>
                <img
                  src={VALUE_ILLUSTRATIONS[index]}
                  alt=""
                  aria-hidden="true"
                  className="h-12 w-12 sm:h-14 sm:w-14 lg:h-14 lg:w-14 xl:h-18 xl:w-18 object-contain drop-shadow-xs"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Bottom Content: Title, Description, Bullets & Action Tags */}
            <div className="mt-auto flex flex-col gap-1 text-center">
              <h3 className="font-serif text-[13px] sm:text-[14px] lg:text-[14px] xl:text-[15px] font-bold leading-tight text-[#0F172A] tracking-tight group-hover:text-[#EA580C] transition-colors">
                {value.name}
              </h3>
              <p className="font-sans text-[10px] sm:text-[10.5px] lg:text-[11px] leading-snug text-slate-600">
                {value.description}
              </p>

              {/* 2 Clean Bullet Points with Checkmark */}
              <div className="flex flex-col gap-0.5 pt-1 text-left">
                {value.bullets.map((b) => (
                  <div key={b} className="flex items-start gap-1 text-[9.5px] sm:text-[10px] lg:text-[10.5px] text-slate-700 leading-tight">
                    <span className="w-3 h-3 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2 h-2 stroke-[2.5]" />
                    </span>
                    <span className="line-clamp-1">{b}</span>
                  </div>
                ))}
              </div>

              {/* Concrete Skill Focus Tags */}
              <div className="flex flex-wrap items-center justify-center gap-1 pt-1 mt-0.5 border-t border-slate-100">
                {value.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[7px] sm:text-[7.5px] xl:text-[8px] px-1.5 py-0.5 rounded bg-slate-50 text-slate-600 font-semibold border border-slate-200/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </ChapterShell>
);

export default MissionSection;
