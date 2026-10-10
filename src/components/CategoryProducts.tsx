"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getProductsByCategory } from "@/lib/api";
import type { Product } from "@/types/product.type";
import ProductCard from "./ProductCard";

type SortOption = "default" | "low-to-high" | "high-to-low";

export default function CategoryProducts() {
  const { slug } = useParams<{ slug: string }>();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("default");

  useEffect(() => {
    async function loadCategoryProducts() {
      setLoading(true);
      setError("");
      setProducts([]);

      try {
        const data = await getProductsByCategory(slug);
        setProducts(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "পণ্য লোড করা যায়নি"
        );
      } finally {
        setLoading(false);
      }
    }

    loadCategoryProducts();
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto mt-6 w-full max-w-6xl space-y-5 px-4">
        <div className="h-20 animate-pulse rounded-2xl bg-gray-200" />

        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-40 animate-pulse rounded-xl border border-gray-200 bg-gray-100"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <main className="mx-auto mt-8 w-full max-w-6xl px-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <p className="text-red-600">{error}</p>

          <Link
            href="/"
            className="mt-5 inline-block rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  const firstProduct = products[0];

  if (!firstProduct) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-12">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <h1 className="text-xl font-bold text-gray-900">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            অন্য কোনো ক্যাটাগরি দেখুন অথবা হোম পেজে ফিরে যান।
          </p>

          <Link
            href="/"
            className="mt-5 inline-block rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  const sortedProducts = [...products];

  if (sortBy === "low-to-high") {
    sortedProducts.sort((a, b) => a.today - b.today);
  }

  if (sortBy === "high-to-low") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  const count = new Intl.NumberFormat("bn-BD").format(products.length);

  return (
    <main className="mx-auto mt-6 w-full max-w-6xl px-4 pb-10">
      {/* Category heading */}
      <section className="flex items-center gap-4 rounded-2xl border border-green-100 bg-[#fbfdfb] p-5 sm:p-6">
        <span className="text-4xl">
          {firstProduct.categoryIcon}
        </span>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {firstProduct.categoryNameBn}
          </h1>

          <p className="text-sm text-gray-600">
            {count}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </section>

      {/* Product count and sorting */}
      <div className="mb-5 mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-600">
          মোট {count}টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="category-sort" className="text-gray-600">
            সাজান:
          </label>

          <select
            id="category-sort"
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value as SortOption)
            }
            className="rounded-md border border-gray-300 bg-white px-3 py-2 outline-none focus:border-green-700"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">দাম: কম থেকে বেশি</option>
            <option value="high-to-low">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Category products */}
      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}