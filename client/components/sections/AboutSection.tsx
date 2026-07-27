import dynamic from "next/dynamic";
import SectionHeader from "@/components/ui/SectionHeader";

const HorrorPacmanModel = dynamic(
  () => import("@/components/HorrorPacmanModel"),
  { ssr: false }
);

export default function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="about-grid">
        {/* 3D model visual */}
        <div className="about-visual">
          <div className="about-visual-inner">
            <HorrorPacmanModel />
            <div className="about-model-caption">30H HACK</div>
          </div>
        </div>

        {/* Copy */}
        <div>
          <SectionHeader
            label="About The Event"
            title="What is VCET Arcade Hack?"
          />

          <p className="section-sub">
            VCET Hackathon is a 30-hour event organized by the Department of
            Information Technology at Vidyavardhini's College of Engineering and
            Technology. We aim to foster a strong programming culture and build
            critical problem-solving skills among students.
          </p>

          <p className="section-sub" style={{ marginTop: "1rem" }}>
            This year's theme is{" "}
            <strong style={{ color: "var(--cyan)" }}>Arcade</strong> — blending
            retro gaming energy with cutting-edge technology to inspire the next
            wave of innovators.
          </p>

          <div className="about-stats-row">
            {[
              { val: "500+", lbl: "Registrations" },
              { val: "50+", lbl: "Teams Shortlisted" },
              { val: "20+", lbl: "Industry Mentors" },
            ].map((s) => (
              <div key={s.lbl} className="about-stat-card">
                <div className="asc-val">{s.val}</div>
                <div className="asc-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
