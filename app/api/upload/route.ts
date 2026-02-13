import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { verifyAuthFromRequest } from "@/lib/auth";

const UPLOAD_DIR = path.join(process.cwd(), "public", "images");
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
];

export async function POST(request: Request) {
  const isAuth = await verifyAuthFromRequest(request);
  if (!isAuth) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 },
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Invalid file type" },
        { status: 400 },
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: "File too large (max 5MB)" },
        { status: 400 },
      );
    }

    await mkdir(UPLOAD_DIR, { recursive: true });

    const ext = path.extname(file.name) || ".png";
    const filename = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(UPLOAD_DIR, filename), buffer);

    const url = `/images/${filename}`;
    return NextResponse.json({ success: true, data: { url } }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to upload file" },
      { status: 500 },
    );
  }
}
