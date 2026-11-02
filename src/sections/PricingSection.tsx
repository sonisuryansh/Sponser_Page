import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PricingCards } from '../components/PricingCards';
import { WordSplitReveal } from '../components/motion/WordSplitReveal';

gsap.registerPlugin(ScrollTrigger);

interface PricingSectionProps {
  onOpenPartnershipModal?: (tierName?: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenPartnershipModal }) => {
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

      // 3. Slide Scroll Lock (Pin): locks the pricing section comfortably in viewport
      ScrollTrigger.create({
        id: 'pricing-section-pin',
        trigger: container,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * 1.0)}`,
        pin: container,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="slide-14"
      data-slide-index="13"
      ref={containerRef}
      className="w-full min-h-screen relative z-10 xl:z-30 flex flex-col justify-start pt-6 sm:pt-8 lg:pt-9 pb-6 px-4 sm:px-8 lg:px-12 xl:px-16 border-b border-[#203744]/10 bg-[#DFE6E7] tech-subtle-grid"
    >
      <div className="max-w-[1120px] 2xl:max-w-[1160px] mx-auto w-full flex flex-col">
        
        {/* Parallel Header Row */}
        <div ref={headlineRef} className="pb-2.5 mb-3 sm:mb-4 border-b border-[#203744]/10 text-center">
          <h2 className="font-didone-bodoni text-2xl sm:text-3xl lg:text-[34px] xl:text-[36px] font-bold text-[#581424] tracking-tight leading-tight">
            <WordSplitReveal text="Program Model & Proposed Student Fee" staggerMs={38} />
          </h2>
          <p className="font-sans-modern text-xs sm:text-[13px] text-[#203744]/80 max-w-2xl mx-auto mt-1 font-normal leading-normal">
            Tiered monthly per-student packaging offering clear educational inclusions with room for school-specific timetable tailoring.
          </p>
        </div>

        {/* Pricing Cards Component with Scroll Animations & 3D Tilt Parallax */}
        <PricingCards onSelectTier={onOpenPartnershipModal} />

      </div>
    </section>
  );
};
