import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import {
  ShieldCheck,
  X,
  Puzzle,
  Ruler,
  Triangle,
  BarChart2,
  Code2,
  Check,
  Plane,
  ChevronLeft,
  ChevronRight,
  Wrench,
  TrendingUp,
} from 'lucide-react';
import { ChapterShell } from '../components/ChapterShell';
import { siteConfig } from '../config/content.config';

interface DomainData {
  id: string;
  slideId: string;
  chapter: string;
  domainNumber: string;
  name: string;
  tag: string;
  description: string;
  borderColor: string;
  accentColor: string;
  barColor: string;
  bgGradient: string;
  waveColor: string;
  checkBg: string;
  checkColor: string;
  tagColor: string;
  tagBg: string;
  specialCallout?: {
    icon: React.ReactNode;
    text: string;
    bg: string;
    border: string;
    color: string;
  };
  slideNumber: string;
  items: string[];
  metrics: { value: string; label: string }[];
  pillars: { num: string; title: string; desc: string }[];
  badgeNote?: string;
  image: string;
  imageCaption: string;
  imageSubcaption: string;
  imageTag: string;
}

// Custom vector line-art icons matching Image 1
const RoboticArmVector: React.FC = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="#0284C7"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-12 h-12 shrink-0 drop-shadow-xs"
  >
    <path d="M12 40h24" />
    <path d="M16 40v-4h16v4" />
    <path d="M24 36v-6" />
    <circle cx="24" cy="30" r="3" fill="#E0F2FE" />
    <path d="M22 28l-8-12" />
    <circle cx="14" cy="16" r="3" fill="#E0F2FE" />
    <path d="M16 14l12-6" />
    <circle cx="28" cy="8" r="2.5" fill="#E0F2FE" />
    <path d="M30 6l4-2m-2 6l4 2" />
  </svg>
);

const AIChipVector: React.FC = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="#9333EA"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-12 h-12 shrink-0 drop-shadow-xs"
  >
    <rect x="14" y="14" width="20" height="20" rx="4" fill="#F3E8FF" />
    <text x="24" y="27" textAnchor="middle" fill="#9333EA" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
      AI
    </text>
    <path d="M24 6v8M24 34v8M6 24h8M34 24h8" />
    <circle cx="24" cy="6" r="2" fill="#C084FC" />
    <circle cx="24" cy="42" r="2" fill="#C084FC" />
    <circle cx="6" cy="24" r="2" fill="#C084FC" />
    <circle cx="42" cy="24" r="2" fill="#C084FC" />
    <circle cx="12" cy="12" r="1.5" fill="#C084FC" />
    <circle cx="36" cy="12" r="1.5" fill="#C084FC" />
    <circle cx="12" cy="36" r="1.5" fill="#C084FC" />
    <circle cx="36" cy="36" r="1.5" fill="#C084FC" />
    <path d="M14 14l-2-2m22 2l2-2m-2 22l2 2m-22-2l-2 2" />
  </svg>
);

const DataChartVector: React.FC = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="#EA580C"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-12 h-12 shrink-0 drop-shadow-xs"
  >
    <rect x="10" y="26" width="6" height="14" rx="1.5" fill="#FFEDD5" />
    <rect x="21" y="18" width="6" height="22" rx="1.5" fill="#FED7AA" />
    <rect x="32" y="10" width="6" height="30" rx="1.5" fill="#FDBA74" />
    <path d="M8 20l12-8 10 6 10-10" stroke="#C2410C" strokeWidth="2.5" />
    <circle cx="40" cy="8" r="2.5" fill="#EA580C" stroke="#EA580C" />
  </svg>
);

const AerialDroneVector: React.FC = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="#16A34A"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-12 h-12 shrink-0 drop-shadow-xs"
  >
    <rect x="18" y="21" width="12" height="7" rx="3.5" fill="#DCFCE7" />
    <circle cx="24" cy="24.5" r="1.5" fill="#16A34A" />
    <path d="M19 22L12 16" />
    <path d="M29 22L36 16" />
    <path d="M19 27L12 33" />
    <path d="M29 27L36 33" />
    <ellipse cx="12" cy="16" rx="5.5" ry="1.5" fill="#86EFAC" />
    <ellipse cx="36" cy="16" rx="5.5" ry="1.5" fill="#86EFAC" />
    <ellipse cx="12" cy="33" rx="5.5" ry="1.5" fill="#86EFAC" />
    <ellipse cx="36" cy="33" rx="5.5" ry="1.5" fill="#86EFAC" />
    <path d="M21 28v4m6-4v4m-8 4h10" />
  </svg>
);

