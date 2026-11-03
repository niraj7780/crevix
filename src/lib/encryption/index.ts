import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const DEFAULT_SECRET = "e4d2a1b9c8f7e6d5c4b3a291807f6e5d4c3b2a109876543210fedcba98765432";

function getKey(): Buffer {
  const secret = process.env.ENCRYPTION_SECRET_KEY || DEFAULT_SECRET;
  return crypto.scryptSync(secret, "crevix-salt", 32);
}

export interface EncryptedPayload {
  cipherText: string;
  iv: string;
  tag: string;
}

/**
 * Encrypts a sensitive string (such as an OAuth access token or API key) using AES-256-GCM.
 */
export function encryptToken(plainText: string): EncryptedPayload {
  const key = getKey();
  const iv = crypto.randomBytes(12); // 96-bit IV recommended for GCM
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(plainText, "utf8", "hex");
  encrypted += cipher.final("hex");

  const tag = cipher.getAuthTag().toString("hex");

  return {
    cipherText: encrypted,
    iv: iv.toString("hex"),
    tag,
  };
}

/**
 * Decrypts an AES-256-GCM encrypted token.
 */
export function decryptToken(payload: EncryptedPayload): string {
  const key = getKey();
  const iv = Buffer.from(payload.iv, "hex");
  const tag = Buffer.from(payload.tag, "hex");

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);

  let decrypted = decipher.update(payload.cipherText, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
