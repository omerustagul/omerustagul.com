"use server";

import { prisma } from "@/lib/prisma";

type State = { ok?: boolean; error?: string };

/** Public contact/quote form → creates a Lead (admin pipeline in F5). */
export async function createLead(_prev: State | undefined, formData: FormData): Promise<State> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email) return { error: "Ad ve e-posta gerekli." };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { error: "Geçerli bir e-posta girin." };

  await prisma.lead.create({ data: { name, email, message: message || null } });
  return { ok: true };
}
