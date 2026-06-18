"use server";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { auth } from "@/auth";

type State = { url?: string; error?: string };

// NOTE: dev/local implementation — writes to public/uploads (served at /uploads).
// On Vercel/serverless the filesystem is read-only; swap this for Vercel Blob or
// S3 in production (lib/storage abstraction). Admin-only.
export async function uploadImage(_prev: State | undefined, formData: FormData): Promise<State> {
  const session = await auth();
  const role = session?.user?.role;
  if (role !== "ADMIN" && role !== "EDITOR") return { error: "Yetkisiz." };

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "Dosya seç." };
  if (!file.type.startsWith("image/")) return { error: "Sadece görsel yüklenebilir." };
  if (file.size > 5 * 1024 * 1024) return { error: "En fazla 5MB." };

  const buffer = Buffer.from(await file.arrayBuffer());
  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
  const name = `${Date.now()}-${safe}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), buffer);

  return { url: `/uploads/${name}` };
}
