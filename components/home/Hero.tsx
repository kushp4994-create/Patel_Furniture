// "use client";

// import { useEffect, useState } from "react";

// export default function Hero() {
//   const slides = [
//     {
//       image: "/images/slide01-1.jpg",
//       title: "For People Who Love Their Home",
//       description:
//         "Comfort+ first opened its doors in 2006, in Miami, Florida. Since our inception, we have worked meticulously to improve both our internal processes and our outward appearance.",
//       button: "More Information",
//     },
//     {
//       image: "/images/slide02-1.jpg",
//       title: "Quality Doesn’t Have To Be Expensive",
//       description:
//         "Comfort+ first opened its doors in 2006, in Miami, Florida. Since our inception, we have worked meticulously to improve both our internal processes and our outward appearance.",
//       button: "More Information",
//     },
//     {
//       image: "/images/slide03-1.jpg",
//       title: "Furniture Inspired By Innovation",
//       description:
//         "Comfort+ first opened its doors in 2006, in Miami, Florida. Since our inception, we have worked meticulously to improve both our internal processes and our outward appearance.",
//       button: "More Information",
//     },
//   ];

//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) =>
//         prev === slides.length - 1 ? 0 : prev + 1
//       );
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="relative w-full min-h-screen overflow-hidden">

//       {slides.map((slide, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"
//             }`}
//         >
//           {/* Background Image */}
//           <div
//             className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//             style={{
//               backgroundImage: `url(${slide.image})`,
//             }}
//           />

//           {/* Overlay */}
//           <div className="absolute inset-0 bg-black/40" />

//           {/* Content */}
//           <div className="relative h-full flex items-center justify-center text-center px-4 sm:px-6">
//             <div
//               className={`max-w-4xl text-white transition-all duration-700 ${index === current
//                   ? "opacity-100 translate-y-0"
//                   : "opacity-0 translate-y-10"
//                 }`}
//             >
//               <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight">
//                 {slide.title}
//               </h1>

//               <p className="text-sm sm:text-lg md:text-xl text-gray-200 mb-8 px-2 sm:px-0">
//                 {slide.description}
//               </p>

//               <button className="bg-teal-500 text-white px-6 sm:px-8 py-3 font-semi hover:text-black transition-all duration-300">
//                 {slide.button}
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* Dots */}
//       <div className="absolute bottom-6 w-full flex justify-center gap-3 px-4">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrent(index)}
//             className={`w-3 h-3 rounded-full transition ${current === index
//                 ? "bg-teal-500 scale-125"
//                 : "bg-white"
//               }`}
//           />
//         ))}
//       </div>

//     </section>
//   );
// }


"use client";

