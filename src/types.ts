export interface Project {
  id: number;
  title: string;
  category: string;
  focusArea: string;
  description: string;
  specs: string[];
  image: string;
  link?: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  pdf: string;
  description: string;
  skills: string[];
  link?: string;
}
