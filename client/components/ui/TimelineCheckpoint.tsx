'use client';

import { useState } from 'react';
import WorldMapCard, { type TimelineEvent } from './WorldMapCard';
import TimelineCharacter from '@/components/models/TimelineCharacter';

/**
 * Landmark Graphic per Level Checkpoint:
 * Renders crisp original SVG pixel landmarks.
 */
function CheckpointLandmark({ checkpoint }: { checkpoint: string }) {
  switch (checkpoint) {
    case 'START':
      // Start Pipe / Portal
      return (
        <div className="flex flex-col items-center animate-landmark-pulse" aria-hidden="true">
          <div className="w-8 h-3 bg-[#00E676] border-2 border-[#004D2A] rounded-t-sm" />
          <div className="w-6 h-6 bg-[#00C853] border-2 border-t-0 border-[#004D2A] flex items-center justify-center">
            <div className="w-2 h-2 bg-[#A7F3D0] rounded-full animate-ping" />
          </div>
        </div>
      );
    case 'BRIEFING':
      // Arcade Cabinet
      return (
        <div className="relative w-7 h-9 bg-[#12131C] border-2 border-[#00F0FF] rounded-sm p-1 flex flex-col items-center justify-between shadow-[0_0_10px_rgba(0,240,255,0.4)]" aria-hidden="true">
          <div className="w-full h-3 bg-[#00F0FF]/30 border border-[#00F0FF] flex items-center justify-center">
            <span className="font-pixel text-[4px] text-[#00F0FF]">ARC</span>
          </div>
          <div className="w-2 h-2 bg-[#FF007F] rounded-full" />
          <div className="w-full h-1 bg-[#333]" />
        </div>
      );
    case 'ACTION':
      // Code Work Terminal / Coin Stack
      return (
        <div className="flex flex-col items-center" aria-hidden="true">
          <div className="w-7 h-5 bg-[#12131C] border-2 border-[#FF007F] rounded-sm p-0.5 flex flex-col justify-around">
            <div className="w-full h-[2px] bg-[#FF007F]" />
            <div className="w-3/4 h-[2px] bg-[#00F0FF]" />
          </div>
          <div className="w-8 h-1.5 bg-[#FF007F]/40 border-t border-[#FF007F]" />
        </div>
      );
    case 'CHECKPOINT':
      // Architecture Terminal / Mentor Station
      return (
        <div className="relative w-7 h-7 bg-[#12131C] border-2 border-[#FFD700] rounded-sm p-1 flex items-center justify-center shadow-[0_0_8px_rgba(255,215,0,0.4)]" aria-hidden="true">
          <div className="w-3 h-3 border border-[#FFD700] rotate-45 bg-[#FFD700]/20 flex items-center justify-center">
            <div className="w-1 h-1 bg-[#FFD700]" />
          </div>
        </div>
      );
    case 'SIDE_QUEST':
      // Midnight Neon Snack Arcade Zone
      return (
        <div className="relative w-8 h-7 bg-[#1E102F] border-2 border-[#FF8C00] rounded-sm flex items-center justify-center shadow-[0_0_10px_rgba(255,140,0,0.5)]" aria-hidden="true">
          <span className="font-pixel text-[8px] text-[#FF8C00] animate-pulse">★</span>
        </div>
      );
    case 'CRITICAL':
      // Code Freeze Lock Gate
      return (
        <div className="relative w-7 h-8 bg-[#2A080C] border-2 border-[#FF3333] rounded-sm flex flex-col items-center justify-center shadow-[0_0_10px_rgba(255,51,51,0.5)]" aria-hidden="true">
          <div className="w-3 h-2 border-2 border-[#FF3333] rounded-t-sm" />
          <div className="w-4 h-3 bg-[#FF3333] rounded-xs flex items-center justify-center">
            <div className="w-1 h-1 bg-black rounded-full" />
          </div>
        </div>
      );
    case 'BOSS':
      // Boss Stage Demo Arena
      return (
        <div className="relative w-9 h-9 bg-[#2B0A1D] border-2 border-[#FF007F] rounded-sm flex flex-col items-center justify-center shadow-[0_0_14px_rgba(255,0,127,0.7)] animate-landmark-pulse" aria-hidden="true">
          <span className="font-pixel text-[10px] text-[#FF007F]">👾</span>
          <span className="font-pixel text-[5px] text-[#FFD700] tracking-widest uppercase mt-0.5">BOSS</span>
        </div>
      );
    case 'VICTORY':
      // Trophy Victory Podium
      return (
        <div className="relative w-9 h-9 bg-[#2A2308] border-2 border-[#FFD700] rounded-sm flex flex-col items-center justify-center shadow-[0_0_16px_rgba(255,215,0,0.8)]" aria-hidden="true">
          <span className="font-pixel text-[12px] text-[#FFD700]">🏆</span>
        </div>
      );
    default:
      return null;
  }
}

interface TimelineCheckpointProps {
  event: TimelineEvent;
  index: number;
  side: 'left' | 'right';
  isActive: boolean;
  isCompleted: boolean;
  totalCount: number;
  cardRef: (el: HTMLDivElement | null) => void;
  onSelect: (index: number) => void;
}

export default function TimelineCheckpoint({
  event,
  index,
  side,
  isActive,
  isCompleted,
  totalCount,
  cardRef,
  onSelect,
}: TimelineCheckpointProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative group/cp">
      {/* Supplied game characters give every level a distinct arcade landmark. */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 z-30 pointer-events-none 
          ${side === 'left' 
            ? '-right-16 md:-right-20 xl:-right-24' 
            : '-left-12 md:-left-16 xl:-left-24'
          }
          scale-[0.6] md:scale-[0.8] xl:scale-100
        `}
        aria-hidden="true"
      >
        <TimelineCharacter stage={event.stage} />
      </div>
      {/* Station Landmark Graphic attached near the route */}
      <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 z-20 pointer-events-auto cursor-pointer"
        style={{
          [side === 'left' ? 'right' : 'left']: '-52px',
        }}
        onClick={() => onSelect(index)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        tabIndex={0}
        role="button"
        aria-label={`Go to Level ${index + 1}: ${event.title}`}
      >
        <CheckpointLandmark checkpoint={event.checkpoint} />

        {/* Hover Status Tooltip */}
        {(isHovered || isActive) && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 animate-tooltip z-30 pointer-events-none whitespace-nowrap">
            <span className="font-pixel text-[8px] text-black bg-[#00F0FF] px-2 py-0.5 border border-black shadow-[2px_2px_0px_#000]">
              {event.marker}
            </span>
          </div>
        )}
      </div>

      {/* Completed Checkmark Badge */}
      {isCompleted && !isActive && (
        <div
          className={`
            absolute top-2 ${side === 'left' ? 'left-2' : 'right-2'} z-20
            font-pixel text-[8px] text-[#FFD700] bg-black/80 px-1.5 py-0.5 border border-[#FFD700]/40 flex items-center gap-1
          `}
        >
          <span>✓</span>
          <span className="hidden sm:inline text-[7px] text-gray-400">CLEAR</span>
        </div>
      )}

      {/* Timeline Event Card Component */}
      <div
        className={`transition-all duration-300 ${isActive ? 'scale-[1.02]' : ''}`}
        onClick={() => onSelect(index)}
      >
        <WorldMapCard
          ref={cardRef}
          event={event}
          index={index}
          side={side}
          isActive={isActive}
          totalCount={totalCount}
        />
      </div>
    </div>
  );
}
