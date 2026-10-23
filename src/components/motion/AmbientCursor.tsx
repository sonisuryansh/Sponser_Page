import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

/**
 * AmbientCursor component:
 * Combines Aether's minimal trailing cursor dot/ring with Shatlyk's luminous
 * radial ambient glow that softly lights up cards and elements on hover.
 */
export const AmbientCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    // Only enable on desktop with mouse pointers and no reduced motion
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    setIsActive(true);

    const dot = dotRef.current;
    const ring = ringRef.current;
    const spotlight = spotlightRef.current;
    if (!dot || !ring || !spotlight) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });
    gsap.set(spotlight, { xPercent: -50, yPercent: -50, opacity: 0 });

    const dotXTo = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power2.out' });
    const dotYTo = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power2.out' });

    const ringXTo = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
    const ringYTo = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

    const spotXTo = gsap.quickTo(spotlight, 'x', { duration: 0.45, ease: 'power2.out' });
    const spotYTo = gsap.quickTo(spotlight, 'y', { duration: 0.45, ease: 'power2.out' });

    const handlePointerMove = (e: PointerEvent) => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.25 });
      gsap.to(spotlight, { opacity: 1, duration: 0.4 });

      dotXTo(e.clientX);
      dotYTo(e.clientY);

      ringXTo(e.clientX);
      ringYTo(e.clientY);

      spotXTo(e.clientX);
      spotYTo(e.clientY);
    };

    const handlePointerLeave = () => {
      gsap.to([dot, ring, spotlight], { opacity: 0, duration: 0.3 });
    };

    const handlePointerOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement | null)?.closest(
        'button, a, input, select, textarea, [data-cursor="hover"], .cursor-pointer, .interactive-card'
      );
      if (target) {
        gsap.to(ring, {
          scale: 1.8,
          borderColor: 'rgba(57, 139, 176, 0.85)',
          backgroundColor: 'rgba(57, 139, 176, 0.08)',
          duration: 0.25,
          ease: 'power2.out',
        });
        gsap.to(dot, {
          scale: 0.4,
          opacity: 0.6,
          duration: 0.2,
        });
      } else {
        gsap.to(ring, {
          scale: 1,
          borderColor: 'rgba(57, 139, 176, 0.4)',
          backgroundColor: 'transparent',
          duration: 0.25,
          ease: 'power2.out',
        });
        gsap.to(dot, {
          scale: 1,
          opacity: 1,
          duration: 0.2,
        });
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    document.documentElement.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('pointerover', handlePointerOver);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('pointerover', handlePointerOver);
      gsap.killTweensOf([dot, ring, spotlight]);
    };
  }, []);

  if (!isActive) return null;

  return (
    <>
      {/* Shatlyk-inspired soft radial ambient spotlight */}
      <div
        ref={spotlightRef}
        className="fixed top-0 left-0 w-[640px] h-[640px] rounded-full pointer-events-none z-20 mix-blend-screen will-change-transform opacity-0"
        style={{
          background:
            'radial-gradient(circle, rgba(57,139,176,0.075) 0%, rgba(40,109,139,0.035) 45%, transparent 70%)',
        }}
      />

      {/* Aether-inspired minimal outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#398BB0]/40 pointer-events-none z-50 transition-colors will-change-transform opacity-0"
      />

      {/* Aether-inspired central micro dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#398BB0] pointer-events-none z-50 will-change-transform opacity-0 shadow-[0_0_8px_rgba(57,139,176,0.6)]"
      />
    </>
  );
};
