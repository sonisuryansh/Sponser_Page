import React, { useRef, useState, useEffect } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { BookOpen, Layers, CheckSquare, Video, ArrowRight, X, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';

const tileIcons: Record<string, React.ReactNode> = {
  'E-Books': <BookOpen className="w-5 h-5 text-[#c8a45d]" />,
  Books: <BookOpen className="w-5 h-5 text-[#c8a45d]" />,
  Modules: <Layers className="w-5 h-5 text-[#c8a45d]" />,
  Quizzes: <CheckSquare className="w-5 h-5 text-[#c8a45d]" />,
  Videos: <Video className="w-5 h-5 text-[#c8a45d]" />,
};

interface ResourceDetail {
  title: string;
  tag: string;
  summary: string;
  features: string[];
  specs: { label: string; value: string }[];
}

const resourceDetails: Record<string, ResourceDetail> = {
  'E-Books': {
    title: 'E-Books & Interactive Workbooks',
    tag: 'Digital Activity Guides',
    summary: 'Comprehensive grade-tailored workbooks designed as step-by-step companions for hands-on lab builds and independent study.',
    features: [
      'Visual hardware pinouts, circuit diagrams, and debugging checklists for every physical build.',
      'Step-by-step programming logic flowcharts and syntax walkthroughs.',
      'Printable student activity sheets with dedicated observation and reflection prompts.',
      'Available as both downloadable offline PDFs and interactive digital workbooks.',
    ],
    specs: [
      { label: 'Coverage', value: 'Grades 3 through 12' },
      { label: 'Access Mode', value: 'Lab Devices & Offline PDF' },
      { label: 'Format', value: 'Interactive Digital & Print-Ready' },
    ],
  },
  Modules: {
    title: 'Structured Concept Modules',
    tag: 'Sequential Topic Units',
    summary: 'Bite-sized, sequential digital learning modules structured to bridge foundational reasoning with physical prototypes.',
    features: [
      'Modular topic units covering Robotics, AI/ML, Data Analytics, and Aerial Systems.',
      'Structured week-by-week progression synchronized with school academic calendars.',
      'Interactive simulations allowing students to test circuits and logic before wiring hardware.',
      'Clear milestone checkpoints that validate comprehension before advancing to complex projects.',
    ],
    specs: [
      { label: 'Pacing', value: 'Teacher-Led & Self-Directed' },
      { label: 'Domains', value: '4 Core Technology Domains' },
      { label: 'Integration', value: 'Direct Lab Hardware Sync' },
    ],
  },
  Quizzes: {
    title: 'Formative Assessment & Quizzes',
    tag: 'Knowledge Reinforcement',
    summary: 'Low-stakes, real-time diagnostic checks that empower teachers and help students reflect on their learning without exam anxiety.',
    features: [
      'Immediate conceptual feedback following each practical laboratory build.',
      'Real-world diagnostic problem-solving scenarios rather than memorization drills.',
      'Teacher dashboard analytics to spot learning gaps and adapt classroom mentoring.',
      'Milestone achievement badges celebrating algorithmic thinking and engineering resilience.',
    ],
    specs: [
      { label: 'Assessment Type', value: 'Formative & Diagnostic' },
      { label: 'Feedback', value: 'Instant Concept Explanations' },
      { label: 'Analytics', value: 'Teacher Progress Dashboard' },
    ],
  },
  Videos: {
    title: 'Demonstration & Explainer Videos',
    tag: 'Visual Demonstration Media',
    summary: 'High-definition video walkthroughs and real-world technology demonstrations accessible anywhere, anytime.',
    features: [
      'Close-up hardware assembly tutorials clarifying delicate wiring and sensor alignments.',
      'Micro-concept explainers (2–4 mins) ideal for quick revision before lab sessions.',
      'Industry spotlights demonstrating how classroom principles power real-world aerospace and AI.',
      'Accessible on-demand on school tablets, lab workstations, or at home.',
    ],
    specs: [
      { label: 'Video Length', value: '2 to 4 min Micro-Units' },
      { label: 'Resolution', value: 'HD Close-Up Video Guides' },
      { label: 'Streaming', value: '24/7 On-Demand Streaming' },
    ],
  },
};

export const ResourcesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<HTMLDivElement>(null);
  const [selectedTile, setSelectedTile] = useState<string | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedTile(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Entrance animation for resource tiles
  useEffect(() => {
    const el = tilesRef.current;
    if (!el) return;

    const tiles = el.querySelectorAll<HTMLElement>('.resource-tile');
    gsap.fromTo(
      tiles,
      { y: 24, opacity: 0.3 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
      }
    );
  }, []);

  const activeDetail = selectedTile ? resourceDetails[selectedTile] || resourceDetails['E-Books'] : null;

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
        className="relative w-full h-full min-h-full flex-1 flex flex-col justify-center items-center pt-[calc(var(--header-h,64px)+8px)] pb-6 px-4 sm:px-6 lg:px-8 box-border select-none z-10"
      >
        {/* Main Inset White/Creamish Panel - Standardized 1240px */}
        <div className="relative w-full my-auto max-w-[1240px] bg-[#FFFFFD] shadow-[0_16px_50px_rgba(0,0,0,0.05)] border border-black/8 rounded-[4px] flex flex-col justify-between p-6 sm:p-7 lg:p-8 box-border z-10">
          
          {/* Eyebrow & Headline Header (Centered) */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-4 pb-3 border-b border-black/8">
            <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-[#c8a45d] mb-1">
              {siteConfig.resources.eyebrow}
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal leading-tight tracking-tight text-[#111111] mb-1.5">
              {siteConfig.resources.headline}
            </h2>
            <p className="text-xs sm:text-[13px] text-[#555555] font-sans max-w-2xl mx-auto leading-relaxed mb-2.5">
              {siteConfig.resources.paragraph}
            </p>

            {!siteConfig.confirm.lmsReady && (
              <div className="px-3 py-0.5 bg-[#FAF9F6] border border-black/10 text-[#666666] text-[10.5px] font-mono uppercase tracking-wider rounded-[2px]">
                {siteConfig.resources.statusNotice}
              </div>
            )}
          </div>

          {/* 4 Interactive Resource Cards Grid with 3D Book Cover Open Effect */}
          <div
            ref={tilesRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 my-auto"
          >
            {siteConfig.resources.tiles.map((tile) => {
              const detail = resourceDetails[tile.title] || resourceDetails['E-Books'];

              return (
                <div
                  key={tile.title}
                  onClick={() => setSelectedTile(tile.title)}
                  className="resource-book resource-tile group"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedTile(tile.title);
                    }
                  }}
                  aria-label={`View ${tile.title} details`}
                >
                  {/* Inside Page (Revealed when cover rotates -80deg) */}
                  <div className="resource-book-page select-none">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-[#c8a45d] font-bold">
                          Inside {tile.title}
                        </span>
                        <span className="text-[8.5px] font-mono text-[#777] bg-black/[0.04] px-1.5 py-0.5 rounded-[2px]">
                          Specs
                        </span>
                      </div>
                      <h4 className="font-serif text-[14px] sm:text-[15px] font-medium text-[#111111] leading-snug mb-2">
                        {detail.title}
                      </h4>
                      <ul className="space-y-1.5 text-[10.5px] sm:text-[11px] text-[#555555] leading-snug">
                        {detail.features.slice(0, 3).map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-[#c8a45d] mt-1.5 shrink-0" />
                            <span className="line-clamp-2">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-black/5 mt-auto">
                      <span className="font-mono text-[9px] sm:text-[9.5px] uppercase tracking-wider text-[#c8a45d] font-bold group-hover:text-[#111] transition-colors">
                        Click for Full Specs
                      </span>
                      <ArrowRight className="w-3 h-3 text-[#c8a45d] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Front Cover (Rotates open on hover) */}
                  <div className="resource-book-cover select-none">
                    <div>
                      {/* Icon & Category Tag */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-8 h-8 flex items-center justify-center border border-black/8 bg-white rounded-[3px] shadow-xs group-hover:border-[#c8a45d]/40 transition-colors">
                          {tileIcons[tile.title] || <BookOpen className="w-4 h-4 text-[#c8a45d]" />}
                        </div>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-[#888888] font-semibold px-2 py-0.5 bg-black/[0.03] rounded-[2px]">
                          {tile.tag}
                        </span>
                      </div>

                      {/* Tile Title */}
                      <h3 className="font-serif text-xl sm:text-[22px] font-medium tracking-tight text-[#111111] group-hover:text-[#c8a45d] transition-colors mb-1.5">
                        {tile.title}
                      </h3>

                      {/* Tile Description */}
                      <p className="text-xs leading-relaxed text-[#555555]">
                        {tile.description}
                      </p>
                    </div>

                    {/* Bottom Open Affordance */}
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#c8a45d] font-bold pt-2.5 border-t border-black/5 mt-auto group-hover:text-[#111111] transition-colors">
                      <span>Explore Details</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
      {selectedTile && activeDetail && (
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
                <div className="w-9 h-9 flex items-center justify-center border border-black/10 bg-[#FAF9F6] rounded-[3px]">
                  {tileIcons[selectedTile] || <BookOpen className="w-5 h-5 text-[#c8a45d]" />}
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#c8a45d] font-bold block">
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
              {activeDetail.summary}
            </p>

            {/* Key Features Bullet List */}
            <div className="mb-5">
              <span className="font-mono text-[9.5px] uppercase tracking-widest text-[#888888] font-bold block mb-2.5">
                Key Components & Student Value
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeDetail.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#FAF9F6] border border-black/6 rounded-[3px] flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#c8a45d] shrink-0 mt-0.5" />
                    <span className="font-sans text-xs text-[#333333] leading-relaxed">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Specs Strip */}
            <div className="pt-4 border-t border-black/8 grid grid-cols-3 gap-3">
              {activeDetail.specs.map((spec, idx) => (
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
      )}
    </ChapterShell>
  );
};

export default ResourcesSection;
