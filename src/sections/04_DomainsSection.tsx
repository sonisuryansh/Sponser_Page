import React, { useState, useEffect } from 'react';
import {
  Bot,
  Cpu,
  BarChart3,
  Plane,
  ShieldCheck,
  X,
  Puzzle,
  Ruler,
  Triangle,
  BarChart2,
  Code2,
} from 'lucide-react';
import { ChapterShell } from '../components/ChapterShell';
import { LineReveal } from '../components/motion/LineReveal';

interface DomainData {
  id: string;
  slideId: string;
  chapter: string;
  domainNumber: string;
  name: string;
  fullName: string;
  italicWord: string;
  tag: string;
  tagline: string;
  description: string;
  cardBg: string;
  borderColor: string;
  glowColor: string;
  accentColor: string;
  barColor: string;
  badgeText: string;
  badgeBg: string;
  badgeTextColor: string;
  badgeIcon: React.ReactNode;
  icon: React.ReactNode;
  specialCallout?: {
    icon: React.ReactNode;
    text: string;
    bg: string;
    border: string;
    color: string;
  };
  slideNumber: string;
  items: string[];
  metrics: { value: string; label: string }[];
  tags: string[];
  pillars: { num: string; title: string; desc: string }[];
  badgeNote?: string;
  image: string;
  imageCaption: string;
  imageSubcaption: string;
  imageTag: string;
}

