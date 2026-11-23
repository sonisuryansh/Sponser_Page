import React, { useRef, useState, useEffect } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { ArrowUpRight, Globe, Mail, Calendar, Check, Copy, Bot, Cpu, BarChart3, Plane } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ClosingSectionProps {
  onOpenContact: () => void;
}

const domainCapabilities = [
  {
    name: 'Robotics & Automation',
    icon: Bot,
    tagline: 'Physical hardware builds, servo kinematics & autonomous microcontroller circuits',
    badge: 'Grade 4–10 Progression',
  },
  {
    name: 'AI & Machine Learning',
    icon: Cpu,
    tagline: 'Computer vision classifiers, predictive logic & real-time edge neural inference',
    badge: 'Applied Machine Intelligence',
  },
  {
    name: 'Data Analytics',
    icon: BarChart3,
    tagline: 'Sensor telemetry pipelines, environmental data logging & visual computational analytics',
    badge: 'Real-World Data Systems',
  },
  {
    name: 'Aerial Systems',
    icon: Plane,
    tagline: 'Aerodynamic stability, quadcopter telemetry & hoop navigation flight rigs',
    badge: 'Autonomous Flight Engineering',
  },
];

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
  const [activeDomainIdx, setActiveDomainIdx] = useState<number>(0);
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
    const el = headlineRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !document.documentElement.classList.contains('js-motion')) {
      return;
    }

    const tween = gsap.fromTo(
      el,
      { y: 25, opacity: 0.2 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
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

  const activeCapability = domainCapabilities[activeDomainIdx];
  const ActiveIcon = activeCapability.icon;

  return (
    <ChapterShell
      id="closing"
      chapterNumber="14"
      theme="dark"
      fullBleed={true}
      className="relative w-full h-[100svh] overflow-hidden bg-[#06090E]"
    >
      {/* Background Drone Media with Atmospheric Radial Warm Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <img
          src="/assets/medhaarc_hero_drone.webp"
          alt="MedhaArc Labs Autonomous Drone Prototype"
          className="w-full h-full object-cover object-center filter saturate-[0.5] contrast-[1.15] brightness-[0.32] scale-105"
        />
        {/* Ambient Center Glow & Subtle Vignette */}
        <div className="absolute inset-0 bg-radial-[at_50%_50%] from-[#c8a45d]/[0.08] via-transparent to-[#06090E]/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06090E] via-transparent to-[#06090E]/80" />

        {/* Minimal Precision Dot Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      {/* Main Viewport Container - 100% Centered, Air-Gapped, No Enclosed Card Box */}
      <div
        ref={containerRef}
        className="relative z-10 w-full h-full max-w-[1240px] mx-auto flex flex-col justify-between py-6 sm:py-8 px-4 sm:px-6 lg:px-8 box-border select-none"
      >
        {/* Top Centered Header */}
        <div className="w-full text-center mt-auto mb-4 sm:mb-5">
          {/* Eyebrow with Beacon */}
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-3 sm:mb-3.5 backdrop-blur-sm">
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c8a45d] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#c8a45d]" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#c8a45d] font-semibold">
              {siteConfig.closing.eyebrow}
            </span>
          </div>

          {/* Editorial Serif Headline */}
          <h2
            ref={headlineRef}
            className="font-serif text-[clamp(28px,4.2vw,50px)] font-normal leading-[1.12] tracking-tight text-white mb-2.5 max-w-4xl mx-auto text-center"
          >
            {siteConfig.closing.headline}
          </h2>

          {/* Subtitle Quote */}
          <p className="text-sm sm:text-base md:text-lg text-white/75 font-serif italic leading-relaxed max-w-2xl mx-auto text-center">
            &ldquo;{siteConfig.closing.line}&rdquo;
          </p>
        </div>

        {/* Interactive Centerpiece: Domain Capabilities Switcher (Minimal, Centered, No Card) */}
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center my-auto py-2">
          {/* Interactive Domain Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-3.5">
            {domainCapabilities.map((domain, idx) => {
              const Icon = domain.icon;
              const isActive = activeDomainIdx === idx;

              return (
                <button
                  key={domain.name}
                  onClick={() => setActiveDomainIdx(idx)}
                  className={`group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[3px] text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#c8a45d]/15 border border-[#c8a45d] text-[#c8a45d] shadow-[0_0_20px_rgba(200,164,93,0.2)]'
                      : 'bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-white/60 hover:text-white/90'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 transition-colors ${isActive ? 'text-[#c8a45d]' : 'text-white/40 group-hover:text-white/80'}`} />
                  <span>{domain.name}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Interactive Domain Detail Capsule (Centered Reveal) */}
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[2px] bg-white/[0.03] border border-white/10 backdrop-blur-md text-center max-w-xl animate-in fade-in zoom-in-95 duration-200">
            <ActiveIcon className="w-4 h-4 text-[#c8a45d] shrink-0" />
            <p className="font-sans text-xs sm:text-[13px] text-white/85 leading-snug">
              {activeCapability.tagline}
            </p>
            <span className="hidden sm:inline-block font-mono text-[9px] uppercase tracking-wider text-[#c8a45d] bg-[#c8a45d]/10 px-1.5 py-0.5 rounded-[2px] border border-[#c8a45d]/20 shrink-0 ml-1">
              {activeCapability.badge}
            </span>
          </div>
        </div>

        {/* Executive Action Hub: Clean, Glowing Centered CTAs */}
        <div className="w-full flex flex-col items-center justify-center gap-4 my-auto">
          {/* Primary & Direct Action Buttons Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {/* Primary Action Button: Schedule Consultation */}
            <button
              onClick={onOpenContact}
              className="group inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#c8a45d] via-[#dfc07e] to-[#c8a45d] hover:brightness-105 text-[#0A1016] font-mono text-xs sm:text-[12.5px] uppercase tracking-wider font-bold rounded-[3px] shadow-[0_4px_24px_rgba(200,164,93,0.32)] hover:shadow-[0_6px_32px_rgba(200,164,93,0.5)] transition-all cursor-pointer active:scale-95"
            >
              <Calendar className="w-4 h-4 text-[#0A1016]" />
              <span>{siteConfig.closing.ctaText}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Direct Official Website Capsule */}
            <a
              href={siteConfig.closing.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-4 py-2.5 sm:py-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-[#c8a45d]/60 rounded-[3px] text-white font-mono text-xs tracking-wide transition-all cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#c8a45d]" />
              <span>www.medhaarc.com</span>
              <ArrowUpRight className="w-3 h-3 text-white/40 group-hover:text-[#c8a45d] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Direct Institutional Email Capsule with 1-Click Copy */}
            <button
              onClick={handleCopyEmail}
              className="group inline-flex items-center gap-2 px-4 py-2.5 sm:py-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-[#c8a45d]/60 rounded-[3px] text-white font-mono text-xs tracking-wide transition-all cursor-pointer relative"
              title="Click to copy email address"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">Email Copied!</span>
                </>
              ) : (
                <>
                  <Mail className="w-3.5 h-3.5 text-[#c8a45d]" />
                  <span>team@medhaarc.com</span>
                  <Copy className="w-3 h-3 text-white/40 group-hover:text-[#c8a45d] transition-colors" />
                </>
              )}
            </button>
          </div>

          {/* Social Channels Centered Strip */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 pt-2">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-[#c8a45d] font-semibold mr-1">
              Connect:
            </span>
            {socialChannels.map((soc) => (
              <a
                key={soc.name}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={soc.name}
                className="group inline-flex items-center gap-1.5 px-3 py-1 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#c8a45d]/50 rounded-[2px] text-white/70 hover:text-[#c8a45d] transition-all text-[11px] font-mono"
              >
                <span className="text-white/60 group-hover:text-[#c8a45d] transition-colors">
                  {soc.icon}
                </span>
                <span className="text-[10.5px] tracking-wide">{soc.name}</span>
                <ArrowUpRight className="w-2.5 h-2.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            ))}
          </div>
        </div>

        {/* Minimal Centered Publication Footer */}
        <footer className="w-full text-center border-t border-white/10 pt-3 pb-1 text-xs text-white/50 tracking-wider flex flex-col items-center justify-center gap-1.5 mb-auto">
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <span>{siteConfig.closing.footerText}</span>
            <span className="text-white/20 select-none">•</span>
            <span className="font-mono text-[#c8a45d]/90">K-12 School Technology Innovation Ecosystem</span>
          </div>
          <p className="font-serif italic text-white/60 text-xs">
            &ldquo;{siteConfig.tagline}&rdquo;
          </p>
        </footer>
      </div>
    </ChapterShell>
  );
};

export default ClosingSection;
