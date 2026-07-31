import type { Metadata } from "next";
import { Press_Start_2P, Space_Grotesk } from "next/font/google";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: 'VCET Hackathon 2026 | Arcade – Pixels to Possibilities',
  description: 'Join the ultimate 36-hour college hackathon at VCET Campus. ₹1,00,000 Prize Pool. Transform pixels into real-world possibilities on Sep 4–5, 2026.',
  keywords: ['VCET Hackathon', 'Arcade', 'College Hackathon', 'Coding Competition', 'Unstop', 'Prize Pool'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${pressStart2P.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-[#0B0C10] text-[#F3F4F6] antialiased selection:bg-[#FF007F] selection:text-black min-h-screen">
        {children}
      </body>
    </html>
  );
}
