"use client";

import React, { useState } from "react";
import { Sparkles, Wand2, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";

interface PromptEditorProps {
  prompt: string;
  onChangePrompt: (val: string) => void;
  negativePrompt: string;
  onChangeNegativePrompt: (val: string) => void;
  currentStyle: string;
  onStyleSelect?: (style: string) => void;
  isGenerating?: boolean;
}

const SAMPLE_INSPIRATIONS = [
  { label: "🤖 Cute 3D Robot", text: "A cute futuristic AI doodle robot holding a glowing crystal paintbrush in Mumbai at golden hour sunset, 3D animated cinematic style, volumetric lighting, 8k render" },
  { label: "🇮🇳 Futuristic Narendra Modi", text: "Cinematic artistic portrait of Narendra Modi inaugurating a futuristic solar mega-city in 2040, golden sunlight, high realism, dignified composition" },
  { label: "🕊️ Mahatma Gandhi Historical", text: "Artistic historical-style portrait of Mahatma Gandhi walking along Dandi beach during sunrise with peaceful morning mist, watercolor texture" },
  { label: "🚀 Cosmic Astronaut", text: "Cyberpunk astronaut floating in a nebula garden over planet Earth, neon purple and electric cyan reflections, hyper-detailed cosmic atmosphere" },
  { label: "🏎️ Himalayan Supercar", text: "Futuristic luxury electric supercar racing through the Himalayas under the aurora borealis, commercial product photography, dramatic reflections" },
];

export default function PromptEditor({
  prompt,
  onChangePrompt,
  negativePrompt,
  onChangeNegativePrompt,
  currentStyle,
  onStyleSelect,
  isGenerating = false,
}: PromptEditorProps) {
  const [improving, setImproving] = useState(false);
  const [showNegative, setShowNegative] = useState(false);
  const [improvedPreview, setImprovedPreview] = useState<{
    original: string;
    improved: string;
    addedKeywords: string[];
    suggestedStyle?: string;
  } | null>(null);

  const handleImprove = async () => {
    if (!prompt || prompt.trim().length === 0) return;
    setImproving(true);
    try {
      const res = await fetch("/api/improve-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, style: currentStyle }),
      });
      const data = await res.json();
      if (data.success && data.improved) {
        setImprovedPreview(data);
      }
    } catch (err) {
      console.error("Failed to improve prompt:", err);
    } finally {
      setImproving(false);
    }
  };

  const applyImproved = () => {
    if (improvedPreview) {
      onChangePrompt(improvedPreview.improved);
      if (improvedPreview.suggestedStyle && onStyleSelect) {
        onStyleSelect(improvedPreview.suggestedStyle);
      }
      setImprovedPreview(null);
    }
  };

  return (
    <div className="space-y-3.5">
      {/* Label and Prompt Assistant Button */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          IMAGE PROMPT
        </label>
        <button
          type="button"
          onClick={handleImprove}
          disabled={improving || !prompt.trim() || isGenerating}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/30 hover:border-purple-400 text-purple-300 hover:text-white text-xs font-semibold transition-all disabled:opacity-40"
        >
          <Wand2 className={`w-3.5 h-3.5 ${improving ? "animate-spin" : "text-pink-400"}`} />
          <span>{improving ? "Enhancing..." : "Improve Prompt (AI Assistant)"}</span>
        </button>
      </div>

      {/* Main Textarea */}
      <div className="relative">
        <textarea
          rows={4}
          value={prompt}
          onChange={(e) => onChangePrompt(e.target.value)}
          placeholder="Describe the image you want to create in vivid detail (e.g. A cute futuristic robot exploring Mumbai at sunset, cinematic lighting, 8k render...)"
          disabled={isGenerating}
          className="w-full p-4 rounded-2xl glass-input text-xs sm:text-sm resize-none placeholder:text-slate-500 font-sans leading-relaxed focus:ring-2 focus:ring-purple-500/30"
        />
        <div className="absolute right-3 bottom-3 text-[10px] font-mono text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded-md border border-slate-700/40">
          {prompt.length} / 2000
        </div>
      </div>

      {/* AI Prompt Assistant Enhancement Card */}
      {improvedPreview && (
        <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/90 via-purple-950/70 to-pink-950/50 border border-purple-500/40 shadow-xl animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-purple-500/20">
            <span className="text-xs font-semibold text-pink-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              AI Prompt Assistant Enhanced Version
            </span>
            <button
              onClick={() => setImprovedPreview(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Dismiss
            </button>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed italic mb-3">
            “{improvedPreview.improved}”
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={applyImproved}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-xs shadow-md"
            >
              Use Improved Prompt ✨
            </button>
            <button
              onClick={() => setImprovedPreview(null)}
              className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs"
            >
              Keep Original
            </button>
          </div>
        </div>
      )}

      {/* Inspiration Quick Starters */}
      <div>
        <span className="text-[11px] font-mono text-slate-400 block mb-1.5">Quick Starters:</span>
        <div className="flex flex-wrap gap-1.5">
          {SAMPLE_INSPIRATIONS.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onChangePrompt(item.text)}
              className="px-2.5 py-1 rounded-lg bg-[#0d1433]/70 border border-indigo-500/15 hover:border-indigo-400/40 text-slate-300 hover:text-white text-[11px] transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Negative Prompt Collapsible */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setShowNegative(!showNegative)}
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 font-mono transition-colors"
        >
          {showNegative ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          <span>Negative Prompt (What to exclude)</span>
        </button>

        {showNegative && (
          <div className="mt-2">
            <input
              type="text"
              value={negativePrompt}
              onChange={(e) => onChangeNegativePrompt(e.target.value)}
              placeholder="e.g. blurry, low quality, distorted, extra limbs, bad anatomy"
              className="w-full px-3 py-2 rounded-xl glass-input text-xs"
            />
          </div>
        )}
      </div>
    </div>
  );
}
