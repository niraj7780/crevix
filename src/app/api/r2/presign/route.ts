import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireWorkspaceAuth } from "@/lib/auth";
import { createPresignedUploadUrl } from "@/lib/integrations/r2";

const presignSchema = z.object({
  fileName: z.string().min(1),
  contentType: z.string().min(1),
  fileSizeBytes: z.number().positive(),
});

export async function POST(req: NextRequest) {
  try {
    const authContext = await requireWorkspaceAuth();
    const body = await req.json();

    const parsed = presignSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.format() },
        { status: 400 }
      );
    }

    const { fileName, contentType, fileSizeBytes } = parsed.data;

    const result = await createPresignedUploadUrl(
      authContext.workspace.id,
      fileName,
      contentType,
      fileSizeBytes
    );

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate presigned upload URL." },
      { status: 500 }
    );
  }
}
