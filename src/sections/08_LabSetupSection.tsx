import React, { useState } from 'react';
import { siteConfig } from '../config/content.config';
import { CheckCircle2 } from 'lucide-react';

export const LabSetupSection: React.FC = () => {
  const [activeZoneId, setActiveZoneId] = useState<string>('zone-build');

  return (
    <section
      id="lab-setup"
      data-chapter="08"
      className="relative w-full min-h-screen py-24 md:py-32 bg-[#0c1015] text-white snap-start"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Eyebrow & Statement Headline */}
        <div className="mb-12 max-w-3xl">
          <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-3">
            {siteConfig.labSetup.eyebrow}
          </div>
          <h2 className="font-serif text-[clamp(32px,4vw,56px)] font-normal leading-[1.14] tracking-tight text-white mb-3">
            {siteConfig.labSetup.headline}
          </h2>
          <p className="text-lg text-white/70 font-sans max-w-2xl">
            {siteConfig.labSetup.paragraph}
          </p>
        </div>

        {/* Top-Down Lab Layout & Interactive Zones */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16 border-t border-white/10 pt-10">
          {/* Lab Visualization Photo with Zone Pins */}
          <div className="lg:col-span-7 relative aspect-[16/10] rounded-[2px] overflow-hidden border border-white/15 bg-black/40">
            <img
              src={siteConfig.labSetup.labImage}
              alt="MedhaArc Labs School STEM Laboratory Plan"
              className="w-full h-full object-cover filter brightness-90 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

            {/* Zone Markers on Image */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-white/60">
                <span>Dedicated Space Layout</span>
                <span>Safety & Flow Standard</span>
              </div>

              {/* Pin Pill Buttons on Image */}
              <div className="grid grid-cols-2 gap-3 pointer-events-auto">
                {siteConfig.labSetup.zones.map((zone) => {
                  const isActive = activeZoneId === zone.id;
                  return (
                    <button
                      key={zone.id}
                      onClick={() => setActiveZoneId(zone.id)}
                      className={`text-left p-2.5 rounded-[2px] backdrop-blur-md transition-all text-xs font-mono tracking-wider cursor-pointer border ${
                        isActive
                          ? 'bg-black/85 border-[#c8a45d] text-white shadow-lg'
                          : 'bg-black/50 border-white/15 text-white/70 hover:bg-black/70'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#c8a45d]' : 'bg-white/40'}`} />
                        <span className="font-semibold">{zone.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Zone Detail Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-mono">
              Zone Specifications
            </span>
            {siteConfig.labSetup.zones.map((zone) => {
              const isActive = activeZoneId === zone.id;
              return (
                <div
                  key={zone.id}
                  onClick={() => setActiveZoneId(zone.id)}
                  className={`p-4 border rounded-[2px] transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-white/[0.08] border-white/30 text-white'
                      : 'bg-white/[0.02] border-white/5 text-white/50 hover:bg-white/[0.04]'
                  }`}
                >
                  <h3 className="font-serif text-lg font-medium tracking-tight mb-1">
                    {zone.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/70">
                    {zone.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Three Short Lists: Hardware/Kits, Tools/Software, Space/Infrastructure */}
        <div className="border-t border-white/10 pt-10">
          <div className="text-xs uppercase tracking-[0.2em] text-[#5b5b5b] mb-8 font-mono">
            Provisioning Matrix
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteConfig.labSetup.resourceLists.map((list) => (
              <div key={list.title} className="p-6 bg-white/[0.03] border border-white/10 rounded-[2px]">
                <h3 className="font-serif text-lg font-medium text-white mb-4 pb-2 border-b border-white/10">
                  {list.title}
                </h3>
                <ul className="space-y-3">
                  {list.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-white/75">
                      <CheckCircle2 className="w-4 h-4 text-[#c8a45d] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Conditional 3D printer / room size only shown if set in config */}
          {(siteConfig.confirm.has3DPrinter || siteConfig.confirm.labRoomSize) && (
            <div className="mt-6 p-4 border border-white/15 bg-white/5 rounded-[2px] text-xs text-white/80 flex items-center gap-4">
              {siteConfig.confirm.has3DPrinter && <span>• 3D Printing Station confirmed</span>}
              {siteConfig.confirm.labRoomSize && (
                <span>• Lab dimensions: {siteConfig.confirm.labRoomSize}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
