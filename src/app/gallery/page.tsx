"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles, Filter, Layers, Flame, Clock } from "lucide-react";
import GalleryGrid, { GalleryItem } from "@/components/gallery/GalleryGrid";
import ImageModal from "@/components/gallery/ImageModal";
import { STYLES } from "@/components/generator/StyleSelector";

export default function GalleryPage() {
  const router = useRouter();
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<"featured" | "latest">("featured");
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedStyle !== "All") params.set("style", selectedStyle);
      if (searchQuery.trim()) params.set("q", searchQuery.trim());
      params.set("sort", sortOption);

      const res = await fetch(`/api/gallery?${params.toString()}`);
      const data = await res.json();
      if (data.success && data.images) {
        setImages(data.images);
      }
    } catch (err) {
      console.error("Failed to load gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [selectedStyle, sortOption]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchGallery();
  };

  const handleRemix = (prompt: string, style: string) => {
    router.push(`/create?prompt=${encodeURIComponent(prompt)}&style=${encodeURIComponent(style)}`);
  };

  const handleToggleFavorite = async (id: string) => {
    try {
      const res = await fetch("/api/favorites/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageId: id }),
      });
      const data = await res.json();
      if (data.success) {
        setImages((prev) =>
          prev.map((img) =>
            img.id === id
              ? {
                  ...img,
                  isFavorited: data.isFavorited,
                  favoriteCount: (img.favoriteCount || 0) + (data.isFavorited ? 1 : -1),
                }
              : img
          )
        );
      }
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>SHIV AI COMMUNITY SHOWCASE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Explore The <span className="gradient-text-hero">Neural Art Universe</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Discover incredible community creations. Copy prompts, download 8K renders, or remix any artwork instantly.
        </p>
      </div>

      {/* Search & Sort Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <form onSubmit={handleSearchSubmit} className="w-full md:max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search prompts (e.g. Mumbai, Robot, Astronaut, Portrait)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-input text-xs"
          />
        </form>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={() => setSortOption(sortOption === "featured" ? "latest" : "featured")}
            className="px-3.5 py-2 rounded-xl bg-[#0a0f26] border border-indigo-500/20 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Sort: {sortOption === "featured" ? "Featured" : "Latest"}</span>
          </button>
        </div>
      </div>

      {/* Style Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        <button
          onClick={() => setSelectedStyle("All")}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            selectedStyle === "All"
              ? "bg-indigo-600 text-white shadow"
              : "bg-[#0a0f26] text-slate-400 hover:text-white border border-indigo-500/15"
          }`}
        >
          ✨ All Styles
        </button>
        {STYLES.map((st) => (
          <button
            key={st.id}
            onClick={() => setSelectedStyle(st.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedStyle === st.id
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                : "bg-[#0a0f26] text-slate-400 hover:text-white border border-indigo-500/15"
            }`}
          >
            {st.name}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="py-24 text-center space-y-3">
          <Sparkles className="w-8 h-8 text-pink-400 animate-spin-slow mx-auto" />
          <p className="text-xs text-slate-400 font-mono">Exploring neural gallery...</p>
        </div>
      ) : (
        <GalleryGrid
          images={images}
          onSelectImage={setActiveImage}
          onRemix={handleRemix}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {/* Modal Inspector */}
      <ImageModal
        image={activeImage}
        onClose={() => setActiveImage(null)}
        onRemix={handleRemix}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
}
