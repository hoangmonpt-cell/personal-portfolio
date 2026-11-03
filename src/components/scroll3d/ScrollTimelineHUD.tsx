import React, { useEffect, useState } from 'react';
import { SCROLL_SECTIONS } from './utils/cameraPath';
import { scrollStore, type ScrollState } from './utils/scrollStore';
import { useI18n } from '../../i18n';
import { hudSound } from '../../utils/sound';
import { ChevronUp } from 'lucide-react';

export const ScrollTimelineHUD: React.FC = () => {
  const { lang, t } = useI18n();
  const [scrollState, setScrollState] = useState<ScrollState>(() => scrollStore.getState());

  useEffect(() => {
    return scrollStore.subscribe((state) => {
      setScrollState({ ...state });
    });
  }, []);

  const handleSectionClick = (index: number) => {
    hudSound.playClick();
    scrollStore.scrollToSection(index);
  };

  const handleReturnToTop = () => {
    hudSound.playClick();
    scrollStore.scrollToSection(0);
  };

  const activeIdx = scrollState.activeSectionIndex;

  return (
    <aside
      aria-label="3D Journey Timeline Navigation"
      className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 pointer-events-auto flex flex-col items-end select-none"
    >
      {/* Vertical Track with Step Dots - Sleek and compact to avoid card overlap */}
      <nav 
        aria-label="3D Sections"
        className="hud-panel bg-[#0a0d14]/90 border border-slate-800 p-1.5 sm:p-2 rounded flex flex-col items-center space-y-2 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.6)]"
      >
        {SCROLL_SECTIONS.map((sec) => {
          const isActive = sec.index === activeIdx;
          return (
            <button
              key={sec.id}
              onClick={() => handleSectionClick(sec.index)}
              onMouseEnter={() => hudSound.playHover()}
              title={sec.name[lang as 'vi' | 'en']}
              className="group relative flex items-center justify-center p-1 cursor-pointer focus:outline-none"
            >
              {/* Tooltip on hover */}
              <span className="absolute right-8 px-2 py-0.5 rounded bg-[#0b0f19] border border-[#00f0ff]/40 text-[10px] font-mono whitespace-nowrap text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                {sec.name[lang as 'vi' | 'en']}
              </span>

              {/* Dot indicator */}
              <span
                className={`transition-all rounded-full ${
                  isActive
                    ? 'w-2.5 h-2.5 bg-[#00f0ff] ring-4 ring-[#00f0ff]/30 shadow-[0_0_10px_#00f0ff]'
                    : 'w-1.5 h-1.5 bg-slate-600 group-hover:bg-slate-300'
                }`}
              />
            </button>
          );
        })}

        {/* Return to Top Button */}
        {scrollState.rawProgress > 0.15 && (
          <button
            onClick={handleReturnToTop}
            title={t.scroll3d.returnTop}
            aria-label={t.scroll3d.returnTop}
            className="mt-2 pt-2 border-t border-slate-800 text-slate-400 hover:text-[#00ff88] transition-colors p-1"
          >
            <ChevronUp className="w-3.5 h-3.5 animate-bounce" />
          </button>
        )}
      </nav>
    </aside>
  );
};
