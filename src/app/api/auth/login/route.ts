import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyPassword, signToken, COOKIE_NAME } from "@/lib/auth";
import { checkAndApplyDailyRefresh, getNextRefreshTimeMs } from "@/lib/credits";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Please enter both email and password." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({
      where: { email: cleanEmail },
      include: {
        subscription: true,
        creditBalance: true,
      },
    });

    if (!user || !user.passwordHash) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Apply daily credit refresh if eligible
    const refreshedBalance = await checkAndApplyDailyRefresh(user.id);

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshMs = refreshedBalance
      ? getNextRefreshTimeMs(refreshedBalance.lastCreditRefresh)
      : 0;

    const res = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
        credits: refreshedBalance?.currentBalance ?? 50,
        dailyAllowance: refreshedBalance?.dailyAllowance ?? 50,
        refreshInMs: refreshMs,
        plan: user.subscription?.plan ?? "FREE",
      },
    });

    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return res;
  } catch (err: any) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Failed to sign in. Please try again." }, { status: 500 });
  }
}
