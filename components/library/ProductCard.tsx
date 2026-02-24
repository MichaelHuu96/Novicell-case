
import Link from "next/link";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <Link className="product-card-image-link" href={`/products/${product.id}`}>
        <img
          className="product-card-image"
          src={product.image}
          alt={product.title}
          loading="lazy"
        />
      </Link>

      <div className="product-card-body">
        <h3 className="product-card-title">{product.title}</h3>
        <p className="product-card-category">{product.category}</p>
      </div>
    </article>
  );
}
