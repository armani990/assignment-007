import type { Product } from "@/types/product.type";

const API_URL = "https://api.abcz.workers.dev/api/bazardor/products";

function readProducts(data: unknown): Product[] {
  if (Array.isArray(data)) {
    return data as Product[];
  }

  if (data && typeof data === "object" && "data" in data) {
    const items = (data as { data?: unknown }).data;

    if (Array.isArray(items)) {
      return items as Product[];
    }
  }

  throw new Error("API থেকে product list পাওয়া যায়নি");
}

async function fetchProducts(url: string): Promise<Product[]> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("পণ্যের তথ্য আনা যায়নি");
  }

  const data: unknown = await response.json();
  return readProducts(data);
}

// Home page-এর সব পণ্যের জন্য
export function getProducts(): Promise<Product[]> {
  return fetchProducts(API_URL);
}

// একটি নির্দিষ্ট category-র পণ্যের জন্য
export function getProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  const url = new URL(API_URL);
  url.searchParams.set("category", categorySlug);

  return fetchProducts(url.toString());
}