import { NextResponse } from "next/server";
import { getPost, updatePost, deletePost } from "@/lib/posts";
import { verifyAuthFromRequest } from "@/lib/auth";

type Context = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Context) {
  const isAuth = await verifyAuthFromRequest(request);
  if (!isAuth) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

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
  const isAuth = await verifyAuthFromRequest(request);
  if (!isAuth) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await updatePost(id, body);
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
  const isAuth = await verifyAuthFromRequest(request);
  if (!isAuth) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

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
