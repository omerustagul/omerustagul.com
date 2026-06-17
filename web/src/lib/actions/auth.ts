"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";

// useActionState signature: (prevState, formData) => newState
export async function loginAction(
  _prev: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return "E-posta veya şifre hatalı.";
    }
    throw error; // re-throw redirects (NEXT_REDIRECT) and anything else
  }
}

export async function registerAction(
  _prev: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || !password) return "Ad, e-posta ve şifre gerekli.";
  if (password.length < 8) return "Şifre en az 8 karakter olmalı.";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return "Bu e-posta zaten kayıtlı.";

  await prisma.user.create({
    data: { name, email, role: "MEMBER", passwordHash: await hashPassword(password) },
  });

  // auto sign-in after register
  try {
    await signIn("credentials", { email, password, redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) return "Kayıt oldu ama giriş başarısız.";
    throw error;
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}
