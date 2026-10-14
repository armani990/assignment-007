import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";

async function ProfileContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?callbackUrl=/profile");
  }

  const { user } = session;

  return (
    <div className="rounded-2xl border border-[#dce5dd] bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-700">
          {user.name?.charAt(0).toUpperCase() ?? "?"}
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-900">{user.name}</p>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-1 gap-4 border-t border-gray-100 pt-6 sm:grid-cols-2">
        <div>
          <dt className="text-xs text-gray-500">ইমেইল যাচাই</dt>
          <dd className="mt-1 text-sm font-medium text-gray-800">
            {user.emailVerified ? "✅ যাচাই করা" : "❌ যাচাই করা হয়নি"}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-gray-500">অ্যাকাউন্ট তৈরি</dt>
          <dd className="mt-1 text-sm font-medium text-gray-800">
            {new Date(user.createdAt).toLocaleDateString("bn-BD")}
          </dd>
        </div>
      </dl>

      <Link
        href="/profile/update"
        className="mt-6 inline-block rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
      >
        প্রোফাইল আপডেট করুন
      </Link>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="rounded-2xl border border-[#dce5dd] bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 animate-pulse rounded-full bg-gray-200" />
        <div className="space-y-2">
          <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
          <div className="h-3 w-48 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        আমার প্রোফাইল
      </h1>

      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileContent />
      </Suspense>
    </main>
  );
}