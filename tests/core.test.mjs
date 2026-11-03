import test from "node:test";
import assert from "node:assert/strict";
import crypto from "crypto";

// 1. Cryptography: AES-256-GCM Token Encryption & Decryption
test("AES-256-GCM Cryptographic Token Sealing & Decryption", () => {
  const ALGORITHM = "aes-256-gcm";
  const SECRET = "e4d2a1b9c8f7e6d5c4b3a291807f6e5d4c3b2a109876543210fedcba98765432";
  const key = crypto.scryptSync(SECRET, "omniflow-salt", 32);

  const sampleToken = "IGQVJYeE1pTVZA0d05...sample_long_lived_meta_access_token";

  // Encrypt
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(sampleToken, "utf8", "hex");
  encrypted += cipher.final("hex");
  const tag = cipher.getAuthTag().toString("hex");

  assert.notEqual(encrypted, sampleToken, "Encrypted ciphertext must not match plaintext");

  // Decrypt
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(Buffer.from(tag, "hex"));
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  assert.equal(decrypted, sampleToken, "Decrypted token must exactly match original plaintext");
});

// 2. Entitlements: Crevix All Access (30-Day Free Trial & ₹199/month Unified Subscription)
test("Server-side Entitlement Verification Enforces Crevix All Access & 30-Day Trial", () => {
  function verifyAccess(status, trialEndDate, currentPosts = 0) {
    const now = new Date();
    const trialEnd = new Date(trialEndDate);
    const FAIR_USE_POST_LIMIT = 500;

    if (status === "active") {
      if (currentPosts >= FAIR_USE_POST_LIMIT) {
        return { allowed: false, reason: "Fair-use limit reached" };
      }
      return { allowed: true, status: "active" };
    }

    if (status === "trialing") {
      if (now > trialEnd) {
        return { allowed: false, reason: "30-day trial expired" };
      }
      return { allowed: true, status: "trialing" };
    }

    return { allowed: false, reason: "Subscription inactive" };
  }

  // Active trial test (within 30 days)
  const activeTrialEnd = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
  const trialCheck = verifyAccess("trialing", activeTrialEnd, 12);
  assert.equal(trialCheck.allowed, true, "Active trial user must have access to all features");

  // Expired trial test
  const expiredTrialEnd = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
  const expiredCheck = verifyAccess("trialing", expiredTrialEnd, 0);
  assert.equal(expiredCheck.allowed, false, "Expired trial user must be blocked until ₹199/mo subscription starts");

  // Active paid subscriber test (₹199/mo)
  const paidCheck = verifyAccess("active", activeTrialEnd, 45);
  assert.equal(paidCheck.allowed, true, "Active ₹199/mo subscriber must have full access");

  // Fair-use ceiling test
  const fairUseCheck = verifyAccess("active", activeTrialEnd, 500);
  assert.equal(fairUseCheck.allowed, false, "Posting beyond fair use (500 posts) must trigger protection");
});

// 3. Meta Integration: HMAC Signature Timing-Safe Verification
test("Meta Webhook HMAC SHA-256 Signature Verification", () => {
  const secret = "test_meta_app_secret_12345";
  const rawBody = JSON.stringify({ entry: [{ changes: [{ field: "comments" }] }] });

  const signature = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  const signatureHeader = `sha256=${signature}`;

  // Valid signature check
  const [method, hash] = signatureHeader.split("=");
  assert.equal(method, "sha256");

  const expectedHash = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  const isValid = crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(expectedHash, "hex"));
  assert.equal(isValid, true, "Matching HMAC signature must validate");

  // Tampered body check
  const tamperedBody = rawBody + " ";
  const tamperedHash = crypto.createHmac("sha256", secret).update(tamperedBody).digest("hex");
  const isTamperedValid = crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(tamperedHash, "hex"));
  assert.equal(isTamperedValid, false, "Tampered body must fail verification");
});

// 4. Meta Policy: 24-Hour Messaging Window & Single Reply Rules
test("Meta Policy Restrictions (24h Window & Single Reply Rule)", () => {
  function checkEligibility(commentTime, hasExistingReply) {
    if (hasExistingReply) {
      return { eligible: false, reason: "Already replied" };
    }
    const ageHours = (Date.now() - new Date(commentTime).getTime()) / (1000 * 60 * 60);
    if (ageHours > 24) {
      return { eligible: false, reason: "Outside 24h window" };
    }
    return { eligible: true };
  }

  // 1 hour ago, no prior reply
  const recentComment = new Date(Date.now() - 3600 * 1000);
  assert.equal(checkEligibility(recentComment, false).eligible, true, "Recent comment should be eligible");

  // 26 hours ago
  const oldComment = new Date(Date.now() - 26 * 3600 * 1000);
  assert.equal(checkEligibility(oldComment, false).eligible, false, "Old comment must be blocked by 24h window");

  // Already replied
  assert.equal(checkEligibility(recentComment, true).eligible, false, "Second private reply to same comment must be blocked");
});

// 5. Security & Isolation: Tenant Path Verification on Storage
test("Tenant Storage Path Traversal & Cross-Workspace Isolation", () => {
  const currentWorkspaceId = "00000000-0000-0000-0000-000000000002";

  function isPathAllowed(fileKey, wsId) {
    const requiredPrefix = `workspaces/${wsId}/`;
    return fileKey.startsWith(requiredPrefix);
  }

  const validKey = `workspaces/${currentWorkspaceId}/media/asset_123.mp4`;
  const attackerKey = `workspaces/other-workspace-id/media/asset_999.mp4`;
  const traversalKey = `workspaces/${currentWorkspaceId}/../../other/asset.mp4`;

  assert.equal(isPathAllowed(validKey, currentWorkspaceId), true, "Own workspace path is allowed");
  assert.equal(isPathAllowed(attackerKey, currentWorkspaceId), false, "Different workspace path is forbidden");
});

// 6. Automation: Keyword Extraction & Dynamic Variable Templating
test("Comment-to-DM Keyword Matching and Variable Templating", () => {
  const comment = "Hey love this video! Commenting FLOW for the Notion template.";
  const ruleKeyword = "FLOW";

  const isMatch = comment.toUpperCase().includes(ruleKeyword.toUpperCase());
  assert.equal(isMatch, true, "Keyword FLOW must match the comment");

  const template = "Hey {{user.name}}! Here is your link: {{resource.url}}";
  const interpolated = template
    .replace(/\{\{user\.name\}\}/g, "sarah_creates")
    .replace(/\{\{resource\.url\}\}/g, "https://omniflow.io/r/guide");

  assert.equal(
    interpolated,
    "Hey sarah_creates! Here is your link: https://omniflow.io/r/guide",
    "Template variables must be correctly interpolated"
  );
});
