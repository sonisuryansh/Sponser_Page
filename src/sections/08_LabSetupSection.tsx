import React, { useState, useEffect, useRef, useCallback } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import gsap from 'gsap';

const zoneColorMap = [
  {
    name: 'Build bench',
    activeBtn: 'bg-amber-950/85 border-amber-400 text-amber-100 shadow-[0_0_16px_rgba(245,158,11,0.4)] ring-1 ring-amber-400/50',
    dot: 'bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.9)]',
    badge: 'text-amber-400',
    tag: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
  },
  {
    name: 'Computer area',
    activeBtn: 'bg-cyan-950/85 border-cyan-400 text-cyan-100 shadow-[0_0_16px_rgba(6,182,212,0.4)] ring-1 ring-cyan-400/50',
    dot: 'bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.9)]',
    badge: 'text-cyan-400',
    tag: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300',
  },
  {
    name: 'Drone control zone',
    activeBtn: 'bg-sky-950/85 border-sky-400 text-sky-100 shadow-[0_0_16px_rgba(56,189,248,0.4)] ring-1 ring-sky-400/50',
    dot: 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]',
    badge: 'text-sky-400',
    tag: 'bg-sky-500/15 border-sky-500/30 text-sky-300',
  },
  {
    name: 'Kit storage',
    activeBtn: 'bg-emerald-950/85 border-emerald-400 text-emerald-100 shadow-[0_0_16px_rgba(16,185,129,0.4)] ring-1 ring-emerald-400/50',
    dot: 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.9)]',
    badge: 'text-emerald-400',
    tag: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
  },
];

interface ZoneExtendedSpec {
  roleBadge: string;
  summary: string;
  equipment: string[];
  deliverables: string[];
  safetyStandards: string[];
}

const ZONE_EXTENDED_SPECS: ZoneExtendedSpec[] = [
  {
    roleBadge: 'Hardware Prototyping & Soldering',
    summary: 'Dedicated electrical engineering benches equipped for rapid circuit assembly, through-hole & SMD soldering, motor driver topologies, and diagnostic signal testing.',
    equipment: [
      'Temperature-regulated soldering stations (200–480°C)',
      'Variable 0–30V / 5A DC regulated power supplies',
      'Anti-static ESD silicone mats & grounded wrist straps',
      'Dual-channel digital storage oscilloscopes (100MHz)',
    ],
    deliverables: [
      'Custom sensor breadboards & soldered PCB assemblies',
      'Precision motor driver wiring harnesses',
      'Signal validation & power rail diagnostics',
      'Closed-loop actuator calibration & load testing',
    ],
    safetyStandards: [
      'ESD Dissipative Surface',
      'Active Fume Extraction',
      'Emergency Cutoff Switch',
      'ANSI Z87.1 Eye Protection',
    ],
  },
  {
    roleBadge: 'Computing, Firmware & Simulation',
    summary: 'Networked workstations designed for real-time firmware compilation, CAD 3D modeling, algorithm scripting, and telemetry visualization across robotics & AI pipelines.',
    equipment: [
      'High-performance networked engineering PCs (Intel Core i7)',
      'Dual-display monitors for split-screen code & CAD modeling',
      'Pre-configured VS Code, Arduino IDE & ROS 2 toolchains',
      'High-speed hardware debuggers & serial loggers',
    ],
    deliverables: [
      'Embedded firmware compilation & device flashing',
      'Real-time IMU and environmental sensor plotting',
      '3D printable mechanical CAD chassis designs',
      'Closed-loop PID algorithmic parameter optimization',
    ],
    safetyStandards: [
      'Isolated Lab Subnet',
      'Anti-Static Seating',
      'Automated Cloud Backups',
      'Ergonomic Workstations',
    ],
  },
  {
    roleBadge: 'Tethered Flight & Arena Control',
    summary: 'Enclosed indoor flight testing facility engineered for aerial kinematics, PID flight controller calibration, optical localization, and obstacle navigation.',
    equipment: [
      '360° high-tensile protective safety netting enclosure',
      'Digital 2.4GHz / ExpressLRS low-latency transmitters',
      'Optical flow navigation sensors & precision landing pads',
      'Modular indoor obstacle hoops & aerial slalom courses',
    ],
    deliverables: [
      'Multi-axis PID stabilization tuning & flight logs',
      'Waypoint autonomous mission route execution',
      'Low-altitude obstacle avoidance maneuvering',
      'Real-time failsafe recovery & emergency landing drills',
    ],
    safetyStandards: [
      'Enclosed Safety Netting',
      'LiPo Safety Charging Bunker',
      'Emergency Kill-Switch Lanyard',
      'Dual Fire Extinguishers',
    ],
  },
  {
    roleBadge: 'Logistics, Tooling & Asset Vault',
    summary: 'Modular component inventory and tooling logistics center ensuring high-density organized storage, hardware tracking, component accountability, and team access.',
    equipment: [
      'Heavy-duty industrial steel racking & modular bins',
      'Conductive anti-static component distribution drawers',
      'Calibrated precision torque drivers, crimpers & strippers',
      'Digital barcode / QR inventory check-in / check-out terminal',
    ],
    deliverables: [
      'Student team kit distribution & asset auditing',
      'Consumable hardware inventory reconciliation',
      'Safe LiPo battery conditioning & storage logs',
      'Fastener & harness sub-assembly staging',
    ],
    safetyStandards: [
      'Climate-Controlled Storage',
      'Visual Tool Shadow Boards',
      'Anti-Static Component Bags',
      'Inventory Tracking Logs',
    ],
  },
];

