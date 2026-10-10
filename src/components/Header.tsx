"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import NavLinks from "./NavLinks";
import Marquee from "./Marquee";

export default function Header() {
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
    <header className="border-b border-gray-200  bg-white ">
      {/* Logo + Auth */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700 text-xl">
            🛒
          </span>

          <div>
            <h1 className="text-lg font-bold text-gray-900">
              বাজার দর
            </h1>

            <p className="text-xs text-gray-500">
              {today}
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/signin"
            className="rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-green-700 px-3 py-2 text-sm font-semibold text-white hover:bg-green-800"
          >
            সাইন আপ
          </Link>
        </div>
      </div>
      
      {/* Category Links */}
      <Suspense
  fallback={
    <div className="h-14 border-t border-gray-100" />
  }
>
  <NavLinks />
</Suspense>
      {/* Price Marquee */}
      <Marquee />
    </header>
  );
}