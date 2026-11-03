import React from 'react';
import type { UnifiedProject } from '../../types/project';
import { useI18n } from '../../i18n';
import { hudSound } from '../../utils/sound';
import {
  Star,
  GitFork,
  ExternalLink,
  Code2,
  FileText,
  Gamepad2,
  Tag
} from 'lucide-react';
import { GithubIcon, GitlabIcon } from '../ui/Icons';

interface ProjectCardProps {
  project: UnifiedProject;
  onOpenCaseStudy?: (caseStudyId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenCaseStudy }) => {
  const { lang, t } = useI18n();

  const isGitHub = project.provider === 'github';
  const isFeatured = project.featured;

  // Use custom description if available, else raw description
  const descriptionText = project.customDescription
    ? project.customDescription[lang]
    : project.description || (lang === 'vi' ? 'Không có mô tả chi tiết từ kho lưu trữ.' : 'No repository description provided.');

  const formattedDate = new Date(project.updatedAt).toLocaleDateString(
    lang === 'vi' ? 'vi-VN' : 'en-US',
    { month: 'short', day: 'numeric', year: 'numeric' }
  );

  return (
    <div
      className={`hud-panel p-5 flex flex-col justify-between group transition-all duration-300 ${isFeatured
          ? 'border-[#00f0ff]/60 shadow-[0_0_20px_rgba(0,240,255,0.08)] bg-[#0d131f]/90'
          : 'bg-[#0a0d14]/80 hover:border-slate-500'
        }`}
    >
      <div>
        {/* Top Header: Provider & Badges */}
        <div className="flex items-center justify-between text-xs font-mono mb-3 border-b border-slate-800 pb-2">
          {/* Provider Badge */}
          <div className="flex items-center space-x-1.5">
            {isGitHub ? (
              <span className="flex items-center space-x-1 text-[#00f0ff] bg-[#00f0ff]/10 px-2 py-0.5 border border-[#00f0ff]/30 text-[10px]">
                <GithubIcon className="w-3 h-3" />
                <span>{t.projects.sourceGitHub}</span>
              </span>
            ) : (
              <span className="flex items-center space-x-1 text-[#ffb800] bg-[#ffb800]/10 px-2 py-0.5 border border-[#ffb800]/30 text-[10px]">
                <GitlabIcon className="w-3 h-3" />
                <span>{t.projects.sourceGitLab}</span>
              </span>
            )}

            {isFeatured && (
              <span className="flex items-center space-x-1 text-[#00ff88] bg-[#00ff88]/10 px-2 py-0.5 border border-[#00ff88]/40 text-[10px] font-bold">
                <Gamepad2 className="w-3 h-3 animate-pulse" />
                <span>{t.projects.featuredBadge}</span>
              </span>
            )}

            {project.isFork && (
              <span className="flex items-center space-x-1 text-slate-400 bg-slate-800/80 px-2 py-0.5 border border-slate-700 text-[10px]">
                <GitFork className="w-2.5 h-2.5 text-slate-400" />
                <span>{t.projects.forkBadge}</span>
              </span>
            )}
          </div>

          {/* Category Tag */}
          <span className="text-slate-400 uppercase text-[10px] tracking-wider">
            {project.category}
          </span>
        </div>

        {/* Project Name */}
        <h3 className="text-lg font-bold text-white group-hover:text-[#00f0ff] transition-colors mb-2 break-words">
          {project.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed">
          {descriptionText}
        </p>

        {/* Topics / Tech Tags */}
        {project.topics && project.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.topics.slice(0, 4).map((topic, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono px-2 py-0.5 bg-slate-900 text-slate-300 border border-slate-800 flex items-center space-x-1"
              >
                <Tag className="w-2.5 h-2.5 text-slate-500" />
                <span>{topic}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Info & Actions */}
      <div className="pt-3 border-t border-slate-800/80 space-y-3">
        {/* Repo Stats: Language, Stars, Forks, Date */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1 text-slate-300">
              <Code2 className="w-3 h-3 text-[#00f0ff]" />
              <span>{project.language}</span>
            </span>

            <span className="flex items-center space-x-1" title={t.projects.starsCount}>
              <Star className="w-3 h-3 text-amber-400" />
              <span>{project.stars}</span>
            </span>

            <span className="flex items-center space-x-1" title={t.projects.forksCount}>
              <GitFork className="w-3 h-3 text-slate-400" />
              <span>{project.forks}</span>
            </span>
          </div>

            <span className="text-[10px] text-slate-400">
              {formattedDate}
            </span>
        </div>

        {/* Interactive Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          {/* Source Code Link */}
          <a
            href={project.htmlUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => hudSound.playClick()}
            onMouseEnter={() => hudSound.playHover()}
            className="flex-1 hud-btn-secondary py-1.5 px-2 text-xs font-mono flex items-center justify-center space-x-1.5"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>{t.projects.openRepo}</span>
            <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
          </a>

          {/* Demo URL if present */}
          {project.homepageUrl && (
            <a
              href={project.homepageUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => hudSound.playClick()}
              onMouseEnter={() => hudSound.playHover()}
              className="hud-btn-primary py-1.5 px-3 text-xs font-mono flex items-center justify-center space-x-1"
            >
              <span>{t.projects.openDemo}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}

          {/* Case Study Link if available */}
          {project.caseStudyPath && onOpenCaseStudy && (
            <button
              onClick={() => {
                hudSound.playClick();
                onOpenCaseStudy(project.caseStudyPath!);
              }}
              onMouseEnter={() => hudSound.playHover()}
              className="hud-btn-primary py-1.5 px-3 text-xs font-mono flex items-center justify-center space-x-1 text-[#00ff88] border-[#00ff88]/50"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t.projects.caseStudyBtn}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
