import React, { useState, useEffect } from 'react';
import { siteConfig } from '../config/content.config';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  currentSectionId: string;
  currentTheme: 'dark' | 'light';
  onNavigate: (sectionId: string) => void;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSectionId,
  currentTheme,
  onNavigate,
  onOpenContact,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleSelectSection = (id: string) => {
    setIsMenuOpen(false);
    onNavigate(id);
  };

  const isDark = currentTheme === 'dark';

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center justify-between px-6 md:px-12 bg-transparent pointer-events-auto select-none transition-colors duration-400 ${
          isDark ? 'text-white' : 'text-[#111111]'
        }`}
      >
        {/* Brand / Logo Left */}
        <button
          onClick={() => handleSelectSection('home')}
          className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-current cursor-pointer"
          aria-label="MedhaArc Labs home"
        >
          <img
            src="/assets/medha_arc_nav_logo.webp"
            alt=""
            className={`w-7 h-7 object-contain transition-all duration-300 ${
              isDark ? 'brightness-110' : 'brightness-0'
            }`}
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
          <div className="flex flex-col">
            <span className="font-serif text-lg md:text-xl font-medium tracking-tight leading-none">
              {siteConfig.brandName}
            </span>
            <span
              className={`text-[10px] uppercase tracking-[0.18em] mt-1 ${
                isDark ? 'text-white/60' : 'text-[#5b5b5b]'
              }`}
            >
              School Initiative
            </span>
          </div>
        </button>

        {/* Actions Right: Consultation Link + Menu Toggle */}
        <div className="flex items-center gap-6">
          <button
            onClick={onOpenContact}
            className={`hidden sm:inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] transition-colors relative pb-0.5 cursor-pointer after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-current after:origin-left hover:after:scale-x-100 after:scale-x-0 after:transition-transform ${
              isDark ? 'text-white/80 hover:text-white' : 'text-[#111111]/80 hover:text-[#111111]'
            }`}
          >
            <span>Consultation</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </button>

          {/* Outline-only Menu button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open presentation menu"
            className={`flex items-center gap-2 px-3 py-1.5 border rounded-[2px] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-current cursor-pointer ${
              isDark
                ? 'border-white/30 hover:border-white text-white'
                : 'border-black/30 hover:border-black text-[#111111]'
            }`}
          >
            <span className="text-xs uppercase tracking-[0.18em]">Menu</span>
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Full-Screen Curtain / Clip-path Menu Overlay */}
      {isMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Presentation Navigation Menu"
          className="fixed inset-0 z-[100] bg-[#111111] text-white flex flex-col justify-between p-6 md:p-14 overflow-y-auto animate-in fade-in duration-300"
        >
          {/* Top Bar inside Menu */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <span className="font-serif text-xl tracking-tight text-white">
                {siteConfig.brandName}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-white/50 pl-3 border-l border-white/20">
                Index of Chapters
              </span>
            </div>

            <button
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
              className="flex items-center gap-2 px-3 py-1.5 border border-white/30 hover:border-white text-white rounded-[2px] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white cursor-pointer"
            >
              <span className="text-xs uppercase tracking-[0.18em]">Close</span>
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Two-Level Menu Grid: 5 Acts */}
          <div className="my-8 md:my-auto grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-6">
            {siteConfig.acts.map((act) => (
              <div key={act.actNumber} className="flex flex-col">
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#c8a45d] mb-4 pb-2 border-b border-white/10">
                  <span>Act {act.actNumber}</span>
                  <p className="text-white/60 font-medium normal-case text-xs tracking-normal mt-0.5">
                    {act.actTitle}
                  </p>
                </div>

                <ul className="space-y-3.5">
                  {act.sections.map((section) => {
                    const isActive = currentSectionId === section.id;
                    return (
                      <li key={section.id}>
                        <button
                          onClick={() => handleSelectSection(section.id)}
                          className={`group flex items-baseline text-left w-full transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white cursor-pointer ${
                            isActive
                              ? 'text-white font-medium'
                              : 'text-white/60 hover:text-white'
                          }`}
                        >
                          <span className="text-[11px] font-mono text-white/40 mr-2.5">
                            {section.number}
                          </span>
                          <span className="text-sm md:text-[15px] tracking-wide relative pb-0.5 group-hover:after:scale-x-100 after:scale-x-0 after:origin-left after:transition-transform after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-white">
                            {section.title}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar inside Menu */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-t border-white/10 pt-6 text-xs text-white/50 tracking-wider">
            <div>{siteConfig.tagline}</div>
            <div className="mt-3 md:mt-0 flex items-center gap-6">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenContact();
                }}
                className="text-white hover:text-[#c8a45d] underline underline-offset-4 transition-colors cursor-pointer"
              >
                Schedule Consultation
              </button>
              <span>{siteConfig.legalEntity}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
