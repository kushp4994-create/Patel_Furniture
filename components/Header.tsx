"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { socialLinks } from "@/lib/socialLinks";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown outside click
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* TOP BAR */}
      <div className="w-full bg-gray-100 py-2 px-10 flex justify-center items-center gap-200 text-gray-500">

        <div className="flex gap-6 text-xl">

          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-500 transition cursor-pointer"
          >
            <FaFacebookF />
          </a>

          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-500 transition cursor-pointer"
          >
            <FaInstagram />
          </a>

          <a
            href={socialLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-500 transition cursor-pointer"
          >
            <FaWhatsapp />
          </a>

        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none placeholder-gray-400"
          />
          <span className="cursor-pointer hover:text-teal-500 transition">
            🔍
          </span>
        </div>
      </div>

      {/* MAIN HEADER */}
      <header
        className={`w-full bg-white shadow-sm transition-all duration-300 ${
          isSticky ? "fixed top-0 left-0 z-50 shadow-md" : "relative"
        }`}
      >
        <div className="px-10 py-4 flex justify-center items-center gap-110">

          {/* LOGO → HOME LINK */}
          <Link href="/" className="flex items-center cursor-pointer">
            <img
              src="/images/logo2.png"
              alt="Logo"
              className="w-30 h-20"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-800 ">PATEL</h1>
              <p className="text-xs text-gray-400 ">
                FURNITURE COMPANY
              </p>
            </div>
          </Link>

          {/* NAVIGATION */}
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600 relative">

            {/* PAGES DROPDOWN */}
            <div className="relative group">
              <span className="cursor-pointer hover:text-teal-500 transition">
                PAGES
              </span>

              <div className="absolute left-0 top-full w-full h-4"></div>

              <div className="absolute left-0 top-full pt-4 w-52 bg-white shadow-lg 
                              opacity-0 invisible translate-y-2
                              group-hover:opacity-100 
                              group-hover:visible 
                              group-hover:translate-y-0
                              transition-all duration-300 z-50">

                <Link
                  href="/about"
                  className="block px-6 py-3 hover:bg-gray-100 hover:text-teal-500 transition cursor-pointer"
                >
                  ABOUT
                </Link>

                <Link
                  href="/faq"
                  className="block px-6 py-3 hover:bg-gray-100 hover:text-teal-500 transition cursor-pointer"
                >
                  FAQ
                </Link>

                <Link
                  href="/team"
                  className="block px-6 py-3 hover:bg-gray-100 hover:text-teal-500 transition cursor-pointer"
                >
                  TEAM
                </Link>

              </div>
            </div>

            <Link href="/services" className="hover:text-teal-500 transition">
              SERVICES
            </Link>

            <Link href="/shop" className="hover:text-teal-500 transition">
              SHOP
            </Link>

            <Link href="/contact" className="hover:text-teal-500 transition">
              CONTACTS
            </Link>

            <Link href="/appointment" className="hover:text-teal-500 transition">
              APPOINTMENT
            </Link>

          </nav>
        </div>
      </header>

      {/* Spacer when sticky */}
      {isSticky && <div className="h-[90px]"></div>}
    </>
  );
}