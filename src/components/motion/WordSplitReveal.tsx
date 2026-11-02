import React, { useRef, useEffect, useState } from 'react';

interface WordSplitRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  staggerMs?: number;
  baseDelayMs?: number;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'div';
  immediate?: boolean;
}

export const WordSplitReveal: React.FC<WordSplitRevealProps> = ({
  text,
  className = '',
  wordClassName = '',
  staggerMs = 38,
  baseDelayMs = 0,
  as: Component = 'span',
  immediate = false,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState<boolean>(() => {
    if (immediate) return true;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (isRevealed) return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [immediate, isRevealed]);

  const words = text.split(/\s+/).filter(Boolean);

  return (
    // @ts-expect-error dynamic component tag
    <Component ref={containerRef} className={className}>
      {words.map((word, idx) => {
        const delay = baseDelayMs + idx * staggerMs;
        return (
          <span key={`${word}-${idx}`} className="word-span-wrapper">
            <span
              className={`word-span-atom ${wordClassName} ${isRevealed ? 'is-revealed' : ''}`}
              style={{
                transitionDelay: `${delay}ms`,
              }}
            >
              {word}
              {idx < words.length - 1 ? '\u00A0' : ''}
            </span>
          </span>
        );
      })}
    </Component>
  );
};

