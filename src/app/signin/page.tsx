"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

const SignInPage = (): React.JSX.Element => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;

    const email = data.email.trim();
    const password = data.password;

    // ইমেইল validation
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      toast.error("সঠিক ইমেইল ঠিকানা লিখুন।");
      return;
    }
    // পাসওয়ার্ড validation
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("পাসওয়ার্ডে অন্তত একটি বড় হাতের অক্ষর থাকতে হবে।");
      return;
    }
    if (!/[0-9]/.test(password)) {
      toast.error("পাসওয়ার্ডে অন্তত একটি সংখ্যা থাকতে হবে।");
      return;
    }

    setSubmitting(true);

    try {
      const { data: resData, error } = await signIn.email({
        email,
        password,
        rememberMe: true,
        callbackURL: "/",
      });

      console.log("after signin submit", resData, error);

      if (error) {
        toast.error(error.message ?? "ইমেইল বা পাসওয়ার্ড সঠিক নয়।");
        return;
      }

      toast.success("সাইন ইন সফল হয়েছে।");
      router.replace("/");
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

  
  const handleGoogleSignIn = async (): Promise<void> => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/?auth=success",  
        errorCallbackURL: "/signin",
      });
    } catch (err) {
      console.error(err);
      toast.error(
        err instanceof Error ? err.message : "Google sign-in ব্যর্থ হয়েছে।"
      );
      setSubmitting(false);
    }
  };

  const handleGitHubSignIn = async (): Promise<void> => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await signIn.social({
        provider: "github",
        callbackURL: "/?auth=success",   
        errorCallbackURL: "/signin",
      });
    } catch (err) {
      console.error(err);
      toast.error(
        err instanceof Error ? err.message : "GitHub sign-in ব্যর্থ হয়েছে।"
      );
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#f1f6f1] px-4 py-10 sm:py-12">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">সাইন ইন</h1>
          <p className="mt-1 text-sm text-gray-600">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <div className="rounded-2xl border border-[#dce5dd] bg-[#fbfdfb] p-5 sm:p-6">
          <form noValidate onSubmit={onSubmit} className="space-y-4">
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
                required
                autoComplete="email"
                placeholder="you@example.com"
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
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={isVisible ? "text" : "password"}
                  required
                  minLength={8}
                  autoComplete="current-password"
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2.5 pr-12 text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
                />
                <button
                  type="button"
                  aria-label={isVisible ? "Hide password" : "Show password"}
                  onClick={() => setIsVisible((v: boolean) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  {isVisible ? (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.77 21.77 0 0 1 5.06-6.06" />
                      <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.77 21.77 0 0 1-3.06 4.06" />
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-green-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "অপেক্ষা করুন..." : "সাইন ইন"}
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
              onClick={handleGoogleSignIn}
              disabled={submitting}
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-gray-300 px-2 text-sm text-gray-800 hover:bg-gray-50 disabled:opacity-60"
            >
              <span className="bg-gradient-to-r from-blue-600 via-green-600 to-red-500 bg-clip-text text-lg font-bold text-transparent">
                G
              </span>
              <span>Google দিয়ে চালিয়ে যান</span>
            </button>

            <button
              type="button"
              onClick={handleGitHubSignIn}
              disabled={submitting}
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-gray-300 px-2 text-sm text-gray-800 hover:bg-gray-50 disabled:opacity-60"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.59 1.21 3.22.92.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.99 0 4.29-2.61 5.23-5.1 5.51.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
              </svg>
              <span>GitHub দিয়ে চালিয়ে যান</span>
            </button>
          </div>

          <p className="mt-5 text-center text-sm text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-medium text-green-700 hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;