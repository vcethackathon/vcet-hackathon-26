// Centralized site configuration for VCET Hackathon 2026 "Arcade"

export const UNSTOP_URL = "https://unstop.com/o/Pscxj9I?utm_medium=Share&utm_source=vcet_hackathon&utm_campaign=Online_coding_challenge";

export const SITE_CONFIG = {
  name: "VCET Hackathon 2026",
  tagline: "Arcade – Pixels to Possibilities",
  subtitle: "From raw code to real impact in a 30-hour arcade matrix.",
  dates: "September 4–5, 2026",
  eventStartISO: "2026-09-04T00:00:00+05:30",
  venue: "VCET Campus",
  email: "vcet.hackathon@vcet.edu.in",
  socials: {
    instagram: "https://www.instagram.com/vcet_hackathon26/",
    linkedin: "https://www.linkedin.com/in/vcet-hackathon/",
  },
  prizePool: "₹85,000",
  unstopUrl: UNSTOP_URL,
  navLinks: [
    { name: "ABOUT", href: "#about" },
    { name: "TRACKS", href: "#tracks" },
    { name: "TIMELINE", href: "#timeline" },
    { name: "PRIZES", href: "#prizes" },
    { name: "SPONSORS", href: "#sponsors" },
    { name: "FAQ", href: "#faq" },
  ],
  stats: [
    { label: "TOTAL PRIZE POOL", value: 85000, prefix: "₹", suffix: "", isCurrency: true },
    { label: "DAYS OF HACKING", value: 2, prefix: "", suffix: " DAYS" },
    { label: "HOURS OF CODE", value: 30, prefix: "", suffix: "+ HRS" },
    { label: "EXPECTED PARTICIPANTS", value: 200, prefix: "", suffix: "+" },
  ],
  faqItems: [
    {
      q: "WHO CAN PARTICIPATE IN VCET HACKATHON 2026?",
      a: "The hackathon is open to all undergraduate students from any stream or institution with a valid student ID. Whether you are a freshman writing your first line of code or a senior building distributed systems, all skill levels are welcome!",
    },
    {
      q: "WHAT IS THE TEAM SIZE?",
      a: "Teams can consist of 3 to 4 members. You can register as a team or form a team before the event starts. Individual participation is not Allowed by our organizing team.",
    },
    {
      q: "IS THERE A REGISTRATION FEE?",
      a: "Registration fee is ₹500 per head. Registration details and nominal entry requirements are managed via Unstop. After the shortlisting round via Unstop only the shortlisted team will have to pay the registration price in total depending on the number of members in a team.",
    },
    {
      q: "DO I NEED TO HAVE A WORKING PROTOTYPE AT SUBMISSION?",
      a: "Yes! By the end of the 30-hour hacking period, teams are expected to present a functional prototype along with source code and a presentation demo for the judging panel.",
    },
    {
      q: "CAN I BEGIN WORKING ON MY PROJECT BEFORE THE EVENT?",
      a: "No. All code, design, and implementation must be built during the official 30-hour hacking window. Pre-built projects or code templates are strictly prohibited and subject to disqualification.",
    },
    {
      q: "WHAT SHOULD I BRING TO THE VENUE?",
      a: "Bring your laptop, charger, valid college ID card, extension cord, personal essentials, and your endless creativity! High-speed Wi-Fi, power outlets, some refreshments and resting areas will be provided to the participants during the event.",
    },
  ],
};
