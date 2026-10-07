import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle, Zap } from "lucide-react";
import { notFound } from "next/navigation";

const SEO_PAGES: Record<string, { title: string; subtitle: string; description: string; keywords: string[]; samplePrompt: string }> = {
  "art-generator": {
    title: "AI Art Generator — Create Digital Masterpieces Online",
    subtitle: "From 3D character concepts to dreamy watercolors, render award-winning digital art from text.",
    description: "Generate breathtaking digital paintings, concept art, and illustrations using state-of-the-art neural diffusion models. Explore 11 artistic aesthetics with 50 free credits every day.",
    keywords: ["AI Art Generator", "Digital Painting AI", "Fantasy Concept Art", "Concept Art Generator"],
    samplePrompt: "Enchanted mythical floating temple in the clouds, ethereal bioluminescent starlight glow, Studio Ghibli inspired, 8k render",
  },
  "text-to-image": {
    title: "Text to Image AI — Turn Words Into Visual Worlds",
    subtitle: "Type any phrase in natural language and watch the neural engine synthesize photorealistic scenes.",
    description: "Convert ideas, descriptions, and creative prompts into high-resolution visuals. Featuring prompt intelligence that enriches simple thoughts into 8k cinematic scenes.",
    keywords: ["Text to Image AI", "Prompt to Image", "AI Image Creation", "Neural Generator"],
    samplePrompt: "Cyberpunk astronaut floating in a nebula garden over planet Earth, neon purple and electric cyan reflections, 8k octane render",
  },
  "portraits": {
    title: "AI Portrait Generator — Realistic & Artistic Faces",
    subtitle: "Render expressive, cinematic portraits and historical character recreations with subsurface realism.",
    description: "Create studio-lit portraits of characters, leaders, and creative personalities. Fine-tuned facial symmetry, natural skin texture, and soft bokeh lighting.",
    keywords: ["AI Portrait Generator", "Realistic AI Face", "Cinematic Character Portrait"],
    samplePrompt: "Cinematic artistic portrait of Narendra Modi inaugurating a futuristic solar mega-city in 2040, golden sunlight, high realism",
  },
  "india-ai": {
    title: "AI Image Generator India — Built For Indian Creators",
    subtitle: "Affordable ₹ INR pricing (from ₹50/wk), UPI payments, and rich cultural style understanding.",
    description: "Shiv AI is built specifically for Indian designers, marketing agencies, and visual storytellers. Full support for Indian cultural motifs, historic landmarks, and localized concepts.",
    keywords: ["AI Image Generator India", "Text to Image India", "Shiv AI Indian Rupee", "UPI AI Generator"],
    samplePrompt: "A futuristic AI doodle robot holding a glowing paintbrush in Mumbai at sunset, cinematic lighting, 8k render",
  },
};

export async function generateStaticParams() {
  return Object.keys(SEO_PAGES).map((slug) => ({ slug }));
}

export default function SeoLandingPage({ params }: { params: { slug: string } }) {
  const data = SEO_PAGES[params.slug];
  if (!data) notFound();

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>SHIV AI FEATURE SPOTLIGHT</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {data.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          {data.subtitle}
        </p>
      </div>

      <div className="p-8 rounded-3xl glass-card-glow border border-indigo-500/30 space-y-6">
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white">Overview & Capabilities</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{data.description}</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#080d24] border border-indigo-500/20 space-y-2">
          <span className="text-[10px] font-mono text-purple-300 font-bold">EXAMPLE PROMPT</span>
          <p className="text-xs sm:text-sm text-slate-100 italic">“{data.samplePrompt}”</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-indigo-500/15">
          <div className="flex items-center gap-2 text-xs text-amber-300 font-mono">
            <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>50 Free Daily Credits Included</span>
          </div>

          <Link
            href={`/create?prompt=${encodeURIComponent(data.samplePrompt)}`}
            className="w-full sm:w-auto px-6 py-3 rounded-xl btn-gradient-primary text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
          >
            <span>Try This Prompt in Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
