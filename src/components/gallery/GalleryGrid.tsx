"use client";

import React, { useState } from "react";
import { Heart, Download, Copy, RefreshCw, Eye, Sparkles, User, Shield } from "lucide-react";
import { downloadImage } from "@/lib/utils";

export interface GalleryItem {
  id: string;
  url: string;
  prompt: string;
  style: string;
  aspectRatio: string;
  quality: string;
  author?: string;
  authorAvatar?: string;
  favoriteCount?: number;
  isFavorited?: boolean;
}

interface GalleryGridProps {
  images: GalleryItem[];
  onSelectImage?: (img: GalleryItem) => void;
  onRemix?: (prompt: string, style: string) => void;
  onToggleFavorite?: (id: string) => void;
}

export default function GalleryGrid({
  images,
  onSelectImage,
  onRemix,
  onToggleFavorite,
}: GalleryGridProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, prompt: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    downloadImage(url, `shiv-ai-${Date.now()}.png`);
  };

  if (images.length === 0) {
    return (
      <div className="py-20 text-center space-y-3">
        <Sparkles className="w-10 h-10 text-slate-600 mx-auto animate-pulse" />
        <p className="text-slate-400 text-sm">No creations found matching your filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((img) => (
        <div
          key={img.id}
          onClick={() => onSelectImage?.(img)}
          className="group relative rounded-3xl overflow-hidden glass-card hover:glass-card-glow border border-indigo-500/20 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer"
        >
          {/* Image */}
          <div className="relative aspect-square w-full overflow-hidden bg-slate-950">
            <img
              src={img.url}
              alt={img.prompt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* AI Watermark Badge */}
            <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/20 text-[9px] font-mono text-slate-300 flex items-center gap-1">
              <Shield className="w-2.5 h-2.5 text-cyan-400" />
              AI
            </div>

            {/* Style Badge */}
            <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-indigo-950/80 backdrop-blur-md border border-indigo-500/40 text-[10px] font-mono text-indigo-300">
              {img.style}
            </div>

            {/* Hover Action Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050814] via-[#050814]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4">
              <p className="text-xs text-white font-medium line-clamp-2 mb-3">
                “{img.prompt}”
              </p>

              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite?.(img.id);
                    }}
                    className={`p-2 rounded-xl backdrop-blur-md border text-xs transition-colors ${
                      img.isFavorited
                        ? "bg-pink-600/40 border-pink-500 text-pink-400"
                        : "bg-slate-900/80 border-slate-700 text-slate-300 hover:text-white"
                    }`}
                    title="Favorite"
                  >
                    <Heart className={`w-3.5 h-3.5 ${img.isFavorited ? "fill-pink-400" : ""}`} />
                  </button>

                  <button
                    onClick={(e) => handleCopy(img.id, img.prompt, e)}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs flex items-center gap-1"
                    title="Copy Prompt"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedId === img.id ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  {onRemix && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemix(img.prompt, img.style);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1 shadow-md"
                      title="Remix this prompt"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Remix</span>
                    </button>
                  )}

                  <button
                    onClick={(e) => handleDownload(img.url, e)}
                    className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
                    title="Download Image"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="p-3.5 flex items-center justify-between text-xs text-slate-400 border-t border-indigo-500/10 bg-[#080d24]/70">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-[10px] text-white font-bold uppercase">
                {img.author?.[0] || "C"}
              </div>
              <span className="text-slate-300 text-[11px] truncate max-w-[120px]">
                {img.author || "Shiv Creator"}
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[10px]">
              <span className="text-cyan-400">{img.quality || "Standard"}</span>
              <span>•</span>
              <span className="text-slate-400">{img.aspectRatio || "1:1"}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
