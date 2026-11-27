import React, { useRef } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { ArrowRight } from 'lucide-react';

interface MissionValueCard {
  num: string;
  name: string;
  pillar: string;
  description: string;
  tags: [string, string];
  gif: string;
  numBg: string;
  numColor: string;
  borderColor: string;
  bottomBorder: string;
  glowColor: string;
}

const MISSION_CARDS: MissionValueCard[] = [
  {
    num: '01',
    name: 'Hands-on Learning',
    pillar: 'Physical Prototyping',
    description: 'Learn by building, testing, and creating with real industrial hardware and sensors.',
    tags: ['Hardware Circuits', 'Microcontrollers'],
    gif: '/assets/values/val_icon_1_hands_on.gif',
    numBg: 'bg-orange-50 border-orange-200',
    numColor: 'text-[#EA580C]',
    borderColor: 'border-slate-200/90 hover:border-orange-300',
    bottomBorder: 'border-b-2 border-b-[#EA580C]',
    glowColor: 'from-orange-100/30 via-transparent to-transparent',
  },
  {
    num: '02',
    name: 'Problem-Solving',
    pillar: 'Logical Thinking',
    description: 'Deconstruct complex challenges into clear logic and structured algorithmic steps.',
    tags: ['Root-Cause Analysis', 'Computational Logic'],
    gif: '/assets/values/val_icon_2_problem_solving.gif',
    numBg: 'bg-sky-50 border-sky-200',
    numColor: 'text-[#0284C7]',
    borderColor: 'border-slate-200/90 hover:border-sky-300',
    bottomBorder: 'border-b-2 border-b-[#0284C7]',
    glowColor: 'from-sky-100/30 via-transparent to-transparent',
  },
  {
    num: '03',
    name: 'Creativity & Innovation',
    pillar: 'Design Synthesis',
    description: 'Transform original ideas into custom 3D CAD models, schematics, and functional prototypes.',
    tags: ['Custom 3D CAD', 'Working Prototypes'],
    gif: '/assets/values/val_icon_3_creativity.gif',
    numBg: 'bg-purple-50 border-purple-200',
    numColor: 'text-[#9333EA]',
    borderColor: 'border-slate-200/90 hover:border-purple-300',
    bottomBorder: 'border-b-2 border-b-[#9333EA]',
    glowColor: 'from-purple-100/30 via-transparent to-transparent',
  },
  {
    num: '04',
    name: 'Responsible Technology',
    pillar: 'Lab Safety & Ethics',
    description: 'Engineer technology grounded in strict safety compliance, user privacy, and ethical AI awareness.',
    tags: ['Lab Safety Rules', 'Ethical AI Design'],
    gif: '/assets/values/val_icon_4_responsible_tech.gif',
    numBg: 'bg-emerald-50 border-emerald-200',
    numColor: 'text-[#16A34A]',
    borderColor: 'border-slate-200/90 hover:border-emerald-300',
    bottomBorder: 'border-b-2 border-b-[#16A34A]',
    glowColor: 'from-emerald-100/30 via-transparent to-transparent',
  },
  {
    num: '05',
    name: 'Continuous Learning',
    pillar: 'Iterative Mastery',
    description: 'Foster lifelong curiosity and progressive skill growth through milestone portfolio defense.',
    tags: ['Skill Milestones', 'Lifelong Maker'],
    gif: '/assets/values/val_icon_5_continuous_learning.gif',
    numBg: 'bg-rose-50 border-rose-200',
    numColor: 'text-[#E11D48]',
    borderColor: 'border-slate-200/90 hover:border-rose-300',
    bottomBorder: 'border-b-2 border-b-[#E11D48]',
    glowColor: 'from-rose-100/30 via-transparent to-transparent',
  },
];

