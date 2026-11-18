import React from 'react';
import { siteConfig } from '../config/content.config';
import { Check, Building2, Cpu } from 'lucide-react';

export const RequirementsSection: React.FC = () => {
  return (
    <section
      id="requirements"
      data-chapter="12"
      className="relative w-full min-h-screen py-24 md:py-32 flex items-center bg-[#f8f9fa] text-[#111111] border-t border-black/5 snap-start"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        {/* Eyebrow & Headline */}
        <div className="mb-14 max-w-3xl">
          <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-3">
            {siteConfig.requirements.eyebrow}
          </div>
          <h2 className="font-serif text-[clamp(32px,4vw,56px)] font-normal leading-[1.14] tracking-tight text-[#111111]">
            {siteConfig.requirements.headline}
          </h2>
        </div>

        {/* Two Columns: School provides vs MedhaArc Labs delivers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 border-t border-black/10 pt-10">
          {/* Column 1: School Provides */}
          <div className="p-8 bg-white border border-black/10 rounded-[2px] shadow-xs">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-black/10">
              <div className="w-9 h-9 flex items-center justify-center border border-black/10 bg-[#fafafa] rounded-[2px]">
                <Building2 className="w-5 h-5 text-[#111111]" />
              </div>
              <h3 className="font-serif text-2xl font-medium tracking-tight text-[#111111]">
                {siteConfig.requirements.columns[0].title}
              </h3>
            </div>

            <ul className="space-y-4">
              {siteConfig.requirements.columns[0].items.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3.5 text-base md:text-lg text-[#5b5b5b]">
                  <span className="w-5 h-5 flex items-center justify-center rounded-full bg-black/5 text-[#111111] text-xs shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: MedhaArc Labs Delivers */}
          <div className="p-8 bg-white border border-black/10 rounded-[2px] shadow-xs">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-black/10">
              <div className="w-9 h-9 flex items-center justify-center border border-black/10 bg-[#fafafa] rounded-[2px]">
                <Cpu className="w-5 h-5 text-[#111111]" />
              </div>
              <h3 className="font-serif text-2xl font-medium tracking-tight text-[#111111]">
                {siteConfig.requirements.columns[1].title}
              </h3>
            </div>

            <ul className="space-y-4">
              {siteConfig.requirements.columns[1].items.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3.5 text-base md:text-lg text-[#5b5b5b]">
                  <span className="w-5 h-5 flex items-center justify-center rounded-full bg-[#c8a45d]/20 text-[#c8a45d] text-xs shrink-0">
                    <Check className="w-3.5 h-3.5 text-black" />
                  </span>
                  <span className="font-medium text-[#111111]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
