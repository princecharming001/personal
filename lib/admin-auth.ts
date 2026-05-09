import crypto from "crypto";

const SESSION_COOKIE = "admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 6;

type SessionPayload = {
  exp: number;
};

function getAdminCode() {
  return process.env.ADMIN_UNLOCK_CODE ?? "VaniAmma1";
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "dev-only-secret-change-me";
}

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function sign(payloadBase64: string) {
  return crypto
    .createHmac("sha256", getSessionSecret())
    .update(payloadBase64)
    .digest("base64url");
}

export function isValidUnlockCode(code: string) {
  return safeEqual(code, getAdminCode());
}

export function getSessionCookieName() {
  return SESSION_COOKIE;
}

export function createAdminSessionToken() {
  const payload: SessionPayload = {
    exp: Date.now() + SESSION_TTL_MS,
  };
  const payloadBase64 = Buffer.from(JSON.stringify(payload), "utf8").toString(
    "base64url",
  );
  const signature = sign(payloadBase64);
  return `${payloadBase64}.${signature}`;
}

export function verifyAdminSessionToken(token?: string) {
  if (!token) return false;
  const [payloadBase64, signature] = token.split(".");
  if (!payloadBase64 || !signature) return false;
  const expected = sign(payloadBase64);
  if (!safeEqual(signature, expected)) return false;

  try {
    const payload = JSON.parse(
      Buffer.from(payloadBase64, "base64url").toString("utf8"),
    ) as SessionPayload;
    return typeof payload.exp === "number" && payload.exp > Date.now();
  } catch {
    return false;
  }
}
