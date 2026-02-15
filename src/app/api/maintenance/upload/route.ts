import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json(
      { error: "Missing file upload." },
      { status: 400 },
    );
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });

  const ext = path.extname(file.name) || ".png";
  const safeName = `${randomUUID()}${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadsDir, safeName), bytes);

  return NextResponse.json({ url: `/uploads/${safeName}` }, { status: 201 });
}
