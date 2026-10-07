import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const style = searchParams.get("style");
    const query = searchParams.get("q");
    const sort = searchParams.get("sort") || "latest";

    const whereClause: any = {
      isPublic: true,
    };

    if (style && style !== "All") {
      whereClause.generation = {
        style: {
          contains: style,
        },
      };
    }

    if (query && query.trim().length > 0) {
      whereClause.generation = {
        ...whereClause.generation,
        prompt: {
          contains: query.trim(),
        },
      };
    }

    const images = await prisma.generatedImage.findMany({
      where: whereClause,
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
        user: {
          select: {
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            favorites: true,
          },
        },
      },
      orderBy:
        sort === "featured"
          ? [{ isFeatured: "desc" }, { createdAt: "desc" }]
          : { createdAt: "desc" },
      take: 60,
    });

    return NextResponse.json({
      success: true,
      images: images.map((img) => ({
        id: img.id,
        url: img.imageUrl,
        prompt: img.generation.prompt,
        style: img.generation.style,
        aspectRatio: img.generation.aspectRatio,
        quality: img.generation.quality,
        width: img.width,
        height: img.height,
        author: img.user.name || "Creator",
        authorAvatar: img.user.avatar,
        favoriteCount: img._count.favorites,
        createdAt: img.createdAt,
      })),
    });
  } catch (err: any) {
    console.error("Gallery fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch gallery images" }, { status: 500 });
  }
}
