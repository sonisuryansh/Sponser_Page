import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle2, Globe } from 'lucide-react';
import { Magnetic } from '../components/motion/Magnetic';
import { FloatingParticles } from '../components/motion/FloatingParticles';

gsap.registerPlugin(ScrollTrigger);

interface PartnershipClosingSectionProps {
  onOpenPartnershipModal: () => void;
}

const COMMITMENTS = [
  'On-site mentors',
  'Equipment included',
  'Timetable tailored to school',
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
      className="relative z-10 lg:z-30 min-h-screen lg:h-screen lg:max-h-screen py-6 sm:py-8 lg:py-6 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#0E151E] tech-subtle-grid-dark text-white border-t border-white/10 flex flex-col justify-between overflow-x-hidden overflow-y-hidden"
    >
      {/* Floating ambient subtle particles */}
      <FloatingParticles count={14} color="rgba(56, 189, 248, 0.25)" />

      {/* Main Expansive Content Container */}
      <div className="max-w-[1560px] 2xl:max-w-[1680px] mx-auto w-full my-auto flex-1 flex flex-col justify-center py-2 lg:py-1 relative z-10">
        
        {/* Parallel 2-Column Spread: Left Content Unit & Right Drone Image Unit */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center">
          
          {/* =========================================================================
              UNIT 1: LEFT-SIDE COHESIVE GROUP (Enters smoothly from LEFT: -100px -> 0)
              ========================================================================= */}
          <motion.div
            variants={leftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-5 will-change-transform"
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-2 max-w-3xl">
              {COMMITMENTS.map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm sm:text-[15px] text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-[#38bdf8] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-1">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <Magnetic strength={0.15}>
                  <button
                    onClick={onOpenPartnershipModal}
                    className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#38bdf8] text-[#0A1016] font-mono-tech text-xs sm:text-sm uppercase tracking-wider font-bold hover:bg-white transition-all duration-300 shadow-xl cursor-pointer group"
                  >
                    <span>Start a Partnership</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </Magnetic>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-white/65">
                  <a href="https://www.medhaarc.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#38bdf8] transition-colors">
                    <Globe className="w-5 h-5" /> Website
                  </a>
                  <a href="https://www.linkedin.com/company/medhaarc/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#38bdf8] transition-colors">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 10H5.67v8h2.67v-8Zm-1.34-1.1a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1ZM18.33 13.42c0-2.41-1.28-3.54-2.99-3.54a2.58 2.58 0 0 0-2.32 1.28V10h-2.67v8h2.67v-4.2c0-1.1.21-2.17 1.58-2.17 1.35 0 1.37 1.26 1.37 2.24V18h2.67l-.31-4.58Z" /></svg> LinkedIn
                  </a>
                  <a href="https://www.instagram.com/medhaarc/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#38bdf8] transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="18" cy="6" r="0.8" fill="currentColor" stroke="none" /></svg> Instagram
                  </a>
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
            <div className="relative w-full h-[320px] sm:h-[360px] lg:h-[380px] xl:h-[420px] overflow-hidden rounded-2xl bg-[#090E14] border border-white/15 shadow-2xl">
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
