import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface KineticTypographyDividerProps {
  className?: string;
}

/**
 * KineticTypographyDivider (Inspired by arnobt78 / Portfolio-Landing-Page-5):
 * Horizontal scrub-driven parallax text streams on a clean creamish/mineral backdrop.
 */
export const KineticTypographyDivider: React.FC<KineticTypographyDividerProps> = ({
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;
    if (!container || !row1 || !row2) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        row1,
        { xPercent: 12 },
        {
          xPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );

      gsap.fromTo(
        row2,
        { xPercent: -15 },
        {
          xPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full py-8 sm:py-12 overflow-hidden bg-[#DFE6E7] border-y border-[#203744]/10 select-none ${className}`}
    >
      {/* Stream 1: Leftward drift on scroll */}
      <div
        ref={row1Ref}
        className="flex items-center gap-6 sm:gap-10 whitespace-nowrap will-change-transform mb-2 sm:mb-3"
      >
        <span className="font-serif-editorial text-4xl sm:text-6xl lg:text-7xl font-normal text-[#203744]/15 tracking-tight uppercase">
          Curiosity
        </span>
        <span className="w-8 sm:w-16 h-[1.5px] bg-[#398BB0]/40 shrink-0" />
        <span className="font-serif-editorial text-4xl sm:text-6xl lg:text-7xl font-light italic text-[#286D8B]/70 tracking-tight">
          Robotics & AI
        </span>
        <span className="w-8 sm:w-16 h-[1.5px] bg-[#398BB0]/40 shrink-0" />
        <span className="font-serif-editorial text-4xl sm:text-6xl lg:text-7xl font-normal text-[#203744]/15 tracking-tight uppercase">
          Autonomous Flight
        </span>
        <span className="w-8 sm:w-16 h-[1.5px] bg-[#398BB0]/40 shrink-0" />
        <span className="font-serif-editorial text-4xl sm:text-6xl lg:text-7xl font-light italic text-[#398BB0] tracking-tight">
          Telemetry & Analytics
        </span>
      </div>

      {/* Stream 2: Rightward drift on scroll */}
      <div
        ref={row2Ref}
        className="flex items-center gap-6 sm:gap-10 whitespace-nowrap will-change-transform"
      >
        <span className="font-mono-tech text-xs sm:text-sm uppercase tracking-[0.3em] text-[#203744]/40 font-semibold">
          Applied Engineering Lab
        </span>
        <span className="w-6 sm:w-10 h-[1.5px] bg-[#DBA780]/50 shrink-0" />
        <span className="font-serif-editorial text-3xl sm:text-5xl lg:text-6xl font-normal text-[#203744]/20 tracking-tight uppercase">
          Grade-Banded Progression
        </span>
        <span className="w-6 sm:w-10 h-[1.5px] bg-[#DBA780]/50 shrink-0" />
        <span className="font-serif-editorial text-3xl sm:text-5xl lg:text-6xl font-light italic text-[#286D8B]/80 tracking-tight">
          Hands-On Prototyping
        </span>
        <span className="w-6 sm:w-10 h-[1.5px] bg-[#DBA780]/50 shrink-0" />
        <span className="font-mono-tech text-xs sm:text-sm uppercase tracking-[0.3em] text-[#398BB0] font-semibold">
          Institutional Excellence
        </span>
      </div>
    </div>
  );
};
