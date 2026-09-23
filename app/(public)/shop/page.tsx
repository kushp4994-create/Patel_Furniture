// import { prisma } from "@/lib/prisma";
// import Link from "next/link";

// const PRODUCT_CATEGORIES = [
//   "Sofa",
//   "Sofa Set",
//   "Bed",
//   "Dining Table",
//   "Wardrobe",
//   "TV Unit",
//   "Cabinet",
//   "Office Furniture",
//   "Outdoor Furniture",
//   "Kids Furniture",
// ] as const;

// interface ShopPageProps {
//   searchParams: Promise<{
//     category?: string;
//   }>;
// }

// export default async function ShopPage({
//   searchParams,
// }: ShopPageProps) {
//   const params = await searchParams;

//   const selectedCategory =
//     typeof params.category === "string"
//       ? params.category.trim()
//       : "";

//   const isValidCategory = PRODUCT_CATEGORIES.includes(
//     selectedCategory as (typeof PRODUCT_CATEGORIES)[number]
//   );

//   const activeCategory = isValidCategory
//     ? selectedCategory
//     : "";

//   const products = await prisma.product.findMany({
//     where: activeCategory
//       ? {
//         category: activeCategory,
//       }
//       : undefined,

//     orderBy: {
//       createdAt: "desc",
//     },
//   });

//   return (
//     <main className="w-full overflow-x-hidden bg-[#faf9f6] text-[#333333]">
//       {/* ================= SHOP HERO ================= */}
//       <section
//         className="relative flex min-h-[300px] w-full items-center justify-center overflow-hidden sm:min-h-[360px] lg:min-h-[430px]"
//         aria-labelledby="shop-hero-title"
//       >
//         {/* Background Image */}
//         <div
//           className="absolute inset-0 scale-[1.02] bg-cover bg-center"
//           style={{
//             backgroundImage:
//               "url('/images/about-banner.png')",
//           }}
//           aria-hidden="true"
//         />

//         {/* Premium Overlay */}
//         <div
//           className="absolute inset-0 bg-gradient-to-b from-black/35 via-[#1f1f1f]/55 to-[#1f1f1f]/75"
//           aria-hidden="true"
//         />

//         {/* Warm subtle tone */}
//         <div
//           className="absolute inset-0 bg-[#6c5532]/10"
//           aria-hidden="true"
//         />

//         {/* Hero Content */}
//         <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 text-center sm:px-8 lg:px-10">
//           <div className="mx-auto flex max-w-3xl flex-col items-center">
//             <span className="mb-5 inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.32em] text-[#dcc18e] sm:text-xs">
//               <span
//                 className="h-px w-8 bg-[#c9a15b]/70"
//                 aria-hidden="true"
//               />

//               Patel Furniture

//               <span
//                 className="h-px w-8 bg-[#c9a15b]/70"
//                 aria-hidden="true"
//               />
//             </span>

//             <h1
//               id="shop-hero-title"
//               className="text-[44px] font-medium leading-[1.05] tracking-[-0.025em] text-white sm:text-6xl lg:text-7xl"
//             >
//               Shop
//             </h1>

//             <div
//               className="mt-6 h-px w-14 bg-[#c9a15b]"
//               aria-hidden="true"
//             />

//             {/* Breadcrumb */}
//             <nav
//               aria-label="Breadcrumb"
//               className="mt-6"
//             >
//               <ol className="flex items-center justify-center gap-3 text-[10px] font-medium uppercase tracking-[0.24em] sm:text-[11px]">
//                 <li className="text-white/65">
//                   Home
//                 </li>

//                 <li
//                   aria-hidden="true"
//                   className="text-[#c9a15b]"
//                 >
//                   /
//                 </li>

//                 <li
//                   aria-current="page"
//                   className="text-white"
//                 >
//                   Products
//                 </li>
//               </ol>
//             </nav>
//           </div>
//         </div>

