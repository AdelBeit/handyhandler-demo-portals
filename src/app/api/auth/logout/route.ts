import { NextResponse } from "next/server";

import { clearSessionCookie } from "@/lib/auth";

const getBaseUrl = (request: Request) => {
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") ?? "http";
  if (host) {
    return `${proto}://${host}`;
  }
  return new URL(request.url).origin;
};

export async function GET(request: Request) {
  const url = new URL("/login", getBaseUrl(request));
  return clearSessionCookie(NextResponse.redirect(url));
}

export async function POST(request: Request) {
  const url = new URL("/login", getBaseUrl(request));
  return clearSessionCookie(NextResponse.redirect(url));
}
