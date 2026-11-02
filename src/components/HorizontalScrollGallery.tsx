import React, {
  useRef,
  useLayoutEffect,
  useEffect,
} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronRight, Layers } from 'lucide-react';
import type { GalleryItem } from '../types';

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export type { GalleryItem };

export interface HorizontalScrollGalleryProps {
  id?: string;
  dataSlideIndex?: number | string;
  badge?: string;
  headline?: string;
  italicHeadline?: string;
  description?: string;
  items: GalleryItem[];
  nextSectionId?: string;
  nextSectionTitle?: string;
  onItemSelect?: (item: GalleryItem, index: number) => void;
  className?: string;
}

export const HorizontalScrollGallery: React.FC<HorizontalScrollGalleryProps> = ({
  id = 'horizontal-gallery',
  dataSlideIndex,
  headline = 'Preparing students for',
  italicHeadline = "tomorrow's innovations.",
  description = 'Glide through hands-on domains advancing capability, precision, and systemic understanding.',
  items,
  nextSectionId = 'slide-12',
  nextSectionTitle = 'Benefits for Schools & Students',
  onItemSelect,
  className = '',
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinnedContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardWrapperRefs = useRef<(HTMLDivElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const pinnedContainer = pinnedContainerRef.current;
    const track = trackRef.current;
    if (!section || !pinnedContainer || !track) return;

    let ctx: gsap.Context | null = null;
    let timerId: ReturnType<typeof setTimeout> | null = null;
    let rAFId: number | null = null;

    // Safety check & robust initialization function
    const initScrollTrigger = () => {
      if (!section || !pinnedContainer || !track) return;

      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;

      // Safety check: ensure DOM and widths are accurately calculated
      if (trackWidth <= viewportWidth) {
        rAFId = requestAnimationFrame(() => {
          timerId = setTimeout(initScrollTrigger, 60);
        });
        return;
      }

      ctx = gsap.context(() => {
        // 1. Dynamic Entrance Animation: Triggers when Slide 11 scrolls into viewport
        const entranceTl = gsap.timeline({
          scrollTrigger: {
            id: `${id}-entrance`,
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });

        if (headlineRef.current) {
          entranceTl.fromTo(
            headlineRef.current,
            { y: 35, opacity: 0, filter: 'blur(8px)' },
            { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.85, ease: 'power3.out' }
          );
        }

        if (descRef.current) {
          entranceTl.fromTo(
            descRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
            '-=0.6'
          );
        }

        const validWrappers = cardWrapperRefs.current.filter(Boolean) as HTMLDivElement[];
        if (validWrappers.length > 0) {
          entranceTl.fromTo(
            validWrappers,
            {
              y: 70,
              opacity: 0,
              scale: 0.92,
              filter: 'blur(6px)',
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              duration: 0.8,
              stagger: 0.08,
              ease: 'power3.out',
              clearProps: 'filter',
            },
            '-=0.5'
          );
        }

        // 2. Horizontal Scroll Pin & Track Scrub
        const getScrollDistance = () => {
          if (!track) return 0;
          return Math.max(0, track.scrollWidth - window.innerWidth);
        };

        // Pin the inner container (never the root section) to preserve React DOM tree integrity
        gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            id: `${id}-pin`,
            trigger: section,
            pin: pinnedContainer,
            start: 'top top',
            end: () => `+=${getScrollDistance()}`,
            pinSpacing: true,
            scrub: true, // 1:1 scrub directly in sync with Lenis
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress;

              // Update active card index indicator directly
              const count = items.length;
              const calculatedIdx = Math.min(count - 1, Math.floor(p * count));
              if (counterRef.current) {
                counterRef.current.textContent = String(calculatedIdx + 1).padStart(2, '0');
              }

              // Update card active ring/border highlights directly on DOM nodes
              cardRefs.current.forEach((cardEl, cIdx) => {
                if (!cardEl) return;
                if (cIdx === calculatedIdx) {
                  cardEl.classList.add('border-white/30', 'ring-1', 'ring-white/20');
                  cardEl.classList.remove('border-white/10');
                } else {
                  cardEl.classList.remove('border-white/30', 'ring-1', 'ring-white/20');
                  cardEl.classList.add('border-white/10');
                }
              });
            },
          },
        });

        // Sort all ScrollTriggers by strict DOM order so subsequent sections properly adapt to pinSpacing
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      }, section);
    };

    // Small delay / safety check inside useLayoutEffect to ensure DOM and widths are fully rendered
    rAFId = requestAnimationFrame(() => {
      timerId = setTimeout(initScrollTrigger, 80);
    });

    const handleResize = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (rAFId) cancelAnimationFrame(rAFId);
      if (timerId) clearTimeout(timerId);
      window.removeEventListener('resize', handleResize);
      // Clean up ScrollTrigger & pin-spacer synchronously before React reconciles
      ScrollTrigger.getById(`${id}-pin`)?.kill(true);
      ScrollTrigger.getById(`${id}-entrance`)?.kill(true);
      ctx?.revert();
    };
  }, [id, items.length]);

  const handleNextSectionClick = () => {
    const nextElem = document.getElementById(nextSectionId);
    if (nextElem) {
      nextElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id={id}
      data-slide-index={dataSlideIndex}
      ref={sectionRef}
      className={`w-full relative bg-[#070B0E] text-white overflow-hidden select-none ${className}`}
    >
      {/* 
        Inner Pinned Container:
        - GSAP pins this container inside the outer <section>
        - The outer <section> remains a stable child of <main>, preventing React removeChild/insertBefore errors
      */}
      <div
        ref={pinnedContainerRef}
        className="w-full h-screen max-h-screen relative z-10 overflow-hidden flex flex-col justify-between"
      >
        {/* Background Ambience & Subtle Grid */}
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40" />
        <div className="absolute inset-0 tech-subtle-grid opacity-10 pointer-events-none" />

        {/* Top Header Centered & Clean */}
        <header className="relative z-30 pt-6 sm:pt-8 pb-3 px-6 sm:px-12 lg:px-16 flex flex-col items-center justify-center text-center border-b border-white/10 bg-[#070B0E]/80 backdrop-blur-md">
          <div className="max-w-3xl flex flex-col items-center justify-center text-center">
            <h2
              ref={headlineRef}
              className="font-serif-editorial text-2xl sm:text-3xl lg:text-[34px] xl:text-[36px] font-bold text-white tracking-tight leading-tight will-change-transform"
            >
              {headline}{' '}
              <span className="text-[#38bdf8] font-semibold italic font-serif-editorial">
                {italicHeadline}
              </span>
            </h2>
            <p
              ref={descRef}
              className="font-sans-modern text-xs sm:text-[13px] text-white/70 mt-1 max-w-2xl mx-auto leading-relaxed will-change-transform"
            >
              {description}
            </p>
          </div>
        </header>

        {/* Main Horizontal Track */}
        <div className="relative z-20 flex-1 flex items-center overflow-visible py-3 my-auto">
          <div
            ref={trackRef}
            className="flex flex-row flex-nowrap items-stretch gap-5 sm:gap-6 px-6 sm:px-12 lg:px-16 w-max will-change-transform"
          >
            {items.map((item, index) => {
              const accent = item.accentColor || '#38bdf8';
              const glow = item.glowColor || 'rgba(56, 189, 248, 0.35)';

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    cardWrapperRefs.current[index] = el;
                  }}
                  className="h-full shrink-0 flex items-stretch will-change-transform"
                >
                  <article
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    onClick={() => onItemSelect?.(item, index)}
                    style={
                      {
                        '--card-accent': accent,
                        '--card-glow': glow,
                      } as React.CSSProperties
                    }
                    className={`group relative w-[270px] sm:w-[310px] lg:w-[340px] shrink-0 h-[400px] sm:h-[430px] rounded-3xl bg-[#0D151D]/90 backdrop-blur-xl border border-white/10 transition-all duration-300 flex flex-col justify-between p-4 sm:p-5 shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] ${
                      index === 0 ? 'border-white/30 ring-1 ring-white/20' : ''
                    }`}
                  >
                    {/* Visual Header / Image Card */}
                    <div className="relative h-[145px] sm:h-[160px] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#070B0E] mb-3">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent">
                          <Layers className="w-9 h-9 text-white/20" />
                        </div>
                      )}

                      {/* Contrast Vignette Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D151D] via-transparent to-black/40" />

                      {/* Top Category Badge */}
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono-tech text-[9.5px] uppercase tracking-wider font-semibold">
                        <span style={{ color: accent }} className="shrink-0">
                          {item.icon}
                        </span>
                        <span>{item.category}</span>
                      </div>

                      {/* Number Tag */}
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded font-mono-tech text-[10px] font-bold text-white/90 bg-black/60 backdrop-blur-md border border-white/15">
                        {item.number}
                      </div>

                      {/* Bottom Image Tagline */}
                      {item.tagline && (
                        <div className="absolute bottom-2 left-2.5 right-2.5 font-mono-tech text-[10px] text-white/90 font-medium tracking-wide truncate">
                          {item.tagline}
                        </div>
                      )}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif-editorial text-lg sm:text-[21px] font-normal text-white tracking-tight leading-snug mb-1 group-hover:text-[#38bdf8] transition-colors duration-200">
                          {item.title}
                        </h3>
                        <p className="font-sans-modern text-[11.5px] sm:text-xs text-white/75 leading-relaxed line-clamp-3">
                          {item.detail || item.summary}
                        </p>
                      </div>

                      {/* Tags & Inclusions */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="pt-2 flex flex-wrap gap-1.5">
                          {item.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded text-[9.5px] font-mono-tech text-white/80 bg-white/5 border border-white/10"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                </div>
              );
            })}

            {/* Concluding Section Bridge Card (Smoothly Shifts to Next Section) */}
            <div
              ref={(el) => {
                cardWrapperRefs.current[items.length] = el;
              }}
              className="h-full shrink-0 flex items-stretch will-change-transform"
            >
              <article className="relative w-[260px] sm:w-[290px] shrink-0 h-[400px] sm:h-[430px] rounded-3xl bg-gradient-to-br from-[#121c27] to-[#0A1016] border border-white/15 p-5 sm:p-6 flex flex-col justify-between shadow-2xl">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono-tech text-[9.5px] uppercase tracking-wider font-semibold text-[#fed7aa] bg-[#fed7aa]/10 border border-[#fed7aa]/25 mb-3">
                    <span>Next Milestone</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>

                  <span className="font-mono-tech text-[10.5px] text-white/50 uppercase tracking-widest block mb-1">
                    From Capability to Value
                  </span>
                  <h3 className="font-serif-editorial text-xl sm:text-2xl font-normal text-white tracking-tight leading-tight mb-2">
                    {nextSectionTitle}
                  </h3>
                  <p className="font-sans-modern text-[11.5px] sm:text-xs text-white/70 leading-relaxed mb-3">
                    How these hands-on robotics, AI, data, and aerospace capabilities empower student confidence and distinguish your campus.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleNextSectionClick}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#0A1016] font-mono-tech text-xs uppercase tracking-wider font-bold transition-transform duration-200 hover:scale-[1.02] active:scale-98 cursor-pointer shadow-lg"
                >
                  <span>Explore Benefits</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalScrollGallery;
