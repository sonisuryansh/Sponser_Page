import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck } from 'lucide-react';


gsap.registerPlugin(ScrollTrigger);

const AI_PROGRESSION = [
  { step: '01', title: 'UNDERSTAND', desc: 'Grasp what AI can and cannot do; debunk common machine myths' },
  { step: '02', title: 'EXPLORE', desc: 'Interact with trained models, sensory inputs & prompt structures' },
  { step: '03', title: 'APPLY', desc: 'Feed structured datasets to classify objects and evaluate accuracy' },
  { step: '04', title: 'BUILD', desc: 'Connect lightweight machine vision models with robotics actions' }
];

export const AISection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const headline = headlineRef.current;
    if (!container || !headline) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headline,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 75%',
            end: 'top 35%',
            scrub: 1,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="slide-6"
      data-slide-index="5"
      ref={containerRef}
      className="relative min-h-screen py-24 sm:py-32 px-6 sm:px-12 lg:px-16 bg-[#18212B] text-white border-b border-white/10 flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Index Marker */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono-tech text-xs tracking-widest uppercase text-[#38bdf8] font-semibold">
            06 / 15
          </span>
          <span className="w-8 h-[1px] bg-white/20" />
          <span className="font-mono-tech text-xs tracking-wider uppercase text-white/50">
            Artificial Intelligence & ML
          </span>
        </div>

        {/* Editorial Headline */}
        <div className="mb-14 max-w-4xl">
          <h2
            ref={headlineRef}
            className="font-serif-editorial text-4xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-[1.08]"
          >
            Understand intelligence. <br />
            <span className="italic font-light text-[#38bdf8]">Explore responsibly.</span>
          </h2>
          <p className="font-sans-modern text-base sm:text-lg text-white/70 mt-3 max-w-2xl font-light">
            Demystifying machine learning through scientific inquiry, data literacy, and ethical boundaries rather than passive tool consumption.
          </p>
        </div>

        {/* Two Column Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Stage (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative overflow-hidden rounded-2xl bg-black/60 border border-white/10 shadow-xl aspect-video sm:aspect-[4/3]">
              <img
                src="/assets/page_02.jpg"
                alt="Manus haptic data glove with VR and robot simulation"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
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

          {/* Right Column: 4-Step Progression Sequence (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#38bdf8] font-semibold block mb-2">
              Age-Appropriate AI Progression:
            </span>

            <div className="divide-y divide-white/10">
              {AI_PROGRESSION.map((step) => (
                <div key={step.step} className="py-4 first:pt-0 group">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="font-mono-tech text-xs text-[#38bdf8] font-bold">
                      {step.step}
                    </span>
                    <h3 className="font-serif-editorial text-xl font-bold text-white group-hover:text-[#38bdf8] transition-colors">
                      {step.title}
                    </h3>
                  </div>
                  <p className="font-sans-modern text-xs sm:text-sm text-white/70 pl-7 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Ethics & Safety Note */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-sans-modern text-white/80 flex items-start gap-3 mt-4">
              <ShieldCheck className="w-5 h-5 text-[#38bdf8] shrink-0 mt-0.5" />
              <span>
                <strong className="text-white block font-medium">Digital Citizenship & Safety:</strong>
                Students examine privacy safeguards, fact-check model outputs, and consider the societal impact of automation.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
