import React from 'react';
import { PRICING_TIERS } from '../data/slidesData';
import { Check, Info } from 'lucide-react';
import { Magnetic } from './motion/Magnetic';
import { AnimatedCounter } from './motion/AnimatedCounter';
import { LineReveal } from './motion/LineReveal';

export const PricingCards: React.FC = () => {
  return (
    <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl border border-[#203744]/12 p-4 sm:p-5 shadow-sm interactive-card">
      
      {/* Header and Disclaimers */}
      <div className="pricing-top-bar flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 mb-2.5 border-b border-[#203744]/10 gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono-tech text-[10.5px] sm:text-xs tracking-wider uppercase text-[#398BB0] font-bold">
            Commercial Blueprint
          </span>
          <span className="text-xs text-[#203744]/30">•</span>
          <span className="inline-flex items-center gap-1 font-mono-tech text-[10px] text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-semibold">
            <Info className="w-3 h-3 text-amber-700" />
            Proposed Tiers — Subject to Mutual Confirmation
          </span>
        </div>
        <div className="text-[11px] font-sans-modern text-[#203744]/80 sm:text-right font-medium">
          Billed only for actual instruction months (8–10 months). Zero upfront equipment Capex.
        </div>
      </div>

      <LineReveal color="#398BB0" height={1.5} className="mb-3.5" />

      {/* 3 Pricing Cards Grid */}
      <div className="pricing-tier-grid grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
        {PRICING_TIERS.map((tier) => {
          // Parse price number for AnimatedCounter
          const numericPrice = parseInt(tier.price.replace(/[^\d]/g, ''), 10) || 0;

          return (
            <Magnetic key={tier.name} strength={0.06}>
              <div
                className={`pricing-card-item w-full rounded-xl p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 relative border interactive-card h-full ${
                  tier.recommended
                    ? 'bg-white border-[#398BB0] shadow-md ring-2 ring-[#398BB0]/25 scale-[1.01]'
                    : 'bg-white/80 hover:bg-white border-[#203744]/12 hover:border-[#398BB0]/40'
                }`}
              >
                {tier.recommended && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#398BB0] text-white font-mono-tech text-[9.5px] uppercase tracking-wider font-bold shadow-xs shimmer-badge z-10">
                    Recommended Tier
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-serif-editorial text-base sm:text-lg font-bold text-[#203744]">
                      {tier.name}
                    </h4>
                    <span className="font-mono-tech text-[9.5px] text-[#398BB0] bg-[#DFE6E7]/60 px-2 py-0.5 rounded font-semibold">
                      {tier.status}
                    </span>
                  </div>

                  <p className="font-sans-modern text-[11px] text-[#203744]/75 mb-2 line-clamp-1 leading-snug font-normal">
                    {tier.description}
                  </p>

                  {/* Animated Price Display */}
                  <div className="mb-2 pb-2 border-b border-[#203744]/10">
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif-editorial text-xl sm:text-2xl font-extrabold text-[#203744]">
                        <AnimatedCounter to={numericPrice} prefix="₹" />
                      </span>
                      <span className="font-sans-modern text-[11px] text-[#203744]/70 font-medium">
                        / student
                      </span>
                    </div>
                    <span className="font-mono-tech text-[9.5px] text-[#398BB0] block mt-0.5 font-medium">
                      Monthly billing • Flexible calendar duration
                    </span>
                  </div>

                  {/* Inclusions List */}
                  <div className="space-y-1 mb-2">
                    <span className="font-mono-tech text-[9.5px] uppercase tracking-wider text-[#203744]/70 font-bold block">
                      Deliverables & Inclusions:
                    </span>
                    <ul className="space-y-1">
                      {tier.inclusions.map((inc, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-[11px] font-sans-modern text-[#203744]/90 leading-tight">
                          <Check className="w-3.5 h-3.5 text-[#398BB0] shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#203744]/10 text-center">
                  <span className="font-mono-tech text-[9.5px] text-[#203744]/60 font-medium">
                    Batch size & schedule customized per school
                  </span>
                </div>
              </div>
            </Magnetic>
          );
        })}
      </div>

    </div>
  );
};

export default PricingCards;

