import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Compass, Bot, Cpu, BarChart3, Plane } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface EcosystemCardData {
  id: string;
  name: string;
  tag: string;
  bg: string;
  textColor: string;
  accent: string;
  dividerColor: string;
  rotation: number;
  badgeText: string;
  badgeBg: string;
  badgeTextColor: string;
  badgeIcon: React.ReactNode;
  slideId: string;
  slideNumber: string;
  items: string[];
}

const ECOSYSTEM_CARDS: EcosystemCardData[] = [
  {
    id: 'math-foundations',
    name: 'math & logic',
    tag: 'Bedrock Foundation',
    bg: '#182433',
    textColor: '#ffffff',
    accent: '#818cf8',
    dividerColor: 'rgba(129, 140, 248, 0.7)',
    rotation: -6,
    badgeText: 'LOGIC & PROOF',
    badgeBg: '#818cf8',
    badgeTextColor: '#0f172a',
    badgeIcon: <Compass className="w-4 h-4" />,
    slideId: 'slide-4',
    slideNumber: '04',
    items: [
      'Boolean Logic & State Machines',
      'Vectors, Kinematics & Geometry',
      'Distributions & Statistical Inference',
      'Algorithmic Convergence & Loops',
    ],
  },
  {
    id: 'robotics',
    name: 'robotics',
    tag: 'Physical Computing',
    bg: '#1c4250',
    textColor: '#ffffff',
    accent: '#38bdf8',
    dividerColor: 'rgba(56, 189, 248, 0.7)',
    rotation: -2.5,
    badgeText: 'EMBEDDED BENCH',
    badgeBg: '#38bdf8',
    badgeTextColor: '#0c2331',
    badgeIcon: <Bot className="w-4 h-4" />,
    slideId: 'slide-5',
    slideNumber: '05',
    items: [
      'Microcontrollers & Embedded C',
      'Sensors & Sensory Feedback',
      'Motor Drivers & PWM Actuators',
      'Mechanical Prototyping & CAD',
    ],
  },
  {
    id: 'ai-ml',
    name: 'ai & ml',
    tag: 'Cognitive Models',
    bg: '#254456',
    textColor: '#ffffff',
    accent: '#6ee7b7',
    dividerColor: 'rgba(110, 231, 183, 0.7)',
    rotation: 1.5,
    badgeText: 'NEURAL MODELS',
    badgeBg: '#6ee7b7',
    badgeTextColor: '#064e3b',
    badgeIcon: <Cpu className="w-4 h-4" />,
    slideId: 'slide-6',
    slideNumber: '06',
    items: [
      'Machine Learning Principles',
      'Supervised Training & Weights',
      'Computer Vision & Audio ML',
      'Ethical Safety Guardrails',
    ],
  },
  {
    id: 'data-analytics',
    name: 'data analytics',
    tag: 'Evidence & Insights',
    bg: '#8c4427',
    textColor: '#ffffff',
    accent: '#fed7aa',
    dividerColor: 'rgba(254, 215, 170, 0.8)',
    rotation: 4.5,
    badgeText: 'TELEMETRY LAB',
    badgeBg: '#fb923c',
    badgeTextColor: '#431407',
    badgeIcon: <BarChart3 className="w-4 h-4" />,
    slideId: 'slide-7',
    slideNumber: '07',
    items: [
      'Data Wrangling & Cleaning',
      'Trend & Outlier Detection',
      'Hypothesis Formulation',
      'Visual Storytelling & Charts',
    ],
  },
  {
    id: 'aerial-systems',
    name: 'aerial systems',
    tag: 'Flight Aerodynamics',
    bg: '#141d27',
    textColor: '#ffffff',
    accent: '#93c5fd',
    dividerColor: 'rgba(147, 197, 253, 0.7)',
    rotation: 7.5,
    badgeText: 'AUTONOMOUS FLIGHT',
    badgeBg: '#60a5fa',
    badgeTextColor: '#0f172a',
    badgeIcon: <Plane className="w-4 h-4" />,
    slideId: 'slide-8',
    slideNumber: '08',
    items: [
      'Multi-Rotor Aerodynamics',
      '3D Spatial Telemetry & IMUs',
      'Autonomous Waypoints',
      'Laboratory Tethered Protocols',
    ],
  },
];

interface TruusEcosystemCardsProps {
  onSelectDomain?: (slideId: string) => void;
}

