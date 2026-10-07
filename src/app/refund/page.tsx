import React from "react";

export default function RefundPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 max-w-4xl mx-auto space-y-8 text-slate-300 text-xs sm:text-sm">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Refund Policy</h1>
        <p className="text-xs text-slate-400 font-mono">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-indigo-500/20 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Automatic Generation Refunds</h2>
          <p>If an AI generation fails due to provider downtime or system errors, our atomic ledger immediately refunds the reserved credits back to your balance automatically.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. Subscription Refunds</h2>
          <p>We provide a 7-day refund window for paid weekly or monthly plans if you have consumed fewer than 20% of your plan&apos;s allocated credits. Contact support@shivai.com with your order ID.</p>
        </section>
      </div>
    </div>
  );
}
