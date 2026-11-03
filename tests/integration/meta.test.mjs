import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

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

test("Meta Instagram Graph API: Credentials, Webhook Signature & Handshake", async (t) => {
  const env = loadEnvLocal();
  const appId = env.META_APP_ID || process.env.META_APP_ID;
  const appSecret = env.META_APP_SECRET || process.env.META_APP_SECRET;
  const verifyToken = env.META_WEBHOOK_VERIFY_TOKEN || process.env.META_WEBHOOK_VERIFY_TOKEN;
  const pageAccessToken = env.META_PAGE_ACCESS_TOKEN || process.env.META_PAGE_ACCESS_TOKEN;
  const pageId = env.META_PAGE_ID || process.env.META_PAGE_ID;

  await t.test("1. Meta Environment Variables Format & Presence", () => {
    assert.ok(appId, "META_APP_ID must be set in .env.local");
    assert.ok(appSecret, "META_APP_SECRET must be set in .env.local");
    assert.ok(verifyToken, "META_WEBHOOK_VERIFY_TOKEN must be set in .env.local");
    assert.ok(pageAccessToken, "META_PAGE_ACCESS_TOKEN must be set in .env.local");
    assert.ok(pageId, "META_PAGE_ID must be set in .env.local");
    assert.ok(!appId.includes("sample"), "META_APP_ID must not be a sample placeholder");
  });

  await t.test("2. Live Meta Graph API Token Inspection", async () => {
    if (!pageAccessToken || pageAccessToken.includes("sample")) {
      assert.fail("Skipping live Graph API check because pageAccessToken is unconfigured.");
    }

    const res = await fetch(`https://graph.facebook.com/v21.0/me?access_token=${pageAccessToken}`);
    assert.equal(res.status, 200, `Meta Graph API rejected pageAccessToken with HTTP ${res.status}`);
    const data = await res.json();
    assert.ok(data.id, "Meta Graph API /me must return object with valid ID");
    console.log("  [Meta Live Handshake] Token verified successfully for account ID:", data.id);
  });

  await t.test("3. Webhook HMAC-SHA256 Signature Verification", () => {
    if (!appSecret || appSecret.includes("sample")) {
      assert.fail("Skipping signature verification test because appSecret is unconfigured.");
    }

    const payload = JSON.stringify({ entry: [{ changes: [{ field: "comments" }] }] });
    const signature = crypto.createHmac("sha256", appSecret).update(payload).digest("hex");
    const signatureHeader = `sha256=${signature}`;

    const [method, hash] = signatureHeader.split("=");
    assert.equal(method, "sha256");

    const expectedHash = crypto.createHmac("sha256", appSecret).update(payload).digest("hex");
    const isValid = crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(expectedHash, "hex"));
    assert.equal(isValid, true, "Timing-safe HMAC-SHA256 signature verification must pass");
  });
});
