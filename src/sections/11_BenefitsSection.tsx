import React, { useRef, useState, useEffect } from 'react';
import { ChapterShell } from '../components/ChapterShell';
import {
  Wrench,
  Boxes,
  Award,
  Trophy,
  Folder,
  School,
  Users,
  Layers,
  Briefcase,
  CheckCircle2,
  Clock,
  Check,
  Sparkles,
} from 'lucide-react';

interface BenefitCardConfig {
  categoryTag: string;
  stageChip: string;
  bullets: string[];
  title: string;
  description: string;
  icon: 'Wrench' | 'Boxes' | 'Award' | 'Trophy' | 'Folder';
  badgeType: 'confirmed' | 'coming';
  badgeLabel: string;
  borderColor: string;
  bgGradient: string;
  iconBg: string;
  iconColor: string;
  backAccentColor: string;
  deliverable: string;
  popupTitle: string;
  popupPurpose: string;
  popupBadge: string;
}

const BENEFIT_CARDS: BenefitCardConfig[] = [
  {
    categoryTag: '01 · CORE ABILITY',
    stageChip: 'TECHNICAL RIGOR',
    bullets: [
      'Algorithmic logic & hardware debugging',
      'Circuit assembly & sensor calibration',
    ],
    title: 'Skills',
    description: 'Builds problem-solving, teamwork and technical confidence.',
    icon: 'Wrench',
    badgeType: 'confirmed',
    badgeLabel: 'Confirmed',
    borderColor: 'border-[#38BDF8]',
    bgGradient: 'bg-gradient-to-b from-[#F0F9FF] to-white',
    iconBg: 'bg-sky-50 border-sky-200',
    iconColor: 'text-[#0284C7]',
    backAccentColor: 'text-[#0284C7]',
    deliverable: 'Algorithmic reasoning & practical confidence',
    popupTitle: 'Practical Engineering Rigor',
    popupPurpose: 'Equips students with hands-on problem-solving, computational logic, and mechanical design skills that classroom textbooks alone cannot impart.',
    popupBadge: 'Student Competence',
  },
  {
    categoryTag: '02 · PHYSICAL BUILDS',
    stageChip: 'PARENT SHOWCASE',
    bullets: [
      'Working rovers, flight rigs & sensor stations',
      'Physical hardware showcased term-by-term',
    ],
    title: 'Projects',
    description: 'Students build working projects, grade by grade.',
    icon: 'Boxes',
    badgeType: 'confirmed',
    badgeLabel: 'Confirmed',
    borderColor: 'border-[#34D399]',
    bgGradient: 'bg-gradient-to-b from-[#ECFDF5] to-white',
    iconBg: 'bg-emerald-50 border-emerald-200',
    iconColor: 'text-[#059669]',
    backAccentColor: 'text-[#059669]',
    deliverable: 'Physical hardware showcased term-by-term',
    popupTitle: 'Tangible Proof of Learning',
    popupPurpose: 'Transforms classroom concepts into working physical hardware—rovers, sensors, and flight drones—giving parents and school leadership visible proof of progress.',
    popupBadge: 'Parent Value',
  },
  {
    categoryTag: '03 · CREDENTIALS',
    stageChip: 'NEP 2020 MILESTONE',
    bullets: [
      'Formal certificate for each level completed',
      'Verified alignment with modern STEM benchmarks',
    ],
    title: 'Certificates',
    description: 'A certificate for each level completed.',
    icon: 'Award',
    badgeType: 'confirmed',
    badgeLabel: 'Confirmed',
    borderColor: 'border-[#FBBF24]',
    bgGradient: 'bg-gradient-to-b from-[#FFFBEB] to-white',
    iconBg: 'bg-amber-50 border-amber-200',
    iconColor: 'text-[#D97706]',
    backAccentColor: 'text-[#D97706]',
    deliverable: 'Formal certificates for completed grades',
    popupTitle: 'Milestone Recognition',
    popupPurpose: 'Grants formal certificates upon completing each grade-wise level, providing verified recognition for students and academic records.',
    popupBadge: 'Recognition',
  },
  {
    categoryTag: '04 · TEAM ARENAS',
    stageChip: 'INTER-SCHOOL',
    bullets: [
      'School events & science carnival exhibits',
      'Team problem-solving in robotics arenas',
    ],
    title: 'Competitions',
    description: 'Showcase projects in school events and upcoming inter-school challenges.',
    icon: 'Trophy',
    badgeType: 'coming',
    badgeLabel: 'Coming – Inter-school',
    borderColor: 'border-[#C084FC]',
    bgGradient: 'bg-gradient-to-b from-[#FAF5FF] to-white',
    iconBg: 'bg-purple-50 border-purple-200',
    iconColor: 'text-[#9333EA]',
    backAccentColor: 'text-[#9333EA]',
    deliverable: 'Team preparation for student challenges',
    popupTitle: 'Competition Opportunities',
    popupPurpose: 'Prepares and supports school teams for regional and school-level STEM and robotics challenges, encouraging teamwork and creative problem-solving.',
    popupBadge: 'Student Participation',
  },
  {
    categoryTag: '05 · STUDENT ARCHIVE',
    stageChip: 'PORTFOLIO DEFENSE',
    bullets: [
      'Organized digital record of code & builds',
      'Cumulative proof of engineering growth',
    ],
    title: 'Portfolios',
    description: "A record of each student's builds to show and grow.",
    icon: 'Folder',
    badgeType: 'confirmed',
    badgeLabel: 'Confirmed',
    borderColor: 'border-[#38BDF8]',
    bgGradient: 'bg-gradient-to-b from-[#F0F9FF] to-white',
    iconBg: 'bg-sky-50 border-sky-200',
    iconColor: 'text-[#0284C7]',
    backAccentColor: 'text-[#0284C7]',
    deliverable: 'Documented portfolio of student builds',
    popupTitle: 'Student Project Portfolios',
    popupPurpose: "Builds an organized digital record of each student's working prototypes and code repositories, creating a cumulative archive to show and grow.",
    popupBadge: 'Cumulative Record',
  },
];

