import React, { useState, useEffect } from 'react';
import { useI18n } from '../../i18n';
import { profileData, skillsData } from '../../data/profile';
import { featuredProjectsConfig } from '../../data/featuredProjects';
import { scrollStore, type ScrollState } from './utils/scrollStore';
import { hudSound } from '../../utils/sound';
import { 
  Gamepad2, 
  FileText, 
  Send,
  Download,
  Copy,
  Check,
  ChevronDown
} from 'lucide-react';
import { GithubIcon, GitlabIcon } from '../ui/Icons';
import { CaseStudyModal } from '../projects/CaseStudyModal';

export const ScrollSectionOverlay: React.FC = () => {
  const { lang, t } = useI18n();
  const [scrollState, setScrollState] = useState<ScrollState>(() => scrollStore.getState());
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    return scrollStore.subscribe((state) => {
      setScrollState({ ...state });
    });
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    hudSound.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(profileData.socialLinks.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const activeIdx = scrollState.activeSectionIndex;

  // Filter skills by category for verified skill sections
  const gameDevSkills = skillsData.filter((s) => s.category === 'game-dev');
  const softwareSkills = skillsData.filter((s) => s.category === 'software-dev');
  const aiSkills = skillsData.filter((s) => s.category === 'ai-tools');

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex items-center justify-center p-4 sm:p-8 md:p-12 overflow-hidden">
      {/* ────────────────── SECTION 01: HERO ────────────────── */}
      <div
        className={`absolute max-w-3xl w-full transition-all duration-700 pointer-events-auto ${
          activeIdx === 0
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
        }`}
      >
        <div className="hud-panel p-6 sm:p-10 border border-[#00f0ff]/40 bg-[#0a0d14]/92 backdrop-blur-md rounded shadow-[0_0_40px_rgba(0,240,255,0.2)]">
          {/* Developer Header: Exact Avatar & Typography Layout as Image 2 (Avatar lifted up ~1/3 with centered face) */}
          <div className="flex items-center space-x-4 sm:space-x-5 mb-5 pb-4 border-b border-slate-800 pt-2 sm:pt-4">
            {profileData.avatarUrl && (
              <div className="relative -translate-y-1/3 flex-shrink-0">
                <img
                  src={profileData.avatarUrl}
                  alt={profileData.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#fbbf24] object-cover shadow-[0_0_20px_rgba(251,191,36,0.4)]"
                  style={{ objectPosition: 'center 15%' }}
                />
              </div>
            )}
            <div>
              <span className="text-xs font-mono text-[#fbbf24] tracking-widest uppercase block mb-1">
                // 01. {t.hero.statusBadge}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {profileData.name}
              </h1>
              <span className="text-xs sm:text-sm font-mono text-slate-400 block mt-1">
                {profileData.title[lang as 'vi' | 'en']}
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
            {profileData.tagline[lang as 'vi' | 'en']}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                hudSound.playClick();
                scrollStore.scrollToSection(1);
              }}
              className="px-5 py-2.5 bg-[#00f0ff] text-slate-950 font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center space-x-2 cursor-pointer"
            >
              <span>{t.hero.viewProjects}</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </button>

            <a
              href={lang === 'vi' ? './documents/cv-vi.pdf' : './documents/cv-en.pdf'}
              download={lang === 'vi' ? 'CV-BuiHuyHoang-GameDev-vi.pdf' : 'CV-BuiHuyHoang-GameDev-en.pdf'}
              onClick={() => hudSound.playClick()}
              className="px-5 py-2.5 border border-[#00ff88]/60 text-[#00ff88] bg-[#00ff88]/10 hover:bg-[#00ff88]/20 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>{t.hero.downloadCv}</span>
            </a>
          </div>

          {/* Scroll Down Invitation */}
          <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>{t.scroll3d.scrollPrompt}</span>
            <span className="text-[#00f0ff] animate-pulse">SCROLL ▼</span>
          </div>
        </div>
      </div>

      {/* ────────────────── SECTION 02: PROJECTS ────────────────── */}
      <div
        className={`absolute max-w-4xl w-full transition-all duration-700 pointer-events-auto ${
          activeIdx === 1
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
        }`}
      >
        <div className="hud-panel p-6 sm:p-8 border border-[#00f0ff]/40 bg-[#0a0d14]/92 backdrop-blur-md rounded shadow-[0_0_40px_rgba(0,0,0,0.8)]">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-[#00f0ff] tracking-widest uppercase">
                {t.projects.sectionTag}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {t.projects.sectionTitle}
              </h2>
            </div>
            <span className="px-2.5 py-1 rounded bg-[#00ff88]/15 border border-[#00ff88]/40 text-[#00ff88] text-[11px] font-mono">
              UNITY 6 LTS & REPO SYNC
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto no-scrollbar pr-1">
            {featuredProjectsConfig.map((fp) => (
              <div
                key={fp.repoName}
                className="bg-[#0b101b] border border-slate-800 hover:border-[#00f0ff]/60 p-4 rounded transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#00ff88] flex items-center space-x-1.5">
                      <Gamepad2 className="w-3.5 h-3.5" />
                      <span>{fp.customTitle || fp.repoName}</span>
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase">
                      {fp.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {fp.customDescription?.[lang as 'vi' | 'en']}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                  {fp.caseStudyId ? (
                    <button
                      onClick={() => {
                        hudSound.playClick();
                        setSelectedCaseStudy(fp.caseStudyId || null);
                      }}
                      className="text-xs font-mono text-[#00f0ff] hover:underline flex items-center space-x-1 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>{t.projects.caseStudyBtn}</span>
                    </button>
                  ) : <div />}

                  <a
                    href={
                      fp.repoName === 'FortressIdle'
                        ? 'https://github.com/hoangmonpt-cell/FortressIdle'
                        : 'https://github.com/hoangmonpt-cell/personal-portfolio'
                    }
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => hudSound.playClick()}
                    className="text-xs font-mono text-slate-400 hover:text-white flex items-center space-x-1"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>{t.projects.openRepo}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ────────────────── SECTION 03: GAME DEVELOPMENT ────────────────── */}
      <div
        className={`absolute max-w-4xl w-full transition-all duration-700 pointer-events-auto ${
          activeIdx === 2
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
        }`}
      >
        <div className="hud-panel p-6 sm:p-8 border border-[#00ff88]/40 bg-[#0a0d14]/92 backdrop-blur-md rounded shadow-[0_0_40px_rgba(0,255,136,0.15)]">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-[#00ff88] tracking-widest uppercase">
                // 03. CORE SPECIALIZATION
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {lang === 'vi' ? 'HỆ THỐNG GAMEPLAY & VÒNG LẶP RUNTIME' : 'GAMEPLAY MECHANICS & RUNTIME LOOPS'}
              </h2>
            </div>
            <span className="px-2.5 py-1 rounded bg-[#00ff88]/15 border border-[#00ff88]/40 text-[#00ff88] text-[11px] font-mono">
              PRIMARY ROLE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto no-scrollbar pr-1">
            {gameDevSkills.map((sk, idx) => (
              <div
                key={`gamedev-sk-${idx}`}
                className="bg-[#0b101b] border border-slate-800 p-3.5 rounded"
              >
                <h3 className="text-xs font-mono font-bold text-white mb-1.5 flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" />
                  <span>{sk.name}</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-2.5">
                  {sk.description ? sk.description[lang as 'vi' | 'en'] : ''}
                </p>
                <div className="flex flex-wrap gap-1">
                  {sk.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-[#00ff88] border border-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ────────────────── SECTION 04: SOFTWARE ENGINEERING ────────────────── */}
      <div
        className={`absolute max-w-4xl w-full transition-all duration-700 pointer-events-auto ${
          activeIdx === 3
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
        }`}
      >
        <div className="hud-panel p-6 sm:p-8 border border-[#38bdf8]/40 bg-[#0a0d14]/92 backdrop-blur-md rounded shadow-[0_0_40px_rgba(56,189,248,0.15)]">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-[#38bdf8] tracking-widest uppercase">
                // 04. ENGINEERING FOUNDATIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {lang === 'vi' ? 'KIẾN TRÚC PHẦN MỀM & CLEAN CODE' : 'SOFTWARE ARCHITECTURE & PATTERNS'}
              </h2>
            </div>
            <span className="px-2.5 py-1 rounded bg-[#38bdf8]/15 border border-[#38bdf8]/40 text-[#38bdf8] text-[11px] font-mono">
              DESIGN PATTERNS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto no-scrollbar pr-1">
            {softwareSkills.map((sk, idx) => (
              <div
                key={`software-sk-${idx}`}
                className="bg-[#0b101b] border border-slate-800 p-3.5 rounded"
              >
                <h3 className="text-xs font-mono font-bold text-white mb-1.5 flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                  <span>{sk.name}</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-2.5">
                  {sk.description ? sk.description[lang as 'vi' | 'en'] : ''}
                </p>
                <div className="flex flex-wrap gap-1">
                  {sk.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-[#38bdf8] border border-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ────────────────── SECTION 05: AI WORKFLOW ────────────────── */}
      <div
        className={`absolute max-w-4xl w-full transition-all duration-700 pointer-events-auto ${
          activeIdx === 4
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
        }`}
      >
        <div className="hud-panel p-6 sm:p-8 border border-[#c084fc]/40 bg-[#0a0d14]/92 backdrop-blur-md rounded shadow-[0_0_40px_rgba(192,132,252,0.15)]">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-[#c084fc] tracking-widest uppercase">
                // 05. INTELLIGENT WORKSPACE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {lang === 'vi' ? 'QUY TRÌNH PHÁT TRIỂN ỨNG DỤNG AI' : 'AI-ASSISTED DEVELOPMENT PIPELINE'}
              </h2>
            </div>
            <span className="px-2.5 py-1 rounded bg-[#c084fc]/15 border border-[#c084fc]/40 text-[#c084fc] text-[11px] font-mono">
              ACCELERATION
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto no-scrollbar pr-1">
            {aiSkills.map((sk, idx) => (
              <div
                key={`ai-sk-${idx}`}
                className="bg-[#0b101b] border border-slate-800 p-3.5 rounded"
              >
                <h3 className="text-xs font-mono font-bold text-white mb-1.5 flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c084fc]" />
                  <span>{sk.name}</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-2.5">
                  {sk.description ? sk.description[lang as 'vi' | 'en'] : ''}
                </p>
                <div className="flex flex-wrap gap-1">
                  {sk.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-[#c084fc] border border-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ────────────────── SECTION 06: ABOUT ────────────────── */}
      <div
        className={`absolute max-w-3xl w-full transition-all duration-700 pointer-events-auto ${
          activeIdx === 5
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
        }`}
      >
        <div className="hud-panel p-6 sm:p-8 border border-[#fbbf24]/40 bg-[#0a0d14]/92 backdrop-blur-md rounded shadow-[0_0_40px_rgba(251,191,36,0.15)]">
          <div className="flex items-center space-x-4 mb-4 pb-3 border-b border-slate-800">
            {profileData.avatarUrl && (
              <img
                src={profileData.avatarUrl}
                alt={profileData.name}
                className="w-16 h-16 rounded-full border-2 border-[#fbbf24] object-cover shadow-lg"
                style={{ objectPosition: 'center 15%' }}
              />
            )}
            <div>
              <span className="text-xs font-mono text-[#fbbf24] tracking-widest uppercase">
                {t.about.sectionTag}
              </span>
              <h2 className="text-2xl font-extrabold text-white">
                {profileData.name}
              </h2>
              <span className="text-xs font-mono text-slate-400">
                {profileData.status[lang as 'vi' | 'en']}
              </span>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed max-h-[50vh] overflow-y-auto no-scrollbar pr-1">
            {profileData.bio[lang as 'vi' | 'en'].map((para, i) => (
              <p key={`about-p-${i}`}>{para}</p>
            ))}
          </div>
        </div>
      </div>

      {/* ────────────────── SECTION 07: CONTACT ────────────────── */}
      <div
        className={`absolute max-w-3xl w-full transition-all duration-700 pointer-events-auto ${
          activeIdx === 6
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
        }`}
      >
        <div className="hud-panel p-6 sm:p-10 border border-[#00ff88]/40 bg-[#0a0d14]/92 backdrop-blur-md rounded shadow-[0_0_50px_rgba(0,255,136,0.2)]">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
            <span className="text-xs font-mono text-[#00ff88] tracking-widest uppercase">
              {t.contact.sectionTag}
            </span>
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-[#00ff88]/15 border border-[#00ff88]/40 text-[#00ff88] font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-ping" />
              <span>{t.contact.statusAvailable}</span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-2">
            {t.contact.sectionTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            {t.contact.sectionDesc}
          </p>

          <div className="space-y-4">
            {/* Direct Email Box */}
            <div className="p-4 rounded bg-[#0c121e] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  {t.contact.emailLabel}
                </span>
                <span className="font-mono text-sm sm:text-base text-white font-bold">
                  {profileData.socialLinks.email}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded border border-slate-700 hover:border-[#00f0ff] text-xs font-mono text-slate-300 hover:text-white flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#00ff88]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? t.contact.copySuccess : t.contact.copyEmail}</span>
                </button>
                <a
                  href={`mailto:${profileData.socialLinks.email}`}
                  onClick={() => hudSound.playClick()}
                  className="px-3 py-1.5 rounded bg-[#00ff88] text-slate-950 font-mono text-xs font-bold flex items-center space-x-1.5 hover:bg-white transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.contact.sendMailDirect}</span>
                </a>
              </div>
            </div>

            {/* Repositories & CV Links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <a
                href={profileData.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => hudSound.playClick()}
                className="p-3 rounded bg-[#0c121e] border border-slate-800 hover:border-[#00f0ff] transition-all flex items-center space-x-2.5 text-xs font-mono text-slate-200"
              >
                <GithubIcon className="w-4 h-4 text-[#00f0ff]" />
                <span>GitHub Repos</span>
              </a>

              <a
                href={profileData.socialLinks.gitlab}
                target="_blank"
                rel="noreferrer"
                onClick={() => hudSound.playClick()}
                className="p-3 rounded bg-[#0c121e] border border-slate-800 hover:border-[#f97316] transition-all flex items-center space-x-2.5 text-xs font-mono text-slate-200"
              >
                <GitlabIcon className="w-4 h-4 text-[#f97316]" />
                <span>GitLab Projects</span>
              </a>

              <a
                href={lang === 'vi' ? './documents/cv-vi.pdf' : './documents/cv-en.pdf'}
                download={lang === 'vi' ? 'CV-BuiHuyHoang-GameDev-vi.pdf' : 'CV-BuiHuyHoang-GameDev-en.pdf'}
                onClick={() => hudSound.playClick()}
                className="p-3 rounded bg-[#0c121e] border border-[#00ff88]/50 hover:bg-[#00ff88]/10 transition-all flex items-center space-x-2.5 text-xs font-mono text-[#00ff88]"
              >
                <Download className="w-4 h-4" />
                <span>{t.hero.downloadCv}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedCaseStudy && (
        <CaseStudyModal
          caseStudyId={selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
        />
      )}
    </div>
  );
};
