import React, { useEffect, useState, useRef } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection: React.FC = () => {
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);

  // Sequential illumination of the 4 Focus words
  useEffect(() => {
    const words = siteConfig.about.panels[2].highlightWords || ['Understand', 'Design', 'Test', 'Apply'];
    const interval = setInterval(() => {
      setActiveWordIndex((prev) => (prev + 1) % words.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // Smooth rise animation on scroll into view
  useEffect(() => {
    const el = bannerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    if (prefersReducedMotion || isMobile) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    const tween = gsap.fromTo(
      el,
      { y: 50, opacity: 0.3 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
        immediateRender: false,
        scrollTrigger: {
          trigger: el,
          start: 'top 95%',
          once: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const handleScrollToNext = () => {
    const nextSection = document.getElementById('mission');
    if (nextSection) {
      const lenis = (window as unknown as { lenis?: { scrollTo: (target: HTMLElement) => void } }).lenis;
      if (lenis) {
        lenis.scrollTo(nextSection);
      } else {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const aimText = siteConfig.about.panels[0].description;
  const visionText = siteConfig.about.panels[1].description;
  const combinedDescription = `${aimText} ${visionText}`;

  return (
    <ChapterShell
      id="about"
      chapterNumber="02"
      theme="dark"
      media="/assets/students_robotics.webp"
      overlayOpacity={0.4}
      fullBleed={true}
    >
      <div className="w-full h-full flex flex-col justify-between relative select-none">
        {/* Upper Photographic Viewport Area */}
        <div className="flex-1 w-full relative pointer-events-none">
          {/* Subtle top clearance gradient for fixed header readability */}
          <div
            className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* Signature Maman-style Horizontal Bottom Split Banner */}
        <div
          ref={bannerRef}
          className="w-full flex flex-col lg:flex-row items-stretch z-20 shadow-[0_-15px_45px_rgba(0,0,0,0.45)]"
        >
          {/* Left Block: Solid Red Banner (~75% width on desktop) */}
          <div className="w-full lg:w-[74%] xl:w-[76%] bg-[#C61122] text-white p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 lg:gap-10">
            {/* Column 1: Eyebrow + Prominent Statement Headline */}
            <div className="w-full md:w-[48%] flex flex-col justify-center">
              <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/80 font-semibold mb-2.5 block">
                {siteConfig.about.eyebrow}
              </span>
              <h2 className="font-serif text-[clamp(22px,2.4vw,34px)] font-normal leading-[1.18] tracking-tight text-white drop-shadow-sm">
                {siteConfig.about.headline}
              </h2>
            </div>

            {/* Vertical Hairline Divider on desktop */}
            <div
              className="hidden md:block w-px self-stretch bg-white/20 mx-1"
              aria-hidden="true"
            />

            {/* Column 2: Mission Paragraph + Interactive Focus Pills */}
            <div className="w-full md:w-[48%] flex flex-col justify-center">
              <p className="text-xs sm:text-sm lg:text-[14px] leading-relaxed text-white/95 font-sans mb-4 font-normal">
                {combinedDescription}
              </p>

              {/* 4 Interactive Focus Words */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/20">
                {siteConfig.about.panels[2].highlightWords?.map((word, idx) => {
                  const isCurrent = activeWordIndex === idx;

                  return (
                    <span
                      key={word}
                      className={`text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-[2px] transition-all duration-300 font-medium ${
                        isCurrent
                          ? 'bg-white text-[#C61122] font-semibold scale-105 shadow-md'
                          : 'bg-white/10 text-white/90 border border-white/25 hover:bg-white/20'
                      }`}
                    >
                      {word}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Block: Solid White "Scroll to discover" (~25% width on desktop) */}
          <button
            onClick={handleScrollToNext}
            className="hidden lg:flex lg:w-[26%] xl:w-[24%] bg-white text-[#C61122] flex-col items-center justify-center p-6 lg:p-8 text-center cursor-pointer transition-all duration-300 hover:bg-[#FAF6EE] select-none group border-l border-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C61122]"
            aria-label="Scroll to discover next section"
          >
            <span className="text-xs lg:text-[13px] uppercase tracking-[0.22em] font-semibold font-sans mb-3 text-[#C61122] group-hover:tracking-[0.26em] transition-all duration-300">
              Scroll to discover
            </span>
            <div className="w-8 h-8 rounded-full border border-[#C61122]/30 flex items-center justify-center group-hover:border-[#C61122] group-hover:scale-110 transition-all duration-300">
              <ArrowDown className="w-4 h-4 text-[#C61122] animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </ChapterShell>
  );
};
