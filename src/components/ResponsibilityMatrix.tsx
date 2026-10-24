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
    <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl border border-[#203744]/12 p-4 sm:p-5 shadow-sm flex flex-col">
      
      {/* Top Bar: Compact Live Metrics & Accountability Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 mb-3.5 border-b border-[#203744]/10 gap-2.5">
        <div className="grid grid-cols-3 max-w-md gap-4 sm:gap-6">
          <div>
            <div className="font-mono-tech text-base sm:text-lg font-bold text-[#398BB0] leading-tight">
              <AnimatedCounter to={0} prefix="₹" suffix=" Capex" />
            </div>
            <div className="font-mono-tech text-[10px] sm:text-[11px] text-[#203744]/70 uppercase font-medium leading-tight mt-0.5">
              Zero Kit Capex
            </div>
          </div>
          <div>
            <div className="font-mono-tech text-base sm:text-lg font-bold text-[#286D8B] leading-tight">
              <AnimatedCounter to={100} suffix="%" />
            </div>
            <div className="font-mono-tech text-[10px] sm:text-[11px] text-[#203744]/70 uppercase font-medium leading-tight mt-0.5">
              Turnkey Support
            </div>
          </div>
          <div>
            <div className="font-mono-tech text-base sm:text-lg font-bold text-[#203744] leading-tight">
              <AnimatedCounter to={2} suffix=" Mentors" />
            </div>
            <div className="font-mono-tech text-[10px] sm:text-[11px] text-[#203744]/70 uppercase font-medium leading-tight mt-0.5">
              Batch Staffing
            </div>
          </div>
        </div>

        <Magnetic strength={0.12}>
          <div className="flex items-center gap-1.5 text-xs font-mono-tech text-[#203744]/85 bg-[#DFE6E7]/70 px-3.5 py-1.5 rounded-full self-start sm:self-auto font-medium border border-[#203744]/10 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#286D8B] shrink-0" />
            <span>Clear &amp; Transparent Partnership • Mutual Accountability</span>
          </div>
        </Magnetic>
      </div>

      {/* Two Column Grid: School Role vs MedhaArc Labs (Content-driven natural height) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 items-stretch">
        
        {/* Column 1: School Role & Support */}
        <div className="h-full bg-white rounded-xl p-4 sm:p-4.5 border border-[#203744]/10 shadow-xs flex flex-col">
          {/* Column Header */}
          <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#203744]/10">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-lg bg-[#DFE6E7]/80 text-[#203744]">
                <School className="w-3.5 h-3.5 text-[#203744]" />
              </div>
              <div>
                <span className="font-mono-tech text-[9.5px] uppercase tracking-wider text-[#203744]/60 font-semibold block leading-none mb-0.5">
                  Partner Institution
                </span>
                <h3 className="font-serif-editorial text-base sm:text-lg font-bold text-[#203744] leading-tight">
                  School Role &amp; Support
                </h3>
              </div>
            </div>
            <span className="font-mono-tech text-[10.5px] text-amber-900 font-bold bg-amber-100/80 px-2 py-0.5 rounded border border-amber-200 shrink-0">
              School Responsibility
            </span>
          </div>

          {/* Highlighted Computers & Lab Space panel (compact padding) */}
          <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 mb-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Monitor className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span className="font-mono-tech text-[10.5px] uppercase tracking-wider text-amber-900 font-bold">
                School Provides:
              </span>
            </div>
            <h4 className="font-serif-editorial text-sm sm:text-base font-bold text-[#203744] leading-tight">
              Existing Computers &amp; Lab Space
            </h4>
            <p className="font-sans-modern text-xs text-[#203744]/80 mt-1 leading-snug">
              Arranged by school in the computer lab. 1 PC per 1–2 students with standard web browser and bench power.
            </p>
            
            {/* Compact tags */}
            <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-amber-200/60">
              <span className="font-mono-tech text-[9.5px] px-2 py-0.5 rounded bg-white/80 text-[#203744] font-medium border border-amber-200">
                1 PC per 1–2 students
              </span>
              <span className="font-mono-tech text-[9.5px] px-2 py-0.5 rounded bg-white/80 text-[#203744] font-medium border border-amber-200">
                Standard Web Browser
              </span>
              <span className="font-mono-tech text-[9.5px] px-2 py-0.5 rounded bg-white/80 text-[#203744] font-medium border border-amber-200">
                Bench Power &amp; Furniture
              </span>
            </div>
          </div>

          {/* 3 School Support Responsibilities */}
          <div className="space-y-1.5">
            <span className="font-mono-tech text-[10.5px] uppercase tracking-wider text-[#203744]/70 font-bold block mb-1.5">
              Institutional Alignment:
            </span>
            <ul className="space-y-2 font-sans-modern text-xs text-[#203744]/90">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#398BB0] shrink-0 mt-0.5" />
                <span className="leading-snug">Dedicated laboratory room allocation for regular practical batches</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#398BB0] shrink-0 mt-0.5" />
                <span className="leading-snug">Timetable integration and academic calendar coordination</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#398BB0] shrink-0 mt-0.5" />
                <span className="leading-snug">Designated school coordinator for smooth session logistics</span>
              </li>
            </ul>
          </div>

          {/* Bottom Infrastructure Alignment label */}
          <div className="mt-auto pt-3.5 border-t border-[#203744]/10 text-[10.5px] font-mono-tech text-[#203744]/65 font-medium flex items-center justify-between">
            <span>Institutional Infrastructure Alignment</span>
            <span className="text-[#398BB0] font-bold">Standard School Hardware</span>
          </div>
        </div>

        {/* Column 2: MedhaArc Labs Responsibilities */}
        <div className="h-full bg-white rounded-xl p-4 sm:p-4.5 border border-[#398BB0]/25 shadow-xs flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#398BB0]/5 rounded-bl-full pointer-events-none" />

          {/* Column Header */}
          <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#203744]/10">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-lg bg-[#398BB0]/10 text-[#398BB0]">
                <Award className="w-3.5 h-3.5 text-[#398BB0]" />
              </div>
              <div>
                <span className="font-mono-tech text-[9.5px] uppercase tracking-wider text-[#398BB0] font-bold block leading-none mb-0.5">
                  Program Partner
                </span>
                <h3 className="font-serif-editorial text-base sm:text-lg font-bold text-[#203744] leading-tight">
                  MedhaArc Labs Delivers
                </h3>
              </div>
            </div>
            <span className="font-mono-tech text-[10.5px] text-[#286D8B] font-bold bg-[#398BB0]/10 px-2 py-0.5 rounded border border-[#398BB0]/20 shrink-0">
              100% Turnkey Covered
            </span>
          </div>

          {/* 4 Core Program Provisions */}
          <div className="space-y-1.5 mb-3">
            <span className="font-mono-tech text-[10.5px] uppercase tracking-wider text-[#398BB0] font-bold block mb-1.5">
              Core Program Provisions:
            </span>
            <ul className="space-y-2 font-sans-modern text-xs text-[#203744]/90">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#398BB0] shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <strong className="text-[#203744] font-semibold">Complete Curriculum &amp; Lessons: </strong>
                  <span className="text-[#203744]/75">Grade-calibrated lesson pathways, coding workbooks, and project guides.</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#398BB0] shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <strong className="text-[#203744] font-semibold">Qualified Program Instructors: </strong>
                  <span className="text-[#203744]/75">Experienced technical mentors delivering live practical sessions on schedule.</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#398BB0] shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <strong className="text-[#203744] font-semibold">Robotics &amp; Learning Kits: </strong>
                  <span className="text-[#203744]/75">All microcontrollers, sensors, actuators, and structural hardware provided.</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#398BB0] shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <strong className="text-[#203744] font-semibold">Zero Replacement Costs: </strong>
                  <span className="text-[#203744]/75">Damaged sensors or wear-and-tear parts replenished with zero school expense.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Equipment Protocol Notice (positioned shortly after provisions, not pushed to bottom) */}
          <div className="mt-auto p-2.5 rounded-lg bg-[#D5E2E5]/50 border border-[#203744]/12 text-xs text-[#203744]/85 flex items-start gap-2">
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
