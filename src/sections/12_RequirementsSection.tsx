import React, { useRef, useEffect } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { Check, School, Settings, ShieldCheck, CheckCircle2, RefreshCw, Sparkles } from 'lucide-react';
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
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
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
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
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
    window.dispatchEvent(new CustomEvent('go-to-slide', { detail: 13 }));
  };

  const schoolRequirements = [
    {
      title: 'Dedicated Lab Space',
      detail: 'Minimum 600 sq ft, well-lit and ventilated dedicated room for hands-on engineering.',
      tag: 'Min 600 sq ft',
    },
    {
      title: 'Student Workstations',
      detail: 'Standard desktop or laptop systems for embedded programming, CAD modeling, and telemetry.',
      tag: '1:1 or 2:1 Ratio',
    },
    {
      title: 'Workbenches & Power Infrastructure',
      detail: 'Collaborative workbenches with accessible, safe multi-point power strips and grounded rails.',
      tag: 'Safe 230V Outlets',
    },
    {
      title: 'Student Timetable Scheduling',
      detail: 'Designated 40 to 60 minute periods per batch (recommended ~40 students per session).',
      tag: 'Weekly Periods',
    },
    {
      title: 'Network & Internet Access',
      detail: 'Standard school Wi-Fi or LAN connection for cloud compiler sync, toolchains, and LMS access.',
      tag: 'School Wi-Fi / LAN',
    },
  ];

  const medhaarcDeliverables = [
    {
      title: 'Turnkey Curriculum & Session Plans',
      detail: 'Complete Grade 3–12 progressive engineering syllabus, reviewed and updated annually.',
      tag: 'Annual NEP Review',
    },
    {
      title: 'Engineering Kits & Consumables',
      detail: 'Robotics kits, microcontrollers, sensors, motors, breadboards, and replacement parts.',
      tag: '100% Provided',
    },
    {
      title: 'Dedicated Expert Instructors',
      detail: 'MedhaArc Mentors conduct and lead every student session with zero prep for school faculty.',
      tag: 'Zero Teacher Load',
    },
    {
      title: 'Teacher AI Upskilling Workshops',
      detail: '4–5 practical AI productivity workshops for school teachers, plus released digital resources.',
      tag: 'Faculty AI Training',
    },
    {
      title: 'Ongoing Hardware Maintenance',
      detail: 'Prompt component replacement, toolchain updates, and continuous consumable replenishment.',
      tag: 'Full Warranty',
    },
  ];

  return (
    <ChapterShell
      id="requirements"
      chapterNumber="13"
      theme="light"
      fullBleed={true}
      className="relative w-full min-h-[100svh] lg:h-[100svh] overflow-y-auto lg:overflow-hidden select-none bg-[#FAF8F5]"
    >
      {/* Centered Main Viewport Container */}
      <div
        ref={containerRef}
        className="relative w-full h-full min-h-full flex-1 flex flex-col justify-between items-center pt-[calc(var(--header-h,64px)+4px)] pb-2.5 sm:pb-3 px-4 sm:px-6 lg:px-8 xl:px-10 box-border select-none z-10 max-w-[1440px] mx-auto overflow-hidden"
      >
        {/* Eyebrow & Grand Headline */}
        <div className="flex-none max-w-4xl mx-auto text-center flex flex-col items-center mb-1 sm:mb-1.5">
          <div className="editorial-reveal flex items-center justify-center gap-2 mb-0.5 sm:mb-1">
            <span className="h-[1.5px] w-6 sm:w-10 bg-gradient-to-r from-transparent to-[#b45309]" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#b45309] font-bold">
              {siteConfig.requirements.eyebrow}
            </span>
            <span className="h-[1.5px] w-6 sm:w-10 bg-gradient-to-l from-transparent to-[#b45309]" />
          </div>

          <h2 className="editorial-reveal font-serif text-xl sm:text-2xl lg:text-[28px] xl:text-[32px] font-bold leading-tight tracking-tight text-[#0F172A] text-center mb-0.5">
            {siteConfig.requirements.headline}
          </h2>

          <p className="editorial-reveal font-sans text-[12px] sm:text-[12.5px] lg:text-[13px] text-[#475569] leading-snug max-w-2xl text-center font-normal">
            A transparent division of infrastructure and academic responsibilities ensuring seamless turnkey operations with zero load on school teachers.
          </p>
        </div>

        {/* Two Balanced Architectural Cards: School Provides vs MedhaArc Labs Delivers */}
        <div className="editorial-reveal grid grid-cols-1 md:grid-cols-2 gap-3.5 lg:gap-5 items-stretch w-full max-w-6xl mx-auto flex-none my-1 min-h-0">
          {/* Card 1: School provides */}
          <div
            ref={leftColRef}
            className="bg-white rounded-2xl shadow-[0_8px_24px_rgba(2,132,199,0.06)] border-2 border-[#BAE6FD] border-b-[4px] border-b-[#0284C7] overflow-hidden flex flex-col justify-between transition-all hover:shadow-[0_14px_32px_rgba(2,132,199,0.1)]"
          >
            {/* Top Header Bar with Soft Blue Gradient */}
            <div className="relative bg-gradient-to-r from-[#E0F2FE] via-[#F0F9FF] to-[#E0F2FE]/60 px-3.5 py-1.5 sm:px-4 sm:py-2 flex items-center justify-between border-b border-[#BAE6FD]/80 flex-none">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white border border-[#BAE6FD] shadow-xs flex items-center justify-center shrink-0">
                  <School className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0284C7]" />
                </div>
                <div>
                  <span className="font-mono text-[8.5px] sm:text-[9.5px] uppercase tracking-wider text-[#0284C7] font-bold block leading-none mb-0.5">
                    FACILITY &amp; ACCESS
                  </span>
                  <h3 className="font-serif text-sm sm:text-base lg:text-lg font-bold text-[#0F172A] tracking-tight leading-tight">
                    {siteConfig.requirements.columns[0].title}
                  </h3>
                </div>
              </div>
              <span className="inline-flex px-2 py-0.5 rounded-full bg-sky-100 text-[#0369A1] font-mono text-[9px] sm:text-[9.5px] font-bold border border-sky-200">
                School Space
              </span>
            </div>

            {/* List Items */}
            <div className="p-3 sm:p-3.5 lg:p-4 flex flex-col justify-between">
              <ul className="space-y-1.5 sm:space-y-2">
                {schoolRequirements.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 pb-1.5 border-b border-slate-100/80 last:border-b-0 last:pb-0"
                  >
                    <span className="w-4.5 h-4.5 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="font-sans text-[12px] sm:text-[12.5px] lg:text-[13px] font-bold text-[#0F172A] leading-tight">
                          {item.title}
                        </span>
                        <span className="font-mono text-[9px] sm:text-[9.5px] uppercase px-1.5 py-0.5 rounded bg-sky-50 text-[#0369A1] font-bold shrink-0 border border-sky-100">
                          {item.tag}
                        </span>
                      </div>
                      <p className="font-sans text-[11px] sm:text-[11.5px] lg:text-[12px] text-[#475569] leading-snug mt-0.5 font-normal">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* School Commitment Footer */}
            <div className="bg-sky-50/70 border-t border-[#BAE6FD]/70 px-3.5 py-1.5 sm:px-4 flex items-center justify-between text-[9px] sm:text-[9.5px] font-mono text-[#0369A1] flex-none">
              <span className="font-bold uppercase tracking-wider">School Responsibility</span>
              <span className="font-semibold text-slate-600">Space &amp; Infrastructure Ready by Term Start</span>
            </div>
          </div>

          {/* Card 2: MedhaArc Labs delivers */}
          <div
            ref={rightColRef}
            className="bg-white rounded-2xl shadow-[0_8px_24px_rgba(217,119,6,0.06)] border-2 border-[#FDE68A] border-b-[4px] border-b-[#D97706] overflow-hidden flex flex-col justify-between transition-all hover:shadow-[0_14px_32px_rgba(217,119,6,0.1)]"
          >
            {/* Top Header Bar with Soft Amber Gradient */}
            <div className="relative bg-gradient-to-r from-[#FEF3C7] via-[#FFFBEB] to-[#FEF3C7]/60 px-3.5 py-1.5 sm:px-4 sm:py-2 flex items-center justify-between border-b border-[#FDE68A]/80 flex-none">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white border border-[#FDE68A] shadow-xs flex items-center justify-center shrink-0">
                  <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B45309]" />
                </div>
                <div>
                  <span className="font-mono text-[8.5px] sm:text-[9.5px] uppercase tracking-wider text-[#B45309] font-bold block leading-none mb-0.5">
                    FULL TURNKEY EXECUTION
                  </span>
                  <h3 className="font-serif text-sm sm:text-base lg:text-lg text-[#0F172A] tracking-tight leading-tight">
                    <span className="font-normal">MedhaArc Labs </span>
                    <span className="font-bold">delivers</span>
                  </h3>
                </div>
              </div>
              <span className="inline-flex px-2 py-0.5 rounded-full bg-amber-100 text-[#92400E] font-mono text-[9px] sm:text-[9.5px] font-bold border border-amber-200">
                100% Turnkey
              </span>
            </div>

            {/* List Items */}
            <div className="p-3 sm:p-3.5 lg:p-4 flex flex-col justify-between">
              <ul className="space-y-1.5 sm:space-y-2">
                {medhaarcDeliverables.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 pb-1.5 border-b border-slate-100/80 last:border-b-0 last:pb-0"
                  >
                    <span className="w-4.5 h-4.5 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="font-sans text-[12px] sm:text-[12.5px] lg:text-[13px] font-bold text-[#0F172A] leading-tight">
                          {item.title}
                        </span>
                        <span className="font-mono text-[9px] sm:text-[9.5px] uppercase px-1.5 py-0.5 rounded bg-amber-50 text-[#B45309] font-bold shrink-0 border border-amber-100">
                          {item.tag}
                        </span>
                      </div>
                      <p className="font-sans text-[11px] sm:text-[11.5px] lg:text-[12px] text-[#475569] leading-snug mt-0.5 font-normal">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* MedhaArc Guarantee Footer */}
            <div className="bg-amber-50/70 border-t border-[#FDE68A]/70 px-3.5 py-1.5 sm:px-4 flex items-center justify-between text-[9px] sm:text-[9.5px] font-mono text-[#B45309] flex-none">
              <span className="font-bold uppercase tracking-wider">MedhaArc Commitment</span>
              <span className="font-semibold text-slate-600">Hardware, Mentors &amp; Syllabus 100% Managed</span>
            </div>
          </div>
        </div>

        {/* Highlight Boundary & SLA Banner */}
        <div className="editorial-reveal w-full self-stretch flex-none bg-[#FFFBEB] border border-[#FDE68A] rounded-xl px-4 py-2 sm:px-5 sm:py-2.5 shadow-xs mt-1 sm:mt-1.5 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="shrink-0 flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-[#D97706]" />
            </div>
            <div className="w-[1.5px] h-6 sm:h-8 bg-[#FDE68A] shrink-0" />
            <h3 className="font-serif text-sm sm:text-base lg:text-[18px] font-bold text-[#0F172A] leading-snug">
              Zero Teacher Burden: MedhaArc mentors run 100% of the practical curriculum inside your school.
            </h3>
          </div>
        </div>

        {/* Operational Guarantees Bottom Strip */}
        <div className="editorial-reveal w-full self-stretch flex-none mt-1 sm:mt-1.5 pt-1.5 border-t border-slate-200/80 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5 text-xs">
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex flex-col font-mono text-[9.5px] sm:text-[10px] tracking-[0.2em] uppercase font-black text-[#0F172A] leading-tight">
                <span>PARTNERSHIP</span>
                <span>STANDARDS</span>
              </div>
              <div className="hidden sm:block w-[1.5px] h-5 bg-slate-300" />
            </div>

            <div className="flex flex-wrap items-center gap-3.5 sm:gap-6 lg:gap-8 font-sans text-[11px] sm:text-[11.5px] text-[#1E293B] font-semibold">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-[#D97706]" />
                </div>
                <span>Zero Preparation Required for School Faculty</span>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center shrink-0">
                  <RefreshCw className="w-3 h-3 text-[#D97706]" />
                </div>
                <span>Continuous Component Servicing &amp; Replenishment</span>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center shrink-0">
                  <Sparkles className="w-3 h-3 text-[#D97706]" />
                </div>
                <span>Turnkey Lab Operations with Verified Protocols</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trailing Navigation CTA */}
        <div className="editorial-reveal flex-none pt-1 flex items-center justify-center">
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
