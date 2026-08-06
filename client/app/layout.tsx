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
  metadataBase: new URL('https://www.vcet-hackathon.com'),
  title: 'VCET Hackathon 2026 | Arcade – Pixels to Possibilities',
  description: 'Join the ultimate 30-hour college hackathon at VCET Campus. ₹1,00,000 Prize Pool. Registrations are OPEN on Unstop!',
  keywords: ['VCET Hackathon', 'Arcade', 'College Hackathon', 'Coding Competition', 'Unstop', 'Prize Pool', 'VCET 2026'],
  alternates: {
    canonical: 'https://www.vcet-hackathon.com',
  },
  openGraph: {
    title: 'VCET Hackathon 2026 | Arcade – Pixels to Possibilities',
    description: 'Join the ultimate 30-hour college hackathon at VCET Campus. ₹1,00,000 Prize Pool. Registrations are OPEN on Unstop!',
    url: 'https://www.vcet-hackathon.com',
    siteName: 'VCET Hackathon 2026',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "VCET Hackathon 2026 – Arcade",
  "startDate": "2026-09-04T09:00:00+05:30",
  "endDate": "2026-09-05T15:00:00+05:30",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled",
  "location": {
    "@type": "Place",
    "name": "Vidyavardhini's College of Engineering and Technology (VCET)",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "K.T. Marg, Vasai Road West",
      "addressLocality": "Vasai",
      "addressRegion": "Maharashtra",
      "postalCode": "401202",
      "addressCountry": "IN"
    }
  },
  "image": ["https://www.vcet-hackathon.com/logo.png"],
  "description": "VCET Hackathon 2026 Arcade Edition is a 30-hour coding event with a ₹1,00,000 prize pool. Registrations are OPEN on Unstop.",
  "offers": {
    "@type": "Offer",
    "url": "https://unstop.com/o/Pscxj9I?utm_medium=Share&utm_source=vcet_hackathon&utm_campaign=Online_coding_challenge",
    "price": "0",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "validFrom": "2026-08-01"
  },
  "organizer": {
    "@type": "Organization",
    "name": "VCET Hackathon Team",
    "url": "https://www.vcet-hackathon.com"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${pressStart2P.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="preconnect" href="https://sketchfab.com" />
        <link rel="dns-prefetch" href="https://sketchfab.com" />
        <link rel="preload" href="/models/horror_pac-man.glb" as="fetch" crossOrigin="anonymous" />
        <link rel="preload" href="/mystery-block.glb" as="fetch" crossOrigin="anonymous" />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-9S1HGFTT07"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-9S1HGFTT07');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
      </head>
      <body className="bg-[#0B0C10] text-[#F3F4F6] antialiased selection:bg-[#FF007F] selection:text-black min-h-screen">
        {children}
      </body>
    </html>
  );
}
