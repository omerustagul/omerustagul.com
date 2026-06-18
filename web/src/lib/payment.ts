// Payment abstraction. Dev stub auto-approves; wire a real provider
// (Stripe / iyzico) behind PAYMENT_PROVIDER + keys in production.
export type PaymentResult = { ok: true; ref: string } | { ok: false; error: string };

export async function charge(opts: {
  amount: number;
  currency: string;
  description: string;
}): Promise<PaymentResult> {
  if (!process.env.PAYMENT_PROVIDER) {
    // Mock success for local/dev. Replace with a real checkout session.
    return { ok: true, ref: `mock_${opts.currency}_${opts.amount}_${Date.now()}` };
  }
  // TODO: integrate Stripe/iyzico here using server-side env keys.
  return { ok: false, error: "Ödeme sağlayıcısı yapılandırılmadı." };
}
