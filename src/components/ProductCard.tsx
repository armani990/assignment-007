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
      className="block rounded-xl border border-[#dce5dd] bg-white p-2.5 transition hover:-translate-y-0.5 hover:shadow-md sm:p-3"
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f2f6f2] text-lg sm:h-10 sm:w-10 sm:text-xl">
          {product.image || product.categoryIcon}
        </span>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-gray-900 sm:text-base">
            {product.nameBn}
          </h3>
          <p className="text-[11px] text-gray-500 sm:text-xs">
            প্রতি {unit}
          </p>
        </div>
      </div>

      <div className="mt-2.5 flex items-end justify-between gap-2 sm:mt-3">
        <div>
          <p className="text-[11px] text-gray-500 sm:text-xs">আজকের দাম</p>
          <p className="text-sm font-semibold text-gray-900 sm:text-base">
            {priceFormat.format(product.today)} টাকা
          </p>
        </div>

        <span className={`whitespace-nowrap text-[11px] font-semibold sm:text-xs ${changeColor}`}>
          {arrow} {percentFormat.format(product.change.pct)}%
        </span>
      </div>
    </Link>
  );
}