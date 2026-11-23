import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import {
  Bot,
  Cpu,
  BarChart3,
  Plane,
  ShieldCheck,
  ChevronRight,
  X,
} from 'lucide-react';
import { ChapterShell } from '../components/ChapterShell';
import { Magnetic } from '../components/motion/Magnetic';
import { AnimatedCounter } from '../components/motion/AnimatedCounter';
import { LineReveal } from '../components/motion/LineReveal';

interface DomainData {
  id: string;
  slideId: string;
  slideIndex: number;
  chapter: string;
  domainNumber: string;
  name: string;
  fullName: string;
  italicWord: string;
  tag: string;
  tagline: string;
  description: string;
  bg: string;
  textColor: string;
  accent: string;
  glowColor: string;
  rotation: number;
  deckX: number;
  deckY: number;
  badgeText: string;
  badgeBg: string;
  badgeTextColor: string;
  badgeIcon: React.ReactNode;
  icon: React.ReactNode;
  slideNumber: string;
  items: string[];
  metrics: { value: number; suffix: string; label: string }[];
  tags: string[];
  pillars: { num: string; title: string; desc: string }[];
  badgeNote?: string;
  badgeIconNote?: React.ReactNode;
  image: string;
  imageCaption: string;
  imageSubcaption: string;
  imageTag: string;
}

