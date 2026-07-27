import SectionHeader from "@/components/ui/SectionHeader";
import { SPONSOR_TIERS } from "@/data";

export default function SponsorsSection() {
  return (
    <section id="sponsors" className="section" style={{ textAlign: "center" }}>
      <SectionHeader
        label="Powered By"
        title="Our Sponsors"
        sub="Industry leaders who believe in the next generation of builders."
        centred
      />

      <div className="sponsors-tiers">
        {SPONSOR_TIERS.map((tier) => (
          <div key={tier.label}>
            <div className="sponsor-tier-label">{tier.label}</div>
            <div className="sponsor-row">
              {tier.cards.map((name) => (
                <div key={name} className="sponsor-card">
                  {name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