export const TruusEcosystemCards: React.FC<TruusEcosystemCardsProps> = ({ onSelectDomain }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const cardsWrapper = cardsWrapperRef.current;
    if (!container || !cardsWrapper) return;

    const cards = gsap.utils.toArray<HTMLElement>('.truus-fan-card', cardsWrapper);
    if (!cards.length) return;

    const originalData = ECOSYSTEM_CARDS.map((c) => ({ rotation: c.rotation }));

    // Animate Title Underline SVG on Scroll
    const underlinePath = container.querySelector('.truus-underline-path');
    if (underlinePath) {
      gsap.fromTo(
        underlinePath,
        { strokeDashoffset: 400, strokeDasharray: 400 },
        {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Truus.co Elastic Fan Physics
    const isMobile = window.matchMedia('(max-width: 900px)').matches;

    if (!isMobile) {
      cards.forEach((card, index) => {
        let lastX = 0;
        let lastY = 0;
        let speedX = 0;
        let speedY = 0;

        const onMove = (e: MouseEvent) => {
          speedX = e.clientX - lastX;
          speedY = e.clientY - lastY;
          lastX = e.clientX;
          lastY = e.clientY;

          // Micro inertia tilt from Truus Image 1 (velocity tracking)
          gsap.to(card, {
            rotation: originalData[index].rotation + speedX * 0.12,
            y: (gsap.getProperty(card, 'y') as number || 0) + speedY * 0.05,
            duration: 0.35,
            ease: 'power1.out',
            overwrite: 'auto',
          });
        };

        const onEnter = (e: MouseEvent) => {
          speedX = 0;
          speedY = 0;
          lastX = e.clientX;
          lastY = e.clientY;

          const hoverGap = 90;
          const clusterGap = 130;
          const cardWidth = 280;
          const hoveredLeft = cards[index].offsetLeft;
          const leftCards: { card: HTMLElement; index: number }[] = [];
          const rightCards: { card: HTMLElement; index: number }[] = [];

          cards.forEach((otherCard, otherIndex) => {
            if (otherIndex < index) leftCards.push({ card: otherCard, index: otherIndex });
            else if (otherIndex > index) rightCards.push({ card: otherCard, index: otherIndex });
          });

          // Elevate and straighten the hovered card
          gsap.to(cards[index], {
            x: 0,
            y: -35,
            rotation: 0,
            scale: 1.08,
            duration: 0.9,
            ease: 'elastic.out(1, 0.5)',
            zIndex: 40,
            overwrite: true,
          });

          // Spread right cards
          if (rightCards.length) {
            const clusterStart = hoveredLeft + cardWidth + hoverGap;
            rightCards.forEach((item, i) => {
              const targetAbsLeft = clusterStart + i * clusterGap;
              const targetX = Math.max(targetAbsLeft - item.card.offsetLeft, 12);
              const angleRad = originalData[item.index].rotation * (Math.PI / 180);
              const targetY = targetX * Math.tan(angleRad);
              gsap.to(item.card, {
                x: targetX,
                y: targetY,
                rotation: originalData[item.index].rotation,
                scale: 0.98,
                duration: 1.0,
                ease: 'elastic.out(1, 0.5)',
                zIndex: item.index + 1,
                overwrite: true,
              });
            });
          }

          // Spread left cards
          if (leftCards.length) {
            leftCards.reverse();
            const clusterStart = hoveredLeft - hoverGap - cardWidth;
            leftCards.forEach((item, i) => {
              const targetAbsLeft = clusterStart - i * clusterGap;
              const targetX = Math.min(targetAbsLeft - item.card.offsetLeft, -12);
              const angleRad = originalData[item.index].rotation * (Math.PI / 180);
              const targetY = targetX * Math.tan(angleRad);
              gsap.to(item.card, {
                x: targetX,
                y: targetY,
                rotation: originalData[item.index].rotation,
                scale: 0.98,
                duration: 1.0,
                ease: 'elastic.out(1, 0.5)',
                zIndex: item.index + 1,
                overwrite: true,
              });
            });
          }
        };

        const onLeave = () => {
          cards.forEach((c, i) => {
            gsap.to(c, {
              x: 0,
              y: 0,
              scale: 1,
              rotation: originalData[i].rotation,
              duration: 1.0,
              ease: 'elastic.out(1, 0.5)',
              overwrite: true,
              zIndex: i + 1,
              delay: 0.05,
            });
          });
        };

        card.addEventListener('mouseenter', onEnter);
        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
      });
    }

    return () => {
      // Cleanup event listeners
      cards.forEach((card) => {
        card.replaceWith(card.cloneNode(true));
      });
    };
  }, []);

  const handleCardClick = (slideId: string) => {
    if (onSelectDomain) {
      onSelectDomain(slideId);
    } else {
      const el = document.getElementById(slideId);
      if (el) {
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(el, { offset: -20, duration: 1.2 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <div ref={containerRef} className="w-full relative select-none flex flex-col justify-center items-center py-6">
      
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

      {/* ─── Top Title with Hand-drawn Truus Style Underline ─── */}
      <div className="text-center mb-6 max-w-3xl px-4 relative">
        <h2 className="font-serif-editorial text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-tight">
          our core technology <span className="italic font-light text-[#38bdf8]">ecosystem:</span>
        </h2>
        
        {/* Truus Underline SVG */}
        <div className="w-48 sm:w-64 mx-auto -mt-1 mb-2">
          <svg viewBox="0 0 159 17" fill="none" className="w-full text-[#38bdf8]">
            <path
              className="truus-underline-path"
              d="M1 12.1515C53.0771 5.7187 105.529 2.30552 158 1.93652"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="truus-underline-path"
              d="M30.2672 15.9461C64.1899 12.8158 98.2663 11.3583 132.33 11.5735"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className="font-sans-modern text-xs sm:text-sm text-white/75 font-normal max-w-xl mx-auto">
          Hover on any card to explore its engineering depth. Click to jump directly to its dedicated presentation chapter.
        </p>
      </div>

      {/* ─── Truus 5-Card Fanned Out Deck ─── */}
      <div
        ref={cardsWrapperRef}
        className="relative w-full max-w-[1300px] h-[520px] sm:h-[540px] flex justify-center items-center overflow-visible px-4"
      >
        {ECOSYSTEM_CARDS.map((card, idx) => {
          // Perfectly centered equidistant fan layout (280px width, 70px overlap, 1120px total spread)
          const leftOffsets = [
            'calc(50% - 560px)',
            'calc(50% - 350px)',
            'calc(50% - 140px)',
            'calc(50% + 70px)',
            'calc(50% + 280px)',
          ];
          const topOffsets = ['20px', '40px', '10px', '30px', '50px'];

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.slideId)}
              style={{
                backgroundColor: card.bg,
                color: card.textColor,
                transform: `rotate(${card.rotation}deg)`,
                left: leftOffsets[idx],
                top: topOffsets[idx],
                zIndex: idx + 1,
              }}
              className="truus-fan-card group cursor-pointer absolute w-[270px] sm:w-[290px] h-[420px] sm:h-[440px] rounded-2xl p-6 shadow-2xl border border-white/20 flex flex-col justify-between select-none transition-shadow hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] will-change-transform"
            >
              {/* Playful Floating Badge/Sticker on top */}
              <div
                style={{ backgroundColor: card.badgeBg, color: card.badgeTextColor }}
                className="absolute -top-4 right-4 px-3 py-1 rounded-full shadow-md font-mono-tech text-[10px] font-bold tracking-wider flex items-center gap-1.5 border border-black/10 transform group-hover:scale-110 transition-transform"
              >
                {card.badgeIcon}
                <span>{card.badgeText}</span>
              </div>

              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono-tech opacity-75 mb-1.5">
                  <span className="uppercase tracking-widest">{card.tag}</span>
                  <span className="font-bold">CH {card.slideNumber}</span>
                </div>

                <h3 className="font-serif-editorial text-2xl sm:text-3xl font-extrabold capitalize leading-none tracking-tight mb-3">
                  {card.name}
                </h3>

                {/* Hand-drawn SVG divider */}
                <div className="w-full my-2 text-white/40">
                  <svg width="100%" height="8" aria-hidden="true">
                    <use href="#truus-card-divider" />
                  </svg>
                </div>

                {/* Bullet List with Truus Star Bullets */}
                <ul className="space-y-2 mt-4 font-sans-modern text-xs sm:text-sm font-medium opacity-90">
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
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Card Action Footer */}
              <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs font-mono-tech">
                <span className="opacity-75 group-hover:opacity-100 transition-opacity">
                  Click to inspect slide
                </span>
                <span
                  style={{ color: card.accent }}
                  className="font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  Explore →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Pill Helper */}
      <div className="mt-2 text-center font-mono-tech text-xs text-white/50 tracking-wider">
        DRAGGABLE & TILTED WITH PHYSICS • INSPIRED BY TRUUS.CO
      </div>

    </div>
  );
};
