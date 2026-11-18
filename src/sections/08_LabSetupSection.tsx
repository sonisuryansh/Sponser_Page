import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const LabSetupSection: React.FC = () => {
  const [activeZoneIndex, setActiveZoneIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Pinned 4 steps scroll scrub: each step illuminates a zone and updates side panel
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    if (prefersReducedMotion || isMobile || !document.documentElement.classList.contains('js-motion')) {
      return;
    }

    const zones = siteConfig.labSetup.zones;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: `+=${zones.length * 60}%`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const step = Math.min(zones.length - 1, Math.floor(self.progress * zones.length));
          setActiveZoneIndex(step);
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const currentZone = siteConfig.labSetup.zones[activeZoneIndex];

  return (
    <ChapterShell id="lab-setup" chapterNumber="08" theme="dark">
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
                {siteConfig.labSetup.zones.map((zone, idx) => {
                  const isActive = activeZoneIndex === idx;
                  return (
                    <button
                      key={zone.id}
                      onClick={() => setActiveZoneIndex(idx)}
                      className={`text-left p-2 rounded-[2px] backdrop-blur-md transition-all text-[11px] font-mono tracking-wider cursor-pointer border ${
                        isActive
                          ? 'bg-black/90 border-[#c8a45d] text-white shadow-lg'
                          : 'bg-black/50 border-white/15 text-white/70 hover:bg-black/70'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#c8a45d]' : 'bg-white/40'}`} />
                        <span className="font-semibold truncate">{zone.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Zone Detail Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-3">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#c8a45d] font-mono">
              Active Zone 0{activeZoneIndex + 1}
            </div>
            <div className="p-4 border border-white/25 bg-white/[0.06] rounded-[2px]">
              <h3 className="font-serif text-xl font-medium tracking-tight text-white mb-2">
                {currentZone.name}
              </h3>
              <p className="text-sm leading-relaxed text-white/80">
                {currentZone.description}
              </p>
            </div>

            {/* Provisioning Snapshot */}
            <div className="p-3 border border-white/10 bg-white/[0.02] rounded-[2px]">
              <span className="text-[10px] uppercase font-mono tracking-wider text-white/50 block mb-2">
                Included Hardware & Storage
              </span>
              <ul className="space-y-1 text-xs text-white/70">
                <li>• Shared kits stay securely in school lab storage cabinets</li>
                <li>• Grounded work tables and designated computer stations</li>
                <li>• Dedicated indoor drone flight perimeter with safety line</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Short Provisioning Matrix */}
        <div className="border-t border-white/10 pt-3 flex items-center justify-end text-xs text-white/50 font-mono">
          <span>Shared Lab Infrastructure</span>
        </div>
      </div>
    </ChapterShell>
  );
};
