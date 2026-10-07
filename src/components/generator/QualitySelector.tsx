"use client";

import React from "react";
import { Zap, Sparkles, Crown } from "lucide-react";

interface QualitySelectorProps {
  quality: string;
  onSelectQuality: (q: string) => void;
}

export const QUALITY_OPTIONS = [
  {
    id: "Standard",
    name: "Standard",
    credits: 5,
    resolution: "1024px",
    description: "Fast generation, crisp balanced details",
    icon: Zap,
    color: "text-blue-400",
    border: "border-blue-500/40",
    bg: "bg-blue-950/40",
  },
  {
    id: "High",
    name: "High Detail",
    credits: 7,
    resolution: "2048px",
    description: "Enhanced lighting, subsurface scattering",
    icon: Sparkles,
    color: "text-purple-400",
    border: "border-purple-500/40",
    bg: "bg-purple-950/40",
  },
  {
    id: "Ultra",
    name: "Ultra 8K Pro",
    credits: 9,
    resolution: "4096px",
    description: "Maximum octane render, studio masterpiece",
    icon: Crown,
    color: "text-pink-400",
    border: "border-pink-500/40",
    bg: "bg-pink-950/40",
  },
];

export default function QualitySelector({
  quality,
  onSelectQuality,
}: QualitySelectorProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          GENERATION QUALITY & RESOLUTION
        </label>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {QUALITY_OPTIONS.map((opt) => {
          const isSelected = quality === opt.id;
          const Icon = opt.icon;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelectQuality(opt.id)}
              className={`p-3 rounded-2xl text-left transition-all relative ${
                isSelected
                  ? `${opt.bg} border-2 ${opt.border} text-white shadow-lg scale-[1.02]`
                  : "bg-[#0a0f26]/80 hover:bg-[#0f1638] border border-indigo-500/15 text-slate-300"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <Icon className={`w-4 h-4 ${opt.color}`} />
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900/80 border border-slate-700/50 text-amber-300 font-semibold">
                  ⚡ {opt.credits}c
                </span>
              </div>
              <div className="font-bold text-xs text-white truncate">{opt.name}</div>
              <div className="text-[10px] font-mono text-cyan-300/80 mt-0.5">{opt.resolution}</div>
              <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-tight">
                {opt.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
