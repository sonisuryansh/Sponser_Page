import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  UserCheck,
  Building,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Wrench,
  Users,
} from 'lucide-react';
import { LineReveal } from '../components/motion/LineReveal';

gsap.registerPlugin(ScrollTrigger);

export const BenefitsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const media = gsap.matchMedia();
    media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        ScrollTrigger.create({
          id: 'benefits-hold-before-responsibilities',
          trigger: section,
          start: 'top top',
          end: '+=100%',
          pin: section,
          pinSpacing: false,
          anticipatePin: 1,
        });

        gsap.fromTo(
          section,
          { scale: 0.9, transformOrigin: '50% 50%' },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              id: 'benefits-zoom-in-after-emerging-tech',
              trigger: section,
              start: 'top bottom',
              end: 'top top',
              scrub: true,
            },
          }
        );
      }, section);

      return () => context.revert();
    });

    return () => media.revert();
  }, []);

  return (
    <section
      id="slide-12"
      data-slide-index="11"
      ref={sectionRef}
      className="w-full relative z-10 lg:z-20 py-10 sm:py-12 lg:py-14 lg:h-screen lg:max-h-screen lg:flex lg:flex-col lg:justify-center lg:overflow-hidden px-4 sm:px-8 lg:px-12 xl:px-16 border-b border-[#203744]/10 bg-[#DFE6E7] tech-subtle-grid"
    >
      <div className="max-w-[1560px] 2xl:max-w-[1680px] mx-auto w-full lg:my-auto">
        
        {/* Clean Header Row */}
        <div className="pb-2.5 mb-3 sm:mb-4 border-b border-[#203744]/10 text-center">
          <h2 className="font-serif-editorial text-2xl sm:text-3xl lg:text-[34px] xl:text-[36px] font-normal text-[#203744] tracking-tight leading-tight">
            Benefits for Schools &amp;{' '}
            <span className="text-[#286D8B] font-bold italic">Students</span>
          </h2>
          <p className="font-sans-modern text-xs sm:text-sm text-[#203744]/80 mt-1 mx-auto max-w-2xl font-normal leading-relaxed">
            Translating laboratory capabilities into educational growth, student confidence, and campus distinction.
          </p>
        </div>

        <LineReveal color="#286D8B" height={1.5} className="mb-4 sm:mb-5" />

        {/* Main Balanced Grid: Left Benefits (Student + School) | Right Clean Lab Facility Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch">
          
          {/* Left Column (6 cols): Student Learning & School Value Cards */}
          <div className="lg:col-span-6 flex flex-col gap-3.5">
            
            {/* Card 1: Student Learning */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[#203744]/12 shadow-sm flex flex-col justify-between flex-1">
              <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#203744]/10">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-lg bg-[#398BB0]/10 text-[#398BB0]">
                    <UserCheck className="w-4 h-4 text-[#398BB0]" />
                  </div>
                  <h3 className="font-serif-editorial text-base sm:text-lg font-bold text-[#203744]">
                    Student Learning &amp; Growth
                  </h3>
                </div>
                <span className="font-mono-tech text-[10px] sm:text-[11px] text-[#398BB0] font-bold bg-[#398BB0]/10 px-2.5 py-0.5 rounded">
                  Learner Impact
                </span>
              </div>

              {/* Clean borderless items - no grey boxes inside white cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {[
                  {
                    title: 'Practical Application',
                    desc: 'Bridging theory to tangible circuits, hardware components, and code.',
                  },
                  {
                    title: 'Problem-Solving',
                    desc: 'Algorithmic thinking, debugging, and creative persistence through building.',
                  },
                  {
                    title: 'Showcase Portfolios',
                    desc: 'Exhibition prototypes, working models, and verified credentials.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex flex-col">
                    <div className="flex items-center gap-1.5 mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#286D8B] shrink-0" />
                      <h4 className="font-serif-editorial text-[13px] font-bold text-[#203744]">
                        {item.title}
                      </h4>
                    </div>
                    <p className="font-sans-modern text-xs text-[#203744]/75 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: School & Institutional Distinction */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[#286D8B]/25 shadow-sm flex flex-col justify-between flex-1">
              <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#203744]/10">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-lg bg-[#286D8B]/10 text-[#286D8B]">
                    <Building className="w-4 h-4 text-[#286D8B]" />
                  </div>
                  <h3 className="font-serif-editorial text-base sm:text-lg font-bold text-[#203744]">
                    School &amp; Institutional Distinction
                  </h3>
                </div>
                <span className="font-mono-tech text-[10px] sm:text-[11px] text-[#286D8B] font-bold bg-[#286D8B]/10 px-2.5 py-0.5 rounded">
                  Campus Stature
                </span>
              </div>

              {/* Clean borderless items - no grey boxes inside white cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                {[
                  {
                    title: 'Structured Cross-Grade Curriculum',
                    desc: 'Progressive Middle-to-High school engineering roadmap without ad-hoc workshops.',
                  },
                  {
                    title: 'Future-Ready Campus Stature',
                    desc: 'Positioning your campus at the forefront of practical technology and robotics education.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#286D8B] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-serif-editorial text-[13px] font-bold text-[#203744] leading-tight">
                        {item.title}
                      </h4>
                      <p className="font-sans-modern text-xs text-[#203744]/75 leading-relaxed mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (6 cols): Clean Authentic Turnkey Campus Facility Showcase */}
          <div className="lg:col-span-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[#203744]/15 shadow-sm flex flex-col justify-between">
            
            <div className="flex flex-col flex-1 justify-between">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#203744]/10">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-lg bg-[#203744] text-white">
                    <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
                  </div>
                  <div>
                    <h3 className="font-serif-editorial text-base sm:text-lg font-bold text-[#203744]">
                      School Innovation &amp; Hardware Facility
                    </h3>
                    <p className="font-sans-modern text-[11px] text-[#203744]/65 leading-snug">
                      Fully equipped turnkey experiential engineering environment
                    </p>
                  </div>
                </div>
                <span className="font-mono-tech text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full bg-[#34d399]/15 text-[#065f46] border border-[#34d399]/30 font-bold shrink-0">
                  Turnkey Deployed
                </span>
              </div>

              {/* Lab Photo Showcase */}
              <div className="relative rounded-xl overflow-hidden border border-[#203744]/15 shadow-xs mb-3 group h-36 sm:h-40 lg:h-44 xl:h-48 w-full bg-[#0d1721]">
                <img
                  src="/assets/page_14.jpg"
                  alt="School Drone & Robotics Innovation Facility"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1016]/85 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between text-white">
                  <div>
                    <div className="font-mono-tech text-[10px] uppercase font-bold text-[#38bdf8] tracking-wider mb-0.5">
                      On-Campus Engineering Bench
                    </div>
                    <p className="font-serif-editorial text-xs italic text-white/95 font-light leading-snug">
                      Drone assembly stations, embedded kits &amp; robotics testing workbenches
                    </p>
                  </div>
                </div>
              </div>

              {/* 3 Authentic Operational Pillars: clean 3 columns separated by subtle hairlines, no grey box containers */}
              <div className="grid grid-cols-3 gap-2 pt-2.5 border-t border-[#203744]/10 text-center mt-auto">
                <div className="flex flex-col items-center">
                  <Users className="w-3.5 h-3.5 text-[#286D8B] mb-1" />
                  <span className="font-serif-editorial text-xs font-bold text-[#203744]">Dedicated Mentors</span>
                  <p className="font-sans-modern text-[11px] text-[#203744]/70 mt-0.5 leading-snug">Stationed inside</p>
                </div>
                <div className="flex flex-col items-center border-x border-[#203744]/10 px-1">
                  <Wrench className="w-3.5 h-3.5 text-[#398BB0] mb-1" />
                  <span className="font-serif-editorial text-xs font-bold text-[#203744]">Zero Kit Capex</span>
                  <p className="font-sans-modern text-[11px] text-[#203744]/70 mt-0.5 leading-snug">All gear provided</p>
                </div>
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#065f46] mb-1" />
                  <span className="font-serif-editorial text-xs font-bold text-[#203744]">100% Maintained</span>
                  <p className="font-sans-modern text-[11px] text-[#203744]/70 mt-0.5 leading-snug">Ongoing upkeep</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default BenefitsSection;
