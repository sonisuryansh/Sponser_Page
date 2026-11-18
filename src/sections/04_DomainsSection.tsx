import React, { useState } from 'react';
import { siteConfig, type DomainItem } from '../config/content.config';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cog,
  Radio,
  Bot,
  Network,
  Cpu,
  Shield,
  BarChart3,
  ScatterChart,
  Search,
  Plane,
  Target,
  Compass,
  X,
  ArrowRight,
} from 'lucide-react';

const iconClusterMap: Record<string, React.ReactNode> = {
  Gear: <Cog className="w-5 h-5" />,
  Sensor: <Radio className="w-5 h-5" />,
  RobotArm: <Bot className="w-5 h-5" />,
  Network: <Network className="w-5 h-5" />,
  Cpu: <Cpu className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  BarChart3: <BarChart3 className="w-5 h-5" />,
  Scatter: <ScatterChart className="w-5 h-5" />,
  Search: <Search className="w-5 h-5" />,
  Plane: <Plane className="w-5 h-5" />,
  Target: <Target className="w-5 h-5" />,
  Compass: <Compass className="w-5 h-5" />,
};

export const DomainsSection: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<DomainItem | null>(null);

  return (
    <section
      id="domains"
      data-chapter="04"
      className="relative w-full min-h-screen py-20 md:py-24 flex flex-col justify-between bg-[#0a0e14] text-white overflow-hidden select-none snap-start"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#c8a45d]/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col h-full justify-between">
        {/* Section Header */}
        <div className="mb-10 max-w-3xl">
          <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-3">
            {siteConfig.domainsSection.eyebrow}
          </div>
          <h2 className="font-serif text-[clamp(32px,3.8vw,52px)] font-normal leading-[1.14] tracking-tight text-white">
            {siteConfig.domainsSection.headline}
          </h2>
        </div>

        {/* Four Domain Cards (Quarter viewport width each on desktop, no overlap, no clipping) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-10">
          {siteConfig.domainsSection.domains.map((domain) => (
            <motion.div
              key={domain.id}
              layoutId={`card-container-${domain.id}`}
              onClick={() => setSelectedDomain(domain)}
              className="group relative h-[380px] sm:h-[420px] lg:h-[460px] p-7 md:p-8 flex flex-col justify-between bg-[#121822]/90 hover:bg-[#16202e] border border-white/10 hover:border-white/30 rounded-[2px] transition-colors duration-300 cursor-pointer overflow-hidden"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Subtle top indicator bar */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#c8a45d] font-mono">
                  Specialisation
                </span>
                {/* Cluster of 3 gently moving icons */}
                <div className="flex items-center gap-2 text-white/50 group-hover:text-white transition-colors">
                  {domain.movingIcons.map((ic, i) => (
                    <motion.span
                      key={ic}
                      animate={{ y: [0, -3, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: 'easeInOut',
                      }}
                      className="p-1"
                    >
                      {iconClusterMap[ic]}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Center / Body: Big Domain Name (48 to 64px range) */}
              <div className="my-auto">
                <motion.h3
                  layoutId={`card-title-${domain.id}`}
                  className="font-serif text-2xl sm:text-3xl lg:text-[34px] xl:text-[40px] font-normal leading-[1.12] tracking-tight text-white mb-4"
                >
                  {domain.name}
                </motion.h3>
                <p className="text-sm md:text-[15px] leading-relaxed text-white/70 line-clamp-3">
                  {domain.shortLine}
                </p>
              </div>

              {/* Bottom Subtle Underline Link */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs uppercase tracking-wider text-white/60 group-hover:text-white">
                <span className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-white after:origin-left group-hover:after:scale-x-100 after:scale-x-0 after:transition-transform">
                  Explore curriculum & process
                </span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Foundation Strip Under The Four Cards (Never a 5th card) */}
        <div className="border border-white/15 bg-white/[0.03] p-5 md:p-6 rounded-[2px] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-base md:text-lg text-[#c8a45d] font-mono px-3 py-1 bg-white/5 rounded-[2px]">
              {siteConfig.domainsSection.mathFoundation.symbols.map((sym) => (
                <span key={sym}>{sym}</span>
              ))}
            </div>
            <div>
              <h4 className="font-serif text-base md:text-lg font-medium text-white">
                {siteConfig.domainsSection.mathFoundation.title}
              </h4>
              <p className="text-xs md:text-sm text-white/70">
                {siteConfig.domainsSection.mathFoundation.description}
              </p>
            </div>
          </div>
          <span className="text-[11px] uppercase tracking-[0.16em] text-white/40 self-end md:self-center shrink-0">
            Unifying Foundation
          </span>
        </div>
      </div>

      {/* Shared-Element Deep Dive Modal (Framer Motion) */}
      <AnimatePresence>
        {selectedDomain && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-10 bg-black/80 backdrop-blur-md">
            <motion.div
              layoutId={`card-container-${selectedDomain.id}`}
              className="relative w-full max-w-4xl bg-[#111720] border border-white/20 rounded-[2px] p-8 md:p-12 text-white shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedDomain(null)}
                aria-label="Close details"
                className="absolute top-6 right-6 p-2 text-white/60 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Eyebrow & Title */}
              <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-2">
                Domain Deep Dive
              </div>
              <motion.h3
                layoutId={`card-title-${selectedDomain.id}`}
                className="font-serif text-3xl md:text-5xl font-normal tracking-tight text-white mb-4"
              >
                {selectedDomain.name}
              </motion.h3>
              <p className="text-base md:text-lg text-white/80 max-w-2xl mb-8 leading-relaxed">
                {selectedDomain.shortLine}
              </p>

              {/* Process Flow */}
              <div className="mb-10 p-5 bg-white/[0.04] border border-white/10 rounded-[2px]">
                <div className="text-[11px] uppercase tracking-[0.2em] text-white/50 mb-3 font-mono">
                  Engineering Learning Process
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  {selectedDomain.processFlow.map((step, idx) => (
                    <React.Fragment key={step}>
                      <span className="text-xs md:text-sm tracking-wider px-3 py-1.5 bg-white/10 border border-white/15 rounded-[2px] font-mono text-white">
                        {step}
                      </span>
                      {idx < selectedDomain.processFlow.length - 1 && (
                        <ArrowRight className="w-3.5 h-3.5 text-white/40 shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Grid: 3 Plain "What Students Do" Lines + One Real Photo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-8">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-4">
                    What Students Do
                  </div>
                  <ul className="space-y-4">
                    {selectedDomain.whatStudentsDo.map((line, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-[#c8a45d] rounded-full mt-2.5 shrink-0" />
                        <span className="text-sm md:text-base text-white/85 leading-relaxed">
                          {line}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Special Note (e.g. for Aerial Systems) */}
                  {selectedDomain.specialNote && (
                    <div className="mt-6 p-4 border border-[#c8a45d]/30 bg-[#c8a45d]/10 rounded-[2px] text-xs md:text-sm text-white/90">
                      {selectedDomain.specialNote}
                    </div>
                  )}
                </div>

                {/* Real Photo (No statistics) */}
                <div className="relative aspect-[4/3] rounded-[2px] overflow-hidden border border-white/15 bg-black/40">
                  <img
                    src={selectedDomain.image}
                    alt={`${selectedDomain.name} student laboratory work`}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 backdrop-blur-xs text-[10px] uppercase tracking-wider text-white/80 rounded-[2px]">
                    Laboratory Activity
                  </div>
                </div>
              </div>

              {/* Close Footer Action */}
              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setSelectedDomain(null)}
                  className="px-5 py-2 border border-white/30 hover:border-white text-xs uppercase tracking-[0.18em] text-white transition-colors rounded-[2px] cursor-pointer"
                >
                  Close Deep Dive
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
