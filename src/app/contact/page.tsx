"use client";

import React, { useState } from "react";
import { Mail, MessageSquare, Send, CheckCircle, Sparkles } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-mono">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>GET IN TOUCH</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Contact The <span className="gradient-text-hero">Shiv AI Team</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          Have questions about API integrations, custom plans, or feedback? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="p-6 sm:p-10 rounded-3xl glass-card-glow border border-indigo-500/30 max-w-xl mx-auto">
        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-lg font-bold text-white">Message Received!</h3>
            <p className="text-xs text-slate-300">
              Thank you for reaching out. Our engineering & support team will get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono text-slate-300 mb-1">Your Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Aarav Sharma"
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@domain.com"
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-300 mb-1">Subject</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Support, Enterprise API, or Partnership"
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-300 mb-1">Message</label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us what you're imagining..."
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl btn-gradient-primary text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
