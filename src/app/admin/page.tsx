"use client";

import React, { useState, useEffect } from "react";
import { Shield, Users, Layers, Zap, AlertTriangle, Search, PlusCircle, CreditCard, Flame, CheckCircle, RefreshCw } from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [recentGenerations, setRecentGenerations] = useState<any[]>([]);
  const [safetyLogs, setSafetyLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Credit adjustment state
  const [adjustModalOpen, setAdjustModalOpen] = useState(false);
  const [targetUser, setTargetUser] = useState<any>(null);
  const [adjustAmount, setAdjustAmount] = useState<number>(50);
  const [adjustReason, setAdjustReason] = useState("Customer support bonus");
  const [adjustSuccess, setAdjustSuccess] = useState("");

  const fetchAdminData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to load admin metrics.");
      }
      setStats(data.stats);
      setRecentUsers(data.recentUsers || []);
      setRecentGenerations(data.recentGenerations || []);
      setSafetyLogs(data.safetyLogs || []);
    } catch (err: any) {
      setError(err.message || "Admin authorization required.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleAdjustCredits = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUser) return;
    setAdjustSuccess("");

    try {
      const res = await fetch("/api/admin/adjust-credits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUserId: targetUser.id,
          amount: Number(adjustAmount),
          reason: adjustReason,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to adjust credits.");
      }

      setAdjustSuccess(`Successfully adjusted credits for ${targetUser.email}. New balance: ${data.newBalance} credits.`);
      setTimeout(() => {
        setAdjustModalOpen(false);
        setAdjustSuccess("");
        fetchAdminData();
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Adjustment failed.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-16 text-center space-y-3">
        <Shield className="w-10 h-10 text-indigo-400 animate-pulse mx-auto" />
        <p className="text-xs text-slate-400 font-mono">Authenticating admin credentials...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32 pb-16 px-4 max-w-lg mx-auto text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-red-950/80 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">Admin Access Restricted</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          {error} Please sign in with an administrator account (e.g. <code className="text-purple-300 font-mono">admin@shivai.com</code>).
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-indigo-500/15">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-indigo-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Shiv AI Admin Control Center
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            System overview, ledger audits, credit management, and safety moderation.
          </p>
        </div>

        <button
          onClick={fetchAdminData}
          className="px-3.5 py-1.5 rounded-xl bg-[#0b1028] border border-indigo-500/20 hover:border-indigo-400 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-3xl glass-card border border-indigo-500/20 space-y-2">
          <span className="text-xs font-mono text-slate-400">TOTAL USERS</span>
          <div className="text-3xl font-extrabold text-white font-mono">{stats?.totalUsers ?? 0}</div>
          <p className="text-[10px] text-emerald-400 font-mono">Active accounts</p>
        </div>

        <div className="p-5 rounded-3xl glass-card border border-purple-500/20 space-y-2">
          <span className="text-xs font-mono text-slate-400">TOTAL GENERATIONS</span>
          <div className="text-3xl font-extrabold text-purple-300 font-mono">{stats?.totalGenerations ?? 0}</div>
          <p className="text-[10px] text-purple-400 font-mono">{stats?.totalCreditsConsumed ?? 0} Credits consumed</p>
        </div>

        <div className="p-5 rounded-3xl glass-card border border-pink-500/20 space-y-2">
          <span className="text-xs font-mono text-slate-400">ACTIVE SUBSCRIPTIONS</span>
          <div className="text-3xl font-extrabold text-pink-300 font-mono">{stats?.activeSubscriptions ?? 0}</div>
          <p className="text-[10px] text-amber-300 font-mono">Est. Revenue: ₹{stats?.estimatedRevenueINR ?? 0}</p>
        </div>

        <div className="p-5 rounded-3xl glass-card border border-cyan-500/20 space-y-2">
          <span className="text-xs font-mono text-slate-400">SAFETY FLAGS</span>
          <div className="text-3xl font-extrabold text-cyan-300 font-mono">{stats?.safetyFlagsCount ?? 0}</div>
          <p className="text-[10px] text-cyan-400 font-mono">Policy screening active</p>
        </div>
      </div>

      {/* User Management & Credit Adjustment */}
      <div className="p-6 rounded-3xl glass-card border border-indigo-500/20 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-indigo-500/15">
          <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-400" />
            USER MANAGEMENT & CREDIT ADJUSTMENT
          </h3>
          <span className="text-xs text-slate-400 font-mono">Real-time ledger access</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead>
              <tr className="border-b border-indigo-500/15 text-[11px] font-mono text-slate-400">
                <th className="py-2.5 px-3">User</th>
                <th className="py-2.5 px-3">Role</th>
                <th className="py-2.5 px-3">Plan</th>
                <th className="py-2.5 px-3">Balance</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-500/10 font-sans">
              {recentUsers.map((u) => (
                <tr key={u.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-semibold text-white">{u.name || "Creator"}</div>
                    <div className="text-[11px] font-mono text-slate-400">{u.email}</div>
                  </td>
                  <td className="py-3 px-3 font-mono">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${u.role === "ADMIN" ? "bg-indigo-950 text-indigo-300 border border-indigo-500/30" : "bg-slate-900 text-slate-400"}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-purple-300 font-semibold">{u.plan}</td>
                  <td className="py-3 px-3 font-mono font-bold text-amber-300">{u.credits} Credits</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => {
                        setTargetUser(u);
                        setAdjustModalOpen(true);
                      }}
                      className="px-3 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/60 border border-indigo-500/30 text-indigo-300 hover:text-white font-semibold transition-all"
                    >
                      Adjust Credits
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Credit Adjustment Modal */}
      {adjustModalOpen && targetUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="p-6 sm:p-8 rounded-3xl glass-card-glow border border-indigo-500/30 max-w-md w-full text-white space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-indigo-500/20">
              <h3 className="font-bold text-base">Adjust User Credits</h3>
              <span className="text-xs font-mono text-slate-400">{targetUser.email}</span>
            </div>

            {adjustSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs">
                {adjustSuccess}
              </div>
            )}

            <form onSubmit={handleAdjustCredits} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">Amount (+ for credit, - for debit)</label>
                <input
                  type="number"
                  value={adjustAmount}
                  onChange={(e) => setAdjustAmount(Number(e.target.value))}
                  required
                  className="w-full px-3.5 py-2 rounded-xl glass-input text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">Audit Reason (Required)</label>
                <input
                  type="text"
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  placeholder="e.g. Customer support bonus or resolution refund"
                  required
                  className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAdjustModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl btn-gradient-primary text-white text-xs font-semibold shadow-md"
                >
                  Save & Log to Ledger
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
