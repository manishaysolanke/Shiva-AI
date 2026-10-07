"use client";

import React, { useState } from "react";
import { Sparkles, Wand2, ArrowRight, CheckCircle, Zap } from "lucide-react";
import Link from "next/link";

export default function DescribeSection() {
  const [activeTab, setActiveTab] = useState<"before" | "after">("after");

  return (
    <section id="describe" className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <Wand2 className="w-3.5 h-3.5" />
          <span>CHAPTER 02 • DESCRIBE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Write It. Enhance It. <span className="gradient-text-electric">Watch It Bloom.</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          Don&apos;t know complex prompt engineering? Our built-in AI Prompt Assistant supercharges simple thoughts into hyper-descriptive art prompts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Comparison Interactive Widget */}
        <div className="rounded-3xl glass-card-glow p-6 sm:p-8 border border-purple-500/30 space-y-6">
          <div className="flex p-1 bg-[#060a1d] rounded-2xl border border-indigo-500/20">
            <button
              onClick={() => setActiveTab("before")}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "before"
                  ? "bg-slate-800 text-slate-200 shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Simple Idea (Before)
            </button>
            <button
              onClick={() => setActiveTab("after")}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "after"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-300" />
              Shiv AI Enhanced (After)
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-[#070b20] border border-indigo-500/20 min-h-[140px] flex items-center">
            {activeTab === "before" ? (
              <p className="text-base text-slate-300 italic font-mono">
                &ldquo;A dog in space.&rdquo;
              </p>
            ) : (
              <div className="space-y-2">
                <p className="text-xs sm:text-sm text-slate-100 italic leading-relaxed">
                  &ldquo;A cute golden retriever floating inside a futuristic spacecraft, looking through a panoramic curved glass window at Earth sunrise, volumetric cinematic lighting, detailed fur strands, ray-traced reflections, 8k octane render.&rdquo;
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1 text-[10px] font-mono text-purple-300">
                  <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-500/30">+Volumetric Lighting</span>
                  <span className="px-2 py-0.5 rounded bg-pink-950 border border-pink-500/30">+Ray-traced Reflections</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30">+8K Octane</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-mono text-slate-400">
              ⚡ Zero extra credit cost for prompt improvement
            </span>
            <Link
              href="/create"
              className="text-xs font-bold text-pink-400 hover:text-pink-300 flex items-center gap-1"
            >
              <span>Try in Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl glass-card border border-indigo-500/15 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Natural Language Understanding</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Type naturally in English, Hindi, or conversational phrases. The neural engine understands complex semantic intent.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-indigo-500/15 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Negative Prompt Filtering</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Exclude unwanted elements (blurry backgrounds, extra limbs, bad anatomy) with dedicated precision negative tags.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-indigo-500/15 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-pink-950/60 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">One-Click Prompt Remixing</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Loved an image from the community gallery? Hit Remix to import its exact style, lighting, and aspect parameters in one tap.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
