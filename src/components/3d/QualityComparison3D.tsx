"use client";

import React, { useState } from "react";
import { Zap, Sparkles, Crown, CheckCircle2 } from "lucide-react";

export default function QualityComparison3D() {
  const [activeTier, setActiveTier] = useState<"Standard" | "High" | "Ultra">("Ultra");

  const tiers = {
    Standard: {
      credits: 5,
      res: "1024 x 1024",
      speed: "Fast (< 3.2s)",
      features: ["Crisp geometry & vibrant palettes", "Standard diffusion passes", "Clean social avatars & concept drafts"],
      badge: "Fast & Light",
      color: "text-blue-400",
      border: "border-blue-500",
    },
    High: {
      credits: 7,
      res: "2048 x 2048",
      speed: "Balanced (< 4.8s)",
      features: ["Enhanced volumetric lighting & mist", "Fine specular reflections & highlights", "Subsurface scattering on skin/materials"],
      badge: "High Fidelity",
      color: "text-purple-400",
      border: "border-purple-500",
    },
    Ultra: {
      credits: 9,
      res: "4096 x 4096 (8K Octane)",
      speed: "Studio Masterpiece (< 6.5s)",
      features: ["Cinematic anamorphic depth of field", "Extreme micro-detail (fur, pores, fabrics)", "Commercial print & 8K cinema display ready"],
      badge: "Masterpiece Pro",
      color: "text-pink-400",
      border: "border-pink-500",
    },
  };

  const current = tiers[activeTier];

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl glass-card-glow p-6 sm:p-8 border border-indigo-500/30">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-6 border-b border-indigo-500/20">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-400" />
            Neural Quality & Resolution Tiers
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Choose the ideal balance between generation speed and 8K cinematic micro-detail.
          </p>
        </div>

        {/* Tier Switcher Controls */}
        <div className="flex p-1 rounded-2xl bg-[#070c22] border border-indigo-500/25">
          {(["Standard", "High", "Ultra"] as const).map((tier) => (
            <button
              key={tier}
              onClick={() => setActiveTier(tier)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTier === tier
                  ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg scale-105"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tier} ({tier === "Standard" ? "5c" : tier === "High" ? "7c" : "9c"})
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Display Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Visual Frame Simulation */}
        <div className="relative rounded-2xl overflow-hidden border border-indigo-500/30 bg-[#060a1d] h-64 sm:h-72 flex items-center justify-center group shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/60 via-purple-950/40 to-pink-950/40" />

          {/* Central Stylized Visual */}
          <div className="relative z-10 text-center space-y-3 p-4">
            <div className={`w-20 h-20 rounded-3xl mx-auto flex items-center justify-center bg-[#070b1e] border-2 ${current.border} shadow-2xl transition-all duration-300 group-hover:rotate-6`}>
              {activeTier === "Standard" && <Zap className="w-10 h-10 text-blue-400 animate-pulse" />}
              {activeTier === "High" && <Sparkles className="w-10 h-10 text-purple-400 animate-pulse" />}
              {activeTier === "Ultra" && <Crown className="w-10 h-10 text-pink-400 animate-pulse" />}
            </div>

            <div>
              <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                {current.res}
              </span>
              <h4 className="text-lg font-bold text-white mt-1">{activeTier} Neural Rendering</h4>
              <p className="text-xs text-slate-400 font-mono">⚡ {current.credits} Credits per generation</p>
            </div>
          </div>
        </div>

        {/* Features Checklist */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-mono font-bold uppercase tracking-wider ${current.color}`}>
              {current.badge}
            </span>
            <span className="text-xs font-mono text-slate-400">
              Avg Speed: {current.speed}
            </span>
          </div>

          <ul className="space-y-3">
            {current.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className={`w-4 h-4 ${current.color} shrink-0 mt-0.5`} />
                <span>{feat}</span>
              </li>
            ))}
          </ul>

          <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/15 text-[11px] text-slate-300 font-mono">
            💡 Free tier accounts include 50 credits daily = 10 Standard or 5 Ultra 8K generations every day.
          </div>
        </div>
      </div>
    </div>
  );
}
