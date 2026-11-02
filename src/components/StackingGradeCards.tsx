import React, { useRef, useState, useCallback } from 'react';
import { Sparkles, Layers, ArrowUpRight, GraduationCap } from 'lucide-react';
import { GRADE_LEVELS } from '../data/slidesData';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

// 7 Progressive Grade Card Configurations matching curriculum and real assets
// High-contrast, vibrant palette mirroring the reference deck (Blue, Purple, Orange, Teal, Amber, Rose, Indigo)
const GRADE_CARD_CONFIG: {
  accent: string;
  image: string;
  schoolGroup: string;
  badgeTag: string;
}[] = [
  {
    accent: '#0284c7', // Vibrant Blue (Grade 5-6)
    image: '/assets/page_10.jpg',
    schoolGroup: 'Middle School',
    badgeTag: 'Circuits & Sensors',
  },
  {
    accent: '#7c3aed', // Vibrant Royal Purple (Grade 7)
    image: '/assets/page_11.jpg',
    schoolGroup: 'Middle School',
    badgeTag: 'Python & Hardware',
  },
  {
    accent: '#ea580c', // Vibrant Orange (Grade 8)
    image: '/assets/page_12.jpg',
    schoolGroup: 'Middle School',
    badgeTag: 'Robotics Actuation',
  },
  {
    accent: '#0d9488', // Vibrant Teal (Grade 9)
    image: '/assets/page_13.jpg',
    schoolGroup: 'High School',
    badgeTag: 'IoT Telemetry & CAD',
  },
  {
    accent: '#d97706', // Vibrant Amber (Grade 10)
    image: '/assets/laptop_analytics.jpg',
    schoolGroup: 'High School',
    badgeTag: 'Visual Analytics',
  },
  {
    accent: '#e11d48', // Vibrant Crimson (Grade 11)
    image: '/assets/page_14.jpg',
    schoolGroup: 'High School',
    badgeTag: 'Machine Intelligence',
  },
  {
    accent: '#4f46e5', // Vibrant Indigo (Grade 12)
    image: '/assets/students_robotics.jpg',
    schoolGroup: 'High School',
    badgeTag: 'Integrated Capstone',
  },
];

