import React from 'react';
import { siteConfig } from '../config/content.config';
import { Hammer, Compass, Sparkles, ShieldCheck, RefreshCw } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Hammer: <Hammer className="w-5 h-5" />,
  Compass: <Compass className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  RefreshCw: <RefreshCw className="w-5 h-5" />,
};

export const MissionSection: React.FC = () => {
  return (
    <section
      id="mission"
      data-chapter="03"
      className="relative w-full min-h-screen py-24 md:py-32 flex items-center bg-[#fafafa] text-[#111111] border-t border-black/5 snap-start"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        {/* Eyebrow */}
        <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-4">
          {siteConfig.mission.eyebrow}
        </div>

        {/* Large Statement Headline */}
        <h2 className="font-serif text-[clamp(32px,4.5vw,58px)] font-normal leading-[1.18] tracking-tight text-[#111111] max-w-4xl mb-16 md:mb-24">
          &ldquo;{siteConfig.mission.statement}&rdquo;
        </h2>

        {/* Five Values as an Icon Strip */}
        <div className="border-t border-black/10 pt-10">
          <div className="text-xs uppercase tracking-[0.2em] text-[#5b5b5b] mb-8 font-mono">
            Core Educational Values
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {siteConfig.mission.values.map((val) => (
              <div
                key={val.name}
                className="flex flex-col justify-start p-4 bg-white border border-black/8 rounded-[2px] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="w-10 h-10 flex items-center justify-center border border-black/10 rounded-[2px] text-[#111111] mb-4 bg-[#fafafa]">
                  {iconMap[val.icon] || <Sparkles className="w-5 h-5" />}
                </div>
                <h3 className="font-serif text-lg font-medium text-[#111111] tracking-tight mb-2">
                  {val.name}
                </h3>
                <p className="text-sm text-[#5b5b5b] leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
