import { FeaturedProducts } from "@/components/library/FeaturedProducts";
import { Hero } from "@/components/library/Hero";
import { getProducts } from "@/lib/api/products";

export default async function HomePage() {
  let allProducts: Awaited<ReturnType<typeof getProducts>> = [];
  let heroProducts: Awaited<ReturnType<typeof getProducts>> = [];
  let featuredProducts: Awaited<ReturnType<typeof getProducts>> = [];
  let errorMessage = "";

  try {
    allProducts = await getProducts();
    heroProducts = allProducts.slice(0, 3);
    featuredProducts = allProducts.slice(3, 8);
  } catch {
    errorMessage = "Could not load featured products right now.";
  }

  return (
    <main className="page-shell">
      <Hero products={heroProducts} />

      {errorMessage ? <p>{errorMessage}</p> : null}

      <FeaturedProducts products={featuredProducts} />
    </main>
  );
}