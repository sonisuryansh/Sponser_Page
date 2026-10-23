import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  Compass,
  Boxes,
  Cpu,
  Wifi,
  Eye,
  CheckCircle2,
  Layers,
  Wrench,
} from 'lucide-react';
import { Magnetic } from '../components/motion/Magnetic';
import { FloatingParticles } from '../components/motion/FloatingParticles';

interface TechDetail {
  name: string;
  category: string;
  summary: string;
  schoolExample: string;
  tools: string[];
  highlights: string[];
  accentColor: string;
  icon: React.ReactNode;
}

const EMERGING_TECH_DATA: TechDetail[] = [
  {
    name: 'Physical AI',
    category: 'Embodied Systems',
    summary: 'AI embedded in physical robots to perceive, decide, and act in real time.',
    schoolExample: 'Autonomous rovers making instant obstacle-avoidance and navigation judgments.',
    tools: ['ROS2 Micro', 'Depth Cameras', 'Inverse Kinematics', 'Tethered Safety'],
    highlights: [
      'Closed-Loop Control: Real-time sensor-to-actuator feedback',
      'Computer Vision: On-device obstacle & object recognition',
      'Hardware Interfacing: Motor drivers, encoders & microcontrollers',
      'Safety Protocols: Mechanical fail-safes and boundary limits',
    ],
    accentColor: '#38bdf8',
    icon: <Bot className="w-4 h-4" />,
  },
  {
    name: 'Generative AI',
    category: 'Creative Computation',
    summary: 'Models generating code, 3D parametric structures, and synthetic datasets.',
    schoolExample: 'AI-assisted CAD modeling, generative design, and interactive code debugging.',
    tools: ['Parametric CAD', 'Synthetic Datasets', 'Code Debugging', 'Deterministic Logic'],
    highlights: [
      'Prompt Logic: Algorithmic reasoning and structured prompts',
      'CAD Co-Creation: Generative design workflows for 3D printing',
      'Code Assistance: AI-guided syntax debugging and refactoring',
      'Digital Ethics: Watermarking, source attribution & safety',
    ],
    accentColor: '#a78bfa',
    icon: <Sparkles className="w-4 h-4" />,
  },
  {
    name: 'AI Agents',
    category: 'Autonomous Workflows',
    summary: 'Goal-driven autonomous systems using planning, tools, and reflection loops.',
    schoolExample: 'Automated laboratory inventory organizers and adaptive research assistants.',
    tools: ['Goal Decomposition', 'Hardware Execution', 'Task Reflection', 'Safety Interrupts'],
    highlights: [
      'Autonomous Planning: Breaking complex goals into ordered tasks',
      'Tool Integration: Activating GPIO pins, sensors & software APIs',
      'Self-Correction: Automated debugging and retry mechanisms',
      'Teacher Oversight: Controlled boundaries and policy locks',
    ],
    accentColor: '#34d399',
    icon: <Compass className="w-4 h-4" />,
  },
  {
    name: 'Digital Twins',
    category: 'Simulation & Modeling',
    summary: 'Virtual hardware replicas used to test kinematics and physics before physical builds.',
    schoolExample: 'Simulating robotic arms and stress points safely on screen before fabrication.',
    tools: ['Virtual Hardware', 'Stress Simulation', 'Pre-Build Validation', 'Zero Scrap Waste'],
    highlights: [
      'Kinematic Simulation: Testing robot range of motion on screen',
      'Telemetry Sync: Mirroring physical IMU sensors in 3D models',
      'Stress Analysis: Detecting weak points before physical machining',
      'Resource Efficiency: Zero material waste through virtual trials',
    ],
    accentColor: '#fb923c',
    icon: <Boxes className="w-4 h-4" />,
  },
  {
    name: 'Edge AI',
    category: 'Localized Computing',
    summary: 'Lightweight neural networks running directly on microcontrollers without cloud reliance.',
    schoolExample: 'Micro-cameras recognizing hand gestures and sorting objects in real time.',
    tools: ['Gesture Tracking', 'Object Detection', 'Localized Weights', 'Privacy First'],
    highlights: [
      'On-Device Inference: Running neural networks on micro-hardware',
      'Zero Cloud Lag: Instant real-time responses (< 20ms)',
      '100% Privacy: Data processed on-device without internet upload',
      'Model Optimization: Quantizing neural weights for microchips',
    ],
    accentColor: '#38bdf8',
    icon: <Cpu className="w-4 h-4" />,
  },
  {
    name: 'Smart IoT',
    category: 'Interconnected Sensing',
    summary: 'Distributed microcontroller sensor networks tracking and streaming telemetry.',
    schoolExample: 'Campus weather monitoring stations and intelligent laboratory energy tracking.',
    tools: ['ESP32 Telemetry', 'Environmental Sensors', 'Real-Time Dashboards', 'Mesh Networking'],
    highlights: [
      'Sensor Arrays: Temperature, air quality, humidity & light logging',
      'Telemetry Protocols: Lightweight MQTT and HTTP data exchange',
      'Live Dashboards: Streaming real-time telemetry to screen charts',
      'Campus Automation: Student-built environmental monitoring nodes',
    ],
    accentColor: '#f472b6',
    icon: <Wifi className="w-4 h-4" />,
  },
  {
    name: 'AR / VR Simulation',
    category: 'Spatial Interfaces',
    summary: 'Spatial visual interfaces rendering forces, magnetic fields, and mechanics in 3D.',
    schoolExample: 'Interactive 3D inspection of drone flight dynamics, thrust vectors, and circuitry.',
    tools: ['3D Vector Fields', 'Flight Kinematics', 'Circuit Inspection', 'Spatial UI'],
    highlights: [
      'Force Visualization: Rendering invisible vectors and aerodynamics',
      'Flight Overlays: Real-time telemetry superimposed on drone video',
      'Circuit Debugging: Visualizing current flows and pin states',
      'Safe Immersion: Experiencing high-speed flight mechanics in lab',
    ],
    accentColor: '#60a5fa',
    icon: <Eye className="w-4 h-4" />,
  },
];

