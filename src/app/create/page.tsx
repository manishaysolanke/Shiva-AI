"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Sparkles, Zap, ArrowRight, Flame, Layers, Clock, AlertTriangle } from "lucide-react";
import PromptEditor from "@/components/generator/PromptEditor";
import StyleSelector from "@/components/generator/StyleSelector";
import QualitySelector from "@/components/generator/QualitySelector";
import AspectRatioSelector from "@/components/generator/AspectRatioSelector";
import PublicFigureNotice from "@/components/generator/PublicFigureNotice";
import GenerationCanvas from "@/components/generator/GenerationCanvas";
import { triggerConfetti } from "@/components/ui/Confetti";
import { getCreditCost } from "@/lib/credits";
import Link from "next/link";

function CreateStudioContent() {
  const searchParams = useSearchParams();

  const [prompt, setPrompt] = useState(
    searchParams.get("prompt") ||
      "A cute futuristic AI doodle robot holding a glowing crystal paintbrush in Mumbai at golden hour sunset, 3D animated cinematic style, volumetric lighting, 8k render"
  );
  const [negativePrompt, setNegativePrompt] = useState("");
  const [style, setStyle] = useState(searchParams.get("style") || "3D");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [quality, setQuality] = useState("Standard");

  const [isGenerating, setIsGenerating] = useState(false);
  const [currentImage, setCurrentImage] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [creditNotice, setCreditNotice] = useState<string | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);

  // Calculate dynamic credit cost
  const creditCost = getCreditCost(quality);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setErrorMsg("");
    setCreditNotice(null);
    setIsGenerating(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          negativePrompt,
          style,
          aspectRatio,
          quality,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.insufficientCredits) {
          setErrorMsg(
            `Insufficient credits! You need ${data.requiredCredits} credits, but currently have ${data.currentCredits}. Upgrade your plan for instant daily credits.`
          );
        } else {
          setErrorMsg(data.error || "Failed to generate image.");
        }
        setIsGenerating(false);
        return;
      }

      setCurrentImage(data.image);
      setCreditNotice(`-${data.deducted} Credits (${data.creditsRemaining} remaining)`);
      setIsFavorited(false);
      triggerConfetti();
    } catch (err: any) {
      setErrorMsg("An unexpected network error occurred. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRemix = (remixPrompt: string, remixStyle: string) => {
    setPrompt(remixPrompt);
    setStyle(remixStyle);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleFavorite = async (imgId: string) => {
    if (!currentImage?.id) return;
    try {
      const res = await fetch("/api/favorites/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageId: currentImage.id }),
      });
      const data = await res.json();
      if (data.success) {
        setIsFavorited(data.isFavorited);
      }
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Top Studio Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-indigo-500/15">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI Creator Studio
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-pink-300 font-mono text-[10px]">
              v2.4 Octane
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Describe your vision, choose your aesthetic, and render high-resolution art in seconds.
          </p>
        </div>

        {/* Action Link shortcuts */}
        <div className="flex items-center gap-2">
          <Link
            href="/history"
            className="px-3 py-1.5 rounded-xl bg-[#0b1028] border border-indigo-500/20 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>History</span>
          </Link>
          <Link
            href="/gallery"
            className="px-3 py-1.5 rounded-xl bg-[#0b1028] border border-indigo-500/20 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Community Gallery</span>
          </Link>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Controls Form (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl glass-card border border-indigo-500/20 space-y-5">
            {/* Prompt Box & AI Improver */}
            <PromptEditor
              prompt={prompt}
              onChangePrompt={setPrompt}
              negativePrompt={negativePrompt}
              onChangeNegativePrompt={setNegativePrompt}
              currentStyle={style}
              onStyleSelect={setStyle}
              isGenerating={isGenerating}
            />

            {/* Visual Style Selector */}
            <StyleSelector selectedStyle={style} onSelectStyle={setStyle} />

            {/* Aspect Ratio Selector */}
            <AspectRatioSelector
              aspectRatio={aspectRatio}
              onSelectAspectRatio={setAspectRatio}
            />

            {/* Quality & Resolution Selector */}
            <QualitySelector quality={quality} onSelectQuality={setQuality} />

            {/* Public Figure Safety Notice */}
            <PublicFigureNotice />

            {/* Error Message Alert */}
            {errorMsg && (
              <div className="p-3.5 rounded-2xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold">{errorMsg}</p>
                  {errorMsg.includes("Insufficient") && (
                    <Link
                      href="/pricing"
                      className="inline-block font-bold underline text-amber-300 hover:text-amber-200 mt-1"
                    >
                      View Subscription Plans →
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* Credit deduction animation feedback */}
            {creditNotice && (
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center justify-between animate-bounce-gentle">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  {creditNotice}
                </span>
                <span className="text-[10px] text-slate-400">Refreshes every 24h</span>
              </div>
            )}

            {/* Dynamic Master Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full py-4 rounded-2xl btn-gradient-primary text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-purple-600/40 disabled:opacity-50 transition-all hover:scale-[1.01]"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-5 h-5 text-pink-300 animate-spin" />
                  <span>Synthesizing Image...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-pink-300" />
                  <span>Generate Image — {creditCost} Credits</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Side: Generation Canvas Workspace (7 cols) */}
        <div className="lg:col-span-7">
          <GenerationCanvas
            currentImage={currentImage}
            isGenerating={isGenerating}
            onRemix={handleRemix}
            onFavorite={handleToggleFavorite}
            isFavorited={isFavorited}
          />
        </div>
      </div>
    </div>
  );
}

export default function CreateStudioPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-xs font-mono text-slate-400">Loading Studio...</div>}>
      <CreateStudioContent />
    </Suspense>
  );
}
