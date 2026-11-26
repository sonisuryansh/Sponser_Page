import React, { useRef, useState, useEffect } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { BookOpen, Layers, CheckSquare, Video, ArrowRight, X, CheckCircle2 } from 'lucide-react';

const tileIcons: Record<string, React.ReactNode> = {
  'E-Books': <BookOpen className="w-4 h-4" />,
  Books: <BookOpen className="w-4 h-4" />,
  Modules: <Layers className="w-4 h-4" />,
  Quizzes: <CheckSquare className="w-4 h-4" />,
  Videos: <Video className="w-4 h-4" />,
};

const tileThemeMap: Record<string, { themeClass: string; color: string; bgSoft: string; badgeBorder: string; badgeText: string }> = {
  'E-Books': {
    themeClass: 'resource-theme-amber',
    color: '#D97706',
    bgSoft: '#FEF3C7',
    badgeBorder: 'rgba(217, 119, 6, 0.3)',
    badgeText: '#92400E',
  },
  Books: {
    themeClass: 'resource-theme-amber',
    color: '#D97706',
    bgSoft: '#FEF3C7',
    badgeBorder: 'rgba(217, 119, 6, 0.3)',
    badgeText: '#92400E',
  },
  Modules: {
    themeClass: 'resource-theme-blue',
    color: '#0284C7',
    bgSoft: '#E0F2FE',
    badgeBorder: 'rgba(2, 132, 199, 0.3)',
    badgeText: '#075985',
  },
  Quizzes: {
    themeClass: 'resource-theme-green',
    color: '#059669',
    bgSoft: '#DCFCE7',
    badgeBorder: 'rgba(16, 185, 129, 0.3)',
    badgeText: '#065F46',
  },
  Videos: {
    themeClass: 'resource-theme-purple',
    color: '#7C3AED',
    bgSoft: '#F3E8FF',
    badgeBorder: 'rgba(139, 92, 246, 0.3)',
    badgeText: '#5B21B6',
  },
};

interface ResourceCardContent {
  title: string;
  tag: string;
  frontDescription: string;
  frontHighlights: string[];
  backHeading: string;
  backTag: string;
  backSpecs: { label: string; value: string }[];
  backCapabilities: string[];
  modalSummary: string;
  modalFeatures: string[];
}

