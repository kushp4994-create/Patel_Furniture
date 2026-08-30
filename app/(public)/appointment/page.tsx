"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "react-calendar/dist/Calendar.css";

const Calendar = dynamic(() => import("react-calendar"), {
  ssr: false,
});

export default function AppointmentPage() {
  const [date, setDate] = useState<Date | null>(new Date());

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        date,
      }),
    });

    alert("Appointment Booked Successfully ✅");

    setForm({
      name: "",
      phone: "",
      email: "",
      message: "",
    });
  };

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
            Appointment
          </h1>

          <p className="text-sm tracking-widest uppercase">
            HOME / APPOINTMENT
          </p>
        </div>
      </section>

      {/* ================= FORM SECTION ================= */}
      <section className="py-[120px] bg-[#f3f3f3]">
        <div className="max-w-[900px] mx-auto px-6 grid md:grid-cols-2 gap-10">

          {/* CALENDAR */}
          <div>
            <Calendar
              onChange={(value) => setDate(value as Date)}
              value={date}
              locale="en-GB"
              showNeighboringMonth={false}
            />
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 shadow space-y-4"
          >
            <h2 className="text-2xl font-semibold mb-4">
              Book Appointment
            </h2>

            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full border p-2"
              required
            />

            <input
              type="text"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              className="w-full border p-2"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full border p-2"
            />

            <textarea
              placeholder="Message"
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
              className="w-full border p-2"
            />

            <button className="bg-black text-white px-6 py-2">
              Book Appointment
            </button>
          </form>

        </div>
      </section>
    </>
  );
}