"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Wand2 } from "lucide-react";

interface DoodleRobotProps {
  mood?: "idle" | "thinking" | "generating" | "celebrating" | "waving";
  customMessage?: string;
  size?: "sm" | "md" | "lg";
  showSpeechBubble?: boolean;
}

export default function DoodleRobot({
  mood = "idle",
  customMessage,
  size = "md",
  showSpeechBubble = true,
}: DoodleRobotProps) {
  const [blink, setBlink] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const defaultMessages = [
    "Let's create something amazing! ✨",
    "Tell me what you're imagining... 🎨",
    "Turn your wildest ideas into art! 🚀",
    "What style are we painting today? 🖌️",
  ];

  // Automatic gentle eye blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, 3500);
    return () => clearInterval(blinkInterval);
  }, []);

  // Cycle messages occasionally
  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % defaultMessages.length);
    }, 8000);
    return () => clearInterval(msgInterval);
  }, []);

  const currentMessage =
    customMessage ||
    (mood === "generating"
      ? "Synthesizing pixels from dreams... ⚡"
      : mood === "celebrating"
      ? "Your masterpiece is ready! 🎉"
      : mood === "thinking"
      ? "Refining prompt with neural magic... 🧠"
      : defaultMessages[messageIndex]);

  const sizeClasses = {
    sm: "w-36 h-40",
    md: "w-52 h-60",
    lg: "w-72 h-80",
  };

  return (
    <div className="relative inline-flex flex-col items-center select-none group">
      {/* Speech Bubble */}
      {showSpeechBubble && (
        <div className="mb-3 relative max-w-xs animate-bounce-gentle">
          <div className="glass-card-glow px-4 py-2 rounded-2xl text-xs font-medium text-slate-100 flex items-center gap-2 border border-purple-500/30 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-pink-400 shrink-0 animate-spin-slow" />
            <span className="tracking-wide">{currentMessage}</span>
          </div>
          {/* Speech bubble pointer */}
          <div className="w-3 h-3 glass-card rotate-45 border-r border-b border-purple-500/30 absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-[#0d1433]" />
        </div>
      )}

      {/* SVG Animated Doodle Robot */}
      <div className={`${sizeClasses[size]} animate-float-medium relative`}>
        {/* Glowing Aura Behind Robot */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/30 via-purple-600/30 to-pink-500/30 blur-2xl rounded-full" />

        <svg
          viewBox="0 0 200 220"
          className="w-full h-full drop-shadow-[0_10px_25px_rgba(168,85,247,0.35)]"
        >
          <defs>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="50%" stopColor="#2e1065" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            <linearGradient id="brushGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="50%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>

            <filter id="neonFilter">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#38bdf8" />
            </filter>
          </defs>

          {/* Floating Paint Sparkles */}
          <g className="animate-pulse">
            <circle cx="25" cy="40" r="3" fill="#38bdf8" opacity="0.8" />
            <circle cx="175" cy="45" r="2.5" fill="#f472b6" opacity="0.8" />
            <polygon points="180,80 183,85 188,86 184,90 185,95 180,92 175,95 176,90 172,86 177,85" fill="#fcd34d" opacity="0.75" />
          </g>

          {/* Robot Antenna */}
          <line x1="100" y1="45" x2="100" y2="25" stroke="#818cf8" strokeWidth="4" strokeLinecap="round" />
          <circle cx="100" cy="20" r="7" fill="#00f0ff" filter="url(#neonFilter)" className="animate-pulse" />

          {/* Robot Head */}
          <rect
            x="50"
            y="45"
            width="100"
            height="70"
            rx="24"
            fill="url(#bodyGrad)"
            stroke="#818cf8"
            strokeWidth="3"
          />

          {/* Head Screen / Visor */}
          <rect
            x="62"
            y="55"
            width="76"
            height="50"
            rx="16"
            fill="#050814"
            stroke="#38bdf8"
            strokeWidth="2"
          />

          {/* Eyes (With Blinking Animation) */}
          <g>
            {blink ? (
              // Closed eye lines
              <>
                <line x1="75" y1="80" x2="90" y2="80" stroke="#00f0ff" strokeWidth="4" strokeLinecap="round" />
                <line x1="110" y1="80" x2="125" y2="80" stroke="#00f0ff" strokeWidth="4" strokeLinecap="round" />
              </>
            ) : (
              // Open glowing cyan eyes
              <>
                <circle cx="82" cy="80" r="7" fill="#00f0ff" filter="url(#neonFilter)" />
                <circle cx="84" cy="78" r="2" fill="#ffffff" />
                <circle cx="118" cy="80" r="7" fill="#00f0ff" filter="url(#neonFilter)" />
                <circle cx="120" cy="78" r="2" fill="#ffffff" />
              </>
            )}
            {/* Cute Smile */}
            <path
              d="M 94 92 Q 100 97 106 92"
              stroke="#f472b6"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {/* Cheek Blush */}
          <circle cx="72" cy="90" r="4" fill="#ec4899" opacity="0.6" />
          <circle cx="128" cy="90" r="4" fill="#ec4899" opacity="0.6" />

          {/* Ears / Head Bolts */}
          <rect x="42" y="68" width="8" height="24" rx="4" fill="#818cf8" />
          <rect x="150" y="68" width="8" height="24" rx="4" fill="#818cf8" />

          {/* Neck Joint */}
          <rect x="88" y="115" width="24" height="10" rx="3" fill="#475569" />

          {/* Robot Body */}
          <rect
            x="58"
            y="125"
            width="84"
            height="65"
            rx="20"
            fill="url(#bodyGrad)"
            stroke="#a855f7"
            strokeWidth="3"
          />

          {/* Body Heart/Core Indicator */}
          <circle cx="100" cy="155" r="14" fill="#0f172a" stroke="#ec4899" strokeWidth="2" />
          <path
            d="M 100 150 C 97 146 92 147 92 152 C 92 156 100 161 100 161 C 100 161 108 156 108 152 C 108 147 103 146 100 150 Z"
            fill="#ec4899"
            className="animate-pulse"
          />

          {/* Left Arm Holding Glowing Paintbrush */}
          <g className="transition-transform group-hover:-rotate-6 origin-[55px_135px]">
            <path
              d="M 60 140 Q 35 155 42 175"
              stroke="#818cf8"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
            />
            {/* Paintbrush */}
            <line x1="38" y1="180" x2="20" y2="198" stroke="#fcd34d" strokeWidth="5" strokeLinecap="round" />
            <polygon points="18,200 12,212 26,206" fill="url(#brushGlow)" filter="url(#neonFilter)" />
          </g>

          {/* Right Arm (Waving or Resting) */}
          <g className={mood === "waving" || mood === "celebrating" ? "animate-bounce" : "group-hover:rotate-12 origin-[145px_135px]"}>
            <path
              d="M 140 140 Q 165 145 160 168"
              stroke="#818cf8"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="160" cy="170" r="6" fill="#a855f7" />
          </g>

          {/* Floating Hover Base / Propulsion */}
          <ellipse cx="100" cy="198" rx="20" ry="5" fill="#38bdf8" opacity="0.7" filter="url(#neonFilter)" />
        </svg>
      </div>
    </div>
  );
}
