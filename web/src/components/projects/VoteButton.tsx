"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleVote } from "@/lib/actions/vote";

export function VoteButton({
  projectId,
  initialCount,
  initialVoted,
  authed,
}: {
  projectId: string;
  initialCount: number;
  initialVoted: boolean;
  authed: boolean;
}) {
  const router = useRouter();
  const [count, setCount] = useState(initialCount);
  const [voted, setVoted] = useState(initialVoted);
  const [pending, start] = useTransition();

  function onClick() {
    if (!authed) {
      router.push("/login");
      return;
    }
    start(async () => {
      const res = await toggleVote(projectId);
      if (res?.ok) {
        setCount(res.count);
        setVoted(res.voted);
      }
    });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      className={`mk-btn ${voted ? "mk-btn--primary" : "mk-btn--secondary"} mk-btn--md`}
      aria-pressed={voted}
    >
      ▲ {voted ? "Oyladın" : "Oy Ver"} · {count}
    </button>
  );
}
