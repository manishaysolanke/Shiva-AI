import React from "react";
import { Sparkles, HelpCircle, BookOpen, Lightbulb, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function HelpPage() {
  const faqs = [
    {
      q: "How does the daily credit refresh work?",
      a: "Every registered user receives 50 free credits every 24 hours. The server resets or tops up your balance automatically based on UTC timestamp verification. Standard generations cost 5 credits, High quality costs 7 credits, and Ultra 8K costs 9 credits.",
    },
    {
      q: "Can I generate images of public figures?",
      a: "Yes! Artistic, creative, and historical representations of public figures (such as Narendra Modi, Mahatma Gandhi, Elon Musk, Cristiano Ronaldo, etc.) are allowed for legitimate creative expression. All generated images are tagged with responsible AI watermarks to prevent misleading disinformation.",
    },
    {
      q: "What is the difference between Standard, High, and Ultra quality?",
      a: "Standard (5 credits) renders 1024px images in under 3 seconds. High Detail (7 credits) adds multi-pass volumetric lighting and subsurface scattering. Ultra 8K (9 credits) outputs cinema-grade 4096px renders with extreme micro-detail suitable for commercial printing.",
    },
    {
      q: "What payment methods are supported in India?",
      a: "We support UPI (Google Pay, PhonePe, Paytm), Indian Debit/Credit Cards (RuPay, Visa, Mastercard), and NetBanking via our encrypted 256-bit payment gateway.",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
          <BookOpen className="w-3.5 h-3.5" />
          <span>DOCUMENTATION & PROMPT GUIDE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Master The Art of <span className="gradient-text-hero">AI Prompt Craft</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Everything you need to know about crafting cinematic prompts, leveraging quality tiers, and maximizing your daily free credits.
        </p>
      </div>

      {/* Prompt Anatomy Guide */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-indigo-500/20 space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          The Anatomy of a Perfect Prompt
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#080d24] border border-indigo-500/15 space-y-1.5">
            <span className="text-[10px] font-mono text-pink-400 font-bold">01. SUBJECT</span>
            <h4 className="text-xs font-bold text-white">Who or What?</h4>
            <p className="text-[11px] text-slate-400">e.g. &ldquo;A futuristic cybernetic tiger&rdquo;</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#080d24] border border-indigo-500/15 space-y-1.5">
            <span className="text-[10px] font-mono text-purple-400 font-bold">02. SETTING</span>
            <h4 className="text-xs font-bold text-white">Where & When?</h4>
            <p className="text-[11px] text-slate-400">e.g. &ldquo;rooftop in Mumbai during monsoon dusk&rdquo;</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#080d24] border border-indigo-500/15 space-y-1.5">
            <span className="text-[10px] font-mono text-cyan-400 font-bold">03. LIGHTING</span>
            <h4 className="text-xs font-bold text-white">Atmosphere & Mood</h4>
            <p className="text-[11px] text-slate-400">e.g. &ldquo;volumetric neon reflections, soft bokeh&rdquo;</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#080d24] border border-indigo-500/15 space-y-1.5">
            <span className="text-[10px] font-mono text-emerald-400 font-bold">04. STYLE & RENDER</span>
            <h4 className="text-xs font-bold text-white">Medium & Tech</h4>
            <p className="text-[11px] text-slate-400">e.g. &ldquo;3D Octane render, 8K, cinematic composition&rdquo;</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-purple-400" />
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-5 rounded-2xl glass-card border border-indigo-500/15 space-y-2">
              <h4 className="text-xs font-bold text-white">{faq.q}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Launch CTA */}
      <div className="text-center pt-4">
        <Link
          href="/create"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl btn-gradient-primary text-white font-bold text-xs sm:text-sm shadow-xl"
        >
          <Sparkles className="w-4 h-4 text-pink-300" />
          <span>Launch Creator Studio</span>
        </Link>
      </div>
    </div>
  );
}
