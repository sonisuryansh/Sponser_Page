import React, { useRef, useEffect } from 'react';
import { siteConfig } from '../config/content.config';
import { ChapterShell } from '../components/ChapterShell';
import { ShieldCheck, ArrowRight, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const TeacherEmpowermentSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const flowNodesRef = useRef<HTMLDivElement>(null);

  // Animation on scroll: Columns rise + flow nodes pulse
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // Failsafe: force visibility
    const failsafe = setTimeout(() => {
      const cols = el.querySelectorAll<HTMLElement>('.teacher-col');
      cols.forEach((c) => {
        c.style.opacity = '1';
        c.style.transform = 'none';
      });
    }, 2500);

    if (prefersReducedMotion || isMobile || !document.documentElement.classList.contains('js-motion')) {
      return () => clearTimeout(failsafe);
    }

    const cols = el.querySelectorAll<HTMLElement>('.teacher-col');
    const nodes = flowNodesRef.current?.querySelectorAll<HTMLElement>('.flow-node');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cols,
        { y: 30, opacity: 0.15 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      );

      if (nodes && nodes.length > 0) {
        gsap.fromTo(
          nodes,
          { scale: 0.94, opacity: 0.5 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: flowNodesRef.current,
              start: 'top 90%',
              once: true,
            },
          }
        );
      }
    });

    return () => {
      clearTimeout(failsafe);
      ctx.revert();
    };
  }, []);

  return (
    <ChapterShell id="teacher-empowerment" chapterNumber="10" theme="light">
      <div ref={containerRef} className="w-full flex-1 flex flex-col justify-between py-2 select-none">
        {/* Eyebrow & Message */}
        <div className="mb-3 max-w-3xl">
          <div className="text-xs uppercase tracking-[0.2em] text-[#c8a45d] font-medium mb-1">
            {siteConfig.teacherEmpowerment.eyebrow}
          </div>
          <h2 className="font-serif text-[clamp(26px,3.4vw,44px)] font-normal leading-[1.14] tracking-tight text-[#111111]">
            {siteConfig.teacherEmpowerment.headline}
          </h2>
          <p className="text-base text-[#5b5b5b] font-serif italic">
            &ldquo;{siteConfig.teacherEmpowerment.message}&rdquo;
          </p>
        </div>

        {/* Three Columns: Train, Guide, Assist */}
        <div
          ref={columnsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-black/10 pt-4 my-auto"
        >
          {siteConfig.teacherEmpowerment.columns.map((col, idx) => (
            <div
              key={col.title}
              className="teacher-col p-4 sm:p-5 bg-[#fafafa] border border-black/10 rounded-[2px] flex flex-col justify-between h-[170px] sm:h-[190px]"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#5b5b5b] font-mono">
                    0{idx + 1}
                  </span>
                  {col.badge && (
                    <span className="px-2 py-0.5 bg-[#c8a45d]/20 text-[#111111] text-[10px] uppercase font-mono tracking-wider rounded-[2px]">
                      {col.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-xl font-medium tracking-tight text-[#111111] mb-1.5">
                  {col.title}
                </h3>
              </div>
              <p className="text-xs leading-relaxed text-[#5b5b5b]">
                {col.description}
              </p>
            </div>
          ))}
        </div>

        {/* Human-in-the-Loop Flow Diagram */}
        <div className="bg-[#ffffff] border border-black/10 p-4 rounded-[2px] mt-2">
          <div className="text-[10px] uppercase tracking-[0.2em] text-[#5b5b5b] font-mono mb-3">
            Human-in-the-Loop Workflow
          </div>

          <div ref={flowNodesRef} className="flex flex-wrap items-center justify-between gap-2">
            {siteConfig.teacherEmpowerment.flow.map((step, idx) => (
              <React.Fragment key={step}>
                <div className="flow-node flex items-center gap-2 px-3 py-1.5 bg-[#fafafa] border border-black/10 rounded-[2px]">
                  <span className="w-4 h-4 flex items-center justify-center rounded-full bg-black text-white text-[10px] font-mono">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-medium text-[#111111]">{step}</span>
                </div>
                {idx < siteConfig.teacherEmpowerment.flow.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-black/30 shrink-0 hidden sm:block" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* On-Screen Guardrails */}
          <div className="mt-3 pt-3 border-t border-black/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-[#c8a45d] font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Guardrails:</span>
            </div>
            {siteConfig.teacherEmpowerment.guardrails.map((gd) => (
              <div key={gd} className="flex items-center gap-1.5 text-xs text-[#111111]">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{gd}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ChapterShell>
  );
};
