import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
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
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Final Slide Scroll Lock (Pin): locks closing presentation slide in viewport
      ScrollTrigger.create({
        id: 'partnership-closing-pin',
        trigger: container,
        start: 'top top',
        end: '+=1000',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });
    }, container);

    return () => ctx.revert();
  }, []);

  // Responsive offsets: 100px desktop, ~35px on mobile
  const leftOffset = isMobile ? -35 : -100;
  const rightOffset = isMobile ? 35 : 100;

  // Premium cubic-bezier easing [0.22, 1, 0.36, 1] for coordinated dual-side reveal
  const leftVariants: {
    hidden: { x: number; opacity: number };
    visible: { x: number; opacity: number; transition: { duration: number; ease: readonly [number, number, number, number] } };
  } = {
    hidden: {
      x: shouldReduceMotion ? 0 : leftOffset,
      opacity: shouldReduceMotion ? 1 : 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 1.0,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const rightVariants: {
    hidden: { x: number; opacity: number };
    visible: { x: number; opacity: number; transition: { duration: number; delay: number; ease: readonly [number, number, number, number] } };
  } = {
    hidden: {
      x: shouldReduceMotion ? 0 : rightOffset,
      opacity: shouldReduceMotion ? 1 : 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 1.0,
        delay: shouldReduceMotion ? 0 : 0.1, // Subtle coordinated delay for drone image
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      id="slide-15"
      data-slide-index="14"
      ref={containerRef}
      className="relative min-h-screen lg:h-screen lg:max-h-screen py-8 sm:py-10 lg:py-12 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#0E151E] tech-subtle-grid-dark text-white border-t border-white/10 flex flex-col justify-between overflow-x-hidden overflow-y-hidden"
    >
      {/* Floating ambient subtle particles */}
      <FloatingParticles count={14} color="rgba(56, 189, 248, 0.25)" />

      {/* Main Expansive Content Container */}
      <div className="max-w-[1560px] 2xl:max-w-[1680px] mx-auto w-full my-auto flex-1 flex flex-col justify-center py-4 relative z-10">
        
        {/* Parallel 2-Column Spread: Left Content Unit & Right Drone Image Unit */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* =========================================================================
              UNIT 1: LEFT-SIDE COHESIVE GROUP (Enters smoothly from LEFT: -100px -> 0)
              ========================================================================= */}
          <motion.div
            variants={leftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-7 will-change-transform"
          >
            {/* Closing Statement */}
            <div>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-tight">
                Let’s shape the future of{' '}
                <span className="italic font-light text-[#38bdf8]">technology education together.</span>
              </h2>
              <p className="font-sans-modern text-sm sm:text-base lg:text-[17px] text-white/80 mt-3 max-w-2xl font-normal leading-relaxed">
                A turnkey engineering laboratory partnership designed to inspire learners, empower teachers, and establish lasting campus distinction.
              </p>
            </div>

            {/* 4 Partnership Highlight Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-2xl">
              {COMMITMENTS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/[0.04] border border-white/10 flex items-start gap-3 hover:bg-white/[0.07] transition-colors"
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
            <div className="pt-2 space-y-3">
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
                  <span className="text-white/60">Direct:</span>
                  <span className="text-white font-medium">www.medhaarc.com</span>
                </a>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/8 text-[11px] font-mono-tech text-white/60">
                  <Clock className="w-3 h-3 text-[#34d399]" />
                  <span>24h Response SLA</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* =========================================================================
              UNIT 2: RIGHT-SIDE DRONE IMAGE UNIT (Enters smoothly from RIGHT: +100px -> 0)
              ========================================================================= */}
          <motion.div
            variants={rightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-5 relative w-full h-full flex flex-col justify-center items-center will-change-transform"
          >
            <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[460px] xl:h-[490px] overflow-hidden rounded-2xl bg-[#090E14] border border-white/15 shadow-2xl">
              <img
                src="/assets/page_05.jpg"
                alt="MedhaArc experiential hardware platform"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </div>
          </motion.div>

        </div>

      </div>

      {/* Minimal Dignified Sign-off */}
      <div className="max-w-[1560px] 2xl:max-w-[1680px] mx-auto w-full pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono-tech text-white/50 relative z-10 font-normal">
        <div className="flex items-center gap-2">
          <span className="font-serif-editorial text-sm font-semibold text-white/90">MedhaArc Labs</span>
          <span>•</span>
          <span>School Technology & Engineering Partnership</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://www.medhaarc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#38bdf8] hover:text-white transition-colors"
          >
            www.medhaarc.com
          </a>
          <span>•</span>
          <span>Confidential School Presentation Deck</span>
        </div>
      </div>

    </section>
  );
};

export default PartnershipClosingSection;
