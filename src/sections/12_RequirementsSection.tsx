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

  const schoolRequirements = [
    {
      title: 'Dedicated Lab Space',
      detail: 'Minimum 600 sq ft, well-lit and ventilated dedicated room for hands-on engineering.',
      tag: 'Facilities',
    },
    {
      title: 'Student Computers',
      detail: 'Standard desktop or laptop systems for embedded programming, CAD, and telemetry.',
      tag: 'Hardware',
    },
    {
      title: 'Tables & Power Infrastructure',
      detail: 'Collaborative workbenches with accessible, safe multi-point power outlets.',
      tag: 'Setup',
    },
    {
      title: 'Student Timetable Scheduling',
      detail: 'Designated 40 to 60 minute periods per batch (recommended ~40 students per session).',
      tag: 'Schedule',
    },
  ];

  const medhaarcDeliverables = [
    {
      title: 'Turnkey Curriculum & Session Plans',
      detail: 'Complete Grade 3–12 progressive engineering syllabus, reviewed and updated annually.',
      tag: 'Academic',
    },
    {
      title: 'Engineering Kits & Consumables',
      detail: 'Robotics kits, microcontrollers, sensors, motors, breadboards, and replacement parts.',
      tag: 'Equipment',
    },
    {
      title: 'Dedicated Expert Instructors',
      detail: 'MedhaArc Mentors conduct and lead every student session with zero prep for school faculty.',
      tag: 'Mentorship',
    },
    {
      title: 'Teacher AI Upskilling Workshops',
      detail: '4–5 practical AI productivity workshops for school teachers, plus released digital resources.',
      tag: 'Empowerment',
    },
  ];

  return (
    <ChapterShell
      id="requirements"
      chapterNumber="12"
      theme="light"
      fullBleed={true}
      className="relative w-full h-[100svh] overflow-hidden select-none bg-[#FAF8F5]"
    >
      {/* Centered Main Viewport Container */}
      <div
        ref={containerRef}
        className="relative w-full h-full min-h-full flex-1 flex flex-col justify-between items-center pt-[calc(var(--header-h,64px)+2px)] pb-2 sm:pb-3 px-4 sm:px-6 lg:px-8 xl:px-10 box-border select-none z-10 max-w-[1440px] mx-auto overflow-hidden"
      >
        {/* Eyebrow & Grand Headline */}
        <div className="flex-none max-w-4xl mx-auto text-center flex flex-col items-center mb-1.5 sm:mb-2">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="h-[1.5px] w-6 sm:w-10 bg-gradient-to-r from-transparent to-[#b45309]" />
            <span className="font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.24em] text-[#b45309] font-bold">
              {siteConfig.requirements.eyebrow}
            </span>
            <span className="h-[1.5px] w-6 sm:w-10 bg-gradient-to-l from-transparent to-[#b45309]" />
          </div>

          <h2 className="font-serif text-xl sm:text-2xl lg:text-[28px] xl:text-[34px] font-bold leading-tight tracking-tight text-[#0F172A] text-center">
            {siteConfig.requirements.headline}
          </h2>

          <p className="font-sans text-[11px] sm:text-xs text-[#475569] leading-snug max-w-2xl text-center mt-0.5 font-normal">
            A transparent division of infrastructure and academic responsibilities ensuring seamless turnkey operations with zero load on school teachers.
          </p>
        </div>

        {/* Two Majestic Architectural Cards: School Provides vs MedhaArc Labs Delivers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 items-stretch w-full flex-1 my-1 sm:my-1.5 min-h-0">
          {/* Card 1: School provides */}
          <div
            ref={leftColRef}
            className="bg-white rounded-xl sm:rounded-2xl shadow-[0_10px_30px_rgba(2,132,199,0.06)] border-2 border-[#BAE6FD] border-b-[4px] border-b-[#0284C7] overflow-hidden flex flex-col justify-between transition-all hover:shadow-[0_16px_36px_rgba(2,132,199,0.12)]"
          >
            {/* Top Header Bar with Soft Blue Gradient */}
            <div className="relative bg-gradient-to-r from-[#E0F2FE] via-[#F0F9FF] to-[#E0F2FE]/60 px-4 py-2 sm:px-5 sm:py-2.5 flex items-center justify-between border-b border-[#BAE6FD]/80 flex-none">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white border border-[#BAE6FD] shadow-xs flex items-center justify-center shrink-0">
                  <School className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0284C7]" />
                </div>
                <div>
                  <span className="font-mono text-[8.5px] uppercase tracking-wider text-[#0284C7] font-bold block leading-none mb-0.5">
                    FACILITY &amp; ACCESS
                  </span>
                  <h3 className="font-serif text-base sm:text-lg lg:text-xl font-bold text-[#0F172A] tracking-tight leading-tight">
                    {siteConfig.requirements.columns[0].title}
                  </h3>
                </div>
              </div>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-sky-100 text-[#0369A1] font-mono text-[9px] font-bold border border-sky-200">
                School Space
              </span>
            </div>

            {/* List Items */}
            <div className="p-3 sm:p-4 lg:p-4.5 flex-1 flex flex-col justify-between overflow-hidden">
              <ul className="space-y-1.5 sm:space-y-2 lg:space-y-2.5 flex-1 flex flex-col justify-between">
                {schoolRequirements.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 pb-1.5 sm:pb-2 border-b border-slate-100/90 last:border-b-0 last:pb-0"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="font-sans text-xs sm:text-[13px] lg:text-[13.5px] font-bold text-[#0F172A] leading-tight">
                          {item.title}
                        </span>
                        <span className="font-mono text-[8.5px] uppercase px-1.5 py-0.2 rounded bg-slate-100 text-slate-500 font-semibold shrink-0">
                          {item.tag}
                        </span>
                      </div>
                      <p className="font-sans text-[10.5px] sm:text-[11px] lg:text-[11.5px] text-[#475569] leading-tight mt-0.5 line-clamp-2">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 2: MedhaArc Labs delivers */}
          <div
            ref={rightColRef}
            className="bg-white rounded-xl sm:rounded-2xl shadow-[0_10px_30px_rgba(217,119,6,0.06)] border-2 border-[#FDE68A] border-b-[4px] border-b-[#D97706] overflow-hidden flex flex-col justify-between transition-all hover:shadow-[0_16px_36px_rgba(217,119,6,0.12)]"
          >
            {/* Top Header Bar with Soft Amber Gradient */}
            <div className="relative bg-gradient-to-r from-[#FEF3C7] via-[#FFFBEB] to-[#FEF3C7]/60 px-4 py-2 sm:px-5 sm:py-2.5 flex items-center justify-between border-b border-[#FDE68A]/80 flex-none">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white border border-[#FDE68A] shadow-xs flex items-center justify-center shrink-0">
                  <Settings className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#B45309]" />
                </div>
                <div>
                  <span className="font-mono text-[8.5px] uppercase tracking-wider text-[#B45309] font-bold block leading-none mb-0.5">
                    FULL TURNKEY EXECUTION
                  </span>
                  <h3 className="font-serif text-base sm:text-lg lg:text-xl text-[#0F172A] tracking-tight leading-tight">
                    <span className="font-normal">MedhaArc Labs </span>
                    <span className="font-bold">delivers</span>
                  </h3>
                </div>
              </div>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-amber-100 text-[#92400E] font-mono text-[9px] font-bold border border-amber-200">
                100% Provided
              </span>
            </div>

            {/* List Items */}
            <div className="p-3 sm:p-4 lg:p-4.5 flex-1 flex flex-col justify-between overflow-hidden">
              <ul className="space-y-1.5 sm:space-y-2 lg:space-y-2.5 flex-1 flex flex-col justify-between">
                {medhaarcDeliverables.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 pb-1.5 sm:pb-2 border-b border-slate-100/90 last:border-b-0 last:pb-0"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="font-sans text-xs sm:text-[13px] lg:text-[13.5px] font-bold text-[#0F172A] leading-tight">
                          {item.title}
                        </span>
                        <span className="font-mono text-[8.5px] uppercase px-1.5 py-0.2 rounded bg-amber-50 text-[#B45309] font-semibold shrink-0">
                          {item.tag}
                        </span>
                      </div>
                      <p className="font-sans text-[10.5px] sm:text-[11px] lg:text-[11.5px] text-[#475569] leading-tight mt-0.5 line-clamp-2">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Executive Partnership Guarantee Callout Strip */}
        <div className="w-full flex-none mt-1.5 sm:mt-2 p-2 sm:p-2.5 lg:p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2.5 text-left min-w-0">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 font-bold text-xs shadow-2xs">
              ✓
            </div>
            <div className="min-w-0">
              <span className="font-sans font-bold text-xs sm:text-[12.5px] text-[#0F172A] block leading-tight">
                Zero Faculty Preparation Burden
              </span>
              <span className="font-sans text-[10px] sm:text-[11px] text-[#64748B] leading-tight truncate block">
                MedhaArc mentors handle end-to-end curriculum delivery, hardware setup, student safety, and troubleshooting.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[9.5px] sm:text-[10px] text-[#0284C7] font-semibold bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200 shrink-0">
            <span>Turnkey STEM Delivery</span>
          </div>
        </div>

        {/* Bottom Trailing Navigation CTA */}
        <div className="flex-none pt-1 sm:pt-1.5 flex items-center justify-center">
          <button
            type="button"
            onClick={handleScrollToNext}
            className="group flex items-center justify-center text-center focus:outline-none cursor-pointer"
          >
            <span className="font-sans font-bold text-[9px] sm:text-[9.5px] uppercase tracking-[0.2em] text-[#64748B] group-hover:text-[#c8a45d] transition-colors">
              Explore partnership investment packages →
            </span>
          </button>
        </div>
      </div>
    </ChapterShell>
  );
};

export default RequirementsSection;
