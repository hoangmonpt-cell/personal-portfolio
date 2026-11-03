import type { UnifiedProject } from '../../types/project';

export interface GitLabProjectItem {
  id: number;
  name: string;
  name_with_namespace: string;
  description: string | null;
  web_url: string;
  topics?: string[];
  tag_list?: string[];
  star_count: number;
  forks_count: number;
  last_activity_at: string;
  created_at: string;
  archived?: boolean;
  visibility?: string;
  default_branch?: string;
}

/**
 * Robust GitLab project synchronization:
 * 1. Checks if username is numeric ID.
 * 2. If username string, resolves user numeric ID via `/api/v4/users?username={username}`.
 * 3. If no user found, attempts group project query via `/api/v4/groups/{username}/projects`.
 * 4. Supports pagination up to 100 projects per call.
 */
export async function fetchGitLabProjects(
  username: string,
  baseUrl: string = 'https://gitlab.com'
): Promise<UnifiedProject[]> {
  if (!username || username.trim() === '') {
    return [];
  }

  const cleanBase = baseUrl.replace(/\/+$/, '');
  const rawTarget = username.trim();

  let targetId: string | number = rawTarget;
  let isGroup = false;

  // If not a purely numeric ID, resolve ID from GitLab API
  if (!/^\d+$/.test(rawTarget)) {
    try {
      const userLookupRes = await fetch(`${cleanBase}/api/v4/users?username=${encodeURIComponent(rawTarget)}`);
      if (userLookupRes.ok) {
        const users = await userLookupRes.json();
        if (Array.isArray(users) && users.length > 0 && users[0].id) {
          targetId = users[0].id;
        } else {
          // If not found in users, check if it's a GitLab group/organization
          const groupLookupRes = await fetch(`${cleanBase}/api/v4/groups/${encodeURIComponent(rawTarget)}`);
          if (groupLookupRes.ok) {
            const group = await groupLookupRes.json();
            if (group && group.id) {
              targetId = group.id;
              isGroup = true;
            }
          }
        }
      }
    } catch {
      // Fallback to attempting direct query
    }
  }

  const endpoint = isGroup
    ? `${cleanBase}/api/v4/groups/${targetId}/projects?per_page=100&order_by=updated_at&visibility=public`
    : `${cleanBase}/api/v4/users/${targetId}/projects?per_page=100&order_by=updated_at&visibility=public`;

  const response = await fetch(endpoint);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`GitLab account or group "${rawTarget}" not found.`);
    }
    throw new Error(`GitLab API request failed with status: ${response.status}`);
  }

  const data: GitLabProjectItem[] = await response.json();

  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .filter((proj) => !proj.archived && !proj.name.includes('deletion_scheduled'))
    .map((proj): UnifiedProject => {
      const rawTopics = Array.isArray(proj.topics)
        ? proj.topics
        : Array.isArray(proj.tag_list)
          ? proj.tag_list
          : [];
      const lowerTopics = rawTopics.map((t) => t.toLowerCase());
      const lowerName = proj.name.toLowerCase();
      const lowerDesc = (proj.description || '').toLowerCase();

      let category = 'software';
      if (
        lowerTopics.some((t) => t.includes('game') || t.includes('unity') || t.includes('godot') || t.includes('unreal')) ||
        lowerName.includes('game') ||
        lowerDesc.includes('game') ||
        lowerName.includes('veldwild') ||
        lowerName.includes('ottershi')
      ) {
        category = 'game';
      } else if (
        lowerTopics.some((t) => t.includes('ai') || t.includes('ml') || t.includes('llm')) ||
        lowerName.includes('ai') ||
        lowerDesc.includes('ai')
      ) {
        category = 'ai';
      } else if (
        lowerTopics.some((t) => t.includes('tool') || t.includes('cli') || t.includes('devops')) ||
        lowerName.includes('tool')
      ) {
        category = 'tool';
      }

  return {
    id: `gl-${proj.id}`,
    provider: 'gitlab',
    name: proj.name,
    fullName: proj.name_with_namespace || proj.name,
    description: proj.description || '',
    htmlUrl: proj.web_url,
    homepageUrl: null,
    language: 'GitLab',
    topics: rawTopics,
    stars: proj.star_count || 0,
    forks: proj.forks_count || 0,
    updatedAt: proj.last_activity_at || proj.created_at || new Date().toISOString(),
    createdAt: proj.created_at || new Date().toISOString(),
    isFork: false,
    visibility: proj.visibility || 'public',
    category,
    featured: false,
  };
});
}
