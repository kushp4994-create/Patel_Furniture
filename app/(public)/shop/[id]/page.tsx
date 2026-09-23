import prisma from "@/lib/prisma";
import Link from "next/link";
import InquiryForm from "@/components/InquiryForm";
import ContactForm from "@/components/ContactForm";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return (
      <main className="min-h-[70vh] bg-[#faf9f6] px-6 py-24">
        <div className="mx-auto max-w-2xl border border-[#e5dfd4] bg-white px-8 py-16 text-center shadow-[0_10px_35px_rgba(31,31,31,0.05)]">
          <div className="mx-auto mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#c9a15b]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#c9a15b]" />
            <span className="h-px w-8 bg-[#c9a15b]" />
          </div>

          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a27d3e]">
            Patel Furniture
          </p>

          <h1 className="mt-4 text-3xl font-medium tracking-[-0.03em] text-[#222222]">
            Product Not Found
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#777777]">
            The product you are looking for may have been removed or is
            currently unavailable.
          </p>

          <Link
            href="/shop"
            className="mt-7 inline-flex items-center justify-center bg-[#1f1f1f] px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#5fb3a9]"
          >
            Back To Collection
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#faf9f6] text-[#2b2b2b]">
      {/* =========================================================
          BREADCRUMB / TOP BAR
      ========================================================= */}
      <section className="border-b border-[#e8e2d8] bg-white">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2.5 text-[9px] font-semibold uppercase tracking-[0.2em] sm:text-[10px]">
              <li>
                <Link
                  href="/"
                  className="text-[#999999] transition-colors hover:text-[#5fb3a9]"
                >
                  Home
                </Link>
              </li>

              <li className="text-[#c9a15b]">/</li>

              <li>
                <Link
                  href="/shop"
                  className="text-[#999999] transition-colors hover:text-[#5fb3a9]"
                >
                  Shop
                </Link>
              </li>

              <li className="text-[#c9a15b]">/</li>

              <li className="max-w-[160px] truncate text-[#333333] sm:max-w-[280px]">
                {product.name}
              </li>
            </ol>
          </nav>

          <span className="hidden text-[9px] font-medium uppercase tracking-[0.2em] text-[#aaaaaa] sm:block">
            Patel Furniture
          </span>
        </div>
      </section>

      {/* =========================================================
          PRODUCT SECTION
      ========================================================= */}
      <section className="py-10 sm:py-14 lg:py-20">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 xl:gap-20">
            {/* =====================================================
                LEFT — PRODUCT IMAGE
            ===================================================== */}
            <div className="lg:sticky lg:top-8 lg:self-start">
              <div className="relative overflow-hidden border border-[#e4ded4] bg-white shadow-[0_15px_45px_rgba(31,31,31,0.07)]">
                {/* Top Label */}
                <div className="absolute left-5 top-5 z-10">
                  <span className="inline-flex items-center border border-white/30 bg-[#1f1f1f]/75 px-4 py-2 text-[8px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md sm:text-[9px]">
                    Premium Collection
                  </span>
                </div>

                {/* Image */}
                <div className="group relative aspect-[4/3] overflow-hidden bg-[#eeeae3] sm:aspect-[5/4] lg:aspect-[4/3]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                  />

                  {/* Image Overlay */}
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5"
                    aria-hidden="true"
                  />

                  {/* Bottom Accent */}
                  <div
                    className="absolute bottom-0 left-0 h-[3px] w-20 bg-[#c9a15b]"
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Small Product Info Below Image */}
              <div className="mt-5 flex items-center justify-between border-b border-[#e3ddd3] pb-5">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#a27d3e]">
                    Collection
                  </p>

                  <p className="mt-1 text-sm text-[#666666]">
                    {product.category || "Furniture"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-px w-7 bg-[#c9a15b]" />
                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#999999]">
                    Patel Furniture
                  </span>
                </div>
              </div>
            </div>

            {/* =====================================================
                RIGHT — PRODUCT DETAILS
            ===================================================== */}
            <div className="flex flex-col justify-center">
              {/* Eyebrow */}
              <div className="flex items-center gap-3">
                <span className="h-px w-9 bg-[#c9a15b]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a27d3e]">
                  {product.category || "Furniture Collection"}
                </span>
              </div>

              {/* Product Name */}
              <h1 className="mt-5 max-w-2xl text-[38px] font-medium leading-[1.08] tracking-[-0.04em] text-[#202020] sm:text-[48px] lg:text-[54px] xl:text-[60px]">
                {product.name}
              </h1>

              {/* Decorative Line */}
              <div className="mt-7 flex items-center gap-2">
                <span className="h-[2px] w-12 bg-[#c9a15b]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#5fb3a9]" />
                <span className="h-px w-20 bg-[#ded8ce]" />
              </div>

              {/* Price */}
              <div className="mt-8 border-y border-[#e4ded5] py-6">
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#999999]">
                  Price
                </p>

                <div className="mt-2 flex items-end gap-3">
                  <span className="text-3xl font-semibold tracking-[-0.02em] text-[#b28b4c] sm:text-4xl">
                    ₹ {product.price}
                  </span>

                  <span className="mb-1 text-[10px] uppercase tracking-[0.15em] text-[#999999]">
                    Contact for details
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mt-8">
                <div className="mb-4 flex items-center gap-3">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#333333]">
                    Product Details
                  </h2>

                  <span className="h-px flex-1 bg-[#e4ded5]" />
                </div>

                <p className="max-w-2xl text-[14px] leading-8 text-[#6b6b6b] sm:text-[15px]">
                  {product.description ||
                    "Discover a thoughtfully crafted furniture piece designed to bring comfort, character, and timeless elegance to your space."}
                </p>
              </div>

              {/* Feature Cards */}
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="border border-[#e5dfd5] bg-white px-4 py-4">
                  <div className="mb-3 flex h-8 w-8 items-center justify-center border border-[#d9c49d] text-[#a27d3e]">
                    <span className="text-sm">✦</span>
                  </div>

                  <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#333333]">
                    Premium Quality
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-[#888888]">
                    Crafted for refined interiors
                  </p>
                </div>

                <div className="border border-[#e5dfd5] bg-white px-4 py-4">
                  <div className="mb-3 flex h-8 w-8 items-center justify-center border border-[#b9ddd8] text-[#4d9d94]">
                    <span className="text-sm">✓</span>
                  </div>

                  <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#333333]">
                    Trusted Service
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-[#888888]">
                    Personalised furniture assistance
                  </p>
                </div>

                <div className="border border-[#e5dfd5] bg-white px-4 py-4">
                  <div className="mb-3 flex h-8 w-8 items-center justify-center border border-[#d9c49d] text-[#a27d3e]">
                    <span className="text-sm">⌂</span>
                  </div>

                  <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#333333]">
                    Designed For You
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-[#888888]">
                    Made for beautiful living spaces
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-9 border-t border-[#e4ded5] pt-7">
                <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#999999]">
                  Interested in this product?
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="flex-1">
                    <InquiryForm productId={product.id} />
                  </div>

                  <div className="flex-1">
                    <ContactForm productName={product.name} />
                  </div>
                </div>
              </div>

              {/* Back to Shop */}
              <div className="mt-7">
                <Link
                  href="/shop"
                  className="group inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#777777] transition-colors duration-300 hover:text-[#4d9d94]"
                >
                  <span className="transition-transform duration-300 group-hover:-translate-x-1">
                    ←
                  </span>

                  Back to Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          BOTTOM BRAND SECTION
      ========================================================= */}
      <section className="border-t border-[#e5dfd5] bg-white">
        <div className="mx-auto max-w-[1320px] px-5 py-12 sm:px-8 sm:py-14 lg:px-10">
          <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
            <div>
              <div className="flex items-center justify-center gap-3 sm:justify-start">
                <span className="h-px w-8 bg-[#c9a15b]" />

                <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#a27d3e]">
                  Patel Furniture
                </span>

                <span className="h-px w-8 bg-[#c9a15b]" />
              </div>

              <h2 className="mt-3 text-2xl font-medium tracking-[-0.025em] text-[#222222]">
                Furniture made for beautiful spaces.
              </h2>
            </div>

            <Link
              href="/shop"
              className="inline-flex shrink-0 items-center justify-center border border-[#d8c49e] bg-[#faf9f6] px-6 py-3.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#555555] transition-all duration-300 hover:border-[#5fb3a9] hover:bg-[#5fb3a9] hover:text-white"
            >
              Explore More Products
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}