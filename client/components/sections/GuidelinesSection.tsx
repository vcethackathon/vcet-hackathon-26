import SectionHeader from "@/components/ui/SectionHeader";
import { GUIDELINES } from "@/data";

export default function GuidelinesSection() {
  return (
    <section id="guidelines" className="section">
      <SectionHeader
        label="Rulebook"
        title="Guidelines & Rules"
        sub="Read the rulebook before you press start. Six rules stand between you and a fair run."
      />

      <div className="tracks-grid">
        {GUIDELINES.map((g) => (
          <div key={g.num} className="track-card">
            <span className="track-num">{g.num}</span>
            <div className="track-icon">{g.icon}</div>
            <span className="track-tag">{g.tag}</span>
            <h3 className="track-name">{g.title}</h3>
            <p className="track-desc">{g.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