export const MissionSection: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const handleExplore = () => {
    window.dispatchEvent(new CustomEvent('go-to-slide', { detail: 4 }));
  };

  return (
    <ChapterShell
      id="mission"
      chapterNumber="04"
      theme="light"
      fullBleed={true}
      className="relative w-full min-h-[100svh] lg:h-[100svh] overflow-y-auto lg:overflow-hidden select-none bg-[#FAF8F5] flex flex-col lg:items-center lg:justify-center"
    >
      {/* Background ambient gentle wave curves */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-purple-100/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-100/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100/25 rounded-full blur-3xl pointer-events-none" />

      {/* Main Centered Container - Balanced Executive Proportions */}
      <div className="relative w-full h-auto lg:h-full min-h-0 flex-1 flex flex-col justify-between items-center pt-[calc(var(--header-h,64px)+10px)] pb-8 lg:pb-3 px-3 sm:px-5 lg:px-6 xl:px-8 box-border select-none z-10 max-w-[1440px] mx-auto overflow-visible lg:overflow-hidden">
        {/* Main Inset Grand White Card Container */}
        <div
          ref={contentRef}
          className="relative w-full h-auto lg:h-full flex-1 lg:my-auto max-h-none lg:max-h-[820px] xl:lg:max-h-[860px] bg-white shadow-[0_16px_50px_rgba(0,0,0,0.04)] border border-slate-200/80 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 lg:p-6 xl:p-7 flex flex-col justify-between gap-2.5 sm:gap-3.5 overflow-visible lg:overflow-hidden"
        >
          {/* Top Area: Eyebrow, Statement Headline & Narrative Copy */}
          <div className="flex-none text-center max-w-4xl mx-auto mb-1">
            {/* Eyebrow */}
            <div className="editorial-reveal flex items-center justify-center gap-2 mb-0.5">
              <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-r from-transparent to-[#b45309]" />
              <span className="font-mono text-[10.5px] sm:text-[11.5px] uppercase tracking-[0.24em] text-[#b45309] font-bold">
                {siteConfig.mission.eyebrow}
              </span>
              <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-l from-transparent to-[#b45309]" />
            </div>

            {/* Elegant Grand Headline */}
            <h2
              ref={headlineRef}
              className="editorial-reveal font-serif text-xl sm:text-2xl lg:text-[28px] xl:text-[32px] font-bold text-[#0F172A] tracking-tight leading-tight mb-1 text-center"
            >
              &ldquo;Connecting Concepts to Real-World Engineering&rdquo;
            </h2>

            {/* Narrative Body Copy (Centered) */}
            <p className="editorial-reveal font-sans text-[12.5px] sm:text-[13.5px] text-[#475569] leading-relaxed max-w-3xl mx-auto font-normal text-center">
              At MedhaArc Labs, we believe technology education moves beyond passive consumption into tangible engineering. From foundational logic to physical prototypes, our curriculum connects core mathematical reasoning with hands-on robotics, AI, drone, and autonomous flight.
            </p>
          </div>

          {/* Executive Engineering Philosophy Strip */}
          <div className="editorial-reveal my-0.5 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-50/70 via-[#FAF9F6] to-sky-50/70 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-left">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-amber-600 font-bold text-xs sm:text-sm shadow-2xs shrink-0">
                ⚡
              </span>
              <div>
                <span className="font-sans font-bold text-[13px] sm:text-[13.5px] text-[#0F172A] block leading-tight">
                  Tangible Engineering Over Passive Screen Time
                </span>
                <span className="font-sans text-[11.5px] sm:text-[12px] text-[#475569] leading-tight font-normal">
                  Every concept is validated on real microcontrollers, sensors, circuits, and autonomous robotic platforms.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[10.5px] text-[#0284C7] font-bold bg-sky-50 px-3 py-0.5 rounded-full border border-sky-200 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
              <span>Grade 3 to 12 Progressive Pathway</span>
            </div>
          </div>

          {/* Middle Area: 5 Premium Value Cards with 3D Animated Illustration GIFs */}
          <div className="editorial-reveal my-2 sm:my-3 flex-1 min-h-0 flex flex-col justify-stretch">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-3.5 xl:gap-4 items-stretch h-full flex-1 min-h-0">
              {MISSION_CARDS.map((val) => (
                <div
                  key={val.name}
                  className={`group relative flex flex-col justify-between p-3.5 sm:p-4 lg:p-4.5 bg-white border ${val.borderColor} ${val.bottomBorder} rounded-xl sm:rounded-2xl shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full overflow-hidden`}
                >
                  {/* Subtle Corner Glow */}
                  <div
                    className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${val.glowColor} blur-xl pointer-events-none`}
                  />

                  {/* Header Row: Top Number Pill & Pillar Badge */}
                  <div className="relative z-10 flex items-center justify-between gap-1.5 mb-1.5">
                    <span className={`font-mono text-[10px] sm:text-[10.5px] font-bold px-2 py-0.5 rounded-full border ${val.numBg} ${val.numColor}`}>
                      {val.num}
                    </span>
                    <span className="font-mono text-[8px] sm:text-[8.5px] font-bold uppercase tracking-wider text-slate-400 truncate">
                      {val.pillar}
                    </span>
                  </div>

                  {/* Center: 3D Animated GIF Illustration */}
                  <div className="relative z-10 my-auto py-2 flex items-center justify-center h-16 sm:h-20 lg:h-24 w-full">
                    <img
                      src={val.gif}
                      alt={val.name}
                      className="h-14 sm:h-16 lg:h-20 w-14 sm:w-16 lg:w-20 object-contain mx-auto group-hover:scale-108 transition-transform duration-300 drop-shadow-xs"
                      loading="eager"
                    />
                  </div>

                  {/* Title, Description & Action Tags */}
                  <div className="relative z-10 text-center mt-auto flex flex-col gap-1.5">
                    <h3 className="font-serif text-[15px] sm:text-[16px] lg:text-[17px] font-bold text-[#0F172A] leading-tight tracking-tight group-hover:text-[#EA580C] transition-colors">
                      {val.name}
                    </h3>
                    <p className="font-sans text-[11.5px] sm:text-[12px] text-[#475569] leading-snug font-normal">
                      {val.description}
                    </p>

                    {/* Concrete Skill Focus Tags */}
                    <div className="flex flex-wrap items-center justify-center gap-1 pt-2 border-t border-slate-100">
                      {val.tags.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[8px] sm:text-[8.5px] px-1.5 py-0.5 rounded bg-slate-50 text-slate-600 font-semibold border border-slate-200/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
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
              <span className="font-mono font-bold text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.1em] sm:tracking-[0.18em] text-[#0F172A] group-hover:text-[#b45309] transition-colors truncate">
                DISCOVER MORE ABOUT OUR CURRICULUM &amp; SPECIALISATIONS
              </span>
              <span className="w-5 h-5 rounded-full bg-orange-100/80 text-[#EA580C] flex items-center justify-center font-bold text-[10px] ml-2 transition-transform group-hover:translate-x-1 shadow-2xs shrink-0">
                <ArrowRight className="w-3 h-3 stroke-[2.5]" />
              </span>
            </button>

            <span className="font-mono text-[8.5px] sm:text-[9px] uppercase tracking-[0.2em] text-[#64748B] font-semibold">
              ACADEMIC ENGINEERING EXPERIENCE
            </span>
          </div>
        </div>
      </div>
    </ChapterShell>
  );
};

export default MissionSection;
