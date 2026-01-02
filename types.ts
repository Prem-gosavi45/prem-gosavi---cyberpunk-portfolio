import { LucideIcon } from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  systemName: string;
}

export interface Project {
  id: number;
  title: string;
  techStack: string[];
  description: string;
  demoLink?: string;
  codeLink?: string;
}

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  details: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
  icon: LucideIcon;
}

export interface Certification {
  id: number;
  title: string;
  issuer?: string;
  year?: string;
}