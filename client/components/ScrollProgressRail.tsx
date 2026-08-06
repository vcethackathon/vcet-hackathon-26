'use client';

import PlayerMascot from './PlayerMascot';

/**
 * ScrollProgressRail – Right-side vertical level indicator rail.
 * Includes a mini sliding mascot icon that moves along the rail
 * to mirror current scroll level.
 */

interface ScrollProgressRailProps {
  labels: string[];
  activeIndex: number;
  progress: number;
  visible: boolean;
  onSelect: (index: number) => void;
}

export default function ScrollProgressRail({
  labels,
  activeIndex,
  progress,
  visible,
  onSelect,
}: ScrollProgressRailProps) {
  const progressPercentage = Math.max(0, Math.min(100, progress * 100));

  return (
    <nav
      className={`fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-1 select-none transition-all duration-300 ${visible ? 'opacity-100 translate-x-0' : 'pointer-events-none opacity-0 translate-x-5'}`}
      aria-label="Timeline level progress rail"
    >
      <span className="font-pixel text-[7px] text-[#00F0FF]/70 tracking-widest mb-2" style={{ writingMode: 'vertical-rl' }}>
        LEVEL RAIL
      </span>

      <div className="relative flex flex-col items-center py-2">
        {/* Background track line */}
        <div className="absolute top-0 bottom-0 w-[3px] bg-gray-800 rounded-full" aria-hidden="true" />

        {/* Illuminated active fill line */}
        <div
          className="absolute top-0 w-[3px] rounded-full bg-gradient-to-b from-[#00F0FF] via-[#8A2BE2] to-[#FF007F] transition-all duration-500 ease-out shadow-[0_0_8px_rgba(0,240,255,0.6)]"
          style={{ height: `${progressPercentage}%` }}
          aria-hidden="true"
        />

        {/* ── MINI SLIDING MASCOT ICON ON RAIL ── */}
        <div
          className="absolute -left-[14px] pointer-events-none z-30"
          style={{
            top: 0,
            transform: `translateY(calc(${progressPercentage}% - 14px))`,
            transition: 'transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            willChange: 'transform',
          }}
          aria-hidden="true"
        >
          <div className="p-0.5 bg-[#0B0C10] border border-[#00F0FF] rounded-sm shadow-[0_0_6px_rgba(0,240,255,0.8)]">
            <PlayerMascot size={18} />
          </div>
        </div>

        {/* Level dots */}
        {labels.map((label, i) => {
          const isActive = i === activeIndex;
          const isPast = i < activeIndex;

          return (
            <button
              key={`${label}-${i}`}
              onClick={() => onSelect(i)}
              className="relative z-10 flex items-center gap-2.5 py-2.5 group focus:outline-none focus:ring-2 focus:ring-[#00F0FF] rounded-sm"
              aria-label={`Jump to level ${label}`}
              aria-current={isActive ? 'step' : undefined}
            >
              <div
                className={`
                  w-3.5 h-3.5 rounded-sm rotate-45 border-2 transition-all duration-300
                  ${isActive
                    ? 'bg-[#00F0FF] border-[#00F0FF] scale-125 shadow-[0_0_10px_rgba(0,240,255,0.8)]'
                    : isPast
                    ? 'bg-[#8A2BE2] border-[#8A2BE2]'
                    : 'bg-[#12131C] border-gray-700 group-hover:border-[#00F0FF]'
                  }
                `}
              />

              <span
                className={`
                  font-pixel text-[7px] tracking-wider transition-all duration-200 whitespace-nowrap
                  ${isActive
                    ? 'text-[#00F0FF] opacity-100 translate-x-0'
                    : 'text-gray-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                  }
                `}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>

      <span className="font-pixel text-[8px] text-[#FF007F]/80 tracking-widest mt-2" style={{ writingMode: 'vertical-rl' }}>
        ▼
      </span>
    </nav>
  );
}
