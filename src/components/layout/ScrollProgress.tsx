"use client";

import React, { useState, useEffect } from "react";

const CHAPTERS = [
  { id: "hero", num: "01", label: "Imagine" },
  { id: "describe", num: "02", label: "Describe" },
  { id: "generate", num: "03", label: "Generate" },
  { id: "styles", num: "04", label: "Customize" },
  { id: "enhance", num: "05", label: "Enhance" },
  { id: "gallery-preview", num: "06", label: "Explore" },
  { id: "pricing", num: "07", label: "Pricing" },
  { id: "portal", num: "08", label: "Portal" },
];

export default function ScrollProgress() {
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      
      CHAPTERS.forEach((chap, idx) => {
        const el = document.getElementById(chap.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveChapter(idx);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      aria-label="Story chapters navigation"
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3 py-3 px-2 rounded-full bg-[#080d24]/60 backdrop-blur-md border border-indigo-500/20 shadow-2xl"
    >
      {CHAPTERS.map((chap, idx) => {
        const isActive = activeChapter === idx;
        return (
          <button
            key={chap.id}
            onClick={() => scrollToChapter(chap.id)}
            className="group relative flex items-center justify-end"
            title={`${chap.num} ${chap.label}`}
          >
            {/* Tooltip Label */}
            <span
              className={`absolute right-7 px-2.5 py-1 rounded-lg text-[10px] font-mono whitespace-nowrap transition-all duration-200 pointer-events-none ${
                isActive
                  ? "opacity-100 translate-x-0 bg-indigo-600 text-white font-bold shadow-lg"
                  : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 bg-[#0d1433] text-slate-300 border border-indigo-500/20"
              }`}
            >
              {chap.num} {chap.label}
            </span>

            {/* Indicator Dot */}
            <div
              className={`transition-all duration-300 rounded-full flex items-center justify-center ${
                isActive
                  ? "w-4 h-4 bg-gradient-to-r from-cyan-400 to-pink-500 shadow-neon-purple scale-110"
                  : "w-2.5 h-2.5 bg-slate-700 group-hover:bg-indigo-400"
              }`}
            >
              {isActive && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
            </div>
          </button>
        );
      })}
    </nav>
  );
}
