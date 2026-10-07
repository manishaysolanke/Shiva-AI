"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Flame, Sparkles, Zap, Shield, CreditCard, ChevronRight, Check } from "lucide-react";

export default function AccountSubscriptionPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) setUser(data.user);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between pb-6 border-b border-indigo-500/15">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Flame className="w-6 h-6 text-amber-400" />
            Subscription & Billing
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your active plan, view invoice details, or upgrade for higher daily allowances.
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-indigo-500/25 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-indigo-500/15">
          <div>
            <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider">CURRENT ACTIVE PLAN</span>
            <h3 className="text-2xl font-bold text-white mt-1">{user?.plan || "FREE STARTER"}</h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Status: <span className="text-emerald-400 font-semibold">{user?.subscriptionStatus || "ACTIVE"}</span>
            </p>
          </div>

          <Link
            href="/pricing"
            className="px-5 py-2.5 rounded-xl btn-gradient-primary text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
          >
            <span>Change Plan</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#080d24] border border-indigo-500/15 space-y-1">
            <span className="text-slate-400 font-mono text-[10px]">Daily Free Allowance</span>
            <p className="font-bold text-white text-base">{user?.dailyAllowance || 50} Credits / Day</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#080d24] border border-indigo-500/15 space-y-1">
            <span className="text-slate-400 font-mono text-[10px]">Payment Method</span>
            <p className="font-bold text-white text-base">UPI / Indian Cards (Razorpay)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
