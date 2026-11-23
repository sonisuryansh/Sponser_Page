import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PricingSectionProps {
  onOpenContact: () => void;
}

const packageStyles = [
  {
    borderAccent: 'border-t-2 border-t-slate-400',
    cardBg: 'bg-gradient-to-b from-slate-50/80 via-white to-white border-slate-200/80 hover:border-slate-400',
    badge: 'text-slate-600 bg-slate-100 border-slate-200',
    checkColor: 'text-slate-700',
    priceColor: 'text-slate-900',
  },
  {
    borderAccent: 'border-t-2 border-t-[#c8a45d]',
    cardBg: 'bg-gradient-to-b from-amber-50/70 via-white to-white border-[#c8a45d]/60 ring-1 ring-[#c8a45d]/20 hover:border-[#c8a45d] shadow-md',
    badge: 'text-[#c8a45d] bg-amber-50 border-[#c8a45d]/30 font-semibold',
    checkColor: 'text-[#c8a45d]',
    priceColor: 'text-[#111111]',
  },
  {
    borderAccent: 'border-t-2 border-t-indigo-500',
    cardBg: 'bg-gradient-to-b from-indigo-50/60 via-white to-white border-indigo-200/80 hover:border-indigo-400',
    badge: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    checkColor: 'text-indigo-600',
    priceColor: 'text-indigo-950',
  },
];

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenContact }) => {
  const [counts] = useState<number[]>([500, 600, 700]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Staggered entrance animation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const cols = el.querySelectorAll<HTMLElement>('.pricing-col');

    // Failsafe
    const failsafe = setTimeout(() => {
      cols.forEach((c) => {
        c.style.opacity = '1';
        c.style.transform = 'none';
      });
    }, 2500);

    if (prefersReducedMotion || isMobile || !document.documentElement.classList.contains('js-motion')) {
      cols.forEach((c) => {
        c.style.opacity = '1';
        c.style.transform = 'none';
      });
      return () => clearTimeout(failsafe);
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cols,
        { y: 35, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
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
    <ChapterShell id="pricing" chapterNumber="13" theme="light">
      <div ref={containerRef} className="w-full flex-1 flex flex-col justify-between py-2 select-none">
        {/* Eyebrow & Headline (Centered) */}
        <div className="mb-4 max-w-3xl mx-auto text-center flex flex-col items-center">
          <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-1">
            {siteConfig.pricing.eyebrow}
          </div>
          <h2 className="font-serif text-[clamp(26px,3.4vw,44px)] font-normal leading-[1.14] tracking-tight text-[#111111] mb-1.5 text-center">
            {siteConfig.pricing.headline}
          </h2>
          <p className="text-xs text-[#5b5b5b] font-mono uppercase tracking-wider text-center">
            {siteConfig.pricing.label}
          </p>
        </div>

        {/* 3 Package Columns with Refined Color Character */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 border-t border-black/10 pt-5 my-auto">
          {siteConfig.pricing.tiers.map((tier, idx) => {
            const style = packageStyles[idx] || packageStyles[0];

            return (
              <div
                key={tier.id}
                className={`pricing-col p-6 rounded-[3px] border flex flex-col justify-between h-[300px] sm:h-[325px] transition-all hover:-translate-y-1 ${style.cardBg} ${style.borderAccent}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-[2px] border font-mono ${style.badge}`}>
                      Package 0{idx + 1}
                    </span>
                    <span className="text-[11px] font-mono text-black/40">
                      Annual Structure
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-medium tracking-tight text-[#111111] mb-2">
                    {tier.name}
                  </h3>

                  <div className="flex items-baseline gap-1.5 mb-2.5">
                    <span className={`font-serif text-3xl sm:text-4xl font-light ${style.priceColor}`}>
                      ₹{counts[idx]}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#5b5b5b]">
                      {tier.cadence}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-[#111111] pb-3 border-b border-black/10 mb-3">
                    {tier.summary}
                  </p>

                  <ul className="space-y-1.5 mb-4">
                    {tier.features.slice(0, 3).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs text-[#5b5b5b]">
                        <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${style.checkColor}`} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quiet Underline-Draw Text Link */}
                <button
                  onClick={onOpenContact}
                  className="text-left text-xs uppercase tracking-[0.18em] text-[#111111] hover:text-[#c8a45d] transition-colors relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-current after:origin-left hover:after:scale-x-100 after:scale-x-0 after:transition-transform cursor-pointer"
                >
                  Inquire about {tier.name} →
                </button>
              </div>
            );
          })}
        </div>

        {/* Footnote at Base */}
        <div className="mx-auto p-2.5 sm:p-3 border border-black/10 bg-gradient-to-r from-amber-50/30 via-white to-amber-50/20 rounded-[2px] text-xs text-[#5b5b5b] leading-relaxed max-w-3xl mt-3 text-center">
          <p>
            {siteConfig.pricing.footnote}
            {siteConfig.confirm.pricingFootnoteExtra && ` ${siteConfig.confirm.pricingFootnoteExtra}`}
          </p>
        </div>
      </div>
    </ChapterShell>
  );
};
