import React, { useRef, useEffect } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { Wrench, Boxes, Award, Trophy, FolderKanban, Check, Sparkles } from 'lucide-react';
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

export const BenefitsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

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
      {/* Main Viewport Container (Centered in 100svh window) */}
      <div
        ref={containerRef}
        className="relative w-full my-auto flex flex-col justify-center py-2 sm:py-3 px-4 sm:px-8 lg:px-12 box-border select-none z-10 max-w-[1360px] mx-auto overflow-hidden"
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
            className="editorial-reveal font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal leading-tight tracking-tight text-[#111111] mb-1 text-center"
          >
            {siteConfig.benefits.headline}
          </h2>

          <p className="editorial-reveal font-serif text-xs sm:text-[13px] text-[#555555] italic mb-1 text-center">
            &ldquo;{siteConfig.benefits.schoolLine}&rdquo;
          </p>

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

              return (
                <div
                  key={card.title}
                  className={`group relative flex flex-col justify-between p-3 sm:p-3.5 lg:p-4 bg-white/95 border border-black/10 rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-300 ${borderHoverAccents[idx]}`}
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
                    <div className="flex items-start gap-1.5 text-[9.5px] sm:text-[10px] text-[#666666] font-sans leading-tight">
                      <Check className="w-3 h-3 text-[#c8a45d] shrink-0 mt-0.5 stroke-[2.5]" />
                      <span>{pillarKeyDeliverables[idx]}</span>
                    </div>
                  </div>
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
