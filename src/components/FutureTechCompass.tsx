import React, { useState } from 'react';
import { EMERGING_TECH_LIST } from '../data/slidesData';
import { Sparkles, ArrowRight, Compass, Eye, Beaker, Lightbulb } from 'lucide-react';

export const FutureTechCompass: React.FC = () => {
  const [activeTechIndex, setActiveTechIndex] = useState<number>(0);
  const activeTech = EMERGING_TECH_LIST[activeTechIndex];

  return (
    <div className="w-full bg-white/70 backdrop-blur-md rounded-2xl border border-[#203744]/10 p-6 sm:p-8 shadow-sm">
      
      {/* Blueprint Preserved Tagline Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#203744]/10 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono-tech text-xs tracking-widest uppercase text-[#398BB0]">
              Emerging Technologies & Future Readiness
            </span>
            <span className="text-xs text-[#203744]/40">•</span>
            <span className="font-mono-tech text-[10px] text-[#203744]/60 bg-[#D5E2E5]/50 px-2.5 py-0.5 rounded-full">
              Preserved Blueprint
            </span>
          </div>
          <h3 className="font-serif-editorial text-2xl sm:text-3xl font-medium text-[#203744] mt-1 italic">
            “Beyond today’s technology — preparing students for tomorrow’s innovations.”
          </h3>
        </div>
        <div className="text-xs font-sans-modern text-[#203744]/70 max-w-xs">
          Introduced age-appropriately through guided exploration rather than complex commercial deployment.
        </div>
      </div>

      {/* Main Grid: Interactive Compass Hub + Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 items-center">
        
        {/* Left: 7 Emerging Tech Selectors Hub (lg:col-span-7) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {EMERGING_TECH_LIST.map((tech, idx) => {
            const isSelected = idx === activeTechIndex;
            return (
              <button
                key={tech.name}
                onClick={() => setActiveTechIndex(idx)}
                className={`text-left p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between group ${
                  isSelected
                    ? 'bg-[#203744] text-white border-[#203744] shadow-sm'
                    : 'bg-white/60 hover:bg-white text-[#203744] border-[#203744]/10 hover:border-[#398BB0]/40'
                }`}
              >
                <div>
                  <div className={`font-mono-tech text-[10px] uppercase mb-0.5 ${isSelected ? 'text-[#38bdf8]' : 'text-[#398BB0]'}`}>
                    {tech.category}
                  </div>
                  <div className="font-serif-editorial text-base font-semibold leading-tight">
                    {tech.name}
                  </div>
                </div>
                <Compass className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-[#38bdf8] rotate-45' : 'text-[#203744]/30 group-hover:text-[#398BB0]'}`} />
              </button>
            );
          })}
        </div>

        {/* Right: Active Detail Showcase Card (lg:col-span-5) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#203744] to-[#286D8B] text-white p-6 sm:p-7 rounded-2xl shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[300px]">
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-white/10 text-[#38bdf8] font-mono-tech text-xs font-semibold border border-white/10">
                0{activeTechIndex + 1} / 07 • {activeTech.category}
              </span>
              <Sparkles className="w-4 h-4 text-[#38bdf8]" />
            </div>

            <h4 className="font-serif-editorial text-2xl sm:text-3xl font-medium text-white mb-2">
              {activeTech.name}
            </h4>

            <p className="font-sans-modern text-sm text-white/80 leading-relaxed mb-6">
              {activeTech.summary}
            </p>
          </div>

          <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
            <div className="font-mono-tech text-[10px] text-[#38bdf8] uppercase tracking-wider mb-1">
              Curriculum Activity Example
            </div>
            <p className="font-sans-modern text-xs text-white/95 leading-relaxed font-medium">
              {activeTech.schoolExample}
            </p>
          </div>

        </div>

      </div>

      {/* Mandatory Blueprint Closing Flow: EXPLORE → EXPERIMENT → INNOVATE */}
      <div className="bg-[#DFE6E7]/50 rounded-xl p-4 sm:p-5 border border-[#203744]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2">
          <span className="font-mono-tech text-xs tracking-wider uppercase text-[#398BB0] font-semibold">
            Pedagogical Triad:
          </span>
          <span className="text-xs font-sans-modern text-[#203744]/70">
            Guiding future capability through structured discovery
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 font-mono-tech text-xs sm:text-sm font-semibold text-[#203744]">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#203744]/10 shadow-xs">
            <Eye className="w-3.5 h-3.5 text-[#398BB0]" />
            <span>EXPLORE</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-[#398BB0]" />
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#203744]/10 shadow-xs">
            <Beaker className="w-3.5 h-3.5 text-[#286D8B]" />
            <span>EXPERIMENT</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-[#398BB0]" />
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#203744]/10 shadow-xs">
            <Lightbulb className="w-3.5 h-3.5 text-[#DBA780]" />
            <span>INNOVATE</span>
          </div>
        </div>

      </div>

    </div>
  );
};
