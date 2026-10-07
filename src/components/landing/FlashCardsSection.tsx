"use client";

import React from "react";
import { Sparkles, Brain, Wand2, Cpu, Sliders, Maximize2, Download } from "lucide-react";

export default function FlashCardsSection() {
  const steps = [
    {
      num: "01",
      title: "Imagine",
      subtitle: "Think of any idea, scene, or character",
      icon: Brain,
      color: "from-blue-600 to-cyan-500",
      border: "border-cyan-500/30",
      accent: "text-cyan-400",
      badge: "Idea",
    },
    {
      num: "02",
      title: "Describe",
      subtitle: "Type your words or use the AI Enhancer",
      icon: Wand2,
      color: "from-purple-600 to-pink-500",
      border: "border-purple-500/30",
      accent: "text-pink-400",
      badge: "Prompt",
    },
    {
      num: "03",
      title: "Generate",
      subtitle: "Watch pixels synthesize in real time",
      icon: Cpu,
      color: "from-pink-600 to-rose-500",
      border: "border-pink-500/30",
      accent: "text-rose-400",
      badge: "Neural",
    },
    {
      num: "04",
      title: "Customize",
      subtitle: "Switch between 11 art styles & 5 ratios",
      icon: Sliders,
      color: "from-amber-600 to-orange-500",
      border: "border-amber-500/30",
      accent: "text-amber-400",
      badge: "Aesthetic",
    },
    {
      num: "05",
      title: "Enhance",
      subtitle: "Scale to 8K Ultra resolution with 1 click",
      icon: Maximize2,
      color: "from-emerald-600 to-teal-500",
      border: "border-emerald-500/30",
      accent: "text-emerald-400",
      badge: "8K Pro",
    },
    {
      num: "06",
      title: "Download",
      subtitle: "Export high-resolution uncompressed art",
      icon: Download,
      color: "from-indigo-600 to-blue-500",
      border: "border-indigo-500/30",
      accent: "text-indigo-400",
      badge: "Instant",
    },
  ];

  return (
    <section id="flashcards" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>HOW IT WORKS • 6 SIMPLE STEPS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Effortless Creation <span className="gradient-text-electric">From Start To Finish</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          No complex tools or steep learning curves. Just pure imagination translated to canvas.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className={`p-6 sm:p-8 rounded-3xl glass-card hover:glass-card-glow border ${step.border} transition-all duration-300 hover:-translate-y-2 group shadow-xl`}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl font-extrabold text-slate-700 font-mono group-hover:text-white/20 transition-colors">
                  {step.num}
                </span>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${step.color} p-0.5 shadow-lg group-hover:scale-110 transition-transform`}>
                  <div className="w-full h-full bg-[#070b1e] rounded-[14px] flex items-center justify-center">
                    <Icon className={`w-6 h-6 ${step.accent}`} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-colors">
                    {step.title}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-400">
                    {step.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {step.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
