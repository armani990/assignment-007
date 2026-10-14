import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileUpdateForm from "@/components/ProfileUpdateForm";

async function ProfileUpdateContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?callbackUrl=/profile/update");
  }

  return (
    <ProfileUpdateForm
      initialName={session.user.name ?? ""}
      email={session.user.email}
    />
  );
}

function ProfileUpdateSkeleton() {
  return (
    <div className="rounded-2xl border border-[#dce5dd] bg-white p-6 shadow-sm">
      <div className="space-y-4">
        <div className="h-10 animate-pulse rounded bg-gray-200" />
        <div className="h-10 animate-pulse rounded bg-gray-200" />
        <div className="h-12 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}

export default function ProfileUpdatePage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        প্রোফাইল আপডেট
      </h1>

      <Suspense fallback={<ProfileUpdateSkeleton />}>
        <ProfileUpdateContent />
      </Suspense>
    </main>
  );
}