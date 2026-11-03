import type { UnifiedProject } from '../../types/project';

export interface GitHubRepoItem {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  created_at: string;
  fork: boolean;
  visibility: string;
  archived: boolean;
}

/**
 * Fetches public GitHub repositories with pagination support (up to 300 repos).
 * Limits consecutive calls to 3 pages max to protect unauthenticated IP rate limits.
 */
export async function fetchGitHubRepos(username: string): Promise<UnifiedProject[]> {
  if (!username || username.trim() === '') {
    return [];
  }

  const cleanUser = encodeURIComponent(username.trim());
  const allRepos: GitHubRepoItem[] = [];
  const maxPages = 3;

  for (let page = 1; page <= maxPages; page++) {
    const url = `https://api.github.com/users/${cleanUser}/repos?per_page=100&page=${page}&sort=updated`;

        const response = await fetch(url, {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`GitHub user "${username}" not found.`);
          }
          if (response.status === 403) {
            // Rate limit exceeded
            if (allRepos.length > 0) {
              // If we already collected some pages, use them
              break;
            }
            throw new Error('GitHub API rate limit exceeded.');
          }
          throw new Error(`GitHub API request failed with status: ${response.status}`);
        }

          const data: GitHubRepoItem[] = await response.json();
          if (!Array.isArray(data) || data.length === 0) {
            break;
          }

          allRepos.push(...data);

          // If less than 100 items returned, this was the last page
          if (data.length < 100) {
            break;
          }
        }

        return allRepos
          .filter((repo) => !repo.archived) // exclude archived repositories
          .map((repo): UnifiedProject => {
            const topics = Array.isArray(repo.topics) ? repo.topics : [];
            const lowerTopics = topics.map((t) => t.toLowerCase());
            const lowerLang = (repo.language || '').toLowerCase();

            let category = 'software';
            if (
              lowerTopics.some((t) => t.includes('game') || t.includes('unity') || t.includes('unreal') || t.includes('godot')) ||
              lowerLang === 'c#' ||
              lowerLang === 'c++'
            ) {
              category = 'game';
            } else if (
              lowerTopics.some((t) => t.includes('ai') || t.includes('llm') || t.includes('machine-learning') || t.includes('gpt'))
            ) {
              category = 'ai';
            } else if (
              lowerTopics.some((t) => t.includes('tool') || t.includes('cli') || t.includes('automation'))
            ) {
              category = 'tool';
            } else if (
              lowerTopics.some((t) => t.includes('web') || t.includes('react') || t.includes('frontend'))
            ) {
              category = 'web';
            }

            return {
              id: `gh-${repo.id}`,
              provider: 'github',
              name: repo.name,
              fullName: repo.full_name,
              description: repo.description || '',
              htmlUrl: repo.html_url,
              homepageUrl: repo.homepage || null,
              language: repo.language || 'Code',
              topics: topics,
              stars: repo.stargazers_count || 0,
              forks: repo.forks_count || 0,
              updatedAt: repo.updated_at,
              createdAt: repo.created_at,
              isFork: repo.fork,
              visibility: repo.visibility || 'public',
              category,
              featured: false,
            };
          });
      }
