"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [today, setToday] = useState("");

  useEffect(() => {
    const date = new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());

    setToday(date);
  }, []);

  return (
    <section className="mx-auto my-6 grid max-w-6xl items-center gap-8 rounded-2xl border border-gray-100 bg-white px-5 py-8 shadow-md sm:px-8 md:grid-cols-2 md:px-10 md:py-10">
      {/* Left side */}
      <div>
        <p className="mb-3 inline-block rounded-full bg-green-50 px-4 py-1 text-sm font-semibold text-green-700">
          {today}
        </p>

        <h1 className="max-w-xl text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
          আজকের বাজারের দাম এক নজরে
        </h1>

        <p className="mt-4 max-w-xl text-base leading-7 text-gray-600">
          নিত্যপ্রয়োজনীয় পণ্যের বর্তমান দাম, দামের ওঠানামা এবং
          বাজারভিত্তিক তথ্য সহজেই দেখুন এক জায়গায়।
        </p>

        <a
          href="#সব-পণ্য"
          className="mt-6 inline-block rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
        >
          সব পণ্য দেখুন
        </a>
      </div>

      {/* Right side image */}
      <div className="relative ml-auto h-64 w-full max-w-md sm:h-80">
        <Image
          src="/bazar-hero.png"
          alt="বাজারের পণ্য"
          fill
          priority
          className="object-contain object-right"
        />
      </div>
    </section>
  );
}

