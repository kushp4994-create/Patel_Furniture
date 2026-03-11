import Image from "next/image";
import Testimonials from "@/components/home/Testimonials";
import Products from "@/components/home/Products";

export default function AboutPage() {
  return (
    <>
      {/* ================= BANNER SECTION ================= */}
      <section className="relative w-full h-[300px] flex items-center justify-center">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/about-banner.png')",
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative text-center text-white">
          <h1 className="text-5xl font-semibold text-[#e0b15c] mb-4">
            About
          </h1>

          <p className="text-sm tracking-widest">
            HOME &nbsp; / &nbsp; ABOUT
          </p>
        </div>

      </section>


      {/* ================= WHY CHOOSE US SECTION ================= */}
      <section className="bg-[#f5f5f5] py-[120px]">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE IMAGE */}
          <div className="flex justify-center">
            <Image
              src="/images/i1.png"
              alt="Why Choose Us"
              width={500}
              height={950}
              // className="shadow-xl"
            />
          </div>

          {/* RIGHT SIDE CONTENT */}
          <div>
            <h2 className="text-[42px] font-semi text-gray-800 mb-3 -mt-10">
              Why You Should Choose Us?
            </h2>

            <div className="w-[40px] h-[3px] bg-[#d4a762] mb-6"></div>

            <p className="text-gray-900 leading-[28px] mb-3">
              Drumstick pastrami picanha kevin, pork chop shoulder andouille ground round pancetta fatback.
            </p>
            <p className="text-gray-600 leading-[28px] mb-10 ">

Chuck pastrami shank prosciutto, turkey salami capicola venison tri-tip jowl. Sausage cupim beef, meatball landjaeger ball tip kielbasa bacon jerky porchetta   venison tri-tip cow ham shank. Cupim bresaola drumstick, pork belly biltong shoulder strip steak frankfurter bacon short loin. Pork loin chicken ground round, ham hock meatball drumstick t-bone. Pork loin cupim pig leberkas, shoulder pork meatloaf ham. Salami turkey hamburger.</p>

            <div className="grid grid-cols-2 gap-y-4 gap-x-10 text-gray-700">

              <div className="flex items-center gap-3">
                <span className="text-[#5fb3a9]">▶</span>
                Pleasant Staff
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[#5fb3a9]">▶</span>
                Best Quality
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[#5fb3a9]">▶</span>
                Convenient Location
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[#5fb3a9]">▶</span>
                Individual Design
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[#5fb3a9]">▶</span>
                Non-standard Offers
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[#5fb3a9]">▶</span>
                Very Fast Delivery
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#5fb3a9]">▶</span>
                Bresaola hamburger
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[#5fb3a9]">▶</span>
                Pork tenderloin
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[#5fb3a9]">▶</span>
                Cupim short loin fatback
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[#5fb3a9]">▶</span>
                Kielbasa boudin biltong
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* TESTIMONIALS SECTION ADDED HERE */}
      <Testimonials />
      {/* PRODUCTS SECTION ADDED HERE */ }
      <Products />
    </>
  );
}