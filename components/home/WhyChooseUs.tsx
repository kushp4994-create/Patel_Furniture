// "use client";

// export default function WhyChooseUs() {
//   return (
//     <section className="w-full bg-[#ffffff] py-[120px]">
//       <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-[80px] items-center">

//         {/* LEFT SIDE IMAGES */}
//         <div className="relative flex justify-center md:justify-start">

//           {/* BACK IMAGE */}
//           <img
//             src="/images/i1.png"
//             className="w-[450px] h-[590px]"
//           />

//         </div>

//         {/* RIGHT CONTENT */}
//         <div>

//           <h2 className="text-[40px] font-semibold text-gray-800 mb-4">
//             Why You Should Choose Us?
//           </h2>

//           {/* Small underline */}
//           <div className="w-[40px] h-[3px] bg-[#d4a762] mb-6"></div>

//           <p className="text-gray-600 leading-[28px] mb-6">
//             Drumstick pastrami picanha kevin, pork chop shoulder andouille ground
//             round pancetta fatback.
//           </p>

//           <p className="text-gray-500 leading-[28px] mb-8">
//             Chuck pastrami shank prosciutto, turkey salami capicola venison
//             tri-tip jowl. Sausage cupim beef, meatball landjaeger ball tip
//             kielbasa bacon jerky porchetta venison tri-tip cow ham shank.
//           </p>

//           {/* FEATURES */}
//           <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-10 text-gray-600">

//             <div>✔ Pleasant Staff</div>
//             <div>✔ Best Quality</div>
//             <div>✔ Convenient Location</div>
//             <div>✔ Individual Design</div>
//             <div>✔ Non-standard Offers</div>
//             <div>✔ Very Fast Delivery</div>

//           </div>

//           {/* BUTTON */}
//           <button className="bg-[#d4a762] px-10 py-4 text-white font-medium hover:bg-[#c3944f] transition text-white px-8 py-3 font-semibold cursor-pointer hover:text-black transition-all duration-300">
//             READ MORE
//           </button>

//         </div>

