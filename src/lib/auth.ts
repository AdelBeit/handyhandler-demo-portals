const encoder = new TextEncoder();
const DEFAULT_SECRET = "demo-auth-secret";

export const SESSION_COOKIE_NAME = "demo_auth";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

export const buildSessionCookieOptions = (maxAgeSeconds = SESSION_TTL_SECONDS) => ({
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: maxAgeSeconds,
});

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

let signingKeyPromise: Promise<CryptoKey> | null = null;

const getSigningKey = () => {
  if (!signingKeyPromise) {
    signingKeyPromise = crypto.subtle.importKey(
      "raw",
      encoder.encode(getSecret()),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign", "verify"],
    );
  }
  return signingKeyPromise;
};

const signPayload = async (payload: string) => {
  const key = await getSigningKey();
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return base64UrlEncode(new Uint8Array(signature));
};

export const createSessionToken = async (
  email: string,
  ttlSeconds = SESSION_TTL_SECONDS,
) => {
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

type CookieSetter = {
  cookies: {
    set: (options: {
      name: string;
      value: string;
      httpOnly: boolean;
      sameSite: "lax" | "strict" | "none";
      secure: boolean;
      path: string;
      maxAge?: number;
    }) => void;
  };
};

export const setSessionCookie = (response: CookieSetter, token: string) => {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    ...buildSessionCookieOptions(),
  });
  return response;
};

export const clearSessionCookie = (response: CookieSetter) => {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    ...buildSessionCookieOptions(0),
    maxAge: 0,
  });
  return response;
};
