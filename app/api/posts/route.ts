import { NextResponse } from "next/server";
import { getPosts } from "@/lib/posts";
import { verifyAuthFromRequest } from "@/lib/auth";

export async function GET(request: Request) {
  const isAuth = await verifyAuthFromRequest(request);
  if (!isAuth) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const posts = await getPosts();
    return NextResponse.json({ success: true, data: posts });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
}
