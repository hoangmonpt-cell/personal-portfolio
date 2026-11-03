import type { UnifiedProject } from '../../types/project';
import { fetchGitHubRepos } from '../github/githubService';
import { fetchGitLabProjects } from '../gitlab/gitlabService';
import { featuredProjectsConfig } from '../../data/featuredProjects';

const CACHE_KEY = 'portfolio_synced_projects_cache_v2';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

interface CachedData {
  timestamp: number;
  projects: UnifiedProject[];
}

/**
 * Fallback static projects in case API is offline or rate limited.
 */
export const fallbackProjects: UnifiedProject[] = [
  {
    id: 'gh-portfolio',
    provider: 'github',
    name: 'personal-portfolio',
    fullName: 'hoangmonpt-cell/personal-portfolio',
    description: 'Game Developer & Software Engineer portfolio with sci-fi HUD aesthetic, GitHub/GitLab synchronizer, bilingual i18n, and GitHub Actions CI/CD.',
    htmlUrl: 'https://github.com/hoangmonpt-cell/personal-portfolio',
    homepageUrl: 'https://hoangmonpt-cell.github.io/personal-portfolio/',
    language: 'TypeScript',
    topics: ['game-dev-portfolio', 'game-hud', 'sci-fi-ui', 'vite', 'react', 'github-actions'],
    stars: 1,
    forks: 0,
    updatedAt: new Date().toISOString(),
    createdAt: '2026-11-03T10:00:00Z',
    isFork: false,
    visibility: 'public',
    category: 'software',
    featured: true,
    caseStudyPath: 'portfolio-engine',
  },
];

/**
 * Enhances raw unified projects with featured config and case studies.
 */
function applyProjectOverrides(projects: UnifiedProject[]): UnifiedProject[] {
  return projects.map((p) => {
    const override = featuredProjectsConfig.find(
      (c) => c.repoName.toLowerCase() === p.name.toLowerCase()
    );

    if (override) {
      return {
        ...p,
        featured: true,
        category: override.category || p.category,
        thumbnail: override.thumbnail || p.thumbnail,
        screenshots: override.screenshots || p.screenshots,
        caseStudyPath: override.caseStudyId || p.caseStudyPath,
        customDescription: override.customDescription,
      };
    }
    return p;
  });
}

export interface SyncResult {
  projects: UnifiedProject[];
  isCached: boolean;
  isFallback: boolean;
  errors: string[];
}

export async function syncAllProjects(
  githubUser: string = 'hoangmonpt-cell',
  gitlabUser?: string,
  gitlabBaseUrl?: string,
  forceRefresh: boolean = false
): Promise<SyncResult> {
  const errors: string[] = [];

  // Check cache first if not forced
  if (!forceRefresh) {
    try {
      const rawCache = localStorage.getItem(CACHE_KEY);
      if (rawCache) {
        const cached: CachedData = JSON.parse(rawCache);
        if (Date.now() - cached.timestamp < CACHE_TTL_MS && cached.projects.length > 0) {
          return {
            projects: applyProjectOverrides(cached.projects),
            isCached: true,
            isFallback: false,
            errors: [],
          };
        }
      }
    } catch {
      // ignore localStorage errors
    }
  }

  let ghProjects: UnifiedProject[] = [];
  let glProjects: UnifiedProject[] = [];
  let ghSuccess = false;
  let glSuccess = false;

  // Retrieve cached projects ahead of time in case of partial provider failure
  let cachedProjects: UnifiedProject[] = [];
  try {
    const rawCache = localStorage.getItem(CACHE_KEY);
    if (rawCache) {
      const parsed: CachedData = JSON.parse(rawCache);
      if (Array.isArray(parsed.projects)) {
        cachedProjects = parsed.projects;
      }
    }
  } catch {
    // ignore
  }

  // 1. Fetch GitHub
  if (githubUser) {
    try {
      ghProjects = await fetchGitHubRepos(githubUser);
      ghSuccess = true;
    } catch (err: any) {
      errors.push(`GitHub: ${err.message || 'Error syncing GitHub repos'}`);
    }
  }

  // 2. Fetch GitLab
  if (gitlabUser) {
    try {
      glProjects = await fetchGitLabProjects(gitlabUser, gitlabBaseUrl);
      glSuccess = true;
    } catch (err: any) {
      errors.push(`GitLab: ${err.message || 'Error syncing GitLab projects'}`);
    }
  }

  // Partial Provider Recovery: If one provider failed, preserve its projects from cache
  if (!ghSuccess && cachedProjects.length > 0) {
    const cachedGh = cachedProjects.filter((p) => p.provider === 'github');
    if (cachedGh.length > 0) {
      ghProjects = cachedGh;
    }
  }
  if (!glSuccess && cachedProjects.length > 0) {
    const cachedGl = cachedProjects.filter((p) => p.provider === 'gitlab');
    if (cachedGl.length > 0) {
      glProjects = cachedGl;
    }
  }

  // Combine and deduplicate projects (by unique provider + name)
  const combinedRaw = [...ghProjects, ...glProjects];
  const seenKeys = new Set<string>();
  const combined: UnifiedProject[] = [];

  for (const proj of combinedRaw) {
    const key = `${proj.provider}-${proj.name.toLowerCase()}`;
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      combined.push(proj);
    }
  }

  if (combined.length > 0) {
    const enriched = applyProjectOverrides(combined);
    try {
      const cacheObj: CachedData = {
        timestamp: Date.now(),
        projects: enriched,
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheObj));
    } catch {
      // ignore
    }

    return {
      projects: enriched,
      isCached: false,
      isFallback: false,
      errors,
    };
  }

  // If both failed or returned 0, try cached data even if expired
  if (cachedProjects.length > 0) {
    return {
      projects: applyProjectOverrides(cachedProjects),
      isCached: true,
      isFallback: false,
      errors,
    };
  }

  // Fallback to static data
  return {
    projects: applyProjectOverrides(fallbackProjects),
    isCached: false,
    isFallback: true,
    errors,
  };
}
