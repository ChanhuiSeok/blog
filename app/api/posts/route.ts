import { NextResponse } from "next/server";
import { revalidatePost } from "@/lib/revalidate";
import { getPosts, createPost } from "@/lib/posts";
import { requireAuth } from "@/lib/auth";
import { postCreateSchema } from "@/lib/validations";

export async function GET(request: Request) {
  const authError = await requireAuth(request);
  if (authError) return authError;

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

export async function POST(request: Request) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const parsed = postCreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0].message },
        { status: 400 },
      );
    }

    const post = await createPost(parsed.data);
    revalidatePost(post.slug);
    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to create post" },
      { status: 500 },
    );
  }
}
