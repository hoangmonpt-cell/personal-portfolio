import React, { useState } from 'react';
import type { CameraStationId, CameraMode } from '../camera/CameraPresets';
import type { QualityTier } from '../3d/RoomLighting';
import { useI18n } from '../../hooks/useI18n';
import { useTheme } from '../../hooks/useTheme';
import { hudSound } from '../../utils/sound';
import { 
  Compass, 
  Volume2, 
  VolumeX, 
  Globe, 
  RotateCcw, 
  Monitor, 
  FolderGit2, 
  Cpu, 
  Trophy, 
  Send,
  Boxes,
  Eye,
  Sliders,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';

interface RoomHUDProps {
  activeStation: CameraStationId;
  cameraMode: CameraMode;
  qualityTier: QualityTier;
  viewMode: 'room' | 'scroll3d' | '3d' | '2d';
  onSelectStation: (id: CameraStationId) => void;
  onToggleCameraMode: () => void;
  onCycleQuality: () => void;
  onToggleViewMode: () => void;
  onResetCamera: () => void;
}

export const RoomHUD: React.FC<RoomHUDProps> = ({
  activeStation,
  cameraMode,
  qualityTier,
  viewMode,
  onSelectStation,
  onToggleCameraMode,
  onCycleQuality,
  onToggleViewMode,
  onResetCamera,
}) => {
  const { lang, toggleLanguage } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const [audioActive, setAudioActive] = useState(() => hudSound.isEnabled());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAudioToggle = () => {
    const newState = hudSound.toggle();
    setAudioActive(newState);
  };

  const stations: { id: CameraStationId; label: string; icon: any }[] = [
    { id: 'workstation', label: lang === 'vi' ? 'Bàn Dev' : 'Workstation', icon: Monitor },
    { id: 'projects', label: lang === 'vi' ? 'Dự án' : 'Projects', icon: FolderGit2 },
    { id: 'skills', label: lang === 'vi' ? 'Kỹ năng' : 'Skills', icon: Cpu },
    { id: 'achievements', label: lang === 'vi' ? 'Thành tích' : 'Milestones', icon: Trophy },
    { id: 'contact', label: lang === 'vi' ? 'Liên hệ' : 'Contact', icon: Send },
  ];

  return (
    <>
      {/* Top Floating Tactical Header */}
      <header className="fixed top-0 left-0 right-0 z-30 pointer-events-none p-3 sm:p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          
          {/* Brand & Room Status */}
          <div 
            onClick={onResetCamera}
            className="hud-panel px-3.5 py-2 flex items-center space-x-2.5 cursor-pointer group bg-[#0a0d14]/90"
          >
            <div className="w-6 h-6 rounded border border-[#00f0ff] flex items-center justify-center bg-[#00f0ff]/10 group-hover:bg-[#00f0ff]/20 transition-all">
              <Boxes className="w-3.5 h-3.5 text-[#00f0ff] animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold text-white group-hover:text-[#00f0ff] transition-colors">
                GAMEDEV // 3D ROOM
              </span>
              <span className="font-mono text-[9px] text-[#00ff88]">
                {cameraMode === 'guided' 
                  ? (lang === 'vi' ? 'CHẾ ĐỘ HƯỚNG DẪN' : 'GUIDED MODE')
                  : (lang === 'vi' ? 'TỰ DO KHÁM PHÁ' : 'FREE EXPLORATION')}
              </span>
            </div>
          </div>

          {/* Desktop Station Navigation Bar */}
          <nav className="hidden lg:flex items-center space-x-1.5 hud-panel px-3 py-1.5 bg-[#0a0d14]/90">
            {stations.map((st) => {
              const Icon = st.icon;
              const isActive = activeStation === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => {
                    hudSound.playClick();
                    onSelectStation(st.id);
                  }}
                  onMouseEnter={() => hudSound.playHover()}
                  className={`px-2.5 py-1 text-xs font-mono flex items-center space-x-1.5 border transition-all ${
                    isActive
                      ? 'border-[#00f0ff] bg-[#00f0ff]/20 text-[#00f0ff] font-bold shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                      : 'border-transparent text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{st.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Mode, Quality, 2D/3D, Sound, Lang */}
          <div className="flex items-center space-x-2">
            
            {/* Camera Mode Switcher */}
            <button
              onClick={() => {
                hudSound.playClick();
                onToggleCameraMode();
              }}
              title={lang === 'vi' ? 'Chuyển chế độ Camera (Guided / Explore)' : 'Switch Camera Mode (Guided / Explore)'}
              className={`hidden sm:flex items-center space-x-1 px-2.5 py-1.5 border text-xs font-mono transition-all hud-panel bg-[#0a0d14]/90 ${
                cameraMode === 'explore'
                  ? 'border-[#ffb800] text-[#ffb800] bg-[#ffb800]/10'
                  : 'border-[#00f0ff]/50 text-[#00f0ff]'
              }`}
            >
              <Compass className={`w-3.5 h-3.5 ${cameraMode === 'explore' ? 'animate-spin' : ''}`} />
              <span className="text-[11px] font-bold">{cameraMode.toUpperCase()}</span>
            </button>

            {/* Quality Tier Button */}
            <button
              onClick={() => {
                hudSound.playClick();
                onCycleQuality();
              }}
              title="Toggle Graphics Quality (Low / Med / High)"
              className="hidden md:flex items-center space-x-1 px-2.5 py-1.5 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white hud-panel bg-[#0a0d14]/90"
            >
              <Sliders className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span className="text-[11px]">{qualityTier.toUpperCase()}</span>
            </button>

            {/* EXPERIENCE SELECTOR BUTTON (3D ON: ROOM -> SCROLL 3D) */}
            <button
              data-mode={viewMode}
              onClick={() => {
                hudSound.playClick();
                onToggleViewMode();
              }}
              title={lang === 'vi' ? 'Chuyển sang Hành trình Cuộn 3D (Scroll 3D)' : 'Switch to Continuous 3D Scroll Journey'}
              className="px-2.5 py-1.5 border border-[#00f0ff] text-[#00f0ff] bg-[#00f0ff]/15 hover:bg-[#00f0ff]/25 font-mono text-xs font-bold transition-all flex items-center space-x-1.5 hud-panel cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.3)]"
            >
              <Boxes className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">3D:</span>
              <span>SCROLL ➔</span>
            </button>

            {/* SFX Audio */}
            <button
              onClick={handleAudioToggle}
              title="Toggle HUD Sound Effects"
              className={`p-1.5 border text-xs font-mono transition-all flex items-center hud-panel bg-[#0a0d14]/90 ${
                audioActive
                  ? 'border-[#00ff88]/50 text-[#00ff88]'
                  : 'border-slate-700 text-slate-500'
              }`}
            >
              {audioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Light / Dark Mode Toggle */}
            <button
              data-testid="theme-toggle"
              onClick={() => {
                hudSound.playClick();
                toggleTheme();
              }}
              title={
                theme === 'dark'
                  ? (lang === 'vi' ? 'Chuyển sang Chế độ Sáng' : 'Switch to Light Theme')
                  : (lang === 'vi' ? 'Chuyển sang Chế độ Tối' : 'Switch to Dark Theme')
              }
              aria-label={
                theme === 'dark'
                  ? (lang === 'vi' ? 'Chuyển sang Chế độ Sáng' : 'Switch to Light Theme')
                  : (lang === 'vi' ? 'Chuyển sang Chế độ Tối' : 'Switch to Dark Theme')
              }
              className={`p-1.5 border text-xs font-mono transition-all flex items-center hud-panel bg-[#0a0d14]/90 ${
                theme === 'light'
                  ? 'border-amber-400 text-amber-400 bg-amber-400/10'
                  : 'border-[#00f0ff]/40 text-[#00f0ff] hover:text-white'
              }`}
            >
              {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Language Switch */}
            <button
              onClick={() => {
                hudSound.playClick();
                toggleLanguage();
              }}
              title="Switch Language"
              className="px-2 py-1.5 border border-[#00f0ff]/40 text-[#00f0ff] font-mono text-xs font-bold transition-all flex items-center space-x-1 hud-panel bg-[#0a0d14]/90"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang.toUpperCase()}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-slate-300 hover:text-[#00f0ff] border border-slate-700 hud-panel bg-[#0a0d14]/90"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 max-w-sm ml-auto hud-panel p-3 bg-[#0a0d14]/95 border border-[#00f0ff]/40 pointer-events-auto space-y-2">
            <div className="text-[10px] font-mono text-slate-400 border-b border-slate-800 pb-1">
              {lang === 'vi' ? 'KHU VỰC PHÒNG 3D' : '3D ROOM STATIONS'}
            </div>
            {stations.map((st) => (
              <button
                key={st.id}
                onClick={() => {
                  hudSound.playClick();
                  onSelectStation(st.id);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 font-mono text-xs text-slate-200 hover:text-[#00f0ff] hover:bg-slate-900 border-l-2 border-transparent hover:border-[#00f0ff] transition-all flex items-center space-x-2"
              >
                <st.icon className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>{st.label}</span>
              </button>
            ))}

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
              <button
                onClick={() => {
                  hudSound.playClick();
                  onToggleCameraMode();
                }}
                className="text-[#ffb800] hover:underline text-[11px]"
              >
                Camera: {cameraMode.toUpperCase()}
              </button>
              <button
                onClick={() => {
                  hudSound.playClick();
                  toggleTheme();
                }}
                className="text-amber-400 hover:underline text-[11px] flex items-center space-x-1"
              >
                {theme === 'dark' ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
                <span>{theme.toUpperCase()}</span>
              </button>
              <button
                onClick={() => {
                  hudSound.playClick();
                  onCycleQuality();
                }}
                className="text-slate-400 text-[11px]"
              >
                GFX: {qualityTier.toUpperCase()}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Bottom Floating Control Bar */}
      <footer className="fixed bottom-3 left-0 right-0 z-20 pointer-events-none p-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Interaction & Navigation Hint */}
          <div className="hidden sm:flex items-center space-x-2 hud-panel px-3 py-1.5 text-[11px] font-mono text-slate-300 bg-[#0a0d14]/85 pointer-events-auto border-l-2 border-[#00f0ff]">
            <Eye className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>
              {cameraMode === 'guided'
                ? (lang === 'vi' ? 'Nhấp vào các trạm trong phòng để kiểm tra chi tiết' : 'Click any room station to inspect detailed specs')
                : (lang === 'vi' ? 'Kéo chuột để xoay phòng, cuộn chuột để zoom' : 'Click-drag to rotate room, scroll to zoom')}
            </span>
          </div>

          {/* Reset Camera Button */}
          <button
            onClick={() => {
              hudSound.playClick();
              onResetCamera();
            }}
            className="hud-btn-secondary px-3 py-1.5 text-xs font-mono flex items-center space-x-1.5 pointer-events-auto hud-panel bg-[#0a0d14]/90"
            title="Reset camera to studio overview"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>{lang === 'vi' ? 'Đặt lại Camera' : 'Reset Camera'}</span>
          </button>

        </div>
      </footer>
    </>
  );
};
