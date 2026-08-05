'use client';

import { motion } from 'framer-motion';
import {
  TrendingUp,
  ShieldCheck,
  Activity,
  Database,
  GitBranch,
  Sparkles,
  Zap,
  ChevronRight,
} from 'lucide-react';
import { UNSTOP_URL } from '@/config/site';

export default function TracksSection() {
  const tracks = [
    {
      id: 'TRACK_01',
      code: 'SCALE // 01',
      title: 'Application Scaling',
      category: 'SYSTEM & TRAFFIC OPTIMIZATION',
      icon: TrendingUp,
      accentColor: '#00F0FF', // Neon Cyan
      bgGlow: 'rgba(0, 240, 255, 0.12)',
      borderHover: 'hover:border-[#00F0FF]',
      shadowHover: 'hover:shadow-[0_0_30px_rgba(0,240,255,0.25)]',
      badgeBg: 'bg-[#00F0FF]/15 text-[#00F0FF] border-[#00F0FF]/40',
      description:
        'Develop dynamic solutions that seamlessly expand system capacity to handle surging user traffic and heavy workloads without performance drops.',
    },
    {
      id: 'TRACK_02',
      code: 'SEC // 02',
      title: 'Application Security',
      category: 'CYBER DEFENSE & SHIELD',
      icon: ShieldCheck,
      accentColor: '#FF007F', // Neon Magenta
      bgGlow: 'rgba(255, 0, 127, 0.12)',
      borderHover: 'hover:border-[#FF007F]',
      shadowHover: 'hover:shadow-[0_0_30px_rgba(255,0,127,0.25)]',
      badgeBg: 'bg-[#FF007F]/15 text-[#FF007F] border-[#FF007F]/40',
      description:
        'Architect robust safeguards and innovative defenses to protect applications, infrastructure, and user data from evolving cyber threats.',
    },
    {
      id: 'TRACK_03',
      code: 'OBS // 03',
      title: 'Application Logging & Monitoring',
      category: 'REAL-TIME OBSERVABILITY',
      icon: Activity,
      accentColor: '#FFD700', // Arcade Gold
      bgGlow: 'rgba(255, 215, 0, 0.12)',
      borderHover: 'hover:border-[#FFD700]',
      shadowHover: 'hover:shadow-[0_0_30px_rgba(255,215,0,0.25)]',
      badgeBg: 'bg-[#FFD700]/15 text-[#FFD700] border-[#FFD700]/40',
      description:
        'Create intelligent observability tools that capture system events in real-time to proactively detect anomalies, trace bugs, and ensure application health.',
    },
    {
      id: 'TRACK_04',
      code: 'DATA // 04',
      title: 'Application Data Management',
      category: 'STORAGE & PROCESSING ARCHITECTURE',
      icon: Database,
      accentColor: '#8A2BE2', // Neon Violet
      bgGlow: 'rgba(138, 43, 226, 0.15)',
      borderHover: 'hover:border-[#8A2BE2]',
      shadowHover: 'hover:shadow-[0_0_30px_rgba(138,43,226,0.3)]',
      badgeBg: 'bg-[#8A2BE2]/20 text-[#C87AFF] border-[#8A2BE2]/50',
      description:
        'Design efficient architectures for securely storing, processing, migrating, and retrieving complex application data at scale.',
    },
    {
      id: 'TRACK_05',
      code: 'PIPE // 05',
      title: 'Application Building Pipelines/Processing',
      category: 'CI/CD & AUTOMATED WORKFLOWS',
      icon: GitBranch,
      accentColor: '#00FF66', // Neon Green
      bgGlow: 'rgba(0, 255, 102, 0.12)',
      borderHover: 'hover:border-[#00FF66]',
      shadowHover: 'hover:shadow-[0_0_30px_rgba(0,255,102,0.25)]',
      badgeBg: 'bg-[#00FF66]/15 text-[#00FF66] border-[#00FF66]/40',
      description:
        'Automate and optimize the software delivery lifecycle by designing highly efficient CI/CD workflows and data processing architectures.',
    },
  ];

  return (
    <section id="tracks" className="relative py-20 sm:py-24 bg-[#0B0C10] overflow-hidden border-t-2 border-[#00F0FF]/20">
      {/* Background Retro Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #00F0FF 1px, transparent 1px), linear-gradient(to bottom, #FF007F 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="flex items-center gap-2 px-3 py-1 bg-[#00F0FF]/15 border border-[#00F0FF] mb-4">
            <Zap className="w-4 h-4 text-[#00F0FF] animate-pulse" />
            <span className="font-pixel text-[10px] sm:text-xs text-[#00F0FF] tracking-widest uppercase">
              // 02. OFFICIAL COMPETITION TRACKS
            </span>
          </div>

          <h2 className="font-pixel text-2xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase mb-4">
            SELECT YOUR <span className="text-[#FF007F] animate-glitch">BATTLEFIELD</span>
          </h2>

          <p className="font-sans-custom text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
            Choose from <strong className="text-white font-semibold">5 official competition tracks</strong>. Build high-impact solutions, push technical boundaries, and claim your share of the <span className="text-[#FFD700] font-semibold">₹1,00,000 jackpot</span>.
          </p>
        </div>

        {/* 5 Revealed Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {tracks.map((track, idx) => {
            const Icon = track.icon;

            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`relative bg-[#0D0E16]/90 border border-gray-800/80 p-6 sm:p-7 rounded-lg flex flex-col justify-between group transition-all duration-300 ${track.borderHover} ${track.shadowHover} ${
                  idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
                style={{
                  boxShadow: `0 4px 20px rgba(0, 0, 0, 0.6)`,
                }}
              >
                {/* Top Ambient Accent Bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-lg transition-opacity duration-300 group-hover:opacity-100 opacity-60"
                  style={{ backgroundColor: track.accentColor }}
                />

                <div>
                  {/* Top Header Strip: Track Code & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-pixel text-[10px] text-gray-400 tracking-wider">
                      {track.code}
                    </span>
                    <span
                      className={`font-pixel text-[9px] px-2.5 py-1 border tracking-widest uppercase rounded-sm ${track.badgeBg}`}
                    >
                      UNLOCKED
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="flex items-center gap-4 mb-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 border group-hover:scale-110 transition-transform duration-300"
                      style={{
                        backgroundColor: track.bgGlow,
                        borderColor: track.accentColor,
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: track.accentColor }} />
                    </div>
                    <span className="font-pixel text-[9px] block text-gray-400 uppercase tracking-widest">
                      {track.category}
                    </span>
                  </div>

                  {/* Title — isolated so it wraps cleanly */}
                  <h3 className="font-pixel text-sm text-white leading-snug mb-4 break-words overflow-hidden group-hover:text-[#00F0FF] transition-colors">
                    {track.title}
                  </h3>

                  {/* Gradient Divider Line */}
                  <div
                    className="h-0.5 w-full mb-4 opacity-40 group-hover:opacity-80 transition-opacity"
                    style={{
                      background: `linear-gradient(90deg, ${track.accentColor}, transparent)`,
                    }}
                  />

                  {/* Track Description */}
                  <p className="text-xs sm:text-sm text-gray-300 font-sans-custom leading-relaxed mb-6">
                    {track.description}
                  </p>
                </div>



              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Callout Banner */}
        <div className="mt-14 text-center bg-[#12131C] border border-[#FF007F]/40 p-6 sm:p-8 rounded-lg max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(255,0,127,0.15)]">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-[#FF007F]/20 border border-[#FF007F] flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-[#FFD700]" />
            </div>
            <div>
              <h4 className="font-pixel text-xs sm:text-sm text-white uppercase tracking-wider">
                READY TO HACK IN ONE OF THESE DOMAINS?
              </h4>
              <p className="text-xs text-gray-300 font-sans-custom mt-1">
                Form your team of 2–4 members and register on Unstop to lock in your slot.
              </p>
            </div>
          </div>

          <a
            href={UNSTOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-arcade-magenta px-6 py-3 text-xs tracking-wider font-bold whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span>REGISTER ON UNSTOP</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
