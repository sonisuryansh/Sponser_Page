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

const valueStyleMap: Record<
  string,
  {
    iconBox: string;
    borderAccent: string;
    accentDot: string;
  }
> = {
  'Hands-on Learning': {
    iconBox: 'bg-amber-50 text-amber-600 border-amber-200/80 shadow-xs',
    borderAccent: 'border-t-2 border-t-amber-500',
    accentDot: 'bg-amber-500',
  },
  'Problem-Solving': {
    iconBox: 'bg-blue-50 text-blue-600 border-blue-200/80 shadow-xs',
    borderAccent: 'border-t-2 border-t-blue-500',
    accentDot: 'bg-blue-500',
  },
  'Creativity & Innovation': {
    iconBox: 'bg-purple-50 text-purple-600 border-purple-200/80 shadow-xs',
    borderAccent: 'border-t-2 border-t-purple-500',
    accentDot: 'bg-purple-500',
  },
  'Responsible Technology': {
    iconBox: 'bg-emerald-50 text-emerald-600 border-emerald-200/80 shadow-xs',
    borderAccent: 'border-t-2 border-t-emerald-500',
    accentDot: 'bg-emerald-500',
  },
  'Continuous Learning': {
    iconBox: 'bg-cyan-50 text-cyan-600 border-cyan-200/80 shadow-xs',
    borderAccent: 'border-t-2 border-t-cyan-500',
    accentDot: 'bg-cyan-500',
  },
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
        { color: '#a0a0a0', opacity: 0.4 },
        {
          color: '#111111',
          opacity: 1,
          stagger: 0.05,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: qEl,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Value cards staggered rise
      gsap.fromTo(
        valueCards,
        { y: 32, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
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

        {/* Five Values with Distinct Color Accents & Badges */}
        <div className="border-t border-black/10 pt-4 pb-2">
          <div className="text-xs uppercase tracking-[0.2em] text-[#5b5b5b] mb-4 font-mono flex items-center justify-between">
            <span>Core Educational Values</span>
            <span className="text-[10px] text-black/40">5 Pillars of Learning</span>
          </div>

          <div ref={valuesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {siteConfig.mission.values.map((val) => {
              const style = valueStyleMap[val.name] || {
                iconBox: 'bg-white text-[#111111] border-black/10',
                borderAccent: 'border-t border-t-black/20',
                accentDot: 'bg-black/30',
              };

              return (
                <div
                  key={val.name}
                  className={`value-card flex flex-col justify-between p-4 bg-white border border-black/10 rounded-[4px] shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 ${style.borderAccent}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-9 h-9 flex items-center justify-center border rounded-[3px] shrink-0 ${style.iconBox}`}
                      >
                        {iconMap[val.icon] || <Sparkles className="w-4 h-4" />}
                      </div>
                      <span className={`w-2 h-2 rounded-full ${style.accentDot}`} />
                    </div>

                    <h3 className="font-serif text-[17px] font-medium text-[#111111] tracking-tight mb-1.5 leading-snug break-words">
                      {val.name}
                    </h3>
                  </div>

                  <p className="text-xs text-[#5b5b5b] leading-relaxed break-words mt-2">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ChapterShell>
  );
};
