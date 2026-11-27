import React, { useRef } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import {
  Wrench,
  BookOpen,
  Presentation,
  Layers,
  Lightbulb,
  Rocket,
  BarChart3,
  Sigma,
  ShieldCheck,
  Check,
} from 'lucide-react';

interface ApproachCardData {
  tag: string;
  tagColor: string;
  title: string;
  description: string;
  bullets: string[];
  chips: string[];
  icon: React.ReactNode;
  iconBg: string;
  iconBorder: string;
  cardBorder: string;
  cardBg: string;
  glowColor: string;
}

const APPROACH_CARDS: ApproachCardData[] = [
  {
    tag: 'HANDS-ON HARDWARE',
    tagColor: 'bg-sky-100 text-[#0369A1] border-sky-200',
    title: 'Build real projects',
    description: 'Every term ends with something students engineered and verified on physical hardware.',
    bullets: [
      'Tangible breadboard circuits & sensor wiring',
      'Bare-metal firmware flashing & live debugging',
    ],
    chips: ['PROTOTYPE', 'TEST', 'DEPLOY'],
    icon: <Wrench className="w-4 h-4 text-[#0284C7]" />,
    iconBg: '#F0F9FF',
    iconBorder: '#BAE6FD',
    cardBorder: '#38BDF8',
    cardBg: 'linear-gradient(180deg, #F0F9FF 0%, #FFFFFF 65%)',
    glowColor: 'rgba(56, 189, 248, 0.15)',
  },
  {
    tag: 'SPIRAL PROGRESSION',
    tagColor: 'bg-amber-100 text-[#B45309] border-amber-200',
    title: 'A curriculum that keeps up',
    description: 'The curriculum builds year-on-year and is reviewed annually as technology evolves.',
    bullets: [
      'Structured concept escalation from Grade 3 to 12',
      'Applied mathematics & computational reasoning',
    ],
    chips: ['FOUNDATION', 'SYSTEMS', 'CAPSTONE'],
    icon: <BookOpen className="w-4 h-4 text-[#D97706]" />,
    iconBg: '#FFFBEB',
    iconBorder: '#FDE68A',
    cardBorder: '#FB923C',
    cardBg: 'linear-gradient(180deg, #FFF7ED 0%, #FFFFFF 65%)',
    glowColor: 'rgba(251, 146, 60, 0.15)',
  },
  {
    tag: 'PORTFOLIO DEFENSE',
    tagColor: 'bg-emerald-100 text-[#15803D] border-emerald-200',
    title: 'Show what you built',
    description: 'From Grade 9, students defend their working prototypes to peers, faculty, and parents.',
    bullets: [
      'Annual STEM exhibition showcase readiness',
      'Documented digital engineering portfolio',
    ],
    chips: ['EXHIBIT', 'DEFEND', 'PUBLISH'],
    icon: <Presentation className="w-4 h-4 text-[#059669]" />,
    iconBg: '#ECFDF5',
    iconBorder: '#A7F3D0',
    cardBorder: '#34D399',
    cardBg: 'linear-gradient(180deg, #ECFDF5 0%, #FFFFFF 65%)',
    glowColor: 'rgba(52, 211, 153, 0.15)',
  },
];

const PRINCIPLES = [
  {
    title: 'Connected learning across four domains',
    icon: <Layers className="w-4 h-4 text-[#0284C7]" />,
    bg: '#F0F9FF',
    border: '#BAE6FD',
  },
  {
    title: 'Concepts before complexity',
    icon: <Lightbulb className="w-4 h-4 text-[#16A34A]" />,
    bg: '#F0FDF4',
    border: '#BBF7D0',
  },
  {
    title: 'Practical-first learning',
    icon: <Rocket className="w-4 h-4 text-[#EA580C]" />,
    bg: '#FFF7ED',
    border: '#FED7AA',
  },
  {
    title: 'Grade-wise progression',
    icon: <BarChart3 className="w-4 h-4 text-[#9333EA]" />,
    bg: '#FAF5FF',
    border: '#E9D5FF',
  },
  {
    title: 'Mathematical foundations in real applications',
    icon: <Sigma className="w-4 h-4 text-[#2563EB]" />,
    bg: '#EFF6FF',
    border: '#BFDBFE',
  },
  {
    title: 'Responsible innovation',
    icon: <ShieldCheck className="w-4 h-4 text-[#15803D]" />,
    bg: '#F0FDF4',
    border: '#BBF7D0',
  },
];

