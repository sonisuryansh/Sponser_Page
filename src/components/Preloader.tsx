import React, { useEffect, useState } from 'react';
import { siteConfig } from '../config/content.config';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [wiped, setWiped] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const t = setTimeout(() => {
        setCount(100);
        setIsDone(true);
        setWiped(true);
        onComplete();
      }, 0);
      return () => clearTimeout(t);
    }

    const startTime = performance.now();
    const duration = 1400; // 1.4s smooth counter

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(easedProgress * 100);

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(100);
        setIsDone(true);
        setTimeout(() => {
          setWiped(true);
          setTimeout(() => {
            onComplete();
          }, 600);
        }, 300);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [onComplete]);

  if (wiped) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading MedhaArc Labs presentation"
      className={`fixed inset-0 z-[99999] bg-[#ffffff] text-[#111111] flex flex-col justify-between p-8 md:p-16 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
        isDone ? '-translate-y-full opacity-95' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="flex justify-between items-center text-xs uppercase tracking-[0.2em] text-[#5b5b5b]">
        <span>{siteConfig.brandName}</span>
        <span>Initiative</span>
      </div>

      <div className="max-w-4xl mx-auto w-full my-auto text-center px-4">
        <div className="text-[clamp(64px,14vw,140px)] font-light tracking-tight tabular-nums leading-none font-serif text-[#111111]">
          {count.toString().padStart(2, '0')}
        </div>
        <div className="w-16 h-px bg-[#111111]/20 mx-auto my-6" />
        <p className="text-lg md:text-xl text-[#5b5b5b] font-normal tracking-wide max-w-xl mx-auto">
          {siteConfig.tagline}
        </p>
      </div>

      <div className="flex justify-between items-center text-xs uppercase tracking-[0.2em] text-[#5b5b5b]">
        <span>School Presentation</span>
        <span>2026</span>
      </div>
    </div>
  );
};
