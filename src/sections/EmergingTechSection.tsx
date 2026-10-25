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
    summary: 'Robots use sensors and onboard AI to react to their surroundings.',
    accentColor: '#38bdf8',
    icon: <Bot className="w-4 h-4" />,
  },
  {
    name: 'Generative AI',
    category: 'Creative Computation',
    summary: 'AI helps students create code, 3D designs, and sample data.',
    accentColor: '#a78bfa',
    icon: <Sparkles className="w-4 h-4" />,
  },
  {
    name: 'AI Agents',
    category: 'Autonomous Workflows',
    summary: 'AI agents plan tasks, use tools, and check their results.',
    accentColor: '#34d399',
    icon: <Compass className="w-4 h-4" />,
  },
  {
    name: 'Digital Twins',
    category: 'Simulation & Modeling',
    summary: 'Virtual models let students test motion and forces before building.',
    accentColor: '#fb923c',
    icon: <Boxes className="w-4 h-4" />,
  },
  {
    name: 'Edge AI',
    category: 'Localized Computing',
    summary: 'Microcontrollers run compact AI models without sharing data to the cloud.',
    accentColor: '#38bdf8',
    icon: <Cpu className="w-4 h-4" />,
  },
  {
    name: 'Smart IoT',
    category: 'Interconnected Sensing',
    summary: 'Connected sensors share live data such as campus weather and energy use.',
    accentColor: '#f472b6',
    icon: <Wifi className="w-4 h-4" />,
  },
  {
    name: 'AR / VR Simulation',
    category: 'Spatial Interfaces',
    summary: '3D simulations make flight, forces, and circuits easier to explore.',
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
      className="w-full min-h-screen relative z-10 xl:z-20 flex flex-col justify-center py-10 sm:py-12 lg:py-14 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#0A1016] text-white border-b border-white/10"
    >
      <FloatingParticles count={12} color="rgba(56, 189, 248, 0.15)" />

      {/* Subtle Aerospace Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#38bdf8]/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1560px] 2xl:max-w-[1680px] mx-auto w-full relative z-10 my-auto">

        <div className="text-center max-w-3xl mx-auto mb-4 lg:mb-6 pt-2">
          <h2 className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl font-normal text-white tracking-tight leading-[1.3] pt-1">
            Preparing students for{' '}
            <span className="text-[#38bdf8] font-light italic">tomorrow's innovations.</span>
          </h2>

          <p className="font-sans-modern text-sm sm:text-base text-white/70 mt-1 leading-relaxed">
            Seven hands-on technology domains.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-5xl mx-auto border-y border-white/15 divide-y divide-white/10"
        >
          {EMERGING_TECH_DATA.map((tech) => (
            <motion.article
              key={tech.name}
              variants={itemVariants}
              className="grid grid-cols-[2.5rem_minmax(0,1fr)] sm:grid-cols-[3rem_minmax(11rem,0.8fr)_minmax(0,1.8fr)] items-center gap-x-3 sm:gap-x-5 gap-y-1 py-2 sm:py-2.5"
            >
              <div className="row-span-2 sm:row-span-1 flex items-center justify-center sm:justify-start">
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

              <p className="col-start-2 sm:col-start-auto max-w-[42rem] font-sans-modern text-[13px] sm:text-sm text-white/70 leading-snug">
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
