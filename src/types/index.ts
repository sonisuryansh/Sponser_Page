export interface SlideData {
  id: string;
  number: number;
  label: string;
  title: string;
  headline?: string;
  subtitle?: string;
  badge?: string;
  category: 'Overview' | 'Domain' | 'Pedagogy' | 'Curriculum' | 'Partnership';
}

export interface EcosystemDomain {
  id: string;
  name: string;
  description: string;
  accent: string;
  icon: string;
  items: string[];
}

export interface GradeLevel {
  grade: string;
  stage: string;
  focus: string;
  outcome: string;
  topics: string[];
}

export interface EmergingTech {
  name: string;
  category: string;
  summary: string;
  schoolExample: string;
}

export interface PackageTier {
  name: string;
  price: string;
  period: string;
  status: string;
  description: string;
  inclusions: string[];
  recommended?: boolean;
}
