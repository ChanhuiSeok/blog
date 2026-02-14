import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { COOKIE_NAME } from "./lib/auth.config";

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes (except /admin/login)
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // 이미 로그인된 상태에서 /admin/login 접근 시 /admin으로 리다이렉트
  if (pathname === "/admin/login") {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    const secret = getSecret();
    if (token && secret) {
      try {
        await jwtVerify(token, secret);
        return NextResponse.redirect(new URL("/admin", request.url));
      } catch {
        // 토큰 만료/무효 → 로그인 페이지 진행
      }
    }
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const secret = getSecret();

  if (!token || !secret) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  try {
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
