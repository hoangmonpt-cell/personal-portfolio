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
    id: 'gh-fortress-idle',
    provider: 'github',
    name: 'FortressIdle',
    fullName: 'hoangmonpt-cell/FortressIdle',
    description: 'Hybrid Tower Defense & Idle game built on Unity 6 LTS (URP) – Completed in 7-day sprint, won Promising Award at GAME SPRINT 2026. Features 0 B GC Alloc in combat loops, MaterialPropertyBlock VRAM leak prevention.',
    htmlUrl: 'https://github.com/hoangmonpt-cell/FortressIdle',
    homepageUrl: 'https://github.com/hoangmonpt-cell/FortressIdle',
    language: 'C#',
    topics: ['unity-6', 'csharp', 'tower-defense', 'idle-game', 'game-sprint-2026'],
    stars: 2,
    forks: 0,
    updatedAt: new Date().toISOString(),
    createdAt: '2026-03-01T10:00:00Z',
    isFork: false,
    visibility: 'public',
    category: 'game',
    featured: true,
    caseStudyPath: 'fortress-idle',
  },
  {
    id: 'gl-rise-of-the-elements',
    provider: 'gitlab',
    name: 'rise-of-the-elements',
    fullName: 'duanxuong/rise-of-the-elements',
    description: 'Game Hybrid Match-3 & Tower Defense (PC / Mobile) với kiến trúc UI Toolkit (UXML/USS), Firebase Auth/Cloud Data, Server-Authoritative Lives và CurrencyVFXSystem.',
    htmlUrl: 'https://gitlab.com/duanxuong/rise-of-the-elements',
    homepageUrl: 'https://gitlab.com/duanxuong/rise-of-the-elements',
    language: 'C#',
    topics: ['unity', 'csharp', 'ui-toolkit', 'firebase', 'match-3', 'tower-defense'],
    stars: 1,
    forks: 0,
    updatedAt: new Date().toISOString(),
    createdAt: '2026-03-01T10:00:00Z',
    isFork: false,
    visibility: 'public',
    category: 'game',
    featured: true,
    caseStudyPath: 'rise-of-the-elements',
  },
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
        featuredOrder: override.featuredOrder ?? 99,
        category: override.category || p.category,
        thumbnail: override.thumbnail || p.thumbnail,
        screenshots: override.screenshots || p.screenshots,
        caseStudyPath: override.caseStudyId || p.caseStudyPath,
        customDescription: override.customDescription,
        htmlUrl: override.repoUrl || p.htmlUrl,
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

    // Explicitly synchronize group project: duanxuong/rise-of-the-elements (ID: 80168541)
    try {
      const riseRes = await fetch(`${gitlabBaseUrl || 'https://gitlab.com'}/api/v4/projects/80168541`);
      if (riseRes.ok) {
        const riseP = await riseRes.json();
        const unifiedRise: UnifiedProject = {
          id: `gl-${riseP.id}`,
          provider: 'gitlab',
          name: 'rise-of-the-elements',
          fullName: riseP.path_with_namespace || 'duanxuong/rise-of-the-elements',
          description: 'Game Hybrid Match-3 & Tower Defense (PC / Mobile) với kiến trúc UI Toolkit (UXML/USS), Firebase Auth/Cloud Data, Server-Authoritative Lives và CurrencyVFXSystem.',
          htmlUrl: riseP.web_url || 'https://gitlab.com/duanxuong/rise-of-the-elements',
          homepageUrl: riseP.web_url || 'https://gitlab.com/duanxuong/rise-of-the-elements',
          language: 'C#',
          topics: ['unity', 'csharp', 'ui-toolkit', 'firebase'],
          stars: riseP.star_count || 1,
          forks: riseP.forks_count || 0,
          updatedAt: riseP.last_activity_at || new Date().toISOString(),
          createdAt: riseP.created_at || '2026-03-01T00:00:00Z',
          isFork: false,
          visibility: 'public',
          category: 'game',
          featured: true,
          caseStudyPath: 'rise-of-the-elements',
        };
        glProjects.push(unifiedRise);
      }
    } catch {
      // ignore
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
