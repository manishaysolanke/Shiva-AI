import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getSessionUserFromRequest } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Please sign in to favorite images." }, { status: 401 });
    }

    const { imageId } = await req.json();
    if (!imageId) {
      return NextResponse.json({ error: "Image ID required." }, { status: 400 });
    }

    const existing = await prisma.favorite.findUnique({
      where: {
        userId_imageId: {
          userId: user.id,
          imageId,
        },
      },
    });

    if (existing) {
      await prisma.favorite.delete({
        where: { id: existing.id },
      });
      return NextResponse.json({ success: true, isFavorited: false });
    } else {
      await prisma.favorite.create({
        data: {
          userId: user.id,
          imageId,
        },
      });
      return NextResponse.json({ success: true, isFavorited: true });
    }
  } catch (err: any) {
    console.error("Toggle favorite error:", err);
    return NextResponse.json({ error: "Failed to update favorite status" }, { status: 500 });
  }
}
