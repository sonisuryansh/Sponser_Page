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

  useLayoutEffect(() => {
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
      const fromScrollPane = fromWrapper.querySelector<HTMLElement>('.slide-scroll-pane');
      const scrollPane = toWrapper.querySelector<HTMLElement>('.slide-scroll-pane');

      // Cancel any running timeline cleanly
      if (activeTimelineRef.current) {
        activeTimelineRef.current.kill();
        activeTimelineRef.current = null;
      }
      gsap.killTweensOf([fromWrapper, toWrapper, fromFrame, toFrame]);

      transitioningRef.current = true;
      setIsTransitioning(true);

      if (scrollPane) scrollPane.scrollTop = 0;
      if (fromScrollPane) fromScrollPane.style.overflowY = 'hidden';
      if (scrollPane) scrollPane.style.overflowY = 'hidden';

      const enterY = isForward ? 45 : -45;
      const exitY = isForward ? -35 : 35;

      gsap.set(fromWrapper, {
        display: 'block',
        visibility: 'visible',
        zIndex: 10,
        opacity: 1,
        y: 0,
        scale: 1,
        pointerEvents: 'none',
      });
      gsap.set(toWrapper, {
        display: 'block',
        visibility: 'visible',
        zIndex: 20,
        opacity: 0,
        y: enterY,
        scale: 0.99,
        pointerEvents: 'none',
      });

      let watchdogTimer: ReturnType<typeof setTimeout> | null = null;

      const finish = () => {
        if (watchdogTimer) clearTimeout(watchdogTimer);
        if (activeTimelineRef.current) {
          activeTimelineRef.current.kill();
          activeTimelineRef.current = null;
        }

        gsap.set(fromWrapper, {
          display: 'none',
          visibility: 'hidden',
          zIndex: 0,
          opacity: 0,
          y: 0,
          pointerEvents: 'none',
        });
        gsap.set(toWrapper, {
          display: 'block',
          visibility: 'visible',
          zIndex: 10,
          opacity: 1,
          y: 0,
          pointerEvents: 'auto',
        });
        if (fromScrollPane) fromScrollPane.style.overflowY = '';
        if (scrollPane) {
          scrollPane.style.overflowY = '';
          scrollPane.scrollTop = 0;
        }

        gsap.set([fromFrame, toFrame, fromWrapper, toWrapper], {
          clearProps: 'transform,opacity,clipPath,scale,y',
        });
        gsap.set(backdropRef.current, { opacity: 0 });

        activeIndexRef.current = targetIndex;
        setActiveIndex(targetIndex);
        onSlideChange(targetIndex);
        transitioningRef.current = false;
        setIsTransitioning(false);
        lastGestureTimeRef.current = Date.now();

        const steppable = toWrapper.querySelector<HTMLElement>('[data-steppable="true"]');
        if (steppable) {
          const isStepBackFromAdjacent = fromIndex === targetIndex + 1;
          steppable.dispatchEvent(
            new CustomEvent('slide:enter', {
              bubbles: true,
              detail: { direction: isStepBackFromAdjacent ? -1 : 1 },
            })
          );
        }
      };

      // Failsafe watchdog timer (600ms) to ensure transition state never deadlocks
      watchdogTimer = setTimeout(() => {
        if (transitioningRef.current) {
          finish();
        }
      }, 600);

      const timeline = gsap.timeline({
        onComplete: finish,
      });
      activeTimelineRef.current = timeline;

      // 1. Outgoing slide gently glides away and fades out (0.34s)
      timeline.to(
        fromWrapper,
        {
          y: exitY,
          scale: 0.98,
          opacity: 0,
          duration: 0.34,
          ease: 'power2.inOut',
        },
        0
      );

      // 2. Incoming slide glides smoothly into place with luxury ease (0.42s)
      timeline.to(
        toWrapper,
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.42,
          ease: 'power3.out',
        },
        0.03
      );
    },
    [onSlideChange, slides.length]
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
        now - lastGestureTimeRef.current < 220 ||
        document.querySelector('[aria-modal="true"]')
      ) {
        return;
      }

      // Check if current active slide handles internal multi-step animations (e.g. Domains 4-card sequence, Curriculum stages, Lab zones)
      const activeWrapper = wrappersRef.current[activeIndexRef.current];
      const customSteppable = activeWrapper?.querySelector<HTMLElement>('[data-steppable="true"]');
      if (customSteppable) {
        const stepEvent = new CustomEvent('slide:step', {
          bubbles: true,
          cancelable: true,
          detail: { direction },
        });
        const notPrevented = customSteppable.dispatchEvent(stepEvent);
        if (!notPrevented) {
          // Slide handled the step internally! Don't transition slides.
          lastGestureTimeRef.current = now;
          return;
        }
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
