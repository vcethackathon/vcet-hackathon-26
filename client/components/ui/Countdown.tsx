"use client";

import React, { useState, useEffect } from "react";
import { HACKATHON_DATE } from "@/data";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(targetDate: Date): TimeLeft {
  const diff = Math.max(0, targetDate.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

interface CountdownProps {
  targetDate?: Date;
}

export default function Countdown({ targetDate = HACKATHON_DATE }: CountdownProps) {
  const [t, setT] = useState<TimeLeft>(() => calcTimeLeft(targetDate));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setT(calcTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const f = (n: number) => String(n).padStart(2, "0");

  const items = [
    { label: "DAYS", val: t.days },
    { label: "HOURS", val: t.hours },
    { label: "MINUTES", val: t.minutes },
    { label: "SECONDS", val: t.seconds },
  ];

  return (
    <div className="w-full max-w-xl bg-black/85 border-2 border-[#8A2BE2] p-4 sm:p-5 my-4 shadow-[0_0_25px_rgba(138,43,226,0.35)] relative">
      {/* Top Floating Badge */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0B0C10] px-3.5 border border-[#FF007F]">
        <span className="font-pixel text-[9px] sm:text-[10px] text-[#FF007F] tracking-widest whitespace-nowrap">
          EVENT COUNTDOWN SCOREBOARD
        </span>
      </div>

      {/* 4 Digital Score Columns */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-1.5">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center bg-[#12131C] border border-[#00F0FF]/30 p-2 sm:p-2.5 relative overflow-hidden group"
          >
            <div className="font-pixel text-lg sm:text-2xl md:text-3xl text-[#FFD700] tracking-widest font-bold">
              {mounted ? f(item.val) : "00"}
            </div>
            <div className="text-[9px] sm:text-[10px] font-mono text-gray-400 mt-1 tracking-wider uppercase">
              {item.label}
            </div>
            <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#FF007F]/40 group-hover:bg-[#00F0FF] transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
}
