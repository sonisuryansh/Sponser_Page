import React, { useRef, useState, useEffect } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { ShieldCheck, Check, GraduationCap, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';

const pillarIcons = [
  <GraduationCap key="1" className="w-4 h-4 text-white" />,
  <Cpu key="2" className="w-4 h-4 text-white" />,
  <Sparkles key="3" className="w-4 h-4 text-white" />,
];

interface ColumnContent {
  tag: string;
  title: string;
  description: string;
  pill: string;
}

const COLUMNS_CONTENT: ColumnContent[] = [
  {
    tag: '01 / FOR STUDENTS',
    title: 'Handled by our Instructors',
    description:
      'Curriculum delivered entirely by MedhaArc Labs Instructors/Mentors. No extra preparation or load for school teachers.',
    pill: '✓ Zero extra load for school teachers',
  },
  {
    tag: '02 / FOR TEACHERS',
    title: 'AI Skills Workshops',
    description:
      'Short workshops to upgrade their own skills with AI. 4–5 practical sessions scheduled after the programme is under way.',
    pill: '4–5 Hands-on AI Workshops',
  },
  {
    tag: '03 / SKILLS THAT STAY',
    title: 'Assist & Empower',
    description:
      'Building custom AI assistants, lesson drafts, and productivity tools that stay with your teachers permanently.',
    pill: 'Teacher oversight at every stage',
  },
];

const pillarDetails = [
  [
    'Curriculum delivered entirely by MedhaArc Mentors',
    'No extra preparation or load for school teachers',
    'Hardware troubleshooting & lab safety handled',
    'Zero burden on existing school faculty',
  ],
  [
    '1: AI Foundations & Responsible Use (privacy & ethics)',
    '2: Choosing the Right AI Tools for daily work',
    '3: AI Tool Integration for finished outputs',
    '4: Smart Automation for routine daily tasks',
    '5: AI Assistants & Emerging Trends (custom GPTs)',
  ],
  [
    'Building custom AI assistants & lesson drafts',
    'Strict human oversight & ethical guardrails',
    'Student personal data privacy safeguards',
    'Skills that stay with your teachers permanently',
  ],
];

const pillarPopups = [
  {
    title: 'Handled by Our Instructors',
    purpose:
      'Curriculum delivered entirely by MedhaArc Labs Instructors and Mentors. School teachers carry zero teaching burden or extra session preparation.',
    badge: 'For Students',
  },
  {
    title: '4–5 AI Skills Workshops',
    purpose:
      'Short, practical workshops scheduled after the programme is under way to upgrade teachers’ own skills with modern AI tools and daily workflows.',
    badge: 'For Teachers',
  },
  {
    title: 'Skills That Stay Permanently',
    purpose:
      'Building custom AI assistants, automated lesson aids, and ethical workflows that empower educators with lifelong digital productivity.',
    badge: 'Skills That Stay',
  },
];

export const TeacherEmpowermentSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [activePillarIndex, setActivePillarIndex] = useState<number | null>(null);

  // Close popup on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePillarIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    if (prefersReducedMotion || isMobile) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.editorial-reveal'),
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.06,
          ease: 'power3.out',
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const handleScrollToNext = () => {
    window.dispatchEvent(new CustomEvent('go-to-slide', { detail: 10 }));
  };

  return (
    <ChapterShell
      id="teacher-empowerment"
      chapterNumber="10"
      theme="light"
      fullBleed={true}
      className="relative w-full h-[100svh] overflow-hidden bg-[#FAF6EE]"
    >
      {/* Main Viewport Container (Centered in 100svh window, Standardized 1240px) */}
      <div
        ref={containerRef}
        className="relative w-full my-auto flex flex-col justify-center pt-[calc(var(--header-h,64px)+16px)] sm:pt-3 pb-3 px-3 sm:px-6 lg:px-8 box-border select-none z-10 max-w-[1240px] mx-auto overflow-y-auto lg:overflow-hidden"
      >
        {/* Top Header: Eyebrow, Main Title, and Subtitle Verbatim from Image 1 */}
        <div className="flex-none max-w-3xl mx-auto text-center flex flex-col items-center mb-2">
          {/* Eyebrow with gold accent lines */}
          <div className="editorial-reveal flex items-center justify-center gap-2 mb-1">
            <span className="w-6 h-px bg-[#c8a45d]/60" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-[#c8a45d] font-bold">
              {siteConfig.teacherEmpowerment.eyebrow}
            </span>
            <span className="w-6 h-px bg-[#c8a45d]/60" />
          </div>

          {/* Headline */}
          <h2
            ref={headlineRef}
            className="editorial-reveal font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold leading-tight tracking-tight text-[#0F172A] mb-1.5 text-center"
          >
            {siteConfig.teacherEmpowerment.headline}
          </h2>

          {/* Subtitle Matching Image 1 Exactly */}
          <p className="editorial-reveal font-serif text-xs sm:text-[13.5px] lg:text-[14.5px] text-[#334155] leading-relaxed max-w-2xl text-center mb-0.5">
            <strong className="text-[#0F172A] font-bold">Our Instructors</strong> run the student programme.{' '}
            <strong className="text-[#EA580C] font-bold">Teachers</strong> get a few workshops to get ahead with AI.
          </p>
        </div>

        {/* 3 Core Pillars: Preserving 3D Flip Cards & Sphere Orbs from 2nd Image with Image 1 Content */}
        <div className="editorial-reveal flex-none my-1 sm:my-1.5 flex flex-col justify-center min-h-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4.5">
            {COLUMNS_CONTENT.map((col, idx) => {
              const colorClasses = ['pillar-blue', 'pillar-orange', 'pillar-yellow'];
              const tagColors = ['text-[#bae6fd]', 'text-[#ffedd5]', 'text-[#fef9c3]'];
              const backAccents = ['text-[#38bdf8]', 'text-[#fb923c]', 'text-[#facc15]'];
              const bulletColors = ['bg-[#38bdf8]', 'bg-[#fb923c]', 'bg-[#facc15]'];
              const isFlipped = activePillarIndex === idx;

              return (
                <div key={col.title} className="pillar-flip-wrapper">
                  <div
                    onClick={() => setActivePillarIndex(isFlipped ? null : idx)}
                    className={`pillar-flip-card ${isFlipped ? 'is-flipped' : ''}`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActivePillarIndex(isFlipped ? null : idx);
                      }
                    }}
                    aria-label={`Toggle details for ${col.title}`}
                  >
                    {/* FRONT FACE — Brand Gradient (Blue / Orange / Yellow) with Glowing Orb */}
                    <div className={`pillar-flip-face pillar-flip-front ${colorClasses[idx]} p-4 sm:p-5 flex flex-col justify-between`}>
                      <div>
                        {/* Top Role / Number & Icon */}
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-mono text-[10px] uppercase tracking-[0.22em] font-bold ${tagColors[idx]}`}>
                            {col.tag}
                          </span>
                          <span className="p-1 rounded-full bg-white/15 backdrop-blur-xs shadow-xs">
                            {pillarIcons[idx]}
                          </span>
                        </div>

                        {/* Main Title */}
                        <h3 className="font-serif font-bold text-xl sm:text-[23px] lg:text-[25px] tracking-tight leading-tight text-white mb-2">
                          {col.title}
                        </h3>

                        {/* Short Description */}
                        <p className="font-sans text-[11px] sm:text-xs text-white/90 leading-snug mb-2 font-normal">
                          {col.description}
                        </p>

                        {/* Image 1 Callout Pill */}
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/20 backdrop-blur-xs border border-white/20 text-white font-sans text-[10px] font-semibold">
                          <CheckCircle2 className="w-3 h-3 text-white/90" />
                          <span>{col.pill}</span>
                        </div>
                      </div>

                      {/* Bottom Flip Affordance Hint */}
                      <div className="flex items-center justify-between text-[9px] sm:text-[9.5px] font-mono uppercase tracking-wider text-white/80 pt-2 border-t border-white/20 mt-2">
                        <span>Click to flip for deliverables</span>
                        <span className="text-xs">↻</span>
                      </div>
                    </div>

                    {/* BACK FACE — Dark Obsidian Luxury Panel with Deliverables from Image 1 */}
                    <div className="pillar-flip-face pillar-flip-back p-4 sm:p-5 flex flex-col justify-between">
                      <div>
                        {/* Top Header */}
                        <div className="flex items-center justify-between pb-1.5 border-b border-white/10 mb-2">
                          <span className={`font-mono text-[9px] uppercase tracking-widest font-bold ${backAccents[idx]}`}>
                            {col.tag} &bull; Deliverables
                          </span>
                          <span className="text-[8.5px] font-mono uppercase px-1.5 py-0.5 rounded-[2px] bg-white/10 text-white/70">
                            {pillarPopups[idx].badge}
                          </span>
                        </div>

                        {/* Sub-Headline */}
                        <h4 className="font-serif font-bold text-sm sm:text-[15px] text-white leading-snug mb-1">
                          {pillarPopups[idx].title}
                        </h4>

                        {/* Purpose Summary */}
                        <p className="font-sans text-[10px] sm:text-[10.5px] text-[#b3afa6] leading-relaxed mb-2 line-clamp-2">
                          {pillarPopups[idx].purpose}
                        </p>

                        {/* Concrete Deliverables Checklist from Image 1 Workshop Journey */}
                        <ul className="space-y-1">
                          {pillarDetails[idx].map((point) => (
                            <li key={point} className="flex items-center gap-1.5 text-[10px] sm:text-[10.5px] text-[#ece9e2] font-sans">
                              <span className={`w-1.5 h-1.5 rounded-full ${bulletColors[idx]} shrink-0`} />
                              <span className="truncate">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Bottom Return Affordance */}
                      <div className="flex items-center justify-between pt-1.5 border-t border-white/10 mt-2 text-[9px] font-mono text-white/60">
                        <span className={`${backAccents[idx]} font-semibold`}>
                          Skills That Stay
                        </span>
                        <span className="opacity-70">↻ Click to flip back</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Human-in-the-Loop AI Workflow & Ethical Guardrails Banner */}
        <div className="editorial-reveal flex-none bg-white/95 border border-black/10 p-2.5 sm:p-3 rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.02)] mb-1.5">
          {/* Workflow Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5 pb-1 border-b border-black/5">
            <span className="font-mono text-[9px] sm:text-[9.5px] uppercase tracking-[0.2em] text-[#888888] font-bold">
              Human-in-the-Loop AI Workflow
            </span>
            <span className="font-mono text-[10px] text-[#c8a45d] font-bold">
              Teacher Oversight at Every Stage
            </span>
          </div>

          {/* 4 Step Nodes Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-2">
            {siteConfig.teacherEmpowerment.flow.map((step, idx) => (
              <div
                key={step}
                className="flex items-center gap-2 px-2.5 py-1.5 bg-[#FAF9F6] border border-black/10 rounded-xl"
              >
                <span className="w-4 h-4 flex items-center justify-center rounded-full bg-[#0F172A] text-white text-[9px] font-mono font-bold shrink-0">
                  {idx + 1}
                </span>
                <span className="font-sans text-[10.5px] sm:text-[11px] font-semibold text-[#111111] leading-tight truncate">
                  {step}
                </span>
              </div>
            ))}
          </div>

          {/* Ethical Guardrails Footer */}
          <div className="pt-1.5 border-t border-black/10 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-[9.5px] uppercase tracking-[0.18em] text-[#c8a45d] font-mono font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Ethical Guardrails:</span>
            </div>
            {siteConfig.teacherEmpowerment.guardrails.map((gd) => (
              <div key={gd} className="flex items-center gap-1.5 text-[10px] sm:text-[10.5px] text-[#333333] font-sans">
                <Check className="w-3 h-3 text-emerald-600 shrink-0 stroke-[2.5]" />
                <span>{gd}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Tagline: "Skills that stay with your teachers." (From Image 1) */}
        <div className="editorial-reveal flex-none pt-1 border-t border-black/10 flex flex-col items-center justify-center text-center">
          <div className="flex items-center justify-center gap-3 mb-1">
            <span className="w-8 sm:w-16 h-px bg-[#c8a45d]/60" />
            <h4 className="font-serif text-sm sm:text-base font-bold text-[#0F172A] tracking-tight">
              Skills that stay with your teachers.
            </h4>
            <span className="w-8 sm:w-16 h-px bg-[#c8a45d]/60" />
          </div>

          <button
            type="button"
            onClick={handleScrollToNext}
            className="group flex items-center justify-center text-center focus:outline-none cursor-pointer"
          >
            <span className="font-sans font-bold text-[9.5px] sm:text-[10px] uppercase tracking-[0.2em] text-[#64748B] group-hover:text-[#c8a45d] transition-colors">
              Discover student &amp; school institutional benefits →
            </span>
          </button>
        </div>
      </div>
    </ChapterShell>
  );
};

export default TeacherEmpowermentSection;