export const LearningApproachSection: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  return (
    <ChapterShell
      id="approach"
      chapterNumber="05"
      theme="light"
      fullBleed={true}
      className="relative w-full min-h-[100svh] lg:h-[100svh] overflow-y-auto lg:overflow-hidden bg-[#FAF6EE] select-none"
    >
      {/* Main Viewport Container */}
      <div className="relative w-full h-auto lg:h-full min-h-0 flex-1 flex flex-col justify-between items-center pt-[calc(var(--header-h,64px)+0px)] pb-3 sm:pb-4 lg:pb-0 px-3 sm:px-5 lg:px-8 xl:px-10 box-border select-none z-10 max-w-[1440px] mx-auto overflow-visible lg:overflow-hidden">
        
        {/* Main Inset White Panel */}
        <div className="relative w-full h-auto lg:h-full flex-1 lg:my-auto max-h-none lg:max-h-[820px] xl:lg:max-h-[860px] bg-[#FFFFFD] shadow-[0_16px_50px_rgba(0,0,0,0.05)] border border-black/8 rounded-2xl sm:rounded-3xl flex flex-col lg:flex-row items-stretch overflow-visible lg:overflow-hidden box-border">
          
          {/* Left Content Area (Styled Exactly as Image 1) */}
          <div
            ref={contentRef}
            className="flex-1 min-w-0 flex flex-col justify-between p-3 sm:p-4 lg:p-4 gap-1.5 sm:gap-2 lg:gap-1.5"
          >
            {/* Header Area */}
            <div className="flex flex-col items-center text-center">
              {/* Eyebrow with gold accent lines */}
              <div className="editorial-reveal flex items-center justify-center gap-2 mb-1">
                <span className="w-6 h-[1.5px] bg-[#b45309]/50" />
                <span className="font-mono text-[10.5px] sm:text-[11.5px] font-bold uppercase tracking-[0.24em] text-[#b45309]">
                  {siteConfig.approach.eyebrow}
                </span>
                <span className="w-6 h-[1.5px] bg-[#b45309]/50" />
              </div>

              {/* Main Headline */}
              <h2
                ref={headlineRef}
                className="editorial-reveal font-serif text-xl sm:text-2xl lg:text-[28px] font-bold text-[#0F172A] tracking-tight leading-tight mb-1 text-center"
              >
                {siteConfig.approach.headline}
              </h2>

              {/* Glowing Warm Gold Underline Curve (Matching Image 1) */}
              <div className="editorial-reveal w-36 sm:w-48 mx-auto -mt-0.5 mb-1.5">
                <svg viewBox="0 0 240 12" fill="none" className="w-full text-[#F59E0B]">
                  <path
                    d="M2 9C70 2 170 2 238 8"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

            </div>

            {/* ─── 3 Colorful Pedagogical Cards (Balanced & Cohesive, No Awkward Dead Gaps) ─── */}
            <div className="editorial-reveal grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 lg:gap-3 my-auto flex-none items-stretch">
              {APPROACH_CARDS.map((card) => (
                <div
                  key={card.title}
                  style={{
                    background: card.cardBg,
                    borderColor: card.cardBorder,
                    boxShadow: `0 6px 20px -4px ${card.glowColor}`,
                  }}
                  className="flex flex-col justify-between p-3 sm:p-3.5 lg:p-4 rounded-xl border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div>
                    {/* Top Row: Pill Tag + Icon Box */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`font-mono text-[8px] sm:text-[8.5px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${card.tagColor}`}>
                        {card.tag}
                      </span>
                      <div
                        style={{
                          backgroundColor: card.iconBg,
                          borderColor: card.iconBorder,
                        }}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border flex items-center justify-center shrink-0 shadow-xs"
                      >
                        {card.icon}
                      </div>
                    </div>

                    {/* Card Title */}
                    <h3 className="font-serif text-[15px] sm:text-[16px] font-bold text-[#0F172A] leading-tight mb-1">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="font-sans text-[11px] sm:text-[11.5px] text-[#334155] leading-snug mb-2 font-normal">
                      {card.description}
                    </p>

                    {/* Bullets */}
                    <div className="pt-2 border-t border-slate-200/70 flex flex-col gap-1.5 mb-2.5">
                      {card.bullets.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-1.5 text-[10.5px] sm:text-[11px] text-slate-700 leading-tight">
                          <Check className="w-3 h-3 text-[#0F172A] shrink-0 mt-0.5 stroke-[2.5]" />
                          <span className="font-sans font-medium">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stage Chips */}
                  <div className="pt-2 border-t border-slate-200/70 flex items-center gap-1">
                    {card.chips.map((chip, cIdx) => (
                      <span
                        key={cIdx}
                        className="font-mono text-[7.5px] sm:text-[8px] px-1.5 py-0.5 rounded bg-white text-slate-600 font-semibold border border-slate-200 shadow-2xs"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* ─── Bottom Section: "OUR APPROACH" & 6 Core Principles (Matching Image 1) ─── */}
            <div className="editorial-reveal pt-1.5 border-t border-black/8 mt-0.5">
              {/* Eyebrow with gold accent dashes */}
              <div className="flex items-center justify-center gap-2 mb-1.5">
                <span className="w-5 h-px bg-[#c8a45d]/60" />
                <span className="font-mono text-[10px] sm:text-[10.5px] uppercase tracking-[0.25em] font-bold text-[#B45309]">
                  Our Approach
                </span>
                <span className="w-5 h-px bg-[#c8a45d]/60" />
              </div>

              {/* 6 Core Learning Principles in Horizontal Clean Layout */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {PRINCIPLES.map((pr) => (
                  <div
                    key={pr.title}
                    className="flex flex-col items-center text-center p-1.5 bg-white/70 rounded-lg border border-black/5 hover:-translate-y-0.5 transition-transform"
                  >
                    <div
                      style={{ backgroundColor: pr.bg, borderColor: pr.border }}
                      className="w-7 h-7 rounded-lg border flex items-center justify-center mb-1 shadow-xs group-hover:scale-105 transition-transform shrink-0"
                    >
                      {pr.icon}
                    </div>
                    <span className="font-sans text-[10.5px] sm:text-[11.5px] font-semibold text-[#0F172A] leading-snug line-clamp-2">
                      {pr.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ─── Right Image Frame (Arched top-left corner matching Image 1) ─── */}
          <div className="hidden lg:flex w-[380px] xl:w-[460px] 2xl:w-[490px] shrink-0 relative bg-black/5 items-center justify-center p-2.5 xl:p-3 overflow-hidden">
            <div className="relative w-full h-full rounded-tl-[60px] rounded-bl-[14px] rounded-r-[14px] overflow-hidden border-t-4 border-l-4 border-[#F59E0B] shadow-lg group">
              <img
                src="/assets/instructor_guided_learning.webp"
                alt="Instructor guiding students through practical engineering and technology learning"
                className="w-full h-full object-cover filter saturate-[0.92] contrast-[1.04] group-hover:scale-105 transition-transform duration-700 ease-out"
                style={{ objectPosition: '37.5% 16%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            </div>
          </div>

        </div>
      </div>
    </ChapterShell>
  );
};

export default LearningApproachSection;
