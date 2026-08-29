'use client';

import { SITE_CONFIG } from '@/config/site';
import { MapPin, Mail, Phone } from 'lucide-react';
import { playHoverSound } from '@/utils/sound';
import Image from 'next/image';

const navigationLinks = [
  { label: 'About', href: '#about' },
  { label: 'Tracks', href: '#tracks' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Prizes', href: '#prizes' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'FAQ', href: '#faq' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#07080A] border-t-4 border-[#8A2BE2] text-gray-400 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-gray-800">

          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <a href="/" className="inline-block group transition-transform duration-200 relative z-[60]" aria-label="VCET Hackathon 2026">
              <Image
                src="/logo.png"
                alt="VCET Hackathon 2026 Logo"
                width={200}
                height={80}
                className="h-14 sm:h-16 w-auto object-contain scale-[1.7] md:scale-[2.2] origin-left drop-shadow-[0_0_10px_rgba(255,0,127,0.35)] group-hover:drop-shadow-[0_0_14px_rgba(0,240,255,0.7)] hover:scale-[1.8] md:hover:scale-[2.3] transition-all duration-300"
              />
            </a>

            <p className="text-xs text-gray-400 font-sans-custom max-w-sm leading-relaxed">
              VCET Hackathon 2026 "Arcade" is a 30-hour flagship hackathon designed to bridge pixels and possibilities through engineering excellence.
            </p>

            {/* Social Links — Instagram & LinkedIn Only */}
            <div className="pt-2">
              <span className="block font-pixel text-[10px] text-gray-400 tracking-widest uppercase mb-3">
                CONNECT WITH US
              </span>
              <div className="flex items-center gap-3">
                {/* Instagram */}
                <a
                  href={SITE_CONFIG.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  onMouseEnter={playHoverSound}
                  className="group flex items-center gap-2.5 px-3.5 py-2 bg-[#12131C] border border-gray-800 text-xs font-mono text-gray-300 hover:text-[#E1306C] hover:border-[#E1306C] hover:shadow-[0_0_15px_rgba(225,48,108,0.45)] transition-all duration-300 rounded-none"
                >
                  <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span className="font-semibold tracking-wide">INSTAGRAM</span>
                </a>

                {/* LinkedIn */}
                <a
                  href={SITE_CONFIG.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  onMouseEnter={playHoverSound}
                  className="group flex items-center gap-2.5 px-3.5 py-2 bg-[#12131C] border border-gray-800 text-xs font-mono text-gray-300 hover:text-[#00F0FF] hover:border-[#00F0FF] hover:shadow-[0_0_15px_rgba(0,240,255,0.45)] transition-all duration-300 rounded-none"
                >
                  <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span className="font-semibold tracking-wide">LINKEDIN</span>
                </a>
              </div>
            </div>
          </div>

          {/* Navigation column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-pixel text-xs text-[#00F0FF] tracking-wider uppercase mb-2">
              NAVIGATION
            </h4>
            <ul className="space-y-2 font-mono text-xs">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="group flex items-center gap-2 py-1.5 text-gray-500 border-b border-white/[0.04] last:border-b-0 hover:text-[#FF007F] hover:pl-1.5 transition-all duration-200">
                    <span className="text-[#FF007F] opacity-50 group-hover:opacity-100 transition-opacity duration-200" aria-hidden="true">
                      ›
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Venue & Contact Column */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-pixel text-xs text-[#FFD700] tracking-wider uppercase mb-2">
              VENUE & CONTACT
            </h4>
            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF007F] shrink-0 mt-0.5" />
                <span>VCET Campus,K.T. marg, Vasai road(W),Palghar -401202, Maharashtra </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00F0FF] shrink-0" />
                <a href="mailto:vcet.hackathon@vcet.edu.in" className="hover:text-[#00F0FF] transition-colors">
                  vcet.hackathon@vcet.edu.in
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FFD700] shrink-0" />
                <span>+91 76662 87344 (Aditya Prajapati)</span>
                <br />
                <span>+91 91366 40778 (Mihika Mhatre)</span>
              </div>
            </div>

            <div className="pt-2">
              <span
                className="btn-arcade-disabled w-full py-3 text-xs flex items-center justify-center gap-2 rounded-none"
              >
                <span>🚫 REGISTRATIONS CLOSED</span>
              </span>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-gray-500">
          <div>
            © VCET Hackathon 2026. All rights reserved.
          </div>
          <div className="font-pixel text-[10px] text-[#00F0FF]">
            PRESS START TO INNOVATE
          </div>
        </div>

      </div>
    </footer>
  );
}
