"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart, Sparkles, Download, Copy, RefreshCw } from "lucide-react";
import { downloadImage } from "@/lib/utils";
import Link from "next/link";

export default function FavoritesPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/favorites");
      const data = await res.json();
      if (data.success && data.favorites) {
        setFavorites(data.favorites);
      }
    } catch (err) {
      console.error("Failed to load favorites:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRemix = (prompt: string, style: string) => {
    router.push(`/create?prompt=${encodeURIComponent(prompt)}&style=${encodeURIComponent(style)}`);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-indigo-500/15">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
            Favorited Creations
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Your saved collection of inspiring AI artworks and concepts.
          </p>
        </div>

        <Link
          href="/gallery"
          className="px-4 py-2 rounded-xl bg-[#0b1028] border border-indigo-500/20 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Explore More Art</span>
        </Link>
      </div>

      {loading ? (
        <div className="py-24 text-center space-y-3">
          <Sparkles className="w-8 h-8 text-pink-400 animate-spin-slow mx-auto" />
          <p className="text-xs text-slate-400 font-mono">Loading saved favorites...</p>
        </div>
      ) : favorites.length === 0 ? (
        <div className="py-24 text-center space-y-4 rounded-3xl glass-card border border-indigo-500/20 p-8">
          <Heart className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No favorites saved yet</h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Click the heart icon on any generated artwork in the studio or gallery to save it here.
          </p>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl btn-gradient-primary text-white font-bold text-xs"
          >
            <span>Browse Gallery</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((fav) => (
            <div
              key={fav.id}
              className="rounded-3xl overflow-hidden glass-card border border-indigo-500/20 group relative shadow-xl"
            >
              <div className="relative aspect-square overflow-hidden bg-black">
                <img
                  src={fav.url}
                  alt={fav.prompt}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-xs text-white">
                  <p className="line-clamp-2 italic font-sans mb-3">“{fav.prompt}”</p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleRemix(fav.prompt, fav.style)}
                      className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1 shadow-md"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Remix</span>
                    </button>
                    <button
                      onClick={() => downloadImage(fav.url)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-3.5 flex items-center justify-between text-xs text-slate-400 bg-[#070b1e]">
                <span className="font-mono text-[11px] text-purple-300">{fav.style}</span>
                <span className="font-mono text-[11px] text-slate-400">{fav.quality}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
