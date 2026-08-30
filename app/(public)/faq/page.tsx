"use client";

import { useState } from "react";

export default function FaqPage() {

  const leftFaqs = [
    {
      question: "WHAT'S TRENDING IN FURNITURE FOR THE FAST?",
      answer:
        "Biltong bacon pancetta corned beef filet mignon andouille cow burgd. Pork chop beef ball tip shank, brisket kielbasa turkey andouille biltong alcatra filet mignon. Swine rump meatloaf pork.",
    },
    {
      question: "WHAT ARE 5 WAYS TO BOOST WORKPLACE PRODUCTIVITY?",
      answer: "Stet clita kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet ipsum dolor sit amet, consetetur elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
    },
    {
      question: "WHAT LOFT REMODEL IN DOWNTOWN MIAMI?",
      answer: "Stet clita kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet ipsum dolor sit amet, consetetur elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
    },
    {
      question: "HAMBURGER SED BEEF RIBS BALL TIP SALAMI?",
      answer: "Stet clita kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet ipsum dolor sit amet, consetetur elitr, sed diam nonumy eirmod tempor.",
    },
    {
      question: "SHANKLE SHOULDER PORK CHOP BEEF BRISKET?",
      answer: "Stet clita kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet ipsum dolor sit amet, consetetur elitr, sed diam nonumy eirmod tempor.",
    },
  ];

  const rightFaqs = [
    {
      question: "BALL TIP FATBACK BURGDOGGEN?",
      answer:
        "Drumstick flank pork chop pastrami tenderloin. Turkey bacon cow beef ribs salami pork loin kevin fatback alcatra shankle turducken landjaeger ground round. Jerky beef turkey.",
    },
    {
      question: "HAM CUPIM RIBEYE DONER TENDERLOIN VENISON?",
      answer: "Stet clita kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet ipsum dolor sit amet, consetetur elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
    },
    {
      question: "TONGUE FLANK BEEF RIBS BEEF CAPICOLA?",
      answer: "Stet clita kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet ipsum dolor sit amet, consetetur elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
    },
    {
      question: "T-BONE SWINE SIRLOIN BRESAOLA ANDOUILLE?",
      answer: "Stet clita kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet ipsum dolor sit amet, consetetur elitr, sed diam nonumy eirmod tempor.",
    },
    {
      question: "FRANKFURTER PASTRAMI TENDERLOIN?",
      answer: "Stet clita kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet ipsum dolor sit amet, consetetur elitr, sed diam nonumy eirmod tempor.",
    },
  ];

  const [openLeft, setOpenLeft] = useState<number | null>(0);
  const [openRight, setOpenRight] = useState<number | null>(0);

  const Accordion = ({ items, openIndex, setOpen }: any) => (
  <div className="space-y-8">
    {items.map((faq: any, index: number) => {
      const isOpen = openIndex === index;

      return (
        <div key={index}>

          {/* QUESTION */}
          <button
            onClick={() => setOpen(isOpen ? null : index)}
            className={`w-full flex justify-between items-center 
              px-8 py-6 text-left uppercase tracking-wider 
              text-[14px] font-semibold transition-all duration-300
              ${
                isOpen
                  ? "bg-[#5fb3a9] text-white"
                  : "bg-[#e9e9e9] text-gray-700 hover:bg-gray-300"
              }`}
          >
            <span className="flex items-center gap-4">
              <span className="text-[#e0b15c] text-lg">💬</span>
              {faq.question}
            </span>

            {/* PLUS ICON */}
            <span
              className={`text-2xl font-light transition-transform duration-300 ${
                isOpen ? "rotate-45" : "rotate-0"
              }`}
            >
              +
            </span>
          </button>

          {/* ANSWER */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-8 py-6 bg-white text-gray-500 leading-[28px] text-[18px]">
              {faq.answer}
            </div>
          </div>

        </div>
      );
    })}
  </div>
);

  return (
    <>
      {/* ================= FAQ BANNER ================= */}
      <section className="relative w-full h-[350px] flex items-center justify-center">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/about-banner.png')",
          }}
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative text-center text-white">
          <h1 className="text-5xl font-semibold text-[#e0b15c] mb-4">
            Faq
          </h1>

          <p className="text-sm tracking-widest uppercase">
            HOME &nbsp; / &nbsp; FAQ
          </p>
        </div>

      </section>

      {/* ================= FAQ CONTENT SECTION ================= */}
      <section className="py-[120px] bg-[#f5f5f5]">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-10">

          {/* LEFT COLUMN */}
          <Accordion
            items={leftFaqs}
            openIndex={openLeft}
            setOpen={setOpenLeft}
          />

          {/* RIGHT COLUMN */}
          <Accordion
            items={rightFaqs}
            openIndex={openRight}
            setOpen={setOpenRight}
          />

        </div>
      </section>
    </>
  );
}