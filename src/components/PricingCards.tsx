import React from 'react';
import { PRICING_TIERS } from '../data/slidesData';
import { Check, X, Sparkles, ArrowRight } from 'lucide-react';
import { Parallax3DCard } from './motion/Parallax3DCard';
import { AnimatedCounter } from './motion/AnimatedCounter';

interface PricingCardsProps {
  onSelectTier?: (tierName: string) => void;
}

// Color schemes aligned with the user specification and MedhaArc brand palette:
// Tier 1 (Basic): Crimson / Coral (#fa0038)
// Tier 2 (Standard): Institutional Cobalt Blue (#164fa9)
// Tier 3 (Premium): Emerald / Tech Teal (#1a9b8b)
const TIER_ACCENTS: Record<string, { accent: string; glow: string; shadow: string; ribbonBg: string }> = {
  Basic: {
    accent: '#fa0038',
    glow: 'rgba(250, 0, 56, 0.35)',
    shadow: 'rgba(250, 0, 56, 0.25)',
    ribbonBg: '#fa0038',
  },
  Standard: {
    accent: '#164fa9',
    glow: 'rgba(22, 79, 169, 0.45)',
    shadow: 'rgba(22, 79, 169, 0.3)',
    ribbonBg: '#164fa9',
  },
  Premium: {
    accent: '#1a9b8b',
    glow: 'rgba(26, 155, 139, 0.38)',
    shadow: 'rgba(26, 155, 139, 0.25)',
    ribbonBg: '#1a9b8b',
  },
};

// Curated 7-row feature matrix across tiers to provide balanced vertical proportions and clear tier progression
const TIER_FEATURES: Record<string, { label: string; checked: boolean }[]> = {
  Basic: [
    { label: 'Robotics & Automation Core Curriculum', checked: true },
    { label: 'Hands-on Laboratory Building Sessions', checked: true },
    { label: 'Shared Hardware Kits in School Lab', checked: true },
    { label: 'Trained Instructor Delivery as Scheduled', checked: true },
    { label: 'End-of-Term Student Project Showcases', checked: true },
    { label: 'AI & Machine Learning Conceptual Labs', checked: false },
    { label: 'Selected Aerial Systems Demonstrations', checked: false },
  ],
  Standard: [
    { label: 'All Basic Package Deliverables Included', checked: true },
    { label: 'Mathematical & Computational Integration', checked: true },
    { label: 'Data Reasoning & Logic Bridge Modules', checked: true },
    { label: 'Intermediate Microcontroller & Coding Labs', checked: true },
    { label: 'Dedicated On-Site Engineering Mentors', checked: true },
    { label: 'Comprehensive Student Progress Records', checked: true },
    { label: 'Selected Aerial Systems Demonstrations', checked: false },
  ],
  Premium: [
    { label: 'All Standard Package Deliverables Included', checked: true },
    { label: 'AI & Machine Learning Conceptual Labs', checked: true },
    { label: 'Selected Aerial Systems Demonstrations', checked: true },
    { label: 'Advanced Capstone Project Mentorship', checked: true },
    { label: 'Inter-School Exhibition & Portfolio Support', checked: true },
    { label: '100% Kit Maintenance & Part Replacement', checked: true },
    { label: 'Specialized STEM Showcase & Credentials', checked: true },
  ],
};

