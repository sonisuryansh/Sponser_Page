import React from 'react';
import { siteConfig } from '../config/content.config';
import { Wrench, Box, Award, Trophy, FolderKanban } from 'lucide-react';

const benefitIcons: Record<string, React.ReactNode> = {
  Wrench: <Wrench className="w-5 h-5" />,
  Box: <Box className="w-5 h-5" />,
  Award: <Award className="w-5 h-5" />,
  Trophy: <Trophy className="w-5 h-5" />,
  FolderKanban: <FolderKanban className="w-5 h-5" />,
};

export const BenefitsSection: React.FC = () => {
  return (
    <section
      id="benefits"
      data-chapter="11"
      className="relative w-full min-h-screen py-24 md:py-32 flex items-center bg-[#ffffff] text-[#111111] border-t border-black/5 snap-start"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        {/* Eyebrow & Headline */}
        <div className="mb-14 max-w-3xl">
          <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-3">
            {siteConfig.benefits.eyebrow}
          </div>
          <h2 className="font-serif text-[clamp(32px,4vw,56px)] font-normal leading-[1.14] tracking-tight text-[#111111] mb-3">
            {siteConfig.benefits.headline}
          </h2>
          <p className="text-lg md:text-xl text-[#5b5b5b] font-serif italic">
            &ldquo;{siteConfig.benefits.schoolLine}&rdquo;
          </p>
        </div>

        {/* Five Large Cards: Skills, Projects, Certificates, Competitions, Portfolios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 border-t border-black/10 pt-10">
          {siteConfig.benefits.cards.map((card, idx) => (
            <div
              key={card.title}
              className="p-6 bg-[#fafafa] border border-black/10 rounded-[2px] flex flex-col justify-between h-[280px] hover:border-black/30 transition-all hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 flex items-center justify-center border border-black/10 bg-white rounded-[2px] text-[#111111]">
                    {benefitIcons[card.icon]}
                  </div>
                  <span className="text-xs font-mono text-[#5b5b5b]">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-medium tracking-tight text-[#111111] mb-2">
                  {card.title}
                </h3>
              </div>

              <p className="text-sm text-[#5b5b5b] leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
