// export default function ServicesPage() {
//   const services = [
//     {
//       image: "/images/s1.png",
//       title: "Individual Design",
//       desc: "Short ribs tri-tip drumstick ribeye turducken pastrami frankfurter prosciutto shankle pork sausage shoulder.",
//     },
//     {
//       image: "/images/s2.png",
//       title: "Fast Delivery",
//       desc: "Picanha ham short loin, t-bone strip steak ball tip chicken shankle venison doner. Alcatra shank shankle.",
//     },
//     {
//       image: "/images/s3.png",
//       title: "Free Assembly",
//       desc: "Corned beef drumstick andouille venison turducken alcatra. Drumstick flank short loin, pancetta salami spare ribs.",
//     },
//     {
//       image: "/images/s4.png",
//       title: "Service B2B",
//       desc: "Ball tip drumstick rump, flank landjaeger short ribs filet mignon cow corned beef ribeye burgdoggen porchetta ham.",
//     },
//     {
//       image: "/images/s5.png",
//       title: "Warranty 5 years",
//       desc: "Biltong ham andouille corned beef salami spare ribs, shank pork beef ham hock drumstick turducken flank chuck.",
//     },
//     {
//       image: "/images/s6.png",
//       title: "Credit",
//       desc: "Andouille fatback pig burgdoggen. Tri-tip kevin sausage, jowl hamburger bacon cow turducken beef.",
//     },
//   ];

//   return (
//     <>
//       {/* ================= SERVICES BANNER ================= */}
//       <section className="relative w-full h-[350px] flex items-center justify-center">
//         <div
//           className="absolute inset-0 bg-cover bg-center"
//           style={{ backgroundImage: "url('/images/about-banner.png')" }}
//         />
//         <div className="absolute inset-0 bg-black/60" />

//         <div className="relative text-center text-white">
//           <h1 className="text-5xl font-semibold text-[#e0b15c] mb-4">
//             Services
//           </h1>

//           <p className="text-sm tracking-widest uppercase">
//             HOME &nbsp; / &nbsp; SERVICES
//           </p>
//         </div>
//       </section>

//       {/* ================= SERVICES GRID ================= */}
//       <section className="py-[120px] bg-[#fffff]">
//         <div className="max-w-[1200px] mx-auto px-6">

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

//             {services.map((service, i) => (
//               <div
//                 key={i}
//                 className="bg-[#f5f5f5] shadow-sm hover:shadow-xl transition duration-500 group"
//               >

//                 {/* IMAGE */}
//                 <div className="overflow-hidden">
//                   <img
//                     src={service.image}
//                     alt={service.title}
//                     className="w-full h-[220px] object-cover transition duration-500"
//                   />
//                 </div>

//                 {/* CONTENT */}
//                 <div className="p-8 text-center">

//                   <h3 className="text-[35px] font-semi text-gray-800 mb-6 transition duration-300 group-hover:text-[#5fb3a9]">
//                     {service.title}
//                   </h3>

//                   <p className="text-gray-600 text-[15px] leading-7">
//                     {service.desc}
//                   </p>

//                 </div>

//               </div>
//             ))}

//           </div>

//         </div>
//       </section>
//     </>
//   );
// }



import Image from "next/image";
import Link from "next/link";

const services = [
  {
    number: "01",
    image: "/images/s1.png",
    title: "Individual Design",
    desc: "Create a solution tailored to your preferences, space and individual requirements with our personalized design service.",
  },
  {
    number: "02",
    image: "/images/s2.png",
    title: "Fast Delivery",
    desc: "Enjoy a reliable and efficient delivery experience with careful handling and timely service.",
  },
  {
    number: "03",
    image: "/images/s3.png",
    title: "Free Assembly",
    desc: "Our team provides convenient assembly support so your product is ready to use with minimal effort.",
  },
  {
    number: "04",
    image: "/images/s4.png",
    title: "Service B2B",
    desc: "Flexible business solutions designed to support companies, projects and professional requirements.",
  },
  {
    number: "05",
    image: "/images/s5.png",
    title: "Warranty 5 Years",
    desc: "Enjoy long-term peace of mind with reliable warranty coverage and dedicated after-sales support.",
  },
  {
    number: "06",
    image: "/images/s6.png",
    title: "Credit",
    desc: "Flexible payment options designed to make your purchase experience simple and convenient.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Tell Us What You Need",
    description:
      "Share your requirements, preferences and expectations with our team.",
  },
  {
    number: "02",
    title: "We Create the Solution",
    description:
      "We carefully plan and prepare a solution that fits your specific needs.",
  },
  {
    number: "03",
    title: "We Deliver & Support",
    description:
      "From delivery to after-sales support, we stay involved throughout the process.",
  },
  {
    number: "04",
    title: "Enjoy the Result",
    description:
      "Experience a solution designed around quality, convenience and satisfaction.",
  },
];

