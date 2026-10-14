import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-2xl flex-col items-center justify-center px-4 py-12 text-center">
      <span className="text-6xl">🔍</span>

      <h1 className="mt-6 text-4xl font-bold text-gray-900">৪০৪</h1>

      <h2 className="mt-2 text-xl font-semibold text-gray-800">
        পেজটি খুঁজে পাওয়া যায়নি
      </h2>

      <p className="mt-2 max-w-md text-sm text-gray-600">
        আপনি যে পেজটি খুঁজছেন সেটি নেই, অথবা সরিয়ে ফেলা হয়েছে।
      </p>

      <Link
        href="/"
        className="mt-8 rounded-lg bg-green-700 px-6 py-3 text-sm font-semibold text-white hover:bg-green-800"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}