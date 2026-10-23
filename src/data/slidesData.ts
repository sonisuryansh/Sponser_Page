import type { SlideData, EcosystemDomain, GradeLevel, EmergingTech, PackageTier } from '../types';


export const SLIDES: SlideData[] = [
  {
    id: 'hero',
    number: 1,
    label: '01 / 15',
    title: 'MedhaArc Labs',
    headline: 'From curiosity to creation.',
    subtitle: 'A school-focused technology learning initiative connecting Robotics, Artificial Intelligence, Data Analytics, and Aerial Systems.',
    badge: 'Initiative Introduction',
    category: 'Overview'
  },
  {
    id: 'aim-vision',
    number: 2,
    label: '02 / 15',
    title: 'Aim & Vision',
    headline: 'Understanding technology through practical discovery.',
    subtitle: 'Moving students beyond mere consumers of devices to confident creators, thinkers, and engineers.',
    badge: 'Foundational Purpose',
    category: 'Overview'
  },
  {
    id: 'mission-values',
    number: 3,
    label: '03 / 15',
    title: 'Mission & Values',
    headline: 'Principles shaping how we teach and inspire.',
    subtitle: 'Connecting foundational concepts with hands-on practice, safety, and creative inquiry.',
    badge: 'Educational Ethos',
    category: 'Overview'
  },
  {
    id: 'ecosystem',
    number: 4,
    label: '04 / 15',
    title: 'Technology Ecosystem',
    headline: 'Four connected engineering domains.',
    subtitle: 'Grounded upon Mathematical and Computational Foundations as a unified supporting bedrock.',
    badge: 'Curricular Framework',
    category: 'Domain'
  },
  {
    id: 'robotics',
    number: 5,
    label: '05 / 15',
    title: 'Robotics & Automation',
    headline: 'Understand it. Build it. Improve it.',
    subtitle: 'Bridging physical circuits, microcontrollers, embedded logic, and precision mechanics.',
    badge: 'Domain 01',
    category: 'Domain'
  },
  {
    id: 'ai-ml',
    number: 6,
    label: '06 / 15',
    title: 'Artificial Intelligence & ML',
    headline: 'Understand intelligence. Explore responsibly.',
    subtitle: 'Demystifying machine models, algorithmic reasoning, training data, and ethical boundaries.',
    badge: 'Domain 02',
    category: 'Domain'
  },
  {
    id: 'data-analytics',
    number: 7,
    label: '07 / 15',
    title: 'Data Analytics',
    headline: 'Turn raw data into human understanding.',
    subtitle: 'Formulating hypotheses, spotting genuine patterns, and communicating insights with visual clarity.',
    badge: 'Domain 03',
    category: 'Domain'
  },
  {
    id: 'aerial-systems',
    number: 8,
    label: '08 / 15',
    title: 'Aerial Systems',
    headline: 'See systems from a new perspective.',
    subtitle: 'Flight dynamics, spatial telemetry, remote sensing, and purposeful real-world missions.',
    badge: 'Domain 04',
    category: 'Domain'
  },
  {
    id: 'learning-approach',
    number: 9,
    label: '09 / 15',
    title: 'Why MedhaArc Labs?',
    headline: 'Understanding How Technology Truly Works.',
    subtitle: 'A pedagogical approach rooted in depth, safety, conceptual clarity, and progressive mastery.',
    badge: 'Pedagogy',
    category: 'Pedagogy'
  },
  {
    id: 'grade-path',
    number: 10,
    label: '10 / 15',
    title: 'Learning Path (Grades 5–12)',
    headline: 'A structured, age-appropriate progression.',
    subtitle: 'Proposed multi-year pathway advancing from sensory block logic to full robotic-AI system integration.',
    badge: 'Proposed Progression',
    category: 'Curriculum'
  },
  {
    id: 'emerging-tech',
    number: 11,
    label: '11 / 15',
    title: 'Emerging Technologies',
    headline: 'Beyond today’s technology — preparing students for tomorrow’s innovations.',
    subtitle: 'Age-appropriate exploration of physical AI, generative models, autonomous agents, and digital twins.',
    badge: 'Future Readiness',
    category: 'Curriculum'
  },
  {
    id: 'benefits',
    number: 12,
    label: '12 / 15',
    title: 'Benefits for Schools & Students',
    headline: 'Clear educational impact for learners and institutions.',
    subtitle: 'Enriching academic rigor, student portfolios, and campus technological stature with zero operational burden.',
    badge: 'Institutional Value',
    category: 'Partnership'
  },
  {
    id: 'responsibilities',
    number: 13,
    label: '13 / 15',
    title: 'Delivery Responsibilities',
    headline: 'A balanced, transparent partnership model.',
    subtitle: 'Clear division of infrastructure and delivery commitments to ensure seamless lab operation.',
    badge: 'Operational Framework',
    category: 'Partnership'
  },
  {
    id: 'programme-model',
    number: 14,
    label: '14 / 15',
    title: 'Programme Model & Fees',
    headline: 'Accessible, scalable monthly student tiers.',
    subtitle: 'Proposed investment structures tailored to school schedules and laboratory batch sizes.',
    badge: 'Proposed Pricing',
    category: 'Partnership'
  },
  {
    id: 'partnership',
    number: 15,
    label: '15 / 15',
    title: 'The Partnership',
    headline: 'Practical learning. Connected technologies. Room to explore.',
    subtitle: 'Designed around learning goals. Grounded in practical exploration. Ready to shape your school lab.',
    badge: 'Next Steps',
    category: 'Partnership'
  }
];

