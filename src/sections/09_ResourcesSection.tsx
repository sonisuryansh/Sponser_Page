import React, { useRef, useEffect } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { BookOpen, Layers, CheckSquare, Video } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const tileIcons: Record<string, React.ReactNode> = {
  Books: <BookOpen className="w-5 h-5" />,
  Modules: <Layers className="w-5 h-5" />,
  Quizzes: <CheckSquare className="w-5 h-5" />,
  Videos: <Video className="w-5 h-5" />,
};

export const ResourcesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<HTMLDivElement>(null);

  // Tiles stagger reveal animation
  useEffect(() => {
    const el = tilesRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const tiles = el.querySelectorAll<HTMLElement>('.resource-tile');

    // Failsafe: force visibility
    const failsafe = setTimeout(() => {
      tiles.forEach((t) => {
        t.style.opacity = '1';
        t.style.transform = 'none';
      });
    }, 2500);

    if (prefersReducedMotion || isMobile || !document.documentElement.classList.contains('js-motion')) {
      tiles.forEach((t) => {
        t.style.opacity = '1';
        t.style.transform = 'none';
      });
      return () => clearTimeout(failsafe);
    }

    const tween = gsap.fromTo(
      tiles,
      { y: 30, opacity: 0.15 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
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
    <ChapterShell id="resources" chapterNumber="09" theme="light">
      <div ref={containerRef} className="w-full flex-1 flex flex-col justify-between py-2 select-none">
        {/* Eyebrow & Headline */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4 pb-3 border-b border-black/10">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-1">
              {siteConfig.resources.eyebrow}
            </div>
            <h2 className="font-serif text-[clamp(26px,3.5vw,46px)] font-normal leading-[1.14] tracking-tight text-[#111111]">
              {siteConfig.resources.headline}
            </h2>
            <p className="text-sm text-[#5b5b5b] font-sans">
              {siteConfig.resources.paragraph}
            </p>
          </div>

          {!siteConfig.confirm.lmsReady && (
            <div className="px-3 py-1 bg-[#fafafa] border border-black/15 text-[#5b5b5b] text-xs font-mono uppercase tracking-wider rounded-[2px] self-start sm:self-end">
              {siteConfig.resources.statusNotice}
            </div>
          )}
        </div>

        {/* Four Large Tiles in 2x2 Grid with 8px hover lift */}
        <div
          ref={tilesRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-auto"
        >
          {siteConfig.resources.tiles.map((tile) => (
            <div
              key={tile.title}
              className="resource-tile p-5 bg-[#fafafa] border border-black/10 rounded-[2px] flex flex-col justify-between h-[180px] sm:h-[200px] hover:border-black/30 transition-all duration-300 hover:-translate-y-2 shadow-xs cursor-default"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 flex items-center justify-center border border-black/10 bg-white rounded-[2px] text-[#111111]">
                    {tileIcons[tile.title]}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#5b5b5b]">
                    {tile.tag}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-medium tracking-tight text-[#111111] mb-1.5">
                  {tile.title}
                </h3>
              </div>
              <p className="text-xs leading-relaxed text-[#5b5b5b]">
                {tile.description}
              </p>
            </div>
          ))}
        </div>

        {/* Platform Preview Banner */}
        <div className="relative aspect-[28/9] max-h-[160px] rounded-[2px] overflow-hidden border border-black/10 bg-[#f4f7f9] mt-3">
          <img
            src={siteConfig.resources.previewImage}
            alt="MedhaArc Labs Learning Platform Interface"
            className="w-full h-full object-cover filter brightness-[0.98]"
          />
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black text-white text-[9px] font-mono uppercase tracking-[0.2em] rounded-[2px]">
            Preview
          </div>
          <div className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 bg-white/90 backdrop-blur-xs text-[10px] font-mono text-[#5b5b5b] rounded-[2px] border border-black/5">
            Grade-by-Grade Curriculum Materials
          </div>
        </div>
      </div>
    </ChapterShell>
  );
};
