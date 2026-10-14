"use client";

import { useRouter } from "next/navigation";
import { useState, type SyntheticEvent } from "react";
import toast from "react-hot-toast";
import { updateUser } from "@/lib/auth-client";

interface ProfileUpdateFormProps {
  initialName: string;
  email: string;
}

export default function ProfileUpdateForm({
  initialName,
  email,
}: ProfileUpdateFormProps): React.JSX.Element {
  const router = useRouter();
  const [name, setName] = useState<string>(initialName);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const onSubmit = async (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ): Promise<void> => {
    e.preventDefault();

    if (name.trim().length < 3) {
      toast.error("নাম কমপক্ষে ৩ অক্ষরের হতে হবে।");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await updateUser({ name: name.trim() });

      if (error) {
        toast.error(error.message ?? "প্রোফাইল আপডেট করা যায়নি।");
        return;
      }

      toast.success("প্রোফাইল আপডেট হয়েছে।");
      router.push("/profile");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error(
        err instanceof Error ? err.message : "কিছু একটা সমস্যা হয়েছে।"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-[#dce5dd] bg-white p-6 shadow-sm"
    >
      <div className="space-y-4">
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
          />
        </div>

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
            value={email}
            disabled
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-500"
          />
          <p className="mt-1 text-xs text-gray-500">
            ইমেইল পরিবর্তন করা যাবে না।
          </p>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-green-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "সেভ হচ্ছে..." : "সেভ করুন"}
        </button>
      </div>
    </form>
  );
}