const RESOURCE_CARD_DATA: Record<string, ResourceCardContent> = {
  'E-Books': {
    title: 'E-Books & Interactive Workbooks',
    tag: 'WORKBOOK',
    frontDescription: 'Grade-wise digital workbooks that guide each hands-on build.',
    frontHighlights: [
      'Visual hardware pinouts, circuit diagrams & debugging checklists',
      'Step-by-step programming logic flowcharts & syntax walkthroughs',
      'Printable student activity sheets with reflection prompts',
    ],
    backHeading: 'Digital Workbook Architecture',
    backTag: 'SPECIFICATIONS',
    backSpecs: [
      { label: 'Format', value: 'Interactive Digital ePub & PDF' },
      { label: 'Curriculum', value: 'Aligned to NEP 2020 (Grades 3–12)' },
      { label: 'Offline Access', value: '100% Cached on Lab Workstations' },
      { label: 'Teacher Tools', value: 'Pre-annotated Master Answer Keys' },
    ],
    backCapabilities: [
      'Interactive schematic viewers with pin zoom',
      'Downloadable for offline home study',
    ],
    modalSummary: 'Comprehensive grade-tailored workbooks designed as step-by-step companions for hands-on lab builds and independent study.',
    modalFeatures: [
      'Visual hardware pinouts, circuit diagrams, and debugging checklists for every physical build.',
      'Step-by-step programming logic flowcharts and syntax walkthroughs.',
      'Printable student activity sheets with dedicated observation and reflection prompts.',
      'Available as both downloadable offline PDFs and interactive digital workbooks.',
    ],
  },
  Books: {
    title: 'E-Books & Interactive Workbooks',
    tag: 'WORKBOOK',
    frontDescription: 'Grade-wise digital workbooks that guide each hands-on build.',
    frontHighlights: [
      'Visual hardware pinouts, circuit diagrams & debugging checklists',
      'Step-by-step programming logic flowcharts & syntax walkthroughs',
      'Printable student activity sheets with reflection prompts',
    ],
    backHeading: 'Digital Workbook Architecture',
    backTag: 'SPECIFICATIONS',
    backSpecs: [
      { label: 'Format', value: 'Interactive Digital ePub & PDF' },
      { label: 'Curriculum', value: 'Aligned to NEP 2020 (Grades 3–12)' },
      { label: 'Offline Access', value: '100% Cached on Lab Workstations' },
      { label: 'Teacher Tools', value: 'Pre-annotated Master Answer Keys' },
    ],
    backCapabilities: [
      'Interactive schematic viewers with pin zoom',
      'Downloadable for offline home study',
    ],
    modalSummary: 'Comprehensive grade-tailored workbooks designed as step-by-step companions for hands-on lab builds and independent study.',
    modalFeatures: [
      'Visual hardware pinouts, circuit diagrams, and debugging checklists for every physical build.',
      'Step-by-step programming logic flowcharts and syntax walkthroughs.',
      'Printable student activity sheets with dedicated observation and reflection prompts.',
      'Available as both downloadable offline PDFs and interactive digital workbooks.',
    ],
  },
  Modules: {
    title: 'Structured Concept Modules',
    tag: 'SEQUENTIAL',
    frontDescription: 'Short, sequential modules bridging core logic to hardware.',
    frontHighlights: [
      'Modular topic units covering Robotics, AI, Data & Aerial Systems',
      'Structured week-by-week progression synchronized with school calendar',
      'Interactive simulations allowing circuit testing before wiring',
    ],
    backHeading: 'Courseware & Simulation Specs',
    backTag: 'SPECIFICATIONS',
    backSpecs: [
      { label: 'Progression', value: 'Spiral Pacing (Foundations → Systems)' },
      { label: 'Web IDE', value: 'Integrated Block & Text Code Runner' },
      { label: 'Platforms', value: 'Windows, Chromebooks, iPad & Linux' },
      { label: 'Checkpoints', value: 'Automated Milestone Comprehension Checks' },
    ],
    backCapabilities: [
      'Virtual circuit & sensor logic simulation',
      'Direct pairing with physical lab hardware',
    ],
    modalSummary: 'Bite-sized, sequential digital learning modules structured to bridge foundational reasoning with physical prototypes.',
    modalFeatures: [
      'Modular topic units covering Robotics, AI/ML, Data Analytics, and Aerial Systems.',
      'Structured week-by-week progression synchronized with school academic calendars.',
      'Interactive simulations allowing students to test circuits and logic before wiring hardware.',
      'Clear milestone checkpoints that validate comprehension before advancing to complex projects.',
    ],
  },
  Quizzes: {
    title: 'Formative Assessment & Quizzes',
    tag: 'ASSESSMENT',
    frontDescription: 'Quick checks so students and teachers can see what has landed.',
    frontHighlights: [
      'Immediate conceptual feedback following each practical build',
      'Real-world diagnostic problem-solving scenarios without drills',
      'Teacher dashboard analytics to spot learning gaps in real time',
    ],
    backHeading: 'Formative Evaluation Engine',
    backTag: 'SPECIFICATIONS',
    backSpecs: [
      { label: 'Assessment Mode', value: 'Formative Diagnostic Reinforcement' },
      { label: 'Grading Engine', value: 'Instant Automated Evaluation (0 Teacher Load)' },
      { label: 'Analytics', value: 'Class Mastery Heatmap Dashboard' },
      { label: 'Remediation', value: 'Dynamic Conceptual Hint Loops' },
    ],
    backCapabilities: [
      'Identifies concept blindspots before next session',
      'Exportable term progress reports for schools',
    ],
    modalSummary: 'Low-stakes, real-time diagnostic checks that empower teachers and help students reflect on their learning without exam anxiety.',
    modalFeatures: [
      'Immediate conceptual feedback following each practical laboratory build.',
      'Real-world diagnostic problem-solving scenarios rather than memorization drills.',
      'Teacher dashboard analytics to spot learning gaps and adapt classroom mentoring.',
      'Milestone achievement badges celebrating algorithmic thinking and engineering resilience.',
    ],
  },
  Videos: {
    title: 'Demonstration & Explainer Videos',
    tag: 'MEDIA',
    frontDescription: 'Short explainers and demonstrations to revisit in class or home.',
    frontHighlights: [
      'Close-up hardware assembly tutorials clarifying delicate wiring',
      'Micro-concept explainers (2–4 mins) ideal for quick revision',
      'Industry spotlights demonstrating classroom principles in aerospace & AI',
    ],
    backHeading: 'Media Library & Streaming Specs',
    backTag: 'SPECIFICATIONS',
    backSpecs: [
      { label: 'Resolution', value: 'Full HD 1080p Multi-Angle Macro Camera' },
      { label: 'Length', value: '2 to 4 min Focused Micro-Modules' },
      { label: 'Streaming', value: 'On-Demand Cloud & School LAN Cache' },
      { label: 'Accessibility', value: 'Chapter Indexed with English Subtitles' },
    ],
    backCapabilities: [
      'Designed for teacher in-class pause-and-build flow',
      'Step-by-step visual safety checklists',
    ],
    modalSummary: 'High-definition video walkthroughs and real-world technology demonstrations accessible anywhere, anytime.',
    modalFeatures: [
      'Close-up hardware assembly tutorials clarifying delicate wiring and sensor alignments.',
      'Micro-concept explainers (2–4 mins) ideal for quick revision before lab sessions.',
      'Industry spotlights demonstrating how classroom principles power real-world aerospace and AI.',
      'Accessible on-demand on school tablets, lab workstations, or at home.',
    ],
  },
};

