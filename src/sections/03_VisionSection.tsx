import React, { useRef } from 'react';
import { ChapterShell } from '../components/ChapterShell';
import { Sparkles, Award, ShieldCheck, ArrowRight, CheckCircle2, Rocket } from 'lucide-react';

interface VisionPillar {
  icon: React.ReactNode;
  tag: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  footer: string;
  borderColor: string;
  hoverBorder: string;
  badgeBg: string;
  badgeText: string;
  iconBg: string;
  accentBg: string;
}

const VISION_PILLARS: VisionPillar[] = [
  {
    icon: <Rocket className="w-5 h-5 text-[#EA580C]" />,
    tag: 'CREATION OVER CONSUMPTION',
    badge: 'Active Builders',
    title: 'Active Creators & Makers',
    subtitle: 'From Screen Time to Tangible Hardware',
    description:
      'Moving students beyond passive video watching into tangible physical engineering. Learners wire breadboard circuits, flash microcontrollers, and deploy real sensor feedback loops.',
    points: [
      'Hands-on physical computing & hardware wiring',
      'Real-time firmware debugging & sensor calibration',
      'Replacing passive screen time with authentic building',
    ],
    footer: 'Core Mindset: Confidence to Build from Scratch',
    borderColor: 'border-orange-200/90',
    hoverBorder: 'hover:border-orange-400',
    badgeBg: 'bg-orange-50 border-orange-200',
    badgeText: 'text-[#EA580C]',
    iconBg: 'bg-orange-100/80',
    accentBg: 'from-orange-50/70 via-white to-white',
  },
  {
    icon: <Award className="w-5 h-5 text-[#0284C7]" />,
    tag: 'AUTHENTIC MASTERY',
    badge: 'Verifiable Proof',
    title: 'Verifiable Portfolios & Defense',
    subtitle: 'Demonstrated Engineering Competence',
    description:
      'Every student graduates with an organized portfolio of functional prototypes, code repositories, and CAD chassis designs, defended publicly before faculty, peers, and parents.',
    points: [
      'Authentic working robotics & autonomous rover projects',
      'Student-led technical defense & peer demonstrations',
      'Verifiable engineering achievements for higher academic paths',
    ],
    footer: 'Core Proof: Concrete Artifacts, Not Just Grades',
    borderColor: 'border-sky-200/90',
    hoverBorder: 'hover:border-sky-400',
    badgeBg: 'bg-sky-50 border-sky-200',
    badgeText: 'text-[#0284C7]',
    iconBg: 'bg-sky-100/80',
    accentBg: 'from-sky-50/70 via-white to-white',
  },
  {
    icon: <Sparkles className="w-5 h-5 text-[#9333EA]" />,
    tag: 'FUTURE READINESS',
    badge: 'Ethical Leadership',
    title: 'Ethical AI & Future Leadership',
    subtitle: 'Responsible Technology Stewardship',
    description:
      'Demystifying artificial intelligence, machine learning, and automation with deep ethical awareness. Students master logical algorithmic models while respecting safety, data ethics, and user privacy.',
    points: [
      'Machine learning intuition, vision classifiers & telemetry',
      'Rigorous lab safety, system compliance & ethical AI',
      'Lifelong computational intuition for tomorrow’s careers',
    ],
    footer: 'Core Leadership: Principled Innovation for Society',
    borderColor: 'border-purple-200/90',
    hoverBorder: 'hover:border-purple-400',
    badgeBg: 'bg-purple-50 border-purple-200',
    badgeText: 'text-[#9333EA]',
    iconBg: 'bg-purple-100/80',
    accentBg: 'from-purple-50/70 via-white to-white',
  },
];

