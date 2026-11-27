import React, { useRef, useState, useEffect } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { BookOpen, Layers, CheckSquare, Video, ArrowRight, X, CheckCircle2, Users } from 'lucide-react';

const tileIcons: Record<string, React.ReactNode> = {
  'E-Books': <BookOpen className="w-5 h-5" />,
  Books: <BookOpen className="w-5 h-5" />,
  Modules: <Layers className="w-5 h-5" />,
  Quizzes: <CheckSquare className="w-5 h-5" />,
  Videos: <Video className="w-5 h-5" />,
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
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const tilesRef = useRef<HTMLDivElement>(null);
  const [selectedTile, setSelectedTile] = useState<string | null>(null);
  const [flippedTile, setFlippedTile] = useState<string | null>(null);
  const [hoveredTile, setHoveredTile] = useState<string | null>(null);

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

  const handleScrollToNext = () => {
    window.dispatchEvent(new CustomEvent('go-to-slide', { detail: 10 }));
  };

  const activeDetail = selectedTile ? RESOURCE_CARD_DATA[selectedTile] || RESOURCE_CARD_DATA['E-Books'] : null;

  return (
    <ChapterShell
      id="resources"
      chapterNumber="10"
      theme="light"
      fullBleed={true}
      className="relative w-full min-h-[100svh] lg:h-[100svh] overflow-y-auto lg:overflow-hidden select-none bg-[#FAF6EE]"
    >
      {/* Main Viewport Container (Centered in 100svh window, matching Section 11 exactly) */}
      <div
        ref={containerRef}
        className="relative w-full h-full min-h-full flex-1 flex flex-col justify-between items-center pt-[calc(var(--header-h,64px)+6px)] pb-3 sm:pb-4 px-4 sm:px-6 lg:px-8 xl:px-10 box-border select-none z-10 max-w-[1440px] mx-auto overflow-hidden"
      >
        {/* Top Header: Eyebrow with gold accent lines, Serif Title, Subtitle & Status Notice */}
        <div className="flex-none max-w-4xl mx-auto text-center flex flex-col items-center mb-1.5 sm:mb-2">
          <div className="editorial-reveal flex items-center justify-center gap-2.5 mb-1">
            <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#b45309]" />
            <span className="font-mono text-[10.5px] sm:text-[11.5px] uppercase tracking-[0.24em] text-[#b45309] font-bold">
              {siteConfig.resources.eyebrow}
            </span>
            <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#b45309]" />
          </div>

          <h2
            ref={headlineRef}
            className="editorial-reveal font-serif text-2xl sm:text-3xl lg:text-[36px] xl:text-[40px] font-bold leading-tight tracking-tight text-[#0F172A] mb-1 text-center"
          >
            {siteConfig.resources.headline}
          </h2>

          <p className="editorial-reveal font-sans text-[12.5px] sm:text-[13.5px] text-[#475569] leading-relaxed max-w-3xl text-center font-normal mb-1.5">
            {siteConfig.resources.paragraph}
          </p>

          {!siteConfig.confirm.lmsReady && (
            <div className="editorial-reveal inline-flex items-center gap-1.5 px-3 py-0.5 bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] text-[10px] sm:text-[10.5px] font-mono uppercase tracking-wider rounded-full font-bold shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] animate-pulse" />
              <span>{siteConfig.resources.statusNotice}</span>
            </div>
          )}
        </div>

        {/* 4 Distinct Colorful Resource Cards (Matching Section 11 proportions + 3D Flip Turn-Around) */}
        <div className="editorial-reveal w-full self-stretch flex-none my-1 flex flex-col justify-center min-h-0">
          <div
            ref={tilesRef}
            className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-3.5 xl:gap-4 items-stretch"
          >
            {siteConfig.resources.tiles.map((tile, idx) => {
              const detail = RESOURCE_CARD_DATA[tile.title] || RESOURCE_CARD_DATA['E-Books'];
              const theme = tileThemeMap[tile.title] || tileThemeMap['E-Books'];
              const isFlipped = flippedTile === tile.title || hoveredTile === tile.title;

              return (
                <div
                  key={tile.title}
                  onMouseEnter={() => setHoveredTile(tile.title)}
                  onMouseLeave={() => setHoveredTile(null)}
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
                      <div className="flex flex-col h-full">
                        {/* Top Rounded Icon Box & Category Tag */}
                        <div className="flex items-center justify-between mb-2 sm:mb-2.5">
                          <div className="resource-icon-box w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center border shadow-2xs transition-colors">
                            {tileIcons[tile.title] || <BookOpen className="w-5 h-5" />}
                          </div>
                          <span className="resource-tag-badge text-[9.5px] sm:text-[10px] font-mono uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-full border">
                            {tile.tag}
                          </span>
                        </div>

                        {/* Tile Title */}
                        <h3 className="resource-tile-title font-serif text-[19px] sm:text-[20px] lg:text-[21px] font-bold text-[#0F172A] tracking-tight mb-1.5 leading-tight transition-colors">
                          {tile.title}
                        </h3>

                        {/* Tile Description */}
                        <p className="resource-tile-desc font-sans text-[12.5px] sm:text-[13px] text-[#475569] leading-snug line-clamp-2 mb-2 font-normal">
                          {tile.description}
                        </p>

                        {/* Highlights list on front face */}
                        <div className="pt-2 border-t border-black/5 flex flex-col gap-1 text-[11px] sm:text-[11.5px] text-[#1E293B] font-medium">
                          {detail.frontHighlights.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-1.5 leading-snug">
                              <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-[#c8a45d]" />
                              <span className="line-clamp-2">{feat}</span>
                            </div>
                          ))}
                        </div>

                        {/* Bottom Open Affordance */}
                        <div className="resource-bottom-bar flex items-center justify-between text-[11px] sm:text-[11.5px] font-mono uppercase tracking-wider font-bold pt-2 border-t border-black/5 mt-auto transition-colors">
                          <span>Hover for specs</span>
                          <span className="text-xs">↻</span>
                        </div>
                      </div>
                    </div>

                    {/* Back Face (Inside Specs Page) */}
                    <div className="resource-flip-face resource-flip-back select-none flex flex-col justify-between">
                      <div className="flex-1 flex flex-col justify-between min-h-0">
                        {/* Back Top Tag & Badge */}
                        <div className="flex items-center justify-between pb-1 mb-1 border-b border-black/5 flex-none">
                          <span className="resource-back-tag font-mono text-[10.5px] sm:text-[11px] uppercase tracking-wider font-bold">
                            0{idx + 1} &bull; {tile.title}
                          </span>
                          <span className="text-[9.5px] sm:text-[10px] font-mono font-bold text-[#b45309] bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full">
                            {detail.backTag}
                          </span>
                        </div>

                        {/* Back Heading */}
                        <h4 className="font-serif text-[14px] sm:text-[15px] font-bold text-[#0F172A] leading-tight mb-1 flex-none">
                          {detail.backHeading}
                        </h4>

                        {/* 4 Specifications Rows (Key-Value Table) */}
                        <div className="space-y-1 my-1 py-1 border-y border-black/5 flex-1 flex flex-col justify-around">
                          {detail.backSpecs.map((spec, sIdx) => (
                            <div key={sIdx} className="flex items-center justify-between text-[10.5px] sm:text-[11px] leading-tight gap-1 font-medium">
                              <span className="font-mono text-slate-500 font-bold uppercase tracking-wider shrink-0 text-[9.5px] sm:text-[10px]">
                                {spec.label}:
                              </span>
                              <span className="font-sans font-semibold text-slate-900 text-right truncate">
                                {spec.value}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Institutional Capabilities */}
                        <div className="space-y-0.5 flex-none pt-0.5">
                          {detail.backCapabilities.map((cap, cIdx) => (
                            <div key={cIdx} className="flex items-center gap-1.5 text-[10.5px] sm:text-[11px] text-slate-800 font-sans leading-tight font-medium">
                              <span className="resource-back-dot w-1.5 h-1.5 rounded-full shrink-0" />
                              <span className="truncate">{cap}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Action CTA */}
                      <div className="resource-back-cta flex items-center justify-between pt-1.5 border-t border-black/5 mt-auto flex-none gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFlippedTile(null);
                          }}
                          className="font-mono text-[10px] sm:text-[10.5px] uppercase tracking-wider text-slate-600 hover:text-slate-900 font-bold transition-colors cursor-pointer"
                        >
                          ↻ Turn back
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTile(tile.title);
                          }}
                          className="flex items-center gap-1 font-mono text-[10.5px] sm:text-[11px] uppercase tracking-wider font-bold text-[#b45309] hover:underline cursor-pointer"
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
        </div>

        {/* Highlight Banner (Matching Section 11 Exact Architecture) */}
        <div className="editorial-reveal w-full self-stretch flex-none bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl px-5 py-2.5 sm:px-6 sm:py-3 shadow-xs mt-1.5 sm:mt-2">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="shrink-0 flex items-center justify-center">
              <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-[#D97706]" />
            </div>
            <div className="w-[1.5px] h-8 sm:h-10 bg-[#FDE68A] shrink-0" />
            <h3 className="font-serif text-base sm:text-lg lg:text-[20px] font-bold text-[#0F172A] leading-snug">
              Structured digital assets ensuring zero learning loss between weekly school lab sessions.
            </h3>
          </div>
        </div>

        {/* Digital Ecosystem Bottom Strip (Matching Section 11 Exact Architecture) */}
        <div className="editorial-reveal w-full self-stretch flex-none mt-1.5 sm:mt-2 pt-2 border-t border-slate-200/80">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3.5 shrink-0">
              <div className="flex flex-col font-mono text-[10px] sm:text-[10.5px] tracking-[0.2em] uppercase font-black text-[#0F172A] leading-tight">
                <span>DIGITAL</span>
                <span>ECOSYSTEM</span>
              </div>
              <div className="hidden sm:block w-[1.5px] h-6 bg-slate-300" />
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-7 lg:gap-9 font-sans text-xs sm:text-[12.5px] text-[#1E293B] font-semibold">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D97706]" />
                </div>
                <span>100% Offline Cached on Lab Workstations</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center shrink-0">
                  <Layers className="w-3.5 h-3.5 text-[#D97706]" />
                </div>
                <span>Grade-wise NEP 2020 Aligned Courseware</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center shrink-0">
                  <Users className="w-3.5 h-3.5 text-[#D97706]" />
                </div>
                <span>Real-Time Teacher Progress Heatmaps</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trailing Link CTA */}
        <div className="editorial-reveal flex-none pt-1.5 flex items-center justify-center mt-0.5">
          <button
            type="button"
            onClick={handleScrollToNext}
            className="group flex items-center justify-center text-center focus:outline-none cursor-pointer"
          >
            <span className="font-sans font-bold text-[9px] sm:text-[9.5px] uppercase tracking-[0.2em] text-[#64748B] group-hover:text-[#c8a45d] transition-colors">
              Discover teacher empowerment &amp; classroom mentorship →
            </span>
          </button>
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
