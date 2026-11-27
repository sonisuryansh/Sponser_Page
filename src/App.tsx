import { useEffect, useState, useCallback, useMemo } from 'react';
import { siteConfig } from './config/content.config';

import { Preloader } from './components/Preloader';
import { Header } from './components/Header';
import { ChapterHUD } from './components/ChapterHUD';
import { ContactModal } from './components/ContactModal';
import { SlideTransitions } from './components/SlideTransitions';

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

export function App() {
  const [, setIsPreloaderDone] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Ordered list of section metadata (14 sections)
  // Respects swapRequirementsAndPricing toggle
  const orderedSections = useMemo(() => {
    const list: Array<{ id: string; title: string; subtitle?: string; number: string; theme: 'dark' | 'light' }> = [];

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

  // Keep the presentation at its first slide and enable section reveal effects.
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    document.documentElement.classList.add('js-motion');

    return () => {
      document.documentElement.classList.remove('js-motion');
    };
  }, []);

  // Navigation controls select a slide; SlideTransitions handles the movement.
  const navigateToSection = useCallback(
    (sectionId: string) => {
      const targetIdx = orderedSections.findIndex((s) => s.id === sectionId);
      if (targetIdx !== -1) {
        setCurrentSectionIndex(targetIdx);
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

  const currentSection = orderedSections[currentSectionIndex] || orderedSections[0];

  const slides = useMemo(
    () =>
      orderedSections.map((section, index) => {
        let element;

        switch (section.id) {
          case 'home':
            element = (
              <HeroSection
                onNavigateNext={() => navigateToIndex(index + 1)}
                onOpenContact={() => setIsContactOpen(true)}
                onExploreCurriculum={() => navigateToSection('curriculum')}
              />
            );
            break;
          case 'about':
            element = <AboutSection />;
            break;
          case 'mission':
            element = <MissionSection />;
            break;
          case 'domains':
            element = <DomainsSection />;
            break;
          case 'approach':
            element = <LearningApproachSection />;
            break;
          case 'curriculum':
            element = <CurriculumSection />;
            break;
          case 'showcase':
            element = <ProjectShowcaseSection />;
            break;
          case 'lab-setup':
            element = <LabSetupSection />;
            break;
          case 'resources':
            element = <ResourcesSection />;
            break;
          case 'teacher-empowerment':
            element = <TeacherEmpowermentSection />;
            break;
          case 'benefits':
            element = <BenefitsSection />;
            break;
          case 'requirements':
            element = <RequirementsSection />;
            break;
          case 'pricing':
            element = <PricingSection onOpenContact={() => setIsContactOpen(true)} />;
            break;
          case 'closing':
            element = <ClosingSection onOpenContact={() => setIsContactOpen(true)} />;
            break;
          default:
            return null;
        }

        return { ...section, element };
      }),
    [orderedSections, navigateToIndex, navigateToSection]
  );

  return (
    <div className="relative w-full min-h-screen bg-[#FAF6EE] text-[#111111] font-sans antialiased selection:bg-[#c8a45d] selection:text-white">
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

      {/* Main 14 Presentation Chapters rendered via Cinematic Slide Transitions */}
      <main className="w-full">
        <SlideTransitions
          slides={slides.filter((slide): slide is NonNullable<typeof slide> => slide !== null)}
          currentIndex={currentSectionIndex}
          onSlideChange={setCurrentSectionIndex}
          accentColor="#c8a45d"
          pageBgColor="#FAF6EE"
        />
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