const DOMAINS: DomainData[] = [
  {
    id: 'robotics',
    slideId: 'slide-4',
    chapter: '04',
    domainNumber: 'Engineering Domain 01',
    name: 'Robotics & Automation',
    fullName: 'Robotics &',
    italicWord: 'Automation',
    tag: 'Physical Computing',
    tagline: 'Physical Computing & Embedded Mechanics',
    description: 'Electronics, sensors, control, coding, and mechanical systems.',
    cardBg: 'linear-gradient(180deg, rgba(9, 27, 44, 0.95) 0%, rgba(6, 17, 28, 0.98) 100%)',
    borderColor: 'rgba(0, 194, 255, 0.55)',
    glowColor: 'rgba(0, 194, 255, 0.25)',
    accentColor: '#00C2FF',
    barColor: '#FF8A00',
    badgeText: 'EMBEDDED BENCH',
    badgeBg: '#00C2FF',
    badgeTextColor: '#061726',
    badgeIcon: <Bot className="w-3.5 h-3.5" />,
    icon: <Bot className="w-5 h-5 text-[#00C2FF]" />,
    slideNumber: '01',
    items: [
      'Microcontrollers & Embedded C',
      'Sensors & Sensory Feedback',
      'Motor Drivers & PWM Actuators',
      'Mechanical Prototyping & CAD',
    ],
    metrics: [
      { value: 'DESIGN', label: 'Circuits & CAD' },
      { value: 'BUILD', label: 'Sensors & Motors' },
      { value: 'CODE', label: 'Embedded Logic' },
    ],
    tags: ['Sensors', 'Actuators', 'Embedded C', '3D Design'],
    pillars: [
      { num: '01', title: 'Electronics & Circuits', desc: 'Voltage regulation & breadboard circuits' },
      { num: '02', title: 'Sensors & Motors', desc: 'Servo control & PWM calibration' },
      { num: '03', title: 'Embedded Code', desc: 'MicroPython & hardware interrupts' },
      { num: '04', title: '3D Mechanics', desc: 'CAD spatial modeling & kinematics' },
    ],
    badgeNote: 'DESIGN → BUILD → CODE → TEST → ITERATE',
    image: '/assets/students_robotics_assembly.webp',
    imageCaption: 'Robotics & Assembly',
    imageSubcaption: 'Students assembling wheeled chassis & circuits',
    imageTag: 'School Lab Platform',
  },
  {
    id: 'ai-ml',
    slideId: 'slide-5',
    chapter: '05',
    domainNumber: 'Engineering Domain 02',
    name: 'AI & Machine Learning',
    fullName: 'AI & Machine',
    italicWord: 'Learning',
    tag: 'Cognitive Models',
    tagline: 'Intelligent Systems & Machine Reasoning',
    description: 'Intelligent systems, model concepts, and responsible AI use.',
    cardBg: 'linear-gradient(180deg, rgba(23, 14, 42, 0.95) 0%, rgba(13, 8, 26, 0.98) 100%)',
    borderColor: 'rgba(168, 85, 247, 0.55)',
    glowColor: 'rgba(168, 85, 247, 0.25)',
    accentColor: '#A855F7',
    barColor: '#A855F7',
    badgeText: 'NEURAL MODELS',
    badgeBg: '#A855F7',
    badgeTextColor: '#1b0933',
    badgeIcon: <Cpu className="w-3.5 h-3.5" />,
    icon: <Cpu className="w-5 h-5 text-[#A855F7]" />,
    specialCallout: {
      icon: <ShieldCheck className="w-3.5 h-3.5 text-[#c084fc] shrink-0" />,
      text: 'Using AI safely, fairly and responsibly.',
      bg: 'rgba(168, 85, 247, 0.12)',
      border: 'rgba(168, 85, 247, 0.35)',
      color: '#e9d5ff',
    },
    slideNumber: '02',
    items: [
      'Machine Learning Principles',
      'Supervised Training & Weights',
      'Computer Vision & Audio ML',
      'Ethical Safety Guardrails',
    ],
    metrics: [
      { value: 'PERCEIVE', label: 'Data & Patterns' },
      { value: 'TRAIN', label: 'Supervised Models' },
      { value: 'ETHICS', label: 'Safety Guardrails' },
    ],
    tags: ['Neural Networks', 'Computer Vision', 'Ethical AI', 'Edge Inference'],
    pillars: [
      { num: '01', title: 'Data & Patterns', desc: 'Feature engineering & classifiers' },
      { num: '02', title: 'Computer Vision', desc: 'Edge convolution & gesture tracking' },
      { num: '03', title: 'Neural Models', desc: 'Tokenization & prompt logic' },
      { num: '04', title: 'Ethics & Safety', desc: 'Bias detection & privacy boundaries' },
    ],
    badgeNote: 'Responsible AI citizenship, privacy safeguards, and ethics curriculum built-in.',
    image: '/assets/computer_vision_object_recognition.webp',
    imageCaption: 'Computer Vision & AI',
    imageSubcaption: 'Camera-based object recognition & classification',
    imageTag: 'Neural Inference',
  },
  {
    id: 'data-analytics',
    slideId: 'slide-6',
    chapter: '06',
    domainNumber: 'Engineering Domain 03',
    name: 'Data Analytics',
    fullName: 'Data',
    italicWord: 'Analytics',
    tag: 'Evidence & Insights',
    tagline: 'Evidence, Statistics & Live Telemetry',
    description: 'Working with data, finding patterns, and sharing insights.',
    cardBg: 'linear-gradient(180deg, rgba(38, 20, 10, 0.95) 0%, rgba(20, 10, 5, 0.98) 100%)',
    borderColor: 'rgba(255, 138, 0, 0.55)',
    glowColor: 'rgba(255, 138, 0, 0.25)',
    accentColor: '#FF8A00',
    barColor: '#FF8A00',
    badgeText: 'TELEMETRY LAB',
    badgeBg: '#FF8A00',
    badgeTextColor: '#331600',
    badgeIcon: <BarChart3 className="w-3.5 h-3.5" />,
    icon: <BarChart3 className="w-5 h-5 text-[#FF8A00]" />,
    slideNumber: '03',
    items: [
      'Data Wrangling & Cleaning',
      'Trend & Outlier Detection',
      'Hypothesis Formulation',
      'Visual Storytelling & Charts',
    ],
    metrics: [
      { value: 'COLLECT', label: 'Raw Observations' },
      { value: 'ANALYSE', label: 'Trends & Variance' },
      { value: 'INSIGHT', label: 'Visual Findings' },
    ],
    tags: ['Data Structuring', 'Statistical Interpretation', 'Data Visualization', 'Hypothesis'],
    pillars: [
      { num: '01', title: 'Collection', desc: 'Sensor telemetry & IMU harvest' },
      { num: '02', title: 'Analysis', desc: 'Variance & anomaly filtering' },
      { num: '03', title: 'Visualisation', desc: 'Real-time telemetry charts' },
      { num: '04', title: 'Insights', desc: 'Optimization & parameter tuning' },
    ],
    badgeNote: 'Hypothesis → Experimentation → Telemetry → Empirical Conclusion',
    image: '/assets/laptop_analytics.webp',
    imageCaption: 'Telemetry Lab',
    imageSubcaption: 'Multi-variate telemetry & synthesis',
    imageTag: 'Live Telemetry',
  },
  {
    id: 'aerial-systems',
    slideId: 'slide-7',
    chapter: '07',
    domainNumber: 'Engineering Domain 04',
    name: 'Aerial Systems',
    fullName: 'Aerial',
    italicWord: 'Systems',
    tag: 'Flight Aerodynamics',
    tagline: 'Aerodynamics, Flight Mechanics & Spatial Robotics',
    description: 'Aerial platforms, flight basics, sensing, and applications.',
    cardBg: 'linear-gradient(180deg, rgba(9, 27, 44, 0.95) 0%, rgba(6, 17, 28, 0.98) 100%)',
    borderColor: 'rgba(0, 194, 255, 0.55)',
    glowColor: 'rgba(0, 194, 255, 0.25)',
    accentColor: '#00C2FF',
    barColor: '#00C2FF',
    badgeText: 'AUTONOMOUS FLIGHT',
    badgeBg: '#00C2FF',
    badgeTextColor: '#061726',
    badgeIcon: <Plane className="w-3.5 h-3.5" />,
    icon: <Plane className="w-5 h-5 text-[#00C2FF]" />,
    specialCallout: {
      icon: <Plane className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />,
      text: 'Indoor control training: flying through hoops and around low & high obstacles, safety first.',
      bg: 'rgba(0, 194, 255, 0.12)',
      border: 'rgba(0, 194, 255, 0.35)',
      color: '#bae6fd',
    },
    slideNumber: '04',
    items: [
      'Multi-Rotor Aerodynamics',
      '3D Spatial Telemetry & IMUs',
      'Autonomous Waypoints',
      'Laboratory Tethered Protocols',
    ],
    metrics: [
      { value: 'FLIGHT', label: 'Lift & Stability' },
      { value: 'SENSORS', label: 'Telemetry Guidance' },
      { value: 'SAFETY', label: 'Controlled Arena' },
    ],
    tags: ['Aerodynamics', 'Gyro & IMU', 'Navigation', 'Lab Safety'],
    pillars: [
      { num: '01', title: 'Aerodynamics & Lift', desc: 'Airfoils & quad-rotor thrust dynamics' },
      { num: '02', title: 'Stabilization', desc: 'PID balance & IMU calibration' },
      { num: '03', title: 'Waypoints', desc: '3D coordinates & autonomous paths' },
      { num: '04', title: 'Sensory Mapping', desc: 'Altitude sensing & collision avoidance' },
    ],
    badgeNote: 'STRICT LAB PROTOCOL: Safe tethered flight cages and controlled indoor arenas.',
    image: '/assets/indoor_drone_flight_hoops.webp',
    imageCaption: 'Indoor Drone Arena',
    imageSubcaption: 'Tethered hoop navigation & obstacle training',
    imageTag: 'Safe Lab Protocol',
  },
];

