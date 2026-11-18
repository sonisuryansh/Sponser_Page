import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextMaskRevealProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
}

export const TextMaskReveal: React.FC<TextMaskRevealProps> = ({
  lines,
  className = '',
  lineClassName = '',
  tag = 'h2',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = el.querySelectorAll<HTMLElement>('.line-mask-item');

    // Failsafe: force visibility after 2.5s
    const failsafe = setTimeout(() => {
      items.forEach((item) => {
        item.style.opacity = '1';
        item.style.transform = 'none';
      });
    }, 2500);

    if (prefersReducedMotion || !document.documentElement.classList.contains('js-motion')) {
      items.forEach((item) => {
        item.style.opacity = '1';
        item.style.transform = 'none';
      });
      return () => clearTimeout(failsafe);
    }

    const tween = gsap.fromTo(
      items,
      { yPercent: 105, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
        stagger: 0.08,
        immediateRender: false,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      }
    );

    return () => {
      clearTimeout(failsafe);
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const Component = tag as any;

  return (
    <Component ref={containerRef} className={`line-mask-container ${className}`}>
      {lines.map((line, idx) => (
        <span key={idx} className="line-mask-wrap">
          <span className={`line-mask-item ${lineClassName}`}>{line}</span>
        </span>
      ))}
    </Component>
  );
};