const renderIcon = (iconName: string, className: string = 'w-5 h-5') => {
  switch (iconName) {
    case 'Wrench':
      return <Wrench className={className} />;
    case 'Boxes':
      return <Boxes className={className} />;
    case 'Award':
      return <Award className={className} />;
    case 'Trophy':
      return <Trophy className={className} />;
    case 'Folder':
      return <Folder className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

export const BenefitsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  // Close card flip on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCardIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleScrollToNext = () => {
    window.dispatchEvent(new CustomEvent('go-to-slide', { detail: 12 }));
  };

  return (
    <ChapterShell
      id="benefits"
      chapterNumber="12"
      theme="light"
      fullBleed={true}
      className="relative w-full min-h-[100svh] lg:h-[100svh] overflow-y-auto lg:overflow-hidden select-none benefits-section-bg"
    >
      {/* Main Viewport Container (Centered in 100svh window on desktop, scrollable on mobile) */}
      <div
        ref={containerRef}
        className="relative w-full h-full min-h-full flex-1 flex flex-col justify-between items-center pt-[calc(var(--header-h,64px)+2px)] pb-2 px-4 sm:px-6 lg:px-8 xl:px-10 box-border select-none z-10 max-w-[1440px] mx-auto overflow-hidden"
      >
        {/* Top Header: Eyebrow with gold accent lines, Serif Title, & Subtitle */}
        <div className="flex-none max-w-4xl mx-auto text-center flex flex-col items-center mb-1 sm:mb-1.5">
          <div className="editorial-reveal flex items-center justify-center gap-2 mb-0.5">
            <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#b45309]" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#b45309] font-bold">
              INSTITUTIONAL VALUE
            </span>
            <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#b45309]" />
          </div>

          <h2
            ref={headlineRef}
            className="editorial-reveal font-serif text-xl sm:text-2xl lg:text-[28px] xl:text-[32px] font-bold leading-tight tracking-tight text-[#0F172A] mb-0.5 text-center"
          >
            Student and School Benefits
          </h2>

          <p className="editorial-reveal font-sans text-xs sm:text-[13px] text-[#475569] leading-snug max-w-3xl text-center font-normal">
            Technology education provides meaningful value for students and schools through hands-on learning, real projects and visible outcomes.
          </p>
        </div>

        {/* 5 Distinct Colorful Value Cards (Exact Image 1 Styling + 3D Flip Turn-Around on Hover/Click) */}
        <div className="editorial-reveal w-full self-stretch flex-none my-0.5 flex flex-col justify-center min-h-0">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 lg:gap-3 xl:gap-3.5 items-stretch">
            {BENEFIT_CARDS.map((card, idx) => {
              const isFlipped = activeCardIndex === idx || hoveredCardIndex === idx;

              return (
                <div
                  key={card.title}
                  onMouseEnter={() => setHoveredCardIndex(idx)}
                  onMouseLeave={() => setHoveredCardIndex(null)}
                  className="benefit-flip-wrapper"
                >
                  <div
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
                    aria-label={`Toggle details for ${card.title}`}
                  >
                    {/* FRONT FACE — Replicating Exact Image 1 Styling with vibrant borders and soft pastel gradients */}
                    <div
                      className={`benefit-flip-face benefit-flip-front border-2 ${card.borderColor} ${card.bgGradient} rounded-2xl shadow-xs`}
                    >
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          {/* Top Tag & Rounded Icon Box */}
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="font-mono text-[8px] sm:text-[8.5px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border bg-white/80 text-slate-600 border-slate-200">
                              {card.categoryTag}
                            </span>
                            <div
                              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl ${card.iconBg} border shadow-2xs flex items-center justify-center shrink-0`}
                            >
                              <span className={card.iconColor}>
                                {renderIcon(card.icon, 'w-4 h-4')}
                              </span>
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="font-serif text-[17px] sm:text-[18px] lg:text-[19px] font-bold text-[#0F172A] tracking-tight mb-1 leading-tight">
                            {card.title}
                          </h3>

                          {/* Description */}
                          <p className="font-sans text-[11px] sm:text-[11.5px] lg:text-[12px] text-[#334155] leading-snug font-normal mb-2">
                            {card.description}
                          </p>

                          {/* Bullets */}
                          <div className="pt-2 border-t border-slate-200/60 flex flex-col gap-1.5 mb-2">
                            {card.bullets.map((b, bIdx) => (
                              <div key={bIdx} className="flex items-start gap-1.5 text-[10px] sm:text-[10.5px] text-slate-700 leading-tight">
                                <Check className="w-3 h-3 text-[#0F172A] shrink-0 mt-0.5 stroke-[2.5]" />
                                <span className="font-sans font-medium">{b}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Bottom Status Badge & Chip */}
                        <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                          {card.badgeType === 'confirmed' ? (
                            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0] text-[9.5px] sm:text-[10px] font-semibold shadow-2xs">
                              <CheckCircle2 className="w-3 h-3 text-[#16A34A] shrink-0" />
                              <span>{card.badgeLabel}</span>
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A] text-[9.5px] sm:text-[10px] font-semibold shadow-2xs">
                              <Clock className="w-3 h-3 text-[#D97706] shrink-0" />
                              <span>{card.badgeLabel}</span>
                            </div>
                          )}
                          <span className="font-mono text-[7.5px] sm:text-[8px] px-1.5 py-0.5 rounded bg-white text-slate-500 font-semibold border border-slate-200">
                            {card.stageChip}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* BACK FACE — Deep Dive Details revealed on hover or touch */}
                    <div
                      className={`benefit-flip-face benefit-flip-back border-2 ${card.borderColor} bg-white rounded-2xl shadow-lg no-scrollbar overflow-y-auto`}
                    >
                      <div className="flex-1 flex flex-col justify-start min-h-0">
                        {/* Top Header */}
                        <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-slate-100 flex-none">
                          <span className={`font-mono text-[10.5px] sm:text-[11px] uppercase tracking-wider font-bold ${card.backAccentColor}`}>
                            0{idx + 1} &bull; {card.title}
                          </span>
                          <div className={`w-6 h-6 flex items-center justify-center rounded-lg ${card.iconBg} border`}>
                            <span className={card.iconColor}>
                              {renderIcon(card.icon, 'w-3.5 h-3.5')}
                            </span>
                          </div>
                        </div>

                        {/* Back Heading */}
                        <h4 className="font-serif text-[15px] sm:text-[16px] font-bold text-[#0F172A] mb-1 leading-snug flex-none">
                          {card.popupTitle}
                        </h4>

                        {/* Purpose Narrative */}
                        <p className="font-sans text-[12px] sm:text-[12.5px] text-[#475569] leading-snug mb-2 flex-none font-normal">
                          {card.popupPurpose}
                        </p>

                        {/* Concrete Deliverable Badge */}
                        <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-1.5 flex-none">
                          <Check className={`w-3.5 h-3.5 ${card.backAccentColor} shrink-0 mt-0.5 stroke-[2.5]`} />
                          <span className="font-sans text-[11.5px] sm:text-[12px] text-[#1E293B] leading-snug font-medium">
                            {card.deliverable}
                          </span>
                        </div>
                      </div>

                      {/* Back Bottom Bar */}
                      <div className="pt-1.5 border-t border-slate-100 mt-auto flex items-center justify-between flex-none">
                        <span className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-wider text-slate-500 font-semibold truncate mr-1">
                          {card.popupBadge}
                        </span>
                        <span className={`font-mono text-[11px] sm:text-[11.5px] ${card.backAccentColor} font-bold flex items-center gap-1 shrink-0 whitespace-nowrap`}>
                          <span>Turn back</span>
                          <span className="text-xs">↻</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Institutional Value Banner (Directly below cards from Image 1) */}
        <div className="editorial-reveal w-full self-stretch flex-none bg-[#FFFBEB] border border-[#FDE68A] rounded-xl px-4 py-1.5 sm:px-5 sm:py-2 shadow-xs mt-1 sm:mt-1.5">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="shrink-0 flex items-center justify-center">
              <School className="w-7 h-7 sm:w-8 sm:h-8 text-[#D97706]" />
            </div>
            <div className="w-[1.5px] h-6 sm:h-7 bg-[#FDE68A] shrink-0" />
            <h3 className="font-serif text-sm sm:text-base lg:text-[18px] font-bold text-[#0F172A] leading-snug">
              A visible, practical programme that families can see.
            </h3>
          </div>
        </div>

        {/* Institutional Value Bottom Strip (From Image 1) */}
        <div className="editorial-reveal w-full self-stretch flex-none mt-1 sm:mt-1.5 pt-1.5 border-t border-slate-200/80">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="flex flex-col font-mono text-[9px] sm:text-[9.5px] tracking-[0.2em] uppercase font-black text-[#0F172A] leading-tight">
                <span>INSTITUTIONAL</span>
                <span>VALUE</span>
              </div>
              <div className="hidden sm:block w-[1.5px] h-5 bg-slate-300" />
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-5 lg:gap-7 font-sans text-[11px] sm:text-[11.5px] text-[#1E293B] font-semibold">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center shrink-0">
                  <Users className="w-3 h-3 text-[#D97706]" />
                </div>
                <span>Tangible student projects and showcases</span>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center shrink-0">
                  <Layers className="w-3 h-3 text-[#D97706]" />
                </div>
                <span>Structured grade-wise tech programme</span>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center shrink-0">
                  <Briefcase className="w-3 h-3 text-[#D97706]" />
                </div>
                <span>Student portfolios building over time</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trailing Link CTA */}
        <div className="editorial-reveal flex-none pt-1 flex items-center justify-center mt-0.5">
          <button
            type="button"
            onClick={handleScrollToNext}
            className="group flex items-center justify-center text-center focus:outline-none cursor-pointer"
          >
            <span className="font-sans font-bold text-[8.5px] sm:text-[9px] uppercase tracking-[0.2em] text-[#64748B] group-hover:text-[#c8a45d] transition-colors">
              Discover school requirements &amp; partnership boundaries →
            </span>
          </button>
        </div>
      </div>
    </ChapterShell>
  );
};

export default BenefitsSection;
