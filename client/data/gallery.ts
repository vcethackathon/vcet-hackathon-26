export interface GalleryTile {
  emoji: string;
  caption: string;
  cls: string;
}

export const GALLERY: GalleryTile[] = [
  { emoji: "🕹️", caption: "Opening Ceremony", cls: "g-cyan" },
  { emoji: "💡", caption: "Ideation Sprint", cls: "g-magenta" },
  { emoji: "⌨️", caption: "Overnight Grind", cls: "g-gold" },
  { emoji: "🤝", caption: "Mentor Rounds", cls: "g-purple" },
  { emoji: "🎤", caption: "Final Pitches", cls: "g-magenta" },
  { emoji: "🏆", caption: "Prize Ceremony", cls: "g-cyan" },
  { emoji: "🍕", caption: "Fuel Breaks", cls: "g-gold" },
  { emoji: "📸", caption: "Squad Photos", cls: "g-purple" },
];
