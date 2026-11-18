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

// Rich domain color & badge theme mapping
const domainThemeMap: Record<
  string,
  {
    accent: string;
    badgeText: string;
    badgeBg: string;
    borderDefault: string;
    borderActive: string;
    cardBg: string;
    glowBg: string;
    badgeLabel: string;
    flowPill: string;
  }
> = {
  robotics: {
    accent: '#06b6d4',
    badgeText: 'text-cyan-400',
    badgeBg: 'bg-cyan-950/80 border-cyan-500/40 text-cyan-300',
    borderDefault: 'border-cyan-500/20 hover:border-cyan-400/60',
    borderActive: 'border-cyan-400 ring-1 ring-cyan-400/40',
    cardBg: 'bg-gradient-to-b from-[#0f1f2e] via-[#0d1722] to-[#0a1017]',
    glowBg: 'radial-gradient(circle at top right, rgba(6,182,212,0.18) 0%, transparent 65%)',
    badgeLabel: 'EMBEDDED BENCH',
    flowPill: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-200',
  },
  aiml: {
    accent: '#10b981',
    badgeText: 'text-emerald-400',
    badgeBg: 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300',
    borderDefault: 'border-emerald-500/20 hover:border-emerald-400/60',
    borderActive: 'border-emerald-400 ring-1 ring-emerald-400/40',
    cardBg: 'bg-gradient-to-b from-[#0d221c] via-[#0b1a16] to-[#08120f]',
    glowBg: 'radial-gradient(circle at top right, rgba(16,185,129,0.18) 0%, transparent 65%)',
    badgeLabel: 'NEURAL MODELS',
    flowPill: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-200',
  },
  data: {
    accent: '#f59e0b',
    badgeText: 'text-amber-400',
    badgeBg: 'bg-amber-950/80 border-amber-500/40 text-amber-300',
    borderDefault: 'border-amber-500/20 hover:border-amber-400/60',
    borderActive: 'border-amber-400 ring-1 ring-amber-400/40',
    cardBg: 'bg-gradient-to-b from-[#241a0d] via-[#1a140b] to-[#120d07]',
    glowBg: 'radial-gradient(circle at top right, rgba(245,158,11,0.18) 0%, transparent 65%)',
    badgeLabel: 'TELEMETRY LAB',
    flowPill: 'bg-amber-500/15 border-amber-500/30 text-amber-200',
  },
  aerial: {
    accent: '#38bdf8',
    badgeText: 'text-sky-400',
    badgeBg: 'bg-sky-950/80 border-sky-500/40 text-sky-300',
    borderDefault: 'border-sky-500/20 hover:border-sky-400/60',
    borderActive: 'border-sky-400 ring-1 ring-sky-400/40',
    cardBg: 'bg-gradient-to-b from-[#0c1e2b] via-[#0a1722] to-[#071017]',
    glowBg: 'radial-gradient(circle at top right, rgba(56,189,248,0.18) 0%, transparent 65%)',
    badgeLabel: 'AUTONOMOUS FLIGHT',
    flowPill: 'bg-sky-500/15 border-sky-500/30 text-sky-200',
  },
};

