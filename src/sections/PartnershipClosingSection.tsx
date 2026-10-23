import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle2, Globe, Clock } from 'lucide-react';
import { Magnetic } from '../components/motion/Magnetic';
import { FloatingParticles } from '../components/motion/FloatingParticles';

gsap.registerPlugin(ScrollTrigger);

interface PartnershipClosingSectionProps {
  onOpenPartnershipModal: () => void;
}

const COMMITMENTS = [
  {
    title: 'Dedicated On-Site Mentors',
    desc: 'Trained technical instructors stationed inside the lab for every scheduled student batch.',
  },
  {
    title: 'Zero Upfront Equipment Capex',
    desc: 'All microcontrollers, robotics benches, drone components, and tools fully provided.',
  },
  {
    title: 'Academic Timetable Integration',
    desc: 'Flexible scheduling customized to align seamlessly with school term and exam calendars.',
  },
  {
    title: 'Verified Student Portfolios',
    desc: 'Demonstrable engineering projects, exhibitions, and verified completion credentials for learners.',
  },
];

export const PartnershipClosingSection: React.FC<PartnershipClosingSectionProps> = ({
  onOpenPartnershipModal,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const headline = headlineRef.current;
    if (!container || !headline) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 75%',
          once: true,
        },
      });

      tl.fromTo(
        headline,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      )
        .fromTo(
          '.closing-subtitle',
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(
          '.commitment-card',
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(
          '.closing-cta',
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
          '-=0.2'
        )
        .fromTo(
          '.closing-visual-card',
          { scale: 0.97, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.5'
        );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="slide-15"
      data-slide-index="14"
      ref={containerRef}
      className="relative min-h-screen py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#0E151E] tech-subtle-grid-dark text-white border-t border-white/10 flex flex-col justify-between"
    >
      {/* Floating ambient subtle particles */}
      <FloatingParticles count={14} color="rgba(56, 189, 248, 0.25)" />

      {/* Main Expansive Content Container */}
      <div className="max-w-[1560px] 2xl:max-w-[1680px] mx-auto w-full my-auto flex-1 flex flex-col justify-center py-4 relative z-10">
        
        {/* Parallel 2-Column Spread: Text & Executive CTA on Left, Hardware Visual on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left Column: Heading, 4 Commitment Cards & Executive CTA (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-7">
            {/* Closing Statement */}
            <div>
              <h2
                ref={headlineRef}
                className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-tight"
              >
                Let’s shape the future of{' '}
                <span className="italic font-light text-[#38bdf8]">technology education together.</span>
              </h2>
              <p className="closing-subtitle font-sans-modern text-sm sm:text-base lg:text-[17px] text-white/80 mt-3 max-w-2xl font-normal leading-relaxed">
                A turnkey engineering laboratory partnership designed to inspire learners, empower teachers, and establish lasting campus distinction.
              </p>
            </div>

            {/* 4 Partnership Highlight Cards (Clean, user-friendly, no redundant metrics boxes) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-2xl">
              {COMMITMENTS.map((item, idx) => (
                <div
                  key={idx}
                  className="commitment-card p-4 rounded-xl bg-white/[0.04] border border-white/10 flex items-start gap-3 hover:bg-white/[0.07] transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-serif-editorial text-sm sm:text-[15px] font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="font-sans-modern text-xs text-white/70 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* User-friendly Call To Action & Touchpoints */}
            <div className="closing-cta pt-2 space-y-3">
              <div className="flex flex-wrap items-center gap-3.5">
                <Magnetic strength={0.15}>
                  <button
                    onClick={onOpenPartnershipModal}
                    className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#38bdf8] text-[#0A1016] font-mono-tech text-xs sm:text-sm uppercase tracking-wider font-bold hover:bg-white transition-all duration-300 shadow-xl cursor-pointer group"
                  >
                    <span>Initiate Partnership Dialogue</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </Magnetic>
                
                <a
                  href="https://www.medhaarc.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/12 text-xs font-mono-tech text-white/85 hover:text-[#38bdf8] transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>www.medhaarc.com</span>
                </a>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/8 text-[11px] font-mono-tech text-white/60">
                  <Clock className="w-3 h-3 text-[#34d399]" />
                  <span>24h Response SLA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Hardware Visual (5 cols) */}
          <div className="lg:col-span-5 relative w-full h-full flex flex-col justify-center items-center">
            <div className="closing-visual-card relative w-full h-[360px] sm:h-[420px] lg:h-[460px] xl:h-[490px] overflow-hidden rounded-2xl bg-[#090E14] border border-white/15 shadow-2xl">
              <img
                src="/assets/page_05.jpg"
                alt="MedhaArc experiential hardware platform"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

        </div>

      </div>

      {/* Minimal Dignified Sign-off */}
      <div className="max-w-[1560px] 2xl:max-w-[1680px] mx-auto w-full pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono-tech text-white/50 relative z-10 font-normal">
        <div className="flex items-center gap-2">
          <span className="font-serif-editorial text-sm font-semibold text-white/90">MedhaArc Labs</span>
          <span>•</span>
          <span>School Technology & Engineering Partnership</span>
        </div>
        <div>
          Confidential School Presentation Deck
        </div>
      </div>

    </section>
  );
};

export default PartnershipClosingSection;
