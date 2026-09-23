"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type FAQCategory = "Furniture" | "Office" | "Remodeling" | "General";

type FAQ = {
  question: string;
  answer: string;
  category: FAQCategory;
};

type AccordionProps = {
  items: FAQ[];
  openId: number | null;
  setOpenId: (id: number | null) => void;
};

const faqData: FAQ[] = [
  {
    question: "WHAT'S TRENDING IN FURNITURE FOR THE FAST?",
    answer:
      "Biltong bacon pancetta corned beef filet mignon andouille cow burgd. Pork chop beef ball tip shank, brisket kielbasa turkey andouille biltong alcatra filet mignon. Swine rump meatloaf pork.",
    category: "Furniture",
  },
  {
    question: "WHAT ARE 5 WAYS TO BOOST WORKPLACE PRODUCTIVITY?",
    answer:
      "Stet clita kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet ipsum dolor sit amet, consetetur elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
    category: "Office",
  },
  {
    question: "WHAT LOFT REMODEL IN DOWNTOWN MIAMI?",
    answer:
      "Stet clita kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet ipsum dolor sit amet, consetetur elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
    category: "Office",
  },
  {
    question: "HAMBURGER SED BEEF RIBS BALL TIP SALAMI?",
    answer:
      "Stet clita kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet ipsum dolor sit amet, consetetur elitr, sed diam nonumy eirmod tempor.",
    category: "General",
  },
  {
    question: "SHANKLE SHOULDER PORK CHOP BEEF BRISKET?",
    answer:
      "Stet clita kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet ipsum dolor sit amet, consetetur elitr, sed diam nonumy eirmod tempor.",
    category: "Furniture",
  },
  {
    question: "BALL TIP FATBACK BURGDOGGEN?",
    answer:
      "Drumstick flank pork chop pastrami tenderloin. Turkey bacon cow beef ribs salami pork loin kevin fatback alcatra shankle turducken landjaeger ground round. Jerky beef turkey.",
    category: "General",
  },
  {
    question: "HAM CUPIM RIBEYE DONER TENDERLOIN VENISON?",
    answer:
      "Stet clita kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet ipsum dolor sit amet, consetetur elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
    category: "Furniture",
  },
  {
    question: "TONGUE FLANK BEEF RIBS BEEF CAPICOLA?",
    answer:
      "Stet clita kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet ipsum dolor sit amet, consetetur elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
    category: "Office",
  },
  {
    question: "T-BONE SWINE SIRLOIN BRESAOLA ANDOUILLE?",
    answer:
      "Stet clita kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet ipsum dolor sit amet, consetetur elitr, sed diam nonumy eirmod tempor.",
    category: "Remodeling",
  },
  {
    question: "FRANKFURTER PASTRAMI TENDERLOIN?",
    answer:
      "Stet clita kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet ipsum dolor sit amet, consetetur elitr, sed diam nonumy eirmod tempor.",
    category: "General",
  },
];

const categories = [
  "All",
  "Furniture",
  "Office",
  "Remodeling",
  "General",
] as const;

