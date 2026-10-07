import { NextRequest, NextResponse } from "next/server";
import { getSessionUserFromRequest } from "@/lib/auth";
import { adminAdjustCredits } from "@/lib/credits";

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUserFromRequest(req);
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 403 });
    }

    const { targetUserId, amount, reason } = await req.json();

    if (!targetUserId || typeof amount !== "number" || !reason) {
      return NextResponse.json(
        { error: "Target User ID, numeric amount (+/-), and explanation reason are required." },
        { status: 400 }
      );
    }

    const result = await adminAdjustCredits({
      userId: targetUserId,
      amount,
      reason,
    });

    return NextResponse.json({
      success: true,
      message: `Successfully adjusted credits by ${amount > 0 ? "+" : ""}${amount} for user.`,
      newBalance: result.updated.currentBalance,
      transactionId: result.transaction.id,
    });
  } catch (err: any) {
    console.error("Admin adjust credits error:", err);
    return NextResponse.json({ error: err.message || "Failed to adjust credits." }, { status: 500 });
  }
}
