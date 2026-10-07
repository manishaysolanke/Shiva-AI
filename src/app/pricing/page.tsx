"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Sparkles, Check, Zap, Flame, Crown, ArrowRight, ShieldCheck, Lock, CreditCard } from "lucide-react";
import { PLANS } from "@/lib/payments";
import { triggerConfetti } from "@/components/ui/Confetti";

function PricingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<"WEEKLY" | "MONTHLY">(
    (searchParams.get("plan") as any) || "MONTHLY"
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutOrder, setCheckoutOrder] = useState<any>(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleStartCheckout = async (planId: "WEEKLY" | "MONTHLY") => {
    setSelectedPlan(planId);
    setErrorMsg("");
    setSuccessMsg("");
    setIsProcessing(true);

    try {
      const res = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to initialize payment.");
      }

      setCheckoutOrder(data.order);
      setCheckoutModalOpen(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to initialize checkout. Please sign in first.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmPayment = async () => {
    if (!checkoutOrder) return;
    setIsProcessing(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: checkoutOrder.planId,
          orderId: checkoutOrder.orderId,
          paymentId: `pay_mock_${Date.now()}`,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Payment verification failed.");
      }

      setSuccessMsg(`Subscription to ${PLANS[checkoutOrder.planId].name} activated successfully!`);
      setCheckoutModalOpen(false);
      triggerConfetti();
      setTimeout(() => {
        router.push("/dashboard");
      }, 2500);
    } catch (err: any) {
      setErrorMsg(err.message || "Payment verification failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-pink-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>TRANSPARENT SUBSCRIPTION PLANS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Supercharge Your Creativity <br />
          <span className="gradient-text-hero">With Priority Indian Rupee Plans</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Start for free or upgrade to weekly/monthly plans for 8K Octane generation, prompt superchargers, and zero queues.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs text-center max-w-lg mx-auto">
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs text-center max-w-lg mx-auto font-bold animate-bounce-gentle">
          🎉 {successMsg}
        </div>
      )}

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
        {/* FREE PLAN */}
        <div className="rounded-3xl glass-card border border-indigo-500/20 p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Free Starter</span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">50 Credits/Day</span>
            </div>

            <div>
              <div className="flex items-baseline gap-1 text-white">
                <span className="text-4xl font-extrabold">₹0</span>
                <span className="text-xs text-slate-400 font-mono">/ forever</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                50 daily credits automatically replenished every 24 hours.
              </p>
            </div>

            <div className="pt-4 border-t border-indigo-500/15">
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>50 Free Daily Credits (every 24h)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Standard Quality (5 credits/image)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Personal Creations & History</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8">
            <button
              onClick={() => router.push("/create")}
              className="w-full py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
            >
              Start Free (50 Credits)
            </button>
          </div>
        </div>

        {/* WEEKLY PLAN */}
        <div className="rounded-3xl glass-card border border-purple-500/40 p-8 flex flex-col justify-between relative hover:border-purple-400 transition-all group">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-mono text-[10px] font-bold shadow-lg uppercase tracking-wider flex items-center gap-1">
            <Flame className="w-3 h-3 text-amber-300 fill-amber-300" />
            <span>Popular Choice</span>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider">Weekly Creator</span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-purple-950/80 text-purple-300 border border-purple-500/30">120 Credits/Day</span>
            </div>

            <div>
              <div className="flex items-baseline gap-1 text-white">
                <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">₹50</span>
                <span className="text-xs text-slate-400 font-mono">/ week</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                120 daily credits with high speed GPU priority processing.
              </p>
            </div>

            <div className="pt-4 border-t border-indigo-500/15">
              <ul className="space-y-3 text-xs text-slate-200">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="font-semibold text-white">120 Daily High-Speed Credits</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>High Detail Generation (7c/image)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>All 11 Premium Art Styles</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Prompt Assistant AI Supercharger</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8">
            <button
              onClick={() => handleStartCheckout("WEEKLY")}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Get Weekly (₹50)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* MONTHLY PRO PLAN */}
        <div className="rounded-3xl glass-card-glow border-2 border-pink-500/50 p-8 flex flex-col justify-between relative scale-[1.03] shadow-2xl">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-pink-500 to-amber-500 text-white font-mono text-[10px] font-bold shadow-neon-pink uppercase tracking-wider flex items-center gap-1">
            <Crown className="w-3 h-3 text-yellow-200 fill-yellow-200" />
            <span>Best Value • ₹200/mo</span>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-bold text-pink-300 uppercase tracking-wider">Pro Studio Monthly</span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-pink-950 text-pink-300 border border-pink-500/40">300 Credits/Day</span>
            </div>

            <div>
              <div className="flex items-baseline gap-1 text-white">
                <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-amber-300">₹200</span>
                <span className="text-xs text-slate-400 font-mono">/ month</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                300 daily priority credits with full 8K Ultra quality renders.
              </p>
            </div>

            <div className="pt-4 border-t border-indigo-500/15">
              <ul className="space-y-3 text-xs text-slate-200">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pink-400 shrink-0" />
                  <span className="font-semibold text-white">300 Daily Priority Credits</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pink-400 shrink-0" />
                  <span className="font-semibold text-pink-300">Ultra 8K Quality (9c/image)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>Dedicated GPU Priority Queue</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>Commercial Usage Rights</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8">
            <button
              onClick={() => handleStartCheckout("MONTHLY")}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-2xl btn-gradient-primary text-white font-bold text-xs shadow-xl shadow-pink-600/40 transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-300" />
              <span>Get Monthly (₹200)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {checkoutModalOpen && checkoutOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl glass-card-glow border border-indigo-500/30 text-white shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-indigo-500/20">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-base">Secure Checkout</h3>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-500/30 font-mono">
                {checkoutOrder.planName}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#070b1e] border border-indigo-500/20 space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Plan:</span>
                <span className="font-bold text-white">{checkoutOrder.planName}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Total Amount:</span>
                <span className="font-extrabold text-white text-base">₹{checkoutOrder.amountINR} INR</span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 font-mono pt-2 border-t border-indigo-500/10">
                <span>Order ID:</span>
                <span className="truncate max-w-[160px]">{checkoutOrder.orderId}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleConfirmPayment}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-2xl btn-gradient-primary text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/40"
              >
                {isProcessing ? (
                  <span>Processing Payment...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Confirm & Pay ₹{checkoutOrder.amountINR}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setCheckoutModalOpen(false)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Razorpay 256-bit Encrypted SSL Gateway</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-xs font-mono text-slate-400">Loading Pricing...</div>}>
      <PricingContent />
    </Suspense>
  );
}
