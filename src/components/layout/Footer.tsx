import React from "react";
import Link from "next/link";
import { Sparkles, Shield, Heart, Cpu } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-indigo-500/15 bg-[#03050c] text-slate-400 text-sm overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-indigo-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-pink-500 p-0.5 shadow-neon-purple">
                <div className="w-full h-full bg-[#070b1e] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-pink-400" />
                </div>
              </div>
              <span className="font-bold text-lg text-white">
                Shiv <span className="text-pink-400">AI</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Turn your imagination into images. A futuristic AI creative universe combining neural precision with playful storytelling.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>Shiv Neural Engine v2.4 Online</span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-4 font-mono">Product</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/create" className="hover:text-cyan-400 transition-colors">AI Image Generator</Link></li>
              <li><Link href="/gallery" className="hover:text-cyan-400 transition-colors">Community Gallery</Link></li>
              <li><Link href="/pricing" className="hover:text-cyan-400 transition-colors">Pricing & Credits</Link></li>
              <li><Link href="/history" className="hover:text-cyan-400 transition-colors">Creation History</Link></li>
              <li><Link href="/dashboard" className="hover:text-cyan-400 transition-colors">Creator Studio</Link></li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-4 font-mono">Company</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/help" className="hover:text-purple-400 transition-colors">Prompt Guide & FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-purple-400 transition-colors">Contact Support</Link></li>
              <li><Link href="/explore/india-ai" className="hover:text-purple-400 transition-colors">Shiv AI India</Link></li>
              <li><Link href="/admin" className="hover:text-purple-400 transition-colors flex items-center gap-1"><Shield className="w-3 h-3 text-indigo-400"/>Admin</Link></li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-4 font-mono">Trust & Safety</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/ai-safety" className="hover:text-pink-400 transition-colors">AI Safety & Public Figures</Link></li>
              <li><Link href="/privacy" className="hover:text-pink-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-pink-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/refund" className="hover:text-pink-400 transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Shiv AI. All rights reserved. Built with precision for creators.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" /> GPU Accelerated
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-400">
              Made with <Heart className="w-3 h-3 text-pink-500 fill-pink-500" /> in India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
