import React, { useEffect, useState } from 'react';
import { siteConfig } from '../config/content.config';

export const AboutSection: React.FC = () => {
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  // Four words lighting in order: Understand -> Design -> Test -> Apply
  useEffect(() => {
    const words = siteConfig.about.panels[2].highlightWords || ['Understand', 'Design', 'Test', 'Apply'];
    const interval = setInterval(() => {
      setActiveWordIndex((prev) => (prev + 1) % words.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      data-chapter="02"
      className="relative w-full min-h-screen py-24 md:py-32 flex items-center bg-[#ffffff] text-[#111111] snap-start"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        {/* Eyebrow & Statement Headline */}
        <div className="mb-14 md:mb-20 max-w-3xl">
          <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-3">
            {siteConfig.about.eyebrow}
          </div>
          <h2 className="font-serif text-[clamp(32px,4vw,56px)] font-normal leading-[1.15] tracking-tight text-[#111111]">
            {siteConfig.about.headline}
          </h2>
        </div>

        {/* Three Equal Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 border-t border-black/10 pt-10">
          {/* Panel 1: Our Aim */}
          <div className="flex flex-col justify-between p-2">
            <div>
              <span className="text-xs uppercase tracking-[0.18em] text-[#5b5b5b] font-mono">
                01 / Aim
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight mt-3 mb-4 text-[#111111]">
                {siteConfig.about.panels[0].title}
              </h3>
            </div>
            <p className="text-[17px] md:text-[19px] leading-[1.6] text-[#5b5b5b] font-normal">
              {siteConfig.about.panels[0].description}
            </p>
          </div>

          {/* Panel 2: Our Vision */}
          <div className="flex flex-col justify-between p-2 md:border-l md:border-black/10 md:pl-10">
            <div>
              <span className="text-xs uppercase tracking-[0.18em] text-[#5b5b5b] font-mono">
                02 / Vision
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight mt-3 mb-4 text-[#111111]">
                {siteConfig.about.panels[1].title}
              </h3>
            </div>
            <p className="text-[17px] md:text-[19px] leading-[1.6] text-[#5b5b5b] font-normal">
              {siteConfig.about.panels[1].description}
            </p>
          </div>

          {/* Panel 3: Our Focus */}
          <div className="flex flex-col justify-between p-2 md:border-l md:border-black/10 md:pl-10">
            <div>
              <span className="text-xs uppercase tracking-[0.18em] text-[#5b5b5b] font-mono">
                03 / Focus
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight mt-3 mb-4 text-[#111111]">
                {siteConfig.about.panels[2].title}
              </h3>
            </div>
            <div>
              <p className="text-[17px] md:text-[19px] leading-[1.6] text-[#5b5b5b] font-normal mb-6">
                {siteConfig.about.panels[2].description}
              </p>

              {/* 4 Words lighting in sequence: Understand, Design, Test, Apply */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-black/10">
                {siteConfig.about.panels[2].highlightWords?.map((word, idx) => {
                  const isCurrent = activeWordIndex === idx;
                  return (
                    <span
                      key={word}
                      className={`text-xs md:text-sm uppercase tracking-wider px-2.5 py-1 rounded-[2px] transition-all duration-300 ${
                        isCurrent
                          ? 'bg-[#111111] text-white font-medium scale-105'
                          : 'bg-black/5 text-[#5b5b5b]'
                      }`}
                    >
                      {word}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
