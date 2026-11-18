import React from 'react';
import { siteConfig } from '../config/content.config';
import { Layers, Lightbulb, Wrench, GitFork, Sigma, ShieldCheck } from 'lucide-react';

const principleIcons = [
  <Layers key="1" className="w-4 h-4" />,
  <Lightbulb key="2" className="w-4 h-4" />,
  <Wrench key="3" className="w-4 h-4" />,
  <GitFork key="4" className="w-4 h-4" />,
  <Sigma key="5" className="w-4 h-4" />,
  <ShieldCheck key="6" className="w-4 h-4" />,
];

export const LearningApproachSection: React.FC = () => {
  return (
    <section
      id="approach"
      data-chapter="05"
      className="relative w-full min-h-screen py-24 md:py-32 flex items-center bg-[#ffffff] text-[#111111] snap-start"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        {/* Eyebrow & Statement Headline */}
        <div className="mb-14 md:mb-20 max-w-4xl">
          <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-3">
            {siteConfig.approach.eyebrow}
          </div>
          <h2 className="font-serif text-[clamp(32px,4vw,56px)] font-normal leading-[1.15] tracking-tight text-[#111111]">
            {siteConfig.approach.headline}
          </h2>
        </div>

        {/* Three Large Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 border-t border-black/10 pt-10 mb-16 md:mb-20">
          {siteConfig.approach.blocks.map((blk, idx) => (
            <div key={blk.title} className="flex flex-col justify-between p-2">
              <div>
                <span className="text-xs uppercase tracking-[0.18em] text-[#5b5b5b] font-mono">
                  Approach 0{idx + 1}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight mt-3 mb-4 text-[#111111]">
                  {blk.title}
                </h3>
              </div>
              <p className="text-[17px] md:text-[19px] leading-[1.6] text-[#5b5b5b] font-normal">
                {blk.description}
              </p>
            </div>
          ))}
        </div>

        {/* Small Icon Row: 6 Principles (No counters, no marquee) */}
        <div className="border-t border-black/10 pt-10">
          <div className="text-xs uppercase tracking-[0.2em] text-[#5b5b5b] mb-6 font-mono">
            Guiding Methodological Tenets
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {siteConfig.approach.principles.map((pr, idx) => (
              <div
                key={pr}
                className="flex items-center gap-3.5 p-3.5 bg-[#fafafa] border border-black/5 rounded-[2px]"
              >
                <div className="w-8 h-8 flex items-center justify-center border border-black/10 rounded-[2px] text-[#111111] bg-white shrink-0">
                  {principleIcons[idx]}
                </div>
                <span className="text-sm text-[#111111] font-normal tracking-wide">
                  {pr}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
