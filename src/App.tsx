import { useEffect, useState, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { SlideIndexModal } from './components/SlideIndexModal';
import { PartnershipModal } from './components/PartnershipModal';
import { TechTickerMarquee } from './components/TechTickerMarquee';
import { AmbientCursor } from './components/motion/AmbientCursor';
import { KineticTypographyDivider } from './components/motion/KineticTypographyDivider';

import { HeroVisionStage } from './sections/HeroVisionStage';
import { TechEcosystemSuite } from './sections/TechEcosystemSuite';
import { LearningApproachSection } from './sections/LearningApproachSection';
import { GradePathSection } from './sections/GradePathSection';
import { EmergingTechSection } from './sections/EmergingTechSection';
import { BenefitsSection } from './sections/BenefitsSection';
import { ResponsibilitiesSection } from './sections/ResponsibilitiesSection';
import { PricingSection } from './sections/PricingSection';
import { PartnershipClosingSection } from './sections/PartnershipClosingSection';

import { SLIDES } from './data/slidesData';

gsap.registerPlugin(ScrollTrigger);

// Clear scroll memory on load / refresh to prevent landing in pinned sub-scenes
if (typeof window !== 'undefined') {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  ScrollTrigger.clearScrollMemory('manual');
}

export function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isIndexOpen, setIsIndexOpen] = useState<boolean>(false);
  const [isPartnershipOpen, setIsPartnershipOpen] = useState<boolean>(false);

  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis + GSAP ScrollTrigger Integration
  useEffect(() => {
    // Force manual scroll restoration and reset scroll position to Section 1 (top)
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Strip hash if present to prevent browser auto-scrolling to an anchor
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0 : 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;
    lenis.scrollTo(0, { immediate: true });

    (window as any).lenis = lenis;
    (window as any).ScrollTrigger = ScrollTrigger;
    (window as any).gsap = gsap;

    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // Track active section for unpinned sections
    const slideElements = document.querySelectorAll<HTMLElement>('[data-slide-index]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-slide-index'));
            if (!isNaN(index) && index >= 8) {
              setCurrentSlideIndex(index);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-30% 0px -30% 0px',
        threshold: 0.15,
      }
    );

    slideElements.forEach((el) => observer.observe(el));

    // Unified IntersectionObserver for per-atom [data-rev] elements (staggered delay via --d)
    const revElements = document.querySelectorAll<HTMLElement>('[data-rev]');
    const revObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            revObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );
    revElements.forEach((el) => revObserver.observe(el));

    // Force ScrollTrigger refresh after all images and fonts mount, staying at top
    const timer = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      if (window.scrollY === 0) {
        lenis.scrollTo(0, { immediate: true });
      }

      // Smoothly dismiss the initial circle loader once layout is stable at Section 1
      const preloader = document.getElementById('page-preloader');
      if (preloader) {
        preloader.classList.add('loaded');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 450);
      }
    }, 450);

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      lenis.destroy();
      gsap.ticker.remove(tickerCb);
      observer.disconnect();
      revObserver.disconnect();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Smooth Scroll Navigation Handler
  const handleNavigateToSlide = useCallback((index: number) => {
    // 1. Act I (Hero, Aim & Vision, Mission & Values) inside HeroVisionStage pinned stage
    if (index >= 0 && index <= 2) {
      const stHero = ScrollTrigger.getById('hero-vision-pin');
      if (stHero) {
        const progresses = [0.05, 0.42, 0.88];
        const targetY = stHero.start + progresses[index] * (stHero.end - stHero.start);
        if (lenisRef.current) {
          lenisRef.current.scrollTo(targetY, {
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        } else {
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
        setCurrentSlideIndex(index);
        return;
      }
    }

    // 2. Act II & III (Tech Ecosystem Suite: Overview & 4 domains)
    if (index >= 3 && index <= 7) {
      const stTech = ScrollTrigger.getById('tech-ecosystem-pin');
      if (stTech) {
        const techProgressMap: { [key: number]: number } = {
          3: 0.04, // Ecosystem Overview
          4: 0.35, // Robotics & Automation
          5: 0.52, // AI & Machine Learning
          6: 0.69, // Data Analytics
          7: 0.86, // Aerial Systems
        };
        const targetProgress = techProgressMap[index] ?? 0.04;
        const targetY = stTech.start + targetProgress * (stTech.end - stTech.start);
        if (lenisRef.current) {
          lenisRef.current.scrollTo(targetY, {
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        } else {
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
        setCurrentSlideIndex(index);
        return;
      }
    }

    // 3. Act IV & V (Standard Sections: Slides 9 to 15)
    const targetElement = document.getElementById(`slide-${index + 1}`);
    if (targetElement) {
      // Find pinned ScrollTrigger if present to scroll exactly to its starting lock offset
      const allTriggers = ScrollTrigger.getAll();
      const st = allTriggers.find(
        (t) => (t.trigger === targetElement || t.pin === targetElement) && Boolean(t.pin)
      );
      const targetY = st ? st.start : targetElement.getBoundingClientRect().top + window.scrollY;

      if (lenisRef.current) {
        lenisRef.current.scrollTo(targetY, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
      setCurrentSlideIndex(index);
    }
  }, []);

  useEffect(() => {
    (window as any).navigateToSlide = handleNavigateToSlide;
  }, [handleNavigateToSlide]);

  // Granular Step-by-Step Keyboard Navigation Handler
  // Advances card-by-card, domain-by-domain, and item-by-item instead of skipping entire sections
  const handleKeyboardStep = useCallback(
    (direction: 1 | -1): boolean => {
      const scrollY = window.scrollY;

      // 1. Act I: HeroVisionStage Sub-scenes (Hero, Aim & Vision, Mission & Values)
      const stHero = ScrollTrigger.getById('hero-vision-pin');
      if (stHero && scrollY >= stHero.start - 60 && scrollY <= stHero.end - 40) {
        const heroMilestones = [0.05, 0.42, 0.88];
        const p = stHero.progress;
        if (direction === 1) {
          const next = heroMilestones.find((m) => m > p + 0.08);
          if (next !== undefined) {
            const targetY = stHero.start + next * (stHero.end - stHero.start);
            if (lenisRef.current) {
              lenisRef.current.scrollTo(targetY, { duration: 1.0 });
            } else {
              window.scrollTo({ top: targetY, behavior: 'smooth' });
            }
            return true;
          }
        } else {
          const prev = [...heroMilestones].reverse().find((m) => m < p - 0.08);
          if (prev !== undefined) {
            const targetY = stHero.start + prev * (stHero.end - stHero.start);
            if (lenisRef.current) {
              lenisRef.current.scrollTo(targetY, { duration: 1.0 });
            } else {
              window.scrollTo({ top: targetY, behavior: 'smooth' });
            }
            return true;
          }
        }
      }

      // 2. Act II & III: TechEcosystemSuite 6 Morphing Domains (Overview, Math, Robotics, AI, Data, Aerial)
      const stTech = ScrollTrigger.getById('tech-ecosystem-pin');
      if (stTech && scrollY >= stTech.start - 60 && scrollY <= stTech.end - 40) {
        const techMilestones = [0.04, 0.17, 0.35, 0.52, 0.69, 0.86];
        const p = stTech.progress;
        if (direction === 1) {
          const next = techMilestones.find((m) => m > p + 0.05);
          if (next !== undefined) {
            const targetY = stTech.start + next * (stTech.end - stTech.start);
            if (lenisRef.current) {
              lenisRef.current.scrollTo(targetY, { duration: 1.0 });
            } else {
              window.scrollTo({ top: targetY, behavior: 'smooth' });
            }
            return true;
          }
        } else {
          const prev = [...techMilestones].reverse().find((m) => m < p - 0.05);
          if (prev !== undefined) {
            const targetY = stTech.start + prev * (stTech.end - stTech.start);
            if (lenisRef.current) {
              lenisRef.current.scrollTo(targetY, { duration: 1.0 });
            } else {
              window.scrollTo({ top: targetY, behavior: 'smooth' });
            }
            return true;
          }
        }
      }

      // 3. Slide 10: StackingGradeCards (7 Progressive Grade Levels: Grade 5-6 through Grade 12)
      const s10 = document.getElementById('slide-10');
      if (s10) {
        const rect = s10.getBoundingClientRect();
        const points = (window as any).__scrollStackPoints as number[] | undefined;
        // Check if Slide 10 is currently the active view
        if (rect.top <= window.innerHeight * 0.65 && rect.bottom >= window.innerHeight * 0.35 && points?.length) {
          if (direction === 1) {
            const nextPoint = points.find((pt) => pt > scrollY + 35);
            if (nextPoint !== undefined) {
              if (lenisRef.current) {
                lenisRef.current.scrollTo(nextPoint, { duration: 0.9 });
              } else {
                window.scrollTo({ top: nextPoint, behavior: 'smooth' });
              }
              return true;
            }
          } else {
            const prevPoints = points.filter((pt) => pt < scrollY - 35);
            if (prevPoints.length > 0) {
              const prevPoint = prevPoints[prevPoints.length - 1];
              if (lenisRef.current) {
                lenisRef.current.scrollTo(prevPoint, { duration: 0.9 });
              } else {
                window.scrollTo({ top: prevPoint, behavior: 'smooth' });
              }
              return true;
            } else if (scrollY > rect.top + scrollY + 40) {
              const slideTop = rect.top + scrollY;
              if (lenisRef.current) {
                lenisRef.current.scrollTo(slideTop, { duration: 0.9 });
              } else {
                window.scrollTo({ top: slideTop, behavior: 'smooth' });
              }
              return true;
            }
          }
        }
      }

      // 4. Slide 11: HorizontalScrollGallery (7 Emerging Tech Innovations)
      const stGallery = ScrollTrigger.getById('slide-11-pin');
      if (stGallery && scrollY >= stGallery.start - 60 && scrollY <= stGallery.end - 40) {
        const itemCount = 7;
        const galleryMilestones = Array.from({ length: itemCount }, (_, k) => k / (itemCount - 1));
        const p = stGallery.progress;
        if (direction === 1) {
          const next = galleryMilestones.find((m) => m > p + 0.05);
          if (next !== undefined) {
            const targetY = stGallery.start + next * (stGallery.end - stGallery.start);
            if (lenisRef.current) {
              lenisRef.current.scrollTo(targetY, { duration: 1.0 });
            } else {
              window.scrollTo({ top: targetY, behavior: 'smooth' });
            }
            return true;
          }
        } else {
          const prev = [...galleryMilestones].reverse().find((m) => m < p - 0.05);
          if (prev !== undefined) {
            const targetY = stGallery.start + prev * (stGallery.end - stGallery.start);
            if (lenisRef.current) {
              lenisRef.current.scrollTo(targetY, { duration: 1.0 });
            } else {
              window.scrollTo({ top: targetY, behavior: 'smooth' });
            }
            return true;
          }
        }
      }

      return false;
    },
    []
  );

  // Helper to accurately derive the current active slide index directly from scroll position
  const getActiveSlideIndex = useCallback((): number => {
    const scrollY = window.scrollY;
    // Pinned ranges
    const stHero = ScrollTrigger.getById('hero-vision-pin');
    if (stHero && scrollY <= stHero.end) {
      if (stHero.progress < 0.30) return 0;
      if (stHero.progress < 0.70) return 1;
      return 2;
    }
    const stTech = ScrollTrigger.getById('tech-ecosystem-pin');
    if (stTech && scrollY <= stTech.end) {
      if (stTech.progress < 0.26) return 3;
      if (stTech.progress < 0.44) return 4;
      if (stTech.progress < 0.62) return 5;
      if (stTech.progress < 0.80) return 6;
      return 7;
    }
    // Check slide elements 9 to 15
    for (let i = 15; i >= 9; i--) {
      const el = document.getElementById(`slide-${i}`);
      if (el) {
        const allTriggers = ScrollTrigger.getAll();
        const st = allTriggers.find((t) => (t.trigger === el || t.pin === el) && Boolean(t.pin));
        const top = st ? st.start : el.getBoundingClientRect().top + scrollY;
        if (scrollY >= top - 250) {
          return i - 1;
        }
      }
    }
    return currentSlideIndex;
  }, [currentSlideIndex]);

  // Keyboard navigation (Arrow keys / PageUp / PageDown)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.tagName === 'SELECT'
      ) {
        return;
      }

      if (
        e.key === 'ArrowDown' ||
        e.key === 'ArrowRight' ||
        e.key === 'PageDown' ||
        e.key === ' '
      ) {
        e.preventDefault();
        // First try granular sub-step navigation (card by card, domain by domain, gallery item by item)
        const handled = handleKeyboardStep(1);
        if (!handled) {
          const activeIdx = getActiveSlideIndex();
          if (activeIdx < SLIDES.length - 1) {
            handleNavigateToSlide(activeIdx + 1);
          }
        }
      } else if (
        e.key === 'ArrowUp' ||
        e.key === 'ArrowLeft' ||
        e.key === 'PageUp'
      ) {
        e.preventDefault();
        // First try granular backward sub-step navigation
        const handled = handleKeyboardStep(-1);
        if (!handled) {
          const activeIdx = getActiveSlideIndex();
          if (activeIdx > 0) {
            handleNavigateToSlide(activeIdx - 1);
          }
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        handleNavigateToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        handleNavigateToSlide(SLIDES.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [getActiveSlideIndex, handleKeyboardStep, handleNavigateToSlide]);

  return (
    <div className="relative min-h-screen bg-[#DFE6E7] text-[#203744] overflow-x-clip">
      {/* Film grain subtle overlay */}
      <div className="fixed inset-0 pointer-events-none grain-overlay z-30" />

      {/* Aether/Shatlyk Ambient Interactive Cursor & Soft Spotlight */}
      <AmbientCursor />

      {/* 15 Seamless Connected Chapters across 5 Choreographed Acts */}
      <main className="relative z-10 overflow-x-clip">
        {/* ACT I: Chapters 01 (Hero), 02 (Aim & Vision), 03 (Mission & Values) in Pinned Stage */}
        <HeroVisionStage onSlideChange={setCurrentSlideIndex} />

        {/* arnobt78-inspired Tech Ticker Marquee (Bridging Vision into the 5 Tech Domains) */}
        <TechTickerMarquee />

        {/* ACT II & III: The 5 Core Technologies (5 Separate Sections with Smooth Scroll Transitions) */}
        <TechEcosystemSuite onSlideChange={setCurrentSlideIndex} />

        {/* ACT IV: Pedagogy & Future Readiness */}
        <LearningApproachSection />
        <GradePathSection />
        <EmergingTechSection />
        <BenefitsSection />
        <ResponsibilitiesSection />

        {/* arnobt78-inspired Kinetic Typography Divider (Creamish Editorial Transition) */}
        <KineticTypographyDivider />

        {/* ACT V: Institutional Value, Model & Closing */}
        <PricingSection
          onOpenPartnershipModal={() => setIsPartnershipOpen(true)}
        />
        <PartnershipClosingSection
          onOpenPartnershipModal={() => setIsPartnershipOpen(true)}
        />
      </main>

      {/* Slide Index Modal (all 15 chapters) */}
      <SlideIndexModal
        isOpen={isIndexOpen}
        onClose={() => setIsIndexOpen(false)}
        currentIndex={currentSlideIndex}
        onSelectSlide={handleNavigateToSlide}
      />

      {/* Partnership Exploratory Modal */}
      <PartnershipModal
        isOpen={isPartnershipOpen}
        onClose={() => setIsPartnershipOpen(false)}
      />
    </div>
  );
}

export default App;
