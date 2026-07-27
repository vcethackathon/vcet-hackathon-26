export interface Track {
  icon: string;
  tag: string;
  name: string;
  desc: string;
  hp: string;
  num: string;
}

export const TRACKS: Track[] = [
  {
    icon: "🌐",
    tag: "WebCraft",
    name: "Full Stack Web",
    desc: "Build responsive, scalable web applications with modern architectures and powerful UX.",
    hp: "92%",
    num: "01",
  },
  {
    icon: "🤖",
    tag: "AI / ML",
    name: "The Neural Net",
    desc: "Train and deploy intelligent models, agentic workflows, and smart automation tools.",
    hp: "88%",
    num: "02",
  },
  {
    icon: "🎮",
    tag: "GameDev",
    name: "Giga Pacman",
    desc: "Architect immersive 2D/3D games, WebGL worlds, and gamified experiences.",
    hp: "79%",
    num: "03",
  },
  {
    icon: "🔗",
    tag: "Blockchain",
    name: "Chain Breaker",
    desc: "Build decentralized apps, smart contracts, and trustless protocols on Web3.",
    hp: "85%",
    num: "04",
  },
  {
    icon: "📡",
    tag: "IoT",
    name: "Signal Ghost",
    desc: "Connect physical and digital worlds with embedded systems, sensors, and real-time data.",
    hp: "76%",
    num: "05",
  },
  {
    icon: "☁️",
    tag: "Cloud / DevOps",
    name: "The Docker",
    desc: "Architect scalable cloud infrastructure, CI/CD pipelines, and deployment automation.",
    hp: "91%",
    num: "06",
  },
];
