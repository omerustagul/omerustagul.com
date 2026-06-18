const dateFmt = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function formatDate(d: Date | null | undefined): string | undefined {
  return d ? dateFmt.format(d) : undefined;
}

/** Course/product prices are stored as integers. */
export function formatTRY(amount: number): string {
  return `₺${amount.toLocaleString("tr-TR")}`;
}

export function formatUSD(amount: number): string {
  return `${amount} USD`;
}
