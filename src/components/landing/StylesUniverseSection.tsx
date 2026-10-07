"use client";

import React, { useState } from "react";
import { Palette, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { STYLES } from "../generator/StyleSelector";

export default function StylesUniverseSection() {
  const [activeStyle, setActiveStyle] = useState("3D");

  const styleImages: Record<string, string> = {
    Photorealistic: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&auto=format&fit=crop&q=80",
    "3D": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&auto=format&fit=crop&q=80",
    Cinematic: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=900&auto=format&fit=crop&q=80",
    "Anime-inspired": "https://images.unsplash.com/photo-1563089145-599997674d42?w=900&auto=format&fit=crop&q=80",
    Watercolor: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=900&auto=format&fit=crop&q=80",
    Fantasy: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&auto=format&fit=crop&q=80",
    "Product photography": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&auto=format&fit=crop&q=80",
    Poster: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=900&auto=format&fit=crop&q=80",
    Cartoon: "https://images.unsplash.com/photo-1563089145-599997674d42?w=900&auto=format&fit=crop&q=80",
    Illustration: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&auto=format&fit=crop&q=80",
    "Pixel Art": "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=900&auto=format&fit=crop&q=80",
  };

  return (
    <section id="styles" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center space-y-3 mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-mono">
          <Palette className="w-3.5 h-3.5" />
          <span>CHAPTER 04 • CUSTOMIZE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          From Words → <span className="gradient-text-hero">To Infinite Worlds</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Every idea has a spirit. Seamlessly shift between photorealism, Pixar 3D, Studio Ghibli anime, watercolor, or retro synthwave posters with one click.
        </p>
      </div>

      {/* Style Explorer Carousel / Interactive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
        {STYLES.slice(0, 6).map((style) => {
          const isSelected = activeStyle === style.id;
          return (
            <button
              key={style.id}
              onClick={() => setActiveStyle(style.id)}
              className={`p-3.5 rounded-2xl text-left transition-all duration-300 relative overflow-hidden ${
                isSelected
                  ? "bg-gradient-to-tr from-purple-600 to-pink-600 text-white shadow-xl shadow-purple-900/50 scale-105 border border-pink-400"
                  : "bg-[#090d24] hover:bg-[#111738] border border-indigo-500/15 text-slate-300"
              }`}
            >
              <div className="font-bold text-xs truncate">{style.name}</div>
              <div className="text-[10px] text-slate-300/80 mt-1 line-clamp-1">{style.description}</div>
            </button>
          );
        })}
      </div>

      {/* Hero Showcase Display for Selected Style */}
      <div className="rounded-3xl glass-card-glow border border-indigo-500/30 overflow-hidden shadow-2xl p-6 sm:p-10 flex flex-col lg:flex-row items-center gap-8">
        <div className="lg:w-1/2 space-y-4 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/60 border border-pink-500/30 text-pink-300 text-xs font-mono">
            <span>Active Aesthetic: {activeStyle}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            {activeStyle} Visual Generation
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Optimized neural weights specifically tailored for {activeStyle.toLowerCase()} rendering with volumetric light scattering, balanced color grading, and hyper-clean edges.
          </p>

          <div className="pt-2">
            <Link
              href={`/create?style=${encodeURIComponent(activeStyle)}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-gradient-primary text-white font-bold text-xs shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create in {activeStyle} Style</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="lg:w-1/2 relative aspect-video w-full rounded-2xl overflow-hidden border border-indigo-500/30 shadow-2xl">
          <img
            src={styleImages[activeStyle] || styleImages["3D"]}
            alt={activeStyle}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
            <p className="text-xs text-white/90 font-mono">
              ⚡ Generated with Shiv Neural v2.4 • {activeStyle} Style
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
