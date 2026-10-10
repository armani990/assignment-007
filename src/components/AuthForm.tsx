"use client";

import Link from "next/link";

interface AuthFormProps {
  mode: "signin" | "signup";
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.05 5.05 0 0 1-2.2 3.31v2.77h3.57c2.08-1.92 3.27-4.75 3.27-8.09Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.85 0-5.27-1.92-6.13-4.5H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.87 14.13A6.6 6.6 0 0 1 5.52 12c0-.74.13-1.46.35-2.13V7.03H2.18A11 11 0 0 0 1 12c0 1.78.43 3.47 1.18 4.97l3.69-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.36c1.62 0 3.06.56 4.2 1.64l3.15-3.15A10.55 10.55 0 0 0 12 1a11 11 0 0 0-9.82 6.03l3.69 2.84c.86-2.58 3.28-4.51 6.13-4.51Z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.59 1.21 3.22.92.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.99 0 4.29-2.61 5.23-5.1 5.51.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

export default function AuthForm({ mode }: AuthFormProps) {
  const isSignUp = mode === "signup";

  return (
    <section className="min-h-[70vh] bg-[#f1f6f1] px-4 py-10 sm:py-12">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {isSignUp ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}
          </h1>

          <p className="mt-1 text-sm text-gray-600">
            {isSignUp
              ? "বিনামূল্যে বাজার দর অ্যাকাউন্ট তৈরি করুন।"
              : "বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"}
          </p>
        </div>

        <div className="rounded-2xl border border-[#dce5dd] bg-[#fbfdfb] p-5 sm:p-6">
          <form onSubmit={(event) => event.preventDefault()} className="space-y-4">
            {isSignUp && (
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-sm font-medium text-gray-800"
                >
                  নাম
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="যেমন: রহিম উদ্দিন"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-gray-800"
              >
                ইমেইল
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-gray-800"
              >
                পাসওয়ার্ড
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isSignUp ? "new-password" : "current-password"}
                placeholder="কমপক্ষে ৮ অক্ষর"
                minLength={8}
                required
                className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {isSignUp && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-1 block text-sm font-medium text-gray-800"
                >
                  পাসওয়ার্ড নিশ্চিত করুন
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="আবার লিখুন"
                  minLength={8}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-green-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
            >
              {isSignUp ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-500">অথবা</span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-gray-300 px-2 text-sm text-gray-800 transition hover:bg-gray-50"
            >
              <GoogleIcon />
              <span>Google দিয়ে চালিয়ে যান</span>
            </button>

            <button
              type="button"
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-gray-300 px-2 text-sm text-gray-800 transition hover:bg-gray-50"
            >
              <GitHubIcon />
              <span>GitHub দিয়ে চালিয়ে যান</span>
            </button>
          </div>

          <p className="mt-5 text-center text-sm text-gray-600">
            {isSignUp ? "অ্যাকাউন্ট আছে?" : "অ্যাকাউন্ট নেই?"}{" "}
            <Link
              href={isSignUp ? "/signin" : "/signup"}
              className="font-medium text-green-700 hover:underline"
            >
              {isSignUp ? "সাইন ইন করুন" : "সাইন আপ করুন"}
            </Link>
          </p>
        </div>

        {isSignUp && (
          <p className="mt-5 text-center text-sm">
            <Link href="/" className="text-gray-500 underline hover:text-green-700">
              ← হোম পেজে ফিরে যান
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}