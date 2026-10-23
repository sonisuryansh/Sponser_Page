import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ROBOTICS_PILLARS = [
  { name: 'Electronics & Basic Circuits', desc: 'Voltage regulation, power distribution & breadboarding' },
  { name: 'Sensors, Motors & Control', desc: 'Servo angles, DC drivers & threshold calibration' },
  { name: 'Coding & Automation Logic', desc: 'Embedded MicroPython/C++, interrupts & feedback loops' },
  { name: '3D Design & Mechanics', desc: 'CAD modeling, structural gear ratios & kinematics' },
];

const AI_STEPS = [
  { step: '01', title: 'UNDERSTAND', desc: 'Grasp machine logic, debunk AI myths & establish cognitive boundaries' },
  { step: '02', title: 'EXPLORE', desc: 'Interact with trained vision models, spatial embeddings & sensory prompts' },
  { step: '03', title: 'APPLY', desc: 'Feed structured datasets to classify objects and evaluate statistical precision' },
  { step: '04', title: 'BUILD', desc: 'Connect lightweight machine vision models with physical robotic actuation' },
];

const DATA_STAGES = [
  { step: '01', title: 'DATA COLLECTION', desc: 'Harvest real telemetry from sensors and physical test runs' },
  { step: '02', title: 'ANALYSIS', desc: 'Identify patterns, isolate noise, and compute statistical variances' },
  { step: '03', title: 'VISUALISATION', desc: 'Render legible charts that communicate honest, evidence-based stories' },
  { step: '04', title: 'INSIGHTS', desc: 'Synthesize findings to optimize mechanisms and test new hypotheses' },
];

const AERIAL_LABELS = [
  { label: 'PLATFORMS', detail: 'Aerodynamic structures, multi-rotor thrust & payload balance' },
  { label: 'SENSORS', detail: 'IMU accelerometers, barometers & GPS telemetry' },
  { label: 'NAVIGATION', detail: 'Coordinate waypoints, spatial geometry & inertial guidance' },
  { label: 'CONTROL', detail: 'Flight controllers, ESC timing & PID stabilization' },
  { label: 'DATA', detail: 'Multispectral logs, topographical maps & telemetry' },
  { label: 'APPLICATIONS', detail: 'Precision surveying, environmental tracking & disaster relief' },
];

interface TechnologyDomainsStageProps {
  onSlideChange?: (index: number) => void;
}

