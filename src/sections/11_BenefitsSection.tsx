import React, { useRef, useEffect } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { Award, Target, Rocket, Users, Shield } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const benefitIcons: Record<string, React.ReactNode> = {
  Award: <Award className="w-4 h-4" />,
  Target: <Target className="w-4 h-4" />,
  Rocket: <Rocket className="w-4 h-4" />,
  Users: <Users className="w-4 h-4" />,
  Shield: <Shield className="w-4 h-4" />,
};

const cardColorStyles = [
  {
    borderAccent: 'border-t-2 border-t-cyan-400',
    iconBox: 'bg-cyan-950/80 border-cyan-500/40 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.25)]',
    cardBg: 'bg-gradient-to-b from-[#0f1f2e]/90 to-[#0a121c]/90 hover:border-cyan-400/50',
    dot: 'bg-cyan-400',
  },
  {
    borderAccent: 'border-t-2 border-t-emerald-400',
    iconBox: 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.25)]',
    cardBg: 'bg-gradient-to-b from-[#0e241c]/90 to-[#091410]/90 hover:border-emerald-400/50',
    dot: 'bg-emerald-400',
  },
  {
    borderAccent: 'border-t-2 border-t-amber-400',
    iconBox: 'bg-amber-950/80 border-amber-500/40 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.25)]',
    cardBg: 'bg-gradient-to-b from-[#241a0d]/90 to-[#120e07]/90 hover:border-amber-400/50',
    dot: 'bg-amber-400',
  },
  {
    borderAccent: 'border-t-2 border-t-purple-400',
    iconBox: 'bg-purple-950/80 border-purple-500/40 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.25)]',
    cardBg: 'bg-gradient-to-b from-[#1e132e]/90 to-[#100a1a]/90 hover:border-purple-400/50',
    dot: 'bg-purple-400',
  },
  {
    borderAccent: 'border-t-2 border-t-sky-400',
    iconBox: 'bg-sky-950/80 border-sky-500/40 text-sky-300 shadow-[0_0_10px_rgba(56,189,248,0.25)]',
    cardBg: 'bg-gradient-to-b from-[#0e2130]/90 to-[#08121c]/90 hover:border-sky-400/50',
    dot: 'bg-sky-400',
  },
];

export const BenefitsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const cards = el.querySelectorAll<HTMLElement>('.benefit-card');

    // Failsafe
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

    const ctx = gsap.context(() => {
      gsap.fromTo(
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
    });

    return () => {
      clearTimeout(failsafe);
      ctx.revert();
    };
  }, []);

  return (
    <ChapterShell id="benefits" chapterNumber="11" theme="dark">
      <div ref={containerRef} className="w-full flex-1 flex flex-col justify-between py-2 select-none">
        {/* Eyebrow & Statement Headline */}
        <div className="mb-3 max-w-3xl">
          <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-1">
            {siteConfig.benefits.eyebrow}
          </div>
          <h2 className="font-serif text-[clamp(26px,3.4vw,44px)] font-normal leading-[1.14] tracking-tight text-white mb-2">
            {siteConfig.benefits.headline}
          </h2>
          <p className="text-sm text-white/75 font-sans max-w-2xl">
            {siteConfig.benefits.schoolLine}
          </p>
        </div>

        {/* 5 Distinctly Colored Benefit Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 my-auto border-t border-white/10 pt-4"
        >
          {siteConfig.benefits.cards.map((card, idx) => {
            const style = cardColorStyles[idx] || cardColorStyles[0];

            return (
              <div
                key={card.title}
                className={`benefit-card p-4 sm:p-5 border border-white/15 rounded-[4px] flex flex-col justify-between h-[215px] sm:h-[235px] transition-all hover:-translate-y-1 shadow-lg ${style.cardBg} ${style.borderAccent}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-8 h-8 flex items-center justify-center border rounded-[3px] ${style.iconBox}`}>
                      {benefitIcons[card.icon]}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                      <span className="text-[10px] font-mono text-white/50">
                        0{idx + 1}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-medium tracking-tight text-white mb-2 break-words">
                    {card.title}
                  </h3>
                </div>

                <p className="text-xs leading-relaxed text-white/75 break-words">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quiet Subnote Bottom */}
        <div className="border-t border-white/10 pt-3 flex items-center justify-end text-xs font-mono text-white/50">
          <span>Hands-on Engineering Confidence</span>
        </div>
      </div>
    </ChapterShell>
  );
};
