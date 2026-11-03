import { describe, it, expect, beforeEach, vi } from 'vitest';
import { syncAllProjects } from '../services/projectSync/projectSyncService';
import { fetchGitLabProjects } from '../services/gitlab/gitlabService';

describe('Project Synchronizer Service', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('should return fallback projects when API fails or username returns error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')));

    const result = await syncAllProjects('non-existent-user-12345', undefined, undefined, true);

    expect(result.projects.length).toBeGreaterThan(0);
    expect(result.isFallback).toBe(true);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it('should successfully normalize GitHub API repositories', async () => {
    const mockGitHubData = [
      {
        id: 99999,
        name: 'space-shooter-unity',
        full_name: 'testuser/space-shooter-unity',
        description: '2D Space Shooter arcade game made in Unity and C#',
        html_url: 'https://github.com/testuser/space-shooter-unity',
        homepage: 'https://testuser.itch.io/space-shooter',
        language: 'C#',
        topics: ['unity', 'game', '2d-game'],
        stargazers_count: 15,
        forks_count: 2,
        updated_at: '2026-10-01T10:00:00Z',
        created_at: '2026-05-01T10:00:00Z',
        fork: false,
        visibility: 'public',
        archived: false,
      },
    ];

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockGitHubData,
    }));

    const result = await syncAllProjects('testuser', undefined, undefined, true);

    expect(result.projects.length).toBe(1);
    expect(result.projects[0].name).toBe('space-shooter-unity');
    expect(result.projects[0].category).toBe('game');
    expect(result.projects[0].provider).toBe('github');
    expect(result.projects[0].stars).toBe(15);
  });

  it('should resolve and normalize GitLab projects properly', async () => {
    const mockUserData = [{ id: 12345, username: 'gitlabuser' }];
    const mockProjectsData = [
      {
        id: 888,
        name: 'dungeon-crawler-godot',
        name_with_namespace: 'gitlabuser / dungeon-crawler-godot',
        description: 'Godot roguelite dungeon crawler game',
        web_url: 'https://gitlab.com/gitlabuser/dungeon-crawler-godot',
        topics: ['game', 'godot'],
        star_count: 22,
        forks_count: 5,
        last_activity_at: '2026-09-15T12:00:00Z',
        created_at: '2026-01-10T12:00:00Z',
        archived: false,
        visibility: 'public',
      },
    ];

    const fetchMock = vi.fn().mockImplementation((url: string) => {
      if (url.includes('/users?username=')) {
        return Promise.resolve({
          ok: true,
          json: async () => mockUserData,
        });
      }
      return Promise.resolve({
        ok: true,
        json: async () => mockProjectsData,
      });
    });

    vi.stubGlobal('fetch', fetchMock);

    const projects = await fetchGitLabProjects('gitlabuser');

    expect(projects.length).toBe(1);
    expect(projects[0].name).toBe('dungeon-crawler-godot');
    expect(projects[0].category).toBe('game');
    expect(projects[0].provider).toBe('gitlab');
    expect(projects[0].stars).toBe(22);
  });

  it('should filter out projects marked for deletion in GitLab', async () => {
    const mockUserData = [{ id: 12345, username: 'gitlabuser' }];
    const mockProjectsData = [
      {
        id: 111,
        name: 'real-game',
        name_with_namespace: 'gitlabuser / real-game',
        web_url: 'https://gitlab.com/gitlabuser/real-game',
        star_count: 5,
        forks_count: 0,
        last_activity_at: '2026-09-15T12:00:00Z',
        created_at: '2026-01-10T12:00:00Z',
        archived: false,
      },
      {
        id: 222,
        name: 'old-project-deletion_scheduled-123456',
        name_with_namespace: 'gitlabuser / old-project-deletion_scheduled-123456',
        web_url: 'https://gitlab.com/gitlabuser/old-project',
        star_count: 0,
        forks_count: 0,
        last_activity_at: '2026-09-15T12:00:00Z',
        created_at: '2026-01-10T12:00:00Z',
        archived: false,
      },
    ];

    vi.stubGlobal('fetch', vi.fn().mockImplementation((url: string) => {
      if (url.includes('/users?username=')) {
        return Promise.resolve({ ok: true, json: async () => mockUserData });
      }
      return Promise.resolve({ ok: true, json: async () => mockProjectsData });
    }));

    const projects = await fetchGitLabProjects('gitlabuser');
    expect(projects.length).toBe(1);
    expect(projects[0].name).toBe('real-game');
  });

  it('should recover cached provider projects on partial provider failure', async () => {
    // Prime cache with 1 GitHub and 1 GitLab project
    const initialCache = {
      timestamp: Date.now(),
      projects: [
        {
          id: 'gh-1',
          provider: 'github',
          name: 'gh-repo',
          fullName: 'user/gh-repo',
          description: '',
          htmlUrl: 'https://github.com/user/gh-repo',
          homepageUrl: null,
          language: 'TypeScript',
          topics: [],
          stars: 5,
          forks: 0,
          updatedAt: '2026-10-01T10:00:00Z',
          createdAt: '2026-01-01T10:00:00Z',
          isFork: false,
          visibility: 'public',
          category: 'software',
          featured: false,
        },
        {
          id: 'gl-2',
          provider: 'gitlab',
          name: 'gl-repo',
          fullName: 'user/gl-repo',
          description: '',
          htmlUrl: 'https://gitlab.com/user/gl-repo',
          homepageUrl: null,
          language: 'GitLab',
          topics: [],
          stars: 3,
          forks: 0,
          updatedAt: '2026-10-01T10:00:00Z',
          createdAt: '2026-01-01T10:00:00Z',
          isFork: false,
          visibility: 'public',
          category: 'software',
          featured: false,
        },
      ],
    };
    localStorage.setItem('portfolio_synced_projects_cache_v2', JSON.stringify(initialCache));

    // Simulate GitHub succeeding with a new repo, but GitLab failing with network error
    vi.stubGlobal('fetch', vi.fn().mockImplementation((url: string) => {
      if (url.includes('api.github.com')) {
        return Promise.resolve({
          ok: true,
          json: async () => [
            {
              id: 99,
              name: 'new-gh-repo',
              full_name: 'user/new-gh-repo',
              description: '',
              html_url: 'https://github.com/user/new-gh-repo',
              language: 'TypeScript',
              topics: [],
              stargazers_count: 10,
              forks_count: 0,
              updated_at: '2026-10-02T10:00:00Z',
              created_at: '2026-01-01T10:00:00Z',
              fork: false,
              visibility: 'public',
              archived: false,
            },
          ],
        });
      }
      return Promise.reject(new Error('GitLab down'));
    }));

    const result = await syncAllProjects('user', 'user', undefined, true);

    expect(result.projects.length).toBe(2);
    expect(result.projects.some((p) => p.name === 'new-gh-repo')).toBe(true);
    // Preserved cached GitLab repo
    expect(result.projects.some((p) => p.name === 'gl-repo')).toBe(true);
    expect(result.errors.length).toBe(1);
    expect(result.errors[0]).toContain('GitLab: GitLab down');
  });

  it('should deduplicate projects with duplicate keys', async () => {
    vi.stubGlobal('fetch', vi.fn().mockImplementation((url: string) => {
      if (url.includes('api.github.com')) {
        return Promise.resolve({
          ok: true,
          json: async () => [
            {
              id: 1,
              name: 'shared-repo',
              full_name: 'user/shared-repo',
              html_url: 'https://github.com/user/shared-repo',
              fork: false,
              archived: false,
            },
            {
              id: 1,
              name: 'shared-repo',
              full_name: 'user/shared-repo',
              html_url: 'https://github.com/user/shared-repo',
              fork: false,
              archived: false,
            },
          ],
        });
      }
      return Promise.resolve({ ok: true, json: async () => [] });
    }));

    const result = await syncAllProjects('user', undefined, undefined, true);
    expect(result.projects.filter((p) => p.name === 'shared-repo').length).toBe(1);
  });
});
