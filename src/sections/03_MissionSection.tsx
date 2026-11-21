import React, { useRef, useEffect } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import gsap from 'gsap';

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
    const dots = document.querySelectorAll<HTMLButtonElement>('.slide-progress-button');
    if (dots[3]) {
      dots[3].click();
    }
  };

  return (
    <ChapterShell
      id="mission"
      chapterNumber="03"
      theme="light"
      fullBleed={true}
      className="relative w-full h-[100svh] overflow-hidden bg-[#F1F1EF]"
    >
      {/* Decorative Bottom-Left Solid Red Accent Block (Exact Image 1 style) */}
      <div
        className="absolute bottom-0 left-0 w-20 sm:w-28 lg:w-32 h-16 sm:h-20 lg:h-24 bg-[#C61122] z-30 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative w-full h-full flex flex-col justify-center items-center pt-[calc(var(--header-h,64px)+12px)] pb-6 px-3 sm:px-6 lg:px-12 box-border select-none">
        
        {/* Main Inset White Panel (Exact match to Image 1) */}
        <div className="relative w-full h-full max-h-[760px] max-w-[1340px] bg-[#FFFFFD] shadow-[0_15px_45px_rgba(0,0,0,0.05)] border border-black/5 flex flex-col justify-between p-5 sm:p-7 lg:p-9 box-border z-10">
          
          {/* Top & Middle Content Area */}
          <div ref={contentRef} className="flex-1 flex flex-col justify-between overflow-hidden">
            
            {/* Upper Grid: Counter Box + Main Content */}
            <div className="flex items-stretch gap-6 sm:gap-8 lg:gap-10">
              
              {/* Left Architectural Boxed Counter (Image 1 style) */}
              <div className="hidden sm:flex flex-col items-center justify-between border border-black/10 py-5 px-3 bg-white/60 shrink-0 w-16 lg:w-18 select-none">
                <span className="font-sans font-bold text-xl lg:text-[22px] text-[#afafaf] -rotate-90 tracking-widest my-8 block">
                  03/14
                </span>
                <div className="flex flex-col items-center gap-2 mb-2 text-[#cfcfcf]">
                  <span className="w-1 h-1 rounded-full bg-current" />
                  <span className="w-1 h-1 rounded-full bg-current" />
                  <span className="w-1 h-1 rounded-full bg-current" />
                  <span className="w-1 h-1 rounded-full bg-current" />
                  <span className="w-1 h-1 rounded-full bg-current" />
                </div>
              </div>

              {/* Central Text & Content Area */}
              <div className="flex-1 max-w-4xl flex flex-col justify-between">
                <div>
                  {/* Eyebrow */}
                  <div className="editorial-reveal text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#111111] mb-2">
                    {siteConfig.mission.eyebrow}
                  </div>

                  {/* Big Crimson Red Headline (Image 1 style) */}
                  <h2
                    ref={headlineRef}
                    className="editorial-reveal font-sans text-xl sm:text-2xl lg:text-[32px] font-bold text-[#C61122] tracking-tight leading-[1.16] mb-3"
                  >
                    {siteConfig.mission.statement}
                  </h2>

                  {/* Narrative Body Copy (Image 1 style) */}
                  <p className="editorial-reveal text-xs sm:text-[13px] text-[#555555] leading-[1.6] max-w-3xl mb-4 font-normal">
                    At MedhaArc Labs, we believe technology education moves beyond passive consumption into tangible engineering. From foundational logic to physical prototypes, our curriculum connects core mathematical reasoning with hands-on robotics, AI, data, and autonomous flight.
                  </p>
                </div>

                {/* 5 Educational Pillars (Refined minimal architectural layout) */}
                <div className="editorial-reveal pt-3 border-t border-black/10 mt-auto">
                  <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#888888] mb-2 flex items-center justify-between">
                    <span>Core Educational Values</span>
                    <span className="text-[10px] text-black/40">5 Pillars of Learning</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 lg:gap-3.5">
                    {siteConfig.mission.values.map((val, idx) => (
                      <div
                        key={val.name}
                        className="group flex flex-col justify-between pt-1 pb-0.5 border-t border-black/15 hover:border-[#C61122] transition-colors"
                      >
                        <div>
                          <span className="font-mono text-[10px] font-bold text-[#C61122] block mb-0.5">
                            0{idx + 1}
                          </span>
                          <h3 className="font-sans text-[12px] font-bold text-[#111111] leading-tight group-hover:text-[#C61122] transition-colors mb-0.5">
                            {val.name}
                          </h3>
                        </div>
                        <p className="text-[10.5px] text-[#666666] leading-relaxed line-clamp-3">
                          {val.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Vertical Divider / Track Line (Exact Image 1 style) */}
              <div className="hidden lg:flex flex-col items-center justify-between py-2 text-[#cccccc] pl-4">
                <span className="text-[8px] leading-none select-none">▲</span>
                <div className="w-[1.5px] h-full bg-black/15 my-1" />
                <span className="text-[8px] leading-none select-none">▼</span>
              </div>
            </div>

            {/* Bottom Trailing Link CTA (Exact Image 1 style) */}
            <div className="editorial-reveal pt-4 mt-3 border-t border-black/5 flex items-center">
              <button
                onClick={handleExplore}
                className="group flex items-center text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-current cursor-pointer w-full max-w-3xl"
              >
                <span className="font-sans font-bold text-[10.5px] sm:text-[11px] uppercase tracking-[0.22em] text-[#111111] group-hover:text-[#C61122] transition-colors shrink-0">
                  Discover more about our curriculum & specialisations
                </span>
                <span className="h-[1px] bg-black/20 group-hover:bg-[#C61122] transition-all flex-1 ml-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </ChapterShell>
  );
};

export default MissionSection;
