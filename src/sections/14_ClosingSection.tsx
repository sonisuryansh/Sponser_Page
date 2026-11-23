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
      className="relative w-full h-[100svh] overflow-hidden bg-[#070A0F]"
    >
      {/* Background Drone Media with Atmospheric Radial Warm Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <img
          src="/assets/medhaarc_hero_drone.webp"
          alt="MedhaArc Labs Autonomous Drone Prototype"
          className="w-full h-full object-cover object-center filter saturate-[0.4] contrast-[1.15] brightness-[0.24] scale-105"
        />
        {/* Ambient Center Glow & Subtle Vignette */}
        <div className="absolute inset-0 bg-radial-[at_50%_50%] from-[#c8a45d]/[0.08] via-transparent to-[#070A0F]/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A0F] via-transparent to-[#070A0F]/85" />

        {/* Minimal Precision Dot Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Main Viewport Container */}
      <div
        ref={containerRef}
        className="relative z-10 w-full h-full max-w-[1240px] mx-auto flex flex-col justify-between pt-20 pb-5 px-6 sm:px-8 lg:px-12 box-border select-none"
      >
        <div /> {/* Top spacing */}

        {/* Central Executive Focus Area */}
        <div
          ref={contentRef}
          className="w-full max-w-3xl mx-auto flex flex-col items-center text-center my-auto"
        >
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4 sm:mb-5 backdrop-blur-sm">
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c8a45d] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#c8a45d]" />
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#c8a45d] font-semibold">
              {siteConfig.closing.eyebrow} • Academic Partnership
            </span>
          </div>

          {/* Editorial Headline */}
          <h2 className="font-serif text-[clamp(32px,5.2vw,58px)] font-normal leading-[1.12] tracking-tight text-white mb-4 sm:mb-5">
            {siteConfig.closing.headline}
          </h2>

          {/* Subtitle Quote */}
          <p className="text-base sm:text-lg md:text-xl text-white/75 font-serif italic leading-relaxed max-w-2xl mb-8 sm:mb-10">
            &ldquo;{siteConfig.closing.line}&rdquo;
          </p>

          {/* Primary Action Button */}
          <button
            onClick={onOpenContact}
            className="group inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 bg-gradient-to-r from-[#c8a45d] via-[#dfc07e] to-[#c8a45d] hover:brightness-110 text-[#070A0F] font-mono text-xs sm:text-[13px] uppercase tracking-[0.16em] font-bold rounded-[3px] shadow-[0_6px_28px_rgba(200,164,93,0.32)] hover:shadow-[0_8px_36px_rgba(200,164,93,0.5)] transition-all cursor-pointer active:scale-[0.98] mb-8"
          >
            <Calendar className="w-4 h-4 text-[#070A0F]" />
            <span>{siteConfig.closing.ctaText}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Minimal Direct Channels Row (Clean, uncluttered, no chunky boxes) */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-[13px] font-mono text-white/70">
            {/* Institutional Email */}
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 hover:text-[#c8a45d] transition-colors cursor-pointer group"
              title="Click to copy official email"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">Email Copied!</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 text-[#c8a45d]/80 group-hover:text-[#c8a45d] transition-colors" />
                  <span>team@medhaarc.com</span>
                  <Copy className="w-3.5 h-3.5 text-white/30 group-hover:text-[#c8a45d] transition-colors" />
                </>
              )}
            </button>

            <span className="text-white/20 select-none">•</span>

            {/* Official Website */}
            <a
              href={siteConfig.closing.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-[#c8a45d] transition-colors group cursor-pointer"
            >
              <Globe className="w-4 h-4 text-[#c8a45d]/80 group-hover:text-[#c8a45d] transition-colors" />
              <span>medhaarc.com</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-[#c8a45d] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <span className="text-white/20 select-none hidden sm:inline">•</span>

            {/* Clean Social Icons */}
            <div className="flex items-center gap-3">
              {socialChannels.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={soc.name}
                  className="text-white/50 hover:text-[#c8a45d] transition-colors p-1"
                  title={soc.name}
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Minimal Centered Publication Footer */}
        <footer className="w-full border-t border-white/10 pt-4 pb-2 flex flex-col sm:flex-row items-center justify-between text-xs text-white/45 tracking-wider gap-2">
          <div className="flex items-center gap-2">
            <span>{siteConfig.closing.footerText}</span>
            <span className="text-white/20 select-none">•</span>
            <span className="font-mono text-[#c8a45d]/80">K-12 School Ecosystem</span>
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
