import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  to?: number;
  value?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

/**
 * AnimatedCounter (Inspired by Anugrah2303 / React_Portfolio counter.ts):
 * Smoothly animates numbers from 0 to target value on scroll with Intl formatting.
 */
export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  to,
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 2.2,
  className = '',
}) => {
  const targetValue = value !== undefined ? value : to !== undefined ? to : 0;
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      el.textContent = `${prefix}${targetValue.toFixed(decimals)}${suffix}`;
      return;
    }

    const fmt = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

    const state = { val: 0 };
    el.textContent = `${prefix}${fmt.format(0)}${suffix}`;

    const tween = gsap.to(state, {
      val: targetValue,
      duration,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 92%',
        once: true,
      },
      onUpdate: () => {
        el.textContent = `${prefix}${fmt.format(state.val)}${suffix}`;
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      el.textContent = `${prefix}${fmt.format(targetValue)}${suffix}`;
    };
  }, [targetValue, prefix, suffix, decimals, duration]);

  return (
    <span ref={spanRef} className={`font-mono-tech tabular-nums will-change-transform ${className}`}>
      {prefix}0{suffix}
    </span>
  );
};
