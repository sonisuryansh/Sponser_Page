import React, { useRef } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { Puzzle, Target, Lightbulb, Leaf, RefreshCw, ArrowRight } from 'lucide-react';

interface MissionValueCard {
  num: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  numColor: string;
  borderColor: string;
  waveColor: string;
}

const MISSION_CARDS: MissionValueCard[] = [
  {
    num: '01',
    name: 'Hands-on Learning',
    description: 'Direct engagement with physical hardware, components, and circuitry to bridge theory with practical execution.',
    icon: <Puzzle className="w-5 h-5 text-[#EA580C]" />,
    iconBg: 'bg-orange-50 border-orange-200/80',
    numColor: 'text-[#EA580C]',
    borderColor: 'border-orange-100 hover:border-[#EA580C]/80',
    waveColor: 'from-orange-100/40 via-orange-50/20 to-transparent',
  },
  {
    num: '02',
    name: 'Problem-Solving',
    description: 'Deconstruct complex mechanical and computational challenges into structured, iterative problem-solving steps.',
    icon: <Target className="w-5 h-5 text-[#0284C7]" />,
    iconBg: 'bg-sky-50 border-sky-200/80',
    numColor: 'text-[#0284C7]',
    borderColor: 'border-sky-100 hover:border-[#0284C7]/80',
    waveColor: 'from-sky-100/40 via-sky-50/20 to-transparent',
  },
  {
    num: '03',
    name: 'Creativity & Innovation',
    description: 'Transform creative intuition into functional CAD diagrams, physical chassis, and verified code implementations.',
    icon: <Lightbulb className="w-5 h-5 text-[#9333EA]" />,
    iconBg: 'bg-purple-50 border-purple-200/80',
    numColor: 'text-[#9333EA]',
    borderColor: 'border-purple-100 hover:border-[#9333EA]/80',
    waveColor: 'from-purple-100/40 via-purple-50/20 to-transparent',
  },
  {
    num: '04',
    name: 'Responsible Technology',
    description: 'Instill strong safety protocols, data privacy principles, and an ethical mindset for technological advancement.',
    icon: <Leaf className="w-5 h-5 text-[#16A34A]" />,
    iconBg: 'bg-emerald-50 border-emerald-200/80',
    numColor: 'text-[#16A34A]',
    borderColor: 'border-emerald-100 hover:border-[#16A34A]/80',
    waveColor: 'from-emerald-100/40 via-emerald-50/20 to-transparent',
  },
  {
    num: '05',
    name: 'Continuous Learning',
    description: 'Foster a growth mindset where debugging, telemetry analysis, and iterative improvement are celebrated.',
    icon: <RefreshCw className="w-5 h-5 text-[#E11D48]" />,
    iconBg: 'bg-rose-50 border-rose-200/80',
    numColor: 'text-[#E11D48]',
    borderColor: 'border-rose-100 hover:border-[#E11D48]/80',
    waveColor: 'from-rose-100/40 via-rose-50/20 to-transparent',
  },
];

