import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { BestSellers } from "@/components/best-sellers";
import { ProductShowcase } from "@/components/product-showcase";
import { BeforeAfter } from "@/components/before-after";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <Hero />
      <BestSellers />
      <ProductShowcase />
      <BeforeAfter />
    </div>
  );
}
