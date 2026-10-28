import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Compass,
  Bot,
  Cpu,
  BarChart3,
  Plane,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Magnetic } from '../components/motion/Magnetic';
import { AnimatedCounter } from '../components/motion/AnimatedCounter';
import { LineReveal } from '../components/motion/LineReveal';

gsap.registerPlugin(ScrollTrigger);

interface TechEcosystemSuiteProps {
  onSlideChange?: (index: number) => void;
}

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
    id: 'math-foundations',
    slideId: 'slide-4',
    slideIndex: 3,
    chapter: '04',
    domainNumber: 'Bedrock Foundation',
    name: 'math & logic',
    fullName: 'Mathematical & Computational',
    italicWord: 'Foundations',
    tag: 'Bedrock Foundation',
    tagline: 'Formal Logic, Vectors & Discrete Structures',
    description:
      'Discrete logic, vector transforms, and statistical models powering modern engineering.',
    bg: '#182433',
    textColor: '#ffffff',
    accent: '#818cf8',
    glowColor: 'rgba(129, 140, 248, 0.45)',
    rotation: -6,
    deckX: -420,
    deckY: -25,
    badgeText: 'LOGIC & PROOF',
    badgeBg: '#818cf8',
    badgeTextColor: '#0f172a',
    badgeIcon: <Compass className="w-3.5 h-3.5" />,
    icon: <Compass className="w-5 h-5 text-[#818cf8]" />,
    slideNumber: '04',
    items: [
      'Boolean Logic & State Machines',
      'Vectors, Kinematics & Geometry',
      'Distributions & Statistical Inference',
      'Algorithmic Convergence Loops',
    ],
    metrics: [
      { value: 100, suffix: '%', label: 'Formal Rigor' },
      { value: 4, suffix: ' Pillars', label: 'Bedrock Concepts' },
      { value: 1000, suffix: '+', label: 'Algorithmic Loops' },
    ],
    tags: ['Boolean Logic', 'Vectors & Transforms', 'Statistical Inference', 'Convergence'],
    pillars: [
      { num: '01', title: 'Boolean Logic', desc: 'State automata & bitwise rules' },
      { num: '02', title: 'Vectors & 3D Geometry', desc: 'Spatial transforms & matrix projections' },
      { num: '03', title: 'Statistical Inference', desc: 'Variance analysis & empirical models' },
      { num: '04', title: 'Algorithmic Loops', desc: 'Iterative optimization & recursion' },
    ],
    badgeNote: 'Mathematical rigor underlying robotics, neural models, and flight physics.',
    badgeIconNote: <Sparkles className="w-4 h-4 text-[#818cf8]" />,
    image: '/assets/page_06.jpg',
    imageCaption: 'Computational Bedrock',
    imageSubcaption: 'Matrix transforms & discrete logic',
    imageTag: 'Bedrock Core',
  },
  {
    id: 'robotics',
    slideId: 'slide-5',
    slideIndex: 4,
    chapter: '05',
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
    rotation: -2.5,
    deckX: -210,
    deckY: -5,
    badgeText: 'EMBEDDED BENCH',
    badgeBg: '#38bdf8',
    badgeTextColor: '#0c2331',
    badgeIcon: <Bot className="w-3.5 h-3.5" />,
    icon: <Bot className="w-5 h-5 text-[#38bdf8]" />,
    slideNumber: '05',
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
    image: '/assets/page_13.jpg',
    imageCaption: 'Actuation Station',
    imageSubcaption: '6-Axis kinematics & gripper feedback',
    imageTag: 'School Lab Platform',
  },
  {
    id: 'ai-ml',
    slideId: 'slide-6',
    slideIndex: 5,
    chapter: '06',
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
    rotation: 1.5,
    deckX: 0,
    deckY: -35,
    badgeText: 'NEURAL MODELS',
    badgeBg: '#6ee7b7',
    badgeTextColor: '#064e3b',
    badgeIcon: <Cpu className="w-3.5 h-3.5" />,
    icon: <Cpu className="w-5 h-5 text-[#6ee7b7]" />,
    slideNumber: '06',
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
    image: '/assets/page_02.jpg',
    imageCaption: 'Simulation & Vision',
    imageSubcaption: 'Spatial models & neural inference',
    imageTag: 'Neural Inference',
  },
  {
    id: 'data-analytics',
    slideId: 'slide-7',
    slideIndex: 6,
    chapter: '07',
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
    rotation: 4.5,
    deckX: 210,
    deckY: -15,
    badgeText: 'TELEMETRY LAB',
    badgeBg: '#fb923c',
    badgeTextColor: '#431407',
    badgeIcon: <BarChart3 className="w-3.5 h-3.5" />,
    icon: <BarChart3 className="w-5 h-5 text-[#fed7aa]" />,
    slideNumber: '07',
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
    image: '/assets/laptop_analytics.jpg',
    imageCaption: 'Telemetry Lab',
    imageSubcaption: 'Multi-variate telemetry & synthesis',
    imageTag: 'Live Telemetry',
  },
  {
    id: 'aerial-systems',
    slideId: 'slide-8',
    slideIndex: 7,
    chapter: '08',
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
    rotation: 7.5,
    deckX: 420,
    deckY: 5,
    badgeText: 'AUTONOMOUS FLIGHT',
    badgeBg: '#60a5fa',
    badgeTextColor: '#0f172a',
    badgeIcon: <Plane className="w-3.5 h-3.5" />,
    icon: <Plane className="w-5 h-5 text-[#93c5fd]" />,
    slideNumber: '08',
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
    image: '/assets/page_08.jpg',
    imageCaption: 'Spatial Mapping',
    imageSubcaption: '3D Waypoint & Inertial Guidance',
    imageTag: 'Safe Lab Protocol',
  },
];

