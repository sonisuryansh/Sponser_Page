import React, { useState, useRef, useEffect } from 'react';
import { siteConfig, type ProjectItem } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import {
  ArrowRight,
  X,
  Maximize2,
  Bot,
  Activity,
  Plane,
  Cpu,
  Wrench,
  Sparkles,
} from 'lucide-react';

interface ProjectStyleMeta {
  color: string;
  bgLight: string;
  borderLight: string;
  textColor: string;
  pillBorder: string;
  icon: React.ReactNode;
}

const PROJECT_META: Record<string, ProjectStyleMeta> = {
  'proj-1': {
    // Autonomous Obstacle Rover - Robotics
    color: '#0284C7',
    bgLight: 'rgba(2, 132, 199, 0.08)',
    borderLight: 'rgba(2, 132, 199, 0.25)',
    textColor: '#0369A1',
    pillBorder: '#38BDF8',
    icon: <Bot className="w-3.5 h-3.5" />,
  },
  'proj-2': {
    // Environmental Sensor Station - Data/IoT
    color: '#0D9488',
    bgLight: 'rgba(13, 148, 136, 0.08)',
    borderLight: 'rgba(13, 148, 136, 0.25)',
    textColor: '#0F766E',
    pillBorder: '#2DD4BF',
    icon: <Activity className="w-3.5 h-3.5" />,
  },
  'proj-3': {
    // Hoop Navigation Flight Rig - Aerial
    color: '#EA580C',
    bgLight: 'rgba(234, 88, 12, 0.08)',
    borderLight: 'rgba(234, 88, 12, 0.25)',
    textColor: '#C2410C',
    pillBorder: '#FB923C',
    icon: <Plane className="w-3.5 h-3.5" />,
  },
  'proj-4': {
    // Visual Pattern Classifier - AI/ML
    color: '#9333EA',
    bgLight: 'rgba(147, 51, 234, 0.08)',
    borderLight: 'rgba(147, 51, 234, 0.25)',
    textColor: '#7E22CE',
    pillBorder: '#C084FC',
    icon: <Cpu className="w-3.5 h-3.5" />,
  },
  'proj-5': {
    // Multi-Axis Articulated Arm - Robotics/Mechanics
    color: '#2563EB',
    bgLight: 'rgba(37, 99, 235, 0.08)',
    borderLight: 'rgba(37, 99, 235, 0.25)',
    textColor: '#1D4ED8',
    pillBorder: '#60A5FA',
    icon: <Wrench className="w-3.5 h-3.5" />,
  },
};

const projectChips: Record<string, string[]> = {
  'proj-1': ['Ultrasonic Sensor', 'Dual Motor Calibration', 'Obstacle Avoidance Logic'],
  'proj-2': ['Telemetry Dashboard', 'Air Quality Monitoring', 'Real-time Analytics'],
  'proj-3': ['Indoor Flight Cage', '3-Axis Gyro Stability', 'Tethered Safety Protocol'],
  'proj-4': ['Edge Neural Model', 'Camera Classifier', 'Recyclable Item Sorting'],
  'proj-5': ['3-DOF Kinematics', 'Micro-Servo Actuation', 'Geometric Pick & Place'],
};

const projectSpecs: Record<string, { arch: string; takeaway: string }> = {
  'proj-1': {
    arch: 'Microcontroller-driven dual H-bridge motor driver, real-time pulse-width modulation (PWM) speed regulation, and ultrasonic echo-ranging.',
    takeaway: 'Closed-loop obstacle avoidance, reactive steering algorithms & chassis assembly.',
  },
  'proj-2': {
    arch: 'Multi-sensor I2C telemetry bus, low-power particulate matter sensing, and local buffer transmission to classroom dashboard.',
    takeaway: 'Real-world data acquisition, calibration curves, and environmental metrics analysis.',
  },
  'proj-3': {
    arch: 'Quadcopter frame with safety ducted prop guards, 6-DOF IMU sensor fusion, and tethered altitude hold calibration.',
    takeaway: 'Aerodynamic lift principles, PID stabilization loops & safe indoor arena piloting.',
  },
  'proj-4': {
    arch: 'On-device lightweight convolutional neural inference, optical feature detection, and digital confidence scoring.',
    takeaway: 'Training dataset curation, computer vision pipelines, and automated sorting logic.',
  },
  'proj-5': {
    arch: '3-degree-of-freedom articulated arm with inverse kinematics solver, high-torque servo linkages, and magnetic gripper.',
    takeaway: 'Joint coordinate transformations, mechanical gear reduction & repeatable trajectory planning.',
  },
};

