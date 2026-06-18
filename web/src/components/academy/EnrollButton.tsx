"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { enrollCourse } from "@/lib/actions/commerce";

type Props = {
  courseId: string;
  courseSlug: string;
  owned: boolean;
  authed: boolean;
};

export function EnrollButton({ courseId, courseSlug, owned, authed }: Props) {
  const router = useRouter();
  const [isOwned, setOwned] = useState(owned);
  const [pending, start] = useTransition();

  if (isOwned) {
    return (
      <Button href={`/academy/${courseSlug}/learn`} variant="primary">
        Derslere Git →
      </Button>
    );
  }

  if (!authed) {
    return (
      <Button href={`/login?callbackUrl=/academy/${courseSlug}`} variant="primary">
        Kayıt için Giriş Yap
      </Button>
    );
  }

  return (
    <button
      type="button"
      className="mk-btn mk-btn--primary mk-btn--md"
      disabled={pending}
      onClick={() =>
        start(async () => {
          const res = await enrollCourse(courseId);
          if (res?.ok) {
            setOwned(true);
            router.refresh();
          }
        })
      }
    >
      {pending ? "Kaydediliyor…" : "Kayıt Ol"}
    </button>
  );
}