//         {/* Bottom Gold Detail */}
//         <div
//           className="absolute bottom-0 left-1/2 h-[3px] w-20 -translate-x-1/2 bg-[#c9a15b]"
//           aria-hidden="true"
//         />
//       </section>

//       {/* ================= PRODUCTS SECTION ================= */}
//       <section
//         className="relative py-16 sm:py-20 lg:py-24 xl:py-28"
//         aria-labelledby="products-section-title"
//       >
//         <div className="mx-auto w-full max-w-[1300px] px-5 sm:px-8 lg:px-10">
//           {/* Section Introduction */}
//           <div className="mx-auto mb-10 max-w-[720px] text-center sm:mb-12 lg:mb-14">
//             <div className="mb-4 flex items-center justify-center gap-3">
//               <span
//                 className="h-px w-7 bg-[#c9a15b]"
//                 aria-hidden="true"
//               />

//               <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a27d3e] sm:text-[11px]">
//                 Our Collection
//               </span>

//               <span
//                 className="h-px w-7 bg-[#c9a15b]"
//                 aria-hidden="true"
//               />
//             </div>

//             <h2
//               id="products-section-title"
//               className="text-[32px] font-medium leading-tight tracking-[-0.025em] text-[#1f1f1f] sm:text-[38px] lg:text-[44px]"
//             >
//               Discover Our
//               <span className="block text-[#5b5b5b]">
//                 Furniture Collection
//               </span>
//             </h2>

//             <p className="mx-auto mt-5 max-w-[620px] text-sm leading-7 text-[#6b6b6b] sm:text-[15px] sm:leading-7">
//               Explore thoughtfully selected furniture designed
//               to bring comfort, character, and timeless elegance
//               into your space.
//             </p>
//           </div>

//           {/* ================= CATEGORY FILTER ================= */}
//           <div className="mb-12 sm:mb-14 lg:mb-16">
//             <div className="mx-auto max-w-[1180px]">
//               <div className="relative rounded-2xl border border-[#e5dfd4] bg-white p-3 shadow-[0_10px_35px_rgba(31,31,31,0.05)] sm:p-4">
//                 {/* Category Header */}
//                 <div className="mb-3 flex items-center justify-between px-2 sm:px-3">
//                   <div>
//                     <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#a27d3e] sm:text-[10px]">
//                       Browse Collection
//                     </p>

//                     <p className="mt-1 text-xs text-[#777777]">
//                       Choose a furniture category
//                     </p>
//                   </div>

//                   <span className="hidden text-xs text-[#999999] sm:block">
//                     {activeCategory
//                       ? activeCategory
//                       : "All Products"}
//                   </span>
//                 </div>

//                 {/* Category Buttons */}
//                 <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#d8c49e]">
//                   {/* ALL PRODUCTS */}
//                   <Link
//                     href="/shop"
//                     scroll={false}
//                     className={`group relative flex shrink-0 items-center justify-center whitespace-nowrap rounded-xl border px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 sm:px-6 ${!activeCategory
//                       ? "border-[#c9a15b] bg-[#1f1f1f] text-white shadow-[0_8px_20px_rgba(31,31,31,0.15)]"
//                       : "border-[#e4ded3] bg-[#faf9f6] text-[#555555] hover:border-[#c9a15b] hover:bg-[#fffdf8] hover:text-[#a27d3e]"
//                       }`}
//                   >
//                     <span>All Products</span>

//                     {!activeCategory && (
//                       <span className="absolute -bottom-[1px] left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-[#c9a15b]" />
//                     )}
//                   </Link>

//                   {/* CATEGORIES */}
//                   {PRODUCT_CATEGORIES.map(
//                     (category) => {
//                       const isActive =
//                         activeCategory === category;

