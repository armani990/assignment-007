"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import type { Product } from "@/types/product.type";
import MostIncreased from "./MostIncreased";
import MostDecreased from "./MostDecreased";
import MainProducts from "./MainProducts";

const containerClass = "mx-auto w-full max-w-6xl px-4";

export default function HomeProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "পণ্য লোড করা যায়নি"
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div
        className={`${containerClass} mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3`}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-24 w-full animate-pulse rounded-xl border border-gray-200 bg-gray-100"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${containerClass} mt-8`}>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className={`${containerClass} pb-10`}>
      <MostIncreased products={products} />
      <MostDecreased products={products} />
      <MainProducts products={products} />
    </div>
  );
}