function Accordion({
  items,
  openId,
  setOpenId,
}: AccordionProps) {
  return (
    <div className="space-y-4">
      {items.map((faq, index) => {
        const id = faqData.indexOf(faq);
        const isOpen = openId === id;

        return (
          <div
            key={`${faq.question}-${index}`}
            className={`overflow-hidden border transition-all duration-300 ${isOpen
              ? "border-[#5fb3a9] bg-[#5fb3a9] shadow-lg"
              : "border-[#dedede] bg-white hover:border-[#cfcfcf] hover:shadow-md"
              }`}
          >
            {/* QUESTION BUTTON */}
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : id)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${id}`}
              className={`flex min-h-[72px] w-full items-center gap-4 px-5 py-5 text-left sm:px-6 ${isOpen ? "text-white" : "text-[#333333]"
                }`}
            >
              {/* NUMBER */}
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center border text-[10px] font-semibold tracking-[1px] ${isOpen
                  ? "border-white/40 text-white"
                  : "border-[#e0b15c] text-[#b28a43]"
                  }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* QUESTION */}
              <span className="flex-1 pr-2 text-[12px] font-semibold leading-5 tracking-[0.8px] sm:text-[13px]">
                {faq.question}
              </span>

              {/* PLUS */}
              <span
                aria-hidden="true"
                className={`flex h-8 w-8 shrink-0 items-center justify-center text-2xl font-light leading-none transition-transform duration-300 ${isOpen
                  ? "rotate-45 text-white"
                  : "rotate-0 text-[#5fb3a9]"
                  }`}
              >
                +
              </span>
            </button>

            {/* ANSWER */}
            <div
              id={`faq-answer-${id}`}
              role="region"
              aria-hidden={!isOpen}
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen
                ? "grid-rows-[1fr]"
                : "grid-rows-[0fr]"
                }`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="border-t border-white/20 px-5 pb-6 pt-5 sm:px-6">
                  <p className="text-[14px] leading-7 text-white/90 sm:text-[15px]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function FaqPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] =
    useState<(typeof categories)[number]>("All");

  const [openLeft, setOpenLeft] = useState<number | null>(0);
  const [openRight, setOpenRight] = useState<number | null>(null);

  const filteredFaqs = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return faqData.filter((faq) => {
      const matchesCategory =
        category === "All" || faq.category === category;

      const matchesSearch =
        searchText === "" ||
        faq.question.toLowerCase().includes(searchText) ||
        faq.answer.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  const leftFaqs = filteredFaqs.filter(
    (_, index) => index % 2 === 0
  );

  const rightFaqs = filteredFaqs.filter(
    (_, index) => index % 2 !== 0
  );

  const clearSearch = () => {
    setSearch("");
    setCategory("All");
    setOpenLeft(null);
    setOpenRight(null);
  };

  return (
    <>
      {/* ================= FAQ BANNER ================= */}
      <section className="relative flex h-[300px] w-full items-center justify-center overflow-hidden sm:h-[350px] lg:h-[380px]">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/about-banner.png')",
          }}
          aria-hidden="true"
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/60"
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 px-5 text-center text-white">
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[4px] text-[#e0b15c] sm:text-xs">
            Patel Furniture
          </p>

          <h1 className="text-4xl font-semibold tracking-wide text-[#e0b15c] sm:text-5xl md:text-6xl">
            FAQ
          </h1>

          <div className="mx-auto mt-5 h-[2px] w-12 bg-[#e0b15c]" />

          <p className="mt-5 text-[10px] uppercase tracking-[3px] text-white/80 sm:text-xs">
            HOME
            <span className="mx-3 text-[#e0b15c]">
              /
            </span>
            FAQ
          </p>
        </div>
      </section>

      {/* ================= FAQ CONTENT ================= */}
      <section className="bg-[#f5f5f5] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-10">
          {/* INTRO */}
          <div className="mx-auto max-w-[720px] text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[3px] text-[#5fb3a9] sm:text-xs">
              Frequently Asked Questions
            </p>

            <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#333333] sm:text-4xl lg:text-[42px]">
              Everything You Need To Know
            </h2>

            <div className="mx-auto mt-5 h-[2px] w-12 bg-[#e0b15c]" />

            <p className="mt-5 text-sm leading-7 text-[#6b7280] sm:text-[15px]">
              Find helpful answers about our furniture, office
              solutions, remodeling services, delivery and other
              frequently asked questions.
            </p>
          </div>

          {/* SEARCH */}
          <div className="mx-auto mt-10 max-w-[760px]">
            <div className="relative">
              <svg
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6b7280]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>

              <input
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setOpenLeft(null);
                  setOpenRight(null);
                }}
                placeholder="Search your question..."
                aria-label="Search frequently asked questions"
                className="h-14 w-full border border-[#dcdcdc] bg-white pl-12 pr-5 text-sm text-[#333333] outline-none transition placeholder:text-[#9ca3af] focus:border-[#5fb3a9] focus:ring-1 focus:ring-[#5fb3a9]"
              />
            </div>
          </div>

          {/* CATEGORIES */}
          <div className="mt-7 flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((item) => {
              const isActive = category === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setCategory(item);
                    setOpenLeft(null);
                    setOpenRight(null);
                  }}
                  className={`min-h-[40px] border px-5 text-[10px] font-semibold uppercase tracking-[1.5px] transition-all duration-300 sm:text-[11px] ${isActive
                    ? "border-[#5fb3a9] bg-[#5fb3a9] text-white shadow-sm"
                    : "border-[#dddddd] bg-white text-[#555555] hover:border-[#5fb3a9] hover:text-[#5fb3a9]"
                    }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* RESULT COUNT */}
          <div className="mb-5 mt-10 flex items-center justify-between border-b border-[#dddddd] pb-4">
            <p className="text-[10px] font-semibold uppercase tracking-[2px] text-[#6b7280]">
              {filteredFaqs.length}{" "}
              {filteredFaqs.length === 1
                ? "Question"
                : "Questions"}
            </p>

            {(search || category !== "All") && (
              <button
                type="button"
                onClick={clearSearch}
                className="text-[10px] font-semibold uppercase tracking-[1.5px] text-[#5fb3a9] transition hover:text-[#333333]"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* FAQ GRID */}
          {filteredFaqs.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
              <Accordion
                items={leftFaqs}
                openId={openLeft}
                setOpenId={setOpenLeft}
              />

              <Accordion
                items={rightFaqs}
                openId={openRight}
                setOpenId={setOpenRight}
              />
            </div>
          ) : (
            /* EMPTY STATE */
            <div className="border border-[#dddddd] bg-white px-6 py-14 text-center sm:py-16">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center border border-[#e0b15c]">
                <svg
                  className="h-5 w-5 text-[#e0b15c]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-4-4" />
                </svg>
              </div>

              <h3 className="text-2xl font-semibold text-[#333333]">
                No Questions Found
              </h3>

              <p className="mx-auto mt-3 max-w-[450px] text-sm leading-6 text-[#6b7280]">
                We could not find any questions matching your
                search. Try another keyword or clear the filters.
              </p>

              <button
                type="button"
                onClick={clearSearch}
                className="mt-6 bg-[#5fb3a9] px-6 py-3 text-[10px] font-semibold uppercase tracking-[2px] text-white transition duration-300 hover:bg-[#4d9e95]"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-[#222222] px-5 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[3px] text-[#e0b15c] sm:text-xs">
            Still Have Questions?
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl lg:text-[42px]">
            We&apos;re Here To Help
          </h2>

          <p className="mx-auto mt-5 max-w-[600px] text-sm leading-7 text-white/60 sm:text-[15px]">
            Can&apos;t find the answer you&apos;re looking for? Get in
            touch with our team and we&apos;ll be happy to help.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="bg-[#5fb3a9] px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[2px] text-white transition duration-300 hover:bg-[#4d9e95]"
            >
              Contact Us
            </Link>

            <Link
              href="/contact"
              className="border border-[#e0b15c] px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[2px] text-[#e0b15c] transition duration-300 hover:bg-[#e0b15c] hover:text-[#222222]"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}