import React, { useRef, useEffect } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { Layers, Lightbulb, Wrench, GitFork, Sigma, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';

const principleIcons = [
  <Layers key="1" className="w-3 h-3 text-[#c8a45d]" />,
  <Lightbulb key="2" className="w-3 h-3 text-[#c8a45d]" />,
  <Wrench key="3" className="w-3 h-3 text-[#c8a45d]" />,
  <GitFork key="4" className="w-3 h-3 text-[#c8a45d]" />,
  <Sigma key="5" className="w-3 h-3 text-[#c8a45d]" />,
  <ShieldCheck key="6" className="w-3 h-3 text-[#c8a45d]" />,
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
    window.dispatchEvent(new CustomEvent('go-to-slide', { detail: 5 }));
  };

  return (
    <ChapterShell
      id="approach"
      chapterNumber="05"
      theme="light"
      fullBleed={true}
      className="relative w-full h-[100svh] overflow-hidden bg-[#FAF6EE] select-none"
    >
      {/* Main Viewport Container - Standardized 1240px & Centered */}
      <div className="relative w-full h-full min-h-full flex-1 flex flex-col justify-center items-center pt-[calc(var(--header-h,64px)+8px)] pb-6 px-4 sm:px-6 lg:px-8 box-border select-none z-10 max-w-[1240px] mx-auto">
        
        {/* Main Inset White Panel - Centered Unified Card framing Content & Instructor Photo */}
        <div className="relative w-full my-auto max-w-[1240px] bg-[#FFFFFD] shadow-[0_16px_50px_rgba(0,0,0,0.06)] border border-black/8 rounded-[4px] flex flex-col lg:flex-row items-stretch overflow-hidden box-border">
          
          {/* Left Content Area */}
          <div ref={contentRef} className="flex-1 flex flex-col justify-between p-5 sm:p-6 lg:p-7 gap-3 sm:gap-3.5">
            <div>
              {/* Eyebrow */}
              <div className="editorial-reveal flex items-center gap-2.5 mb-1.5">
                <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#c8a45d]">
                  {siteConfig.approach.eyebrow}
                </span>
              </div>

              {/* Elegant Dark Headline */}
              <h2
                ref={headlineRef}
                className="editorial-reveal font-serif text-xl sm:text-2xl lg:text-[28px] font-normal text-[#111111] tracking-tight leading-[1.2] mb-2"
              >
                {siteConfig.approach.headline}
              </h2>

              {/* Narrative Body Copy */}
              <p className="editorial-reveal text-xs sm:text-[12.5px] text-[#555555] leading-[1.6] font-normal mb-3">
                At MedhaArc Labs, our pedagogical approach bridges abstract principles with physical systems. Rather than passive computer screen consumption, students construct real functional hardware, test sensor circuits, and deploy code that directly influences the physical environment.
              </p>
            </div>

            {/* 3 Pedagogical Steps */}
            <div className="editorial-reveal pt-2.5 border-t border-black/10">
              <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#888888] mb-2 flex items-center justify-between">
                <span>3-Step Experiential Flow</span>
                <span className="text-[10px] text-black/40">Hands-on Engineering</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {siteConfig.approach.blocks.map((block, idx) => (
                  <div
                    key={block.title}
                    className="group flex flex-col justify-between p-2.5 bg-[#FAF9F6] border border-black/8 rounded-[3px] hover:border-[#c8a45d] transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[10px] font-bold text-[#c8a45d]">
                          STEP 0{idx + 1}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c8a45d]/60" />
                      </div>
                      <h3 className="font-sans text-[12px] font-bold text-[#111111] leading-tight group-hover:text-[#c8a45d] transition-colors mb-1">
                        {block.title}
                      </h3>
                    </div>
                    <p className="text-[11px] text-[#666666] leading-relaxed">
                      {block.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Six Core Learning Principles */}
            <div className="editorial-reveal pt-2 border-t border-black/10">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-[9.5px] uppercase tracking-wider text-black/40 font-semibold">
                  Core Learning Principles:
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {siteConfig.approach.principles.map((pr, idx) => (
                  <div
                    key={pr}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F9F9F8] border border-black/10 font-sans text-[10px] sm:text-[10.5px] text-[#222222] hover:border-[#c8a45d]/40 transition-colors"
                  >
                    <span>{principleIcons[idx]}</span>
                    <span>{pr}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Trailing Link CTA */}
            <div className="editorial-reveal pt-2 border-t border-black/10 flex items-center">
              <button
                onClick={handleExplore}
                className="group flex items-center text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c8a45d] cursor-pointer w-full max-w-2xl"
              >
                <span className="font-sans font-bold text-[10px] sm:text-[10.5px] uppercase tracking-[0.22em] text-[#111111] group-hover:text-[#c8a45d] transition-colors shrink-0">
                  Discover more about our curriculum & progression
                </span>
                <span className="h-[1px] bg-black/20 group-hover:bg-[#c8a45d] transition-all flex-1 ml-4" />
              </button>
            </div>
          </div>

          {/* Right Image Frame - Integrated into the unified centered card */}
          <div className="hidden lg:block w-[360px] xl:w-[410px] shrink-0 relative bg-black/5 border-l border-black/8 overflow-hidden group">
            <img
              src="/assets/instructor_guided_learning.webp"
              alt="Instructor guiding students through practical engineering and technology learning"
              className="w-full h-full object-cover object-center filter saturate-[0.88] contrast-[1.04] group-hover:scale-103 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            
            {/* Bottom Photo Overlay */}
            <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
              <span className="font-mono text-[9px] uppercase tracking-wider block opacity-80 text-[#c8a45d] font-bold">
                Instructor-Guided Session
              </span>
              <span className="font-serif text-[13px] font-medium leading-tight text-white/95 block">
                Practical Learning &amp; Faculty Mentorship
              </span>
            </div>
          </div>

        </div>
      </div>
    </ChapterShell>
  );
};

export default LearningApproachSection;
