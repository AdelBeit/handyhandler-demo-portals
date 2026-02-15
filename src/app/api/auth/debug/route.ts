import { NextResponse } from "next/server";

import { verifySessionToken } from "@/lib/auth";

export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const cookies = Object.fromEntries(
    cookieHeader
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const [key, ...rest] = part.split("=");
        return [key, rest.join("=")];
      }),
  );

  const token = cookies.demo_auth;
  const session = token ? await verifySessionToken(token) : null;

  return NextResponse.json({
    hasCookieHeader: Boolean(cookieHeader),
    hasDemoAuthCookie: Boolean(token),
    rawCookieHeader: cookieHeader,
    sessionValid: Boolean(session),
    session,
  });
}
