import React, { useRef, useEffect } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { ArrowUpRight, Globe, Mail, Calendar, Sparkles } from 'lucide-react';
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
      fullBleed={true}
      className="relative w-full h-[100svh] overflow-hidden bg-[#070B10]"
    >
      {/* Background Drone Media with Dynamic Ambient Lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <img
          src="/assets/medhaarc_hero_drone.webp"
          alt="MedhaArc Labs Autonomous Drone Prototype"
          className="w-full h-full object-cover object-center filter saturate-[0.6] contrast-[1.12] brightness-[0.4] scale-105"
        />
        {/* Soft Vignette and Radial Atmospheric Lighting */}
        <div className="absolute inset-0 bg-radial-[at_50%_40%] from-transparent via-[#070B10]/80 to-[#070B10]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B10] via-transparent to-[#070B10]/70" />
        
        {/* Subtle Engineering Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Main Viewport Container (Centered in 100svh window) */}
      <div
        ref={containerRef}
        className="relative z-10 w-full my-auto flex flex-col justify-center py-3 sm:py-4 px-4 sm:px-8 lg:px-14 box-border select-none"
      >
        {/* Top Header: Eyebrow, Main Title & Vision Quote (Outside Box) */}
        <div className="max-w-4xl mx-auto text-center mb-5 sm:mb-6">
          <div className="flex items-center justify-center gap-2 mb-2 sm:mb-2.5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c8a45d] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c8a45d]" />
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-[#c8a45d] font-bold">
              {siteConfig.closing.eyebrow}
            </span>
          </div>

          <h2
            ref={headlineRef}
            className="font-serif text-[clamp(26px,3.8vw,48px)] font-normal leading-[1.14] tracking-tight text-white mb-2 text-center"
          >
            {siteConfig.closing.headline}
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-white/80 font-serif italic leading-relaxed text-center">
            &ldquo;{siteConfig.closing.line}&rdquo;
          </p>
        </div>

        {/* Center: The Architectural Executive Action Hub Box */}
        <div className="w-full max-w-[1240px] mx-auto bg-[#0A1017]/85 backdrop-blur-2xl border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.12)] p-5 sm:p-6 lg:p-7 relative overflow-hidden mb-3">
          
          {/* Subtle Decorative Architectural Corner Crosshairs */}
          <span className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#c8a45d]/60 pointer-events-none" />
          <span className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#c8a45d]/60 pointer-events-none" />
          <span className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#c8a45d]/60 pointer-events-none" />
          <span className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#c8a45d]/60 pointer-events-none" />

          {/* Top Domain Pill Strip inside Box */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pb-3.5 mb-4 border-b border-white/10">
            {siteConfig.closing.domainsRow.map((domain) => (
              <span
                key={domain}
                className="font-mono text-[9.5px] uppercase tracking-wider px-2.5 py-0.5 rounded-[2px] bg-white/[0.05] border border-white/10 text-white/70"
              >
                {domain}
              </span>
            ))}
          </div>

          {/* Executive Interaction Hub: Compact, Refined Tactile Channels (Centered) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-4">
            {/* Primary Action Button: Schedule Consultation */}
            <button
              onClick={onOpenContact}
              className="group inline-flex items-center gap-2 px-3.5 sm:px-4.5 py-2 bg-gradient-to-r from-[#c8a45d] to-[#dfc07e] hover:from-[#dfc07e] hover:to-[#e8ce97] text-[#0A1016] font-mono text-[11px] sm:text-xs uppercase tracking-wider font-bold shadow-[0_4px_16px_rgba(200,164,93,0.25)] hover:shadow-[0_8px_20px_rgba(200,164,93,0.4)] transition-all cursor-pointer active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5 text-[#0A1016]" />
              <span>{siteConfig.closing.ctaText}</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Direct Official Website Capsule */}
            <a
              href={siteConfig.closing.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-3 sm:px-3.5 py-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-[#c8a45d]/70 text-white font-mono text-[11px] sm:text-xs tracking-wide transition-all cursor-pointer"
            >
              <Globe className="w-3 h-3 text-[#c8a45d]" />
              <span>www.medhaarc.com</span>
              <ArrowUpRight className="w-3 h-3 text-white/40 group-hover:text-[#c8a45d] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Direct Institutional Inquiries Email Capsule */}
            <a
              href="mailto:team@medhaarc.com"
              className="group inline-flex items-center gap-2 px-3 sm:px-3.5 py-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-[#c8a45d]/70 text-white font-mono text-[11px] sm:text-xs tracking-wide transition-all cursor-pointer"
            >
              <Mail className="w-3 h-3 text-[#c8a45d]" />
              <span>team@medhaarc.com</span>
              <ArrowUpRight className="w-3 h-3 text-white/40 group-hover:text-[#c8a45d] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Social Channels Strip */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3.5 border-t border-white/10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c8a45d] font-bold mr-1">
                Official Channels:
              </span>
              {socialChannels.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={soc.name}
                  className="group inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#c8a45d]/60 rounded-none text-white/70 hover:text-[#c8a45d] transition-all text-[11px] font-mono"
                >
                  <span className="text-white/60 group-hover:text-[#c8a45d] transition-colors">
                    {soc.icon}
                  </span>
                  <span className="text-[10.5px] tracking-wide">{soc.name}</span>
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono text-white/45">
              <Sparkles className="w-3 h-3 text-[#c8a45d]/80" />
              <span>K-12 School Technology Innovation Ecosystem</span>
            </div>
          </div>
        </div>

        {/* Bottom Publication Footer */}
        <footer className="w-full max-w-[1240px] mx-auto border-t border-white/10 pt-3 pb-1 text-xs text-white/50 tracking-wider flex flex-col sm:flex-row items-center justify-between gap-2">
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
          <div className="flex items-center gap-4">
            <span className="font-serif italic text-white/60">{siteConfig.tagline}</span>
          </div>
        </footer>
      </div>
    </ChapterShell>
  );
};

export default ClosingSection;
