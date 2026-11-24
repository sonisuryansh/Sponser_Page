import React, { useRef, useState, useEffect } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { Wrench, Boxes, Award, Trophy, FolderKanban, Check, Sparkles } from 'lucide-react';
import gsap from 'gsap';

const benefitIcons: Record<string, React.ReactNode> = {
  Wrench: <Wrench className="w-4 h-4 text-cyan-600" />,
  Box: <Boxes className="w-4 h-4 text-emerald-600" />,
  Award: <Award className="w-4 h-4 text-[#c8a45d]" />,
  Trophy: <Trophy className="w-4 h-4 text-purple-600" />,
  FolderKanban: <FolderKanban className="w-4 h-4 text-sky-600" />,
};

const pillarTags = [
  'Critical Thinking',
  'Tangible Builds',
  'Milestone Recognition',
  'Innovation Arenas',
  'Cumulative Proof',
];

const pillarKeyDeliverables = [
  'Algorithmic reasoning & practical confidence',
  'Physical hardware showcased term-by-term',
  'Formal certificates for completed grades',
  'Team preparation for student challenges',
  'Documented portfolio of student builds',
];

const benefitPopups = [
  {
    title: 'Practical Engineering Rigor',
    purpose: 'Equips students with hands-on problem-solving, computational logic, and mechanical design skills that classroom textbooks alone cannot impart.',
    badge: 'Direct Student Competence',
  },
  {
    title: 'Tangible Proof of Learning',
    purpose: 'Transforms classroom concepts into working physical hardware—rovers, sensors, and flight drones—giving parents and school leadership visible proof of progress.',
    badge: 'Transparent Parent Value',
  },
  {
    title: 'Milestone Recognition',
    purpose: 'Grants formal certificates upon completing each grade-wise level, providing verified recognition for students and academic records.',
    badge: 'Milestone Recognition',
  },
  {
    title: 'Competition Opportunities',
    purpose: 'Prepares and supports school teams for regional and school-level STEM and robotics challenges, encouraging teamwork and creative problem-solving.',
    badge: 'Student Participation',
  },
  {
    title: 'Student Project Portfolios',
    purpose: "Builds an organized digital record of each student's working prototypes and code repositories, creating a cumulative archive to show and grow.",
    badge: 'Cumulative Record',
  },
];

