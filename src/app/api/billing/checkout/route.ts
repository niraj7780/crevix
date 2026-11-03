import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireWorkspaceAuth } from "@/lib/auth";
import { createDodoCheckoutSession } from "@/lib/integrations/dodo";

const checkoutSchema = z.object({
  plan: z.literal("all_access").default("all_access"),
});

export async function POST(req: NextRequest) {
  try {
    const authContext = await requireWorkspaceAuth();
    const body = await req.json().catch(() => ({}));

    const parsed = checkoutSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.format() },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const returnUrl = `${appUrl}/dashboard/billing?session_completed=true`;

    const session = await createDodoCheckoutSession({
      workspaceId: authContext.workspace.id,
      customerEmail: authContext.user.email,
      returnUrl,
    });

    return NextResponse.json({
      success: true,
      data: session,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create Dodo checkout session" },
      { status: 500 }
    );
  }
}
