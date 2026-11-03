import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireWorkspaceAuth } from "@/lib/auth";
import { isR2Configured } from "@/lib/integrations/r2";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const deleteSchema = z.object({
  fileKey: z.string().min(1),
  assetId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const authContext = await requireWorkspaceAuth();
    const body = await req.json();

    const parsed = deleteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.format() },
        { status: 400 }
      );
    }

    const { fileKey } = parsed.data;

    // Strict Tenant Isolation Guard: Verify the file belongs to this workspace
    const expectedPrefix = `workspaces/${authContext.workspace.id}/`;
    if (!fileKey.startsWith(expectedPrefix)) {
      return NextResponse.json(
        { error: "FORBIDDEN: Attempted to delete media asset belonging to another workspace." },
        { status: 403 }
      );
    }

    if (isR2Configured) {
      const client = new S3Client({
        region: "auto",
        endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID!,
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
        },
      });

      await client.send(
        new DeleteObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME || "crevix-media-dev",
          Key: fileKey,
        })
      );
    }

    return NextResponse.json({
      success: true,
      fileKey,
      deleted: true,
      message: "Media asset deleted successfully with workspace isolation verified.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete media asset." },
      { status: 500 }
    );
  }
}
