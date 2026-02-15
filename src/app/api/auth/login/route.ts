import { NextResponse } from "next/server";

import { createSessionToken, setSessionCookie } from "@/lib/auth";

type LoginPayload = {
  email?: string;
};

export async function POST(request: Request) {
  let payload: LoginPayload;
  try {
    payload = (await request.json()) as LoginPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email = payload.email?.trim();
  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const token = await createSessionToken(email);
  const response = NextResponse.json({ ok: true });
  return setSessionCookie(response, token);
}
