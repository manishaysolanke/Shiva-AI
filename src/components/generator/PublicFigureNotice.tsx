import React from "react";
import { ShieldCheck, Info } from "lucide-react";

export default function PublicFigureNotice() {
  return (
    <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 text-slate-300 text-xs flex items-start gap-2.5">
      <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
      <div className="space-y-1">
        <p className="font-semibold text-slate-100 flex items-center gap-1.5">
          Responsible AI Generation & Public Figures Policy
        </p>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Artistic and historical representations of public figures (such as Narendra Modi, Mahatma Gandhi, Elon Musk, sports legends) are supported. Generated images are digital fictional artworks with watermarking and must not be used to create deceptive misinformation or deepfakes.
        </p>
      </div>
    </div>
  );
}
