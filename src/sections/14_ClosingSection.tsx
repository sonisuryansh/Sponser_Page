import React, { useRef, useEffect } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ClosingSectionProps {
  onOpenContact: () => void;
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({ onOpenContact }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !document.documentElement.classList.contains('js-motion')) {
      return;
    }

    const tween = gsap.fromTo(
      el,
      { y: 30, opacity: 0.2 },
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <ChapterShell
      id="closing"
      chapterNumber="14"
      theme="dark"
      media="/assets/medhaarc_hero_drone.webp"
      overlayOpacity={0.82}
    >
      <div ref={containerRef} className="w-full flex-1 flex flex-col justify-between py-2 select-none">
        {/* Eyebrow */}
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-2">
            {siteConfig.closing.eyebrow}
          </div>
        </div>

        {/* Center: Statement Headline & Sub-line */}
        <div className="my-auto max-w-4xl">
          <h2
            ref={headlineRef}
            className="font-serif text-[clamp(28px,4.5vw,58px)] font-normal leading-[1.12] tracking-tight text-white mb-4"
          >
            {siteConfig.closing.headline}
          </h2>

          <p className="text-lg md:text-2xl text-white/80 font-serif italic mb-8 max-w-3xl">
            &ldquo;{siteConfig.closing.line}&rdquo;
          </p>

          {/* Four Domains as a Quiet Row */}
          <div className="border-t border-b border-white/10 py-4 mb-8 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-sans tracking-wide text-white/60">
            {siteConfig.closing.domainsRow.map((dom, idx) => (
              <React.Fragment key={dom}>
                <span className="hover:text-white transition-colors">{dom}</span>
                {idx < siteConfig.closing.domainsRow.length - 1 && (
                  <span className="text-white/20 select-none hidden sm:inline">|</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Clear Call to Action */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <button
              onClick={onOpenContact}
              className="group relative inline-flex items-center gap-2.5 px-6 py-3 border border-white/30 hover:border-white text-white rounded-[2px] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white bg-white/5 cursor-pointer"
            >
              <span className="text-xs uppercase tracking-[0.2em]">
                {siteConfig.closing.ctaText}
              </span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <span className="text-xs text-white/50 tracking-wider">
              {siteConfig.confirm.contactEmail}
            </span>
          </div>
        </div>

        {/* Footer: MedhaArc Labs | X Private Limited */}
        <footer className="w-full border-t border-white/10 pt-4 pb-2 text-xs text-white/50 tracking-wider flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span>{siteConfig.closing.footerText}</span>
          </div>
          <div className="flex items-center gap-6">
            <span>{siteConfig.tagline}</span>
          </div>
        </footer>
      </div>
    </ChapterShell>
  );
};
