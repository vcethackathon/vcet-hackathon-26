import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VCET Arcade Hackathon 2026',
  description: 'A 30-hour premium arcade-themed hackathon at VCET — ₹80K+ prize pool, neon energy, and next-level innovation.',
  keywords: ['hackathon', 'VCET', 'arcade', 'coding', 'tech', 'prize', '2026'],
  openGraph: {
    title: 'VCET Arcade Hackathon 2026',
    description: 'A 30-hour premium arcade-themed hackathon. Register now.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
