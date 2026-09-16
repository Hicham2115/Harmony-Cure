import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductDetail } from "@/components/product-detail";
import { getProductByHandle } from "@/lib/shopify";

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

  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <ProductDetail product={product} />
      <Footer />
    </div>
  );
}
