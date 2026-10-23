import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const AimVisionSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftHeadingRef = useRef<HTMLHeadingElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftHeading = leftHeadingRef.current;
    const rightText = rightTextRef.current;
    const img = imageRef.current;
    const imgContainer = imageContainerRef.current;
    if (!section || !leftHeading || !rightText || !img || !imgContainer) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Text reveals from bottom
      gsap.fromTo(
        [leftHeading, rightText],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );

      // 2. Center portrait image parallax scale
      gsap.fromTo(
        img,
        { scale: 1.15, y: -20 },
        {
          scale: 1.0,
          y: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: imgContainer,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="slide-2"
      data-slide-index="1"
      ref={sectionRef}
      className="relative min-h-screen py-28 sm:py-36 px-8 sm:px-14 lg:px-20 bg-[#DFE6E7] border-b border-[#1C2833]/10 flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Top Minimal Chapter Index & Pill (like frame_002_t3.0s) */}
        <div className="flex items-center justify-between pb-8 mb-12 border-b border-[#1C2833]/10 gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-mono-tech text-xs tracking-widest uppercase text-[#398BB0] font-semibold">
              02 / 15
            </span>
            <span className="w-8 h-[1px] bg-[#1C2833]/20" />
            <span className="font-mono-tech text-xs tracking-wider uppercase text-[#1C2833]/60">
              Aim & Vision
            </span>
          </div>

          {/* Center Editorial Sentence Filling the Empty Top Space */}
          <p className="hidden md:block font-serif-editorial text-sm sm:text-[15px] italic text-[#1C2833]/85 font-normal tracking-tight text-center px-4">
            "Transforming passive consumers of technology into active creators, thinkers, and innovators."
          </p>

          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 bg-[#D5E2E5]/70 border border-[#1C2833]/10 px-3.5 py-1.5 rounded-full text-xs font-mono-tech text-[#1C2833]">
              <Sparkles className="w-3.5 h-3.5 text-[#398BB0]" />
              <span>4 Connected Domains • Hands-On Labs</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            EDITORIAL SPREAD COMPOSITION (Matching frame_002_t3.0s of yy.mp4):
            Left: "Our aim is" (Massive Serif)
            Center: High-Contrast Vertical Portrait Image
            Right: Expansive Multi-Line Statement
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center mb-16">
          
          {/* Left Column: Massive Headline Prefix (3 cols) */}
          <div className="lg:col-span-3 xl:col-span-3">
            <h2
              ref={leftHeadingRef}
              className="font-serif-editorial text-5xl sm:text-7xl lg:text-8xl font-normal text-[#1C2833] tracking-tighter leading-[0.95]"
            >
              Our aim<br />
              <span className="italic font-light text-[#286D8B]">is</span>
            </h2>
            <div className="mt-6 font-mono-tech text-xs text-[#1C2833]/50 uppercase tracking-widest">
              Core Objective
            </div>
          </div>

          {/* Center Column: Elegant Vertical Framed Photograph (5 cols) */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center">
            <div
              ref={imageContainerRef}
              className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[430px] xl:max-w-[460px] aspect-[3/3.8] overflow-hidden rounded-2xl bg-[#D5E2E5] border border-[#1C2833]/15 shadow-2xl"
            >
              <img
                ref={imageRef}
                src="/assets/page_10.jpg"
                alt="Students building educational robotics rover in school laboratory"
                className="w-full h-full object-cover will-change-transform grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="font-mono-tech text-[10.5px] uppercase tracking-widest text-[#38bdf8] block mb-1">
                  School Laboratory Session
                </span>
                <span className="font-serif-editorial text-sm italic font-light text-white/90">
                  Active circuit and microcontroller exploration
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Expansive Statement & Top Meta (4 cols) */}
          <div ref={rightTextRef} className="lg:col-span-4 xl:col-span-4 space-y-5">
            <div className="font-sans-modern text-xs text-[#1C2833]/60 max-w-sm leading-relaxed border-l-2 border-[#398BB0] pl-3">
              With structured curriculum and dedicated mentors, our program delivers technology education rooted in curiosity, precision, and excellence.
            </div>

            <p className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl text-[#1C2833] font-normal leading-[1.15] tracking-tight">
              to make technology understandable through practical, age-appropriate learning that demystifies how modern hardware, software, and sensors interact.
            </p>

            <div className="pt-4 border-t border-[#1C2833]/10">
              <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#286D8B] font-semibold block mb-1">
                Our Vision:
              </span>
              <p className="font-sans-modern text-sm text-[#1C2833]/80 leading-relaxed font-light">
                To help students become confident problem-solvers, creators, and responsible users of technology equipped to adapt to rapid technological transformation.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Restrained Grounding Banner */}
        <div className="pt-6 border-t border-[#1C2833]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono-tech text-[#1C2833]/60">
          <span>The Core Transition: From consuming technology to building it.</span>
          <span className="text-[#398BB0]">Hands-on Hardware • Embedded Coding • Empirical Validation</span>
        </div>

      </div>
    </section>
  );
};
