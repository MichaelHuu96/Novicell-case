import type { Product } from "@/types/product";
import { ProductCard } from "@/components/library/ProductCard";

type FeaturedProductsProps = {
  products: Product[];
  currentProduct?: Product;
  title?: string;
  emptyMessage?: string;
  limit?: number;
  className?: string;
};

export function FeaturedProducts({
  products,
  currentProduct,
  title = "Featured products",
  emptyMessage = "No featured products available right now.",
  limit,
  className = "",
}: FeaturedProductsProps) {
  const filteredProducts = currentProduct
    ? products.filter((product) => product.id !== currentProduct.id)
    : products;

  const visibleProducts =
    typeof limit === "number" ? filteredProducts.slice(0, limit) : filteredProducts;

  return (
    <section className={`featured-products ${className}`.trim()}>
      <h2 className="similar-products-title">{title}</h2>

      {visibleProducts.length === 0 ? (
        <p>{emptyMessage}</p>
      ) : (
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
