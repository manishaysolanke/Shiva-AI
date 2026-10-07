"use client";

import confetti from "canvas-confetti";

export function triggerConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ["#38bdf8", "#818cf8", "#a855f7"],
  });
  fire(0.2, {
    spread: 60,
    colors: ["#ec4899", "#f472b6", "#fcd34d"],
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    colors: ["#00f0ff", "#ffffff"],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}
