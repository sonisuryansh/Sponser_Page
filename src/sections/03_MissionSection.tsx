import React, { useRef, useEffect } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { Hammer, Compass, Sparkles, ShieldCheck, RefreshCw } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  Hammer: <Hammer className="w-4 h-4" />,
  Compass: <Compass className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4" />,
  RefreshCw: <RefreshCw className="w-4 h-4" />,
};

export const MissionSection: React.FC = () => {
  const quoteRef = useRef<HTMLHeadingElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  // Quote words split for scrubbed fill animation
  const quoteWords = siteConfig.mission.statement.split(' ');

  useEffect(() => {
    const qEl = quoteRef.current;
    const vEl = valuesRef.current;
    if (!qEl || !vEl) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const wordSpans = qEl.querySelectorAll<HTMLElement>('.quote-word');
    const valueCards = vEl.querySelectorAll<HTMLElement>('.value-card');

    // Failsafe: Ensure words & cards are 100% visible
    const failsafe = setTimeout(() => {
      wordSpans.forEach((w) => {
        w.style.color = '#111111';
        w.style.opacity = '1';
      });
      valueCards.forEach((c) => {
        c.style.opacity = '1';
        c.style.transform = 'none';
      });
    }, 2500);

    if (prefersReducedMotion || isMobile || !document.documentElement.classList.contains('js-motion')) {
      wordSpans.forEach((w) => {
        w.style.color = '#111111';
        w.style.opacity = '1';
      });
      valueCards.forEach((c) => {
        c.style.opacity = '1';
        c.style.transform = 'none';
      });
      return () => clearTimeout(failsafe);
    }

    const ctx = gsap.context(() => {
      // Word-by-word fill (grey to ink)
      gsap.fromTo(
        wordSpans,
        { color: '#9ca3af', opacity: 0.6 },
        {
          color: '#111111',
          opacity: 1,
          stagger: 0.06,
          ease: 'power1.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: qEl,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Staggered reveal of 5 value cards
      gsap.fromTo(
        valueCards,
        { y: 24, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          immediateRender: false,
          scrollTrigger: {
            trigger: vEl,
            start: 'top 88%',
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
    <ChapterShell id="mission" chapterNumber="03" theme="light">
      <div className="w-full flex-1 flex flex-col justify-between py-2">
        {/* Eyebrow */}
        <div className="mb-2">
          <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-3">
            {siteConfig.mission.eyebrow}
          </div>
        </div>

        {/* Large Statement Headline (Scrubbed Word-by-Word Fill) */}
        <div className="my-auto max-w-4xl">
          <h2
            ref={quoteRef}
            className="font-serif text-[clamp(28px,4.2vw,56px)] font-normal leading-[1.18] tracking-tight text-[#111111]"
          >
            &ldquo;
            {quoteWords.map((word, idx) => (
              <span key={idx} className="quote-word inline-block mr-[0.28em] transition-colors">
                {word}
              </span>
            ))}
            &rdquo;
          </h2>
        </div>

        {/* Five Values as an Icon Strip (Full text wrap, no truncation) */}
        <div className="border-t border-black/10 pt-4 pb-2">
          <div className="text-xs uppercase tracking-[0.2em] text-[#5b5b5b] mb-4 font-mono">
            Core Educational Values
          </div>

          <div ref={valuesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {siteConfig.mission.values.map((val) => (
              <div
                key={val.name}
                className="value-card flex flex-col justify-start p-3.5 bg-[#fafafa] border border-black/8 rounded-[2px]"
              >
                <div className="w-8 h-8 flex items-center justify-center border border-black/10 rounded-[2px] text-[#111111] mb-2.5 bg-white shrink-0">
                  {iconMap[val.icon] || <Sparkles className="w-4 h-4" />}
                </div>
                <h3 className="font-serif text-[16px] md:text-[17px] font-medium text-[#111111] tracking-tight mb-1.5 leading-snug break-words">
                  {val.name}
                </h3>
                <p className="text-xs text-[#5b5b5b] leading-relaxed break-words">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ChapterShell>
  );
};
