import React from "react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 max-w-4xl mx-auto space-y-8 text-slate-300 text-xs sm:text-sm">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Privacy Policy</h1>
        <p className="text-xs text-slate-400 font-mono">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-indigo-500/20 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Information We Collect</h2>
          <p>We collect your email address, name, generation prompts, and image creation history to provide personalized AI generation services and maintain your credit ledger.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. How We Use Data</h2>
          <p>Your data is used solely to generate requested artworks, verify authentication, calculate daily credits, and prevent abuse or security violations.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. Data Retention & Deletion</h2>
          <p>You can delete your generation records at any time from the Creation History page. Account deletion requests can be submitted to privacy@shivai.com.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">4. Payment Security</h2>
          <p>Payment information is processed directly by PCI-DSS certified payment gateways (such as Razorpay). Shiv AI does not store sensitive card numbers or CVVs.</p>
        </section>
      </div>
    </div>
  );
}