export const BenefitsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  // Close popup on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCardIndex(null);
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
          duration: 0.7,
          stagger: 0.06,
          ease: 'power3.out',
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const handleScrollToNext = () => {
    window.dispatchEvent(new CustomEvent('go-to-slide', { detail: 11 }));
  };

  return (
    <ChapterShell
      id="benefits"
      chapterNumber="11"
      theme="light"
      fullBleed={true}
      className="relative w-full h-[100svh] overflow-hidden bg-[#FAF6EE] select-none"
    >
      {/* Main Viewport Container (Centered in 100svh window, Prominent 1360px Max Width) */}
      <div
        ref={containerRef}
        className="relative w-full my-auto flex flex-col justify-center pt-14 pb-4 sm:py-5 lg:py-6 px-4 sm:px-6 lg:px-8 xl:px-10 box-border select-none z-10 max-w-[1360px] mx-auto overflow-hidden"
      >
        {/* Top Header: Eyebrow, Main Title & Narrative Message (Centered, Prominent & Authoritative) */}
        <div className="flex-none max-w-4xl mx-auto text-center flex flex-col items-center mb-2.5 sm:mb-3.5">
          <div className="editorial-reveal flex items-center justify-center mb-1 sm:mb-1.5">
            <span className="font-mono text-[10.5px] sm:text-xs uppercase tracking-[0.24em] text-[#c8a45d] font-bold">
              {siteConfig.benefits.eyebrow}
            </span>
          </div>

          <h2
            ref={headlineRef}
            className="editorial-reveal font-serif text-[27px] sm:text-3xl lg:text-[40px] xl:text-[44px] font-normal leading-tight tracking-tight text-[#111111] mb-2 text-center"
          >
            {siteConfig.benefits.headline}
          </h2>

          <p className="editorial-reveal font-sans text-xs sm:text-[13px] lg:text-[13.5px] text-[#555555] leading-relaxed max-w-2xl text-center font-normal">
            Technology education provides immense institutional and parental value when students build tangible projects that families can celebrate, verify, and document for their academic futures.
          </p>
        </div>

        {/* 5 Distinct Architectural Value Cards (Smooth 3D Flip Turn-Around on Hover) */}
        <div className="editorial-reveal flex-none my-1 sm:my-1.5 flex flex-col justify-center min-h-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-3.5 xl:gap-4">
            {siteConfig.benefits.cards.map((card, idx) => {
              const borderHoverAccents = [
                'hover:border-cyan-500/80 hover:shadow-[0_12px_36px_rgba(6,182,212,0.14)]',
                'hover:border-emerald-500/80 hover:shadow-[0_12px_36px_rgba(16,185,129,0.14)]',
                'hover:border-[#c8a45d] hover:shadow-[0_12px_36px_rgba(200,164,93,0.14)]',
                'hover:border-purple-500/80 hover:shadow-[0_12px_36px_rgba(168,85,247,0.14)]',
                'hover:border-sky-500/80 hover:shadow-[0_12px_36px_rgba(56,189,248,0.14)]',
              ];

              const backBorderAccents = [
                'border-2 border-cyan-500 shadow-[0_16px_40px_rgba(6,182,212,0.16)]',
                'border-2 border-emerald-500 shadow-[0_16px_40px_rgba(16,185,129,0.16)]',
                'border-2 border-[#c8a45d] shadow-[0_16px_40px_rgba(200,164,93,0.16)]',
                'border-2 border-purple-500 shadow-[0_16px_40px_rgba(168,85,247,0.16)]',
                'border-2 border-sky-500 shadow-[0_16px_40px_rgba(56,189,248,0.16)]',
              ];

              const accentTextColors = [
                'text-cyan-700',
                'text-emerald-700',
                'text-[#c8a45d]',
                'text-purple-700',
                'text-sky-700',
              ];

              const tagColors = [
                'text-cyan-700 bg-cyan-50 border-cyan-200/70',
                'text-emerald-700 bg-emerald-50 border-emerald-200/70',
                'text-[#8c6b24] bg-[#c8a45d]/10 border-[#c8a45d]/30',
                'text-purple-700 bg-purple-50 border-purple-200/70',
                'text-sky-700 bg-sky-50 border-sky-200/70',
              ];

              // Clean description removing raw [confirm] notes
              const cleanDescription = card.description.replace(/\[confirm\]/g, '').trim();
              const isFlipped = activeCardIndex === idx;

              return (
                <div
                  key={card.title}
                  onClick={() => setActiveCardIndex(isFlipped ? null : idx)}
                  className={`benefit-flip-card group ${isFlipped ? 'is-flipped' : ''}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveCardIndex(isFlipped ? null : idx);
                    }
                  }}
                  aria-label={`Turn around to view details for ${card.title}`}
                >
                  {/* FRONT FACE (Resting state, turns around on hover) */}
                  <div className={`benefit-flip-face benefit-flip-front ${borderHoverAccents[idx]}`}>
                    <div>
                      {/* Header Row */}
                      <div className="flex items-center justify-between mb-2 border-b border-black/5 pb-2">
                        <div className="w-8 h-8 flex items-center justify-center rounded-[3px] bg-[#FAF9F6] border border-black/10">
                          {benefitIcons[card.icon] || <Sparkles className="w-4 h-4 text-[#c8a45d]" />}
                        </div>
                        <span className="font-mono text-[10.5px] sm:text-[11px] text-[#888888] font-bold">
                          0{idx + 1}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-[17px] sm:text-lg lg:text-[20px] xl:text-[21px] font-medium text-[#111111] tracking-tight mb-1 group-hover:text-[#c8a45d] transition-colors leading-snug">
                        {card.title}
                      </h3>

                      {/* Pillar Tag */}
                      <span className={`inline-block font-mono text-[9px] sm:text-[9.5px] uppercase tracking-wider px-2 py-0.5 rounded-[2px] border mb-2 font-semibold ${tagColors[idx]}`}>
                        {pillarTags[idx]}
                      </span>

                      {/* Description */}
                      <p className="font-sans text-[11px] sm:text-[11.5px] lg:text-[12px] text-[#555555] leading-relaxed mb-2.5">
                        {cleanDescription}
                      </p>
                    </div>

                    {/* Concrete Student Outcome Highlight */}
                    <div className="pt-2.5 border-t border-black/8 mt-auto">
                      <div className="flex items-start gap-1.5 text-[10px] sm:text-[10.5px] text-[#666666] font-sans leading-tight mb-2">
                        <Check className="w-3.5 h-3.5 text-[#c8a45d] shrink-0 mt-0.5 stroke-[2.5]" />
                        <span className="truncate">{pillarKeyDeliverables[idx]}</span>
                      </div>

                      {/* Hover Turn-around Affordance */}
                      <div className="flex items-center justify-between pt-1.5 border-t border-black/5 text-[9.5px] sm:text-[10px] font-mono text-[#c8a45d] font-bold">
                        <span>Hover to turn around</span>
                        <span className="text-xs transition-transform group-hover:rotate-180 duration-500">↻</span>
                      </div>
                    </div>
                  </div>

                  {/* BACK FACE (Detailed view revealed on hover / turn around) */}
                  <div className={`benefit-flip-face benefit-flip-back ${backBorderAccents[idx]}`}>
                    <div>
                      {/* Top Header */}
                      <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-black/8">
                        <span className={`font-mono text-[9.5px] sm:text-[10px] uppercase tracking-widest font-bold ${accentTextColors[idx]}`}>
                          0{idx + 1} &bull; {card.title}
                        </span>
                        <div className="w-6 h-6 flex items-center justify-center rounded-[3px] bg-black/[0.04]">
                          {benefitIcons[card.icon]}
                        </div>
                      </div>

                      {/* Back Heading */}
                      <h4 className="font-serif text-[14.5px] sm:text-base font-medium text-[#111111] mb-1.5 leading-snug">
                        {benefitPopups[idx].title}
                      </h4>

                      {/* Purpose Narrative */}
                      <p className="font-sans text-[11px] sm:text-[11.5px] text-[#444444] leading-relaxed mb-2.5">
                        {benefitPopups[idx].purpose}
                      </p>

                      {/* Concrete Deliverable Badge */}
                      <div className="p-2 rounded-[3px] bg-black/[0.03] border border-black/6 flex items-start gap-1.5">
                        <Check className={`w-3.5 h-3.5 ${accentTextColors[idx]} shrink-0 mt-0.5 stroke-[2.5]`} />
                        <span className="font-sans text-[10.5px] text-[#333333] leading-snug">
                          {pillarKeyDeliverables[idx]}
                        </span>
                      </div>
                    </div>

                    {/* Back Bottom Bar */}
                    <div className="pt-2 border-t border-black/8 mt-auto flex items-center justify-between">
                      <span className="font-mono text-[8.5px] sm:text-[9px] uppercase tracking-wider text-[#888888] font-semibold truncate mr-1">
                        {benefitPopups[idx].badge}
                      </span>
                      <span className={`font-mono text-[9.5px] ${accentTextColors[idx]} font-bold flex items-center gap-1`}>
                        <span>Turn back</span>
                        <span className="text-xs">↻</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Institutional Value Summary Ribbon */}
        <div className="editorial-reveal flex-none bg-white/95 border border-black/10 px-4 py-2.5 sm:px-5 sm:py-3 rounded-[4px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] mt-2.5 sm:mt-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8a45d]" />
              <span className="uppercase tracking-wider font-bold text-[#111111] text-[11px] sm:text-[11.5px]">
                Institutional Impact:
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-[#555555] text-[10.5px] sm:text-[11px]">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Transparent Family Visibility
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Progressive Structured Curriculum
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> College & Career Portfolio Assets
              </span>
            </div>
            <span className="uppercase tracking-widest text-[#c8a45d] font-bold text-[10.5px] shrink-0">
              Measurable Outcomes
            </span>
          </div>
        </div>

        {/* Bottom Trailing Link CTA (Centered) */}
        <div className="editorial-reveal flex-none pt-2.5 sm:pt-3 border-t border-black/10 flex items-center justify-center mt-2">
          <button
            onClick={handleScrollToNext}
            className="group flex items-center justify-center text-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c8a45d] cursor-pointer max-w-xl mx-auto"
          >
            <span className="h-[1px] bg-black/20 group-hover:bg-[#c8a45d] transition-all w-8 sm:w-14 mr-3" />
            <span className="font-sans font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#111111] group-hover:text-[#c8a45d] transition-colors shrink-0">
              Discover school requirements & partnership boundaries
            </span>
            <span className="h-[1px] bg-black/20 group-hover:bg-[#c8a45d] transition-all w-8 sm:w-14 ml-3" />
          </button>
        </div>
      </div>
    </ChapterShell>
  );
};

export default BenefitsSection;
