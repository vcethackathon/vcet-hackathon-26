import SectionHeader from "@/components/ui/SectionHeader";
import { GALLERY } from "@/data";

export default function GallerySection() {
  return (
    <section
      id="gallery"
      className="section"
      style={{ background: "rgba(0,0,0,.15)" }}
    >
      <SectionHeader
        label="Replay"
        title="Photo Gallery"
        sub="Highlights from past runs. Real photos drop closer to event day."
        centred
      />

      <div className="gallery-grid">
        {GALLERY.map((g, i) => (
          <div key={i} className={`gallery-tile ${g.cls}`}>
            <span className="gallery-emoji">{g.emoji}</span>
            <span className="gallery-caption">{g.caption}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
