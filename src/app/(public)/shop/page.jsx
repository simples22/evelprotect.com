import prisma from "@/lib/prisma";
import ProductGrid from "@/components/publics/products/ProductGrid";
import ShopHero from "@/components/publics/company/ShopHero";

async function getProducts() {
  return prisma.product.findMany({
    where: {
      isPublished: true,
    },
    orderBy: [
      { clickCount: "desc" },
      { viewCount: "desc" },
      { isFeatured: "desc" },
      { createdAt: "desc" },
    ],
  });
}

export const metadata = {
  title: "Shop | Evel Protect™ Cosmetics Group",
  description:
    "Explore Evel Protect™ Cosmetics Group products across cosmetics, beauty, skincare, body care, and personal care.",
};

export default async function ShopPage() {
  const products = await getProducts();
  const topProducts = products.slice(0, 6);

  return (
    <>
    <ShopHero />
        <ProductGrid products={products} />
    </>
  );
}