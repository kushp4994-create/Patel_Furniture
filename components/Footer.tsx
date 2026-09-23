// import { prisma } from "@/lib/prisma";
// import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

// export default async function Footer() {
//   const admin = await prisma.user.findFirst({
//     where: { role: "ADMIN" },
//   });

//   return (
//     <footer className="w-full bg-[#323232] text-gray-400">

//       {/* MAIN WRAPPER */}
//       <div className="max-w-6xl mx-auto px-6 md:px-10 py-20">

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

//           {/* LEFT COLUMN */}
//           <div>
//             <div className="flex items-center mb-10 -ml-4">
//               <img
//                 src="/images/logo2.png"
//                 alt="logo"
//                 className="w-30 h-20 object-contain"
//               />
//               <div>
//                 <h2 className="text-white text-2xl font-medium tracking-wide ">
//                   PATEL
//                 </h2>
//                 <p className="text-xs tracking-widest text-gray-500 ">
//                   FURNITURE COMPANY
//                 </p>
//               </div>
//             </div>

//             <p className="text-sm leading-7 mb-8">
//               Hamburger short loin pastrami ribeye, doner land andouille pork
//               loin short ribs ham hock hant pig prosciut swine biltong meatloaf.
//             </p>

//             <ul className="space-y-4 text-sm">
//               <li className="hover:text-white transition">
//                 📍 {admin?.address || "No Address Added"}
//               </li>

//               <li className="hover:text-white transition">
//                 📞 {admin?.phone || "No Phone Added"}
//               </li>

//               {/* <li className="hover:text-white transition">
//                 <a
//                   href={`https://wa.me/${admin?.whatsapp}`}
//                   target="_blank"
//                 >
//                   💬 WhatsApp
//                 </a>
//               </li> */}

//               <li className="hover:text-white transition underline">
//                 ✉ {admin?.email || "example@example.com"}
//               </li>
//             </ul>
//           </div>

//           {/* CENTER COLUMN */}
//           <div>
//             <h3 className="text-white text-2xl font-medium mb-10">
//               Recent Posts
//             </h3>

//             <div className="space-y-7">
//               {[
//                 {
//                   img: "/images/Blog3.jpg",
//                   title: "Cupim bacon short ribs picanha",
//                   date: "JULY 11, 2025",
//                 },
//                 {
//                   img: "/images/Blog2.jpg",
//                   title: "Swine short loin boud spare ribs capi",
//                   date: "JULY 7, 2025",
//                 },
//                 {
//                   img: "/images/Blog1.jpg",
//                   title: "Ham venison spare ribs strip steak",
//                   date: "JULY 6, 2025",
//                 },
//               ].map((post, index) => (
//                 <div key={index} className="flex gap-5 group cursor-pointer">
//                   <img
//                     src={post.img}
//                     className="w-20 h-20 object-cover"
//                   />
//                   <div>
//                     <p className="text-sm text-gray-300 leading-6 group-hover:text-teal-400 transition">
//                       {post.title}
//                     </p>
//                     <span className="text-xs text-[#efc572] tracking-wide">
//                       {post.date}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* RIGHT COLUMN */}
//           <div>
//             <h3 className="text-white text-2xl font-medium mb-10">
//               Subscribe
//             </h3>

//             <div className="flex w-full mb-5">
//               <input
//                 type="email"
//                 placeholder="Email address"
//                 className="w-full px-5 py-3 bg-white text-black outline-none text-sm"
//               />
//               <button className="bg-teal-500 px-6 text-white transition hover:text-black">
//                 ✎
//               </button>
//             </div>

//             <p className="text-sm leading-7 mb-8">
//               Enter Email here to be updated. We promise not to send you spam!
//             </p>

