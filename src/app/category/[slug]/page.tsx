import { Suspense } from "react";
import CategoryProducts from "@/components/CategoryProducts";

export default function CategoryPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto mt-6 w-full max-w-6xl px-4 py-10 text-sm text-gray-500">
          ক্যাটাগরি লোড হচ্ছে...
        </div>
      }
    >
      <CategoryProducts />
    </Suspense>
  );
}