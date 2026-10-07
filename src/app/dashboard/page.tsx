"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Zap, Clock, Flame, Shield, ArrowRight, Heart, Layers, CreditCard, ChevronRight } from "lucide-react";
import { formatTimeRemaining } from "@/lib/utils";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [ledger, setLedger] = useState<any[]>([]);
  const [recentGenerations, setRecentGenerations] = useState<any[]>([]);
  const [countdown, setCountdown] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [meRes, ledgerRes, histRes] = await Promise.all([
          fetch("/api/auth/me"),
          fetch("/api/credits/ledger"),
          fetch("/api/history?take=6"),
        ]);

        const meData = await meRes.json();
        const ledgerData = await ledgerRes.json();
        const histData = await histRes.json();

        if (meData.authenticated && meData.user) {
          setUser(meData.user);
          setCountdown(meData.user.refreshInMs || 0);
        }
        if (ledgerData.success && ledgerData.transactions) {
          setLedger(ledgerData.transactions);
        }
        if (histData.success && histData.generations) {
          setRecentGenerations(histData.generations);
        }
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const interval = setInterval(() => {
      setCountdown((prev) => Math.max(0, prev - 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card-glow border border-indigo-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>CREATOR CONTROL CENTER</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Welcome back, <span className="gradient-text-hero">{user?.name || "Creator"}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Track your daily free allowance, monitor GPU generation activity, and manage your account.
          </p>
        </div>

        <Link
          href="/create"
          className="px-6 py-3.5 rounded-2xl btn-gradient-primary text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-purple-600/30 shrink-0"
        >
          <Sparkles className="w-4 h-4 text-pink-300" />
          <span>Launch Studio Workspace</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Credit Balance */}
        <div className="p-5 rounded-3xl glass-card border border-amber-500/25 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">DAILY CREDITS</span>
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white font-mono">
              {user?.credits ?? 50} <span className="text-sm font-normal text-slate-400">/ {user?.dailyAllowance ?? 50}</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
                style={{
                  width: `${Math.min(100, (((user?.credits ?? 50) / (user?.dailyAllowance ?? 50)) * 100))}%`,
                }}
              />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 font-mono">
            Refreshes in: <span className="text-cyan-300 font-semibold">{formatTimeRemaining(countdown || 14 * 3600 * 1000)}</span>
          </p>
        </div>

        {/* Metric 2: Plan Status */}
        <div className="p-5 rounded-3xl glass-card border border-purple-500/25 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">ACTIVE TIER</span>
            <Flame className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
              {user?.plan || "FREE STARTER"}
            </div>
            <p className="text-[11px] text-slate-400 mt-1 font-mono">
              Status: <span className="text-emerald-400 font-semibold uppercase">{user?.subscriptionStatus || "ACTIVE"}</span>
            </p>
          </div>
          <Link
            href="/pricing"
            className="text-[11px] font-bold text-pink-400 hover:text-pink-300 flex items-center gap-1"
          >
            <span>Upgrade Plan</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Metric 3: Total Used */}
        <div className="p-5 rounded-3xl glass-card border border-cyan-500/25 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">TOTAL GENERATIONS</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white font-mono">
              {user?.totalGenerations ?? recentGenerations.length}
            </div>
            <p className="text-[11px] text-slate-400 mt-1 font-mono">
              {user?.totalUsed ?? 0} Credits consumed overall
            </p>
          </div>
        </div>

        {/* Metric 4: Safety & Security */}
        <div className="p-5 rounded-3xl glass-card border border-indigo-500/25 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">NEURAL ENGINE</span>
            <Shield className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-xl font-bold text-white">Shiv v2.4 Online</div>
            <p className="text-[11px] text-emerald-400 mt-1 font-mono">
              GPU Cluster Healthy • 0ms Queue
            </p>
          </div>
        </div>
      </div>

      {/* Recent Generations Showcase */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-400" />
            Recent Creations
          </h3>
          <Link href="/history" className="text-xs text-slate-400 hover:text-white font-mono">
            View All History →
          </Link>
        </div>

        {recentGenerations.length === 0 ? (
          <div className="p-8 rounded-2xl glass-card text-center text-slate-400 text-xs">
            No creations yet. Launch the studio to paint your first vision!
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {recentGenerations.slice(0, 6).map((gen) => {
              const img = gen.images[0];
              return (
                <div
                  key={gen.id}
                  className="rounded-2xl overflow-hidden glass-card border border-indigo-500/15 group relative aspect-square"
                >
                  {img && (
                    <img
                      src={img.url}
                      alt={gen.prompt}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2.5 flex flex-col justify-end text-[10px] text-white">
                    <p className="line-clamp-2 italic font-sans">“{gen.prompt}”</p>
                    <span className="text-purple-300 font-mono mt-1">{gen.style}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Credit Transactions Ledger Table */}
      <div className="p-6 rounded-3xl glass-card border border-indigo-500/20 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-indigo-500/15">
          <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-cyan-400" />
            CREDIT TRANSACTION LEDGER (AUDIT TRAIL)
          </h3>
          <span className="text-[11px] font-mono text-slate-400">
            Immutable Server Records
          </span>
        </div>

        {ledger.length === 0 ? (
          <p className="text-xs text-slate-400">No transactions recorded yet.</p>
        ) : (
          <div className="divide-y divide-indigo-500/10 max-h-64 overflow-y-auto pr-2">
            {ledger.map((tx) => (
              <div key={tx.id} className="py-2.5 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="font-medium text-slate-200">{tx.description}</div>
                  <div className="text-[10px] font-mono text-slate-500">
                    {new Date(tx.createdAt).toLocaleString()} • Type: {tx.type}
                  </div>
                </div>
                <div className="text-right font-mono">
                  <span
                    className={`font-bold text-sm ${
                      tx.amount > 0 ? "text-emerald-400" : "text-amber-400"
                    }`}
                  >
                    {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
                  </span>
                  <div className="text-[10px] text-slate-400">Bal: {tx.balanceAfter}c</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
