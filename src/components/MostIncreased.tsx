import type { Product } from "@/types/product.type";
import ProductCard from "./ProductCard";

export default function MostIncreased({
  products,
}: {
  products: Product[];
}) {
  const increased = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  if (increased.length === 0) return null;

  return (
    <section className="mt-8">
      <h2 className="mb-3 font-bold text-gray-900">
        <span className="text-red-600">▲</span> আজ দাম বেড়েছে
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {increased.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}