export const EmergingTechSection: React.FC = () => {
  const [activeTechIndex, setActiveTechIndex] = useState<number>(0);
  const activeTech = EMERGING_TECH_DATA[activeTechIndex];

  return (
    <section
      id="slide-11"
      data-slide-index="10"
      className="relative w-full min-h-screen bg-[#0C131D] text-white flex flex-col justify-center py-10 sm:py-14 px-4 sm:px-8 lg:px-12 xl:px-16 border-b border-white/10 select-none overflow-hidden"
    >
      {/* Subtle Floating Ambient Particles */}
      <FloatingParticles count={14} color="rgba(56, 189, 248, 0.18)" />

      {/* Soft Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#38bdf8]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-[1560px] 2xl:max-w-[1680px] mx-auto w-full relative z-10 flex flex-col justify-center my-auto">
        
        {/* Clean, Editorial Header */}
        <div className="pb-3 mb-4 border-b border-white/10">
          <h2 className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] font-normal text-white tracking-tight leading-tight">
            Preparing students for{' '}
            <span className="text-[#38bdf8] font-light italic">tomorrow’s innovations.</span>
          </h2>
          <p className="font-sans-modern text-xs sm:text-[13.5px] text-white/75 mt-1 max-w-2xl font-normal leading-relaxed">
            Hands-on exploration of physical AI, generative models, and autonomous systems without vendor lock-in.
          </p>
        </div>

        {/* 7-Tech Interactive Tabs Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 my-2">
          {EMERGING_TECH_DATA.map((tech, idx) => {
            const isSelected = idx === activeTechIndex;
            return (
              <Magnetic key={tech.name} strength={0.12}>
                <button
                  onClick={() => setActiveTechIndex(idx)}
                  className={`w-full py-2.5 px-3 rounded-xl text-left transition-all duration-300 border flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-white/15 text-white shadow-lg ring-1 scale-[1.02]'
                      : 'bg-white/5 hover:bg-white/10 text-white/70 border-white/10 hover:border-white/20'
                  }`}
                  style={{
                    borderColor: isSelected ? tech.accentColor : undefined,
                    boxShadow: isSelected ? `0 10px 25px -8px ${tech.accentColor}40` : undefined,
                  }}
                >
                  <div className="min-w-0 pr-1">
                    <span
                      className="font-mono-tech text-[10px] font-bold block leading-tight mb-0.5"
                      style={{ color: isSelected ? tech.accentColor : '#94a3b8' }}
                    >
                      0{idx + 1} //
                    </span>
                    <span className="font-sans-modern text-xs font-bold text-white truncate leading-tight block">
                      {tech.name}
                    </span>
                  </div>
                  <div
                    className="p-1.5 rounded-lg shrink-0 transition-colors"
                    style={{
                      backgroundColor: isSelected ? `${tech.accentColor}25` : 'rgba(255,255,255,0.06)',
                      color: isSelected ? tech.accentColor : '#94a3b8',
                    }}
                  >
                    {tech.icon}
                  </div>
                </button>
              </Magnetic>
            );
          })}
        </div>

        {/* Clean 2-Column Presentation Card */}
        <div className="bg-white/[0.04] rounded-2xl border border-white/12 p-5 sm:p-6 lg:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mt-3 shadow-xl">
          
          {/* Left Column: Tech Overview & Practical Classroom Project (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="font-mono-tech text-[11px] uppercase tracking-wider font-bold px-3 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: `${activeTech.accentColor}15`,
                    borderColor: `${activeTech.accentColor}40`,
                    color: activeTech.accentColor,
                  }}
                >
                  Domain 0{activeTechIndex + 1} • {activeTech.category}
                </span>
              </div>

              <h3 className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl font-normal text-white tracking-tight leading-snug">
                {activeTech.name}
              </h3>

              <p className="font-sans-modern text-xs sm:text-sm text-white/80 mt-1.5 leading-relaxed font-normal max-w-xl">
                {activeTech.summary}
              </p>
            </div>

            {/* Practical Classroom Laboratory Project */}
            <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10 shadow-xs">
              <div className="flex items-center gap-2 mb-1">
                <Wrench className="w-4 h-4 text-[#38bdf8]" />
                <span className="font-mono-tech text-xs uppercase tracking-wider text-[#38bdf8] font-bold">
                  Classroom Laboratory Application
                </span>
              </div>
              <p className="font-sans-modern text-xs sm:text-[13.5px] text-white/95 leading-relaxed pl-6 italic">
                "{activeTech.schoolExample}"
              </p>
            </div>

            {/* Core Competencies & Tools */}
            <div>
              <span className="font-mono-tech text-[10.5px] uppercase tracking-wider text-white/60 font-semibold block mb-1.5 pl-1">
                Core Competencies & Hardware Stack
              </span>
              <div className="flex flex-wrap gap-1.5 pl-1">
                {activeTech.tools.map((tool, cIdx) => (
                  <span
                    key={cIdx}
                    className="font-mono-tech text-[11px] px-3 py-1 rounded-lg bg-white/10 border border-white/15 text-white/90 font-medium"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Key Curriculum Learning Highlights (5 Cols) */}
          <div className="lg:col-span-5 bg-white/[0.06] rounded-2xl p-5 sm:p-6 border border-white/15 shadow-md flex flex-col justify-center h-full">
            <div className="flex items-center gap-2 pb-3 mb-3.5 border-b border-white/10">
              <Layers className="w-4 h-4 text-[#38bdf8]" />
              <h5 className="font-mono-tech text-xs uppercase tracking-wider text-white font-bold">
                Key Learning Outcomes
              </h5>
            </div>

            <ul className="space-y-3">
              {activeTech.highlights.map((highlight, hIdx) => (
                <li
                  key={hIdx}
                  className="flex items-start gap-2.5 text-xs sm:text-[13px] font-sans-modern text-white/90 font-medium leading-relaxed"
                >
                  <CheckCircle2
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{ color: activeTech.accentColor }}
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};

export default EmergingTechSection;