const benefits = [
  "Personalized Approach",
  "Reliable Support",
  "Quality Guaranteed",
];

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={`h-4 w-4 ${className}`}
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export default function ServicesPage() {
  return (
    <main className="overflow-hidden bg-white text-[#1F1F1F]">
      {/* =========================================================
          HERO
      ========================================================= */}
      <header className="relative flex min-h-[360px] items-center justify-center overflow-hidden sm:min-h-[420px] lg:min-h-[480px]">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/about-banner.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="scale-105 object-cover object-center"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-[#1F1F1F]/85" />

        <div className="absolute inset-0 bg-[#1F1F1F]/10" />

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-4xl px-5 text-center sm:px-6">
          <div className="animate-[fadeInUp_0.8s_ease-out]">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-7 bg-[#D4A762] sm:w-10" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#D4A762] sm:text-[11px]">
                What We Do
              </span>

              <span className="h-px w-7 bg-[#D4A762] sm:w-10" />
            </div>

            <h1 className="text-4xl font-semibold leading-tight tracking-[-0.025em] text-white sm:text-5xl md:text-6xl lg:text-[68px]">
              Our Services
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
              Thoughtful solutions, dependable service and professional
              support designed around your needs.
            </p>

            {/* Breadcrumb */}
            <div className="mt-7 flex items-center justify-center gap-3 text-[10px] font-medium uppercase tracking-[0.28em]">
              <Link
                href="/"
                className="text-white/55 transition-colors hover:text-white"
              >
                Home
              </Link>

              <span className="text-[#D4A762]">/</span>

              <span className="text-[#D4A762]">Services</span>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================
          INTRODUCTION
      ========================================================= */}
      <section className="bg-white px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[850px] text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-9 bg-[#D4A762]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#5FB3A9] sm:text-[11px]">
              What We Offer
            </span>

            <span className="h-px w-9 bg-[#D4A762]" />
          </div>

          <h2 className="mt-5 text-3xl font-semibold leading-[1.15] tracking-[-0.025em] text-[#1F1F1F] sm:text-4xl lg:text-[46px]">
            Services Designed
            <span className="text-[#8D6B39]"> Around You</span>
          </h2>

          <div className="mx-auto mt-6 flex items-center justify-center gap-2">
            <span className="h-[2px] w-10 bg-[#D4A762]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4A762]" />
          </div>

          <p className="mx-auto mt-7 max-w-2xl text-[15px] leading-7 text-[#6B6B6B] sm:text-base sm:leading-8">
            We combine thoughtful design, reliable service and attention to
            detail to create an experience that is simple, convenient and
            tailored to your needs.
          </p>
        </div>
      </section>

      {/* =========================================================
          SERVICES GRID
      ========================================================= */}
      <section className="bg-[#F8F5EF] px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[1250px]">
          <div className="mb-12 flex flex-col items-center text-center sm:mb-14">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#5FB3A9]">
              Our Expertise
            </span>

            <h2 className="mt-3 text-2xl font-semibold text-[#1F1F1F] sm:text-3xl">
              Everything You Need
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {services.map((service) => (
              <article
                key={service.number}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E6E0D6] bg-white transition-all duration-500 hover:-translate-y-1 hover:border-[#D4A762]/50 hover:shadow-[0_20px_50px_rgba(31,31,31,0.09)]"
              >
                {/* Image */}
                <div className="relative h-[220px] overflow-hidden sm:h-[240px]">
                  <Image
                    src={service.image}
                    alt={`${service.title} service`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Number */}
                  <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center border border-white/20 bg-[#1F1F1F]/80 backdrop-blur-md">
                    <span className="text-[11px] font-semibold tracking-wider text-[#D4A762]">
                      {service.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="mb-4 h-[2px] w-9 bg-[#D4A762] transition-all duration-500 group-hover:w-14" />

                  <h3 className="text-[22px] font-semibold leading-tight text-[#1F1F1F] transition-colors duration-300 group-hover:text-[#8D6B39]">
                    {service.title}
                  </h3>

                  <p className="mt-4 text-[14px] leading-6 text-[#6B6B6B]">
                    {service.desc}
                  </p>

                  <div className="mt-auto pt-6">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#1F1F1F] transition-colors duration-300 group-hover:text-[#5FB3A9]"
                    >
                      <span>Learn More</span>

                      <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURED SERVICE
      ========================================================= */}
      <section className="bg-[#F8F5EF] px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="mx-auto grid max-w-[1200px] overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_rgba(31,31,31,0.07)] lg:grid-cols-2">
          {/* Image */}
          <div className="relative min-h-[350px] overflow-hidden sm:min-h-[450px] lg:min-h-[500px]">
            <Image
              src="/images/s1.png"
              alt="Personalized furniture design service"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 top-5 border border-white/25 sm:bottom-6 sm:left-6 sm:right-6 sm:top-6" />
          </div>

          {/* Content */}
          <div className="relative flex items-center px-7 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#5FB3A9] sm:text-[11px]">
                Personalized Service
              </span>

              <h2 className="mt-4 text-3xl font-semibold leading-[1.15] tracking-tight text-[#1F1F1F] sm:text-4xl">
                Solutions Made
                <span className="block text-[#8D6B39]">
                  For Your Needs
                </span>
              </h2>

              <div className="mt-6 flex items-center gap-2">
                <span className="h-[2px] w-11 bg-[#D4A762]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#D4A762]" />
              </div>

              <p className="mt-6 text-[15px] leading-7 text-[#6B6B6B]">
                Every requirement is different. That is why we take a
                thoughtful, personalized approach to our services, helping you
                find a solution that works for your space, preferences and
                goals.
              </p>

              <div className="mt-7 space-y-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#5FB3A9]/10 text-[#5FB3A9]">
                      <CheckIcon />
                    </span>

                    <span className="text-sm font-medium text-[#333]">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="group mt-8 inline-flex items-center justify-center gap-3 rounded-lg bg-[#D4A762] px-6 py-3.5 text-sm font-semibold text-[#1F1F1F] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c79a55] hover:shadow-lg"
              >
                <span>Get in Touch</span>

                <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PROCESS
      ========================================================= */}
      <section className="bg-white px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[1200px]">
          {/* Heading */}
          <div className="mx-auto max-w-[700px] text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-9 bg-[#D4A762]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#5FB3A9] sm:text-[11px]">
                Our Process
              </span>

              <span className="h-px w-9 bg-[#D4A762]" />
            </div>

            <h2 className="mt-5 text-3xl font-semibold leading-tight text-[#1F1F1F] sm:text-4xl lg:text-[44px]">
              How Our Service Works
            </h2>

            <div className="mx-auto mt-6 flex items-center justify-center gap-2">
              <span className="h-[2px] w-10 bg-[#D4A762]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4A762]" />
            </div>

            <p className="mt-6 text-[15px] leading-7 text-[#6B6B6B]">
              A simple, transparent process designed to make every step
              convenient and stress-free.
            </p>
          </div>

          {/* Desktop */}
          <div className="relative mt-16 hidden lg:block">
            <div className="absolute left-[12.5%] right-[12.5%] top-8 h-px bg-[#D4A762]/30" />

            <div className="grid grid-cols-4 gap-8">
              {processSteps.map((step) => (
                <div key={step.number} className="relative text-center">
                  <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#D4A762]/40 bg-white">
                    <span className="text-sm font-semibold text-[#D4A762]">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold text-[#1F1F1F]">
                    {step.title}
                  </h3>

                  <p className="mx-auto mt-3 max-w-[220px] text-sm leading-6 text-[#777]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile / Tablet */}
          <div className="mt-12 lg:hidden">
            <div className="relative ml-5 border-l border-[#D4A762]/30 pl-8">
              <div className="space-y-10">
                {processSteps.map((step) => (
                  <div key={step.number} className="relative">
                    <div className="absolute -left-[49px] top-0 flex h-10 w-10 items-center justify-center rounded-full border border-[#D4A762]/40 bg-white">
                      <span className="text-[10px] font-semibold text-[#D4A762]">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-[#1F1F1F]">
                      {step.title}
                    </h3>

                    <p className="mt-2 max-w-lg text-sm leading-6 text-[#777]">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="px-5 pb-20 sm:px-8 sm:pb-24 lg:pb-28">
        <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-3xl bg-[#1F1F1F] px-6 py-14 text-center sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          {/* Background Decoration */}
          <div
            aria-hidden="true"
            className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#D4A762]/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-[#5FB3A9]/10 blur-3xl"
          />

          {/* Decorative lines */}
          <div
            aria-hidden="true"
            className="absolute left-6 top-6 h-12 w-12 border-l border-t border-[#D4A762]/30 sm:left-8 sm:top-8"
          />

          <div
            aria-hidden="true"
            className="absolute bottom-6 right-6 h-12 w-12 border-b border-r border-[#D4A762]/30 sm:bottom-8 sm:right-8"
          />

          <div className="relative z-10">
            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D4A762] sm:text-[11px]">
              Let&apos;s Work Together
            </span>

            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
              Let&apos;s Create Something Great Together
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
              Have a specific requirement or need help choosing the right
              service? Our team is ready to help.
            </p>

            {/* =================================================
                CTA BUTTONS
            ================================================== */}
            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              {/* CONTACT US */}
              <Link
                href="/contact"
                className="
                  group
                  inline-flex
                  min-h-[52px]
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-lg
                  bg-[#D4A762]
                  px-7
                  text-sm
                  font-semibold
                  text-[#1F1F1F]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#c79a55]
                  hover:shadow-xl
                  hover:shadow-black/20
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#D4A762]
                  focus:ring-offset-2
                  focus:ring-offset-[#1F1F1F]
                  sm:w-auto
                  sm:min-w-[150px]
                "
              >
                <span>CONTACT US</span>

                <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {/* SHOP */}
              <Link
                href="/shop"
                className="
                  group
                  inline-flex
                  min-h-[52px]
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-lg
                  border
                  border-[#D4A762]
                  bg-transparent
                  px-7
                  text-sm
                  font-semibold
                  text-[#D4A762]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#D4A762]
                  hover:text-[#1F1F1F]
                  hover:shadow-xl
                  hover:shadow-black/20
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#D4A762]
                  focus:ring-offset-2
                  focus:ring-offset-[#1F1F1F]
                  sm:w-auto
                  sm:min-w-[150px]
                "
              >
                <span>SHOP</span>

                <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}