import React, { useState, useRef } from 'react';
import { siteConfig, type ProjectItem } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { ArrowRight, X, Maximize2 } from 'lucide-react';

const domainBadgeStyles: Record<string, string> = {
  'Robotics & Automation': 'bg-cyan-50 text-cyan-800 border-cyan-200/80',
  'AI & Machine Learning': 'bg-purple-50 text-purple-800 border-purple-200/80',
  'Data Analytics': 'bg-amber-50 text-amber-800 border-amber-200/80',
  'Aerial Systems': 'bg-sky-50 text-sky-800 border-sky-200/80',
  'Sample project': 'bg-[#FAF6EE] text-[#8c6b24] border-[#c8a45d]/40',
};

export const ProjectShowcaseSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = siteConfig.showcase.projects;

  const handleScrollToNext = () => {
    window.dispatchEvent(new CustomEvent('go-to-slide', { detail: 7 }));
  };

  return (
    <ChapterShell
      id="showcase"
      chapterNumber="07"
      theme="light"
      fullBleed={true}
      className="relative w-full h-[100svh] overflow-y-auto bg-[#FAF6EE] select-none"
    >
      {/* Scrollable Container with Top Clearance for Fixed Header */}
      <div
        ref={containerRef}
        className="relative w-full min-h-full pt-[calc(var(--header-h,64px)+28px)] pb-20 px-4 sm:px-8 lg:px-14 max-w-[1360px] mx-auto box-border"
      >
        {/* Top Header & 2-Column Narrative (Exact Image 1 Style) */}
        <div className="mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-3 mb-2.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#c8a45d] font-bold">
              {siteConfig.showcase.eyebrow}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#c8a45d]" />
            <span className="font-mono text-[11px] text-[#888888] tracking-wider">
              07 / 14
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal leading-[1.14] tracking-tight text-[#111111] mb-6 max-w-4xl text-center mx-auto">
            {siteConfig.showcase.headline}
          </h2>

          {/* 2-Column Narrative Intro (Matching Image 1) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 pt-4 border-t border-black/10">
            <p className="font-sans text-xs sm:text-[13.5px] text-[#555555] leading-[1.7] font-normal">
              A disciplined, hands-on engineering approach ensures theoretical curiosity becomes functional reality. That's why our students cover every stage from first circuit breadboarding to final prototype testing.
            </p>
            <p className="font-sans text-xs sm:text-[13.5px] text-[#555555] leading-[1.7] font-normal">
              From Grade 9 onwards, students present their capstone builds to teachers, parents, and industry peers—demonstrating real-world problem-solving, code integration, and mechanical rigor.
            </p>
          </div>
        </div>

        {/* Alternating Zig-Zag Showcase Rows (Exact Images 1, 2, 3, 4 Layout) */}
        <div className="flex flex-col">
          {projects.map((proj, idx) => {
            const isEven = idx % 2 === 0;
            const badgeStyle = domainBadgeStyles[proj.domain] || domainBadgeStyles['Sample project'];

            return (
              <div
                key={proj.id}
                className="py-10 sm:py-14 lg:py-16 border-t border-black/10 flex flex-col md:flex-row items-center gap-8 lg:gap-14"
              >
                {/* When Even: Text on Left, Image on Right. When Odd: Image on Left, Text on Right */}
                <div
                  className={`w-full md:w-1/2 flex flex-col justify-center ${
                    isEven ? 'order-1 md:order-1' : 'order-1 md:order-2'
                  }`}
                >
                  <div className="max-w-xl">
                    {/* Numbering: 01, 02, 03... (Brand gold theme, NOT red!) */}
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-sm sm:text-base lg:text-[17px] font-bold text-[#c8a45d]">
                        0{idx + 1}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-black/20" />
                      <span
                        className={`font-mono text-[10.5px] uppercase tracking-wider px-2.5 py-0.5 rounded-[2px] border font-semibold ${badgeStyle}`}
                      >
                        {proj.domain}
                      </span>
                      <span className="font-mono text-[10.5px] text-[#888888]">
                        {proj.grade}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#111111] leading-tight mb-3">
                      {proj.name}
                    </h3>

                    {/* Summary / Narrative */}
                    <p className="font-sans text-xs sm:text-[13.5px] text-[#555555] leading-[1.7] font-normal mb-5">
                      {proj.summary}
                    </p>

                    {/* Action CTA */}
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="group inline-flex items-center gap-3 font-sans font-bold text-[11px] uppercase tracking-[0.2em] text-[#111111] hover:text-[#c8a45d] transition-colors cursor-pointer"
                    >
                      <span>Inspect Project Build</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Photographic Showcase Frame */}
                <div
                  className={`w-full md:w-1/2 ${
                    isEven ? 'order-2 md:order-2' : 'order-2 md:order-1'
                  }`}
                >
                  <div
                    onClick={() => setSelectedProject(proj)}
                    className="group relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-[3px] overflow-hidden border border-black/10 bg-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] cursor-pointer"
                  >
                    <img
                      src={proj.image}
                      alt={proj.name}
                      className="w-full h-full object-cover object-center filter saturate-[0.8] contrast-[1.04] group-hover:scale-103 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                    {/* Top Corner Maximize Pill */}
                    <div className="absolute top-3 right-3 p-1.5 bg-black/70 backdrop-blur-xs rounded-[2px] text-white/80 group-hover:text-white group-hover:scale-110 transition-all">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>

                    {/* Bottom Label Overlay */}
                    <div className="absolute bottom-3 left-3 text-white">
                      <span className="font-mono text-[10px] uppercase tracking-wider block opacity-75">
                        {proj.grade} Portfolio
                      </span>
                      <span className="font-sans text-[12px] font-semibold">
                        {proj.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Future Readiness Band */}
        <div className="pt-10 border-t border-black/10 my-8">
          <div className="border border-black/10 bg-white/70 p-4 sm:p-5 rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[#555555]">
            <span className="uppercase tracking-wider font-bold text-[#111111]">
              Future Readiness:
            </span>
            <span className="truncate">
              Physical AI · Generative AI · AI Agents · Digital Twins · Edge AI · Smart IoT · Autonomous Drones
            </span>
            <span className="uppercase tracking-widest text-[#c8a45d] shrink-0 font-bold">
              Explore → Experiment → Apply → Build
            </span>
          </div>
        </div>

        {/* Bottom Trailing Link CTA */}
        <div className="pt-6 border-t border-black/10 flex items-center">
          <button
            onClick={handleScrollToNext}
            className="group flex items-center text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c8a45d] cursor-pointer w-full max-w-2xl"
          >
            <span className="font-sans font-bold text-[10.5px] sm:text-[11px] uppercase tracking-[0.22em] text-[#111111] group-hover:text-[#c8a45d] transition-colors shrink-0">
              Discover our STEM lab infrastructure & setups
            </span>
            <span className="h-[1px] bg-black/20 group-hover:bg-[#c8a45d] transition-all flex-1 ml-4" />
          </button>
        </div>
      </div>

      {/* Full-Screen Project Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-white border border-black/15 shadow-2xl rounded-[3px] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <div className="relative aspect-[16/9] w-full bg-black/10 overflow-hidden">
              <img
                src={selectedProject.image}
                alt={selectedProject.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 p-2 bg-black/70 hover:bg-black text-white rounded-full transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-[#c8a45d]">
                  {selectedProject.grade}
                </span>
                <span className="w-1 h-1 rounded-full bg-black/30" />
                <span className="font-mono text-xs text-[#555555]">
                  {selectedProject.domain}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#111111] mb-3">
                {selectedProject.name}
              </h3>

              <p className="font-sans text-sm text-[#555555] leading-relaxed mb-6">
                {selectedProject.summary}
              </p>

              <div className="pt-4 border-t border-black/10 flex justify-between items-center text-xs font-mono text-[#888888]">
                <span>Student Engineering Capstone</span>
                <span className="text-[#c8a45d] font-bold">Hands-on Hardware Prototype</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </ChapterShell>
  );
};

export default ProjectShowcaseSection;
