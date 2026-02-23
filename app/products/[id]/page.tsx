import { getProductById } from "@/lib/api/products";

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
      <main>
        <h1>Product Detail</h1>
        <p>Invalid product id.</p>
      </main>
    );
  }

  try {
    const product = await getProductById(numericId);

    return (
      <main>
        <h1>Product Detail</h1>
        <p>ID: {product.id}</p>
        <h2>{product.title}</h2>
        <p>Category: {product.category}</p>
        <p>Price: ${product.price.toFixed(2)}</p>
        <p>{product.description}</p>
      </main>
    );
  } catch {
    return (
      <main>
        <h1>Product Detail</h1>
        <p>Could not load this product right now.</p>
      </main>
    );
  }
}
