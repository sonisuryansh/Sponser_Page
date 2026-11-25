import React, { useRef, useEffect } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { Puzzle, Target, Lightbulb, Leaf, RefreshCw, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

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
    description: 'Learn by doing.',
    icon: <Puzzle className="w-5 h-5 text-[#EA580C]" />,
    iconBg: 'bg-orange-50 border-orange-200/80',
    numColor: 'text-[#EA580C]',
    borderColor: 'border-orange-100 hover:border-[#EA580C]/80',
    waveColor: 'from-orange-100/40 via-orange-50/20 to-transparent',
  },
  {
    num: '02',
    name: 'Problem-Solving',
    description: 'Understand a challenge and create practical solutions.',
    icon: <Target className="w-5 h-5 text-[#0284C7]" />,
    iconBg: 'bg-sky-50 border-sky-200/80',
    numColor: 'text-[#0284C7]',
    borderColor: 'border-sky-100 hover:border-[#0284C7]/80',
    waveColor: 'from-sky-100/40 via-sky-50/20 to-transparent',
  },
  {
    num: '03',
    name: 'Creativity & Innovation',
    description: 'Turn ideas into designs and prototypes.',
    icon: <Lightbulb className="w-5 h-5 text-[#9333EA]" />,
    iconBg: 'bg-purple-50 border-purple-200/80',
    numColor: 'text-[#9333EA]',
    borderColor: 'border-purple-100 hover:border-[#9333EA]/80',
    waveColor: 'from-purple-100/40 via-purple-50/20 to-transparent',
  },
  {
    num: '04',
    name: 'Responsible Technology',
    description: 'Consider safety, ethics, and real-world impact.',
    icon: <Leaf className="w-5 h-5 text-[#16A34A]" />,
    iconBg: 'bg-emerald-50 border-emerald-200/80',
    numColor: 'text-[#16A34A]',
    borderColor: 'border-emerald-100 hover:border-[#16A34A]/80',
    waveColor: 'from-emerald-100/40 via-emerald-50/20 to-transparent',
  },
  {
    num: '05',
    name: 'Continuous Learning',
    description: 'Experiment, reflect, and improve.',
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

      {/* Main Centered Container */}
      <div className="relative w-full my-0 sm:my-auto flex flex-col justify-start sm:justify-center items-center pt-[calc(var(--header-h,64px)+10px)] pb-20 sm:pb-8 lg:py-8 px-3 sm:px-6 lg:px-8 xl:px-12 box-border select-none z-10 max-w-[1340px] mx-auto">
        {/* Main Inset Grand White Card Container */}
        <div
          ref={contentRef}
          className="relative w-full bg-white shadow-[0_16px_50px_rgba(0,0,0,0.04)] border border-slate-200/80 rounded-3xl sm:rounded-[32px] p-6 sm:p-8 lg:p-9 xl:p-10 flex flex-col justify-between"
        >
          {/* Top Area: Eyebrow, Statement Headline & Narrative Copy */}
          <div className="flex-none text-center max-w-4xl mx-auto mb-4 sm:mb-5">
            {/* Eyebrow */}
            <div className="editorial-reveal flex items-center justify-center gap-3 mb-1.5 sm:mb-2">
              <span className="h-[1px] w-6 sm:w-10 bg-[#b45309]/50" />
              <span className="font-mono text-[10.5px] sm:text-xs uppercase tracking-[0.24em] text-[#b45309] font-bold">
                {siteConfig.mission.eyebrow}
              </span>
              <span className="h-[1px] w-6 sm:w-10 bg-[#b45309]/50" />
            </div>

            {/* Elegant Grand Headline */}
            <h2
              ref={headlineRef}
              className="editorial-reveal font-serif text-[28px] sm:text-3xl lg:text-[38px] xl:text-[42px] font-bold text-[#0F172A] tracking-tight leading-tight mb-2 sm:mb-2.5 text-center"
            >
              &ldquo;Connecting Concepts to Real-World Engineering&rdquo;
            </h2>

            {/* Narrative Body Copy (Centered) */}
            <p className="editorial-reveal font-sans text-xs sm:text-[13px] text-[#475569] leading-relaxed max-w-3xl mx-auto font-normal text-center">
              At MedhaArc Labs, we believe technology education moves beyond passive consumption into tangible engineering. From foundational logic to physical prototypes, our curriculum connects core mathematical reasoning with hands-on robotics, AI, drone, and autonomous flight.
            </p>
          </div>

          {/* Subheader Row Above 5 Cards */}
          <div className="editorial-reveal my-1 flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="font-mono text-[10.5px] sm:text-[11px] uppercase tracking-[0.22em] text-[#0F172A] font-bold">
              CORE EDUCATIONAL VALUES
            </span>
            <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[10.5px] uppercase tracking-wider text-[#7C3AED] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
              <span>5 PILLARS OF EDUCATION</span>
            </div>
          </div>

          {/* Middle Area: 5 Colorful Educational Value Cards */}
          <div className="editorial-reveal my-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 xl:gap-4">
              {MISSION_CARDS.map((val) => (
                <div
                  key={val.name}
                  className={`group relative flex flex-col justify-between p-4 sm:p-5 bg-white border ${val.borderColor} rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 min-h-[165px] sm:min-h-[180px] overflow-hidden`}
                >
                  {/* Subtle Pastel Bottom-Right Corner Wave Gradient */}
                  <div
                    className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-tl ${val.waveColor} blur-xl pointer-events-none`}
                  />
                  <div
                    className={`absolute bottom-0 right-0 w-16 h-10 bg-gradient-to-tl ${val.waveColor} rounded-tl-3xl pointer-events-none opacity-70`}
                  />

                  {/* Card Content */}
                  <div className="relative z-10">
                    {/* Header Row: Icon and Number */}
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-10 h-10 rounded-xl ${val.iconBg} border shadow-2xs flex items-center justify-center shrink-0`}
                      >
                        {val.icon}
                      </div>
                      <span className={`font-mono text-xs sm:text-[13px] font-bold ${val.numColor}`}>
                        {val.num}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-[16px] sm:text-[17px] font-bold text-[#0F172A] leading-snug tracking-tight mb-2 group-hover:text-[#b45309] transition-colors">
                      {val.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="relative z-10 font-sans text-[11.5px] sm:text-[12px] text-[#475569] leading-relaxed mt-auto">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Area: Trailing Link CTA */}
          <div className="editorial-reveal flex-none pt-3 sm:pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleExplore}
              className="group flex items-center text-left focus:outline-none cursor-pointer"
            >
              <span className="font-mono font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#0F172A] group-hover:text-[#b45309] transition-colors shrink-0">
                DISCOVER MORE ABOUT OUR CURRICULUM &amp; SPECIALISATIONS
              </span>
              <span className="w-7 h-7 rounded-full bg-orange-100/80 text-[#EA580C] flex items-center justify-center font-bold text-xs ml-3 transition-transform group-hover:translate-x-1 shadow-2xs shrink-0">
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
            </button>

            <span className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.2em] text-[#64748B] font-semibold">
              ACADEMIC ENGINEERING EXPERIENCE
            </span>
          </div>
        </div>
      </div>
    </ChapterShell>
  );
};

export default MissionSection;
