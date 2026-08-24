import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { MarqueeBand } from "@/components/marquee-band";
import { BestSellers } from "@/components/best-sellers";
import { ProductShowcase } from "@/components/product-showcase";
import { BeforeAfter } from "@/components/before-after";
import { OurStory } from "@/components/our-story";
import { Reviews } from "@/components/reviews";
import { Guarantees } from "@/components/guarantees";
import { ClinicallyProven } from "@/components/clinically-proven";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <Hero />
      <MarqueeBand />
      <BestSellers />
      <ProductShowcase />
      <BeforeAfter />
      <OurStory />
      <Reviews />
      <Guarantees />
      <ClinicallyProven />
      <Faq />
      <Contact />
      <Footer />
    </div>
  );
}
