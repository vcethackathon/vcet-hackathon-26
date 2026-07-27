'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ArcadeStage = dynamic(() => import('@/components/ArcadeStage'), { ssr: false });
const ArcadeSpaceCanvas = dynamic(() => import('@/components/ArcadeSpaceCanvas'), { ssr: false });

// ─── Countdown Timer ───────────────────────────────────────────────────────
function useCountdown(targetDate: Date) {
  const calc = () => {
    const diff = Math.max(0, targetDate.getTime() - Date.now());
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return t;
}

function Countdown() {
  const t = useCountdown(new Date('2025-10-13T09:00:00+05:30'));
  const f = (n: number) => String(n).padStart(2, '0');
  const blocks = [
    { val: t.days,    lbl: 'Days' },
    { val: t.hours,   lbl: 'Hours' },
    { val: t.minutes, lbl: 'Mins' },
    { val: t.seconds, lbl: 'Secs' },
  ];
  return (
    <div className="hero-countdown">
      {blocks.map((b, i) => (
        <React.Fragment key={b.lbl}>
          <div className="countdown-block">
            <span className="countdown-num">{f(b.val)}</span>
            <span className="countdown-lbl">{b.lbl}</span>
          </div>
          {i < blocks.length - 1 && <div className="countdown-sep">:</div>}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── FAQ Accordion ─────────────────────────────────────────────────────────
const FAQS = [
  { q: 'Who can participate?', a: 'Any student currently enrolled in an engineering or technology course. Participants can be from any year and any branch.' },
  { q: 'What is the team size?', a: 'Teams can have 1 to 4 members. We encourage teams of 3-4 for the best collaborative experience.' },
  { q: 'Is there a registration fee?', a: 'No, participation is completely free! Just register online and get selected.' },
  { q: 'What should I bring?', a: 'Your laptop, charger, valid college ID, and your most creative ideas. Meals and refreshments will be provided on-site.' },
  { q: 'Will there be mentors?', a: 'Yes! Industry mentors and expert judges will be present throughout the event to guide your team.' },
  { q: 'What are the judging criteria?', a: 'Innovation, technical complexity, design & UX, business viability, and the final presentation pitch.' },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="faq-list">
      {FAQS.map((f, i) => (
        <div key={i} className={`faq-item${open === i ? ' open' : ''}`}>
          <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
            <span>{f.q}</span>
            <span className="faq-icon">+</span>
          </button>
          <div className="faq-a">{f.a}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────
export default function Page() {
  const [coinState, setCoinState] = useState<'idle' | 'ready'>('idle');

  const insertCoin = () => {
    setCoinState('ready');
    if (typeof window !== 'undefined') {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        [[880, 0], [1200, 0.12], [660, 0.24]].forEach(([freq, delay]) => {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = 'square';
          osc.frequency.value = freq as number;
          g.gain.setValueAtTime(0.08, ctx.currentTime + (delay as number));
          g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (delay as number) + 0.1);
          osc.connect(g); g.connect(ctx.destination);
          osc.start(ctx.currentTime + (delay as number));
          osc.stop(ctx.currentTime + (delay as number) + 0.12);
        });
      } catch (_) { /* audio not supported */ }
    }
  };

  return (
    <>
      {/* ── 3D ARCADE SPACE BACKGROUND & SCROLL PAC-MAN ── */}
      <ArcadeSpaceCanvas />

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="nav-brand">
          <span className="nav-brand-dot" />
          VCET<span style={{ color: '#fff' }}> ARCADE</span>
        </div>
        <ul className="nav-links">
          {['About', 'Tracks', 'Prizes', 'Timeline', 'Sponsors', 'FAQ'].map(l => (
            <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
          ))}
        </ul>
        <a href="#register" className="nav-cta">Register Now</a>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="hero-section">
        {/* Full-bleed Sketchfab 3D model — sits behind everything */}
        <div className="hero-canvas-wrap">
          <ArcadeStage />
        </div>

        {/* Dark gradient overlay — solid on left for text, fades to transparent on right */}
        <div className="hero-overlay" />

        {/* Decorative grid on top of model, below text */}
        <div className="hero-grid-bg" />

        {/* Text content floating on the left */}
        <div className="hero-content">
          <div className="hero-eyebrow">VCET — Arcade Edition — 2026</div>

          <h1 className="hero-h1">
            HACK<br />THE<br />ARCADE
          </h1>

          <p className="hero-sub">
            A 30-hour premium hackathon experience at Vidyavardhini's College of Engineering &amp; Technology — packed with neon energy, bold ideas, and real prizes.
          </p>

          <div className="hero-actions">
            <button
              id="register"
              className="btn-primary"
              onClick={insertCoin}
            >
              {coinState === 'ready' ? '▶ PLAYER 1 READY' : '▶ INSERT COIN — JOIN'}
            </button>
            <a href="#about" className="btn-secondary">LEARN MORE</a>
          </div>

          <Countdown />

          <div className="hero-stats-strip">
            <div className="hero-stat-item">
              <div className="stat-val">30H</div>
              <div className="stat-lbl">Live Hacking</div>
            </div>
            <div className="hero-stat-item">
              <div className="stat-val">₹80K+</div>
              <div className="stat-lbl">Prize Pool</div>
            </div>
            <div className="hero-stat-item">
              <div className="stat-val">1–4</div>
              <div className="stat-lbl">Team Size</div>
            </div>
            <div className="hero-stat-item">
              <div className="stat-val">6+</div>
              <div className="stat-lbl">Tracks</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section">
        <div className="about-grid">
          <div className="about-visual">
            <div className="about-visual-inner">
              <div className="about-neon-text">30H<br />HACK</div>
              <div className="about-corner tl" />
              <div className="about-corner tr" />
              <div className="about-corner bl" />
              <div className="about-corner br" />
            </div>
          </div>
          <div>
            <div className="section-label">About The Event</div>
            <h2 className="section-title">What is VCET Arcade Hack?</h2>
            <p className="section-sub">
              VCET Hackathon is a 30-hour event organized by the Department of Information Technology at Vidyavardhini's College of Engineering and Technology. We aim to foster a strong programming culture and build critical problem-solving skills among students.
            </p>
            <p className="section-sub" style={{ marginTop: '1rem' }}>
              This year's theme is <strong style={{ color: 'var(--cyan)' }}>Arcade</strong> — blending retro gaming energy with cutting-edge technology to inspire the next wave of innovators.
            </p>
            <div className="about-stats-row">
              <div className="about-stat-card">
                <div className="asc-val">500+</div>
                <div className="asc-lbl">Registrations</div>
              </div>
              <div className="about-stat-card">
                <div className="asc-val">50+</div>
                <div className="asc-lbl">Teams Shortlisted</div>
              </div>
              <div className="about-stat-card">
                <div className="asc-val">20+</div>
                <div className="asc-lbl">Industry Mentors</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRACKS ── */}
      <section id="tracks" className="section" style={{ background: 'rgba(0,0,0,.15)' }}>
        <div className="section-label">Domain Tracks</div>
        <h2 className="section-title">Select Your Boss</h2>
        <p className="section-sub">Choose your domain and build a solution that defeats the challenge. Six boss arenas. One winner.</p>

        <div className="tracks-grid">
          {[
            { icon: '🌐', tag: 'WebCraft', name: 'Full Stack Web', desc: 'Build responsive, scalable web applications with modern architectures and powerful UX.', hp: '92%', num: '01' },
            { icon: '🤖', tag: 'AI / ML', name: 'The Neural Net', desc: 'Train and deploy intelligent models, agentic workflows, and smart automation tools.', hp: '88%', num: '02' },
            { icon: '🎮', tag: 'GameDev', name: 'Giga Pacman', desc: 'Architect immersive 2D/3D games, WebGL worlds, and gamified experiences.', hp: '79%', num: '03' },
            { icon: '🔗', tag: 'Blockchain', name: 'Chain Breaker', desc: 'Build decentralized apps, smart contracts, and trustless protocols on Web3.', hp: '85%', num: '04' },
            { icon: '📡', tag: 'IoT', name: 'Signal Ghost', desc: 'Connect physical and digital worlds with embedded systems, sensors, and real-time data.', hp: '76%', num: '05' },
            { icon: '☁️', tag: 'Cloud / DevOps', name: 'The Docker', desc: 'Architect scalable cloud infrastructure, CI/CD pipelines, and deployment automation.', hp: '91%', num: '06' },
          ].map(t => (
            <div key={t.num} className="track-card">
              <span className="track-num">{t.num}</span>
              <div className="track-icon">{t.icon}</div>
              <span className="track-tag">{t.tag}</span>
              <h3 className="track-name">{t.name}</h3>
              <p className="track-desc">{t.desc}</p>
              <div className="track-hp">
                <span className="hp-label">HP</span>
                <div className="hp-bar-bg"><div className="hp-bar-fill" style={{ width: t.hp }} /></div>
                <span className="hp-label">{t.hp}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRIZES ── */}
      <section id="prizes" className="section">
        <div style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>High Scores</div>
          <h2 className="section-title">Prizes & Rewards</h2>
          <p className="section-sub" style={{ margin: '1rem auto 0' }}>Compete, build, and claim your loot. Real money, real trophies, real recognition.</p>
        </div>

        <div className="prizes-wrapper">
          <div className="prizes-bg-card">
            <div className="prizes-header-bar">
              <span>🏆</span>
              <span>HIGH SCORE LEADERBOARD — VCET ARCADE HACK 2026</span>
            </div>
            {[
              { rank: '🥇 1ST', cls: 'p1', title: 'Grand Champion', sub: 'Best Overall Project', amount: '₹50,000' },
              { rank: '🥈 2ND', cls: 'p2', title: 'Runner Up',      sub: 'Second Best Project',  amount: '₹20,000' },
              { rank: '🥉 3RD', cls: 'p3', title: 'Third Place',    sub: 'Third Best Project',   amount: '₹10,000' },
              { rank: '⭐ SP', cls: 'sp', title: 'Best UI/UX',      sub: 'Special Category',     amount: '₹5,000' },
              { rank: '⭐ SP', cls: 'sp', title: 'Best Use of AI',  sub: 'Special Category',     amount: '₹5,000' },
            ].map((p, i) => (
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

      {/* ── TIMELINE ── */}
      <section id="timeline" className="section" style={{ background: 'rgba(0,0,0,.15)' }}>
        <div className="section-label">Quest Map</div>
        <h2 className="section-title">Event Timeline</h2>
        <p className="section-sub">Four critical levels stand between you and the final boss. Clear each one to advance.</p>

        <div className="timeline-list">
          {[
            { date: 'Sept 24', level: 'LVL 01', title: 'Registrations Open', desc: 'Fill in your team details, choose your track, and claim your starting credits.' },
            { date: 'Oct 1',   level: 'LVL 02', title: 'Team Shortlisting',  desc: 'The VCET council reviews submissions and announces the shortlisted teams.' },
            { date: 'Oct 10',  level: 'LVL 03', title: 'Pre-Event Workshop', desc: 'Optional workshops on full-stack, AI, and pitching skills — hosted by mentors.' },
            { date: 'Oct 13',  level: 'LVL 04', title: 'Hackathon Begins!',  desc: 'The 30-hour sprint begins. Build, break, fix, repeat. You have 30 hours — use them.' },
            { date: 'Oct 14',  level: 'BOSS',   title: 'Pitch & Win',        desc: 'Present your build to judges. The best teams earn their spot on the high-score board.' },
          ].map((t, i) => (
            <div key={i} className="tl-item">
              <div className="tl-date">{t.date}</div>
              <div className="tl-node"><div className="tl-dot" /></div>
              <div className="tl-card">
                <div className="tl-level">{t.level}</div>
                <div className="tl-title">{t.title}</div>
                <div className="tl-desc">{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SPONSORS ── */}
      <section id="sponsors" className="section" style={{ textAlign: 'center' }}>
        <div className="section-label" style={{ justifyContent: 'center' }}>Powered By</div>
        <h2 className="section-title">Our Sponsors</h2>
        <p className="section-sub" style={{ margin: '1rem auto 2rem' }}>Industry leaders who believe in the next generation of builders.</p>

        <div className="sponsors-tiers">
          <div>
            <div className="sponsor-tier-label">⭐ Title Sponsor</div>
            <div className="sponsor-row">
              <div className="sponsor-card">VCET IT Dept.</div>
            </div>
          </div>
          <div>
            <div className="sponsor-tier-label">Gold Sponsors</div>
            <div className="sponsor-row">
              {['TechCorp', 'CloudBase', 'NeuralX'].map(s => (
                <div key={s} className="sponsor-card">{s}</div>
              ))}
            </div>
          </div>
          <div>
            <div className="sponsor-tier-label">Silver Sponsors</div>
            <div className="sponsor-row">
              {['DevHub', 'PixelLabs', 'ByteForge', 'OpenStack Co.'].map(s => (
                <div key={s} className="sponsor-card">{s}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="section" style={{ background: 'rgba(0,0,0,.15)' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Help Center</div>
          <h2 className="section-title">FAQ</h2>
        </div>
        <FAQ />
      </section>

      {/* ── FOOTER CTA ── */}
      <footer id="contact" className="footer-cta">
        <div className="section-label" style={{ justifyContent: 'center', marginBottom: '1.5rem' }}>Ready Player?</div>
        <h2 className="cta-title">Secure Your Slot.<br />Start Building.</h2>
        <p className="cta-sub">Registration is free. Spots are limited. Don't let your credit run out.</p>
        <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#register" className="btn-primary" onClick={insertCoin}>▶ INSERT COIN — JOIN</a>
          <a href="mailto:hackathon@vcet.edu.in" className="btn-secondary">✉ CONTACT US</a>
        </div>

        <div className="footer-bottom">
          <div className="footer-brand">VCET ARCADE HACK 2026</div>
          <div>© 2026 Vidyavardhini's College of Engineering & Technology</div>
          <div>Organized by IT Department</div>
        </div>
      </footer>
    </>
  );
}
