import type { Product } from "@/types/product.type";

const API_URL = "https://api.abcz.workers.dev/api/bazardor/products";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("পণ্যের তথ্য আনা যায়নি");
  }

  const result: Product[] | { data?: Product[] } = await response.json();

  const products = Array.isArray(result) ? result : result.data;

  if (!products) {
    throw new Error("API response-এর format ঠিক নেই");
  }

  return products;
}