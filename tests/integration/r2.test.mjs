import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { 
  S3Client, 
  HeadBucketCommand, 
  PutObjectCommand, 
  GetObjectCommand, 
  DeleteObjectCommand 
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

function loadEnvLocal() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, "utf-8");
  const env = {};
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      env[key] = val;
    }
  }
  return env;
}

test("Cloudflare R2: S3 API Authentication, Presigned Upload & Zero-Egress Storage", async (t) => {
  const env = loadEnvLocal();
  const accountId = env.R2_ACCOUNT_ID || process.env.R2_ACCOUNT_ID;
  const accessKeyId = env.R2_ACCESS_KEY_ID || process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = env.R2_SECRET_ACCESS_KEY || process.env.R2_SECRET_ACCESS_KEY;
  const bucketName = env.R2_BUCKET_NAME || process.env.R2_BUCKET_NAME || "crevix-bu";

  await t.test("1. R2 Environment Variables Format & Presence", () => {
    assert.ok(accountId, "R2_ACCOUNT_ID must be set in .env.local");
    assert.ok(accessKeyId, "R2_ACCESS_KEY_ID must be set in .env.local");
    assert.ok(secretAccessKey, "R2_SECRET_ACCESS_KEY must be set in .env.local");
    assert.ok(bucketName, "R2_BUCKET_NAME must be set in .env.local");
    assert.equal(bucketName, "crevix-bu", "R2_BUCKET_NAME must be set to crevix-bu");
  });

  const s3 = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    },
  });

  await t.test("2. Bucket Existence & Read Verification (HeadBucket)", async () => {
    await s3.send(new HeadBucketCommand({ Bucket: bucketName }));
    console.log(`  [R2 Bucket] Successfully verified access to bucket: ${bucketName}`);
  });

  const testWorkspaceId = "00000000-0000-0000-0000-000000000001";
  const testPayload = "CREVIX_R2_INTEGRATION_VERIFIED_" + Date.now();
  const fileKey = `workspaces/${testWorkspaceId}/media/test_probe_${Date.now()}.txt`;
  let presignedPutUrl;
  let presignedGetUrl;

  await t.test("3. Presigned PUT and GET URL Generation", async () => {
    const putCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
      ContentType: "text/plain",
    });

    const getCommand = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
    });

    presignedPutUrl = await getSignedUrl(s3, putCommand, { expiresIn: 3600 });
    presignedGetUrl = await getSignedUrl(s3, getCommand, { expiresIn: 3600 });

    assert.ok(presignedPutUrl.includes(bucketName), "Presigned PUT URL must target crevix-bu");
    assert.ok(presignedGetUrl.includes(bucketName), "Presigned GET URL must target crevix-bu");
    assert.ok(fileKey.startsWith(`workspaces/${testWorkspaceId}/media/`), "fileKey must strictly enforce workspace prefix");
  });

  await t.test("4. Upload Object via Presigned PUT URL", async () => {
    const putRes = await fetch(presignedPutUrl, {
      method: "PUT",
      headers: { "Content-Type": "text/plain" },
      body: Buffer.from(testPayload, "utf-8"),
    });

    assert.ok(
      putRes.status === 200 || putRes.status === 204,
      `Presigned PUT returned HTTP ${putRes.status}. If 403 AccessDenied, ensure API token has Object Read & Write permission.`
    );
  });

  await t.test("5. Download & Compare Object via Presigned GET URL", async () => {
    const getRes = await fetch(presignedGetUrl);
    assert.equal(getRes.status, 200, `Presigned GET returned HTTP ${getRes.status}`);
    const downloadedText = await getRes.text();
    assert.equal(downloadedText, testPayload, "Downloaded payload must match uploaded payload byte-for-byte");
  });

  await t.test("6. Delete Object & Zero Residual State Cleanup", async () => {
    await s3.send(new DeleteObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
    }));

    // Verify deletion
    const verifyGet = await fetch(presignedGetUrl);
    assert.equal(verifyGet.status, 404, "Object must return 404 NotFound after deletion");
    console.log("  [R2 Cleanup] Temporary object deleted with 0 residual state.");
  });

  await t.test("7. Workspace Tenant Isolation & Path Traversal Guards", () => {
    function validateTenantPath(pathKey, wsId) {
      const prefix = `workspaces/${wsId}/media/`;
      return pathKey.startsWith(prefix) && !pathKey.includes("..");
    }

    assert.equal(validateTenantPath(fileKey, testWorkspaceId), true, "Own workspace path is allowed");
    assert.equal(validateTenantPath(fileKey, "00000000-0000-0000-0000-000000000002"), false, "Different workspace path is forbidden");
    assert.equal(validateTenantPath(`workspaces/${testWorkspaceId}/media/../../root.png`, testWorkspaceId), false, "Path traversal is forbidden");
  });
});
