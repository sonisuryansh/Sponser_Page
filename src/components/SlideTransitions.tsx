import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(Observer);

export interface SlideItem {
  id: string;
  theme: 'dark' | 'light';
  title: string;
  number: string;
  element: React.ReactNode;
}

interface SlideTransitionsProps {
  slides: SlideItem[];
  currentIndex: number;
  onSlideChange: (index: number) => void;
  accentColor?: string;
  pageBgColor?: string;
}

export const SlideTransitions: React.FC<SlideTransitionsProps> = ({
  slides,
  currentIndex,
  onSlideChange,
  accentColor = '#c8a45d',
  pageBgColor = '#FAF6EE',
}) => {
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const activeIndexRef = useRef(currentIndex);
  const transitioningRef = useRef(false);
  const lastGestureTimeRef = useRef(0);
  const activeTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const wrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const backdropRef = useRef<HTMLDivElement>(null);
  const shuttersRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (shuttersRef.current) {
      shuttersRef.current.classList.remove('is-active');
      gsap.set(shuttersRef.current, { display: 'none', visibility: 'hidden' });
      gsap.set(shuttersRef.current.querySelectorAll('.shutter-strip'), {
        xPercent: 120,
        yPercent: -12,
        skewX: -4,
      });
    }
    gsap.set(backdropRef.current, { opacity: 0 });
  }, []);

  const goToSlide = useCallback(
    (targetIndex: number) => {
      const fromIndex = activeIndexRef.current;
      if (
        targetIndex === fromIndex ||
        targetIndex < 0 ||
        targetIndex >= slides.length ||
        transitioningRef.current
      ) {
        return;
      }

      const fromWrapper = wrappersRef.current[fromIndex];
      const toWrapper = wrappersRef.current[targetIndex];
      if (!fromWrapper || !toWrapper) return;

      const isForward = targetIndex > fromIndex;
      const fromFrame = fromWrapper.querySelector<HTMLElement>('.slide-frame');
      const toFrame = toWrapper.querySelector<HTMLElement>('.slide-frame');
      const fromContent = fromWrapper.querySelector<HTMLElement>('.chapter-content');
      const toContent = toWrapper.querySelector<HTMLElement>('.chapter-content');
      const fromScrollPane = fromWrapper.querySelector<HTMLElement>('.slide-scroll-pane');
      const scrollPane = toWrapper.querySelector<HTMLElement>('.slide-scroll-pane');
      const strips = shuttersRef.current?.querySelectorAll<HTMLElement>('.shutter-strip');

      // Cancel any running timeline cleanly and reset shutters
      if (activeTimelineRef.current) {
        activeTimelineRef.current.kill();
        activeTimelineRef.current = null;
      }
      if (strips?.length) {
        gsap.killTweensOf(strips);
      }
      if (backdropRef.current) {
        gsap.killTweensOf(backdropRef.current);
      }
      if (shuttersRef.current) {
        shuttersRef.current.classList.remove('is-active');
        gsap.set(shuttersRef.current, { display: 'none', visibility: 'hidden' });
        if (strips?.length) {
          gsap.set(strips, { xPercent: 120, yPercent: -12, skewX: -4 });
        }
      }

      transitioningRef.current = true;
      setIsTransitioning(true);

      if (scrollPane) scrollPane.scrollTop = 0;
      if (fromScrollPane) fromScrollPane.style.overflowY = 'hidden';
      if (scrollPane) scrollPane.style.overflowY = 'hidden';

      gsap.set(fromWrapper, { display: 'block', visibility: 'visible', zIndex: 10, opacity: 1, pointerEvents: 'none' });
      gsap.set(toWrapper, { display: 'block', visibility: 'visible', zIndex: 20, opacity: 0, pointerEvents: 'none' });

      let watchdogTimer: ReturnType<typeof setTimeout> | null = null;

      const finish = () => {
        if (watchdogTimer) clearTimeout(watchdogTimer);
        if (activeTimelineRef.current) {
          activeTimelineRef.current.kill();
          activeTimelineRef.current = null;
        }

        gsap.set(fromWrapper, { display: 'none', visibility: 'hidden', zIndex: 0, opacity: 0, pointerEvents: 'none' });
        gsap.set(toWrapper, { display: 'block', visibility: 'visible', zIndex: 10, opacity: 1, pointerEvents: 'auto' });
        if (fromScrollPane) fromScrollPane.style.overflowY = '';
        if (scrollPane) {
          scrollPane.style.overflowY = '';
          scrollPane.scrollTop = 0;
        }

        gsap.set([fromFrame, toFrame, fromContent, toContent], { clearProps: 'transform,opacity,clipPath,scale' });
        gsap.set(backdropRef.current, { opacity: 0 });
        if (shuttersRef.current) {
          shuttersRef.current.classList.remove('is-active');
          gsap.set(shuttersRef.current, { display: 'none', visibility: 'hidden' });
          gsap.set(shuttersRef.current.querySelectorAll('.shutter-strip'), {
            xPercent: 120,
            yPercent: -12,
            skewX: -4,
          });
        }

        activeIndexRef.current = targetIndex;
        setActiveIndex(targetIndex);
        onSlideChange(targetIndex);
        transitioningRef.current = false;
        setIsTransitioning(false);
        lastGestureTimeRef.current = Date.now() - 300;
      };

      // Failsafe watchdog timer (850ms) to ensure transition state never deadlocks
      watchdogTimer = setTimeout(() => {
        if (transitioningRef.current) {
          finish();
        }
      }, 850);

      // Directional shutter trajectories (Older Version):
      // Forward (down): enter from +115% (right) -> 0% -> exit to -115% (left)
      // Reverse (up): enter from -115% (left) -> 0% -> exit to +115% (right)
      const enterX = isForward ? 115 : -115;
      const enterY = isForward ? -8 : 8;
      const enterSkew = isForward ? -4 : 4;

      const exitX = isForward ? -115 : 115;
      const exitY = isForward ? 8 : -8;
      const exitSkew = isForward ? 4 : -4;

      if (shuttersRef.current) {
        shuttersRef.current.classList.add('is-active');
        gsap.set(shuttersRef.current, { display: 'block', visibility: 'visible' });
      }
      if (strips?.length) {
        gsap.set(strips, {
          xPercent: enterX,
          yPercent: enterY,
          skewX: enterSkew,
        });
      }

      const timeline = gsap.timeline({
        onComplete: finish,
      });
      activeTimelineRef.current = timeline;

      // 1. Outgoing slide frame subtly recedes
      if (fromFrame) {
        timeline.to(fromFrame, { scale: 0.96, opacity: 0.35, duration: 0.28, ease: 'power2.out' }, 0);
      }

      // 2. Shutters sweep IN to cover the screen (duration: 0.28s, stagger: 0.035s)
      if (strips?.length) {
        timeline.to(
          strips,
          {
            xPercent: 0,
            yPercent: 0,
            skewX: 0,
            duration: 0.28,
            stagger: 0.035,
            ease: 'power3.inOut',
          },
          0.02
        );
      }

      // 3. SWAP SLIDES while screen is 100% solidly covered by shutters at t = 0.38s
      timeline.add(() => {
        try {
          activeIndexRef.current = targetIndex;
          setActiveIndex(targetIndex);
          onSlideChange(targetIndex);

          gsap.set(fromWrapper, { opacity: 0, visibility: 'hidden', display: 'none', pointerEvents: 'none' });
          gsap.set(toWrapper, { opacity: 1, visibility: 'visible', display: 'block', pointerEvents: 'auto' });
        } catch (err) {
          console.warn('Error during slide swap:', err);
        }
      }, 0.38);

      // 4. Shutters sweep OUT to reveal new slide (0.40s to 0.75s)
      if (strips?.length) {
        timeline.to(
          strips,
          {
            xPercent: exitX,
            yPercent: exitY,
            skewX: exitSkew,
            duration: 0.28,
            stagger: 0.035,
            ease: 'power3.inOut',
          },
          0.40
        );
      }

      // 5. Incoming slide frame gently emerges into crisp focus
      if (toFrame) {
        timeline.fromTo(
          toFrame,
          { scale: 0.97, opacity: 0.5 },
          { scale: 1, opacity: 1, duration: 0.28, ease: 'power2.out' },
          0.40
        );
      }
    },
    [onSlideChange, pageBgColor, slides]
  );

  useEffect(() => {
    if (currentIndex !== activeIndexRef.current && !transitioningRef.current) {
      goToSlide(currentIndex);
    }
  }, [currentIndex, goToSlide]);

  const handleGesture = useCallback(
    (direction: number) => {
      const now = Date.now();
      if (
        transitioningRef.current ||
        now - lastGestureTimeRef.current < 250 ||
        document.querySelector('[aria-modal="true"]')
      ) {
        return;
      }

      const pane = wrappersRef.current[activeIndexRef.current]?.querySelector<HTMLElement>(
        '.slide-scroll-pane'
      );
      if (pane && pane.scrollHeight > pane.clientHeight + 16) {
        const atTop = pane.scrollTop <= 6;
        const atBottom = Math.ceil(pane.scrollTop + pane.clientHeight) >= pane.scrollHeight - 12;
        if ((direction > 0 && !atBottom) || (direction < 0 && !atTop)) return;
      }

      lastGestureTimeRef.current = now;
      if (direction > 0) {
        goToSlide(activeIndexRef.current + 1);
      } else {
        goToSlide(activeIndexRef.current - 1);
      }
    },
    [goToSlide]
  );

  useEffect(() => {
    let touchStartY: number | null = null;
    let touchStartX: number | null = null;

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;
      if (document.querySelector('[aria-modal="true"]')) return;

      const pane = wrappersRef.current[activeIndexRef.current]?.querySelector<HTMLElement>(
        '.slide-scroll-pane'
      );
      if (pane && pane.scrollHeight > pane.clientHeight + 16) {
        const atTop = pane.scrollTop <= 6;
        const atBottom = Math.ceil(pane.scrollTop + pane.clientHeight) >= pane.scrollHeight - 12;
        const dir = event.deltaY > 0 ? 1 : -1;
        if ((dir > 0 && !atBottom) || (dir < 0 && !atTop)) {
          return;
        }
      }

      if (event.cancelable) event.preventDefault();
      if (Math.abs(event.deltaY) < 18) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      handleGesture(direction);
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? null;
      touchStartX = event.touches[0]?.clientX ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (touchStartY === null || !event.cancelable) return;
      if (document.querySelector('[aria-modal="true"]')) return;

      const pane = wrappersRef.current[activeIndexRef.current]?.querySelector<HTMLElement>(
        '.slide-scroll-pane'
      );
      if (pane && pane.scrollHeight > pane.clientHeight + 16) {
        const currentY = event.touches[0]?.clientY;
        if (currentY !== undefined) {
          const deltaY = currentY - touchStartY;
          const atTop = pane.scrollTop <= 6;
          const atBottom = Math.ceil(pane.scrollTop + pane.clientHeight) >= pane.scrollHeight - 12;
          const dir = deltaY < 0 ? 1 : -1;
          if ((dir > 0 && !atBottom) || (dir < 0 && !atTop)) return;
        }
      }

      event.preventDefault();
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (touchStartY === null || document.querySelector('[aria-modal="true"]')) {
        touchStartY = null;
        touchStartX = null;
        return;
      }

      const endY = event.changedTouches[0]?.clientY;
      const endX = event.changedTouches[0]?.clientX;
      if (endY !== undefined && touchStartX !== null && endX !== undefined) {
        const deltaY = endY - touchStartY;
        const deltaX = endX - touchStartX;
        if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) >= 32) {
          const direction = deltaY < 0 ? 1 : -1;
          handleGesture(direction);
        }
      }
      touchStartY = null;
      touchStartX = null;
    };

    const clearTouch = () => {
      touchStartY = null;
      touchStartX = null;
    };

    window.addEventListener('wheel', handleWheel, { capture: true, passive: false });
    window.addEventListener('touchstart', handleTouchStart, { capture: true, passive: true });
    window.addEventListener('touchmove', handleTouchMove, { capture: true, passive: false });
    window.addEventListener('touchend', handleTouchEnd, { capture: true, passive: false });
    window.addEventListener('touchcancel', clearTouch, true);

    return () => {
      window.removeEventListener('wheel', handleWheel, true);
      window.removeEventListener('touchstart', handleTouchStart, true);
      window.removeEventListener('touchmove', handleTouchMove, true);
      window.removeEventListener('touchend', handleTouchEnd, true);
      window.removeEventListener('touchcancel', clearTouch, true);
    };
  }, [handleGesture]);

  useEffect(() => {
    const handleGoTo = (e: Event) => {
      const customEvent = e as CustomEvent<any>;
      const targetIdx =
        typeof customEvent.detail === 'number'
          ? customEvent.detail
          : typeof customEvent.detail?.index === 'number'
            ? customEvent.detail.index
            : null;
      if (typeof targetIdx === 'number') {
        goToSlide(targetIdx);
      }
    };
    window.addEventListener('go-to-slide', handleGoTo);
    return () => window.removeEventListener('go-to-slide', handleGoTo);
  }, [goToSlide]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        transitioningRef.current ||
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        document.querySelector('[aria-modal="true"]')
      ) {
        return;
      }

      const target = event.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        (target instanceof HTMLElement && target.isContentEditable) ||
        (event.key === ' ' && target instanceof HTMLElement && target.closest('button,a'))
      ) {
        return;
      }

      let direction: number | null = null;
      if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ') {
        direction = 1;
      } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        direction = -1;
      } else if (event.key === 'Home') {
        event.preventDefault();
        goToSlide(0);
        return;
      } else if (event.key === 'End') {
        event.preventDefault();
        goToSlide(slides.length - 1);
        return;
      }

      if (direction === null) return;

      event.preventDefault();
      const pane = wrappersRef.current[activeIndexRef.current]?.querySelector<HTMLElement>(
        '.slide-scroll-pane'
      );
      if (pane && pane.scrollHeight > pane.clientHeight + 8) {
        const atTop = pane.scrollTop <= 2;
        const atBottom = pane.scrollTop + pane.clientHeight >= pane.scrollHeight - 2;
        if ((direction > 0 && !atBottom) || (direction < 0 && !atTop)) {
          const pageStep = event.key !== 'ArrowDown' && event.key !== 'ArrowUp';
          const distance = pageStep ? Math.max(80, pane.clientHeight * 0.85) : 80;
          pane.scrollBy({ top: direction * distance, behavior: 'auto' });
          return;
        }
      }
      handleGesture(direction);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToSlide, handleGesture, slides]);

  const isLastSlide = activeIndex === slides.length - 1;
  const currentTheme = slides[activeIndex]?.theme ?? 'dark';

  const handleScrollCtaClick = useCallback(() => {
    if (transitioningRef.current) return;
    if (isLastSlide) {
      goToSlide(0);
    } else {
      goToSlide(activeIndex + 1);
    }
  }, [activeIndex, isLastSlide, goToSlide]);

  return (
    <div
      className="slide-transition-root relative h-[100svh] min-h-[100svh] w-full overflow-hidden"
      style={{ backgroundColor: pageBgColor }}
    >
      <div ref={backdropRef} className="slide-transition-backdrop" aria-hidden="true" />
      <div className="relative z-10 h-full w-full overflow-hidden">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={slide.id}
              id={`slide-wrapper-${slide.id}`}
              ref={(element) => {
                wrappersRef.current[index] = element;
              }}
              className="slide-item absolute inset-0 h-full w-full overflow-hidden will-change-transform"
              style={{
                zIndex: isActive ? 10 : 0,
                display: isActive ? 'block' : 'none',
                visibility: isActive ? 'visible' : 'hidden',
                opacity: isActive ? 1 : 0,
                pointerEvents: isActive ? 'auto' : 'none',
              }}
            >
              <div className="slide-frame h-full w-full origin-center overflow-hidden will-change-transform">
                <div className="slide-scroll-pane h-full w-full overflow-x-hidden overflow-y-auto">
                  {slide.element}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div ref={shuttersRef} className="slide-transition-shutters" aria-hidden="true">
        <div className="shutter-strip shutter-strip-light" />
        <div className="shutter-strip shutter-strip-gold" style={{ backgroundColor: accentColor }} />
        <div className="shutter-strip shutter-strip-dark" />
      </div>

      {/* Side Scrolling Note (Like Image 2: SCROLL TO EXPLORE + Downward Arrow, Hidden ONLY on Last Section) */}
      {!isLastSlide && (
        <aside className="slide-scroll-cta" aria-label="Scroll navigation note">
          <button
            type="button"
            onClick={handleScrollCtaClick}
            className={`slide-scroll-cta-btn group ${currentTheme === 'dark' ? 'theme-dark' : 'theme-light'}`}
            aria-label="Scroll to explore next section"
            title="Scroll to explore"
          >
            <span
              className="slide-scroll-cta-label"
              style={{
                color: isTransitioning
                  ? accentColor
                  : currentTheme === 'dark'
                    ? 'rgba(255, 255, 255, 0.75)'
                    : 'rgba(17, 17, 17, 0.75)',
              }}
            >
              Scroll to explore
            </span>
            <div
              className="slide-scroll-cta-picto"
              style={{
                color: isTransitioning
                  ? accentColor
                  : currentTheme === 'dark'
                    ? '#ffffff'
                    : '#111111',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="30"
                viewBox="0 0 20 34"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 0v26.2l-8-8.1v5.7L10 34l10-10.2v-5.7l-8 8.1V0H8z"
                />
              </svg>
            </div>
          </button>
        </aside>
      )}
    </div>
  );
};
