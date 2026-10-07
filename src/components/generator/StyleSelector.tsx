"use client";

import React from "react";
import { Sparkles, Camera, Palette, Film, Clapperboard, Eye, Box, Compass, Brush, Layers } from "lucide-react";

export interface StyleOption {
  id: string;
  name: string;
  description: string;
  gradient: string;
  badge: string;
}

export const STYLES: StyleOption[] = [
  { id: "Photorealistic", name: "Photorealistic", description: "Hyper-real camera shot with 8k textures", gradient: "from-blue-600 to-cyan-500", badge: "Realistic" },
  { id: "3D", name: "3D Animated", description: "Vibrant Pixar & Octane render aesthetics", gradient: "from-purple-600 to-pink-500", badge: "3D" },
  { id: "Cinematic", name: "Cinematic Movie", description: "Anamorphic widescreen & dramatic lighting", gradient: "from-amber-600 to-orange-500", badge: "Epic" },
  { id: "Anime-inspired", name: "Anime / Manga", description: "Vibrant cel-shading & celestial skies", gradient: "from-pink-500 to-indigo-500", badge: "Anime" },
  { id: "Watercolor", name: "Watercolor", description: "Fluid organic brushstrokes on textured paper", gradient: "from-emerald-500 to-teal-500", badge: "Art" },
  { id: "Fantasy", name: "Fantasy World", description: "Magical bioluminescence & mythical scenery", gradient: "from-violet-600 to-fuchsia-600", badge: "Mythic" },
  { id: "Product photography", name: "Studio Product", description: "Commercial lighting & clean acrylic podiums", gradient: "from-slate-600 to-zinc-400", badge: "Commercial" },
  { id: "Poster", name: "Vintage Poster", description: "Bold typography & retro synthwave layout", gradient: "from-rose-600 to-amber-500", badge: "Graphic" },
  { id: "Cartoon", name: "Playful Cartoon", description: "Fun, vibrant character doodle style", gradient: "from-yellow-500 to-orange-400", badge: "Fun" },
  { id: "Illustration", name: "Digital Art", description: "ArtStation trending digital painting", gradient: "from-indigo-600 to-blue-500", badge: "Digital" },
  { id: "Pixel Art", name: "Retro Pixel Art", description: "16-bit nostalgic gaming arcade vibe", gradient: "from-cyan-600 to-blue-600", badge: "Retro" },
];

interface StyleSelectorProps {
  selectedStyle: string;
  onSelectStyle: (style: string) => void;
}

export default function StyleSelector({
  selectedStyle,
  onSelectStyle,
}: StyleSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5 font-mono">
          <Palette className="w-3.5 h-3.5 text-purple-400" />
          VISUAL ART STYLE
        </label>
        <span className="text-[11px] text-purple-300 font-mono">
          Selected: {selectedStyle}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
        {STYLES.map((style) => {
          const isSelected = selectedStyle === style.id;
          return (
            <button
              key={style.id}
              type="button"
              onClick={() => onSelectStyle(style.id)}
              className={`p-2.5 rounded-xl text-left transition-all duration-200 relative group overflow-hidden ${
                isSelected
                  ? "bg-gradient-to-r " + style.gradient + " text-white shadow-lg shadow-purple-900/40 border border-white/30 scale-[1.02]"
                  : "bg-[#0b1028]/80 hover:bg-[#12193e] border border-indigo-500/15 text-slate-300 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-xs truncate">{style.name}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                  isSelected ? "bg-black/40 text-white" : "bg-white/10 text-slate-400"
                }`}>
                  {style.badge}
                </span>
              </div>
              <p className={`text-[10px] line-clamp-1 ${isSelected ? "text-white/90" : "text-slate-400"}`}>
                {style.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
