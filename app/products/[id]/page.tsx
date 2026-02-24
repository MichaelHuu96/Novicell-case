import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { FeaturedProducts } from "@/components/library/FeaturedProducts";
import { getProductById, getProductsByCategory } from "@/lib/api/products";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    return (
      <main className="page-shell product-detail-page">
        <h1>Product Detail</h1>
        <p>Invalid product id.</p>
      </main>
    );
  }

  try {
    const product = await getProductById(numericId);
    const productsInCategory = await getProductsByCategory(product.category);

    return (
      <main className="page-shell product-detail-page">
        <section className="product-detail">
          <div className="product-detail-image-wrap">
            <img
              className="product-detail-image"
              src={product.image}
              alt={product.title}
            />
          </div>

          <div className="product-detail-content">
            <h1 className="product-detail-title">{product.title}</h1>
            <p className="product-detail-description">{product.description}</p>
            <AddToCartButton className="product-detail-button" product={product} />
          </div>
        </section>

        <FeaturedProducts
          className="similar-products"
          currentProduct={product}
          emptyMessage="No similar products available right now."
          limit={5}
          products={productsInCategory}
          title="Similar products"
        />
      </main>
    );
  } catch {
    return (
      <main className="page-shell product-detail-page">
        <h1>Product Detail</h1>
        <p>Could not load this product right now.</p>
      </main>
    );
  }
}
