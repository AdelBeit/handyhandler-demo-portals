import { NextResponse } from "next/server";

const clearSessionCookie = (response: NextResponse) => {
  response.cookies.set({
    name: "demo_auth",
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
};

export async function GET(request: Request) {
  const url = new URL("/login", request.url);
  return clearSessionCookie(NextResponse.redirect(url));
}

export async function POST(request: Request) {
  const url = new URL("/login", request.url);
  return clearSessionCookie(NextResponse.redirect(url));
}
