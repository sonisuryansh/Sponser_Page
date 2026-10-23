import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Bot,
  Sparkles,
  Compass,
  Boxes,
  Cpu,
  Wifi,
  Eye,
} from 'lucide-react';
import { FloatingParticles } from '../components/motion/FloatingParticles';

gsap.registerPlugin(ScrollTrigger);

interface TechDetail {
  name: string;
  category: string;
  summary: string;
  accentColor: string;
  icon: React.ReactNode;
}

const EMERGING_TECH_DATA: TechDetail[] = [
  {
    name: 'Physical AI',
    category: 'Embodied Systems',
    summary: 'AI embedded in physical robots to perceive, decide, and act in real time.',
    accentColor: '#38bdf8',
    icon: <Bot className="w-4 h-4" />,
  },
  {
    name: 'Generative AI',
    category: 'Creative Computation',
    summary: 'Models generating code, 3D parametric structures, and synthetic datasets.',
    accentColor: '#a78bfa',
    icon: <Sparkles className="w-4 h-4" />,
  },
  {
    name: 'AI Agents',
    category: 'Autonomous Workflows',
    summary: 'Goal-driven autonomous systems using planning, tools, and reflection loops.',
    accentColor: '#34d399',
    icon: <Compass className="w-4 h-4" />,
  },
  {
    name: 'Digital Twins',
    category: 'Simulation & Modeling',
    summary: 'Virtual hardware replicas used to test kinematics and physics before physical builds.',
    accentColor: '#fb923c',
    icon: <Boxes className="w-4 h-4" />,
  },
  {
    name: 'Edge AI',
    category: 'Localized Computing',
    summary: 'Lightweight neural networks running directly on microcontrollers without cloud reliance.',
    accentColor: '#38bdf8',
    icon: <Cpu className="w-4 h-4" />,
  },
  {
    name: 'Smart IoT',
    category: 'Interconnected Sensing',
    summary: 'Distributed microcontroller sensor networks tracking and streaming telemetry.',
    accentColor: '#f472b6',
    icon: <Wifi className="w-4 h-4" />,
  },
  {
    name: 'AR / VR Simulation',
    category: 'Spatial Interfaces',
    summary: 'Spatial visual interfaces rendering forces, magnetic fields, and mechanics in 3D.',
    accentColor: '#60a5fa',
    icon: <Eye className="w-4 h-4" />,
  },
];

export const EmergingTechSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const media = gsap.matchMedia();
    media.add('(min-width: 1280px) and (prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        ScrollTrigger.create({
          id: 'emerging-tech-hold-for-benefits',
          trigger: section,
          start: 'top top',
          end: '+=100%',
          pin: section,
          pinSpacing: false,
          anticipatePin: 1,
        });
      }, section);

      return () => context.revert();
    });

    return () => media.revert();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section
      id="slide-11"
      data-slide-index="10"
      ref={sectionRef}
      className="w-full min-h-screen xl:h-screen xl:max-h-screen relative z-10 xl:z-10 flex flex-col justify-center py-4 sm:py-5 lg:py-6 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#0A1016] text-white border-b border-white/10 overflow-hidden"
    >
      <FloatingParticles count={12} color="rgba(56, 189, 248, 0.15)" />

      {/* Subtle Aerospace Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#38bdf8]/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1560px] 2xl:max-w-[1680px] mx-auto w-full relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-5 lg:mb-7">
          <div className="inline-flex items-center gap-2 font-mono-tech text-[10px] tracking-[0.2em] uppercase text-white/50 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
            <span>Next-Generation Learning Domains</span>
          </div>

          <h2 className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl font-normal text-white tracking-tight leading-[1.15]">
            Preparing students for{' '}
            <span className="text-[#38bdf8] font-light italic">tomorrow's innovations.</span>
          </h2>

          <p className="font-sans-modern text-sm sm:text-base text-white/70 mt-2 leading-relaxed">
            Seven areas shaping the next generation of engineering.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-5xl mx-auto border-y border-white/15 divide-y divide-white/10"
        >
          {EMERGING_TECH_DATA.map((tech, index) => (
            <motion.article
              key={tech.name}
              variants={itemVariants}
              className="grid grid-cols-[2.5rem_minmax(0,1fr)] sm:grid-cols-[3rem_minmax(11rem,0.8fr)_minmax(0,1.8fr)] items-center gap-x-3 sm:gap-x-5 gap-y-1.5 py-3 sm:py-3.5"
            >
              <div className="row-span-2 sm:row-span-1 flex items-center gap-2 sm:gap-2.5">
                <span className="font-mono-tech text-[10px] text-white/40">0{index + 1}</span>
                <span style={{ color: tech.accentColor }} className="shrink-0">{tech.icon}</span>
              </div>

              <div className="min-w-0 flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                <h3 className="font-serif-editorial text-lg sm:text-xl font-normal text-white leading-tight">
                  {tech.name}
                </h3>
                <span className="font-mono-tech text-[9px] sm:text-[10px] uppercase tracking-wider text-white/45">
                  {tech.category}
                </span>
              </div>

              <p className="col-start-2 sm:col-start-auto font-sans-modern text-xs sm:text-sm text-white/65 leading-relaxed">
                {tech.summary}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EmergingTechSection;
