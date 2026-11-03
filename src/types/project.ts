export type RepoProvider = 'github' | 'gitlab';

export interface UnifiedProject {
  id: string;
  provider: RepoProvider;
  name: string;
  fullName: string;
  description: string;
  htmlUrl: string;
  homepageUrl: string | null;
  language: string;
  topics: string[];
  stars: number;
  forks: number;
  updatedAt: string;
  createdAt: string;
  isFork: boolean;
  visibility: string;
  category: string;
  featured: boolean;
  featuredOrder?: number;
  thumbnail?: string;
  screenshots?: string[];
  caseStudyPath?: string;
  highlights?: {
    vi: string[];
    en: string[];
  };
  customDescription?: {
    vi: string;
    en: string;
  };
}

export type ProjectCategory = 'all' | 'game' | 'software' | 'ai' | 'tool' | 'web';

export interface ProfileData {
  name: string;
  title: {
    vi: string;
    en: string;
  };
  tagline: {
    vi: string;
    en: string;
  };
  bio: {
    vi: string[];
    en: string[];
  };
  avatarUrl: string;
  avatarPlaceholderText: string;
  status: {
    vi: string;
    en: string;
  };
  location: {
    vi: string;
    en: string;
  };
  socialLinks: {
    github: string;
    gitlab: string;
    linkedin: string;
    email: string;
    cvUrl: string;
  };
  stats: {
    reposCountPlaceholder?: number;
    gameProjectsPlaceholder?: number;
    yearsOfExperiencePlaceholder?: string;
  };
}

export interface SkillItem {
  name: string;
  iconName?: string;
  category: 'game-dev' | 'software-dev' | 'ai-tools';
  tags: string[];
  description?: {
    vi: string;
    en: string;
  };
}

export interface CaseStudyData {
  id: string;
  title: string;
  subtitle: {
    vi: string;
    en: string;
  };
  overview: {
    vi: string;
    en: string;
  };
  goal: {
    vi: string;
    en: string;
  };
  gameplayDemoUrl?: string;
  techStack: string[];
  architecture: {
    vi: string[];
    en: string[];
  };
  keyFeatures: {
    vi: string[];
    en: string[];
  };
  challenges: {
    vi: string[];
    en: string[];
  };
  solutions: {
    vi: string[];
    en: string[];
  };
  personalContribution: {
    vi: string[];
    en: string[];
  };
  testingResults: {
    vi: string;
    en: string;
  };
  repoUrl: string;
  liveUrl?: string;
}

