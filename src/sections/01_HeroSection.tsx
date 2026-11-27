import React from 'react';
import { ChevronDown } from 'lucide-react';
import { ChapterShell } from '../components/ChapterShell';
import { siteConfig } from '../config/content.config';

interface HeroSectionProps {
  onNavigateNext: () => void;
  onOpenContact?: () => void;
  onExploreCurriculum?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateNext }) => (
  <ChapterShell
    id="home"
    chapterNumber="01"
    theme="dark"
    media={siteConfig.hero.backgroundImage}
    overlayOpacity={0.38}
    fullBleed={true}
    className="relative flex min-h-[100svh] w-full items-center justify-center select-none"
  >
    <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <h1 className="font-serif text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.98] tracking-tight text-white drop-shadow-2xl">
        {siteConfig.hero.title}
      </h1>
      <p className="mt-4 max-w-2xl font-sans text-base font-medium leading-relaxed text-white/90 drop-shadow sm:text-lg">
        {siteConfig.hero.subline}
      </p>
      <p className="mt-3 font-serif text-sm italic tracking-wide text-[#F5C572] drop-shadow sm:text-base">
        {siteConfig.hero.tagline}
      </p>
      <p className="mt-8 max-w-4xl font-sans text-xs font-medium leading-relaxed tracking-wide text-white/90 drop-shadow sm:text-sm">
        {siteConfig.hero.domains.join(' | ')}
      </p>
    </div>

    <button
      type="button"
      onClick={onNavigateNext}
      className="absolute bottom-7 left-1/2 z-10 inline-flex -translate-x-1/2 flex-col items-center gap-1 text-xs font-medium uppercase tracking-[0.2em] text-white/90 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      aria-label="Scroll to the next section"
    >
      <span>Scroll</span>
      <ChevronDown className="h-4 w-4" aria-hidden="true" />
    </button>
  </ChapterShell>
);