export const ProjectShowcaseSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = siteConfig.showcase.projects;
  const currentProject = projects[activeProjectIndex] || projects[0];
  const activeChips =
    projectChips[currentProject.id] || ['Core Engineering', 'Hands-on Prototype', 'Project Build'];

  const currentMeta = PROJECT_META[currentProject.id] || PROJECT_META['proj-1'];

  // Handle auto-advance tabs every 6.5 seconds (in requested 5-8s range)
  useEffect(() => {
    if (selectedProject !== null || projects.length <= 1) return;
    const timer = setInterval(() => {
      setActiveProjectIndex((prev) => (prev + 1) % projects.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [selectedProject, projects.length]);

  const handleScrollToNext = () => {
    window.dispatchEvent(new CustomEvent('go-to-slide', { detail: 7 }));
  };

  return (
    <ChapterShell
      id="showcase"
      chapterNumber="07"
      theme="light"
      fullBleed={true}
      className="relative w-full h-[100svh] overflow-hidden bg-[#FAF6EE] select-none"
    >
      {/* 100svh Viewport Container */}
      <div
        ref={containerRef}
        className="relative w-full h-full min-h-full flex-1 flex flex-col justify-center items-center pt-[calc(var(--header-h,64px)+2px)] pb-2 sm:pb-3 px-4 sm:px-6 lg:px-8 xl:px-10 box-border select-none z-10 max-w-[1440px] mx-auto overflow-hidden"
      >
        {/* Main Inset White Panel */}
        <div className="relative w-full h-full flex-1 bg-[#FFFFFD] shadow-[0_12px_40px_rgba(0,0,0,0.05)] border border-black/8 rounded-2xl flex flex-col justify-between p-3 sm:p-4 lg:p-4.5 box-border z-10 overflow-hidden">

          {/* Top Header: Eyebrow with gold accent & Headline */}
          <div className="flex-none text-center mb-1.5 sm:mb-2">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="h-[1px] w-6 sm:w-8 bg-[#b45309]/50" />
              <span className="font-mono text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#b45309]">
                {siteConfig.showcase.eyebrow}
              </span>
              <span className="h-[1px] w-6 sm:w-8 bg-[#b45309]/50" />
            </div>

            <h2 className="font-serif text-xl sm:text-2xl lg:text-[27px] font-bold leading-tight tracking-tight text-[#0F172A] text-center">
              {siteConfig.showcase.headline}
            </h2>
          </div>

          {/* ─── Dynamic Project Switcher Tabs (Tasteful colors & icons) ─── */}
          <div className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 mb-2 pb-1.5 border-b border-black/8">
            {/* Top Row: 3 Projects */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
              {projects.slice(0, 3).map((proj, idx) => {
                const actualIdx = idx;
                const isActive = activeProjectIndex === actualIdx;
                const meta = PROJECT_META[proj.id] || PROJECT_META['proj-1'];

                return (
                  <button
                    key={proj.id}
                    onClick={() => setActiveProjectIndex(actualIdx)}
                    style={{
                      borderColor: isActive ? meta.color : undefined,
                    }}
                    className={`group relative px-2.5 sm:px-3 py-1 rounded-lg border text-[10.5px] sm:text-[11px] font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${isActive
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'bg-[#F8FAFC] border-slate-200/90 text-[#475569] hover:text-[#0F172A] hover:bg-white hover:border-slate-300 hover:shadow-2xs'
                      }`}
                  >
                    {/* Project Domain Icon */}
                    <span
                      style={{ color: isActive ? meta.color : undefined }}
                      className={`transition-colors shrink-0 ${isActive ? '' : 'text-[#94A3B8] group-hover:text-[#475569]'
                        }`}
                    >
                      {meta.icon}
                    </span>

                    {/* Project Name */}
                    <span className="whitespace-nowrap">{proj.name}</span>

                    {/* Active Accent Underline Indicator */}
                    {isActive && (
                      <span
                        style={{ backgroundColor: meta.color }}
                        className="absolute -bottom-[1px] left-2.5 right-2.5 h-[2px] rounded-full shadow-xs"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom Row: 2 Projects */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
              {projects.slice(3, 5).map((proj, idx) => {
                const actualIdx = idx + 3;
                const isActive = activeProjectIndex === actualIdx;
                const meta = PROJECT_META[proj.id] || PROJECT_META['proj-1'];

                return (
                  <button
                    key={proj.id}
                    onClick={() => setActiveProjectIndex(actualIdx)}
                    style={{
                      borderColor: isActive ? meta.color : undefined,
                    }}
                    className={`group relative px-2.5 sm:px-3 py-1 rounded-lg border text-[10.5px] sm:text-[11px] font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${isActive
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'bg-[#F8FAFC] border-slate-200/90 text-[#475569] hover:text-[#0F172A] hover:bg-white hover:border-slate-300 hover:shadow-2xs'
                      }`}
                  >
                    {/* Project Domain Icon */}
                    <span
                      style={{ color: isActive ? meta.color : undefined }}
                      className={`transition-colors shrink-0 ${isActive ? '' : 'text-[#94A3B8] group-hover:text-[#475569]'
                        }`}
                    >
                      {meta.icon}
                    </span>

                    {/* Project Name */}
                    <span className="whitespace-nowrap">{proj.name}</span>

                    {/* Active Accent Underline Indicator */}
                    {isActive && (
                      <span
                        style={{ backgroundColor: meta.color }}
                        className="absolute -bottom-[1px] left-2.5 right-2.5 h-[2px] rounded-full shadow-xs"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ─── Active Project Presentation Box (Dynamic, Tastefully Colorful) ─── */}
          <div
            style={{
              borderColor: currentMeta.borderLight,
              background: `linear-gradient(135deg, #FFFFFF 0%, ${currentMeta.bgLight} 100%)`,
            }}
            className="relative flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 items-stretch gap-4 lg:gap-6 border-2 rounded-2xl p-3 sm:p-4 lg:p-5 mb-2 shadow-xs transition-all duration-500 overflow-hidden"
          >
            {/* Ambient Background Corner Glow */}
            <div
              style={{ backgroundColor: currentMeta.color }}
              className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 rounded-full blur-3xl opacity-10 pointer-events-none"
            />

            {/* Left Narrative & Metadata */}
            <div className="md:col-span-7 lg:col-span-8 w-full min-w-0 z-10 flex flex-col justify-between h-full min-h-0">
              <div className="flex-1 flex flex-col justify-between min-h-0">
                {/* Domain Badge Row (Grades Removed) */}
                <div className="flex items-center gap-2 mb-1 sm:mb-1.5 flex-wrap">
                  <span
                    style={{
                      backgroundColor: currentMeta.bgLight,
                      borderColor: currentMeta.borderLight,
                      color: currentMeta.textColor,
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[9.5px] sm:text-[10px] font-mono-tech font-bold uppercase tracking-wider shadow-2xs"
                  >
                    {currentMeta.icon}
                    <span>{currentProject.domain}</span>
                  </span>

                  <span className="hidden sm:inline font-mono text-[8.5px] uppercase tracking-widest text-[#94A3B8] font-bold ml-auto">
                    Student Engineering Capstone
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="font-serif text-lg sm:text-xl lg:text-[24px] font-bold text-[#0F172A] leading-tight mb-1">
                  {currentProject.name}
                </h3>

                {/* Summary Description */}
                <p className="font-sans text-[11px] sm:text-xs text-[#475569] leading-snug font-normal mb-1.5 max-w-xl line-clamp-2">
                  {currentProject.summary}
                </p>

                {/* Hardware / Spec Chips */}
                <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-1.5 pt-1.5 border-t border-black/8">
                  {activeChips.map((chip, chipIdx) => (
                    <span
                      key={chip}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-200/90 font-sans text-[9.5px] sm:text-[10px] font-medium text-[#334155] shadow-2xs hover:border-slate-300 transition-colors"
                    >
                      <span
                        style={{ backgroundColor: chipIdx === 0 ? currentMeta.color : '#F59E0B' }}
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                      />
                      <span>{chip}</span>
                    </span>
                  ))}
                </div>

                {/* Architecture & Student Mastery Specifications */}
                {(() => {
                  const spec = projectSpecs[currentProject.id];
                  if (!spec) return null;
                  return (
                    <div className="p-2 sm:p-2.5 rounded-xl bg-white/80 border border-black/8 shadow-2xs space-y-1 my-1">
                      <div className="flex items-start gap-1.5">
                        <span className="font-mono text-[8.5px] sm:text-[9px] uppercase tracking-wider font-bold text-[#0F172A] shrink-0 mt-0.5">
                          Architecture:
                        </span>
                        <span className="font-sans text-[10px] sm:text-[11px] text-[#475569] leading-tight font-normal line-clamp-2">
                          {spec.arch}
                        </span>
                      </div>
                      <div className="flex items-start gap-1.5 pt-1 border-t border-black/5">
                        <span className="font-mono text-[8.5px] sm:text-[9px] uppercase tracking-wider font-bold text-[#b45309] shrink-0 mt-0.5">
                          Student Mastery:
                        </span>
                        <span className="font-sans text-[10px] sm:text-[11px] text-[#334155] leading-tight font-medium line-clamp-2">
                          {spec.takeaway}
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Inspect Action Button */}
              <div className="pt-1.5 flex-none">
                <button
                  type="button"
                  onClick={() => setSelectedProject(currentProject)}
                  className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-mono-tech font-bold text-[10px] sm:text-[11px] tracking-wider transition-all shadow-xs hover:shadow-md cursor-pointer active:scale-95"
                >
                  <span>Inspect Project Build</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#38BDF8]" />
                </button>
              </div>
            </div>

            {/* Right Photo Frame */}
            <div
              onClick={() => setSelectedProject(currentProject)}
              style={{
                borderColor: currentMeta.borderLight,
              }}
              className="md:col-span-5 lg:col-span-4 relative h-full min-h-[180px] rounded-xl overflow-hidden border-2 bg-black/5 shadow-md group cursor-pointer transition-all hover:shadow-xl flex flex-col justify-between"
            >
              <img
                src={currentProject.image}
                alt={currentProject.name}
                className="absolute inset-0 w-full h-full object-cover object-center filter saturate-[0.92] contrast-[1.04] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

              {/* Maximize Icon Pill */}
              <div className="relative z-10 self-end m-2.5 p-1.5 bg-black/60 hover:bg-black/80 backdrop-blur-xs rounded-full text-white/90 group-hover:text-white group-hover:scale-110 transition-all border border-white/20 shadow-xs">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              {/* Bottom Label Overlay */}
              <div className="relative z-10 m-3 text-white">
                <span
                  style={{ color: currentMeta.pillBorder }}
                  className="font-mono text-[9px] uppercase tracking-wider block font-bold leading-tight mb-0.5"
                >
                  Student Portfolio Showcase
                </span>
                <span className="font-serif text-[12.5px] sm:text-[13px] font-medium leading-tight line-clamp-1 text-white/95">
                  {currentProject.name}
                </span>
              </div>
            </div>
          </div>

          {/* ─── Bottom Future Readiness Band & Trailing Link ─── */}
          <div className="flex-none pt-1 border-t border-black/8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-[10px] sm:text-[10.5px] font-mono text-[#555555] mb-2">
              <div className="flex items-center gap-2 truncate">
                <span className="uppercase tracking-wider font-bold text-[#0F172A] flex items-center gap-1.5 shrink-0">
                  <Sparkles className="w-3 h-3 text-[#F59E0B]" />
                  <span>Future Readiness:</span>
                </span>
                <span className="truncate text-[#64748B]">
                  Physical AI · Generative AI · AI Agents · Digital Twins · Edge AI · Smart IoT · Autonomous Drones
                </span>
              </div>
              <span className="uppercase tracking-widest text-[#B45309] shrink-0 font-bold text-[10px] hidden sm:inline">
                Explore → Experiment → Apply → Build
              </span>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleScrollToNext}
                className="group flex items-center text-left focus:outline-none cursor-pointer w-full max-w-xl"
              >
                <span className="font-sans font-bold text-[9px] sm:text-[10.5px] uppercase tracking-[0.1em] sm:tracking-[0.22em] text-[#0F172A] group-hover:text-[#B45309] transition-colors truncate">
                  Discover our STEM lab infrastructure &amp; setups
                </span>
                <span className="h-[1px] bg-black/20 group-hover:bg-[#B45309] transition-all flex-1 ml-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Full-Screen Project Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-white border border-black/15 shadow-2xl rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <div className="relative aspect-[16/9] w-full bg-black/10 overflow-hidden">
              <img
                src={selectedProject.image}
                alt={selectedProject.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project modal"
                className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-all border border-white/20 cursor-pointer shadow-md"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-3.5 left-4 right-4 text-white">
                <span className="font-mono text-xs uppercase tracking-wider block font-bold text-[#FDBA74] mb-0.5">
                  {selectedProject.domain}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight">
                  {selectedProject.name}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6">
              <p className="font-sans text-xs sm:text-sm text-[#475569] leading-relaxed mb-4">
                {selectedProject.summary}
              </p>

              <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
                {(projectChips[selectedProject.id] || []).map((chip) => (
                  <span
                    key={chip}
                    className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-sans text-xs font-medium"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </ChapterShell>
  );
};

export default ProjectShowcaseSection;
