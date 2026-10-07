"use client";

import React, { useState } from "react";
import HeroSection from "@/components/landing/HeroSection";
import DescribeSection from "@/components/landing/DescribeSection";
import StylesUniverseSection from "@/components/landing/StylesUniverseSection";
import QualityComparison3D from "@/components/3d/QualityComparison3D";
import FlashCardsSection from "@/components/landing/FlashCardsSection";
import PricingSection from "@/components/landing/PricingSection";
import PortalCtaSection from "@/components/landing/PortalCtaSection";
import ScrollProgress from "@/components/layout/ScrollProgress";
import AuthModal from "@/components/ui/AuthModal";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");

  const handleSelectPlan = (planId: "WEEKLY" | "MONTHLY") => {
    router.push(`/pricing?plan=${planId}`);
  };

  return (
    <div className="relative">
      {/* Vertical Interactive Story Chapter Tracker */}
      <ScrollProgress />

      {/* Chapter 01: Imagine (Hero) */}
      <HeroSection />

      {/* Chapter 02: Describe (AI Prompt Assistant) */}
      <DescribeSection />

      {/* Chapter 04: Customize (Styles Universe) */}
      <StylesUniverseSection />

      {/* Chapter 05: Enhance (Quality Comparison) */}
      <section id="enhance" className="py-20 px-4 sm:px-6">
        <QualityComparison3D />
      </section>

      {/* Interactive Feature Flash Cards */}
      <FlashCardsSection />

      {/* Chapter 07: Pricing */}
      <PricingSection onSelectPlan={handleSelectPlan} />

      {/* Chapter 08: Glowing Portal CTA */}
      <PortalCtaSection />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
}
