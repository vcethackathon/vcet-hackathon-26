interface FooterSectionProps {
  onInsertCoin: () => void;
}

export default function FooterSection({ onInsertCoin }: FooterSectionProps) {
  return (
    <footer id="contact" className="footer-cta">
      <div
        className="section-label"
        style={{ justifyContent: "center", marginBottom: "1.5rem" }}
      >
        Ready Player?
      </div>

      <h2 className="cta-title">
        Secure Your Slot.
        <br />
        Start Building.
      </h2>

      <p className="cta-sub">
        Registration is free. Spots are limited. Don't let your credit run out.
      </p>

      <div
        style={{
          display: "flex",
          gap: "1.2rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <a href="#register" className="btn-primary" onClick={onInsertCoin}>
          ▶ INSERT COIN — JOIN
        </a>
        <a href="mailto:hackathon@vcet.edu.in" className="btn-secondary">
          ✉ CONTACT US
        </a>
      </div>

      <div className="footer-bottom">
        <div className="footer-brand">VCET ARCADE HACK 2026</div>
        <div>© 2026 Vidyavardhini's College of Engineering &amp; Technology</div>
        <div>Organized by IT Department</div>
      </div>
    </footer>
  );
}
