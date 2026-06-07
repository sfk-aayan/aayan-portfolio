export interface SystemModule {
  id: string;
  title: string;
  category: string;
  description: string;
  technicalBreakdown: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  status: "ACTIVE" | "DEGRADED" | "OPERATIONAL" | "OFFLINE";
  version: string;
  link?: string;
}

export interface PhilosophyNode {
  title: string;
  principle: string;
  description: string;
  metric: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  achievements: string[];
  technologies: string[];
}

export interface DeveloperProfile {
  name: string;
  title: string;
  bio: string;
  skills: { [category: string]: string[] };
}

export interface ResearchLink {
  id: string;
  title: string;
  publication: string;
  date: string;
  summary: string;
  link: string;
  tags: string[];
}
export interface Education {
  id: string;
  institution: string;
  location: string;
  degree: string;
  cgpa: string;
  period: string;
}

export interface Publication {
  id: string;
  title: string;
  venue: string;
  date: string;
  authors: string;
  authorNote: string;
  summary: string;
  tags: string[];
  link: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  summary: string;
  tags: string[];
  link: string;
}

export interface ScanRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  color?: "cyan" | "amber";
}

export interface GlitchHeaderProps {
  title: string;
  subtitle: string;
  node: string;
  color?: "amber" | "cyan" | "emerald";
}
