import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_BUCKET_NAME || "crevix-media-dev";
const publicUrl = process.env.R2_PUBLIC_URL || "https://media.crevix.io";

export const isR2Configured = Boolean(
  accountId &&
  accessKeyId &&
  secretAccessKey &&
  !accountId.includes("sample")
);

function getS3Client() {
  if (!isR2Configured) return null;

  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: accessKeyId!,
      secretAccessKey: secretAccessKey!,
    },
  });
}

export interface PresignedUrlResult {
  uploadUrl: string;
  publicUrl: string;
  fileKey: string;
  isMock: boolean;
}

/**
 * Generates a presigned PUT URL for direct-to-R2 upload from the creator's browser.
 */
export async function createPresignedUploadUrl(
  workspaceId: string,
  fileName: string,
  contentType: string,
  fileSizeBytes: number
): Promise<PresignedUrlResult> {
  // Validate limits: max 100MB for video, 15MB for image
  const maxBytes = contentType.startsWith("video/") ? 100 * 1024 * 1024 : 15 * 1024 * 1024;
  if (fileSizeBytes > maxBytes) {
    throw new Error(`File size exceeds maximum permitted limit (${contentType.startsWith("video/") ? "100MB" : "15MB"}).`);
  }

  const cleanFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
  const assetId = crypto.randomUUID();
  const fileKey = `workspaces/${workspaceId}/media/${assetId}_${cleanFileName}`;

  const client = getS3Client();

  if (!client) {
    // Zero-config development mock: returns simulated endpoints for instant local dev
    return {
      uploadUrl: `/api/r2/mock-upload?key=${encodeURIComponent(fileKey)}`,
      publicUrl: `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80`,
      fileKey,
      isMock: true,
    };
  }

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileKey,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(client, command, { expiresIn: 3600 });
  const assetPublicUrl = `${publicUrl.replace(/\/$/, "")}/${fileKey}`;

  return {
    uploadUrl,
    publicUrl: assetPublicUrl,
    fileKey,
    isMock: false,
  };
}
