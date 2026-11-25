import React, { useRef, useState, useEffect } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { ArrowUpRight, Globe, Mail, Calendar, Check, Copy } from 'lucide-react';
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
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/people/MedhaArc/61595117606026/',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'http://linkedin.com/company/medhaarc/',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
];

export const ClosingSection: React.FC<ClosingSectionProps> = ({ onOpenContact }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.clipboard) {
      navigator.clipboard.writeText('team@medhaarc.com');
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !document.documentElement.classList.contains('js-motion')) {
      return;
    }

    const tween = gsap.fromTo(
      el,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
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
      fullBleed={true}
      className="relative w-full h-[100svh] overflow-hidden bg-[#080A0D] select-none"
    >
      {/* Dark Aerospace-Inspired Background with Clearly Visible Drone Silhouette */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <img
          src="/assets/medhaarc_hero_drone.webp"
          alt="MedhaArc Labs Autonomous Drone Prototype"
          className="w-full h-full object-cover object-center filter blur-[2px] saturate-[0.8] contrast-[1.1] brightness-[0.72] scale-105"
          loading="eager"
        />
        {/* Refined Vignette: Clear Center Visibility with Cinematic Dark Edges */}
        <div className="absolute inset-0 bg-radial-[at_50%_50%] from-[#080A0D]/20 via-[#080A0D]/55 to-[#080A0D]/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D] via-transparent to-[#080A0D]/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080A0D]/65 via-transparent to-[#080A0D]/75" />

        {/* Aerospace Precision Micro-Grid (Subtle 32px Matrix) */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Main Viewport Container (Guaranteed 100svh Full Height Composition) */}
      <div
        ref={containerRef}
        className="relative z-10 w-full min-h-[100svh] flex-1 flex flex-col justify-between pt-20 sm:pt-24 pb-4 sm:pb-6 px-5 sm:px-8 lg:px-12 box-border select-none max-w-[1280px] mx-auto"
      >
        {/* Subtle Top Anchor clearance for fixed navigation header */}
        <div className="flex-none h-2 sm:h-4" />

        {/* Central Executive Focus Area (Perfect Vertical Center) */}
        <div
          ref={contentRef}
          className="w-full max-w-3xl mx-auto flex flex-col items-center text-center my-auto py-2 sm:py-4"
        >
          {/* Eyebrow Badge (Subtle Minimal Aerospace Tag) */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-3.5 sm:mb-4.5 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8a45d] animate-pulse" />
            <span className="font-mono text-[10px] sm:text-[10.5px] uppercase tracking-[0.24em] text-[#c8a45d] font-semibold">
              {siteConfig.closing.eyebrow} &bull; Academic Partnership
            </span>
          </div>

          {/* Editorial Headline */}
          <h2 className="font-serif text-[28px] sm:text-3xl lg:text-[38px] xl:text-[42px] font-bold leading-tight tracking-tight text-[#FAF9F6] mb-2.5 sm:mb-4 max-w-4xl px-2 sm:px-0 text-center">
            {siteConfig.closing.headline}
          </h2>

          {/* Subtitle Message */}
          <p className="font-serif italic text-[14.5px] sm:text-base md:text-lg lg:text-[20px] text-white/75 leading-relaxed max-w-2xl mb-6 sm:mb-9 font-normal px-2 sm:px-0">
            &ldquo;{siteConfig.closing.line}&rdquo;
          </p>

          {/* Primary Action Button (Sophisticated Muted Champagne Gold) */}
          <button
            onClick={onOpenContact}
            className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-6 sm:px-11 py-3.5 sm:py-4 bg-gradient-to-r from-[#c8a45d] via-[#dfc07e] to-[#c8a45d] hover:brightness-110 text-[#080A0D] font-mono text-xs sm:text-[12.5px] uppercase tracking-[0.16em] sm:tracking-[0.18em] font-bold rounded-[3px] shadow-[0_4px_24px_rgba(200,164,93,0.28)] hover:shadow-[0_8px_36px_rgba(200,164,93,0.45)] hover:scale-[1.015] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#080A0D]" />
            <span>{siteConfig.closing.ctaText}</span>
            <ArrowUpRight className="w-4 h-4 text-[#080A0D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </button>

          {/* Contact & Social Links (Responsive Stack on Mobile, Single Row on Desktop) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 text-xs sm:text-[12.5px] font-mono text-white/70 mt-5 sm:mt-8 w-full max-w-sm sm:max-w-none mx-auto">
            {/* Official Email */}
            <button
              onClick={handleCopyEmail}
              className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 sm:py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#c8a45d]/40 text-white/80 hover:text-[#c8a45d] transition-all duration-200 cursor-pointer"
              title="Click to copy official email"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 font-medium">team@medhaarc.com copied!</span>
                </>
              ) : (
                <>
                  <Mail className="w-3.5 h-3.5 text-[#c8a45d]/90 group-hover:scale-110 transition-transform" />
                  <span>team@medhaarc.com</span>
                  <Copy className="w-3 h-3 text-white/30 group-hover:text-[#c8a45d] transition-colors" />
                </>
              )}
            </button>

            <span className="hidden sm:inline-block w-px h-3.5 bg-white/15 select-none" />

            {/* Official Website */}
            <a
              href={siteConfig.closing.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 sm:py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#c8a45d]/40 text-white/80 hover:text-[#c8a45d] transition-all duration-200 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#c8a45d]/90 group-hover:scale-110 transition-transform" />
              <span>medhaarc.com</span>
              <ArrowUpRight className="w-3 h-3 text-white/30 group-hover:text-[#c8a45d] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <span className="hidden sm:inline-block w-px h-3.5 bg-white/15 select-none" />

            {/* Clean Social Links */}
            <div className="flex items-center justify-center gap-2.5 sm:gap-2 mt-1 sm:mt-0">
              {socialChannels.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={soc.name}
                  title={soc.name}
                  className="w-8 h-8 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#c8a45d]/40 text-white/50 hover:text-[#c8a45d] transition-all duration-200 cursor-pointer hover:scale-105"
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Minimal Centered Publication Footer (Naturally Positioned at Bottom) */}
        <footer className="w-full flex-none border-t border-white/10 pt-3 pb-2 sm:pb-3 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-white/45 tracking-wider gap-2 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
            <span className="text-white/60 font-sans">{siteConfig.closing.footerText}</span>
            <span className="text-white/20 select-none hidden sm:inline">&bull;</span>
            <span className="font-mono text-[#c8a45d]/85">K-12 School Technology Ecosystem</span>
          </div>
          <p className="font-serif italic text-white/55 text-xs text-center sm:text-right">
            &ldquo;{siteConfig.tagline}&rdquo;
          </p>
        </footer>
      </div>
    </ChapterShell>
  );
};

export default ClosingSection;
