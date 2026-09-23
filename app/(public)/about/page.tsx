// import Image from "next/image";
// import Testimonials from "@/components/home/Testimonials";
// import Products from "@/components/home/Products";

// export default function AboutPage() {
//   return (
//     <>
//       {/* ================= BANNER SECTION ================= */}
//       <section className="relative w-full h-[300px] flex items-center justify-center">

//         {/* Background Image */}
//         <div
//           className="absolute inset-0 bg-cover bg-center"
//           style={{
//             backgroundImage: "url('/images/about-banner.png')",
//           }}
//         />

//         {/* Dark Overlay */}
//         <div className="absolute inset-0 bg-black/50" />

//         {/* Content */}
//         <div className="relative text-center text-white">
//           <h1 className="text-5xl font-semibold text-[#e0b15c] mb-4">
//             About
//           </h1>

//           <p className="text-sm tracking-widest">
//             HOME &nbsp; / &nbsp; ABOUT
//           </p>
//         </div>

//       </section>


//       {/* ================= WHY CHOOSE US SECTION ================= */}
//       <section className="bg-[#f5f5f5] py-[120px]">
//         <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

//           {/* LEFT SIDE IMAGE */}
//           <div className="flex justify-center">
//             <Image
//               src="/images/i1.png"
//               alt="Why Choose Us"
//               width={500}
//               height={950}
//               // className="shadow-xl"
//             />
//           </div>

//           {/* RIGHT SIDE CONTENT */}
//           <div>
//             <h2 className="text-[42px] font-semi text-gray-800 mb-3 -mt-10">
//               Why You Should Choose Us?
//             </h2>

//             <div className="w-[40px] h-[3px] bg-[#d4a762] mb-6"></div>

//             <p className="text-gray-900 leading-[28px] mb-3">
//               Drumstick pastrami picanha kevin, pork chop shoulder andouille ground round pancetta fatback.
//             </p>
//             <p className="text-gray-600 leading-[28px] mb-10 ">

// Chuck pastrami shank prosciutto, turkey salami capicola venison tri-tip jowl. Sausage cupim beef, meatball landjaeger ball tip kielbasa bacon jerky porchetta   venison tri-tip cow ham shank. Cupim bresaola drumstick, pork belly biltong shoulder strip steak frankfurter bacon short loin. Pork loin chicken ground round, ham hock meatball drumstick t-bone. Pork loin cupim pig leberkas, shoulder pork meatloaf ham. Salami turkey hamburger.</p>

//             <div className="grid grid-cols-2 gap-y-4 gap-x-10 text-gray-700">

//               <div className="flex items-center gap-3">
//                 <span className="text-[#5fb3a9]">▶</span>
//                 Pleasant Staff
//               </div>

//               <div className="flex items-center gap-3">
//                 <span className="text-[#5fb3a9]">▶</span>
//                 Best Quality
//               </div>

//               <div className="flex items-center gap-3">
//                 <span className="text-[#5fb3a9]">▶</span>
//                 Convenient Location
//               </div>

//               <div className="flex items-center gap-3">
//                 <span className="text-[#5fb3a9]">▶</span>
//                 Customized Design
//               </div>

//               <div className="flex items-center gap-3">
//                 <span className="text-[#5fb3a9]">▶</span>
//                 Non-standard Offers
//               </div>

//               <div className="flex items-center gap-3">
//                 <span className="text-[#5fb3a9]">▶</span>
//                 Very Fast Delivery
//               </div>
//               <div className="flex items-center gap-3">
//                 <span className="text-[#5fb3a9]">▶</span>
//                 Bresaola hamburger
//               </div>

//               <div className="flex items-center gap-3">
//                 <span className="text-[#5fb3a9]">▶</span>
//                 Pork tenderloin
//               </div>

//               <div className="flex items-center gap-3">
//                 <span className="text-[#5fb3a9]">▶</span>
//                 Cupim short loin fatback
//               </div>

//               <div className="flex items-center gap-3">
//                 <span className="text-[#5fb3a9]">▶</span>
//                 Kielbasa boudin biltong
//               </div>

//             </div>
//           </div>

