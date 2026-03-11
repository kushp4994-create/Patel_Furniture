import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      {/* ================= BANNER ================= */}
      <section className="relative w-full h-[350px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/about-banner.png')" }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative text-center text-white">
          <h1 className="text-5xl font-semibold text-[#e0b15c] mb-4">
            Shop
          </h1>

          <p className="text-sm tracking-widest uppercase">
            HOME &nbsp; / &nbsp; PRODUCTS
          </p>
        </div>
      </section>

      {/* ================= PRODUCTS GRID ================= */}
      <section className="py-[120px] bg-[#f5f5f5]">
        <div className="max-w-[1300px] mx-auto px-6">

          {products.length === 0 ? (
            <p className="text-center text-gray-500">
              No products available.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${product.id}`}
                  className="bg-white shadow-sm hover:shadow-xl transition duration-500 block"
                >
                  <div className="overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-[250px] object-cover hover:scale-105 transition duration-500"
                    />
                  </div>

                  <div className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-[#5fb3a9] transition">
                      {product.name}
                    </h3>

                    <p className="text-[#e0b15c] font-bold text-lg">
                      ₹ {product.price}
                    </p>
                  </div>
                </Link>
              ))}

            </div>
          )}

        </div>
      </section>
    </>
  );
}