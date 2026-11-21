import React, { useRef, useEffect, type ReactNode } from 'react';
import gsap from 'gsap';

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number; // 0 to 1, default 0.35
}

/**
 * Magnetic button wrapper (Inspired by Aether Boilerplate):
 * Gently pulls the element towards the cursor on hover and springs back smoothly.
 */
export const Magnetic: React.FC<MagneticProps> = ({
  children,
  className = '',
  strength = 0.32,
}) => {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    // Check touch device or reduced motion
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const xTo = gsap.quickTo(el, 'x', {
      duration: 0.7,
      ease: 'elastic.out(1, 0.45)',
    });
    const yTo = gsap.quickTo(el, 'y', {
      duration: 0.7,
      ease: 'elastic.out(1, 0.45)',
    });

    const handlePointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * strength);
      yTo(relY * strength);
    };

    const handlePointerLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('pointermove', handlePointerMove);
    el.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerleave', handlePointerLeave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return (
    <div
      ref={elRef}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </div>
  );
};