//         </div>
//       </section>

//       {/* TESTIMONIALS SECTION ADDED HERE */}
//       <Testimonials />
//       {/* PRODUCTS SECTION ADDED HERE */ }
//       <Products />
//     </>
//   );
// }



import Image from "next/image";
import Testimonials from "@/components/home/Testimonials";
import Products from "@/components/home/Products";

const features = [
  {
    title: "Pleasant Staff",
    description: "Warm, attentive service that makes every visit comfortable.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-5 w-5"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Best Quality",
    description: "Carefully selected ingredients and uncompromising standards.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-5 w-5"
      >
        <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9L12 3Z" />
      </svg>
    ),
  },
  {
    title: "Convenient Location",
    description: "A welcoming space designed to make every visit effortless.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-5 w-5"
      >
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Customized Service",
    description: "Thoughtful options tailored around your needs and preferences.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-5 w-5"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z" />
      </svg>
    ),
  },
  {
    title: "Fresh Ingredients",
    description: "Fresh produce and quality ingredients are at the heart of our menu.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-5 w-5"
      >
        <path d="M12 21c4.5-3 7-6.8 7-11.5C15.5 9.5 12 11 12 15c0-4-2.5-6-7-6 0 5.2 2.5 9 7 12Z" />
        <path d="M12 21c0-4.5 1-8 4-11" />
      </svg>
    ),
  },
  {
    title: "Expert Chefs",
    description: "Passion, experience and attention to detail in every dish.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-5 w-5"
      >
        <path d="M7 10V5a2 2 0 1 1 4 0v5" />
        <path d="M11 10V4a2 2 0 1 1 4 0v6" />
        <path d="M15 10V6a2 2 0 1 1 4 0v7c0 5-3 8-8 8H9c-3 0-5-2-5-5v-5a2 2 0 1 1 4 0v-1" />
      </svg>
    ),
  },
  {
    title: "Fast Delivery",
    description: "Enjoy your favourites with dependable and timely delivery.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-5 w-5"
      >
        <path d="M3 7h11v10H3z" />
        <path d="M14 10h4l3 3v4h-7z" />
        <circle cx="7" cy="19" r="2" />
        <circle cx="18" cy="19" r="2" />
      </svg>
    ),
  },
  {
    title: "Hygienic Preparation",
    description: "Clean, careful preparation with quality and hygiene in mind.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-5 w-5"
      >
        <path d="M12 3 5 6v5c0 4.8 2.9 8.7 7 10 4.1-1.3 7-5.2 7-10V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

const stats = [
  { number: "10+", label: "Years Experience" },
  { number: "50+", label: "Menu Items" },
  { number: "5K+", label: "Happy Customers" },
  { number: "25+", label: "Expert Staff" },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-white text-[#1F1F1F]">
      {/* =========================================================
          HERO
      ========================================================= */}
      <header className="relative flex min-h-[420px] items-center justify-center overflow-hidden sm:min-h-[460px] lg:min-h-[500px]">
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-[3000ms]"
          style={{
            backgroundImage: "url('/images/about-banner.png')",
          }}
        />

        {/* Premium gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/55 to-black/75" />

        {/* Subtle warm overlay */}
        <div className="absolute inset-0 bg-[#1F1F1F]/10" />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center">
          <div className="animate-[fadeInUp_0.8s_ease-out]">
            <span className="mb-5 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#D4A762]">
              <span className="h-px w-8 bg-[#D4A762]" />
              Our Story
              <span className="h-px w-8 bg-[#D4A762]" />
            </span>

            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              About Us
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
              Discover the passion, craftsmanship and dedication behind every
              experience we create.
            </p>

            <div className="mx-auto mt-7 flex items-center justify-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-white/70">
              <span>Home</span>
              <span className="text-[#D4A762]">/</span>
              <span className="text-[#D4A762]">About</span>
            </div>
          </div>
        </div>

        {/* Decorative bottom curve */}
        <div className="absolute bottom-0 left-0 h-12 w-full bg-gradient-to-t from-white/10 to-transparent" />
      </header>

      {/* =========================================================
          WHY CHOOSE US
      ========================================================= */}
      <section className="bg-[#F8F5EF] py-20 sm:py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1320px] items-center gap-14 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* IMAGE */}
          <div className="relative mx-auto w-full max-w-[540px] lg:mx-0">
            {/* Decorative frame */}
            <div className="absolute -bottom-4 -left-4 h-32 w-32 border-b-2 border-l-2 border-[#D4A762]/70" />

            <div className="absolute -right-4 -top-4 h-32 w-32 border-r-2 border-t-2 border-[#D4A762]/70" />

            {/* Teal decorative shape */}
            <div className="absolute -bottom-6 right-8 h-20 w-20 rounded-full bg-[#5FB3A9]/15 blur-xl" />

            <div className="relative overflow-hidden rounded-[28px] bg-white p-3 shadow-[0_25px_70px_rgba(31,31,31,0.12)]">
              <div className="overflow-hidden rounded-[20px]">
                <Image
                  src="/images/i1.png"
                  alt="Our restaurant and food experience"
                  width={700}
                  height={850}
                  className="h-auto w-full object-contain transition-transform duration-700 hover:scale-[1.025]"
                  priority
                />
              </div>
            </div>

            {/* Small experience badge */}
            <div className="absolute -bottom-7 left-6 hidden rounded-2xl bg-[#1F1F1F] px-6 py-4 shadow-xl sm:block">
              <p className="text-2xl font-semibold text-[#D4A762]">10+</p>
              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/65">
                Years of Passion
              </p>
            </div>
          </div>

          {/* CONTENT */}
          <div>
            <span className="mb-4 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#5FB3A9]">
              <span className="h-px w-9 bg-[#D4A762]" />
              Why Choose Us
            </span>

            <h2 className="max-w-2xl text-3xl font-semibold leading-[1.15] tracking-tight text-[#1F1F1F] sm:text-4xl lg:text-[48px]">
              Experience Quality,
              <span className="block text-[#8D6B39]">
                Crafted With Passion
              </span>
            </h2>

            <div className="mt-6 h-[2px] w-14 bg-[#D4A762]" />

            <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-[#3C3C3C]">
              We believe great food is more than just a meal — it is an
              experience built around quality, care and memorable moments.
            </p>

            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[#6B6B6B]">
              From carefully selected ingredients to thoughtful preparation,
              every detail matters. Our team combines quality ingredients,
              skilled craftsmanship and warm hospitality to create an
              experience you will want to return to.
            </p>

            {/* Features */}
            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group flex gap-4 rounded-2xl border border-[#E5DFD3] bg-white/70 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A762]/50 hover:bg-white hover:shadow-[0_15px_35px_rgba(31,31,31,0.07)]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D4A762]/10 text-[#8D6B39] transition-colors duration-300 group-hover:bg-[#D4A762] group-hover:text-[#1F1F1F]">
                    {feature.icon}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-[#1F1F1F]">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-[#777]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          STATS
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#1F1F1F] py-16 sm:py-20">
        {/* Decorative background elements */}
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#5FB3A9]/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#D4A762]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1200px] grid-cols-2 divide-x divide-white/10 px-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="px-4 py-4 text-center sm:px-8"
            >
              <div className="text-3xl font-semibold tracking-tight text-[#D4A762] sm:text-4xl lg:text-5xl">
                {stat.number}
              </div>
              <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 sm:text-xs">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          OUR STORY
      ========================================================= */}
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-6 sm:px-8 lg:grid-cols-2 lg:gap-20">
          {/* Story content */}
          <div className="order-2 lg:order-1">
            <span className="mb-4 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#5FB3A9]">
              <span className="h-px w-9 bg-[#D4A762]" />
              Our Story
            </span>

            <h2 className="text-3xl font-semibold leading-tight text-[#1F1F1F] sm:text-4xl lg:text-[46px]">
              Built Around
              <span className="block text-[#8D6B39]">Good Food & Good Moments</span>
            </h2>

            <div className="mt-6 h-[2px] w-14 bg-[#D4A762]" />

            <div className="mt-7 space-y-5 text-[15px] leading-7 text-[#6B6B6B]">
              <p>
                What started with a simple belief in quality has grown into a
                place where people can come together, enjoy thoughtfully
                prepared food and create lasting memories.
              </p>

              <p>
                We focus on the details that make an experience special —
                from the ingredients we choose and the way our dishes are
                prepared to the hospitality our guests receive.
              </p>

              <p>
                Today, our goal remains simple: create food and experiences
                that feel genuine, memorable and worth coming back for.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#products"
                className="inline-flex items-center justify-center rounded-lg bg-[#D4A762] px-6 py-3 text-sm font-semibold text-[#1F1F1F] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c79a55] hover:shadow-lg"
              >
                Explore Our Menu
                <svg
                  className="ml-2 h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </a>

              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-[#D8D2C8] bg-white px-6 py-3 text-sm font-semibold text-[#1F1F1F] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#5FB3A9] hover:text-[#5FB3A9]"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Story visual */}
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-[500px]">
              <div className="absolute -right-5 -top-5 h-28 w-28 border-r-2 border-t-2 border-[#D4A762]" />

              <div className="relative rounded-[28px] bg-[#F8F5EF] p-5 sm:p-7">
                <div className="rounded-[20px] border border-[#E5DFD3] bg-white p-7 sm:p-10">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5FB3A9]/10 text-[#5FB3A9]">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        className="h-7 w-7"
                      >
                        <path d="M12 3v18" />
                        <path d="M7 7c0-2.2 2-4 5-4s5 1.8 5 4" />
                        <path d="M7 7c0 2.2 2 4 5 4s5-1.8 5-4" />
                        <path d="M7 14c0-2.2 2-4 5-4s5 1.8 5 4" />
                        <path d="M7 14c0 2.2 2 4 5 4s5-1.8 5-4" />
                      </svg>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A762]">
                        Our Philosophy
                      </p>
                      <h3 className="mt-1 text-xl font-semibold text-[#1F1F1F]">
                        Quality in Every Detail
                      </h3>
                    </div>
                  </div>

                  <div className="my-8 h-px bg-[#E8E2D8]" />

                  <div className="space-y-7">
                    <div className="flex gap-4">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#D4A762]" />
                      <div>
                        <h4 className="font-semibold text-[#1F1F1F]">
                          Carefully Selected
                        </h4>
                        <p className="mt-1 text-sm leading-6 text-[#777]">
                          Ingredients chosen with quality and freshness in
                          mind.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#5FB3A9]" />
                      <div>
                        <h4 className="font-semibold text-[#1F1F1F]">
                          Thoughtfully Crafted
                        </h4>
                        <p className="mt-1 text-sm leading-6 text-[#777]">
                          Every dish receives care, attention and passion.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#D4A762]" />
                      <div>
                        <h4 className="font-semibold text-[#1F1F1F]">
                          Made to Remember
                        </h4>
                        <p className="mt-1 text-sm leading-6 text-[#777]">
                          Creating experiences that keep guests coming back.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 h-24 w-24 border-b-2 border-l-2 border-[#5FB3A9]/60" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="px-6 pb-20 sm:px-8 sm:pb-24">
        <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[28px] bg-[#1F1F1F] px-7 py-14 text-center sm:px-12 sm:py-16">
          <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-[#D4A762]/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-[#5FB3A9]/10 blur-3xl" />

          <div className="relative">
            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D4A762]">
              Your Next Experience
            </span>

            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              Ready to Experience Something Special?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
              Discover our menu and experience the quality, care and passion
              behind everything we create.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#products"
                className="inline-flex items-center justify-center rounded-lg bg-[#D4A762] px-7 py-3.5 text-sm font-semibold text-[#1F1F1F] transition-all duration-300 hover:-translate-y-1 hover:bg-[#c79a55] hover:shadow-xl"
              >
                Explore Our Menu
              </a>

              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TESTIMONIALS
      ========================================================= */}
      <section className="bg-[#F8F5EF]">
        <Testimonials />
      </section>

      {/* =========================================================
          PRODUCTS
      ========================================================= */}
      <section id="products" className="bg-white">
        <Products />
      </section>
    </main>
  );
}