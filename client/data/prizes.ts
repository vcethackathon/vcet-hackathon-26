export interface Prize {
  rank: string;
  /** CSS modifier class: p1 | p2 | p3 | sp */
  cls: "p1" | "p2" | "p3" | "sp";
  title: string;
  sub: string;
  amount: string;
}

export const PRIZES: Prize[] = [
  {
    rank: "🥇 1ST",
    cls: "p1",
    title: "Grand Champion",
    sub: "Best Overall Project",
    amount: "₹50,000",
  },
  {
    rank: "🥈 2ND",
    cls: "p2",
    title: "Runner Up",
    sub: "Second Best Project",
    amount: "₹20,000",
  },
  {
    rank: "🥉 3RD",
    cls: "p3",
    title: "Third Place",
    sub: "Third Best Project",
    amount: "₹10,000",
  },
  {
    rank: "⭐ SP",
    cls: "sp",
    title: "Best UI/UX",
    sub: "Special Category",
    amount: "₹5,000",
  },
  {
    rank: "⭐ SP",
    cls: "sp",
    title: "Best Use of AI",
    sub: "Special Category",
    amount: "₹5,000",
  },
];