//             {/* SOCIAL ICONS */}
//             <div className="flex gap-4">
//               {[
//                 { icon: FaFacebookF, link: admin?.facebook },
//                 { icon: FaInstagram, link: admin?.instagram },
//                 {
//                   icon: FaWhatsapp,
//                   link: `https://wa.me/${admin?.whatsapp}`,
//                 },
//               ].map((item, i) => {
//                 const Icon = item.icon;
//                 return (
//                   <a
//                     key={i}
//                     href={item.link || "#"}
//                     target="_blank"
//                     className="border border-white-600 w-10 h-10 flex items-center justify-center text-white
//                     hover:text-[#00bba7] hover:border-white
//                     transition duration-300 cursor-pointer"
//                   >
//                     <Icon size={16} />
//                   </a>
//                 );
//               })}
//             </div>
//           </div>

//         </div>

//         {/* DIVIDER */}
//         <div className="border-t border-gray-700 mt-16 pt-6 text-center text-xs tracking-wide text-gray-500">
//           © COPYRIGHT 2026 ALL RIGHTS RESERVED
//         </div>

//       </div>
//     </footer>
//   );
// }




import { prisma } from "@/lib/prisma";
import {
  FaArrowRight,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

const quickLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "shop",
    href: "/shop",
  },
  {
    label: "Products",
    href: "/products",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "appointment",
    href: "/appointment",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const recentPosts = [
  {
    img: "/images/Blog3.jpg",
    title: "Cupim bacon short ribs picanha",
    date: "JULY 11, 2025",
  },
  {
    img: "/images/Blog2.jpg",
    title: "Swine short loin boud spare ribs capi",
    date: "JULY 7, 2025",
  },
  {
    img: "/images/Blog1.jpg",
    title: "Ham venison spare ribs strip steak",
    date: "JULY 6, 2025",
  },
];

export default async function Footer() {
  const admin = await prisma.user.findFirst({
    where: {
      role: "ADMIN",
    },
  });

  const whatsappNumber = admin?.whatsapp?.replace(/\D/g, "");

  return (
    <footer className="relative w-full overflow-hidden bg-[#202020] text-gray-400">
      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-[#d4a762]/[0.04]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-[340px] w-[340px] rounded-full border border-[#d4a762]/[0.04]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-px w-40 bg-gradient-to-r from-[#d4a762]/40 to-transparent"
      />

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div
          className="
            grid
            grid-cols-1
            gap-14
            sm:grid-cols-2
            lg:grid-cols-[1.3fr_0.8fr_1.15fr_1fr]
            lg:gap-10
            xl:gap-14
          "
        >
          {/* =================================================
              COLUMN 1 — BRAND
          ================================================== */}

          <div>
            {/* Logo + Brand */}
            <div className="mb-7">
              <a
                href="/"
                aria-label="Patel Furniture Company home"
                className="inline-flex items-center gap-3"
              >
                <div className="flex h-16 w-16 items-center justify-center">
                  <img
                    src="/images/logo2.png"
                    alt="Patel Furniture Company logo"
                    className="h-16 w-16 object-contain"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-medium tracking-[0.16em] text-white">
                    PATEL
                  </h2>

                  <p className="mt-1 text-[9px] tracking-[0.25em] text-[#d4a762]">
                    FURNITURE COMPANY
                  </p>
                </div>
              </a>

              {/* Gold Accent */}
              <div className="mt-5 flex items-center gap-2">
                <span className="h-px w-10 bg-[#d4a762]" />

                <span className="h-1 w-1 rounded-full bg-[#d4a762]" />
              </div>
            </div>

            {/* Brand Description */}
            <p className="max-w-sm text-sm leading-7 text-gray-400">
              At Patel Furniture Company, we believe great furniture should
              bring together comfort, craftsmanship, and timeless design.
              Every piece is thoughtfully selected to help you create a space
              that feels truly yours.
            </p>

            {/* Contact Information */}
            <div className="mt-8 space-y-4">
              {/* Address */}
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="
                    mt-1
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#d4a762]/25
                    text-[#d4a762]
                  "
                >
                  <FaMapMarkerAlt size={11} />
                </span>

                <span className="text-sm leading-6 text-gray-400">
                  {admin?.address || "No Address Added"}
                </span>
              </div>

              {/* Phone */}
              {admin?.phone ? (
                <a
                  href={`tel:${admin.phone}`}
                  className="
                    group
                    flex
                    items-center
                    gap-3
                    transition-colors
                    duration-300
                    hover:text-white
                  "
                >
                  <span
                    aria-hidden="true"
                    className="
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#d4a762]/25
                      text-[#d4a762]
                    "
                  >
                    <FaPhoneAlt size={10} />
                  </span>

                  <span className="text-sm">{admin.phone}</span>
                </a>
              ) : (
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#d4a762]/25
                      text-[#d4a762]
                    "
                  >
                    <FaPhoneAlt size={10} />
                  </span>

                  <span className="text-sm">No Phone Added</span>
                </div>
              )}

              {/* Email */}
              {admin?.email ? (
                <a
                  href={`mailto:${admin.email}`}
                  className="
                    group
                    flex
                    items-center
                    gap-3
                    transition-colors
                    duration-300
                    hover:text-white
                  "
                >
                  <span
                    aria-hidden="true"
                    className="
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#d4a762]/25
                      text-[#d4a762]
                    "
                  >
                    <FaEnvelope size={11} />
                  </span>

                  <span className="break-all text-sm">{admin.email}</span>
                </a>
              ) : (
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#d4a762]/25
                      text-[#d4a762]
                    "
                  >
                    <FaEnvelope size={11} />
                  </span>

                  <span className="text-sm">No Email Added</span>
                </div>
              )}
            </div>
          </div>

          {/* =================================================
              COLUMN 2 — QUICK LINKS
          ================================================== */}

          <div>
            {/* Heading */}
            <div className="mb-7">
              <span className="mb-3 block text-[9px] font-semibold tracking-[0.3em] text-[#d4a762]">
                EXPLORE
              </span>

              <h3 className="text-xl font-medium text-white">
                Quick Links
              </h3>
            </div>

            {/* Links */}
            <nav aria-label="Footer navigation">
              <ul className="space-y-3.5">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="
                        group
                        flex
                        w-fit
                        items-center
                        gap-2
                        text-sm
                        text-gray-400
                        transition-all
                        duration-300
                        hover:translate-x-1
                        hover:text-[#d4a762]
                      "
                    >
                      <span
                        aria-hidden="true"
                        className="
                          h-px
                          w-0
                          bg-[#d4a762]
                          transition-all
                          duration-300
                          group-hover:w-3
                        "
                      />

                      <span>{link.label}</span>

                      <FaArrowRight
                        aria-hidden="true"
                        size={8}
                        className="
                          translate-x-[-4px]
                          opacity-0
                          transition-all
                          duration-300
                          group-hover:translate-x-0
                          group-hover:opacity-100
                        "
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* =================================================
              COLUMN 3 — RECENT POSTS
          ================================================== */}

          <div>
            {/* Heading */}
            <div className="mb-7">
              <span className="mb-3 block text-[9px] font-semibold tracking-[0.3em] text-[#d4a762]">
                JOURNAL
              </span>

              <h3 className="text-xl font-medium text-white">
                Recent Posts
              </h3>
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {recentPosts.map((post) => (
                <a
                  key={post.img}
                  // href="/blog"
                  className="group flex gap-4"
                >
                  {/* Image */}
                  <div className="h-[72px] w-[78px] shrink-0 overflow-hidden rounded-sm bg-[#292929]">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-110
                      "
                    />
                  </div>

                  {/* Post Information */}
                  <div className="min-w-0">
                    <h4
                      className="
                        line-clamp-2
                        text-sm
                        leading-5
                        text-gray-300
                        transition-colors
                        duration-300
                        group-hover:text-[#d4a762]
                      "
                    >
                      {post.title}
                    </h4>

                    <p className="mt-2 text-[9px] font-medium tracking-[0.18em] text-[#d4a762]/80">
                      {post.date}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* =================================================
              COLUMN 4 — NEWSLETTER
          ================================================== */}

          <div>
            {/* Heading */}
            <div className="mb-7">
              <span className="mb-3 block text-[9px] font-semibold tracking-[0.3em] text-[#d4a762]">
                NEWSLETTER
              </span>

              <h3 className="text-xl font-medium text-white">
                Stay Inspired
              </h3>
            </div>

            {/* Description */}
            <p className="mb-6 text-sm leading-7 text-gray-400">
              Get design inspiration, new arrivals and special offers
              delivered straight to your inbox.
            </p>

            {/* Newsletter Form */}
            {/* 
              This is intentionally a server-safe form.
              No onSubmit/onClick handler is used here.
            */}
            <form className="w-full">
              <label htmlFor="footer-email" className="sr-only">
                Your email address
              </label>

              <div className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
                <input
                  id="footer-email"
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  autoComplete="email"
                  className="
                    min-h-[48px]
                    w-full
                    border
                    border-white/10
                    bg-[#292929]
                    px-4
                    text-sm
                    text-white
                    placeholder:text-gray-500
                    outline-none
                    transition-all
                    duration-300
                    focus:border-[#d4a762]/70
                    focus:bg-[#2c2c2c]
                    focus:ring-1
                    focus:ring-[#d4a762]/20
                  "
                />

                <button
                  type="button"
                  className="
                    group
                    inline-flex
                    min-h-[48px]
                    shrink-0
                    items-center
                    justify-center
                    gap-3
                    bg-[#d4a762]
                    px-5
                    text-xs
                    font-semibold
                    tracking-[0.12em]
                    text-[#252525]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-[#c59650]
                    hover:shadow-lg
                    hover:shadow-black/20
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#d4a762]
                    focus:ring-offset-2
                    focus:ring-offset-[#202020]
                  "
                >
                  <span>SUBSCRIBE</span>

                  <FaArrowRight
                    aria-hidden="true"
                    size={10}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </button>
              </div>
            </form>

            {/* Social Media */}
            <div className="mt-8">
              <p className="mb-4 text-[9px] font-semibold tracking-[0.25em] text-gray-500">
                FOLLOW US
              </p>

              <div className="flex items-center gap-2.5">
                {/* Facebook */}
                {admin?.facebook && (
                  <a
                    href={admin.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      border
                      border-white/10
                      text-gray-400
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-[#d4a762]
                      hover:bg-[#d4a762]
                      hover:text-[#202020]
                      focus:outline-none
                      focus:ring-2
                      focus:ring-[#d4a762]
                    "
                  >
                    <FaFacebookF size={13} />
                  </a>
                )}

                {/* Instagram */}
                {admin?.instagram && (
                  <a
                    href={admin.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      border
                      border-white/10
                      text-gray-400
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-[#d4a762]
                      hover:bg-[#d4a762]
                      hover:text-[#202020]
                      focus:outline-none
                      focus:ring-2
                      focus:ring-[#d4a762]
                    "
                  >
                    <FaInstagram size={15} />
                  </a>
                )}

                {/* WhatsApp */}
                {whatsappNumber && (
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      border
                      border-white/10
                      text-gray-400
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-[#d4a762]
                      hover:bg-[#d4a762]
                      hover:text-[#202020]
                      focus:outline-none
                      focus:ring-2
                      focus:ring-[#d4a762]
                    "
                  >
                    <FaWhatsapp size={15} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            DIVIDER
        ====================================================== */}

        <div className="mt-16 border-t border-white/[0.08] pt-6 sm:mt-20">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <p className="text-[10px] tracking-[0.08em] text-gray-500">
              © 2026 Patel Furniture Company. All rights reserved.
            </p>

            <p className="text-[10px] tracking-[0.08em] text-gray-600">
              Designed for modern living.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}