"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { addReview } from "@/lib/actions/reviews";

export function ReviewForm({ productId, slug }: { productId: string; slug: string }) {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, start] = useTransition();

  return (
    <div className="review-form">
      <div className="review-form__stars" data-rate>
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} type="button" className={`rstar ${n <= rating ? "on" : ""}`} onClick={() => setRating(n)}>
            ★
          </button>
        ))}
      </div>
      <textarea
        className="adm-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Bu ürün hakkında ne düşünüyorsun?"
        style={{ width: "100%", minHeight: "4rem", fontFamily: "inherit", padding: ".7rem", border: "1px solid var(--border)", borderRadius: "var(--radius)", background: "var(--surface)" }}
      />
      {msg && <p style={{ color: "var(--text-muted)", fontSize: "var(--fs-sm)" }}>{msg}</p>}
      <button
        type="button"
        className="btn btn--secondary"
        disabled={pending}
        onClick={() =>
          start(async () => {
            const res = await addReview(productId, slug, rating, text);
            if (res?.ok) {
              setText("");
              setMsg("Yorumun eklendi.");
              router.refresh();
            } else if (res?.error) {
              setMsg(res.error);
            }
          })
        }
      >
        {pending ? "Gönderiliyor…" : "Yorum gönder"}
      </button>
    </div>
  );
}
