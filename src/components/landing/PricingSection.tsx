"use client";

import React, { useState } from "react";
import { Check, Sparkles, Zap, Flame, Crown, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { PLANS } from "@/lib/payments";

interface PricingSectionProps {
  onSelectPlan?: (planId: "WEEKLY" | "MONTHLY") => void;
}

export default function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const [billingInterval, setBillingInterval] = useState<"WEEKLY" | "MONTHLY">("MONTHLY");

  return (
    <section id="pricing" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-600/10 blur-[140px] pointer-events-none" />

      <div className="text-center space-y-3 mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-mono">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>CHAPTER 07 • PRICING & CREDITS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Simple, Transparent <span className="gradient-text-amber">Indian Rupee Pricing</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          Start for 100% free with 50 credits every day. Upgrade anytime for 8K Ultra speeds and priority queues.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {/* FREE PLAN */}
        <div className="rounded-3xl glass-card border border-indigo-500/20 p-6 sm:p-8 flex flex-col justify-between hover:border-indigo-400/40 transition-all">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Free Starter</span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">50 Credits/Day</span>
            </div>

            <div>
              <div className="flex items-baseline gap-1 text-white">
                <span className="text-4xl sm:text-5xl font-extrabold">₹0</span>
                <span className="text-xs text-slate-400 font-mono">/ forever</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Generous daily free tier for hobbyists, students, and beginners.
              </p>
            </div>

            <div className="pt-4 border-t border-indigo-500/15">
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>50 Daily Free Credits (refreshed every 24h)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Standard Image Generation (5 credits/image)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Basic Styles & Aspect Ratios</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Image History & Downloads</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8">
            <Link
              href="/create"
              className="block w-full text-center py-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-white font-bold text-xs transition-colors border border-slate-700"
            >
              Start Free (50 Credits)
            </Link>
          </div>
        </div>

        {/* WEEKLY PLAN */}
        <div className="rounded-3xl glass-card border border-purple-500/40 p-6 sm:p-8 flex flex-col justify-between relative hover:border-purple-400 transition-all group">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-mono text-[10px] font-bold shadow-lg uppercase tracking-wider flex items-center gap-1">
            <Flame className="w-3 h-3 text-amber-300 fill-amber-300" />
            <span>Popular Choice</span>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider">Weekly Creator</span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-purple-950/80 text-purple-300 border border-purple-500/30">120 Credits/Day</span>
            </div>

            <div>
              <div className="flex items-baseline gap-1 text-white">
                <span className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">₹50</span>
                <span className="text-xs text-slate-400 font-mono">/ week</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Ideal for fast project sprints, social media creators, and rapid prototyping.
              </p>
            </div>

            <div className="pt-4 border-t border-indigo-500/15">
              <ul className="space-y-3 text-xs text-slate-200">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="font-semibold text-white">120 Daily High-Speed Credits</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>High Detail Generation (7 credits/image)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Faster Generation Processing Queue</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>All 11 Premium Art & 3D Styles</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Prompt Assistant AI Supercharger</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8">
            <button
              onClick={() => onSelectPlan?.("WEEKLY")}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Get Weekly (₹50)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* MONTHLY PRO PLAN */}
        <div className="rounded-3xl glass-card-glow border-2 border-pink-500/50 p-6 sm:p-8 flex flex-col justify-between relative hover:border-pink-400 transition-all scale-[1.02] shadow-2xl">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-mono text-[10px] font-bold shadow-neon-pink uppercase tracking-wider flex items-center gap-1">
            <Crown className="w-3 h-3 text-yellow-200 fill-yellow-200" />
            <span>Best Value • Save 35%</span>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-bold text-pink-300 uppercase tracking-wider">Pro Studio Monthly</span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-pink-950 text-pink-300 border border-pink-500/40">300 Credits/Day</span>
            </div>

            <div>
              <div className="flex items-baseline gap-1 text-white">
                <span className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-amber-300">₹200</span>
                <span className="text-xs text-slate-400 font-mono">/ month</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Uncompromising 8K Ultra quality for professional agencies and digital artists.
              </p>
            </div>

            <div className="pt-4 border-t border-indigo-500/15">
              <ul className="space-y-3 text-xs text-slate-200">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pink-400 shrink-0" />
                  <span className="font-semibold text-white">300 Daily Priority Credits</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pink-400 shrink-0" />
                  <span className="font-semibold text-pink-300">Ultra 8K Octane Quality (9 credits/image)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>Dedicated GPU Priority Queue</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>Public Figure Artistic Portraits</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>Commercial Usage Rights</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8">
            <button
              onClick={() => onSelectPlan?.("MONTHLY")}
              className="w-full py-3.5 rounded-2xl btn-gradient-primary text-white font-bold text-xs shadow-xl shadow-pink-600/40 transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-300" />
              <span>Get Monthly (₹200)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Credit Rules Footnote */}
      <div className="mt-12 p-4 rounded-2xl bg-[#080d24] border border-indigo-500/20 max-w-2xl mx-auto flex items-center justify-between text-xs text-slate-300 font-mono">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Credit Cost:</span>
        </div>
        <div className="flex gap-4">
          <span>Standard: 5c</span>
          <span>High: 7c</span>
          <span>Ultra: 9c</span>
        </div>
      </div>
    </section>
  );
}
