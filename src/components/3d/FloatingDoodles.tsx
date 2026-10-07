"use client";

import React from "react";
import { Camera, Sparkles, Lightbulb, Compass, Palette, Film, Stars, Boxes } from "lucide-react";

export default function FloatingDoodles() {
  const doodleItems = [
    { Icon: Camera, top: "12%", left: "6%", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", anim: "animate-float-slow", delay: "0s", label: "3D Camera" },
    { Icon: Palette, top: "28%", right: "8%", color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20", anim: "animate-float-medium", delay: "1.5s", label: "Color Palette" },
    { Icon: Lightbulb, top: "45%", left: "4%", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", anim: "animate-float-fast", delay: "0.8s", label: "Idea Spark" },
    { Icon: Stars, top: "62%", right: "5%", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", anim: "animate-float-slow", delay: "2.2s", label: "Cosmic Stars" },
    { Icon: Film, top: "78%", left: "7%", color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20", anim: "animate-float-medium", delay: "1s", label: "Film Strip" },
    { Icon: Boxes, top: "85%", right: "9%", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", anim: "animate-float-fast", delay: "2.8s", label: "3D Cubes" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* Background Neural Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Floating Animated Icons */}
      {doodleItems.map((item, idx) => {
        const Icon = item.Icon;
        return (
          <div
            key={idx}
            className={`absolute hidden md:flex items-center justify-center p-3 rounded-2xl ${item.bg} ${item.border} border backdrop-blur-md shadow-xl ${item.anim} transition-transform`}
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              animationDelay: item.delay,
            }}
          >
            <Icon className={`w-6 h-6 ${item.color}`} />
          </div>
        );
      })}

      {/* Atmospheric Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
    </div>
  );
}
