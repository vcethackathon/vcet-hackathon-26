'use client';

import { UNSTOP_URL, SITE_CONFIG } from '@/config/site';
import { Gamepad2, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#07080A] border-t-4 border-[#8A2BE2] text-gray-400 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-gray-800">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <a href="#" className="inline-block group transition-transform duration-200 hover:scale-105" aria-label="VCET Hackathon 2026">
              <img
                src="/logo.png"
                alt="VCET Hackathon 2026 Logo"
                className="h-14 sm:h-16 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,0,127,0.35)] group-hover:drop-shadow-[0_0_14px_rgba(0,240,255,0.7)] transition-all duration-300"
              />
            </a>

            <p className="text-xs text-gray-400 font-sans-custom max-w-sm leading-relaxed">
              VCET Hackathon 2026 "Arcade" is a 36-hour flagship hackathon designed to bridge pixels and possibilities through engineering excellence.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                aria-label="GitHub"
                className="w-9 h-9 bg-[#12131C] border border-gray-800 flex items-center justify-center text-gray-400 hover:text-[#00F0FF] hover:border-[#00F0FF] transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 bg-[#12131C] border border-gray-800 flex items-center justify-center text-gray-400 hover:text-[#00F0FF] hover:border-[#00F0FF] transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 bg-[#12131C] border border-gray-800 flex items-center justify-center text-gray-400 hover:text-[#00F0FF] hover:border-[#00F0FF] transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a
                href="#"
                aria-label="Discord"
                className="w-9 h-9 bg-[#12131C] border border-gray-800 flex items-center justify-center text-gray-400 hover:text-[#00F0FF] hover:border-[#00F0FF] transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-pixel text-xs text-[#00F0FF] tracking-wider uppercase mb-2">
              NAVIGATION
            </h4>
            <ul className="space-y-2 font-mono text-xs">
              {SITE_CONFIG.navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-[#FF007F] transition-colors">
                    ▸ {link.name}
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
                <span>VCET Campus, Kaman Road, Vasai, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00F0FF] shrink-0" />
                <span>hackathon@vcet.edu.in</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FFD700] shrink-0" />
                <span>+91 98765 43210</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={UNSTOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-arcade-magenta w-full py-3 text-xs flex items-center justify-center gap-2 rounded-none"
              >
                <span>REGISTER ON UNSTOP</span>
                <ExternalLink className="w-4 h-4" />
              </a>
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
