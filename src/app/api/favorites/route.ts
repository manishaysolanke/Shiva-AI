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

    const favorites = await prisma.favorite.findMany({
      where: { userId: user.id },
      include: {
        image: {
          include: {
            generation: {
              select: {
                prompt: true,
                style: true,
                aspectRatio: true,
                quality: true,
                creditsUsed: true,
                createdAt: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      favorites: favorites.map((fav) => ({
        id: fav.id,
        imageId: fav.imageId,
        url: fav.image.imageUrl,
        prompt: fav.image.generation.prompt,
        style: fav.image.generation.style,
        aspectRatio: fav.image.generation.aspectRatio,
        quality: fav.image.generation.quality,
        width: fav.image.width,
        height: fav.image.height,
        favoritedAt: fav.createdAt,
      })),
    });
  } catch (err: any) {
    console.error("Favorites fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 });
  }
}
