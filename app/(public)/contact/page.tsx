"use client";

import { useState } from "react";
import {
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaTag,
  FaComment,
} from "react-icons/fa";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Message Sent Successfully");
      setForm({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      });
    } else {
      alert(data.message);
    }
  };

  return (
    <>
      {/* ================= CONTACT BANNER ================= */}
      <section className="relative w-full h-[350px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/about-banner.png')" }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative text-center text-white">
          <h1 className="text-5xl font-semibold text-[#e0b15c] mb-4">
            Contacts
          </h1>

          <p className="text-sm tracking-widest uppercase">
            HOME &nbsp; / &nbsp; CONTACTS
          </p>
        </div>
      </section>

      {/* ================= MAP + FORM SECTION ================= */}
      <section
        className="relative py-[140px] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/map-bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative max-w-[800px] mx-auto bg-black/30 p-10">

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-6"
          >

            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#e0b15c]" />
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="bg-white text-black w-full pl-12 p-4 outline-none"
              />
            </div>

            <div className="relative">
              <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-[#e0b15c]" />
              <input
                type="text"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
                className="bg-white text-black w-full pl-12 p-4 outline-none"
              />
            </div>

            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#e0b15c]" />
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="bg-white text-black w-full pl-12 p-4 outline-none"
              />
            </div>

            <div className="relative">
              <FaTag className="absolute left-4 top-1/2 -translate-y-1/2 text-[#e0b15c]" />
              <input
                type="text"
                placeholder="Subject"
                value={form.subject}
                onChange={(e) =>
                  setForm({ ...form, subject: e.target.value })
                }
                className="bg-white text-black w-full pl-12 p-4 outline-none"
              />
            </div>

            <div className="relative md:col-span-2">
              <FaComment className="absolute left-4 top-6 text-[#e0b15c]" />
              <textarea
                placeholder="Message"
                rows={5}
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                className="bg-white text-black w-full pl-12 p-4 outline-none"
              ></textarea>
            </div>

            <div className="md:col-span-2 text-center mt-4">
              <button
                type="submit"
                className="bg-[#5fb3a9] px-8 py-3 text-white hover:text-black transition"
              >
                SEND NOW!
              </button>
            </div>

          </form>
        </div>
      </section>
    </>
  );
}