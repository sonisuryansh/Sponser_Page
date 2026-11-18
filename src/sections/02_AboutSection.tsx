import React, { useEffect, useState, useRef } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const wordColorMap: Record<string, string> = {
  Understand: 'bg-cyan-500 text-white shadow-sm ring-1 ring-cyan-400',
  Design: 'bg-purple-600 text-white shadow-sm ring-1 ring-purple-400',
  Test: 'bg-amber-600 text-white shadow-sm ring-1 ring-amber-400',
  Apply: 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-400',
};

export const AboutSection: React.FC = () => {
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const panelsRef = useRef<HTMLDivElement>(null);

  // Sequential light-up of the 4 Focus words
  useEffect(() => {
    const words = siteConfig.about.panels[2].highlightWords || ['Understand', 'Design', 'Test', 'Apply'];
    const interval = setInterval(() => {
      setActiveWordIndex((prev) => (prev + 1) % words.length);
    }, 1100);
    return () => clearInterval(interval);
  }, []);

  // Scrubbed animation: panels staggered rise on scroll into view
  useEffect(() => {
    const el = panelsRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const panels = el.querySelectorAll<HTMLElement>('.about-panel');

    // Failsafe: Ensure everything is 100% visible
    const failsafe = setTimeout(() => {
      panels.forEach((p) => {
        p.style.opacity = '1';
        p.style.transform = 'none';
      });
    }, 2500);

    if (prefersReducedMotion || isMobile || !document.documentElement.classList.contains('js-motion')) {
      panels.forEach((p) => {
        p.style.opacity = '1';
        p.style.transform = 'none';
      });
      return () => clearTimeout(failsafe);
    }

    const tween = gsap.fromTo(
      panels,
      { y: 36, opacity: 0.15 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.15,
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

  return (
    <ChapterShell id="about" chapterNumber="02" theme="light">
      <div className="w-full flex-1 flex flex-col justify-between py-2">
        {/* Eyebrow & Statement Headline */}
        <div className="mb-2 max-w-4xl">
          <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-1.5">
            {siteConfig.about.eyebrow}
          </div>
          <h2 className="font-serif text-[clamp(28px,4vw,56px)] font-normal leading-[1.14] tracking-tight text-[#111111]">
            {siteConfig.about.headline}
          </h2>
        </div>

        {/* Three Equal Panels with Delicate Color Accents */}
        <div
          ref={panelsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 border-t border-black/10 pt-6 my-auto"
        >
          {/* Panel 1: Our Aim */}
          <div className="about-panel flex flex-col justify-between p-4 bg-gradient-to-b from-amber-50/30 to-white rounded-[3px] border border-amber-500/20 shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-[0.18em] text-[#c8a45d] font-mono font-semibold">
                  01 / Aim
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8a45d]" />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight mb-3 text-[#111111]">
                {siteConfig.about.panels[0].title}
              </h3>
            </div>
            <p className="text-[16px] md:text-[17px] leading-[1.6] text-[#5b5b5b] font-normal">
              {siteConfig.about.panels[0].description}
            </p>
          </div>

          {/* Panel 2: Our Vision */}
          <div className="about-panel flex flex-col justify-between p-4 bg-gradient-to-b from-cyan-50/30 to-white rounded-[3px] border border-cyan-500/20 shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-[0.18em] text-cyan-600 font-mono font-semibold">
                  02 / Vision
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight mb-3 text-[#111111]">
                {siteConfig.about.panels[1].title}
              </h3>
            </div>
            <p className="text-[16px] md:text-[17px] leading-[1.6] text-[#5b5b5b] font-normal">
              {siteConfig.about.panels[1].description}
            </p>
          </div>

          {/* Panel 3: Our Focus */}
          <div className="about-panel flex flex-col justify-between p-4 bg-gradient-to-b from-emerald-50/30 to-white rounded-[3px] border border-emerald-500/20 shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-[0.18em] text-emerald-600 font-mono font-semibold">
                  03 / Focus
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight mb-3 text-[#111111]">
                {siteConfig.about.panels[2].title}
              </h3>
            </div>
            <div>
              <p className="text-[16px] md:text-[17px] leading-[1.6] text-[#5b5b5b] font-normal mb-5">
                {siteConfig.about.panels[2].description}
              </p>

              {/* 4 Words lighting in sequence: Understand, Design, Test, Apply */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-black/10">
                {siteConfig.about.panels[2].highlightWords?.map((word, idx) => {
                  const isCurrent = activeWordIndex === idx;
                  const activeColor = wordColorMap[word] || 'bg-black text-white';

                  return (
                    <span
                      key={word}
                      className={`text-xs uppercase tracking-wider px-2.5 py-1 rounded-[2px] transition-all duration-300 font-medium ${
                        isCurrent
                          ? `${activeColor} scale-105 shadow-sm`
                          : 'bg-black/5 text-[#5b5b5b] hover:bg-black/10'
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

        {/* Quiet Subnote Bottom */}
        <div className="pt-4 border-t border-black/5 flex items-center justify-end text-xs font-mono text-[#5b5b5b]/70">
          <span>Understand → Design → Test → Apply</span>
        </div>
      </div>
    </ChapterShell>
  );
};