import { useCallback, useEffect, useState } from "react";

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

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const previousSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const selectSlide = (index: number) => {
    setCurrent(index);
  };

  /* ---------------------------------------------
     AUTO SLIDER
  --------------------------------------------- */
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  /* ---------------------------------------------
     KEYBOARD NAVIGATION
  --------------------------------------------- */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        nextSlide();
      }

      if (event.key === "ArrowLeft") {
        previousSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextSlide, previousSlide]);

  return (
    <section
      className="relative min-h-[620px] w-full overflow-hidden bg-neutral-900 sm:min-h-[680px] lg:min-h-[760px] xl:min-h-screen"
      aria-label="Furniture showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* =====================================================
          SLIDES
      ====================================================== */}
      {slides.map((slide, index) => {
        const isActive = index === current;

        return (
          <div
            key={slide.image}
            className={`absolute inset-0 overflow-hidden transition-opacity duration-1000 ease-in-out ${isActive
              ? "z-10 opacity-100"
              : "z-0 opacity-0 pointer-events-none"
              }`}
            aria-hidden={!isActive}
          >
            {/* IMAGE */}
            <img
              src={slide.image}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[7000ms] ease-out ${isActive ? "scale-100" : "scale-110"
                }`}
            />

            {/* MAIN DARK GRADIENT */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/10" />

            {/* BOTTOM GRADIENT */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

            {/* VERY SUBTLE TEAL TINT */}
            <div className="absolute inset-0 bg-teal-950/10" />
          </div>
        );
      })}

      {/* =====================================================
          CONTENT
      ====================================================== */}
      <div className="relative z-20 flex min-h-[620px] items-center sm:min-h-[680px] lg:min-h-[760px] xl:min-h-screen">
        <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:px-12">
          <div className="max-w-4xl">
            {/* EYEBROW */}
            <div
              key={`eyebrow-${current}`}
              className="mb-5 flex items-center gap-3 animate-hero-eyebrow"
            >
              <span className="h-px w-10 bg-teal-400 sm:w-14" />

              <span className="text-[10px] font-semibold tracking-[0.3em] text-teal-300 sm:text-xs">
                PREMIUM HOME FURNITURE
              </span>
            </div>

            {/* TITLE */}
            <h1
              key={`title-${current}`}
              className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-white animate-hero-title sm:text-5xl md:text-6xl lg:text-7xl xl:text-[78px]"
            >
              {slideTitle(slides[current].title)}
            </h1>

            {/* DESCRIPTION */}
            <p
              key={`description-${current}`}
              className="mt-6 max-w-2xl text-sm leading-7 text-white/80 animate-hero-description sm:text-base sm:leading-8 lg:text-lg"
            >
              {slides[current].description}
            </p>

            {/* CTA */}
            <div
              key={`button-${current}`}
              className="mt-8 animate-hero-button sm:mt-10"
            >
              <button
                type="button"
                className="group inline-flex min-h-[54px] items-center gap-4 bg-teal-500 px-7 text-sm font-semibold tracking-wide text-white shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:bg-teal-400 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-black"
              >
                <span>{slides[current].button}</span>

                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-white/30 text-base transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          LEFT DECORATIVE LINE
      ====================================================== */}
      <div className="absolute left-5 top-1/2 z-30 hidden h-32 -translate-y-1/2 lg:block">
        <div className="relative h-full w-px bg-white/20">
          <div
            className="absolute left-0 top-0 w-px bg-teal-400 transition-all duration-700"
            style={{
              height: `${((current + 1) / totalSlides) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* =====================================================
          RIGHT ARROWS
      ====================================================== */}
      <div className="absolute right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 sm:right-7 lg:flex xl:right-10">
        {/* PREVIOUS */}
        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous slide"
          className="group flex h-12 w-12 items-center justify-center border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all duration-300 hover:border-teal-400 hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300"
        >
          <span
            aria-hidden="true"
            className="text-lg transition-transform duration-300 group-hover:-translate-x-1"
          >
            ←
          </span>
        </button>

        {/* NEXT */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="group flex h-12 w-12 items-center justify-center border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all duration-300 hover:border-teal-400 hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300"
        >
          <span
            aria-hidden="true"
            className="text-lg transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </button>
      </div>

      {/* =====================================================
          BOTTOM NAVIGATION
      ====================================================== */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 pb-6 sm:px-8 sm:pb-8 lg:px-12">
          {/* COUNTER */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold tracking-[0.2em] text-teal-300 sm:text-base">
              {String(current + 1).padStart(2, "0")}
            </span>

            <span className="h-px w-8 bg-white/30 sm:w-12" />

            <span className="text-xs tracking-[0.2em] text-white/50 sm:text-sm">
              {String(totalSlides).padStart(2, "0")}
            </span>
          </div>

          {/* DOTS */}
          <div
            className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2 backdrop-blur-md"
            role="tablist"
            aria-label="Hero slide navigation"
          >
            {slides.map((slide, index) => {
              const isActive = current === index;

              return (
                <button
                  key={slide.image}
                  type="button"
                  role="tab"
                  aria-label={`Go to slide ${index + 1}`}
                  aria-selected={isActive}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => selectSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-teal-300 ${isActive
                    ? "w-9 bg-teal-400"
                    : "w-2.5 bg-white/40 hover:bg-white/80"
                    }`}
                />
              );
            })}
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="h-px w-full bg-white/10">
          <div
            key={`progress-${current}`}
            className={`h-full origin-left bg-teal-400 ${isPaused ? "" : "animate-hero-progress"
              }`}
          />
        </div>
      </div>

      {/* =====================================================
          MOBILE SWIPE-FRIENDLY PREVIOUS / NEXT
      ====================================================== */}
      <div className="absolute bottom-20 right-5 z-30 flex gap-2 lg:hidden">
        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous slide"
          className="flex h-10 w-10 items-center justify-center border border-white/20 bg-black/20 text-white backdrop-blur-md transition hover:bg-teal-500"
        >
          ←
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="flex h-10 w-10 items-center justify-center border border-white/20 bg-black/20 text-white backdrop-blur-md transition hover:bg-teal-500"
        >
          →
        </button>
      </div>

      {/* =====================================================
          ANIMATIONS
      ====================================================== */}
      <style jsx>{`
        @keyframes hero-eyebrow {
          0% {
            opacity: 0;
            transform: translateY(18px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes hero-title {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes hero-description {
          0% {
            opacity: 0;
            transform: translateY(22px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes hero-button {
          0% {
            opacity: 0;
            transform: translateY(18px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes hero-progress {
          from {
            transform: scaleX(0);
          }

          to {
            transform: scaleX(1);
          }
        }

        .animate-hero-eyebrow {
          animation: hero-eyebrow 700ms ease-out forwards;
        }

        .animate-hero-title {
          animation: hero-title 800ms ease-out 100ms forwards;
          opacity: 0;
        }

        .animate-hero-description {
          animation: hero-description 800ms ease-out 250ms forwards;
          opacity: 0;
        }

        .animate-hero-button {
          animation: hero-button 800ms ease-out 400ms forwards;
          opacity: 0;
        }

        .animate-hero-progress {
          animation: hero-progress 5000ms linear forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-hero-eyebrow,
          .animate-hero-title,
          .animate-hero-description,
          .animate-hero-button,
          .animate-hero-progress {
            animation: none;
            opacity: 1;
            transform: none;
          }

          * {
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}

/* Small helper so the title renders cleanly */
function slideTitle(title: string) {
  return title;
}