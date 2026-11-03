import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireWorkspaceAuth } from "@/lib/auth";

const testAutomationSchema = z.object({
  commentText: z.string().min(1),
  commenterUsername: z.string().min(1),
  ruleKeyword: z.string().min(1),
  dmTemplate: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const authContext = await requireWorkspaceAuth();
    const body = await req.json();

    const parsed = testAutomationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.format() },
        { status: 400 }
      );
    }

    const { commentText, commenterUsername, ruleKeyword, dmTemplate } = parsed.data;

    // Check keyword match
    const normalizedComment = commentText.toUpperCase();
    const normalizedKeyword = ruleKeyword.toUpperCase();
    const isMatched = normalizedComment.includes(normalizedKeyword);

    if (!isMatched) {
      return NextResponse.json({
        success: true,
        matched: false,
        message: `Comment did not contain keyword "${ruleKeyword}". No automated action taken.`,
      });
    }

    // Dynamic variable interpolation
    const renderedDM = dmTemplate
      .replace(/\{\{user\.name\}\}/g, commenterUsername)
      .replace(/\{\{resource\.url\}\}/g, "https://crevix.io/r/creator-guide");

    const executionLog = {
      executionId: crypto.randomUUID(),
      triggerUsername: commenterUsername,
      triggerComment: commentText,
      matchedKeyword: ruleKeyword,
      publicReply: "Check your DMs! 🚀 Just sent you the link.",
      sentDirectMessage: renderedDM,
      leadCreated: {
        handle: `@${commenterUsername.replace(/^@/, "")}`,
        source: `Keyword "${ruleKeyword}"`,
        stage: "engaged",
      },
      executedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      matched: true,
      data: executionLog,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to execute test automation." },
      { status: 500 }
    );
  }
}
