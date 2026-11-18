import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { siteConfig } from './config/content.config';

import { Preloader } from './components/Preloader';
import { Header } from './components/Header';
import { ChapterHUD } from './components/ChapterHUD';
import { ContactModal } from './components/ContactModal';

import { HeroSection } from './sections/01_HeroSection';
import { AboutSection } from './sections/02_AboutSection';
import { MissionSection } from './sections/03_MissionSection';
import { DomainsSection } from './sections/04_DomainsSection';
import { LearningApproachSection } from './sections/05_LearningApproachSection';
import { CurriculumSection } from './sections/06_CurriculumSection';
import { ProjectShowcaseSection } from './sections/07_ProjectShowcaseSection';
import { LabSetupSection } from './sections/08_LabSetupSection';
import { ResourcesSection } from './sections/09_ResourcesSection';
import { TeacherEmpowermentSection } from './sections/10_TeacherEmpowermentSection';
import { BenefitsSection } from './sections/11_BenefitsSection';
import { RequirementsSection } from './sections/12_RequirementsSection';
import { PricingSection } from './sections/13_PricingSection';
import { ClosingSection } from './sections/14_ClosingSection';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [, setIsPreloaderDone] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const lenisRef = useRef<Lenis | null>(null);

  // Ordered list of section metadata (14 sections)
  // Respects swapRequirementsAndPricing toggle
  const orderedSections = useMemo(() => {
    const list: Array<{ id: string; title: string; number: string; theme: 'dark' | 'light' }> = [];

    siteConfig.acts.forEach((act) => {
      act.sections.forEach((sec) => {
        list.push(sec);
      });
    });

    if (siteConfig.swapRequirementsAndPricing) {
      const reqIdx = list.findIndex((s) => s.id === 'requirements');
      const priceIdx = list.findIndex((s) => s.id === 'pricing');
      if (reqIdx !== -1 && priceIdx !== -1 && reqIdx < priceIdx) {
        const [req] = list.splice(reqIdx, 1);
        list.splice(priceIdx, 0, req);
      }
    }

    return list;
  }, []);

  // Initialize Lenis + GSAP Master Pinning & Transitions
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    if (!prefersReducedMotion) {
      document.documentElement.classList.add('js-motion');
    }

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: !prefersReducedMotion,
    });
    lenisRef.current = lenis;
    (window as unknown as { lenis: Lenis }).lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // Master ScrollTrigger Pinning and Chapter-to-Chapter Transitions
    let scrollTriggerContext: gsap.Context | null = null;

    if (!prefersReducedMotion && !isMobile) {
      scrollTriggerContext = gsap.context(() => {
        const panels = gsap.utils.toArray<HTMLElement>('.chapter-wrapper');

        panels.forEach((panel, i) => {
          const nextPanel = panels[i + 1];
          if (!nextPanel) return;

          const isLight = panel.getAttribute('data-theme') === 'light';
          const nextIsLight = nextPanel.getAttribute('data-theme') === 'light';
          const isLightToLight = isLight && nextIsLight;

          // Pin this chapter while next chapter scrolls into view over it
          ScrollTrigger.create({
            trigger: panel,
            start: 'top top',
            end: () => `+=${panel.offsetHeight}`,
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
          });

          const content = panel.querySelector<HTMLElement>('.chapter-content');
          const media = panel.querySelector<HTMLElement>('.chapter-media');
          const nextContent = nextPanel.querySelector<HTMLElement>('.chapter-content');

          // Outgoing animation: as nextPanel rises from bottom to top
          if (content) {
            gsap.to(content, {
              yPercent: -8,
              opacity: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: nextPanel,
                start: 'top bottom',
                end: 'top top',
                scrub: 0.6,
              },
            });
          }

          if (media) {
            gsap.to(media, {
              scale: 1.08,
              ease: 'none',
              scrollTrigger: {
                trigger: nextPanel,
                start: 'top bottom',
                end: 'top top',
                scrub: 0.6,
              },
            });
          }

          // Incoming animation for nextPanel
          if (isLightToLight && nextContent) {
            // Light to light: soft cross fade + 40px lift
            gsap.fromTo(
              nextContent,
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: nextPanel,
                  start: 'top bottom',
                  end: 'top top',
                  scrub: 0.6,
                },
              }
            );
          }
        });
      });
    }

    // Deterministic section tracking synchronized with Lenis scroll
    const handleLenisScroll = ({ scroll }: { scroll: number }) => {
      const windowH = window.innerHeight || 800;
      const idx = Math.min(
        orderedSections.length - 1,
        Math.max(0, Math.floor((scroll + windowH * 0.45) / windowH))
      );
      setCurrentSectionIndex((prev) => (prev !== idx ? idx : prev));
    };
    lenis.on('scroll', handleLenisScroll);

    return () => {
      scrollTriggerContext?.revert();
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      document.documentElement.classList.remove('js-motion');
    };
  }, [orderedSections]);

  // Navigate to section with smooth gliding
  const navigateToSection = useCallback(
    (sectionId: string) => {
      const targetEl = document.getElementById(sectionId);
      if (!targetEl) return;

      const targetIdx = orderedSections.findIndex((s) => s.id === sectionId);
      if (targetIdx !== -1) {
        setCurrentSectionIndex(targetIdx);
      }

      if (lenisRef.current) {
        lenisRef.current.scrollTo(targetEl, {
          duration: 1.0,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [orderedSections]
  );

  const navigateToIndex = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(orderedSections.length - 1, index));
      const targetSec = orderedSections[clamped];
      if (targetSec) {
        navigateToSection(targetSec.id);
      }
    },
    [orderedSections, navigateToSection]
  );

  // Presenter Keyboard Navigation (Arrow Keys move section-by-section)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        isContactOpen ||
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.tagName === 'SELECT'
      ) {
        return;
      }

      const currentId = orderedSections[currentSectionIndex]?.id;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const stepEvt = new CustomEvent('medhaarc:step', {
          cancelable: true,
          detail: { direction: 1 },
        });
        const handled = !window.dispatchEvent(stepEvt);
        if (!handled) {
          navigateToIndex(currentSectionIndex + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const stepEvt = new CustomEvent('medhaarc:step', {
          cancelable: true,
          detail: { direction: -1 },
        });
        const handled = !window.dispatchEvent(stepEvt);
        if (!handled) {
          navigateToIndex(currentSectionIndex - 1);
        }
      } else if (e.key === 'ArrowRight' && currentId !== 'domains') {
        e.preventDefault();
        navigateToIndex(currentSectionIndex + 1);
      } else if (e.key === 'ArrowLeft' && currentId !== 'domains') {
        e.preventDefault();
        navigateToIndex(currentSectionIndex - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        navigateToIndex(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        navigateToIndex(orderedSections.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSectionIndex, orderedSections, isContactOpen, navigateToIndex]);

  const currentSection = orderedSections[currentSectionIndex] || orderedSections[0];

  return (
    <div className="relative w-full min-h-screen bg-[#ffffff] text-[#111111] font-sans antialiased selection:bg-[#c8a45d] selection:text-white">
      {/* 00-100 Preloader with tagline wipe */}
      <Preloader onComplete={() => setIsPreloaderDone(true)} />

      {/* Dynamic Theme Adaptive Header */}
      <Header
        currentSectionId={currentSection.id}
        currentTheme={currentSection.theme}
        onNavigate={navigateToSection}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Transparent Bottom-Left Chapter HUD with mix-blend-difference */}
      <ChapterHUD
        currentIndex={currentSectionIndex}
        totalCount={orderedSections.length}
        currentTitle={currentSection.title}
        onPrev={() => navigateToIndex(currentSectionIndex - 1)}
        onNext={() => navigateToIndex(currentSectionIndex + 1)}
      />

      {/* Main 14 Presentation Chapters */}
      <main className="w-full">
        {/* ACT 1: Who We Are */}
        <HeroSection onNavigateNext={() => navigateToIndex(1)} />
        <AboutSection />
        <MissionSection />

        {/* ACT 2: What Students Learn */}
        <DomainsSection />
        <LearningApproachSection />
        <CurriculumSection />
        <ProjectShowcaseSection />

        {/* ACT 3: How It Runs */}
        <LabSetupSection />
        <ResourcesSection />
        <TeacherEmpowermentSection />

        {/* ACT 4: What Students Gain */}
        <BenefitsSection />

        {/* ACT 5: Terms & Next Step (Order toggleable) */}
        {!siteConfig.swapRequirementsAndPricing ? (
          <>
            <RequirementsSection />
            <PricingSection onOpenContact={() => setIsContactOpen(true)} />
          </>
        ) : (
          <>
            <PricingSection onOpenContact={() => setIsContactOpen(true)} />
            <RequirementsSection />
          </>
        )}

        <ClosingSection onOpenContact={() => setIsContactOpen(true)} />
      </main>

      {/* Consultation Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}

export default App;
