import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductDetail } from "@/components/product-detail";
import { RelatedProducts } from "@/components/related-products";
import { getProductByHandle, getRandomProducts } from "@/lib/shopify";
import { Reviews } from "@/components/reviews";
import { Guarantees } from "@/components/guarantees";

export async function generateMetadata(
  props: PageProps<"/boutique/[handle]">,
): Promise<Metadata> {
  const { handle } = await props.params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return { title: "Produit introuvable" };
  }

  return {
    title: product.title,
    description: product.description || undefined,
    alternates: {
      canonical: `/boutique/${product.handle}`,
    },
  };
}

export default async function ProductPage(
  props: PageProps<"/boutique/[handle]">,
) {
  const { handle } = await props.params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRandomProducts(product.id);

  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <ProductDetail product={product} />
      <Reviews />
      <Guarantees />
      <RelatedProducts products={relatedProducts} />
      <Footer />
    </div>
  );
}
