import React, { useState } from 'react';
import { useI18n } from '../../i18n';
import { useTheme } from '../../hooks/useTheme';
import { hudSound } from '../../utils/sound';
import { Volume2, VolumeX, Globe, Menu, X, Terminal, Cpu, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onEnter3D?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate, onEnter3D }) => {
  const { lang, t, toggleLanguage } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const [audioActive, setAudioActive] = useState(() => hudSound.isEnabled());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAudioToggle = () => {
    const newState = hudSound.toggle();
    setAudioActive(newState);
  };

  const navItems = [
    { id: 'hero', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'skills', label: t.nav.skills },
    { id: 'projects', label: t.nav.projects },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleLinkClick = (id: string) => {
    hudSound.playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#0a0c10]/95 backdrop-blur-md border-b border-[#00f0ff]/30 shadow-[0_4px_25px_rgba(0,0,0,0.7)]">
      {onEnter3D && (
        <div className="bg-[#00ff88]/15 border-b border-[#00ff88]/30 px-4 py-1 text-center text-[11px] font-mono text-[#00ff88] flex items-center justify-center space-x-2">
          <span className="font-semibold tracking-wider">2D CLASSIC VIEW ENABLED</span>
          <button
            onClick={onEnter3D}
            className="underline hover:text-white font-bold ml-2 cursor-pointer transition-colors"
          >
            [ ENTER 3D DEVELOPER ROOM → ]
          </button>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between">
        {/* Brand Logo / Radar Sign */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => handleLinkClick('hero')}
        >
          <div className="w-8 h-8 rounded border border-[#00f0ff] flex items-center justify-center bg-[#00f0ff]/10 group-hover:bg-[#00f0ff]/20 transition-all">
            <Cpu className="w-4 h-4 text-[#00f0ff] animate-radar" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-sm font-bold tracking-wider text-slate-100 group-hover:text-[#00f0ff] transition-colors">
              GAMEDEV // CORE
            </span>
            <span className="font-mono text-[10px] text-[#00ff88] tracking-widest">
              STATUS: ONLINE
            </span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                onMouseEnter={() => hudSound.playHover()}
                className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-all relative ${
                  isActive
                    ? 'text-[#00f0ff] bg-[#00f0ff]/10 border border-[#00f0ff]/50'
                    : 'text-slate-300 hover:text-[#00f0ff] hover:bg-slate-800/50'
                }`}
              >
                {isActive && (
                  <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#00f0ff]" />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Tactical Controls: Sound & Language */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Sound Toggle */}
          <button
            onClick={handleAudioToggle}
            title={t.nav.soundToggle}
            className={`p-2 border text-xs font-mono transition-all flex items-center space-x-1 ${
              audioActive
                ? 'border-[#00ff88]/50 text-[#00ff88] bg-[#00ff88]/10'
                : 'border-slate-700 text-slate-500 hover:text-slate-300'
            }`}
          >
            {audioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline text-[10px]">SFX</span>
          </button>

          {/* Theme Toggle (Light / Dark) */}
          <button
            onClick={() => {
              hudSound.playClick();
              toggleTheme();
            }}
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            className={`p-2 border text-xs font-mono transition-all flex items-center space-x-1 ${
              theme === 'light'
                ? 'border-amber-400 text-amber-400 bg-amber-400/10'
                : 'border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Bilingual Switch */}
          <button
            onClick={() => {
              hudSound.playClick();
              toggleLanguage();
            }}
            className="px-2.5 py-1.5 border border-[#00f0ff]/40 text-[#00f0ff] bg-[#00f0ff]/5 hover:bg-[#00f0ff]/15 font-mono text-xs font-bold transition-all flex items-center space-x-1.5"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang.toUpperCase()}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-[#00f0ff]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#00f0ff]/20 bg-[#0a0c10]/95 px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className="w-full text-left px-3 py-2 font-mono text-sm tracking-wider text-slate-200 hover:text-[#00f0ff] hover:bg-slate-900 border-l-2 border-transparent hover:border-[#00f0ff] transition-all"
            >
              &gt; {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex items-center space-x-1">
            <Terminal className="w-3 h-3 text-[#00f0ff]" />
            <span>{t.nav.systemStatus}</span>
          </div>
        </div>
      )}
    </header>
  );
};

