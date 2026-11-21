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

  // Automatic random zone cycling when user is on this section
  useEffect(() => {
    if (!isSectionActive || isHovered || zones.length <= 1) return;

    const timer = setInterval(() => {
      setActiveZoneIndex((prev) => {
        // Randomly pick one of the other zones so it always changes dynamically
        const candidates = zones.map((_, i) => i).filter((i) => i !== prev);
        const next = candidates[Math.floor(Math.random() * candidates.length)];
        return next;
      });
    }, 2800);

    return () => clearInterval(timer);
  }, [isSectionActive, isHovered, zones]);

  // Listen to step navigation events (wheel scroll & arrow keys)
  useEffect(() => {
    const handleStep = (e: Event) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top >= -window.innerHeight * 0.5 && rect.bottom <= window.innerHeight * 1.5;
      if (!isVisible) return;

      const customEvent = e as CustomEvent<{ direction: number }>;
      const dir = customEvent.detail?.direction || 1;

      if (dir > 0 && activeZoneIndex < zones.length - 1) {
        e.preventDefault();
        setActiveZoneIndex((s) => s + 1);
      } else if (dir < 0 && activeZoneIndex > 0) {
        e.preventDefault();
        setActiveZoneIndex((s) => s - 1);
      }
    };

    window.addEventListener('medhaarc:step', handleStep);
    return () => window.removeEventListener('medhaarc:step', handleStep);
  }, [activeZoneIndex, zones.length]);

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
    <ChapterShell id="lab-setup" chapterNumber="08" theme="dark" steps={4}>
      <div ref={containerRef} className="w-full flex-1 flex flex-col justify-between py-2 select-none">
        {/* Eyebrow & Statement Headline */}
        <div className="mb-3 max-w-3xl mx-auto text-center">
          <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-1">
            {siteConfig.labSetup.eyebrow}
          </div>
          <h2 className="font-serif text-[clamp(26px,3.4vw,44px)] font-normal leading-[1.14] tracking-tight text-white mb-1">
            {siteConfig.labSetup.headline}
          </h2>
          <p className="text-sm text-white/70 font-sans max-w-2xl mx-auto">
            {siteConfig.labSetup.paragraph}
          </p>
        </div>

        {/* Top-Down Lab Layout & Interactive Hotspot Zones */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center my-auto border-t border-white/10 pt-4">
          {/* Lab Visualization Photo with Zone Pins */}
          <div className="lg:col-span-7 relative aspect-[16/10] max-h-[300px] sm:max-h-[340px] rounded-[3px] overflow-hidden border border-white/20 bg-black/40 shadow-xl">
            <img
              src={siteConfig.labSetup.labImage}
              alt="MedhaArc Labs School STEM Laboratory Plan"
              className="w-full h-full object-cover filter brightness-95 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/30 pointer-events-none" />

            {/* Zone Markers on Image */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-white/70">
                <span className="px-2 py-0.5 rounded-[2px] bg-black/70 backdrop-blur-xs border border-white/10">Dedicated Space Layout</span>
                <span className="px-2 py-0.5 rounded-[2px] bg-black/70 backdrop-blur-xs border border-white/10">Safety & Flow Standard</span>
              </div>

              {/* Pin Buttons on Image */}
              <div
                className="grid grid-cols-2 gap-2.5 pointer-events-auto"
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
                      className={`text-left p-2.5 rounded-[3px] backdrop-blur-md transition-all text-[11px] font-mono tracking-wider cursor-pointer border ${
                        isActive
                          ? cInfo.activeBtn
                          : 'bg-black/60 border-white/20 text-white/75 hover:bg-black/80 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-semibold">ZONE 0{idx + 1}</span>
                        <span
                          className={`w-2 h-2 rounded-full transition-all ${
                            isActive ? cInfo.dot : 'bg-white/40'
                          }`}
                        />
                      </div>
                      <div className="font-sans font-medium text-xs truncate">
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
            className="lg:col-span-5 p-5 sm:p-6 rounded-[3px] bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/15 backdrop-blur-md flex flex-col justify-between min-h-[260px] shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2.5">
                <span className={`font-mono text-xs uppercase tracking-wider font-semibold ${activeColor.badge}`}>
                  ZONE 0{activeZoneIndex + 1} OF 0{zones.length}
                </span>
                <span className="text-[11px] font-mono text-white/60 px-2 py-0.5 bg-white/5 rounded-[2px]">
                  Layout Dedicated
                </span>
              </div>

              <h3 className="font-serif text-2xl text-white font-normal mb-2">
                {currentZone.name}
              </h3>

              <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed mb-4">
                {currentZone.description}
              </p>
            </div>

            {/* Standards Badges with Accent Tint */}
            <div className="border-t border-white/10 pt-3">
              <span className="text-[11px] uppercase tracking-wider text-white/50 font-mono block mb-2">
                Standards & Compliance:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <span className={`px-2 py-0.5 rounded-[2px] border text-[11px] font-sans ${activeColor.tag}`}>
                  Dedicated Power Points
                </span>
                <span className={`px-2 py-0.5 rounded-[2px] border text-[11px] font-sans ${activeColor.tag}`}>
                  Grounded Antistatic Benches
                </span>
                <span className={`px-2 py-0.5 rounded-[2px] border text-[11px] font-sans ${activeColor.tag}`}>
                  Safety Line Markings
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Safety & Compliance Badge */}
        <div className="ml-0 md:ml-48 border-t border-white/10 pt-2 flex items-center justify-between text-[11px] font-mono text-white/50">
          <span>Electrical, ESD & Ventilation Safety Compliant</span>
          <span>Dual Fire-Extinguisher & First-Aid Protocol</span>
        </div>
      </div>
    </ChapterShell>
  );
};
