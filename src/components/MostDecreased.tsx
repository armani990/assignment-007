import type { Product } from "@/types/product.type";
import ProductCard from "./ProductCard";

export default function MostDecreased({
  products,
}: {
  products: Product[];
}) {
  const decreased = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  if (decreased.length === 0) return null;

  return (
    <section className="mt-8">
      <h2 className="mb-3 font-bold text-gray-900">
        <span className="text-green-700">▼</span> আজ দাম কমেছে
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {decreased.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}