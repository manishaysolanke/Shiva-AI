import React from "react";

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 max-w-4xl mx-auto space-y-8 text-slate-300 text-xs sm:text-sm">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Terms of Service</h1>
        <p className="text-xs text-slate-400 font-mono">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-indigo-500/20 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Acceptance of Terms</h2>
          <p>By using Shiv AI, you agree to these Terms of Service, our AI Safety Policy, and all applicable Indian and international regulations.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. Permitted Use & Ownership</h2>
          <p>You own the prompts you submit. Subject to our Responsible AI guidelines, you may use generated images for personal and commercial projects in accordance with your subscription tier.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. Credit System & Fair Use</h2>
          <p>Free accounts receive 50 daily credits refreshed every 24 hours. Automated scraping, reverse engineering, or exploiting race conditions will result in account suspension.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">4. Disclaimers</h2>
          <p>AI-generated imagery may exhibit variations or stylized artifacts. Images do not constitute authentic photographic evidence of real-world events.</p>
        </section>
      </div>
    </div>
  );
}
