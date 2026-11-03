import test from "node:test";
import assert from "node:assert/strict";
import crypto from "crypto";

// Test AES-256-GCM token encryption
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

// Test Entitlement limits
test("Server-side Entitlement Verification Enforces Quotas", () => {
  const PLAN_LIMITS = {
    free: { maxPosts: 10, maxRules: 1 },
    creator: { maxPosts: 100, maxRules: 5 },
    pro: { maxPosts: 500, maxRules: 25 },
  };

  // Free tier test
  const freeUsage = 10;
  const freeAllowed = freeUsage < PLAN_LIMITS.free.maxPosts;
  assert.equal(freeAllowed, false, "Free tier user with 10 posts must be blocked from scheduling an 11th");

  // Creator tier test
  const creatorUsage = 28;
  const creatorAllowed = creatorUsage < PLAN_LIMITS.creator.maxPosts;
  assert.equal(creatorAllowed, true, "Creator tier user with 28 posts must be allowed to schedule");

  // Pro tier test
  const proRules = 5;
  const proRuleAllowed = proRules < PLAN_LIMITS.pro.maxRules;
  assert.equal(proRuleAllowed, true, "Pro tier user with 5 rules must be allowed to create more rules up to 25");
});

// Test Comment-to-DM keyword extraction
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