export const VisionSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScrollToNext = () => {
    window.dispatchEvent(new CustomEvent('go-to-slide', { detail: 3 }));
  };

  return (
    <ChapterShell
      id="vision"
      chapterNumber="03"
      theme="light"
      fullBleed={true}
      className="relative w-full min-h-[100svh] lg:h-[100svh] overflow-y-auto lg:overflow-hidden select-none bg-[#FAF8F5] flex flex-col lg:items-center lg:justify-center"
    >
      {/* Background ambient gentle wave curves */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-purple-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-100/25 rounded-full blur-3xl pointer-events-none" />

      {/* Main Viewport Container */}
      <div
        ref={containerRef}
        className="relative w-full h-auto lg:h-full max-h-none lg:max-h-full min-h-0 flex-1 flex flex-col justify-between items-center pt-[calc(var(--header-h,64px)+10px)] pb-8 lg:pb-3 px-3 sm:px-5 lg:px-6 xl:px-8 box-border select-none z-10 max-w-[1440px] mx-auto overflow-visible lg:overflow-hidden"
      >
        {/* Main Grand Card Container */}
        <div className="relative w-full h-auto lg:h-full max-h-none lg:max-h-[820px] xl:lg:max-h-[860px] min-h-0 flex-1 lg:my-auto bg-white rounded-2xl sm:rounded-3xl shadow-[0_16px_50px_rgba(0,0,0,0.04)] border border-slate-200/80 p-3 sm:p-4 lg:p-5 xl:p-6 flex flex-col justify-between box-border gap-2.5 sm:gap-3 overflow-visible lg:overflow-hidden">

          {/* Top Section Header: Symmetrical Eyebrow + Clean Headline */}
          <div className="flex-none max-w-4xl mx-auto text-center flex flex-col items-center">
            <div className="editorial-reveal flex items-center justify-center gap-2 mb-1">
              <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-r from-transparent to-[#b45309]" />
              <span className="font-mono text-[10.5px] sm:text-[11.5px] uppercase tracking-[0.24em] text-[#b45309] font-bold">
                STRATEGIC VISION
              </span>
              <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-l from-transparent to-[#b45309]" />
            </div>

            <h2 className="editorial-reveal font-serif text-lg sm:text-2xl lg:text-[28px] xl:text-[32px] font-bold text-[#0F172A] tracking-tight leading-tight mb-1 text-center">
              Confident Builders, Thinkers &amp; Real-World Solvers
            </h2>

            <p className="editorial-reveal font-sans text-[12.5px] sm:text-[13.5px] text-slate-600 leading-snug max-w-3xl text-center font-normal">
              Transforming passive consumers of technology into active creators, problem-solvers, and responsible innovators equipped with verifiable real-world skills.
            </p>
          </div>

          {/* Middle Row: 3 Symmetrical Vision Impact Pillars */}
          <div className="editorial-reveal grid grid-cols-1 md:grid-cols-3 gap-3.5 lg:gap-4 xl:gap-5 items-stretch flex-1 min-h-0 my-1">
            {VISION_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className={`bg-gradient-to-b ${pillar.accentBg} rounded-2xl border-2 ${pillar.borderColor} ${pillar.hoverBorder} p-3.5 sm:p-4 lg:p-5 flex flex-col justify-between shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5`}
              >
                <div>
                  {/* Top Bar: Icon, Tag & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg ${pillar.iconBg} flex items-center justify-center shrink-0 shadow-2xs`}>
                        {pillar.icon}
                      </div>
                      <span className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.18em] font-bold text-slate-600">
                        {pillar.tag}
                      </span>
                    </div>
                    <span className={`font-mono text-[8.5px] sm:text-[9px] uppercase px-2 py-0.5 rounded-full font-bold border ${pillar.badgeBg} ${pillar.badgeText} shrink-0`}>
                      {pillar.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-serif text-[17px] sm:text-[18px] lg:text-[20px] font-bold text-[#0F172A] leading-tight mb-1">
                    {pillar.title}
                  </h3>
                  <span className="font-mono text-[10px] sm:text-[10.5px] text-[#b45309] font-medium block mb-2">
                    {pillar.subtitle}
                  </span>

                  {/* Narrative Description */}
                  <p className="font-sans text-[12px] sm:text-[12.5px] lg:text-[13px] text-slate-700 leading-relaxed font-normal mb-3">
                    {pillar.description}
                  </p>

                  {/* Key Highlights */}
                  <ul className="space-y-1.5 pt-2 border-t border-slate-200/80 text-[11px] sm:text-[11.5px] text-slate-800 font-sans">
                    {pillar.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Grounded Pillar Footer */}
                <div className="mt-3 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[9px] sm:text-[9.5px] font-mono text-slate-500">
                  <span className="font-semibold text-slate-600">{pillar.footer}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Highlight SLA Banner */}
          <div className="editorial-reveal w-full self-stretch flex-none bg-[#FFFBEB] border border-[#FDE68A] rounded-xl px-4 py-2 sm:px-5 sm:py-2.5 shadow-xs">
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="shrink-0 flex items-center justify-center text-[#D97706]">
                <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div className="w-[1.5px] h-6 sm:h-7 bg-[#FDE68A] shrink-0" />
              <h3 className="font-serif text-[13px] sm:text-base font-bold text-[#0F172A] leading-snug">
                Our Strategic Vision: Every student graduates not as a passive consumer of devices, but as a confident innovator capable of engineering real-world solutions.
              </h3>
            </div>
          </div>

          {/* Bottom Trailing Row: Trust Strip & Next Step Button */}
          <div className="editorial-reveal flex-none pt-1 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-2.5">
            {/* Impact Metric Badges */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-6 font-sans text-[11px] sm:text-[11.5px] text-[#1E293B] font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Grade 3–12 Spiral Progression</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-500" />
                <span>100% Tangible Working Hardware</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span>Verifiable Public Portfolios</span>
              </div>
            </div>

            {/* Next Chapter CTA Button */}
            <button
              type="button"
              onClick={handleScrollToNext}
              className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-mono tracking-wider uppercase text-[#b45309] font-bold hover:text-[#92400e] transition-colors cursor-pointer group"
            >
              <span>Discover Guiding Purpose &amp; Core Values</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>
      </div>
    </ChapterShell>
  );
};

export default VisionSection;
