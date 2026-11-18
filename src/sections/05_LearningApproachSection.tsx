import React, { useRef, useEffect, useState } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { Layers, Lightbulb, Wrench, GitFork, Sigma, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const principleIcons = [
  <Layers key="1" className="w-3.5 h-3.5" />,
  <Lightbulb key="2" className="w-3.5 h-3.5" />,
  <Wrench key="3" className="w-3.5 h-3.5" />,
  <GitFork key="4" className="w-3.5 h-3.5" />,
  <Sigma key="5" className="w-3.5 h-3.5" />,
  <ShieldCheck key="6" className="w-3.5 h-3.5" />,
];

export const LearningApproachSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<HTMLDivElement>(null);
  const iconRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // Failsafe: force visibility
    const failsafe = setTimeout(() => {
      const blocks = el.querySelectorAll<HTMLElement>('.approach-block');
      blocks.forEach((b) => {
        b.style.opacity = '1';
        b.style.transform = 'none';
      });
      if (iconRowRef.current) iconRowRef.current.style.opacity = '1';
    }, 2500);

    if (prefersReducedMotion || isMobile || !document.documentElement.classList.contains('js-motion')) {
      return () => clearTimeout(failsafe);
    }

    const blocks = el.querySelectorAll<HTMLElement>('.approach-block');

    const ctx = gsap.context(() => {
      // Scrub timeline across the 3 blocks
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '+=150%',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const step = Math.min(2, Math.floor(self.progress * 3));
            setActiveStep(step);
          },
        },
      });

      // Step 1: block 0 active, others dim
      tl.to(blocks[0], { scale: 1.02, opacity: 1, duration: 0.5 })
        .to([blocks[1], blocks[2]], { opacity: 0.45, scale: 0.98, duration: 0.5 }, '<');

      // Step 2: block 1 active
      tl.to(blocks[1], { scale: 1.02, opacity: 1, duration: 0.5 })
        .to([blocks[0], blocks[2]], { opacity: 0.45, scale: 0.98, duration: 0.5 }, '<');

      // Step 3: block 2 active + icon row fade-in
      tl.to(blocks[2], { scale: 1.02, opacity: 1, duration: 0.5 })
        .to([blocks[0], blocks[1]], { opacity: 0.45, scale: 0.98, duration: 0.5 }, '<')
        .fromTo(
          iconRowRef.current,
          { opacity: 0.3, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          '<'
        );
    });

    return () => {
      clearTimeout(failsafe);
      ctx.revert();
    };
  }, []);

  return (
    <ChapterShell id="approach" chapterNumber="05" theme="light">
      <div ref={containerRef} className="w-full flex-1 flex flex-col justify-between py-2">
        {/* Eyebrow & Statement Headline */}
        <div className="mb-4 max-w-4xl">
          <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-1.5">
            {siteConfig.approach.eyebrow}
          </div>
          <h2 className="font-serif text-[clamp(26px,3.5vw,48px)] font-normal leading-[1.15] tracking-tight text-[#111111]">
            {siteConfig.approach.headline}
          </h2>
        </div>

        {/* Three Large Blocks (Step focus scrubbed) */}
        <div
          ref={blocksRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 border-t border-black/10 pt-5 my-auto"
        >
          {siteConfig.approach.blocks.map((blk, idx) => {
            const isFocused = activeStep === idx;
            return (
              <div
                key={blk.title}
                className={`approach-block p-6 rounded-[2px] transition-all duration-300 border flex flex-col justify-between h-[220px] md:h-[240px] ${
                  isFocused
                    ? 'bg-[#ffffff] border-black/30 shadow-md ring-1 ring-black/10'
                    : 'bg-[#fafafa] border-black/10 opacity-70'
                }`}
              >
                <div>
                  <span className="text-xs uppercase tracking-[0.18em] text-[#5b5b5b] font-mono">
                    Principle 0{idx + 1}
                  </span>
                  <h3 className="font-serif text-2xl font-medium tracking-tight mt-2 mb-3 text-[#111111]">
                    {blk.title}
                  </h3>
                </div>
                <p className="text-[16px] leading-[1.55] text-[#5b5b5b] font-normal">
                  {blk.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Small Icon Row: 6 Principles */}
        <div ref={iconRowRef} className="border-t border-black/10 pt-4 mt-2">
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#5b5b5b] mb-3 font-mono">
            Methodological Tenets
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {siteConfig.approach.principles.map((pr, idx) => (
              <div
                key={pr}
                className="flex items-center gap-2 p-2 bg-[#fafafa] border border-black/5 rounded-[2px]"
              >
                <div className="w-6 h-6 flex items-center justify-center border border-black/10 rounded-[2px] text-[#111111] bg-white shrink-0">
                  {principleIcons[idx]}
                </div>
                <span className="text-xs text-[#111111] font-normal leading-tight">
                  {pr}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ChapterShell>
  );
};
