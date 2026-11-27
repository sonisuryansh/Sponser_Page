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
 * - Footer: "MedhaArc Labs | MedhaArc Private Limited"
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
  outcome?: string;
  termProject?: string;
  termProjectDesc?: string;
  termProjectHighlights?: string[];
  termProjectDeliverable?: string;
  hardwarePlatform?: string;
  hardwarePlatformDesc?: string;
  hardwarePlatformTools?: string[];
  hardwareSafety?: string;
  hardwareEnvironment?: string;
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
  legalEntity: 'MedhaArc Private Limited',
  tagline: 'From Curiosity to Engineering and Innovation.',
  heroSubline: 'A school-focused technology learning initiative',

  // Config Toggles
  swapRequirementsAndPricing: true,
  showBeyondGrade10: true,

  // [confirm] flags and placeholders
  confirm: {
    reviewFrequency: 'annual',
    showcaseVenue: '[confirm] project showcase venue and format',
    has3DPrinter: true,
    labRoomSize: '', // [confirm] set when school confirms square footage; blank hides it
    lmsReady: false, // If false, shows "Resources are being developed grade by grade" & "Preview" badge
    certificatesOffered: true, // [confirm] formal recognition for completed levels
    competitionsOffered: false,
    pricingFootnoteExtra: '', // [confirm] any school-specific duration or terms
    contactEmail: 'teams@medhaarc.com',
    contactPhone: '+91 98765 43210',
    contactLink: '#contact',
  },

  // 15 Sections across 5 Acts
  acts: [
    {
      actNumber: '01',
      actTitle: 'Who We Are',
      sections: [
        { id: 'home', number: '01', title: 'Home', subtitle: 'Overview & Vision', theme: 'dark' as const },
        { id: 'about', number: '02', title: 'Our Aim, Vision & Focus', subtitle: 'Making Technology Understandable', theme: 'light' as const },
        { id: 'mission', number: '03', title: 'Our Mission', subtitle: 'Practical Education & Five Values', theme: 'light' as const },
      ],
    },
    {
      actNumber: '02',
      actTitle: 'What Students Learn',
      sections: [
        { id: 'domains', number: '04', title: 'Our Technology Domains', subtitle: 'Four Connected Domains', theme: 'dark' as const },
        { id: 'approach', number: '05', title: 'Our Learning Approach', subtitle: 'Practical Learning', theme: 'light' as const },
        { id: 'curriculum', number: '06', title: 'Grade-wise Curriculum', subtitle: 'Grades 3–12', theme: 'light' as const },
        { id: 'showcase', number: '07', title: 'Student Projects Showcase', subtitle: 'What Students Build', theme: 'light' as const },
      ],
    },
    {
      actNumber: '03',
      actTitle: 'How It Runs',
      sections: [
        { id: 'lab-setup', number: '08', title: 'STEM Lab Setup', subtitle: 'A Lab Built for Making Things', theme: 'dark' as const },
        { id: 'resources', number: '09', title: 'LMS & Learning Resources', subtitle: 'Learning Beyond the Session', theme: 'light' as const },
        { id: 'teacher-empowerment', number: '10', title: 'Teacher Empowerment', subtitle: 'AI Upskilling Workshops', theme: 'light' as const },
      ],
    },
    {
      actNumber: '04',
      actTitle: 'What Students Gain',
      sections: [
        { id: 'benefits', number: '11', title: 'Student and School Benefits', subtitle: 'Skills, Projects & Portfolios', theme: 'light' as const },
      ],
    },
    {
      actNumber: '05',
      actTitle: 'Terms & Next Step',
      sections: [
        { id: 'requirements', number: '13', title: 'School Requirements & Delivery Responsibilities', subtitle: 'A Shared Effort', theme: 'light' as const },
        { id: 'pricing', number: '12', title: 'Pricing Packages', subtitle: 'Proposed Pricing', theme: 'light' as const },
        { id: 'closing', number: '14', title: 'A Practical Technology Learning Partnership', subtitle: 'Next Steps', theme: 'dark' as const },
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
    headline: 'Our Aim, Our Vision & Our Focus',
    subheadline: 'Demystifying technology through hands-on physical computing, structured intuition, and an iterative 4-stage engineering cycle.',
    panels: [
      {
        id: 'aim',
        title: 'Our Aim',
        badge: 'Core Foundation',
        headline: 'Demystifying Technology from Grade 3',
        description: 'Making technology transparent and understandable through tangible hardware, intuitive physical computing, and structured age-appropriate learning.',
        points: [
          'Physical breadboard circuits & sensors — no hidden black boxes',
          'Concept intuition before abstract mathematics and code syntax',
        ],
      },
      {
        id: 'vision',
        title: 'Our Vision',
        badge: 'Strategic Impact',
        headline: 'Confident Builders & Real-World Solvers',
        description: 'Transforming passive screen consumers into active creators, critical thinkers, and responsible innovators equipped with verifiable skills.',
        points: [
          'Working student-engineered prototypes defended before peers & parents',
          'Creative problem-solving agility with responsible, ethical AI awareness',
        ],
      },
      {
        id: 'focus',
        title: 'Our Focus',
        badge: 'The 4-Stage Cycle',
        headline: 'Iterative Hands-on Learning Cycle',
        description: 'A structured journey moving students from curiosity to working physical hardware solutions:',
        stages: [
          { num: '01', name: 'Understand', desc: 'Circuits & Intuition' },
          { num: '02', name: 'Design', desc: 'CAD & Schematics' },
          { num: '03', name: 'Test', desc: 'Signals & Debug' },
          { num: '04', name: 'Apply', desc: 'Capstone Builds' },
        ],
      },
    ],
  },

  // Act 1: 03 Mission
  mission: {
    eyebrow: 'Our Mission',
    statement: 'Deliver structured, practical technology education that connects concepts with real applications.',
    values: [
      {
        num: '01',
        name: 'Hands-on Learning',
        pillar: 'Physical Prototyping',
        description: 'Learn by building, testing, and creating with real industrial hardware and sensors.',
        bullets: ['Real circuit breadboards & wiring', 'Sensors, motors & microcontrollers'],
        tags: ['Hardware Circuits', 'Microcontrollers'],
        icon: 'Puzzle',
        numBg: 'bg-orange-50 border-orange-200',
        numColor: 'text-[#EA580C]',
        glowBg: 'bg-orange-50/70 border-orange-100',
        borderColor: 'border-slate-200/90 hover:border-orange-300',
        bottomBorder: 'border-b-[3.5px] border-b-[#EA580C]',
      },
      {
        num: '02',
        name: 'Problem-Solving',
        pillar: 'Logical Thinking',
        description: 'Deconstruct complex challenges into clear logic and structured algorithmic steps.',
        bullets: ['Algorithmic flowcharts & logic', 'Systematic root-cause debugging'],
        tags: ['Root-Cause Analysis', 'Logic Flow'],
        icon: 'Target',
        numBg: 'bg-sky-50 border-sky-200',
        numColor: 'text-[#0284C7]',
        glowBg: 'bg-sky-50/70 border-sky-100',
        borderColor: 'border-slate-200/90 hover:border-sky-300',
        bottomBorder: 'border-b-[3.5px] border-b-[#0284C7]',
      },
      {
        num: '03',
        name: 'Creativity & Innovation',
        pillar: 'Design Synthesis',
        description: 'Transform original ideas into custom 3D CAD models, schematics, and functional prototypes.',
        bullets: ['Custom 3D CAD chassis models', 'Functional engineering prototypes'],
        tags: ['Custom 3D CAD', 'Prototypes'],
        icon: 'Lightbulb',
        numBg: 'bg-purple-50 border-purple-200',
        numColor: 'text-[#9333EA]',
        glowBg: 'bg-purple-50/70 border-purple-100',
        borderColor: 'border-slate-200/90 hover:border-purple-300',
        bottomBorder: 'border-b-[3.5px] border-b-[#9333EA]',
      },
      {
        num: '04',
        name: 'Responsible Technology',
        pillar: 'Lab Safety & Ethics',
        description: 'Engineer technology grounded in strict safety compliance, user privacy, and ethical AI awareness.',
        bullets: ['Strict 230V lab safety protocols', 'Responsible AI & data privacy'],
        tags: ['Lab Safety Rules', 'Ethical AI'],
        icon: 'Leaf',
        numBg: 'bg-emerald-50 border-emerald-200',
        numColor: 'text-[#16A34A]',
        glowBg: 'bg-emerald-50/70 border-emerald-100',
        borderColor: 'border-slate-200/90 hover:border-emerald-300',
        bottomBorder: 'border-b-[3.5px] border-b-[#16A34A]',
      },
      {
        num: '05',
        name: 'Continuous Learning',
        pillar: 'Iterative Mastery',
        description: 'Foster lifelong curiosity and progressive skill growth through milestone portfolio defense.',
        bullets: ['Annual capstone exhibitions', 'Lifelong maker self-reliance'],
        tags: ['Skill Milestones', 'Portfolio'],
        icon: 'RefreshCw',
        numBg: 'bg-rose-50 border-rose-200',
        numColor: 'text-[#E11D48]',
        glowBg: 'bg-rose-50/70 border-rose-100',
        borderColor: 'border-slate-200/90 hover:border-rose-300',
        bottomBorder: 'border-b-[3.5px] border-b-[#E11D48]',
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
        shortLine: 'Electronics, sensors, control, coding and mechanical systems.',
        iconType: 'robotics',
        movingIcons: ['Gear', 'Sensor', 'RobotArm'],
        processFlow: ['DESIGN', 'BUILD', 'CODE', 'TEST', 'IMPROVE'],
        whatStudentsDo: [
          'Build and wire a robot from kits.',
          'Program it to sense and respond.',
          'Test it, fix it and improve it.',
        ],
        image: '/assets/students_robotics_assembly.webp',
      },
      {
        id: 'aiml',
        name: 'AI & Machine Learning',
        shortLine: 'Intelligent systems, model concepts and responsible AI use.',
        iconType: 'ai',
        movingIcons: ['Network', 'Cpu', 'Shield'],
        processFlow: ['UNDERSTAND', 'EXPLORE', 'APPLY', 'BUILD'],
        whatStudentsDo: [
          'See how a model learns from examples.',
          'Try simple image and pattern recognition activities.',
          'Discuss how to use AI safely and responsibly.',
        ],
        image: '/assets/computer_vision_object_recognition.webp',
        specialNote: 'Using AI safely, fairly and responsibly.',
      },
      {
        id: 'data',
        name: 'Data Analytics',
        shortLine: 'Working with data, finding patterns and sharing insights.',
        iconType: 'data',
        movingIcons: ['BarChart3', 'Scatter', 'Search'],
        processFlow: ['DATA', 'ANALYSIS', 'VISUALISATION', 'INSIGHTS'],
        whatStudentsDo: [
          'Collect and tidy simple data.',
          'Spot patterns and trends.',
          'Show findings with clear charts.',
        ],
        image: '/assets/page_10.webp',
      },
      {
        id: 'aerial',
        name: 'Aerial Systems',
        shortLine: 'Aerial platforms, flight basics, sensing and applications.',
        iconType: 'aerial',
        movingIcons: ['Plane', 'Target', 'Compass'],
        processFlow: ['PLATFORM', 'SENSORS', 'CONTROL', 'DATA', 'APPLICATIONS'],
        whatStudentsDo: [
          'Learn how drones fly through concepts and simulation.',
          'Practise indoor control through hoops and around low and high obstacles.',
          'Understand sensors and how flight data is used.',
        ],
        image: '/assets/indoor_drone_flight_hoops.webp',
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
    headline: 'A clear roadmap from Grade 3 to Grade 12.',
    subnote: 'Reviewed every year as technology moves.',
    stages: [
      {
        id: 'grade-3-4',
        gradeLabel: 'Grades 3–4',
        title: 'Block Coding, Circuits & 3D Prototyping',
        focus: 'Class 3, Class 4',
        chips: ['Interactive animation', 'Snap-together circuits', '3D design and printing'],
        outcome: 'Students transition from consumers to builders, designing interactive animations and sequential algorithms using intuitive visual blocks.',
        termProject: 'Interactive Maze Game & Visual Sequence Builder',
        termProjectDesc: 'Students program sequential logic, sprite movement, and collision triggers on a digital canvas.',
        termProjectHighlights: [
          'Multi-directional arrow navigation with boundary collision detection',
          'Event-driven scoring triggers and conditional win/loss animation loops',
          'Flowchart logic map and documentation in student engineering logbook',
        ],
        termProjectDeliverable: 'Milestone: Playable Logic Game & Algorithm Map',
        hardwarePlatform: 'Block-Based Development Platform',
        hardwarePlatformDesc: 'Intuitive drag-and-drop algorithmic blocks, visual animation loops, and introductory spatial coordinates.',
        hardwarePlatformTools: [
          'Scratch / Blockly visual runtime engine cached 100% offline in browser',
          'Coordinate canvas with real-time X/Y Cartesian coordinate indicators',
          'Interactive algorithmic playground with instant step-by-step debug playback',
        ],
        hardwareSafety: 'Zero-hazard browser sandbox with local session persistence',
        hardwareEnvironment: 'Standard: Browser-Based Local School Lab Setup',
      },
      {
        id: 'grade-5-6',
        gradeLabel: 'Grades 5–6',
        title: 'Code Meets Hardware',
        focus: 'Class 5, Class 6',
        chips: ['Block coding to microcontrollers', 'Sensors and displays', 'Wiring discrete circuits'],
        outcome: 'Learners wire practical circuits, interface tactile sensors with motor actuators, and bridge digital code with mechanical movement.',
        termProject: 'Smart Light-Sensing Circuit & Motorized Fan System',
        termProjectDesc: 'Learners construct a breadboard circuit connecting a photocell sensor to an automated motor driver.',
        termProjectHighlights: [
          'Breadboard wiring linking LDR photoresistors to NPN transistor switches',
          'Automated dual-speed DC motor activation calibrated to ambient room light',
          'Manual override push-button circuit with safety diode protection',
        ],
        termProjectDeliverable: 'Milestone: Working Photocell Fan Prototype',
        hardwarePlatform: 'Physical Computing Starter Kit',
        hardwarePlatformDesc: 'Solderless breadboards, DC motors, LED indicators, and tactile switches introducing real electricity fundamentals.',
        hardwarePlatformTools: [
          '830-tie-point solderless breadboards with color-coded jumper harnesses',
          'Miniature DC hobby motors, fan impellers & low-voltage transistor drivers',
          'Safe 5V DC regulated bench power units & multi-color diagnostic LEDs',
        ],
        hardwareSafety: 'Low-voltage (5V DC) current-limited workbench protection',
        hardwareEnvironment: 'Standard: ESD-Safe Electronics Workbench Protocol',
      },
      {
        id: 'grade-7-8',
        gradeLabel: 'Grades 7–8',
        title: 'Python, Microcontrollers & Computer Vision',
        focus: 'Class 7, Class 8',
        chips: ['Python basics', 'Arduino projects', 'Image-based apps'],
        outcome: 'Students advance from visual blocks to text-based Python syntax, combining code with microcontrollers to harvest live sensor data and build automated response systems.',
        termProject: 'Automated Obstacle Rover with Distance Sensing',
        termProjectDesc: 'Students write Python logic on microcontrollers to measure distance in real time and navigate around obstacles.',
        termProjectHighlights: [
          'MicroPython avoidance routine with 20ms polling loop & safe thresholding',
          'Ultrasonic sonar echo calculation converting speed of sound to distance in cm',
          'PWM pulse-width modulation speed ramping and differential 90° pivot turns',
        ],
        termProjectDeliverable: 'Milestone: Autonomous Obstacle-Navigating Rover',
        hardwarePlatform: 'Microcontroller & Sensor Shield',
        hardwarePlatformDesc: 'MicroPython embedded syntax, ultrasonic rangefinders, dual H-bridge motor drivers, and serial telemetry.',
        hardwarePlatformTools: [
          'ESP32 / Raspberry Pi Pico embedded microcontrollers with USB flashing',
          'HC-SR04 ultrasonic rangefinders & dual L298N motor driver breakout boards',
          'Integrated 2WD robotic chassis with optical wheel encoders & battery mounts',
        ],
        hardwareSafety: 'Tethered desktop test rig with emergency kill-switch circuit',
        hardwareEnvironment: 'Standard: Dedicated Rover Track & Tethered IDE',
      },
      {
        id: 'grade-9',
        gradeLabel: 'Grade 9',
        title: 'Aerospace Engineering & Drone Piloting',
        focus: 'Class 9',
        chips: ['Custom drone build', 'Electronic calibration', 'Applied aerodynamics'],
        outcome: 'Focuses on connected IoT telemetry, network protocols, and systems thinking, preparing students for annual engineering showcases.',
        termProject: 'Connected IoT Weather Station & Tabletop Flight Rig',
        termProjectDesc: 'Learners deploy sensor nodes logging temperature, humidity, and pressure for school showcase presentation.',
        termProjectHighlights: [
          'Atmospheric telemetry station logging temperature, humidity & pressure',
          'Local network MQTT data broadcasting to classroom live visualizer',
          'Flight stabilizer test rig demonstrating single-rotor lift & pitch balance',
        ],
        termProjectDeliverable: 'Milestone: Exhibition-Ready IoT Station & Flight Rig',
        hardwarePlatform: 'IoT Sensor Platform & Flight Controls',
        hardwarePlatformDesc: 'Multi-sensor telemetry modules, 3-axis gyro calibration, wired telemetry protocols, and project exhibition readiness.',
        hardwarePlatformTools: [
          'BME280 barometric breakout sensors & 6-DOF MPU6050 IMU gyroscopes',
          'Microcontroller WiFi telemetry shield sending JSON data packets over LAN',
          'Brushless motor ESC with safety throttle locks & test flight frame',
        ],
        hardwareSafety: 'Protective enclosure & safety mesh flight cage during spin tests',
        hardwareEnvironment: 'Standard: Calibrated Airflow & Mesh Safety Cage',
      },
      {
        id: 'grade-10',
        gradeLabel: 'Grade 10',
        title: 'Data Analytics & Applied AI',
        focus: 'Class 10',
        chips: ['Data lifecycle', 'Dataset processing', 'Dashboard design'],
        outcome: 'Students execute end-to-end engineering capstones, analyzing multi-sensor datasets and presenting working prototypes to teachers and peers.',
        termProject: 'Recyclable Classifier & Term Capstone Portfolio',
        termProjectDesc: 'Students build an end-to-end multi-sensor system, analyze operational data, and present a verified prototype.',
        termProjectHighlights: [
          'Tri-sensor conveyor rig separating metallic cans, clear bottles & cardboard',
          'Statistical variance filtering distinguishing material density from sensor noise',
          'Real-time telemetry logging of throughput, rejection rates & sensor latency',
        ],
        termProjectDeliverable: 'Milestone: Verified Sorting Capstone & Portfolio Defense',
        hardwarePlatform: 'Data Analytics & Engineering Rig',
        hardwarePlatformDesc: 'Statistical data processing tools, variance filtering, hardware telemetry charts, and formal capstone documentation.',
        hardwarePlatformTools: [
          'Inductive proximity, optical reflection & capacitive dielectric sensors',
          'Python NumPy / Pandas data exploration pipeline logging sensor distributions',
          'Multi-channel 12-bit ADC data acquisition module streaming at 100Hz',
        ],
        hardwareSafety: 'Enclosed conveyor belt mechanism with optical interlock gates',
        hardwareEnvironment: 'Standard: Multidisciplinary Capstone Build Station',
      },
      {
        id: 'grade-11',
        gradeLabel: 'Grade 11',
        title: 'AI Mathematics & Neural Networks',
        focus: 'Class 11',
        chips: ['Statistics and probability', 'Predictive modelling', 'Neural network basics'],
        outcome: 'Hands-on exploration of statistical inference, data pipelines, and machine learning models applied to real-world datasets.',
        termProject: 'Statistical Sensor Model & Supervised Classifier',
        termProjectDesc: 'Students collect multi-sensor readings, engineer predictive features, and train supervised machine learning models.',
        termProjectHighlights: [
          'High-dimensional telemetry feature engineering from raw analog sensor feeds',
          'Supervised linear & logistic regression model training with decision boundaries',
          'Real-time anomaly detection flagging irregular sensor drifts & sensor faults',
        ],
        termProjectDeliverable: 'Milestone: Trained Classifier Model & Validation Report',
        hardwarePlatform: 'Machine Learning Edge Model Kit',
        hardwarePlatformDesc: 'Data preprocessing pipelines, linear and logistic classification, model evaluation rubrics, and privacy guardrails.',
        hardwarePlatformTools: [
          'Interactive Jupyter notebook environment pre-configured with Scikit-Learn',
          'Multi-channel analog-to-digital converter shields with high sample rates',
          'Edge AI neural inference accelerator modules with hardware performance metrics',
        ],
        hardwareSafety: 'Sandboxed Python virtual environments with verified datasets',
        hardwareEnvironment: 'Standard: Networked High-Performance Modeling PCs',
      },
      {
        id: 'grade-12',
        gradeLabel: 'Grade 12',
        title: 'AI & Cloud Deployment',
        focus: 'Class 12',
        chips: ['Cloud AI deployment', 'Building complete applications', 'Project showcase'],
        outcome: 'Advanced synthesis of deep learning models and autonomous robotics systems with real-time feedback loops.',
        termProject: 'Autonomous Guidance Vehicle & Articulated Arm',
        termProjectDesc: 'Senior capstone synthesizing computer vision, 3-DOF robotic kinematics, and real-time closed-loop control.',
        termProjectHighlights: [
          'Real-time OpenCV edge color segmentation & coordinate centroid tracking',
          '3-DOF robotic arm inverse kinematics calculating servo joint angles in real time',
          'Closed-loop visual servoing enabling automated pick-and-place precision cycles',
        ],
        termProjectDeliverable: 'Milestone: Full-Stack Robotic Vision & Arm Capstone',
        hardwarePlatform: 'Integrated Robotics & AI Suite',
        hardwarePlatformDesc: 'Edge neural camera models, multi-servo inverse kinematics, serial telemetry feedback, and accredited portfolio defense.',
        hardwarePlatformTools: [
          'High-resolution USB machine vision camera with adjustable focal length',
          'All-metal 3-axis articulated robot arm mechanism with metal gear servos',
          'High-torque PWM digital servo bus with dual-bearing aluminum brackets',
        ],
        hardwareSafety: 'Physical emergency-stop button & clamped aluminum base station',
        hardwareEnvironment: 'Standard: Industrial Robotics & Vision Test Rig',
      },
    ] as CurriculumStage[],
    beyondGrade10: [] as CurriculumStage[],
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
        isRealWork: false,
      },
      {
        id: 'proj-2',
        name: 'Environmental Sensor Station',
        grade: 'Grade 7',
        domain: 'Data Analytics',
        summary: 'Classroom temperature and air quality monitoring station with visual telemetry chart outputs.',
        image: '/assets/page_13.webp',
        isRealWork: false,
      },
      {
        id: 'proj-3',
        name: 'Hoop Navigation Flight Rig',
        grade: 'Grade 9',
        domain: 'Aerial Systems',
        summary: 'Guarded quadcopter maneuvering system demonstrating roll, pitch, and yaw stability during indoor obstacle flight.',
        image: '/assets/drone_flight.webp',
        isRealWork: false,
      },
      {
        id: 'proj-4',
        name: 'Visual Pattern Classifier',
        grade: 'Grade 10',
        domain: 'AI & Machine Learning',
        summary: 'Computer-vision based item sorting model distinguishing recyclable classroom materials.',
        image: '/assets/page_10.webp',
        isRealWork: false,
      },
      {
        id: 'proj-5',
        name: 'Multi-Axis Articulated Arm',
        grade: 'Grade 9',
        domain: 'Robotics & Automation',
        summary: 'Three-servo tabletop robotic arm programmed to pick and sort small geometric components.',
        image: '/assets/robotics_arm_showcase.webp',
        isRealWork: false,
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
      flowSteps: ['Explore', 'Experiment', 'Innovate'],
    },
  },

  // Act 3: 08 STEM Lab Setup
  labSetup: {
    eyebrow: 'Lab Architecture',
    headline: 'A lab built for making things.',
    paragraph: 'Everything students need to build, test and improve, set up in a dedicated space in your school.',
    zones: [
      {
        id: 'zone-software',
        name: 'Software terminals',
        description: "Python coding, data analysis and machine learning work on the school's computers.",
      },
      {
        id: 'zone-hardware',
        name: 'Hardware and prototyping bench',
        description: 'Wiring, assembly, Arduino testing and robot building, with safety equipment at hand.',
      },
      {
        id: 'zone-maker',
        name: 'Innovation and maker space',
        description: 'Designing, 3D printing and prototyping student projects.',
      },
      {
        id: 'zone-drone',
        name: 'Drone control zone',
        description: 'Indoor training with hoops and low and high obstacles, behind a marked safety line.',
      },
    ],
    resourceLists: [
      {
        title: 'Hardware and kits',
        items: [
          'Robotics kits (microcontroller boards, sensors, motors, chassis); electronics components; 3D printer for prototyping; small guarded training drones; hoops and obstacle set.',
        ],
      },
      {
        title: 'Tools and software',
        items: [
          'Basic hand tools and safety equipment; the programming and simulation software needed for learning.',
        ],
      },
      {
        title: 'Space and infrastructure',
        items: [
          'Minimum 600 sq ft identified by the school; bright, with windows on one side; room for about 40 students per class at a time; classes of 40 minutes to 1 hour, several during the day; movable equipment for better use of space; storage for materials; safety equipment; an innovation and maker space for projects and prototyping.',
        ],
      },
    ],
    labImage: '/assets/page_06.webp',
  },

  // Act 3: 09 LMS & Resources
  resources: {
    eyebrow: 'Continuous Learning',
    headline: 'Resources are being developed grade by grade.',
    paragraph: 'As our partnership with each school grows, the learning resources grow with it.',
    statusNotice: 'Resources are being developed grade by grade.',
    tiles: [
      {
        title: 'E-books',
        description: 'Grade-wise books that guide each activity.',
        tag: 'Workbook',
      },
      {
        title: 'Modules',
        description: 'Topic-wise content in a set order.',
        tag: 'Structured',
      },
      {
        title: 'Quizzes',
        description: 'Quick checks on what has landed.',
        tag: 'Assessment',
      },
      {
        title: 'Videos',
        description: 'Short explainers and demonstrations.',
        tag: 'Media',
      },
    ],
    previewImage: '/assets/page_12.webp',
  },

  // Act 3: 10 Teacher Empowerment
  teacherEmpowerment: {
    eyebrow: 'Educator Support',
    headline: 'Teacher Empowerment',
    message: 'Our Instructors run the student programme. Teachers get a few workshops to get ahead with AI.',
    students: {
      title: 'Full Turnkey Delivery',
      heading: 'MedhaArc Mentors Lead 100% of the Lab Sessions',
      details: [
        'Dedicated Expert Mentorship: Trained instructors conduct every weekly hands-on practical session in your school.',
        'Zero Preparation for School Faculty: No lesson planning, lab setup, or hardware grading load on regular teachers.',
        'Complete Safety & Tool Governance: Instructors manage component inventories, battery safety, and equipment maintenance.',
        'Milestone Tracking & Showcase Readiness: Formative concept tracking and annual exhibition readiness managed end-to-end.',
      ],
      chips: ['100% Turnkey Delivery', 'Zero Teacher Burden', 'Safety Certified'],
    },
    workshopTiming: 'Short workshops to upgrade their own skills with AI. Offered after the programme is under way, completed within 4–5 workshops.',
    workshops: [
      {
        title: 'Transforming Learning Materials into Smart Notes',
        items: [
          'Smart Notes Generation – Convert textbooks and PDFs into structured notes.',
          'Chapter Summarization – Create short and easy-to-understand chapter summaries.',
          'Question Bank Creation – Generate MCQs, short answers, and long questions from study materials.',
          'Lesson Preparation – Prepare topic-wise teaching content from uploaded resources.',
          'Revision Material Creation – Develop quick revision notes and important question lists.',
          'Doubt Solving – Ask questions about uploaded study materials and find relevant explanations.',
        ],
        subtitle: 'Teachers can prepare notes, summaries, and revision materials without manually rewriting lengthy textbook content.',
      },
      {
        title: 'Interactive Classroom Learning with OneNote',
        items: [
          'Digital Notebook Creation – Create separate notebooks for subjects and classes.',
          'Interactive Class Notes – Prepare notes using text, images, tables, and diagrams.',
          'Digital Whiteboard Teaching – Explain topics using handwriting, drawing, and annotations.',
          'Learning Material Sharing – Share notes and resources with students.',
          'Assignment Organization – Maintain subject-wise assignments and learning activities.',
          'Classroom Resource Management – Organize daily lesson notes, important links, and reference materials.',
        ],
        subtitle: 'Teachers can maintain a digital classroom notebook instead of managing multiple physical registers and scattered teaching materials.',
      },
      {
        title: 'Smart Classroom Management with Microsoft Forms & Teams',
        items: [
          'Digital Class Creation – Create class groups and subject-wise channels.',
          'Online Test Creation – Prepare MCQ tests, quizzes, and student surveys.',
          'Automatic Quiz Evaluation – Check objective answers and view student scores.',
          'Assignment Management – Share homework, collect submissions, and provide feedback.',
          'Student Progress Tracking – Monitor quiz results and assignment submissions.',
          'Class Announcements – Share homework, important notices, and learning updates.',
        ],
        subtitle: 'Teachers can manage classroom activities, assignments, tests, and communication through one connected digital environment.',
      },
      {
        title: 'Unlocking Creativity with Generative AI',
        items: [
          'Smart Lesson Planning – Generate daily and weekly lesson plans.',
          'Creative Teaching Ideas – Develop classroom activities and real-life examples.',
          'Worksheet Generation – Create subject-wise worksheets and practice exercises.',
          'Visual Learning Content – Generate diagrams, illustrations, and presentation ideas.',
          'Personalized Teaching – Prepare different explanations for different learning levels.',
        ],
        subtitle: 'Teachers can save preparation time and make classroom teaching more creative, interactive, and engaging.',
      },
      {
        title: 'Turning Data into Smarter Decisions',
        items: [
          'Student Record Management – Maintain student marks, attendance, and academic records.',
          'Marks & Result Analysis – Calculate totals, percentages, grades, and averages.',
          'Performance Visualization – Create charts and graphs for student performance.',
          'Attendance Analysis – Identify attendance patterns and frequently absent students.',
          'Learning Gap Identification – Find students who need additional academic support.',
          'Academic Performance Dashboard – Create class-wise and subject-wise performance dashboards.',
        ],
        subtitle: 'Teachers can understand student performance, identify learning difficulties, and make better academic decisions using data.',
      },
    ],
    closingLine: 'Skills that stay with your teachers.',
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
        description: 'A certificate for each level completed.',
        icon: 'Award',
      },
      {
        title: 'Competitions',
        description: 'Students contribute showcase projects to school events and science carnivals. Inter-school competitions are planned as skills grow.',
        icon: 'Trophy',
        status: 'Coming',
      },
      {
        title: 'Portfolios',
        description: "A record of each student's builds to show and grow.",
        icon: 'FolderKanban',
      },
    ],
  },

  // Act 5: 12 School Requirements & Delivery
  requirements: {
    eyebrow: 'Clear Partnership Boundaries',
    headline: 'A shared effort',
    columns: [
      {
        title: 'School provides',
        items: [
          'Lab space (minimum 600 sq ft, bright)',
          'Computers',
          'Tables and power points',
          'Student scheduling (about 40 students per class, 40 minutes to 1 hour)',
        ],
      },
      {
        title: 'MedhaArc Labs delivers',
        items: [
          'Curriculum and session plans, reviewed every year',
          'Kits and learning materials',
          'MedhaArc Labs Instructors/Mentors for every student session',
          'AI upskilling workshops for teachers (4–5) and learning resources as they are released',
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
        summary: 'Robotics and physical computing fundamentals.',
        features: [
          'Weekly 100% hands-on lab sessions',
          'Dedicated MedhaArc Mentor for every student class',
          'Complete robotics & breadboard circuit kits',
          'Grade-wise digital workbooks & guides',
          'Student completion certificates & showcase',
        ],
      },
      {
        id: 'professional',
        name: 'Professional',
        price: '₹600',
        cadence: 'per student / month',
        summary: 'Foundation, plus Mathematics & AI integration.',
        features: [
          'Everything in Foundation, plus:',
          'Integrated Mathematics & Computational Physics',
          'AI & Machine Learning pattern recognition',
          'Teacher AI Productivity Workshops (4–5 sessions)',
          'Formative diagnostic quizzes & teacher heatmaps',
        ],
      },
      {
        id: 'premium',
        name: 'Premium',
        price: '₹700',
        cadence: 'per student / month',
        summary: 'Full-stack engineering, Drones & Competition prep.',
        features: [
          'Everything in Professional, plus:',
          'Aerial Systems & Indoor Drone Flight Arenas',
          'Multi-node IoT sensor telemetry stations',
          'Inter-school STEM competition team mentorship',
          'Individual verified digital student portfolios',
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
    ctaText: 'Write to us',
    footerText: 'MedhaArc Labs | MedhaArc Private Limited',
    websiteUrl: 'https://www.medhaarc.com/',
    socialLinks: [
      { name: 'Instagram', url: 'https://www.instagram.com/medhaarc' },
      { name: 'X', url: 'https://x.com/medhaarc' },
      { name: 'Facebook', url: 'https://www.facebook.com/people/MedhaArc/61595117606026/' },
      { name: 'LinkedIn', url: 'http://linkedin.com/company/medhaarc/' },
    ],
  },
};