export const PricingCards: React.FC<PricingCardsProps> = ({ onSelectTier }) => {
  const handleSelect = (tierName: string) => {
    if (onSelectTier) {
      onSelectTier(tierName);
    } else {
      const closingSection = document.getElementById('slide-15');
      if (closingSection) {
        closingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* 
        3 Standalone Product Plan Cards with Gap Between Them
        - Decoupled into distinct cards with generous spacing
        - Slender, portrait aspect ratio (uncompressed, spacious)
      */}
      <div className="pricing-tier-grid grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 max-w-[1040px] w-full px-2 sm:px-4 pt-1 pb-2 items-stretch justify-center">
        {PRICING_TIERS.map((tier) => {
          const numericPrice = parseInt(tier.price.replace(/[^\d]/g, ''), 10) || 0;
          const colors = TIER_ACCENTS[tier.name] || {
            accent: '#164fa9',
            glow: 'rgba(22, 79, 169, 0.4)',
            shadow: 'rgba(22, 79, 169, 0.25)',
            ribbonBg: '#164fa9',
          };
          const features = TIER_FEATURES[tier.name] || tier.inclusions.slice(0, 7).map((inc) => ({ label: inc, checked: true }));

          return (
            <div
              key={tier.name}
              className="pricing-card-item flex flex-col justify-stretch h-full w-full max-w-[325px] sm:max-w-[335px] mx-auto"
            >
              <Parallax3DCard
                accentColor={colors.accent}
                glowColor={colors.glow}
                maxAngle={8}
                className="h-full flex flex-col"
              >
                {/* 
                  Individual Standalone Card:
                  - Custom diagonal border-radius (border-radius: 2.75rem 0 2.75rem 0)
                  - Proportional, balanced height fitting comfortably in viewport without cut-off
                  - Distinct elevation & hover lift
                */}
                <div
                  style={
                    {
                      '--accent-color': colors.accent,
                      '--overlap-size': '1.15rem',
                      borderRadius: '2.75rem 0 2.75rem 0',
                      transformStyle: 'preserve-3d',
                    } as React.CSSProperties
                  }
                  className={`relative flex flex-col justify-between h-full bg-white/95 backdrop-blur-sm border transition-all duration-300 ${
                    tier.recommended
                      ? 'border-[#164fa9] shadow-xl ring-1 ring-[#164fa9]/25'
                      : 'border-[#203744]/12 hover:border-[#203744]/25 shadow-lg hover:shadow-xl'
                  } pt-4 sm:pt-5 pb-2.5 sm:pb-3 px-0`}
                >
                  {/* Floating Recommended Tier Shimmer Badge */}
                  {tier.recommended && (
                    <div
                      style={{
                        transform: 'translate3d(0, 0, 36px)',
                      }}
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#164fa9] text-white font-mono-tech text-[9px] uppercase tracking-wider font-bold shadow-md flex items-center gap-1.5 z-40 border border-white/30"
                    >
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      <span>Recommended Tier</span>
                    </div>
                  )}

                  {/* Top Area: Title & Subtitle */}
                  <div
                    style={{
                      transform: 'translate3d(0, 0, 24px)',
                    }}
                    className="px-5 text-center mb-1.5"
                  >
                    <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-[#203744]/8">
                      <span className="font-mono-tech text-[9px] uppercase tracking-wider text-[#203744]/55 font-semibold">
                        Curriculum Model
                      </span>
                      <span
                        style={{ color: colors.accent, backgroundColor: `${colors.accent}14` }}
                        className="font-mono-tech text-[8.5px] font-bold px-2 py-0.5 rounded uppercase tracking-wider"
                      >
                        {tier.status}
                      </span>
                    </div>

                    <h3
                      style={{ color: colors.accent }}
                      className="title font-serif-editorial text-xl sm:text-[23px] font-bold tracking-tight mb-0.5"
                    >
                      {tier.name}
                    </h3>
                    <p className="font-sans-modern text-[10.5px] sm:text-[11px] text-[#203744]/75 line-clamp-2 leading-snug min-h-[28px] flex items-center justify-center">
                      {tier.description}
                    </p>
                  </div>

                  {/* 
                    Overlapping Price Ribbon (Hanging off the RIGHT edge)
                    - Margin-right: calc(var(--overlap-size) * -1)
                    - 3D folded corner triangle under right side (clip-path: polygon(0 0, 100% 0, 0 100%))
                  */}
                  <div
                    style={{
                      transform: 'translate3d(0, 0, 30px)',
                    }}
                    className="relative flex justify-end my-1.5"
                  >
                    <div
                      style={{
                        backgroundColor: colors.accent,
                        marginRight: '-1.15rem',
                      }}
                      className="relative z-20 flex items-center gap-2 pl-3.5 pr-4 py-1 text-white shadow-md font-sans-modern"
                    >
                      <div className="flex items-baseline gap-1">
                        <span className="font-serif-editorial text-xl sm:text-[22px] font-black tracking-tight leading-none">
                          <AnimatedCounter to={numericPrice} prefix="₹" />
                        </span>
                        <span className="text-[10px] text-white/90 font-medium tracking-wide">
                          / student
                        </span>
                      </div>
                      <span className="w-[1px] h-3 bg-white/30" />
                      <span className="text-[9px] font-mono-tech uppercase tracking-wider text-white/95 font-semibold">
                        Mo. Billing
                      </span>

                      {/* Underneath Ribbon Fold Triangle (Right Bottom) */}
                      <span
                        aria-hidden="true"
                        style={{
                          backgroundColor: colors.accent,
                          clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                        }}
                        className="absolute right-0 top-full w-3.5 h-3.5 brightness-50"
                      />
                    </div>
                  </div>

                  {/* 
                    Features List (Curated 7 Rows with Compact Proportions)
                  */}
                  <div
                    style={{
                      transform: 'translate3d(0, 0, 18px)',
                    }}
                    className="px-5 my-1.5 flex-1 flex flex-col justify-center"
                  >
                    <span className="font-mono-tech text-[9px] uppercase tracking-wider text-[#203744]/65 font-bold mb-1.5 block">
                      Deliverables &amp; Inclusions:
                    </span>
                    <ul className="features list-none divide-y divide-[#203744]/8 text-left">
                      {features.map((feat, idx) => (
                        <li
                          key={idx}
                          className={`py-1.2 sm:py-1.5 flex items-center gap-2 text-[10.5px] sm:text-[11px] font-sans-modern leading-tight ${
                            feat.checked
                              ? 'text-[#203744] font-medium'
                              : 'text-[#203744]/40 line-through decoration-[#203744]/30'
                          }`}
                        >
                          {feat.checked ? (
                            <span className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-emerald-50 text-emerald-600 shrink-0">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                          ) : (
                            <span className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-rose-50 text-rose-500/70 shrink-0">
                              <X className="w-2.5 h-2.5 stroke-[2.5]" />
                            </span>
                          )}
                          <span className="flex-1 truncate">{feat.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 
                    Overlapping Action Button Ribbon (Hanging off the LEFT edge)
                    - Margin-left: calc(var(--overlap-size) * -1)
                    - 3D folded corner triangle above left side (clip-path: polygon(100% 0, 100% 100%, 0 100%))
                  */}
                  <div
                    style={{
                      transform: 'translate3d(0, 0, 32px)',
                    }}
                    className="relative flex items-center justify-between mt-auto pt-2.5 pb-1"
                  >
                    <button
                      type="button"
                      onClick={() => handleSelect(tier.name)}
                      style={{
                        backgroundColor: colors.accent,
                        marginLeft: '-1.15rem',
                        backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.25) 0)',
                        backgroundSize: '100% 200%',
                      }}
                      className="btn relative z-20 inline-flex items-center gap-1.5 pl-3.5 pr-4 py-1.5 text-white font-mono-tech text-[10.5px] uppercase tracking-wider font-bold shadow-md transition-all duration-200 hover:bg-bottom active:scale-95 cursor-pointer border-none"
                    >
                      <span>Select Tier</span>
                      <ArrowRight className="w-3 h-3" />

                      {/* Above Ribbon Fold Triangle (Left Top) */}
                      <span
                        aria-hidden="true"
                        style={{
                          backgroundColor: colors.accent,
                          clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                        }}
                        className="absolute left-0 bottom-full w-3.5 h-3.5 brightness-50"
                      />
                    </button>

                    <div className="pr-4 text-right">
                      <span className="font-mono-tech text-[8.5px] text-[#203744]/60 block leading-tight">
                        Timetable tailored
                      </span>
                      <span className="font-mono-tech text-[8px] text-[#398BB0] font-semibold block">
                        Per-School Schedule
                      </span>
                    </div>
                  </div>

                </div>
              </Parallax3DCard>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PricingCards;
