import React, { useRef, useEffect, useState } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PricingSectionProps {
  onOpenContact: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenContact }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState([500, 600, 700]);

  // Numbers count-up on enter + columns rise staggered
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const cols = el.querySelectorAll<HTMLElement>('.pricing-col');

    // Failsafe: force visibility
    const failsafe = setTimeout(() => {
      cols.forEach((c) => {
        c.style.opacity = '1';
        c.style.transform = 'none';
      });
      setCounts([500, 600, 700]);
    }, 2500);

    if (prefersReducedMotion || isMobile || !document.documentElement.classList.contains('js-motion')) {
      return () => clearTimeout(failsafe);
    }

    const ctx = gsap.context(() => {
      // Staggered rise of columns
      gsap.fromTo(
        cols,
        { y: 35, opacity: 0.15 },
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

      // Numeric count-up from 0
      const countObj = { val0: 0, val1: 0, val2: 0 };
      gsap.to(countObj, {
        val0: 500,
        val1: 600,
        val2: 700,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          setCounts([
            Math.round(countObj.val0),
            Math.round(countObj.val1),
            Math.round(countObj.val2),
          ]);
        },
      });
    });

    return () => {
      clearTimeout(failsafe);
      ctx.revert();
    };
  }, []);

  return (
    <ChapterShell id="pricing" chapterNumber="13" theme="light">
      <div ref={containerRef} className="w-full flex-1 flex flex-col justify-between py-2 select-none">
        {/* Eyebrow & Headline */}
        <div className="mb-4 max-w-3xl">
          <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-1">
            {siteConfig.pricing.eyebrow}
          </div>
          <h2 className="font-serif text-[clamp(26px,3.5vw,46px)] font-normal leading-[1.14] tracking-tight text-[#111111] mb-1">
            {siteConfig.pricing.headline}
          </h2>
          <p className="text-xs text-[#5b5b5b] font-mono uppercase tracking-wider">
            {siteConfig.pricing.label}
          </p>
        </div>

        {/* 3 Package Columns (No "Recommended" tag, no "Select tier" buttons) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 border-t border-black/10 pt-5 my-auto">
          {siteConfig.pricing.tiers.map((tier, idx) => (
            <div
              key={tier.id}
              className="pricing-col p-6 bg-[#fafafa] border border-black/10 rounded-[2px] flex flex-col justify-between h-[300px] sm:h-[320px] hover:border-black/30 transition-colors shadow-xs"
            >
              <div>
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#5b5b5b] font-mono">
                  Package 0{idx + 1}
                </span>
                <h3 className="font-serif text-2xl font-medium tracking-tight text-[#111111] mt-1 mb-2">
                  {tier.name}
                </h3>

                <div className="flex items-baseline gap-1.5 mb-2.5">
                  <span className="font-serif text-3xl sm:text-4xl font-light text-[#111111]">
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
                      <Check className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
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
          ))}
        </div>

        {/* Footnote at Base */}
        <div className="p-3 border border-black/10 bg-[#fafafa] rounded-[2px] text-xs text-[#5b5b5b] leading-relaxed max-w-4xl mt-3">
          <p>
            {siteConfig.pricing.footnote}
            {siteConfig.confirm.pricingFootnoteExtra && ` ${siteConfig.confirm.pricingFootnoteExtra}`}
          </p>
        </div>
      </div>
    </ChapterShell>
  );
};
