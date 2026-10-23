import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LineRevealProps {
  className?: string;
  duration?: number;
  origin?: 'left' | 'center' | 'right';
  color?: string;
  height?: number;
}

/**
 * LineReveal (Inspired by Anugrah2303 / React_Portfolio lineReveal.ts):
 * Architectural divider line that self-draws smoothly when scrolling into view.
 */
export const LineReveal: React.FC<LineRevealProps> = ({
  className = 'w-full my-4',
  duration = 1.4,
  origin = 'left',
  color,
  height = 1,
}) => {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const transformOrigin =
      origin === 'center' ? 'center center' : origin === 'right' ? 'right center' : 'left center';

    const tween = gsap.fromTo(
      el,
      { scaleX: 0, transformOrigin },
      {
        scaleX: 1,
        duration,
        ease: 'expo.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          once: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [duration, origin]);

  return (
    <div
      ref={lineRef}
      style={{
        backgroundColor: color || undefined,
        height: height ? `${height}px` : undefined,
      }}
      className={`will-change-transform ${!color ? 'bg-[#203744]/15' : ''} ${className}`}
    />
  );
};
