import { NextResponse } from "next/server";
import { verifyAuthFromRequest } from "@/lib/auth";
import { renderMarkdownToHtml } from "@/lib/mdx";

export async function POST(request: Request) {
  const isAuth = await verifyAuthFromRequest(request);
  if (!isAuth) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const { content } = await request.json();
    if (!content || typeof content !== "string") {
      return NextResponse.json({ success: true, data: { html: "" } });
    }
    const html = await renderMarkdownToHtml(content);
    return NextResponse.json({ success: true, data: { html } });
  } catch {
    return NextResponse.json({
      success: true,
      data: { html: "<p>미리보기를 생성할 수 없습니다.</p>" },
    });
  }
}
