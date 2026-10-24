import { useEffect, useState, useRef } from 'react';
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

export function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isIndexOpen, setIsIndexOpen] = useState<boolean>(false);
  const [isPartnershipOpen, setIsPartnershipOpen] = useState<boolean>(false);

  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis + GSAP ScrollTrigger Integration
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0 : 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;
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
            if (!isNaN(index) && index >= 3) {
              setCurrentSlideIndex(index);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-30% 0px -30% 0px',
        threshold: 0.1,
      }
    );

    slideElements.forEach((el) => observer.observe(el));

    // Force ScrollTrigger refresh after all images and fonts mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
      gsap.ticker.remove(tickerCb);
      observer.disconnect();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Smooth Scroll Navigation Handler
  const handleNavigateToSlide = (index: number) => {
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
          3: 0.04,
          4: 0.35,
          5: 0.53,
          6: 0.71,
          7: 0.89,
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
      if (lenisRef.current) {
        lenisRef.current.scrollTo(targetElement, {
          offset: 0,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
      setCurrentSlideIndex(index);
    }
  };

  useEffect(() => {
    (window as any).navigateToSlide = handleNavigateToSlide;
  }, [handleNavigateToSlide]);

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
        const techTrigger = ScrollTrigger.getById('tech-ecosystem-pin');
        if (e.key === 'ArrowRight' && techTrigger?.isActive && techTrigger.progress < 0.08) {
          e.preventDefault();
          const targetY = techTrigger.start + 0.17 * (techTrigger.end - techTrigger.start);
          if (lenisRef.current) {
            lenisRef.current.scrollTo(targetY, { duration: 1.1 });
          } else {
            window.scrollTo({ top: targetY, behavior: 'smooth' });
          }
          return;
        }

        e.preventDefault();
        if (currentSlideIndex < SLIDES.length - 1) {
          handleNavigateToSlide(currentSlideIndex + 1);
        }
      } else if (
        e.key === 'ArrowUp' ||
        e.key === 'ArrowLeft' ||
        e.key === 'PageUp'
      ) {
        const techTrigger = ScrollTrigger.getById('tech-ecosystem-pin');
        if (e.key === 'ArrowLeft' && techTrigger?.isActive && techTrigger.progress >= 0.26 && techTrigger.progress < 0.44) {
          e.preventDefault();
          const targetY = techTrigger.start + 0.17 * (techTrigger.end - techTrigger.start);
          if (lenisRef.current) {
            lenisRef.current.scrollTo(targetY, { duration: 1.1 });
          } else {
            window.scrollTo({ top: targetY, behavior: 'smooth' });
          }
          return;
        }

        e.preventDefault();
        if (currentSlideIndex > 0) {
          handleNavigateToSlide(currentSlideIndex - 1);
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
  }, [currentSlideIndex]);

  return (
    <div className="relative min-h-screen bg-[#DFE6E7] text-[#203744] overflow-x-hidden">
      {/* Film grain subtle overlay */}
      <div className="fixed inset-0 pointer-events-none grain-overlay z-30" />

      {/* Aether/Shatlyk Ambient Interactive Cursor & Soft Spotlight */}
      <AmbientCursor />

      {/* 15 Seamless Connected Chapters across 5 Choreographed Acts */}
      <main className="relative z-10 overflow-x-hidden">
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
        <PricingSection />
        <PartnershipClosingSection
          onOpenPartnershipModal={() => setIsPartnershipOpen(true)}
        />
        <div className="relative h-[200vh] bg-[#0E151E] text-white" aria-label="End of presentation">
          <p className="absolute top-[75%] inset-x-0 text-center font-mono-tech text-xs uppercase tracking-[0.2em] text-white/45">
            End of presentation
          </p>
        </div>
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
