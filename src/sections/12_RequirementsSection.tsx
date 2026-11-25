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
        className="relative w-full h-full min-h-full flex-1 flex flex-col justify-center items-center pt-[calc(var(--header-h,64px)+2px)] pb-2 sm:pb-3 px-3 sm:px-6 lg:px-8 xl:px-10 box-border select-none z-10 max-w-[1240px] mx-auto overflow-hidden"
      >
        {/* Eyebrow & Headline Matching Image 1 Reference */}
        <div className="flex-none max-w-4xl mx-auto text-center flex flex-col items-center mb-2 sm:mb-2.5">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="h-[1px] w-6 sm:w-8 bg-[#b45309]/50" />
            <span className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.24em] text-[#b45309] font-bold">
              {siteConfig.requirements.eyebrow}
            </span>
            <span className="h-[1px] w-6 sm:w-8 bg-[#b45309]/50" />
          </div>

          <h2 className="font-serif text-xl sm:text-2xl lg:text-[27px] font-bold leading-tight tracking-tight text-[#0F172A] text-center">
            {siteConfig.requirements.headline}
          </h2>
        </div>

        {/* Two Grand Architectural Cards: School Provides vs MedhaArc Labs Delivers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-5 items-stretch w-full">
          {/* Card 1: School provides */}
          <div
            ref={leftColRef}
            className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(2,132,199,0.06)] border border-[#BAE6FD] border-b-[4px] border-b-[#0284C7] overflow-hidden flex flex-col transition-all hover:shadow-[0_14px_36px_rgba(2,132,199,0.1)]"
          >
            {/* Top Header Bar with Soft Blue Gradient */}
            <div className="relative bg-gradient-to-r from-[#E0F2FE]/85 via-[#F0F9FF] to-[#E0F2FE]/50 px-3.5 py-2 sm:px-4 sm:py-2.5 flex items-center gap-2.5 border-b border-[#BAE6FD]/60">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#BAE6FD] shadow-xs flex items-center justify-center shrink-0">
                <School className="w-4.5 h-4.5 text-[#0284C7]" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight">
                {siteConfig.requirements.columns[0].title}
              </h3>
            </div>

            {/* List Items */}
            <div className="p-3 sm:p-3.5 lg:p-4 flex-1 flex flex-col justify-between">
              <ul className="space-y-2 sm:space-y-2.5">
                {schoolItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 pb-2 border-b border-slate-100 last:border-b-0 last:pb-0"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#E0F2FE] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#0284C7] stroke-[3]" />
                    </span>
                    <span className="font-sans text-[11.5px] sm:text-xs lg:text-[12.5px] text-[#1E293B] font-medium leading-snug">
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
            className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(217,119,6,0.06)] border border-[#FDE68A] border-b-[4px] border-b-[#D97706] overflow-hidden flex flex-col transition-all hover:shadow-[0_14px_36px_rgba(217,119,6,0.1)]"
          >
            {/* Top Header Bar with Soft Amber Gradient */}
            <div className="relative bg-gradient-to-r from-[#FEF3C7]/85 via-[#FFFBEB] to-[#FEF3C7]/50 px-3.5 py-2 sm:px-4 sm:py-2.5 flex items-center gap-2.5 border-b border-[#FDE68A]/60">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#FDE68A] shadow-xs flex items-center justify-center shrink-0">
                <Settings className="w-4.5 h-4.5 text-[#B45309]" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl text-[#0F172A] tracking-tight">
                <span className="font-normal">MedhaArc Labs </span>
                <span className="font-bold">delivers</span>
              </h3>
            </div>

            {/* List Items */}
            <div className="p-3 sm:p-3.5 lg:p-4 flex-1 flex flex-col justify-between">
              <ul className="space-y-2 sm:space-y-2.5">
                {medhaarcItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 pb-2 border-b border-slate-100 last:border-b-0 last:pb-0"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#FEF3C7] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#D97706] stroke-[3]" />
                    </span>
                    <span className="font-sans text-[11.5px] sm:text-xs lg:text-[12.5px] text-[#1E293B] font-medium leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Trailing Navigation CTA */}
        <div className="flex-none pt-2 sm:pt-2.5 flex items-center justify-center">
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
