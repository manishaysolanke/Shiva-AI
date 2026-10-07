import prisma from "./db";

export const CREDIT_COSTS = {
  Standard: 5,
  High: 7,
  Ultra: 9,
} as const;

export type QualityLevel = keyof typeof CREDIT_COSTS;

export function getCreditCost(quality: string): number {
  if (quality === "Ultra") return CREDIT_COSTS.Ultra;
  if (quality === "High") return CREDIT_COSTS.High;
  return CREDIT_COSTS.Standard;
}

/**
 * Checks if the user is eligible for their daily 50 credits refresh (every 24 hours).
 * Server-controlled time prevents client clock manipulation.
 */
export async function checkAndApplyDailyRefresh(userId: string) {
  return await prisma.$transaction(async (tx) => {
    let balance = await tx.creditBalance.findUnique({
      where: { userId },
    });

    if (!balance) {
      balance = await tx.creditBalance.create({
        data: {
          userId,
          currentBalance: 50,
          dailyAllowance: 50,
          lastCreditRefresh: new Date(),
        },
      });
      return balance;
    }

    const now = new Date();
    const lastRefresh = new Date(balance.lastCreditRefresh);
    const msSinceRefresh = now.getTime() - lastRefresh.getTime();
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

    if (msSinceRefresh >= TWENTY_FOUR_HOURS) {
      // Calculate how many credits to replenish up to daily allowance (or grant full 50 if balance is low)
      const newBalance = Math.max(balance.currentBalance, balance.dailyAllowance);
      const added = newBalance - balance.currentBalance;

      const updated = await tx.creditBalance.update({
        where: { userId },
        data: {
          currentBalance: newBalance,
          lastCreditRefresh: now,
        },
      });

      if (added > 0) {
        await tx.creditTransaction.create({
          data: {
            userId,
            amount: added,
            balanceAfter: newBalance,
            type: "DAILY_REFRESH",
            description: "Daily free credit refresh (50 Credits/day)",
          },
        });
      }

      return updated;
    }

    return balance;
  });
}

/**
 * Calculates remaining time until next daily refresh in milliseconds
 */
export function getNextRefreshTimeMs(lastCreditRefresh: Date): number {
  const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
  const nextRefresh = new Date(lastCreditRefresh).getTime() + TWENTY_FOUR_HOURS;
  const remaining = nextRefresh - Date.now();
  return Math.max(0, remaining);
}

/**
 * Atomically checks and reserves/deducts credits for generation.
 * Throws an error if credits are insufficient or race condition occurs.
 */
export async function deductCreditsAtomic({
  userId,
  amount,
  description,
  generationId,
}: {
  userId: string;
  amount: number;
  description: string;
  generationId?: string;
}) {
  return await prisma.$transaction(async (tx) => {
    const balance = await tx.creditBalance.findUnique({
      where: { userId },
    });

    if (!balance) {
      throw new Error("Credit account not found for user.");
    }

    if (balance.currentBalance < amount) {
      throw new Error(
        `Insufficient credits. You need ${amount} credits to perform this action, but only have ${balance.currentBalance} credits.`
      );
    }

    const newBalance = balance.currentBalance - amount;

    const updatedBalance = await tx.creditBalance.update({
      where: { userId },
      data: {
        currentBalance: newBalance,
        totalCreditsUsed: balance.totalCreditsUsed + amount,
        totalGenerations: balance.totalGenerations + 1,
      },
    });

    const transaction = await tx.creditTransaction.create({
      data: {
        userId,
        amount: -amount,
        balanceAfter: newBalance,
        type: "GENERATION",
        description,
        generationId,
      },
    });

    return {
      newBalance,
      transaction,
      updatedBalance,
    };
  });
}

/**
 * Refunds credits if generation failed on provider side.
 */
export async function refundCredits({
  userId,
  amount,
  reason,
  generationId,
}: {
  userId: string;
  amount: number;
  reason: string;
  generationId?: string;
}) {
  return await prisma.$transaction(async (tx) => {
    const balance = await tx.creditBalance.findUnique({
      where: { userId },
    });

    if (!balance) return null;

    const newBalance = balance.currentBalance + amount;

    const updated = await tx.creditBalance.update({
      where: { userId },
      data: {
        currentBalance: newBalance,
        totalCreditsUsed: Math.max(0, balance.totalCreditsUsed - amount),
      },
    });

    const transaction = await tx.creditTransaction.create({
      data: {
        userId,
        amount,
        balanceAfter: newBalance,
        type: "REFUND",
        description: `Refund: ${reason}`,
        generationId,
      },
    });

    return { updated, transaction };
  });
}

/**
 * Admin manual credit adjustment
 */
export async function adminAdjustCredits({
  userId,
  amount,
  reason,
}: {
  userId: string;
  amount: number;
  reason: string;
}) {
  return await prisma.$transaction(async (tx) => {
    const balance = await tx.creditBalance.findUnique({
      where: { userId },
    });

    if (!balance) throw new Error("User balance record not found");

    const newBalance = Math.max(0, balance.currentBalance + amount);

    const updated = await tx.creditBalance.update({
      where: { userId },
      data: { currentBalance: newBalance },
    });

    const transaction = await tx.creditTransaction.create({
      data: {
        userId,
        amount,
        balanceAfter: newBalance,
        type: "ADMIN_ADJUSTMENT",
        description: `Admin adjustment: ${reason}`,
      },
    });

    return { updated, transaction };
  });
}
