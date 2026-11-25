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
import gsap from 'gsap';

interface BenefitCardConfig {
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
    popupBadge: 'Direct Student Competence',
  },
  {
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
    popupBadge: 'Transparent Parent Value',
  },
  {
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
    popupBadge: 'Milestone Recognition',
  },
  {
    title: 'Competitions',
    description: 'Today, students contribute showcase projects to school events and science carnivals. Inter-school competitions are planned as skills grow.',
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

  // Close card flip on Escape key
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
      className="relative w-full min-h-[100svh] lg:h-[100svh] overflow-y-auto lg:overflow-hidden select-none benefits-section-bg"
    >
      {/* Main Viewport Container (Centered in 100svh window on desktop, scrollable on mobile) */}
      <div
        ref={containerRef}
        className="relative w-full h-full min-h-full flex-1 flex flex-col justify-between items-center pt-[calc(var(--header-h,64px)+6px)] pb-3 sm:pb-4 px-4 sm:px-6 lg:px-8 xl:px-10 box-border select-none z-10 max-w-[1440px] mx-auto overflow-hidden"
      >
        {/* Top Header: Eyebrow with gold accent lines, Serif Title, & Subtitle */}
        <div className="flex-none max-w-4xl mx-auto text-center flex flex-col items-center mb-2 sm:mb-2.5">
          <div className="editorial-reveal flex items-center justify-center gap-2.5 mb-1">
            <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#b45309]" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#b45309] font-bold">
              INSTITUTIONAL VALUE
            </span>
            <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#b45309]" />
          </div>

          <h2
            ref={headlineRef}
            className="editorial-reveal font-serif text-2xl sm:text-3xl lg:text-[36px] xl:text-[40px] font-bold leading-tight tracking-tight text-[#0F172A] mb-1 text-center"
          >
            Student and School Benefits
          </h2>

          <p className="editorial-reveal font-sans text-xs sm:text-sm text-[#475569] leading-relaxed max-w-3xl text-center font-normal">
            Technology education provides meaningful value for students and schools through hands-on learning, real projects and visible outcomes.
          </p>
        </div>

        {/* 5 Distinct Colorful Value Cards (Exact Image 1 Styling + 3D Flip Turn-Around on Hover/Click) */}
        <div className="editorial-reveal w-full self-stretch flex-none my-1 sm:my-1.5 flex flex-col justify-center min-h-0">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-3.5 xl:gap-4 items-stretch">
            {BENEFIT_CARDS.map((card, idx) => {
              const isFlipped = activeCardIndex === idx;

              return (
                <div key={card.title} className="benefit-flip-wrapper">
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
                      <div className="flex flex-col h-full">
                        {/* Top Rounded Icon Box */}
                        <div
                          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl ${card.iconBg} border shadow-2xs flex items-center justify-center shrink-0 mb-3`}
                        >
                          <span className={card.iconColor}>
                            {renderIcon(card.icon, 'w-5 h-5')}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-[19px] sm:text-[20px] lg:text-[21px] font-bold text-[#0F172A] tracking-tight mb-2 leading-tight">
                          {card.title}
                        </h3>

                        {/* Description */}
                        <p className="font-sans text-[11px] sm:text-[11.5px] lg:text-[12px] text-[#475569] leading-relaxed">
                          {card.description}
                        </p>

                        {/* Bottom Status Badge */}
                        <div className="mt-auto pt-3">
                          {card.badgeType === 'confirmed' ? (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0] text-[11px] font-semibold shadow-2xs">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                              <span>{card.badgeLabel}</span>
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A] text-[11px] font-semibold shadow-2xs">
                              <Clock className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                              <span>{card.badgeLabel}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* BACK FACE — Deep Dive Details revealed on hover or touch */}
                    <div
                      className={`benefit-flip-face benefit-flip-back border-2 ${card.borderColor} bg-white rounded-2xl shadow-lg`}
                    >
                      <div>
                        {/* Top Header */}
                        <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-100">
                          <span className={`font-mono text-[9.5px] uppercase tracking-wider font-bold ${card.backAccentColor}`}>
                            0{idx + 1} &bull; {card.title}
                          </span>
                          <div className={`w-6 h-6 flex items-center justify-center rounded-lg ${card.iconBg} border`}>
                            <span className={card.iconColor}>
                              {renderIcon(card.icon, 'w-3.5 h-3.5')}
                            </span>
                          </div>
                        </div>

                        {/* Back Heading */}
                        <h4 className="font-serif text-[14.5px] sm:text-base font-bold text-[#0F172A] mb-1 leading-snug">
                          {card.popupTitle}
                        </h4>

                        {/* Purpose Narrative */}
                        <p className="font-sans text-[10.5px] sm:text-[11px] text-[#475569] leading-relaxed mb-2">
                          {card.popupPurpose}
                        </p>

                        {/* Concrete Deliverable Badge */}
                        <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-1.5">
                          <Check className={`w-3.5 h-3.5 ${card.backAccentColor} shrink-0 mt-0.5 stroke-[2.5]`} />
                          <span className="font-sans text-[10px] sm:text-[10.5px] text-[#334155] leading-snug font-medium">
                            {card.deliverable}
                          </span>
                        </div>
                      </div>

                      {/* Back Bottom Bar */}
                      <div className="pt-2 border-t border-slate-100 mt-auto flex items-center justify-between">
                        <span className="font-mono text-[8.5px] sm:text-[9px] uppercase tracking-wider text-slate-500 font-semibold truncate mr-1">
                          {card.popupBadge}
                        </span>
                        <span className={`font-mono text-[9.5px] ${card.backAccentColor} font-bold flex items-center gap-1`}>
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
        <div className="editorial-reveal w-full self-stretch flex-none bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl px-5 py-3 sm:px-6 sm:py-3.5 shadow-xs mt-3 sm:mt-3.5">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="shrink-0 flex items-center justify-center">
              <School className="w-9 h-9 sm:w-11 sm:h-11 text-[#D97706]" />
            </div>
            <div className="w-[1.5px] h-8 sm:h-10 bg-[#FDE68A] shrink-0" />
            <h3 className="font-serif text-base sm:text-lg lg:text-[21px] font-bold text-[#0F172A] leading-snug">
              A visible, practical programme that families can see.
            </h3>
          </div>
        </div>

        {/* Institutional Value Bottom Strip (From Image 1) */}
        <div className="editorial-reveal w-full self-stretch flex-none mt-2.5 sm:mt-3 pt-2.5 border-t border-slate-200/80">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3.5 shrink-0">
              <div className="flex flex-col font-mono text-[10px] sm:text-[10.5px] tracking-[0.2em] uppercase font-black text-[#0F172A] leading-tight">
                <span>INSTITUTIONAL</span>
                <span>VALUE</span>
              </div>
              <div className="hidden sm:block w-[1.5px] h-6 bg-slate-300" />
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-7 lg:gap-9 font-sans text-xs sm:text-[12.5px] text-[#1E293B] font-semibold">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center shrink-0">
                  <Users className="w-3.5 h-3.5 text-[#D97706]" />
                </div>
                <span>Tangible student projects and showcases</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center shrink-0">
                  <Layers className="w-3.5 h-3.5 text-[#D97706]" />
                </div>
                <span>A structured, grade-wise technology programme</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center shrink-0">
                  <Briefcase className="w-3.5 h-3.5 text-[#D97706]" />
                </div>
                <span>Student portfolios that build over time</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trailing Link CTA */}
        <div className="editorial-reveal flex-none pt-2 flex items-center justify-center mt-1">
          <button
            type="button"
            onClick={handleScrollToNext}
            className="group flex items-center justify-center text-center focus:outline-none cursor-pointer"
          >
            <span className="font-sans font-bold text-[9px] sm:text-[9.5px] uppercase tracking-[0.2em] text-[#64748B] group-hover:text-[#c8a45d] transition-colors">
              Discover school requirements &amp; partnership boundaries →
            </span>
          </button>
        </div>
      </div>
    </ChapterShell>
  );
};

export default BenefitsSection;