//                       return (
//                         <Link
//                           key={category}
//                           href={`/shop?category=${encodeURIComponent(
//                             category
//                           )}`}
//                           scroll={false}
//                           className={`group relative flex shrink-0 items-center justify-center whitespace-nowrap rounded-xl border px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 sm:px-6 ${isActive
//                             ? "border-[#5fb3a9] bg-[#5fb3a9] text-white shadow-[0_8px_20px_rgba(95,179,169,0.2)]"
//                             : "border-[#e4ded3] bg-[#faf9f6] text-[#555555] hover:border-[#5fb3a9] hover:bg-white hover:text-[#4d9d94]"
//                             }`}
//                         >
//                           <span>{category}</span>

//                           {isActive && (
//                             <span className="absolute -bottom-[1px] left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-[#d4a762]" />
//                           )}
//                         </Link>
//                       );
//                     }
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ================= ACTIVE CATEGORY INFO ================= */}
//           <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
//             <div>
//               <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#a27d3e] sm:text-[10px]">
//                 {activeCategory
//                   ? "Selected Category"
//                   : "Complete Collection"}
//               </p>

//               <h3 className="mt-1 text-2xl font-medium tracking-[-0.02em] text-[#1f1f1f] sm:text-3xl">
//                 {activeCategory
//                   ? activeCategory
//                   : "All Products"}
//               </h3>
//             </div>

//             <p className="text-sm text-[#777777]">
//               {products.length}{" "}
//               {products.length === 1
//                 ? "product"
//                 : "products"}
//             </p>
//           </div>

//           {/* ================= PRODUCTS GRID ================= */}
//           {products.length === 0 ? (
//             <div className="mx-auto max-w-[600px] border border-[#e5dfd4] bg-white px-6 py-16 text-center shadow-[0_8px_30px_rgba(31,31,31,0.04)]">
//               <div
//                 className="mx-auto mb-5 h-px w-10 bg-[#c9a15b]"
//                 aria-hidden="true"
//               />

//               <h3 className="text-xl font-medium text-[#1f1f1f]">
//                 {activeCategory
//                   ? `No ${activeCategory} Products`
//                   : "No Products Available"}
//               </h3>

//               <p className="mt-3 text-sm leading-7 text-[#6b6b6b]">
//                 {activeCategory
//                   ? `There are currently no products available in the ${activeCategory} category.`
//                   : "Our collection is currently being updated. Please check back soon for new furniture pieces."}
//               </p>

//               {activeCategory && (
//                 <Link
//                   href="/shop"
//                   scroll={false}
//                   className="mt-6 inline-flex items-center justify-center border border-[#c9a15b] bg-[#1f1f1f] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#5fb3a9]"
//                 >
//                   View All Products
//                 </Link>
//               )}
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
//               {products.map((product) => (
//                 <Link
//                   key={product.id}
//                   href={`/shop/${product.id}`}
//                   aria-label={`View ${product.name}`}
//                   className="
//                     group flex h-full flex-col overflow-hidden
//                     border border-[#e7e2d9]
//                     bg-white
//                     shadow-[0_8px_30px_rgba(31,31,31,0.045)]
//                     transition-all duration-500 ease-out
//                     hover:-translate-y-1.5
//                     hover:border-[#d8c49e]
//                     hover:shadow-[0_20px_50px_rgba(31,31,31,0.11)]
//                     focus:outline-none
//                     focus-visible:ring-2
//                     focus-visible:ring-[#5fb3a9]
//                     focus-visible:ring-offset-4
//                   "
//                 >
//                   {/* ================= PRODUCT IMAGE ================= */}
//                   <div className="relative overflow-hidden bg-[#efede8]">
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       loading="lazy"
//                       className="
//                         h-[235px] w-full object-cover
//                         transition-transform duration-700 ease-out
//                         group-hover:scale-[1.045]
//                         sm:h-[245px]
//                         lg:h-[260px]
//                       "
//                     />

//                     {/* Image Overlay */}
//                     <div
//                       className="
//                         pointer-events-none absolute inset-0
//                         bg-gradient-to-t from-black/20 via-transparent to-transparent
//                         opacity-40 transition-opacity duration-500
//                         group-hover:opacity-70
//                       "
//                       aria-hidden="true"
//                     />

