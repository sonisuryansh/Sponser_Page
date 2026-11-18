import React, { useState, useEffect, useRef } from 'react';
import { siteConfig, type DomainItem } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
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
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const iconClusterMap: Record<string, React.ReactNode> = {
  Gear: <Cog className="w-4 h-4" />,
  Sensor: <Radio className="w-4 h-4" />,
  RobotArm: <Bot className="w-4 h-4" />,
  Network: <Network className="w-4 h-4" />,
  Cpu: <Cpu className="w-4 h-4" />,
  Shield: <Shield className="w-4 h-4" />,
  BarChart3: <BarChart3 className="w-4 h-4" />,
  Scatter: <ScatterChart className="w-4 h-4" />,
  Search: <Search className="w-4 h-4" />,
  Plane: <Plane className="w-4 h-4" />,
  Target: <Target className="w-4 h-4" />,
  Compass: <Compass className="w-4 h-4" />,
};

export const DomainsSection: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<DomainItem | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const fanDeckRef = useRef<HTMLDivElement>(null);

  // GSAP Fan-in animation on scroll
  useEffect(() => {
    const el = fanDeckRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const cards = el.querySelectorAll<HTMLElement>('.domain-fan-card');

    // Failsafe: force cards visible
    const failsafe = setTimeout(() => {
      cards.forEach((c) => {
        c.style.opacity = '1';
        c.style.transform = 'none';
      });
    }, 2500);

    if (prefersReducedMotion || isMobile || !document.documentElement.classList.contains('js-motion')) {
      cards.forEach((c) => {
        c.style.opacity = '1';
        c.style.transform = 'none';
      });
      return () => clearTimeout(failsafe);
    }

    const tween = gsap.fromTo(
      cards,
      {
        y: 80,
        opacity: 0.2,
        rotate: (i) => (i - 1.5) * -4,
      },
      {
        y: 0,
        opacity: 1,
        rotate: 0,
        duration: 1.0,
        stagger: 0.1,
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
        immediateRender: false,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      }
    );

    return () => {
      clearTimeout(failsafe);
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  // Keyboard navigation within domain fan
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedDomain) return; // Modal is open
      const domains = siteConfig.domainsSection.domains;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setActiveCardIndex((prev) => (prev + 1) % domains.length);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setActiveCardIndex((prev) => (prev - 1 + domains.length) % domains.length);
      } else if (e.key === 'Enter') {
        setSelectedDomain(domains[activeCardIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDomain, activeCardIndex]);

  return (
    <ChapterShell id="domains" chapterNumber="04" theme="dark">
      <div className="w-full flex-1 flex flex-col justify-between py-2 select-none">
        {/* Section Header */}
        <div className="mb-4 max-w-3xl">
          <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-1.5">
            {siteConfig.domainsSection.eyebrow}
          </div>
          <h2 className="font-serif text-[clamp(26px,3.4vw,46px)] font-normal leading-[1.14] tracking-tight text-white">
            {siteConfig.domainsSection.headline}
          </h2>
        </div>

        {/* Four Tall Cards in a Fan (Zero overlap, perfectly sized to fit 100svh) */}
        <div
          ref={fanDeckRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 w-full my-auto"
        >
          {siteConfig.domainsSection.domains.map((domain, idx) => {
            const isKeyboardActive = activeCardIndex === idx;
            return (
              <motion.div
                key={domain.id}
                layoutId={`card-container-${domain.id}`}
                onClick={() => {
                  setActiveCardIndex(idx);
                  setSelectedDomain(domain);
                }}
                className={`domain-fan-card group relative h-[300px] sm:h-[340px] lg:h-[360px] p-5 md:p-6 flex flex-col justify-between rounded-[2px] transition-all duration-300 cursor-pointer overflow-hidden border ${
                  isKeyboardActive
                    ? 'bg-[#151e2b] border-[#c8a45d] shadow-lg'
                    : 'bg-[#121822]/90 hover:bg-[#16202e] border-white/10 hover:border-white/30'
                }`}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Top: Cluster of 3 gently moving icons (No "SPECIALISATION" label) */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-white/40">
                    0{idx + 1}
                  </span>
                  <div className="flex items-center gap-1.5 text-white/50 group-hover:text-white transition-colors">
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
                        className="p-0.5"
                      >
                        {iconClusterMap[ic]}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Center / Body: Big Domain Name & Short Line */}
                <div className="my-auto">
                  <motion.h3
                    layoutId={`card-title-${domain.id}`}
                    className="font-serif text-2xl sm:text-[28px] lg:text-[32px] font-normal leading-[1.12] tracking-tight text-white mb-2.5"
                  >
                    {domain.name}
                  </motion.h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-white/70 line-clamp-3">
                    {domain.shortLine}
                  </p>
                </div>

                {/* Bottom Underline Link */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] uppercase tracking-wider text-white/60 group-hover:text-white">
                  <span className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-white after:origin-left group-hover:after:scale-x-100 after:scale-x-0 after:transition-transform">
                    Deep Dive
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Foundation Strip at Base (Indented from bottom-left HUD) */}
        <div className="border border-white/15 bg-white/[0.03] px-5 py-3 rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 ml-0 md:ml-52">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-sm text-[#c8a45d] font-mono px-2 py-0.5 bg-white/5 rounded-[2px]">
              {siteConfig.domainsSection.mathFoundation.symbols.map((sym) => (
                <span key={sym}>{sym}</span>
              ))}
            </div>
            <div>
              <h4 className="font-serif text-sm md:text-base font-medium text-white inline-block mr-2">
                {siteConfig.domainsSection.mathFoundation.title}:
              </h4>
              <span className="text-xs text-white/70">
                {siteConfig.domainsSection.mathFoundation.description}
              </span>
            </div>
          </div>
          <span className="text-[10px] uppercase tracking-[0.16em] text-white/40 self-end sm:self-center shrink-0">
            Unifying Base
          </span>
        </div>
      </div>

      {/* Shared-Element Deep Dive Modal (Framer Motion) */}
      <AnimatePresence>
        {selectedDomain && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md">
            <motion.div
              layoutId={`card-container-${selectedDomain.id}`}
              className="relative w-full max-w-4xl bg-[#111720] border border-white/20 rounded-[2px] p-6 md:p-10 text-white shadow-2xl overflow-y-auto max-h-[90vh]"
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
              <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-1.5">
                Domain Deep Dive
              </div>
              <motion.h3
                layoutId={`card-title-${selectedDomain.id}`}
                className="font-serif text-2xl md:text-4xl font-normal tracking-tight text-white mb-2"
              >
                {selectedDomain.name}
              </motion.h3>
              <p className="text-sm md:text-base text-white/80 max-w-2xl mb-6 leading-relaxed">
                {selectedDomain.shortLine}
              </p>

              {/* Process Flow with Animation */}
              <div className="mb-6 p-4 bg-white/[0.04] border border-white/10 rounded-[2px]">
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2 font-mono">
                  Engineering Learning Process
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {selectedDomain.processFlow.map((step, idx) => (
                    <React.Fragment key={step}>
                      <span className="text-xs tracking-wider px-2.5 py-1 bg-white/10 border border-white/15 rounded-[2px] font-mono text-white">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-3">
                    What Students Do
                  </div>
                  <ul className="space-y-3">
                    {selectedDomain.whatStudentsDo.map((line, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 bg-[#c8a45d] rounded-full mt-2 shrink-0" />
                        <span className="text-xs sm:text-sm text-white/85 leading-relaxed">
                          {line}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Special Note (e.g. for Aerial Systems) */}
                  {selectedDomain.specialNote && (
                    <div className="mt-4 p-3 border border-[#c8a45d]/30 bg-[#c8a45d]/10 rounded-[2px] text-xs text-white/90">
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
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur-xs text-[10px] uppercase tracking-wider text-white/80 rounded-[2px]">
                    Laboratory Activity
                  </div>
                </div>
              </div>

              {/* Close Footer Action */}
              <div className="pt-3 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setSelectedDomain(null)}
                  className="px-4 py-1.5 border border-white/30 hover:border-white text-xs uppercase tracking-[0.18em] text-white transition-colors rounded-[2px] cursor-pointer"
                >
                  Close Deep Dive (Esc)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ChapterShell>
  );
};
