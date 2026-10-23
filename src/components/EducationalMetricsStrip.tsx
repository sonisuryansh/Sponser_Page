import React from 'react';
import { AnimatedCounter } from './motion/AnimatedCounter';
import { Cpu, Clock, Wrench, ShieldCheck } from 'lucide-react';

interface MetricItem {
  icon: React.ElementType;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail: string;
}

const METRICS: MetricItem[] = [
  {
    icon: Cpu,
    value: 5,
    suffix: '',
    label: 'Core Tech Domains',
    detail: 'Robotics, AI, Drones, Analytics, Math',
  },
  {
    icon: Clock,
    value: 120,
    suffix: '+ hrs',
    label: 'Lab Practical Curriculum',
    detail: 'Hands-on experiential experiment hours',
  },
  {
    icon: Wrench,
    value: 100,
    suffix: '%',
    label: 'Hardware Kit Provision',
    detail: 'Complete lab equipment managed on-site',
  },
  {
    icon: ShieldCheck,
    value: 0,
    prefix: '',
    suffix: ' CAPEX',
    label: 'Procurement Burden',
    detail: 'Full turnkey operations by MedhaArc Labs',
  },
];

/**
 * EducationalMetricsStrip (Inspired by Anugrah2303 counter metrics & institutional credibility):
 * Pristine creamish/white institutional card strip demonstrating school leadership impact.
 */
export const EducationalMetricsStrip: React.FC = () => {
  return (
    <div className="w-full max-w-7xl xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 bg-white/85 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-[#203744]/12 shadow-sm interactive-card">
        {METRICS.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className={`flex flex-col justify-between ${
                idx > 0 ? 'border-t sm:border-t-0 sm:border-l border-[#203744]/10 pt-3 sm:pt-0 sm:pl-5' : ''
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="p-1.5 rounded-lg bg-[#398BB0]/10 text-[#398BB0]">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-mono-tech text-[11px] uppercase tracking-wider text-[#398BB0] font-bold">
                  {m.label}
                </span>
              </div>

              <div className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-[#203744] my-0.5">
                <AnimatedCounter
                  to={m.value}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  duration={2.2}
                />
              </div>

              <p className="font-sans-modern text-xs text-[#203744]/70 leading-relaxed font-normal">
                {m.detail}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
