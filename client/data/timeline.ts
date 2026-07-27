export interface TimelineEvent {
  date: string;
  level: string;
  title: string;
  desc: string;
}

export const TIMELINE: TimelineEvent[] = [
  {
    date: "Sept 24",
    level: "LVL 01",
    title: "Registrations Open",
    desc: "Fill in your team details, choose your track, and claim your starting credits.",
  },
  {
    date: "Oct 1",
    level: "LVL 02",
    title: "Team Shortlisting",
    desc: "The VCET council reviews submissions and announces the shortlisted teams.",
  },
  {
    date: "Oct 10",
    level: "LVL 03",
    title: "Pre-Event Workshop",
    desc: "Optional workshops on full-stack, AI, and pitching skills — hosted by mentors.",
  },
  {
    date: "Oct 13",
    level: "LVL 04",
    title: "Hackathon Begins!",
    desc: "The 30-hour sprint begins. Build, break, fix, repeat. You have 30 hours — use them.",
  },
  {
    date: "Oct 14",
    level: "BOSS",
    title: "Pitch & Win",
    desc: "Present your build to judges. The best teams earn their spot on the high-score board.",
  },
];
