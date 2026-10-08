"use client";

import { useEffect, useState } from "react";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Product {
  id: number;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const API_URL =
  "https://api.abcz.workers.dev/api/bazardor/products";

export default function Marquee() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch(API_URL);
      const data: Product[] = await res.json();

      setProducts(data);
    };

    getProducts();
  }, []);

  const number = new Intl.NumberFormat("bn-BD");

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

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="border-y border-gray-100 bg-white">
      <MarqueeText
        className="py-1 text-sm text-black"
        direction="right"
        duration={10}
      >
        {products.map((product) => {
          const unit =
            unitNames[product.unit.toLowerCase()] ?? product.unit;

          return (
            <span
              key={product.id}
              className="mx-4  whitespace-nowrap"
            >
              {product.image} {product.nameBn} —{" "}
              {number.format(product.today)} টাকা/{unit}{" "}
              <span
                className={
                  product.change.dir === "up"
                    ? "text-red-600"
                    : product.change.dir === "down"
                      ? "text-green-600"
                      : "text-gray-500"
                }
              >
                {product.change.dir === "up"
                  ? "▲"
                  : product.change.dir === "down"
                    ? "▼"
                    : "—"}{" "}
                {number.format(product.change.pct)}%
              </span>

              <span className="mx-4 text-gray-300">•</span>
            </span>
          );
        })}
      </MarqueeText>
    </div>
  );
}