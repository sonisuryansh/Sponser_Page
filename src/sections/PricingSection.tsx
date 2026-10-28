import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PricingCards } from '../components/PricingCards';

gsap.registerPlugin(ScrollTrigger);

export const PricingSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Avoid stacking a second pin if the section remounts during development/HMR.
      ScrollTrigger.getById('pricing-section-pin')?.kill();

      // 1. Headline scroll reveal
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // 2. Pricing cards staggered entrance on scroll
      const cards = container.querySelectorAll('.pricing-card-item');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }

      // 3. Top bar reveal
      const topBar = container.querySelector('.pricing-top-bar');
      
      if (topBar) {
        gsap.fromTo(
          topBar,
          { opacity: 0, y: -15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: container,
              start: 'top 78%',
              once: true,
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="slide-14"
      data-slide-index="13"
      ref={containerRef}
      className="w-full min-h-screen relative z-10 flex flex-col justify-center py-10 sm:py-12 lg:py-14 px-4 sm:px-8 lg:px-12 xl:px-16 border-b border-[#203744]/10 bg-[#DFE6E7] tech-subtle-grid"
    >
      <div className="max-w-[1240px] 2xl:max-w-[1320px] mx-auto w-full my-auto flex flex-col justify-center">
        
        {/* Parallel Header Row */}
        <div ref={headlineRef} className="pb-3 mb-4 sm:mb-5 border-b border-[#203744]/10 text-center">
          <h2 className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] font-normal text-[#203744] tracking-tight leading-tight">
            Program Model &{' '}
            <span className="text-[#398BB0] font-bold italic">Proposed Student Fee</span>
          </h2>
          <p className="font-sans-modern text-xs sm:text-[14px] text-[#203744]/80 max-w-2xl mx-auto mt-1.5 font-normal leading-normal">
            Tiered monthly per-student packaging offering clear educational inclusions with room for school-specific timetable tailoring.
          </p>
        </div>

        {/* Pricing Cards Component with Scroll Animations */}
        <PricingCards />

      </div>
    </section>
  );
};