export const ResourcesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<HTMLDivElement>(null);
  const [selectedTile, setSelectedTile] = useState<string | null>(null);
  const [flippedTile, setFlippedTile] = useState<string | null>(null);

  // Close modal or flip on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedTile) {
          setSelectedTile(null);
        } else if (flippedTile) {
          setFlippedTile(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedTile, flippedTile]);

  const activeDetail = selectedTile ? RESOURCE_CARD_DATA[selectedTile] || RESOURCE_CARD_DATA['E-Books'] : null;

  return (
    <ChapterShell
      id="resources"
      chapterNumber="09"
      theme="light"
      fullBleed={true}
      className="relative w-full h-[100svh] overflow-hidden bg-[#FAF6EE] select-none"
    >
      {/* 100svh Viewport Container */}
      <div
        ref={containerRef}
        className="relative w-full h-full min-h-full flex-1 flex flex-col justify-center items-center pt-[calc(var(--header-h,64px)+2px)] pb-2 sm:pb-3 px-4 sm:px-6 lg:px-8 xl:px-10 box-border select-none z-10 max-w-[1440px] mx-auto overflow-hidden"
      >
        {/* Main Inset White/Creamish Panel */}
        <div className="relative w-full h-full flex-1 bg-[#FFFFFD] shadow-[0_12px_40px_rgba(0,0,0,0.05)] border border-black/8 rounded-2xl flex flex-col justify-between p-3 sm:p-4 lg:p-4.5 box-border z-10 overflow-hidden">

          {/* Eyebrow & Headline Header (Centered) */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-2 pb-1.5 border-b border-black/8">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="h-[1px] w-6 sm:w-8 bg-[#b45309]/50" />
              <span className="font-mono text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#b45309]">
                {siteConfig.resources.eyebrow}
              </span>
              <span className="h-[1px] w-6 sm:w-8 bg-[#b45309]/50" />
            </div>
            <h2 className="font-serif text-xl sm:text-2xl lg:text-[27px] font-bold leading-tight tracking-tight text-[#0F172A] mb-0.5 text-center">
              {siteConfig.resources.headline}
            </h2>
            <p className="text-[11px] sm:text-xs text-[#555555] font-sans max-w-2xl mx-auto leading-snug mb-1.5 line-clamp-2">
              {siteConfig.resources.paragraph}
            </p>

            {!siteConfig.confirm.lmsReady && (
              <div className="px-2.5 py-0.5 bg-[#FAF9F6] border border-black/10 text-[#666666] text-[9.5px] sm:text-[10px] font-mono uppercase tracking-wider rounded-[2px]">
                {siteConfig.resources.statusNotice}
              </div>
            )}
          </div>

          {/* 4 Interactive Resource Cards Grid with 3D Book Cover Open Effect */}
          <div
            ref={tilesRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 flex-1 items-stretch my-1.5 sm:my-2 min-h-0"
          >
            {siteConfig.resources.tiles.map((tile) => {
              const detail = RESOURCE_CARD_DATA[tile.title] || RESOURCE_CARD_DATA['E-Books'];
              const theme = tileThemeMap[tile.title] || tileThemeMap['E-Books'];
              const isFlipped = flippedTile === tile.title;

              return (
                <div
                  key={tile.title}
                  className={`resource-flip-wrapper resource-tile ${theme.themeClass}`}
                >
                  <div
                    onClick={() => setFlippedTile(isFlipped ? null : tile.title)}
                    className={`resource-flip-card group ${isFlipped ? 'is-flipped' : ''}`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setFlippedTile(isFlipped ? null : tile.title);
                      }
                    }}
                    aria-label={`Toggle ${tile.title} details`}
                  >
                    {/* Front Face (Cover) */}
                    <div className="resource-flip-face resource-flip-front select-none flex flex-col justify-between">
                      <div>
                        {/* Icon & Category Tag */}
                        <div className="flex items-center justify-between mb-2 sm:mb-2.5">
                          <div className="resource-icon-box w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border rounded-[3px] shadow-2xs transition-colors">
                            {tileIcons[tile.title] || <BookOpen className="w-4 h-4" />}
                          </div>
                          <span className="resource-tag-badge text-[8.5px] sm:text-[9px] font-mono uppercase tracking-widest font-semibold px-2 py-0.5 rounded-[2px]">
                            {tile.tag}
                          </span>
                        </div>

                        {/* Tile Title */}
                        <h3 className="resource-tile-title font-serif text-lg sm:text-[20px] font-bold tracking-tight mb-1 transition-colors">
                          {tile.title}
                        </h3>

                        {/* Tile Description */}
                        <p className="resource-tile-desc text-[11px] sm:text-[11.5px] leading-snug line-clamp-2 mb-2">
                          {tile.description}
                        </p>

                        {/* Highlights list on front face */}
                        <div className="pt-2 border-t border-black/5 flex flex-col gap-1.5 text-[10px] sm:text-[10.5px] text-[#475569]">
                          {detail.frontHighlights.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-1.5 leading-snug">
                              <span className="w-1.5 h-1.5 rounded-full mt-1 shrink-0 bg-[#c8a45d]" />
                              <span className="line-clamp-2">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Open Affordance */}
                      <div className="resource-bottom-bar flex items-center justify-between text-[9.5px] sm:text-[10px] font-mono uppercase tracking-wider font-bold pt-2 border-t mt-auto transition-colors">
                        <span>Click for specs</span>
                        <span className="text-xs">↻</span>
                      </div>
                    </div>

                    {/* Back Face (Inside Specs Page — COMPLETELY DISTINCT FROM FRONT) */}
                    <div className="resource-flip-face resource-flip-back select-none flex flex-col justify-between">
                      <div className="flex-1 flex flex-col justify-between min-h-0">
                        {/* Back Top Tag & Badge */}
                        <div className="flex items-center justify-between mb-1 pb-1 border-b border-black/5 flex-none">
                          <span className="resource-back-tag font-mono text-[9px] uppercase tracking-wider font-bold">
                            Inside {tile.title}
                          </span>
                          <span className="text-[8px] sm:text-[8.5px] font-mono font-bold text-[#b45309] bg-amber-50 border border-amber-200/80 px-1.5 py-0.2 rounded-[2px]">
                            {detail.backTag}
                          </span>
                        </div>

                        {/* Back Heading */}
                        <h4 className="font-serif text-[12.5px] sm:text-[13.5px] font-bold text-[#111111] leading-tight mb-1 flex-none">
                          {detail.backHeading}
                        </h4>

                        {/* 4 Specifications Rows (Key-Value Table) */}
                        <div className="space-y-1 my-1 py-1 border-y border-black/5 flex-1 flex flex-col justify-around">
                          {detail.backSpecs.map((spec, sIdx) => (
                            <div key={sIdx} className="flex items-center justify-between text-[8.5px] sm:text-[9.5px] leading-tight gap-1">
                              <span className="font-mono text-slate-400 font-semibold uppercase tracking-wider shrink-0 text-[8px] sm:text-[8.5px]">
                                {spec.label}:
                              </span>
                              <span className="font-sans font-semibold text-slate-800 text-right truncate">
                                {spec.value}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Institutional Capabilities */}
                        <div className="space-y-0.5 flex-none pt-0.5">
                          {detail.backCapabilities.map((cap, cIdx) => (
                            <div key={cIdx} className="flex items-center gap-1.5 text-[8.5px] sm:text-[9.5px] text-slate-600 font-sans leading-tight">
                              <span className="resource-back-dot w-1 h-1 rounded-full shrink-0" />
                              <span className="truncate">{cap}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Action CTA */}
                      <div className="resource-back-cta flex items-center justify-between pt-2 border-t border-black/5 mt-auto flex-none gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFlippedTile(null);
                          }}
                          className="font-mono text-[8.5px] sm:text-[9px] uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                        >
                          ↻ Flip back
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTile(tile.title);
                          }}
                          className="flex items-center gap-1 font-mono text-[9px] sm:text-[9.5px] uppercase tracking-wider font-bold text-[#b45309] hover:underline cursor-pointer"
                        >
                          <span>Full Specs</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Card Footer Strip */}
          <div className="pt-3.5 mt-4 border-t border-black/8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#888888] gap-2">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8a45d]" />
              <span>Digital Learning Platform & Classroom Support Assets</span>
            </span>
            <span>Accessible in School Lab & At Home</span>
          </div>
        </div>
      </div>

      {/* Interactive Detail Modal for Selected Resource */}
      {selectedTile && activeDetail && (() => {
        const modalTheme = tileThemeMap[selectedTile] || tileThemeMap['E-Books'];
        return (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setSelectedTile(null)}
          >
            <div
              className="relative w-full max-w-2xl bg-[#FFFFFD] border border-black/15 shadow-2xl rounded-[4px] p-6 sm:p-8 overflow-hidden select-text"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Modal Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-black/8 mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 flex items-center justify-center border rounded-[3px]"
                    style={{
                      backgroundColor: modalTheme.bgSoft,
                      borderColor: modalTheme.badgeBorder,
                      color: modalTheme.color,
                    }}
                  >
                    {tileIcons[selectedTile] || <BookOpen className="w-5 h-5" />}
                  </div>
                  <div>
                    <span
                      className="font-mono text-[10px] uppercase tracking-widest font-bold block"
                      style={{ color: modalTheme.color }}
                    >
                      {activeDetail.tag}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-[26px] font-medium text-[#111111] leading-tight">
                      {activeDetail.title}
                    </h3>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedTile(null)}
                  className="p-1.5 text-[#666666] hover:text-[#111111] bg-black/5 hover:bg-black/10 rounded-full transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Summary Description */}
              <p className="font-sans text-xs sm:text-[13px] text-[#444444] leading-relaxed mb-5">
                {activeDetail.modalSummary}
              </p>

              {/* Key Features Bullet List */}
              <div className="mb-5">
                <span className="font-mono text-[9.5px] uppercase tracking-widest text-[#888888] font-bold block mb-2.5">
                  Key Components & Student Value
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeDetail.modalFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#FAF9F6] border border-black/6 rounded-[3px] flex items-start gap-2.5"
                    >
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: modalTheme.color }}
                      />
                      <span className="font-sans text-xs text-[#333333] leading-relaxed">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Specs Strip */}
              <div className="pt-4 border-t border-black/8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {activeDetail.backSpecs.map((spec, idx) => (
                  <div key={idx}>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#888888] block mb-1">
                      {spec.label}
                    </span>
                    <span className="font-sans text-xs font-semibold text-[#111111] block">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })()}
    </ChapterShell>
  );
};

export default ResourcesSection;
