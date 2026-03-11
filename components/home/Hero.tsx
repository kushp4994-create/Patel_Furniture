"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const slides = [
    {
      image: "/images/slide01-1.jpg",
      title: "For People Who Love Their Home",
      description:
        "Comfort+ first opened its doors in 2006, in Miami, Florida. Since our inception, we have worked meticulously to improve both our internal processes and our outward appearance.",
      button: "More Information",
    },
    {
      image: "/images/slide02-1.jpg",
      title: "Quality Doesn’t Have To Be Expensive",
      description:
        "Comfort+ first opened its doors in 2006, in Miami, Florida. Since our inception, we have worked meticulously to improve both our internal processes and our outward appearance.",
      button: "More Information",
    },
    {
      image: "/images/slide03-1.jpg",
      title: "Furniture Inspired By Innovation",
      description:
        "Comfort+ first opened its doors in 2006, in Miami, Florida. Since our inception, we have worked meticulously to improve both our internal processes and our outward appearance.",
      button: "More Information",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden">

      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Content */}
          <div className="relative h-full flex items-center justify-center text-center px-4 sm:px-6">
            <div
              className={`max-w-4xl text-white transition-all duration-700 ${
                index === current
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {slide.title}
              </h1>

              <p className="text-sm sm:text-lg md:text-xl text-gray-200 mb-8 px-2 sm:px-0">
                {slide.description}
              </p>

              <button className="bg-teal-500 text-white px-6 sm:px-8 py-3 font-semi hover:text-black transition-all duration-300">
                {slide.button}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3 px-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              current === index
                ? "bg-teal-500 scale-125"
                : "bg-white"
            }`}
          />
        ))}
      </div>

    </section>
  );
}