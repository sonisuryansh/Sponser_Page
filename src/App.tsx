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
        if (currentSlideIndex < SLIDES.length - 1) {
          handleNavigateToSlide(currentSlideIndex + 1);
        }
      } else if (
        e.key === 'ArrowUp' ||
        e.key === 'ArrowLeft' ||
        e.key === 'PageUp'
      ) {
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
    <div className="relative min-h-screen bg-[#DFE6E7] text-[#203744]">
      {/* Film grain subtle overlay */}
      <div className="fixed inset-0 pointer-events-none grain-overlay z-30" />

      {/* Aether/Shatlyk Ambient Interactive Cursor & Soft Spotlight */}
      <AmbientCursor />

      {/* 15 Seamless Connected Chapters across 5 Choreographed Acts */}
      <main className="relative z-10">
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

        {/* arnobt78-inspired Kinetic Typography Divider (Creamish Editorial Transition) */}
        <KineticTypographyDivider />

        {/* ACT V: Institutional Value, Model & Closing */}
        <BenefitsSection />
        <ResponsibilitiesSection />
        <PricingSection />
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
