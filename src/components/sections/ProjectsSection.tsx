import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { UnifiedProject } from '../../types/project';
import { syncAllProjects } from '../../services/projectSync/projectSyncService';
import { profileData } from '../../data/profile';
import { CaseStudyModal } from '../projects/CaseStudyModal';
import { CoverflowCarousel } from '../ui/CoverflowCarousel';
import { useI18n } from '../../i18n';
import { hudSound } from '../../utils/sound';
import {
  RotateCw,
  FolderGit2,
  Gamepad2,
  Terminal,
  Sparkles,
  Tag,
  Star,
  ExternalLink,
  FileText,
  SlidersHorizontal,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  Code2
} from 'lucide-react';

const ITEMS_PER_PAGE = 6;

interface ProjectsSectionProps {
  inModal?: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ inModal = false }) => {
  const { lang, t } = useI18n();
  const [layoutMode, setLayoutMode] = useState<'coverflow' | 'grid'>('coverflow');

  const [projects, setProjects] = useState<UnifiedProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isCached, setIsCached] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeCaseStudyId, setActiveCaseStudyId] = useState<string | null>(null);
  const [syncErrors, setSyncErrors] = useState<string[]>([]);

  // Robust username resolution: Environment variable -> Profile link -> Default fallback
  const githubUser = useMemo(() => {
    if (import.meta.env.VITE_GITHUB_USERNAME) return import.meta.env.VITE_GITHUB_USERNAME;
    const fromSocial = profileData.socialLinks.github.split('/').filter(Boolean).pop();
    return fromSocial && !fromSocial.includes('[') ? fromSocial : 'hoangmonpt-cell';
  }, []);

  const gitlabUser = useMemo(() => {
    if (import.meta.env.VITE_GITLAB_USERNAME) return import.meta.env.VITE_GITLAB_USERNAME;
    const fromSocial = profileData.socialLinks.gitlab.split('/').filter(Boolean).pop();
    return fromSocial && !fromSocial.includes('[') ? fromSocial : 'hoangmonpt-cell';
  }, []);

  const gitlabBaseUrl = import.meta.env.VITE_GITLAB_BASE_URL || 'https://gitlab.com';

  const loadProjects = useCallback(async (force: boolean = false) => {
    setLoading(true);
    try {
      const result = await syncAllProjects(githubUser, gitlabUser, gitlabBaseUrl, force);
      setProjects(result.projects);
      setIsCached(result.isCached);
      setSyncErrors(result.errors);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [githubUser, gitlabUser, gitlabBaseUrl]);

  useEffect(() => {
    loadProjects(false);
  }, [loadProjects]);

  // Categories list matching Skills Section styling
  const categories = [
    { id: 'all', label: lang === 'vi' ? 'TẤT CẢ' : 'ALL REPOS' },
    { id: 'featured', label: lang === 'vi' ? '⭐ NỔI BẬT' : '⭐ FEATURED' },
    { id: 'game', label: 'GAME DEV' },
    { id: 'software', label: 'SOFTWARE' },
    { id: 'ai', label: 'AI & TOOLS' },
  ];

  // Filter & Sort: Featured projects are ALWAYS sorted at the very top!
  const filteredProjects = useMemo(() => {
    return projects
      .filter((p) => {
        if (selectedCategory === 'all') return true;
        if (selectedCategory === 'featured') return p.featured;
        if (selectedCategory === 'ai') return p.category === 'ai' || p.category === 'tool';
        return p.category === selectedCategory;
      })
      .sort((a, b) => {
        // 1. Featured projects ALWAYS prominent on top
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        // 2. Stars
        if (b.stars !== a.stars) return b.stars - a.stars;
        // 3. Date
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });
  }, [projects, selectedCategory]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE) || 1;
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  return (
    <section id="projects" className={`${inModal ? 'py-2' : 'py-12 sm:py-16 border-t border-slate-800 hud-grid-bg relative'}`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        
        {/* Header & Filter Pills (Unified with Skills Section) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <p className="font-mono text-[11px] text-[#00f0ff] tracking-widest uppercase">
                {t.projects.sectionTag}
              </p>
              {isCached && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 bg-slate-800 text-slate-400 border border-slate-700 rounded-xs">
                  {t.projects.cachedBadge}
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.projects.sectionTitle}
            </h2>
            <p className="text-[11px] font-mono text-slate-400 mt-1">
              {t.projects.sectionDesc}
            </p>
          </div>

          {/* Filter Pills & Controls */}
          <div className="flex items-center flex-wrap gap-1.5">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    hudSound.playClick();
                    setSelectedCategory(cat.id);
                    setCurrentPage(1);
                  }}
                  onMouseEnter={() => hudSound.playHover()}
                  className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider transition-all border ${
                    isActive
                      ? 'border-[#00f0ff] bg-[#00f0ff]/20 text-[#00f0ff] font-bold shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                      : 'border-slate-700 bg-slate-900/60 text-slate-400 hover:text-white hover:border-slate-500'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}

            {/* Sync Refresh Button */}
            <button
              onClick={() => {
                hudSound.playClick();
                loadProjects(true);
              }}
              disabled={loading}
              title={syncErrors.length > 0 ? `Trạng thái: ${syncErrors.join(' | ')} (Click để đồng bộ lại)` : (isCached ? "Dữ liệu từ cache (Click để làm mới từ API)" : "Làm mới đồng bộ từ GitHub/GitLab")}
              className="p-1 border border-slate-700 bg-slate-900/80 text-slate-400 hover:text-[#00f0ff] hover:border-[#00f0ff] transition-all ml-1 relative"
            >
              <RotateCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#00f0ff]' : ''}`} />
              {syncErrors.length > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 animate-pulse" title={syncErrors.join('; ')} />
              )}
            </button>

            {/* Layout Toggle (Only in 2D mode) */}
            {!inModal && (
              <button
                onClick={() => {
                  hudSound.playClick();
                  setLayoutMode((m) => (m === 'coverflow' ? 'grid' : 'coverflow'));
                }}
                className="p-1 border border-slate-700 bg-slate-900/80 text-slate-400 hover:text-[#00f0ff] transition-all"
                title="Toggle Coverflow / Grid View"
              >
                {layoutMode === 'coverflow' ? <LayoutGrid className="w-3.5 h-3.5" /> : <SlidersHorizontal className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="h-[330px] flex flex-col items-center justify-center font-mono space-y-2">
            <div className="w-8 h-8 border-2 border-[#00f0ff] border-t-transparent rounded-full animate-spin" />
            <span className="text-[11px] text-[#00f0ff] tracking-widest uppercase">
              {t.projects.loading}
            </span>
          </div>
        )}

        {/* Projects 3D Coverflow Carousel (Designed Identical to Skills Section) */}
        {!loading && filteredProjects.length > 0 && (
          layoutMode === 'coverflow' ? (
            <CoverflowCarousel
              items={filteredProjects}
              keyExtractor={(project) => project.id}
              heightClass="h-[340px] sm:h-[370px]"
              renderItem={(project, _idx, isCenter) => {
                const isGame = project.category === 'game';
                const isAi = project.category === 'ai' || project.category === 'tool';
                const accentColor = isGame ? '#00f0ff' : isAi ? '#ffb800' : '#00ff88';

                return (
                  <div
                    className={`w-full h-full p-5 sm:p-6 flex flex-col justify-between hud-panel transition-all rounded-sm ${
                      isCenter
                        ? 'bg-gradient-to-b from-[#10192a] to-[#080d16] border-[#00f0ff] shadow-[0_20px_40px_rgba(0,0,0,0.7),0_0_30px_rgba(0,240,255,0.25)]'
                        : 'bg-[#0a0e17]/85 border-slate-800/80 opacity-90'
                    }`}
                  >
                    <div>
                      {/* Top Header: Category & Featured Status Badge */}
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2 border-b border-slate-800 pb-2">
                        <span className="flex items-center space-x-1" style={{ color: accentColor }}>
                          {isGame ? (
                            <Gamepad2 className="w-3.5 h-3.5" />
                          ) : isAi ? (
                            <Sparkles className="w-3.5 h-3.5" />
                          ) : (
                            <Terminal className="w-3.5 h-3.5" />
                          )}
                          <span className="uppercase font-bold">
                            {project.category === 'game' ? 'GAME-DEV' : project.category === 'ai' ? 'AI-TECH' : 'SOFTWARE'}
                          </span>
                        </span>

                        <div className="flex items-center space-x-1.5">
                          {project.featured && (
                            <span className="px-2 py-0.5 text-[10px] font-bold bg-[#00ff88]/15 border border-[#00ff88]/60 text-[#00ff88] rounded-xs flex items-center space-x-1 shadow-[0_0_8px_rgba(0,255,136,0.3)]">
                              <Star className="w-2.5 h-2.5 fill-[#00ff88]" />
                              <span>NỔI BẬT</span>
                            </span>
                          )}
                          <span className="text-[10px] text-slate-500 uppercase">{project.provider}</span>
                        </div>
                      </div>

                      {/* Project Name */}
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 leading-snug tracking-tight">
                        {project.name}
                      </h3>

                      {/* Project Description */}
                      <p className="text-xs text-slate-300 leading-relaxed mb-3 line-clamp-3">
                        {project.customDescription
                          ? project.customDescription[lang]
                          : project.description}
                      </p>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.topics.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center space-x-1 px-2 py-0.5 bg-slate-900/90 text-[10px] font-mono text-slate-300 border border-slate-800 rounded-sm"
                          >
                            <Tag className="w-2.5 h-2.5 text-[#00f0ff]" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Buttons (Source Code & Case Study) */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-800 mt-2">
                      <div className="flex items-center space-x-2">
                        <a
                          href={project.htmlUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="hud-btn-secondary px-3 py-1.5 text-[11px] font-mono flex items-center space-x-1.5 hover:text-white"
                        >
                          <Code2 className="w-3.5 h-3.5 text-[#00f0ff]" />
                          <span>Mã nguồn</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                        </a>

                        {project.caseStudyPath && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              hudSound.playClick();
                              setActiveCaseStudyId(project.caseStudyPath!);
                            }}
                            className="hud-btn-primary px-3 py-1.5 text-[11px] font-mono flex items-center space-x-1.5"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Case Study</span>
                          </button>
                        )}
                      </div>

                      <span className="text-[10px] font-mono text-slate-500">
                        {new Date(project.updatedAt).toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', {
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                );
              }}
            />
          ) : (
            /* Grid View (When in 2D classic view) */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProjects.map((project) => (
                <div key={project.id} className="hud-panel p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-2">
                    <span className="text-[#00f0ff] uppercase font-bold">{project.category}</span>
                    {project.featured && (
                      <span className="text-[#00ff88] text-[10px] font-bold">⭐ NỔI BẬT</span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white">{project.name}</h3>
                  <p className="text-xs text-slate-300 line-clamp-2">{project.description}</p>
                  <div className="flex items-center space-x-2 pt-2 border-t border-slate-800">
                    <a
                      href={project.htmlUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hud-btn-secondary px-3 py-1 text-xs font-mono flex items-center space-x-1"
                    >
                      <Code2 className="w-3 h-3 text-[#00f0ff]" />
                      <span>Mã nguồn</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {/* Empty State */}
        {!loading && filteredProjects.length === 0 && (
          <div className="hud-panel p-10 text-center space-y-3 max-w-md mx-auto">
            <FolderGit2 className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-white font-mono">{t.projects.emptyTitle}</h3>
            <p className="text-xs text-slate-400">{t.projects.emptyDesc}</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="hud-btn-primary px-3.5 py-1.5 text-xs font-mono"
            >
              Tất cả dự án
            </button>
          </div>
        )}

        {/* Pagination Controls for Grid Mode */}
        {!loading && layoutMode === 'grid' && totalPages > 1 && (
          <div className="flex items-center justify-center space-x-3 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="hud-btn-secondary p-1.5 text-xs font-mono disabled:opacity-40"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-300 px-3">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="hud-btn-secondary p-1.5 text-xs font-mono disabled:opacity-40"
              aria-label="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        caseStudyId={activeCaseStudyId}
        onClose={() => setActiveCaseStudyId(null)}
      />
    </section>
  );
};
