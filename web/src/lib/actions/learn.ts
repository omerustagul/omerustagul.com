"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

/** Mark/unmark a lesson complete for the current user. */
export async function toggleLesson(courseId: string, lessonId: string, done: boolean) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Giriş gerekli." };
  const userId = session.user.id;

  if (done) {
    await prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      update: {},
      create: { userId, lessonId, courseId },
    });
  } else {
    await prisma.lessonProgress.deleteMany({ where: { userId, lessonId } });
  }
  return { ok: true };
}
