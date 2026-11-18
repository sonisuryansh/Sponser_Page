import React from 'react';
import { siteConfig } from '../config/content.config';
import { Check } from 'lucide-react';

interface PricingSectionProps {
  onOpenContact: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenContact }) => {
  return (
    <section
      id="pricing"
      data-chapter="13"
      className="relative w-full min-h-screen py-24 md:py-32 flex items-center bg-[#ffffff] text-[#111111] border-t border-black/5 snap-start"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        {/* Eyebrow & Headline */}
        <div className="mb-14 max-w-3xl">
          <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-3">
            {siteConfig.pricing.eyebrow}
          </div>
          <h2 className="font-serif text-[clamp(32px,4vw,56px)] font-normal leading-[1.14] tracking-tight text-[#111111] mb-2">
            {siteConfig.pricing.headline}
          </h2>
          <p className="text-base text-[#5b5b5b] font-mono uppercase tracking-wider">
            {siteConfig.pricing.label}
          </p>
        </div>

        {/* Pricing Cards (3 Tiers, No "Recommended" tag, No "Select tier" buttons) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-black/10 pt-10 mb-12">
          {siteConfig.pricing.tiers.map((tier) => (
            <div
              key={tier.id}
              className="p-8 bg-[#fafafa] border border-black/10 rounded-[2px] flex flex-col justify-between hover:border-black/30 transition-colors"
            >
              <div>
                <span className="text-xs uppercase tracking-[0.18em] text-[#5b5b5b] font-mono">
                  Package
                </span>
                <h3 className="font-serif text-3xl font-medium tracking-tight text-[#111111] mt-2 mb-4">
                  {tier.name}
                </h3>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-serif text-4xl sm:text-5xl font-light text-[#111111]">
                    {tier.price}
                  </span>
                  <span className="text-xs uppercase font-mono tracking-wider text-[#5b5b5b]">
                    {tier.cadence}
                  </span>
                </div>

                <p className="text-sm font-medium text-[#111111] pb-6 border-b border-black/10 mb-6">
                  {tier.summary}
                </p>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-[#5b5b5b]">
                      <Check className="w-4 h-4 text-black shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quiet Underline-Draw Text Link for School Inquiries */}
              <button
                onClick={onOpenContact}
                className="text-left text-xs uppercase tracking-[0.18em] text-[#111111] hover:text-[#c8a45d] transition-colors relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-current after:origin-left hover:after:scale-x-100 after:scale-x-0 after:transition-transform cursor-pointer"
              >
                Inquire about {tier.name} tier →
              </button>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <div className="p-5 border border-black/10 bg-[#fafafa] rounded-[2px] text-xs text-[#5b5b5b] leading-relaxed max-w-4xl">
          <p>
            {siteConfig.pricing.footnote}
            {siteConfig.confirm.pricingFootnoteExtra && ` ${siteConfig.confirm.pricingFootnoteExtra}`}
          </p>
        </div>
      </div>
    </section>
  );
};
