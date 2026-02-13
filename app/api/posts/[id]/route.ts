import { NextResponse } from "next/server";
import { getPost, updatePost, deletePost } from "@/lib/posts";
import { requireAuth } from "@/lib/auth";
import { postUpdateSchema } from "@/lib/validations";

type Context = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Context) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const post = await getPost(id);
    if (!post) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, data: post });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch post" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: Context) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = postUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0].message },
        { status: 400 },
      );
    }

    const updated = await updatePost(id, parsed.data);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to update post" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request, { params }: Context) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const deleted = await deletePost(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, data: deleted });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to delete post" },
      { status: 500 },
    );
  }
}
