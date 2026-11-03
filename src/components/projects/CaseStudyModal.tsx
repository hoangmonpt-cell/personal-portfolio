import React from 'react';
import { caseStudiesData } from '../../data/featuredProjects';
import { useI18n } from '../../i18n';
import { hudSound } from '../../utils/sound';
import { 
  X, 
  Layers, 
  CheckCircle, 
  AlertTriangle, 
  Lightbulb, 
  UserCheck, 
  Activity, 
  ExternalLink 
} from 'lucide-react';
import { GithubIcon } from '../ui/Icons';

interface CaseStudyModalProps {
  caseStudyId: string | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ caseStudyId, onClose }) => {
  const { lang, t } = useI18n();

  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!caseStudyId) return null;

  const data = caseStudiesData[caseStudyId];
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto pointer-events-auto">
      {/* Dedicated full backdrop layer - clicking anywhere outside dialog closes modal */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity cursor-pointer z-0"
        aria-hidden="true"
        onClick={(e) => {
          e.stopPropagation();
          hudSound.playClick();
          onClose();
        }}
      />

      {/* Modal Centered Container */}
      <div className="relative min-h-screen flex items-center justify-center p-3 sm:p-6 pointer-events-none z-10">
        <div 
          className="relative w-full max-w-4xl bg-[#0b0f19] border border-[#00f0ff]/50 shadow-[0_0_50px_rgba(0,240,255,0.2)] rounded-sm overflow-hidden my-6 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top HUD Bar */}
          <div className="bg-[#0e1626] px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#00f0ff]">
              <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
              <span className="tracking-widest uppercase">CASE STUDY // SPECIFICATION</span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                hudSound.playClick();
                onClose();
              }}
              className="p-1.5 text-slate-400 hover:text-white border border-slate-700 hover:border-[#00f0ff] transition-all cursor-pointer"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
          {/* Header Title */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {data.title}
            </h2>
            <p className="text-sm sm:text-base font-mono text-[#00f0ff]">
              {data.subtitle[lang]}
            </p>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2">
            {data.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-xs font-mono bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Overview & Goal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="hud-panel p-5 space-y-2">
              <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                // 01. OVERVIEW
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {data.overview[lang]}
              </p>
            </div>

            <div className="hud-panel p-5 space-y-2">
              <h3 className="text-xs font-mono text-[#00ff88] uppercase tracking-wider">
                // 02. OBJECTIVE & GOAL
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {data.goal[lang]}
              </p>
            </div>
          </div>

          {/* Architecture */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 font-mono">
              <Layers className="w-4 h-4 text-[#00f0ff]" />
              <span>{t.caseStudy.architecture}</span>
            </h3>
            <ul className="space-y-2">
              {data.architecture[lang].map((item, idx) => (
                <li key={idx} className="text-sm text-slate-300 flex items-start space-x-2">
                  <span className="text-[#00f0ff] font-mono mt-0.5">&gt;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Features */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 font-mono">
              <CheckCircle className="w-4 h-4 text-[#00ff88]" />
              <span>{t.caseStudy.features}</span>
            </h3>
            <ul className="space-y-2">
              {data.keyFeatures[lang].map((item, idx) => (
                <li key={idx} className="text-sm text-slate-300 flex items-start space-x-2">
                  <span className="text-[#00ff88] font-mono mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges & Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Challenges */}
            <div className="p-5 border border-amber-500/30 bg-amber-950/10 space-y-3">
              <h3 className="text-sm font-bold text-amber-400 flex items-center space-x-2 font-mono">
                <AlertTriangle className="w-4 h-4" />
                <span>{t.caseStudy.challenges}</span>
              </h3>
              <ul className="space-y-2">
                {data.challenges[lang].map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-300 leading-relaxed">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div className="p-5 border border-[#00ff88]/30 bg-[#00ff88]/5 space-y-3">
              <h3 className="text-sm font-bold text-[#00ff88] flex items-center space-x-2 font-mono">
                <Lightbulb className="w-4 h-4" />
                <span>{t.caseStudy.solutions}</span>
              </h3>
              <ul className="space-y-2">
                {data.solutions[lang].map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-300 leading-relaxed">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Personal Contribution */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 font-mono">
              <UserCheck className="w-4 h-4 text-[#00f0ff]" />
              <span>{t.caseStudy.contributions}</span>
            </h3>
            <ul className="space-y-2">
              {data.personalContribution[lang].map((item, idx) => (
                <li key={idx} className="text-sm text-slate-300 flex items-start space-x-2">
                  <span className="text-[#00f0ff] font-mono mt-0.5">&gt;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Testing Results */}
          <div className="p-4 bg-slate-900 border-l-2 border-[#00ff88] space-y-1">
            <div className="text-xs font-mono text-[#00ff88] flex items-center space-x-1.5">
              <Activity className="w-3.5 h-3.5" />
              <span>{t.caseStudy.testing}</span>
            </div>
            <p className="text-xs text-slate-300 font-mono">
              {data.testingResults[lang]}
            </p>
          </div>

          {/* Bottom Action Links */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-4">
            <a
              href={data.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="hud-btn-primary px-4 py-2 text-xs font-mono flex items-center space-x-2"
            >
              <GithubIcon className="w-4 h-4" />
              <span>{t.projects.openRepo}</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {data.liveUrl && (
              <a
                href={data.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="hud-btn-secondary px-4 py-2 text-xs font-mono flex items-center space-x-2"
              >
                <span>{t.projects.openDemo}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
