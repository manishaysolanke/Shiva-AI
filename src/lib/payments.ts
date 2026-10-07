import crypto from "crypto";
import prisma from "./db";

export interface PlanConfig {
  id: "FREE" | "WEEKLY" | "MONTHLY";
  name: string;
  priceINR: number;
  periodText: string;
  dailyCredits: number;
  features: string[];
  isPopular?: boolean;
  isBestValue?: boolean;
  badge?: string;
}

export const PLANS: Record<string, PlanConfig> = {
  FREE: {
    id: "FREE",
    name: "Free Starter",
    priceINR: 0,
    periodText: "Forever",
    dailyCredits: 50,
    features: [
      "50 Daily Free Credits (Refreshed every 24h)",
      "Standard Image Generation (5 credits/image)",
      "Basic Styles & Aspect Ratios",
      "Image History & Personal Library",
      "High-Resolution Instant Downloads",
    ],
  },
  WEEKLY: {
    id: "WEEKLY",
    name: "Weekly Creator",
    priceINR: 50,
    periodText: "/ week",
    dailyCredits: 120,
    isPopular: true,
    badge: "Popular",
    features: [
      "120 Daily High-Speed Credits",
      "High Quality Generation (7 credits/image)",
      "Faster Generation Queue",
      "All 11 Premium Art & 3D Styles",
      "Prompt Assistant AI Supercharger",
      "Commercial Usage License",
    ],
  },
  MONTHLY: {
    id: "MONTHLY",
    name: "Pro Studio Monthly",
    priceINR: 200,
    periodText: "/ month",
    dailyCredits: 300,
    isBestValue: true,
    badge: "Best Value",
    features: [
      "300 Daily Priority Credits",
      "Ultra 8K Quality Generation (9 credits/image)",
      "Dedicated GPU Priority Queue",
      "Public Figure Creative Portraits",
      "Unlimited Saved Prompts & Favorites",
      "Priority 24/7 Discord & Support",
      "Save 35% compared to weekly",
    ],
  },
};

export async function createCheckoutOrder({
  userId,
  planId,
}: {
  userId: string;
  planId: "WEEKLY" | "MONTHLY";
}) {
  const plan = PLANS[planId];
  if (!plan) throw new Error("Invalid subscription plan");

  const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  // If RAZORPAY_KEY_ID is configured, we can initialize real Razorpay instance
  // Otherwise, we provide secure local test simulation
  return {
    orderId,
    amountINR: plan.priceINR,
    amountSubunits: plan.priceINR * 100, // paise
    currency: "INR",
    planName: plan.name,
    planId: plan.id,
    keyId: process.env.RAZORPAY_KEY_ID || "rzp_test_shivai_mock_key",
    isTestMode: !process.env.RAZORPAY_KEY_ID,
  };
}

export function verifyWebhookSignature({
  body,
  signature,
  secret,
}: {
  body: string;
  signature: string;
  secret: string;
}): boolean {
  if (!secret) return true; // dev bypass if unconfigured
  try {
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");
    return expectedSignature === signature;
  } catch {
    return false;
  }
}

export async function activateSubscription({
  userId,
  planId,
  orderId,
}: {
  userId: string;
  planId: "WEEKLY" | "MONTHLY";
  orderId: string;
}) {
  const plan = PLANS[planId];
  if (!plan) throw new Error("Invalid plan");

  const periodDays = planId === "WEEKLY" ? 7 : 30;
  const currentPeriodEnd = new Date(Date.now() + periodDays * 24 * 60 * 60 * 1000);

  return await prisma.$transaction(async (tx) => {
    // 1. Upsert subscription
    const sub = await tx.subscription.upsert({
      where: { userId },
      update: {
        plan: planId,
        status: "ACTIVE",
        priceAmount: plan.priceINR,
        razorpayOrderId: orderId,
        currentPeriodEnd,
      },
      create: {
        userId,
        plan: planId,
        status: "ACTIVE",
        priceAmount: plan.priceINR,
        razorpayOrderId: orderId,
        currentPeriodEnd,
      },
    });

    // 2. Increase daily allowance & top up credits immediately
    const balance = await tx.creditBalance.findUnique({ where: { userId } });
    const bonusCredits = planId === "MONTHLY" ? 300 : 120;

    if (balance) {
      const newBal = balance.currentBalance + bonusCredits;
      await tx.creditBalance.update({
        where: { userId },
        data: {
          dailyAllowance: plan.dailyCredits,
          currentBalance: newBal,
        },
      });

      await tx.creditTransaction.create({
        data: {
          userId,
          amount: bonusCredits,
          balanceAfter: newBal,
          type: "SUBSCRIPTION_BONUS",
          description: `Subscription activated: ${plan.name} (+${bonusCredits} Bonus Credits)`,
        },
      });
    }

    return sub;
  });
}
