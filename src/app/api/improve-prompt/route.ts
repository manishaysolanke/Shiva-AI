import { NextRequest, NextResponse } from "next/server";
import { improvePrompt } from "@/lib/ai/prompt-improver";

export async function POST(req: NextRequest) {
  try {
    const { prompt, style } = await req.json();

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "Please provide a prompt to improve." },
        { status: 400 }
      );
    }

    const result = improvePrompt(prompt, style);
    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (err: any) {
    console.error("Improve prompt error:", err);
    return NextResponse.json(
      { error: "Failed to improve prompt." },
      { status: 500 }
    );
  }
}
