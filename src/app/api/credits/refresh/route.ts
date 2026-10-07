import { NextRequest, NextResponse } from "next/server";
import { getSessionUserFromRequest } from "@/lib/auth";
import { checkAndApplyDailyRefresh, getNextRefreshTimeMs } from "@/lib/credits";

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const balance = await checkAndApplyDailyRefresh(user.id);
    const refreshInMs = balance ? getNextRefreshTimeMs(balance.lastCreditRefresh) : 0;

    return NextResponse.json({
      success: true,
      currentBalance: balance?.currentBalance ?? 50,
      dailyAllowance: balance?.dailyAllowance ?? 50,
      lastRefresh: balance?.lastCreditRefresh,
      refreshInMs,
    });
  } catch (err: any) {
    console.error("Credit refresh error:", err);
    return NextResponse.json({ error: "Failed to check credit refresh" }, { status: 500 });
  }
}
