import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Lightbulb, Layers, GraduationCap, Cpu, ShieldCheck } from 'lucide-react';
import { Magnetic } from '../components/motion/Magnetic';
import { AnimatedCounter } from '../components/motion/AnimatedCounter';

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    icon: <Layers className="w-5 h-5 text-[#398BB0]" />,
    title: 'Connected Multi-Domain Learning',
    desc: 'Robotics, AI, Data, and Flight taught as one unified discipline.'
  },
  {
    icon: <Compass className="w-5 h-5 text-[#286D8B]" />,
    title: 'Concepts Before Complexity',
    desc: 'Core electronics, physics, and logic before heavy software toolchains.'
  },
  {
    icon: <Lightbulb className="w-5 h-5 text-[#DBA780]" />,
    title: 'Practical Experimentation',
    desc: 'Direct bench validation: wiring circuits, coding, and testing prototypes.'
  },
  {
    icon: <GraduationCap className="w-5 h-5 text-[#203744]" />,
    title: 'Grade-Appropriate Progression',
    desc: 'Staged from visual blocks in middle school to full syntax in high school.'
  },
  {
    icon: <Cpu className="w-5 h-5 text-[#398BB0]" />,
    title: 'Applied Mathematical Bedrock',
    desc: 'Vectors, geometry, and logic experienced through motor turns and telemetry.'
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-[#286D8B]" />,
    title: 'Responsible Innovation',
    desc: 'Digital ethics, laboratory safety protocols, and mindful engineering.'
  }
];

