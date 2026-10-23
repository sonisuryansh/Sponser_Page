import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onExplore?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const headlineLeftRef = useRef<HTMLDivElement>(null);
  const headlineRightRef = useRef<HTMLDivElement>(null);
  const secondaryPhraseRef = useRef<HTMLDivElement>(null);
  const metaLeftRef = useRef<HTMLDivElement>(null);
  const metaRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const rightPanel = rightPanelRef.current;
    const leftPanel = leftPanelRef.current;
    const img = imgRef.current;
    const headlineLeft = headlineLeftRef.current;
    const headlineRight = headlineRightRef.current;
    const secondaryPhrase = secondaryPhraseRef.current;
    const metaLeft = metaLeftRef.current;
    const metaRight = metaRightRef.current;

    if (!container || !rightPanel || !img || !headlineLeft || !headlineRight) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 1. Right Image panel expands from 50% to 100% full-width
      tl.to(
        rightPanel,
        {
          width: '100%',
          ease: 'power2.inOut',
        },
        0
      );

      // Left panel shrinks from 50% to 0%
      if (leftPanel) {
        tl.to(
          leftPanel,
          {
            width: '0%',
            opacity: 0.5,
            ease: 'power2.inOut',
          },
          0
        );
      }

      // 2. Image inside scales subtly (cinematic Cartier / Granola feel)
      tl.to(
        img,
        {
          scale: 1.15,
          ease: 'none',
        },
        0
      );

      // 3. Both headlines move horizontally left as seen in yy.mp4
      tl.to(
        [headlineLeft, headlineRight],
        {
          x: '-30vw',
          opacity: 0,
          ease: 'power1.inOut',
        },
        0
      );

      // 4. Secondary phrase emerges on the full-bleed image (frame_001_t1.5s style)
      if (secondaryPhrase) {
        tl.fromTo(
          secondaryPhrase,
          { opacity: 0, y: 40, x: '5vw' },
          { opacity: 1, y: 0, x: 0, ease: 'power2.out' },
          0.4
        );
      }

      // 5. Initial meta text fades out
      if (metaLeft && metaRight) {
        tl.to(
          [metaLeft, metaRight],
          {
            opacity: 0,
            y: 20,
            ease: 'power1.out',
          },
          0
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="slide-1"
      data-slide-index="0"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#DFE6E7] select-none"
    >
      {/* =========================================================================
          LEFT HALF (50% WIDTH): Solid Mineral Grey with Crisp Dark Ink Typography
          ========================================================================= */}
      <div
        ref={leftPanelRef}
        className="absolute top-0 left-0 w-1/2 h-full overflow-hidden bg-[#DFE6E7] z-10"
      >
        {/* Left Headline: Pure Charcoal (#1C2833) */}
        <div
          ref={headlineLeftRef}
          className="absolute top-[34vh] left-8 sm:left-14 lg:left-20 whitespace-nowrap pointer-events-none will-change-transform"
        >
          <h1 className="font-serif-editorial text-[14vw] sm:text-[11vw] lg:text-[9.2vw] font-normal leading-[0.92] tracking-tighter text-[#1C2833]">
            <span className="block">Technology,</span>
            <span className="block font-normal">
              shaped by <span className="italic font-light text-[#286D8B]">curiosity.</span>
            </span>
          </h1>
        </div>

        {/* Bottom Left Minimal Metadata (Matches frame_000_t0.0s "Based in:" style) */}
        <div
          ref={metaLeftRef}
          className="absolute bottom-12 left-8 sm:left-14 lg:left-20 text-[#1C2833]/80 font-sans-modern text-xs"
        >
          <div className="font-mono-tech text-[10px] tracking-widest uppercase text-[#398BB0] font-semibold mb-2">
            Initiative Scope:
          </div>
          <div className="space-y-1 font-medium text-xs text-[#1C2833]/70">
            <div>Robotics & Automation</div>
            <div>AI & Machine Learning</div>
            <div>Data Analytics</div>
            <div>Aerial Systems</div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          RIGHT HALF (50% WIDTH -> EXPANDS TO 100%): Photo with Pure White Typography
          ========================================================================= */}
      <div
        ref={rightPanelRef}
        className="absolute top-0 right-0 w-1/2 h-full overflow-hidden shadow-2xl z-20 will-change-[width]"
      >
        {/* Authentic Facility Image */}
        <img
          ref={imgRef}
          src="/assets/page_14.jpg"
          alt="MedhaArc Labs Innovation Facility"
          className="w-full h-full object-cover object-center will-change-transform"
        />

        {/* Subtle Vignette Shading for maximum legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/35 pointer-events-none" />

        {/* Right Headline: Positioned so that its screen coordinate is IDENTICAL
            to the left headline, but rendered in PURE SOLID WHITE (#FFFFFF) */}
        <div
          ref={headlineRightRef}
          className="absolute top-[34vh] left-[calc(2rem-50vw)] sm:left-[calc(3.5rem-50vw)] lg:left-[calc(5rem-50vw)] whitespace-nowrap pointer-events-none will-change-transform"
        >
          <h1 className="font-serif-editorial text-[14vw] sm:text-[11vw] lg:text-[9.2vw] font-normal leading-[0.92] tracking-tighter text-white">
            <span className="block">Technology,</span>
            <span className="block font-normal">
              shaped by <span className="italic font-light text-white">curiosity.</span>
            </span>
          </h1>
        </div>

        {/* Secondary Headline (Reveals on Scroll like frame_001_t1.5s "Your smile,") */}
        <div
          ref={secondaryPhraseRef}
          className="absolute top-[38vh] right-12 sm:right-20 lg:right-28 text-right opacity-0 pointer-events-none z-30"
        >
          <h2 className="font-serif-editorial text-5xl sm:text-7xl lg:text-8xl font-normal text-white tracking-tight leading-none drop-shadow-lg">
            Practical discovery,<br />
            <span className="italic font-light text-[#38bdf8]">tangible capability.</span>
          </h2>
          <p className="font-sans-modern text-sm sm:text-base text-white/80 mt-4 max-w-md ml-auto font-light">
            Empowering students to design, build, code, and test real autonomous systems.
          </p>
        </div>

        {/* Bottom Right Quote inside image panel (Matches frame_000_t0.0s) */}
        <div
          ref={metaRightRef}
          className="absolute bottom-12 right-8 sm:right-14 z-20 max-w-sm text-right text-white"
        >
          <p className="font-serif-editorial italic text-base sm:text-xl leading-snug drop-shadow-sm font-light">
            Practical technology learning through robotics, AI, data and aerial systems.
          </p>
          <span className="font-mono-tech text-[10px] sm:text-xs text-white/70 uppercase tracking-widest mt-1.5 block">
            School Technology Initiative
          </span>
        </div>
      </div>

      {/* Subtle Scroll Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 font-mono-tech text-[10px] tracking-widest uppercase text-[#1C2833]/50 pointer-events-none">
        Scroll To Advance
      </div>
    </section>
  );
};
