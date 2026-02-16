import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { verifySessionToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("demo_auth")?.value;
  if (token) {
    const session = await verifySessionToken(token);
    if (session) {
      return NextResponse.next();
    }
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = "/login";
  redirectUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
