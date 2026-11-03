import React, { useState } from 'react';
import { useI18n } from '../../i18n';
import { skillsData } from '../../data/profile';
import { hudSound } from '../../utils/sound';
import { CoverflowCarousel } from '../ui/CoverflowCarousel';
import { Cpu, Terminal, Sparkles, Tag, Shield } from 'lucide-react';

interface SkillsSectionProps {
  inModal?: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ inModal = false }) => {
  const { lang, t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'game-dev' | 'software-dev' | 'ai-tools'>('all');

  const categories = [
    { id: 'all', label: t.skills.filterAll },
    { id: 'game-dev', label: t.skills.filterGame },
    { id: 'software-dev', label: t.skills.filterSoftware },
    { id: 'ai-tools', label: t.skills.filterAi },
  ];

  const filteredSkills = skillsData.filter((skill) => {
    if (selectedCategory === 'all') return true;
    return skill.category === selectedCategory;
  });

  return (
    <section id="skills" className={`${inModal ? 'py-2' : 'py-12 sm:py-16 border-t border-slate-800 hud-grid-bg'}`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        
        {/* Header & Filter Pills */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-3">
          <div>
            <p className="font-mono text-[11px] text-[#00f0ff] tracking-widest uppercase">
              {t.skills.sectionTag}
            </p>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.skills.sectionTitle}
            </h2>
            <p className="text-[11px] font-mono text-slate-400 mt-1">
              {t.skills.verifiedNotice}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    hudSound.playClick();
                    setSelectedCategory(cat.id as any);
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
          </div>
        </div>

        {/* 3-5 Card Coverflow Carousel (Optimized for 1 Screen) */}
        <CoverflowCarousel
          items={filteredSkills}
          keyExtractor={(skill, idx) => `${skill.name}-${idx}`}
          heightClass="h-[330px] sm:h-[360px]"
          renderItem={(skill, idx, isCenter) => {
            const isGame = skill.category === 'game-dev';
            const isAI = skill.category === 'ai-tools';
            const accentColor = isGame ? '#00f0ff' : isAI ? '#ffb800' : '#00ff88';

            return (
              <div
                className={`w-full h-full p-5 sm:p-6 flex flex-col justify-between hud-panel transition-all rounded-sm ${
                  isCenter
                    ? 'bg-gradient-to-b from-[#10192a] to-[#080d16] border-[#00f0ff] shadow-[0_20px_40px_rgba(0,0,0,0.7),0_0_30px_rgba(0,240,255,0.25)]'
                    : 'bg-[#0a0e17]/85 border-slate-800/80 opacity-90'
                }`}
              >
                <div>
                  {/* Category Indicator */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2 border-b border-slate-800 pb-2">
                    <span className="flex items-center space-x-1" style={{ color: accentColor }}>
                      {isGame ? <Cpu className="w-3.5 h-3.5" /> : isAI ? <Sparkles className="w-3.5 h-3.5" /> : <Terminal className="w-3.5 h-3.5" />}
                      <span className="uppercase font-bold">{skill.category}</span>
                    </span>
                    <span className="text-slate-500">MOD_ID: #{idx + 101}</span>
                  </div>

                  {/* Skill Name */}
                  <h3
                    className={`text-base sm:text-lg font-bold transition-colors mb-2 line-clamp-1 ${
                      isCenter ? 'text-[#00f0ff]' : 'text-white'
                    }`}
                  >
                    {skill.name}
                  </h3>

                  {/* Description */}
                  {skill.description && (
                    <p className="text-xs text-slate-300 mb-3 leading-relaxed line-clamp-3">
                      {skill.description[lang]}
                    </p>
                  )}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-slate-800/80">
                  {skill.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 text-[10px] font-mono bg-slate-900 text-slate-300 border border-slate-800 flex items-center space-x-1"
                    >
                      <Tag className="w-2.5 h-2.5 text-slate-500" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            );
          }}
        />

        {/* Minimal Bottom Notice */}
        <div className="mt-3 py-1.5 px-3 bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-[#00ff88] shrink-0" />
            <span className="line-clamp-1">
              {lang === 'vi' 
                ? 'Tiêu chuẩn: Năng lực thực chiến, tối ưu hóa runtime & code profiling.' 
                : 'Standards: Hands-on production capability, runtime optimization & profiling.'}
            </span>
          </div>
          <span className="text-slate-500 hidden sm:inline text-[10px]">
            {lang === 'vi' ? '← Vuốt hoặc phím mũi tên để chuyển →' : '← Swipe or arrow keys to navigate →'}
          </span>
        </div>

      </div>
    </section>
  );
};


