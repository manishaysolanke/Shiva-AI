import React from "react";
import { ShieldCheck, AlertCircle, Sparkles, Scale, Lock, Eye } from "lucide-react";
import Link from "next/link";

export default function AISafetyPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>TRUST, ETHICS & SAFETY</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Responsible AI Generation <br />
          <span className="gradient-text-electric">& Public Figures Policy</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Our commitment to ethical artificial intelligence, transparent labeling, and preventing malicious media manipulation.
        </p>
      </div>

      <div className="space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
        {/* Core Principles */}
        <div className="p-6 sm:p-8 rounded-3xl glass-card border border-indigo-500/20 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-indigo-400" />
            1. Artistic Expression vs Misinformation
          </h2>
          <p>
            Shiv AI supports legitimate artistic expression, creative storytelling, and educational historical recreations. However, our neural platform strictly prohibits the generation of:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li>Deceptive political propaganda or fabricated evidence designed to deceive the public.</li>
            <li>Fraudulent impersonation, financial extortion, or non-consensual imagery.</li>
            <li>Defamatory claims alleging illegal or harmful acts by real living persons.</li>
            <li>Harmful, sexually explicit, or violent extremist content.</li>
          </ul>
        </div>

        {/* Public Figure Policy */}
        <div className="p-6 sm:p-8 rounded-3xl glass-card border border-indigo-500/20 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-cyan-400" />
            2. Public Figures & Clear Labeling
          </h2>
          <p>
            When generating portraits of public leaders, historical figures, or celebrities (such as Narendra Modi, Mahatma Gandhi, Elon Musk, Cristiano Ronaldo, etc.):
          </p>
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs font-mono text-cyan-300">
            &ldquo;AI-generated artistic representation. Fictional and artistic concept; not an authentic photograph.&rdquo;
          </div>
          <p className="text-slate-400">
            All exported media embeds digital metadata denoting AI synthesis to maintain clear provenance across digital channels.
          </p>
        </div>

        {/* Moderation Pipeline */}
        <div className="p-6 sm:p-8 rounded-3xl glass-card border border-indigo-500/20 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-purple-400" />
            3. Server-Side Safety Pipeline & Reporting
          </h2>
          <p>
            Every prompt undergoes automated server-side safety checks before execution. Prompts flagged for malicious policy violations are rejected with immediate credit reservation cancellation.
          </p>
          <p>
            If you encounter any content that violates these guidelines, please contact our trust and safety team at <code className="text-purple-300 font-mono">safety@shivai.com</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
