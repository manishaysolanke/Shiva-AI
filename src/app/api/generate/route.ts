import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getSessionUserFromRequest } from "@/lib/auth";
import { getCreditCost, deductCreditsAtomic, refundCredits } from "@/lib/credits";
import { moderatePrompt } from "@/lib/ai/moderation";
import { generateImageWithProvider } from "@/lib/ai/provider";

export async function POST(req: NextRequest) {
  let user = await getSessionUserFromRequest(req);

  // If no logged in user, assign to or create the guest/demo account so guests can test the workflow seamlessly
  if (!user) {
    user = await prisma.user.findFirst({
      where: { role: "USER" },
      include: { subscription: true, creditBalance: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required. Please sign in or create an account." },
        { status: 401 }
      );
    }
  }

  try {
    const body = await req.json();
    const {
      prompt,
      negativePrompt,
      style = "Photorealistic",
      aspectRatio = "1:1",
      quality = "Standard",
    } = body;

    // 1. Validate Input
    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter a descriptive image prompt." },
        { status: 400 }
      );
    }

    // 2. Safety Moderation & Public Figure Check
    const moderation = moderatePrompt(prompt);
    if (!moderation.allowed) {
      // Log safety violation
      await prisma.safetyLog.create({
        data: {
          userId: user.id,
          prompt,
          flagged: true,
          flagCategory: moderation.flags.join(", "),
          riskLevel: moderation.riskLevel,
          actionTaken: "BLOCKED",
        },
      });

      return NextResponse.json(
        {
          error: moderation.reason || "Prompt violates safety guidelines.",
          flagged: true,
          flags: moderation.flags,
        },
        { status: 400 }
      );
    }

    // Log public figure artistic use if detected
    if (moderation.publicFigureDetected) {
      await prisma.safetyLog.create({
        data: {
          userId: user.id,
          prompt,
          flagged: false,
          flagCategory: "PUBLIC_FIGURE_ARTISTIC",
          riskLevel: "MEDIUM",
          actionTaken: "ALLOWED_WITH_DISCLAIMER",
        },
      });
    }

    // 3. Calculate Credit Cost
    const cost = getCreditCost(quality);

    // 4. Create Pending Generation Record
    const generation = await prisma.generation.create({
      data: {
        userId: user.id,
        prompt: moderation.sanitizedPrompt,
        negativePrompt: negativePrompt?.trim() || null,
        style,
        aspectRatio,
        quality,
        creditsUsed: cost,
        status: "PROCESSING",
        provider: "shiv-neural",
      },
    });

    // 5. Atomically Deduct Credits
    let creditResult;
    try {
      creditResult = await deductCreditsAtomic({
        userId: user.id,
        amount: cost,
        description: `Generated image (${style}, ${quality} quality)`,
        generationId: generation.id,
      });
    } catch (creditErr: any) {
      // Mark generation as failed due to insufficient credits
      await prisma.generation.update({
        where: { id: generation.id },
        data: {
          status: "FAILED",
          errorMessage: creditErr.message || "Insufficient credits",
        },
      });

      return NextResponse.json(
        {
          error: creditErr.message || `You need ${cost} credits to create this image.`,
          insufficientCredits: true,
          requiredCredits: cost,
          currentCredits: user.creditBalance?.currentBalance ?? 0,
        },
        { status: 402 }
      );
    }

    // 6. Generate Image via Provider
    let aiResult;
    try {
      aiResult = await generateImageWithProvider({
        prompt: moderation.sanitizedPrompt,
        negativePrompt,
        style,
        aspectRatio,
        quality,
        userId: user.id,
      });
    } catch (genErr: any) {
      console.error("AI Generation Provider Failed:", genErr);
      
      // Auto-refund credits on provider failure
      await refundCredits({
        userId: user.id,
        amount: cost,
        reason: "Image generation provider error",
        generationId: generation.id,
      });

      await prisma.generation.update({
        where: { id: generation.id },
        data: {
          status: "FAILED",
          errorMessage: genErr.message || "Provider generation error",
        },
      });

      return NextResponse.json(
        {
          error: "Your image couldn't be generated at this moment. Your credits were safely refunded.",
          refunded: true,
          creditsRefunded: cost,
        },
        { status: 500 }
      );
    }

    // 7. Save Generated Image & Finalize Generation
    const savedImage = await prisma.generatedImage.create({
      data: {
        generationId: generation.id,
        userId: user.id,
        imageUrl: aiResult.imageUrl,
        width: aiResult.width,
        height: aiResult.height,
        isPublic: true,
        isFeatured: false,
      },
    });

    await prisma.generation.update({
      where: { id: generation.id },
      data: {
        status: "COMPLETED",
        completedAt: new Date(),
        provider: aiResult.provider,
        providerGenId: aiResult.providerGenId,
      },
    });

    return NextResponse.json({
      success: true,
      image: {
        id: savedImage.id,
        generationId: generation.id,
        url: savedImage.imageUrl,
        prompt: generation.prompt,
        style: generation.style,
        aspectRatio: generation.aspectRatio,
        quality: generation.quality,
        width: savedImage.width,
        height: savedImage.height,
        creditsUsed: cost,
        createdAt: savedImage.createdAt,
        publicFigureDisclaimer: moderation.publicFigureDetected?.disclaimer,
      },
      creditsRemaining: creditResult.newBalance,
      deducted: cost,
    });
  } catch (err: any) {
    console.error("Generate API error:", err);
    return NextResponse.json(
      { error: err.message || "An unexpected error occurred during generation." },
      { status: 500 }
    );
  }
}
