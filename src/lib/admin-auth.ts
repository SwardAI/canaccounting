import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const COOKIE_NAME = "admin_session";

function getSecret() {
  return process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "fallback-dev-secret";
}

// Simple token: base64(email:timestamp:hash)
export async function createSessionToken(email: string) {
  const timestamp = Date.now().toString();
  const data = `${email}:${timestamp}`;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  const hash = btoa(String.fromCharCode(...new Uint8Array(sig)));
  return btoa(`${data}:${hash}`);
}

export async function verifySessionToken(token: string): Promise<string | null> {
  try {
    const decoded = atob(token);
    const parts = decoded.split(":");
    if (parts.length < 3) return null;

    const hash = parts.pop()!;
    const data = parts.join(":");

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(getSecret()),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const expectedSig = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
    const expectedHash = btoa(String.fromCharCode(...new Uint8Array(expectedSig)));

    if (hash !== expectedHash) return null;

    const email = parts[0];
    return email;
  } catch {
    return null;
  }
}

// For use in server components / server actions
export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const email = await verifySessionToken(token);
  return email ? { email } : null;
}

// For use in middleware (uses NextRequest)
export async function getAdminSessionFromRequest(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const email = await verifySessionToken(token);
  return email ? { email } : null;
}

export { COOKIE_NAME };
