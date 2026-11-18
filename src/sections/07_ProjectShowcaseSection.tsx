import React, { useState, useEffect, useRef } from 'react';
import { siteConfig, type ProjectItem } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { ArrowRight, X, Maximize2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const domainBadgeColors: Record<string, string> = {
  'Robotics & Automation': 'bg-cyan-950/85 text-cyan-300 border border-cyan-500/40',
  'AI & Machine Learning': 'bg-emerald-950/85 text-emerald-300 border border-emerald-500/40',
  'Data Analytics': 'bg-amber-950/85 text-amber-300 border border-amber-500/40',
  'Aerial Systems': 'bg-sky-950/85 text-sky-300 border border-sky-500/40',
  'Sample project': 'bg-[#c8a45d] text-black font-semibold',
};

export const ProjectShowcaseSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Horizontal scroll pin & scrub on desktop
  useEffect(() => {
    const el = containerRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    if (prefersReducedMotion || isMobile || !document.documentElement.classList.contains('js-motion')) {
      return;
    }

    const scrollAmount = track.scrollWidth - track.clientWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -scrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: () => `+=${scrollAmount + 200}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <ChapterShell id="showcase" chapterNumber="07" theme="light">
      <div ref={containerRef} className="w-full flex-1 flex flex-col justify-between py-2 select-none">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4 pb-3 border-b border-black/10">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-1">
              {siteConfig.showcase.eyebrow}
            </div>
            <h2 className="font-serif text-[clamp(26px,3.5vw,46px)] font-normal leading-[1.12] tracking-tight text-[#111111]">
              {siteConfig.showcase.headline}
            </h2>
            <p className="text-sm text-[#5b5b5b] font-sans">
              {siteConfig.showcase.subline}
            </p>
          </div>

          <div className="inline-flex items-center px-3 py-1 border border-[#c8a45d]/40 bg-[#c8a45d]/10 text-[#c8a45d] text-xs font-mono uppercase tracking-wider rounded-[2px] shrink-0 self-start sm:self-end">
            {siteConfig.showcase.badge}
          </div>
        </div>

        {/* Project Wall (Horizontal Track on Desktop) */}
        <div className="overflow-hidden w-full my-auto py-2">
          <div
            ref={trackRef}
            className="flex items-stretch gap-5 transition-transform duration-300 will-change-transform"
          >
            {siteConfig.showcase.projects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className="group relative w-[280px] sm:w-[320px] lg:w-[340px] shrink-0 bg-[#fafafa] border border-black/10 hover:border-black/30 rounded-[2px] overflow-hidden flex flex-col justify-between transition-colors duration-300 cursor-pointer shadow-xs"
              >
                {/* Image with Tag Overlay */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black/10">
                  <img
                    src={proj.image}
                    alt={proj.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Grade and Domain Badges */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 bg-black/80 backdrop-blur-xs text-[10px] font-mono text-white rounded-[2px]">
                      {proj.grade}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-mono rounded-[2px] backdrop-blur-xs ${
                        domainBadgeColors[proj.domain] || (proj.isRealWork ? 'bg-black/70 text-white/90' : 'bg-[#c8a45d] text-black font-semibold')
                      }`}
                    >
                      {proj.domain}
                    </span>
                  </div>

                  <div className="absolute top-2.5 right-2.5 p-1 bg-black/60 rounded-[2px] text-white/70 group-hover:text-white transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Card Text Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-medium text-[#111111] tracking-tight mb-1">
                      {proj.name}
                    </h3>
                    <p className="text-xs text-[#5b5b5b] leading-relaxed line-clamp-2">
                      {proj.summary}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-black/10 flex items-center justify-between text-[11px] text-[#c8a45d]">
                    <span className="uppercase tracking-wider">Inspect Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Readiness Band at End */}
        <div className="border border-black/10 bg-[#fafafa] p-3.5 rounded-[2px] mt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-[#5b5b5b]">
            <span className="uppercase tracking-wider font-semibold text-[#111111]">
              Future Readiness:
            </span>
            <span className="truncate">
              Physical AI · Generative AI · AI Agents · Digital Twins · Edge AI · Smart IoT · AR/VR · Drones
            </span>
            <span className="uppercase tracking-widest text-[#c8a45d] shrink-0 font-bold">
              Explore → Experiment → Apply → Build
            </span>
          </div>
        </div>
      </div>

      {/* Full-Screen Project Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-2xl bg-white border border-black/15 rounded-[2px] p-6 md:p-8 text-[#111111] overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedProject(null)}
              aria-label="Close project modal"
              className="absolute top-5 right-5 p-2 text-[#5b5b5b] hover:text-black transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 bg-black/5 text-xs font-mono rounded-[2px]">
                {selectedProject.grade}
              </span>
              <span className="px-2 py-0.5 bg-[#c8a45d]/20 text-[#111111] text-xs font-mono rounded-[2px]">
                {selectedProject.domain}
              </span>
            </div>

            <h3 className="font-serif text-2xl md:text-3xl font-normal tracking-tight text-[#111111] mb-4">
              {selectedProject.name}
            </h3>

            <div className="relative aspect-[16/9] rounded-[2px] overflow-hidden border border-black/10 mb-5 bg-black">
              <img
                src={selectedProject.image}
                alt={selectedProject.name}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm md:text-base text-[#5b5b5b] leading-relaxed mb-6">
              {selectedProject.summary}
            </p>

            <div className="pt-3 border-t border-black/10 flex justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-1.5 border border-black/30 hover:border-black text-xs uppercase tracking-[0.18em] text-[#111111] transition-colors rounded-[2px] cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </ChapterShell>
  );
};
