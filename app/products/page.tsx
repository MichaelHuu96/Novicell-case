import Link from "next/link";
import { getProducts } from "@/lib/api/products";

export default async function ProductsPage() {
  let products: Awaited<ReturnType<typeof getProducts>> = [];
  let errorMessage = "";

  try {
    products = await getProducts();
  } catch {
    errorMessage = "Could not load products right now.";
  }

  return (
    <main>
      <h1>Products</h1>
      <p>Select a product to view details.</p>

      {errorMessage ? <p>{errorMessage}</p> : null}

      {!errorMessage && products.length === 0 ? <p>No products found.</p> : null}

      {!errorMessage && products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Link href={`/products/${product.id}`}>{product.title}</Link>
            </li>
          ))}
        </ul>
      ) : null}
    </main>
  );
}