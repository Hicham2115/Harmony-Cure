import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { MarqueeBand } from "@/components/marquee-band";
import { BestSellers } from "@/components/best-sellers";
import { ProductShowcase } from "@/components/product-showcase";
import { BeforeAfter } from "@/components/before-after";
import { Reviews } from "@/components/reviews";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <Hero />
      <MarqueeBand />
      <BestSellers />
      <ProductShowcase />
      <BeforeAfter />
      <Reviews />
    </div>
  );
}
