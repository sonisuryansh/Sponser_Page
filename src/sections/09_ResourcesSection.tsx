import React from 'react';
import { siteConfig } from '../config/content.config';
import { BookOpen, Layers, CheckSquare, Video } from 'lucide-react';

const tileIcons: Record<string, React.ReactNode> = {
  Books: <BookOpen className="w-5 h-5" />,
  Modules: <Layers className="w-5 h-5" />,
  Quizzes: <CheckSquare className="w-5 h-5" />,
  Videos: <Video className="w-5 h-5" />,
};

export const ResourcesSection: React.FC = () => {
  return (
    <section
      id="resources"
      data-chapter="09"
      className="relative w-full min-h-screen py-24 md:py-32 flex items-center bg-[#ffffff] text-[#111111] snap-start"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        {/* Eyebrow & Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 border-b border-black/10 pb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-3">
              {siteConfig.resources.eyebrow}
            </div>
            <h2 className="font-serif text-[clamp(32px,4vw,56px)] font-normal leading-[1.14] tracking-tight text-[#111111] mb-2">
              {siteConfig.resources.headline}
            </h2>
            <p className="text-lg text-[#5b5b5b] font-sans">
              {siteConfig.resources.paragraph}
            </p>
          </div>

          {/* Status notice when lmsReady is false */}
          {!siteConfig.confirm.lmsReady && (
            <div className="px-3.5 py-1.5 bg-[#fafafa] border border-black/15 text-[#5b5b5b] text-xs font-mono uppercase tracking-wider rounded-[2px] self-start md:self-end">
              {siteConfig.resources.statusNotice}
            </div>
          )}
        </div>

        {/* Four Large Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {siteConfig.resources.tiles.map((tile) => (
            <div
              key={tile.title}
              className="p-7 bg-[#fafafa] border border-black/10 rounded-[2px] flex flex-col justify-between h-[240px] hover:border-black/30 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-black/10 bg-white rounded-[2px] text-[#111111]">
                    {tileIcons[tile.title]}
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#5b5b5b]">
                    {tile.tag}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-medium tracking-tight text-[#111111] mb-2">
                  {tile.title}
                </h3>
              </div>
              <p className="text-sm text-[#5b5b5b] leading-relaxed">
                {tile.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mock-up Platform Interface Screenshot Labelled "Preview" */}
        <div className="relative aspect-[21/9] rounded-[2px] overflow-hidden border border-black/10 bg-[#f4f7f9]">
          <img
            src={siteConfig.resources.previewImage}
            alt="MedhaArc Labs Learning Platform Interface"
            className="w-full h-full object-cover filter brightness-[0.97]"
          />
          <div className="absolute top-4 left-4 px-2.5 py-1 bg-black text-white text-[10px] font-mono uppercase tracking-[0.2em] rounded-[2px]">
            Preview
          </div>
          <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-xs text-xs font-mono text-[#5b5b5b] rounded-[2px] border border-black/5">
            Grade-by-Grade Curriculum Materials
          </div>
        </div>
      </div>
    </section>
  );
};
