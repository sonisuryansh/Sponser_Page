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
    const dots = document.querySelectorAll<HTMLButtonElement>('.slide-progress-button');
    if (dots[5]) {
      dots[5].click();
    }
  };

  return (
    <ChapterShell
      id="approach"
      chapterNumber="05"
      theme="light"
      fullBleed={true}
      className="relative w-full h-[100svh] overflow-hidden bg-[#F1F1EF]"
    >
      {/* Background Section Image Visible on the Right 25% */}
      <div
        className="absolute top-0 right-0 w-full sm:w-[35%] lg:w-[28%] h-full z-0 overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <img
          src="/assets/students_robotics.webp"
          alt="Students engaged in hands-on robotics and technology learning"
          className="w-full h-full object-cover object-center filter saturate-[0.7] contrast-[1.05] brightness-[0.88]"
        />
        {/* Graded subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F1F1EF] via-transparent to-black/20" />
      </div>


      {/* Main Viewport Container */}
      <div className="relative w-full h-full flex flex-col justify-center items-start pt-[calc(var(--header-h,64px)+12px)] pb-6 px-3 sm:px-6 lg:px-12 box-border select-none z-10">
        
        {/* Main Inset White Panel */}
        <div className="relative w-full sm:w-[92%] lg:w-[76%] xl:w-[74%] h-full max-h-[760px] bg-[#FFFFFD] shadow-[0_15px_45px_rgba(0,0,0,0.05)] border border-black/5 flex flex-col justify-between p-5 sm:p-7 lg:p-9 box-border">
          
          {/* Top & Middle Content Area */}
          <div ref={contentRef} className="flex-1 flex flex-col justify-between overflow-hidden">
            
            {/* Main Editorial Body */}
            <div className="flex-1 flex items-stretch gap-6 sm:gap-8 lg:gap-10 overflow-hidden">
              {/* Central Text & Content Area */}
              <div className="flex-1 flex flex-col justify-between overflow-hidden">
                <div>
                  {/* Eyebrow & Chapter Indicator */}
                  <div className="editorial-reveal flex items-center gap-2.5 mb-2">
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#c8a45d]">
                      {siteConfig.approach.eyebrow}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#c8a45d]" />
                    <span className="font-mono text-[10px] text-[#888888] tracking-wider">
                      05 / 14
                    </span>
                  </div>

                  {/* Elegant Dark Headline */}
                  <h2
                    ref={headlineRef}
                    className="editorial-reveal font-serif text-xl sm:text-2xl lg:text-[31px] font-normal text-[#111111] tracking-tight leading-[1.16] mb-2.5"
                  >
                    {siteConfig.approach.headline}
                  </h2>

                  {/* Narrative Body Copy */}
                  <p className="editorial-reveal text-xs sm:text-[13px] text-[#555555] leading-[1.6] max-w-2xl mb-3.5 font-normal">
                    At MedhaArc Labs, our pedagogical approach bridges abstract principles with physical systems. Rather than passive computer screen consumption, students construct real functional hardware, test sensor circuits, and deploy code that directly influences the physical environment.
                  </p>
                </div>

                {/* 3 Pedagogical Steps */}
                <div className="editorial-reveal pt-2.5 border-t border-black/10">
                  <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#888888] mb-2 flex items-center justify-between">
                    <span>3-Step Experiential Flow</span>
                    <span className="text-[10px] text-black/40">Hands-on Engineering</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4">
                    {siteConfig.approach.blocks.map((block, idx) => (
                      <div
                        key={block.title}
                        className="group flex flex-col justify-between pt-1.5 pb-1 border-t border-black/15 hover:border-[#c8a45d] transition-colors"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-mono text-[10px] font-bold text-[#c8a45d]">
                              STEP 0{idx + 1}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#c8a45d]/60" />
                          </div>
                          <h3 className="font-sans text-[12.5px] font-bold text-[#111111] leading-tight group-hover:text-[#c8a45d] transition-colors mb-1">
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
                <div className="editorial-reveal pt-2.5 border-t border-black/10 mt-2.5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-[9.5px] uppercase tracking-wider text-black/40 font-semibold">
                      Core Learning Principles:
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {siteConfig.approach.principles.map((pr, idx) => (
                      <div
                        key={pr}
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#F9F9F8] border border-black/10 font-sans text-[10px] text-[#222222] hover:border-[#c8a45d]/40 transition-colors"
                      >
                        <span>{principleIcons[idx]}</span>
                        <span>{pr}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Trailing Link CTA */}
                <div className="editorial-reveal pt-3 mt-2.5 border-t border-black/10 flex items-center">
                  <button
                    onClick={handleExplore}
                    className="group flex items-center text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c8a45d] cursor-pointer w-full max-w-2xl"
                  >
                    <span className="font-sans font-bold text-[10.5px] sm:text-[11px] uppercase tracking-[0.22em] text-[#111111] group-hover:text-[#c8a45d] transition-colors shrink-0">
                      Discover more about our curriculum & progression
                    </span>
                    <span className="h-[1px] bg-black/20 group-hover:bg-[#c8a45d] transition-all flex-1 ml-4" />
                  </button>
                </div>
              </div>

              {/* Right Vertical Divider / Publication Track */}
              <div className="hidden lg:flex flex-col items-center justify-between py-2 text-[#cccccc] pl-2 shrink-0">
                <span className="text-[8px] leading-none select-none">▲</span>
                <div className="w-[1.5px] h-full bg-black/15 my-1" />
                <span className="text-[8px] leading-none select-none">▼</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ChapterShell>
  );
};

export default LearningApproachSection;
