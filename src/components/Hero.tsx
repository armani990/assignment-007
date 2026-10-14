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
    <section className="mx-auto my-4 grid max-w-6xl items-center gap-6 rounded-2xl border border-gray-100 bg-white px-4 py-6 shadow-md sm:my-6 sm:px-6 sm:py-8 md:grid-cols-2 md:px-10 md:py-10">
      {/* Left side */}
      <div>
        <p className="mb-3 inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 sm:px-4 sm:text-sm">
          {today}
        </p>

        <h1 className="max-w-xl text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
          আজকের বাজারের দাম এক নজরে
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-7 text-gray-600 sm:mt-4 sm:text-base">
          নিত্যপ্রয়োজনীয় পণ্যের বর্তমান দাম, দামের ওঠানামা এবং
          বাজারভিত্তিক তথ্য সহজেই দেখুন এক জায়গায়।
        </p>

        {/* ✅ Responsive: মোবাইলে full-width, বড় স্ক্রিনে auto */}
        <a
          href="#সব-পণ্য"
          className="mt-5 inline-block w-full rounded-lg bg-green-700 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-green-800 sm:mt-6 sm:w-auto"
        >
          সব পণ্য দেখুন
        </a>
      </div>

      {/* Right side image */}
      <div className="relative mx-auto h-48 w-full max-w-md sm:h-64 md:ml-auto md:h-80">
        <Image
          src="/bazar-hero.png"
          alt="বাজারের পণ্যের ঝুড়ি"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain"
        />
      </div>
    </section>
  );
}