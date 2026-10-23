import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const DATA_FLOW = [
  {
    step: '01',
    title: 'DATA COLLECTION',
    short: 'Sensors & Telemetry',
    desc: 'Collect, clean & organize observations from real sensors, motor current draws, and physical environments.'
  },
  {
    step: '02',
    title: 'STATISTICAL ANALYSIS',
    short: 'Pattern Recognition',
    desc: 'Compute descriptive metrics, identify recurring patterns, and isolate anomalous sensory noise.'
  },
  {
    step: '03',
    title: 'DATA VISUALISATION',
    short: 'Scientific Storytelling',
    desc: 'Render legible charts that communicate honest, evidence-based conclusions without artificial bias.'
  },
  {
    step: '04',
    title: 'ACTIONABLE INSIGHTS',
    short: 'Hypothesis Validation',
    desc: 'Synthesize findings to optimize engineering prototypes and formulate sharper scientific hypotheses.'
  }
];

export const DataAnalyticsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Create scroll-driven step activation
      ScrollTrigger.create({
        trigger: container,
        start: 'top 60%',
        end: 'bottom 40%',
        onUpdate: (self) => {
          const index = Math.min(3, Math.floor(self.progress * 4));
          setActiveStage(index);
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="slide-7"
      data-slide-index="6"
      ref={containerRef}
      className="relative min-h-screen py-28 sm:py-36 px-8 sm:px-14 lg:px-20 bg-[#DFE6E7] border-b border-[#1C2833]/10 flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Chapter Indicator */}
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono-tech text-xs tracking-widest uppercase text-[#398BB0] font-semibold">
            07 / 15
          </span>
          <span className="w-8 h-[1px] bg-[#1C2833]/20" />
          <span className="font-mono-tech text-xs tracking-wider uppercase text-[#1C2833]/60">
            Data Analytics
          </span>
        </div>

        {/* Headline */}
        <div className="mb-14 max-w-4xl">
          <h2 className="font-serif-editorial text-5xl sm:text-7xl lg:text-8xl font-normal text-[#1C2833] tracking-tighter leading-[0.95]">
            Turn raw data <br />
            <span className="italic font-light text-[#286D8B]">into human understanding.</span>
          </h2>
          <p className="font-sans-modern text-sm sm:text-base text-[#1C2833]/70 mt-4 max-w-xl font-light">
            Cultivating critical inquiry, pattern recognition, and evidence-based reasoning as the foundational tools for scientific discovery.
          </p>
        </div>

        {/* =========================================================================
            STICKY VISUAL STAGE WITH CHANGING LIST (Matching frame_006_t9.0s of yy.mp4):
            Left: Chapter Number in high-contrast serif
            Center: Square Visual Stage (Telemetry / Analytics)
            Right: Hairline divided list with active highlighted item & "Learn More ↗"
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Number Callout (2 cols) */}
          <div className="lg:col-span-2 hidden lg:flex flex-col justify-center items-start">
            <span className="font-serif-editorial text-7xl font-light text-[#1C2833]">
              0{activeStage + 1}
            </span>
            <span className="font-mono-tech text-xs text-[#398BB0] uppercase tracking-widest mt-1">
              / 04 STAGE
            </span>
          </div>

          {/* Center Column: Square Visual Stage (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl bg-[#D5E2E5] border border-[#1C2833]/15 shadow-xl aspect-square">
              <img
                src="/assets/laptop_analytics.jpg"
                alt="Data analysis workspace and scientific telemetry"
                className="w-full h-full object-cover transition-all duration-700 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#38bdf8] block mb-1">
                  Telemetry Visual Stage
                </span>
                <p className="font-serif-editorial text-lg italic text-white/95 font-light">
                  {DATA_FLOW[activeStage].short}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Hairline Divided Process List (5 cols) */}
          <div className="lg:col-span-5 divide-y divide-[#1C2833]/15">
            {DATA_FLOW.map((item, idx) => {
              const isActive = idx === activeStage;
              return (
                <div
                  key={item.title}
                  onClick={() => setActiveStage(idx)}
                  className={`py-5 first:pt-0 cursor-pointer transition-all duration-300 group flex items-start justify-between gap-4 ${
                    isActive ? 'opacity-100' : 'opacity-35 hover:opacity-70'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#398BB0] font-semibold block">
                      Stage {item.step}
                    </span>
                    <h3 className="font-serif-editorial text-2xl sm:text-3xl font-normal text-[#1C2833] tracking-tight group-hover:text-[#286D8B] transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans-modern text-xs text-[#1C2833]/80 leading-relaxed font-light max-w-sm pt-1">
                      {item.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-mono-tech text-[#398BB0] shrink-0 mt-2">
                    <span className="hidden sm:inline">Inspect</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
