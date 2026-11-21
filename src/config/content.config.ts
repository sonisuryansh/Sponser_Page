/**
 * MedhaArc Labs - Content Configuration
 * Single source of truth for all copy, [confirm] placeholders, and layout toggles.
 *
 * HARD CONTENT RULES:
 * - No invented numbers or percentages (no 98%, 1000+, WEEKS, Mentors, etc.)
 * - No superlatives (no "best", "only", "unique", "zero cost", "100% maintained")
 * - No computer specs (no PC specs)
 * - No "Recommended" tag and no "Select tier" buttons
 * - Plain school English (no unexplained technical jargon)
 * - Name is MedhaArc Labs everywhere. Tagline: "From Curiosity to Engineering and Innovation."
 * - Footer: "MedhaArc Labs | X Private Limited"
 */

export interface DomainItem {
  id: string;
  name: string;
  shortLine: string;
  iconType: 'robotics' | 'ai' | 'data' | 'aerial';
  movingIcons: string[];
  processFlow: string[];
  whatStudentsDo: string[];
  image: string;
  specialNote?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  grade: string;
  domain: string;
  summary: string;
  image: string;
  isRealWork: boolean; // if false, displays "Sample project"
}

export interface CurriculumStage {
  id: string;
  gradeLabel: string;
  title: string;
  focus: string;
  chips: string[];
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  cadence: string;
  summary: string;
  features: string[];
}

