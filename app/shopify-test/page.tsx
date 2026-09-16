import { getProducts } from "@/lib/shopify";

export default async function ShopifyTestPage() {
  const products = await getProducts();

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Shopify products ({products.length})</h1>
      <pre className="text-sm bg-muted p-4 rounded overflow-auto">
        {JSON.stringify(products, null, 2)}
      </pre>
    </div>
  );
}
