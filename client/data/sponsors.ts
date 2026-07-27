export interface SponsorTier {
  label: string;
  cards: string[];
}

export const SPONSOR_TIERS: SponsorTier[] = [
  {
    label: "⭐ Title Sponsor",
    cards: ["VCET IT Dept."],
  },
  {
    label: "Gold Sponsors",
    cards: ["TechCorp", "CloudBase", "NeuralX"],
  },
  {
    label: "Silver Sponsors",
    cards: ["DevHub", "PixelLabs", "ByteForge", "OpenStack Co."],
  },
];
