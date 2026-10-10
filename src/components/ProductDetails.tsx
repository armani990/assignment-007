"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts, getProductById } from "@/lib/api";
import type { ProductDetail } from "@/types/product.type";

interface ProductDetailsProps {
  slug: string;
}

const numberFormat = new Intl.NumberFormat("bn-BD");

const percentFormat = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

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

export default function ProductDetails({
  slug,
}: ProductDetailsProps) {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadProduct() {
      setLoading(true);
      setProduct(null);
      setError("");
      setNotFound(false);

      try {
        // প্রথমে slug দিয়ে product খুঁজব
        const products = await getProducts();

        const matchedProduct = products.find(
          (item) => item.slug === slug
        );

        if (!matchedProduct) {
          setNotFound(true);
          return;
        }

        // এবার product ID দিয়ে details API call করব
        const data = await getProductById(
          String(matchedProduct.id)
        );

        if (!cancelled) {
          setProduct(data);
        }
      } catch (error) {
        if (!cancelled) {
          if (
            error instanceof Error &&
            error.message === "PRODUCT_NOT_FOUND"
          ) {
            setNotFound(true);
          } else {
            setError(
              error instanceof Error
                ? error.message
                : "পণ্যের তথ্য লোড করা যায়নি"
            );
          }
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto mt-6 w-full max-w-6xl space-y-5 px-4">
        <div className="h-5 w-48 animate-pulse rounded bg-gray-200" />
        <div className="h-28 animate-pulse rounded-2xl bg-gray-200" />
        <div className="h-36 animate-pulse rounded-2xl bg-gray-200" />
        <div className="h-64 animate-pulse rounded-2xl bg-gray-200" />
      </div>
    );
  }

  if (notFound) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-12">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <h1 className="text-xl font-bold text-gray-900">
            পণ্যটি খুঁজে পাওয়া যায়নি
          </h1>

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

  if (error || !product) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        <p className="text-red-600">
          {error || "পণ্যের তথ্য পাওয়া যায়নি"}
        </p>

        <Link
          href="/"
          className="mt-4 inline-block text-sm font-medium text-green-700 hover:underline"
        >
          হোম পেজে ফিরে যান
        </Link>
      </main>
    );
  }

  const unit =
    unitNames[product.unit.toLowerCase()] ?? product.unit;

  const markets = product.markets ?? [];

  const minPrice =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : null;

  const maxPrice =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : null;

  // প্রতিটি বাজারের min ও max-এর মধ্যবর্তী দাম দিয়ে আনুমানিক গড়
  const averagePrice =
    markets.length > 0
      ? markets.reduce(
          (total, market) =>
            total + (market.min + market.max) / 2,
          0
        ) / markets.length
      : null;

  const changeArrow =
    product.change.dir === "up"
      ? "▲"
      : product.change.dir === "down"
        ? "▼"
        : "—";

  const changeColor =
    product.change.dir === "up"
      ? "text-red-600"
      : product.change.dir === "down"
        ? "text-green-700"
        : "text-gray-500";

  const changeText =
    product.change.dir === "up"
      ? "বেড়েছে"
      : product.change.dir === "down"
        ? "কমেছে"
        : "অপরিবর্তিত";

  return (
    <main className="mx-auto mt-5 w-full max-w-6xl space-y-5 px-4 pb-10">
      {/* Breadcrumb */}
      <nav
        className="text-sm text-gray-500"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-green-700">
          হোম
        </Link>

        <span className="mx-2">›</span>

        <Link
          href="/#সব-পণ্য"
          className="hover:text-green-700"
        >
          সব পণ্য
        </Link>

        <span className="mx-2">›</span>

        <span className="text-gray-700">
          {product.nameBn}
        </span>
      </nav>

      {/* Product summary */}
      <section className="flex flex-col justify-between gap-5 rounded-2xl border border-green-100 bg-[#fbfdfb] p-5 sm:flex-row sm:items-center sm:p-6">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-3xl">
            {product.image || product.categoryIcon}
          </span>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {product.nameBn}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <span>প্রতি {unit}</span>
              <span>•</span>

              <span className="rounded-full bg-green-100 px-2 py-0.5 text-green-800">
                {product.categoryNameBn}
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-600">
              আজকের বাজারে দাম{" "}
              <span className={changeColor}>
                {changeText}
              </span>
              {product.change.dir !== "flat" && (
                <>
                  {" "}
                  {percentFormat.format(product.change.pct)}%
                </>
              )}
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-white px-5 py-3 text-center shadow-sm">
          <p className="text-xs text-gray-500">
            আজকের দাম
          </p>

          <p className="text-2xl font-bold text-gray-900">
            {numberFormat.format(product.today)}
          </p>

          <p className="text-xs text-gray-500">
            টাকা / {unit}
          </p>

          <p className={`mt-1 text-xs font-semibold ${changeColor}`}>
            {changeArrow}{" "}
            {percentFormat.format(product.change.pct)}%
          </p>
        </div>
      </section>

      {/* Price summary */}
      <section className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
        <h2 className="mb-4 font-bold text-gray-900">
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">
              সর্বনিম্ন দাম
            </p>

            <p className="mt-2 font-bold text-green-700">
              {minPrice === null
                ? "তথ্য নেই"
                : `${numberFormat.format(minPrice)} টাকা`}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">
              সর্বোচ্চ দাম
            </p>

            <p className="mt-2 font-bold text-red-600">
              {maxPrice === null
                ? "তথ্য নেই"
                : `${numberFormat.format(maxPrice)} টাকা`}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">
              আনুমানিক গড় দাম
            </p>

            <p className="mt-2 font-bold text-gray-900">
              {averagePrice === null
                ? "তথ্য নেই"
                : `${numberFormat.format(Math.round(averagePrice))} টাকা`}
            </p>
          </div>
        </div>

        <p className="mt-3 text-xs text-gray-500">
          গড় দাম বাজারগুলোর সর্বনিম্ন ও সর্বোচ্চ দামের মধ্যবর্তী মান থেকে হিসাব করা হয়েছে।
        </p>
      </section>

      {/* Market-wise prices */}
      <section className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
        <h2 className="mb-4 font-bold text-gray-900">
          বাজারভিত্তিক আজকের দাম
        </h2>

        {markets.length === 0 ? (
          <p className="text-sm text-gray-500">
            এই পণ্যের বাজারভিত্তিক দাম পাওয়া যায়নি।
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500">
                  <th className="px-3 py-3 font-medium">
                    বাজার
                  </th>

                  <th className="px-3 py-3 font-medium">
                    বিভাগ
                  </th>

                  <th className="px-3 py-3 font-medium">
                    সর্বনিম্ন
                  </th>

                  <th className="px-3 py-3 font-medium">
                    সর্বোচ্চ
                  </th>

                  <th className="px-3 py-3 font-medium">
                    গড়
                  </th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market, index) => {
                  const marketAverage = Math.round(
                    (market.min + market.max) / 2
                  );

                  return (
                    <tr
                      key={`${market.market}-${index}`}
                      className={
                        index % 2 === 0
                          ? "bg-white"
                          : "bg-[#f7f9f7]"
                      }
                    >
                      <td className="px-3 py-3">
                        {market.market}
                      </td>

                      <td className="px-3 py-3">
                        {market.division}
                      </td>

                      <td className="px-3 py-3 text-green-700">
                        {numberFormat.format(market.min)} টাকা
                      </td>

                      <td className="px-3 py-3 text-red-600">
                        {numberFormat.format(market.max)} টাকা
                      </td>

                      <td className="px-3 py-3">
                        {numberFormat.format(marketAverage)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}