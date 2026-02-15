import { NextResponse } from "next/server";

import { clearSessionCookie } from "@/lib/auth";

export async function GET(request: Request) {
  const url = new URL("/login", request.url);
  return clearSessionCookie(NextResponse.redirect(url));
}

export async function POST(request: Request) {
  const url = new URL("/login", request.url);
  return clearSessionCookie(NextResponse.redirect(url));
}
