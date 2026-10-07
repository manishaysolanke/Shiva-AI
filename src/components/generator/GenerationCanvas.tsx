"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Download, Heart, Copy, RefreshCw, Maximize2, Shield, Share2 } from "lucide-react";
import { downloadImage } from "@/lib/utils";
import DoodleRobot from "../3d/DoodleRobot";

interface GenerationCanvasProps {
  currentImage: {
    id?: string;
    url: string;
    prompt: string;
    style: string;
    quality: string;
    aspectRatio: string;
    creditsUsed?: number;
    publicFigureDisclaimer?: string;
  } | null;
  isGenerating: boolean;
  onRemix?: (prompt: string, style: string) => void;
  onFavorite?: (id: string) => void;
  isFavorited?: boolean;
}

const LOADING_MESSAGES = [
  "Teaching pixels what you imagined...",
  "Synthesizing neural art layers...",
  "Adding the volumetric lighting & highlights...",
  "Refining subsurface scattering textures...",
  "Applying 8K octane render passes...",
  "Polishing final masterpiece...",
];

export default function GenerationCanvas({
  currentImage,
  isGenerating,
  onRemix,
  onFavorite,
  isFavorited = false,
}: GenerationCanvasProps) {
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (!isGenerating) {
      setLoadingMsgIdx(0);
      return;
    }
    const interval = setInterval(() => {
      setLoadingMsgIdx((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleCopyPrompt = () => {
    if (!currentImage?.prompt) return;
    navigator.clipboard.writeText(currentImage.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!currentImage?.url) return;
    downloadImage(currentImage.url, `shiv-ai-${Date.now()}.png`);
  };

  return (
    <div className="relative w-full h-full min-h-[460px] lg:min-h-[560px] rounded-3xl glass-card-glow border border-indigo-500/25 flex flex-col justify-between p-4 sm:p-6 overflow-hidden">
      {/* Top Bar inside Canvas */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-semibold text-slate-300">
            CREATIVE CANVAS WORKSPACE
          </span>
        </div>

        {currentImage && !isGenerating && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onFavorite?.(currentImage.id || "")}
              className={`p-2 rounded-xl backdrop-blur-md border transition-all ${
                isFavorited
                  ? "bg-pink-600/30 border-pink-500 text-pink-400"
                  : "bg-slate-900/60 border-slate-700/50 text-slate-300 hover:text-white"
              }`}
              title="Save to Favorites"
            >
              <Heart className={`w-4 h-4 ${isFavorited ? "fill-pink-400" : ""}`} />
            </button>

            <button
              onClick={() => setFullscreen(true)}
              className="p-2 rounded-xl bg-slate-900/60 border border-slate-700/50 text-slate-300 hover:text-white transition-all"
              title="Fullscreen Inspect"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs transition-all shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>
        )}
      </div>

      {/* Center Viewport */}
      <div className="flex-1 flex items-center justify-center my-4 relative">
        {isGenerating ? (
          // Dynamic AI Generation Loading State
          <div className="text-center p-8 space-y-5 animate-in fade-in zoom-in-95 duration-300">
            <DoodleRobot mood="generating" size="md" showSpeechBubble={false} />

            <div className="space-y-2 max-w-sm mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-pink-500 p-0.5 mx-auto animate-spin-slow">
                <div className="w-full h-full bg-[#050814] rounded-[14px] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
                </div>
              </div>
              <h4 className="font-bold text-base text-white">Your idea is becoming an image...</h4>
              <p className="text-xs text-purple-300 font-mono animate-pulse min-h-[20px]">
                {LOADING_MESSAGES[loadingMsgIdx]}
              </p>
            </div>

            {/* Progress bar shimmer */}
            <div className="w-64 h-1.5 bg-slate-800 rounded-full mx-auto overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-shimmer" />
            </div>
          </div>
        ) : currentImage ? (
          // Display Generated Image
          <div className="relative max-h-[460px] w-full h-full flex items-center justify-center group">
            {/* Ambient Image Backlight Glow */}
            <div
              className="absolute inset-4 rounded-3xl opacity-40 blur-3xl pointer-events-none transition-opacity group-hover:opacity-70"
              style={{
                backgroundImage: `url(${currentImage.url})`,
                backgroundSize: "cover",
              }}
            />

            {/* Image Frame */}
            <div className="relative max-w-full max-h-full rounded-2xl overflow-hidden border border-indigo-500/30 shadow-2xl bg-black/60">
              <img
                src={currentImage.url}
                alt={currentImage.prompt}
                className="max-h-[440px] w-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
              />

              {/* AI Watermark Label */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono text-slate-300 flex items-center gap-1">
                <Shield className="w-3 h-3 text-cyan-400" />
                AI-GENERATED
              </div>
            </div>
          </div>
        ) : (
          // Empty State
          <div className="text-center p-6 space-y-3">
            <DoodleRobot
              mood="idle"
              size="md"
              customMessage="Your first creation is waiting! Type an idea below & hit Generate. 🎨"
            />
            <h3 className="font-bold text-lg text-white">Turn Imagination Into Reality</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Choose your prompt, pick an artistic style, and watch our neural engine paint your vision.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Metadata & Action Bar */}
      {currentImage && !isGenerating && (
        <div className="p-3.5 rounded-2xl bg-[#080d24]/90 border border-indigo-500/20 backdrop-blur-md space-y-2 z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <p className="text-xs text-slate-200 line-clamp-1 italic font-sans flex-1">
              “{currentImage.prompt}”
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopyPrompt}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] flex items-center gap-1 transition-colors"
              >
                <Copy className="w-3 h-3" />
                <span>{copied ? "Copied!" : "Copy Prompt"}</span>
              </button>

              {onRemix && (
                <button
                  onClick={() => onRemix(currentImage.prompt, currentImage.style)}
                  className="px-2.5 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/30 text-[11px] flex items-center gap-1 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Remix</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-[10px] font-mono text-slate-400 border-t border-indigo-500/10">
            <span className="px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/30">
              Style: {currentImage.style}
            </span>
            <span className="px-2 py-0.5 rounded bg-pink-950/60 text-pink-300 border border-pink-500/30">
              Quality: {currentImage.quality}
            </span>
            <span className="px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
              Ratio: {currentImage.aspectRatio}
            </span>
            {currentImage.creditsUsed && (
              <span className="px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-500/30">
                Cost: {currentImage.creditsUsed} Credits
              </span>
            )}
          </div>
        </div>
      )}

      {/* Fullscreen Inspection Modal */}
      {fullscreen && currentImage && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex flex-col p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="flex justify-between items-center pb-4 text-white">
            <span className="text-xs font-mono text-cyan-400">Shiv AI Master Resolution View</span>
            <button
              onClick={() => setFullscreen(false)}
              className="px-4 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-semibold"
            >
              Close ✕
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center p-4">
            <img
              src={currentImage.url}
              alt={currentImage.prompt}
              className="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl border border-indigo-500/30"
            />
          </div>
        </div>
      )}
    </div>
  );
}
