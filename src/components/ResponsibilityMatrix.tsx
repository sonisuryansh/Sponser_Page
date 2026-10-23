import React from 'react';
import {
  Monitor,
  School,
  Award,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
} from 'lucide-react';
import { Magnetic } from './motion/Magnetic';
import { AnimatedCounter } from './motion/AnimatedCounter';

export const ResponsibilityMatrix: React.FC = () => {
  return (
    <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl border border-[#203744]/12 p-5 sm:p-7 lg:p-8 shadow-md interactive-card">
      
      {/* Top Bar: Integrated Live Metrics & Accountability Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#203744]/10 gap-3">
        <div className="grid grid-cols-3 max-w-md gap-4 sm:gap-8">
          <div>
            <div className="font-mono-tech text-base sm:text-xl font-bold text-[#398BB0]">
              <AnimatedCounter to={0} prefix="" suffix=" Capex" />
            </div>
            <div className="font-mono-tech text-[9.5px] sm:text-[10px] text-[#203744]/70 uppercase font-medium">Zero Kit Capex</div>
          </div>
          <div>
            <div className="font-mono-tech text-base sm:text-xl font-bold text-[#286D8B]">
              <AnimatedCounter to={100} suffix="%" />
            </div>
            <div className="font-mono-tech text-[9.5px] sm:text-[10px] text-[#203744]/70 uppercase font-medium">Turnkey Support</div>
          </div>
          <div>
            <div className="font-mono-tech text-base sm:text-xl font-bold text-[#203744]">
              <AnimatedCounter to={2} suffix=" Mentors" />
            </div>
            <div className="font-mono-tech text-[9.5px] sm:text-[10px] text-[#203744]/70 uppercase font-medium">Batch Staffing</div>
          </div>
        </div>

        <Magnetic strength={0.15}>
          <div className="flex items-center gap-1.5 text-xs font-mono-tech text-[#203744]/85 bg-[#DFE6E7]/70 px-3 py-1.5 rounded-full self-start sm:self-auto font-medium border border-[#203744]/10 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#286D8B]" />
            <span>Clear & Transparent Partnership • Mutual Accountability</span>
          </div>
        </Magnetic>
      </div>

      {/* Two Column Grid: School vs MedhaArc Labs (Spacious, Generous Gap) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-stretch">
        
        {/* Column 1: School Responsibilities */}
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-[#203744]/10 shadow-2xs flex flex-col justify-between interactive-card">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#203744]/10">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#DFE6E7]/80 text-[#203744]">
                  <School className="w-4 h-4 text-[#203744]" />
                </div>
                <div>
                  <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[#203744]/60 font-semibold block leading-none mb-0.5">
                    Partner Institution
                  </span>
                  <h4 className="font-serif-editorial text-sm sm:text-base font-bold text-[#203744]">
                    School Role & Support
                  </h4>
                </div>
              </div>
              <span className="font-mono-tech text-[10px] text-amber-900 font-bold bg-amber-100/80 px-2.5 py-0.5 rounded border border-amber-200">
                School Responsibility
              </span>
            </div>

            {/* Crucial requirement: Computers highlight */}
            <div className="mb-4 p-3.5 rounded-xl bg-amber-50/90 border border-amber-200/90">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Monitor className="w-3.5 h-3.5 text-amber-700" />
                <span className="font-mono-tech text-[10.5px] uppercase tracking-wider text-amber-900 font-bold">
                  School Provides:
                </span>
              </div>
              <p className="font-serif-editorial text-base sm:text-lg font-bold text-[#203744] leading-tight">
                Computers & Lab Space
              </p>
              <p className="font-sans-modern text-xs text-[#203744]/80 mt-1 leading-relaxed">
                Arranged by school in the computer lab. MedhaArc Labs provides all robotics hardware, curriculum, and instructors.
              </p>
              
              <div className="flex flex-wrap gap-1.5 mt-2.5 pt-2 border-t border-amber-200/60">
                <span className="font-mono-tech text-[9.5px] px-2 py-0.5 rounded bg-white/80 text-[#203744] font-medium border border-amber-200">
                  1 PC per 1–2 students
                </span>
                <span className="font-mono-tech text-[9.5px] px-2 py-0.5 rounded bg-white/80 text-[#203744] font-medium border border-amber-200">
                  Standard Web Browser
                </span>
                <span className="font-mono-tech text-[9.5px] px-2 py-0.5 rounded bg-white/80 text-[#203744] font-medium border border-amber-200">
                  Bench Power & Furniture
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[#203744]/70 font-bold block mb-1">
                School Supports (As Agreed):
              </span>
              <ul className="space-y-2 font-sans-modern text-xs text-[#203744]/90">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#398BB0] shrink-0 mt-0.5" />
                  <span className="text-[11.5px] sm:text-xs">Dedicated laboratory room allocation for regular practical batches</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#398BB0] shrink-0 mt-0.5" />
                  <span className="text-[11.5px] sm:text-xs">Timetable integration and academic calendar coordination</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#398BB0] shrink-0 mt-0.5" />
                  <span className="text-[11.5px] sm:text-xs">Designated school coordinator for smooth session logistics</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#203744]/10 text-[10.5px] font-mono-tech text-[#203744]/65 font-medium flex items-center justify-between">
            <span>Institutional Infrastructure Alignment</span>
            <span className="text-[#398BB0] font-bold">Standard School Hardware</span>
          </div>
        </div>

        {/* Column 2: MedhaArc Labs Responsibilities */}
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-[#398BB0]/25 shadow-2xs flex flex-col justify-between relative overflow-hidden interactive-card">
          
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#398BB0]/5 rounded-bl-full pointer-events-none" />

          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#203744]/10">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#398BB0]/10 text-[#398BB0]">
                  <Award className="w-4 h-4 text-[#398BB0]" />
                </div>
                <div>
                  <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[#398BB0] font-bold block leading-none mb-0.5">
                    Program Partner
                  </span>
                  <h4 className="font-serif-editorial text-sm sm:text-base font-bold text-[#203744]">
                    MedhaArc Labs Delivers
                  </h4>
                </div>
              </div>
              <span className="font-mono-tech text-[10px] text-[#286D8B] font-bold bg-[#398BB0]/10 px-2.5 py-0.5 rounded border border-[#398BB0]/20">
                100% Turnkey Covered
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[#398BB0] font-bold block mb-1">
                Core Program Provisions:
              </span>
              <ul className="space-y-2.5 font-sans-modern text-xs text-[#203744]/90">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#398BB0] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#203744] font-semibold text-[11.5px] sm:text-xs">Complete Curriculum & Lessons: </strong>
                    <span className="text-[11.5px] sm:text-xs text-[#203744]/75">Grade-calibrated lesson pathways, coding workbooks, and project guides.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#398BB0] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#203744] font-semibold text-[11.5px] sm:text-xs">Qualified Program Instructors: </strong>
                    <span className="text-[11.5px] sm:text-xs text-[#203744]/75">Experienced technical mentors delivering live practical sessions on schedule.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#398BB0] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#203744] font-semibold text-[11.5px] sm:text-xs">Robotics & Learning Kits: </strong>
                    <span className="text-[11.5px] sm:text-xs text-[#203744]/75">All microcontrollers, sensors, actuators, and structural hardware provided.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#398BB0] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#203744] font-semibold text-[11.5px] sm:text-xs">Zero Replacement Costs: </strong>
                    <span className="text-[11.5px] sm:text-xs text-[#203744]/75">Damaged sensors or wear-and-tear parts replenished by MedhaArc with zero school expense.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Crucial Blueprint Note on Lab Kits */}
          <div className="p-3 rounded-lg bg-[#D5E2E5]/50 border border-[#203744]/12 text-[11px] text-[#203744]/85 flex items-start gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-[#286D8B] shrink-0 mt-0.5" />
            <span className="leading-snug">
              <strong className="text-[#203744]">Equipment Protocol:</strong> Robotics kits are stationed inside the school lab for practical sessions and are not take-home kits.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ResponsibilityMatrix;

