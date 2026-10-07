"use client";

import React, { useState } from "react";
import { X, Download, Heart, Copy, RefreshCw, Sparkles, Shield, Share2 } from "lucide-react";
import { downloadImage } from "@/lib/utils";
import { GalleryItem } from "./GalleryGrid";

interface ImageModalProps {
  image: GalleryItem | null;
  onClose: () => void;
  onRemix?: (prompt: string, style: string) => void;
  onToggleFavorite?: (id: string) => void;
}

export default function ImageModal({
  image,
  onClose,
  onRemix,
  onToggleFavorite,
}: ImageModalProps) {
  const [copied, setCopied] = useState(false);

  if (!image) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(image.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl glass-card-glow border border-indigo-500/30 text-white shadow-2xl flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Image */}
        <div className="md:w-3/5 bg-black/60 flex items-center justify-center p-4 relative min-h-[320px]">
          <img
            src={image.url}
            alt={image.prompt}
            className="max-h-[70vh] w-auto object-contain rounded-2xl shadow-2xl"
          />
          <div className="absolute bottom-6 left-6 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono text-slate-300 flex items-center gap-1">
            <Shield className="w-3 h-3 text-cyan-400" />
            AI-GENERATED IMAGE
          </div>
        </div>

        {/* Right Side: Details & Actions */}
        <div className="md:w-2/5 p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-mono font-semibold">
                {image.style} Style
              </span>
              <span className="px-3 py-1 rounded-full bg-pink-950/80 border border-pink-500/40 text-pink-300 text-xs font-mono font-semibold">
                {image.quality} Quality
              </span>
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">IMAGE PROMPT</label>
              <p className="text-sm text-slate-100 font-sans leading-relaxed italic bg-[#080d24] p-3.5 rounded-2xl border border-indigo-500/15">
                “{image.prompt}”
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-400">
              <div className="p-2.5 rounded-xl bg-[#080d24] border border-indigo-500/10">
                <span className="text-[10px] text-slate-400 block">Aspect Ratio</span>
                <span className="text-white font-bold">{image.aspectRatio}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#080d24] border border-indigo-500/10">
                <span className="text-[10px] text-slate-400 block">Engine</span>
                <span className="text-cyan-400 font-bold">Shiv Neural v2</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-4 border-t border-indigo-500/20">
            <button
              onClick={() => {
                if (onRemix) onRemix(image.prompt, image.style);
                onClose();
              }}
              className="w-full py-3 rounded-2xl btn-gradient-primary text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Remix in Creator Studio</span>
            </button>

            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? "Copied Prompt!" : "Copy Prompt"}</span>
              </button>

              <button
                onClick={() => downloadImage(image.url)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
