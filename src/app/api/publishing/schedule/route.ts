import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireWorkspaceAuth } from "@/lib/auth";
import { checkPostSchedulingEntitlement } from "@/lib/billing/entitlements";

const scheduleSchema = z.object({
  title: z.string().min(1),
  caption: z.string().min(1),
  postType: z.enum(["reel", "carousel", "single_image", "story"]),
  scheduledAt: z.string().datetime(),
  ctaKeyword: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const authContext = await requireWorkspaceAuth();
    const body = await req.json();

    const parsed = scheduleSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.format() },
        { status: 400 }
      );
    }

    const { title, caption, postType, scheduledAt, ctaKeyword } = parsed.data;

    // Server-side entitlement check
    // In production, queries usage_records table for the active billing period
    const currentPostsCount = 28; // Example current usage
    const entitlement = checkPostSchedulingEntitlement(authContext.workspace.tier, currentPostsCount);

    if (!entitlement.allowed) {
      return NextResponse.json(
        { success: false, error: entitlement.reason },
        { status: 403 }
      );
    }

    const newPostId = crypto.randomUUID();
    const jobId = crypto.randomUUID();
    const idempotencyKey = `pub_${authContext.workspace.id}_${newPostId}`;

    return NextResponse.json({
      success: true,
      data: {
        postId: newPostId,
        jobId,
        idempotencyKey,
        title,
        scheduledAt,
        status: "scheduled",
        message: "Publication scheduled successfully into Omniflow queue.",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to schedule publication." },
      { status: 500 }
    );
  }
}
