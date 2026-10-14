"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const API_URL =
  "https://openapi.programming-hero.com/api/bazardor/categories";

export default function NavLinks() {
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(API_URL);
        const data: Category[] = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Category load করতে সমস্যা হয়েছে:", error);
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, []);

  return (
    <nav
      className="border-t border-gray-100"
      aria-busy={loading}
      aria-label="পণ্যের ক্যাটাগরি"
    >
      {/* ✅ Responsive: scrollbar লুকানো, ছোট স্ক্রিনে gap কম */}
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-3 py-2 sm:gap-4 sm:px-4 sm:py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {loading
          ? Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="h-8 w-16 shrink-0 animate-pulse rounded-full bg-gray-100 sm:h-9"
              />
            ))
          : categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className={`whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm ${
                  pathname === `/category/${category.slug}`
                    ? "bg-green-100 font-semibold text-green-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.icon} {category.nameBn}
              </Link>
            ))}
      </div>
    </nav>
  );
}