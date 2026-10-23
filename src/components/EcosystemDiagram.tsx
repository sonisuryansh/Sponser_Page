import React, { useState } from 'react';
import { Bot, Cpu, BarChart3, Plane, Compass, Sparkles } from 'lucide-react';

interface DomainNode {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  icon: React.ReactNode;
  tags: string[];
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const DOMAINS: DomainNode[] = [
  {
    id: 'robotics',
    name: 'Robotics & Automation',
    subtitle: 'Sensory feedback, motor actuation & embedded logic',
    color: '#398BB0',
    icon: <Bot className="w-5 h-5 text-[#398BB0]" />,
    tags: ['Sensors', 'Actuators', 'Embedded C / MicroPython', 'Mechanical 3D Design'],
    position: 'top-left'
  },
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    subtitle: 'Intelligent inference, data models & ethical boundaries',
    color: '#286D8B',
    icon: <Cpu className="w-5 h-5 text-[#286D8B]" />,
    tags: ['Machine Models', 'Pattern Recognition', 'Computer Vision', 'Ethical Guardrails'],
    position: 'top-right'
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics',
    subtitle: 'Pattern discovery, statistical charts & visual reasoning',
    color: '#DBA780',
    icon: <BarChart3 className="w-5 h-5 text-[#DBA780]" />,
    tags: ['Data Structuring', 'Statistical Interpretation', 'Data Visualization', 'Hypothesis Testing'],
    position: 'bottom-left'
  },
  {
    id: 'aerial-systems',
    name: 'Aerial Systems',
    subtitle: 'Spatial dynamics, telemetry sensing & autonomous mapping',
    color: '#203744',
    icon: <Plane className="w-5 h-5 text-[#203744]" />,
    tags: ['Flight Aerodynamics', 'Navigation Telemetry', 'Payload Sensing', 'Safety Protocols'],
    position: 'bottom-right'
  }
];

const FOUNDATIONS = [
  { name: 'Formal Logic & Boolean Algebra', desc: 'Conditionals, state machines & branching algorithms' },
  { name: 'Measurement, Geometry & Kinematics', desc: 'Spatial coordinates, 3D vectors & angular velocities' },
  { name: 'Statistical & Data Reasoning', desc: 'Distributions, signal noise & probabilistic inference' },
  { name: 'Algorithmic Optimization', desc: 'Time complexity, iterative refinement & loop convergence' },
];

export const EcosystemDiagram: React.FC = () => {
  const [activeDomain, setActiveDomain] = useState<string>('robotics');

  return (
    <div className="w-full bg-white/70 backdrop-blur-md rounded-2xl border border-[#203744]/10 p-6 sm:p-8 shadow-sm">
      
      {/* Top Header of Diagram */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#203744]/10 gap-3">
        <div>
          <span className="font-mono-tech text-xs tracking-widest uppercase text-[#398BB0]">
            Core Engineering Architecture
          </span>
          <h3 className="font-serif-editorial text-2xl sm:text-3xl font-medium text-[#203744] mt-0.5">
            The MedhaArc Technology Quadrum
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono-tech text-[#203744]/60 bg-[#D5E2E5]/50 px-3 py-1.5 rounded-full self-start sm:self-auto">
          <Sparkles className="w-3.5 h-3.5 text-[#398BB0]" />
          <span>Interactive Architectural Map</span>
        </div>
      </div>

      {/* 4 Connected Domains Grid with Central MedhaArc Hub */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-8">
        
        {/* Subtle center indicator on desktop */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-20 h-20 rounded-full bg-gradient-to-br from-white to-[#DFE6E7] border-2 border-[#398BB0]/40 shadow-lg items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-2 shadow-xs">
            <img src="/assets/medhaarc_metallic_logo.png" alt="MedhaArc Core" className="w-full h-full object-contain" />
          </div>
        </div>

        {DOMAINS.map((domain) => {
          const isSelected = activeDomain === domain.id;
          return (
            <div
              key={domain.id}
              onClick={() => setActiveDomain(domain.id)}
              className={`cursor-pointer rounded-xl p-5 sm:p-6 transition-all duration-300 border text-left relative overflow-hidden ${
                isSelected
                  ? 'bg-white shadow-md border-[#398BB0] ring-1 ring-[#398BB0]/20'
                  : 'bg-white/50 hover:bg-white/80 border-[#203744]/10 hover:border-[#398BB0]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-[#D5E2E5]/60 border border-[#203744]/5">
                    {domain.icon}
                  </div>
                  <h4 className="font-serif-editorial text-lg sm:text-xl font-semibold text-[#203744]">
                    {domain.name}
                  </h4>
                </div>
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: domain.color }} />
              </div>

              <p className="font-sans-modern text-xs sm:text-sm text-[#203744]/75 mb-4 leading-relaxed">
                {domain.subtitle}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#203744]/8">
                {domain.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="font-mono-tech text-[11px] px-2.5 py-1 rounded-md bg-[#DFE6E7]/60 text-[#203744] border border-[#203744]/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* FOUNDATIONAL BEDROCK LAYER — Explicitly Not A 5th Node */}
      <div className="relative rounded-xl p-5 sm:p-6 bg-gradient-to-r from-[#203744] via-[#286D8B] to-[#203744] text-white shadow-md overflow-hidden">
        
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/15">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20">
              <Compass className="w-5 h-5 text-[#38bdf8]" />
            </div>
            <div>
              <span className="font-mono-tech text-[10px] tracking-widest uppercase text-[#38bdf8]">
                Connecting Bedrock Layer
              </span>
              <h4 className="font-serif-editorial text-xl sm:text-2xl font-medium text-white">
                Mathematical & Computational Foundations
              </h4>
            </div>
          </div>
          <div className="text-xs font-sans-modern text-white/80 max-w-md">
            Not a separate technology domain, but the essential cognitive substratum empowering students to understand, formulate, and debug all four domains.
          </div>
        </div>

        {/* 4 Foundations Cards */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {FOUNDATIONS.map((f, i) => (
            <div key={i} className="p-3.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 text-left">
              <div className="font-mono-tech text-[10px] text-[#38bdf8] uppercase mb-1">
                Foundation 0{i + 1}
              </div>
              <div className="font-sans-modern text-sm font-semibold text-white mb-1">
                {f.name}
              </div>
              <div className="font-sans-modern text-xs text-white/70 leading-relaxed">
                {f.desc}
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
