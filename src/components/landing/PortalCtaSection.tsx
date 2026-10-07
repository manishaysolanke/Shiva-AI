"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Zap } from "lucide-react";
import DoodleRobot from "../3d/DoodleRobot";

export default function PortalCtaSection() {
  return (
    <section id="portal" className="relative py-28 px-4 sm:px-6 overflow-hidden">
      {/* Massive Glowing AI Portal Ring in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border-2 border-dashed border-cyan-400/40 animate-spin-slow pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-purple-500/30 animate-pulse pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/25 to-pink-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <DoodleRobot
          mood="celebrating"
          size="md"
          customMessage="The creative portal is open! Step inside and paint the future. ✨🚀"
        />

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/60 border border-pink-500/30 text-pink-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CHAPTER 08 • THE CREATIVE PORTAL</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Your Next Idea <br />
            <span className="gradient-text-hero">Could Be Your Best Image.</span>
          </h2>

          <p className="text-sm sm:text-lg text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            Join thousands of designers, storytellers, and dreamers building the visual universe. 50 free credits credited instantly.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/create"
            className="w-full sm:w-auto px-10 py-5 rounded-2xl btn-gradient-primary text-white font-bold text-base flex items-center justify-center gap-3 shadow-2xl shadow-purple-600/40 hover:scale-105 transition-transform"
          >
            <Sparkles className="w-5 h-5 text-pink-300" />
            <span>Create Your First Image</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
