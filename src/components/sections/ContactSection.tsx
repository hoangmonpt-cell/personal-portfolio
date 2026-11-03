import React, { useState } from 'react';
import { useI18n } from '../../i18n';
import { profileData } from '../../data/profile';
import { hudSound } from '../../utils/sound';
import { 
  Mail, 
  FileText, 
  Copy, 
  Check, 
  Send, 
  Radio
} from 'lucide-react';
import { GithubIcon, GitlabIcon, LinkedinIcon } from '../ui/Icons';

export const ContactSection: React.FC = () => {
  const { lang, t } = useI18n();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    hudSound.playSuccess();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(profileData.socialLinks.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="contact" className="py-20 border-t border-slate-800 bg-[#0a0d14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="space-y-2 mb-12">
          <p className="font-mono text-xs text-[#00f0ff] tracking-widest uppercase">
            {t.contact.sectionTag}
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.contact.sectionTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {t.contact.sectionDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Direct Frequency / Email Card */}
          <div className="lg:col-span-6 hud-panel p-6 sm:p-8 space-y-6">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#00ff88]">
              <Radio className="w-4 h-4 animate-pulse" />
              <span>{t.contact.statusAvailable}</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white font-mono flex items-center space-x-2">
                <Mail className="w-5 h-5 text-[#00f0ff]" />
                <span>{t.contact.emailLabel}</span>
              </h3>
              <p className="text-sm font-mono text-slate-300 bg-slate-950 p-3 border border-slate-800 select-all break-all">
                {profileData.socialLinks.email}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => hudSound.playHover()}
                className="hud-btn-primary px-4 py-2.5 text-xs font-mono flex items-center space-x-2"
              >
                {copied ? <Check className="w-4 h-4 text-[#00ff88]" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? t.contact.copySuccess : t.contact.copyEmail}</span>
              </button>

              <a
                href={`mailto:${profileData.socialLinks.email}`}
                onClick={() => hudSound.playClick()}
                onMouseEnter={() => hudSound.playHover()}
                className="hud-btn-secondary px-4 py-2.5 text-xs font-mono flex items-center space-x-2"
              >
                <Send className="w-4 h-4 text-[#00f0ff]" />
                <span>{t.contact.sendMailDirect}</span>
              </a>
            </div>

            <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-800">
              * Tuyệt đối không tạo form submit giả để tránh thất lạc thông điệp. Sử dụng mailto giao tiếp trực tiếp.
            </div>
          </div>

          {/* Social Profiles & Career Links */}
          <div className="lg:col-span-6 hud-panel p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-white font-mono border-b border-slate-800 pb-2">
              {t.contact.socialLabel}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* GitHub */}
              <a
                href={profileData.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => hudSound.playClick()}
                onMouseEnter={() => hudSound.playHover()}
                className="p-4 bg-slate-950/80 border border-slate-800 hover:border-[#00f0ff] transition-all flex items-center space-x-3 group"
              >
                <div className="p-2 border border-slate-700 bg-slate-900 group-hover:border-[#00f0ff] transition-colors">
                  <GithubIcon className="w-5 h-5 text-white group-hover:text-[#00f0ff]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-mono">GitHub</div>
                  <div className="text-[11px] text-slate-400 font-mono">hoangmonpt-cell</div>
                </div>
              </a>

              {/* GitLab */}
              <a
                href={profileData.socialLinks.gitlab}
                target="_blank"
                rel="noreferrer"
                onClick={() => hudSound.playClick()}
                onMouseEnter={() => hudSound.playHover()}
                className="p-4 bg-slate-950/80 border border-slate-800 hover:border-[#ffb800] transition-all flex items-center space-x-3 group"
              >
                <div className="p-2 border border-slate-700 bg-slate-900 group-hover:border-[#ffb800] transition-colors">
                  <GitlabIcon className="w-5 h-5 text-white group-hover:text-[#ffb800]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-mono">GitLab</div>
                  <div className="text-[11px] text-slate-400 font-mono">Open Source</div>
                </div>
              </a>

              {/* LinkedIn (nếu có profile xác minh) */}
              {Boolean(profileData.socialLinks.linkedin && !profileData.socialLinks.linkedin.includes('[')) && (
                <a
                  href={profileData.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => hudSound.playClick()}
                  onMouseEnter={() => hudSound.playHover()}
                  className="p-4 bg-slate-950/80 border border-slate-800 hover:border-[#00f0ff] transition-all flex items-center space-x-3 group"
                >
                  <div className="p-2 border border-slate-700 bg-slate-900 group-hover:border-[#00f0ff] transition-colors">
                    <LinkedinIcon className="w-5 h-5 text-white group-hover:text-[#00f0ff]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white font-mono">LinkedIn</div>
                    <div className="text-[11px] text-slate-400 font-mono">Connect Profile</div>
                  </div>
                </a>
              )}

              {/* CV Document (nếu đã có file) */}
              {Boolean(profileData.socialLinks.cvUrl && profileData.socialLinks.cvUrl !== '#') && (
                <a
                  href={lang === 'vi' ? './documents/cv-vi.pdf' : './documents/cv-en.pdf'}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => hudSound.playClick()}
                  onMouseEnter={() => hudSound.playHover()}
                  className="p-4 bg-slate-950/80 border border-slate-800 hover:border-[#00ff88] transition-all flex items-center space-x-3 group"
                >
                  <div className="p-2 border border-slate-700 bg-slate-900 group-hover:border-[#00ff88] transition-colors">
                    <FileText className="w-5 h-5 text-white group-hover:text-[#00ff88]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white font-mono">
                      {lang === 'vi' ? 'Hồ sơ năng lực (CV)' : 'Resume (CV)'}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {lang === 'vi' ? 'Bản PDF Tiếng Việt' : 'English PDF Version'}
                    </div>
                  </div>
                </a>
              )}
            </div>

            <div className="text-xs font-mono text-slate-400 bg-slate-950/60 p-3 border-l-2 border-[#00f0ff]">
              {lang === 'vi' 
                ? 'Phản hồi nhanh qua Email hoặc GitHub. Luôn sẵn sàng trao đổi chi tiết về các cơ hội Game Development & kỹ thuật.'
                : 'Direct response via Email or GitHub. Always open to discussing Game Development and software engineering opportunities.'}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
