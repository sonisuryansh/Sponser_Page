import React, { useState } from 'react';
import { siteConfig, type ProjectItem } from '../config/content.config';
import { ArrowRight, X, Maximize2 } from 'lucide-react';

export const ProjectShowcaseSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section
      id="showcase"
      data-chapter="07"
      className="relative w-full min-h-screen py-24 md:py-32 bg-[#0d1218] text-white snap-start"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-3">
              {siteConfig.showcase.eyebrow}
            </div>
            <h2 className="font-serif text-[clamp(32px,4vw,56px)] font-normal leading-[1.12] tracking-tight text-white mb-2">
              {siteConfig.showcase.headline}
            </h2>
            <p className="text-lg text-white/70 font-sans">
              {siteConfig.showcase.subline}
            </p>
          </div>

          <div className="inline-flex items-center px-3.5 py-1.5 border border-[#c8a45d]/40 bg-[#c8a45d]/10 text-[#c8a45d] text-xs font-mono uppercase tracking-wider rounded-[2px] shrink-0 self-start md:self-end">
            {siteConfig.showcase.badge}
          </div>
        </div>

        {/* Project Wall Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {siteConfig.showcase.projects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className="group relative bg-[#131a24] border border-white/10 hover:border-white/30 rounded-[2px] overflow-hidden flex flex-col justify-between transition-colors duration-300 cursor-pointer"
            >
              {/* Image with Tag Overlay */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black/50">
                <img
                  src={proj.image}
                  alt={proj.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131a24] via-transparent to-black/20" />

                {/* Grade and Domain Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-black/70 backdrop-blur-xs text-[11px] font-mono text-white rounded-[2px]">
                    {proj.grade}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-[11px] font-mono rounded-[2px] backdrop-blur-xs ${
                      proj.isRealWork
                        ? 'bg-black/70 text-white/80'
                        : 'bg-[#c8a45d]/80 text-black font-semibold'
                    }`}
                  >
                    {proj.domain}
                  </span>
                </div>

                <div className="absolute top-3 right-3 p-1.5 bg-black/60 rounded-[2px] text-white/60 group-hover:text-white transition-colors">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Card Text Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-medium text-white tracking-tight mb-2">
                    {proj.name}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {proj.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#c8a45d]">
                  <span className="uppercase tracking-wider">Inspect Project Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Future Readiness Band (Eight technologies in exact wording, no grade tags) */}
        <div className="border border-white/15 bg-white/[0.03] p-8 md:p-12 rounded-[2px]">
          <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-3">
            {siteConfig.showcase.futureReadiness.eyebrow}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
            {siteConfig.showcase.futureReadiness.technologies.map((tech) => (
              <div key={tech.name} className="p-4 bg-white/[0.04] border border-white/10 rounded-[2px]">
                <h4 className="font-serif text-base font-medium text-white mb-1.5">
                  {tech.name}
                </h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  {tech.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Stepper: Explore -> Experiment -> Apply -> Build */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono uppercase tracking-widest text-white/60">
            <span>Cognitive Development Arc</span>
            <div className="flex items-center gap-2">
              {siteConfig.showcase.futureReadiness.flowSteps.map((step, idx) => (
                <React.Fragment key={step}>
                  <span className="text-white font-medium">{step}</span>
                  {idx < siteConfig.showcase.futureReadiness.flowSteps.length - 1 && (
                    <span className="text-white/30">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Project Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-10 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-3xl bg-[#111720] border border-white/20 rounded-[2px] p-8 md:p-10 text-white overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedProject(null)}
              aria-label="Close project modal"
              className="absolute top-6 right-6 p-2 text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-2.5 py-1 bg-white/10 text-xs font-mono rounded-[2px]">
                {selectedProject.grade}
              </span>
              <span className="px-2.5 py-1 bg-[#c8a45d]/20 text-[#c8a45d] text-xs font-mono rounded-[2px]">
                {selectedProject.domain}
              </span>
            </div>

            <h3 className="font-serif text-2xl md:text-4xl font-normal tracking-tight text-white mb-4">
              {selectedProject.name}
            </h3>

            <div className="relative aspect-[16/9] rounded-[2px] overflow-hidden border border-white/10 mb-6 bg-black">
              <img
                src={selectedProject.image}
                alt={selectedProject.name}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-base md:text-lg text-white/80 leading-relaxed mb-6">
              {selectedProject.summary}
            </p>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2 border border-white/30 hover:border-white text-xs uppercase tracking-[0.18em] text-white transition-colors rounded-[2px] cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
