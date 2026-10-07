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

    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter") || "all";

    const generations = await prisma.generation.findMany({
      where: {
        userId: user.id,
        ...(filter === "completed" ? { status: "COMPLETED" } : {}),
      },
      include: {
        images: {
          include: {
            favorites: {
              where: { userId: user.id },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json({
      success: true,
      generations: generations.map((g) => ({
        id: g.id,
        prompt: g.prompt,
        negativePrompt: g.negativePrompt,
        style: g.style,
        aspectRatio: g.aspectRatio,
        quality: g.quality,
        creditsUsed: g.creditsUsed,
        status: g.status,
        createdAt: g.createdAt,
        errorMessage: g.errorMessage,
        images: g.images.map((img) => ({
          id: img.id,
          url: img.imageUrl,
          width: img.width,
          height: img.height,
          isFavorited: img.favorites.length > 0,
        })),
      })),
    });
  } catch (err: any) {
    console.error("History fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch generation history" }, { status: 500 });
  }
}
