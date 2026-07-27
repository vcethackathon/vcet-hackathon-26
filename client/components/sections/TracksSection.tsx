import SectionHeader from "@/components/ui/SectionHeader";
import { TRACKS } from "@/data";

export default function TracksSection() {
  return (
    <section
      id="tracks"
      className="section"
      style={{ background: "rgba(0,0,0,.15)" }}
    >
      <SectionHeader
        label="Domain Tracks"
        title="Select Your Boss"
        sub="Choose your domain and build a solution that defeats the challenge. Six boss arenas. One winner."
      />

      <div className="tracks-grid">
        {TRACKS.map((t) => (
          <div key={t.num} className="track-card">
            <span className="track-num">{t.num}</span>
            <div className="track-icon">{t.icon}</div>
            <span className="track-tag">{t.tag}</span>
            <h3 className="track-name">{t.name}</h3>
            <p className="track-desc">{t.desc}</p>
            <div className="track-hp">
              <span className="hp-label">HP</span>
              <div className="hp-bar-bg">
                <div className="hp-bar-fill" style={{ width: t.hp }} />
              </div>
              <span className="hp-label">{t.hp}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
