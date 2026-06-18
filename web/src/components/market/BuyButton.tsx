"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { buyProduct } from "@/lib/actions/commerce";

type Props = {
  productId: string;
  slug: string;
  owned: boolean;
  authed: boolean;
};

export function BuyButton({ productId, slug, owned, authed }: Props) {
  const router = useRouter();
  const [isOwned, setOwned] = useState(owned);
  const [pending, start] = useTransition();

  if (isOwned) {
    return (
      <Button variant="secondary" disabled>
        Satın Alındı ✓
      </Button>
    );
  }

  if (!authed) {
    return (
      <Button href={`/login?callbackUrl=/market/${slug}`} variant="primary">
        Satın almak için Giriş Yap
      </Button>
    );
  }

  return (
    <button
      type="button"
      className="mk-btn mk-btn--primary mk-btn--lg"
      disabled={pending}
      onClick={() =>
        start(async () => {
          const res = await buyProduct(productId);
          if (res?.ok) {
            setOwned(true);
            router.refresh();
          }
        })
      }
    >
      {pending ? "İşleniyor…" : "Satın Al"}
    </button>
  );
}
