'use client';

import { useRef, useEffect, useState } from 'react';
import TimelineCheckpoint from './TimelineCheckpoint';
import ParallaxDecorations from './ParallaxDecorations';
import ScrollProgressRail from './ScrollProgressRail';
import type { TimelineEvent } from './WorldMapCard';
import './worldMapAnimations.css';

interface TimelineRouteProps {
  events: TimelineEvent[];
}

export default function TimelineRoute({ events }: TimelineRouteProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [decorationDensity, setDecorationDensity] = useState<'full' | 'reduced' | 'minimal'>('full');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isRailVisible, setIsRailVisible] = useState(false);
  const routeRef = useRef<HTMLDivElement>(null);

  // Handle window resize for decoration density
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 768) setDecorationDensity('minimal');
      else if (w < 1024) setDecorationDensity('reduced');
      else setDecorationDensity('full');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const route = routeRef.current;
        if (route) {
          const bounds = route.getBoundingClientRect();
          const travel = Math.max(1, bounds.height - window.innerHeight * 0.48);
          setScrollProgress(Math.max(0, Math.min(1, (-bounds.top + window.innerHeight * 0.24) / travel)));
          setIsRailVisible(bounds.top < window.innerHeight * 0.82 && bounds.bottom > window.innerHeight * 0.18);

          let nearestIndex = 0;
          let nearestDistance = Number.POSITIVE_INFINITY;
          cardRefs.current.forEach((card, index) => {
            if (!card) return;
            const cardBounds = card.getBoundingClientRect();
            const distance = Math.abs(cardBounds.top + cardBounds.height / 2 - window.innerHeight / 2);
            if (distance < nearestDistance) {
              nearestDistance = distance;
              nearestIndex = index;
            }
          });
          setActiveIndex((current) => current === nearestIndex ? current : nearestIndex);
        }
        frame = 0;
      });
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [events.length]);

  const handleSelectLevel = (index: number) => {
    setActiveIndex(index);
    const targetCard = cardRefs.current[index];
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetCard.focus({ preventScroll: true });
    }
  };

  const railLabels = events.map((e) => e.stage.replace('LEVEL ', 'L'));

  return (
    <div ref={routeRef} className="relative z-10" role="list" aria-label="Arcade Event Timeline Level Route">
      {/* Layered Arcade Environment */}
      <ParallaxDecorations density={decorationDensity} scrollProgress={scrollProgress} />

      {/* Scroll Progress Rail on Right Side */}
      <ScrollProgressRail
        labels={railLabels}
        activeIndex={activeIndex}
        progress={scrollProgress}
        visible={isRailVisible}
        onSelect={handleSelectLevel}
      />

      {/* Main Connected Route Container */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {events.map((event, idx) => {
          const side: 'left' | 'right' = idx % 2 === 0 ? 'left' : 'right';
          const isFirst = idx === 0;
          const isLast = idx === events.length - 1;
          const isActive = activeIndex === idx;
          const isCompleted = idx < activeIndex;
          const isRouteUnlocked = idx < Math.max(1, Math.ceil(scrollProgress * events.length));

          return (
            <div key={`${event.stage}-${idx}`} className="relative">
              {/* ─── DESKTOP (≥1024px): Alternating 3-Column Layout ─── */}
              <div className="hidden lg:grid lg:grid-cols-[1fr_90px_1fr] lg:items-center lg:gap-4 lg:min-h-[210px]">
                {/* Left Column */}
                <div className={`relative ${side === 'left' ? 'pr-4' : ''}`}>
                  {side === 'left' ? (
                    <TimelineCheckpoint
                      event={event}
                      index={idx}
                      side="left"
                      isActive={isActive}
                      isCompleted={isCompleted}
                      totalCount={events.length}
                      cardRef={(el) => { cardRefs.current[idx] = el; }}
                      onSelect={handleSelectLevel}
                    />
                  ) : (
                    <div className="min-h-[120px]" />
                  )}
                </div>

                {/* Central Connected Route Segment */}
                <div className="relative flex flex-col items-center justify-center h-full">
                  {/* Connected Pipe Segment */}
                  <div
                    className={`
                      w-10 flex-1 relative transition-all duration-500
                      ${isRouteUnlocked ? 'wm-active-route-glow border-[#00F0FF]' : 'bg-[#0A1628] border-[#061220]'}
                      border-x-4 image-rendering-pixelated
                      ${isFirst ? 'rounded-t-md mt-2' : ''}
                      ${isLast ? 'rounded-b-md mb-2' : ''}
                    `}
                    style={{
                      backgroundImage: isRouteUnlocked
                        ? 'repeating-linear-gradient(0deg, rgba(0,240,255,0.4) 0px, rgba(0,240,255,0.4) 4px, transparent 4px, transparent 8px)'
                        : 'repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 4px, transparent 4px, transparent 8px)',
                    }}
                  />

                  {/* Horizontal Branch Pipe to Active Card */}
                  <div
                    className={`
                      absolute top-1/2 -translate-y-1/2 h-3 transition-colors duration-300
                      ${side === 'left' ? '-left-8 w-8' : '-right-8 w-8'}
                      ${isRouteUnlocked ? 'bg-[#00F0FF] shadow-[0_0_8px_rgba(0,240,255,0.6)]' : 'bg-[#0A1628]'}
                      border-y-2 border-[#061220]
                    `}
                    aria-hidden="true"
                  />

                  {/* Route Marker Node */}
                  <div
                    className="absolute z-20 cursor-pointer"
                    onClick={() => handleSelectLevel(idx)}
                  >
                    <div
                      className={`
                        font-pixel text-[8px] tracking-widest px-2.5 py-1.5 border-2 transition-all duration-300
                        ${isActive
                          ? 'bg-[#FF007F] text-white border-black shadow-[0_0_12px_rgba(255,0,127,0.8),3px_3px_0px_#000] scale-110'
                          : isCompleted
                          ? 'bg-[#00F0FF] text-black border-black shadow-[2px_2px_0px_#000]'
                          : 'bg-[#12131C] text-gray-400 border-gray-700'
                        }
                      `}
                    >
                      {event.marker}
                    </div>
                  </div>

                  {/* ── PLAYER MASCOT (Positioned on the active level node) ── */}
                </div>

                {/* Right Column */}
                <div className={`relative ${side === 'right' ? 'pl-4' : ''}`}>
                  {side === 'right' ? (
                    <TimelineCheckpoint
                      event={event}
                      index={idx}
                      side="right"
                      isActive={isActive}
                      isCompleted={isCompleted}
                      totalCount={events.length}
                      cardRef={(el) => { cardRefs.current[idx] = el; }}
                      onSelect={handleSelectLevel}
                    />
                  ) : (
                    <div className="min-h-[120px]" />
                  )}
                </div>
              </div>

              {/* ─── TABLET (768px - 1023px): Narrower 3-Column ─── */}
              <div className="hidden md:grid md:grid-cols-[1fr_70px_1fr] md:items-center md:gap-3 md:min-h-[180px] lg:hidden">
                {/* Left */}
                <div className={side === 'left' ? 'pr-2' : ''}>
                  {side === 'left' ? (
                    <TimelineCheckpoint
                      event={event}
                      index={idx}
                      side="left"
                      isActive={isActive}
                      isCompleted={isCompleted}
                      totalCount={events.length}
                      cardRef={(el) => { cardRefs.current[idx] = el; }}
                      onSelect={handleSelectLevel}
                    />
                  ) : <div className="min-h-[90px]" />}
                </div>

                {/* Central Route */}
                <div className="relative flex flex-col items-center justify-center h-full">
                  <div
                    className={`
                      w-8 flex-1 border-x-2 transition-all duration-300
                      ${isRouteUnlocked ? 'bg-[#00F0FF] border-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.5)]' : 'bg-[#0A1628] border-gray-800'}
                    `}
                  />
                  <div className="absolute z-20 cursor-pointer" onClick={() => handleSelectLevel(idx)}>
                    <div className={`font-pixel text-[7px] px-2 py-1 border ${isActive ? 'bg-[#FF007F] text-white' : 'bg-[#12131C] text-gray-300'}`}>
                      {event.marker}
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className={side === 'right' ? 'pl-2' : ''}>
                  {side === 'right' ? (
                    <TimelineCheckpoint
                      event={event}
                      index={idx}
                      side="right"
                      isActive={isActive}
                      isCompleted={isCompleted}
                      totalCount={events.length}
                      cardRef={(el) => { cardRefs.current[idx] = el; }}
                      onSelect={handleSelectLevel}
                    />
                  ) : <div className="min-h-[90px]" />}
                </div>
              </div>

              {/* ─── MOBILE (<768px): Single Column Stacked Route ─── */}
              <div className="flex md:hidden items-start gap-3 py-3">
                {/* Thin Vertical Route on Left */}
                <div className="relative flex flex-col items-center flex-shrink-0" style={{ width: 36 }}>
                  <div
                    className={`
                      w-1.5 flex-1 min-h-[50px] transition-colors duration-300
                      ${isRouteUnlocked ? 'bg-[#00F0FF] shadow-[0_0_8px_rgba(0,240,255,0.6)]' : 'bg-gray-800'}
                    `}
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 z-20 cursor-pointer" onClick={() => handleSelectLevel(idx)}>
                    <div className={`w-7 h-7 flex items-center justify-center border ${isActive ? 'bg-[#FF007F] border-white text-white' : 'bg-[#12131C] border-gray-700 text-gray-300'}`}>
                      <span className="font-pixel text-[6px]">{event.marker.substring(0, 2)}</span>
                    </div>
                  </div>
                </div>

                {/* Timeline Card Stacked Right */}
                <div className="flex-1 min-w-0">
                  <TimelineCheckpoint
                    event={event}
                    index={idx}
                    side="right"
                    isActive={isActive}
                    isCompleted={isCompleted}
                    totalCount={events.length}
                    cardRef={(el) => { cardRefs.current[idx] = el; }}
                    onSelect={handleSelectLevel}
                  />
                </div>
              </div>

              {/* Connecting ladder / platform piece between stages */}
              {!isLast && (
                <div className="hidden md:flex justify-center relative h-5" aria-hidden="true">
                  <div
                    className={`
                      w-8 h-full border-x-2 transition-colors duration-300
                      ${idx < Math.ceil(scrollProgress * events.length) ? 'bg-[#8A2BE2]/40 border-[#8A2BE2]' : 'bg-[#061220] border-gray-900'}
                    `}
                    style={{
                      backgroundImage: 'repeating-linear-gradient(0deg, #000 0px, #000 2px, transparent 2px, transparent 6px)',
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
