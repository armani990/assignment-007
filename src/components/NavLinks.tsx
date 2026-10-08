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
  "https://api.abcz.workers.dev/api/bazardor/categories";

export default function NavLinks() {
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch(API_URL);
      const data = await res.json();

      setCategories(data);
    };

    getCategories();
  }, []);

  return (
    <nav className="border-t border-gray-100">
      <div className="mx-auto flex max-w-6xl gap-4 overflow-x-auto px-4 py-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className={`whitespace-nowrap rounded-full px-3 py-2 text-sm ${
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