const DOMAINS: DomainData[] = [
  {
    id: 'robotics',
    slideId: 'slide-4',
    chapter: '04',
    domainNumber: 'Robotics & Automation',
    name: 'Robotics & Automation',
    tag: 'PHYSICAL COMPUTING',
    description: 'Electronics, sensors, control, coding and mechanical systems.',
    borderColor: 'border-[#38BDF8]',
    accentColor: '#0284C7',
    barColor: '#0284C7',
    bgGradient: 'bg-gradient-to-b from-[#F0F9FF] to-white',
    waveColor: 'from-[#E0F2FE]/40 via-[#F0F9FF]/20 to-transparent',
    checkBg: 'bg-[#0284C7]',
    checkColor: 'text-white',
    tagColor: 'text-[#0284C7]',
    tagBg: 'bg-sky-100 text-[#0369A1]',
    specialCallout: {
      icon: <Wrench className="w-4 h-4 text-[#0284C7] shrink-0" />,
      text: 'Physical computing: motors, sensors & microcontrollers.',
      bg: '#F0F9FF',
      border: '#BAE6FD',
      color: '#0369A1',
    },
    slideNumber: '01',
    items: [
      'Assemble and wire physical robotics kits.',
      'Program autonomous sensor reaction loops.',
      'Test, debug, and optimize mechanical code.',
    ],
    metrics: [
      { value: 'DESIGN', label: 'Circuits & CAD' },
      { value: 'BUILD', label: 'Sensors & Motors' },
      { value: 'CODE', label: 'Embedded Logic' },
      { value: 'TEST', label: 'Diagnostics' },
      { value: 'IMPROVE', label: 'Optimization' },
    ],
    pillars: [
      { num: '01', title: 'Electronics & Circuits', desc: 'Voltage regulation & breadboard circuits' },
      { num: '02', title: 'Sensors & Motors', desc: 'Servo control & PWM calibration' },
      { num: '03', title: 'Embedded Code', desc: 'MicroPython & hardware interrupts' },
      { num: '04', title: '3D Mechanics', desc: 'CAD spatial modeling & kinematics' },
    ],
    badgeNote: 'DESIGN → BUILD → CODE → TEST → IMPROVE',
    image: '/assets/students_robotics_assembly.webp',
    imageCaption: 'Robotics & Automation',
    imageSubcaption: 'Students at a build bench with a wheeled robot car',
    imageTag: 'School Lab Platform',
  },
  {
    id: 'ai-ml',
    slideId: 'slide-5',
    chapter: '05',
    domainNumber: 'AI & Machine Learning',
    name: 'AI & Machine Learning',
    tag: 'COGNITIVE MODELS',
    description: 'Intelligent systems, model concepts and responsible AI use.',
    borderColor: 'border-[#C084FC]',
    accentColor: '#9333EA',
    barColor: '#9333EA',
    bgGradient: 'bg-gradient-to-b from-[#FAF5FF] to-white',
    waveColor: 'from-[#F3E8FF]/40 via-[#FAF5FF]/20 to-transparent',
    checkBg: 'bg-[#9333EA]',
    checkColor: 'text-white',
    tagColor: 'text-[#9333EA]',
    tagBg: 'bg-purple-100 text-[#7E22CE]',
    specialCallout: {
      icon: <ShieldCheck className="w-4 h-4 text-[#9333EA] shrink-0" />,
      text: 'Using AI safely, fairly and responsibly.',
      bg: '#FAF5FF',
      border: '#E9D5FF',
      color: '#7E22CE',
    },
    slideNumber: '02',
    items: [
      'Train edge models with sample image sets.',
      'Real-time object & pattern recognition.',
      'Audit model bias & responsible AI ethics.',
    ],
    metrics: [
      { value: 'PERCEIVE', label: 'Data & Patterns' },
      { value: 'TRAIN', label: 'Supervised Models' },
      { value: 'EVALUATE', label: 'Accuracy & Drift' },
      { value: 'ETHICS', label: 'Safety Guardrails' },
    ],
    pillars: [
      { num: '01', title: 'Data & Patterns', desc: 'Feature engineering & classifiers' },
      { num: '02', title: 'Computer Vision', desc: 'Edge convolution & gesture tracking' },
      { num: '03', title: 'Neural Models', desc: 'Tokenization & prompt logic' },
      { num: '04', title: 'Ethics & Safety', desc: 'Bias detection & privacy boundaries' },
    ],
    badgeNote: 'UNDERSTAND → EXPLORE → APPLY → BUILD',
    image: '/assets/computer_vision_object_recognition.webp',
    imageCaption: 'AI & Machine Learning',
    imageSubcaption: 'Students at a computer with a small camera-based project',
    imageTag: 'Neural Inference',
  },
  {
    id: 'data-analytics',
    slideId: 'slide-6',
    chapter: '06',
    domainNumber: 'Data Analytics',
    name: 'Data Analytics',
    tag: 'EVIDENCE & INSIGHTS',
    description: 'Working with data, finding patterns and sharing insights.',
    borderColor: 'border-[#FB923C]',
    accentColor: '#EA580C',
    barColor: '#EA580C',
    bgGradient: 'bg-gradient-to-b from-[#FFF7ED] to-white',
    waveColor: 'from-[#FFEDD5]/40 via-[#FFF7ED]/20 to-transparent',
    checkBg: 'bg-[#EA580C]',
    checkColor: 'text-white',
    tagColor: 'text-[#EA580C]',
    tagBg: 'bg-orange-100 text-[#C2410C]',
    specialCallout: {
      icon: <TrendingUp className="w-4 h-4 text-[#EA580C] shrink-0" />,
      text: 'Sensor telemetry: live analysis & evidence-based conclusions.',
      bg: '#FFF7ED',
      border: '#FFEDD5',
      color: '#C2410C',
    },
    slideNumber: '03',
    items: [
      'Collect live sensor telemetry & logs.',
      'Filter noise, calculate variance & anomalies.',
      'Publish interactive visual dashboards.',
    ],
    metrics: [
      { value: 'COLLECT', label: 'Raw Observations' },
      { value: 'CLEAN', label: 'Noise Filtering' },
      { value: 'ANALYSE', label: 'Trends & Variance' },
      { value: 'INSIGHT', label: 'Visual Findings' },
    ],
    pillars: [
      { num: '01', title: 'Collection', desc: 'Sensor telemetry & IMU harvest' },
      { num: '02', title: 'Analysis', desc: 'Variance & anomaly filtering' },
      { num: '03', title: 'Visualisation', desc: 'Real-time telemetry charts' },
      { num: '04', title: 'Insights', desc: 'Optimization & parameter tuning' },
    ],
    badgeNote: 'DATA → ANALYSIS → VISUALISATION → INSIGHTS',
    image: '/assets/laptop_analytics.webp',
    imageCaption: 'Data Analytics',
    imageSubcaption: 'Students reading a chart on a screen together',
    imageTag: 'Live Telemetry',
  },
  {
    id: 'aerial-systems',
    slideId: 'slide-7',
    chapter: '07',
    domainNumber: 'Aerial Systems',
    name: 'Aerial Systems',
    tag: 'FLIGHT AERODYNAMICS',
    description: 'Aerial platforms, flight basics, sensing and applications.',
    borderColor: 'border-[#4ADE80]',
    accentColor: '#16A34A',
    barColor: '#16A34A',
    bgGradient: 'bg-gradient-to-b from-[#F0FDF4] to-white',
    waveColor: 'from-[#DCFCE7]/40 via-[#F0FDF4]/20 to-transparent',
    checkBg: 'bg-[#16A34A]',
    checkColor: 'text-white',
    tagColor: 'text-[#16A34A]',
    tagBg: 'bg-emerald-100 text-[#15803D]',
    specialCallout: {
      icon: <Plane className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />,
      text: 'Indoor control training: flying through hoops and around low and high obstacles, with safety first.',
      bg: '#F0FDF4',
      border: '#BBF7D0',
      color: '#15803D',
    },
    slideNumber: '04',
    items: [
      'Master lift dynamics & airfoil physics.',
      'Fly precision indoor obstacle courses.',
      'Calibrate flight telemetry & PID gyros.',
    ],
    metrics: [
      { value: 'AIRFOIL', label: 'Lift & Aerodynamics' },
      { value: 'FLIGHT', label: 'Thrust & Stability' },
      { value: 'TELEMETRY', label: 'Sensor Guidance' },
      { value: 'SAFETY', label: 'Enclosed Arena' },
    ],
    pillars: [
      { num: '01', title: 'Aerodynamics & Lift', desc: 'Airfoils & quad-rotor thrust dynamics' },
      { num: '02', title: 'Stabilization', desc: 'PID balance & IMU calibration' },
      { num: '03', title: 'Waypoints', desc: '3D coordinates & autonomous paths' },
      { num: '04', title: 'Sensory Mapping', desc: 'Altitude sensing & collision avoidance' },
    ],
    badgeNote: 'PLATFORM → SENSORS → CONTROL → DATA → APPLICATIONS',
    image: '/assets/indoor_drone_flight_hoops.webp',
    imageCaption: 'Aerial Systems',
    imageSubcaption: 'Indoor hoop and obstacle course with a small guarded drone',
    imageTag: 'Safe Lab Protocol',
  },
];

