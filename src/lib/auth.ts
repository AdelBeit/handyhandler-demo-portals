const encoder = new TextEncoder();
const DEFAULT_SECRET = "demo-auth-secret";

type SessionPayload = {
  sub: string;
  exp: number;
};

const getSecret = () => process.env.AUTH_SECRET ?? DEFAULT_SECRET;

const base64UrlEncode = (bytes: Uint8Array) => {
  let base64: string;
  if (typeof Buffer !== "undefined") {
    base64 = Buffer.from(bytes).toString("base64");
  } else {
    let binary = "";
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    base64 = btoa(binary);
  }
  return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
};

const base64UrlDecode = (value: string) => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  const base64 = normalized + padding;
  if (typeof Buffer !== "undefined") {
    return Buffer.from(base64, "base64").toString("utf-8");
  }
  return atob(base64);
};

const getSigningKey = async () => {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
};

const signPayload = async (payload: string) => {
  const key = await getSigningKey();
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return base64UrlEncode(new Uint8Array(signature));
};

export const createSessionToken = async (email: string, ttlSeconds = 60 * 60 * 24 * 7) => {
  const payload: SessionPayload = {
    sub: email,
    exp: Date.now() + ttlSeconds * 1000,
  };
  const encodedPayload = base64UrlEncode(encoder.encode(JSON.stringify(payload)));
  const signature = await signPayload(encodedPayload);
  return `${encodedPayload}.${signature}`;
};

export const verifySessionToken = async (token: string) => {
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) {
    return null;
  }
  const expectedSignature = await signPayload(encodedPayload);
  if (signature !== expectedSignature) {
    return null;
  }
  let payload: SessionPayload;
  try {
    payload = JSON.parse(base64UrlDecode(encodedPayload)) as SessionPayload;
  } catch {
    return null;
  }
  if (!payload.exp || Date.now() > payload.exp) {
    return null;
  }
  return payload;
};
