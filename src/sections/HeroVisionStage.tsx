import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowUpRight, Globe, Send } from 'lucide-react';
import { Magnetic } from '../components/motion/Magnetic';
import { FloatingParticles } from '../components/motion/FloatingParticles';
import { AnimatedCounter } from '../components/motion/AnimatedCounter';
import { LineReveal } from '../components/motion/LineReveal';

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

interface HeroVisionStageProps {
  onSlideChange?: (index: number) => void;
}

export const HeroVisionStage: React.FC<HeroVisionStageProps> = ({ onSlideChange }) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeValueIndex, setActiveValueIndex] = useState<number>(0);

  // Scene 1: Hero Elements (Matching reference repo animated portfolio layout)
  const heroSceneRef = useRef<HTMLDivElement>(null);
  const heroTextBoxRef = useRef<HTMLDivElement>(null);
  const heroSocialRef = useRef<HTMLDivElement>(null);
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
      gsap.set(aimSceneRef.current, { autoAlpha: 0, scale: 0.94, clipPath: 'inset(8% 6% 8% 6%)' });
      gsap.set(missionSceneRef.current, { autoAlpha: 0, scale: 0.94, clipPath: 'inset(8% 6% 8% 6%)' });

      // MASTER SCROLLTRIGGER TIMELINE FOR ACT 1 (HERO -> AIM & VISION -> MISSION & VALUES)
      // Total duration = 10.0s mapped across 3600px of scroll
      const tl = gsap.timeline({
        id: 'hero-vision-pin',
        scrollTrigger: {
          id: 'hero-vision-pin',
          trigger: stage,
          start: 'top top',
          end: '+=3600',
          pin: true,
          pinSpacing: true,
          scrub: 0.7,
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
      // CHAPTER 01: HERO (0.0 to 2.8)
      // 0.0 to 1.5: Stillness reading window
      // 1.5 to 2.8: Hero transitions out smoothly into Scene 02
      // =======================================================================
      tl.to(
        [heroTextBoxRef.current, heroSocialRef.current],
        {
          yPercent: -18,
          opacity: 0,
          duration: 1.1,
          ease: 'power2.inOut',
        },
        1.5
      );

      tl.to(
        heroBgRef.current,
        {
          scale: 1.08,
          opacity: 0.25,
          duration: 1.2,
          ease: 'power2.inOut',
        },
        1.6
      );

      tl.set(heroSceneRef.current, { autoAlpha: 0 }, 2.8);

      // =======================================================================
      // CHAPTER 02: AIM & VISION (2.4 to 6.6)
      // 2.4 to 3.6: Enters via clip mask and scale
      // 3.6 to 5.4: Reading plateau
      // 5.4 to 6.6: Exits
      // =======================================================================
      tl.to(
        aimSceneRef.current,
        {
          autoAlpha: 1,
          scale: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.1,
          ease: 'power2.out',
        },
        2.4
      );

      tl.fromTo(
        aimHeadlineRef.current,
        { yPercent: 40, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, ease: 'power2.out' },
        2.7
      );

      tl.fromTo(
        aimImgRef.current,
        { scale: 1.18 },
        { scale: 1.0, duration: 1.2, ease: 'none' },
        2.5
      );

      tl.fromTo(
        aimCopyRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out' },
        2.9
      );

      // Aim & Vision Exit (5.4 to 6.6)
      tl.to(
        [aimHeadlineRef.current, aimCopyRef.current],
        {
          xPercent: -25,
          opacity: 0,
          duration: 1.0,
          ease: 'power2.in',
        },
        5.4
      );

      tl.to(
        aimImgContainerRef.current,
        {
          scale: 0.85,
          opacity: 0,
          duration: 1.0,
          ease: 'power2.in',
        },
        5.5
      );

      tl.set(aimSceneRef.current, { autoAlpha: 0 }, 6.6);

      // =======================================================================
      // CHAPTER 03: MISSION & VALUES (6.2 to 10.0)
      // 6.2 to 7.4: Enters
      // 7.4 to 10.0: Holds in full clarity before flowing into Ecosystem
      // =======================================================================
      tl.to(
        missionSceneRef.current,
        {
          autoAlpha: 1,
          scale: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.1,
          ease: 'power2.out',
        },
        6.2
      );

      tl.fromTo(
        missionHeadlineRef.current,
        { yPercent: 30, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, ease: 'power2.out' },
        6.5
      );

      const listItems = missionListRef.current?.querySelectorAll('.value-item');
      if (listItems && listItems.length > 0) {
        tl.fromTo(
          listItems,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power2.out' },
          6.7
        );
      }

      tl.fromTo(
        missionImgRef.current,
        { scale: 1.15 },
        { scale: 1.0, duration: 1.2, ease: 'none' },
        6.4
      );

      // Settle and hold Chapter 03 in full clarity until the end of the 10.0s timeline
      tl.to({}, { duration: 2.3 }, 7.7);
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
          SCENE 01: HERO (MEDHAARC - EXACT ZAIN-DEV/MAYRA REPO STYLE & MEDHAARC ASSETS)
          ========================================================================= */}
      <div
        ref={heroSceneRef}
        id="slide-1"
        data-slide-index="0"
        className="absolute inset-0 w-full h-full z-10 overflow-hidden bg-[#0A0D10] flex flex-col items-center justify-center px-4 sm:px-8 py-10"
      >
        {/* Fullscreen Hero Background Image with Dual Layer Vignette Gradient & Floating Particles */}
        <div ref={heroBgRef} className="absolute inset-0 w-full h-full overflow-hidden will-change-transform">
          <img
            ref={heroImgRef}
            src="/assets/medhaarc_hero_drone.jpg"
            alt="MedhaArc Autonomous Flight & Robotics Platform"
            className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.08] will-change-transform"
          />
          {/* Radial & Cinematic Vignette Overlay Gradient for high center contrast */}
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/75 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none" />

          {/* Helix-inspired floating cinematic dust specks */}
          <FloatingParticles count={24} color="rgba(57, 139, 176, 0.45)" />
        </div>

        {/* Centered Hero Content Box */}
        <div
          ref={heroTextBoxRef}
          className="relative z-20 max-w-4xl w-full mx-auto text-center flex flex-col items-center justify-center my-auto will-change-transform"
        >
          {/* Eyebrow: WE ARE */}
          <p className="font-sans-modern font-bold text-sm sm:text-base lg:text-lg text-white/90 tracking-widest leading-none mb-1.5 sm:mb-2 uppercase drop-shadow-md">
            WE ARE
          </p>

          {/* Animated Masked Text: MEDHAARC LAB */}
          <h1 className="animated-hero-text font-sans-modern font-black text-[12vw] sm:text-[9vw] lg:text-[88px] xl:text-[98px] leading-[0.92] tracking-tight select-none uppercase drop-shadow-2xl text-center">
            MEDHAARC LAB
          </h1>

          {/* Subtitle: TECHNOLOGY, SHAPED BY CURIOSITY */}
          <h3 className="font-sans-modern font-semibold text-xs sm:text-sm lg:text-base text-white/95 tracking-[0.22em] uppercase mt-2.5 sm:mt-3 drop-shadow-md text-center">
            TECHNOLOGY, SHAPED BY CURIOSITY
          </h3>

          {/* Explanatory description centered */}
          <p className="text-white/80 font-sans-modern text-xs sm:text-sm max-w-lg mx-auto leading-relaxed mt-2.5 sm:mt-3 drop-shadow text-center">
            You can Explore Our Technology Curriculum & Innovative School Lab Experiences Here.
          </p>

          {/* Action Row with Magnetic Buttons Centered */}
          <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Magnetic strength={0.3}>
              <button
                onClick={() => {
                  document.querySelector('#slide-4')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-white border border-white px-5 sm:px-6 py-2.5 sm:py-3 font-sans-modern font-semibold text-xs sm:text-sm tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-md cursor-pointer"
              >
                Explore Lab Curriculum
              </button>
            </Magnetic>

            <Magnetic strength={0.3}>
              <button
                onClick={() => {
                  document.querySelector('#slide-15')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-white border border-white px-5 sm:px-6 py-2.5 sm:py-3 font-sans-modern font-semibold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 hover:bg-white hover:text-black transition-all duration-300 shadow-md cursor-pointer"
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

            {/* Instagram */}
            <Magnetic strength={0.4}>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/60 hover:border-white flex items-center justify-center text-white/90 hover:text-white bg-black/40 backdrop-blur-sm hover:scale-110 hover:bg-white/15 transition-all duration-300 shadow-lg"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white/90"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </Magnetic>

            {/* Telegram / Send Contact */}
            <Magnetic strength={0.4}>
              <a
                href="mailto:contact@medhaarc.com"
                aria-label="Contact MedhaArc"
                title="Email Us"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/60 hover:border-white flex items-center justify-center text-white/90 hover:text-white bg-black/40 backdrop-blur-sm hover:scale-110 hover:bg-white/15 transition-all duration-300 shadow-lg"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SCENE 02: AIM & VISION (Reveals through clip-path and scale)
          ========================================================================= */}
      <div
        ref={aimSceneRef}
        id="slide-2"
        data-slide-index="1"
        className="absolute inset-0 w-full h-full z-20 overflow-hidden bg-[#DFE6E7] tech-subtle-grid flex flex-col justify-center px-4 sm:px-8 lg:px-12 xl:px-16 pt-8 pb-6 will-change-transform"
      >
        <div className="max-w-[1560px] 2xl:max-w-[1680px] mx-auto w-full">
          {/* Top Index Marker */}
          <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-[#1C2833]/15 gap-4">
            <div className="flex items-center gap-3 shrink-0">
              <span className="font-mono-tech text-xs sm:text-sm tracking-widest uppercase text-[#398BB0] font-bold">
                Strategic Focus
              </span>
              <span className="w-8 h-[1px] bg-[#1C2833]/20" />
              <span className="font-mono-tech text-xs sm:text-sm tracking-wider uppercase text-[#1C2833]/70 font-medium">
                Aim & Vision
              </span>
            </div>

            {/* Center Editorial Sentence Filling the Empty Top Space */}
            <p className="hidden md:block font-serif-editorial text-sm sm:text-[15px] italic text-[#1C2833]/85 font-normal tracking-tight text-center px-4">
              "Transforming passive consumers of technology into active creators, thinkers, and innovators."
            </p>

            <Magnetic strength={0.25}>
              <div className="shimmer-badge hidden sm:flex items-center gap-2 bg-white/80 border border-[#1C2833]/15 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-mono-tech text-[#1C2833] font-medium shadow-xs cursor-pointer shrink-0">
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
                className="font-serif-editorial text-5xl sm:text-6xl lg:text-7xl font-normal text-[#1C2833] tracking-tighter leading-[0.98]"
              >
                Our aim<br />
                <span className="italic font-light text-[#286D8B]">is</span>
              </h2>
              <div className="mt-3 font-mono-tech text-xs sm:text-sm text-[#1C2833]/65 uppercase tracking-widest font-semibold">
                Core Objective
              </div>

              {/* Anugrah-inspired Live Metric Indicators */}
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

            {/* Center: Framed Photo - Compressed Vertically to Avoid Portrait Look */}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 sm:bottom-4 left-4 right-4 text-white">
                  <span className="font-mono-tech text-[10.5px] sm:text-xs uppercase tracking-widest text-[#38bdf8] font-bold block mb-0.5">
                    School Laboratory Session
                  </span>
                  <span className="font-serif-editorial text-xs sm:text-sm italic font-light text-white/95 leading-snug block">
                    Active circuit and microcontroller exploration
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Expansive Editorial Statement & Vision */}
            <div ref={aimCopyRef} className="lg:col-span-4 xl:col-span-4 space-y-3.5 sm:space-y-4">
              <div className="font-sans-modern text-sm sm:text-base text-[#1C2833]/85 max-w-md leading-relaxed border-l-2 border-[#398BB0] pl-3.5">
                With structured curriculum and dedicated mentors, our program delivers technology education rooted in curiosity, precision, and excellence.
              </div>

              <p className="font-serif-editorial text-2xl sm:text-3xl text-[#1C2833] font-normal leading-[1.2] tracking-tight">
                to make technology understandable through practical, age-appropriate learning that demystifies how modern hardware, software, and sensors interact.
              </p>

              {/* Self-drawing Line Reveal */}
              <LineReveal className="h-[1px] w-full bg-[#1C2833]/15 my-2" />

              <div>
                <span className="font-mono-tech text-xs uppercase tracking-widest text-[#286D8B] font-bold block mb-1">
                  Our Vision:
                </span>
                <p className="font-sans-modern text-sm sm:text-base text-[#1C2833]/90 leading-relaxed font-normal">
                  To help students become confident problem-solvers, creators, and responsible users of technology equipped to adapt to rapid technological transformation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SCENE 03: MISSION & VALUES (Reveals seamlessly from Aim & Vision)
          ========================================================================= */}
      <div
        ref={missionSceneRef}
        id="slide-3"
        data-slide-index="2"
        className="absolute inset-0 w-full h-full z-30 overflow-hidden bg-[#D5E2E5]/50 tech-subtle-grid flex flex-col justify-center px-4 sm:px-8 lg:px-12 xl:px-16 py-6 will-change-transform"
      >
        <div className="max-w-[1560px] 2xl:max-w-[1680px] mx-auto w-full my-auto">
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 border-b border-[#1C2833]/12 pb-3">
            <div>
              <p className="font-sans-modern text-sm sm:text-base text-[#1C2833]/70 leading-relaxed">
                Students learn technology by making it, testing it, and improving it.
              </p>
            </div>
            <span className="font-mono-tech text-[10px] sm:text-xs uppercase tracking-wider text-[#1C2833]/50 shrink-0">
              Learn by building
            </span>
          </div>

          {/* 2-Column Parallel Spread: Left (Heading + Values List) and Right (Image) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-12 items-center">
            
            {/* Left Column: Heading directly above Values List with zero awkward gap */}
            <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center">
              {/* Mission Headline */}
              <div className="mb-4 sm:mb-5">
                <h2
                  ref={missionHeadlineRef}
                  className="font-serif-editorial text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-normal text-[#1C2833] tracking-tight leading-tight"
                >
                  Connecting fundamental concepts with{' '}
                  <span className="italic font-light text-[#286D8B]">real applications.</span>
                </h2>
              </div>

              {/* Values List */}
              <div ref={missionListRef} className="divide-y divide-[#1C2833]/15">
                {VALUES.map((val, idx) => {
                  const isActive = activeValueIndex === idx;
                  return (
                    <Magnetic key={val.num} strength={0.18} className="w-full">
                      <div
                        onClick={() => setActiveValueIndex(idx)}
                        className={`value-item py-2.5 sm:py-3 first:pt-0 group flex items-center justify-between gap-3 sm:gap-4 transition-all duration-300 cursor-pointer rounded-xl px-2.5 -mx-2.5 ${
                          isActive
                            ? 'bg-[#DFE6E7]/90 shadow-2xs'
                            : 'hover:bg-white/40 hover:translate-x-1.5'
                        }`}
                      >
                        <div className="flex items-baseline gap-2.5 sm:gap-3.5 flex-wrap">
                          <span
                            className={`font-mono-tech text-xs sm:text-sm font-bold transition-colors ${
                              isActive ? 'text-[#286D8B]' : 'text-[#398BB0]'
                            }`}
                          >
                            {val.num}
                          </span>
                          <h3
                            className={`font-serif-editorial text-base sm:text-lg lg:text-xl font-normal transition-colors ${
                              isActive ? 'text-[#286D8B] font-medium' : 'text-[#1C2833] group-hover:text-[#286D8B]'
                            }`}
                          >
                            {val.title}
                          </h3>
                          <span className="text-xs text-[#1C2833]/30 hidden sm:inline">•</span>
                          <span className="font-sans-modern text-xs sm:text-sm text-[#1C2833]/70 font-medium group-hover:text-[#1C2833]/90 transition-colors">
                            {val.summary}
                          </span>
                        </div>
                        <ArrowUpRight
                          className={`w-3.5 h-3.5 transition-all shrink-0 ${
                            isActive
                              ? 'text-[#286D8B] translate-x-0.5 -translate-y-0.5 scale-110'
                              : 'text-[#1C2833]/35 group-hover:text-[#286D8B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                          }`}
                        />
                      </div>
                    </Magnetic>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Grounded, Stable Authentic Hardware Visual (Never changes or flickers on scroll) */}
            <div className="lg:col-span-5 xl:col-span-6 flex justify-center items-center">
              <div
                ref={missionImgContainerRef}
                className="interactive-card relative overflow-hidden rounded-2xl bg-[#DFE6E7] border border-[#1C2833]/20 shadow-xl h-[330px] sm:h-[360px] lg:h-[380px] xl:h-[400px] w-full group"
              >
                <img
                  ref={missionImgRef}
                  src="/assets/students_robotics.jpg"
                  alt="Students building, wiring and programming real microcontrollers"
                  className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-5 right-5 text-white flex items-end justify-between">
                  <div>
                    <span className="font-mono-tech text-[10px] sm:text-xs uppercase tracking-widest text-[#38bdf8] font-bold block mb-0.5">
                      ACTIVE BENCH PROTOTYPING
                    </span>
                    <span className="font-serif-editorial text-xs sm:text-sm lg:text-base italic font-light text-white/95 leading-snug block">
                      Students building, wiring and programming real microcontrollers
                    </span>
                  </div>
                  <span className="font-mono-tech text-[10px] text-white/80 bg-white/15 px-2.5 py-0.5 rounded-full border border-white/20 font-medium shrink-0 ml-2">
                    Core 05 Pillars
                  </span>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-6 sm:mt-8 pt-3 border-t border-[#1C2833]/12 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
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
