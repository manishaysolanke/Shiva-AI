import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getSessionUserFromRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUserFromRequest(req);
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    const users = await prisma.user.findMany({
      where: query
        ? {
            OR: [
              { email: { contains: query } },
              { name: { contains: query } },
            ],
          }
        : {},
      include: {
        creditBalance: true,
        subscription: true,
        _count: {
          select: { generations: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return NextResponse.json({
      success: true,
      users: users.map((u) => ({
        id: u.id,
        email: u.email,
        name: u.name,
        role: u.role,
        credits: u.creditBalance?.currentBalance ?? 0,
        dailyAllowance: u.creditBalance?.dailyAllowance ?? 50,
        totalUsed: u.creditBalance?.totalCreditsUsed ?? 0,
        generationsCount: u._count.generations,
        plan: u.subscription?.plan ?? "FREE",
        subscriptionStatus: u.subscription?.status ?? "ACTIVE",
        createdAt: u.createdAt,
      })),
    });
  } catch (err: any) {
    console.error("Admin users list error:", err);
    return NextResponse.json({ error: "Failed to fetch users." }, { status: 500 });
  }
}
