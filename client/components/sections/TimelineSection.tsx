import SectionHeader from "@/components/ui/SectionHeader";
import { TIMELINE } from "@/data";

export default function TimelineSection() {
  return (
    <section
      id="timeline"
      className="section"
      style={{ background: "rgba(0,0,0,.15)" }}
    >
      <SectionHeader
        label="Quest Map"
        title="Event Timeline"
        sub="Four critical levels stand between you and the final boss. Clear each one to advance."
      />

      <div className="timeline-list">
        {TIMELINE.map((t, i) => (
          <div key={i} className="tl-item">
            <div className="tl-date">{t.date}</div>
            <div className="tl-node">
              <div className="tl-dot" />
            </div>
            <div className="tl-card">
              <div className="tl-level">{t.level}</div>
              <div className="tl-title">{t.title}</div>
              <div className="tl-desc">{t.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
