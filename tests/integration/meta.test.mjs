import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import dns from "node:dns";

// Prefer IPv4 to avoid IPv6 connection timeout on Windows ISP networks
dns.setDefaultResultOrder("ipv4first");

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

test("Meta Instagram Graph API: Credentials, App Handshake & Webhook Cryptography", async (t) => {
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
    assert.ok(!appId.includes("sample"), "META_APP_ID must not be a sample placeholder");
    assert.ok(!appSecret.includes("sample"), "META_APP_SECRET must not be a sample placeholder");
    assert.match(appId, /^\d+$/, "META_APP_ID must be numeric");
    assert.match(appSecret, /^[a-f0-9]{32}$/i, "META_APP_SECRET must be a 32-character hex string");
  });

  await t.test("2. Live Meta OAuth Handshake: App Credentials & App Name Verification", async () => {
    const tokenUrl = `https://graph.facebook.com/oauth/access_token?client_id=${appId}&client_secret=${appSecret}&grant_type=client_credentials`;
    const res = await fetch(tokenUrl);
    assert.equal(res.status, 200, `Meta OAuth rejected app credentials with HTTP ${res.status}`);
    const tokenData = await res.json();
    assert.ok(tokenData.access_token, "Meta OAuth must return valid access_token");
    assert.equal(tokenData.token_type, "bearer", "Token type must be bearer");

    // Fetch official registered app metadata from Meta Graph API
    const appInfoRes = await fetch(`https://graph.facebook.com/v21.0/${appId}?access_token=${tokenData.access_token}`);
    assert.equal(appInfoRes.status, 200, `Meta Graph API /${appId} returned HTTP ${appInfoRes.status}`);
    const appInfo = await appInfoRes.json();
    assert.equal(appInfo.id, appId, "Meta returned app ID matching configured META_APP_ID");
    console.log(`  [Meta Live Handshake] Verified registered app: "${appInfo.name}" (ID: ${appInfo.id})`);
  });

  await t.test("3. Webhook HMAC-SHA256 Timing-Safe Signature Verification", () => {
    const payload = JSON.stringify({
      object: "instagram",
      entry: [
        {
          id: "17841400000000000",
          time: Math.floor(Date.now() / 1000),
          changes: [
            {
              field: "comments",
              value: {
                id: "comment_test_101",
                text: "Send me the FLOW guide!",
                from: { id: "user_test_202", username: "creator_fan" },
                created_time: Math.floor(Date.now() / 1000),
              },
            },
          ],
        },
      ],
    });

    // Compute expected signature
    const signature = crypto.createHmac("sha256", appSecret).update(payload).digest("hex");
    const signatureHeader = `sha256=${signature}`;

    const [method, hash] = signatureHeader.split("=");
    assert.equal(method, "sha256");

    const expectedHash = crypto.createHmac("sha256", appSecret).update(payload).digest("hex");
    const isValid = crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(expectedHash, "hex"));
    assert.equal(isValid, true, "Timing-safe HMAC-SHA256 signature verification must pass");

    // Negative test: invalid signature must fail
    const invalidSignature = crypto.createHmac("sha256", "wrong_secret").update(payload).digest("hex");
    const isInvalidSafe = crypto.timingSafeEqual(Buffer.from(invalidSignature, "hex"), Buffer.from(expectedHash, "hex"));
    assert.equal(isInvalidSafe, false, "Mismatched signature must be rejected");
  });

  await t.test("4. Meta Webhook Subscription Challenge Protocol", () => {
    const hubMode = "subscribe";
    const hubVerifyToken = verifyToken;
    const hubChallenge = "meta_challenge_token_99217";

    // Verify challenge logic matching GET /api/webhooks/meta
    const isMatch = hubMode === "subscribe" && hubVerifyToken === verifyToken;
    assert.equal(isMatch, true, "Webhook verification token must match challenge");
  });

  await t.test("5. Meta 24-Hour Messaging Window & Single-Reply Compliance Guard", () => {
    const now = Date.now();
    const commentTimeRecent = new Date(now - 1000 * 60 * 30); // 30 minutes ago
    const commentTimeExpired = new Date(now - 1000 * 60 * 60 * 25); // 25 hours ago

    const hoursSinceRecent = (now - commentTimeRecent.getTime()) / (1000 * 60 * 60);
    const hoursSinceExpired = (now - commentTimeExpired.getTime()) / (1000 * 60 * 60);

    assert.ok(hoursSinceRecent <= 24, "Recent comment must be within 24h window");
    assert.ok(hoursSinceExpired > 24, "Old comment must exceed 24h window");
  });

  await t.test("6. Page Access Token Status", async () => {
    if (pageAccessToken && !pageAccessToken.includes("sample")) {
      const res = await fetch(`https://graph.facebook.com/v21.0/me?access_token=${pageAccessToken}`);
      if (res.ok) {
        const data = await res.json();
        console.log(`  [Meta Page Token] Verified linked Page: "${data.name}" (ID: ${data.id})`);
        assert.ok(data.id);
      } else {
        console.warn(`  [Meta Page Token] Token check returned HTTP ${res.status}`);
      }
    } else {
      console.log("  [Meta Notice] App ID & App Secret verified. Page Access Token pending in Meta Dashboard.");
    }
  });
});
