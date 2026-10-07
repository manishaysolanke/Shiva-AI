"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Clock, Download, Trash2, RefreshCw, Copy, Sparkles, AlertTriangle, Shield } from "lucide-react";
import { downloadImage } from "@/lib/utils";
import Link from "next/link";

export default function HistoryPage() {
  const router = useRouter();
  const [generations, setGenerations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/history");
      const data = await res.json();
      if (data.success && data.generations) {
        setGenerations(data.generations);
      }
    } catch (err) {
      console.error("Failed to load history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/history/${id}`, { method: "DELETE" });
      if (res.ok) {
        setGenerations((prev) => prev.filter((g) => g.id !== id));
        setDeleteId(null);
      }
    } catch (err) {
      console.error("Failed to delete generation:", err);
    }
  };

  const handleCopy = (id: string, prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRemix = (prompt: string, style: string) => {
    router.push(`/create?prompt=${encodeURIComponent(prompt)}&style=${encodeURIComponent(style)}`);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-indigo-500/15">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Clock className="w-6 h-6 text-purple-400" />
            Creation History & Ledger
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review your past AI creations, download high-res files, or remix previous prompts.
          </p>
        </div>

        <Link
          href="/create"
          className="px-4 py-2 rounded-xl btn-gradient-primary text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>New Generation</span>
        </Link>
      </div>

      {/* Generations List */}
      {loading ? (
        <div className="py-24 text-center space-y-3">
          <Sparkles className="w-8 h-8 text-purple-400 animate-spin-slow mx-auto" />
          <p className="text-xs text-slate-400 font-mono">Loading creation records...</p>
        </div>
      ) : generations.length === 0 ? (
        <div className="py-24 text-center space-y-4 rounded-3xl glass-card border border-indigo-500/20 p-8">
          <Clock className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No creations yet</h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Your generation history will appear here once you create your first image.
          </p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl btn-gradient-primary text-white font-bold text-xs"
          >
            <span>Create First Image</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {generations.map((gen) => {
            const img = gen.images[0];
            return (
              <div
                key={gen.id}
                className="p-4 sm:p-5 rounded-3xl glass-card border border-indigo-500/15 hover:border-purple-500/30 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
              >
                {/* Thumbnail & Image */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                  {img ? (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-black shrink-0 border border-indigo-500/20 shadow-md">
                      <img
                        src={img.url}
                        alt={gen.prompt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-500 text-xs">
                      No Image
                    </div>
                  )}

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-slate-100 font-medium line-clamp-2">
                      “{gen.prompt}”
                    </p>

                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-slate-400">
                      <span className="px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/30">
                        {gen.style}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-pink-950/60 text-pink-300 border border-pink-500/30">
                        {gen.quality}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                        {gen.aspectRatio}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-500/30">
                        ⚡ {gen.creditsUsed} Credits
                      </span>
                      <span>•</span>
                      <span>{new Date(gen.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-indigo-500/10">
                  <button
                    onClick={() => handleCopy(gen.id, gen.prompt)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Copy Prompt"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleRemix(gen.prompt, gen.style)}
                    className="px-3 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 hover:text-white border border-purple-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Remix</span>
                  </button>

                  {img && (
                    <button
                      onClick={() => downloadImage(img.url)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Download Image"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => setDeleteId(gen.id)}
                    className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-300 border border-red-500/20 transition-colors"
                    title="Delete Record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="p-6 rounded-3xl glass-card-glow border border-red-500/40 max-w-sm w-full text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-950/80 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Delete Generation?</h3>
            <p className="text-xs text-slate-300">
              This will remove the creation and its stored render from your history. This action cannot be undone.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-lg shadow-red-600/30"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
