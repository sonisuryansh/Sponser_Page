import React, { useRef, useEffect } from 'react';
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
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.07,
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
      className="relative w-full h-[100svh] overflow-hidden bg-[#FAF6EE]"
    >
      {/* Main Viewport Container */}
      <div
        ref={containerRef}
        className="relative w-full h-full flex flex-col justify-between pt-[calc(var(--header-h,64px)+14px)] pb-6 px-4 sm:px-8 lg:px-14 box-border select-none z-10 max-w-[1360px] mx-auto"
      >
        {/* Top Header: Eyebrow, Main Title & Narrative Message (Centered) */}
        <div className="flex-none max-w-3xl mx-auto text-center flex flex-col items-center">
          <div className="editorial-reveal flex items-center justify-center gap-3 mb-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#c8a45d] font-bold">
              {siteConfig.benefits.eyebrow}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#c8a45d]" />
            <span className="font-mono text-[11px] text-[#888888] tracking-wider">
              11 / 14
            </span>
          </div>

          <h2
            ref={headlineRef}
            className="editorial-reveal font-serif text-[clamp(26px,3.4vw,44px)] font-normal leading-[1.14] tracking-tight text-[#111111] mb-1.5 text-center"
          >
            {siteConfig.benefits.headline}
          </h2>

          <p className="editorial-reveal font-serif text-sm sm:text-base text-[#555555] italic mb-2 text-center">
            &ldquo;{siteConfig.benefits.schoolLine}&rdquo;
          </p>

          <p className="editorial-reveal font-sans text-xs sm:text-[13px] text-[#666666] leading-relaxed max-w-2xl text-center font-normal">
            Technology education provides immense institutional and parental value when students build tangible projects that families can celebrate, verify, and document for their academic futures.
          </p>
        </div>

        {/* 5 Distinct Architectural Value Cards */}
        <div className="editorial-reveal flex-1 my-auto py-3 flex flex-col justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 lg:gap-4">
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
                  className={`group relative flex flex-col justify-between p-4 sm:p-5 bg-white/95 border border-black/10 rounded-[3px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 ${borderHoverAccents[idx]}`}
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-2.5 border-b border-black/5 pb-2">
                      <div className="w-7 h-7 flex items-center justify-center rounded-[2px] bg-[#FAF9F6] border border-black/10">
                        {benefitIcons[card.icon] || <Sparkles className="w-3.5 h-3.5 text-[#c8a45d]" />}
                      </div>
                      <span className="font-mono text-[10px] text-[#888888] font-bold">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-lg sm:text-xl font-medium text-[#111111] tracking-tight mb-1 group-hover:text-[#c8a45d] transition-colors">
                      {card.title}
                    </h3>

                    {/* Pillar Tag */}
                    <span className={`inline-block font-mono text-[9.5px] uppercase tracking-wider px-2 py-0.5 rounded-[2px] border mb-2.5 font-semibold ${tagColors[idx]}`}>
                      {pillarTags[idx]}
                    </span>

                    {/* Description */}
                    <p className="font-sans text-[11.5px] text-[#555555] leading-relaxed mb-3">
                      {cleanDescription}
                    </p>
                  </div>

                  {/* Concrete Student Outcome Highlight */}
                  <div className="pt-2.5 border-t border-black/5 mt-auto">
                    <div className="flex items-start gap-1.5 text-[10.5px] text-[#666666] font-sans leading-tight">
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
        <div className="editorial-reveal flex-none bg-white/95 border border-black/10 p-3.5 sm:p-4 rounded-[3px] shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c8a45d]" />
              <span className="uppercase tracking-wider font-bold text-[#111111]">
                Institutional Impact:
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[#555555] text-[11px]">
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
            <span className="uppercase tracking-widest text-[#c8a45d] font-bold text-[10.5px] shrink-0">
              Measurable Outcomes
            </span>
          </div>
        </div>

        {/* Bottom Trailing Link CTA (Centered) */}
        <div className="editorial-reveal flex-none pt-4 border-t border-black/10 flex items-center justify-center mt-3">
          <button
            onClick={handleScrollToNext}
            className="group flex items-center justify-center text-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c8a45d] cursor-pointer max-w-xl mx-auto"
          >
            <span className="h-[1px] bg-black/20 group-hover:bg-[#c8a45d] transition-all w-8 sm:w-12 mr-3" />
            <span className="font-sans font-bold text-[10.5px] sm:text-[11px] uppercase tracking-[0.22em] text-[#111111] group-hover:text-[#c8a45d] transition-colors shrink-0">
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
