import React, { useRef, useEffect } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { Layers, Lightbulb, Wrench, GitFork, Sigma, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const principleIcons = [
  <Layers key="1" className="w-3.5 h-3.5 text-cyan-600" />,
  <Lightbulb key="2" className="w-3.5 h-3.5 text-amber-600" />,
  <Wrench key="3" className="w-3.5 h-3.5 text-blue-600" />,
  <GitFork key="4" className="w-3.5 h-3.5 text-purple-600" />,
  <Sigma key="5" className="w-3.5 h-3.5 text-emerald-600" />,
  <ShieldCheck key="6" className="w-3.5 h-3.5 text-rose-600" />,
];

const stepStyles = [
  {
    badge: 'text-amber-700 bg-amber-50 border-amber-300',
    dot: 'bg-amber-500',
    card: 'border-amber-500/25 bg-gradient-to-b from-amber-50/25 to-white hover:border-amber-500/60 hover:shadow-md',
  },
  {
    badge: 'text-cyan-700 bg-cyan-50 border-cyan-300',
    dot: 'bg-cyan-500',
    card: 'border-cyan-500/25 bg-gradient-to-b from-cyan-50/25 to-white hover:border-cyan-500/60 hover:shadow-md',
  },
  {
    badge: 'text-purple-700 bg-purple-50 border-purple-300',
    dot: 'bg-purple-500',
    card: 'border-purple-500/25 bg-gradient-to-b from-purple-50/25 to-white hover:border-purple-500/60 hover:shadow-md',
  },
];

export const LearningApproachSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<HTMLDivElement>(null);

  // Staggered reveal animation on scroll
  useEffect(() => {
    const el = blocksRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const blocks = el.querySelectorAll<HTMLElement>('.approach-block');

    const failsafe = setTimeout(() => {
      blocks.forEach((b) => {
        b.style.opacity = '1';
        b.style.transform = 'none';
      });
    }, 2500);

    if (prefersReducedMotion || isMobile || !document.documentElement.classList.contains('js-motion')) {
      blocks.forEach((b) => {
        b.style.opacity = '1';
        b.style.transform = 'none';
      });
      return () => clearTimeout(failsafe);
    }

    const tween = gsap.fromTo(
      blocks,
      { y: 24, opacity: 0.15 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
        immediateRender: false,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      }
    );

    return () => {
      clearTimeout(failsafe);
      tween.scrollTrigger?.kill();
      tween.kill();
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

        {/* 3 Balanced Pedagogical Step Cards - All Clear and Equally Accessible */}
        <div ref={blocksRef} className="grid grid-cols-1 md:grid-cols-3 gap-5 my-auto">
          {siteConfig.approach.blocks.map((block, idx) => {
            const style = stepStyles[idx] || stepStyles[0];

            return (
              <div
                key={block.title}
                className={`approach-block p-6 rounded-[3px] border transition-all duration-300 hover:-translate-y-1 select-none shadow-xs ${style.card}`}
              >
                <div className="flex items-center justify-between mb-3.5">
                  <span
                    className={`font-mono text-xs tracking-wider px-2.5 py-0.5 rounded-[2px] border font-semibold ${style.badge}`}
                  >
                    STEP 0{idx + 1}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${style.dot}`} />
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#111111] mb-2.5 leading-snug">
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
        <div className="border-t border-black/10 pt-3.5 mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#5b5b5b]">
          <span className="font-mono text-[11px] uppercase tracking-wider text-black/50">
            Core Learning Principles:
          </span>
          <div className="flex flex-wrap gap-2">
            {siteConfig.approach.principles.map((pr, idx) => (
              <div
                key={pr}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] bg-white border border-black/10 font-sans text-[11px] text-[#111111] shadow-xs"
              >
                <span>{principleIcons[idx]}</span>
                <span>{pr}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ChapterShell>
  );
};
