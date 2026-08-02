'use client';

import { useEffect, useState } from 'react';

/**
 * WorldMapLevelRail – Slim right-side vertical progress indicator.
 * Shows dots for each event, highlights the active one, clickable to scroll.
 * Hidden on mobile (< 1024px).
 */

interface WorldMapLevelRailProps {
  labels: string[];
  activeIndex: number;
  cardRefs: React.RefObject<(HTMLDivElement | null)[]>;
}

export default function WorldMapLevelRail({
  labels,
  activeIndex,
  cardRefs,
}: WorldMapLevelRailProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show after mount (avoids SSR mismatch)
    setIsVisible(true);
  }, []);

  const handleClick = (index: number) => {
    const cards = cardRefs.current;
    if (cards && cards[index]) {
      cards[index]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      cards[index]?.focus({ preventScroll: true });
    }
  };

  if (!isVisible) return null;

  return (
    <nav
      className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-1"
      aria-label="Timeline level progress"
    >
      {/* Top label */}
      <span
        className="font-pixel text-[7px] text-[#00F0FF]/60 tracking-widest mb-2 writing-mode-vertical"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        aria-hidden="true"
      >
        LEVEL
      </span>

      {/* Track line + dots */}
      <div className="relative flex flex-col items-center">
        {/* Background line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00F0FF]/20 via-[#8A2BE2]/20 to-[#FF007F]/20 rounded-full"
          aria-hidden="true"
        />

        {/* Progress fill */}
        <div
          className="absolute top-0 w-[2px] rounded-full transition-all duration-500 ease-out"
          style={{
            height: `${((activeIndex + 1) / labels.length) * 100}%`,
            background: 'linear-gradient(180deg, #00F0FF, #8A2BE2, #FF007F)',
          }}
          aria-hidden="true"
        />

        {labels.map((label, i) => {
          const isActive = i === activeIndex;
          const isPast = i < activeIndex;

          return (
            <button
              key={label}
              onClick={() => handleClick(i)}
              className={`
                relative z-10 flex items-center gap-2 py-2 group
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0C10]
                rounded-sm
              `}
              aria-label={`Jump to ${label}`}
              aria-current={isActive ? 'step' : undefined}
            >
              {/* Dot */}
              <div
                className={`
                  w-3 h-3 rounded-sm rotate-45 border-2 transition-all duration-300
                  ${isActive
                    ? 'bg-[#00F0FF] border-[#00F0FF] wm-rail-dot-pulse scale-125'
                    : isPast
                      ? 'bg-[#8A2BE2] border-[#8A2BE2]'
                      : 'bg-transparent border-gray-600 group-hover:border-[#00F0FF]/60'
                  }
                `}
              />

              {/* Label — shown on hover or active */}
              <span
                className={`
                  font-pixel text-[7px] tracking-wider transition-all duration-200 whitespace-nowrap
                  ${isActive
                    ? 'text-[#00F0FF] opacity-100 translate-x-0'
                    : isPast
                      ? 'text-[#8A2BE2] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
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

      {/* Bottom label */}
      <span
        className="font-pixel text-[7px] text-[#FF007F]/60 tracking-widest mt-2"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        aria-hidden="true"
      >
        ▼
      </span>
    </nav>
  );
}