export const ECOSYSTEM_DOMAINS: EcosystemDomain[] = [
  {
    id: 'robotics',
    name: 'Robotics & Automation',
    description: 'Physical computing, sensory loops, motor actuators, automated logic, and mechanical design.',
    accent: '#398BB0',
    icon: 'Bot',
    items: ['Electronics & Circuitry', 'Sensors & Controllers', 'Actuators & Mechanics', 'Automated Control Logic']
  },
  {
    id: 'ai-ml',
    name: 'Artificial Intelligence & ML',
    description: 'Demystifying machine models, pattern recognition, data training, and responsible usage.',
    accent: '#286D8B',
    icon: 'Cpu',
    items: ['Core AI Principles', 'Data & Model Training', 'Pattern Recognition', 'Ethical AI Boundaries']
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics',
    description: 'Interpreting evidence, structuring datasets, discovering trends, and visualizing insights.',
    accent: '#DBA780',
    icon: 'BarChart3',
    items: ['Data Organization', 'Pattern Discovery', 'Statistical Reasoning', 'Insight Visualization']
  },
  {
    id: 'aerial-systems',
    name: 'Aerial Systems',
    description: 'Flight physics, multi-rotor mechanics, spatial orientation, telemetry, and payload applications.',
    accent: '#203744',
    icon: 'Plane',
    items: ['Aerodynamic Principles', 'Navigation & Telemetry', 'Payload & Sensing', 'Mission Mapping']
  }
];

export const GRADE_LEVELS: GradeLevel[] = [
  {
    grade: 'Grades 5–6',
    stage: 'Foundational Discovery',
    focus: 'Visual block logic, basic sensors, and mechanical assembly.',
    outcome: 'Connecting code to physical motion with creative confidence.',
    topics: ['Block Programming Logic', 'Sensors & LED Indicators', 'Basic Mechanical Linkages', 'Algorithmic Sequencing']
  },
  {
    grade: 'Grade 7',
    stage: 'Syntax & Real Code',
    focus: 'Python programming syntax, variables, and hardware interfacing.',
    outcome: 'Transitioning from blocks to functional text-based code.',
    topics: ['Python Syntax & Variables', 'Conditional Logic & Loops', 'Microcontroller Interfacing', 'Introductory Electronics']
  },
  {
    grade: 'Grade 8',
    stage: 'Data Structures & Control',
    focus: 'Modular code, data lists, and real-time feedback loops.',
    outcome: 'Designing sensor-driven autonomous behaviors and logic.',
    topics: ['Data Lists & Dictionaries', 'Closed-loop Feedback Control', 'Motor Drivers & Speed PWM', 'System Troubleshooting']
  },
  {
    grade: 'Grade 9',
    stage: 'Systems & IoT Networks',
    focus: 'Microcontroller networks, telemetry, and 3D CAD modeling.',
    outcome: 'Building interconnected devices that sense and react remotely.',
    topics: ['Microcontroller Networks', 'Telemetry Protocols', 'CAD 3D Prototyping Basics', 'Autonomous Navigation Logic']
  },
  {
    grade: 'Grade 10',
    stage: 'Applied Data Science',
    focus: 'Exploratory data analysis, cleaning, and chart storytelling.',
    outcome: 'Extracting evidence-based conclusions from real datasets.',
    topics: ['Data Wrangling & Cleaning', 'Visual Analytics', 'Trend & Outlier Detection', 'Hypothesis Testing']
  },
  {
    grade: 'Grade 11',
    stage: 'Statistical Intelligence',
    focus: 'Statistical distributions, supervised models, and computer vision.',
    outcome: 'Understanding predictive models and classification logic.',
    topics: ['Statistical Distributions', 'Supervised Learning Concepts', 'Model Evaluation & Loss', 'Computer Vision Basics']
  },
  {
    grade: 'Grade 12',
    stage: 'Capstone Systems',
    focus: 'Integrating AI, robotics, and aerial engineering challenges.',
    outcome: 'Delivering a functional, documented engineering capstone.',
    topics: ['Autonomous Robotic Navigation', 'Edge AI Vision Pipelines', 'Multidisciplinary Capstone', 'Technical Documentation']
  }
];

