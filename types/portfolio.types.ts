export interface Experience {
  id: string;
  company: string;
  title: string;
  dateRange: string;
  location: string;
  description: string;
  skills: string[];
  companyLogo?: string;
  isCurrent: boolean;
}

export interface Education {
  id: string;
  school: string;
  institutionFullName?: string;
  degree: string;
  fieldOfStudy: string;
  dateRange: string;
  activities?: string;
  logo?: string;
  color?: string;
  url?: string;
  description?: string;
}

export interface Certification {
  id: string;
  name: string;
  authority: string;
  issued: string;
  url: string;
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface PortfolioData {
  firstName: string;
  lastName: string;
  fullName: string;
  headline: string;
  about: string;
  location: string;
  profileImageUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  email: string;
  resumeUrl: string;
  experiences: Experience[];
  educations: Education[];
  certifications: Certification[];
  languages: Language[];
  skills: SkillCategory[];
}