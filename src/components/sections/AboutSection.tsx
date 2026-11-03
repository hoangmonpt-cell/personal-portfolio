import React from 'react';
import { useI18n } from '../../i18n';
import { profileData } from '../../data/profile';
import { Gamepad, Layers, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { lang, t } = useI18n();

  return (
    <section id="about" className="py-20 border-t border-slate-800/80 bg-[#0c0f16]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <p className="font-mono text-xs text-[#00f0ff] tracking-widest uppercase">
            {t.about.sectionTag}
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.about.sectionTitle}
          </h2>
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-[#00ff88]" />
            <span>{profileData.location[lang]}</span>
          </div>
        </div>

        {/* Bio paragraphs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-8 space-y-4 text-slate-300 leading-relaxed text-base">
            {profileData.bio[lang].map((para, idx) => (
              <p 
                key={idx} 
                className={`p-3 rounded-sm ${
                  para.startsWith('[') ? 'bg-amber-950/20 border border-amber-500/30 text-amber-300 font-mono text-sm' : ''
                }`}
              >
                {para}
              </p>
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="hud-panel p-5 space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#00f0ff] flex items-center space-x-2 border-b border-slate-800 pb-2">
                <CheckCircle2 className="w-4 h-4 text-[#00ff88]" />
                <span>CORE METRICS // PROFILE</span>
              </h3>
              <div className="space-y-3 text-xs font-mono">
                <div>
                  <div className="text-slate-400">TARGET ROLE</div>
                  <div className="text-white font-bold">Game Developer / Software Engineer</div>
                </div>
                <div>
                  <div className="text-slate-400">SPECIALIZATION</div>
                  <div className="text-slate-200">Gameplay, System Architecture & AI Workflows</div>
                </div>
                <div>
                  <div className="text-slate-400">AVAILABILITY</div>
                  <div className="text-[#00ff88]">{profileData.status[lang]}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars: Game Dev, Software, AI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: Game Dev */}
          <div className="hud-panel p-6 space-y-3">
            <div className="w-10 h-10 rounded border border-[#00f0ff]/40 bg-[#00f0ff]/10 flex items-center justify-center text-[#00f0ff]">
              <Gamepad className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-mono">
              {t.about.philosophyTitle}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t.about.philosophyDesc}
            </p>
          </div>

          {/* Pillar 2: Software Engineering */}
          <div className="hud-panel p-6 space-y-3">
            <div className="w-10 h-10 rounded border border-[#00ff88]/40 bg-[#00ff88]/10 flex items-center justify-center text-[#00ff88]">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-mono">
              {t.about.softwareTitle}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t.about.softwareDesc}
            </p>
          </div>

          {/* Pillar 3: AI-Assisted */}
          <div className="hud-panel p-6 space-y-3">
            <div className="w-10 h-10 rounded border border-[#ffb800]/40 bg-[#ffb800]/10 flex items-center justify-center text-[#ffb800]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-mono">
              {t.about.aiTitle}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t.about.aiDesc}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

