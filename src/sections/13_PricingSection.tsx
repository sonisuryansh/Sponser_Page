import React, { useRef, useEffect } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { Check, Calendar, Star, Info } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PricingSectionProps {
  onOpenContact: () => void;
}

// Custom crisp line-art SVG icons matching Image 1
const RoboticArmIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10 40h28" />
    <path d="M14 40v-4h20v4" />
    <path d="M24 36v-6" />
    <circle cx="24" cy="30" r="3" />
    <path d="M22 28l-8-12" />
    <circle cx="14" cy="16" r="3" />
    <path d="M16 14l12-6" />
    <circle cx="28" cy="8" r="2.5" />
    <path d="M30 6l4-2m-2 6l4 2" />
  </svg>
);

const StackLayersIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M24 8l16 8-16 8-16-8 16-8z" />
    <path d="M8 22l16 8 16-8" />
    <path d="M8 30l16 8 16-8" />
  </svg>
);

const DroneIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Central drone body */}
    <rect x="18" y="21" width="12" height="7" rx="3.5" fill="currentColor" fillOpacity="0.08" />
    <circle cx="24" cy="24.5" r="1.5" fill="currentColor" />
    {/* 4 Diagonal arms */}
    <path d="M19 22L12 16" />
    <path d="M29 22L36 16" />
    <path d="M19 27L12 33" />
    <path d="M29 27L36 33" />
    {/* 4 Rotors / Propellers */}
    <ellipse cx="12" cy="16" rx="5.5" ry="1.5" />
    <ellipse cx="36" cy="16" rx="5.5" ry="1.5" />
    <ellipse cx="12" cy="33" rx="5.5" ry="1.5" />
    <ellipse cx="36" cy="33" rx="5.5" ry="1.5" />
    {/* Landing skids */}
    <path d="M21 28v4m6-4v4m-8 4h10" />
  </svg>
);

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenContact }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Staggered entrance animation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const cols = el.querySelectorAll<HTMLElement>('.pricing-col');

    // Failsafe
    const failsafe = setTimeout(() => {
      cols.forEach((c) => {
        c.style.opacity = '1';
        c.style.transform = 'none';
      });
    }, 2500);

    if (prefersReducedMotion || isMobile || !document.documentElement.classList.contains('js-motion')) {
      cols.forEach((c) => {
        c.style.opacity = '1';
        c.style.transform = 'none';
      });
      return () => clearTimeout(failsafe);
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cols,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    return () => {
      clearTimeout(failsafe);
      ctx.revert();
    };
  }, []);

  const tiers = siteConfig.pricing.tiers;

  return (
    <ChapterShell
      id="pricing"
      chapterNumber="13"
      theme="light"
      fullBleed={true}
      className="relative w-full min-h-[100svh] lg:h-[100svh] overflow-y-auto lg:overflow-hidden select-none bg-[#FAF8F5]"
    >
      {/* Background ambient gentle wave curves matching Image 1 */}
      <div className="absolute top-0 left-0 w-72 sm:w-80 h-72 sm:h-80 bg-purple-100/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-72 sm:w-80 h-72 sm:h-80 bg-orange-100/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-orange-100/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-purple-100/25 rounded-full blur-3xl pointer-events-none" />

      {/* Main Viewport Container */}
      <div
        ref={containerRef}
        className="relative w-full h-full min-h-full flex-1 flex flex-col justify-between items-center pt-[calc(var(--header-h,64px)+6px)] pb-3 sm:pb-4 px-4 sm:px-6 lg:px-8 xl:px-10 box-border select-none z-10 max-w-[1440px] mx-auto overflow-hidden"
      >
        {/* Eyebrow & Headline Matching Image 1 Reference */}
        <div className="flex-none max-w-4xl mx-auto text-center flex flex-col items-center mb-2 sm:mb-3">
          <div className="flex items-center justify-center gap-2.5 mb-1 sm:mb-1.5">
            <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#b45309]" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#b45309] font-bold">
              TRANSPARENT INVESTMENT
            </span>
            <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#b45309]" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[36px] xl:text-[40px] font-bold leading-tight tracking-tight text-[#0F172A] mb-1 text-center">
            Pricing Packages
          </h2>

          <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#64748B] font-semibold text-center mb-1.5">
            PROPOSED PRICING, PER STUDENT PER MONTH
          </p>

          {/* Decorative colored bar and dots */}
          <div className="flex items-center justify-center gap-1.5">
            <span className="w-5 h-[2px] rounded-full bg-[#7C3AED]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
            <span className="w-5 h-[2px] rounded-full bg-[#EA580C]" />
          </div>
        </div>

        {/* 3 Package Columns Matching Image 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4.5 lg:gap-6 items-stretch w-full my-auto py-1 sm:py-2">
          {/* Card 1: Package 01 — Foundation */}
          <div className="pricing-col relative rounded-2xl border-2 border-[#38BDF8] bg-gradient-to-b from-[#F0F9FF] via-white to-white p-4 sm:p-5 lg:p-6 shadow-2xs flex flex-col justify-between transition-all hover:shadow-md hover:-translate-y-0.5">
            <div>
              {/* Top Row: Package Pill & Annual Structure */}
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9.5px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#BAE6FD]/80 text-[#0369A1]">
                  PACKAGE 01
                </span>
                <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Annual Structure</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight mb-1.5">
                {tiers[0].name}
              </h3>

              {/* Price & Robotic Arm Icon */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-sans text-3xl sm:text-[38px] lg:text-[42px] font-extrabold text-[#0284C7] leading-none">
                    ₹500
                  </span>
                  <span className="font-mono text-[8.5px] sm:text-[9px] uppercase tracking-wider text-slate-500 font-semibold">
                    PER STUDENT / MO
                  </span>
                </div>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#E0F2FE] border border-[#BAE6FD] flex items-center justify-center shrink-0 text-[#0284C7] shadow-2xs">
                  <RoboticArmIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-[13px] font-medium text-slate-700 pb-2 border-b border-slate-100 mb-2.5 leading-snug">
                {tiers[0].summary}
              </p>

              {/* Feature Checkmarks */}
              <ul className="space-y-1.5 sm:space-y-2 mb-3">
                {tiers[0].features.map((feat, fIdx) => (
                  <li
                    key={fIdx}
                    className="flex items-start gap-2 text-xs sm:text-[12.5px] text-slate-600 font-medium leading-snug"
                  >
                    <Check className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5 stroke-[2.5]" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={onOpenContact}
              className="w-full py-2.5 px-3 rounded-xl border-2 border-[#38BDF8] bg-white text-[#0284C7] hover:bg-[#F0F9FF] font-mono text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs mt-2"
            >
              <span>INQUIRE ABOUT FOUNDATION</span>
              <span>→</span>
            </button>
          </div>

          {/* Card 2: Package 02 — Professional (MOST POPULAR) */}
          <div className="pricing-col relative rounded-2xl border-2 border-[#F97316] bg-gradient-to-b from-[#FFF7ED] via-white to-white p-4 sm:p-5 lg:p-6 shadow-xs flex flex-col justify-between transition-all hover:shadow-md hover:-translate-y-0.5">
            {/* Floating "MOST POPULAR" Ribbon Pill */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
              <div className="flex items-center gap-1 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#EA580C] to-[#C2410C] text-white text-[9px] sm:text-[9.5px] font-bold uppercase tracking-wider shadow-xs">
                <Star className="w-2.5 h-2.5 fill-white text-white" />
                <span>MOST POPULAR</span>
              </div>
            </div>

            <div>
              {/* Top Row: Package Pill & Annual Structure */}
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9.5px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FED7AA]/80 text-[#C2410C]">
                  PACKAGE 02
                </span>
                <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>Annual Structure</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight mb-1.5">
                {tiers[1].name}
              </h3>

              {/* Price & Layers Icon */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-sans text-3xl sm:text-[38px] lg:text-[42px] font-extrabold text-[#EA580C] leading-none">
                    ₹600
                  </span>
                  <span className="font-mono text-[8.5px] sm:text-[9px] uppercase tracking-wider text-slate-500 font-semibold">
                    PER STUDENT / MO
                  </span>
                </div>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#FFEDD5] border border-[#FED7AA] flex items-center justify-center shrink-0 text-[#EA580C] shadow-2xs">
                  <StackLayersIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-[13px] font-medium text-slate-700 pb-2 border-b border-orange-100 mb-2.5 leading-snug">
                {tiers[1].summary}
              </p>

              {/* Feature Checkmarks */}
              <ul className="space-y-1.5 sm:space-y-2 mb-3">
                {tiers[1].features.map((feat, fIdx) => (
                  <li
                    key={fIdx}
                    className="flex items-start gap-2 text-xs sm:text-[12.5px] text-slate-600 font-medium leading-snug"
                  >
                    <Check className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5 stroke-[2.5]" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={onOpenContact}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#C2410C] hover:to-[#9A3412] text-white font-mono text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs hover:shadow-md mt-2"
            >
              <span>INQUIRE ABOUT PROFESSIONAL</span>
              <span>→</span>
            </button>
          </div>

          {/* Card 3: Package 03 — Premium */}
          <div className="pricing-col relative rounded-2xl border-2 border-[#C084FC] bg-gradient-to-b from-[#FAF5FF] via-white to-white p-4 sm:p-5 lg:p-6 shadow-2xs flex flex-col justify-between transition-all hover:shadow-md hover:-translate-y-0.5">
            <div>
              {/* Top Row: Package Pill & Annual Structure */}
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9.5px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#E9D5FF]/80 text-[#7E22CE]">
                  PACKAGE 03
                </span>
                <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Annual Structure</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight mb-1.5">
                {tiers[2].name}
              </h3>

              {/* Price & Drone Icon */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-sans text-3xl sm:text-[38px] lg:text-[42px] font-extrabold text-[#7C3AED] leading-none">
                    ₹700
                  </span>
                  <span className="font-mono text-[8.5px] sm:text-[9px] uppercase tracking-wider text-slate-500 font-semibold">
                    PER STUDENT / MO
                  </span>
                </div>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#F3E8FF] border border-[#E9D5FF] flex items-center justify-center shrink-0 text-[#9333EA] shadow-2xs">
                  <DroneIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-[13px] font-medium text-slate-700 pb-2 border-b border-slate-100 mb-2.5 leading-snug">
                {tiers[2].summary}
              </p>

              {/* Feature Checkmarks */}
              <ul className="space-y-1.5 sm:space-y-2 mb-3">
                {tiers[2].features.map((feat, fIdx) => (
                  <li
                    key={fIdx}
                    className="flex items-start gap-2 text-xs sm:text-[12.5px] text-slate-600 font-medium leading-snug"
                  >
                    <Check className="w-4 h-4 text-[#7C3AED] shrink-0 mt-0.5 stroke-[2.5]" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={onOpenContact}
              className="w-full py-2.5 px-3 rounded-xl border-2 border-[#C084FC] bg-white text-[#7C3AED] hover:bg-[#FAF5FF] font-mono text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs mt-2"
            >
              <span>INQUIRE ABOUT PREMIUM</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Comprehensive Inclusions Strip */}
        <div className="w-full flex-none mt-2 sm:mt-2.5 p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-left">
            <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-[#7C3AED] shrink-0 font-bold text-sm shadow-2xs">
              ✓
            </div>
            <div>
              <span className="font-sans font-bold text-xs sm:text-sm text-[#0F172A] block leading-tight">
                All-Inclusive Turnkey Delivery Across Every Tier
              </span>
              <span className="font-sans text-[11px] sm:text-xs text-[#64748B] leading-tight">
                Dedicated MedhaArc Mentors conduct all sessions &bull; Hardware kits &amp; replacements included &bull; 4–5 Teacher AI workshops &bull; Zero faculty prep.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10.5px] text-[#7C3AED] font-semibold bg-purple-50 px-3 py-1.5 rounded-full border border-purple-200 shrink-0">
            <span>Annual Institutional Model</span>
          </div>
        </div>

        {/* Bottom Footnote Pill Matching Image 1 */}
        <div className="flex-none mt-1.5 sm:mt-2 max-w-4xl mx-auto w-full">
          <div className="bg-white/95 border border-slate-200/90 rounded-full px-4 py-1.5 shadow-2xs flex items-center justify-center gap-2 text-center">
            <Info className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <p className="font-sans text-[10px] sm:text-[11px] text-slate-600 leading-tight font-normal">
              {siteConfig.pricing.footnote}
              {siteConfig.confirm.pricingFootnoteExtra && ` ${siteConfig.confirm.pricingFootnoteExtra}`}
            </p>
          </div>
        </div>
      </div>
    </ChapterShell>
  );
};

export default PricingSection;
