import { NextRequest, NextResponse } from "next/server";
import { getSessionUserFromRequest } from "@/lib/auth";
import { checkAndApplyDailyRefresh, getNextRefreshTimeMs } from "@/lib/credits";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUserFromRequest(req);

    if (!user) {
      // Guest demo state
      return NextResponse.json({
        authenticated: false,
        user: null,
      });
    }

    // Apply daily credit refresh on session check
    const refreshedBalance = await checkAndApplyDailyRefresh(user.id);
    const refreshMs = refreshedBalance
      ? getNextRefreshTimeMs(refreshedBalance.lastCreditRefresh)
      : 0;

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        role: user.role,
        credits: refreshedBalance?.currentBalance ?? 50,
        dailyAllowance: refreshedBalance?.dailyAllowance ?? 50,
        totalUsed: refreshedBalance?.totalCreditsUsed ?? 0,
        totalGenerations: refreshedBalance?.totalGenerations ?? 0,
        refreshInMs: refreshMs,
        plan: user.subscription?.plan ?? "FREE",
        subscriptionStatus: user.subscription?.status ?? "ACTIVE",
        currentPeriodEnd: user.subscription?.currentPeriodEnd,
      },
    });
  } catch (err: any) {
    console.error("Auth /me error:", err);
    return NextResponse.json({ authenticated: false, user: null });
  }
}
