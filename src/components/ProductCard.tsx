import Link from "next/link";
import type { Product } from "@/types/product.type";

interface ProductCardProps {
  product: Product;
}

const unitNames: Record<string, string> = {
  kg: "কেজি",
  liter: "লিটার",
  litre: "লিটার",
  l: "লিটার",
  piece: "পিস",
  pcs: "পিস",
  pc: "পিস",
  dozen: "ডজন",
};

const priceFormat = new Intl.NumberFormat("bn-BD");
const percentFormat = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export default function ProductCard({ product }: ProductCardProps) {
  const unit = unitNames[product.unit.toLowerCase()] ?? product.unit;

  const changeColor =
    product.change.dir === "up"
      ? "text-red-600"
      : product.change.dir === "down"
        ? "text-green-700"
        : "text-gray-500";

  const arrow =
    product.change.dir === "up"
      ? "▲"
      : product.change.dir === "down"
        ? "▼"
        : "—";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-xl border border-[#dce5dd] bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f2f6f2] text-xl">
          {product.image || product.categoryIcon}
        </span>

        <div>
          <h3 className="font-semibold text-gray-900">{product.nameBn}</h3>
          <p className="text-xs text-gray-500">প্রতি {unit}</p>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="font-semibold text-gray-900">
            {priceFormat.format(product.today)} টাকা
          </p>
        </div>

        <span className={`whitespace-nowrap text-xs font-semibold ${changeColor}`}>
          {arrow} {percentFormat.format(product.change.pct)}%
        </span>
      </div>
    </Link>
  );
}