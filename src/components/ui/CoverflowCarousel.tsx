import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { hudSound } from '../../utils/sound';

export interface CoverflowCarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number, isCenter: boolean) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string;
  initialIndex?: number;
  onIndexChange?: (index: number) => void;
  className?: string;
  heightClass?: string;
}

export function CoverflowCarousel<T>({
  items,
  renderItem,
  keyExtractor,
  initialIndex = 0,
  onIndexChange,
  className = '',
  heightClass = 'h-[360px] sm:h-[400px]',
}: CoverflowCarouselProps<T>) {
  const total = items.length;

  const [activeIndex, setActiveIndex] = useState(() => {
    if (total === 0) return 0;
    return Math.min(Math.max(0, initialIndex), total - 1);
  });

  // Real-time drag offset in pixels
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // References for touch/mouse pointer tracking
  const startXRef = useRef<number | null>(null);
  const currentXRef = useRef<number | null>(null);
  const isPointerDownRef = useRef<boolean>(false);

  // Keep active index in bounds if items change
  useEffect(() => {
    setActiveIndex((prev) => {
      if (total === 0) return 0;
      return Math.min(prev, total - 1);
    });
  }, [total]);

  // Circular navigation helpers
  const goToIndex = useCallback(
    (targetIndex: number) => {
      if (total === 0) return;
      const normalized = ((targetIndex % total) + total) % total;
      if (normalized !== activeIndex) {
        hudSound.playClick();
        setActiveIndex(normalized);
        onIndexChange?.(normalized);
      }
    },
    [total, activeIndex, onIndexChange]
  );

  const prev = useCallback(() => {
    goToIndex(activeIndex - 1);
  }, [goToIndex, activeIndex]);

  const next = useCallback(() => {
    goToIndex(activeIndex + 1);
  }, [goToIndex, activeIndex]);

  // Pointer Down (Mouse or Touch) - HOLD TO DRAG
  const handlePointerDown = (clientX: number) => {
    startXRef.current = clientX;
    currentXRef.current = clientX;
    isPointerDownRef.current = true;
    setIsDragging(true);
    setDragOffset(0);
  };

  // Pointer Move (Mouse or Touch) - REAL-TIME CONTINUOUS TRACKING
  const handlePointerMove = (clientX: number) => {
    if (!isPointerDownRef.current || startXRef.current === null) return;
    currentXRef.current = clientX;
    const diff = clientX - startXRef.current;
    // Dampened drag with max range
    const maxDrag = 280;
    const damped = Math.sign(diff) * Math.min(Math.abs(diff), maxDrag);
    setDragOffset(damped);
  };

  // Pointer Up (Mouse or Touch) - RELEASE & TRIGGER SWITCH OR SNAP BACK
  const handlePointerUp = () => {
    if (!isPointerDownRef.current) return;
    const finalDiff = currentXRef.current !== null && startXRef.current !== null
      ? currentXRef.current - startXRef.current
      : 0;

    const threshold = 45; // Gesture threshold to flip card
    if (finalDiff > threshold) {
      prev();
    } else if (finalDiff < -threshold) {
      next();
    }

    startXRef.current = null;
    currentXRef.current = null;
    isPointerDownRef.current = false;
    setIsDragging(false);
    setDragOffset(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prev();
      } else if (e.key === 'ArrowRight') {
        next();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prev, next]);

  if (total === 0) {
    return (
      <div className={`flex items-center justify-center text-slate-500 font-mono text-xs ${heightClass}`}>
        NO ITEMS AVAILABLE
      </div>
    );
  }

  // Calculate shortest circular difference
  const getCircularDiff = (itemIndex: number) => {
    if (total <= 1) return 0;
    let diff = itemIndex - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  // Continuous drag progress: -1.0 to +1.0
  // stepDistance: roughly card width spacing
  const stepDistance = 260;
  const dragProgress = dragOffset / stepDistance;

  return (
    <div className={`relative w-full select-none ${className}`}>
      {/* 3D Coverflow Container with generous vertical room so center card pops OUT without being clipped */}
      <div
        className={`relative w-full ${heightClass} pt-8 pb-4 sm:pt-10 sm:pb-6 flex items-center justify-center touch-pan-y cursor-grab active:cursor-grabbing overflow-visible`}
        onMouseDown={(e) => handlePointerDown(e.clientX)}
        onMouseMove={(e) => handlePointerMove(e.clientX)}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
        onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
        onTouchEnd={handlePointerUp}
      >
        {items.map((item, idx) => {
          const baseDiff = getCircularDiff(idx);

          // CONTINUOUS DYNAMIC POSITION: smoothly tracks with drag progress!
          const continuousPos = baseDiff + dragProgress;
          const absPos = Math.abs(continuousPos);

          // Outside visible horizon: hide cards further than 2.3 steps
          if (absPos > 2.4) {
            return (
              <div
                key={keyExtractor(item, idx)}
                className="absolute opacity-0 pointer-events-none"
                style={{ transform: `translateX(${continuousPos * 80}%) scale(0.4)` }}
                aria-hidden="true"
              />
            );
          }

          // FLUID DYNAMIC INTERPOLATION IN REAL TIME:
          // 1. Scale: 1.06 at center -> 0.86 at step 1 -> 0.70 at step 2
          let scale = 1.0;
          if (absPos <= 1.0) {
            scale = 1.06 - absPos * 0.20; // shrinks as it moves away, grows as it approaches center!
          } else {
            scale = Math.max(0.68, 0.86 - (absPos - 1.0) * 0.16);
          }

          // 2. Opacity: 1.0 at center -> 0.68 at step 1 -> 0.35 at step 2
          let opacity = 1.0;
          if (absPos <= 1.0) {
            opacity = 1.0 - absPos * 0.32; // dims as it moves away, brightens as it approaches!
          } else {
            opacity = Math.max(0.1, 0.68 - (absPos - 1.0) * 0.35);
          }

          // 3. Elevation & 3D Depth:
          // Center card lifts UP subtly (-8px) and projects FORWARD (+60px Z).
          // As it moves to side, it drops down (+6px) and pushes back (-40px Z).
          const translateY = -8 + Math.min(2.0, absPos) * 8;
          const translateZ = 60 - Math.min(2.0, absPos) * 50;
          const rotateY = -Math.sign(continuousPos) * Math.min(22, absPos * 14);

          // 4. Horizontal offset in % plus pixel drag
          const translateXPercent = continuousPos * 78;

          // 5. Z-Index: closest to center has highest priority
          const zIndex = Math.round(40 - absPos * 12);

          // 6. Center Highlight / Glow Factor (0.0 = edge, 1.0 = exact center)
          const centerProminence = Math.max(0, 1.0 - absPos * 1.5);
          const isVisuallyCenter = absPos < 0.45;

          const dynamicFilter = centerProminence > 0.2
            ? `drop-shadow(0 20px 35px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 ${20 * centerProminence}px rgba(0, 240, 255, ${0.4 * centerProminence}))`
            : `brightness(${0.65 + 0.35 * (1.0 - Math.min(1.0, absPos * 0.5))}) blur(${Math.min(1.5, Math.max(0, absPos - 0.7))}px)`;

          // Transition timing: instantaneous 0ms during drag for 1:1 tactile tracking, smooth spring on release
          const transitionStyle = isDragging
            ? 'none'
            : 'transform 340ms cubic-bezier(0.16, 1, 0.3, 1), opacity 340ms ease-out, filter 340ms ease-out';

          return (
            <div
              key={keyExtractor(item, idx)}
              onClick={() => {
                if (!isVisuallyCenter && Math.abs(dragOffset) < 10) {
                  goToIndex(idx);
                }
              }}
              style={{
                transform: `translateX(${translateXPercent}%) translateY(${translateY}px) translateZ(${translateZ}px) scale(${scale}) perspective(1100px) rotateY(${rotateY}deg)`,
                zIndex,
                opacity,
                filter: dynamicFilter,
                transition: transitionStyle,
              }}
              className={`absolute top-0 bottom-0 my-auto w-[280px] sm:w-[330px] md:w-[360px] h-[300px] sm:h-[330px] origin-center cursor-pointer ${
                isVisuallyCenter
                  ? 'cursor-default ring-2 ring-[#00f0ff] ring-offset-2 ring-offset-[#070a0f]'
                  : 'hover:opacity-90'
              }`}
            >
              {/* Dynamic Top Luminous Badge that brightens as card approaches center */}
              <div
                style={{
                  opacity: centerProminence,
                  transform: `translateX(-50%) scale(${0.5 + 0.5 * centerProminence})`,
                  transition: isDragging ? 'none' : 'opacity 340ms ease-out, transform 340ms ease-out',
                }}
                className="absolute -top-1.5 left-1/2 w-16 h-1 bg-[#00f0ff] shadow-[0_0_14px_#00f0ff] rounded-full z-40 pointer-events-none"
              />

              {renderItem(item, idx, isVisuallyCenter)}
            </div>
          );
        })}

        {/* Floating Side Arrow Navigation Buttons (Render only when multiple items exist) */}
        {total > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous card"
              className="absolute left-1 sm:left-4 z-40 p-2 sm:p-2.5 rounded-full bg-[#0a0d14]/90 border border-[#00f0ff]/50 text-[#00f0ff] hover:bg-[#00f0ff]/20 hover:scale-110 active:scale-95 transition-all shadow-[0_0_18px_rgba(0,240,255,0.4)]"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next card"
              className="absolute right-1 sm:right-4 z-40 p-2 sm:p-2.5 rounded-full bg-[#0a0d14]/90 border border-[#00f0ff]/50 text-[#00f0ff] hover:bg-[#00f0ff]/20 hover:scale-110 active:scale-95 transition-all shadow-[0_0_18px_rgba(0,240,255,0.4)]"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </>
        )}
      </div>

      {/* Pagination Track & Dot Indicators (Render only when multiple items exist) */}
      {total > 1 && (
        <div className="flex items-center justify-center space-x-3 mt-2 sm:mt-3">
          <span className="font-mono text-[11px] text-[#00f0ff] font-bold tracking-wider">
            {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>

          <div className="flex items-center space-x-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goToIndex(i)}
                aria-label={`Go to card ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? 'w-6 bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]'
                    : 'w-1.5 bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
