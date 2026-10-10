import type {
  Product,
  ProductDetail,
} from "@/types/product.type";

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

// সব product
export function getProducts(): Promise<Product[]> {
  return fetchProducts(API_URL);
}

// নির্দিষ্ট category-র product
export function getProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  const url = new URL(API_URL);

  url.searchParams.set("category", categorySlug);

  return fetchProducts(url.toString());
}

// একটি product-এর বিস্তারিত তথ্য
export async function getProductById(
  id: string
): Promise<ProductDetail> {
  const response = await fetch(
    `${API_URL}/${encodeURIComponent(id)}`
  );

  if (response.status === 404) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  if (!response.ok) {
    throw new Error("পণ্যের তথ্য আনা যায়নি");
  }

  const result: unknown = await response.json();

  const product =
    result &&
    typeof result === "object" &&
    "data" in result
      ? (result as { data?: unknown }).data
      : result;

  if (
    !product ||
    typeof product !== "object" ||
    !("id" in product)
  ) {
    throw new Error("পণ্যের তথ্য পাওয়া যায়নি");
  }

  return product as ProductDetail;
}