import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthToastHandler from "@/components/AuthToastHandler";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        {/* ✅ এই Suspense জরুরি — useSearchParams এর জন্য */}
        <Suspense fallback={null}>
          <AuthToastHandler />
        </Suspense>

        <Header />

        <main className="flex-1">{children}</main>

        <Footer />

        {/* ✅ Toast দেখানোর জন্য এটা জরুরি */}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}