const DOMAINS: DomainData[] = [
  {
    id: 'robotics',
    slideId: 'slide-4',
    slideIndex: 3,
    chapter: '04',
    domainNumber: 'Engineering Domain 01',
    name: 'robotics',
    fullName: 'Robotics &',
    italicWord: 'Automation',
    tag: 'Physical Computing',
    tagline: 'Physical Computing & Embedded Mechanics',
    description:
      'Sensory feedback, motor actuation, and embedded logic bridging code with mechanics.',
    bg: '#1c4250',
    textColor: '#ffffff',
    accent: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    rotation: -5,
    deckX: -360,
    deckY: 5,
    badgeText: 'EMBEDDED BENCH',
    badgeBg: '#38bdf8',
    badgeTextColor: '#0c2331',
    badgeIcon: <Bot className="w-3.5 h-3.5" />,
    icon: <Bot className="w-5 h-5 text-[#38bdf8]" />,
    slideNumber: '01',
    items: [
      'Microcontrollers & Embedded C',
      'Sensors & Sensory Feedback',
      'Motor Drivers & PWM Actuators',
      'Mechanical Prototyping & CAD',
    ],
    metrics: [
      { value: 6, suffix: ' DoF', label: 'Arm Kinematics' },
      { value: 24, suffix: '+', label: 'Sensors & Actuators' },
      { value: 100, suffix: '%', label: 'Bench Practical' },
    ],
    tags: ['Sensors', 'Actuators', 'Embedded C', '3D Design'],
    pillars: [
      { num: '01', title: 'Electronics & Circuits', desc: 'Voltage regulation & breadboard circuits' },
      { num: '02', title: 'Sensors & Motors', desc: 'Servo control & PWM calibration' },
      { num: '03', title: 'Embedded Code', desc: 'MicroPython & hardware interrupts' },
      { num: '04', title: '3D Mechanics', desc: 'CAD spatial modeling & kinematics' },
    ],
    badgeNote: 'DESIGN → BUILD → CODE → TEST → ITERATE',
    badgeIconNote: <ChevronRight className="w-4 h-4 text-[#38bdf8]" />,
    image: '/assets/page_13.webp',
    imageCaption: 'Actuation Station',
    imageSubcaption: '6-Axis kinematics & gripper feedback',
    imageTag: 'School Lab Platform',
  },
  {
    id: 'ai-ml',
    slideId: 'slide-5',
    slideIndex: 4,
    chapter: '05',
    domainNumber: 'Engineering Domain 02',
    name: 'ai & ml',
    fullName: 'AI & Machine',
    italicWord: 'Learning',
    tag: 'Cognitive Models',
    tagline: 'Intelligent Systems & Machine Reasoning',
    description:
      'Intelligent inference, computer vision, and responsible safety guardrails.',
    bg: '#254456',
    textColor: '#ffffff',
    accent: '#6ee7b7',
    glowColor: 'rgba(110, 231, 183, 0.45)',
    rotation: -1.5,
    deckX: -120,
    deckY: -12,
    badgeText: 'NEURAL MODELS',
    badgeBg: '#6ee7b7',
    badgeTextColor: '#064e3b',
    badgeIcon: <Cpu className="w-3.5 h-3.5" />,
    icon: <Cpu className="w-5 h-5 text-[#6ee7b7]" />,
    slideNumber: '02',
    items: [
      'Machine Learning Principles',
      'Supervised Training & Weights',
      'Computer Vision & Audio ML',
      'Ethical Safety Guardrails',
    ],
    metrics: [
      { value: 98, suffix: '%', label: 'Vision Accuracy' },
      { value: 15, suffix: ' FPS', label: 'Edge ML Latency' },
      { value: 100, suffix: '%', label: 'Ethics Guardrails' },
    ],
    tags: ['Neural Networks', 'Computer Vision', 'Ethical AI', 'Edge Inference'],
    pillars: [
      { num: '01', title: 'Data & Patterns', desc: 'Feature engineering & classifiers' },
      { num: '02', title: 'Computer Vision', desc: 'Edge convolution & gesture tracking' },
      { num: '03', title: 'Neural Models', desc: 'Tokenization & prompt logic' },
      { num: '04', title: 'Ethics & Safety', desc: 'Bias detection & privacy boundaries' },
    ],
    badgeNote: 'Responsible AI citizenship, privacy safeguards, and ethics curriculum built-in.',
    badgeIconNote: <ShieldCheck className="w-4 h-4 text-[#6ee7b7]" />,
    image: '/assets/page_02.webp',
    imageCaption: 'Simulation & Vision',
    imageSubcaption: 'Spatial models & neural inference',
    imageTag: 'Neural Inference',
  },
  {
    id: 'data-analytics',
    slideId: 'slide-6',
    slideIndex: 5,
    chapter: '06',
    domainNumber: 'Engineering Domain 03',
    name: 'data analytics',
    fullName: 'Data',
    italicWord: 'Analytics',
    tag: 'Evidence & Insights',
    tagline: 'Evidence, Statistics & Live Telemetry',
    description:
      'Transforming raw sensor telemetry into structured insights through 4 empirical stages.',
    bg: '#8c4427',
    textColor: '#ffffff',
    accent: '#fed7aa',
    glowColor: 'rgba(254, 215, 170, 0.45)',
    rotation: 1.5,
    deckX: 120,
    deckY: -8,
    badgeText: 'TELEMETRY LAB',
    badgeBg: '#fb923c',
    badgeTextColor: '#431407',
    badgeIcon: <BarChart3 className="w-3.5 h-3.5" />,
    icon: <BarChart3 className="w-5 h-5 text-[#fed7aa]" />,
    slideNumber: '03',
    items: [
      'Data Wrangling & Cleaning',
      'Trend & Outlier Detection',
      'Hypothesis Formulation',
      'Visual Storytelling & Charts',
    ],
    metrics: [
      { value: 50, suffix: ' Hz', label: 'Sensor Telemetry' },
      { value: 4, suffix: ' Stages', label: 'Pipeline Depth' },
      { value: 100, suffix: '%', label: 'Empirical Proof' },
    ],
    tags: ['Data Structuring', 'Statistical Interpretation', 'Data Visualization', 'Hypothesis'],
    pillars: [
      { num: '01', title: 'Collection', desc: 'Sensor telemetry & IMU harvest' },
      { num: '02', title: 'Analysis', desc: 'Variance & anomaly filtering' },
      { num: '03', title: 'Visualisation', desc: 'Real-time telemetry charts' },
      { num: '04', title: 'Insights', desc: 'Optimization & parameter tuning' },
    ],
    badgeNote: 'Hypothesis → Experimentation → Telemetry → Empirical Conclusion',
    badgeIconNote: <ChevronRight className="w-4 h-4 text-[#fed7aa]" />,
    image: '/assets/laptop_analytics.webp',
    imageCaption: 'Telemetry Lab',
    imageSubcaption: 'Multi-variate telemetry & synthesis',
    imageTag: 'Live Telemetry',
  },
  {
    id: 'aerial-systems',
    slideId: 'slide-7',
    slideIndex: 6,
    chapter: '07',
    domainNumber: 'Engineering Domain 04',
    name: 'aerial systems',
    fullName: 'Aerial',
    italicWord: 'Systems',
    tag: 'Flight Aerodynamics',
    tagline: 'Aerodynamics, Flight Mechanics & Spatial Robotics',
    description:
      'Aerodynamics, 3D spatial mapping, and gyro stabilization in safe lab environments.',
    bg: '#141d27',
    textColor: '#ffffff',
    accent: '#93c5fd',
    glowColor: 'rgba(147, 197, 253, 0.45)',
    rotation: 5,
    deckX: 360,
    deckY: 10,
    badgeText: 'AUTONOMOUS FLIGHT',
    badgeBg: '#60a5fa',
    badgeTextColor: '#0f172a',
    badgeIcon: <Plane className="w-3.5 h-3.5" />,
    icon: <Plane className="w-5 h-5 text-[#93c5fd]" />,
    slideNumber: '04',
    items: [
      'Multi-Rotor Aerodynamics',
      '3D Spatial Telemetry & IMUs',
      'Autonomous Waypoints',
      'Laboratory Tethered Protocols',
    ],
    metrics: [
      { value: 4, suffix: ' Motors', label: 'Brushless Thrust' },
      { value: 3, suffix: ' Axis', label: 'IMU Stabilization' },
      { value: 100, suffix: '%', label: 'Tethered Safety' },
    ],
    tags: ['Aerodynamics', 'Gyro & IMU', 'Navigation', 'Lab Safety'],
    pillars: [
      { num: '01', title: 'Aerodynamics & Lift', desc: 'Airfoils & quad-rotor thrust dynamics' },
      { num: '02', title: 'Stabilization', desc: 'PID balance & IMU calibration' },
      { num: '03', title: 'Waypoints', desc: '3D coordinates & autonomous paths' },
      { num: '04', title: 'Sensory Mapping', desc: 'Altitude sensing & collision avoidance' },
    ],
    badgeNote: 'STRICT LAB PROTOCOL: Safe tethered flight cages and controlled indoor arenas.',
    badgeIconNote: <ShieldCheck className="w-4 h-4 text-[#93c5fd]" />,
    image: '/assets/page_08.webp',
    imageCaption: 'Spatial Mapping',
    imageSubcaption: '3D Waypoint & Inertial Guidance',
    imageTag: 'Safe Lab Protocol',
  },
];

