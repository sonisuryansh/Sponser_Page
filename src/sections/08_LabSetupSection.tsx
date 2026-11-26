import React, { useState, useEffect, useRef } from 'react';
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

  // Listen to step navigation events (wheel scroll & arrow keys hooked to slide:step)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleStep = (e: Event) => {
      const customEvent = e as CustomEvent<{ direction: number }>;
      const dir = customEvent.detail?.direction || 1;
      const cur = activeZoneIndexRef.current;

      if (dir > 0) {
        // Step forward chronologically: Zone 01 -> 02 -> 03 -> 04
        if (cur < zones.length - 1) {
          e.preventDefault();
          setActiveZoneIndex(cur + 1);
        }
      } else if (dir < 0) {
        // Step backward: Zone 04 -> 03 -> 02 -> 01
        if (cur > 0) {
          e.preventDefault();
          setActiveZoneIndex(cur - 1);
        }
      }
    };

    const handleEnter = (e: Event) => {
      const customEvent = e as CustomEvent<{ direction: number }>;
      const dir = customEvent.detail?.direction || 1;
      if (dir > 0) {
        setActiveZoneIndex(0);
      } else {
        setActiveZoneIndex(zones.length - 1);
      }
    };

    el.addEventListener('slide:step', handleStep);
    el.addEventListener('slide:enter', handleEnter);
    return () => {
      el.removeEventListener('slide:step', handleStep);
      el.removeEventListener('slide:enter', handleEnter);
    };
  }, [zones.length]);

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
        className="relative w-full h-full min-h-full flex-1 flex flex-col justify-center items-center pt-[calc(var(--header-h,64px)+2px)] pb-2 sm:pb-3 px-4 sm:px-6 lg:px-8 xl:px-10 box-border select-none z-10 max-w-[1440px] mx-auto overflow-hidden"
      >
        {/* Main Inset Card Container - Light Grey Slate Whole Card with Light Grey Border */}
        <div className="relative w-full h-full flex-1 bg-[#12161F]/90 backdrop-blur-2xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.1)] rounded-2xl flex flex-col justify-between p-3 sm:p-4 lg:p-4.5 box-border z-10 overflow-hidden">

            {/* Eyebrow & Statement Headline */}
            <div className="mb-2 max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="h-[1px] w-6 sm:w-8 bg-[#b45309]/50" />
                <span className="font-mono text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#b45309]">
                  {siteConfig.labSetup.eyebrow}
                </span>
                <span className="h-[1px] w-6 sm:w-8 bg-[#b45309]/50" />
              </div>
              <h2 className="font-serif text-xl sm:text-2xl lg:text-[27px] font-bold leading-tight tracking-tight text-white mb-0.5 text-center">
                {siteConfig.labSetup.headline}
              </h2>
              <p className="text-[11px] sm:text-xs text-white/70 font-sans max-w-2xl mx-auto leading-snug line-clamp-2">
                {siteConfig.labSetup.paragraph}
              </p>
            </div>

            {/* Top-Down Lab Layout & Interactive Hotspot Zones */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 items-stretch my-auto border-t border-white/10 pt-2 mb-1.5">
              {/* Lab Visualization Photo with Zone Pins */}
              <div className="lg:col-span-7 relative aspect-[16/10] max-h-[200px] sm:max-h-[220px] rounded-lg overflow-hidden border border-white/20 bg-black/40 shadow-xl">
                <img
                  src={siteConfig.labSetup.labImage}
                  alt="MedhaArc Labs School STEM Laboratory Plan"
                  className="w-full h-full object-cover filter brightness-95 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/30 pointer-events-none" />

                {/* Zone Markers on Image */}
                <div className="absolute inset-0 p-2 sm:p-2.5 flex flex-col justify-between pointer-events-none">
                  <div className="flex items-center justify-between text-[8.5px] font-mono uppercase tracking-widest text-white/70">
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
                          className={`text-left p-1.5 rounded-[3px] backdrop-blur-md transition-all text-[9.5px] font-mono tracking-wider cursor-pointer border ${isActive
                            ? cInfo.activeBtn
                            : 'bg-black/60 border-white/20 text-white/75 hover:bg-black/80 hover:text-white'
                            }`}
                        >
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="font-semibold text-[9px]">ZONE 0{idx + 1}</span>
                            <span
                              className={`w-1.5 h-1.5 rounded-full transition-all ${isActive ? cInfo.dot : 'bg-white/40'
                                }`}
                            />
                          </div>
                          <div className="font-sans font-medium text-[10.5px] truncate">
                            {zone.name}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Detailed Side Panel for Active Zone with Distinct Colors */}
              <div
                ref={sidePanelRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="lg:col-span-5 p-3 sm:p-3.5 rounded-xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/15 backdrop-blur-md flex flex-col justify-between h-full min-h-[200px] shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5 border-b border-white/10 pb-2">
                    <span className={`font-mono text-xs uppercase tracking-wider font-semibold ${activeColor.badge}`}>
                      ZONE 0{activeZoneIndex + 1} OF 0{zones.length}
                    </span>
                    <span className="text-[10.5px] font-mono text-white/60 px-2 py-0.5 bg-white/5 rounded-[2px]">
                      Layout Dedicated
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl lg:text-[26px] text-white font-normal mb-2">
                    {currentZone.name}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-white/80 font-sans leading-relaxed mb-3">
                    {currentZone.description}
                  </p>
                </div>

                {/* Standards Badges with Accent Tint */}
                <div className="border-t border-white/10 pt-2.5">
                  <span className="text-[10.5px] uppercase tracking-wider text-white/50 font-mono block mb-1.5">
                    Standards & Compliance:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className={`px-2 py-0.5 rounded-[2px] border text-[10.5px] font-sans ${activeColor.tag}`}>
                      Dedicated Power Points
                    </span>
                    <span className={`px-2 py-0.5 rounded-[2px] border text-[10.5px] font-sans ${activeColor.tag}`}>
                      Grounded Antistatic Benches
                    </span>
                    <span className={`px-2 py-0.5 rounded-[2px] border text-[10.5px] font-sans ${activeColor.tag}`}>
                      Safety Line Markings
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety & Compliance Badge Inside Card Footer */}
            <div className="border-t border-white/10 pt-2.5 flex items-center justify-between text-[10.5px] sm:text-[11px] font-mono text-white/50">
              <span>Electrical, ESD & Ventilation Safety Compliant</span>
              <span>Dual Fire-Extinguisher & First-Aid Protocol</span>
            </div>
          </div>
        </div>
    </ChapterShell>
  );
};
