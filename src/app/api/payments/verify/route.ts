import { NextRequest, NextResponse } from "next/server";
import { getSessionUserFromRequest } from "@/lib/auth";
import { activateSubscription } from "@/lib/payments";

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { planId, orderId, paymentId } = await req.json();

    if (!planId || !orderId) {
      return NextResponse.json({ error: "Missing required payment verification fields." }, { status: 400 });
    }

    const subscription = await activateSubscription({
      userId: user.id,
      planId,
      orderId: paymentId || orderId,
    });

    return NextResponse.json({
      success: true,
      message: `Subscription to ${planId} activated successfully!`,
      subscription,
    });
  } catch (err: any) {
    console.error("Payment verification error:", err);
    return NextResponse.json({ error: "Failed to verify and activate subscription." }, { status: 500 });
  }
}
