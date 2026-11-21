import React, { useState, useRef, useEffect } from 'react';
import { siteConfig, type ProjectItem } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { ArrowRight, X, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';

const domainBadgeStyles: Record<string, string> = {
  'Robotics & Automation': 'bg-cyan-50 text-cyan-800 border-cyan-200/80',
  'AI & Machine Learning': 'bg-purple-50 text-purple-800 border-purple-200/80',
  'Data Analytics': 'bg-amber-50 text-amber-800 border-amber-200/80',
  'Aerial Systems': 'bg-sky-50 text-sky-800 border-sky-200/80',
  'Sample project': 'bg-[#FAF6EE] text-[#8c6b24] border-[#c8a45d]/40',
};

const projectChips: Record<string, string[]> = {
  'proj-1': ['Ultrasonic Sensor', 'Dual Motor Calibration', 'Obstacle Avoidance Logic'],
  'proj-2': ['Telemetry Dashboard', 'Air Quality Monitoring', 'Real-time Analytics'],
  'proj-3': ['Indoor Flight Cage', '3-Axis Gyro Stability', 'Tethered Safety Protocol'],
  'proj-4': ['Edge Neural Model', 'Camera Classifier', 'Recyclable Item Sorting'],
  'proj-5': ['3-DOF Kinematics', 'Micro-Servo Actuation', 'Geometric Pick & Place'],
};

export const ProjectShowcaseSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = siteConfig.showcase.projects;
  const currentProject = projects[activeProjectIndex] || projects[0];
  const activeChips = projectChips[currentProject.id] || ['Core Engineering', 'Hands-on Prototype', 'Grade Build'];

  // Handle auto-advance when section is idle and not hovered
  useEffect(() => {
    if (isHovered || selectedProject !== null || projects.length <= 1) return;
    const timer = setInterval(() => {
      setActiveProjectIndex((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered, selectedProject, projects.length]);

  const handlePrev = () => {
    setActiveProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    setActiveProjectIndex((prev) => (prev + 1) % projects.length);
  };

  const handleScrollToNext = () => {
    window.dispatchEvent(new CustomEvent('go-to-slide', { detail: 7 }));
  };

  const badgeStyle = domainBadgeStyles[currentProject.domain] || domainBadgeStyles['Sample project'];

  return (
    <ChapterShell
      id="showcase"
      chapterNumber="07"
      theme="light"
      fullBleed={true}
      className="relative w-full h-[100svh] overflow-hidden bg-[#FAF6EE] select-none"
    >
      {/* 100svh Locked Single-Screen Container */}
      <div
        ref={containerRef}
        className="relative w-full h-full max-h-[100svh] flex flex-col justify-between pt-[calc(var(--header-h,64px)+8px)] pb-3 px-4 sm:px-8 lg:px-12 box-border select-none z-10 max-w-[1360px] mx-auto overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top Header & 2-Column Narrative */}
        <div className="flex-none max-w-4xl mx-auto w-full text-center">
          <div className="flex items-center justify-center gap-2.5 mb-1">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#c8a45d] font-bold">
              {siteConfig.showcase.eyebrow}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#c8a45d]" />
            <span className="font-mono text-[10.5px] text-[#888888] tracking-wider">
              07 / 14
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-normal leading-tight tracking-tight text-[#111111] mb-1.5">
            {siteConfig.showcase.headline}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 pt-1.5 border-t border-black/10 text-left">
            <p className="font-sans text-[11px] sm:text-[12px] text-[#555555] leading-relaxed font-normal">
              A disciplined, hands-on engineering approach ensures theoretical curiosity becomes functional reality. That's why our students cover every stage from first circuit breadboarding to final prototype testing.
            </p>
            <p className="font-sans text-[11px] sm:text-[12px] text-[#555555] leading-relaxed font-normal">
              From Grade 9 onwards, students present their capstone builds to teachers, parents, and industry peers—demonstrating real-world problem-solving, code integration, and mechanical rigor.
            </p>
          </div>
        </div>

        {/* Middle Project Showcase Area (Locked into single viewport) */}
        <div className="flex-1 min-h-0 flex flex-col justify-center my-auto py-1 sm:py-2 max-w-5xl mx-auto w-full">
          {/* Quick Project Switcher Pills */}
          <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-black/10">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              {projects.map((proj, idx) => {
                const isActive = activeProjectIndex === idx;
                return (
                  <button
                    key={proj.id}
                    onClick={() => setActiveProjectIndex(idx)}
                    className={`group px-2.5 sm:px-3 py-1 rounded-[3px] border font-mono text-[10px] sm:text-[11px] tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#111111] border-[#111111] text-[#FAF6EE] shadow-sm'
                        : 'bg-white/80 border-black/10 text-[#666666] hover:text-[#111111] hover:border-black/30'
                    }`}
                  >
                    <span className={isActive ? 'text-[#c8a45d] font-bold' : 'text-[#888888]'}>
                      0{idx + 1}
                    </span>
                    <span className="font-sans font-medium hidden sm:inline truncate max-w-[130px] lg:max-w-[160px]">
                      {proj.name}
                    </span>
                    <span className={`text-[9px] px-1 py-0.2 rounded ${isActive ? 'bg-white/20 text-white' : 'bg-black/5 text-[#777777]'}`}>
                      {proj.grade}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Stepper Arrows */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={handlePrev}
                className="p-1 rounded-[2px] border border-black/15 bg-white/80 hover:bg-white text-[#111111] transition-colors cursor-pointer"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleNext}
                className="p-1 rounded-[2px] border border-black/15 bg-white/80 hover:bg-white text-[#111111] transition-colors cursor-pointer"
                aria-label="Next project"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Active Project Card with Compact Image Frame */}
          <div className="bg-white border border-black/10 rounded-[4px] p-4 sm:p-5 lg:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-center gap-5 lg:gap-8">
            {/* Left Narrative & Metadata */}
            <div className="flex-1 w-full min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="font-mono text-sm sm:text-base font-bold text-[#c8a45d]">
                  0{activeProjectIndex + 1}
                </span>
                <span className="w-1 h-1 rounded-full bg-black/20" />
                <span
                  className={`font-mono text-[10px] sm:text-[10.5px] uppercase tracking-wider px-2 py-0.5 rounded-[2px] border font-semibold ${badgeStyle}`}
                >
                  {currentProject.domain}
                </span>
                <span className="font-mono text-[10.5px] text-[#777777]">
                  {currentProject.grade}
                </span>
                <span className="hidden sm:inline font-mono text-[9.5px] uppercase tracking-widest text-[#999999] ml-auto">
                  Student Engineering Capstone
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl lg:text-[26px] font-medium text-[#111111] leading-tight mb-2">
                {currentProject.name}
              </h3>

              <p className="font-sans text-xs sm:text-[12.5px] text-[#555555] leading-[1.65] font-normal mb-3">
                {currentProject.summary}
              </p>

              {/* Hardware / Spec Chips */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 pt-2 border-t border-black/10">
                {activeChips.map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[2px] bg-[#FAF9F6] border border-black/10 font-sans text-[10.5px] text-[#333333]"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#c8a45d]" />
                    {chip}
                  </span>
                ))}
              </div>

              {/* Action Link */}
              <button
                onClick={() => setSelectedProject(currentProject)}
                className="group inline-flex items-center gap-2.5 font-sans font-bold text-[10.5px] uppercase tracking-[0.2em] text-[#111111] hover:text-[#c8a45d] transition-colors cursor-pointer"
              >
                <span>Inspect Project Build</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>

            {/* Right Compact Image Frame (Controlled height so whole section locks in 1 window) */}
            <div
              onClick={() => setSelectedProject(currentProject)}
              className="relative w-full md:w-[320px] lg:w-[380px] h-[160px] sm:h-[185px] lg:h-[200px] rounded-[3px] overflow-hidden border border-black/10 bg-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] group cursor-pointer shrink-0"
            >
              <img
                src={currentProject.image}
                alt={currentProject.name}
                className="w-full h-full object-cover object-center filter saturate-[0.88] contrast-[1.04] group-hover:scale-103 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Maximize Pill */}
              <div className="absolute top-2.5 right-2.5 p-1.5 bg-black/70 backdrop-blur-xs rounded-[2px] text-white/80 group-hover:text-white group-hover:scale-110 transition-all">
                <Maximize2 className="w-3 h-3" />
              </div>

              {/* Bottom Label Overlay */}
              <div className="absolute bottom-2.5 left-2.5 text-white">
                <span className="font-mono text-[9px] uppercase tracking-wider block opacity-80">
                  {currentProject.grade} Portfolio
                </span>
                <span className="font-sans text-[11.5px] font-semibold leading-tight line-clamp-1">
                  {currentProject.name}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Future Readiness Band & Trailing Link */}
        <div className="flex-none pt-1">
          <div className="border border-black/10 bg-white/70 px-3 py-1.5 sm:px-4 sm:py-2 rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono text-[#555555] mb-2">
            <div className="flex items-center gap-2 truncate">
              <span className="uppercase tracking-wider font-bold text-[#111111]">
                Future Readiness:
              </span>
              <span className="truncate text-[#666666]">
                Physical AI · Generative AI · AI Agents · Digital Twins · Edge AI · Smart IoT · Autonomous Drones
              </span>
            </div>
            <span className="uppercase tracking-widest text-[#c8a45d] shrink-0 font-bold text-[10px]">
              Explore → Experiment → Apply → Build
            </span>
          </div>

          <div className="flex items-center">
            <button
              onClick={handleScrollToNext}
              className="group flex items-center text-left focus:outline-none cursor-pointer w-full max-w-xl"
            >
              <span className="font-sans font-bold text-[10px] sm:text-[10.5px] uppercase tracking-[0.22em] text-[#111111] group-hover:text-[#c8a45d] transition-colors shrink-0">
                Discover our STEM lab infrastructure & setups
              </span>
              <span className="h-[1px] bg-black/20 group-hover:bg-[#c8a45d] transition-all flex-1 ml-4" />
            </button>
          </div>
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
