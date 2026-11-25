import React, { useRef, useEffect } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { Check, School, Settings } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const RequirementsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lCol = leftColRef.current;
    const rCol = rightColRef.current;
    if (!lCol || !rCol) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // Failsafe: force visibility
    const failsafe = setTimeout(() => {
      lCol.style.opacity = '1';
      lCol.style.transform = 'none';
      rCol.style.opacity = '1';
      rCol.style.transform = 'none';
    }, 2500);

    if (prefersReducedMotion || isMobile || !document.documentElement.classList.contains('js-motion')) {
      lCol.style.opacity = '1';
      lCol.style.transform = 'none';
      rCol.style.opacity = '1';
      rCol.style.transform = 'none';
      return () => clearTimeout(failsafe);
    }

    const ctx = gsap.context(() => {
      // Left column slides in from left
      gsap.fromTo(
        lCol,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: lCol,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Right column slides in from right
      gsap.fromTo(
        rCol,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rCol,
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

  const handleScrollToNext = () => {
    window.dispatchEvent(new CustomEvent('go-to-slide', { detail: 12 }));
  };

  const schoolItems = siteConfig.requirements.columns[0].items;
  const medhaarcItems = siteConfig.requirements.columns[1].items;

  return (
    <ChapterShell
      id="requirements"
      chapterNumber="12"
      theme="light"
      fullBleed={true}
      className="relative w-full min-h-[100svh] lg:h-[100svh] overflow-y-auto lg:overflow-hidden select-none bg-[#FAF8F5]"
    >
      {/* Centered Main Viewport Container */}
      <div
        ref={containerRef}
        className="relative w-full my-auto flex flex-col justify-center pt-14 pb-8 lg:py-8 px-4 sm:px-6 lg:px-8 xl:px-12 box-border select-none z-10 max-w-[1280px] mx-auto"
      >
        {/* Eyebrow & Headline Matching Image 1 Reference */}
        <div className="flex-none max-w-4xl mx-auto text-center flex flex-col items-center mb-6 sm:mb-8 lg:mb-10">
          <div className="flex items-center justify-center gap-3 mb-1.5 sm:mb-2">
            <span className="h-[1px] w-6 sm:w-10 bg-[#b45309]/50" />
            <span className="font-mono text-[10.5px] sm:text-xs uppercase tracking-[0.24em] text-[#b45309] font-bold">
              {siteConfig.requirements.eyebrow}
            </span>
            <span className="h-[1px] w-6 sm:w-10 bg-[#b45309]/50" />
          </div>

          <h2 className="font-serif text-[28px] sm:text-3xl lg:text-[38px] xl:text-[42px] font-bold leading-tight tracking-tight text-[#0F172A] text-center">
            {siteConfig.requirements.headline}
          </h2>
        </div>

        {/* Two Grand Architectural Cards: School Provides vs MedhaArc Labs Delivers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 xl:gap-10 items-stretch">
          {/* Card 1: School provides */}
          <div
            ref={leftColRef}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_12px_36px_rgba(2,132,199,0.08)] border border-[#BAE6FD] border-b-[5px] border-b-[#0284C7] overflow-hidden flex flex-col transition-all hover:shadow-[0_16px_44px_rgba(2,132,199,0.13)]"
          >
            {/* Top Header Bar with Soft Blue Gradient */}
            <div className="relative bg-gradient-to-r from-[#E0F2FE]/85 via-[#F0F9FF] to-[#E0F2FE]/50 px-6 py-4.5 sm:px-7 sm:py-5 flex items-center gap-4 border-b border-[#BAE6FD]/60">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-[#BAE6FD] shadow-xs flex items-center justify-center shrink-0">
                <School className="w-6 h-6 text-[#0284C7]" />
              </div>
              <h3 className="font-serif text-2xl sm:text-[26px] font-bold text-[#0F172A] tracking-tight">
                {siteConfig.requirements.columns[0].title}
              </h3>
            </div>

            {/* List Items */}
            <div className="p-6 sm:p-7 lg:p-8 flex-1 flex flex-col justify-between">
              <ul className="space-y-4 sm:space-y-4.5">
                {schoolItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3.5 pb-4 border-b border-slate-100 last:border-b-0 last:pb-0"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#E0F2FE] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-[#0284C7] stroke-[3]" />
                    </span>
                    <span className="font-sans text-[14px] sm:text-[14.5px] lg:text-[15px] text-[#1E293B] font-medium leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 2: MedhaArc Labs delivers */}
          <div
            ref={rightColRef}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_12px_36px_rgba(217,119,6,0.08)] border border-[#FDE68A] border-b-[5px] border-b-[#D97706] overflow-hidden flex flex-col transition-all hover:shadow-[0_16px_44px_rgba(217,119,6,0.13)]"
          >
            {/* Top Header Bar with Soft Amber Gradient */}
            <div className="relative bg-gradient-to-r from-[#FEF3C7]/85 via-[#FFFBEB] to-[#FEF3C7]/50 px-6 py-4.5 sm:px-7 sm:py-5 flex items-center gap-4 border-b border-[#FDE68A]/60">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-[#FDE68A] shadow-xs flex items-center justify-center shrink-0">
                <Settings className="w-6 h-6 text-[#B45309]" />
              </div>
              <h3 className="font-serif text-2xl sm:text-[26px] text-[#0F172A] tracking-tight">
                <span className="font-normal">MedhaArc Labs </span>
                <span className="font-bold">delivers</span>
              </h3>
            </div>

            {/* List Items */}
            <div className="p-6 sm:p-7 lg:p-8 flex-1 flex flex-col justify-between">
              <ul className="space-y-4 sm:space-y-4.5">
                {medhaarcItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3.5 pb-4 border-b border-slate-100 last:border-b-0 last:pb-0"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#FEF3C7] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-[#D97706] stroke-[3]" />
                    </span>
                    <span className="font-sans text-[14px] sm:text-[14.5px] lg:text-[15px] text-[#1E293B] font-medium leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Trailing Navigation CTA */}
        <div className="flex-none pt-6 sm:pt-8 flex items-center justify-center">
          <button
            type="button"
            onClick={handleScrollToNext}
            className="group flex items-center justify-center text-center focus:outline-none cursor-pointer"
          >
            <span className="font-sans font-bold text-[9.5px] sm:text-[10px] uppercase tracking-[0.2em] text-[#64748B] group-hover:text-[#c8a45d] transition-colors">
              Explore partnership investment packages →
            </span>
          </button>
        </div>
      </div>
    </ChapterShell>
  );
};

export default RequirementsSection;