export const TechEcosystemSuite: React.FC<TechEcosystemSuiteProps> = ({ onSlideChange }) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeCardIndexRef = useRef<number>(-1);
  const [activeDataStage, setActiveDataStage] = useState<number>(0);

  // Jump to specific card by scrolling the pinned timeline to its precise hold trigger position
  const jumpToCard = (targetIndex: number) => {
    const st = ScrollTrigger.getById('tech-ecosystem-pin');
    if (!st) {
      activeCardIndexRef.current = targetIndex;
      return;
    }

    // Midpoints of hold states:
    // -1 (Overview): 0.04
    // 0 (Math & Logic): 0.17
    // 1 (Robotics): 0.35
    // 2 (AI & ML): 0.53
    // 3 (Data Analytics): 0.71
    // 4 (Aerial Systems): 0.89
    const targetProgress =
      targetIndex === -1 ? 0.04 : [0.17, 0.35, 0.53, 0.71, 0.89][targetIndex] ?? 0.04;
    const targetY = st.start + targetProgress * (st.end - st.start);

    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(targetY, {
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const ctx = gsap.context(() => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Responsive calculations: Squarish, vertically stretched expanded card popup
      const spread = vw < 640 ? 0.38 : vw < 768 ? 0.50 : vw < 1080 ? 0.72 : vw < 1366 ? 0.88 : 1.0;
      const deckCardW = vw < 640 ? 260 : vw < 768 ? 280 : 310;
      const deckCardH = vw < 640 ? 410 : vw < 768 ? 430 : 460;
      // Compact, centered squarish panel that maintains generous space from the bottom of the viewport
      const panelW = Math.min(760, Math.floor(vw * (vw < 640 ? 0.94 : vw < 1024 ? 0.86 : 0.60)));
      const panelH = Math.min(500, Math.floor(vh * (vh < 750 ? 0.68 : 0.62)));

      // Setup initial explicit FLIP state for each of the 5 cards in the deck
      cardRefs.current.forEach((cardEl, idx) => {
        if (!cardEl) return;
        const dom = DOMAINS[idx];

        gsap.set(cardEl, {
          xPercent: -50,
          yPercent: -50,
          x: Math.round(dom.deckX * spread),
          y: dom.deckY,
          rotation: dom.rotation,
          width: deckCardW,
          height: deckCardH,
          borderRadius: 20,
          zIndex: idx + 1,
          opacity: 1,
          scale: 1,
          boxShadow: '0 24px 60px rgba(0,0,0,0.55)',
          transformOrigin: 'center center',
          force3D: true,
        });

        const deckFace = cardEl.querySelector('.deck-face');
        const expandedFace = cardEl.querySelector('.expanded-face');
        if (deckFace) gsap.set(deckFace, { autoAlpha: 1 });
        if (expandedFace) gsap.set(expandedFace, { autoAlpha: 0, pointerEvents: 'none' });
      });

      // Master ScrollTrigger timeline for reversible, bi-directional scroll morphing
      // Six ecosystem states, each held comfortably across 8 viewports
      const tl = gsap.timeline({
        id: 'tech-ecosystem-pin',
        scrollTrigger: {
          id: 'tech-ecosystem-pin',
          trigger: stage,
          start: 'top top',
          end: () => `+=${window.innerHeight * 8}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.75,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            let nextIndex = -1;
            let nextSlide = 3;

            if (p < 0.08) {
              nextSlide = 3; // Overview
              nextIndex = -1;
            } else if (p < 0.26) {
              nextSlide = 3; // Math & Logic
              nextIndex = 0;
            } else if (p < 0.44) {
              nextSlide = 4; // Robotics & Automation
              nextIndex = 1;
            } else if (p < 0.62) {
              nextSlide = 5; // AI & Machine Learning
              nextIndex = 2;
            } else if (p < 0.80) {
              nextSlide = 6; // Data Analytics
              nextIndex = 3;
            } else {
              nextSlide = 7; // Aerial Systems
              nextIndex = 4;
            }

            onSlideChange?.(nextSlide);
            activeCardIndexRef.current = nextIndex;
          },
        },
      });

      // Header dims slightly when cards are expanded to keep focus on active panel
      tl.to(
        headerRef.current,
        {
          opacity: 0.15,
          y: -12,
          duration: 0.4,
          ease: 'power2.inOut',
        },
        0.5
      );

      // Pacing breakdown across 10.0 total duration:
      // Initial Deck View: 0.0 to 0.8s
      // Card 0: 0.8s to 2.6s (Expand: 0.8->1.25, HOLD: 1.25->2.15, Contract: 2.15->2.6)
      // Card 1: 2.6s to 4.4s (Expand: 2.6->3.05, HOLD: 3.05->3.95, Contract: 3.95->4.4)
      // Card 2: 4.4s to 6.2s (Expand: 4.4->4.85, HOLD: 4.85->5.75, Contract: 5.75->6.2)
      // Card 3: 6.2s to 8.0s (Expand: 6.2->6.65, HOLD: 6.65->7.55, Contract: 7.55->8.0)
      // Card 4: 8.0s to 9.8s (Expand: 8.0->8.45, HOLD: 8.45->9.35, Contract: 9.35->9.8)
      // Final buffer: 9.8s to 10.0s (Full Deck Restored)

      const cardSegDuration = 1.8;
      const expandDuration = 0.45;
      const contractDuration = 0.45;

      DOMAINS.forEach((domain, idx) => {
        const cardEl = cardRefs.current[idx];
        if (!cardEl) return;

        const deckFace = cardEl.querySelector('.deck-face');
        const expandedFace = cardEl.querySelector('.expanded-face');
        const otherCards = cardRefs.current.filter((_, i) => i !== idx);

        const startTime = 0.8 + idx * cardSegDuration;
        const holdEndTime = startTime + cardSegDuration - contractDuration;

        const originalX = Math.round(domain.deckX * spread);
        const originalY = domain.deckY;

        // 1. Physical FLIP Morph: Card moves to center, straightens to 0deg, expands to panel dimensions
        tl.to(
          cardEl,
          {
            xPercent: -50,
            yPercent: -50,
            x: 0,
            y: -16,
            scale: 1,
            rotation: 0,
            opacity: 1,
            width: panelW,
            height: panelH,
            borderRadius: 24,
            boxShadow: `0 28px 80px -15px ${domain.glowColor}, 0 0 0 1px rgba(255,255,255,0.25)`,
            zIndex: 50,
            duration: expandDuration,
            ease: 'power2.inOut',
          },
          startTime
        );

        // Dim background cards in the deck
        tl.to(
          otherCards,
          {
            opacity: 0.18,
            scale: 0.94,
            duration: expandDuration * 0.7,
            ease: 'power2.out',
          },
          startTime
        );

        // Cross-fade internal card content smoothly
        tl.to(
          deckFace,
          {
            autoAlpha: 0,
            duration: expandDuration * 0.5,
            ease: 'power1.out',
          },
          startTime
        );

        tl.fromTo(
          expandedFace,
          { autoAlpha: 0, scale: 0.97 },
          {
            autoAlpha: 1,
            scale: 1,
            pointerEvents: 'auto',
            duration: expandDuration * 0.6,
            ease: 'power2.out',
          },
          startTime + expandDuration * 0.4
        );

        // 2. STABLE READING HOLD: From expandEndTime to holdEndTime
        // During this generous window, the card stays 100% expanded and static for comfortable reading!

        // 3. Reverse Contract: Collapses back down to exact original deck position and rotation
        tl.to(
          expandedFace,
          {
            autoAlpha: 0,
            scale: 0.97,
            pointerEvents: 'none',
            duration: contractDuration * 0.4,
            ease: 'power1.in',
          },
          holdEndTime
        );

        tl.to(
          deckFace,
          {
            autoAlpha: 1,
            duration: contractDuration * 0.5,
            ease: 'power1.out',
          },
          holdEndTime + contractDuration * 0.2
        );

        tl.to(
          cardEl,
          {
            xPercent: -50,
            yPercent: -50,
            x: originalX,
            y: originalY,
            rotation: domain.rotation,
            width: deckCardW,
            height: deckCardH,
            borderRadius: 20,
            opacity: 1,
            scale: 1,
            boxShadow: '0 24px 60px rgba(0,0,0,0.55)',
            zIndex: idx + 1,
            duration: contractDuration,
            ease: 'power2.inOut',
          },
          holdEndTime
        );

        // Restore other cards
        tl.to(
          otherCards,
          {
            opacity: 1,
            scale: 1,
            duration: contractDuration * 0.8,
            ease: 'power2.out',
          },
          holdEndTime + contractDuration * 0.2
        );
      });

      // Restore header at the end of suite
      tl.to(
        headerRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        },
        9.8
      );
    }, stage);

    return () => ctx.revert();
  }, [onSlideChange]);

  return (
    <div
      ref={stageRef}
      id="technology-suite"
      className="relative w-full h-screen bg-[#0A1016] text-white overflow-hidden select-none flex flex-col justify-between"
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

      {/* Invisible Anchors for Direct Slide Navigation */}
      <div id="slide-4" className="absolute top-0 pointer-events-none" />
      <div id="slide-5" className="absolute pointer-events-none" style={{ top: '25%' }} />
      <div id="slide-6" className="absolute pointer-events-none" style={{ top: '48%' }} />
      <div id="slide-7" className="absolute pointer-events-none" style={{ top: '70%' }} />
      <div id="slide-8" className="absolute pointer-events-none" style={{ top: '90%' }} />

      {/* ─── Top Header (Preserved Truus Title) ─── */}
      <div
        ref={headerRef}
        className="w-full text-center pt-3 sm:pt-4 px-4 relative z-10 transition-all duration-500"
      >
        <h2 className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl font-normal text-white tracking-tight leading-tight">
          our core technology <span className="italic font-light text-[#38bdf8]">ecosystem:</span>
        </h2>

        {/* Hand-drawn Truus Style Underline */}
        <div className="w-36 sm:w-48 mx-auto -mt-0.5 mb-1">
          <svg viewBox="0 0 159 17" fill="none" className="w-full text-[#38bdf8]">
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

        <p className="font-sans-modern text-[11px] sm:text-xs text-white/75 font-normal max-w-lg mx-auto">
          Hover on any card to explore its engineering depth. Scroll to trigger the shared-element deep dive.
        </p>
      </div>

      {/* ─── The Stage: Exact 5 Persistent DOM Cards That Morph Physically ─── */}
      <div className="relative w-full flex-1 flex items-center justify-center overflow-visible pb-8 sm:pb-10 lg:pb-12">
        {DOMAINS.map((card, idx) => {
          return (
            <div
              key={card.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              onClick={() => {
                jumpToCard(idx);
              }}
              style={{
                backgroundColor: card.bg,
                color: card.textColor,
                left: '50%',
                top: '50%',
                transformOrigin: 'center center',
              }}
              className="truus-morph-card absolute w-[280px] sm:w-[310px] h-[430px] sm:h-[460px] cursor-pointer rounded-2xl shadow-2xl border border-white/20 select-none overflow-visible will-change-transform"
            >
              {/* =========================================================================
                  FACE 1: DECK STATE (100% Exact Existing Design Preserved, Zero Clipping)
                  ========================================================================= */}
              <div className="deck-face absolute inset-0 p-5 sm:p-6 flex flex-col justify-between z-10 overflow-visible">
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
                    className="font-bold flex items-center gap-1"
                  >
                    Explore →
                  </span>
                </div>
              </div>

              {/* =========================================================================
                  FACE 2: EXPANDED PRESENTATION PANEL (Transforms Inside the Same DOM Element)
                  ========================================================================= */}
              <div className="expanded-face absolute inset-0 p-4 sm:p-5 lg:p-5 flex flex-col justify-between z-30 overflow-hidden opacity-0 pointer-events-none select-text text-white rounded-3xl">
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

                  </div>
                </div>

                <LineReveal color={card.accent} height={1.5} className="mb-2 shrink-0" />

                {/* Main Content Grid: Balanced & Proportionate Square Distribution */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6 items-center my-auto flex-1 min-h-0">
                  {/* Left Column: Headlines, Metrics & 2 Core Pillars */}
                  <div className="lg:col-span-6 space-y-2 sm:space-y-2.5 flex flex-col justify-center">
                    <div>
                      <h3 className="font-serif-editorial text-lg sm:text-xl lg:text-[22px] font-normal text-white tracking-tight leading-snug">
                        {card.fullName}{' '}
                        <span className="italic font-light" style={{ color: card.accent }}>
                          {card.italicWord}
                        </span>
                      </h3>
                      <p className="font-sans-modern text-[11.5px] sm:text-xs text-white/80 mt-1 leading-relaxed font-normal max-w-md">
                        {card.description}
                      </p>
                    </div>

                    {/* Live Animated Metrics Strip */}
                    <div className="grid grid-cols-3 gap-2 py-2 px-3.5 border border-white/10 bg-white/5 rounded-xl">
                      {card.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="text-left">
                          <div
                            className="font-mono-tech text-sm sm:text-base font-bold"
                            style={{ color: mIdx === 0 ? card.accent : '#ffffff' }}
                          >
                            <AnimatedCounter value={m.value} suffix={m.suffix} />
                          </div>
                          <div className="font-mono-tech text-[9.5px] text-white/60 uppercase leading-tight">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* 2 Core Pillars Grid */}
                    <div className="grid grid-cols-2 gap-2.5 pt-0.5">
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
                              className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all duration-300 h-full ${
                                card.id === 'data-analytics'
                                    ? isStageSelected
                                    ? 'bg-white/20 border-white ring-1 ring-white/40 shadow-xs cursor-pointer'
                                    : 'bg-black/25 border-white/10 hover:bg-white/10 hover:border-white/20 cursor-pointer'
                                  : 'bg-black/25 border-white/10 hover:bg-white/10 hover:border-white/20 shadow-xs'
                              }`}
                            >
                              <div
                                className="font-mono-tech text-[9.5px] font-bold"
                                style={{ color: card.accent }}
                              >
                                {card.id === 'data-analytics' ? `STAGE ${item.num}` : `CORE PILLAR ${item.num}`}
                              </div>
                              <div className="font-sans-modern text-xs font-semibold text-white leading-tight mt-1 truncate">
                                {item.title}
                              </div>
                              <div className="font-sans-modern text-[10.5px] text-white/70 mt-1 leading-snug">
                                {item.desc}
                              </div>
                            </div>
                          </Magnetic>
                        );
                      })}
                    </div>

                    {/* Bottom Verification Note to fill space cleanly */}
                    <div className="flex items-center justify-between text-[11px] font-mono-tech text-white/60 pt-2 border-t border-white/8">
                      <span className="flex items-center gap-1.5 truncate">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: card.accent }} />
                        <span className="truncate">{card.badgeNote || `${card.fullName} verified curriculum`}</span>
                      </span>
                      <span className="shrink-0 text-white/40 font-medium ml-2">Domain Spec</span>
                    </div>
                  </div>

                  {/* Right Column: Controlled Height Visual Card */}
                  <div className="lg:col-span-6 flex justify-center items-center h-full">
                    <div className="relative overflow-hidden rounded-2xl bg-black border border-white/20 shadow-xl w-full max-w-[310px] sm:max-w-[330px] lg:max-w-[340px] h-[250px] sm:h-[270px] lg:h-[290px] group">
                      <img
                        src={card.image}
                        alt={card.imageCaption}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                      <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between text-white">
                        <div>
                          <span
                            className="font-mono-tech text-[9.5px] tracking-wider uppercase font-bold block leading-tight mb-0.5"
                            style={{ color: card.accent }}
                          >
                            {card.imageCaption}
                          </span>
                          <p className="font-serif-editorial text-[10.5px] sm:text-[11px] italic text-white/95 font-light leading-tight">
                            {card.imageSubcaption}
                          </p>
                        </div>
                        <span className="font-mono-tech text-[9px] text-white/80 bg-white/15 px-2.5 py-0.5 rounded-full border border-white/20 font-medium whitespace-nowrap">
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
  );
};

export default TechEcosystemSuite;
