"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function AuthToastHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const authStatus = searchParams.get("auth");
    const error = searchParams.get("error");

   
    if (authStatus === "success") {
      toast.success("সাইন ইন সফল হয়েছে।");
    }

    if (authStatus === "signup") {
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে। স্বাগতম!");
    }

   
    if (error) {
      const errorMessages: Record<string, string> = {
        account_not_linked:
          "এই অ্যাকাউন্টটি লিংক করা যায়নি। অন্য পদ্ধতিতে চেষ্টা করুন।",
        email_not_found: "ইমেইল পাওয়া যায়নি। অন্য অ্যাকাউন্টে চেষ্টা করুন।",
        oauth_account_already_linked:
          "এই সোশ্যাল অ্যাকাউন্ট আগেই অন্য ইউজারের সাথে যুক্ত।",
        invalid_code: "কোড যাচাই করা যায়নি। আবার চেষ্টা করুন।",
      };

      toast.error(
        errorMessages[error] ?? `Authentication ব্যর্থ: ${error}`
      );
    }

    
    if (authStatus || error) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("auth");
      params.delete("error");

      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;

      router.replace(newUrl, { scroll: false });
    }
  }, [searchParams, router, pathname]);

  return null;
}