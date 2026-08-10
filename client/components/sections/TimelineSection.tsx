'use client';

import { useState } from 'react';
import TimelineRoute from '@/components/ui/TimelineRoute';
import type { TimelineEvent } from '@/components/ui/WorldMapCard';

/**
 * TimelineSection – Interactive Playable Arcade Level Timeline.
 * Retains all original real event data, stage selector tabs, and header.
 */

export default function TimelineSection() {
  const [activeDay, setActiveDay] = useState<'preStage' | 'day1' | 'day2'>('preStage');

  const preStageEvents: TimelineEvent[] = [
    {
      stage: 'LEVEL 00',
      title: 'Registration',
      time: '05 Aug - 20 Aug',
      desc: 'Registration round and Abstract submission. Upload a combined abstract PDF for any 2 problem statements out of the given 5 during registration (only PDF file). Follow the given template for Abstract PPT.',
      status: 'STARTING NODE',
      checkpoint: 'START',
      marker: 'REG',
    },
    {
      stage: 'LEVEL 00',
      title: 'Shortlisting',
      time: '20 Aug - 22 Aug',
      desc: 'Shortlisted participants will be notified via mail.',
      status: 'CHECKPOINT',
      checkpoint: 'CHECKPOINT',
      marker: 'WAIT',
    },
    {
      stage: 'LEVEL 00',
      title: 'Payment',
      time: '20 Aug - 22 Aug',
      desc: 'Shortlisted Participants have to pay registration fees (before 22nd August).',
      status: 'ACTION NODE',
      checkpoint: 'ACTION',
      marker: 'PAY',
    }
  ];

  const day1Events: TimelineEvent[] = [
    {
      stage: 'LEVEL 01',
      title: 'Inauguration',
      time: '07:30 AM',
      desc: 'The official kickoff and inauguration ceremony.',
      status: 'STARTING NODE',
      checkpoint: 'START',
      marker: 'START',
    },
    {
      stage: 'LEVEL 02',
      title: 'Allotment of Problem Statement',
      time: '08:00 AM',
      desc: 'Teams are assigned their problem statements and hacking begins.',
      status: 'ACTION NODE',
      checkpoint: 'ACTION',
      marker: 'WORK',
    },
    {
      stage: 'LEVEL 03',
      title: 'First Jury Round',
      time: '05:00 PM',
      desc: 'Initial evaluation of progress and ideas by the jury panel.',
      status: 'CHECKPOINT',
      checkpoint: 'CHECKPOINT',
      marker: 'TEAM',
    }
  ];

  const day2Events: TimelineEvent[] = [
    {
      stage: 'LEVEL 04',
      title: 'Second Jury Round',
      time: '08:00 AM',
      desc: 'Second review session with mentors and the jury panel.',
      status: 'CHECKPOINT',
      checkpoint: 'CHECKPOINT',
      marker: 'TEAM',
    },
    {
      stage: 'LEVEL 05',
      title: 'Coding Ends & Judging Round Begins',
      time: '02:00 PM',
      desc: 'Code freeze. The main judging round starts for all teams.',
      status: 'CRITICAL DEADLINE',
      checkpoint: 'CRITICAL',
      marker: 'WORK',
    },
    {
      stage: 'LEVEL 06',
      title: 'Pitching Round for Finalists Begins',
      time: '04:00 PM',
      desc: 'Top finalist teams pitch their solutions to the main jury.',
      status: 'BOSS STAGE',
      checkpoint: 'BOSS',
      marker: 'BOSS',
    },
    {
      stage: 'LEVEL 07',
      title: 'Announcement of Winners',
      time: '06:00 PM',
      desc: 'Final results, prize distribution, and closing ceremony.',
      status: 'VICTORY NODE',
      checkpoint: 'VICTORY',
      marker: 'FINISH',
    }
  ];

  const activeList = activeDay === 'preStage' ? preStageEvents : activeDay === 'day1' ? day1Events : day2Events;

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
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-16 px-4">
          <button
            onClick={() => setActiveDay('preStage')}
            className={`font-pixel text-[10px] sm:text-xs px-3 sm:px-5 py-3 border-2 transition-all ${
              activeDay === 'preStage'
                ? 'bg-[#8A2BE2] text-white border-black shadow-[4px_4px_0px_#00F0FF]'
                : 'bg-[#12131C] text-gray-400 border-gray-800 hover:text-white hover:border-gray-600'
            }`}
            aria-pressed={activeDay === 'preStage'}
          >
            PRE-STAGE (AUG 5 - AUG 22)
          </button>
          <button
            onClick={() => setActiveDay('day1')}
            className={`font-pixel text-[10px] sm:text-xs px-3 sm:px-5 py-3 border-2 transition-all ${
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
            className={`font-pixel text-[10px] sm:text-xs px-3 sm:px-5 py-3 border-2 transition-all ${
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