export const EMERGING_TECH_LIST: EmergingTech[] = [
  {
    name: 'Physical AI',
    category: 'Embodied Systems',
    summary: 'AI embedded in physical robots to react to environments in real time.',
    schoolExample: 'Autonomous rovers making instant obstacle-avoidance judgments.'
  },
  {
    name: 'Generative AI',
    category: 'Creative Computation',
    summary: 'Models generating code, 3D structures, and synthetic data from prompts.',
    schoolExample: 'AI-assisted CAD modeling and interactive code debugging.'
  },
  {
    name: 'AI Agents',
    category: 'Autonomous Workflows',
    summary: 'Goal-driven autonomous software using planning, tools, and reflection.',
    schoolExample: 'Automated lab organizers and adaptive study assistants.'
  },
  {
    name: 'Digital Twins',
    category: 'Simulation & Modeling',
    summary: 'Virtual hardware replicas used to test kinematics before physical builds.',
    schoolExample: 'Simulating robotic arms and stress points safely on screen.'
  },
  {
    name: 'Edge AI',
    category: 'Localized Computing',
    summary: 'Lightweight neural networks running on-device without cloud dependence.',
    schoolExample: 'Micro-cameras recognizing gestures and objects in real time.'
  },
  {
    name: 'Smart IoT',
    category: 'Interconnected Sensing',
    summary: 'Distributed sensor networks tracking and streaming telemetry.',
    schoolExample: 'Campus weather monitoring and intelligent lab energy stations.'
  },
  {
    name: 'AR / VR Simulation',
    category: 'Spatial Interfaces',
    summary: 'Spatial visual interfaces rendering forces and internal mechanics in 3D.',
    schoolExample: 'Interactive 3D inspection of drone flight dynamics and circuitry.'
  }
];

export const PRICING_TIERS: PackageTier[] = [
  {
    name: 'Basic',
    price: '₹500',
    period: 'per student / month',
    status: 'Proposed Model',
    description: 'Hands-on practical robotics and structured hardware learning activities.',
    inclusions: [
      'Robotics & Automation core curriculum',
      'Hands-on laboratory sessions',
      'Shared robotics kits in school lab',
      'Trained instructor delivery as agreed',
      'End-of-term student project showcases'
    ]
  },
  {
    name: 'Standard',
    price: '₹600',
    period: 'per student / month',
    status: 'Proposed Model',
    recommended: true,
    description: 'Robotics coupled with Mathematical & Computational Foundations integration.',
    inclusions: [
      'All Basic package deliverables',
      'Mathematical & Computational integration',
      'Data reasoning & logic bridge modules',
      'Intermediate coding & microcontroller labs',
      'Comprehensive student progress records'
    ]
  },
  {
    name: 'Premium',
    price: '₹700',
    period: 'per student / month',
    status: 'Proposed Model',
    description: 'Advanced multi-domain immersion including AI, Data Analytics, and project mentorship.',
    inclusions: [
      'All Standard package deliverables',
      'AI & Machine Learning conceptual labs',
      'Selected Aerial Systems demonstrations',
      'Advanced capstone project mentorship',
      'Inter-school exhibition & portfolio support'
    ]
  }
];
