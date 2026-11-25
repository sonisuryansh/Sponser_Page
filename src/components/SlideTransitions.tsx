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

const animatedTargetsSelector =
  'h1,h2,.statement-headline,p,.about-panel,.value-card,.domain-fan-card,.approach-block,.curriculum-card,.project-card,.resource-card,article';
const bodyTargetsSelector =
  'p,.about-panel,.value-card,.domain-fan-card,.approach-block,.curriculum-card,.project-card,.resource-card,article';

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
  const wrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const backdropRef = useRef<HTMLDivElement>(null);
  const shuttersRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (shuttersRef.current) {
      gsap.set(shuttersRef.current, { visibility: 'hidden' });
      gsap.set(shuttersRef.current.querySelectorAll('.shutter-strip'), {
        xPercent: 110,
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
      const fromContent = fromWrapper.querySelector<HTMLElement>('.chapter-content');
      const toContent = toWrapper.querySelector<HTMLElement>('.chapter-content');
      const fromScrollPane = fromWrapper.querySelector<HTMLElement>('.slide-scroll-pane');
      const scrollPane = toWrapper.querySelector<HTMLElement>('.slide-scroll-pane');
      const toImage = toWrapper.querySelector<HTMLElement>('.chapter-media-img');
      const strips = shuttersRef.current?.querySelectorAll<HTMLElement>('.shutter-strip');

      transitioningRef.current = true;
      setIsTransitioning(true);

      if (scrollPane) scrollPane.scrollTop = 0;
      if (fromScrollPane) fromScrollPane.style.overflowY = 'hidden';
      if (scrollPane) scrollPane.style.overflowY = 'hidden';

      onSlideChange(targetIndex);

      gsap.set([fromWrapper, toWrapper], { visibility: 'visible' });
      gsap.set(fromWrapper, { zIndex: 10, opacity: 1 });
      gsap.set(toWrapper, { zIndex: 20, opacity: 0 });

      let watchdogTimer: ReturnType<typeof setTimeout> | null = null;

      const finish = () => {
        if (watchdogTimer) clearTimeout(watchdogTimer);
        gsap.set(fromWrapper, { visibility: 'hidden', zIndex: 0, opacity: 0 });
        gsap.set(toWrapper, { visibility: 'visible', zIndex: 10, opacity: 1 });
        if (fromScrollPane) fromScrollPane.style.overflowY = '';
        if (scrollPane) {
          scrollPane.style.overflowY = '';
          scrollPane.scrollTop = 0;
        }

        gsap.set([fromFrame, fromContent, toContent], { clearProps: 'transform,opacity,clipPath,scale' });
        gsap.set(
          [
            fromContent?.querySelectorAll(animatedTargetsSelector),
            toContent?.querySelectorAll(animatedTargetsSelector),
          ],
          { clearProps: 'transform,opacity,clipPath,scale' }
        );
        gsap.set(backdropRef.current, { opacity: 0 });
        if (shuttersRef.current) {
          gsap.set(shuttersRef.current, { visibility: 'hidden' });
          gsap.set(shuttersRef.current.querySelectorAll('.shutter-strip'), {
            xPercent: 110,
            yPercent: -12,
            skewX: -4,
          });
        }

        activeIndexRef.current = targetIndex;
        setActiveIndex(targetIndex);
        onSlideChange(targetIndex);
        transitioningRef.current = false;
        setIsTransitioning(false);
        lastGestureTimeRef.current = Date.now();
      };

      // Failsafe watchdog timer (1100ms) to ensure transition state never deadlocks
      watchdogTimer = setTimeout(() => {
        if (transitioningRef.current) {
          finish();
        }
      }, 1100);

      // Directional shutter trajectories:
      // Forward (down): enter from +110% (right) -> 0% -> exit to -110% (left)
      // Reverse (up): enter from -110% (left) -> 0% -> exit to +110% (right)
      const enterX = isForward ? 110 : -110;
      const enterY = isForward ? -12 : 12;
      const enterSkew = isForward ? -4 : 4;

      const exitX = isForward ? -110 : 110;
      const exitY = isForward ? 12 : -12;
      const exitSkew = isForward ? 4 : -4;

      if (shuttersRef.current) {
        gsap.set(shuttersRef.current, { visibility: 'visible' });
      }
      if (strips?.length) {
        gsap.set(strips, {
          xPercent: enterX,
          yPercent: enterY,
          skewX: enterSkew,
        });
      }

      const incomingHeadings = toContent?.querySelectorAll<HTMLElement>('h1,h2,.statement-headline');
      const incomingBody = toContent?.querySelectorAll<HTMLElement>(bodyTargetsSelector);
      const outgoingTargets = fromContent?.querySelectorAll<HTMLElement>(animatedTargetsSelector);

      const timeline = gsap.timeline({
        onComplete: finish,
      });

      // 1. Zoom out outgoing frame subtly
      if (fromFrame) {
        timeline.to(fromFrame, { scale: 0.94, duration: 0.42, ease: 'power2.out' }, 0);
      }

      // 2. Outgoing targets slide slightly away
      if (outgoingTargets?.length) {
        timeline.to(
          outgoingTargets,
          {
            x: isForward ? -25 : 25,
            opacity: 0,
            duration: 0.32,
            stagger: 0.015,
            ease: 'power2.in',
          },
          0.04
        );
      }

      // 3. Backdrop darkens during curtain sweep
      if (backdropRef.current) {
        timeline
          .fromTo(backdropRef.current, { opacity: 0 }, { opacity: 0.88, duration: 0.4, ease: 'power2.out' }, 0)
          .to(backdropRef.current, { opacity: 0, duration: 0.36, ease: 'power2.in' }, 0.54);
      }

      // 4. Shutters sweep IN to cover the screen
      if (strips?.length) {
        timeline.to(
          strips,
          {
            xPercent: 0,
            yPercent: 0,
            skewX: 0,
            duration: 0.42,
            stagger: 0.05,
            ease: 'power3.inOut',
          },
          0.04
        );
      }

      // 5. SWAP SLIDES while screen is fully covered by shutters at t = 0.44s
      timeline.add(() => {
        gsap.set(fromWrapper, { opacity: 0, visibility: 'hidden' });
        gsap.set(toWrapper, { opacity: 1, visibility: 'visible' });

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
      }, 0.44);

      // 7. Shutters sweep OUT to reveal new slide
      if (strips?.length) {
        timeline.to(
          strips,
          {
            xPercent: exitX,
            yPercent: exitY,
            skewX: exitSkew,
            duration: 0.42,
            stagger: 0.05,
            ease: 'power3.inOut',
          },
          0.46
        );
      }

      // 8. Incoming content reveals with crisp forward animation
      if (toContent) {
        timeline.fromTo(
          toContent,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'power2.out' },
          0.48
        );
      }

      if (incomingHeadings?.length) {
        timeline.fromTo(
          incomingHeadings,
          {
            y: isForward ? 22 : -22,
            opacity: 0,
            clipPath: isForward ? 'inset(0 0 100% 0)' : 'inset(100% 0 0 0)',
          },
          {
            y: 0,
            opacity: 1,
            clipPath: 'inset(0 0 0% 0)',
            duration: 0.38,
            stagger: 0.05,
            ease: 'power3.out',
          },
          0.5
        );
      }

      if (incomingBody?.length) {
        const bodyStagger = Math.min(0.035, 0.25 / incomingBody.length);
        timeline.fromTo(
          incomingBody,
          { y: isForward ? 16 : -16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.36,
            stagger: bodyStagger,
            ease: 'power2.out',
          },
          0.54
        );
      }

      if (toImage) {
        timeline.fromTo(
          toImage,
          {
            scale: 1.05,
            filter: 'saturate(0.85) brightness(1.05) blur(3px)',
          },
          {
            scale: 1,
            filter: 'saturate(0.75) brightness(0.85) blur(0px)',
            duration: 0.48,
            ease: 'power2.out',
          },
          0.46
        );
      }
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
        now - lastGestureTimeRef.current < 450 ||
        document.querySelector('[aria-modal="true"]')
      ) {
        return;
      }

      // Check if current active slide handles internal multi-step animations (e.g. Domains 5-card morph sequence)
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

    const shouldCaptureGesture = (direction: number) => {
      if (transitioningRef.current) return true;
      if (document.querySelector('[aria-modal="true"]')) return false;

      const activeWrapper = wrappersRef.current[activeIndexRef.current];
      const customSteppable = activeWrapper?.querySelector<HTMLElement>('[data-steppable="true"]');
      if (customSteppable) return true;

      const pane = wrappersRef.current[activeIndexRef.current]?.querySelector<HTMLElement>(
        '.slide-scroll-pane'
      );
      if (!pane || pane.scrollHeight <= pane.clientHeight + 16) return true;

      const atTop = pane.scrollTop <= 6;
      const atBottom = Math.ceil(pane.scrollTop + pane.clientHeight) >= pane.scrollHeight - 12;
      return direction > 0 ? atBottom : atTop;
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || !event.cancelable) return;
      const direction = Math.sign(event.deltaY);
      if (direction && shouldCaptureGesture(direction)) event.preventDefault();
    };
    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? null;
    };
    const handleTouchMove = (event: TouchEvent) => {
      if (touchStartY === null || !event.cancelable) return;
      const currentY = event.touches[0]?.clientY;
      if (currentY === undefined) return;
      const deltaY = currentY - touchStartY;
      const direction = deltaY < 0 ? 1 : -1;
      if (deltaY !== 0 && shouldCaptureGesture(direction)) event.preventDefault();
    };
    const handleTouchEnd = (event: TouchEvent) => {
      const endY = event.changedTouches[0]?.clientY;
      if (touchStartY !== null && endY !== undefined) {
        const deltaY = endY - touchStartY;
        const direction = deltaY < 0 ? 1 : -1;
        if (Math.abs(deltaY) >= 30 && shouldCaptureGesture(direction)) {
          handleGesture(direction);
        }
      }
      touchStartY = null;
    };
    const clearTouchStart = () => {
      touchStartY = null;
    };

    window.addEventListener('wheel', handleWheel, { capture: true, passive: false });
    window.addEventListener('touchstart', handleTouchStart, { capture: true, passive: true });
    window.addEventListener('touchmove', handleTouchMove, { capture: true, passive: false });
    window.addEventListener('touchend', handleTouchEnd, { capture: true, passive: false });
    window.addEventListener('touchcancel', clearTouchStart, true);

    return () => {
      window.removeEventListener('wheel', handleWheel, true);
      window.removeEventListener('touchstart', handleTouchStart, true);
      window.removeEventListener('touchmove', handleTouchMove, true);
      window.removeEventListener('touchend', handleTouchEnd, true);
      window.removeEventListener('touchcancel', clearTouchStart, true);
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
    const wheelObserver = Observer.create({
      target: window,
      type: 'wheel',
      tolerance: 30,
      preventDefault: false,
      onDown: () => handleGesture(1),
      onUp: () => handleGesture(-1),
    });
    const touchObserver = Observer.create({
      target: window,
      type: 'touch',
      tolerance: 30,
      preventDefault: false,
      onUp: () => handleGesture(1),
      onDown: () => handleGesture(-1),
    });

    return () => {
      wheelObserver.kill();
      touchObserver.kill();
    };
  }, [handleGesture]);

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
                visibility: isActive ? 'visible' : 'hidden',
                opacity: isActive ? 1 : 0,
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
