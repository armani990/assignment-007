import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import ProductDetails from "@/components/ProductDetails";
import { auth } from "@/lib/auth";
import { getProducts } from "@/lib/api";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}


async function ProductPageContent({ params }: ProductPageProps) {
  const { slug } = await params;

  
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/signin?callbackUrl=/product/${slug}`);
  }

  try {
    const products = await getProducts();
    const matched = products.find((item) => item.slug === slug);

    if (!matched) {
      notFound();
    }
  } catch {
    // API fail হলে ও 404 দেখাবে
    notFound();
  }

  return <ProductDetails slug={slug} />;
}


function ProductSkeleton() {
  return (
    <div className="mx-auto mt-6 w-full max-w-6xl space-y-5 px-4">
      <div className="h-5 w-48 animate-pulse rounded bg-gray-200" />
      <div className="h-28 animate-pulse rounded-2xl bg-gray-200" />
      <div className="h-36 animate-pulse rounded-2xl bg-gray-200" />
      <div className="h-64 animate-pulse rounded-2xl bg-gray-200" />
    </div>
  );
}


export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductPageContent params={params} />
    </Suspense>
  );
}