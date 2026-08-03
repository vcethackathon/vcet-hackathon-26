'use client';

import { useState, useEffect } from 'react';
import { SITE_CONFIG, UNSTOP_URL } from '@/config/site';
import { Menu, X, ExternalLink } from 'lucide-react';
import { playRegistrationSound, playHoverSound } from '@/utils/sound';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0C10]/95 backdrop-blur-md border-b border-[#FF007F]/30 py-0 shadow-lg shadow-black/80'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent pt-0 pb-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center group shrink-0 transition-transform duration-200 hover:scale-105"
            aria-label="VCET Hackathon 2026 Home"
          >
            <img
              src="/logo.png"
              alt="VCET Hackathon 2026 Logo"
              className={`h-12 sm:h-14 md:h-16 w-auto object-contain scale-[1.5] md:scale-[1.8] origin-left drop-shadow-[0_0_10px_rgba(255,0,127,0.35)] hover:scale-[1.6] md:hover:scale-[1.9] transition-all duration-300 ${isScrolled ? 'md:scale-[1.5] hover:md:scale-[1.6]' : ''}`}
            />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {SITE_CONFIG.navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-pixel text-[11px] text-gray-300 hover:text-[#00F0FF] hover:translate-y-[-1px] transition-all tracking-wider"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={UNSTOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playRegistrationSound}
              onMouseEnter={playHoverSound}
              className="btn-arcade-magenta px-4 py-2 text-[11px] rounded-none flex items-center gap-2"
            >
              <span>REGISTER</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-3">
            <a
              href={UNSTOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playRegistrationSound}
              onMouseEnter={playHoverSound}
              className="btn-arcade-magenta px-3 py-1.5 text-[10px] flex items-center gap-1"
            >
              <span>REGISTER</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#00F0FF] focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0B0C10] border-b-2 border-[#FF007F] px-4 pt-4 pb-6 mt-3 space-y-4 shadow-2xl">
          {SITE_CONFIG.navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block font-pixel text-xs text-gray-200 hover:text-[#00F0FF] py-2 border-b border-gray-800"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2">
            <a
              href={UNSTOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                playRegistrationSound();
                setMobileMenuOpen(false);
              }}
              onMouseEnter={playHoverSound}
              className="btn-arcade-magenta w-full py-3 text-xs flex items-center justify-center gap-2"
            >
              <span>REGISTER ON UNSTOP</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
