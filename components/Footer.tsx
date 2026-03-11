import { prisma } from "@/lib/prisma";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default async function Footer() {
  const admin = await prisma.user.findFirst({
    where: { role: "ADMIN" },
  });

  return (
    <footer className="w-full bg-[#323232] text-gray-400">

      {/* MAIN WRAPPER */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-20">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

          {/* LEFT COLUMN */}
          <div>
            <div className="flex items-center mb-10 -ml-4">
              <img
                src="/images/logo2.png"
                alt="logo"
                className="w-30 h-20 object-contain"
              />
              <div>
                <h2 className="text-white text-2xl font-medium tracking-wide ">
                  PATEL
                </h2>
                <p className="text-xs tracking-widest text-gray-500 ">
                  FURNITURE COMPANY
                </p>
              </div>
            </div>

            <p className="text-sm leading-7 mb-8">
              Hamburger short loin pastrami ribeye, doner land andouille pork
              loin short ribs ham hock hant pig prosciut swine biltong meatloaf.
            </p>

            <ul className="space-y-4 text-sm">
              <li className="hover:text-white transition">
                📍 {admin?.address || "No Address Added"}
              </li>

              <li className="hover:text-white transition">
                📞 {admin?.phone || "No Phone Added"}
              </li>

              {/* <li className="hover:text-white transition">
                <a
                  href={`https://wa.me/${admin?.whatsapp}`}
                  target="_blank"
                >
                  💬 WhatsApp
                </a>
              </li> */}

              <li className="hover:text-white transition underline">
                ✉ {admin?.email || "example@example.com"}
              </li>
            </ul>
          </div>

          {/* CENTER COLUMN */}
          <div>
            <h3 className="text-white text-2xl font-medium mb-10">
              Recent Posts
            </h3>

            <div className="space-y-7">
              {[
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
              ].map((post, index) => (
                <div key={index} className="flex gap-5 group cursor-pointer">
                  <img
                    src={post.img}
                    className="w-20 h-20 object-cover"
                  />
                  <div>
                    <p className="text-sm text-gray-300 leading-6 group-hover:text-teal-400 transition">
                      {post.title}
                    </p>
                    <span className="text-xs text-[#efc572] tracking-wide">
                      {post.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            <h3 className="text-white text-2xl font-medium mb-10">
              Subscribe
            </h3>

            <div className="flex w-full mb-5">
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-5 py-3 bg-white text-black outline-none text-sm"
              />
              <button className="bg-teal-500 px-6 text-white transition hover:text-black">
                ✎
              </button>
            </div>

            <p className="text-sm leading-7 mb-8">
              Enter Email here to be updated. We promise not to send you spam!
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4">
              {[
                { icon: FaFacebookF, link: admin?.facebook },
                { icon: FaInstagram, link: admin?.instagram },
                {
                  icon: FaWhatsapp,
                  link: `https://wa.me/${admin?.whatsapp}`,
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <a
                    key={i}
                    href={item.link || "#"}
                    target="_blank"
                    className="border border-white-600 w-10 h-10 flex items-center justify-center text-white
                    hover:text-[#00bba7] hover:border-white
                    transition duration-300 cursor-pointer"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-700 mt-16 pt-6 text-center text-xs tracking-wide text-gray-500">
          © COPYRIGHT 2026 ALL RIGHTS RESERVED
        </div>

      </div>
    </footer>
  );
}