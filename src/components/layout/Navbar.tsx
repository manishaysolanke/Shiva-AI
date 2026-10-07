"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Zap, User, LogOut, Shield, ChevronDown, Clock, Layers, Image as ImageIcon, Flame } from "lucide-react";
import { formatTimeRemaining } from "@/lib/utils";

interface NavbarProps {
  onOpenAuth?: (mode?: "login" | "signup") => void;
}

export default function Navbar({ onOpenAuth }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [creditDropdownOpen, setCreditDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [refreshCountdown, setRefreshCountdown] = useState<number>(0);

  const fetchSession = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (data.authenticated && data.user) {
        setUser(data.user);
        setRefreshCountdown(data.user.refreshInMs || 0);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchSession();

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Real-time countdown timer
  useEffect(() => {
    if (refreshCountdown <= 0) return;
    const interval = setInterval(() => {
      setRefreshCountdown((prev) => Math.max(0, prev - 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [refreshCountdown]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setUserMenuOpen(false);
    window.location.reload();
  };

  const navLinks = [
    { href: "/create", label: "Create", icon: Sparkles },
    { href: "/gallery", label: "Gallery", icon: ImageIcon },
    { href: "/pricing", label: "Pricing", icon: Flame },
    { href: "/dashboard", label: "Dashboard", icon: Layers },
    { href: "/history", label: "History", icon: Clock },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-2.5 bg-[#050713]/85 backdrop-blur-xl border-b border-indigo-500/15 shadow-lg shadow-black/40"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-neon-purple transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-[#070b1e] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-pink-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight text-white flex items-center gap-1">
              Shiv <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">AI</span>
            </span>
            <span className="hidden sm:block text-[10px] tracking-wider uppercase text-indigo-300/70 font-mono -mt-1">
              Creative Lab
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0c122c]/60 p-1 rounded-full border border-indigo-500/15 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-3.5 h-3.5 opacity-80" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          {/* Credits Counter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCreditDropdownOpen(!creditDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/30 text-amber-300 hover:border-amber-400/50 transition-all text-xs font-semibold shadow-sm"
              title="View daily credits and refresh status"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse fill-amber-400" />
              <span>{user ? user.credits : 50} Credits</span>
              <ChevronDown className="w-3 h-3 text-amber-300/70" />
            </button>

            {/* Credit Popup Dropdown */}
            {creditDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 p-4 rounded-2xl glass-card-glow text-white shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-indigo-500/20">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="font-semibold text-sm">Credit Balance</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
                    {user?.plan || "FREE"}
                  </span>
                </div>

                <div className="my-3">
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Available Today</span>
                    <span className="font-bold text-amber-300 font-mono">
                      {user ? user.credits : 50} / {user ? user.dailyAllowance : 50}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (((user?.credits || 50) / (user?.dailyAllowance || 50)) * 100))}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="bg-[#070b1e]/80 p-2.5 rounded-xl border border-indigo-500/15 mb-3 text-xs text-slate-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    Refreshes in:
                  </span>
                  <span className="font-mono text-cyan-300 font-semibold">
                    {formatTimeRemaining(refreshCountdown || 14 * 60 * 60 * 1000 + 32 * 60 * 1000)}
                  </span>
                </div>

                <div className="space-y-1 text-[11px] text-slate-400 mb-3 font-mono">
                  <div className="flex justify-between">
                    <span>Standard Generation:</span>
                    <span className="text-slate-200">5 Credits</span>
                  </div>
                  <div className="flex justify-between">
                    <span>High Quality:</span>
                    <span className="text-slate-200">7 Credits</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ultra 8K Quality:</span>
                    <span className="text-slate-200">9 Credits</span>
                  </div>
                </div>

                <Link
                  href="/pricing"
                  onClick={() => setCreditDropdownOpen(false)}
                  className="block w-full text-center py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 text-white font-semibold text-xs transition-all shadow-md shadow-purple-600/30"
                >
                  Upgrade Plan (from ₹50/wk)
                </Link>
              </div>
            )}
          </div>

          {/* User Account / Auth Trigger */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1 pl-2.5 rounded-full bg-[#0d1433]/80 border border-indigo-500/25 hover:border-indigo-400/50 transition-all text-xs text-slate-200"
              >
                <span className="max-w-[100px] truncate font-medium">{user.name || user.email}</span>
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center font-bold text-white uppercase text-xs">
                  {user.name?.[0] || user.email?.[0] || "U"}
                </div>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 p-2 rounded-2xl glass-card text-white shadow-2xl z-50">
                  <div className="px-3 py-2 border-b border-indigo-500/15 mb-1">
                    <p className="text-xs text-slate-400">Signed in as</p>
                    <p className="text-xs font-semibold text-slate-200 truncate">{user.email}</p>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs hover:bg-white/5 text-slate-300 hover:text-white transition-colors"
                  >
                    <Layers className="w-4 h-4 text-cyan-400" />
                    Dashboard
                  </Link>

                  <Link
                    href="/history"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs hover:bg-white/5 text-slate-300 hover:text-white transition-colors"
                  >
                    <Clock className="w-4 h-4 text-purple-400" />
                    Generation History
                  </Link>

                  <Link
                    href="/pricing"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs hover:bg-white/5 text-slate-300 hover:text-white transition-colors"
                  >
                    <Flame className="w-4 h-4 text-amber-400" />
                    Subscription Plan
                  </Link>

                  {user.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs hover:bg-indigo-600/20 text-indigo-300 hover:text-indigo-200 transition-colors font-semibold"
                    >
                      <Shield className="w-4 h-4 text-indigo-400" />
                      Admin Control Panel
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs hover:bg-red-500/15 text-red-400 hover:text-red-300 transition-colors mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth?.("login")}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
              >
                Sign In
              </button>
              <Link
                href="/create"
                className="px-4 py-1.5 rounded-full text-xs font-semibold text-white btn-gradient-primary flex items-center gap-1.5 shadow-sm"
              >
                <Sparkles className="w-3 h-3 text-pink-300" />
                <span>Create Now</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
