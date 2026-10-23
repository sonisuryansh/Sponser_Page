import React, { useState } from 'react';
import { GRADE_LEVELS } from '../data/slidesData';
import { CheckCircle2, GraduationCap, Target, Cpu, Award } from 'lucide-react';
import { Magnetic } from './motion/Magnetic';

const GRADE_METADATA = [
  {
    tools: ['Block Logic', 'Micro:bit', 'Sensors & LEDs', 'Basic Linkages'],
    badge: 'Foundations',
    phase: 'Stage 01',
    milestone: 'Code-to-Motion Intuition'
  },
  {
    tools: ['Python 3', 'GPIO Ports', 'Loops & Conditions', 'Breadboard Circuits'],
    badge: 'Syntax & Text Code',
    phase: 'Stage 02',
    milestone: 'Real Code Execution'
  },
  {
    tools: ['Data Structures', 'PWM Drivers', 'Feedback Control', 'Kinematics'],
    badge: 'Control Loops',
    phase: 'Stage 03',
    milestone: 'Autonomous Behaviors'
  },
  {
    tools: ['ESP32 / WiFi', 'MQTT Telemetry', 'Fusion 360 CAD', '3D Prototyping'],
    badge: 'Connected IoT',
    phase: 'Stage 04',
    milestone: 'Remote Mesh Telemetry'
  },
  {
    tools: ['Data Wrangling', 'Empirical Statistics', 'Telemetry Charts', 'Hypothesis Proof'],
    badge: 'Data Science',
    phase: 'Stage 05',
    milestone: 'Evidence-Based Analysis'
  },
  {
    tools: ['Computer Vision', 'Supervised Learning', 'OpenCV', 'Loss Functions'],
    badge: 'Applied AI',
    phase: 'Stage 06',
    milestone: 'Predictive Classifiers'
  },
  {
    tools: ['Edge AI Vision', 'Autonomous Drones', 'ROS Protocols', 'Capstone Defense'],
    badge: 'Capstone Engineering',
    phase: 'Stage 07',
    milestone: 'Full Engineering Defense'
  }
];

interface GradePathVisualizerProps {
  selectedIndex?: number;
  onSelectIndex?: (idx: number) => void;
}

export const GradePathVisualizer: React.FC<GradePathVisualizerProps> = ({
  selectedIndex,
  onSelectIndex,
}) => {
  const [internalIndex, setInternalIndex] = useState<number>(0);
  const activeIndex = selectedIndex !== undefined ? selectedIndex : internalIndex;
  const setIndex = onSelectIndex || setInternalIndex;

  const activeLevel = GRADE_LEVELS[activeIndex];
  const activeMeta = GRADE_METADATA[activeIndex];

  return (
    <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl border border-[#203744]/12 p-4 sm:p-5 lg:p-6 shadow-md">
      
      {/* Sleek Grade Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-2.5 mb-4">
        {GRADE_LEVELS.map((level, idx) => {
          const isSelected = idx === activeIndex;
          const meta = GRADE_METADATA[idx];
          return (
            <Magnetic key={level.grade} strength={0.12}>
              <button
                onClick={() => setIndex(idx)}
                className={`w-full py-2.5 px-3 rounded-xl text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#203744] text-white border-[#203744] shadow-md scale-[1.02] ring-2 ring-[#286D8B]/30'
                    : 'bg-white/80 hover:bg-white text-[#203744] border-[#203744]/12 hover:border-[#398BB0]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-mono-tech text-[10.5px] sm:text-[11px] font-bold ${isSelected ? 'text-[#38bdf8]' : 'text-[#398BB0]'}`}>
                    {level.grade.replace(/Grade|Grades/i, 'Gr.').trim()}
                  </span>
                  <span className={`font-mono-tech text-[9px] uppercase ${isSelected ? 'text-white/60' : 'text-[#203744]/50'}`}>
                    {meta.phase}
                  </span>
                </div>
                <div className="text-[11.5px] sm:text-xs font-sans-modern font-semibold line-clamp-1 opacity-95">
                  {level.stage}
                </div>
              </button>
            </Magnetic>
          );
        })}
      </div>

      {/* Active Grade Detailed Showcase Panel */}
      <div className="bg-[#DFE6E7]/35 rounded-2xl p-4 sm:p-5 lg:p-6 border border-[#203744]/12 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        
        {/* Left Col: Stage, Focus & Tools (7 cols) */}
        <div className="lg:col-span-7 space-y-3 sm:space-y-3.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-[#286D8B] text-white font-mono-tech text-xs sm:text-sm font-bold shadow-2xs">
              {activeLevel.grade}
            </span>
            <h3 className="font-serif-editorial text-xl sm:text-2xl lg:text-[26px] font-bold text-[#203744]">
              {activeLevel.stage}
            </h3>
          </div>

          <div>
            <div className="flex items-center gap-1.5 font-mono-tech text-[10.5px] uppercase tracking-wider text-[#286D8B] font-bold mb-0.5">
              <Target className="w-3.5 h-3.5 text-[#286D8B]" />
              <span>Primary Learning Focus</span>
            </div>
            <p className="font-sans-modern text-[13.5px] sm:text-sm text-[#203744] font-medium leading-relaxed pl-5">
              {activeLevel.focus}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/95 border border-[#203744]/10 shadow-2xs">
            <div className="flex items-center gap-1.5 font-mono-tech text-[10px] uppercase tracking-wider text-[#398BB0] font-bold mb-0.5">
              <Award className="w-3.5 h-3.5 text-[#398BB0]" />
              <span>Measurable Outcome</span>
            </div>
            <p className="font-sans-modern text-xs sm:text-[13px] text-[#203744]/90 font-medium italic leading-relaxed pl-5">
              "{activeLevel.outcome}"
            </p>
          </div>

          {/* Key Tools & Hardware Stack */}
          <div>
            <div className="flex items-center gap-1.5 font-mono-tech text-[10px] uppercase tracking-wider text-[#203744]/70 font-semibold mb-1 pl-1">
              <Cpu className="w-3.5 h-3.5 text-[#203744]/60" />
              <span>Core Tools & Hardware</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pl-1">
              {activeMeta.tools.map((tool, tIdx) => (
                <span
                  key={tIdx}
                  className="font-mono-tech text-[10.5px] px-2.5 py-0.5 rounded-lg bg-white border border-[#203744]/15 text-[#203744] font-semibold shadow-2xs"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Syllabus Pillars (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-4 sm:p-5 border border-[#203744]/12 shadow-xs flex flex-col justify-center h-full">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#203744]/10">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#286D8B]" />
              <h5 className="font-mono-tech text-xs uppercase tracking-wider text-[#203744] font-bold">
                Curriculum Modules
              </h5>
            </div>
            <span className="font-mono-tech text-[10px] text-[#286D8B] font-bold bg-[#398BB0]/10 px-2 py-0.5 rounded">
              4 Modules
            </span>
          </div>

          <ul className="space-y-2.5">
            {activeLevel.topics.map((t, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] font-sans-modern text-[#203744] font-medium leading-snug">
                <CheckCircle2 className="w-4 h-4 text-[#286D8B] shrink-0 mt-0.5" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
};
