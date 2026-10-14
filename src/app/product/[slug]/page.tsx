import { Suspense } from "react";
import ProductDetails from "@/components/ProductDetails";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

async function ProductPageContent({ params }: ProductPageProps) {
  const { slug } = await params;

  
  return <ProductDetails slug={slug} />;
}

function ProductSkeleton() {
  return (
    <div className="mx-auto mt-6 w-full max-w-6xl space-y-5 px-3 sm:px-4">
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