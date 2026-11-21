import React, { useRef, useEffect } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { Layers, Lightbulb, Wrench, GitFork, Sigma, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';

const principleIcons = [
  <Layers key="1" className="w-3 h-3 text-[#C61122]" />,
  <Lightbulb key="2" className="w-3 h-3 text-[#C61122]" />,
  <Wrench key="3" className="w-3 h-3 text-[#C61122]" />,
  <GitFork key="4" className="w-3 h-3 text-[#C61122]" />,
  <Sigma key="5" className="w-3 h-3 text-[#C61122]" />,
  <ShieldCheck key="6" className="w-3 h-3 text-[#C61122]" />,
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
      {/* Background Section Image Visible on the Right 25% (Exact Image 1 Split State) */}
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

      {/* Decorative Bottom-Left Solid Red Accent Block (Exact Image 1 style) */}
      <div
        className="absolute bottom-0 left-0 w-20 sm:w-24 lg:w-28 h-14 sm:h-16 lg:h-18 bg-[#C61122] z-30 pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Viewport Container */}
      <div className="relative w-full h-full flex flex-col justify-center items-start pt-[calc(var(--header-h,64px)+12px)] pb-6 px-3 sm:px-6 lg:px-12 box-border select-none z-10">
        
        {/* Main Inset White Panel (Occupies ~74-78% width, exactly matching Image 1) */}
        <div className="relative w-full sm:w-[92%] lg:w-[76%] xl:w-[74%] h-full max-h-[760px] bg-[#FFFFFD] shadow-[0_15px_45px_rgba(0,0,0,0.05)] border border-black/5 flex flex-col justify-between p-5 sm:p-7 lg:p-9 box-border">
          
          {/* Top & Middle Content Area */}
          <div ref={contentRef} className="flex-1 flex flex-col justify-between overflow-hidden">
            
            {/* Grid: Boxed Vertical Counter + Main Editorial Body + Right Track */}
            <div className="flex-1 flex items-stretch gap-6 sm:gap-8 lg:gap-10 overflow-hidden">
              
              {/* Left Architectural Boxed Counter (Exact Image 1 style: 05/14) */}
              <div className="hidden sm:flex flex-col items-center justify-between border border-black/10 py-5 px-3 bg-white/60 shrink-0 w-16 lg:w-18 select-none">
                <span className="font-sans font-bold text-xl lg:text-[22px] text-[#afafaf] -rotate-90 tracking-widest my-8 block">
                  05/14
                </span>
                <div className="flex flex-col items-center gap-2 mb-2 text-[#cfcfcf]">
                  <span className="w-1 h-1 rounded-full bg-current" />
                  <span className="w-1 h-1 rounded-full bg-current" />
                  <span className="w-1 h-1 rounded-full bg-current" />
                  <span className="w-1 h-1 rounded-full bg-current" />
                  <span className="w-1 h-1 rounded-full bg-current" />
                </div>
              </div>

              {/* Central Text & Content Area (Aligns headline, body, steps, principles and CTA) */}
              <div className="flex-1 max-w-3xl flex flex-col justify-between overflow-hidden">
                <div>
                  {/* Eyebrow */}
                  <div className="editorial-reveal text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#111111] mb-2">
                    {siteConfig.approach.eyebrow}
                  </div>

                  {/* Big Crimson Red Headline (Exact Image 1 style) */}
                  <h2
                    ref={headlineRef}
                    className="editorial-reveal font-sans text-xl sm:text-2xl lg:text-[31px] font-bold text-[#C61122] tracking-tight leading-[1.16] mb-2.5"
                  >
                    {siteConfig.approach.headline}
                  </h2>

                  {/* Narrative Body Copy (Editorial narrative matching Image 1) */}
                  <p className="editorial-reveal text-xs sm:text-[13px] text-[#555555] leading-[1.6] max-w-2xl mb-3.5 font-normal">
                    At MedhaArc Labs, our pedagogical approach bridges abstract principles with physical systems. Rather than passive computer screen consumption, students construct real functional hardware, test sensor circuits, and deploy code that directly influences the physical environment.
                  </p>
                </div>

                {/* 3 Pedagogical Steps (Clean architectural columns replacing bulky cards) */}
                <div className="editorial-reveal pt-2.5 border-t border-black/10">
                  <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#888888] mb-2 flex items-center justify-between">
                    <span>3-Step Experiential Flow</span>
                    <span className="text-[10px] text-black/40">Hands-on Engineering</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4">
                    {siteConfig.approach.blocks.map((block, idx) => (
                      <div
                        key={block.title}
                        className="group flex flex-col justify-between pt-1.5 pb-1 border-t border-black/15 hover:border-[#C61122] transition-colors"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-mono text-[10px] font-bold text-[#C61122]">
                              STEP 0{idx + 1}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C61122]/60" />
                          </div>
                          <h3 className="font-sans text-[12.5px] font-bold text-[#111111] leading-tight group-hover:text-[#C61122] transition-colors mb-1">
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

                {/* Six Core Learning Principles (Refined Minimal Hairline Tags) */}
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
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#F9F9F8] border border-black/10 font-sans text-[10px] text-[#222222] hover:border-[#C61122]/40 transition-colors"
                      >
                        <span>{principleIcons[idx]}</span>
                        <span>{pr}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Trailing Link CTA (Aligned directly inside the text column) */}
                <div className="editorial-reveal pt-3 mt-2.5 border-t border-black/10 flex items-center">
                  <button
                    onClick={handleExplore}
                    className="group flex items-center text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-current cursor-pointer w-full max-w-2xl"
                  >
                    <span className="font-sans font-bold text-[10.5px] sm:text-[11px] uppercase tracking-[0.22em] text-[#111111] group-hover:text-[#C61122] transition-colors shrink-0">
                      Discover more about our curriculum & progression
                    </span>
                    <span className="h-[1px] bg-black/20 group-hover:bg-[#C61122] transition-all flex-1 ml-4" />
                  </button>
                </div>
              </div>

              {/* Right Vertical Divider / Publication Track (Exact Image 1 style) */}
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