export const LearningApproachSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeTextRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const marquee = marqueeTextRef.current;
    const cardsGrid = cardsGridRef.current;
    if (!container || !marquee) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Slide Scroll Lock (Pin): locks Learning Approach section in viewport on scroll
      ScrollTrigger.create({
        id: 'learning-approach-pin',
        trigger: container,
        start: 'top top',
        end: '+=1000',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      // Horizontal travelling text as user scrolls through this pinned section
      gsap.fromTo(
        marquee,
        { x: '5vw' },
        {
          x: '-20vw',
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '+=1000',
            scrub: 1.2,
          },
        }
      );

      // Stagger card entrance on scroll
      if (cardsGrid) {
        gsap.fromTo(
          cardsGrid.children,
          { opacity: 0, y: 30, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.08,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
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
      id="slide-9"
      data-slide-index="8"
      ref={containerRef}
      className="relative min-h-screen lg:h-screen lg:max-h-screen py-6 sm:py-8 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#DFE6E7] tech-subtle-grid border-b border-[#203744]/10 flex flex-col justify-center overflow-hidden"
    >
      {/* Background Oversized Horizontal Travelling Phrase (Subtle Ambient Watermark) */}
      <div
        ref={marqueeTextRef}
        className="absolute top-4 sm:top-6 left-0 whitespace-nowrap pointer-events-none select-none opacity-[0.035] will-change-transform z-0"
      >
        <span className="font-sans-modern text-[11vw] font-black tracking-widest text-[#203744]">
          MEDHAARC LABS • MEDHAARC LABS • MEDHAARC LABS • MEDHAARC LABS •
        </span>
      </div>

      <div className="max-w-[1560px] 2xl:max-w-[1680px] mx-auto w-full relative z-10 my-auto">
        
        {/* Expansive Split Header: Left Title & Subtitle | Right Telemetry Metrics (Eliminates empty flanks) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-end mb-5 sm:mb-6 pb-4 border-b border-[#203744]/12">
          {/* Left: Title & Editorial Subtitle */}
          <div className="lg:col-span-7 xl:col-span-8 text-left">
            <h2 className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] font-normal text-[#1C2833] tracking-tight leading-tight">
              Understanding How Technology{' '}
              <span className="text-[#286D8B] font-bold italic">Truly Works.</span>
            </h2>
            <p className="font-sans-modern text-xs sm:text-[13.5px] text-[#203744]/80 mt-1.5 max-w-2xl font-normal leading-relaxed">
              Moving beyond isolated workshop kits to cultivate enduring engineering intuition, logic, and creative confidence.
            </p>
          </div>

          {/* Right: Telemetry Counter Strip (Placed naturally on the right to fill space and remove vertical stack) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="grid grid-cols-3 gap-1 sm:gap-2 p-2.5 sm:p-3 rounded-2xl bg-white/80 border border-[#203744]/12 shadow-xs backdrop-blur-xs">
              <div className="text-center px-1">
                <div className="font-mono-tech text-lg sm:text-2xl font-bold text-[#398BB0]">
                  <AnimatedCounter to={6} suffix=" Pillars" />
                </div>
                <div className="font-mono-tech text-[9.5px] sm:text-[10.5px] text-[#203744]/70 uppercase font-medium mt-0.5 leading-tight">
                  Unified Core
                </div>
              </div>
              <div className="text-center px-1 border-x border-[#203744]/10">
                <div className="font-mono-tech text-lg sm:text-2xl font-bold text-[#286D8B]">
                  <AnimatedCounter to={100} suffix="%" />
                </div>
                <div className="font-mono-tech text-[9.5px] sm:text-[10.5px] text-[#203744]/70 uppercase font-medium mt-0.5 leading-tight">
                  Bench Hands-On
                </div>
              </div>
              <div className="text-center px-1">
                <div className="font-mono-tech text-lg sm:text-2xl font-bold text-[#203744]">
                  <AnimatedCounter to={0} prefix="" suffix=" Capex" />
                </div>
                <div className="font-mono-tech text-[9.5px] sm:text-[10.5px] text-[#203744]/70 uppercase font-medium mt-0.5 leading-tight">
                  Passive Drills
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Column Balanced Layout: 3 Pillars Left | Center Workbench Visual | 3 Pillars Right */}
        <div ref={cardsGridRef} className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 lg:gap-5 xl:gap-6 items-center">
          
          {/* Left Column: 3 Pillars (Enlarged & Prominent) */}
          <div className="lg:col-span-4 flex flex-col gap-2.5 sm:gap-3">
            {PILLARS.slice(0, 3).map((p) => (
              <Magnetic key={p.title} strength={0.12}>
                <div className="p-3 sm:p-3.5 xl:p-4 rounded-xl bg-white/95 hover:bg-white border border-[#203744]/12 hover:border-[#398BB0]/40 transition-all duration-300 shadow-2xs group interactive-card">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="p-1.5 rounded-lg bg-[#DFE6E7]/80 group-hover:bg-[#398BB0]/15 transition-colors shrink-0">
                      {p.icon}
                    </div>
                    <h3 className="font-serif-editorial text-[14.5px] sm:text-[15px] xl:text-base font-bold text-[#203744] leading-snug group-hover:text-[#286D8B] transition-colors truncate">
                      {p.title}
                    </h3>
                  </div>
                  <p className="font-sans-modern text-[11.5px] sm:text-xs xl:text-[12.5px] text-[#203744]/80 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </Magnetic>
            ))}
          </div>

          {/* Center Column: Authentic Engineering Visual (Significantly Larger) */}
          <div className="lg:col-span-4 flex justify-center items-center h-full">
            <div className="relative overflow-hidden rounded-2xl bg-[#D5E2E5] border border-[#203744]/15 shadow-2xl aspect-[4/3.4] max-h-[310px] sm:max-h-[350px] xl:max-h-[370px] w-full max-w-[370px] xl:max-w-[400px] interactive-card group">
              <img
                src="/assets/page_11.jpg"
                alt="Workbench with Raspberry Pi, drone frame, and hand tools"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-3.5 left-4 right-4 text-white">
                <span className="font-mono-tech text-[10px] sm:text-[10.5px] uppercase tracking-widest text-[#38bdf8] font-bold block mb-0.5">
                  Applied Bench Mastery
                </span>
                <span className="font-serif-editorial text-xs sm:text-[13px] italic text-white/95 leading-tight block">
                  Real tools, authentic hardware, empirical validation
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Pillars (Enlarged & Prominent) */}
          <div className="lg:col-span-4 flex flex-col gap-2.5 sm:gap-3">
            {PILLARS.slice(3, 6).map((p) => (
              <Magnetic key={p.title} strength={0.12}>
                <div className="p-3 sm:p-3.5 xl:p-4 rounded-xl bg-white/95 hover:bg-white border border-[#203744]/12 hover:border-[#398BB0]/40 transition-all duration-300 shadow-2xs group interactive-card">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="p-1.5 rounded-lg bg-[#DFE6E7]/80 group-hover:bg-[#398BB0]/15 transition-colors shrink-0">
                      {p.icon}
                    </div>
                    <h3 className="font-serif-editorial text-[14.5px] sm:text-[15px] xl:text-base font-bold text-[#203744] leading-snug group-hover:text-[#286D8B] transition-colors truncate">
                      {p.title}
                    </h3>
                  </div>
                  <p className="font-sans-modern text-[11.5px] sm:text-xs xl:text-[12.5px] text-[#203744]/80 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </Magnetic>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
