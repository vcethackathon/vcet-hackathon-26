"use client";

/**
 * Web Audio API Retro Arcade Sound Generator
 * Generates custom synthesized arcade sound effects for registration buttons without needing external audio files.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioCtxClass =
      window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtxClass) {
      audioCtx = new AudioCtxClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Plays an iconic, tactile retro arcade coin insert & button click sound effect when a registration button is clicked.
 */
export function playRegistrationSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // 1. Tactile Arcade Button/Coin Slot Mechanical Click (15ms Pulse Burst)
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = "square";
    clickOsc.frequency.setValueAtTime(2800, now);
    clickOsc.frequency.exponentialRampToValueAtTime(180, now + 0.015);

    clickGain.gain.setValueAtTime(0.22, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

    clickOsc.connect(clickGain);
    clickGain.connect(ctx.destination);

    clickOsc.start(now);
    clickOsc.stop(now + 0.015);

    // 2. Iconic 8-Bit Arcade Coin Chime (B5 -> E6 -> A6 Sparkle)
    const coinNotes = [
      { freq: 987.77, delay: 0.015, duration: 0.08, type: "square" as OscillatorType },  // B5
      { freq: 1318.51, delay: 0.075, duration: 0.28, type: "square" as OscillatorType }, // E6
      { freq: 1760.00, delay: 0.16, duration: 0.22, type: "triangle" as OscillatorType },// A6 Sparkle
    ];

    coinNotes.forEach(({ freq, delay, duration, type }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now + delay);

      // Pitch ramp up for classic arcade jump/coin feel
      if (freq === 1318.51) {
        osc.frequency.exponentialRampToValueAtTime(1385, now + delay + duration);
      }

      gain.gain.setValueAtTime(0.18, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + duration);
    });

    // 3. Low Punchy Arcade Sub Thump
    const bassOsc = ctx.createOscillator();
    const bassGain = ctx.createGain();

    bassOsc.type = "sine";
    bassOsc.frequency.setValueAtTime(140, now + 0.01);
    bassOsc.frequency.exponentialRampToValueAtTime(280, now + 0.16);

    bassGain.gain.setValueAtTime(0.16, now + 0.01);
    bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    bassOsc.connect(bassGain);
    bassGain.connect(ctx.destination);

    bassOsc.start(now + 0.01);
    bassOsc.stop(now + 0.18);
  } catch (_) {
    /* Ignore audio errors if audio context is restricted */
  }
}

/**
 * Plays a quick subtle retro arcade hover blip sound effect.
 */
export function playHoverSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1100, now);
    osc.frequency.exponentialRampToValueAtTime(1500, now + 0.035);

    gain.gain.setValueAtTime(0.025, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.035);
  } catch (_) {
    /* Ignore audio errors */
  }
}
