import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    num: '01',
    title: 'Hands-on Learning',
    summary: 'Direct building over passive theory',
  },
  {
    num: '02',
    title: 'Problem-Solving',
    summary: 'Deconstruct, prototype, and test',
  },
  {
    num: '03',
    title: 'Creativity & Innovation',
    summary: 'From ideas to working models',
  },
  {
    num: '04',
    title: 'Responsible Tech',
    summary: 'Safety, privacy, and digital ethics',
  },
  {
    num: '05',
    title: 'Continuous Improvement',
    summary: 'Embracing failure as iterative learning',
  }
];

export const MissionValuesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const list = listRef.current;
    if (!container || !list) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const items = list.querySelectorAll('.value-item');
      gsap.fromTo(
        items,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: list,
            start: 'top 75%',
            end: 'bottom 80%',
            scrub: false,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="slide-3"
      data-slide-index="2"
      ref={containerRef}
      className="relative min-h-screen py-28 sm:py-36 px-8 sm:px-14 lg:px-20 bg-[#D5E2E5]/40 border-b border-[#1C2833]/10 flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Chapter Header */}
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono-tech text-xs tracking-widest uppercase text-[#398BB0] font-semibold">
            03 / 15
          </span>
          <span className="w-8 h-[1px] bg-[#1C2833]/20" />
          <span className="font-mono-tech text-xs tracking-wider uppercase text-[#1C2833]/60">
            Mission & Core Values
          </span>
        </div>

        {/* Mission Statement: Refined Editorial Typography */}
        <div className="mt-6 mb-12 sm:mb-14 max-w-4xl">
          <h2 className="font-serif-editorial text-3xl sm:text-5xl lg:text-6xl font-normal text-[#1C2833] tracking-tight leading-[1.12]">
            Connecting fundamental concepts with{' '}
            <span className="italic font-light text-[#286D8B]">real applications.</span>
          </h2>
        </div>

        {/* Values: Typographic List with Sticky Visual Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Hairline Divided Typographic List (7 cols) */}
          <div ref={listRef} className="lg:col-span-7 divide-y divide-[#1C2833]/12">
            {VALUES.map((val) => (
              <div
                key={val.num}
                className="value-item py-4 first:pt-0 group flex items-center justify-between gap-6 transition-all hover:translate-x-1"
              >
                <div className="flex items-baseline gap-4 flex-wrap">
                  <span className="font-mono-tech text-xs text-[#398BB0] font-bold">
                    {val.num}
                  </span>
                  <h3 className="font-serif-editorial text-2xl sm:text-3xl font-normal text-[#1C2833] group-hover:text-[#286D8B] transition-colors">
                    {val.title}
                  </h3>
                  <span className="text-xs text-[#1C2833]/30 hidden sm:inline">•</span>
                  <span className="font-sans-modern text-sm text-[#1C2833]/70 font-medium group-hover:text-[#1C2833]/90 transition-colors">
                    {val.summary}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#1C2833]/30 group-hover:text-[#286D8B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </div>
            ))}
          </div>

          {/* Right Column: Sticky Authentic Hardware Visual (5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="relative overflow-hidden rounded-2xl bg-[#DFE6E7] border border-[#1C2833]/15 shadow-xl aspect-square">
              <img
                src="/assets/page_15.jpg"
                alt="Circuit breadboard with microcontroller and wiring"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 grayscale contrast-110 hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#38bdf8] block mb-1">
                  Hardware Prototyping Bench
                </span>
                <span className="font-serif-editorial text-base italic font-light text-white/95">
                  Iterative debugging and embedded logic
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
