import React, { useRef, useEffect } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { Check, Building2, Cpu } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const RequirementsSection: React.FC = () => {
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lCol = leftColRef.current;
    const rCol = rightColRef.current;
    if (!lCol || !rCol) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // Failsafe: force visibility
    const failsafe = setTimeout(() => {
      lCol.style.opacity = '1';
      lCol.style.transform = 'none';
      rCol.style.opacity = '1';
      rCol.style.transform = 'none';
    }, 2500);

    if (prefersReducedMotion || isMobile || !document.documentElement.classList.contains('js-motion')) {
      lCol.style.opacity = '1';
      lCol.style.transform = 'none';
      rCol.style.opacity = '1';
      rCol.style.transform = 'none';
      return () => clearTimeout(failsafe);
    }

    const ctx = gsap.context(() => {
      // Left column slides in from left
      gsap.fromTo(
        lCol,
        { x: -50, opacity: 0.2 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          immediateRender: false,
          scrollTrigger: {
            trigger: lCol,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Right column slides in from right
      gsap.fromTo(
        rCol,
        { x: 50, opacity: 0.2 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          immediateRender: false,
          scrollTrigger: {
            trigger: rCol,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    return () => {
      clearTimeout(failsafe);
      ctx.revert();
    };
  }, []);

  return (
    <ChapterShell id="requirements" chapterNumber="12" theme="light">
      <div className="w-full flex-1 flex flex-col justify-between py-2 select-none">
        {/* Eyebrow & Headline */}
        <div className="mb-4 max-w-3xl">
          <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-1.5">
            {siteConfig.requirements.eyebrow}
          </div>
          <h2 className="font-serif text-[clamp(26px,3.5vw,46px)] font-normal leading-[1.14] tracking-tight text-[#111111]">
            {siteConfig.requirements.headline}
          </h2>
        </div>

        {/* Two Columns: Slide in from opposite directions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-auto border-t border-black/10 pt-6">
          {/* Column 1: School Provides */}
          <div
            ref={leftColRef}
            className="p-6 sm:p-7 bg-[#fafafa] border border-black/10 rounded-[2px] shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-black/10">
                <div className="w-8 h-8 flex items-center justify-center border border-black/10 bg-white rounded-[2px]">
                  <Building2 className="w-4 h-4 text-[#111111]" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-[#111111]">
                  {siteConfig.requirements.columns[0].title}
                </h3>
              </div>

              <ul className="space-y-3.5">
                {siteConfig.requirements.columns[0].items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm sm:text-base text-[#5b5b5b]">
                    <span className="w-4 h-4 flex items-center justify-center rounded-full bg-black/5 text-[#111111] text-[10px] shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4 border-t border-black/5 text-[11px] font-mono text-[#5b5b5b]">
              School In-House Infrastructure
            </div>
          </div>

          {/* Column 2: MedhaArc Labs Delivers */}
          <div
            ref={rightColRef}
            className="p-6 sm:p-7 bg-[#fafafa] border border-black/10 rounded-[2px] shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-black/10">
                <div className="w-8 h-8 flex items-center justify-center border border-black/10 bg-white rounded-[2px]">
                  <Cpu className="w-4 h-4 text-[#111111]" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-[#111111]">
                  {siteConfig.requirements.columns[1].title}
                </h3>
              </div>

              <ul className="space-y-3.5">
                {siteConfig.requirements.columns[1].items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm sm:text-base text-[#5b5b5b]">
                    <span className="w-4 h-4 flex items-center justify-center rounded-full bg-[#c8a45d]/20 text-[#c8a45d] text-[10px] shrink-0">
                      <Check className="w-3 h-3 text-black" />
                    </span>
                    <span className="font-medium text-[#111111]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4 border-t border-black/5 text-[11px] font-mono text-[#5b5b5b]">
              Delivered & Facilitated by MedhaArc Labs
            </div>
          </div>
        </div>

        {/* Quiet Subnote Bottom */}
        <div className="border-t border-black/10 pt-3 flex items-center justify-end text-xs font-mono text-[#5b5b5b]">
          <span>Seamless Campus Integration</span>
        </div>
      </div>
    </ChapterShell>
  );
};