export interface DomainsSectionProps {
  onSlideChange?: (index: number) => void;
}

export const DomainsSection: React.FC<DomainsSectionProps> = ({ onSlideChange }) => {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(-1);
  const [activeDataStage, setActiveDataStage] = useState<number>(0);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeCardIndex !== -1) {
        setActiveCardIndex(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCardIndex]);

  const activeCard = activeCardIndex >= 0 ? DOMAINS[activeCardIndex] : null;

  return (
    <ChapterShell
      id="domains"
      chapterNumber="04"
      theme="dark"
      fullBleed={true}
      className="relative flex flex-col justify-between overflow-hidden bg-[#070C12]"
    >
      <div
        id="technology-suite"
        className="relative w-full min-h-[100svh] sm:h-[100svh] sm:max-h-[100svh] flex flex-col justify-between select-none pt-[calc(var(--header-h,64px)+8px)] pb-3 px-3 sm:px-6 lg:px-8 box-border overflow-y-auto sm:overflow-hidden"
      >
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#00C2FF]/10 via-[#A855F7]/10 to-transparent blur-[120px] pointer-events-none" />

        {/* ─── Top Header: Matching Image 1 "Our Core Technology Ecosystem" ─── */}
        <div className="w-full text-center shrink-0 pt-1 sm:pt-2 pb-1 relative z-10">
          <h2 className="font-serif-editorial text-2xl sm:text-3xl lg:text-[34px] xl:text-[36px] font-bold text-white tracking-tight leading-tight">
            Our Core Technology{' '}
            <span className="italic font-semibold bg-gradient-to-r from-[#FF8A00] via-[#FFA800] to-[#FF8A00] bg-clip-text text-transparent">
              Ecosystem
            </span>
          </h2>

          {/* Glowing Dual-Tone Divider Curve */}
          <div className="w-36 sm:w-52 mx-auto mt-0.5 sm:mt-1 mb-1">
            <div className="h-[2.5px] w-full rounded-full bg-gradient-to-r from-transparent via-[#FF8A00] to-transparent shadow-[0_0_12px_rgba(255,138,0,0.7)]" />
          </div>
        </div>

        {/* ─── The 4 Straight Cards Grid: Exactly Like Image 1 (NO Curving) ─── */}
        <div className="w-full max-w-6xl xl:max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 xl:gap-4 flex-1 min-h-0 items-stretch my-auto relative z-10 py-1">
          {DOMAINS.map((domain, idx) => {
            return (
              <div
                key={domain.id}
                onClick={() => {
                  setActiveCardIndex(idx);
                  onSlideChange?.(idx + 3);
                }}
                style={{
                  background: domain.cardBg,
                  borderColor: domain.borderColor,
                  boxShadow: `0 8px 32px -8px ${domain.glowColor}, 0 0 0 1px ${domain.borderColor}`,
                }}
                className="group relative flex flex-col justify-between p-3.5 sm:p-4 xl:p-4.5 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_-6px_rgba(0,194,255,0.35)] cursor-pointer overflow-hidden"
              >
                {/* Top Subtle Domain Glow Accent in Corner */}
                <div
                  className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none"
                  style={{ backgroundColor: domain.accentColor }}
                />

                {/* Top Content Area */}
                <div>
                  {/* Floating Badge / Chapter Tag */}
                  <div className="flex items-center justify-between gap-1.5 mb-2 font-mono-tech text-[10px] tracking-wider uppercase">
                    <span className="font-bold text-white/90 bg-white/10 px-2 py-0.5 rounded border border-white/15">
                      CH {domain.slideNumber}
                    </span>
                    <span
                      style={{ color: domain.accentColor }}
                      className="font-semibold text-[9.5px] tracking-wide truncate"
                    >
                      {domain.tag}
                    </span>
                  </div>

                  {/* Domain Title */}
                  <h3 className="font-serif-editorial text-lg sm:text-xl xl:text-[22px] font-bold text-white leading-tight tracking-tight mt-1 mb-1.5">
                    {domain.name}
                  </h3>

                  {/* Horizontal accent line under title matching Image 1 */}
                  <div
                    className="w-10 h-1 rounded-full mb-2.5"
                    style={{ backgroundColor: domain.barColor }}
                  />

                  {/* Verified Domain Description */}
                  <p className="font-sans-modern text-[11.5px] xl:text-[12px] text-white/80 leading-relaxed font-normal mb-2.5">
                    {domain.description}
                  </p>

                  {/* Special Callout Box if present (AI Ethics or Drone Safety, exactly as shown in Image 1) */}
                  {domain.specialCallout && (
                    <div
                      style={{
                        backgroundColor: domain.specialCallout.bg,
                        borderColor: domain.specialCallout.border,
                        color: domain.specialCallout.color,
                      }}
                      className="flex items-center gap-2 p-2 rounded-xl border text-[10.5px] font-sans-modern font-medium leading-tight mb-2.5 shadow-inner"
                    >
                      {domain.specialCallout.icon}
                      <span>{domain.specialCallout.text}</span>
                    </div>
                  )}

                  {/* Bullet list with distinctive domain accent dots */}
                  <ul className="space-y-1 font-sans-modern text-[11px] xl:text-[11.5px] text-white/85 mb-2.5">
                    {domain.items.slice(0, 3).map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2 leading-tight">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-1 shrink-0"
                          style={{ backgroundColor: domain.accentColor }}
                        />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Visual & Action Footer Area */}
                <div className="mt-auto pt-2">
                  {/* Hardware Visual Preview Thumbnail (Matching Image 1 visual representation at bottom of card) */}
                  <div className="relative w-full h-24 sm:h-28 rounded-xl overflow-hidden border border-white/10 group-hover:border-white/25 transition-all shadow-md mb-2">
                    <img
                      src={domain.image}
                      alt={domain.imageCaption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[9.5px] font-mono-tech text-white/90">
                      <span className="font-bold uppercase tracking-wider" style={{ color: domain.accentColor }}>
                        {domain.imageCaption}
                      </span>
                      <span className="bg-white/20 backdrop-blur-xs px-1.5 py-0.5 rounded text-[8.5px] font-medium border border-white/20">
                        {domain.imageTag}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[10.5px] font-mono-tech">
                    <span className="text-white/50 group-hover:text-white/80 transition-colors">Click to inspect</span>
                    <span
                      style={{ color: domain.accentColor }}
                      className="font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      Explore →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── Bottom Full-Width Container: "Computational Foundation" (Matching Image 1) ─── */}
        <div className="w-full max-w-6xl xl:max-w-7xl mx-auto shrink-0 mt-1 sm:mt-2 relative z-10">
          <div className="relative overflow-hidden rounded-2xl border border-[#00C2FF]/40 bg-[#091522]/95 backdrop-blur-md px-3.5 sm:px-5 py-2.5 sm:py-3 shadow-[0_0_30px_rgba(0,194,255,0.15)] flex flex-col lg:flex-row items-center justify-between gap-2.5 sm:gap-3.5">
            {/* Ambient Cyan/Blue Reflection Glow */}
            <div className="absolute -left-10 -bottom-10 w-44 h-24 bg-[#00C2FF]/20 blur-3xl pointer-events-none" />

            {/* Left: Math/Science Engineering Pedestal & Symbols */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0 w-full lg:w-auto justify-between lg:justify-start">
              <div className="flex items-center gap-2.5 sm:gap-3 text-[#00C2FF] shrink-0">
                {/* 1. Sigma Symbol Σ */}
                <span className="font-serif text-2xl sm:text-[26px] font-bold tracking-wider drop-shadow-[0_0_10px_rgba(0,194,255,0.7)] leading-none select-none">
                  Σ
                </span>

                {/* 2. Protractor SVG */}
                <svg
                  viewBox="0 0 28 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-5 sm:w-7 sm:h-5 drop-shadow-[0_0_10px_rgba(0,194,255,0.7)]"
                >
                  <path d="M2 18h24" />
                  <path d="M2 18 A12 12 0 0 1 26 18" />
                  <path d="M8 18 A6 6 0 0 1 20 18" />
                  <line x1="14" y1="6" x2="14" y2="8" />
                  <line x1="8" y1="8" x2="9.5" y2="9.5" />
                  <line x1="20" y1="8" x2="18.5" y2="9.5" />
                </svg>

                {/* 3. Drafting Compass SVG */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-[0_0_10px_rgba(0,194,255,0.7)]"
                >
                  <circle cx="12" cy="4" r="2" fill="currentColor" fillOpacity="0.3" />
                  <line x1="12" y1="2" x2="12" y2="4" />
                  <line x1="11" y1="6" x2="4" y2="22" />
                  <line x1="13" y1="6" x2="20" y2="22" />
                  <line x1="7.5" y1="15" x2="16.5" y2="15" />
                  <circle cx="12" cy="15" r="1.5" fill="currentColor" />
                </svg>
              </div>

              <div className="hidden sm:block w-px h-8 bg-white/20 shrink-0" />

              {/* Title & Core Description */}
              <div className="text-left flex-1 min-w-0">
                <h4 className="font-serif-editorial text-sm sm:text-base font-bold text-white tracking-tight leading-tight">
                  Computational Foundation
                </h4>
                <p className="font-sans-modern text-[10.5px] sm:text-[11.5px] text-white/75 leading-tight truncate sm:whitespace-normal">
                  Logic, measurement, geometry, data reasoning, algorithms, and problem-solving that support all four.
                </p>
              </div>
            </div>

            {/* Right: 5 Interactive Glowing Badges from Image 1 */}
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-1.5 sm:gap-2 shrink-0">
              {/* Badge 1: Logic */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#00C2FF]/60 bg-[#00C2FF]/10 text-[#38bdf8] text-[10px] sm:text-[10.5px] font-mono-tech font-bold shadow-[0_0_10px_rgba(0,194,255,0.2)]">
                <Puzzle className="w-3 h-3 text-[#00C2FF]" />
                <span>Logic</span>
              </div>

              {/* Badge 2: Measurement */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#FF8A00]/60 bg-[#FF8A00]/10 text-[#fb923c] text-[10px] sm:text-[10.5px] font-mono-tech font-bold shadow-[0_0_10px_rgba(255,138,0,0.2)]">
                <Ruler className="w-3 h-3 text-[#FF8A00]" />
                <span>Measurement</span>
              </div>

              {/* Badge 3: Geometry */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#A855F7]/60 bg-[#A855F7]/10 text-[#c084fc] text-[10px] sm:text-[10.5px] font-mono-tech font-bold shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                <Triangle className="w-3 h-3 text-[#A855F7]" />
                <span>Geometry</span>
              </div>

              {/* Badge 4: Data Reasoning */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#06B6D4]/60 bg-[#06B6D4]/10 text-[#22d3ee] text-[10px] sm:text-[10.5px] font-mono-tech font-bold shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                <BarChart2 className="w-3 h-3 text-[#06B6D4]" />
                <span>Data Reasoning</span>
              </div>

              {/* Badge 5: Algorithms */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#10B981]/60 bg-[#10B981]/10 text-[#34d399] text-[10px] sm:text-[10.5px] font-mono-tech font-bold shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                <Code2 className="w-3 h-3 text-[#10B981]" />
                <span>Algorithms</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Deep-Dive Modal View (Opens cleanly when a card is clicked) ─── */}
        {activeCard && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
            onClick={() => setActiveCardIndex(-1)}
          >
            <div
              className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/20 p-5 sm:p-7 text-white shadow-2xl"
              style={{
                background: activeCard.cardBg,
                boxShadow: `0 28px 80px -15px ${activeCard.glowColor}, 0 0 0 1px ${activeCard.borderColor}`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/15">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/20 shadow-inner"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                  >
                    {activeCard.icon}
                  </div>
                  <div>
                    <span
                      className="font-mono-tech text-xs tracking-wider uppercase font-bold"
                      style={{ color: activeCard.accentColor }}
                    >
                      {activeCard.domainNumber}
                    </span>
                    <h3 className="font-serif-editorial text-xl sm:text-2xl font-bold text-white leading-tight">
                      {activeCard.fullName}{' '}
                      <span className="italic font-normal" style={{ color: activeCard.accentColor }}>
                        {activeCard.italicWord}
                      </span>
                    </h3>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setActiveCardIndex(-1)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white font-mono-tech text-xs transition-all cursor-pointer shadow-md active:scale-95"
                >
                  <X className="w-4 h-4" />
                  <span>Close</span>
                </button>
              </div>

              <LineReveal color={activeCard.accentColor} height={1.5} className="mb-4" />

              {/* Modal Body */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                {/* Left Column: Description, Metrics & Pillars */}
                <div className="lg:col-span-7 space-y-3">
                  <p className="font-sans-modern text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                    {activeCard.description}
                  </p>

                  {/* Metrics Strip */}
                  <div className="grid grid-cols-3 gap-2 py-2 px-3 border border-white/10 bg-white/5 rounded-xl">
                    {activeCard.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="text-left">
                        <div
                          className="font-mono-tech text-xs sm:text-sm font-bold tracking-wider"
                          style={{ color: mIdx === 0 ? activeCard.accentColor : '#ffffff' }}
                        >
                          {m.value}
                        </div>
                        <div className="font-mono-tech text-[9.5px] text-white/60 uppercase leading-tight truncate">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 2 Core Pillars */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {activeCard.pillars.slice(0, 2).map((item, pIdx) => {
                      const isStageSelected = activeDataStage === pIdx;
                      return (
                        <div
                          key={item.num}
                          onClick={() => {
                            if (activeCard.id === 'data-analytics') {
                              setActiveDataStage(pIdx);
                            }
                          }}
                          className={`p-2.5 rounded-xl border text-left transition-all ${
                            activeCard.id === 'data-analytics'
                              ? isStageSelected
                                ? 'bg-white/20 border-white ring-1 ring-white/40 shadow-xs cursor-pointer'
                                : 'bg-black/25 border-white/10 hover:bg-white/10 hover:border-white/20 cursor-pointer'
                              : 'bg-black/25 border-white/10 hover:bg-white/10 hover:border-white/20 shadow-xs'
                          }`}
                        >
                          <div
                            className="font-mono-tech text-[9.5px] font-bold"
                            style={{ color: activeCard.accentColor }}
                          >
                            {activeCard.id === 'data-analytics' ? `STAGE ${item.num}` : `CORE PILLAR ${item.num}`}
                          </div>
                          <div className="font-sans-modern text-xs font-semibold text-white leading-tight mt-0.5 truncate">
                            {item.title}
                          </div>
                          <div className="font-sans-modern text-[10.5px] text-white/70 mt-0.5 leading-snug line-clamp-2">
                            {item.desc}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Badge Note */}
                  <div className="flex items-center gap-2 text-[11px] font-mono-tech text-white/70 pt-2 border-t border-white/10">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: activeCard.accentColor }} />
                    <span className="truncate">{activeCard.badgeNote}</span>
                  </div>
                </div>

                {/* Right Column: Hardware Photo */}
                <div className="lg:col-span-5 flex justify-center items-center">
                  <div className="relative overflow-hidden rounded-2xl bg-black border border-white/20 shadow-xl w-full h-[220px] sm:h-[240px] group">
                    <img
                      src={activeCard.image}
                      alt={activeCard.imageCaption}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                      <div>
                        <span
                          className="font-mono-tech text-[9.5px] tracking-wider uppercase font-bold block leading-tight mb-0.5"
                          style={{ color: activeCard.accentColor }}
                        >
                          {activeCard.imageCaption}
                        </span>
                        <p className="font-serif-editorial text-[11px] italic text-white/95 font-light leading-tight">
                          {activeCard.imageSubcaption}
                        </p>
                      </div>
                      <span className="font-mono-tech text-[9px] text-white/80 bg-white/15 px-2.5 py-0.5 rounded-full border border-white/20 font-medium whitespace-nowrap">
                        {activeCard.imageTag}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ChapterShell>
  );
};

export default DomainsSection;
