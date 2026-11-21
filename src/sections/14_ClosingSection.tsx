import React, { useRef, useEffect } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { ArrowUpRight, Globe } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ClosingSectionProps {
  onOpenContact: () => void;
}

const socialChannels = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/medhaarc',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'X',
    url: 'https://x.com/medhaarc',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/people/MedhaArc/61595117606026/',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'http://linkedin.com/company/medhaarc/',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
];

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

          {/* Connecting Quote for the Client */}
          <p className="text-base sm:text-lg md:text-xl text-white/80 font-serif italic mb-8 max-w-3xl leading-relaxed">
            &ldquo;{siteConfig.closing.line}&rdquo;
          </p>

          {/* CTAs: Consultation Button + Website Link + Email */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              onClick={onOpenContact}
              className="group relative inline-flex items-center gap-2.5 px-6 py-3 border border-[#c8a45d] bg-[#c8a45d]/10 hover:bg-[#c8a45d] text-[#FAF6EE] hover:text-[#111111] rounded-[2px] transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c8a45d] cursor-pointer"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                {siteConfig.closing.ctaText}
              </span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <a
              href="https://www.medhaarc.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-3 border border-white/20 hover:border-white/50 text-white/90 hover:text-white rounded-[2px] bg-white/[0.04] hover:bg-white/[0.08] transition-all cursor-pointer"
            >
              <Globe className="w-4 h-4 text-[#c8a45d]" />
              <span className="text-xs font-mono tracking-wider font-medium">www.medhaarc.com</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href="mailto:team@medhaarc.com"
              className="text-xs text-white/60 hover:text-[#c8a45d] tracking-wider transition-colors font-mono underline-offset-4 hover:underline"
            >
              team@medhaarc.com
            </a>
          </div>

          {/* Social Channels Row */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#c8a45d] font-mono mr-1">
              Connect:
            </span>
            {socialChannels.map((soc) => (
              <a
                key={soc.name}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={soc.name}
                className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] border border-white/10 hover:border-[#c8a45d]/60 bg-white/[0.03] hover:bg-white/[0.08] text-white/70 hover:text-[#c8a45d] transition-all text-xs font-mono"
              >
                <span className="text-white/60 group-hover:text-[#c8a45d] transition-colors">{soc.icon}</span>
                <span className="text-[11px] tracking-wide">{soc.name}</span>
                <ArrowUpRight className="w-3 h-3 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            ))}
          </div>
        </div>

        {/* Footer: MedhaArc Labs | X Private Limited */}
        <footer className="w-full border-t border-white/10 pt-4 pb-2 text-xs text-white/50 tracking-wider flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span>{siteConfig.closing.footerText}</span>
            <span className="text-white/20 select-none">•</span>
            <a
              href="https://www.medhaarc.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c8a45d] hover:underline"
            >
              medhaarc.com
            </a>
          </div>
          <div className="flex items-center gap-6">
            <span>{siteConfig.tagline}</span>
          </div>
        </footer>
      </div>
    </ChapterShell>
  );
};
