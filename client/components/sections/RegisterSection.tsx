"use client";

import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { playRegistrationSound, playHoverSound } from "@/utils/sound";

export default function RegisterSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playRegistrationSound();
    setSubmitted(true);
  };

  return (
    <section id="register" className="section">
      <SectionHeader
        label="Player Setup"
        title="Register Your Team"
        sub="Lock in your squad before the timer runs out. Registrations open soon."
        centred
      />

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="teamName">
              Team Name
            </label>
            <input
              id="teamName"
              className="form-input"
              type="text"
              placeholder="Enter your team name"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="teamSize">
              Team Size
            </label>
            <select id="teamSize" className="form-input" defaultValue="">
              <option value="" disabled>
                Select size
              </option>
              <option value="1">1 Player</option>
              <option value="2">2 Players</option>
              <option value="3">3 Players</option>
              <option value="4">4 Players</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="leaderName">
              Team Leader Name
            </label>
            <input
              id="leaderName"
              className="form-input"
              type="text"
              placeholder="Full name"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="leaderEmail">
              Email
            </label>
            <input
              id="leaderEmail"
              className="form-input"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="track">
            Preferred Track
          </label>
          <input
            id="track"
            className="form-input"
            type="text"
            placeholder="e.g. Full Stack Web, AI / ML"
          />
        </div>

        <button
          type="submit"
          className="btn-primary"
          style={{ marginTop: "1rem" }}
          onMouseEnter={playHoverSound}
        >
          {submitted ? "Registered!" : "Insert Coin to Register"}
        </button>
      </form>
    </section>
  );
}
