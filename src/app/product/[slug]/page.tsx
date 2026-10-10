import { Suspense } from "react";
import ProductDetails from "@/components/ProductDetails";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function ProductPageContent({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  return <ProductDetails slug={slug} />;
}

export default function ProductPage({
  params,
}: ProductPageProps) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto mt-6 w-full max-w-6xl px-4 py-10 text-sm text-gray-500">
          পণ্যের তথ্য লোড হচ্ছে...
        </div>
      }
    >
      <ProductPageContent params={params} />
    </Suspense>
  );
}