export const LabSetupSection: React.FC = () => {
  const [activeZoneIndex, setActiveZoneIndex] = useState(0);
  const [isSectionActive, setIsSectionActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sidePanelRef = useRef<HTMLDivElement>(null);

  const zones = siteConfig.labSetup.zones;

  // Detect whether this section/slide is currently visible and active in viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const checkActive = () => {
      const slideWrapper = el.closest<HTMLElement>('.slide-item');
      if (slideWrapper) {
        const visible = slideWrapper.style.visibility === 'visible' && slideWrapper.style.opacity !== '0';
        setIsSectionActive(visible);
        return visible;
      }
      setIsSectionActive(true);
      return true;
    };

    checkActive();

    const slideWrapper = el.closest<HTMLElement>('.slide-item');
    let observer: MutationObserver | null = null;
    if (slideWrapper) {
      observer = new MutationObserver(() => {
        checkActive();
      });
      observer.observe(slideWrapper, { attributes: true, attributeFilter: ['style', 'class'] });
    }

    const pollTimer = setInterval(checkActive, 500);

    return () => {
      observer?.disconnect();
      clearInterval(pollTimer);
    };
  }, []);

  // Chronological zone cycling when user is on this section
  const activeZoneIndexRef = useRef(activeZoneIndex);
  const lastStepTimeRef = useRef(0);
  useEffect(() => {
    activeZoneIndexRef.current = activeZoneIndex;
  }, [activeZoneIndex]);

  useEffect(() => {
    if (!isSectionActive || isHovered || zones.length <= 1) return;

    const timer = setInterval(() => {
      setActiveZoneIndex((prev) => (prev + 1) % zones.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isSectionActive, isHovered, zones.length]);

  // Step forward or backward through zones with rate limiting & boundary check
  const stepZone = useCallback(
    (dir: number): boolean => {
      const now = Date.now();
      // 360ms rate limit ensures each wheel tick advances exactly one zone cleanly
      if (now - lastStepTimeRef.current < 360) {
        return true; // Still within cooldown: swallow momentum scroll events!
      }

      const cur = activeZoneIndexRef.current;
      if (dir > 0) {
        if (cur < zones.length - 1) {
          lastStepTimeRef.current = now;
          const next = cur + 1;
          activeZoneIndexRef.current = next;
          setActiveZoneIndex(next);
          return true;
        }
        return false; // Zone 04 reached: allow slide transition to next slide
      } else if (dir < 0) {
        if (cur > 0) {
          lastStepTimeRef.current = now;
          const prev = cur - 1;
          activeZoneIndexRef.current = prev;
          setActiveZoneIndex(prev);
          return true;
        }
        return false; // Zone 01 reached: allow slide transition back
      }
      return false;
    },
    [zones.length]
  );

  // Listen to step navigation events (wheel scroll & arrow keys hooked to slide:step)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleStep = (e: Event) => {
      const customEvent = e as CustomEvent<{ direction: number }>;
      const dir = customEvent.detail?.direction || 1;
      const handled = stepZone(dir);
      if (handled) {
        e.preventDefault();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      if (Math.abs(e.deltaY) < 14) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      const handled = stepZone(dir);
      if (handled) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleEnter = (e: Event) => {
      const customEvent = e as CustomEvent<{ direction: number }>;
      const dir = customEvent.detail?.direction || 1;
      const targetIdx = dir > 0 ? 0 : zones.length - 1;
      activeZoneIndexRef.current = targetIdx;
      setActiveZoneIndex(targetIdx);
    };

    el.addEventListener('slide:step', handleStep);
    el.addEventListener('slide:enter', handleEnter);
    el.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      el.removeEventListener('slide:step', handleStep);
      el.removeEventListener('slide:enter', handleEnter);
      el.removeEventListener('wheel', handleWheel);
    };
  }, [stepZone, zones.length]);

  // Gentle side panel transition when active zone changes
  useEffect(() => {
    if (sidePanelRef.current) {
      gsap.fromTo(
        sidePanelRef.current,
        { opacity: 0.3, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    }
  }, [activeZoneIndex]);

  const currentZone = zones[activeZoneIndex];
  const activeColor = zoneColorMap[activeZoneIndex] || zoneColorMap[0];

  return (
    <ChapterShell
      id="lab-setup"
      chapterNumber="08"
      theme="dark"
      steps={4}
      fullBleed={true}
      className="relative w-full h-[100svh] overflow-hidden bg-[#0A0E14] select-none"
    >
      {/* 100svh Viewport Container with data-steppable */}
      <div
        ref={containerRef}
        data-steppable="true"
        className="relative w-full h-full max-h-full min-h-0 flex-1 flex flex-col justify-between items-center pt-[calc(var(--header-h,64px)+2px)] pb-2 sm:pb-3 px-3 sm:px-5 lg:px-6 xl:px-8 box-border select-none z-10 max-w-[1440px] mx-auto overflow-hidden"
      >
        {/* Main Inset Card Container - Light Grey Slate Whole Card with Light Grey Border */}
        <div className="relative w-full h-full max-h-full min-h-0 flex-1 my-auto max-h-[820px] xl:max-h-[860px] bg-[#12161F]/90 backdrop-blur-2xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.1)] rounded-2xl sm:rounded-3xl flex flex-col justify-between p-3 sm:p-4 lg:p-4.5 box-border z-10 overflow-hidden gap-2">

          {/* Eyebrow & Statement Headline */}
          <div className="flex-none max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-0.5 sm:mb-1">
              <span className="h-[1px] w-6 sm:w-8 bg-[#b45309]/50" />
              <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.24em] text-[#b45309]">
                {siteConfig.labSetup.eyebrow}
              </span>
              <span className="h-[1px] w-6 sm:w-8 bg-[#b45309]/50" />
            </div>
            <h2 className="font-serif text-lg sm:text-2xl lg:text-[26px] font-bold leading-tight tracking-tight text-white mb-0.5 text-center">
              {siteConfig.labSetup.headline}
            </h2>
            <p className="text-[10.5px] sm:text-[11.5px] text-white/70 font-sans max-w-2xl mx-auto leading-snug line-clamp-2">
              {siteConfig.labSetup.paragraph}
            </p>
          </div>

          {/* Top-Down Lab Layout & Interactive Hotspot Zones - Balanced 5:7 Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 items-stretch flex-1 min-h-0 border-t border-white/10 pt-2 sm:pt-2.5 overflow-hidden">
            {/* Lab Visualization Photo with Zone Pins (Span 5 of 12 - Proportional, Sleek, Not Oversized) */}
            <div className="lg:col-span-5 relative h-full min-h-[140px] sm:min-h-[180px] lg:min-h-0 rounded-xl overflow-hidden border border-white/20 bg-black/40 shadow-xl flex flex-col justify-between">
              <img
                src={siteConfig.labSetup.labImage}
                alt="MedhaArc Labs School STEM Laboratory Plan"
                className="w-full h-full object-cover filter brightness-95 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30 pointer-events-none" />

              {/* Zone Markers on Image */}
              <div className="absolute inset-0 p-2 sm:p-2.5 flex flex-col justify-between pointer-events-none">
                <div className="flex items-center justify-between text-[8px] sm:text-[8.5px] font-mono uppercase tracking-widest text-white/70">
                  <span className="px-1.5 py-0.5 rounded-[2px] bg-black/70 backdrop-blur-xs border border-white/10">Dedicated Space Layout</span>
                  <span className="px-1.5 py-0.5 rounded-[2px] bg-black/70 backdrop-blur-xs border border-white/10">Safety & Flow Standard</span>
                </div>

                {/* Pin Buttons on Image */}
                <div
                  className="grid grid-cols-2 gap-1.5 pointer-events-auto"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {zones.map((zone, idx) => {
                    const isActive = activeZoneIndex === idx;
                    const cInfo = zoneColorMap[idx] || zoneColorMap[0];

                    return (
                      <button
                        key={zone.id}
                        onClick={() => setActiveZoneIndex(idx)}
                        className={`text-left p-1.5 rounded-lg backdrop-blur-md transition-all text-[9px] sm:text-[9.5px] font-mono tracking-wider cursor-pointer border ${isActive
                          ? cInfo.activeBtn
                          : 'bg-black/60 border-white/20 text-white/75 hover:bg-black/80 hover:text-white'
                          }`}
                      >
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-semibold text-[8.5px] sm:text-[9px]">ZONE 0{idx + 1}</span>
                          <span
                            className={`w-1.5 h-1.5 rounded-full transition-all ${isActive ? cInfo.dot : 'bg-white/40'
                              }`}
                          />
                        </div>
                        <div className="font-sans font-medium text-[10px] sm:text-[10.5px] truncate">
                          {zone.name}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Detailed Side Panel for Active Zone (Span 7 of 12 - Rich Engineering Specifications) */}
            <div
              ref={sidePanelRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="lg:col-span-7 p-3 sm:p-3.5 lg:p-4 rounded-xl bg-gradient-to-b from-white/[0.08] via-white/[0.04] to-transparent border border-white/15 backdrop-blur-md flex flex-col justify-between h-full min-h-0 shadow-lg overflow-hidden"
            >
              {(() => {
                const spec = ZONE_EXTENDED_SPECS[activeZoneIndex] || ZONE_EXTENDED_SPECS[0];
                return (
                  <div className="flex-1 flex flex-col justify-between min-h-0 gap-2 sm:gap-2.5 overflow-hidden">
                    {/* Top Zone Header */}
                    <div className="flex-none">
                      <div className="flex items-center justify-between mb-1 sm:mb-1.5 border-b border-white/10 pb-1">
                        <span className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-wider font-bold ${activeColor.badge}`}>
                          ZONE 0{activeZoneIndex + 1} OF 0{zones.length} &bull; {spec.roleBadge}
                        </span>
                        <span className="text-[9px] sm:text-[9.5px] font-mono text-white/60 px-2 py-0.5 bg-white/5 rounded-[2px] border border-white/10">
                          Active STEM Zone
                        </span>
                      </div>

                      <h3 className="font-serif text-lg sm:text-xl lg:text-[22px] text-white font-bold mb-1 leading-tight tracking-tight">
                        {currentZone.name}
                      </h3>

                      <p className="text-[10.5px] sm:text-[11px] text-white/80 font-sans leading-snug font-normal line-clamp-2">
                        {spec.summary}
                      </p>
                    </div>

                    {/* Middle Two-Column Grid: Hardware Specs & Student Deliverables */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 flex-1 min-h-0 items-stretch my-1">
                      {/* Box 1: Workstation Equipment & Hardware */}
                      <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/12 flex flex-col justify-start gap-2.5 sm:gap-3 min-h-0 shadow-xs">
                        <div className="text-[9px] sm:text-[9.5px] uppercase tracking-wider text-white/70 font-mono font-bold mb-2 flex items-center gap-1.5 flex-none">
                          <span className={`w-1.5 h-1.5 rounded-full ${activeColor.dot}`} />
                          <span>Workstation Hardware & Tools</span>
                        </div>
                        <ul className="space-y-2 sm:space-y-2.5 font-sans text-[10px] sm:text-[11px] text-white/85 my-auto">
                          {spec.equipment.map((item, i) => (
                            <li key={i} className="flex items-start gap-1.5 leading-snug">
                              <span className="text-white/40 text-[9px] shrink-0 mt-0.5">&bull;</span>
                              <span className="line-clamp-2">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Box 2: Student Deliverables & Mastery */}
                      <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/12 flex flex-col justify-start gap-2.5 sm:gap-3 min-h-0 shadow-xs">
                        <div className="text-[9px] sm:text-[9.5px] uppercase tracking-wider text-white/70 font-mono font-bold mb-2 flex items-center gap-1.5 flex-none">
                          <span className={`w-1.5 h-1.5 rounded-full ${activeColor.dot}`} />
                          <span>Student Builds & Lab Mastery</span>
                        </div>
                        <ul className="space-y-2 sm:space-y-2.5 font-sans text-[10px] sm:text-[11px] text-white/85 my-auto">
                          {spec.deliverables.map((item, i) => (
                            <li key={i} className="flex items-start gap-1.5 leading-snug">
                              <span className="text-white/40 text-[9px] shrink-0 mt-0.5">&bull;</span>
                              <span className="line-clamp-2">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom Standards & Safety Badges */}
                    <div className="border-t border-white/10 pt-2 flex-none">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[8.5px] sm:text-[9px] uppercase tracking-wider text-white/50 font-mono font-bold">
                          Operational Safety &amp; Control Standards:
                        </span>
                        <span className="text-[8.5px] font-mono text-emerald-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Inspected Standard
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 sm:gap-1.5">
                        {spec.safetyStandards.map((std, i) => (
                          <span
                            key={i}
                            className={`px-2 py-0.5 rounded-[3px] border text-[9px] sm:text-[9.5px] font-sans font-medium ${activeColor.tag}`}
                          >
                            {std}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Safety & Compliance Badge Inside Card Footer */}
          <div className="border-t border-white/10 pt-1.5 flex items-center justify-between text-[9.5px] sm:text-[10.5px] font-mono text-white/50 flex-none">
            <span>Electrical, ESD & Ventilation Safety Compliant</span>
            <span>Dual Fire-Extinguisher & First-Aid Protocol</span>
          </div>
        </div>
      </div>
    </ChapterShell>
  );
};
