import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getSessionUserFromRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUserFromRequest(req);
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden: Admin access required." }, { status: 403 });
    }

    const [
      totalUsers,
      totalGenerations,
      activeSubscriptions,
      safetyFlagsCount,
      totalCreditsConsumed,
      recentUsers,
      recentGenerations,
      safetyLogs,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.generation.count(),
      prisma.subscription.count({ where: { status: "ACTIVE", NOT: { plan: "FREE" } } }),
      prisma.safetyLog.count({ where: { flagged: true } }),
      prisma.creditTransaction.aggregate({
        where: { type: "GENERATION" },
        _sum: { amount: true },
      }),
      prisma.user.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: {
          creditBalance: true,
          subscription: true,
        },
      }),
      prisma.generation.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { email: true, name: true } },
          images: true,
        },
      }),
      prisma.safetyLog.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { email: true } },
        },
      }),
    ]);

    const totalRevenueEst = await prisma.subscription.aggregate({
      _sum: { priceAmount: true },
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers,
        totalGenerations,
        activeSubscriptions,
        safetyFlagsCount,
        totalCreditsConsumed: Math.abs(totalCreditsConsumed._sum.amount || 0),
        estimatedRevenueINR: totalRevenueEst._sum.priceAmount || 0,
      },
      recentUsers: recentUsers.map((u) => ({
        id: u.id,
        email: u.email,
        name: u.name,
        role: u.role,
        credits: u.creditBalance?.currentBalance ?? 0,
        plan: u.subscription?.plan ?? "FREE",
        createdAt: u.createdAt,
      })),
      recentGenerations: recentGenerations.map((g) => ({
        id: g.id,
        userEmail: g.user.email,
        prompt: g.prompt,
        style: g.style,
        quality: g.quality,
        creditsUsed: g.creditsUsed,
        status: g.status,
        imageUrl: g.images[0]?.imageUrl,
        createdAt: g.createdAt,
      })),
      safetyLogs,
    });
  } catch (err: any) {
    console.error("Admin stats error:", err);
    return NextResponse.json({ error: "Failed to fetch admin statistics" }, { status: 500 });
  }
}
