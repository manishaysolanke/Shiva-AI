"use client";

import React from "react";
import { Maximize2, Smartphone, Monitor, Square, Tv } from "lucide-react";

interface AspectRatioSelectorProps {
  aspectRatio: string;
  onSelectAspectRatio: (ratio: string) => void;
}

export const RATIOS = [
  { id: "1:1", name: "Square", subtitle: "1024x1024 (Instagram/Avatar)", icon: Square, shape: "w-4 h-4" },
  { id: "16:9", name: "Landscape", subtitle: "1344x768 (YouTube/Desktop)", icon: Tv, shape: "w-6 h-3.5" },
  { id: "4:5", name: "Portrait", subtitle: "896x1120 (Social Feed)", icon: Maximize2, shape: "w-4 h-5" },
  { id: "9:16", name: "Story / Reels", subtitle: "768x1344 (TikTok/Story)", icon: Smartphone, shape: "w-3.5 h-6" },
  { id: "3:2", name: "Classic Photo", subtitle: "1216x832 (Photography)", icon: Monitor, shape: "w-5 h-3.5" },
];

export default function AspectRatioSelector({
  aspectRatio,
  onSelectAspectRatio,
}: AspectRatioSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5 font-mono">
          <Maximize2 className="w-3.5 h-3.5 text-pink-400" />
          ASPECT RATIO
        </label>
        <span className="text-[11px] text-slate-400 font-mono">
          {aspectRatio}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {RATIOS.map((item) => {
          const isSelected = aspectRatio === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectAspectRatio(item.id)}
              className={`p-2.5 rounded-xl text-center flex flex-col items-center justify-center transition-all ${
                isSelected
                  ? "bg-gradient-to-tr from-indigo-600/60 to-purple-600/60 border-2 border-indigo-400 text-white shadow-md"
                  : "bg-[#0a0f26]/80 hover:bg-[#0f1638] border border-indigo-500/15 text-slate-300"
              }`}
            >
              {/* Visual aspect box representation */}
              <div className="h-7 flex items-center justify-center mb-1">
                <div className={`border-2 rounded-[3px] transition-all ${
                  isSelected ? "border-pink-400 bg-pink-500/20" : "border-slate-500 bg-slate-800/40"
                } ${item.shape}`} />
              </div>
              <span className="font-bold text-xs">{item.id}</span>
              <span className="text-[10px] text-slate-400 truncate max-w-full">{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
