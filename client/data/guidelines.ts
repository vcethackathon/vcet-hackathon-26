export interface Guideline {
  icon: string;
  tag: string;
  title: string;
  desc: string;
  num: string;
}

export const GUIDELINES: Guideline[] = [
  {
    icon: "🎓",
    tag: "Eligibility",
    title: "Open Roster",
    desc: "Any student currently enrolled in an engineering or technology course can queue up. All years, all branches welcome.",
    num: "01",
  },
  {
    icon: "🧑‍🤝‍🧑",
    tag: "Party Size",
    title: "1-4 Players",
    desc: "Solo run or full party — teams of 1 to 4 members. Squads of 3-4 get the best co-op experience.",
    num: "02",
  },
  {
    icon: "💻",
    tag: "Loadout",
    title: "Bring Your Rig",
    desc: "Laptop, charger, valid college ID, and your best ideas. Power and Wi-Fi are provided at the venue.",
    num: "03",
  },
  {
    icon: "🧠",
    tag: "Original Build",
    title: "No Pre-Built Code",
    desc: "All code must be written during the event. Open-source libraries and public APIs are fair game.",
    num: "04",
  },
  {
    icon: "⏱️",
    tag: "Checkpoints",
    title: "Mandatory Check-ins",
    desc: "Teams must check in at each judging checkpoint. Missing a checkpoint costs progress on the leaderboard.",
    num: "05",
  },
  {
    icon: "⚖️",
    tag: "Fair Play",
    title: "Code of Conduct",
    desc: "Respect fellow players, mentors, and judges. Plagiarism or unsportsmanlike conduct means instant disqualification.",
    num: "06",
  },
];
