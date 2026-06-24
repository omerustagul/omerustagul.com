import { prisma } from "@/lib/prisma";
import { ProductsClient } from "./client";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      price: true,
      type: true,
      format: true,
      seller: true,
      data: true,
    },
  });
  return <ProductsClient initial={products} />;
}
