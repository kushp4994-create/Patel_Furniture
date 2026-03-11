"use client";

import { useState, useEffect } from "react";

export default function Testimonials() {
  const testimonials = [
    {
      image: "/images/c3.png",
      name: "Miguel Nguyen",
      text: "Picanha rump sausage swine hamburger strip steak filet mignon. Chicken meatball jerky bacon pastrami cow brisket rump. Flank shankle porchetta tenderloin, capicola bacon tail andouille shoulder cow kielbasa chuck bresaola biltong.",
    },
    {
      image: "/images/c1.png",
      name: "Lucy Garrett",
      text: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla facilisi. Nullam ultrices quam est, ac fringilla ante egestas sed. Proin ac cursus odio, sit amet ellentesque enim.",
    },
    {
      image: "/images/c2.png",
      name: "Olivia Hopkins",
      text: "Donec et porttitor mauris, sit amet volutpat nunc. Nunc tincidunt et sem venenatis placerat. Donec sit amet interdum massa, vel blandit mi. Praesent consequat enim quis lacus tristique, a vulputate nisl pulvinar.",
    },
  ];

  const extended = [...testimonials, testimonials[0]];

  const [index, setIndex] = useState(0);
  const [transition, setTransition] = useState(true);

  useEffect(() => {
    if (index === testimonials.length) {
      setTimeout(() => {
        setTransition(false);
        setIndex(0);
      }, 700);
    }
  }, [index, testimonials.length]);

  useEffect(() => {
    if (!transition) {
      setTimeout(() => setTransition(true), 50);
    }
  }, [transition]);

  const next = () => setIndex((prev) => prev + 1);

  const prev = () => {
    if (index === 0) {
      setIndex(testimonials.length - 1);
    } else {
      setIndex((prev) => prev - 1);
    }
  };

  return (
        <section className="w-full bg-[#ffffff] py-[140px] text-center overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-10">

        <h2 className="text-[44px] font-semi text-gray-800 mb-4">
          Testimonials
        </h2>

        <div className="w-[50px] h-[3px] bg-[#d4a762] mx-auto mb-14"></div>

        <div className="relative">

          {/* LEFT */}
          <button
            onClick={prev}
            className="absolute left-[-70px] top-1/2 -translate-y-1/2 text-4xl text-gray-500 hover:text-black"
          >
            ‹
          </button>

          {/* SLIDER */}
          <div className="overflow-hidden">
            <div
              className={`flex ${
                transition
                  ? "transition-transform duration-700 ease-in-out"
                  : ""
              }`}
              style={{
                transform: `translateX(-${index * 100}%)`,
              }}
            >
              {extended.map((item, i) => (
                <div key={i} className="min-w-full px-10">

                  {/* QUOTES */}
                 <div className="relative mb-12">

  {/* LEFT QUOTE */}
  <span className="absolute left-0 -top-28 text-[300px] text-[#5fb3a9]">
    “
  </span>

  {/* RIGHT QUOTE */}
  <span className="absolute right-0 -top-28 text-[300px] text-[#5fb3a9]">
    ”
  </span>

  <p className="text-gray-600 italic text-xl leading-[36px] max-w-[900px] mx-auto">
    {item.text}
  </p>

</div>
                  

                  <img
                    src={item.image}
                    className="mx-auto w-[110px] h-[110px] rounded-full object-cover mb-6"
                  />

                  <h3 className="text-[26px] font-medium text-gray-800">
                    {item.name}
                  </h3>

                  <p className="text-[#5fb3a9] text-sm font-semibold mt-2 tracking-widest">
                    CLIENT
                  </p>

                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <button
            onClick={next}
            className="absolute right-[-70px] top-1/2 -translate-y-1/2 text-4xl text-gray-500 hover:text-black"
          >
            ›
          </button>

        </div>
      </div>
    </section>
  );
}