import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import gsap from 'gsap';

export const LabSetupSection: React.FC = () => {
  const [activeZoneIndex, setActiveZoneIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sidePanelRef = useRef<HTMLDivElement>(null);

  const zones = siteConfig.labSetup.zones;

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

  return (
    <ChapterShell id="lab-setup" chapterNumber="08" theme="dark" steps={4}>
      <div ref={containerRef} className="w-full flex-1 flex flex-col justify-between py-2 select-none">
        {/* Eyebrow & Statement Headline */}
        <div className="mb-3 max-w-3xl">
          <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-1">
            {siteConfig.labSetup.eyebrow}
          </div>
          <h2 className="font-serif text-[clamp(26px,3.4vw,44px)] font-normal leading-[1.14] tracking-tight text-white mb-1">
            {siteConfig.labSetup.headline}
          </h2>
          <p className="text-sm text-white/70 font-sans">
            {siteConfig.labSetup.paragraph}
          </p>
        </div>

        {/* Top-Down Lab Layout & Interactive Hotspot Zones */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center my-auto border-t border-white/10 pt-4">
          {/* Lab Visualization Photo with Zone Pins */}
          <div className="lg:col-span-7 relative aspect-[16/10] max-h-[300px] sm:max-h-[340px] rounded-[2px] overflow-hidden border border-white/15 bg-black/40">
            <img
              src={siteConfig.labSetup.labImage}
              alt="MedhaArc Labs School STEM Laboratory Plan"
              className="w-full h-full object-cover filter brightness-90 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

            {/* Zone Markers on Image */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-white/60">
                <span>Dedicated Space Layout</span>
                <span>Safety & Flow Standard</span>
              </div>

              {/* Pin Buttons on Image */}
              <div className="grid grid-cols-2 gap-2 pointer-events-auto">
                {zones.map((zone, idx) => {
                  const isActive = activeZoneIndex === idx;
                  return (
                    <button
                      key={zone.id}
                      onClick={() => setActiveZoneIndex(idx)}
                      className={`text-left p-2 rounded-[2px] backdrop-blur-md transition-all text-[11px] font-mono tracking-wider cursor-pointer border ${
                        isActive
                          ? 'bg-[#c8a45d]/30 border-[#c8a45d] text-white shadow-md'
                          : 'bg-black/50 border-white/15 text-white/70 hover:bg-black/70 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>ZONE 0{idx + 1}</span>
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isActive ? 'bg-[#c8a45d]' : 'bg-white/40'
                          }`}
                        />
                      </div>
                      <div className="font-sans font-medium text-xs mt-0.5 truncate">
                        {zone.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Detailed Side Panel for Active Zone */}
          <div
            ref={sidePanelRef}
            className="lg:col-span-5 p-5 sm:p-6 rounded-[2px] bg-white/[0.03] border border-white/15 backdrop-blur-md flex flex-col justify-between min-h-[260px]"
          >
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2.5">
                <span className="font-mono text-xs uppercase tracking-wider text-[#c8a45d]">
                  ZONE 0{activeZoneIndex + 1} OF 0{zones.length}
                </span>
                <span className="text-[11px] font-mono text-white/50">
                  Layout Dedicated
                </span>
              </div>

              <h3 className="font-serif text-2xl text-white font-normal mb-2">
                {currentZone.name}
              </h3>

              <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed mb-4">
                {currentZone.description}
              </p>
            </div>

            {/* Safety & Standards Note */}
            <div className="border-t border-white/10 pt-3">
              <span className="text-[11px] uppercase tracking-wider text-white/50 font-mono block mb-2">
                Standards:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded-[2px] bg-white/[0.05] border border-white/10 text-[11px] text-white/80 font-sans">
                  Dedicated Power Points
                </span>
                <span className="px-2 py-0.5 rounded-[2px] bg-white/[0.05] border border-white/10 text-[11px] text-white/80 font-sans">
                  Grounded Antistatic Benches
                </span>
                <span className="px-2 py-0.5 rounded-[2px] bg-white/[0.05] border border-white/10 text-[11px] text-white/80 font-sans">
                  Safety Line Markings
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Safety & Compliance Badge */}
        <div className="border-t border-white/10 pt-2 flex items-center justify-between text-[11px] font-mono text-white/40">
          <span>Electrical, ESD & Ventilation Safety Compliant</span>
          <span>Dual Fire-Extinguisher & First-Aid Protocol</span>
        </div>
      </div>
    </ChapterShell>
  );
};
