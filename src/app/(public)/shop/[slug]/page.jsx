import prisma from "@/lib/prisma";
import ProductDetails from "@/components/publics/products/ProductDetails";
import FullBannerProducts from "@/components/publics/products/FullBannerProducts";
import ProductFaqs from "@/components/publics/products/ProductFaqs";

async function getProduct(slug) {
  try {
    return await prisma.product.update({
      where: { slug },
      data: {
        viewCount: {
          increment: 1,
        },
      },
      include: {
        reviews: {
          orderBy: { createdAt: "desc" },
        },
      },
    });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  return {
    title: product
      ? `${product.title} | EVEL™ Cosmetics Group`
      : "Product | EVEL™ Cosmetics Group",
    description:
      product?.shortDescription ||
      product?.description ||
      "Explore EVEL™ Cosmetics Group products.",
  };
}

export default async function ProductSlugPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <main className="evelEmptyProduct">
        <div className="evelContainer">
          <h1>Product not found.</h1>
          <p>The requested product may be unavailable.</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <ProductDetails product={product} />

      <FullBannerProducts
        image="/images/banners/evel-products-banner.jpg"
        eyebrow="EVEL™ Cosmetics Group"
        title="Explore more beauty and personal care products"
        text="Discover a growing product direction across cosmetics, skincare, body care, deodorants, fragrance, and modern daily care essentials."
      />
      <ProductFaqs />
    </>
  );
}