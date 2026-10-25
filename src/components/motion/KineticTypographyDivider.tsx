import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface KineticTypographyDividerProps {
  className?: string;
}

const STREAM_1_SET = [
  { text: 'Curiosity', italic: false, highlight: false },
  { text: 'Robotics & AI', italic: true, highlight: true },
  { text: 'Autonomous Flight', italic: false, highlight: false },
  { text: 'Telemetry & Analytics', italic: true, highlight: true, accent: true },
];

const STREAM_2_SET = [
  { text: 'Applied Engineering Lab', isMono: true },
  { text: 'Grade-Banded Progression', isMono: false, italic: false },
  { text: 'Hands-On Prototyping', isMono: false, italic: true },
  { text: 'Institutional Excellence', isMono: true, isAccent: true },
];

/**
 * KineticTypographyDivider (Inspired by arnobt78 / Portfolio-Landing-Page-5):
 * Horizontal scrub-driven parallax text streams with continuous infinite marquee.
 * Continuously moves on its own AND visibly accelerates/shifts with scroll wheel motion!
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
      // 1. Continuous smooth infinite baseline drift
      // Row 1 drifts seamlessly to the left (-33.333% shifts 1 full set of 3)
      const tween1 = gsap.to(row1, {
        xPercent: -33.3333,
        duration: 22,
        ease: 'none',
        repeat: -1,
      });

      // Row 2 starts shifted and drifts seamlessly to the right
      gsap.set(row2, { xPercent: -33.3333 });
      const tween2 = gsap.to(row2, {
        xPercent: 0,
        duration: 25,
        ease: 'none',
        repeat: -1,
      });

      // 2. Immediate scroll-scrub parallax: Text visibly glides across on scroll
      gsap.to(row1, {
        x: '-=320',
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      gsap.to(row2, {
        x: '+=320',
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      // 3. Scroll velocity accelerator: Scrolling dynamically speeds up the stream
      let scrollTimer: ReturnType<typeof setTimeout>;
      const handleScroll = () => {
        tween1.timeScale(2.8);
        tween2.timeScale(2.8);
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          gsap.to(tween1, { timeScale: 1, duration: 0.5, ease: 'power1.out' });
          gsap.to(tween2, { timeScale: 1, duration: 0.5, ease: 'power1.out' });
        }, 120);
      };

      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.on('scroll', handleScroll);
      }
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        if (lenis) {
          lenis.off('scroll', handleScroll);
        }
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(scrollTimer);
      };
    }, container);

    return () => ctx.revert();
  }, []);

  // Repeat 3 times for a seamless 3-panel infinite carousel wrap
  const repeatedStream1 = [...STREAM_1_SET, ...STREAM_1_SET, ...STREAM_1_SET];
  const repeatedStream2 = [...STREAM_2_SET, ...STREAM_2_SET, ...STREAM_2_SET];

  return (
    <div
      ref={containerRef}
      className={`relative w-full py-8 sm:py-12 overflow-hidden bg-[#DFE6E7] border-y border-[#203744]/10 select-none ${className}`}
    >
      {/* Stream 1: Leftward infinite drift + scroll acceleration */}
      <div
        ref={row1Ref}
        className="flex items-center gap-6 sm:gap-10 whitespace-nowrap will-change-transform mb-2 sm:mb-3"
      >
        {repeatedStream1.map((item, idx) => (
          <React.Fragment key={idx}>
            <span
              className={`font-serif-editorial text-4xl sm:text-6xl lg:text-7xl tracking-tight uppercase ${
                item.accent
                  ? 'font-light italic text-[#398BB0]'
                  : item.highlight
                  ? 'font-light italic text-[#286D8B]/70'
                  : 'font-normal text-[#203744]/15'
              }`}
            >
              {item.text}
            </span>
            <span className="w-8 sm:w-16 h-[1.5px] bg-[#398BB0]/40 shrink-0" />
          </React.Fragment>
        ))}
      </div>

      {/* Stream 2: Rightward infinite drift + scroll acceleration */}
      <div
        ref={row2Ref}
        className="flex items-center gap-6 sm:gap-10 whitespace-nowrap will-change-transform"
      >
        {repeatedStream2.map((item, idx) => (
          <React.Fragment key={idx}>
            {item.isMono ? (
              <span
                className={`font-mono-tech text-xs sm:text-sm uppercase tracking-[0.3em] font-semibold ${
                  item.isAccent ? 'text-[#398BB0]' : 'text-[#203744]/40'
                }`}
              >
                {item.text}
              </span>
            ) : (
              <span
                className={`font-serif-editorial text-3xl sm:text-5xl lg:text-6xl tracking-tight uppercase ${
                  item.italic
                    ? 'font-light italic text-[#286D8B]/80'
                    : 'font-normal text-[#203744]/20'
                }`}
              >
                {item.text}
              </span>
            )}
            <span className="w-6 sm:w-10 h-[1.5px] bg-[#DBA780]/50 shrink-0" />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default KineticTypographyDivider;
