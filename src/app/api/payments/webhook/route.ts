import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyWebhookSignature, activateSubscription } from "@/lib/payments";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature") || "";
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || "";

    const isValid = verifyWebhookSignature({
      body: rawBody,
      signature,
      secret,
    });

    if (!isValid) {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
    }

    const event = JSON.parse(rawBody);
    const eventId = event.id || `evt_${Date.now()}`;

    // Deduplicate event processing
    const existing = await prisma.paymentEvent.findUnique({
      where: { eventId },
    });

    if (existing) {
      return NextResponse.json({ status: "already_processed" });
    }

    // Process event
    if (event.event === "payment.captured" || event.event === "subscription.charged") {
      const notes = event.payload?.payment?.entity?.notes || {};
      const userId = notes.userId;
      const planId = notes.planId;

      if (userId && (planId === "WEEKLY" || planId === "MONTHLY")) {
        await activateSubscription({
          userId,
          planId,
          orderId: event.payload?.payment?.entity?.id || eventId,
        });
      }
    }

    // Save processed event
    await prisma.paymentEvent.create({
      data: {
        eventId,
        provider: "razorpay",
        eventType: event.event || "generic",
        amount: event.payload?.payment?.entity?.amount ? event.payload.payment.entity.amount / 100 : 0,
        currency: event.payload?.payment?.entity?.currency || "INR",
        status: "PROCESSED",
        payloadJson: rawBody,
      },
    });

    return NextResponse.json({ status: "success" });
  } catch (err: any) {
    console.error("Webhook processing error:", err);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
