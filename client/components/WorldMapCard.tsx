'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';

/* ── Checkpoint type → visual config mapping ── */
export type CheckpointType =
  | 'START'
  | 'BRIEFING'
  | 'ACTION'
  | 'CHECKPOINT'
  | 'SIDE_QUEST'
  | 'CRITICAL'
  | 'BOSS'
  | 'VICTORY';

export interface TimelineEvent {
  stage: string;
  title: string;
  time: string;
  desc: string;
  status: string;
  checkpoint: CheckpointType;
  marker: string;
}

const CHECKPOINT_CONFIG: Record<
  CheckpointType,
  { accent: string; badgeBg: string; badgeText: string; glowColor: string; icon: string }
> = {
  START: {
    accent: '#2ECC40',
    badgeBg: 'rgba(46,204,64,0.2)',
    badgeText: '#2ECC40',
    glowColor: 'rgba(46,204,64,0.35)',
    icon: '▶',
  },
  BRIEFING: {
    accent: '#00F0FF',
    badgeBg: 'rgba(0,240,255,0.15)',
    badgeText: '#00F0FF',
    glowColor: 'rgba(0,240,255,0.35)',
    icon: '◆',
  },
  ACTION: {
    accent: '#FF007F',
    badgeBg: 'rgba(255,0,127,0.15)',
    badgeText: '#FF007F',
    glowColor: 'rgba(255,0,127,0.35)',
    icon: '⚡',
  },
  CHECKPOINT: {
    accent: '#FFD700',
    badgeBg: 'rgba(255,215,0,0.15)',
    badgeText: '#FFD700',
    glowColor: 'rgba(255,215,0,0.35)',
    icon: '★',
  },
  SIDE_QUEST: {
    accent: '#FF8C00',
    badgeBg: 'rgba(255,140,0,0.15)',
    badgeText: '#FF8C00',
    glowColor: 'rgba(255,140,0,0.35)',
    icon: '?',
  },
  CRITICAL: {
    accent: '#FF3333',
    badgeBg: 'rgba(255,51,51,0.15)',
    badgeText: '#FF3333',
    glowColor: 'rgba(255,51,51,0.35)',
    icon: '⚠',
  },
  BOSS: {
    accent: '#FF007F',
    badgeBg: 'rgba(255,0,127,0.2)',
    badgeText: '#FF007F',
    glowColor: 'rgba(255,0,127,0.45)',
    icon: '👾',
  },
  VICTORY: {
    accent: '#FFD700',
    badgeBg: 'rgba(255,215,0,0.2)',
    badgeText: '#FFD700',
    glowColor: 'rgba(255,215,0,0.45)',
    icon: '🏆',
  },
};

interface WorldMapCardProps {
  event: TimelineEvent;
  index: number;
  side: 'left' | 'right';
  isActive: boolean;
  totalCount: number;
}

const WorldMapCard = forwardRef<HTMLDivElement, WorldMapCardProps>(
  function WorldMapCard({ event, index, side, isActive }, ref) {
    const config = CHECKPOINT_CONFIG[event.checkpoint];

    const slideDirection = side === 'left' ? -60 : 60;

    return (
      <motion.div
        ref={ref}
        role="listitem"
        tabIndex={0}
        aria-label={`Level ${index + 1}: ${event.title} — ${event.status}`}
        initial={{ opacity: 0, x: slideDirection }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`
          wm-glass-card relative p-4 sm:p-5 w-full
          transition-all duration-300 group
          focus:outline-2 focus:outline-offset-2 focus:outline-[#00F0FF]
          hover:border-[${config.accent}]/50
          ${isActive ? 'wm-active-glow' : ''}
        `}
        style={{
          borderColor: isActive ? config.accent : undefined,
          boxShadow: isActive
            ? `0 0 20px ${config.glowColor}, 4px 4px 0px #000`
            : '4px 4px 0px #000',
        }}
      >
        {/* Connector line from card to route */}
        <div
          className={`
            absolute top-1/2 -translate-y-1/2
            ${side === 'left' ? '-right-6 sm:-right-8' : '-left-6 sm:-left-8'}
            w-6 sm:w-8 h-[3px]
          `}
          style={{
            background: `linear-gradient(${side === 'left' ? '90deg' : '270deg'}, ${config.accent}80, transparent)`,
          }}
          aria-hidden="true"
        />

        {/* Connector dot */}
        <div
          className={`
            absolute top-1/2 -translate-y-1/2
            ${side === 'left' ? '-right-8 sm:-right-10' : '-left-8 sm:-left-10'}
            w-3 h-3 rounded-sm rotate-45
          `}
          style={{ backgroundColor: config.accent }}
          aria-hidden="true"
        />

        {/* Top row: level + checkpoint type + time */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            {/* Level number pixel badge */}
            <span
              className="font-pixel text-[9px] sm:text-[10px] px-2 py-1 tracking-wider"
              style={{
                color: config.badgeText,
                backgroundColor: config.badgeBg,
                border: `1px solid ${config.accent}40`,
              }}
            >
              {config.icon} {event.stage}
            </span>

            {/* Checkpoint type tag */}
            <span
              className="font-pixel text-[8px] sm:text-[9px] px-2 py-0.5 tracking-widest uppercase"
              style={{
                color: config.accent,
                borderBottom: `2px solid ${config.accent}`,
              }}
            >
              {event.status}
            </span>
          </div>

          {/* Time badge */}
          <span className="font-mono text-[10px] sm:text-xs text-[#FFD700] bg-black/60 px-2 py-0.5 border border-gray-800">
            {event.time}
          </span>
        </div>

        {/* Event title */}
        <h3
          className="font-pixel text-[11px] sm:text-sm text-white mb-2 leading-relaxed group-hover:text-[#FF007F] group-focus:text-[#FF007F] transition-colors"
          style={{
            textShadow: isActive ? `0 0 8px ${config.glowColor}` : undefined,
          }}
        >
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-300 font-sans-custom leading-relaxed">
          {event.desc}
        </p>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${config.accent}60, transparent)`,
          }}
          aria-hidden="true"
        />
      </motion.div>
    );
  }
);

export default WorldMapCard;
