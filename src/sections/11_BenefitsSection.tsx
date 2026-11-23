import React, { useRef, useState, useEffect } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { Wrench, Boxes, Award, Trophy, FolderKanban, Check, Sparkles, X, Info } from 'lucide-react';
import gsap from 'gsap';

const benefitIcons: Record<string, React.ReactNode> = {
  Wrench: <Wrench className="w-3.5 h-3.5 text-cyan-600" />,
  Box: <Boxes className="w-3.5 h-3.5 text-emerald-600" />,
  Award: <Award className="w-3.5 h-3.5 text-[#c8a45d]" />,
  Trophy: <Trophy className="w-3.5 h-3.5 text-purple-600" />,
  FolderKanban: <FolderKanban className="w-3.5 h-3.5 text-sky-600" />,
};

const pillarTags = [
  'Critical Thinking',
  'Tangible Builds',
  'Milestone Recognition',
  'Innovation Arenas',
  'Cumulative Proof',
];

const pillarKeyDeliverables = [
  'Algorithmic reasoning & mechanical confidence',
  'Physical hardware showcased term-by-term',
  'Formal certificates for completed grades',
  'Team preparation for regional challenges',
  'Documented portfolio for higher education',
];

const benefitPopups = [
  {
    title: 'Practical Engineering Rigor',
    purpose: 'Equips students with hands-on problem-solving, computational logic, and mechanical design skills that classroom textbooks alone cannot impart.',
    badge: 'Direct Student Competence',
  },
  {
    title: 'Tangible Proof of Learning',
    purpose: 'Transforms abstract formulas into working physical hardware—rovers, sensors, and flight drones—giving parents and school leadership visible proof of innovation.',
    badge: 'Transparent Parent Value',
  },
  {
    title: 'Accredited Milestone Credentials',
    purpose: 'Grants formal, verifiable certificates upon completing each grade-wise level, providing accredited recognition for college profiles and academic records.',
    badge: 'Accredited Recognition',
  },
  {
    title: 'Inter-School & Regional Arenas',
    purpose: 'Prepares and coaches school teams for prestigious regional and national STEM hackathons, building institutional reputation and school pride.',
    badge: 'Institutional Prestige',
  },
  {
    title: 'Career & College Portfolio Assets',
    purpose: 'Builds an authenticated, verifiable digital archive of every working prototype and code repository, serving as an indispensable edge for higher education admissions.',
    badge: 'Higher Ed Admission Edge',
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
      {/* Main Viewport Container (Centered in 100svh window, Standardized 1240px) */}
      <div
        ref={containerRef}
        className="relative w-full my-auto flex flex-col justify-center py-2 sm:py-3 px-4 sm:px-6 lg:px-8 box-border select-none z-10 max-w-[1240px] mx-auto overflow-hidden"
      >
        {/* Top Header: Eyebrow, Main Title & Narrative Message (Centered & Proportional) */}
        <div className="flex-none max-w-3xl mx-auto text-center flex flex-col items-center mb-2.5">
          <div className="editorial-reveal flex items-center justify-center mb-1">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#c8a45d] font-bold">
              {siteConfig.benefits.eyebrow}
            </span>
          </div>

          <h2
            ref={headlineRef}
            className="editorial-reveal font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal leading-tight tracking-tight text-[#111111] mb-1.5 text-center"
          >
            {siteConfig.benefits.headline}
          </h2>

          <p className="editorial-reveal font-sans text-[11px] sm:text-xs text-[#666666] leading-relaxed max-w-xl text-center font-normal">
            Technology education provides immense institutional and parental value when students build tangible projects that families can celebrate, verify, and document for their academic futures.
          </p>
        </div>

        {/* 5 Distinct Architectural Value Cards */}
        <div className="editorial-reveal flex-none my-1 sm:my-2 flex flex-col justify-center min-h-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 lg:gap-3">
            {siteConfig.benefits.cards.map((card, idx) => {
              const borderHoverAccents = [
                'hover:border-cyan-500 hover:shadow-[0_8px_30px_rgba(6,182,212,0.12)]',
                'hover:border-emerald-500 hover:shadow-[0_8px_30px_rgba(16,185,129,0.12)]',
                'hover:border-[#c8a45d] hover:shadow-[0_8px_30px_rgba(200,164,93,0.12)]',
                'hover:border-purple-500 hover:shadow-[0_8px_30px_rgba(168,85,247,0.12)]',
                'hover:border-sky-500 hover:shadow-[0_8px_30px_rgba(56,189,248,0.12)]',
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
              const isPopupOpen = activeCardIndex === idx;

              return (
                <div
                  key={card.title}
                  onClick={() => setActiveCardIndex(isPopupOpen ? null : idx)}
                  className={`group relative flex flex-col justify-between p-3 sm:p-3.5 lg:p-4 bg-white/95 border border-black/10 rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-300 cursor-pointer ${borderHoverAccents[idx]}`}
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-1.5 border-b border-black/5 pb-1.5">
                      <div className="w-6 h-6 flex items-center justify-center rounded-[2px] bg-[#FAF9F6] border border-black/10">
                        {benefitIcons[card.icon] || <Sparkles className="w-3 h-3 text-[#c8a45d]" />}
                      </div>
                      <span className="font-mono text-[9.5px] text-[#888888] font-bold">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-base sm:text-[17px] font-medium text-[#111111] tracking-tight mb-0.5 group-hover:text-[#c8a45d] transition-colors leading-tight">
                      {card.title}
                    </h3>

                    {/* Pillar Tag */}
                    <span className={`inline-block font-mono text-[8.5px] sm:text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-[2px] border mb-1.5 font-semibold ${tagColors[idx]}`}>
                      {pillarTags[idx]}
                    </span>

                    {/* Description */}
                    <p className="font-sans text-[10.5px] sm:text-[11px] text-[#555555] leading-normal mb-2">
                      {cleanDescription}
                    </p>
                  </div>

                  {/* Concrete Student Outcome Highlight */}
                  <div className="pt-2 border-t border-black/5 mt-auto">
                    <div className="flex items-start gap-1.5 text-[9.5px] sm:text-[10px] text-[#666666] font-sans leading-tight mb-1.5">
                      <Check className="w-3 h-3 text-[#c8a45d] shrink-0 mt-0.5 stroke-[2.5]" />
                      <span className="truncate">{pillarKeyDeliverables[idx]}</span>
                    </div>

                    {/* Subtle Click Indicator */}
                    <div className="flex items-center justify-between pt-1 border-t border-black/5 text-[9px] font-mono text-[#c8a45d] font-bold">
                      <span>Why this matters</span>
                      <Info className="w-3 h-3 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>

                  {/* Card-Anchored Purpose Popover Overlay (Usi Card Ke Pas) */}
                  {isPopupOpen && (
                    <div
                      className="absolute inset-0 z-30 bg-[#FFFFFD] border-2 border-[#c8a45d] rounded-[3px] p-2.5 sm:p-3 flex flex-col justify-between shadow-[0_12px_36px_rgba(0,0,0,0.14)] animate-in fade-in zoom-in-95 duration-200 select-text"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div>
                        {/* Popover Header */}
                        <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-black/8">
                          <div className="flex items-center gap-1">
                            <span className="font-mono text-[9px] uppercase tracking-widest font-bold text-[#c8a45d]">
                              0{idx + 1} &bull; {card.title}
                            </span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveCardIndex(null);
                            }}
                            className="p-0.5 text-[#666666] hover:text-[#111111] bg-black/5 hover:bg-black/10 rounded-full transition-colors cursor-pointer"
                            aria-label="Close details"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Popover Heading */}
                        <h4 className="font-serif text-[13.5px] sm:text-[14px] font-medium text-[#111111] mb-1 leading-snug">
                          {benefitPopups[idx].title}
                        </h4>

                        {/* Light Informative Description */}
                        <p className="font-sans text-[10px] sm:text-[10.5px] text-[#444444] leading-relaxed">
                          {benefitPopups[idx].purpose}
                        </p>
                      </div>

                      {/* Popover Bottom Bar */}
                      <div className="pt-1.5 border-t border-black/8 mt-auto flex items-center justify-between">
                        <span className="font-mono text-[8px] sm:text-[8.5px] uppercase tracking-wider text-[#888888] font-semibold truncate mr-1">
                          {benefitPopups[idx].badge}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveCardIndex(null);
                          }}
                          className="font-mono text-[9px] text-[#c8a45d] font-bold hover:underline cursor-pointer shrink-0"
                        >
                          Close &times;
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Institutional Value Summary Ribbon */}
        <div className="editorial-reveal flex-none bg-white/95 border border-black/10 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] mt-2 sm:mt-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8a45d]" />
              <span className="uppercase tracking-wider font-bold text-[#111111] text-[10.5px] sm:text-[11px]">
                Institutional Impact:
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-[#555555] text-[10px] sm:text-[10.5px]">
              <span className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-emerald-600" /> Transparent Family Visibility
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-emerald-600" /> Accredited Progressive Curriculum
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-emerald-600" /> College & Career Portfolio Assets
              </span>
            </div>
            <span className="uppercase tracking-widest text-[#c8a45d] font-bold text-[10px] shrink-0">
              Measurable Outcomes
            </span>
          </div>
        </div>

        {/* Bottom Trailing Link CTA (Centered) */}
        <div className="editorial-reveal flex-none pt-2.5 border-t border-black/10 flex items-center justify-center mt-2">
          <button
            onClick={handleScrollToNext}
            className="group flex items-center justify-center text-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c8a45d] cursor-pointer max-w-xl mx-auto"
          >
            <span className="h-[1px] bg-black/20 group-hover:bg-[#c8a45d] transition-all w-8 sm:w-12 mr-3" />
            <span className="font-sans font-bold text-[10px] sm:text-[10.5px] uppercase tracking-[0.22em] text-[#111111] group-hover:text-[#c8a45d] transition-colors shrink-0">
              Discover school requirements & partnership boundaries
            </span>
            <span className="h-[1px] bg-black/20 group-hover:bg-[#c8a45d] transition-all w-8 sm:w-12 ml-3" />
          </button>
        </div>
      </div>
    </ChapterShell>
  );
};

export default BenefitsSection;
