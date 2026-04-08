import { NextResponse } from "next/server";

export async function GET() {
  const checks: Record<string, string> = {};

  // 1. Check env vars
  checks.MONGODB_URI = process.env.MONGODB_URI ? "set" : "MISSING";
  checks.AUTH_SECRET = process.env.AUTH_SECRET ? "set" : "MISSING";
  checks.NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET ? "set" : "MISSING";
  checks.AUTH_URL = process.env.AUTH_URL || "not set";
  checks.NEXTAUTH_URL = process.env.NEXTAUTH_URL || "not set";

  // 2. Test MongoDB connection
  try {
    const mongoose = await import("mongoose");
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      checks.mongodb = "SKIP - no URI";
    } else {
      const conn = await mongoose.default.connect(uri, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
      });
      checks.mongodb = "connected";

      // 3. Check if admin user exists
      const db = conn.connection.db;
      if (db) {
        const user = await db.collection("users").findOne({ email: "sam@unitedtax.us" });
        checks.adminUser = user ? `found (role: ${user.role})` : "NOT FOUND";
        checks.hasPassword = user?.password ? "yes" : "no";
      }
    }
  } catch (e: unknown) {
    checks.mongodb = `ERROR: ${e instanceof Error ? e.message : String(e)}`;
  }

  return NextResponse.json(checks);
}
