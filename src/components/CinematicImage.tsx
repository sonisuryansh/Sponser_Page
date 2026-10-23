import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CinematicImageProps {
  src: string;
  alt: string;
  aspect?: 'video' | 'square' | 'portrait' | 'wide' | 'auto';
  className?: string;
  zoomDirection?: 'in' | 'out';
  tag?: string;
  priority?: boolean;
}

export const CinematicImage: React.FC<CinematicImageProps> = ({
  src,
  alt,
  aspect = 'video',
  className = '',
  zoomDirection = 'out',
  tag,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const startScale = zoomDirection === 'out' ? 1.15 : 1.0;
    const endScale = zoomDirection === 'out' ? 1.0 : 1.15;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { scale: startScale, y: -10 },
        {
          scale: endScale,
          y: 10,
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
  }, [zoomDirection]);

  const aspectClass = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[4/5]',
    wide: 'aspect-[21/9]',
    auto: 'h-auto',
  }[aspect];

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl bg-[#D5E2E5]/50 border border-[#203744]/10 shadow-md ${aspectClass} ${className} group`}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform"
      />

      {/* Subtle Cartier Vignette Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#203744]/35 via-transparent to-transparent pointer-events-none" />

      {/* Optional Technical Blueprint Tag */}
      {tag && (
        <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded bg-[#203744]/80 backdrop-blur-md text-[10px] font-mono-tech uppercase tracking-widest text-[#E9EEEE] border border-white/10 shadow-xs pointer-events-none">
          {tag}
        </div>
      )}
    </div>
  );
};
