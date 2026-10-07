import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getSessionUserFromRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const transactions = await prisma.creditTransaction.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    const balance = await prisma.creditBalance.findUnique({
      where: { userId: user.id },
    });

    return NextResponse.json({
      success: true,
      currentBalance: balance?.currentBalance ?? 50,
      dailyAllowance: balance?.dailyAllowance ?? 50,
      totalCreditsUsed: balance?.totalCreditsUsed ?? 0,
      totalGenerations: balance?.totalGenerations ?? 0,
      transactions,
    });
  } catch (err: any) {
    console.error("Credit ledger error:", err);
    return NextResponse.json({ error: "Failed to fetch credit ledger" }, { status: 500 });
  }
}
