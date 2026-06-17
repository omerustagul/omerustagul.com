import * as React from "react";

export interface ProductCardProps extends React.HTMLAttributes<HTMLAnchorElement> {
  title: string;
  seller?: string;
  /** Price string, e.g. "59 USD". */
  price?: string;
  /** Suffix appended after price, e.g. "'den" → "59 USD'den". */
  priceNote?: string;
  /** Top-left tag, defaults to "Dijital Ürün". */
  tag?: string;
  /** Format meta, e.g. "Figma · UI Kit". */
  format?: string;
  image?: string;
  href?: string;
  ratio?: string;
}

/** Marketplace digital-product card. */
export function ProductCard(props: ProductCardProps): JSX.Element;
