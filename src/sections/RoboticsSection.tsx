import { useRef, useEffect, Fragment } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ROBOTICS_PILLARS = [
  { name: 'Electronics & Basic Circuits', desc: 'Voltage regulation, power distribution & breadboarding' },
  { name: 'Sensors, Motors & Control', desc: 'Servo angles, DC drivers & threshold calibration' },
  { name: 'Coding & Automation Logic', desc: 'Embedded MicroPython/C++, interrupts & feedback loops' },
  { name: '3D Design & Mechanics', desc: 'CAD modeling, structural gear ratios & kinematics' },
];

const PROCESS_STEPS = ['DESIGN', 'BUILD', 'CODE', 'TEST', 'IMPROVE'];

export const RoboticsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    if (!section || !headline) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headline,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="slide-5"
      data-slide-index="4"
      ref={sectionRef}
      className="relative min-h-screen py-28 sm:py-36 px-8 sm:px-14 lg:px-20 bg-[#0E151D] text-white border-b border-white/10 flex flex-col justify-center overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#398BB0]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Index Marker */}
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono-tech text-xs tracking-widest uppercase text-[#38bdf8] font-semibold">
            05 / 15
          </span>
          <span className="w-8 h-[1px] bg-white/20" />
          <span className="font-mono-tech text-xs tracking-wider uppercase text-white/50">
            Robotics & Automation
          </span>
        </div>

        {/* Oversized Serif Headline (Matching frame_004_t6.0s style) */}
        <div className="mb-14 overflow-hidden">
          <h2
            ref={headlineRef}
            className="font-serif-editorial text-5xl sm:text-7xl lg:text-8xl font-normal text-white tracking-tighter leading-[0.95]"
          >
            Robotics &{' '}
            <span className="italic font-light text-[#38bdf8]">Automation</span>
          </h2>
          <p className="font-sans-modern text-sm sm:text-base text-white/70 mt-3 max-w-xl font-light">
            Connecting physical circuitry, microcontrollers, embedded logic, and precision mechanics through structured hands-on engineering cycles.
          </p>
        </div>

        {/* Cinematic Asymmetric Composition (Matching frame_004 of yy.mp4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
          
          {/* Left Column: Dominant 6-Axis Robotic Visual (7 cols) */}
          <div className="lg:col-span-7 relative">
            <div className="relative overflow-hidden rounded-2xl bg-black border border-white/15 shadow-2xl aspect-[16/10] sm:aspect-[16/9]">
              <img
                src="/assets/page_13.jpg"
                alt="6-axis industrial precision robotic arm"
                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="font-mono-tech text-[10px] tracking-widest uppercase text-[#38bdf8] block mb-1">
                    Precision Actuation
                  </span>
                  <p className="font-serif-editorial text-lg italic text-white/95 font-light">
                    6-Axis kinematics and adaptive gripper feedback
                  </p>
                </div>
                <span className="font-mono-tech text-[11px] text-white/60 bg-white/10 px-3 py-1 rounded-full border border-white/10 hidden sm:inline-block">
                  School Lab Platform
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Inset Hardware Photo & Pillar Links with Arrows (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Small Hardware Inset Photo (matches frame_004 small bottle/product photo) */}
            <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-white/10">
                <img
                  src="/assets/page_01.jpg"
                  alt="Embedded microcontroller circuit board"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-sans-modern text-xs text-white/70">
                <strong className="text-white block font-medium">Embedded Firmware Labs</strong>
                MicroPython & C++ execution with real-time sensor processing.
              </div>
            </div>

            {/* Pillar List with Arrow Links (Matches frame_004 "Dermal Fillers ↗" list) */}
            <div className="divide-y divide-white/10 pt-1">
              {ROBOTICS_PILLARS.map((pil) => (
                <div
                  key={pil.name}
                  className="py-3 flex items-center justify-between group cursor-pointer hover:text-[#38bdf8] transition-colors"
                >
                  <div>
                    <span className="font-serif-editorial text-lg sm:text-xl font-normal text-white group-hover:text-[#38bdf8] transition-colors">
                      {pil.name}
                    </span>
                    <span className="block font-sans-modern text-xs text-white/60 font-light">
                      {pil.desc}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#38bdf8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-3" />
                </div>
              ))}
            </div>

            {/* Engineering Cycle & Pill Button (Matches frame_004 "Learn More ✦") */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
              <div className="flex flex-wrap items-center gap-1.5 font-mono-tech text-xs text-white/90">
                {PROCESS_STEPS.map((step, i) => (
                  <Fragment key={step}>
                    <span className="px-2 py-0.5 rounded bg-white/10 border border-white/10 text-[11px] font-semibold">
                      {step}
                    </span>
                    {i < PROCESS_STEPS.length - 1 && <span className="text-[#38bdf8] text-xs">→</span>}
                  </Fragment>
                ))}
              </div>

              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#0E151D] font-sans-modern text-xs font-semibold self-start sm:self-auto hover:bg-[#38bdf8] transition-colors shadow-md">
                <span>Lab Syllabus</span>
                <Sparkles className="w-3.5 h-3.5 text-[#0E151D]" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