export const StackingGradeCards: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Smoothly track active card index as user scrolls through the deck
  const handleStackProgress = useCallback((_firstCover: number, activeIdx: number) => {
    setActiveCardIndex(activeIdx);
  }, []);

  return (
    <div className="relative w-full bg-[#DFE6E7] tech-subtle-grid pt-6 sm:pt-8 pb-20">
      {/* 
        Section Header:
        - In normal document flow with a generous breathing gap above the card deck
        - Zero collision: as the user scrolls, the header moves naturally and smoothly above the viewport
        - Card 0 then pins cleanly at stackPosition without any overlap or text obstruction
      */}
      <div
        ref={headerRef}
        className="relative z-10 text-center mb-8 sm:mb-12 shrink-0 max-w-2xl mx-auto px-4 select-none"
      >
        <h2 className="font-didone-bodoni text-2xl sm:text-3xl lg:text-[34px] xl:text-[36px] font-bold text-[#63340b] tracking-tight leading-tight">
          Grade-Wise Technology <span className="italic font-semibold text-[#d97706]">Learning Path</span>
        </h2>

        <p className="font-sans-modern text-xs sm:text-[13px] text-[#203744]/75 mt-2 max-w-xl mx-auto font-normal leading-normal">
          Multi-year progression guiding students from foundational logic to autonomous robotics, physical computing, and applied machine intelligence.
        </p>
      </div>

      {/* 
        React Bits ScrollStack Stage:
        - Centered stack positioning: vertically and horizontally centered in the viewport
        - Balanced, focused card aspect ratio (max-w-[880px] instead of ultra-wide 1320px)
        - Square-leaning, tight, cohesive card proportions without looking awkwardly narrow
        - Generous surrounding mineral margins for focused readability
      */}
      <div className="relative w-full max-w-[880px] 2xl:max-w-[920px] mx-auto px-3 sm:px-4">
        <ScrollStack
          useWindowScroll={true}
          smoothScroll={false}
          stackPosition="center"
          itemStackDistance={16}
          itemDistance={180}
          itemScale={0.024}
          baseScale={0.88}
          dimAmount={0.16}
          tiltAmount={1.2}
          rotationAmount={0}
          holdDistance={260}
          onStackProgress={handleStackProgress}
          className="w-full"
        >
          {GRADE_LEVELS.map((level, i) => {
            const config = GRADE_CARD_CONFIG[i];
            const isActive = activeCardIndex === i;

            return (
              <ScrollStackItem
                key={level.grade}
                itemClassName="rounded-2xl overflow-hidden shadow-2xl !p-0 !h-auto !bg-transparent !shadow-none"
              >
                {/* 
                  Focused Card Frame:
                  - Height: 395px-425px, perfectly centered on any viewport
                  - High-contrast, pristine white card body with solid colored banner
                  - Enhanced drop shadow on active front card
                */}
                <div
                  className={`card-inner-deck relative w-full h-[395px] sm:h-[415px] lg:h-[425px] rounded-2xl bg-white/98 backdrop-blur-md border ${
                    isActive ? 'border-[#203744]/25 shadow-2xl ring-1 ring-[#203744]/10' : 'border-[#203744]/15 shadow-xl'
                  } flex flex-col justify-between overflow-hidden select-none transition-shadow duration-300`}
                >
                  {/* Solid Colored Header Banner */}
                  <div
                    style={{ backgroundColor: config.accent }}
                    className="w-full h-[34px] sm:h-[36px] px-4 sm:px-6 rounded-t-2xl flex items-center justify-between text-white shrink-0 shadow-xs"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                      <span className="font-mono-tech text-[10px] sm:text-[11px] font-black tracking-wider uppercase bg-white/20 px-2 py-0.5 rounded text-white shadow-2xs">
                        {level.grade}
                      </span>
                      <span className="font-serif-editorial text-xs sm:text-sm lg:text-base font-bold tracking-tight text-white drop-shadow-xs">
                        {level.stage}
                      </span>
                      <span className="text-white/40 hidden sm:inline">•</span>
                      <span className="font-mono-tech text-[9.5px] sm:text-[10px] uppercase tracking-wider text-white/85 font-medium hidden sm:inline">
                        {config.schoolGroup} // {config.badgeTag}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono-tech text-[10px] sm:text-xs text-white/90 font-bold bg-white/15 px-2 py-0.5 rounded-full">
                        0{i + 1} / 07
                      </span>
                    </div>
                  </div>

                  {/* Card Body: 2-Column Split Optimized for Focused Square/Compact Proportions */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-4 lg:gap-5 items-center flex-1 px-5 sm:px-6 lg:px-7 py-2.5 sm:py-3 overflow-hidden">
                    {/* Left Column (7 cols): Stage Name, Focus, Outcome Box, Topics */}
                    <div className="md:col-span-7 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          style={{ color: config.accent }}
                          className="font-mono-tech text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider"
                        >
                          Curriculum Level • {config.badgeTag}
                        </span>
                      </div>

                      <h3 className="font-didone-bodoni text-lg sm:text-xl lg:text-[22px] font-bold text-[#203744] tracking-tight leading-tight">
                        {level.stage}
                      </h3>

                      <p className="font-sans-modern text-[11px] sm:text-xs text-[#203744]/80 leading-normal mt-0.5 font-normal line-clamp-2">
                        {level.focus}
                      </p>

                      {/* Learning Outcome Pill Box */}
                      <div className="p-2 sm:p-2.5 rounded-xl bg-[#F7F9F9] border border-[#203744]/10 mt-1.5 shadow-2xs">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <Sparkles className="w-3 h-3" style={{ color: config.accent }} />
                          <span
                            className="font-mono-tech text-[9px] uppercase tracking-wider font-bold"
                            style={{ color: config.accent }}
                          >
                            Learning Outcome
                          </span>
                        </div>
                        <p className="font-serif-editorial text-[11px] sm:text-xs italic text-[#203744]/95 font-medium leading-snug">
                          "{level.outcome}"
                        </p>
                      </div>

                      {/* 4 Core Curriculum Topics */}
                      <div className="mt-1.5">
                        <span className="font-mono-tech text-[8.5px] uppercase tracking-wider text-[#203744]/60 font-bold mb-1 block">
                          Curriculum Modules &amp; Laboratory Work:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {level.topics.map((topic) => (
                            <div
                              key={topic}
                              className="flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-md bg-white border border-[#203744]/8 text-[10px] sm:text-[10.5px] font-sans-modern text-[#203744]/85 shadow-3xs"
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full shrink-0"
                                style={{ backgroundColor: config.accent }}
                              />
                              <span className="truncate">{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column (5 cols): Taller, Prominent Framed Image with Hover Effects */}
                    <div className="md:col-span-5 flex justify-center items-center h-full">
                      <div className="relative w-full h-[165px] sm:h-[185px] lg:h-[200px] rounded-xl overflow-hidden border border-[#203744]/15 shadow-md group/img cursor-pointer">
                        <img
                          src={config.image}
                          alt={`${level.grade} - ${level.stage}`}
                          className="w-full h-full object-cover will-change-transform filter grayscale group-hover/img:grayscale-0 scale-105 group-hover/img:scale-100 transition-all duration-700 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                        {/* Image Caption Pill Overlay */}
                        <div className="absolute bottom-2 left-2 right-2 text-white flex items-end justify-between">
                          <div>
                            <span
                              className="font-mono-tech text-[8.5px] uppercase tracking-wider font-bold block mb-0.5"
                              style={{ color: config.accent }}
                            >
                              {level.grade} Lab Platform
                            </span>
                            <span className="font-serif-editorial text-[10.5px] sm:text-xs italic text-white/95 line-clamp-1">
                              {level.stage}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 font-mono-tech text-[8.5px] text-white/90 bg-white/15 backdrop-blur-xs px-1.5 py-0.5 rounded-full border border-white/20">
                            <GraduationCap className="w-2.5 h-2.5 text-white/90" />
                            <span>K-12</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Ticker */}
                  <div className="px-5 sm:px-6 lg:px-7 py-1.5 sm:py-2 border-t border-[#203744]/8 flex items-center justify-between text-[9px] sm:text-[9.5px] font-mono-tech text-[#203744]/60 bg-[#FAFCFC] shrink-0">
                    <span className="uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3 h-3 text-[#286D8B]" />
                      Multi-Year Continuous Progression
                    </span>
                    <span className="font-semibold text-[#286D8B] flex items-center gap-1">
                      <span>Explore Stage Details</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>
      </div>
    </div>
  );
};

export default StackingGradeCards;