export const MissionSection: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const handleExplore = () => {
    window.dispatchEvent(new CustomEvent('go-to-slide', { detail: 3 }));
  };

  return (
    <ChapterShell
      id="mission"
      chapterNumber="03"
      theme="light"
      fullBleed={true}
      className="relative w-full min-h-[100svh] lg:h-[100svh] overflow-y-auto lg:overflow-hidden select-none bg-[#FAF8F5]"
    >
      {/* Background ambient gentle wave curves matching Image 1 */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-purple-100/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-100/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100/25 rounded-full blur-3xl pointer-events-none" />

      {/* Main Centered Container - Balanced Executive Proportions */}
      <div className="relative w-full h-full min-h-full flex-1 flex flex-col justify-between items-center pt-[calc(var(--header-h,64px)+6px)] pb-3 sm:pb-4 px-4 sm:px-6 lg:px-8 xl:px-10 box-border select-none z-10 max-w-[1440px] mx-auto overflow-hidden">
        {/* Main Inset Grand White Card Container */}
        <div
          ref={contentRef}
          className="relative w-full h-full flex-1 bg-white shadow-[0_16px_50px_rgba(0,0,0,0.04)] border border-slate-200/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 xl:p-8 flex flex-col justify-between gap-3 sm:gap-4 overflow-hidden"
        >
          {/* Top Area: Eyebrow, Statement Headline & Narrative Copy */}
          <div className="flex-none text-center max-w-4xl mx-auto mb-1.5 sm:mb-2">
            {/* Eyebrow */}
            <div className="editorial-reveal flex items-center justify-center gap-2.5 mb-1">
              <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#b45309]" />
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#b45309] font-bold">
                {siteConfig.mission.eyebrow}
              </span>
              <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#b45309]" />
            </div>

            {/* Elegant Grand Headline */}
            <h2
              ref={headlineRef}
              className="editorial-reveal font-serif text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-bold text-[#0F172A] tracking-tight leading-tight mb-1 text-center"
            >
              &ldquo;Connecting Concepts to Real-World Engineering&rdquo;
            </h2>

            {/* Narrative Body Copy (Centered) */}
            <p className="editorial-reveal font-sans text-xs sm:text-sm text-[#475569] leading-relaxed max-w-3xl mx-auto font-normal text-center">
              At MedhaArc Labs, we believe technology education moves beyond passive consumption into tangible engineering. From foundational logic to physical prototypes, our curriculum connects core mathematical reasoning with hands-on robotics, AI, drone, and autonomous flight.
            </p>
          </div>

          {/* Executive Engineering Philosophy Strip */}
          <div className="editorial-reveal my-1.5 sm:my-2 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-50/60 via-[#FAF9F6] to-sky-50/60 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-amber-600 font-bold text-sm shadow-2xs">
                ⚡
              </span>
              <div>
                <span className="font-sans font-bold text-xs sm:text-sm text-[#0F172A] block leading-tight">
                  Tangible Engineering Over Passive Screen Time
                </span>
                <span className="font-sans text-[11px] sm:text-xs text-[#64748B] leading-tight">
                  Every concept is validated on real microcontrollers, sensors, circuits, and autonomous robotic platforms.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#0284C7] font-semibold bg-sky-50 px-3 py-1 rounded-full border border-sky-200 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
              <span>Grade 3 to 12 Progressive Pathway</span>
            </div>
          </div>

          {/* Subheader Row Above 5 Cards */}
          <div className="editorial-reveal my-0.5 flex items-center justify-between pb-1.5 border-b border-slate-100">
            <span className="font-mono text-[10px] sm:text-[10.5px] uppercase tracking-[0.2em] text-[#0F172A] font-bold">
              CORE EDUCATIONAL VALUES
            </span>
            <div className="flex items-center gap-1.5 font-mono text-[9.5px] sm:text-[10px] uppercase tracking-wider text-[#7C3AED] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
              <span>5 PILLARS OF EDUCATION</span>
            </div>
          </div>

          {/* Middle Area: 5 Colorful Educational Value Cards (Spacious) */}
          <div className="editorial-reveal my-1 flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-3.5 xl:gap-4 items-stretch">
              {MISSION_CARDS.map((val) => (
                <div
                  key={val.name}
                  className={`group relative flex flex-col justify-between p-3.5 sm:p-4.5 bg-white border ${val.borderColor} rounded-xl sm:rounded-2xl shadow-2xs hover:shadow-xs transition-all duration-300 min-h-[170px] sm:min-h-[185px] lg:min-h-[200px] overflow-hidden`}
                >
                  {/* Subtle Pastel Bottom-Right Corner Wave Gradient */}
                  <div
                    className={`absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-tl ${val.waveColor} blur-xl pointer-events-none`}
                  />
                  <div
                    className={`absolute bottom-0 right-0 w-12 h-8 bg-gradient-to-tl ${val.waveColor} rounded-tl-2xl pointer-events-none opacity-70`}
                  />

                  {/* Card Content */}
                  <div className="relative z-10">
                    {/* Header Row: Icon and Number */}
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg ${val.iconBg} border shadow-2xs flex items-center justify-center shrink-0`}
                      >
                        {val.icon}
                      </div>
                      <span className={`font-mono text-xs sm:text-[13px] font-bold ${val.numColor}`}>
                        {val.num}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-[14px] sm:text-[15.5px] font-bold text-[#0F172A] leading-snug tracking-tight mb-1 group-hover:text-[#b45309] transition-colors">
                      {val.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="relative z-10 font-sans text-xs sm:text-[12.5px] text-[#475569] leading-snug mt-auto">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Area: Trailing Link CTA */}
          <div className="editorial-reveal flex-none pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 overflow-hidden max-w-full">
            <button
              type="button"
              onClick={handleExplore}
              className="group flex items-center text-left focus:outline-none cursor-pointer max-w-full"
            >
              <span className="font-mono font-bold text-[8.5px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#0F172A] group-hover:text-[#b45309] transition-colors truncate">
                DISCOVER MORE ABOUT OUR CURRICULUM &amp; SPECIALISATIONS
              </span>
              <span className="w-5 h-5 rounded-full bg-orange-100/80 text-[#EA580C] flex items-center justify-center font-bold text-[10px] ml-2 transition-transform group-hover:translate-x-1 shadow-2xs shrink-0">
                <ArrowRight className="w-3 h-3 stroke-[2.5]" />
              </span>
            </button>

            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#64748B] font-semibold">
              ACADEMIC ENGINEERING EXPERIENCE
            </span>
          </div>
        </div>
      </div>
    </ChapterShell>
  );
};

export default MissionSection;
