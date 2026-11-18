import React, { useRef, useEffect } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { Wrench, Box, Award, Trophy, FolderKanban } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const benefitIcons: Record<string, React.ReactNode> = {
  Wrench: <Wrench className="w-5 h-5" />,
  Box: <Box className="w-5 h-5" />,
  Award: <Award className="w-5 h-5" />,
  Trophy: <Trophy className="w-5 h-5" />,
  FolderKanban: <FolderKanban className="w-5 h-5" />,
};

export const BenefitsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const cards = el.querySelectorAll<HTMLElement>('.benefit-card');

    // Failsafe: force visibility
    const failsafe = setTimeout(() => {
      cards.forEach((c) => {
        c.style.opacity = '1';
        c.style.transform = 'none';
      });
    }, 2500);

    if (prefersReducedMotion || isMobile || !document.documentElement.classList.contains('js-motion')) {
      cards.forEach((c) => {
        c.style.opacity = '1';
        c.style.transform = 'none';
      });
      return () => clearTimeout(failsafe);
    }

    const tween = gsap.fromTo(
      cards,
      { y: 35, opacity: 0.15 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
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
    <ChapterShell id="benefits" chapterNumber="11" theme="dark">
      <div ref={containerRef} className="w-full flex-1 flex flex-col justify-between py-2 select-none">
        {/* Eyebrow & Headline */}
        <div className="mb-3 max-w-3xl">
          <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-1">
            {siteConfig.benefits.eyebrow}
          </div>
          <h2 className="font-serif text-[clamp(26px,3.5vw,46px)] font-normal leading-[1.14] tracking-tight text-white mb-1">
            {siteConfig.benefits.headline}
          </h2>
          <p className="text-base md:text-lg text-white/70 font-serif italic">
            &ldquo;{siteConfig.benefits.schoolLine}&rdquo;
          </p>
        </div>

        {/* Five Large Cards (Full text wrap, no cut off, dark theme) */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 my-auto border-t border-white/10 pt-4"
        >
          {siteConfig.benefits.cards.map((card, idx) => (
            <div
              key={card.title}
              className="benefit-card p-4 sm:p-5 bg-[#121822] border border-white/15 rounded-[2px] flex flex-col justify-between h-[210px] sm:h-[230px] hover:border-white/30 transition-all hover:-translate-y-1 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 flex items-center justify-center border border-white/15 bg-white/5 rounded-[2px] text-white">
                    {benefitIcons[card.icon]}
                  </div>
                  <span className="text-[10px] font-mono text-white/40">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-medium tracking-tight text-white mb-2 break-words">
                  {card.title}
                </h3>
              </div>

              <p className="text-xs leading-relaxed text-white/70 break-words">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quiet Subnote Bottom */}
        <div className="border-t border-white/10 pt-3 flex items-center justify-end text-xs font-mono text-white/50">
          <span>Hands-on Engineering Confidence</span>
        </div>
      </div>
    </ChapterShell>
  );
};
