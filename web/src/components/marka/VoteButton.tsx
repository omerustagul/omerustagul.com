"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleVote } from "@/lib/actions/vote";

/* Live vote button — DB-backed (toggleVote). Login-gated; optimistic update,
   reconciled with the server count. Faithful to the prototype's VoteButton. */
export function VoteButton({
  projectId,
  count,
  voted,
  authed,
}: {
  projectId: string;
  count: number;
  voted: boolean;
  authed: boolean;
}) {
  const router = useRouter();
  const [c, setC] = useState(count);
  const [v, setV] = useState(voted);
  const [, start] = useTransition();

  function onClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!authed) {
      router.push("/login?callbackUrl=/");
      return;
    }
    const prevV = v;
    const prevC = c;
    setV(!prevV);
    setC(prevC + (prevV ? -1 : 1));
    start(async () => {
      const r = await toggleVote(projectId);
      if ("error" in r) {
        setV(prevV);
        setC(prevC);
      } else {
        setV(r.voted);
        setC(r.count);
      }
    });
  }

  return (
    <button
      type="button"
      className={`vote ${v ? "is-voted" : ""}`}
      aria-pressed={v}
      aria-label="Beğen"
      data-cursor=""
      onClick={onClick}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill={v ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 21s-7.5-4.6-10-9.2C.4 8.5 2 5 5.5 5 7.7 5 9.2 6.3 12 9c2.8-2.7 4.3-4 6.5-4C22 5 23.6 8.5 22 11.8 19.5 16.4 12 21 12 21z" />
      </svg>
      <span className="vote__n">{c}</span>
    </button>
  );
}
