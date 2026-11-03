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
});
