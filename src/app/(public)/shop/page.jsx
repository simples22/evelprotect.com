import prisma from "@/lib/prisma";
import ProductGrid from "@/components/publics/products/ProductGrid";
import ShopHero from "@/components/publics/company/ShopHero";

export const metadata = {
  title: "Shop | Evel Protect™ Official web",
  description:
    "Explore Evel Protect™ Cosmetics Group products across cosmetics, beauty, skincare, body care, and personal care.",
};

async function safeQuery(query, fallback = []) {
  try {
    return await query();
  } catch {
    return fallback;
  }
}

async function getProducts() {
  return safeQuery(() =>
    prisma.product.findMany({
      where: {
        isPublished: true,
      },
      orderBy: [
        { clickCount: "desc" },
        { viewCount: "desc" },
        { isFeatured: "desc" },
        { createdAt: "desc" },
      ],
    })
  );
}

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <main>
      <ShopHero />
      <ProductGrid products={products} />
    </main>
  );
}