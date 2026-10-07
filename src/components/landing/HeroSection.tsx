"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Wand2, Zap, Play } from "lucide-react";
import HeroCanvas from "../3d/HeroCanvas";
import DoodleRobot from "../3d/DoodleRobot";

export default function HeroSection() {
  const [typedText, setTypedText] = useState("");
  const fullPrompt = "A cute futuristic AI robot exploring Mumbai at sunset, cinematic lighting, colorful 3D animation, 8k render";

  useEffect(() => {
    let index = 0;
    let isDeleting = false;

    const timer = setInterval(() => {
      if (!isDeleting) {
        setTypedText(fullPrompt.slice(0, index + 1));
        index++;
        if (index === fullPrompt.length) {
          isDeleting = true;
          setTimeout(() => {}, 3000);
        }
      } else {
        setTypedText(fullPrompt.slice(0, index - 1));
        index--;
        if (index === 0) {
          isDeleting = false;
        }
      }
    }, isDeleting ? 30 : 60);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden">
      {/* 3D WebGL Particle & Geometry Starfield */}
      <HeroCanvas />

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Top Tag Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/15 to-pink-500/10 border border-purple-500/30 backdrop-blur-md shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin-slow" />
          <span className="text-xs font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300">
            Next-Generation 3D AI Creative Universe
          </span>
          <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-[10px] text-purple-300 font-mono">
            50 Daily Credits Free
          </span>
        </div>

        {/* Master Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Turn Your Imagination <br />
            <span className="gradient-text-hero">Into Stunning Images.</span>
          </h1>
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Create award-winning AI artwork, 3D animated concepts, and cinematic portraits from simple ideas and words.
          </p>
        </div>

        {/* Mascot + Interactive Typed Prompt Showcase */}
        <div className="pt-4 pb-2 flex flex-col items-center">
          <div className="mb-4">
            <DoodleRobot mood="idle" size="md" />
          </div>

          {/* Simulated Futuristic Prompt Terminal */}
          <div className="w-full max-w-2xl p-4 sm:p-5 rounded-3xl glass-card-glow border border-indigo-500/30 text-left shadow-2xl relative group">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-indigo-500/20 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-indigo-300 font-semibold">Shiv Neural Prompt Studio</span>
              </div>
              <span className="text-pink-400 flex items-center gap-1 font-semibold">
                <Zap className="w-3.5 h-3.5" /> 5 Credits
              </span>
            </div>

            <div className="font-mono text-xs sm:text-sm text-slate-100 min-h-[48px] flex items-center">
              <span>{typedText}</span>
              <span className="inline-block w-2 h-4 bg-pink-400 ml-1 animate-pulse" />
            </div>

            <div className="mt-3 flex items-center justify-between pt-3 border-t border-indigo-500/15">
              <div className="flex gap-1.5 text-[11px] font-mono text-purple-300">
                <span className="px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/30">3D Animated</span>
                <span className="px-2 py-0.5 rounded bg-pink-950/60 border border-pink-500/30">Ultra 8K</span>
              </div>

              <Link
                href="/create"
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-pink-600/30 transition-transform group-hover:scale-105"
              >
                <span>Generate Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Main Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/create"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl btn-gradient-primary text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl transition-all"
          >
            <Sparkles className="w-5 h-5 text-pink-300" />
            <span>Create an Image (50 Free Credits)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/gallery"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#090f2b]/80 hover:bg-[#121942] border border-indigo-500/30 text-slate-200 hover:text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all backdrop-blur-md"
          >
            <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
            <span>Explore AI Gallery</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
