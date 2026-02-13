import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, createToken, setAuthCookie } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    // Rate limiting by IP
    const ip = request.headers.get("x-forwarded-for") ?? "unknown";
    const limiter = rateLimit(`login:${ip}`);

    if (!limiter.success) {
      return NextResponse.json(
        { success: false, error: "Too many login attempts. Try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { success: false, error: "Password is required." },
        { status: 400 },
      );
    }

    const valid = await verifyPassword(password);

    if (!valid) {
      return NextResponse.json(
        { success: false, error: "Invalid password." },
        { status: 401 },
      );
    }

    const token = await createToken();
    await setAuthCookie(token);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 },
    );
  }
}