export const siteConfig = {
  // Brand
  brandName: 'MedhaArc Labs',
  legalEntity: 'X Private Limited',
  tagline: 'From Curiosity to Engineering and Innovation.',
  heroSubline: 'A school-focused technology learning initiative',

  // Config Toggles
  swapRequirementsAndPricing: false, // Set to true to show Pricing before Requirements
  showBeyondGrade10: false, // Hidden by default; when true shows Grades 11-12 in curriculum

  // [confirm] flags and placeholders
  confirm: {
    reviewFrequency: '[confirm] curriculum review schedule (e.g. annual)',
    showcaseVenue: '[confirm] project showcase venue and format',
    has3DPrinter: false, // [confirm] set to true only when school confirms 3D printer
    labRoomSize: '', // [confirm] set when school confirms square footage; blank hides it
    lmsReady: false, // If false, shows "Resources are being developed grade by grade" & "Preview" badge
    certificatesOffered: true, // [confirm] formal recognition for completed levels
    competitionsOffered: true, // [confirm] opportunities to participate in national/regional competitions
    pricingFootnoteExtra: '', // [confirm] any school-specific duration or terms
    contactEmail: 'team@medhaarc.com',
    contactPhone: '+91 98765 43210',
    contactLink: '#contact',
  },

  // 14 Sections across 5 Acts
  acts: [
    {
      actNumber: '01',
      actTitle: 'Who We Are',
      sections: [
        { id: 'home', number: '01', title: 'Home', theme: 'dark' as const },
        { id: 'about', number: '02', title: 'About', theme: 'light' as const },
        { id: 'mission', number: '03', title: 'Our Mission', theme: 'light' as const },
      ],
    },
    {
      actNumber: '02',
      actTitle: 'What Students Learn',
      sections: [
        { id: 'domains', number: '04', title: 'Technology Domains', theme: 'dark' as const },
        { id: 'approach', number: '05', title: 'Learning Approach', theme: 'light' as const },
        { id: 'curriculum', number: '06', title: 'Curriculum', theme: 'light' as const },
        { id: 'showcase', number: '07', title: 'Student Projects', theme: 'light' as const },
      ],
    },
    {
      actNumber: '03',
      actTitle: 'How It Runs',
      sections: [
        { id: 'lab-setup', number: '08', title: 'STEM Lab Setup', theme: 'dark' as const },
        { id: 'resources', number: '09', title: 'LMS & Resources', theme: 'light' as const },
        { id: 'teacher-empowerment', number: '10', title: 'Teacher Empowerment', theme: 'light' as const },
      ],
    },
    {
      actNumber: '04',
      actTitle: 'What Students Gain',
      sections: [
        { id: 'benefits', number: '11', title: 'Student & School Benefits', theme: 'light' as const },
      ],
    },
    {
      actNumber: '05',
      actTitle: 'Terms & Next Step',
      sections: [
        { id: 'requirements', number: '12', title: 'Requirements & Delivery', theme: 'light' as const },
        { id: 'pricing', number: '13', title: 'Pricing Packages', theme: 'light' as const },
        { id: 'closing', number: '14', title: 'Partnership', theme: 'dark' as const },
      ],
    },
  ],

  // Act 1: 01 Home
  hero: {
    title: 'MedhaArc Labs',
    subline: 'A school-focused technology learning initiative',
    tagline: 'From Curiosity to Engineering and Innovation.',
    domains: [
      'Robotics & Automation',
      'AI & Machine Learning',
      'Data Analytics',
      'Aerial Systems',
    ],
    backgroundImage: '/assets/medhaarc_hero_drone.webp',
  },

  // Act 1: 02 About
  about: {
    eyebrow: 'Our Foundation',
    headline: 'Three guiding principles behind every learning session.',
    panels: [
      {
        title: 'Our Aim',
        description: 'To make technology understandable through practical, age-appropriate learning.',
      },
      {
        title: 'Our Vision',
        description: 'To help students become confident problem-solvers, creators, and responsible users of technology.',
      },
      {
        title: 'Our Focus',
        description: 'Move beyond simply using technology to understanding, designing, testing, and applying it.',
        highlightWords: ['Understand', 'Design', 'Test', 'Apply'],
      },
    ],
  },

  // Act 1: 03 Mission
  mission: {
    eyebrow: 'Guiding Purpose',
    statement: 'Deliver structured, practical technology education that connects concepts with real applications.',
    values: [
      {
        name: 'Hands-on Learning',
        description: 'Learn by doing.',
        icon: 'Hammer',
      },
      {
        name: 'Problem-Solving',
        description: 'Understand a challenge and test possible solutions.',
        icon: 'Compass',
      },
      {
        name: 'Creativity & Innovation',
        description: 'Turn ideas into designs and prototypes.',
        icon: 'Sparkles',
      },
      {
        name: 'Responsible Technology',
        description: 'Consider safety, ethics, and appropriate use.',
        icon: 'ShieldCheck',
      },
      {
        name: 'Continuous Learning',
        description: 'Experiment, reflect, and improve.',
        icon: 'RefreshCw',
      },
    ],
  },

  // Act 2: 04 Technology Domains
  domainsSection: {
    eyebrow: 'Specialisations',
    headline: 'Four connected domains, one mathematical foundation.',
    domains: [
      {
        id: 'robotics',
        name: 'Robotics & Automation',
        shortLine: 'Electronics, sensors, control, coding, and mechanical systems.',
        iconType: 'robotics',
        movingIcons: ['Gear', 'Sensor', 'RobotArm'],
        processFlow: ['DESIGN', 'BUILD', 'CODE', 'TEST', 'IMPROVE'],
        whatStudentsDo: [
          'Design circuits and assemble physical mechanical assemblies with real electronic components.',
          'Program microcontrollers to read environmental sensors and actuate motors reliably.',
          'Test mechanical stability, diagnose wiring faults, and iterate on functional prototypes.',
        ],
        image: '/assets/students_robotics.webp',
      },
      {
        id: 'aiml',
        name: 'AI & Machine Learning',
        shortLine: 'Intelligent systems, model concepts, and responsible AI use.',
        iconType: 'ai',
        movingIcons: ['Network', 'Cpu', 'Shield'],
        processFlow: ['UNDERSTAND', 'EXPLORE', 'APPLY', 'BUILD'],
        whatStudentsDo: [
          'Explore how intelligent systems perceive visual data, audio, and patterns.',
          'Train simple supervised models using student-collected sample datasets.',
          'Examine fairness, privacy, and ethics in automated decision-making systems.',
        ],
        image: '/assets/laptop_analytics.webp',
      },
      {
        id: 'data',
        name: 'Data Analytics',
        shortLine: 'Working with data, finding patterns, and sharing insights.',
        iconType: 'data',
        movingIcons: ['BarChart3', 'Scatter', 'Search'],
        processFlow: ['DATA', 'ANALYSIS', 'VISUALISATION', 'INSIGHTS'],
        whatStudentsDo: [
          'Gather and clean raw data from school projects, sensors, and everyday observations.',
          'Identify statistical trends, averages, and noticeable anomalies with tabular tools.',
          'Create clear visual representations that communicate evidence and findings to others.',
        ],
        image: '/assets/page_10.webp',
      },
      {
        id: 'aerial',
        name: 'Aerial Systems',
        shortLine: 'Aerial platforms, flight basics, sensing, and applications.',
        iconType: 'aerial',
        movingIcons: ['Plane', 'Target', 'Compass'],
        processFlow: ['PLATFORM', 'SENSORS', 'CONTROL', 'DATA', 'APPLICATIONS'],
        whatStudentsDo: [
          'Examine aerodynamics, thrust, stability, and flight control principles in aerial systems.',
          'Practice indoor control training: flying through hoops and around low and high obstacles, with safety first.',
          'Collect aerial telemetry data and explore how autonomous navigation operates responsibly.',
        ],
        image: '/assets/drone_flight.webp',
        specialNote: 'Indoor control training: flying through hoops and around low and high obstacles, with safety first.',
      },
    ] as DomainItem[],
    mathFoundation: {
      title: 'Math & Computational Foundations',
      description: 'Logic, measurement, geometry, data reasoning, algorithms, and problem-solving that support all four.',
      symbols: ['∑', '📐', '📈', 'λ'],
    },
  },

  // Act 2: 05 Learning Approach
  approach: {
    eyebrow: 'Pedagogy',
    headline: 'Technology is more meaningful when students understand how it works.',
    blocks: [
      {
        title: 'Build real projects',
        description: 'Every term ends with something they made, on real hardware.',
      },
      {
        title: 'A curriculum that keeps up',
        description: 'The curriculum builds year on year and is reviewed and updated as technology changes.',
      },
      {
        title: 'Show what you built',
        description: 'From Grade 9, students present their projects to teachers, parents and peers.',
      },
    ],
    principles: [
      'Connected learning across four domains',
      'Concepts before complexity',
      'Practical-first learning',
      'Grade-wise progression',
      'Mathematical foundations in real applications',
      'Responsible innovation',
    ],
  },

  // Act 2: 06 Curriculum
  curriculum: {
    eyebrow: 'Grade-wise Roadmap',
    headline: 'A structured progression tailored for every stage of cognitive development.',
    subnote: 'Proposed roadmap, finalised with each school.',
    stages: [
      {
        id: 'grade-4',
        gradeLabel: 'Grade 4',
        title: 'Digital Creation & Logic',
        focus: 'Digital creation, visual/block-based coding, logic, and foundational design',
        chips: ['Block Coding', 'Logic & Sequences', 'Foundational Design'],
      },
      {
        id: 'grade-5-6',
        gradeLabel: 'Grades 5 to 6',
        title: 'Introductory Electronics & Construction',
        focus: 'Block coding, logic, digital creation, and introductory electronics and design',
        chips: ['Physical Computing', 'Sensory Feedback', 'Visual Programming'],
      },
      {
        id: 'grade-7',
        gradeLabel: 'Grade 7',
        title: 'Python Foundations',
        focus: 'Python foundations and introductory programming projects',
        chips: ['Syntax & Flow', 'Variables & Loops', 'Mini Projects'],
      },
      {
        id: 'grade-8',
        gradeLabel: 'Grade 8',
        title: 'Python Development & Electronics',
        focus: 'Python development, problem-solving, electronics, and suitable data structures',
        chips: ['Data Structures', 'Microcontroller Logic', 'System Problem-Solving'],
      },
      {
        id: 'grade-9',
        gradeLabel: 'Grade 9',
        title: 'Advanced Programming & Systems',
        focus: 'Advanced programming foundations, electronics/IoT, and systems thinking',
        chips: ['Connected Sensors', 'Systems Thinking', 'Annual Project Showcase'],
      },
      {
        id: 'grade-10',
        gradeLabel: 'Grade 10',
        title: 'Data Analytics & Capstone Builds',
        focus: 'Data Analytics using suitable tools and project-based analysis',
        chips: ['Data Analysis', 'Hypothesis Testing', 'Capstone Portfolio'],
      },
    ] as CurriculumStage[],
    beyondGrade10: [
      {
        id: 'grade-11',
        gradeLabel: 'Grade 11',
        title: 'Statistical Modeling & Machine Learning',
        focus: 'Statistics foundations, Machine Learning concepts and model training',
        chips: ['Model Architecture', 'Statistical Inference', 'Applied Exploration'],
      },
      {
        id: 'grade-12',
        gradeLabel: 'Grade 12',
        title: 'Integrated AI & Autonomous Systems',
        focus: 'AI/ML integrated with Robotics, spatial intelligence, and senior capstones',
        chips: ['Vision Models', 'Integrated Robotics', 'Senior Portfolio'],
      },
    ] as CurriculumStage[],
  },

  // Act 2: 07 Student Projects Showcase
  showcase: {
    eyebrow: 'Student Projects Showcase',
    headline: "Preparing students for tomorrow's innovations.",
    subline: 'What our students build.',
    badge: 'Showcases begin at Grade 9',
    projects: [
      {
        id: 'proj-1',
        name: 'Autonomous Obstacle Rover',
        grade: 'Grade 8',
        domain: 'Robotics & Automation',
        summary: 'Ultrasonic distance-sensing vehicle with obstacle avoidance logic and motor driver calibration.',
        image: '/assets/blueprint_rover_desk.webp',
        isRealWork: true,
      },
      {
        id: 'proj-2',
        name: 'Environmental Sensor Station',
        grade: 'Grade 7',
        domain: 'Data Analytics',
        summary: 'Classroom temperature and air quality monitoring station with visual telemetry chart outputs.',
        image: '/assets/page_13.webp',
        isRealWork: true,
      },
      {
        id: 'proj-3',
        name: 'Hoop Navigation Flight Rig',
        grade: 'Grade 9',
        domain: 'Aerial Systems',
        summary: 'Guarded quadcopter maneuvering system demonstrating roll, pitch, and yaw stability during indoor obstacle flight.',
        image: '/assets/drone_flight.webp',
        isRealWork: true,
      },
      {
        id: 'proj-4',
        name: 'Visual Pattern Classifier',
        grade: 'Grade 10',
        domain: 'AI & Machine Learning',
        summary: 'Computer-vision based item sorting model distinguishing recyclable classroom materials.',
        image: '/assets/page_10.webp',
        isRealWork: true,
      },
      {
        id: 'proj-5',
        name: 'Multi-Axis Articulated Arm',
        grade: 'Grade 9',
        domain: 'Robotics & Automation',
        summary: 'Three-servo tabletop robotic arm programmed to pick and sort small geometric components.',
        image: '/assets/robotics_arm_showcase.webp',
        isRealWork: true,
      },
    ] as ProjectItem[],
    futureReadiness: {
      eyebrow: "Beyond today's technology: preparing students for tomorrow's innovations.",
      technologies: [
        { name: 'Physical AI', desc: 'AI connected with physical systems' },
        { name: 'Generative AI', desc: 'AI that creates text, images, or other content' },
        { name: 'AI Agents', desc: 'AI systems that perform defined tasks' },
        { name: 'Digital Twins', desc: 'Virtual representations of physical objects or systems' },
        { name: 'Edge AI', desc: 'AI processing on or near a device' },
        { name: 'Smart IoT', desc: 'Connected devices that collect and exchange data' },
        { name: 'AR/VR', desc: 'Augmented and virtual reality experiences' },
        { name: 'Drones & Autonomous Systems', desc: 'Aerial platforms and systems that can perform defined tasks with varying levels of autonomy' },
      ],
      flowSteps: ['Explore', 'Experiment', 'Apply', 'Build'],
    },
  },

  // Act 3: 08 STEM Lab Setup
  labSetup: {
    eyebrow: 'Lab Architecture',
    headline: 'A lab built for making things.',
    paragraph: 'Everything students need to build, test and improve, set up in a dedicated space in your school.',
    zones: [
      {
        id: 'zone-build',
        name: 'Build bench',
        description: 'Wiring, assembly and testing of robots and circuits.',
      },
      {
        id: 'zone-computer',
        name: 'Computer area',
        description: 'Coding, simulation and learning-platform work; computers arranged by the school.',
      },
      {
        id: 'zone-drone',
        name: 'Drone control zone',
        description: 'Indoor training with hoops and obstacles, behind a marked safety line.',
      },
      {
        id: 'zone-storage',
        name: 'Kit storage',
        description: 'Shared kits stay in the lab between sessions.',
      },
    ],
    resourceLists: [
      {
        title: 'Hardware and kits',
        items: [
          'Robotics kits and prototyping components',
          'Electronic sensors and motor modules',
          'Small guarded training drones',
          'Hoops and obstacle flight set',
        ],
      },
      {
        title: 'Tools and software',
        items: [
          'Basic hand tools and workshop safety items',
          'Programming and circuit simulation software',
          'School learning platform access credentials',
        ],
      },
      {
        title: 'Space and infrastructure',
        items: [
          'Dedicated school lab room space',
          'Work tables and grounded power points',
          'Secure kit storage cabinets',
          'Marked indoor drone practice area',
        ],
      },
    ],
    labImage: '/assets/page_06.webp',
  },

  // Act 3: 09 LMS & Resources
  resources: {
    eyebrow: 'Continuous Learning',
    headline: 'LMS & Learning Resources',
    paragraph: 'Learning that continues after the session.',
    statusNotice: 'Resources are being developed grade by grade.',
    tiles: [
      {
        title: 'Books',
        description: 'Grade-wise workbooks that guide each activity.',
        tag: 'Workbook',
      },
      {
        title: 'Modules',
        description: 'Short, structured modules for each topic, in a set order.',
        tag: 'Structured',
      },
      {
        title: 'Quizzes',
        description: 'Quick checks so students and teachers can see what has landed.',
        tag: 'Assessment',
      },
      {
        title: 'Videos',
        description: 'Short explainers and demonstrations to revisit in class or at home.',
        tag: 'Media',
      },
    ],
    previewImage: '/assets/page_12.webp',
  },

  // Act 3: 10 Teacher Empowerment
  teacherEmpowerment: {
    eyebrow: 'Educator Support',
    headline: 'Teacher Empowerment',
    message: 'Teachers stay in charge and gain time.',
    columns: [
      {
        title: 'Train',
        description: 'Teacher training on how sessions run and how to support students.',
      },
      {
        title: 'Guide',
        description: 'Activity guides, session plans and safety notes for every grade.',
      },
      {
        title: 'Assist',
        badge: 'Our vision',
        description: 'Our vision: AI tools that help teachers prepare and organise their work.',
      },
    ],
    flow: [
      'Teacher sets the task',
      'AI drafts',
      'Teacher reviews and edits',
      'Class uses it',
    ],
    examples: [
      'Draft lesson plans and quizzes for review',
      'Summarise activity notes into progress updates',
      'Routine workflow like reminders and handouts',
      'An AI agent that takes one defined task and hands it back for review',
    ],
    guardrails: [
      'The teacher decides',
      'Outputs are always checked',
      'Student personal data is not put into public AI tools',
    ],
  },

  // Act 4: 11 Student and School Benefits
  benefits: {
    eyebrow: 'Institutional Value',
    headline: 'Student and School Benefits',
    schoolLine: 'A visible, practical programme that families can see.',
    cards: [
      {
        title: 'Skills',
        description: 'Builds problem-solving, teamwork and technical confidence.',
        icon: 'Wrench',
      },
      {
        title: 'Projects',
        description: 'Students build working projects, grade by grade.',
        icon: 'Box',
      },
      {
        title: 'Certificates',
        description: 'Recognition for completed levels [confirm].',
        icon: 'Award',
      },
      {
        title: 'Competitions',
        description: 'Creates opportunities to take part in competitions [confirm].',
        icon: 'Trophy',
      },
      {
        title: 'Portfolios',
        description: "A record of each student's builds to show and grow.",
        icon: 'FolderKanban',
      },
    ],
  },

  // Act 5: 12 School Requirements & Delivery Responsibilities
  requirements: {
    eyebrow: 'Clear Partnership Boundaries',
    headline: 'School Requirements & Delivery Responsibilities',
    columns: [
      {
        title: 'School provides',
        items: [
          'Lab space',
          'Computers',
          'Tables and power points',
          'Student scheduling',
        ],
      },
      {
        title: 'MedhaArc Labs delivers',
        items: [
          'Curriculum and session plans',
          'Kits and learning materials',
          'MedhaArc Labs Instructors',
          'Teacher training and platform access',
        ],
      },
    ],
  },

  // Act 5: 13 Pricing Packages
  pricing: {
    eyebrow: 'Transparent Investment',
    headline: 'Pricing Packages',
    label: 'Proposed pricing, per student per month',
    footnote: 'Kits stay in the school lab and are shared. Final terms are agreed with each school.',
    tiers: [
      {
        id: 'foundation',
        name: 'Foundation',
        price: '₹500',
        cadence: 'per student / month',
        summary: 'Robotics and practical activities.',
        features: [
          'Hands-on Robotics kits & assemblies',
          'Structured session plans & curriculum',
          'MedhaArc Labs instructor support',
          'Core foundational design activities',
        ],
      },
      {
        id: 'professional',
        name: 'Professional',
        price: '₹600',
        cadence: 'per student / month',
        summary: 'Foundation, plus Mathematics integration.',
        features: [
          'Everything included in Foundation',
          'Mathematics & computational foundations',
          'Algorithmic problem-solving modules',
          'Teacher guidance & curriculum roadmaps',
        ],
      },
      {
        id: 'premium',
        name: 'Premium',
        price: '₹700',
        cadence: 'per student / month',
        summary: 'Professional, plus selected advanced activities and projects.',
        features: [
          'Everything included in Professional',
          'Selected advanced activities & capstones',
          'Indoor drone control training modules',
          'Annual project showcase preparation',
        ],
      },
    ] as PricingTier[],
  },

  // Act 5: 14 Closing
  closing: {
    eyebrow: 'Next Steps',
    headline: 'A Practical Technology Learning Partnership',
    line: "Let's explore how MedhaArc Labs can fit your school's learning goals.",
    domainsRow: [
      'Robotics & Automation',
      'AI & Machine Learning',
      'Data Analytics',
      'Aerial Systems',
    ],
    ctaText: 'Schedule a School Consultation',
    footerText: 'MedhaArc Labs | X Private Limited',
    websiteUrl: 'https://www.medhaarc.com/',
    socialLinks: [
      { name: 'Instagram', url: 'https://www.instagram.com/medhaarc' },
      { name: 'X', url: 'https://x.com/medhaarc' },
      { name: 'Facebook', url: 'https://www.facebook.com/people/MedhaArc/61595117606026/' },
      { name: 'LinkedIn', url: 'http://linkedin.com/company/medhaarc/' },
    ],
  },
};
