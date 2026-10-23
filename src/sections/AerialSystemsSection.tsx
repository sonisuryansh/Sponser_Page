import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck } from 'lucide-react';


gsap.registerPlugin(ScrollTrigger);

const AERIAL_LABELS = [
  { label: 'PLATFORMS', detail: 'Aerodynamic structures, multi-rotor thrust & payload mechanics' },
  { label: 'SENSORS', detail: 'IMU accelerometers, barometers, optical flow & GPS spatial telemetry' },
  { label: 'NAVIGATION', detail: 'Coordinate waypoints, spatial orientation & inertial guidance' },
  { label: 'CONTROL', detail: 'Flight controllers, ESC motor timing & PID stabilization loops' },
  { label: 'DATA', detail: 'Multispectral sensor feeds, thermal mapping & flight logs' },
  { label: 'APPLICATIONS', detail: 'Precision agriculture, topographical surveying & disaster monitoring' },
];

export const AerialSystemsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const img = imageRef.current;
    if (!section || !headline || !img) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Horizontal drift of headline on scroll
      gsap.fromTo(
        headline,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 35%',
            scrub: 1,
          },
        }
      );

      // Scroll-linked zoom on the landscape aerial image
      gsap.fromTo(
        img,
        { scale: 1.18, y: -20 },
        {
          scale: 1.0,
          y: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
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
      id="slide-8"
      data-slide-index="7"
      ref={sectionRef}
      className="relative min-h-screen py-24 sm:py-32 px-6 sm:px-12 lg:px-16 bg-[#17222C] text-white border-b border-white/10 flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Index Marker */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono-tech text-xs tracking-widest uppercase text-[#38bdf8] font-semibold">
            08 / 15
          </span>
          <span className="w-8 h-[1px] bg-white/20" />
          <span className="font-mono-tech text-xs tracking-wider uppercase text-white/50">
            Aerial Systems
          </span>
        </div>

        {/* Editorial Headline */}
        <div className="mb-12 max-w-4xl">
          <h2
            ref={headlineRef}
            className="font-serif-editorial text-4xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-[1.08]"
          >
            See systems from <br />
            <span className="italic font-light text-[#38bdf8]">a new perspective.</span>
          </h2>
          <p className="font-sans-modern text-base sm:text-lg text-white/70 mt-3 max-w-2xl font-light">
            Extending engineering concepts into three-dimensional space through aerodynamic flight principles, spatial telemetry, and purposeful mission design.
          </p>
        </div>

        {/* Cinematic Landscape Visual Showcase */}
        <div className="relative overflow-hidden rounded-2xl bg-black border border-white/15 shadow-2xl mb-12 aspect-[21/9] sm:aspect-[16/7]">
          <img
            ref={imageRef}
            src="/assets/page_08.jpg"
            alt="Aerial drone surveying river valley with ground tracking station"
            className="w-full h-full object-cover will-change-transform"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Overlaid Spatial Telemetry Tags */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#38bdf8] block mb-1">
                Telemetry Station & Spatial Mapping
              </span>
              <p className="font-serif-editorial text-lg sm:text-xl italic text-white/95 font-light">
                Long-range sensor links and autonomous flight path geometry
              </p>
            </div>
            <div className="font-mono-tech text-xs text-white/60 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 self-start sm:self-auto">
              3D Waypoint Navigation // Safe Lab Protocol
            </div>
          </div>
        </div>

        {/* 6 Restrained Architecture Labels from Master Prompt */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {AERIAL_LABELS.map((item) => (
            <div key={item.label} className="border-t border-white/20 pt-3">
              <span className="font-mono-tech text-xs font-bold text-[#38bdf8] block mb-1">
                {item.label}
              </span>
              <span className="font-sans-modern text-xs text-white/65 leading-relaxed block">
                {item.detail}
              </span>
            </div>
          ))}
        </div>

        {/* Responsible Operations Notice */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#38bdf8] shrink-0 mt-0.5" />
          <p className="font-sans-modern text-xs text-white/80 leading-relaxed">
            <strong className="text-white">Safety & Regulatory Protocol:</strong> Aerial platform instruction centers upon simulator flight dynamics, sensor integration, and supervised indoor testing in strict compliance with safety guidelines.
          </p>
        </div>

      </div>
    </section>
  );
};
