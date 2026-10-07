import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { hashPassword, signToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || password.length < 6) {
      return NextResponse.json(
        { error: "Please provide a valid email and password (minimum 6 characters)." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const existing = await prisma.user.findUnique({ where: { email: cleanEmail } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists. Please sign in." },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email: cleanEmail,
          name: name?.trim() || cleanEmail.split("@")[0],
          passwordHash,
          role: "USER",
          subscription: {
            create: {
              plan: "FREE",
              status: "ACTIVE",
              priceAmount: 0,
            },
          },
          creditBalance: {
            create: {
              currentBalance: 50,
              dailyAllowance: 50,
              lastCreditRefresh: new Date(),
            },
          },
        },
        include: {
          subscription: true,
          creditBalance: true,
        },
      });

      // Log initial welcome credit transaction
      await tx.creditTransaction.create({
        data: {
          userId: newUser.id,
          amount: 50,
          balanceAfter: 50,
          type: "DAILY_REFRESH",
          description: "Welcome grant: 50 Free Daily Credits",
        },
      });

      return newUser;
    });

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const res = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        credits: user.creditBalance?.currentBalance ?? 50,
        plan: user.subscription?.plan ?? "FREE",
      },
    });

    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return res;
  } catch (err: any) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Failed to create account. Please try again." }, { status: 500 });
  }
}
