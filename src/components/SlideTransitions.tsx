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

const ease = 'power3.inOut';
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
  const wrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const backdropRef = useRef<HTMLDivElement>(null);
  const goldBlockRef = useRef<HTMLDivElement>(null);
  const shuttersRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (shuttersRef.current) {
      gsap.set(shuttersRef.current.querySelectorAll('.shutter-strip'), {
        xPercent: 110,
        yPercent: -12,
        skewX: -4,
      });
    }
    gsap.set(goldBlockRef.current, { y: 60, opacity: 0 });
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
      const lowIndex = Math.min(fromIndex, targetIndex);
      const highIndex = Math.max(fromIndex, targetIndex);
      const lowWrapper = wrappersRef.current[lowIndex];
      const highWrapper = wrappersRef.current[highIndex];
      if (!lowWrapper || !highWrapper) return;

      const lowFrame = lowWrapper.querySelector<HTMLElement>('.slide-frame');
      const lowContent = lowWrapper.querySelector<HTMLElement>('.chapter-content');
      const highContent = highWrapper.querySelector<HTMLElement>('.chapter-content');
      const lowImage = lowWrapper.querySelector<HTMLElement>('.chapter-media-img');
      const highImage = highWrapper.querySelector<HTMLElement>('.chapter-media-img');
      const fromScrollPane = fromWrapper.querySelector<HTMLElement>('.slide-scroll-pane');
      const scrollPane = toWrapper.querySelector<HTMLElement>('.slide-scroll-pane');
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const motionVariant = targetIndex % 3;

      transitioningRef.current = true;
      setIsTransitioning(true);
      if (scrollPane) {
        scrollPane.scrollTop = isForward ? 0 : scrollPane.scrollHeight - scrollPane.clientHeight;
      }
      if (fromScrollPane) fromScrollPane.style.overflowY = 'hidden';
      if (scrollPane) scrollPane.style.overflowY = 'hidden';

      onSlideChange(targetIndex);
      gsap.set([lowWrapper, highWrapper], { visibility: 'visible' });
      gsap.set(lowWrapper, { zIndex: 10 });
      gsap.set(highWrapper, { zIndex: 20 });

      const finish = (index: number) => {
        const inactiveWrapper = index === lowIndex ? highWrapper : lowWrapper;
        const activeWrapper = index === lowIndex ? lowWrapper : highWrapper;

        gsap.set(inactiveWrapper, { visibility: 'hidden', zIndex: 0, opacity: 0 });
        gsap.set(activeWrapper, { visibility: 'visible', zIndex: 10, opacity: 1 });
        if (fromScrollPane) fromScrollPane.style.overflowY = '';
        if (scrollPane) {
          scrollPane.style.overflowY = '';
          scrollPane.scrollTop = isForward ? 0 : scrollPane.scrollHeight - scrollPane.clientHeight;
        }
        gsap.set([lowFrame, lowContent], { clearProps: 'transform,opacity,clipPath' });
        gsap.set(
          [
            lowContent?.querySelectorAll(animatedTargetsSelector),
            highContent?.querySelectorAll(animatedTargetsSelector),
          ],
          { clearProps: 'transform,opacity,clipPath' }
        );
        gsap.set(backdropRef.current, { opacity: 0 });
        gsap.set(goldBlockRef.current, { y: 60, opacity: 0 });
        if (shuttersRef.current) {
          gsap.set(shuttersRef.current.querySelectorAll('.shutter-strip'), {
            xPercent: 110,
            yPercent: -12,
            skewX: -4,
          });
        }

        activeIndexRef.current = index;
        setActiveIndex(index);
        onSlideChange(index);
        transitioningRef.current = false;
        setIsTransitioning(false);
      };

      if (reducedMotion) {
        gsap.set(toWrapper, { visibility: 'visible', zIndex: 20, opacity: 0 });
        gsap
          .timeline({
            onComplete: () => finish(targetIndex),
          })
          .to(fromWrapper, { opacity: 0, duration: 0.18, ease: 'power1.out' })
          .to(toWrapper, { opacity: 1, duration: 0.18, ease: 'power1.out' }, '<');
        return;
      }

      const headingTargets = highContent?.querySelectorAll<HTMLElement>('h1,h2,.statement-headline');
      const bodyTargets = highContent?.querySelectorAll<HTMLElement>(bodyTargetsSelector);
      const outgoingTargets = lowContent?.querySelectorAll<HTMLElement>(animatedTargetsSelector);
      const strips = shuttersRef.current?.querySelectorAll<HTMLElement>('.shutter-strip');
      const headingFrom =
        motionVariant === 1
          ? { x: 28, y: 0, opacity: 0, clipPath: 'inset(0 100% 0 0)' }
          : motionVariant === 2
            ? { x: 0, y: -22, opacity: 0, clipPath: 'inset(100% 0 0 0)' }
            : { x: 0, y: 26, opacity: 0, clipPath: 'inset(0 0 100% 0)' };
      const bodyFrom =
        motionVariant === 1
          ? { x: 22, y: 12, scale: 0.97, opacity: 0 }
          : motionVariant === 2
            ? { x: 0, y: -20, scale: 0.97, opacity: 0 }
            : { x: 0, y: 20, scale: 1, opacity: 0 };
      const outgoingTo =
        motionVariant === 1
          ? { x: -20, y: 0, opacity: 0 }
          : motionVariant === 2
            ? { x: 0, y: 20, opacity: 0 }
            : { x: 0, y: -20, opacity: 0 };

      gsap.set([lowWrapper, highWrapper], { opacity: 1 });
      gsap.set(lowWrapper, { opacity: 1 });
      gsap.set(highWrapper, { opacity: 0 });
      gsap.set(
        [
          lowContent?.querySelectorAll(animatedTargetsSelector),
          highContent?.querySelectorAll(animatedTargetsSelector),
        ],
        { clearProps: 'transform,opacity,clipPath' }
      );

      const timeline = gsap.timeline({
        paused: true,
        onComplete: () => finish(highIndex),
        onReverseComplete: () => finish(lowIndex),
      });

      timeline
        .fromTo(
          lowFrame,
          { scale: 1 },
          { scale: 0.92, duration: 0.9, ease },
          0
        )
        .fromTo(
          lowWrapper,
          { opacity: 1 },
          { opacity: 0, duration: 0.72, ease: 'power2.in' },
          0.08
        )
        .fromTo(
          highWrapper,
          { opacity: 0 },
          { opacity: 1, duration: 0.78, ease: 'power2.out' },
          0.56
        );

      if (highContent) {
        timeline.fromTo(
          highContent,
          { opacity: 0 },
          { opacity: 1, duration: 0.32, ease: 'power2.out' },
          1.02
        );
      }

      if (outgoingTargets?.length) {
        timeline.to(
          outgoingTargets,
          { ...outgoingTo, duration: 0.36, stagger: 0.02, ease: 'power2.in' },
          0.06
        );
      }

      if (lowImage) {
        timeline
          .to(
            lowImage,
            {
              filter: 'saturate(0.85) contrast(1) brightness(1) blur(4px)',
              duration: 0.34,
              ease: 'power2.out',
            },
            0
          )
          .to(
            lowImage,
            {
              filter: 'saturate(0.7) contrast(1.05) brightness(0.85) blur(0px)',
              duration: 0.52,
              ease: 'power2.inOut',
            },
            0.34
          );
      }

      if (highImage) {
        timeline.fromTo(
          highImage,
          {
            x: motionVariant === 1 ? 18 : motionVariant === 2 ? 0 : -14,
            y: motionVariant === 2 ? -14 : 8,
            scale: motionVariant === 1 ? 1.07 : 1.04,
            filter: 'saturate(0.85) contrast(1) brightness(1) blur(4px)',
          },
          {
            x: 0,
            y: 0,
            scale: 1,
            filter: 'saturate(0.7) contrast(1.05) brightness(0.85) blur(0px)',
            duration: 0.62,
            ease: 'power2.out',
          },
          0.74
        );
      }

      if (backdropRef.current) {
        timeline
          .fromTo(
            backdropRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.58, ease: 'power2.out' },
            0
          )
          .to(backdropRef.current, { opacity: 0, duration: 0.44, ease: 'power2.in' }, 1.22);
      }

      if (goldBlockRef.current) {
        timeline
          .fromTo(
            goldBlockRef.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.38, ease: 'power2.out' },
            0.34
          )
          .to(goldBlockRef.current, { y: 60, opacity: 0, duration: 0.32, ease: 'power2.in' }, 1.3);
      }

      if (strips?.length) {
        timeline
          .fromTo(
            strips,
            { xPercent: 110, yPercent: -12, skewX: -4 },
            {
              xPercent: 0,
              yPercent: 0,
              skewX: 0,
              duration: 0.42,
              stagger: 0.08,
              ease,
            },
            0.48
          )
          .to(
            strips,
            {
              xPercent: -110,
              yPercent: 12,
              duration: 0.38,
              stagger: 0.06,
              ease,
            },
            1.08
          );
      }

      if (headingTargets?.length) {
        timeline.fromTo(
          headingTargets,
          headingFrom,
          {
            x: 0,
            y: 0,
            opacity: 1,
            clipPath: 'inset(0 0 0% 0)',
            duration: 0.4,
            stagger: 0.08,
            ease: 'power3.out',
          },
          1.08
        );
      }

      if (bodyTargets?.length) {
        const bodyStagger = Math.min(0.06, 0.35 / bodyTargets.length);
        timeline.fromTo(
          bodyTargets,
          bodyFrom,
          {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: bodyStagger,
            ease: 'power2.out',
          },
          1.12
        );
      }

      if (isForward) {
        timeline.progress(0).play();
      } else {
        timeline.progress(1).reverse();
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
      if (
        transitioningRef.current ||
        document.querySelector('[aria-modal="true"]')
      ) {
        return;
      }

      const pane = wrappersRef.current[activeIndexRef.current]?.querySelector<HTMLElement>(
        '.slide-scroll-pane'
      );
      if (pane && pane.scrollHeight > pane.clientHeight + 8) {
        const atTop = pane.scrollTop <= 2;
        const atBottom = pane.scrollTop + pane.clientHeight >= pane.scrollHeight - 2;
        if ((direction > 0 && !atBottom) || (direction < 0 && !atTop)) return;
      }

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

      const pane = wrappersRef.current[activeIndexRef.current]?.querySelector<HTMLElement>(
        '.slide-scroll-pane'
      );
      if (!pane || pane.scrollHeight <= pane.clientHeight + 8) return true;

      const atTop = pane.scrollTop <= 2;
      const atBottom = pane.scrollTop + pane.clientHeight >= pane.scrollHeight - 2;
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
      const stepEvent = new CustomEvent('medhaarc:step', {
        cancelable: true,
        detail: { direction },
      });
      if (slides[activeIndexRef.current]?.id === 'curriculum' && !window.dispatchEvent(stepEvent)) {
        event.preventDefault();
        return;
      }

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

      <div
        ref={goldBlockRef}
        className="slide-transition-gold-block"
        style={{ backgroundColor: accentColor }}
        aria-hidden="true"
      />
      <div ref={shuttersRef} className="slide-transition-shutters" aria-hidden="true">
        <div className="shutter-strip shutter-strip-light" />
        <div className="shutter-strip shutter-strip-gold" style={{ backgroundColor: accentColor }} />
        <div className="shutter-strip shutter-strip-dark" />
      </div>

      <nav className="slide-progress" aria-label="Slide progress">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Jump to slide ${index + 1}`}
            aria-current={index === activeIndex ? 'step' : undefined}
            className="slide-progress-button"
            onClick={() => goToSlide(index)}
          >
            <span
              className={`slide-progress-mark${index === activeIndex ? ' is-active' : ''}`}
              style={{
                backgroundColor:
                  index === activeIndex
                    ? accentColor
                    : slides[activeIndex]?.theme === 'dark'
                      ? 'rgba(255,255,255,0.4)'
                      : 'rgba(17,17,17,0.35)',
              }}
            />
          </button>
        ))}
      </nav>

      {/* Side Scrolling Note (Like Image 2: SCROLL TO EXPLORE + Downward Arrow, Hidden ONLY on Last Section) */}
      {!isLastSlide && (
        <aside className="slide-scroll-cta" aria-label="Scroll navigation note">
          <button
            type="button"
            onClick={handleScrollCtaClick}
            className="slide-scroll-cta-btn group"
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