export const DomainsSection: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<DomainItem | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
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
        setActiveCardIndex((prev) => (prev === null ? 0 : (prev + 1) % domains.length));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setActiveCardIndex((prev) => (prev === null ? domains.length - 1 : (prev - 1 + domains.length) % domains.length));
      } else if (e.key === 'Enter' && activeCardIndex !== null) {
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

        {/* Four Distinctly Colored Cards in Fan */}
        <div
          ref={fanDeckRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 w-full my-auto"
        >
          {siteConfig.domainsSection.domains.map((domain, idx) => {
            const isKeyboardActive = activeCardIndex !== null && activeCardIndex === idx;
            const theme = domainThemeMap[domain.id] || domainThemeMap.robotics;

            return (
              <motion.div
                key={domain.id}
                layoutId={`card-container-${domain.id}`}
                onClick={() => {
                  setActiveCardIndex(idx);
                  setSelectedDomain(domain);
                }}
                className={`domain-fan-card group relative h-[310px] sm:h-[350px] lg:h-[370px] p-5 md:p-6 flex flex-col justify-between rounded-[4px] transition-all duration-300 cursor-pointer overflow-hidden border shadow-lg ${
                  theme.cardBg
                } ${
                  isKeyboardActive
                    ? `${theme.borderActive} shadow-xl scale-[1.02]`
                    : `${theme.borderDefault} hover:scale-[1.01]`
                }`}
                style={{
                  boxShadow: isKeyboardActive
                    ? `0 12px 35px -8px ${theme.accent}40`
                    : '0 8px 24px -10px rgba(0,0,0,0.5)',
                }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Ambient Radial Color Glow in Top Corner */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity"
                  style={{ background: theme.glowBg }}
                  aria-hidden="true"
                />

                {/* Top: Chapter index + Domain Badge Pill + Moving Icons */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-white/50">
                      CH 0{idx + 4}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-[2px] border text-[9px] font-mono uppercase tracking-wider font-semibold ${theme.badgeBg}`}
                    >
                      {theme.badgeLabel}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-white/60 group-hover:text-white transition-colors">
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
                        style={{ color: theme.accent }}
                      >
                        {iconClusterMap[ic]}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Center / Body: Big Domain Name & Short Line */}
                <div className="relative z-10 my-auto">
                  <motion.h3
                    layoutId={`card-title-${domain.id}`}
                    className="font-serif text-2xl sm:text-[28px] lg:text-[32px] font-normal leading-[1.12] tracking-tight text-white mb-2.5"
                  >
                    {domain.name}
                  </motion.h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-white/80 line-clamp-3">
                    {domain.shortLine}
                  </p>
                </div>

                {/* Bottom Underline Link */}
                <div className="relative z-10 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] uppercase tracking-wider text-white/70 group-hover:text-white">
                  <span
                    className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-current after:origin-left group-hover:after:scale-x-100 after:scale-x-0 after:transition-transform"
                    style={{ color: theme.accent }}
                  >
                    Explore Deep Dive
                  </span>
                  <ArrowRight
                    className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform"
                    style={{ color: theme.accent }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Foundation Strip at Base (Royal Indigo / Gold Logic & Proof) */}
        <div className="border border-indigo-500/25 bg-gradient-to-r from-indigo-950/40 via-[#101420] to-[#121624] px-5 py-3 rounded-[3px] flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 ml-0 md:ml-52 shadow-md">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded-[2px] bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 font-mono text-[9px] uppercase tracking-wider font-semibold shrink-0">
              LOGIC & PROOF
            </span>
            <div className="flex items-center gap-1.5 text-sm text-[#c8a45d] font-mono px-2 py-0.5 bg-white/5 rounded-[2px]">
              {siteConfig.domainsSection.mathFoundation.symbols.map((sym) => (
                <span key={sym}>{sym}</span>
              ))}
            </div>
            <div>
              <h4 className="font-serif text-sm md:text-base font-medium text-white inline-block mr-2">
                {siteConfig.domainsSection.mathFoundation.title}:
              </h4>
              <span className="text-xs text-white/75">
                {siteConfig.domainsSection.mathFoundation.description}
              </span>
            </div>
          </div>
          <span className="text-[10px] uppercase tracking-[0.16em] text-indigo-300/70 self-end sm:self-center shrink-0">
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
              className="relative w-full max-w-4xl bg-[#0f1722] border border-white/20 rounded-[4px] p-6 md:p-10 text-white shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedDomain(null)}
                aria-label="Close details"
                className="absolute top-6 right-6 p-2 text-white/60 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-6 pb-4 border-b border-white/10 pr-10">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-[2px] border text-[10px] font-mono uppercase tracking-widest font-semibold ${
                      domainThemeMap[selectedDomain.id]?.badgeBg || 'bg-white/10 text-white'
                    }`}
                  >
                    {domainThemeMap[selectedDomain.id]?.badgeLabel || 'SPECIALISATION'}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-mono">
                    Engineering Deep Dive
                  </span>
                </div>
                <motion.h3
                  layoutId={`card-title-${selectedDomain.id}`}
                  className="font-serif text-3xl sm:text-4xl text-white font-normal"
                >
                  {selectedDomain.name}
                </motion.h3>
                <p className="text-sm sm:text-base text-white/75 mt-2 font-sans">
                  {selectedDomain.shortLine}
                </p>
              </div>

              {/* Process Flow Badges */}
              <div className="mb-8">
                <span className="text-[11px] uppercase tracking-wider text-white/50 font-mono block mb-3">
                  Iterative Engineering Cycle:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {selectedDomain.processFlow.map((step, idx) => (
                    <React.Fragment key={step}>
                      <span
                        className={`px-3 py-1 rounded-[2px] border text-xs font-mono tracking-wider ${
                          domainThemeMap[selectedDomain.id]?.flowPill || 'bg-white/5 border-white/15 text-white'
                        }`}
                      >
                        {step}
                      </span>
                      {idx < selectedDomain.processFlow.length - 1 && (
                        <ArrowRight className="w-3.5 h-3.5 text-white/30 shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* What Students Do */}
              <div className="mb-8">
                <span className="text-[11px] uppercase tracking-wider text-white/50 font-mono block mb-3">
                  Practical Student Activities:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedDomain.whatStudentsDo.map((act, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-[2px] bg-white/[0.03] border border-white/10 text-xs sm:text-sm text-white/90 leading-relaxed flex flex-col justify-between"
                    >
                      <span
                        className="font-mono text-xs mb-2 block"
                        style={{ color: domainThemeMap[selectedDomain.id]?.accent || '#c8a45d' }}
                      >
                        PRACTICE 0{i + 1}
                      </span>
                      <p>{act}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Note if Present */}
              {selectedDomain.specialNote && (
                <div className="p-4 rounded-[2px] bg-sky-950/40 border border-sky-500/30 text-xs text-sky-200 font-sans mb-6">
                  <span className="font-semibold uppercase tracking-wider block mb-1">
                    Flight Safety Standard:
                  </span>
                  {selectedDomain.specialNote}
                </div>
              )}

              {/* Close Action */}
              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setSelectedDomain(null)}
                  className="px-6 py-2 border border-white/30 hover:border-white text-xs uppercase tracking-[0.18em] transition-colors cursor-pointer"
                >
                  Close Deep Dive
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ChapterShell>
  );
};
