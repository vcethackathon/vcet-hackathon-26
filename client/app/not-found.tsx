"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UNSTOP_URL } from "@/config/site";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect unknown / legacy sitelink routes to home page
    const timer = setTimeout(() => {
      router.replace("/");
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen bg-[#0B0C10] text-white flex flex-col items-center justify-center p-6 text-center font-sans-custom relative overflow-hidden">
      {/* Retro background grid pattern */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #00F0FF 1px, transparent 1px), linear-gradient(to bottom, #FF007F 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-lg border border-[#00F0FF]/30 bg-[#0D0E16]/90 p-8 sm:p-10 rounded-lg shadow-[0_0_40px_rgba(0,240,255,0.2)]">
        <div className="font-pixel text-xs text-[#FF007F] tracking-widest uppercase mb-2">
          // ERROR 404
        </div>
        <h1 className="font-pixel text-2xl sm:text-4xl text-white mb-4">
          LEVEL NOT FOUND
        </h1>
        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
          The requested path is out of bounds. Registrations for{" "}
          <span className="text-[#00F0FF] font-semibold">VCET Hackathon 2026 &quot;Arcade&quot;</span> are live!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="btn-arcade-cyan px-6 py-3 text-xs font-pixel tracking-wider text-center"
          >
            ▶ GO TO HOME
          </Link>
          <span
            className="btn-arcade-disabled px-6 py-3 text-xs font-pixel tracking-wider text-center"
          >
            🚫 REGISTRATIONS CLOSED
          </span>
        </div>

        <p className="text-gray-500 text-xs mt-6 font-mono">
          Redirecting to main matrix in 2s...
        </p>
      </div>
    </main>
  );
}