//                     {/* Category Badge */}
//                     {product.category && (
//                       <div className="absolute left-4 top-4">
//                         <span className="inline-flex items-center border border-white/30 bg-[#1f1f1f]/75 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
//                           {product.category}
//                         </span>
//                       </div>
//                     )}

//                     {/* View Product */}
//                     <div
//                       className="
//                         absolute bottom-5 left-1/2
//                         -translate-x-1/2 translate-y-3
//                         whitespace-nowrap
//                         border border-white/40
//                         bg-[#1f1f1f]/80
//                         px-5 py-2.5
//                         text-[9px] font-semibold uppercase
//                         tracking-[0.22em] text-white
//                         opacity-0 backdrop-blur-sm
//                         transition-all duration-500
//                         group-hover:translate-y-0
//                         group-hover:opacity-100
//                       "
//                       aria-hidden="true"
//                     >
//                       View Product
//                     </div>
//                   </div>

//                   {/* ================= PRODUCT CONTENT ================= */}
//                   <div className="flex flex-1 flex-col px-6 pb-7 pt-6 text-center sm:px-7 sm:pb-8 sm:pt-7">
//                     {/* Gold Accent */}
//                     <div
//                       className="
//                         mx-auto mb-4 h-[2px] w-8 bg-[#c9a15b]
//                         transition-all duration-500
//                         group-hover:w-12
//                         group-hover:bg-[#5fb3a9]
//                       "
//                       aria-hidden="true"
//                     />

//                     {/* Product Name */}
//                     <h3
//                       className="
//                         line-clamp-2
//                         text-[19px] font-medium leading-[1.35]
//                         tracking-[-0.01em] text-[#262626]
//                         transition-colors duration-300
//                         group-hover:text-[#4c968e]
//                         sm:text-[20px]
//                       "
//                     >
//                       {product.name}
//                     </h3>

//                     {/* Price */}
//                     <div className="mt-4">
//                       <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#9a9a9a]">
//                         Price
//                       </span>

//                       <p className="mt-1 text-[19px] font-semibold tracking-wide text-[#b28b4c]">
//                         ₹ {product.price}
//                       </p>
//                     </div>

//                     {/* Bottom Divider */}
//                     <div className="mt-auto pt-6">
//                       <div
//                         className="
//                           h-px w-full bg-[#eeeae2]
//                           transition-colors duration-500
//                           group-hover:bg-[#e2d7c3]
//                         "
//                         aria-hidden="true"
//                       />
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>
//     </main>
//   );
// }


import { prisma } from "@/lib/prisma";
import Link from "next/link";

