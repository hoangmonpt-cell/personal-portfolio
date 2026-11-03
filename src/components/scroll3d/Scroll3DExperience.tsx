import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useI18n } from '../../i18n';
import { hudSound } from '../../utils/sound';
import { scrollStore, type ScrollState } from './utils/scrollStore';
import { SCROLL_SECTIONS } from './utils/cameraPath';
import { ScrollWorldCanvas } from './ScrollWorldCanvas';
import { ScrollSectionOverlay } from './ScrollSectionOverlay';
import { ScrollTimelineHUD } from './ScrollTimelineHUD';
import type { QualityTier } from '../3d/RoomLighting';
import { 
  Cpu, 
  Volume2, 
  VolumeX, 
  Globe, 
  Sun, 
  Moon, 
  Boxes, 
  Sliders
} from 'lucide-react';

interface Scroll3DExperienceProps {
  onSwitchToRoom: () => void;
  qualityTier: QualityTier;
  onCycleQuality: () => void;
}

export const Scroll3DExperience: React.FC<Scroll3DExperienceProps> = ({
  onSwitchToRoom,
  qualityTier,
  onCycleQuality,
}) => {
  const { theme, config: themeConfig, toggleTheme } = useTheme();
  const { lang, t, toggleLanguage } = useI18n();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [audioActive, setAudioActive] = useState(() => hudSound.isEnabled());
  const [scrollState, setScrollState] = useState<ScrollState>(() => scrollStore.getState());

  // Check prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    return scrollStore.subscribe((st) => {
      setScrollState({ ...st });
    });
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
  }, []);

  // Connect scroll container to scrollStore and register global wheel, drag, and keyboard handlers
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    scrollStore.setContainer(el);

    const handleScroll = () => {
      const maxScroll = el.scrollHeight - el.clientHeight;
      if (maxScroll <= 0) return;
      const progress = el.scrollTop / maxScroll;
      scrollStore.setRawProgress(progress);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger initial calculation
    handleScroll();

    // 1. Global wheel handler: allows mouse wheel scrolling even when hovering center cards
    const handleGlobalWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      // If user is inside an internal scrollable text container, let it scroll naturally
      const scrollable = target?.closest('.overflow-y-auto, .overflow-y-scroll, textarea') as HTMLElement | null;
      if (scrollable && scrollable.scrollHeight > scrollable.clientHeight) {
        const isAtTop = scrollable.scrollTop <= 0 && e.deltaY < 0;
        const isAtBottom = Math.ceil(scrollable.scrollTop + scrollable.clientHeight) >= scrollable.scrollHeight && e.deltaY > 0;
        if (!isAtTop && !isAtBottom) {
          return;
        }
      }
      scrollStore.addProgressDelta(e.deltaY * 0.00035);
    };

    // 2. Global mouse drag-to-scroll handler: click and drag up/down to explore the 3D journey
    let isDragging = false;
    let startY = 0;

    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return; // Only left-click
      const target = e.target as HTMLElement | null;
      if (target?.closest('button, a, input, textarea, [role="button"], .hud-panel button, [data-no-drag]')) {
        return;
      }
      isDragging = true;
      startY = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaY = e.clientY - startY;
      startY = e.clientY;
      scrollStore.addProgressDelta(-deltaY * 0.0008);
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    // 3. Global keyboard navigation: ArrowUp/Down, PageUp/Down, Space
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        scrollStore.addProgressDelta(e.key === 'PageDown' ? 0.14 : 0.035);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        scrollStore.addProgressDelta(e.key === 'PageUp' ? -0.14 : -0.035);
      }
    };

    window.addEventListener('wheel', handleGlobalWheel, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleGlobalWheel);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('keydown', handleKeyDown);
      scrollStore.setContainer(null);
    };
  }, []);

  const handleAudioToggle = () => {
    const newState = hudSound.toggle();
    setAudioActive(newState);
  };

  const currentSection = SCROLL_SECTIONS[scrollState.activeSectionIndex] || SCROLL_SECTIONS[0];
  const progressPercent = Math.round(scrollState.rawProgress * 100);

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none bg-[#070a0f] text-slate-100 font-sans">
      {/* 1. Full-Screen WebGL Canvas (Continuous 3D Spatial World) */}
      <ScrollWorldCanvas
        themeConfig={themeConfig}
        qualityTier={qualityTier}
        reducedMotion={reducedMotion}
      />

      {/* 2. Top Tactical Experience Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 w-full px-4 sm:px-6 py-3 flex items-center justify-between pointer-events-auto bg-gradient-to-b from-[#070a0f]/90 via-[#070a0f]/60 to-transparent backdrop-blur-sm">
        {/* Brand Logo & Mode Badge */}
        <div 
          onClick={() => {
            hudSound.playClick();
            scrollStore.scrollToSection(0);
          }}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded border border-[#00f0ff] flex items-center justify-center bg-[#00f0ff]/10 group-hover:bg-[#00f0ff]/20 transition-all">
            <Cpu className="w-4 h-4 text-[#00f0ff] animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-slate-100 group-hover:text-[#00f0ff] transition-colors">
              GAMEDEV // SCROLL 3D
            </span>
            <span className="font-mono text-[9px] text-[#00ff88] tracking-widest">
              CINEMATIC JOURNEY
            </span>
          </div>
        </div>

        {/* Center Current Section Status in Header - Clean, non-intrusive, no overlap with cards */}
        <div className="hidden lg:flex items-center space-x-3 px-3.5 py-1 rounded bg-[#0a0d14]/85 border border-slate-800 font-mono text-xs shadow-md">
          <span className="text-[#00ff88] uppercase tracking-wider text-[11px] font-bold">
            {t.scroll3d.scrollProgress}: {progressPercent}%
          </span>
          <span className="text-slate-600">|</span>
          <span className="font-bold text-[#00f0ff] tracking-wide">
            {currentSection.name[lang as 'vi' | 'en']}
          </span>
        </div>

        {/* Right Controls: Experience Switcher (3D OFF -> ROOM), Quality, Theme, Sound, Lang */}
        <div className="flex items-center space-x-2">
          {/* EXPERIENCE SELECTOR BUTTON (3D OFF -> ROOM) */}
          <button
            onClick={() => {
              hudSound.playClick();
              onSwitchToRoom();
            }}
            title={t.scroll3d.experienceRoom}
            className="px-2.5 py-1.5 border border-[#00f0ff] text-[#00f0ff] bg-[#00f0ff]/15 hover:bg-[#00f0ff]/25 font-mono text-xs font-bold transition-all flex items-center space-x-1.5 hud-panel cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.3)]"
          >
            <Boxes className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">3D:</span>
            <span>ROOM ➔</span>
          </button>

          {/* Graphics Quality Button */}
          <button
            onClick={() => {
              hudSound.playClick();
              onCycleQuality();
            }}
            title="Cycle Graphics Quality (Low / Medium / High)"
            className="hidden md:flex items-center space-x-1 px-2.5 py-1.5 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white hud-panel bg-[#0a0d14]/90"
          >
            <Sliders className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span className="text-[11px]">{qualityTier.toUpperCase()}</span>
          </button>

          {/* Sound FX Button */}
          <button
            onClick={handleAudioToggle}
            title="Toggle HUD Sound Effects"
            aria-label="Toggle HUD Audio"
            className={`p-1.5 border text-xs font-mono transition-all flex items-center hud-panel bg-[#0a0d14]/90 ${
              audioActive ? 'border-[#00ff88]/50 text-[#00ff88]' : 'border-slate-700 text-slate-500'
            }`}
          >
            {audioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Theme Toggle Button */}
          <button
            data-testid="theme-toggle"
            onClick={() => {
              hudSound.playClick();
              toggleTheme();
            }}
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label="Toggle Theme"
            className="p-1.5 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white hud-panel bg-[#0a0d14]/90"
          >
            {theme === 'light' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#00f0ff]" />}
          </button>

          {/* Language Toggle Button */}
          <button
            onClick={() => {
              hudSound.playClick();
              toggleLanguage();
            }}
            title="Switch Language (VI / EN)"
            className="px-2 py-1.5 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white hud-panel bg-[#0a0d14]/90 flex items-center space-x-1"
          >
            <Globe className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span className="text-[11px] font-bold">{lang.toUpperCase()}</span>
          </button>
        </div>
      </header>

      {/* 3. Section Content Overlay (Accessible, Interactive Floating HUD Cards) */}
      <ScrollSectionOverlay />

      {/* 4. Right Side Tactical Timeline Progress HUD */}
      <ScrollTimelineHUD />

      {/* 5. Virtual Native Scroll Track (Drives camera smoothly via user scroll/wheel/touch) */}
      <div
        ref={scrollContainerRef}
        tabIndex={0}
        aria-label="3D Scroll World Track"
        className="fixed inset-0 w-full h-full overflow-y-scroll overflow-x-hidden z-10 pointer-events-auto outline-none focus:ring-0 select-none"
        style={{ scrollBehavior: 'auto' }}
      >
        {/* 700vh track = 7 smooth section regions */}
        <div className="w-full h-[700vh] pointer-events-none" />
      </div>
    </div>
  );
};
