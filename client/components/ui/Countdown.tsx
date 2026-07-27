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
  /** Defaults to the hackathon date from data/hero.ts */
  targetDate?: Date;
}

export default function Countdown({ targetDate = HACKATHON_DATE }: CountdownProps) {
  const [t, setT] = useState<TimeLeft>(() => calcTimeLeft(targetDate));

  useEffect(() => {
    const id = setInterval(() => setT(calcTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const f = (n: number) => String(n).padStart(2, "0");

  const blocks = [
    { val: t.days, lbl: "Days" },
    { val: t.hours, lbl: "Hours" },
    { val: t.minutes, lbl: "Mins" },
    { val: t.seconds, lbl: "Secs" },
  ];

  return (
    <div className="hero-countdown">
      {blocks.map((b, i) => (
        <React.Fragment key={b.lbl}>
          <div className="countdown-block">
            <span className="countdown-num">{f(b.val)}</span>
            <span className="countdown-lbl">{b.lbl}</span>
          </div>
          {i < blocks.length - 1 && <div className="countdown-sep">:</div>}
        </React.Fragment>
      ))}
    </div>
  );
}
