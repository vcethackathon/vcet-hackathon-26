import ArcadeStage from '@/components/ArcadeStage';

const stats = [
  { value: '30h', label: 'Live hacking' },
  { value: '₹80K', label: 'Prize pool' },
  { value: '4', label: 'Winning tiers' },
];

const badges = ['Neon arcade UI', 'Realtime challenge', 'High-speed design'];

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-shell">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span />
            Arcade Edition • VCET 2026
          </div>

          <h1 className="hero-title">
            Build your next big idea in <strong>arcade</strong> mode.
          </h1>

          <p className="hero-lead">
            A premium hackathon experience with neon energy, cinematic motion, and a 3D centerpiece designed to feel unmistakably elevated.
          </p>

          <div className="hero-actions">
            <a className="cta-primary" href="#register">
              Claim your spot
            </a>
            <a className="cta-secondary" href="#details">
              Event breakdown
            </a>
          </div>

          <div className="hero-stats">
            {stats.map((stat) => (
              <div className="stat-card" key={stat.label}>
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="hero-badges">
            {badges.map((badge) => (
              <span className="pill" key={badge}>
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="backdrop-ring" />
          <div className="hero-grid" />

          <ArcadeStage />

          <div className="hero-console">
            <div className="console-header">
              <span />
              <span />
              <span />
            </div>
            <div className="console-screen">
              <h2>VCET Arcade Hack</h2>
              <div className="console-row">
                <div>
                  <p>Starts</p>
                  <strong>Oct 13</strong>
                </div>
                <div>
                  <p>Team size</p>
                  <strong>1-4</strong>
                </div>
              </div>
              <div className="console-row reverse">
                <div>
                  <p>Theme</p>
                  <strong>Game craft</strong>
                </div>
                <div>
                  <p>Prize</p>
                  <strong>₹80K+</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-panel hero-detail-panel" aria-label="Event highlights">
            <div className="hero-chip">
              <strong>30h</strong>
              <span>Live hacker sprint</span>
            </div>
            <div className="hero-chip">
              <strong>₹80K+</strong>
              <span>Prize pool</span>
            </div>
            <div className="hero-chip">
              <strong>4 tiers</strong>
              <span>Winner tracks</span>
            </div>
            <div className="hero-chip">
              <strong>24/7</strong>
              <span>Momentum mode</span>
            </div>
          </div>

          <div className="scanline" />
          <div className="hero-spark hero-spark--left" />
          <div className="hero-spark hero-spark--right" />
        </div>
      </div>
    </section>
  );
}