export interface DomainsSectionProps {
  onSlideChange?: (index: number) => void;
}

export const DomainsSection: React.FC<DomainsSectionProps> = ({ onSlideChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeCardIndex, setActiveCardIndex] = useState<number>(-1);
  const activeCardIndexRef = useRef<number>(-1);
  const lastStepTimeRef = useRef<number>(0);
  const [activeDataStage, setActiveDataStage] = useState<number>(0);

  // Responsive spread and panel dimension calculator
  const getLayoutDimensions = useCallback(() => {
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1440;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 900;

    const spread = vw < 640 ? 0.38 : vw < 768 ? 0.50 : vw < 1080 ? 0.72 : vw < 1366 ? 0.88 : 1.0;
    const deckCardW = vw < 640 ? 250 : vw < 768 ? 275 : 300;
    const deckCardH = vh < 750 ? 390 : 425;
    
    // Balanced, generous widescreen dimensions that fit comfortably in any 100svh viewport
    const panelW = vw < 640 
      ? Math.floor(vw * 0.94) 
      : vw < 1024 
        ? Math.min(840, Math.floor(vw * 0.90)) 
        : Math.min(960, Math.floor(vw * 0.70));
        
    const panelH = vh < 700 
      ? Math.min(450, Math.floor(vh * 0.68)) 
      : vh < 850 
        ? Math.min(480, Math.floor(vh * 0.65)) 
        : Math.min(530, Math.floor(vh * 0.62));

    return { spread, deckCardW, deckCardH, panelW, panelH };
  }, []);

  // Animate card positions dynamically based on activeCardIndex
  const updateCardLayout = useCallback((targetIndex: number) => {
    const { spread, deckCardW, deckCardH, panelW, panelH } = getLayoutDimensions();

    DOMAINS.forEach((domain, idx) => {
      const cardEl = cardRefs.current[idx];
      if (!cardEl) return;

      const deckFace = cardEl.querySelector('.deck-face');
      const expandedFace = cardEl.querySelector('.expanded-face');

      if (targetIndex === -1) {
        // Deck State: All cards spread and fanned out cleanly centered
        const origX = Math.round(domain.deckX * spread);
        const origY = domain.deckY - 8;

        gsap.to(cardEl, {
          xPercent: -50,
          yPercent: -50,
          x: origX,
          y: origY,
          rotation: domain.rotation,
          width: deckCardW,
          height: deckCardH,
          borderRadius: 20,
          opacity: 1,
          scale: 1,
          zIndex: idx + 1,
          boxShadow: '0 24px 60px rgba(0,0,0,0.55)',
          duration: 0.55,
          ease: 'power2.out',
        });

        if (deckFace) {
          gsap.to(deckFace, { autoAlpha: 1, duration: 0.35, ease: 'power1.out' });
        }
        if (expandedFace) {
          gsap.to(expandedFace, { autoAlpha: 0, pointerEvents: 'none', duration: 0.25, ease: 'power1.in' });
        }
      } else if (targetIndex === idx) {
        // Active Expanded Card: Centered, 0 rotation, expanded width & height
        gsap.to(cardEl, {
          xPercent: -50,
          yPercent: -50,
          x: 0,
          y: -8,
          rotation: 0,
          width: panelW,
          height: panelH,
          borderRadius: 24,
          opacity: 1,
          scale: 1,
          zIndex: 60,
          boxShadow: `0 28px 80px -15px ${domain.glowColor}, 0 0 0 1px rgba(255,255,255,0.25)`,
          duration: 0.55,
          ease: 'power3.out',
        });

        if (deckFace) {
          gsap.to(deckFace, { autoAlpha: 0, duration: 0.25, ease: 'power1.out' });
        }
        if (expandedFace) {
          gsap.fromTo(
            expandedFace,
            { autoAlpha: 0, scale: 0.96 },
            { autoAlpha: 1, scale: 1, pointerEvents: 'auto', duration: 0.45, ease: 'power2.out', delay: 0.15 }
          );
        }
      } else {
        // Inactive background cards: Dimmed out and scaled down
        const origX = Math.round(domain.deckX * spread);
        const origY = domain.deckY;

        gsap.to(cardEl, {
          xPercent: -50,
          yPercent: -50,
          x: origX,
          y: origY,
          rotation: domain.rotation,
          width: deckCardW,
          height: deckCardH,
          borderRadius: 20,
          opacity: 0.18,
          scale: 0.93,
          zIndex: idx + 1,
          boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
          duration: 0.5,
          ease: 'power2.out',
        });

        if (deckFace) {
          gsap.to(deckFace, { autoAlpha: 1, duration: 0.35, ease: 'power1.out' });
        }
        if (expandedFace) {
          gsap.to(expandedFace, { autoAlpha: 0, pointerEvents: 'none', duration: 0.25, ease: 'power1.in' });
        }
      }
    });

    // Dim header slightly when a card is expanded
    if (headerRef.current) {
      gsap.to(headerRef.current, {
        opacity: targetIndex === -1 ? 1 : 0.25,
        y: targetIndex === -1 ? 0 : -8,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  }, [getLayoutDimensions]);

  // Handle switching cards
  const handleSelectCard = useCallback(
    (index: number) => {
      setActiveCardIndex(index);
      activeCardIndexRef.current = index;
      updateCardLayout(index);
      if (index >= 0) {
        onSlideChange?.(DOMAINS[index].slideIndex);
      }
    },
    [updateCardLayout, onSlideChange]
  );

  const handleCloseToDeck = useCallback(() => {
    setActiveCardIndex(-1);
    activeCardIndexRef.current = -1;
    updateCardLayout(-1);
  }, [updateCardLayout]);

  // Tactile hover fan on deck cards
  const handleCardMouseEnter = useCallback(
    (hoveredIdx: number) => {
      if (activeCardIndexRef.current !== -1) return;
      const { spread } = getLayoutDimensions();

      DOMAINS.forEach((domain, idx) => {
        const cardEl = cardRefs.current[idx];
        if (!cardEl) return;
        const origX = Math.round(domain.deckX * spread);
        const origY = domain.deckY + 20;

        if (idx === hoveredIdx) {
          gsap.to(cardEl, {
            y: origY - 26,
            scale: 1.05,
            zIndex: 45,
            boxShadow: `0 35px 80px -10px ${domain.glowColor}, 0 0 0 1px rgba(255,255,255,0.35)`,
            duration: 0.32,
            ease: 'power2.out',
          });
        } else {
          const offset = idx < hoveredIdx ? -20 : 20;
          gsap.to(cardEl, {
            x: origX + offset,
            y: origY + 8,
            scale: 0.95,
            opacity: 0.7,
            zIndex: idx + 1,
            duration: 0.32,
            ease: 'power2.out',
          });
        }
      });
    },
    [getLayoutDimensions]
  );

  const handleCardMouseLeave = useCallback(() => {
    if (activeCardIndexRef.current !== -1) return;
    updateCardLayout(-1);
  }, [updateCardLayout]);

  // Synchronize with SlideTransitions scroll events (single unified gesture pipeline)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleStep = (e: Event) => {
      const now = Date.now();
      if (now - lastStepTimeRef.current < 450) {
        e.preventDefault();
        return;
      }

      const customEvent = e as CustomEvent<{ direction: number }>;
      const dir = customEvent.detail?.direction || 1;
      const cur = activeCardIndexRef.current;

      if (dir > 0) {
        // Forward scroll (down): step through cards: Deck (-1) -> 0 -> 1 -> 2 -> 3 -> 4
        if (cur < DOMAINS.length - 1) {
          e.preventDefault();
          lastStepTimeRef.current = now;
          const next = cur === -1 ? 0 : cur + 1;
          handleSelectCard(next);
        }
        // At Card 4, e.preventDefault() is NOT called, so SlideTransitions advances to Slide 05!
      } else {
        // Reverse scroll (up): step back through cards: 4 -> 3 -> 2 -> 1 -> 0 -> Deck (-1)
        if (cur > -1) {
          e.preventDefault();
          lastStepTimeRef.current = now;
          const prev = cur - 1;
          if (prev === -1) {
            handleCloseToDeck();
          } else {
            handleSelectCard(prev);
          }
        }
        // At Deck view (-1), e.preventDefault() is NOT called, so SlideTransitions goes back to Slide 03!
      }
    };

    el.addEventListener('slide:step', handleStep);
    return () => el.removeEventListener('slide:step', handleStep);
  }, [handleSelectCard, handleCloseToDeck]);

  // Keyboard navigation within domain section
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.querySelector('[aria-modal="true"]')
      ) {
        return;
      }

      const cur = activeCardIndexRef.current;
      if (e.key === 'Escape' && cur !== -1) {
        e.preventDefault();
        handleCloseToDeck();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (cur < DOMAINS.length - 1) {
          e.preventDefault();
          const next = cur === -1 ? 0 : cur + 1;
          handleSelectCard(next);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (cur > -1) {
          e.preventDefault();
          const prev = cur - 1;
          if (prev === -1) {
            handleCloseToDeck();
          } else {
            handleSelectCard(prev);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSelectCard, handleCloseToDeck]);

  // Initial layout on mount & resize
  useEffect(() => {
    updateCardLayout(activeCardIndex);

    const handleResize = () => {
      updateCardLayout(activeCardIndexRef.current);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeCardIndex, updateCardLayout]);

  return (
    <ChapterShell
      id="domains"
      chapterNumber="04"
      theme="dark"
      fullBleed={true}
      className="relative flex flex-col justify-between overflow-hidden bg-[#0A1016]"
    >
      <div
        ref={containerRef}
        id="technology-suite"
        data-steppable="true"
        className="relative w-full h-[100svh] max-h-[100svh] flex flex-col justify-between select-none pt-[calc(var(--header-h,64px)+10px)] pb-2.5 box-border overflow-hidden"
      >
        {/* Hidden SVG Symbols for Bullets and Divider */}
        <svg xmlns="http://www.w3.org/2000/svg" className="hidden" aria-hidden="true">
          <symbol id="truus-bullet-icon" viewBox="0 0 13 16">
            <path
              d="M12.2765 7.03536V7.0403C12.2519 7.1343 12.0977 7.23633 12.0197 7.31177C11.5445 7.73351 11.0321 8.12803 10.6259 8.62706C10.3265 8.99562 10.0295 9.36293 9.75533 9.75128C9.66653 9.87186 9.55433 9.96647 9.47513 10.0901C9.39653 10.2157 9.34613 10.3579 9.26873 10.4865C9.18053 10.625 9.11813 10.7778 9.05033 10.9274C8.96213 11.1074 8.82353 11.2614 8.74373 11.4475C8.64773 11.6985 8.57213 11.9558 8.45573 12.1988C8.30093 12.6311 8.11493 13.0522 7.97573 13.49C7.89953 13.8171 7.91513 14.1585 7.81193 14.4806C7.72553 14.7793 7.71053 15.0873 7.71173 15.3964C7.70573 15.5127 7.73633 15.6951 7.65593 15.7483C7.62773 15.7557 7.58993 15.7199 7.55633 15.6617C7.44893 15.4645 7.40393 15.2326 7.29653 15.0279C7.13393 14.7094 6.87713 14.4559 6.68273 14.1572C6.57713 13.9989 6.48353 13.832 6.36533 13.6823C6.25973 13.5456 6.13073 13.4282 6.01673 13.2977C5.90753 13.1734 5.81633 13.0336 5.70653 12.9112C5.14013 12.3299 4.57133 11.7369 3.91793 11.2614C3.79493 11.1723 3.64673 11.1346 3.50753 11.0839C3.30113 10.9917 3.10253 10.8538 2.88293 10.7815C2.40293 10.6046 1.93733 10.3598 1.43633 10.2596C1.20593 10.2151 0.970727 10.212 0.736727 10.2107C0.555527 10.2052 0.0203267 10.2441 0.424127 9.98069C0.650927 9.83661 0.868127 9.68016 1.08713 9.52495C1.29353 9.3821 1.50893 9.25286 1.70393 9.09394C2.22653 8.61779 2.74913 8.15277 3.20813 7.60798C3.76013 6.9358 4.21373 6.18138 4.55453 5.36759C4.73033 4.99038 4.93673 4.62739 5.06693 4.23101C5.17553 3.83896 5.34293 3.46175 5.45093 3.07155C5.61113 2.35176 5.71013 1.61589 5.82173 0.888061C5.83433 0.813237 5.85113 0.755728 5.87093 0.750781C5.88893 0.744597 5.90873 0.775516 5.92793 0.829933C5.98313 0.989475 6.03353 1.15211 6.08753 1.31289C6.27773 1.91952 6.50993 2.51192 6.76673 3.08949C7.05473 3.75301 7.38413 4.41096 7.84553 4.96812C8.09333 5.25134 8.31833 5.55743 8.55593 5.84807C8.89613 6.20302 9.29213 6.52458 9.72413 6.73854C9.95513 6.85417 10.2005 6.95126 10.4573 6.98774C10.6247 7.01433 10.7819 7.0737 10.9523 7.09101C11.3123 7.12379 11.6693 7.03288 12.0257 6.99826C12.1391 6.98774 12.2645 6.96857 12.2759 7.03659L12.2765 7.03536Z"
              fill="currentColor"
            />
          </symbol>
          <symbol id="truus-card-divider" viewBox="0 0 250 5">
            <path
              d="M2.0019 3.05432C84.0122 2.70675 166.022 2.34756 248.04 2C244.505 2.66037 240.969 3.32077 237.434 3.98115"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </symbol>
        </svg>

        {/* ─── Top Header (Preserved Truus Title) ─── */}
        <div
          ref={headerRef}
          className="w-full text-center pt-2 sm:pt-3 px-4 relative z-10 transition-all duration-500"
        >
          <h2 className="font-serif-editorial text-2xl sm:text-3xl lg:text-[34px] xl:text-[36px] font-bold text-white tracking-tight leading-tight">
            Our core technology <span className="italic font-semibold text-[#10b981]">ecosystem:</span>
          </h2>

          {/* Hand-drawn Truus Style Underline */}
          <div className="w-36 sm:w-48 mx-auto -mt-0.5 mb-1">
            <svg viewBox="0 0 159 17" fill="none" className="w-full text-[#10b981]">
              <path
                d="M1 12.1515C53.0771 5.7187 105.529 2.30552 158 1.93652"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M30.2672 15.9461C64.1899 12.8158 98.2663 11.3583 132.33 11.5735"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>


        </div>

        {/* ─── The Stage: Exact 5 Persistent DOM Cards That Morph Physically ─── */}
        <div className="relative w-full flex-1 min-h-0 flex items-center justify-center overflow-visible">
          {DOMAINS.map((card, idx) => {
            const isCardActive = activeCardIndex === idx;

            return (
              <div
                key={card.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                onClick={() => {
                  if (activeCardIndex !== idx) {
                    handleSelectCard(idx);
                  }
                }}
                onMouseEnter={() => handleCardMouseEnter(idx)}
                onMouseLeave={handleCardMouseLeave}
                style={{
                  backgroundColor: card.bg,
                  color: card.textColor,
                  left: '50%',
                  top: '50%',
                  transformOrigin: 'center center',
                }}
                className={`truus-morph-card absolute w-[280px] sm:w-[310px] h-[430px] sm:h-[460px] cursor-pointer rounded-2xl shadow-2xl border border-white/20 select-none will-change-transform ${
                  isCardActive ? 'cursor-default ring-1 ring-white/30 overflow-hidden' : 'overflow-visible'
                }`}
              >
                {/* =========================================================================
                    FACE 1: DECK STATE (Visible ONLY when card is NOT active)
                    ========================================================================= */}
                <div
                  className="deck-face absolute inset-0 p-5 sm:p-6 flex flex-col justify-between z-10 overflow-visible transition-opacity duration-300"
                  style={{
                    opacity: isCardActive ? 0 : 1,
                    visibility: isCardActive ? 'hidden' : 'visible',
                    pointerEvents: isCardActive ? 'none' : 'auto',
                  }}
                >
                  {/* Floating Badge on top right - fully visible outside top border */}
                  <div
                    style={{ backgroundColor: card.badgeBg, color: card.badgeTextColor }}
                    className="absolute -top-3.5 right-4 px-3 py-1 rounded-full shadow-lg font-mono-tech text-[10px] font-bold tracking-wider flex items-center gap-1.5 border border-black/15 z-10"
                  >
                    {card.badgeIcon}
                    <span>{card.badgeText}</span>
                  </div>

                  <div>
                    {/* Top Row: Chapter Number + Tag (Cleanly positioned on left so badge never covers it) */}
                    <div className="flex items-center gap-2 text-xs font-mono-tech opacity-80 mb-2 pt-0.5 max-w-[65%]">
                      <span className="font-bold text-white/95 font-mono-tech text-[10.5px] bg-white/15 px-1.5 py-0.5 rounded border border-white/10 shrink-0">
                        CH {card.slideNumber}
                      </span>
                      <span className="uppercase tracking-wider text-[10px] sm:text-[10.5px] font-semibold text-white/75 truncate">
                        {card.tag}
                      </span>
                    </div>

                    <h3 className="font-serif-editorial text-2xl sm:text-[28px] font-extrabold capitalize leading-tight tracking-tight mb-2 text-white">
                      {card.name}
                    </h3>

                    {/* Hand-drawn SVG divider */}
                    <div className="w-full my-1.5 text-white/35">
                      <svg width="100%" height="8" aria-hidden="true">
                        <use href="#truus-card-divider" />
                      </svg>
                    </div>

                    {/* Bullet list with star bullets */}
                    <ul className="space-y-2.5 mt-3 font-sans-modern text-[12px] sm:text-[12.5px] font-medium text-white/90">
                      {card.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2.5 leading-snug">
                          <svg
                            width="12"
                            height="14"
                            className="shrink-0 mt-0.5"
                            style={{ color: card.accent }}
                            aria-hidden="true"
                          >
                            <use href="#truus-bullet-icon" />
                          </svg>
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Card Action Footer (Generous spacing, zero text overlap) */}
                  <div className="pt-3 border-t border-white/15 flex items-center justify-between text-[11px] font-mono-tech">
                    <span className="text-white/60">Click to inspect</span>
                    <span
                      style={{ color: card.accent }}
                      className="font-bold flex items-center gap-1 hover:translate-x-1 transition-transform"
                    >
                      Explore →
                    </span>
                  </div>
                </div>

                {/* =========================================================================
                    FACE 2: EXPANDED PRESENTATION PANEL (Visible ONLY when card IS active)
                    ========================================================================= */}
                <div
                  className="expanded-face absolute inset-0 p-4 sm:p-5 lg:p-6 flex flex-col justify-between z-30 overflow-hidden select-text text-white rounded-3xl transition-opacity duration-300"
                  style={{
                    opacity: isCardActive ? 1 : 0,
                    visibility: isCardActive ? 'visible' : 'hidden',
                    pointerEvents: isCardActive ? 'auto' : 'none',
                  }}
                >
                  {/* Card Top Domain Bar */}
                  <div className="flex items-center justify-between pb-2 mb-1.5 border-b border-white/12 shrink-0">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/20 shadow-inner shrink-0"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                      >
                        {card.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="font-mono-tech text-[10.5px] tracking-wider uppercase font-bold"
                            style={{ color: card.accent }}
                          >
                            {card.domainNumber}
                          </span>
                        </div>
                        <span className="font-mono-tech text-[11px] sm:text-xs text-white/75 block leading-tight">
                          {card.tagline}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div
                        style={{ backgroundColor: card.badgeBg, color: card.badgeTextColor }}
                        className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full font-mono-tech text-[10px] font-bold shadow-xs"
                      >
                        <span>{card.badgeText}</span>
                      </div>

                      {/* Close / Contract back to Deck */}
                      <Magnetic strength={0.2}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCloseToDeck();
                          }}
                          title="Contract back to 5-Card Deck"
                          className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white font-mono-tech text-xs transition-all shadow-xs cursor-pointer active:scale-95"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Deck View</span>
                        </button>
                      </Magnetic>
                    </div>
                  </div>

                  <LineReveal color={card.accent} height={1.5} className="mb-2 shrink-0" />

                  {/* Main Content Grid: Balanced & Proportionate Distribution */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6 items-center my-auto flex-1 min-h-0">
                    {/* Left Column: Headlines, Metrics & 2 Core Pillars */}
                    <div className="lg:col-span-7 space-y-1.5 sm:space-y-2 flex flex-col justify-center">
                      <div>
                        <h3 className="font-serif-editorial text-lg sm:text-xl lg:text-[22px] font-normal text-white tracking-tight leading-snug">
                          {card.fullName}{' '}
                          <span className="italic font-light" style={{ color: card.accent }}>
                            {card.italicWord}
                          </span>
                        </h3>
                        <p className="font-sans-modern text-[11.5px] sm:text-xs text-white/80 mt-0.5 leading-relaxed font-normal max-w-md">
                          {card.description}
                        </p>
                      </div>

                      {/* Live Animated Metrics Strip */}
                      <div className="grid grid-cols-3 gap-2 py-1.5 px-3 border border-white/10 bg-white/5 rounded-xl">
                        {card.metrics.map((m, mIdx) => (
                          <div key={mIdx} className="text-left">
                            <div
                              className="font-mono-tech text-sm sm:text-base font-bold"
                              style={{ color: mIdx === 0 ? card.accent : '#ffffff' }}
                            >
                              <AnimatedCounter value={m.value} suffix={m.suffix} />
                            </div>
                            <div className="font-mono-tech text-[9.5px] text-white/60 uppercase leading-tight truncate">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* 2 Core Pillars Grid */}
                      <div className="grid grid-cols-2 gap-2 pt-0.5">
                        {card.pillars.slice(0, 2).map((item, pIdx) => {
                          const isStageSelected = activeDataStage === pIdx;
                          return (
                            <Magnetic key={item.num} strength={0.15}>
                              <div
                                onClick={(e) => {
                                  if (card.id === 'data-analytics') {
                                    e.stopPropagation();
                                    setActiveDataStage(pIdx);
                                  }
                                }}
                                className={`p-2 sm:p-2.5 rounded-xl border text-left transition-all duration-300 h-full ${
                                  card.id === 'data-analytics'
                                    ? isStageSelected
                                      ? 'bg-white/20 border-white ring-1 ring-white/40 shadow-xs cursor-pointer'
                                      : 'bg-black/25 border-white/10 hover:bg-white/10 hover:border-white/20 cursor-pointer'
                                    : 'bg-black/25 border-white/10 hover:bg-white/10 hover:border-white/20 shadow-xs'
                                }`}
                              >
                                <div
                                  className="font-mono-tech text-[9px] font-bold"
                                  style={{ color: card.accent }}
                                >
                                  {card.id === 'data-analytics' ? `STAGE ${item.num}` : `CORE PILLAR ${item.num}`}
                                </div>
                                <div className="font-sans-modern text-xs font-semibold text-white leading-tight mt-0.5 truncate">
                                  {item.title}
                                </div>
                                <div className="font-sans-modern text-[10px] text-white/70 mt-0.5 leading-snug line-clamp-2">
                                  {item.desc}
                                </div>
                              </div>
                            </Magnetic>
                          );
                        })}
                      </div>

                      {/* Bottom Verification Note to fill space cleanly */}
                      <div className="flex items-center justify-between text-[10px] sm:text-[10.5px] font-mono-tech text-white/60 pt-1 border-t border-white/8 shrink-0">
                        <span className="flex items-center gap-1.5 min-w-0 pr-2">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: card.accent }} />
                          <span className="truncate">{card.badgeNote || `${card.fullName} verified curriculum`}</span>
                        </span>
                        <span className="shrink-0 text-white/40 font-medium whitespace-nowrap">Domain Spec</span>
                      </div>
                    </div>

                    {/* Right Column: Controlled Height Visual Card with Hardware Visual */}
                    <div className="lg:col-span-5 flex justify-center items-center h-full">
                      <div className="relative overflow-hidden rounded-2xl bg-black border border-white/20 shadow-xl w-full max-w-[290px] h-[185px] sm:h-[200px] lg:h-[215px] group">
                        <img
                          src={card.image}
                          alt={card.imageCaption}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                        <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between text-white">
                          <div>
                            <span
                              className="font-mono-tech text-[9px] tracking-wider uppercase font-bold block leading-tight mb-0.5"
                              style={{ color: card.accent }}
                            >
                              {card.imageCaption}
                            </span>
                            <p className="font-serif-editorial text-[10px] sm:text-[10.5px] italic text-white/95 font-light leading-tight">
                              {card.imageSubcaption}
                            </p>
                          </div>
                          <span className="font-mono-tech text-[8.5px] text-white/80 bg-white/15 px-2 py-0.5 rounded-full border border-white/20 font-medium whitespace-nowrap">
                            {card.imageTag}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>


      </div>
    </ChapterShell>
  );
};

export default DomainsSection;
