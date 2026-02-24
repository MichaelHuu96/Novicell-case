import Link from "next/link";
import { ProductCard } from "@/components/library/ProductCard";
import { getProducts } from "@/lib/api/products";

type ProductsPageProps = {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    page?: string;
  }>;
};

const PAGE_SIZE = 10;

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const query = await searchParams;
  const selectedCategory = query.category ?? "all";
  const selectedSort = query.sort ?? "default";
  const requestedPage = Number(query.page ?? "1");

  let products: Awaited<ReturnType<typeof getProducts>> = [];
  let errorMessage = "";

  try {
    products = await getProducts();
  } catch {
    errorMessage = "Could not load products right now.";
  }

  const categories = Array.from(new Set(products.map((product) => product.category)));

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (selectedSort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PAGE_SIZE));
  const currentPage = Number.isFinite(requestedPage)
    ? Math.min(Math.max(requestedPage, 1), totalPages)
    : 1;
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageProducts = sortedProducts.slice(pageStart, pageStart + PAGE_SIZE);

  const buildProductsHref = (overrides: {
    category?: string;
    sort?: string;
    page?: string;
  }) => {
    const params = new URLSearchParams();
    const nextCategory = overrides.category ?? selectedCategory;
    const nextSort = overrides.sort ?? selectedSort;
    const nextPage = overrides.page ?? String(currentPage);

    if (nextCategory !== "all") {
      params.set("category", nextCategory);
    }

    if (nextSort !== "default") {
      params.set("sort", nextSort);
    }

    params.set("page", nextPage);
    return `/products?${params.toString()}`;
  };

  return (
    <main className="page-shell">
      <h1>Products</h1>

      {errorMessage ? <p>{errorMessage}</p> : null}

      {!errorMessage ? (
        <section className="products-controls" aria-label="Product controls">
          <div className="control-group">
            <p className="control-label">Filter by category</p>
            <div className="control-options">
              <Link
                className={`control-chip ${selectedCategory === "all" ? "control-chip-active" : ""}`}
                href={buildProductsHref({ category: "all", page: "1" })}
              >
                All
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  className={`control-chip ${selectedCategory === category ? "control-chip-active" : ""}`}
                  href={buildProductsHref({ category, page: "1" })}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          <div className="control-group">
            <p className="control-label">Sort</p>
            <div className="control-options">
              <Link
                className={`control-chip ${selectedSort === "default" ? "control-chip-active" : ""}`}
                href={buildProductsHref({ sort: "default", page: "1" })}
              >
                Default
              </Link>
              <Link
                className={`control-chip ${selectedSort === "price-asc" ? "control-chip-active" : ""}`}
                href={buildProductsHref({ sort: "price-asc", page: "1" })}
              >
                Price low-high
              </Link>
              <Link
                className={`control-chip ${selectedSort === "price-desc" ? "control-chip-active" : ""}`}
                href={buildProductsHref({ sort: "price-desc", page: "1" })}
              >
                Price high-low
              </Link>
              <Link
                className={`control-chip ${selectedSort === "title-asc" ? "control-chip-active" : ""}`}
                href={buildProductsHref({ sort: "title-asc", page: "1" })}
              >
                Name A-Z
              </Link>
              <Link
                className={`control-chip ${selectedSort === "title-desc" ? "control-chip-active" : ""}`}
                href={buildProductsHref({ sort: "title-desc", page: "1" })}
              >
                Name Z-A
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {!errorMessage && sortedProducts.length === 0 ? <p>No products found.</p> : null}

      {!errorMessage && sortedProducts.length > 0 ? (
        <div className="product-grid product-grid-plp">
          {pageProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : null}

      {!errorMessage && sortedProducts.length > 0 ? (
        <nav className="pagination" aria-label="Pagination">
          <Link
            className={`page-button ${currentPage === 1 ? "page-button-disabled" : ""}`}
            href={buildProductsHref({ page: String(Math.max(1, currentPage - 1)) })}
            aria-disabled={currentPage === 1}
          >
            Previous
          </Link>

          <span className="page-status">
            Page {currentPage} of {totalPages}
          </span>

          <Link
            className={`page-button ${currentPage === totalPages ? "page-button-disabled" : ""}`}
            href={buildProductsHref({
              page: String(Math.min(totalPages, currentPage + 1)),
            })}
            aria-disabled={currentPage === totalPages}
          >
            Next
          </Link>
        </nav>
      ) : null}
    </main>
  );
}