const DOMAIN_VECTORS = [
  <RoboticArmVector key="robotics" />,
  <AIChipVector key="ai" />,
  <DataChartVector key="data" />,
  <AerialDroneVector key="aerial" />,
];

export interface DomainsSectionProps {
  onSlideChange?: (index: number) => void;
}

export const DomainsSection: React.FC<DomainsSectionProps> = ({ onSlideChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(-1);
  const activeCardIndexRef = useRef<number>(-1);
  const prevIndexRef = useRef<number>(-1);
  const lastStepTimeRef = useRef<number>(0);
  const stepDirectionRef = useRef<number>(1);
  const modalBoxRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Sync ref with state
  useEffect(() => {
    activeCardIndexRef.current = activeCardIndex;
  }, [activeCardIndex]);

  // Smooth directional transition whenever activeCardIndex changes in modal
  useEffect(() => {
    if (activeCardIndex < 0) {
      prevIndexRef.current = -1;
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      prevIndexRef.current = activeCardIndex;
      return;
    }

    const wasClosed = prevIndexRef.current === -1;
    prevIndexRef.current = activeCardIndex;

    if (wasClosed) {
      // First open: scale & fade in the entire modal box
      if (modalBoxRef.current) {
        gsap.fromTo(
          modalBoxRef.current,
          { scale: 0.94, opacity: 0, y: 16 },
          { scale: 1, opacity: 1, y: 0, duration: 0.38, ease: 'power3.out' }
        );
      }
    } else {
      // Step transition between domains (e.g. Domain 01 -> Domain 02)
      if (modalContentRef.current) {
        const dir = stepDirectionRef.current || 1;
        const xOffset = dir > 0 ? 50 : -50;

        gsap.fromTo(
          modalContentRef.current,
          {
            x: xOffset,
            opacity: 0,
            filter: 'blur(3px)',
          },
          {
            x: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.42,
            ease: 'power2.out',
            clearProps: 'transform,filter',
          }
        );
      }
    }
  }, [activeCardIndex]);

  // Synchronize with SlideTransitions scroll events (Step through cards on scroll)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleStep = (e: Event) => {
      const now = Date.now();
      if (now - lastStepTimeRef.current < 350) {
        e.preventDefault();
        return;
      }

      const customEvent = e as CustomEvent<{ direction: number }>;
      const dir = customEvent.detail?.direction || 1;
      const cur = activeCardIndexRef.current;

      if (dir > 0) {
        // Forward scroll (down): step from Deck (-1) into Domain 01 (Card 0), then 1 -> 2 -> 3
        if (cur < DOMAINS.length - 1) {
          e.preventDefault();
          lastStepTimeRef.current = now;
          stepDirectionRef.current = 1;
          const next = cur === -1 ? 0 : cur + 1;
          setActiveCardIndex(next);
          activeCardIndexRef.current = next;
          onSlideChange?.(next + 3);
        } else {
          // Last domain reached (Domain 04: Aerial Systems):
          // DISMISS MODAL and let SlideTransitions advance to Slide 05 (Learning Approach)!
          lastStepTimeRef.current = now;
          setActiveCardIndex(-1);
          activeCardIndexRef.current = -1;
          // Do NOT call e.preventDefault(), so SlideTransitions proceeds to next slide!
        }
      } else {
        // Reverse scroll (up): step back through cards: 3 -> 2 -> 1 -> 0 -> Deck (-1)
        if (cur > -1) {
          e.preventDefault();
          lastStepTimeRef.current = now;
          stepDirectionRef.current = -1;
          const prev = cur - 1;
          setActiveCardIndex(prev);
          activeCardIndexRef.current = prev;
        }
        // At Deck view (-1), e.preventDefault() is NOT called, so SlideTransitions goes back to Slide 03!
      }
    };

    const handleSlideEnter = () => {
      setActiveCardIndex(-1);
      activeCardIndexRef.current = -1;
    };

    el.addEventListener('slide:step', handleStep);
    el.addEventListener('slide:enter', handleSlideEnter);
    return () => {
      el.removeEventListener('slide:step', handleStep);
      el.removeEventListener('slide:enter', handleSlideEnter);
    };
  }, [onSlideChange]);

  // Touch swipe support for modal on mobile
  const touchStartYRef = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0]?.clientY ?? null;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartYRef.current === null) return;
    const endY = e.changedTouches[0]?.clientY;
    if (endY === undefined) return;
    const deltaY = endY - touchStartYRef.current;
    touchStartYRef.current = null;

    if (Math.abs(deltaY) < 36) return;

    const now = Date.now();
    if (now - lastStepTimeRef.current < 450) return;

    if (deltaY < 0) {
      // Swiped UP (scroll down)
      if (activeCardIndexRef.current < DOMAINS.length - 1) {
        lastStepTimeRef.current = now;
        stepDirectionRef.current = 1;
        const next = activeCardIndexRef.current + 1;
        setActiveCardIndex(next);
        activeCardIndexRef.current = next;
        onSlideChange?.(next + 3);
      } else {
        // Last card: dismiss modal and navigate to next slide
        lastStepTimeRef.current = now;
        setActiveCardIndex(-1);
        activeCardIndexRef.current = -1;
        window.dispatchEvent(new CustomEvent('go-to-slide', { detail: 4 }));
      }
    } else {
      // Swiped DOWN (scroll up)
      if (activeCardIndexRef.current > 0) {
        lastStepTimeRef.current = now;
        stepDirectionRef.current = -1;
        const prev = activeCardIndexRef.current - 1;
        setActiveCardIndex(prev);
        activeCardIndexRef.current = prev;
      } else {
        // First card: dismiss modal and return to deck
        lastStepTimeRef.current = now;
        setActiveCardIndex(-1);
        activeCardIndexRef.current = -1;
      }
    }
  };

  // Mouse wheel directly inside open modal dialog or on modal backdrop
  const handleModalWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) < 16) return;

    const box = modalBoxRef.current;
    if (box && box.scrollHeight > box.clientHeight + 12) {
      const atTop = box.scrollTop <= 5;
      const atBottom = Math.ceil(box.scrollTop + box.clientHeight) >= box.scrollHeight - 6;
      if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) {
        return; // Allow natural scrolling inside modal
      }
    }

    const now = Date.now();
    if (now - lastStepTimeRef.current < 450) return;

    if (e.deltaY > 0) {
      if (activeCardIndex < DOMAINS.length - 1) {
        lastStepTimeRef.current = now;
        stepDirectionRef.current = 1;
        const next = activeCardIndex + 1;
        setActiveCardIndex(next);
        activeCardIndexRef.current = next;
        onSlideChange?.(next + 3);
      } else {
        // Last card (Domain 04: Aerial Systems): DISMISS MODAL and advance to next slide!
        lastStepTimeRef.current = now;
        setActiveCardIndex(-1);
        activeCardIndexRef.current = -1;
        window.dispatchEvent(new CustomEvent('go-to-slide', { detail: 4 }));
      }
    } else {
      if (activeCardIndex > 0) {
        lastStepTimeRef.current = now;
        stepDirectionRef.current = -1;
        const prev = activeCardIndex - 1;
        setActiveCardIndex(prev);
        activeCardIndexRef.current = prev;
      } else {
        // First card (Domain 01: Robotics): DISMISS MODAL and return to deck!
        lastStepTimeRef.current = now;
        setActiveCardIndex(-1);
        activeCardIndexRef.current = -1;
      }
    }
  };

  // Close modal on Escape key or when navigating to another slide
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeCardIndexRef.current !== -1) {
        setActiveCardIndex(-1);
        activeCardIndexRef.current = -1;
      }
    };

    const handleGoTo = (e: Event) => {
      const customEvent = e as CustomEvent<any>;
      const targetIdx =
        typeof customEvent.detail === 'number'
          ? customEvent.detail
          : typeof customEvent.detail?.index === 'number'
            ? customEvent.detail.index
            : null;
      // If navigating to another slide, always close the modal.
      if (typeof targetIdx === 'number' && targetIdx !== 3) {
        setActiveCardIndex(-1);
        activeCardIndexRef.current = -1;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('go-to-slide', handleGoTo);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('go-to-slide', handleGoTo);
    };
  }, []);

  const activeCard = activeCardIndex >= 0 ? DOMAINS[activeCardIndex] : null;

  return (
    <ChapterShell
      id="domains"
      chapterNumber="04"
      theme="light"
      fullBleed={true}
      className="relative w-full min-h-[100svh] lg:h-[100svh] overflow-y-auto lg:overflow-hidden select-none bg-[#FAF8F5]"
    >
      {/* Background ambient gentle wave glows */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-purple-100/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-100/35 rounded-full blur-3xl pointer-events-none" />

      {/* Main Centered Container with data-steppable to hook into scroll events */}
      <div
        ref={containerRef}
        data-steppable="true"
        id="technology-suite"
        className="relative w-full my-0 sm:my-auto flex flex-col justify-start sm:justify-center items-center gap-2.5 sm:gap-3 lg:gap-3.5 pt-[calc(var(--header-h,64px)+10px)] pb-20 sm:pb-8 lg:py-6 px-4 sm:px-6 lg:px-8 xl:px-10 box-border select-none z-10 max-w-[1440px] mx-auto min-h-[100svh] lg:min-h-0"
      >
        {/* Top Header: "Our Core Technology Ecosystem" */}
        <div className="w-full text-center shrink-0 pt-0.5 pb-0.5 relative z-10 flex flex-col items-center">
          <div className="flex items-center justify-center gap-2 mb-0.5">
            <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-r from-transparent to-[#b45309]" />
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-[#b45309] font-bold">
              OUR TECHNOLOGY DOMAINS
            </span>
            <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-l from-transparent to-[#b45309]" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-bold text-[#0F172A] tracking-tight leading-tight text-center">
            {siteConfig.domainsSection.headline}
          </h2>

          {/* Dual-Tone Orange Underline Curve */}
          <div className="w-40 sm:w-56 mx-auto mt-0.5 mb-0.5">
            <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-transparent via-[#b45309]/60 to-transparent shadow-[0_0_8px_rgba(180,83,9,0.3)]" />
          </div>
        </div>

        {/* 4 Straight, Upright Light-Themed Cards (Exact Image 1 Styling) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 xl:gap-4.5 items-stretch relative z-10">
          {DOMAINS.map((domain, idx) => (
            <div
              key={domain.id}
              onClick={() => {
                setActiveCardIndex(idx);
                onSlideChange?.(idx + 3);
              }}
              className={`group relative flex flex-col justify-between p-3.5 sm:p-4 xl:p-4.5 rounded-2xl border-2 ${domain.borderColor} ${domain.bgGradient} shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 cursor-pointer overflow-hidden min-h-[320px] sm:min-h-[340px]`}
            >
              {/* Corner soft pastel wave gradient accent */}
              <div
                className={`absolute bottom-0 right-0 w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tl ${domain.waveColor} blur-xl pointer-events-none`}
              />
              <div
                className={`absolute bottom-0 right-0 w-20 h-12 bg-gradient-to-tl ${domain.waveColor} rounded-tl-3xl pointer-events-none opacity-80`}
              />

              {/* Card Body - Balanced Vertical Rhythm */}
              <div className="relative z-10 flex-1 flex flex-col justify-between">
                <div>
                  {/* Domain Pill Badge & Number */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className={`font-mono text-[8px] sm:text-[8.5px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${domain.tagBg}`}>
                      {domain.tag}
                    </span>
                    <span className="font-mono text-[9px] text-slate-400 font-bold">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title & Vector Line-Art Icon Row */}
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <h3 className="font-serif text-[17px] sm:text-[18px] xl:text-[20px] font-bold text-[#0F172A] leading-tight tracking-tight group-hover:text-[#EA580C] transition-colors">
                        {domain.name}
                      </h3>
                      {/* Horizontal Colored Bar */}
                      <div
                        className="w-10 h-1 rounded-full mt-1.5 mb-1.5"
                        style={{ backgroundColor: domain.barColor }}
                      />
                    </div>
                    <div className="shrink-0 -mt-1 group-hover:scale-108 transition-transform duration-300">
                      {DOMAIN_VECTORS[idx]}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-[11px] sm:text-[11.5px] text-[#475569] leading-snug mb-2 font-normal">
                    {domain.description}
                  </p>
                </div>

                {/* What Students Do - 3 Practical Highlights */}
                <div className="pt-2 my-1 border-t border-slate-200/70 flex flex-col gap-1.5">
                  <span className="font-mono text-[8px] sm:text-[8.5px] uppercase tracking-wider text-slate-400 font-bold block">
                    What Students Do
                  </span>
                  {domain.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-start gap-1.5 text-[10.5px] sm:text-[11px] text-slate-700 leading-tight">
                      <span
                        className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-2xs"
                        style={{ backgroundColor: `${domain.accentColor}18`, color: domain.accentColor }}
                      >
                        <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                      </span>
                      <span className="font-sans font-medium line-clamp-2">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Process Flow Stage Chips */}
                <div className="pt-2 border-t border-slate-200/70 flex flex-wrap items-center gap-1 sm:gap-1.5">
                  {domain.metrics.map((m) => (
                    <span
                      key={m.value}
                      className="font-mono text-[7px] sm:text-[7.5px] xl:text-[8px] px-1.5 py-0.5 rounded bg-white text-slate-600 font-semibold border border-slate-200/80 shadow-2xs"
                    >
                      {m.value}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="relative z-10 pt-2 border-t border-slate-200/80 mt-2 sm:mt-2.5 flex items-center justify-between text-[11px] sm:text-[11.5px] font-mono font-medium">
                <span className="text-[10px] text-slate-500 font-sans font-medium">
                  Grade 3&ndash;12
                </span>
                <span
                  style={{ color: domain.accentColor }}
                  className="font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  Explore →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Full-Width "Computational Foundation" Container (Exact Image 1) */}
        <div className="w-full shrink-0 mt-2 sm:mt-2.5 relative z-10">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white px-4 sm:px-5 py-3 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-3">
            {/* Left: Math/Science Engineering Pedestal & Symbols */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0 w-full lg:w-auto justify-between lg:justify-start">
              <div className="flex items-center gap-2.5 text-[#EA580C] shrink-0">
                {/* 1. Sigma Symbol Σ */}
                <span className="font-serif text-2xl sm:text-[26px] font-bold leading-none select-none">
                  Σ
                </span>

                {/* 2. Protractor SVG */}
                <svg
                  viewBox="0 0 28 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-5 sm:w-7 sm:h-5"
                >
                  <path d="M2 18h24" />
                  <path d="M2 18 A12 12 0 0 1 26 18" />
                  <path d="M8 18 A6 6 0 0 1 20 18" />
                  <line x1="14" y1="6" x2="14" y2="8" />
                  <line x1="8" y1="8" x2="9.5" y2="9.5" />
                  <line x1="20" y1="8" x2="18.5" y2="9.5" />
                </svg>

                {/* 3. Drafting Compass SVG */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                >
                  <circle cx="12" cy="4" r="2" fill="currentColor" fillOpacity="0.2" />
                  <line x1="12" y1="2" x2="12" y2="4" />
                  <line x1="11" y1="6" x2="4" y2="22" />
                  <line x1="13" y1="6" x2="20" y2="22" />
                  <line x1="7.5" y1="15" x2="16.5" y2="15" />
                  <circle cx="12" cy="15" r="1.5" fill="currentColor" />
                </svg>
              </div>

              <div className="hidden sm:block w-px h-8 bg-slate-200 shrink-0" />

              {/* Title & Core Description */}
              <div className="text-left flex-1 min-w-0">
                <h4 className="font-serif text-sm sm:text-base font-bold text-[#0F172A] tracking-tight leading-tight">
                  Computational Foundation
                </h4>
                <p className="font-sans text-[10.5px] sm:text-[11.5px] text-[#475569] leading-tight truncate sm:whitespace-normal">
                  Logic, measurement, geometry, data reasoning, algorithms, and problem-solving that support all four.
                </p>
              </div>
            </div>

            {/* Right: 5 Interactive Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-1.5 sm:gap-2 shrink-0">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-sky-200 bg-sky-50 text-[#0284C7] text-[10.5px] font-mono font-bold shadow-2xs">
                <Puzzle className="w-3 h-3 text-[#0284C7]" />
                <span>Logic</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-orange-200 bg-orange-50 text-[#EA580C] text-[10.5px] font-mono font-bold shadow-2xs">
                <Ruler className="w-3 h-3 text-[#EA580C]" />
                <span>Measurement</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-purple-200 bg-purple-50 text-[#9333EA] text-[10.5px] font-mono font-bold shadow-2xs">
                <Triangle className="w-3 h-3 text-[#9333EA]" />
                <span>Geometry</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-cyan-200 bg-cyan-50 text-[#0891B2] text-[10.5px] font-mono font-bold shadow-2xs">
                <BarChart2 className="w-3 h-3 text-[#0891B2]" />
                <span>Data Reasoning</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-[#16A34A] text-[10.5px] font-mono font-bold shadow-2xs">
                <Code2 className="w-3 h-3 text-[#16A34A]" />
                <span>Algorithms</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Deep-Dive Modal View (Opens on card click) ─── */}
        {activeCard && typeof document !== 'undefined' && createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${activeCard.name} domain deep-dive`}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-fadeIn overflow-y-auto"
            onClick={() => {
              setActiveCardIndex(-1);
              activeCardIndexRef.current = -1;
            }}
            onWheel={handleModalWheel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={modalBoxRef}
              onWheel={handleModalWheel}
              className={`relative w-full max-w-5xl xl:max-w-6xl max-h-[calc(100svh-var(--header-h,64px)-20px)] sm:max-h-[90vh] overflow-y-auto rounded-3xl border-2 ${activeCard.borderColor} bg-white p-4 sm:p-7 text-[#0F172A] shadow-2xl transition-all duration-500 ease-out my-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated Transition Container for Domain Swaps */}
              <div ref={modalContentRef} key={activeCard.id} className="w-full">
                {/* Modal Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-xs transition-colors duration-500">
                      {DOMAIN_VECTORS[activeCardIndex]}
                    </div>
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F172A] leading-tight">
                        {activeCard.name}
                      </h3>
                    </div>
                  </div>

                  {/* Right controls: 4-Domain Step Indicator + Prev, Next & Close Button */}
                  <div className="flex items-center gap-2">
                    {/* Domain Step Pills (01, 02, 03, 04) */}
                    <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200/80 rounded-full">
                      {DOMAINS.map((d, dIdx) => {
                        const isCurrent = activeCardIndex === dIdx;
                        return (
                          <button
                            key={d.id}
                            type="button"
                            onClick={() => {
                              stepDirectionRef.current = dIdx > activeCardIndex ? 1 : -1;
                              setActiveCardIndex(dIdx);
                              onSlideChange?.(dIdx + 3);
                            }}
                            className={`h-2 rounded-full transition-all duration-400 cursor-pointer ${isCurrent ? 'w-6' : 'w-2 bg-slate-200 hover:bg-slate-300'
                              }`}
                            style={{
                              backgroundColor: isCurrent ? activeCard.accentColor : undefined,
                            }}
                            aria-label={`Jump to ${d.name}`}
                          />
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const prev = activeCardIndex > 0 ? activeCardIndex - 1 : DOMAINS.length - 1;
                        stepDirectionRef.current = -1;
                        setActiveCardIndex(prev);
                        onSlideChange?.(prev + 3);
                      }}
                      className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                      aria-label="Previous Domain"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (activeCardIndex === DOMAINS.length - 1) {
                          setActiveCardIndex(-1);
                          activeCardIndexRef.current = -1;
                          window.dispatchEvent(new CustomEvent('go-to-slide', { detail: 5 }));
                          return;
                        }

                        const next = activeCardIndex + 1;
                        stepDirectionRef.current = 1;
                        setActiveCardIndex(next);
                        activeCardIndexRef.current = next;
                        onSlideChange?.(next + 3);
                      }}
                      className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                      aria-label="Next Domain"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCardIndex(-1);
                        activeCardIndexRef.current = -1;
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-xs font-semibold transition-all cursor-pointer ml-1"
                    >
                      <X className="w-4 h-4" />
                      <span>Close</span>
                    </button>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                  {/* Left Column: Domain copy and process */}
                  <div className="lg:col-span-7 space-y-3">
                    <p className="font-sans text-xs sm:text-sm text-[#475569] leading-relaxed font-normal">
                      {activeCard.description}
                    </p>

                    <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                      What students do
                    </h4>
                    <ul className="space-y-2">
                      {activeCard.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-slate-700">
                          <Check className="mt-1 h-4 w-4 shrink-0" style={{ color: activeCard.accentColor }} aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-3">
                      {(activeCard.badgeNote ?? '').split('→').map((step) => (
                        <span
                          key={step}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-[10px] font-semibold text-slate-600"
                        >
                          {step.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Hardware Photo */}
                  <div className="lg:col-span-5 flex justify-center items-center">
                    <div className="relative overflow-hidden rounded-2xl bg-black border border-slate-200 shadow-xl w-full h-[220px] sm:h-[240px] group">
                      <img
                        key={activeCard.image}
                        src={activeCard.image}
                        alt={activeCard.imageCaption}
                        className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                        <div>
                          <span
                            className="font-mono text-[9.5px] tracking-wider uppercase font-bold block leading-tight mb-0.5 transition-colors duration-500"
                            style={{ color: activeCard.accentColor }}
                          >
                            {activeCard.imageCaption}
                          </span>
                          <p className="font-serif text-[11px] italic text-white/95 font-light leading-tight">
                            {activeCard.imageSubcaption}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </ChapterShell>
  );
};

export default DomainsSection;
