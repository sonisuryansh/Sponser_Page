import React, { useRef, useEffect, useState, type ReactNode } from 'react';

interface Parallax3DCardProps {
  children: ReactNode;
  className?: string;
  accentColor?: string;
  maxAngle?: number;
  glowColor?: string;
  onClick?: () => void;
}

/**
 * Parallax3DCard:
 * Applies 3D perspective tilt tracking cursor position with smooth lerp interpolation,
 * specular reflection, and multi-layered Z-depth translation for physical 3D card experience.
 */
export const Parallax3DCard: React.FC<Parallax3DCardProps> = ({
  children,
  className = '',
  accentColor = '#164fa9',
  maxAngle = 14,
  glowColor,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const isHovered = useRef(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const lerp = (start: number, end: number, factor: number) => {
    return (1 - factor) * start + factor * end;
  };

  const remap = (value: number, oldMax: number, newMax: number) => {
    const clamped = Math.max(-oldMax, Math.min(oldMax, value));
    return (clamped / oldMax) * newMax;
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Check touch device or prefers-reduced-motion
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const animate = () => {
      currentRotation.current.x = lerp(currentRotation.current.x, targetRotation.current.x, 0.08);
      currentRotation.current.y = lerp(currentRotation.current.y, targetRotation.current.y, 0.08);

      card.style.setProperty('--rotateX', `${currentRotation.current.x.toFixed(2)}deg`);
      card.style.setProperty('--rotateY', `${currentRotation.current.y.toFixed(2)}deg`);

      // Keep animation loop alive if moving or returning to 0
      const diffX = Math.abs(currentRotation.current.x - targetRotation.current.x);
      const diffY = Math.abs(currentRotation.current.y - targetRotation.current.y);

      if (isHovered.current || diffX > 0.02 || diffY > 0.02) {
        rafId.current = requestAnimationFrame(animate);
      } else {
        currentRotation.current.x = 0;
        currentRotation.current.y = 0;
        card.style.setProperty('--rotateX', '0deg');
        card.style.setProperty('--rotateY', '0deg');
        rafId.current = null;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const posX = e.clientX - centerX;
      const posY = e.clientY - centerY;

      // When mouse moves right (posX > 0), rotateY tilts right back: positive Y rotation
      // When mouse moves down (posY > 0), rotateX tilts top toward user: negative X rotation
      const rotY = remap(posX, rect.width / 2, maxAngle);
      const rotX = -remap(posY, rect.height / 2, maxAngle);

      targetRotation.current = { x: rotX, y: rotY };

      // Calculate glare percentage (0 to 100)
      const glareX = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const glareY = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
      setGlarePos({ x: glareX, y: glareY, opacity: 0.16 });

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    const handleMouseEnter = () => {
      isHovered.current = true;
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    const handleMouseLeave = () => {
      isHovered.current = false;
      targetRotation.current = { x: 0, y: 0 };
      setGlarePos((prev) => ({ ...prev, opacity: 0 }));
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [maxAngle]);

  const activeGlow = glowColor || accentColor;

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      style={
        {
          perspective: '1200px',
          '--rotateX': '0deg',
          '--rotateY': '0deg',
          '--accent-color': accentColor,
        } as React.CSSProperties
      }
      className={`group relative select-none will-change-transform ${className}`}
    >
      {/* 3D Ambient Blur Shadow Layer behind the card */}
      <div
        className="pointer-events-none absolute inset-4 -z-10 rounded-[4rem] transition-opacity duration-500 ease-out"
        style={{
          background: activeGlow,
          opacity: 0.35,
          filter: 'blur(28px)',
          transform:
            'rotateX(var(--rotateX)) rotateY(var(--rotateY)) translate3d(0, 1.75rem, -2.5rem)',
        }}
      />

      {/* Main 3D Tilted Card Body */}
      <div
        className="relative h-full w-full overflow-visible transition-[box-shadow] duration-300"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(var(--rotateX)) rotateY(var(--rotateY)) translate3d(0, 0, 0)',
        }}
      >
        {/* Specular Glare Reflection on Hover */}
        <div
          className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle 320px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 80%)`,
            mixBlendMode: 'overlay',
          }}
        />

        {children}
      </div>
    </div>
  );
};

export default Parallax3DCard;

