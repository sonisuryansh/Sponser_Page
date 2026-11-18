import React from 'react';
import { siteConfig } from '../config/content.config';
import { ArrowUpRight } from 'lucide-react';

interface ClosingSectionProps {
  onOpenContact: () => void;
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({ onOpenContact }) => {
  return (
    <section
      id="closing"
      data-chapter="14"
      className="relative w-full min-h-screen py-24 md:py-32 flex flex-col justify-between bg-[#0a0e13] text-white select-none snap-start"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full my-auto">
        {/* Eyebrow */}
        <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-4">
          {siteConfig.closing.eyebrow}
        </div>

        {/* Statement Headline */}
        <h2 className="font-serif text-[clamp(32px,4.5vw,64px)] font-normal leading-[1.12] tracking-tight text-white max-w-4xl mb-6">
          {siteConfig.closing.headline}
        </h2>

        {/* Closing Line */}
        <p className="text-xl md:text-2xl text-white/80 font-serif italic mb-12 max-w-3xl">
          &ldquo;{siteConfig.closing.line}&rdquo;
        </p>

        {/* Four Domains as a Quiet Row */}
        <div className="border-t border-b border-white/10 py-6 mb-12 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm font-sans tracking-wide text-white/60">
          {siteConfig.closing.domainsRow.map((dom, idx) => (
            <React.Fragment key={dom}>
              <span className="hover:text-white transition-colors">{dom}</span>
              {idx < siteConfig.closing.domainsRow.length - 1 && (
                <span className="text-white/20 select-none hidden sm:inline">|</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* One Clear Call To Action (Underline-draw text link or sharp minimal outline button) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <button
            onClick={onOpenContact}
            className="group relative inline-flex items-center gap-3 px-6 py-3.5 border border-white/30 hover:border-white text-white rounded-[2px] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white bg-white/5 cursor-pointer"
          >
            <span className="text-xs uppercase tracking-[0.2em]">
              {siteConfig.closing.ctaText}
            </span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <span className="text-xs text-white/40 tracking-wider">
            {siteConfig.confirm.contactEmail}
          </span>
        </div>
      </div>

      {/* Footer: MedhaArc Labs | X Private Limited */}
      <footer className="w-full border-t border-white/10 py-8 px-6 md:px-12 text-xs text-white/50 tracking-wider flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span>{siteConfig.closing.footerText}</span>
        </div>
        <div className="flex items-center gap-6">
          <span>{siteConfig.tagline}</span>
        </div>
      </footer>
    </section>
  );
};
