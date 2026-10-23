import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Sparkles } from 'lucide-react';

interface TechTickerMarqueeProps {
  items?: string[];
  className?: string;
  speed?: number; // seconds for full loop
  reverse?: boolean;
}

const DEFAULT_ITEMS = [
  'Mathematical Foundations',
  'Robotics & Automation',
  'AI & Computer Vision',
  'Data Analytics & Telemetry',
  'Autonomous Aerial Systems',
  'Practical Lab Prototyping',
  'Microcontroller Architecture',
  'Sensor Fusion & Control',
];

/**
 * TechTickerMarquee (Inspired by arnobt78 / Portfolio-Landing-Page-5):
 * Infinite smooth horizontal marquee on clean cream/mineral background with speedup on scroll.
 */
export const TechTickerMarquee: React.FC<TechTickerMarqueeProps> = ({
  items = DEFAULT_ITEMS,
  className = '',
  speed = 28,
  reverse = false,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Duplicate list ensures gapless infinite scroll
    const anim = gsap.to(track, {
      xPercent: reverse ? 50 : -50,
      duration: speed,
      ease: 'none',
      repeat: -1,
    });

    // Speed up slightly on scroll
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      anim.timeScale(2.2);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        gsap.to(anim, { timeScale: 1, duration: 0.5 });
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      anim.kill();
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [speed, reverse]);

  // Triple array to guarantee no gaps across ultrawide monitors
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`relative w-full overflow-hidden py-3 bg-[#D5E2E5]/50 border-y border-[#203744]/10 select-none ${className}`}
    >
      <div
        ref={trackRef}
        className="flex items-center whitespace-nowrap will-change-transform"
      >
        {repeatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 sm:gap-6 mx-3 sm:mx-4">
            <span className="font-mono-tech text-xs sm:text-sm uppercase tracking-widest text-[#203744]/80 font-semibold">
              {item}
            </span>
            <Sparkles className="w-3 h-3 text-[#398BB0]/70 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
