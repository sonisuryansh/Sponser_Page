import React from 'react';
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

const STUDENT_BENEFITS = [
  {
    title: 'Practical Concept Application',
    desc: 'Bridging science and math theory to tangible circuits, physical components, and working code.',
  },
  {
    title: 'Logical Problem-Solving',
    desc: 'Developing algorithmic thinking, systematic debugging, and creative persistence through building.',
  },
  {
    title: 'Multi-Domain Exposure',
    desc: 'Early hands-on contact with Robotics, Artificial Intelligence, Data, and Aerial systems.',
  },
  {
    title: 'Showcase Portfolios',
    desc: 'Demonstrable projects, exhibition prototypes, and real-world project portfolios for every student.',
  },
];

const SCHOOL_BENEFITS = [
  {
    title: 'Structured Cross-Grade Curriculum',
    desc: 'A progressive Middle-to-High school technology roadmap without disjointed workshops.',
  },
  {
    title: 'Future-Ready Campus Distinction',
    desc: 'Positioning your campus at the forefront of modern, practical engineering education.',
  },
  {
    title: 'Turnkey Delivery & Full Mentorship',
    desc: 'Complete operational support: dedicated instructors, hardware kits, workbooks, and tools.',
  },
];

export const BenefitsSection: React.FC = () => {
  return (
    <section
      id="slide-12"
      data-slide-index="11"
      className="w-full min-h-screen relative flex flex-col justify-center py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 border-b border-[#203744]/10 bg-[#DFE6E7] tech-subtle-grid"
    >
      <div className="max-w-[1560px] 2xl:max-w-[1680px] mx-auto w-full my-auto flex flex-col justify-center">
        
        {/* Clean Header Row */}
        <div className="pb-4 mb-4 border-b border-[#203744]/10">
          <h2 className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-normal text-[#203744] tracking-tight leading-tight">
            Benefits for Schools &{' '}
            <span className="text-[#286D8B] font-bold italic">Students</span>
          </h2>
          <p className="font-sans-modern text-xs sm:text-sm lg:text-[15px] text-[#203744]/80 mt-1.5 max-w-2xl font-normal leading-relaxed">
            Translating laboratory capabilities into educational growth, student confidence, and campus distinction.
          </p>
        </div>

        <LineReveal color="#286D8B" height={1.5} className="mb-6 sm:mb-8" />

        {/* Main Balanced Grid: Left Benefits (Student + School) | Right Clean Lab Facility Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column (6 cols): Student Learning & School Value Cards */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            
            {/* Card 1: Student Learning */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-[#203744]/12 shadow-sm flex flex-col justify-between interactive-card">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#203744]/10">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-[#398BB0]/10 text-[#398BB0]">
                      <UserCheck className="w-4 h-4 text-[#398BB0]" />
                    </div>
                    <span className="font-serif-editorial text-base sm:text-lg font-bold text-[#203744]">
                      Student Learning & Growth
                    </span>
                  </div>
                  <span className="font-mono-tech text-[10.5px] text-[#398BB0] font-bold bg-[#398BB0]/10 px-2.5 py-1 rounded">
                    Learner Impact
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {STUDENT_BENEFITS.map((item) => (
                    <div key={item.title} className="p-3 rounded-xl bg-[#DFE6E7]/30 border border-[#203744]/8">
                      <div className="flex items-center gap-1.5 mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#398BB0] shrink-0" />
                        <h4 className="font-serif-editorial text-xs sm:text-[13.5px] font-bold text-[#203744]">
                          {item.title}
                        </h4>
                      </div>
                      <p className="font-sans-modern text-[11.5px] text-[#203744]/75 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2: School & Management Value */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-[#286D8B]/30 shadow-sm flex flex-col justify-between interactive-card">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#203744]/10">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-[#286D8B]/10 text-[#286D8B]">
                      <Building className="w-4 h-4 text-[#286D8B]" />
                    </div>
                    <span className="font-serif-editorial text-base sm:text-lg font-bold text-[#203744]">
                      School & Institutional Distinction
                    </span>
                  </div>
                  <span className="font-mono-tech text-[10.5px] text-[#286D8B] font-bold bg-[#286D8B]/10 px-2.5 py-1 rounded">
                    Campus Stature
                  </span>
                </div>

                <div className="space-y-2.5">
                  {SCHOOL_BENEFITS.map((item) => (
                    <div key={item.title} className="flex items-start gap-2.5 p-2 rounded-xl bg-[#DFE6E7]/25 border border-[#203744]/6">
                      <CheckCircle2 className="w-4 h-4 text-[#286D8B] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-serif-editorial text-xs sm:text-[13.5px] font-bold text-[#203744] leading-snug">
                          {item.title}
                        </h4>
                        <p className="font-sans-modern text-[11.5px] text-[#203744]/75 leading-relaxed mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (6 cols): Clean Authentic Turnkey Campus Facility Showcase */}
          <div className="lg:col-span-6 bg-white/95 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-[#203744]/15 shadow-md flex flex-col justify-between interactive-card">
            
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#203744]/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#203744] text-white">
                    <Sparkles className="w-4 h-4 text-[#38bdf8]" />
                  </div>
                  <div>
                    <h3 className="font-serif-editorial text-base sm:text-lg font-bold text-[#203744]">
                      School Innovation & Hardware Facility
                    </h3>
                    <p className="font-sans-modern text-[11px] sm:text-xs text-[#203744]/65">
                      Fully equipped turnkey experiential engineering environment
                    </p>
                  </div>
                </div>
                <span className="font-mono-tech text-[10px] px-2.5 py-1 rounded-full bg-[#34d399]/15 text-[#065f46] border border-[#34d399]/30 font-bold shrink-0">
                  Turnkey Deployed
                </span>
              </div>

              {/* Lab Photo Showcase */}
              <div className="relative rounded-xl overflow-hidden border border-[#203744]/20 shadow-md mb-4 group h-56 sm:h-64 lg:h-72 w-full bg-[#0d1721]">
                <img
                  src="/assets/page_14.jpg"
                  alt="School Drone & Robotics Innovation Facility"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1016]/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <div className="font-mono-tech text-[10.5px] uppercase font-bold text-[#38bdf8] tracking-wider mb-0.5">
                      On-Campus Engineering Bench
                    </div>
                    <p className="font-serif-editorial text-xs sm:text-sm italic text-white/95 font-light leading-tight">
                      Drone assembly stations, embedded kits & robotics testing workbenches
                    </p>
                  </div>
                </div>
              </div>

              {/* 3 Authentic Operational Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="p-3 rounded-xl bg-[#DFE6E7]/35 border border-[#203744]/10 text-center flex flex-col items-center">
                  <Users className="w-4 h-4 text-[#286D8B] mb-1.5" />
                  <span className="font-serif-editorial text-xs font-bold text-[#203744]">Dedicated Mentors</span>
                  <p className="font-sans-modern text-[10.5px] text-[#203744]/70 mt-0.5 leading-snug">Full-time instructors inside the lab</p>
                </div>
                <div className="p-3 rounded-xl bg-[#DFE6E7]/35 border border-[#203744]/10 text-center flex flex-col items-center">
                  <Wrench className="w-4 h-4 text-[#398BB0] mb-1.5" />
                  <span className="font-serif-editorial text-xs font-bold text-[#203744]">Zero Kit Capex</span>
                  <p className="font-sans-modern text-[10.5px] text-[#203744]/70 mt-0.5 leading-snug">All equipment & spares included</p>
                </div>
                <div className="p-3 rounded-xl bg-[#DFE6E7]/35 border border-[#203744]/10 text-center flex flex-col items-center">
                  <ShieldCheck className="w-4 h-4 text-[#065f46] mb-1.5" />
                  <span className="font-serif-editorial text-xs font-bold text-[#203744]">100% Maintained</span>
                  <p className="font-sans-modern text-[10.5px] text-[#203744]/70 mt-0.5 leading-snug">Ongoing component upkeep</p>
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
