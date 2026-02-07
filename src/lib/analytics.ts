import crypto from "crypto";

export function getVisitorHash(ip: string | null, userAgent: string | null) {
  const salt = process.env.ANALYTICS_SALT ?? "dev-salt";
  const raw = `${ip ?? "unknown"}|${userAgent ?? "unknown"}|${salt}`;
  return crypto.createHash("sha256").update(raw).digest("hex");
}

export function getUtcDateBucket(date = new Date()) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}
