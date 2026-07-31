export interface HeroStat {
  val: string;
  lbl: string;
}

/** Target date for the live countdown timer — September 4, 2026 */
export const HACKATHON_DATE = new Date("2026-09-04T08:30:00+05:30");

export const HERO_STATS: HeroStat[] = [
  { val: "30H", lbl: "Live Hacking" },
  { val: "₹80K+", lbl: "Prize Pool" },
  { val: "1–4", lbl: "Team Size" },
  { val: "6+", lbl: "Tracks" },
];
