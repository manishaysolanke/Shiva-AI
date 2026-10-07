import { NextRequest, NextResponse } from "next/server";
import { getSessionUserFromRequest } from "@/lib/auth";
import { createCheckoutOrder } from "@/lib/payments";

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Please sign in to upgrade your subscription." }, { status: 401 });
    }

    const { planId } = await req.json();
    if (planId !== "WEEKLY" && planId !== "MONTHLY") {
      return NextResponse.json({ error: "Invalid subscription plan selected." }, { status: 400 });
    }

    const order = await createCheckoutOrder({
      userId: user.id,
      planId,
    });

    return NextResponse.json({
      success: true,
      order,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err: any) {
    console.error("Create payment order error:", err);
    return NextResponse.json({ error: "Failed to create checkout order." }, { status: 500 });
  }
}
