import React from 'react';
import {
  Bot,
  Sparkles,
  Compass,
  Boxes,
  Cpu,
  Wifi,
  Eye,
} from 'lucide-react';
import { HorizontalScrollGallery } from '../components/HorizontalScrollGallery';
import type { GalleryItem } from '../types';

const EMERGING_TECH_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'physical-ai',
    number: '01',
    title: 'Physical AI',
    category: 'Embodied Systems',
    tagline: 'Embodied Intelligence & Motion',
    summary: 'Robots use sensors and onboard AI to react to their surroundings in real-time.',
    detail:
      'Bridging sensory perception with physical motor control, allowing autonomous mobile systems to navigate dynamic obstacles without human intervention.',
    accentColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.35)',
    icon: <Bot className="w-4 h-4 text-[#38bdf8]" />,
    image: '/assets/page_11.jpg',
    tags: ['Sensor Fusion', 'Motor Actuation', 'Real-Time Inference'],
    metric: {
      value: 'Grade 9–12',
      label: 'Lab Phase: Autonomy Loop',
    },
  },
  {
    id: 'generative-ai',
    number: '02',
    title: 'Generative AI',
    category: 'Creative Computation',
    tagline: 'Co-Creation & Synthetic Data',
    summary: 'AI helps students create code, 3D designs, and sample data.',
    detail:
      'Students learn to harness transformer models, prompt engineering, and procedural generation to accelerate CAD modeling, simulation tests, and code generation.',
    accentColor: '#a78bfa',
    glowColor: 'rgba(167, 139, 250, 0.35)',
    icon: <Sparkles className="w-4 h-4 text-[#a78bfa]" />,
    image: '/assets/laptop_analytics.jpg',
    tags: ['Prompt Engineering', 'Synthetic Data', 'Procedural CAD'],
    metric: {
      value: 'Grade 8–12',
      label: 'Lab Phase: Co-Creation',
    },
  },
  {
    id: 'ai-agents',
    number: '03',
    title: 'AI Agents',
    category: 'Autonomous Workflows',
    tagline: 'Goal-Directed Automation',
    summary: 'AI agents plan multi-step tasks, use software tools, and self-correct their results.',
    detail:
      'Moving beyond simple chatbots to autonomous systems that deconstruct objectives, query external APIs, execute validation routines, and iterate toward solutions.',
    accentColor: '#34d399',
    glowColor: 'rgba(52, 211, 153, 0.35)',
    icon: <Compass className="w-4 h-4 text-[#34d399]" />,
    image: '/assets/students_robotics.jpg',
    tags: ['Goal Decomposition', 'Tool Execution', 'Self-Correction'],
    metric: {
      value: 'Grade 10–12',
      label: 'Lab Phase: Multi-Agent Loops',
    },
  },
  {
    id: 'digital-twins',
    number: '04',
    title: 'Digital Twins',
    category: 'Simulation & Modeling',
    tagline: 'Virtual Replica & Stress Testing',
    summary: 'Virtual models let students simulate physics, motion, and forces before building.',
    detail:
      'Constructing high-fidelity digital replicas of lab rovers and drone frames to analyze center-of-mass, aerodynamic drag, and stress tolerance prior to fabrication.',
    accentColor: '#fb923c',
    glowColor: 'rgba(251, 146, 60, 0.35)',
    icon: <Boxes className="w-4 h-4 text-[#fb923c]" />,
    image: '/assets/blueprint_rover_desk.png',
    tags: ['Physics Simulation', 'CAD Kinematics', 'Stress Tolerance'],
    metric: {
      value: 'Grade 7–12',
      label: 'Lab Phase: Virtual Testing',
    },
  },
  {
    id: 'edge-ai',
    number: '05',
    title: 'Edge AI',
    category: 'Localized Computing',
    tagline: 'Zero-Latency On-Device Inference',
    summary: 'Microcontrollers run compact AI models without sharing data to the cloud.',
    detail:
      'Deploying quantized neural networks directly on ESP32 and Raspberry Pi hardware for real-time computer vision, gesture tracking, and audio recognition with zero internet dependency.',
    accentColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.35)',
    icon: <Cpu className="w-4 h-4 text-[#38bdf8]" />,
    image: '/assets/page_06.jpg',
    tags: ['Quantized Models', 'ESP32 / MicroPython', 'Local Vision'],
    metric: {
      value: 'Grade 9–12',
      label: 'Lab Phase: Embedded Inference',
    },
  },
  {
    id: 'smart-iot',
    number: '06',
    title: 'Smart IoT',
    category: 'Interconnected Sensing',
    tagline: 'Distributed Telemetry & Mesh Networks',
    summary: 'Connected sensors share live data such as campus weather, acoustics, and energy use.',
    detail:
      'Setting up multi-node telemetry networks using MQTT and Bluetooth mesh to stream environmental metrics into real-time visual dashboards across school labs.',
    accentColor: '#f472b6',
    glowColor: 'rgba(244, 114, 182, 0.35)',
    icon: <Wifi className="w-4 h-4 text-[#f472b6]" />,
    image: '/assets/page_04.jpg',
    tags: ['MQTT Telemetry', 'Distributed Mesh', 'Live Streaming'],
    metric: {
      value: 'Grade 6–12',
      label: 'Lab Phase: Sensor Telemetry',
    },
  },
  {
    id: 'ar-vr',
    number: '07',
    title: 'AR / VR Simulation',
    category: 'Spatial Interfaces',
    tagline: 'Immersive Kinematics & Circuits',
    summary: '3D simulations make complex flight mechanics, magnetic forces, and circuits easier to explore.',
    detail:
      'Using spatial visual interfaces to peer inside active robotic gearboxes, visualize electric fields around microcontrollers, and inspect drone airflow vectors in 3D.',
    accentColor: '#60a5fa',
    glowColor: 'rgba(96, 165, 250, 0.35)',
    icon: <Eye className="w-4 h-4 text-[#60a5fa]" />,
    image: '/assets/drone_flight.jpg',
    tags: ['Spatial Interfaces', 'Airflow Vectors', 'Magnetic Fields'],
    metric: {
      value: 'Grade 8–12',
      label: 'Lab Phase: Spatial Inspection',
    },
  },
];

export const EmergingTechSection: React.FC = () => {
  return (
    <HorizontalScrollGallery
      id="slide-11"
      dataSlideIndex="10"
      headline="Preparing students for"
      italicHeadline="tomorrow's innovations."
      description="Glide horizontally through seven forward-looking engineering domains expanding student vision beyond conventional syllabi."
      items={EMERGING_TECH_GALLERY_ITEMS}
      nextSectionId="slide-12"
      nextSectionTitle="Benefits for Schools & Students"
    />
  );
};

export default EmergingTechSection;
