"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import NavLinks from "./NavLinks";
import Marquee from "./Marquee";
import { signOut, useSession } from "@/lib/auth-client";

export default function Header(): React.JSX.Element {
  const router = useRouter();
  const [today, setToday] = useState<string>("");
  const { data: session, isPending } = useSession();

  useEffect(() => {
    const date = new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
    setToday(date);
  }, []);

  const handleSignOut = async (): Promise<void> => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin");
          router.refresh();
        },
      },
    });
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        {/* ✅ Responsive: ছোট স্ক্রিনে padding কম, gap কম */}
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-2 sm:px-4 sm:py-3">
          <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-700 text-lg sm:h-10 sm:w-10 sm:text-xl">
              🛒
            </span>
            <div className="min-w-0">
              <h1 className="truncate text-base font-bold text-gray-900 sm:text-lg">
                বাজার দর
              </h1>
              <p className="truncate text-[10px] text-gray-500 sm:text-xs">
                {today}
              </p>
            </div>
          </Link>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            {isPending ? (
              <span className="text-sm text-gray-400">...</span>
            ) : session ? (
              <>
                {/* ✅ Responsive: নাম truncate, মোবাইলে ছোট max-width */}
                <Link
                  href="/profile"
                  className="max-w-[80px] truncate rounded-full bg-green-100 px-2 py-1.5 text-xs font-medium text-green-800 hover:bg-green-200 sm:max-w-[140px] sm:px-3 sm:py-2 sm:text-sm"
                >
                  {session.user.name ?? "প্রোফাইল"}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="rounded-lg px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-100 sm:px-3 sm:py-2 sm:text-sm"
                >
                  সাইন আউট
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="rounded-lg px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-100 sm:px-3 sm:py-2 sm:text-sm"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="rounded-lg bg-green-700 px-2 py-1.5 text-xs font-semibold text-white hover:bg-green-800 sm:px-3 sm:py-2 sm:text-sm"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>

        <Suspense fallback={<div className="h-14 border-t border-gray-100" />}>
          <NavLinks />
        </Suspense>
      </header>

      <Marquee />
    </>
  );
}