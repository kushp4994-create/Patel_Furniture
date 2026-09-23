
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      <section className="relative flex h-[300px] w-full items-center justify-center overflow-hidden sm:h-[350px]">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/about-banner.png')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Banner Content */}
        <div className="relative z-10 px-5 text-center text-white">
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[4px] text-[#c9a15b] sm:text-xs">
            Patel Furniture
          </p>

          <h1 className="text-4xl font-medium tracking-wide sm:text-5xl md:text-6xl">
            Appointment
          </h1>

          <div className="mx-auto mt-5 h-[2px] w-12 bg-[#c9a15b]" />

          <p className="mt-5 text-[10px] uppercase tracking-[3px] text-white/80 sm:text-xs">
            HOME
            <span className="mx-3 text-[#c9a15b]">/</span>
            APPOINTMENT
          </p>
        </div>
      </section>

      {/* ================= APPOINTMENT SECTION ================= */}
      <section className="bg-[#faf9f6] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8">

          {/* Section Heading */}
          <div className="mx-auto mb-12 max-w-[700px] text-center sm:mb-14">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[3px] text-[#a27d3e] sm:text-xs">
              Personal Consultation
            </p>

            <h2 className="text-3xl font-medium text-[#1f1f1f] sm:text-4xl">
              Book Your Appointment
            </h2>

            <div className="mx-auto my-5 h-[2px] w-10 bg-[#c9a15b]" />

            <p className="text-sm leading-7 text-[#6b6b6b] sm:text-[15px]">
              Visit Patel Furniture and let our team help you find furniture
              that perfectly matches your space, style and requirements.
            </p>
          </div>

          {/* ================= CONTENT ================= */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">

            {/* ================= CALENDAR ================= */}
            <div className="border border-[#e5dfd5] bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-6">
                <p className="text-[10px] font-semibold uppercase tracking-[3px] text-[#a27d3e]">
                  Select Date
                </p>

                <h3 className="mt-2 text-2xl font-medium text-[#1f1f1f]">
                  Choose a Date
                </h3>
              </div>

              <div className="appointment-calendar">
                <Calendar
                  onChange={(value) => setDate(value as Date)}
                  value={date}
                  locale="en-GB"
                  showNeighboringMonth={false}
                />
              </div>

              {/* Selected Date */}
              {date && (
                <div className="mt-6 border-t border-[#eee9e1] pt-5">
                  <p className="text-[10px] uppercase tracking-[2px] text-[#888888]">
                    Selected Date
                  </p>

                  <p className="mt-1 text-base font-medium text-[#1f1f1f]">
                    {date.toLocaleDateString("en-GB", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              )}
            </div>

            {/* ================= FORM ================= */}
            <form
              onSubmit={handleSubmit}
              className="border border-[#e5dfd5] bg-white p-6 shadow-sm sm:p-8"
            >
              {/* Form Header */}
              <div className="mb-7">
                <p className="text-[10px] font-semibold uppercase tracking-[3px] text-[#a27d3e]">
                  Get In Touch
                </p>

                <h3 className="mt-2 text-2xl font-medium text-[#1f1f1f]">
                  Book Appointment
                </h3>

                <div className="mt-4 h-[2px] w-9 bg-[#c9a15b]" />
              </div>

              {/* Name */}
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-medium uppercase tracking-[1px] text-[#555555]"
                >
                  Your Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  className="w-full border border-[#ddd7ce] bg-[#faf9f6] px-4 py-3 text-sm text-[#333333] outline-none transition focus:border-[#c9a15b] focus:bg-white"
                  required
                />
              </div>

              {/* Phone */}
              <div className="mb-5">
                <label
                  htmlFor="phone"
                  className="mb-2 block text-xs font-medium uppercase tracking-[1px] text-[#555555]"
                >
                  Phone
                </label>

                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value,
                    })
                  }
                  className="w-full border border-[#ddd7ce] bg-[#faf9f6] px-4 py-3 text-sm text-[#333333] outline-none transition focus:border-[#c9a15b] focus:bg-white"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-medium uppercase tracking-[1px] text-[#555555]"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  className="w-full border border-[#ddd7ce] bg-[#faf9f6] px-4 py-3 text-sm text-[#333333] outline-none transition focus:border-[#c9a15b] focus:bg-white"
                />
              </div>

              {/* Message */}
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-medium uppercase tracking-[1px] text-[#555555]"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us how we can help you..."
                  value={form.message}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      message: e.target.value,
                    })
                  }
                  className="w-full resize-none border border-[#ddd7ce] bg-[#faf9f6] px-4 py-3 text-sm text-[#333333] outline-none transition focus:border-[#c9a15b] focus:bg-white"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#1f1f1f] px-6 py-3.5 text-xs font-semibold uppercase tracking-[2px] text-white transition duration-300 hover:bg-[#5fb3a9] focus:outline-none focus:ring-2 focus:ring-[#c9a15b] focus:ring-offset-2"
              >
                Book Appointment
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ================= CALENDAR STYLING ================= */}
      <style jsx global>{`
        .appointment-calendar .react-calendar {
          width: 100%;
          border: none;
          background: transparent;
          font-family: inherit;
        }

        .appointment-calendar .react-calendar__navigation {
          height: 48px;
          margin-bottom: 12px;
        }

        .appointment-calendar .react-calendar__navigation button {
          min-width: 44px;
          background: transparent;
          color: #1f1f1f;
          font-size: 14px;
          font-weight: 500;
        }

        .appointment-calendar
          .react-calendar__navigation
          button:enabled:hover,
        .appointment-calendar
          .react-calendar__navigation
          button:enabled:focus {
          background: #f5f1e9;
        }

        .appointment-calendar .react-calendar__month-view__weekdays {
          color: #999999;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .appointment-calendar .react-calendar__tile {
          padding: 13px 5px;
          border-radius: 0;
          color: #333333;
          font-size: 13px;
          transition: all 0.2s ease;
        }

        .appointment-calendar .react-calendar__tile:enabled:hover,
        .appointment-calendar .react-calendar__tile:enabled:focus {
          background: #f3eee5;
          color: #1f1f1f;
        }

        .appointment-calendar .react-calendar__tile--now {
          background: #f3eee5;
          color: #1f1f1f;
        }

        .appointment-calendar .react-calendar__tile--active {
          background: #c9a15b !important;
          color: white !important;
        }

        .appointment-calendar
          .react-calendar__tile--active:enabled:hover,
        .appointment-calendar
          .react-calendar__tile--active:enabled:focus {
          background: #b58d4d !important;
        }

        .appointment-calendar .react-calendar__month-view__days__day--neighboringMonth {
          color: #cccccc;
        }
      `}</style>
    </>
  );
}
