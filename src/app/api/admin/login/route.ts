import { NextRequest, NextResponse } from "next/server";
import { createSessionToken, COOKIE_NAME, getAdminSessionFromRequest } from "@/lib/admin-auth";

// Check if already authenticated
export async function GET(req: NextRequest) {
  const session = await getAdminSessionFromRequest(req);
  if (session) {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const adminEmail = process.env.ADMIN_EMAIL || "sam@unitedtax.us";
  const adminPassword = process.env.ADMIN_PASSWORD || "cantax1!";

  if (email !== adminEmail || password !== adminPassword) {
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 }
    );
  }

  const token = await createSessionToken(email);

  const res = NextResponse.json({ success: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return res;
}
