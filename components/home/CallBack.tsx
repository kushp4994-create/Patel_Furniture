"use client";
import { useState } from "react";
import {
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaComment,
} from "react-icons/fa";

export default function CallBack() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        subject: "Call Back Request", // auto subject
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Request Sent Successfully");
      setForm({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } else {
      alert(data.message);
    }
  };

  return (
    <section
      className="relative w-full py-[140px] bg-fixed bg-center bg-cover opacity-0.2"
      style={{
        backgroundImage: "url('/images/bg1.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative max-w-[1100px] mx-auto px-6 text-center">

        <h2 className="text-[40px] font-semibold text-white mb-4">
          Request a Call Back
        </h2>

        <div className="w-[40px] h-[3px] bg-[#d4a762] mx-auto mb-12"></div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid md:grid-cols-3 gap-6">

            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#e0b15c]" />
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="p-4 bg-white text-black w-full pl-12 outline-none"
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
                className="p-4 bg-white text-black w-full pl-12 outline-none"
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
                className="p-4 bg-white text-black w-full pl-12 outline-none"
              />
            </div>

          </div>

          <div className="relative">
            <FaComment className="absolute left-4 top-6 text-[#e0b15c]" />
            <textarea
              placeholder="Message"
              rows={5}
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
              className="p-4 bg-white text-black w-full pl-12 outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-teal-500 text-white px-15 py-4 cursor-pointer hover:text-black transition-all duration-300"
          >
            SEND NOW!
          </button>

        </form>
      </div>
    </section>
  );
}