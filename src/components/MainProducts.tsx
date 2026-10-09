"use client";

import { useState } from "react";
import type { Product } from "@/types/product.type";
import ProductCard from "./ProductCard";

type SortOption = "default" | "low-to-high" | "high-to-low";

export default function MainProducts({
  products,
}: {
  products: Product[];
}) {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const sortedProducts = [...products];

  if (sortBy === "low-to-high") {
    sortedProducts.sort((a, b) => a.today - b.today);
  }

  if (sortBy === "high-to-low") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  const countFormat = new Intl.NumberFormat("bn-BD");

  return (
    <section id="সব-পণ্য" className="mt-10 scroll-mt-24">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-bold text-gray-900">সব পণ্য</h2>
          <p className="mt-1 text-xs text-gray-500">
            মোট {countFormat.format(products.length)}টি পণ্যের দাম দেখানো হচ্ছে
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="product-sort" className="text-gray-600">
            সাজান:
          </label>

          <select
            id="product-sort"
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value as SortOption)
            }
            className="rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm outline-none focus:border-green-700"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">দাম: কম থেকে বেশি</option>
            <option value="high-to-low">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}