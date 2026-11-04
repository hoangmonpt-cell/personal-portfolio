import React from 'react';
import { useI18n } from '../../i18n';
import { profileData } from '../../data/profile';
import { hudSound } from '../../utils/sound';
import {
  Gamepad2,
  FileText,
  Send,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Terminal
} from 'lucide-react';
import { GithubIcon, GitlabIcon } from '../ui/Icons';

interface HeroProps {
  onExploreProjects: () => void;
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroProps> = ({ onExploreProjects, onContactClick }) => {
  const { lang, t } = useI18n();

  return (
    <section id="hero" className="relative pt-12 pb-20 md:py-28 overflow-hidden hud-grid-bg">
      {/* Decorative HUD Elements */}
        <div className="absolute top-4 left-6 hidden lg:flex items-center space-x-2 text-[10px] font-mono text-slate-400">
          <Terminal className="w-3.5 h-3.5 text-[#00f0ff]" />
          <span>SYS_INIT // SEC_LAYER: ENABLED</span>
        </div>
        <div className="absolute top-4 right-6 hidden lg:flex items-center space-x-2 text-[10px] font-mono text-[#00ff88]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
          <span>STATUS: ACTIVE PROTOCOL</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* Main Info Column */}
            <div className="lg:col-span-8 space-y-6">

              {/* HUD Badge */}
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] font-mono text-xs tracking-wider">
                <Gamepad2 className="w-3.5 h-3.5 animate-pulse" />
                <span>{t.hero.statusBadge}</span>
              </div>

              {/* Profile Title & Name */}
              <div className="space-y-2">
                <p className="font-mono text-xs sm:text-sm text-[#00ff88] tracking-widest uppercase">
                  &lt;{t.hero.systemReady}&gt;
                </p>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                  {profileData.name}
                </h1>
                <h2 className="text-xl sm:text-2xl font-semibold text-[#00f0ff] font-mono">
                  {profileData.title[lang]}
                </h2>
              </div>

              {/* Tagline */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                {profileData.tagline[lang]}
              </p>

              {/* Notice for recruiter/user */}
              <div className="text-xs font-mono text-slate-400 bg-slate-900/80 p-3 border-l-2 border-[#00f0ff] max-w-2xl">
                <span className="text-[#00f0ff] font-bold">INFO // </span>
                {t.hero.placeholderNotice}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
                <button
                  onClick={() => {
                    hudSound.playClick();
                    onExploreProjects();
                  }}
                  onMouseEnter={() => hudSound.playHover()}
                  className="hud-btn-primary px-5 py-3 text-sm flex items-center space-x-2"
                >
                  <span>{t.hero.viewProjects}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                {Boolean(profileData.socialLinks.cvUrl && profileData.socialLinks.cvUrl !== '#') && (
                  <a
                    href={lang === 'vi' ? './documents/cv-vi.pdf' : './documents/cv-en.pdf'}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => hudSound.playClick()}
                    onMouseEnter={() => hudSound.playHover()}
                    className="hud-btn-secondary px-4 py-3 text-sm flex items-center space-x-2 font-mono"
                  >
                    <FileText className="w-4 h-4 text-[#00ff88]" />
                    <span>{t.hero.downloadCv}</span>
                  </a>
                )}

                <button
                  onClick={() => {
                    hudSound.playClick();
                    onContactClick();
                  }}
                  onMouseEnter={() => hudSound.playHover()}
                  className="hud-btn-secondary px-4 py-3 text-sm flex items-center space-x-2 font-mono"
                >
                  <Send className="w-4 h-4 text-[#00f0ff]" />
                  <span>{t.hero.contactMe}</span>
                </button>
              </div>

              {/* Quick Links */}
              <div className="flex items-center space-x-5 pt-3 text-xs font-mono text-slate-400">
                <a
                  href={profileData.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1 hover:text-[#00f0ff] transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>{t.hero.githubRepo}</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>

                <a
                  href={profileData.socialLinks.gitlab}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1 hover:text-[#ffb800] transition-colors"
                >
                  <GitlabIcon className="w-4 h-4" />
                  <span>{t.hero.gitlabRepo}</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>

            {/* Sci-Fi HUD Avatar / Diagnostic Terminal */}
            <div className="lg:col-span-4">
              <div className="hud-panel p-6 rounded-sm relative group">
                {/* Corner Accents */}
                <div className="text-[10px] font-mono text-slate-500 flex justify-between border-b border-slate-800 pb-2 mb-4">
                  <span>AVATAR_MODULE // v2.6</span>
                  <span className="text-[#00ff88]">SYS_OK</span>
                </div>

                {/* Avatar visual */}
                <div className="aspect-square w-full max-w-[280px] mx-auto bg-slate-950 border border-[#00f0ff]/40 flex flex-col items-center justify-center p-6 relative overflow-hidden">
                  {/* Tech scan lines */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00f0ff]/10 via-transparent to-transparent pointer-events-none" />
                  
                  {profileData.avatarUrl ? (
                    <div className="w-28 h-28 rounded-full border-2 border-[#00f0ff] p-1 mb-3 relative overflow-hidden shadow-[0_0_20px_rgba(0,240,255,0.3)] group-hover:border-[#00ff88] transition-colors">
                      <img
                        src={profileData.avatarUrl}
                        alt={profileData.name}
                        className="w-full h-full object-cover rounded-full"
                        style={{ objectPosition: 'center 15%' }}
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded border-2 border-dashed border-[#00f0ff] flex items-center justify-center mb-4 relative animate-pulse">
                      <Gamepad2 className="w-12 h-12 text-[#00f0ff]" />
                    </div>
                  )}

                  <div className="text-center space-y-1">
                    <div className="font-mono text-sm font-bold text-white tracking-widest">
                      {profileData.avatarPlaceholderText}
                    </div>
                    <div className="text-[11px] font-mono text-[#00ff88]">
                      {profileData.status[lang]}
                    </div>
                  </div>
                </div>

                {/* Diagnostic mini stats */}
                <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400">
                  <div className="flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00f0ff]" />
                    <span>C# / Unity: READY</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00ff88]" />
                    <span>CI/CD: ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
    </section>
  );
};
