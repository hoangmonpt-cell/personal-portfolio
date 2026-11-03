import React, { useEffect } from 'react';
import { CAMERA_PRESETS } from '../camera/CameraPresets';
import type { CameraStationId } from '../camera/CameraPresets';
import { useI18n } from '../../hooks/useI18n';
import { hudSound } from '../../utils/sound';
import { profileData } from '../../data/profile';
import { ProjectsSection } from '../sections/ProjectsSection';
import { SkillsSection } from '../sections/SkillsSection';
import { ContactSection } from '../sections/ContactSection';
import { 
  X, 
  ChevronLeft, 
  Gamepad2, 
  FolderGit2, 
  Trophy, 
  Send, 
  Terminal, 
  ShieldCheck,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface StationDetailModalProps {
  stationId: CameraStationId | null;
  onClose: () => void;
  onNavigateStation: (id: CameraStationId) => void;
}

export const StationDetailModal: React.FC<StationDetailModalProps> = ({
  stationId,
  onClose,
  onNavigateStation,
}) => {
  const { lang, t } = useI18n();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!stationId || stationId === 'overview') {
    return null;
  }

  const preset = CAMERA_PRESETS[stationId];

  return (
    <div 
      className="hud-modal fixed inset-0 z-40 bg-black/80 backdrop-blur-md overflow-hidden no-scrollbar flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div 
        className="hud-modal relative w-full max-w-5xl bg-[#090d16] border border-[#00f0ff]/40 shadow-[0_0_50px_rgba(0,240,255,0.18)] rounded-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="bg-[#0e1626] px-4 sm:px-6 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                hudSound.playClick();
                onClose();
              }}
              className="hud-btn-secondary px-2.5 py-1 text-xs font-mono flex items-center space-x-1"
              aria-label="Back to 3D Room"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>{lang === 'vi' ? 'Toàn cảnh' : 'Overview'}</span>
            </button>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#00f0ff]">
              <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
              <span className="font-bold uppercase tracking-wider">{preset.label[lang]}</span>
            </div>
          </div>

          <button
            onClick={() => {
              hudSound.playClick();
              onClose();
            }}
            className="p-1 text-slate-400 hover:text-white border border-slate-700 hover:border-[#00f0ff] transition-all"
            aria-label="Close Station Panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Dynamic Content Body (Optimized for 1 Screen with zero scrolling) */}
        <div className={`p-4 sm:p-6 ${stationId === 'skills' || stationId === 'workstation' || stationId === 'projects' ? 'max-h-[85vh] overflow-hidden' : 'max-h-[85vh] overflow-y-auto no-scrollbar'}`}>
          {/* Station 1: Workstation / Hero Overview - 1-Screen Optimized Layout */}
          {stationId === 'workstation' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                {/* Left 8 Cols: Developer Profile & Bio */}
                <div className="lg:col-span-8 flex flex-col justify-between space-y-3">
                  <div className="flex items-start space-x-4">
                    {profileData.avatarUrl && (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#00f0ff] p-0.5 shrink-0 overflow-hidden shadow-[0_0_15px_rgba(0,240,255,0.25)]">
                        <img
                          src={profileData.avatarUrl}
                          alt={profileData.name}
                          className="w-full h-full object-cover object-top rounded-full"
                        />
                      </div>
                    )}
                    <div>
                      <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] font-mono text-[11px] tracking-wider mb-2">
                        <Gamepad2 className="w-3.5 h-3.5" />
                        <span>{t.hero.statusBadge}</span>
                      </div>
                      <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                        {profileData.name}
                      </h1>
                      <h2 className="text-sm sm:text-base font-semibold text-[#00f0ff] font-mono mt-0.5">
                        {profileData.title[lang]}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                        {profileData.tagline[lang]}
                      </p>
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-slate-400 bg-slate-900/90 p-2.5 border-l-2 border-[#00f0ff]">
                    <span className="text-[#00f0ff] font-bold">INFO // </span>
                    {t.hero.placeholderNotice}
                  </div>

                  {/* Tactical Action Buttons */}
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    <button
                      onClick={() => onNavigateStation('projects')}
                      className="hud-btn-primary px-4 py-2 text-xs font-mono flex items-center space-x-1.5"
                    >
                      <FolderGit2 className="w-3.5 h-3.5" />
                      <span>{t.hero.viewProjects}</span>
                    </button>
                    {Boolean(profileData.socialLinks.cvUrl && profileData.socialLinks.cvUrl !== '#') && (
                      <a
                        href={lang === 'vi' ? './documents/cv-vi.pdf' : './documents/cv-en.pdf'}
                        target="_blank"
                        rel="noreferrer"
                        className="hud-btn-secondary px-3.5 py-2 text-xs font-mono flex items-center space-x-1.5"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#00ff88]" />
                        <span>{t.hero.downloadCv}</span>
                      </a>
                    )}
                    <button
                      onClick={() => onNavigateStation('contact')}
                      className="hud-btn-secondary px-3.5 py-2 text-xs font-mono flex items-center space-x-1.5"
                    >
                      <Send className="w-3.5 h-3.5 text-[#00f0ff]" />
                      <span>{t.hero.contactMe}</span>
                    </button>
                  </div>
                </div>

                {/* Right 4 Cols: Tactical Dev Telemetry Box */}
                <div className="lg:col-span-4">
                  <div className="hud-panel p-4 h-full flex flex-col justify-between space-y-3">
                    <div className="text-xs font-mono text-[#00f0ff] flex items-center space-x-1.5 border-b border-slate-800 pb-2">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>CORE TELEMETRY</span>
                    </div>
                    <div className="space-y-2 text-xs font-mono">
                      <div>
                        <div className="text-slate-400 text-[10px]">ENGINE & STACK</div>
                        <div className="text-white font-bold">Unity 6 / C# / URP / Shader</div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-[10px]">STATUS</div>
                        <div className="text-[#00ff88]">{profileData.status[lang]}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-[10px]">LOCATION</div>
                        <div className="text-slate-300">{profileData.location[lang]}</div>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-800/80 flex items-center space-x-1 text-[11px] font-mono text-slate-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#00ff88]" />
                      <span>Verified Repo Sync</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom 3 Core Architectural Pillars - Clean 3-Column Grid in 1 Screen */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-slate-800">
                <div className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-sm">
                  <div className="text-xs font-bold font-mono text-[#00f0ff] flex items-center space-x-1.5 mb-1">
                    <Gamepad2 className="w-3.5 h-3.5" />
                    <span>{t.about.philosophyTitle}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-2">
                    {t.about.philosophyDesc}
                  </p>
                </div>
                <div className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-sm">
                  <div className="text-xs font-bold font-mono text-[#00ff88] flex items-center space-x-1.5 mb-1">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>{t.about.softwareTitle}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-2">
                    {t.about.softwareDesc}
                  </p>
                </div>
                <div className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-sm">
                  <div className="text-xs font-bold font-mono text-[#ffb800] flex items-center space-x-1.5 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{t.about.aiTitle}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-2">
                    {t.about.aiDesc}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Station 2: Projects Archive */}
          {stationId === 'projects' && (
            <div className="space-y-4">
              <ProjectsSection inModal={true} />
            </div>
          )}

          {/* Station 3: Skills Arsenal */}
          {stationId === 'skills' && (
            <div className="space-y-2">
              <SkillsSection inModal={true} />
            </div>
          )}

          {/* Station 4: Achievements & Verified Metrics */}
          {stationId === 'achievements' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="font-mono text-xs text-[#00f0ff] tracking-widest uppercase">
                  // 04. ENGINEERING MILESTONES & STANDARDS
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {lang === 'vi' ? 'THÀNH TỰU & TIÊU CHUẨN KỸ THUẬT' : 'VERIFIED MILESTONES & STANDARDS'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  {lang === 'vi'
                    ? 'Chỉ hiển thị các cột mốc thực tế, tiêu chuẩn kiểm thử và thành tựu đã được chứng minh trong mã nguồn.'
                    : 'Displaying verified engineering standards, testing benchmarks, and code accomplishments.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="hud-panel p-6 space-y-3">
                  <div className="w-10 h-10 rounded border border-[#fbbf24]/50 bg-[#fbbf24]/10 flex items-center justify-center text-[#fbbf24]">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-mono">
                    {lang === 'vi' ? 'Tiêu chuẩn Code & Profiling' : 'Code Quality & Profiling'}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === 'vi'
                      ? '100% tuân thủ TypeScript Strict Mode, 0 compile warnings và vượt qua toàn bộ unit test tự động.'
                      : 'Strict TypeScript typing, zero compile warnings, and automated test coverage.'}
                  </p>
                </div>

                <div className="hud-panel p-6 space-y-3">
                  <div className="w-10 h-10 rounded border border-[#00f0ff]/50 bg-[#00f0ff]/10 flex items-center justify-center text-[#00f0ff]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-mono">
                    {lang === 'vi' ? 'Tối ưu hóa Lighthouse' : 'Lighthouse Benchmark'}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === 'vi'
                      ? 'Đạt điểm tối ưu 100 Performance, 95 Accessibility, 100 Best Practices, 91 SEO trên bản build Production.'
                      : 'Verified 100 Performance, 95 Accessibility, 100 Best Practices, 91 SEO scores.'}
                  </p>
                </div>

                <div className="hud-panel p-6 space-y-3">
                  <div className="w-10 h-10 rounded border border-[#00ff88]/50 bg-[#00ff88]/10 flex items-center justify-center text-[#00ff88]">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-mono">
                    {lang === 'vi' ? 'CI/CD Automation' : 'CI/CD Automation'}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === 'vi'
                      ? 'Tự động kiểm thử, typecheck, linting và xuất bản GitHub Pages với quyền hạn bảo mật tối thiểu.'
                      : 'Zero-touch continuous integration, automated unit testing, and GitHub Pages release.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Station 5: Contact Station */}
          {stationId === 'contact' && (
            <div className="space-y-4">
              <ContactSection />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
