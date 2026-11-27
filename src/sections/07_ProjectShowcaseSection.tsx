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
  CheckCircle2,
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

const projectMilestones: Record<string, string> = {
  'proj-1': 'Autonomous obstacle-navigating rover with real-time sonar echo avoidance',
  'proj-2': 'Live telemetry environmental station plotting air quality & temperature metrics',
  'proj-3': 'Indoor tethered flight rig with 6-DOF IMU stabilization and altitude control',
  'proj-4': 'On-device vision model classifying classroom recyclables with confidence scoring',
  'proj-5': '3-DOF precision robotic arm executing automated inverse kinematics sorting',
};

const projectDeliverables: Record<string, { archBullets: string[]; masteryBullets: string[]; stats: [string, string, string] }> = {
  'proj-1': {
    archBullets: [
      'Dual H-bridge PWM motor driver with current protection',
      'HC-SR04 ultrasonic sonar distance telemetry sensor',
      'Precision 4WD chassis with differential steering calibration',
    ],
    masteryBullets: [
      'Closed-loop reactive steering and collision thresholds',
      'Chassis balance, gear alignment & soldered wire harness',
      'Defended in student engineering lab portfolio review',
    ],
    stats: ['Level 2 Autonomous', '20ms Polling Loop', '100% Tangible Build'],
  },
  'proj-2': {
    archBullets: [
      'Multi-sensor I2C telemetry bus with low-power polling',
      'Particulate matter (PM2.5/PM10) optical air probe',
      'Calibrated ambient temperature & humidity telemetry sensor',
    ],
    masteryBullets: [
      'Real-world continuous data logging & buffer transmission',
      'Graph analysis, calibration curves & sensor verification',
      'Live environmental monitoring presented to school faculty',
    ],
    stats: ['I2C Sensor Bus', '500ms Stream Rate', 'Live Telemetry Dashboard'],
  },
  'proj-3': {
    archBullets: [
      'Ducted prop safety frame with high-thrust brushless motors',
      '6-DOF IMU gyroscopic flight controller & sensor fusion',
      'Tethered altitude hold sensor & PID stabilization loop',
    ],
    masteryBullets: [
      'PID pitch/roll/yaw balancing & throttle control logic',
      'Tethered test arena safety protocols and flight log defense',
      'Aerodynamic lift calculations documented in engineering journal',
    ],
    stats: ['6-DOF Flight Fusion', 'PID Auto-Level', 'Safety Tethered Arena'],
  },
  'proj-4': {
    archBullets: [
      'Edge neural camera pipeline running on-device inference',
      'Embedded machine learning weights for visual classification',
      'Real-time confidence scoring & automated sort trigger',
    ],
    masteryBullets: [
      'Training dataset curation, feature labeling & validation',
      'Automated sorting triggers and classification confidence',
      'Computer vision accuracy benchmark presentation',
    ],
    stats: ['On-Device Neural', '94% Lab Accuracy', 'Automated Sort Trigger'],
  },
  'proj-5': {
    archBullets: [
      '3-DOF articulated arm joints with metal-gear micro servos',
      'Inverse kinematics geometric solver & end-effector gripper',
      'Microcontroller trajectory interpolation & repeatability test',
    ],
    masteryBullets: [
      'Joint coordinate transformations & repeatable trajectory paths',
      'Mechanical gear reduction, torque limits & physical payload',
      'Tabletop robotics demonstration with automated pick-and-place',
    ],
    stats: ['3-DOF Kinematics', '±1.5mm Precision', 'Mechanical Gear Linkage'],
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
    window.dispatchEvent(new CustomEvent('go-to-slide', { detail: 8 }));
  };

  return (
    <ChapterShell
      id="showcase"
      chapterNumber="08"
      theme="light"
      fullBleed={true}
      className="relative w-full min-h-[100svh] lg:h-[100svh] overflow-y-auto lg:overflow-hidden bg-[#FAF6EE] flex flex-col lg:items-center lg:justify-center select-none"
    >
      {/* Viewport Container - Exact same outer dimensions as Section 02 */}
      <div
        ref={containerRef}
        className="relative w-full h-auto lg:h-full max-h-none lg:max-h-full min-h-0 flex-1 flex flex-col justify-between items-center pt-[calc(var(--header-h,64px)+10px)] pb-8 lg:pb-3 px-3 sm:px-5 lg:px-6 xl:px-8 box-border select-none z-10 max-w-[1440px] mx-auto overflow-visible lg:overflow-hidden"
      >
        {/* Main Inset Grand White Card Container - Matches Section 02 Executive Size & Border */}
        <div className="relative w-full h-auto lg:h-full max-h-none lg:max-h-[820px] xl:lg:max-h-[860px] min-h-0 flex-1 lg:my-auto bg-white rounded-2xl sm:rounded-3xl shadow-[0_16px_50px_rgba(0,0,0,0.04)] border border-slate-200/80 p-3 sm:p-4 lg:p-5 flex flex-col justify-between box-border gap-2 sm:gap-2.5 overflow-visible lg:overflow-hidden">

          {/* Top Header: Eyebrow with gold accent & Headline */}
          <div className="flex-none text-center">
            <div className="flex items-center justify-center gap-2 mb-0.5">
              <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-r from-transparent to-[#b45309]" />
              <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-[#b45309]">
                {siteConfig.showcase.eyebrow}
              </span>
              <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-l from-transparent to-[#b45309]" />
            </div>

            <h2 className="font-serif text-lg sm:text-2xl lg:text-[26px] xl:text-[28px] font-bold leading-tight tracking-tight text-[#0F172A] text-center mb-0.5">
              {siteConfig.showcase.headline}
            </h2>

            <p className="font-sans text-[11.5px] sm:text-[12.5px] text-slate-600 leading-snug max-w-2xl mx-auto text-center font-normal mb-1 sm:mb-1.5">
              Tangible student capstones engineered across robotics, autonomous flight, computer vision, and physical AI.
            </p>

            {/* ─── Sleek Project Switcher Tabs (All 5 Projects, Single Row on Desktop) ─── */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap py-1 w-full max-w-5xl xl:max-w-6xl mx-auto">
              {projects.map((proj, idx) => {
                const isActive = activeProjectIndex === idx;
                const meta = PROJECT_META[proj.id] || PROJECT_META['proj-1'];

                return (
                  <button
                    key={proj.id}
                    onClick={() => setActiveProjectIndex(idx)}
                    className={`group relative px-3 sm:px-3.5 py-1.5 rounded-xl border text-[11px] sm:text-[11.5px] font-semibold tracking-tight transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                      isActive
                        ? 'bg-[#0F172A] text-white shadow-xs border-[#0F172A] font-bold'
                        : 'bg-slate-50/90 border-slate-200/90 text-slate-600 hover:text-[#0F172A] hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <span
                      style={{ color: isActive ? meta.pillBorder : meta.color }}
                      className="shrink-0 transition-transform group-hover:scale-110"
                    >
                      {meta.icon}
                    </span>
                    <span className="whitespace-nowrap">{proj.name}</span>
                    {isActive && (
                      <span
                        style={{ backgroundColor: meta.color }}
                        className="absolute -bottom-[1px] left-3 right-3 h-[2px] rounded-full shadow-xs"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ─── Active Project Presentation Box (Expanded 12-Column Grid, Perfect Vertical Fill) ─── */}
          <div
            style={{
              borderColor: currentMeta.borderLight,
              background: `linear-gradient(135deg, #FFFFFF 0%, ${currentMeta.bgLight} 100%)`,
            }}
            className="relative flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-5 items-stretch border-2 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 lg:p-5 shadow-xs transition-all duration-500 overflow-visible lg:overflow-hidden"
          >
            {/* Ambient Background Corner Glow */}
            <div
              style={{ backgroundColor: currentMeta.color }}
              className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-10 pointer-events-none"
            />

            {/* Left Column (Span 7 of 12 on Desktop): Rich Narrative & Specification Cards */}
            <div className="lg:col-span-7 xl:col-span-8 z-10 flex flex-col justify-between h-full min-h-0 gap-2 sm:gap-2.5">
              {/* Top Details */}
              <div className="flex-none">
                {/* 1. Header Badges: Domain Pill + Grade + Student Defense Tag */}
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span
                    style={{
                      backgroundColor: currentMeta.bgLight,
                      borderColor: currentMeta.borderLight,
                      color: currentMeta.textColor,
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] sm:text-[10.5px] font-mono font-bold uppercase tracking-wider shadow-2xs"
                  >
                    {currentMeta.icon}
                    <span>{currentProject.domain}</span>
                  </span>

                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono text-[9.5px] sm:text-[10px] font-bold border border-slate-200/80">
                    {currentProject.grade} Capstone
                  </span>

                  <span className="hidden sm:inline font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold ml-auto">
                    100% Student-Engineered Artifact
                  </span>
                </div>

                {/* 2. Project Title & Orange Accent Bar */}
                <h3 className="font-serif text-xl sm:text-2xl lg:text-[26px] font-bold text-[#0F172A] leading-tight mb-1">
                  {currentProject.name}
                </h3>
                <div className="w-12 h-1 bg-[#EA580C] rounded-full mb-1.5" />

                {/* 3. Summary Description */}
                <p className="font-sans text-[12px] sm:text-[12.5px] text-slate-600 leading-snug font-normal max-w-2xl">
                  {currentProject.summary}
                </p>

                {/* 4. Hardware / Spec Chips */}
                <div className="flex flex-wrap gap-1.5 mt-1.5 pt-1.5 border-t border-black/6">
                  {activeChips.map((chip, chipIdx) => (
                    <span
                      key={chip}
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white border border-slate-200/90 font-sans text-[10px] sm:text-[10.5px] font-semibold text-[#0F172A] shadow-2xs hover:border-slate-300 transition-colors"
                    >
                      <span
                        style={{ backgroundColor: chipIdx === 0 ? currentMeta.color : '#EA580C' }}
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                      />
                      <span>{chip}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* 5. Dual Architecture & Student Mastery Specification Cards */}
              {(() => {
                const spec = projectSpecs[currentProject.id];
                const deliv = projectDeliverables[currentProject.id];
                if (!spec) return null;
                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1 min-h-0 items-stretch">
                    {/* Architecture Card */}
                    <div className="p-3 rounded-xl bg-white/95 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1 text-[#0284C7]">
                          <Cpu className="w-3.5 h-3.5 shrink-0" />
                          <span className="font-mono text-[9px] sm:text-[9.5px] uppercase tracking-wider font-bold">
                            System Architecture &amp; Hardware
                          </span>
                        </div>
                        <p className="font-sans text-[11px] sm:text-[11.5px] text-slate-700 leading-snug font-normal mb-1.5">
                          {spec.arch}
                        </p>
                      </div>

                      {deliv && deliv.archBullets && (
                        <div className="pt-1.5 border-t border-black/5">
                          <span className="font-mono text-[8.5px] sm:text-[9px] uppercase tracking-wider text-[#64748B] font-bold block mb-1">
                            Key Hardware Modules
                          </span>
                          <ul className="space-y-1">
                            {deliv.archBullets.map((b, i) => (
                              <li key={i} className="flex items-start gap-1.5 text-[10px] sm:text-[10.5px] text-[#334155] leading-tight font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] shrink-0 mt-1 shadow-2xs" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Student Mastery Card */}
                    <div className="p-3 rounded-xl bg-white/95 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1 text-[#EA580C]">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span className="font-mono text-[9px] sm:text-[9.5px] uppercase tracking-wider font-bold">
                            Student Mastery &amp; Defense
                          </span>
                        </div>
                        <p className="font-sans text-[11px] sm:text-[11.5px] text-[#0F172A] leading-snug font-medium mb-1.5">
                          {spec.takeaway}
                        </p>
                      </div>

                      {deliv && deliv.masteryBullets && (
                        <div className="pt-1.5 border-t border-black/5">
                          <span className="font-mono text-[8.5px] sm:text-[9px] uppercase tracking-wider text-[#64748B] font-bold block mb-1">
                            Practical Verification
                          </span>
                          <ul className="space-y-1">
                            {deliv.masteryBullets.map((b, i) => (
                              <li key={i} className="flex items-start gap-1.5 text-[10px] sm:text-[10.5px] text-[#334155] leading-tight font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] shrink-0 mt-1 shadow-2xs" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* 5b. 3-Stat Technical Specifications Row */}
              {(() => {
                const deliv = projectDeliverables[currentProject.id];
                if (!deliv || !deliv.stats) return null;
                return (
                  <div className="grid grid-cols-3 gap-2 flex-none">
                    <div className="px-2.5 py-1.5 rounded-lg bg-white/90 border border-slate-200/80 text-center shadow-2xs">
                      <span className="font-mono text-[8px] sm:text-[8.5px] uppercase tracking-wider text-slate-500 font-bold block">System Class</span>
                      <span className="font-serif text-[11.5px] sm:text-[12px] font-bold text-[#0F172A] block mt-0.5 truncate">{deliv.stats[0]}</span>
                    </div>
                    <div className="px-2.5 py-1.5 rounded-lg bg-white/90 border border-slate-200/80 text-center shadow-2xs">
                      <span className="font-mono text-[8px] sm:text-[8.5px] uppercase tracking-wider text-slate-500 font-bold block">Telemetry / Loop</span>
                      <span className="font-serif text-[11.5px] sm:text-[12px] font-bold text-[#0284C7] block mt-0.5 truncate">{deliv.stats[1]}</span>
                    </div>
                    <div className="px-2.5 py-1.5 rounded-lg bg-white/90 border border-slate-200/80 text-center shadow-2xs">
                      <span className="font-mono text-[8px] sm:text-[8.5px] uppercase tracking-wider text-slate-500 font-bold block">Portfolio Defense</span>
                      <span className="font-serif text-[11.5px] sm:text-[12px] font-bold text-[#16A34A] block mt-0.5 truncate">{deliv.stats[2]}</span>
                    </div>
                  </div>
                );
              })()}

              {/* 5c. Milestone Badge */}
              <div className="px-3 py-1.5 rounded-lg bg-[#FFF7ED] border border-[#FED7AA] flex items-center gap-2 flex-none">
                <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0" />
                <span className="font-mono text-[9px] sm:text-[9.5px] uppercase font-bold text-[#C2410C] shrink-0">
                  Capstone Milestone:
                </span>
                <span className="font-sans text-[11px] sm:text-[11.5px] font-bold text-[#9A3412] truncate">
                  {projectMilestones[currentProject.id] || 'Verified Working Hardware Prototype'}
                </span>
              </div>

              {/* 6. Action Button & Telemetry Indicator */}
              <div className="pt-1.5 border-t border-black/6 flex items-center justify-between gap-2 flex-wrap flex-none">
                <button
                  type="button"
                  onClick={() => setSelectedProject(currentProject)}
                  className="group inline-flex items-center gap-2 px-4 py-1.5 sm:py-2 rounded-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-mono text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider transition-all shadow-xs hover:shadow-md cursor-pointer active:scale-95"
                >
                  <span>Inspect Full Project Build</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#38BDF8]" />
                </button>

                <div className="flex items-center gap-1.5 text-slate-500 font-sans text-[10.5px] sm:text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span className="font-medium text-slate-600">Working prototype ready for annual STEM showcase</span>
                </div>
              </div>
            </div>

            {/* Right Column (Span 5 of 12 on Desktop): Full-Height Interactive Photo Frame */}
            <div
              onClick={() => setSelectedProject(currentProject)}
              style={{ borderColor: currentMeta.borderLight }}
              className="lg:col-span-5 xl:col-span-4 h-56 sm:h-64 lg:h-full min-h-[220px] lg:min-h-0 relative rounded-xl sm:rounded-2xl overflow-hidden border-2 bg-slate-900 shadow-sm group cursor-pointer transition-all hover:shadow-xl flex flex-col justify-between"
            >
              <img
                src={currentProject.image}
                alt={currentProject.name}
                className="absolute inset-0 w-full h-full object-cover object-center filter saturate-[0.92] contrast-[1.04] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

              {/* Maximize Icon Pill */}
              <div className="relative z-10 self-end m-3 p-1.5 bg-black/60 hover:bg-black/80 backdrop-blur-xs rounded-full text-white/90 group-hover:text-white group-hover:scale-110 transition-all border border-white/20 shadow-xs">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              {/* Bottom Label Overlay */}
              <div className="relative z-10 p-3.5 sm:p-4 text-white">
                <span
                  style={{ color: currentMeta.pillBorder }}
                  className="font-mono text-[9px] uppercase tracking-wider block font-bold leading-tight mb-0.5"
                >
                  Student Portfolio Showcase
                </span>
                <span className="font-serif text-[16px] sm:text-[17px] font-bold leading-tight text-white block">
                  {currentProject.name}
                </span>
              </div>
            </div>
          </div>

          {/* ─── Bottom Trailing Navigation Bar (Matching Section 02 & Section 06) ─── */}
          <div className="editorial-reveal flex-none pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2.5">
            {/* 3 Structured Metric Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-[10.5px] sm:text-[11px] font-sans font-medium text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
                <span className="font-bold text-[#0F172A]">Physical AI &amp; Robotics</span> Hardware Ready
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-[10.5px] sm:text-[11px] font-sans font-medium text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                <span className="font-bold text-[#0F172A]">100% Real Code</span> &amp; Circuit Telemetry
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-[10.5px] sm:text-[11px] font-sans font-medium text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                <span className="font-bold text-[#0F172A]">Annual Exhibition</span> Capstone Defense
              </div>
            </div>

            {/* Next Action Button */}
            <button
              type="button"
              onClick={handleScrollToNext}
              className="group inline-flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-[#0F172A] hover:text-[#EA580C] transition-colors ml-auto shrink-0 cursor-pointer pt-1 sm:pt-0"
            >
              <span>Next: 08 STEM Lab Infrastructure</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#EA580C]" />
            </button>
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
