import React, { useRef, useEffect } from 'react';
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
} from 'lucide-react';
import gsap from 'gsap';

interface ApproachCardData {
  title: string;
  badge: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  iconBorder: string;
  cardBorder: string;
  cardBg: string;
  glowColor: string;
}

const APPROACH_CARDS: ApproachCardData[] = [
  {
    title: 'Build real projects',
    badge: 'Students build, test and improve.',
    badgeBg: '#E0F2FE',
    badgeText: '#0284C7',
    badgeBorder: '#BAE6FD',
    description: 'Every term ends with something they made, on real hardware.',
    icon: <Wrench className="w-5 h-5 text-[#0284C7]" />,
    iconBg: '#F0F9FF',
    iconBorder: '#BAE6FD',
    cardBorder: '#38BDF8',
    cardBg: 'linear-gradient(180deg, #F0F9FF 0%, #FFFFFF 65%)',
    glowColor: 'rgba(56, 189, 248, 0.15)',
  },
  {
    title: 'A curriculum that keeps up',
    badge: 'Progressive, and kept current.',
    badgeBg: '#FEF3C7',
    badgeText: '#B45309',
    badgeBorder: '#FDE68A',
    description:
      'The curriculum builds year on year and is reviewed and updated as technology changes.',
    icon: <BookOpen className="w-5 h-5 text-[#D97706]" />,
    iconBg: '#FFFBEB',
    iconBorder: '#FDE68A',
    cardBorder: '#FB923C',
    cardBg: 'linear-gradient(180deg, #FFF7ED 0%, #FFFFFF 65%)',
    glowColor: 'rgba(251, 146, 60, 0.15)',
  },
  {
    title: 'Show what you built',
    badge: 'Showcases from Grade 9.',
    badgeBg: '#D1FAE5',
    badgeText: '#047857',
    badgeBorder: '#A7F3D0',
    description:
      'From Grade 9, students present their projects to teachers, parents and peers.',
    icon: <Presentation className="w-5 h-5 text-[#059669]" />,
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

  useEffect(() => {
    const el = contentRef.current;
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
        { y: 15, opacity: 0 },
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

  return (
    <ChapterShell
      id="approach"
      chapterNumber="05"
      theme="light"
      fullBleed={true}
      className="relative w-full h-[100svh] overflow-hidden bg-[#FAF6EE] select-none"
    >
      {/* Main Viewport Container - Standardized 1240px & Centered */}
      <div className="relative w-full h-full min-h-full flex-1 flex flex-col justify-between items-center pt-[calc(var(--header-h,64px)+6px)] pb-3 sm:pb-4 px-4 sm:px-6 lg:px-8 xl:px-10 box-border select-none z-10 max-w-[1440px] mx-auto overflow-hidden">
        
        {/* Main Inset White Panel - Big White Card framing Content & Instructor Photo */}
        <div className="relative w-full h-full flex-1 bg-[#FFFFFD] shadow-[0_16px_50px_rgba(0,0,0,0.05)] border border-black/8 rounded-2xl sm:rounded-3xl flex flex-col lg:flex-row items-stretch overflow-hidden box-border">
          
          {/* Left Content Area (Styled Exactly as Image 1) */}
          <div
            ref={contentRef}
            className="flex-1 flex flex-col justify-between p-3 sm:p-4 lg:p-5 gap-1.5 sm:gap-2"
          >
            {/* Header Area */}
            <div>
              {/* Eyebrow with gold accent line */}
              <div className="editorial-reveal flex items-center gap-2 mb-1">
                <span className="font-mono text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#b45309]">
                  {siteConfig.approach.eyebrow}
                </span>
                <span className="w-6 h-[1.5px] bg-[#b45309]/50" />
              </div>

              {/* Main Headline */}
              <h2
                ref={headlineRef}
                className="editorial-reveal font-serif text-xl sm:text-2xl lg:text-[27px] font-bold text-[#0F172A] tracking-tight leading-tight mb-0.5"
              >
                {siteConfig.approach.headline}
              </h2>

              {/* Glowing Warm Gold Underline Curve (Matching Image 1) */}
              <div className="editorial-reveal w-36 sm:w-48 -mt-0.5 mb-1.5">
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

            {/* ─── 3 Colorful Pedagogical Cards (Exact replica of Image 1) ─── */}
            <div className="editorial-reveal grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 my-0.5">
              {APPROACH_CARDS.map((card) => (
                <div
                  key={card.title}
                  style={{
                    background: card.cardBg,
                    borderColor: card.cardBorder,
                    boxShadow: `0 6px 20px -4px ${card.glowColor}`,
                  }}
                  className="flex flex-col justify-between p-2.5 sm:p-3 rounded-xl border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div>
                    {/* Top Row: Icon in Rounded Box + Card Title */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <div
                        style={{
                          backgroundColor: card.iconBg,
                          borderColor: card.iconBorder,
                        }}
                        className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 shadow-xs"
                      >
                        {card.icon}
                      </div>
                      <h3 className="font-serif text-[13px] sm:text-[14px] font-bold text-[#0F172A] leading-tight">
                        {card.title}
                      </h3>
                    </div>

                    {/* Distinct Colored Pill Badge (Matching Image 1) */}
                    <div className="my-1">
                      <span
                        style={{
                          backgroundColor: card.badgeBg,
                          color: card.badgeText,
                          borderColor: card.badgeBorder,
                        }}
                        className="inline-block px-2 py-0.5 rounded-full border text-[9.5px] sm:text-[10px] font-sans font-semibold leading-tight shadow-xs"
                      >
                        {card.badge}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="font-sans text-[10px] sm:text-[10.5px] text-[#475569] leading-snug mt-0.5 font-normal line-clamp-2">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ─── Bottom Section: "OUR APPROACH" & 6 Core Principles (Matching Image 1) ─── */}
            <div className="editorial-reveal pt-1.5 border-t border-black/8 mt-0.5">
              {/* Eyebrow with gold accent dashes */}
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="w-5 h-px bg-[#c8a45d]/60" />
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] font-bold text-[#B45309]">
                  Our Approach
                </span>
                <span className="w-5 h-px bg-[#c8a45d]/60" />
              </div>

              {/* 6 Core Learning Principles in Horizontal Clean Layout */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5">
                {PRINCIPLES.map((pr) => (
                  <div
                    key={pr.title}
                    className="flex flex-col items-center text-center p-1 group hover:-translate-y-0.5 transition-transform"
                  >
                    <div
                      style={{ backgroundColor: pr.bg, borderColor: pr.border }}
                      className="w-7 h-7 rounded-lg border flex items-center justify-center mb-0.5 shadow-xs group-hover:scale-105 transition-transform shrink-0"
                    >
                      {pr.icon}
                    </div>
                    <span className="font-sans text-[9px] sm:text-[9.5px] font-medium text-[#1E293B] leading-snug line-clamp-2">
                      {pr.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ─── Right Image Frame (Arched top-left corner matching Image 1) ─── */}
          <div className="hidden lg:flex w-[280px] xl:w-[320px] shrink-0 relative bg-black/5 items-center justify-center p-2.5 xl:p-3 overflow-hidden">
            <div className="relative w-full h-full rounded-tl-[60px] rounded-bl-[14px] rounded-r-[14px] overflow-hidden border-t-4 border-l-4 border-[#F59E0B] shadow-lg group">
              <img
                src="/assets/instructor_guided_learning.webp"
                alt="Instructor guiding students through practical engineering and technology learning"
                className="w-full h-full object-cover object-center filter saturate-[0.92] contrast-[1.04] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Photo Overlay */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                <span className="font-mono text-[8.5px] uppercase tracking-wider block opacity-90 text-[#F59E0B] font-bold">
                  Instructor-Guided Session
                </span>
                <span className="font-serif text-[11.5px] font-medium leading-tight text-white/95 block">
                  Practical Learning &amp; Faculty Mentorship
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </ChapterShell>
  );
};

export default LearningApproachSection;