//       </div>
//     </section>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    title: "Premium Quality",
    description: "Crafted with carefully selected materials.",
  },
  {
    title: "Thoughtful Design",
    description: "Designed for modern and comfortable living.",
  },
  {
    title: "Fast Delivery",
    description: "Reliable delivery without unnecessary delays.",
  },
  {
    title: "Expert Support",
    description: "Helpful guidance whenever you need it.",
  },
  {
    title: "Custom Solutions",
    description: "Furniture that fits your space and lifestyle.",
  },
  {
    title: "Customer Satisfaction",
    description: "Your comfort and experience come first.",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#faf9f6] py-20 sm:py-24 lg:py-32"
      aria-labelledby="why-choose-us-heading"
    >
      {/* =====================================================
          SUBTLE BACKGROUND DECORATION
      ====================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 hidden h-[420px] w-[420px] rounded-full border border-[#d4a762]/10 lg:block"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-20 top-20 hidden h-[260px] w-[260px] rounded-full border border-[#d4a762]/10 lg:block"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20 xl:gap-24">
          {/* =================================================
              LEFT — IMAGE COMPOSITION
          ================================================== */}
          <div
            className={`relative mx-auto w-full max-w-[520px] transition-all duration-1000 ease-out ${isVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-10 opacity-0"
              } motion-reduce:translate-x-0 motion-reduce:opacity-100`}
          >
            {/* Decorative gold frame */}
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -left-4 h-full w-full border border-[#d4a762] sm:-bottom-5 sm:-left-5"
            />

            {/* Main image container */}
            <div className="group relative aspect-[4/5] w-full overflow-hidden bg-[#ebe8e1]">
              <img
                src="/images/i1.png"
                alt="Elegant furniture and interior design"
                className="h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.035] motion-reduce:transition-none"
              />

              {/* Soft image overlay */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
              />

              {/* Small corner detail */}
              <div
                aria-hidden="true"
                className="absolute right-5 top-5 h-10 w-10 border-r border-t border-white/60 sm:right-7 sm:top-7 sm:h-12 sm:w-12"
              />
            </div>

            {/* =================================================
                EXPERIENCE BADGE
            ================================================== */}
            <div className="absolute -bottom-7 left-5 z-10 sm:-bottom-8 sm:left-8">
              <div className="border border-white/80 bg-[#2f312f] px-5 py-4 text-white shadow-xl shadow-black/10 sm:px-7 sm:py-5">
                <div className="flex items-end gap-3">
                  <span className="font-serif text-3xl font-medium leading-none text-[#d4a762] sm:text-4xl">
                    20+
                  </span>

                  <div className="pb-0.5">
                    <p className="text-[9px] font-semibold tracking-[0.2em] text-white/90 sm:text-[10px]">
                      YEARS
                    </p>
                    <p className="text-[9px] font-semibold tracking-[0.2em] text-white/60 sm:text-[10px]">
                      OF EXPERIENCE
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Small decorative square */}
            <div
              aria-hidden="true"
              className="absolute -right-3 -top-3 h-8 w-8 border border-[#d4a762] sm:-right-5 sm:-top-5 sm:h-10 sm:w-10"
            />
          </div>

          {/* =================================================
              RIGHT — CONTENT
          ================================================== */}
          <div className="pt-8 lg:pt-0">
            {/* Eyebrow */}
            <div
              className={`flex items-center gap-3 transition-all delay-100 duration-700 ease-out ${isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0"
                } motion-reduce:translate-x-0 motion-reduce:opacity-100`}
            >
              <span className="h-px w-10 bg-[#d4a762]" />

              <span className="text-[10px] font-semibold tracking-[0.28em] text-[#a47a3c] sm:text-xs">
                WHY CHOOSE US
              </span>
            </div>

            {/* Heading */}
            <h2
              id="why-choose-us-heading"
              className={`mt-5 max-w-2xl font-serif text-3xl font-medium leading-[1.12] tracking-[-0.025em] text-[#292b29] transition-all delay-150 duration-800 ease-out sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[58px] ${isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0"
                } motion-reduce:translate-x-0 motion-reduce:opacity-100`}
            >
              We Create Comfort That Feels Like Home
            </h2>

            {/* Gold accent */}
            <div
              className={`mt-6 flex items-center gap-2 transition-all delay-200 duration-700 ${isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0"
                } motion-reduce:translate-x-0 motion-reduce:opacity-100`}
            >
              <span className="h-[2px] w-12 bg-[#d4a762]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#d4a762]" />
            </div>

            {/* Description */}
            <div
              className={`mt-7 max-w-2xl space-y-4 text-[15px] leading-7 text-[#6b6c68] transition-all delay-250 duration-700 ease-out sm:text-base sm:leading-8 ${isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0"
                } motion-reduce:translate-x-0 motion-reduce:opacity-100`}
            >
              <p>
                We believe your home should reflect your personality, comfort,
                and sense of style. That&apos;s why we combine thoughtful
                design, quality craftsmanship, and carefully selected
                materials to create furniture made for modern living.
              </p>

              <p className="text-[#777873]">
                From timeless essentials to distinctive statement pieces, every
                detail is designed to bring lasting comfort and character to
                your space.
              </p>
            </div>

            {/* =================================================
                FEATURES
            ================================================== */}
            <div
              className={`mt-9 grid grid-cols-1 gap-3 transition-all delay-300 duration-700 sm:grid-cols-2 ${isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
                } motion-reduce:translate-y-0 motion-reduce:opacity-100`}
            >
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`group border border-[#e7e3db] bg-white/70 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#d4a762]/50 hover:bg-white hover:shadow-[0_12px_35px_rgba(55,45,30,0.07)] motion-reduce:hover:translate-y-0 ${isVisible ? "opacity-100" : "opacity-0"
                    }`}
                  style={{
                    transitionDelay: `${350 + index * 70}ms`,
                  }}
                >
                  <div className="flex items-start gap-3.5">
                    {/* Gold icon */}
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d4a762]/40 bg-[#d4a762]/10 transition-all duration-300 group-hover:border-[#d4a762] group-hover:bg-[#d4a762] group-hover:text-white"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#d4a762] transition-colors duration-300 group-hover:bg-white" />
                    </span>

                    <div>
                      <h3 className="text-sm font-semibold text-[#30322f]">
                        {feature.title}
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-[#858680]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* =================================================
                CTA
            ================================================== */}
            <div
              className={`mt-9 transition-all delay-[750ms] duration-700 ease-out ${isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
                } motion-reduce:translate-y-0 motion-reduce:opacity-100`}
            >
              <button
                type="button"
                className="group inline-flex min-h-[54px] items-center gap-4 bg-[#d4a762] px-7 text-sm font-semibold tracking-[0.08em] text-[#272822] shadow-[0_10px_25px_rgba(140,100,45,0.12)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#c69750] hover:shadow-[0_16px_32px_rgba(140,100,45,0.18)] focus:outline-none focus:ring-2 focus:ring-[#d4a762] focus:ring-offset-2 focus:ring-offset-[#faf9f6] motion-reduce:hover:translate-y-0 sm:px-8"
              >
                <span>DISCOVER MORE</span>

                <span
                  aria-hidden="true"
                  className="text-lg transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          REDUCED MOTION
      ====================================================== */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}