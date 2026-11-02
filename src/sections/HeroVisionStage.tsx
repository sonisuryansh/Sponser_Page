import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowUpRight, Globe } from 'lucide-react';
import { Magnetic } from '../components/motion/Magnetic';
import { FloatingParticles } from '../components/motion/FloatingParticles';
import { AnimatedCounter } from '../components/motion/AnimatedCounter';
import { LineReveal } from '../components/motion/LineReveal';
import { WordSplitReveal } from '../components/motion/WordSplitReveal';

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    num: '01',
    title: 'Hands-on Learning',
    summary: 'Direct building over passive theory',
    duration: '04 WEEKS / DIRECT BENCH',
  },
  {
    num: '02',
    title: 'Problem-Solving',
    summary: 'Deconstruct, prototype, and test',
    duration: '06 WEEKS / ITERATION',
  },
  {
    num: '03',
    title: 'Creativity & Innovation',
    summary: 'From ideas to working models',
    duration: '08 WEEKS / PROTOTYPING',
  },
  {
    num: '04',
    title: 'Responsible Tech',
    summary: 'Safety, privacy, and digital ethics',
    duration: '04 WEEKS / AUDIT & SAFETY',
  },
  {
    num: '05',
    title: 'Continuous Improvement',
    summary: 'Embracing failure as iterative learning',
    duration: 'CONTINUOUS / MASTERY LOOP',
  },
];

interface HeroVisionStageProps {
  onSlideChange?: (index: number) => void;
}