export const TechnologyDomainsStage: React.FC<TechnologyDomainsStageProps> = ({ onSlideChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scene references
  const roboticsSceneRef = useRef<HTMLDivElement>(null);
  const roboticsHeadlineRef = useRef<HTMLHeadingElement>(null);
  const roboticsImgRef = useRef<HTMLImageElement>(null);

  const aiSceneRef = useRef<HTMLDivElement>(null);
  const aiHeadlineRef = useRef<HTMLHeadingElement>(null);
  const aiImgRef = useRef<HTMLImageElement>(null);

  const dataSceneRef = useRef<HTMLDivElement>(null);
  const [activeDataStage, setActiveDataStage] = useState(0);

  const aerialSceneRef = useRef<HTMLDivElement>(null);
  const aerialHeadlineRef = useRef<HTMLHeadingElement>(null);
  const aerialImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Set initial explicit scene states
      gsap.set(roboticsSceneRef.current, { autoAlpha: 1 });
      gsap.set(aiSceneRef.current, { autoAlpha: 0, scale: 0.94, clipPath: 'inset(8% 6% 8% 6%)' });
      gsap.set(dataSceneRef.current, { autoAlpha: 0, scale: 0.94, clipPath: 'inset(8% 6% 8% 6%)' });
      gsap.set(aerialSceneRef.current, { autoAlpha: 0, scale: 0.94, clipPath: 'inset(8% 6% 8% 6%)' });

      // MASTER DOMAINS PINNED TIMELINE (Robotics -> AI -> Data Analytics -> Aerial Systems)
      // Total duration = 12.0s mapped across 4400px of scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=4400',
          pin: true,
          pinSpacing: true,
          scrub: 0.7,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (self.progress < 0.25) {
              onSlideChange?.(4); // Robotics
            } else if (self.progress < 0.50) {
              onSlideChange?.(5); // AI
            } else if (self.progress < 0.75) {
              onSlideChange?.(6); // Data
            } else {
              onSlideChange?.(7); // Aerial
            }

            // Sync data analytics step
            if (self.progress >= 0.50 && self.progress < 0.75) {
              const dataProgress = (self.progress - 0.50) / 0.25;
              const step = Math.min(3, Math.floor(dataProgress * 4));
              setActiveDataStage(step);
            }
          },
        },
      });

      // -----------------------------------------------------------------------
      // CHAPTER 05: ROBOTICS & AUTOMATION (0.0 to 3.0)
      // 0.0 to 1.8: Held still in full clarity
      // 1.8 to 3.0: Exits
      // -----------------------------------------------------------------------
      tl.to(
        roboticsHeadlineRef.current,
        {
          xPercent: -35,
          opacity: 0,
          duration: 1.1,
          ease: 'power2.inOut',
        },
        1.8
      );

      tl.to(
        roboticsImgRef.current,
        {
          scale: 0.88,
          opacity: 0,
          duration: 1.1,
          ease: 'power2.inOut',
        },
        1.9
      );

      tl.set(roboticsSceneRef.current, { autoAlpha: 0 }, 3.0);

      // -----------------------------------------------------------------------
      // CHAPTER 06: ARTIFICIAL INTELLIGENCE & ML (2.6 to 6.0)
      // 2.6 to 3.8: Enters via clip mask and scale
      // 3.8 to 5.0: Reading plateau
      // 5.0 to 6.0: Exits
      // -----------------------------------------------------------------------
      tl.to(
        aiSceneRef.current,
        {
          autoAlpha: 1,
          scale: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.1,
          ease: 'power2.out',
        },
        2.6
      );

      tl.fromTo(
        aiHeadlineRef.current,
        { yPercent: 35, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, ease: 'power2.out' },
        2.9
      );

      tl.fromTo(
        aiImgRef.current,
        { scale: 1.15 },
        { scale: 1.0, duration: 1.2, ease: 'none' },
        2.7
      );

      // AI Exit (5.0 to 6.0)
      tl.to(
        [aiHeadlineRef.current, aiSceneRef.current],
        {
          xPercent: -25,
          opacity: 0,
          duration: 1.0,
          ease: 'power2.in',
        },
        5.0
      );

      tl.set(aiSceneRef.current, { autoAlpha: 0 }, 6.0);

      // -----------------------------------------------------------------------
      // CHAPTER 07: DATA ANALYTICS (5.6 to 9.0)
      // 5.6 to 6.8: Enters
      // 6.8 to 8.2: Active data telemetry plateau
      // 8.2 to 9.0: Exits
      // -----------------------------------------------------------------------
      tl.to(
        dataSceneRef.current,
        {
          autoAlpha: 1,
          scale: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.1,
          ease: 'power2.out',
        },
        5.6
      );

      // Data Exit (8.2 to 9.0)
      tl.to(
        dataSceneRef.current,
        {
          xPercent: -20,
          opacity: 0,
          duration: 0.8,
          ease: 'power1.in',
        },
        8.2
      );

      tl.set(dataSceneRef.current, { autoAlpha: 0 }, 9.0);

      // -----------------------------------------------------------------------
      // CHAPTER 08: AERIAL SYSTEMS (8.6 to 12.0)
      // 8.6 to 9.8: Enters
      // 9.8 to 12.0: Holds in full clarity before flowing into Learning Approach
      // -----------------------------------------------------------------------
      tl.to(
        aerialSceneRef.current,
        {
          autoAlpha: 1,
          scale: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.1,
          ease: 'power2.out',
        },
        8.6
      );

      tl.fromTo(
        aerialHeadlineRef.current,
        { xPercent: -20, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 0.9, ease: 'power2.out' },
        8.9
      );

      tl.fromTo(
        aerialImgRef.current,
        { scale: 1.15 },
        { scale: 1.0, duration: 1.2, ease: 'none' },
        8.8
      );

    }, container);

    return () => ctx.revert();
  }, [onSlideChange]);

  return (
    <div
      ref={containerRef}
      id="stage-tech-domains"
      className="relative w-full h-screen overflow-hidden bg-[#0A1016] text-white select-none"
    >
      {/* Background ambient dark glows */}
      <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-[#398BB0]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-[600px] h-[600px] bg-[#286D8B]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* =======================================================================
          SCENE 05: ROBOTICS & AUTOMATION
          ======================================================================= */}
      <div
        ref={roboticsSceneRef}
        id="slide-5"
        data-slide-index="4"
        className="absolute inset-0 w-full h-full z-10 overflow-hidden flex flex-col justify-center px-8 sm:px-14 lg:px-20 pt-20 pb-10"
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Section Marker */}
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono-tech text-xs tracking-widest uppercase text-[#38bdf8] font-semibold">
              05 / 15
            </span>
            <span className="w-8 h-[1px] bg-white/20" />
            <span className="font-mono-tech text-xs tracking-wider uppercase text-white/50">
              Robotics & Automation
            </span>
          </div>

          {/* Large Headline */}
          <div className="mb-6 overflow-hidden">
            <h2
              ref={roboticsHeadlineRef}
              className="font-serif-editorial text-4xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tighter leading-[0.95] will-change-transform"
            >
              Robotics &{' '}
              <span className="italic font-light text-[#38bdf8]">Automation</span>
            </h2>
            <p className="font-sans-modern text-xs sm:text-sm text-white/70 mt-2 max-w-xl font-light">
              Connecting physical circuitry, microcontrollers, embedded logic, and precision mechanics through structured hands-on engineering cycles.
            </p>
          </div>

          {/* Asymmetric Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 relative">
              <div className="relative overflow-hidden rounded-2xl bg-black border border-white/15 shadow-2xl aspect-[16/10] sm:aspect-[16/9]">
                <img
                  ref={roboticsImgRef}
                  src="/assets/page_13.jpg"
                  alt="6-axis industrial precision robotic arm"
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700 will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <span className="font-mono-tech text-[10px] tracking-widest uppercase text-[#38bdf8] block mb-1">
                      Precision Actuation
                    </span>
                    <p className="font-serif-editorial text-base sm:text-lg italic text-white/95 font-light">
                      6-Axis kinematics and adaptive gripper feedback
                    </p>
                  </div>
                  <span className="font-mono-tech text-[10px] text-white/60 bg-white/10 px-2.5 py-1 rounded-full border border-white/10 hidden sm:inline-block">
                    School Lab Platform
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="divide-y divide-white/10">
                {ROBOTICS_PILLARS.map((pil) => (
                  <div
                    key={pil.name}
                    className="py-3 flex items-center justify-between group cursor-pointer hover:text-[#38bdf8] transition-colors"
                  >
                    <div>
                      <span className="font-serif-editorial text-lg font-normal text-white group-hover:text-[#38bdf8] transition-colors">
                        {pil.name}
                      </span>
                      <span className="block font-sans-modern text-xs text-white/60 font-light">
                        {pil.desc}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#38bdf8] transition-transform ml-2 shrink-0" />
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-white/10">
                <span className="font-mono-tech text-[11px] text-[#38bdf8]">
                  DESIGN → BUILD → CODE → TEST → IMPROVE
                </span>
                <span className="font-mono-tech text-[10px] text-white/50">
                  Scroll To Next Domain
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =======================================================================
          SCENE 06: ARTIFICIAL INTELLIGENCE & ML
          ======================================================================= */}
      <div
        ref={aiSceneRef}
        id="slide-6"
        data-slide-index="5"
        className="absolute inset-0 w-full h-full z-20 overflow-hidden flex flex-col justify-center px-8 sm:px-14 lg:px-20 pt-20 pb-10 will-change-transform"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono-tech text-xs tracking-widest uppercase text-[#38bdf8] font-semibold">
              06 / 15
            </span>
            <span className="w-8 h-[1px] bg-white/20" />
            <span className="font-mono-tech text-xs tracking-wider uppercase text-white/50">
              Artificial Intelligence & ML
            </span>
          </div>

          <div className="mb-6 max-w-4xl">
            <h2
              ref={aiHeadlineRef}
              className="font-serif-editorial text-4xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tighter leading-[0.95]"
            >
              Understand intelligence.<br />
              <span className="italic font-light text-[#38bdf8]">Explore responsibly.</span>
            </h2>
            <p className="font-sans-modern text-xs sm:text-sm text-white/70 mt-2 max-w-xl font-light">
              Demystifying machine learning through scientific inquiry, data literacy, and ethical boundaries rather than passive tool consumption.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-2xl bg-black border border-white/15 shadow-xl aspect-[16/10]">
                <img
                  ref={aiImgRef}
                  src="/assets/page_02.jpg"
                  alt="Manus haptic data glove with VR and robot simulation"
                  className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#38bdf8] block mb-0.5">
                    Simulation & Kinematics
                  </span>
                  <span className="font-serif-editorial text-sm italic text-white/90">
                    Spatial interaction, model feedback & machine vision
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3">
              <div className="divide-y divide-white/10">
                {AI_STEPS.map((step) => (
                  <div key={step.step} className="py-2.5 first:pt-0">
                    <div className="flex items-baseline gap-2.5 mb-0.5">
                      <span className="font-mono-tech text-xs text-[#38bdf8] font-bold">
                        {step.step}
                      </span>
                      <h3 className="font-serif-editorial text-lg font-bold text-white">
                        {step.title}
                      </h3>
                    </div>
                    <p className="font-sans-modern text-xs text-white/70 pl-6 leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs font-sans-modern text-white/80 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block font-medium">Digital Citizenship & Safety:</strong>
                  Students examine privacy safeguards, fact-check model outputs, and evaluate societal impacts.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =======================================================================
          SCENE 07: DATA ANALYTICS (Sticky Visual Stage)
          ======================================================================= */}
      <div
        ref={dataSceneRef}
        id="slide-7"
        data-slide-index="6"
        className="absolute inset-0 w-full h-full z-30 overflow-hidden flex flex-col justify-center px-8 sm:px-14 lg:px-20 pt-20 pb-10 will-change-transform"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono-tech text-xs tracking-widest uppercase text-[#38bdf8] font-semibold">
              07 / 15
            </span>
            <span className="w-8 h-[1px] bg-white/20" />
            <span className="font-mono-tech text-xs tracking-wider uppercase text-white/50">
              Data Analytics
            </span>
          </div>

          <div className="mb-6 max-w-4xl">
            <h2 className="font-serif-editorial text-4xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tighter leading-[0.95]">
              Turn raw data <br />
              <span className="italic font-light text-[#38bdf8]">into human understanding.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-2 hidden lg:flex flex-col justify-center">
              <span className="font-serif-editorial text-6xl font-light text-white">
                0{activeDataStage + 1}
              </span>
              <span className="font-mono-tech text-xs text-[#38bdf8] uppercase tracking-widest mt-1">
                / 04 STAGE
              </span>
            </div>

            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl bg-black border border-white/15 shadow-xl aspect-square">
                <img
                  src="/assets/laptop_analytics.jpg"
                  alt="Telemetry data visualization"
                  className="w-full h-full object-cover contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#38bdf8] block mb-0.5">
                    Sensor Telemetry Ingestion
                  </span>
                  <p className="font-serif-editorial text-base italic text-white/95 font-light">
                    {DATA_STAGES[activeDataStage].title}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 divide-y divide-white/15">
              {DATA_STAGES.map((item, idx) => {
                const isActive = idx === activeDataStage;
                return (
                  <div
                    key={item.title}
                    onClick={() => setActiveDataStage(idx)}
                    className={`py-3.5 first:pt-0 cursor-pointer transition-all duration-300 flex items-start justify-between gap-4 ${
                      isActive ? 'opacity-100' : 'opacity-30 hover:opacity-60'
                    }`}
                  >
                    <div>
                      <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#38bdf8] font-semibold block">
                        STAGE {item.step}
                      </span>
                      <h3 className="font-serif-editorial text-xl sm:text-2xl font-normal text-white">
                        {item.title}
                      </h3>
                      <p className="font-sans-modern text-xs text-white/70 leading-relaxed font-light pt-0.5">
                        {item.desc}
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#38bdf8] shrink-0 mt-2" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* =======================================================================
          SCENE 08: AERIAL SYSTEMS
          ======================================================================= */}
      <div
        ref={aerialSceneRef}
        id="slide-8"
        data-slide-index="7"
        className="absolute inset-0 w-full h-full z-40 overflow-hidden flex flex-col justify-center px-8 sm:px-14 lg:px-20 pt-20 pb-10 will-change-transform"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono-tech text-xs tracking-widest uppercase text-[#38bdf8] font-semibold">
              08 / 15
            </span>
            <span className="w-8 h-[1px] bg-white/20" />
            <span className="font-mono-tech text-xs tracking-wider uppercase text-white/50">
              Aerial Systems
            </span>
          </div>

          <div className="mb-6 max-w-4xl">
            <h2
              ref={aerialHeadlineRef}
              className="font-serif-editorial text-4xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tighter leading-[0.95]"
            >
              See systems from <br />
              <span className="italic font-light text-[#38bdf8]">a new perspective.</span>
            </h2>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-black border border-white/15 shadow-2xl mb-8 aspect-[21/9] sm:aspect-[16/7]">
            <img
              ref={aerialImgRef}
              src="/assets/page_08.jpg"
              alt="Aerial telemetry and drone dynamics"
              className="w-full h-full object-cover will-change-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#38bdf8] block mb-1">
                  Spatial Mapping Station
                </span>
                <p className="font-serif-editorial text-lg italic text-white/95 font-light">
                  3D Waypoint Navigation & Inertial Guidance
                </p>
              </div>
              <span className="font-mono-tech text-xs text-white/60 bg-black/50 px-3 py-1 rounded-lg border border-white/10 hidden sm:inline-block">
                Safe Lab Protocol
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
            {AERIAL_LABELS.map((item) => (
              <div key={item.label} className="border-t border-white/20 pt-2">
                <span className="font-mono-tech text-xs font-bold text-[#38bdf8] block mb-0.5">
                  {item.label}
                </span>
                <span className="font-sans-modern text-[11px] text-white/60 leading-relaxed block font-light">
                  {item.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
