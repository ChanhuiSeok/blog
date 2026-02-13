import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { renderMarkdownToHtml } from "@/lib/mdx";

export async function POST(request: Request) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const { content } = await request.json();
    if (!content || typeof content !== "string") {
      return NextResponse.json({ success: true, data: { html: "" } });
    }
    const html = await renderMarkdownToHtml(content);
    return NextResponse.json({ success: true, data: { html } });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to render preview" },
      { status: 500 },
    );
  }
}
