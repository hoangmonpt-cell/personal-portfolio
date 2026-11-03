import { useState, useEffect, lazy, Suspense } from 'react';
import { I18nProvider } from './i18n';
import { ThemeProvider, useTheme } from './hooks/useTheme';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/layout/Footer';
import { RoomHUD } from './components/ui/RoomHUD';
import { StationDetailModal } from './components/ui/StationDetailModal';
import type { CameraStationId, CameraMode } from './components/camera/CameraPresets';
import type { QualityTier } from './components/3d/RoomLighting';
import { hudSound } from './utils/sound';
import { Cpu } from 'lucide-react';

// Lazy load 3D Scene to keep initial DOM interactive and fast
const RoomScene = lazy(() =>
  import('./components/3d/RoomScene').then((m) => ({ default: m.RoomScene }))
);

function isWebGLSupported(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export function AppContent() {
  const { config: themeConfig } = useTheme();
  const [viewMode, setViewMode] = useState<'3d' | '2d'>(() => {
    try {
      const saved = localStorage.getItem('portfolio_view_mode');
      if (saved === '2d' || saved === '3d') return saved;
      return isWebGLSupported() ? '3d' : '2d';
    } catch {
      return '3d';
    }
  });

  const [activeStation, setActiveStation] = useState<CameraStationId>('overview');
  const [cameraMode, setCameraMode] = useState<CameraMode>('guided');
  const [qualityTier, setQualityTier] = useState<QualityTier>('high');
  const [classicSection, setClassicSection] = useState('hero');

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_view_mode', viewMode);
    } catch {
      // ignore
    }
  }, [viewMode]);

  const handleSelectStation = (stationId: CameraStationId) => {
    hudSound.playClick();
    setActiveStation(stationId);
  };

  const handleResetCamera = () => {
    hudSound.playClick();
    setActiveStation('overview');
    setCameraMode('guided');
  };

  const handleToggleCameraMode = () => {
    setCameraMode((prev) => (prev === 'guided' ? 'explore' : 'guided'));
  };

  const handleCycleQuality = () => {
    setQualityTier((prev) => {
      if (prev === 'high') return 'medium';
      if (prev === 'medium') return 'low';
      return 'high';
    });
  };

  const handleToggleViewMode = () => {
    setViewMode((prev) => (prev === '3d' ? '2d' : '3d'));
  };

  const scrollToClassicSection = (sectionId: string) => {
    setClassicSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070a0f] text-slate-100 selection:bg-[#00f0ff]/30 selection:text-[#00f0ff] overflow-x-hidden">
      {viewMode === '3d' ? (
        /* 3D Stylized Developer Room Experience */
        <div className="relative w-screen h-screen overflow-hidden">
          <Suspense
            fallback={
              <div 
                className="w-full h-full flex flex-col items-center justify-center font-mono space-y-3"
                style={{ backgroundColor: themeConfig.canvasBgColor, color: themeConfig.accentPointColor }}
              >
                <Cpu className="w-10 h-10 animate-spin" style={{ color: themeConfig.accentPointColor }} />
                <span className="text-xs uppercase tracking-widest animate-pulse">
                  LOADING 3D DEVELOPER STUDIO...
                </span>
              </div>
            }
          >
            <RoomScene
              activeStation={activeStation}
              cameraMode={cameraMode}
              qualityTier={qualityTier}
              themeConfig={themeConfig}
              onSelectStation={handleSelectStation}
            />
          </Suspense>

          {/* Floating Tactical Room HUD */}
          <RoomHUD
            activeStation={activeStation}
            cameraMode={cameraMode}
            qualityTier={qualityTier}
            viewMode={viewMode}
            onSelectStation={handleSelectStation}
            onToggleCameraMode={handleToggleCameraMode}
            onCycleQuality={handleCycleQuality}
            onToggleViewMode={handleToggleViewMode}
            onResetCamera={handleResetCamera}
          />

          {/* Interactive Station Detail Panel */}
          <StationDetailModal
            stationId={activeStation}
            onClose={() => setActiveStation('overview')}
            onNavigateStation={handleSelectStation}
          />
        </div>
      ) : (
        /* Classic 2D Portfolio View (Accessible Fallback) */
        <div className="relative pt-24 sm:pt-28">
          <Navbar 
            activeSection={classicSection} 
            onNavigate={scrollToClassicSection}
            onEnter3D={() => setViewMode('3d')}
          />

          <main>
            <HeroSection
              onExploreProjects={() => scrollToClassicSection('projects')}
              onContactClick={() => scrollToClassicSection('contact')}
            />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
          </main>

          <Footer />
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AppContent />
      </I18nProvider>
    </ThemeProvider>
  );
}
