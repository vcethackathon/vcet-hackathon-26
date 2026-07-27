import SectionHeader from "@/components/ui/SectionHeader";
import { PRIZES } from "@/data";

export default function PrizesSection() {
  return (
    <section id="prizes" className="section">
      <SectionHeader
        label="High Scores"
        title="Prizes & Rewards"
        sub="Compete, build, and claim your loot. Real money, real trophies, real recognition."
        centred
      />

      <div className="prizes-wrapper">
        <div className="prizes-bg-card">
          <div className="prizes-header-bar">
            <span>🏆</span>
            <span>HIGH SCORE LEADERBOARD — VCET ARCADE HACK 2026</span>
          </div>

          {PRIZES.map((p, i) => (
            <div key={i} className={`prize-row ${p.cls}`}>
              <span className="prize-rank">{p.rank}</span>
              <div>
                <div className="prize-info-title">{p.title}</div>
                <div className="prize-info-sub">{p.sub}</div>
              </div>
              <span className="prize-amount">{p.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
