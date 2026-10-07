import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getSessionUserFromRequest } from "@/lib/auth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getSessionUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    // Check ownership
    const generation = await prisma.generation.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!generation) {
      return NextResponse.json({ error: "Generation not found" }, { status: 404 });
    }

    await prisma.generation.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Generation deleted successfully" });
  } catch (err: any) {
    console.error("Delete generation error:", err);
    return NextResponse.json({ error: "Failed to delete generation" }, { status: 500 });
  }
}