export const HeroVisionStage: React.FC<HeroVisionStageProps> = ({ onSlideChange }) => {
  const stageRef = useRef<HTMLDivElement>(null);

  // Scene 1: Hero Elements
  const heroSceneRef = useRef<HTMLDivElement>(null);
  const heroTextBoxRef = useRef<HTMLDivElement>(null);
  const heroSocialRef = useRef<HTMLDivElement>(null);
  const heroStrapsRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);

  // Scene 2: Aim & Vision Elements
  const aimSceneRef = useRef<HTMLDivElement>(null);
  const aimHeadlineRef = useRef<HTMLHeadingElement>(null);
  const aimImgContainerRef = useRef<HTMLDivElement>(null);
  const aimImgRef = useRef<HTMLImageElement>(null);
  const aimCopyRef = useRef<HTMLDivElement>(null);

  // Scene 3: Mission & Values Elements
  const missionSceneRef = useRef<HTMLDivElement>(null);
  const missionHeadlineRef = useRef<HTMLHeadingElement>(null);
  const missionListRef = useRef<HTMLDivElement>(null);
  const missionImgContainerRef = useRef<HTMLDivElement>(null);
  const missionImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Set initial explicit scene states
      gsap.set(heroSceneRef.current, { autoAlpha: 1 });
      gsap.set(heroImgRef.current, { scale: 1.04, yPercent: 0 });
      gsap.set(aimSceneRef.current, { autoAlpha: 0, scale: 0.96 });
      gsap.set(missionSceneRef.current, { autoAlpha: 0, scale: 0.96 });

      // MASTER SCROLLTRIGGER TIMELINE FOR ACT 1 (HERO -> AIM & VISION -> MISSION & VALUES)
      const tl = gsap.timeline({
        id: 'hero-vision-pin',
        scrollTrigger: {
          id: 'hero-vision-pin',
          trigger: stage,
          start: 'top top',
          end: () => `+=${window.innerHeight * 6}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.75,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (self.progress < 0.33) {
              onSlideChange?.(0);
            } else if (self.progress < 0.67) {
              onSlideChange?.(1);
            } else {
              onSlideChange?.(2);
            }
          },
        },
      });

      // =======================================================================
      // CHAPTER 01: HERO (0.0 to 2.6)
      // Photograph scales gently 1.04 -> 1.08 & drifts up 3%. Type lifts 40px & fades.
      // =======================================================================
      tl.fromTo(
        heroImgRef.current,
        { scale: 1.04, yPercent: 0 },
        { scale: 1.09, yPercent: -3, duration: 2.2, ease: 'none' },
        0
      );

      tl.to(
        heroTextBoxRef.current,
        {
          y: -40,
          opacity: 0,
          duration: 1.2,
          ease: 'power2.inOut',
        },
        1.3
      );

      tl.to(
        heroSocialRef.current,
        {
          opacity: 0,
          y: 15,
          duration: 1.0,
          ease: 'power2.inOut',
        },
        1.3
      );

      tl.to(
        heroStrapsRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 1.0,
          ease: 'power2.inOut',
        },
        1.3
      );

      tl.to(
        heroBgRef.current,
        {
          opacity: 0.18,
          duration: 1.1,
          ease: 'power2.inOut',
        },
        1.5
      );

      tl.set(heroSceneRef.current, { autoAlpha: 0 }, 2.6);

      // =======================================================================
      // CHAPTER 02: AIM & VISION (2.3 to 6.0)
      // Pristine 3-Column Editorial Spread (Zero overlapping text clashes)
      // =======================================================================
      tl.to(
        aimSceneRef.current,
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        2.3
      );

      tl.fromTo(
        aimHeadlineRef.current,
        { yPercent: 30, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        2.7
      );

      tl.fromTo(
        aimImgRef.current,
        { scale: 1.14 },
        { scale: 1.0, duration: 1.4, ease: 'none' },
        2.5
      );

      tl.fromTo(
        aimCopyRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        2.9
      );

      // Aim & Vision Exit (5.2 to 6.0) - cleanly leaves before Scene 3 enters
      tl.to(
        aimSceneRef.current,
        {
          autoAlpha: 0,
          scale: 0.95,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        5.2
      );

      tl.set(aimSceneRef.current, { autoAlpha: 0 }, 6.0);

      // =======================================================================
      // CHAPTER 03: MISSION & VALUES (6.1 to 10.0)
      // Cohesive Mineral Background with Crisp, Fully-Legible Interactive Values
      // =======================================================================
      tl.to(
        missionSceneRef.current,
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        6.1
      );

      tl.fromTo(
        missionHeadlineRef.current,
        { yPercent: 25, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        6.4
      );

      tl.fromTo(
        missionImgRef.current,
        { scale: 1.08 },
        { scale: 1.00, duration: 2.6, ease: 'none' },
        6.3
      );

      // Settle and hold Chapter 03 until end of pin
      tl.to({}, { duration: 1.6 }, 8.4);
    }, stage);

    return () => ctx.revert();
  }, [onSlideChange]);

  return (
    <div
      ref={stageRef}
      id="stage-hero-vision"
      className="relative w-full h-screen overflow-hidden bg-[#DFE6E7] select-none"
    >
      {/* =========================================================================
          SCENE 01: HERO (MEDHAARC LAB - CLEAN EDITORIAL TECH IDENTITY)
          ========================================================================= */}
      <div
        ref={heroSceneRef}
        id="slide-1"
        data-slide-index="0"
        style={{ opacity: 1, visibility: 'visible' }}
        className="absolute inset-0 w-full h-full z-10 overflow-hidden bg-[#0A0D10] flex flex-col items-center justify-center px-4 sm:px-8 py-10"
      >
        {/* Fullscreen Hero Background Image with Contrast Overlay & Particles */}
        <div ref={heroBgRef} className="absolute inset-0 w-full h-full overflow-hidden will-change-transform">
          <img
            ref={heroImgRef}
            src="/assets/medhaarc_hero_drone.jpg"
            alt="MedhaArc Autonomous Flight & Robotics Platform"
            className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.10] will-change-transform"
          />
          {/* Radial & Cinematic Vignette Overlay Gradient */}
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/75 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none" />

          {/* Floating cinematic dust specks */}
          <FloatingParticles count={24} color="rgba(57, 139, 176, 0.45)" />
        </div>

        {/* Centered Hero Content Box */}
        <div
          ref={heroTextBoxRef}
          className="relative z-20 max-w-4xl w-full mx-auto text-center flex flex-col items-center justify-center my-auto will-change-transform"
        >
          {/* Refined Brand Eyebrow Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-2.5 sm:mb-3 shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
            <span className="font-mono-tech text-[10.5px] sm:text-xs tracking-[0.2em] text-[#38bdf8] uppercase font-bold">
              Technology, Shaped By Curiosity
            </span>
          </div>

          {/* Eyebrow: WE ARE */}
          <p className="font-mono-tech font-bold text-xs sm:text-sm text-white/80 tracking-[0.22em] leading-none mb-1.5 sm:mb-2 uppercase drop-shadow-md">
            WE ARE
          </p>

          {/* Poster Wordmark: MedhaArc Lab */}
          <h1
            className="animated-hero-text font-didone-bodoni font-black text-center select-none uppercase drop-shadow-2xl leading-[0.88] tracking-[-0.04em]"
            style={{
              fontSize: 'min(clamp(3.5rem, 13vw, 7.5rem), calc(88vw / (12 * 0.60)))',
              whiteSpace: 'nowrap',
            }}
          >
            MEDHAARC LAB
          </h1>

          {/* Subtitle: 38ms Stagger Word Split */}
          <div className="mt-2.5 sm:mt-3 text-center">
            <WordSplitReveal
              text="Next-Generation K-12 Hands-On Innovation Ecosystem"
              className="font-mono-tech text-xs sm:text-sm text-white/90 tracking-[0.16em] uppercase drop-shadow-md"
              staggerMs={38}
              baseDelayMs={200}
            />
          </div>

          {/* Explanatory description centered */}
          <p className="text-white/80 font-sans-modern text-xs sm:text-sm max-w-lg mx-auto leading-relaxed mt-2.5 sm:mt-3 drop-shadow text-center">
            Explore Our Technology Curriculum &amp; Innovative School Lab Experiences Here.
          </p>

          {/* Action Row with Magnetic Buttons */}
          <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Magnetic strength={0.3}>
              <button
                onClick={() => {
                  document.querySelector('#slide-4')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex h-12 w-72 sm:w-80 items-center justify-center gap-2 text-white border border-white px-5 sm:px-6 font-sans-modern font-semibold text-xs sm:text-sm tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-md cursor-pointer"
              >
                Explore Lab Curriculum
              </button>
            </Magnetic>

            <Magnetic strength={0.3}>
              <button
                onClick={() => {
                  document.querySelector('#slide-15')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex h-12 w-72 sm:w-80 items-center justify-center gap-2 text-white border border-white px-5 sm:px-6 font-sans-modern font-semibold text-xs sm:text-sm tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-md cursor-pointer"
              >
                <span>Connect With Us</span>
                <span className="text-sm sm:text-base leading-none">&#x27F6;</span>
              </button>
            </Magnetic>
          </div>

          {/* Social Links Directly Underneath in Center */}
          <div
            ref={heroSocialRef}
            className="mt-6 sm:mt-7 flex items-center justify-center gap-4 sm:gap-5 will-change-transform"
          >
            {/* Globe / Web */}
            <Magnetic strength={0.4}>
              <a
                href="https://www.medhaarc.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MedhaArc Official Website"
                title="MedhaArc Official Website"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/60 hover:border-white flex items-center justify-center text-white/90 hover:text-white bg-black/40 backdrop-blur-sm hover:scale-110 hover:bg-white/15 transition-all duration-300 shadow-lg"
              >
                <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </Magnetic>

            {/* LinkedIn */}
            <Magnetic strength={0.4}>
              <a
                href="https://www.linkedin.com/company/medhaarc/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MedhaArc on LinkedIn"
                title="LinkedIn"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/60 hover:border-white flex items-center justify-center text-white/90 hover:text-white bg-black/40 backdrop-blur-sm hover:scale-110 hover:bg-white/15 transition-all duration-300 shadow-lg"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 10H5.67v8h2.67v-8Zm-1.34-1.1a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1ZM18.33 13.42c0-2.41-1.28-3.54-2.99-3.54a2.58 2.58 0 0 0-2.32 1.28V10h-2.67v8h2.67v-4.2c0-1.1.21-2.17 1.58-2.17 1.35 0 1.37 1.26 1.37 2.24V18h2.67l-.31-4.58Z" />
                </svg>
              </a>
            </Magnetic>

            {/* Instagram */}
            <Magnetic strength={0.4}>
              <a
                href="https://www.instagram.com/medhaarc/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MedhaArc on Instagram"
                title="Instagram"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/60 hover:border-white flex items-center justify-center text-white/90 hover:text-white bg-black/40 backdrop-blur-sm hover:scale-110 hover:bg-white/15 transition-all duration-300 shadow-lg"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="18" cy="6" r="0.8" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Three Mono Straps Pinned Across Base */}
        <div
          ref={heroStrapsRef}
          className="absolute bottom-5 left-4 right-4 sm:left-8 sm:right-8 z-30 flex flex-wrap items-center justify-between gap-3 pointer-events-none"
        >
          <div
            data-rev
            style={{ '--d': 60 } as React.CSSProperties}
            className="font-mono-tech text-[10.5px] uppercase tracking-[0.18em] text-white/90 bg-[#0A0D10]/80 backdrop-blur-md px-3.5 py-1.5 border border-white/15 shadow-lg pointer-events-auto"
          >
            01 // K-12 STEM ECOSYSTEM
          </div>
          <div
            data-rev
            style={{ '--d': 120 } as React.CSSProperties}
            className="font-mono-tech text-[10.5px] uppercase tracking-[0.18em] text-white/90 bg-[#0A0D10]/80 backdrop-blur-md px-3.5 py-1.5 border border-white/15 shadow-lg hidden sm:block pointer-events-auto"
          >
            02 // 4 CONNECTED DOMAINS
          </div>
          <div
            data-rev
            style={{ '--d': 180 } as React.CSSProperties}
            className="font-mono-tech text-[10.5px] uppercase tracking-[0.18em] text-white/90 bg-[#0A0D10]/80 backdrop-blur-md px-3.5 py-1.5 border border-white/15 shadow-lg pointer-events-auto"
          >
            03 // BENCH-TO-SYSTEM METHODOLOGY
          </div>
        </div>
      </div>

      {/* =========================================================================
          SCENE 02: AIM & VISION (PRISTINE 3-COLUMN EDITORIAL SPREAD)
          ========================================================================= */}
      <div
        ref={aimSceneRef}
        id="slide-2"
        data-slide-index="1"
        style={{ opacity: 0, visibility: 'hidden' }}
        className="absolute inset-0 w-full h-full z-20 overflow-hidden bg-[#DFE6E7] tech-subtle-grid flex flex-col justify-center px-4 sm:px-8 lg:px-12 xl:px-16 pt-8 pb-6 will-change-transform"
      >
        <div className="max-w-[1560px] 2xl:max-w-[1680px] mx-auto w-full relative z-10">
          {/* Top Index Marker */}
          <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-[#1C2833]/15 gap-4">
            <div className="flex items-center gap-3 shrink-0">
              <span className="font-mono-tech text-xs sm:text-sm tracking-widest uppercase text-[#398BB0] font-bold">
                Strategic Focus
              </span>
              <span className="w-8 h-[1px] bg-[#1C2833]/20" />
              <span className="font-mono-tech text-xs sm:text-sm tracking-wider uppercase text-[#1C2833]/70 font-medium">
                Aim &amp; Vision
              </span>
            </div>

            {/* Center Editorial Sentence in Clean Serif Italic */}
            <p className="hidden md:block font-serif-editorial text-sm sm:text-[15px] italic text-[#1C2833]/85 font-normal tracking-tight text-center px-4">
              "Transforming passive consumers of technology into active creators, thinkers, and innovators."
            </p>

            <Magnetic strength={0.25}>
              <div className="shimmer-badge hidden sm:flex items-center gap-2 bg-white/85 border border-[#1C2833]/15 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-mono-tech text-[#1C2833] font-medium shadow-xs cursor-pointer shrink-0">
                <Sparkles className="w-4 h-4 text-[#398BB0]" />
                <span>4 Connected Domains • Hands-On Labs</span>
              </div>
            </Magnetic>
          </div>

          {/* 3-Column Editorial Spread */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center">
            {/* Left: Headline with Animated Metric Chips */}
            <div className="lg:col-span-3 xl:col-span-3">
              <h2
                ref={aimHeadlineRef}
                className="font-didone-bodoni text-2xl sm:text-3xl lg:text-[34px] xl:text-[36px] font-bold text-[#0f3a63] tracking-tight leading-tight"
              >
                Our aim<br />
                <span className="italic font-semibold text-[#0284c7]">is to demystify tech</span>
              </h2>
              <div className="mt-3 font-mono-tech text-xs sm:text-sm text-[#1C2833]/65 uppercase tracking-widest font-semibold">
                Core Objective
              </div>

              {/* Metric Indicators */}
              <div className="mt-5 flex items-center gap-3 flex-wrap">
                <div className="px-3.5 py-1.5 rounded-xl bg-white/90 border border-[#1C2833]/12 shadow-xs interactive-card">
                  <span className="font-serif-editorial text-lg sm:text-xl font-bold text-[#398BB0]">
                    <AnimatedCounter to={4} suffix=" Pillars" />
                  </span>
                </div>
                <div className="px-3.5 py-1.5 rounded-xl bg-white/90 border border-[#1C2833]/12 shadow-xs interactive-card">
                  <span className="font-serif-editorial text-lg sm:text-xl font-bold text-[#286D8B]">
                    <AnimatedCounter to={100} suffix="% Practical" />
                  </span>
                </div>
              </div>
            </div>

            {/* Center: Framed Authentic Laboratory Photo */}
            <div className="lg:col-span-5 xl:col-span-5 flex justify-center">
              <div
                ref={aimImgContainerRef}
                className="interactive-card relative w-full max-w-[340px] sm:max-w-[410px] lg:max-w-[460px] aspect-[4/3.1] overflow-hidden rounded-2xl bg-[#D5E2E5] border border-[#1C2833]/15 shadow-2xl will-change-transform"
              >
                <img
                  ref={aimImgRef}
                  src="/assets/page_10.jpg"
                  alt="Students exploring robotics circuitry"
                  className="w-full h-full object-cover object-[center_35%] will-change-transform grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                
                {/* Photo Caption Overlay */}
                <div className="absolute bottom-3 sm:bottom-4 left-4 right-4 text-white">
                  <span className="font-mono-tech text-[10.5px] sm:text-xs uppercase tracking-widest text-[#38bdf8] font-bold block mb-0.5">
                    School Laboratory Session
                  </span>
                  <span className="font-serif-editorial text-xs sm:text-sm italic font-light text-white/95 leading-snug block">
                    Active circuit, sensor calibration &amp; microcontroller exploration
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Expansive Editorial Statement & Vision */}
            <div ref={aimCopyRef} className="lg:col-span-4 xl:col-span-4 space-y-3.5 sm:space-y-4">
              <div className="font-sans-modern text-sm sm:text-base text-[#1C2833]/85 max-w-md leading-relaxed border-l-2 border-[#398BB0] pl-3.5">
                Curriculum and mentorship rooted in curiosity, precision, and hands-on excellence.
              </div>

              <p className="font-didone-bodoni text-2xl sm:text-3xl text-[#1C2833] font-normal leading-[1.2] tracking-tight">
                Making technology understandable through practical building across hardware, software, and sensors.
              </p>

              {/* Self-drawing Line Reveal */}
              <LineReveal className="h-[1px] w-full bg-[#1C2833]/15 my-2" />

              <div>
                <span className="font-mono-tech text-xs uppercase tracking-widest text-[#286D8B] font-bold block mb-1">
                  Our Vision:
                </span>
                <p className="font-sans-modern text-sm sm:text-base text-[#1C2833]/90 leading-relaxed font-normal">
                  Empowering students as confident creators, problem-solvers, and adaptive innovators.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SCENE 03: MISSION & VALUES (CLEAN COHESIVE GROUND & FULLY LEGIBLE VALUES)
          ========================================================================= */}
      <div
        ref={missionSceneRef}
        id="slide-3"
        data-slide-index="2"
        style={{ opacity: 0, visibility: 'hidden' }}
        className="absolute inset-0 w-full h-full z-30 overflow-hidden bg-[#DFE6E7] text-[#203744] tech-subtle-grid flex flex-col justify-center px-4 sm:px-8 lg:px-12 xl:px-16 py-6 will-change-transform"
      >
        <div className="max-w-[1560px] 2xl:max-w-[1680px] mx-auto w-full my-auto">
          {/* Top Index Marker */}
          <div className="mb-5 sm:mb-7 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 border-b border-[#1C2833]/12 pb-3">
            <div>
              <p className="font-sans-modern text-sm sm:text-base text-[#1C2833]/75 leading-relaxed">
                Students learn technology by making it, testing it, and improving it.
              </p>
            </div>
            <span className="font-mono-tech text-xs uppercase tracking-wider text-[#1C2833]/60 font-semibold shrink-0">
              Learn by building
            </span>
          </div>

          {/* 2-Column Spread: Left (Interactive Values List) and Right (Framed Hardware Still) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-12 items-center">
            
            {/* Left Column: Heading & Fully Legible Values List */}
            <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center">
              {/* Mission Headline */}
              <div className="mb-4 sm:mb-5">
                <h2
                  ref={missionHeadlineRef}
                  className="font-didone-bodoni text-2xl sm:text-3xl lg:text-[34px] xl:text-[36px] font-bold text-[#3b2063] tracking-tight leading-tight"
                >
                  Connecting fundamental concepts with{' '}
                  <span className="italic font-semibold text-[#7c3aed]">real applications.</span>
                </h2>
              </div>

              {/* Values List: Clean Editorial Typography with Natural Mouse Hover */}
              <div ref={missionListRef} className="divide-y divide-[#1C2833]/12">
                {VALUES.map((val) => (
                  <Magnetic key={val.num} strength={0.15} className="w-full">
                    <div
                      className="value-item py-2.5 sm:py-3 group flex items-center justify-between gap-3 sm:gap-4 transition-all duration-300 cursor-pointer rounded-xl px-3 -mx-3 hover:bg-white/40"
                    >
                      <div className="flex items-baseline gap-2.5 sm:gap-3.5 flex-wrap">
                        <span className="font-mono-tech text-xs sm:text-sm font-bold text-[#398BB0] group-hover:text-[#286D8B] transition-colors">
                          {val.num}
                        </span>
                        <h3 className="font-serif-editorial text-base sm:text-lg lg:text-xl font-bold text-[#1C2833] group-hover:text-[#286D8B] transition-colors">
                          {val.title}
                        </h3>
                        <span className="text-xs text-[#1C2833]/30 hidden sm:inline">•</span>
                        <span className="font-sans-modern text-xs sm:text-sm text-[#1C2833]/70 font-medium group-hover:text-[#1C2833]/90 transition-colors">
                          {val.summary}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2.5 shrink-0">
                        <span className="font-mono-tech text-[10px] uppercase tracking-[0.14em] font-medium text-[#1C2833]/45 group-hover:text-[#286D8B] transition-colors hidden sm:inline">
                          {val.duration}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#1C2833]/35 group-hover:text-[#286D8B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                      </div>
                    </div>
                  </Magnetic>
                ))}
              </div>
            </div>

            {/* Right Column: Hardware Photo with Sleek Glassmorphism Badge */}
            <div className="lg:col-span-5 xl:col-span-6 flex justify-center items-center">
              <div
                ref={missionImgContainerRef}
                className="interactive-card relative overflow-hidden rounded-2xl bg-[#DFE6E7] border border-[#1C2833]/20 shadow-xl h-[330px] sm:h-[360px] lg:h-[380px] xl:h-[400px] w-full group will-change-transform"
              >
                <img
                  ref={missionImgRef}
                  src="/assets/students_robotics.jpg"
                  alt="Students building, wiring and programming real microcontrollers"
                  className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                {/* Sleek Glassmorphic Bench Pill Badge */}
                <div className="absolute bottom-4 left-4 z-20 bg-black/75 backdrop-blur-md text-white border border-white/20 font-mono-tech text-[10px] sm:text-[10.5px] uppercase tracking-[0.16em] px-3.5 py-1.5 font-bold shadow-lg rounded-full flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
                  <span>ACTIVE BENCH // 05 PILLARS</span>
                </div>

                <div className="absolute bottom-4 right-4 text-white text-right">
                  <span className="font-mono-tech text-[10px] text-white/90 bg-white/15 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/20 font-medium shrink-0">
                    Direct Prototyping
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Three Base Pillars */}
          <div className="mt-6 sm:mt-7 pt-3 border-t border-[#1C2833]/12 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
            {[
              ['01', 'Explore an idea'],
              ['02', 'Build a prototype'],
              ['03', 'Test and improve'],
            ].map(([number, step]) => (
              <div key={number} className="flex items-center gap-2.5">
                <span className="font-mono-tech text-[10px] sm:text-xs font-bold text-[#398BB0]">{number}</span>
                <span className="font-serif-editorial text-sm sm:text-base text-[#1C2833]/80">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroVisionStage;
