import type { Product } from "@/types/product";

const API_BASE_URL = "https://fakestoreapi.com";

async function fetchFromApi<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function getProducts(): Promise<Product[]> {
  return fetchFromApi<Product[]>("/products");
}

export async function getProductById(id: number): Promise<Product> {
  return fetchFromApi<Product>(`/products/${id}`);
}
