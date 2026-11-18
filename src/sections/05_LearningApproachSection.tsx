import React, { useRef, useEffect, useState } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { Layers, Lightbulb, Wrench, GitFork, Sigma, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';

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

  // Listen to step navigation events (wheel scroll & arrow keys)
  useEffect(() => {
    const handleStep = (e: Event) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top >= -window.innerHeight * 0.5 && rect.bottom <= window.innerHeight * 1.5;
      if (!isVisible) return;

      const customEvent = e as CustomEvent<{ direction: number }>;
      const dir = customEvent.detail?.direction || 1;

      if (dir > 0 && activeStep < 2) {
        e.preventDefault();
        setActiveStep((s) => s + 1);
      } else if (dir < 0 && activeStep > 0) {
        e.preventDefault();
        setActiveStep((s) => s - 1);
      }
    };

    window.addEventListener('medhaarc:step', handleStep);
    return () => window.removeEventListener('medhaarc:step', handleStep);
  }, [activeStep]);

  // Animate blocks when activeStep changes
  useEffect(() => {
    const el = blocksRef.current;
    if (!el) return;

    const blocks = el.querySelectorAll<HTMLElement>('.approach-block');
    blocks.forEach((block, idx) => {
      const isActive = idx === activeStep;
      gsap.to(block, {
        scale: isActive ? 1.02 : 0.98,
        opacity: isActive ? 1 : 0.45,
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    if (iconRowRef.current) {
      gsap.to(iconRowRef.current, {
        opacity: activeStep === 2 ? 1 : 0.4,
        y: activeStep === 2 ? 0 : 8,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  }, [activeStep]);

  return (
    <ChapterShell id="approach" chapterNumber="05" theme="light" steps={3}>
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

        {/* 3 Interactive Horizontal Staggered Blocks */}
        <div ref={blocksRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto">
          {siteConfig.approach.blocks.map((block, idx) => {
            const isActive = idx === activeStep;
            return (
              <div
                key={block.title}
                onClick={() => setActiveStep(idx)}
                className={`approach-block p-5 sm:p-6 rounded-[2px] border transition-all cursor-pointer select-none ${
                  isActive
                    ? 'border-[#c8a45d] bg-white shadow-lg ring-1 ring-[#c8a45d]/20'
                    : 'border-black/10 bg-black/[0.015] hover:border-black/25'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`font-mono text-xs tracking-wider font-semibold ${
                      isActive ? 'text-[#c8a45d]' : 'text-black/40'
                    }`}
                  >
                    STEP 0{idx + 1}
                  </span>
                  <div
                    className={`w-2 h-2 rounded-full transition-all ${
                      isActive ? 'bg-[#c8a45d] scale-125' : 'bg-black/20'
                    }`}
                  />
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#111111] mb-2 leading-snug">
                  {block.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5b5b5b] font-sans leading-relaxed">
                  {block.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Six Engineering Principles Badge Row */}
        <div
          ref={iconRowRef}
          className="border-t border-black/10 pt-3 mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#5b5b5b] transition-all"
        >
          <span className="font-mono text-[11px] uppercase tracking-wider text-black/50">
            Core Learning Principles:
          </span>
          <div className="flex flex-wrap gap-2">
            {siteConfig.approach.principles.map((pr, idx) => (
              <div
                key={pr}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] bg-black/[0.03] border border-black/10 font-sans text-[11px] text-[#111111]"
              >
                <span className="text-[#c8a45d]">{principleIcons[idx]}</span>
                <span>{pr}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ChapterShell>
  );
};
