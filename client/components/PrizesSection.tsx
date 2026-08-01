'use client';

import { useState, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { Coins, Crown, ExternalLink, Medal, Star, Trophy } from 'lucide-react';
import { UNSTOP_URL } from '@/config/site';
import { playRegistrationSound, playHoverSound } from '@/utils/sound';
import './prizeCabinet.css';
import MysteryBlockViewer from './MysteryBlockViewer';

type Prize = {
  rank: string;
  label: string;
  amount: string;
  accent: string;
  glow: string;
  icon: 'crown' | 'trophy' | 'medal' | 'star';
  art?: string;
  className: string;
};

const prizes: Prize[] = [
  { rank: '2ND', label: 'HIGH SCORE', amount: '₹20,000', accent: '#D8E1F0', glow: 'rgba(216,225,240,0.52)', icon: 'trophy', art: '/prize-silver-trophy.png', className: 'silver-podium' },
  { rank: '1ST', label: 'BOSS CLEAR', amount: '₹50,000', accent: '#FFD700', glow: 'rgba(255,215,0,0.58)', icon: 'crown', art: '/prize-gold-trophy.png', className: 'champion-podium' },
  { rank: '3RD', label: 'BONUS STAGE', amount: '₹5,000', accent: '#C7854B', glow: 'rgba(199,133,75,0.48)', icon: 'trophy', art: '/prize-bronze-trophy.png', className: 'bronze-podium' },
  { rank: '4TH', label: 'BONUS STAGE', amount: '₹5,000', accent: '#C7854B', glow: 'rgba(199,133,75,0.48)', icon: 'trophy', art: '/prize-bronze-trophy.png', className: 'bronze-podium' },
  { rank: '5TH', label: 'BONUS STAGE', amount: '₹5,000', accent: '#C7854B', glow: 'rgba(199,133,75,0.48)', icon: 'trophy', art: '/prize-bronze-trophy.png', className: 'bronze-podium' },
];

function PrizeIcon({ type, color }: { type: Prize['icon']; color: string }) {
  const props = { className: 'prize-icon', style: { color }, strokeWidth: 2.15 };
  if (type === 'crown') return <Crown {...props} fill={color} />;
  if (type === 'trophy') return <Trophy {...props} />;
  if (type === 'medal') return <Medal {...props} />;
  return <Star {...props} fill={color} />;
}

function rewardDetail(prize: Prize) {
  return prize.rank === '1ST'
    ? 'Champion bounty for the team that clears the final boss.'
    : 'Leaderboard reward unlocked for this arcade rank.';
}

export default function PrizesSection() {
  const [selectedPrize, setSelectedPrize] = useState<number | null>(null);
  const championIndex = prizes.findIndex((prize) => prize.rank === '1ST');
  const champion = prizes[championIndex];

  const togglePrize = (index: number) => setSelectedPrize((current) => current === index ? null : index);
  const cardStyle = (prize: Prize) => ({ '--accent': prize.accent, '--glow': prize.glow } as CSSProperties);

  return (
    <section id="prizes" className="prize-stage">
      <div className="prize-grid" aria-hidden="true" />
      <div className="prize-orb prize-orb-cyan" aria-hidden="true" />

      <div className="prize-content">
        <header className="prize-heading">
          <span className="prize-tag"><Coins size={14} /> 04 / VICTORY REWARDS</span>
          <h2>THE <strong>REWARD VAULT</strong></h2>
          <p>Five teams make the leaderboard. One team takes home the grand bounty.</p>
        </header>

        <motion.div
          className="reward-vault"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="vault-kicker">TOTAL PRIZE POOL</span>
          <strong>₹85,000</strong>
          <span className="vault-caption">Rewards unlocked for the top five teams</span>
          <div className="vault-status"><i /> LIVE REWARD BOARD</div>
        </motion.div>

        <div className="reward-stage-layout">
          <div className="prize-board">
        <motion.button
          type="button"
          className={`champion-card ${selectedPrize === championIndex ? 'is-expanded' : ''}`}
          style={cardStyle(champion)}
          onClick={() => togglePrize(championIndex)}
          aria-expanded={selectedPrize === championIndex}
          aria-label={`1ST position, ${champion.amount}. ${selectedPrize === championIndex ? 'Hide' : 'Show'} reward detail.`}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ delay: 0.08, duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="champion-number">01</span>
          <div className="champion-copy">
            <span className="reward-eyebrow"><Crown size={16} fill="currentColor" /> GRAND PRIZE</span>
            <span className="champion-rank">{champion.rank} / {champion.label}</span>
            <strong>{champion.amount}</strong>
            <span className="reward-action">{selectedPrize === championIndex ? 'CLOSE DETAILS' : 'VIEW REWARD DETAILS'} <span aria-hidden="true">↗</span></span>
          </div>
          <div className="champion-art" aria-hidden="true">
            {champion.art ? <img src={champion.art} alt="" draggable={false} /> : <PrizeIcon type={champion.icon} color={champion.accent} />}
          </div>
          <motion.span
            className="reward-detail champion-detail"
            initial={false}
            animate={{ height: selectedPrize === championIndex ? 'auto' : 0, opacity: selectedPrize === championIndex ? 1 : 0 }}
          >
            {rewardDetail(champion)}
          </motion.span>
        </motion.button>

          <div className="reward-grid" aria-label="Prize placements. Select a placement for details.">
            {prizes.map((prize, index) => {
              if (index === championIndex) return null;
              const expanded = selectedPrize === index;
              return (
                <motion.button
                  type="button"
                  key={prize.rank}
                  className={`reward-card ${prize.className} ${prize.rank === '2ND' ? 'second-place-card' : ''} ${expanded ? 'is-expanded' : ''}`}
                  style={cardStyle(prize)}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ delay: 0.12 + index * 0.06, duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => togglePrize(index)}
                  aria-expanded={expanded}
                  aria-label={`${prize.rank} position, ${prize.amount}. ${expanded ? 'Hide' : 'Show'} reward detail.`}
                >
                  <span className="reward-card-top"><span>{prize.rank}</span><span>{expanded ? 'CLOSE' : 'DETAILS'}</span></span>
                  <div className="reward-card-icon">
                    {prize.art ? <img src={prize.art} alt="" draggable={false} /> : <PrizeIcon type={prize.icon} color={prize.accent} />}
                  </div>
                  <span className="reward-label">{prize.label}</span>
                  <strong>{prize.amount}</strong>
                  <motion.span
                    className="reward-detail"
                    initial={false}
                    animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
                  >
                    {rewardDetail(prize)}
                  </motion.span>
                </motion.button>
              );
            })}
          </div>
          </div>
          <MysteryBlockViewer />
        </div>

        <div className="prize-footer">
          <p>Select a reward to see its bounty. Official certificates are provided to all valid submissions.</p>
        </div>
      </div>
    </section>
  );
}
