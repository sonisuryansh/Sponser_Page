import React, { useRef, useEffect } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { Hammer, Compass, Sparkles, ShieldCheck, RefreshCw, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

const valueIcons: Record<string, React.ReactNode> = {
  Hammer: <Hammer className="w-4 h-4 text-[#c8a45d]" />,
  Compass: <Compass className="w-4 h-4 text-[#c8a45d]" />,
  Sparkles: <Sparkles className="w-4 h-4 text-[#c8a45d]" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4 text-[#c8a45d]" />,
  RefreshCw: <RefreshCw className="w-4 h-4 text-[#c8a45d]" />,
};

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
      className="relative w-full h-[100svh] overflow-hidden bg-[#F1F1EF]"
    >
      <div className="relative w-full h-full flex flex-col justify-center items-center pt-[calc(var(--header-h,64px)+10px)] pb-5 px-3 sm:px-6 lg:px-8 box-border select-none">

        {/* Main Inset White Panel - Expanded to fill viewport with even distribution */}
        <div className="relative w-full h-full max-w-[1400px] bg-[#FFFFFD] shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-black/8 rounded-[4px] flex flex-col justify-between p-6 sm:p-9 lg:p-12 box-border z-10">

          {/* Main Content Area Evenly Distributed */}
          <div ref={contentRef} className="flex-1 flex flex-col justify-between h-full overflow-hidden">

            {/* Top Area: Eyebrow, Statement Headline & Narrative Copy */}
            <div className="flex-none">
              {/* Eyebrow & Chapter Indicator */}
              <div className="editorial-reveal flex items-center gap-2.5 mb-2.5">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#c8a45d]">
                  {siteConfig.mission.eyebrow}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#c8a45d]" />
                <span className="font-mono text-[11px] text-[#888888] tracking-wider">
                  03 / 14
                </span>
              </div>

              {/* Elegant Grand Headline */}
              <h2
                ref={headlineRef}
                className="editorial-reveal font-serif text-2xl sm:text-3xl lg:text-[40px] xl:text-[44px] font-normal text-[#111111] tracking-tight leading-[1.18] mb-3 max-w-5xl"
              >
                &ldquo;{siteConfig.mission.statement}&rdquo;
              </h2>

              {/* Narrative Body Copy */}
              <p className="editorial-reveal text-xs sm:text-sm lg:text-[14.5px] text-[#555555] leading-relaxed max-w-4xl font-normal">
                At MedhaArc Labs, we believe technology education moves beyond passive consumption into tangible engineering. From foundational logic to physical prototypes, our curriculum connects core mathematical reasoning with hands-on robotics, AI, data, and autonomous flight.
              </p>
            </div>

            {/* Middle Area: 5 Core Educational Pillars */}
            <div className="editorial-reveal my-auto py-4">
              <div className="text-[10.5px] uppercase tracking-[0.22em] font-mono text-[#888888] mb-3 flex items-center justify-between pb-2 border-b border-black/8">
                <span className="font-bold text-[#111111]">Core Educational Values</span>
                <span className="text-black/40">5 Pillars of Learning</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
                {siteConfig.mission.values.map((val, idx) => (
                  <div
                    key={val.name}
                    className="group relative flex flex-col justify-between p-4 sm:p-5 lg:p-5.5 bg-[#FAF9F6] border border-black/8 rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-[#c8a45d] hover:shadow-[0_8px_30px_rgba(200,164,93,0.08)] transition-all duration-300"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-black/5">
                        <div className="w-7 h-7 flex items-center justify-center rounded-[2px] bg-white border border-black/8">
                          {valueIcons[val.icon] || <Sparkles className="w-3.5 h-3.5 text-[#c8a45d]" />}
                        </div>
                        <span className="font-mono text-xs font-bold text-[#c8a45d]">
                          0{idx + 1}
                        </span>
                      </div>
                      <h3 className="font-serif text-base sm:text-lg font-medium text-[#111111] leading-snug group-hover:text-[#c8a45d] transition-colors mb-2">
                        {val.name}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-[12.5px] text-[#666666] leading-relaxed mt-auto pt-2">
                      {val.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Area: Trailing Link CTA */}
            <div className="editorial-reveal flex-none pt-4 border-t border-black/8 flex items-center justify-between">
              <button
                onClick={handleExplore}
                className="group flex items-center text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c8a45d] cursor-pointer"
              >
                <span className="font-sans font-bold text-[10.5px] sm:text-[11.5px] uppercase tracking-[0.22em] text-[#111111] group-hover:text-[#c8a45d] transition-colors shrink-0">
                  Discover more about our curriculum & specialisations
                </span>
                <span className="h-[1px] bg-black/20 group-hover:bg-[#c8a45d] transition-all w-12 sm:w-20 ml-3" />
                <ArrowRight className="w-3.5 h-3.5 text-[#111111] group-hover:text-[#c8a45d] transition-colors ml-1.5" />
              </button>
              <span className="hidden md:inline-block font-mono text-[10.5px] uppercase tracking-wider text-[#888888]">
                Academic Engineering Excellence
              </span>
            </div>

          </div>
        </div>
      </div>
    </ChapterShell>
  );
};

export default MissionSection;
