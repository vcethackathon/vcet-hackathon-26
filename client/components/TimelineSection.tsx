'use client';

import { useState } from 'react';
import TimelineRoute from './TimelineRoute';
import type { TimelineEvent } from './WorldMapCard';

/**
 * TimelineSection – Interactive Playable Arcade Level Timeline.
 * Retains all original real event data, stage selector tabs, and header.
 */

export default function TimelineSection() {
  const [activeDay, setActiveDay] = useState<'day1' | 'day2'>('day1');

  const day1Events: TimelineEvent[] = [
    {
      stage: 'LEVEL 01',
      title: 'Check-in & Registration Kickoff',
      time: '[TODO: 08:30 AM – 10:00 AM]',
      desc: 'Participant reporting, team verification, kit distribution & badging.',
      status: 'STARTING NODE',
      checkpoint: 'START',
      marker: 'START',
    },
    {
      stage: 'LEVEL 02',
      title: 'Grand Opening Ceremony',
      time: '[TODO: 10:00 AM – 11:00 AM]',
      desc: 'Keynote address by chief guests, track reveal briefing & safety rules.',
      status: 'BRIEFING NODE',
      checkpoint: 'BRIEFING',
      marker: 'WARP',
    },
    {
      stage: 'LEVEL 03',
      title: 'HACKING COMMENCES (START TIMER)',
      time: '[TODO: 11:00 AM SHARP]',
      desc: '36-hour clock starts! Ideation, repository setups & initial prototyping.',
      status: 'ACTION NODE',
      checkpoint: 'ACTION',
      marker: 'WORK',
    },
    {
      stage: 'LEVEL 04',
      title: 'Mentorship Round 01 & Architecture Check',
      time: '[TODO: 04:00 PM – 07:00 PM]',
      desc: 'Industry mentors review technical architecture and feasibility.',
      status: 'CHECKPOINT',
      checkpoint: 'CHECKPOINT',
      marker: 'TEAM',
    },
    {
      stage: 'LEVEL 05',
      title: 'Midnight Arcade Challenge & Snacks',
      time: '[TODO: 12:00 AM MIDNIGHT]',
      desc: 'Mini retro gaming tournament, caffeine refuel & energy boost.',
      status: 'SIDE QUEST',
      checkpoint: 'SIDE_QUEST',
      marker: '★',
    },
  ];

  const day2Events: TimelineEvent[] = [
    {
      stage: 'LEVEL 06',
      title: 'Mentorship Round 02 & Refinement',
      time: '[TODO: 08:00 AM – 10:00 AM]',
      desc: 'Final mentor feedback on prototype UX, edge cases & deployment readiness.',
      status: 'CHECKPOINT',
      checkpoint: 'CHECKPOINT',
      marker: 'TEAM',
    },
    {
      stage: 'LEVEL 07',
      title: 'CODE FREEZE & FINAL SUBMISSIONS',
      time: '[TODO: 05:00 PM DEADLINE]',
      desc: 'All GitHub repositories locked and Unstop submission forms submitted.',
      status: 'CRITICAL DEADLINE',
      checkpoint: 'CRITICAL',
      marker: 'WORK',
    },
    {
      stage: 'LEVEL 08',
      title: 'Jury Evaluation & Pitch Demos',
      time: '[TODO: 05:30 PM – 07:30 PM]',
      desc: 'Top shortlisted teams present live demos to judge panel.',
      status: 'BOSS STAGE',
      checkpoint: 'BOSS',
      marker: 'BOSS',
    },
    {
      stage: 'LEVEL 09',
      title: 'Closing Ceremony & Jackpot Payout',
      time: '[TODO: 08:00 PM – 09:00 PM]',
      desc: 'Winner announcements, prize distribution of ₹1,00,000 & felicitation.',
      status: 'VICTORY NODE',
      checkpoint: 'VICTORY',
      marker: 'FINISH',
    },
  ];

  const activeList = activeDay === 'day1' ? day1Events : day2Events;

  return (
    <section
      id="timeline"
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0B0C10 0%, #080A1A 25%, #0B0E26 70%, #0B0C10 100%)',
      }}
      aria-labelledby="timeline-heading"
    >
      {/* Top cyber border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF]/40 to-transparent" aria-hidden="true" />

      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 px-4">
          <span className="font-pixel text-xs text-[#00F0FF] tracking-widest uppercase bg-black px-4 py-1 border border-[#00F0FF] inline-block mb-3">
            // 03. LEVEL PROGRESSION
          </span>

          <h2
            id="timeline-heading"
            className="font-pixel text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight uppercase mb-4"
          >
            EVENT <span className="text-[#FF007F]">TIMELINE & LEVELS</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
            Navigate through stage checkpoints from Level 01 to the Final Boss.
          </p>
        </div>

        {/* Day Selector Tabs */}
        <div className="flex justify-center gap-4 mb-16 px-4">
          <button
            onClick={() => setActiveDay('day1')}
            className={`font-pixel text-[10px] sm:text-xs px-5 sm:px-7 py-3 border-2 transition-all ${
              activeDay === 'day1'
                ? 'bg-[#FF007F] text-white border-black shadow-[4px_4px_0px_#00F0FF]'
                : 'bg-[#12131C] text-gray-400 border-gray-800 hover:text-white hover:border-gray-600'
            }`}
            aria-pressed={activeDay === 'day1'}
          >
            STAGE 01: DAY 1 (SEP 4)
          </button>
          <button
            onClick={() => setActiveDay('day2')}
            className={`font-pixel text-[10px] sm:text-xs px-5 sm:px-7 py-3 border-2 transition-all ${
              activeDay === 'day2'
                ? 'bg-[#00F0FF] text-black border-black shadow-[4px_4px_0px_#FF007F]'
                : 'bg-[#12131C] text-gray-400 border-gray-800 hover:text-white hover:border-gray-600'
            }`}
            aria-pressed={activeDay === 'day2'}
          >
            STAGE 02: DAY 2 (SEP 5)
          </button>
        </div>

        {/* Playable Level Route Component */}
        <TimelineRoute events={activeList} key={activeDay} />
      </div>
    </section>
  );
}