const PRODUCT_CATEGORIES = [
  "Sofa",
  "Sofa Set",
  "Bed",
  "Dining Table",
  "Wardrobe",
  "TV Unit",
  "Cabinet",
  "Office Furniture",
  "Outdoor Furniture",
  "Kids Furniture",
] as const;

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function ShopPage({
  searchParams,
}: ShopPageProps) {
  const params = await searchParams;

  const selectedCategory =
    typeof params.category === "string"
      ? params.category.trim()
      : "";

  const isValidCategory = PRODUCT_CATEGORIES.includes(
    selectedCategory as (typeof PRODUCT_CATEGORIES)[number]
  );

  const activeCategory = isValidCategory
    ? selectedCategory
    : "";

  const products = await prisma.product.findMany({
    where: activeCategory
      ? {
        category: activeCategory,
      }
      : undefined,

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="w-full overflow-x-hidden bg-[#faf9f6] text-[#333333]">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section
        className="relative flex min-h-[300px] w-full items-center justify-center overflow-hidden sm:min-h-[360px] lg:min-h-[430px]"
        aria-labelledby="shop-hero-title"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 scale-[1.02] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/about-banner.png')",
          }}
          aria-hidden="true"
        />

        {/* Main Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#1f1f1f]/50 to-[#1f1f1f]/78"
          aria-hidden="true"
        />

        {/* Warm Luxury Tone */}
        <div
          className="absolute inset-0 bg-[#6c5532]/10"
          aria-hidden="true"
        />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 text-center sm:px-8 lg:px-10">
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <span
                className="h-px w-9 bg-[#c9a15b]/80"
                aria-hidden="true"
              />

              <span className="text-[10px] font-medium uppercase tracking-[0.34em] text-[#dcc18e] sm:text-xs">
                Patel Furniture
              </span>

              <span
                className="h-px w-9 bg-[#c9a15b]/80"
                aria-hidden="true"
              />
            </div>

            {/* Heading */}
            <h1
              id="shop-hero-title"
              className="text-[44px] font-medium leading-none tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl"
            >
              Shop
            </h1>

            {/* Supporting Line */}
            <p className="mt-4 text-xs tracking-wide text-white/70 sm:text-sm">
              Curated furniture for refined spaces.
            </p>

            {/* Divider */}
            <div
              className="mt-6 h-px w-14 bg-[#c9a15b]"
              aria-hidden="true"
            />

            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="mt-6"
            >
              <ol className="flex items-center justify-center gap-3 text-[10px] font-medium uppercase tracking-[0.24em] sm:text-[11px]">
                <li className="text-white/60">
                  Home
                </li>

                <li
                  aria-hidden="true"
                  className="text-[#c9a15b]"
                >
                  /
                </li>

                <li
                  aria-current="page"
                  className="text-white"
                >
                  Products
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Bottom Gold Detail */}
        <div
          className="absolute bottom-0 left-1/2 h-[3px] w-20 -translate-x-1/2 bg-[#c9a15b]"
          aria-hidden="true"
        />
      </section>

      {/* =========================================================
          PRODUCTS SECTION
      ========================================================= */}
      <section
        className="relative py-16 sm:py-20 lg:py-24 xl:py-28"
        aria-labelledby="products-section-title"
      >
        <div className="mx-auto w-full max-w-[1300px] px-5 sm:px-8 lg:px-10">
          {/* =====================================================
              COLLECTION INTRO
          ===================================================== */}
          <div className="mx-auto mb-10 max-w-[760px] text-center sm:mb-12 lg:mb-14">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span
                className="h-px w-8 bg-[#c9a15b]"
                aria-hidden="true"
              />

              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a27d3e] sm:text-[11px]">
                Our Collection
              </span>

              <span
                className="h-px w-8 bg-[#c9a15b]"
                aria-hidden="true"
              />
            </div>

            <h2
              id="products-section-title"
              className="text-[32px] font-medium leading-[1.08] tracking-[-0.03em] text-[#1f1f1f] sm:text-[38px] lg:text-[46px]"
            >
              Discover Our
              <span className="block text-[#5b5b5b]">
                Furniture Collection
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-[620px] text-sm leading-7 text-[#6b6b6b] sm:text-[15px]">
              Explore thoughtfully selected furniture designed
              to bring comfort, character, and timeless elegance
              into your space.
            </p>
          </div>

          {/* =====================================================
              CATEGORY FILTER
          ===================================================== */}
          <div className="mb-12 sm:mb-14 lg:mb-16">
            <div className="mx-auto max-w-[1180px]">
              <div className="overflow-hidden rounded-[18px] border border-[#e5dfd4] bg-white shadow-[0_8px_30px_rgba(31,31,31,0.045)]">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#eeeae3] px-4 py-4 sm:px-5">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#a27d3e] sm:text-[10px]">
                      Browse Collection
                    </p>

                    <p className="mt-1 text-xs text-[#777777]">
                      Choose a furniture category
                    </p>
                  </div>

                  <span className="hidden border-l border-[#e5dfd4] pl-5 text-[10px] font-medium uppercase tracking-[0.16em] text-[#999999] sm:block">
                    {activeCategory
                      ? activeCategory
                      : "All Products"}
                  </span>
                </div>

                {/* Category Buttons */}
                <div className="flex gap-2 overflow-x-auto p-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#d8c49e] sm:p-4">
                  {/* All Products */}
                  <Link
                    href="/shop"
                    scroll={false}
                    className={`group relative flex shrink-0 items-center justify-center whitespace-nowrap rounded-xl border px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 sm:px-6 ${!activeCategory
                      ? "border-[#1f1f1f] bg-[#1f1f1f] text-white shadow-[0_7px_18px_rgba(31,31,31,0.14)]"
                      : "border-[#e4ded3] bg-[#faf9f6] text-[#555555] hover:border-[#c9a15b] hover:bg-[#fffdf8] hover:text-[#a27d3e]"
                      }`}
                  >
                    <span>All Products</span>

                    {!activeCategory && (
                      <span
                        className="absolute -bottom-[1px] left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-[#c9a15b]"
                        aria-hidden="true"
                      />
                    )}
                  </Link>

                  {/* Categories */}
                  {PRODUCT_CATEGORIES.map(
                    (category) => {
                      const isActive =
                        activeCategory === category;

                      return (
                        <Link
                          key={category}
                          href={`/shop?category=${encodeURIComponent(
                            category
                          )}`}
                          scroll={false}
                          className={`group relative flex shrink-0 items-center justify-center whitespace-nowrap rounded-xl border px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 sm:px-6 ${isActive
                            ? "border-[#5fb3a9] bg-[#5fb3a9] text-white shadow-[0_7px_18px_rgba(95,179,169,0.18)]"
                            : "border-[#e4ded3] bg-[#faf9f6] text-[#555555] hover:border-[#5fb3a9] hover:bg-white hover:text-[#4d9d94]"
                            }`}
                        >
                          {category}

                          {isActive && (
                            <span
                              className="absolute -bottom-[1px] left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-[#d4a762]"
                              aria-hidden="true"
                            />
                          )}
                        </Link>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              ACTIVE CATEGORY INFO
          ===================================================== */}
          <div className="mb-8 flex flex-col gap-3 border-b border-[#e5dfd4] pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#a27d3e] sm:text-[10px]">
                {activeCategory
                  ? "Selected Category"
                  : "Complete Collection"}
              </p>

              <div className="mt-1.5 flex items-center gap-3">
                <h3 className="text-2xl font-medium tracking-[-0.025em] text-[#1f1f1f] sm:text-3xl">
                  {activeCategory
                    ? activeCategory
                    : "All Products"}
                </h3>

                <span
                  className="hidden h-5 w-px bg-[#ddd7cc] sm:block"
                  aria-hidden="true"
                />

                <span className="hidden text-xs text-[#999999] sm:block">
                  Patel Furniture
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className="h-px w-6 bg-[#c9a15b]"
                aria-hidden="true"
              />

              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#777777]">
                {products.length}{" "}
                {products.length === 1
                  ? "Product"
                  : "Products"}
              </p>
            </div>
          </div>

          {/* =====================================================
              EMPTY STATE
          ===================================================== */}
          {products.length === 0 ? (
            <div className="mx-auto max-w-[600px] border border-[#e5dfd4] bg-white px-6 py-16 text-center shadow-[0_8px_30px_rgba(31,31,31,0.04)] sm:py-20">
              <div
                className="mx-auto mb-5 flex items-center justify-center gap-2"
                aria-hidden="true"
              >
                <span className="h-px w-7 bg-[#c9a15b]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#c9a15b]" />
                <span className="h-px w-7 bg-[#c9a15b]" />
              </div>

              <h3 className="text-xl font-medium tracking-[-0.02em] text-[#1f1f1f]">
                {activeCategory
                  ? `No ${activeCategory} Products`
                  : "No Products Available"}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#6b6b6b]">
                {activeCategory
                  ? `There are currently no products available in the ${activeCategory} category.`
                  : "Our collection is currently being updated. Please check back soon for new furniture pieces."}
              </p>

              {activeCategory && (
                <Link
                  href="/shop"
                  scroll={false}
                  className="mt-6 inline-flex items-center justify-center border border-[#c9a15b] bg-[#1f1f1f] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-[#5fb3a9] hover:bg-[#5fb3a9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5fb3a9] focus-visible:ring-offset-4"
                >
                  View All Products
                </Link>
              )}
            </div>
          ) : (
            /* ===================================================
               PRODUCT GRID
            =================================================== */
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-9">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${product.id}`}
                  aria-label={`View ${product.name}`}
                  className="
                    group
                    flex
                    h-full
                    flex-col
                    overflow-hidden
                    border
                    border-[#e7e2d9]
                    bg-white
                    shadow-[0_6px_25px_rgba(31,31,31,0.045)]
                    transition-all
                    duration-500
                    ease-out
                    hover:-translate-y-1
                    hover:border-[#d8c49e]
                    hover:shadow-[0_16px_40px_rgba(31,31,31,0.09)]
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#5fb3a9]
                    focus-visible:ring-offset-4
                  "
                >
                  {/* Product Image */}
                  <div className="relative overflow-hidden bg-[#efede8]">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="
                        h-[255px]
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-[1.045]
                        sm:h-[265px]
                        lg:h-[285px]
                      "
                    />

                    {/* Image Overlay */}
                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/25
                        via-transparent
                        to-transparent
                        opacity-45
                        transition-opacity
                        duration-500
                        group-hover:opacity-70
                      "
                      aria-hidden="true"
                    />

                    {/* Category Badge */}
                    {product.category && (
                      <div className="absolute left-4 top-4">
                        <span className="inline-flex items-center rounded-full border border-white/30 bg-[#1f1f1f]/65 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md sm:text-[9px]">
                          {product.category}
                        </span>
                      </div>
                    )}

                    {/* View Product */}
                    <div
                      className="
                        absolute
                        bottom-5
                        left-1/2
                        -translate-x-1/2
                        translate-y-3
                        whitespace-nowrap
                        rounded-full
                        border
                        border-white/35
                        bg-[#1f1f1f]/80
                        px-5
                        py-2.5
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-white
                        opacity-0
                        backdrop-blur-sm
                        transition-all
                        duration-400
                        group-hover:translate-y-0
                        group-hover:opacity-100
                      "
                      aria-hidden="true"
                    >
                      View Product
                    </div>
                  </div>

                  {/* Product Content */}
                  <div className="flex flex-1 flex-col px-6 pb-7 pt-6 text-center sm:px-7 sm:pb-8 sm:pt-7">
                    {/* Accent */}
                    <div
                      className="
                        mx-auto
                        mb-4
                        h-[2px]
                        w-8
                        bg-[#c9a15b]
                        transition-all
                        duration-500
                        group-hover:w-12
                        group-hover:bg-[#5fb3a9]
                      "
                      aria-hidden="true"
                    />

                    {/* Small Category */}
                    {product.category && (
                      <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#999999]">
                        {product.category}
                      </p>
                    )}

                    {/* Product Name */}
                    <h3
                      className="
                        line-clamp-2
                        min-h-[52px]
                        text-[19px]
                        font-medium
                        leading-[1.35]
                        tracking-[-0.015em]
                        text-[#262626]
                        transition-colors
                        duration-300
                        group-hover:text-[#4c968e]
                        sm:text-[20px]
                      "
                    >
                      {product.name}
                    </h3>

                    {/* Price */}
                    <div className="mt-4">
                      <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#9a9a9a]">
                        Price
                      </span>

                      <p className="mt-1 text-[19px] font-semibold tracking-wide text-[#b28b4c]">
                        ₹ {product.price}
                      </p>
                    </div>

                    {/* Bottom Divider */}
                    <div className="mt-auto pt-6">
                      <div
                        className="
                          h-px
                          w-full
                          bg-[#eeeae2]
                          transition-colors
                          duration-500
                          group-hover:bg-[#e2d7c3]
                        "
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}