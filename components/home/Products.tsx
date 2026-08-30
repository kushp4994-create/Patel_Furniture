"use client";

import { useState, useEffect } from "react";

export default function Products() {
  const products = [
    {
      image: "/images/bedroom.png",
      title: "Bedroom Furniture",
      desc: "Bacon meatloaf cupim, t-bone short loin spare ribs alcatra swine andouille. Pork chop landjaeger andouille boudin ball tip",
    },
    {
      image: "/images/kitchen.png",
      title: "Kitchen Furniture",
      desc: "Frankfurter sirloin drumstick turducken, spare ribs venison cow salami burgdoggen tongue shoulder fatback chicken jerky biltong.",
    },
    {
      image: "/images/hall.png",
      title: "Hall Furniture",
      desc: "Chicken tenderloin swine, turducken pastrami shoulder alcatra short ribs pork ham shan.",
    },
    {
      image: "/images/dining.png",
      title: "Dining Room furniture",
      desc: "Ham jerky in pastrami, andouille ham hock nisi ut pig ground round pork chop sint kevin porchetta.",
    },
    {
      image: "/images/bathroom.png",
      title: "Bathroom Furniture",
      desc: "Pancetta jerky porchetta chicken, doner capicola venison pork chop pastrami tail tongue meatball.",
    },
    {
      image: "/images/nursery.png",
      title: "Nursery Furniture",
      desc: "Chuck landjaeger drumstick spare ribs sausage ground round porchetta pork swine meatloaf.",
    },
  ];

  // clone first 3 items for smooth infinite effect
  const extended = [...products, ...products.slice(0, 3)];

  const [index, setIndex] = useState(0);
  const [transition, setTransition] = useState(true);

  const nextSlide = () => {
    setIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (index === 0) {
      setIndex(products.length);
    } else {
      setIndex((prev) => prev - 1);
    }
  };

  // Reset smoothly when reach cloned slides
  useEffect(() => {
    if (index === products.length) {
      setTimeout(() => {
        setTransition(false);
        setIndex(0);
      }, 500);
    }
  }, [index, products.length]);

  useEffect(() => {
    if (!transition) {
      setTimeout(() => setTransition(true), 50);
    }
  }, [transition]);

  return (
    <section className="w-full bg-[#f2f2f2] py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6 text-center">

        <h2 className="text-[42px] font-semibold text-gray-800 mb-4">
          Our Products
        </h2>

        <div className="w-[40px] h-[3px] bg-[#d4a762] mx-auto mb-6"></div>

        <p className="text-gray-600 text-[18px] max-w-[730px] mx-auto mb-16 leading-[30px]">
          Leberkas turkey kielbasa, alcatra cupim ball tip pig biltong shank salami.
        </p>

        <div className="relative">

          <button
            onClick={prevSlide}
            className="absolute left-[-40px] top-1/2 -translate-y-1/2 text-3xl text-gray-500 hover:text-black cursor-pointer"
          >
            ‹
          </button>

          <div className="overflow-hidden">
            <div
              className={`flex ${
                transition ? "transition-transform duration-500 ease-in-out" : ""
              }`}
              style={{
                transform: `translateX(-${index * 33.333}%)`,
              }}
            >
              {extended.map((item, i) => (
                <div key={i} className="min-w-[33.333%] px-4 text-center">
                  <img
                    src={item.image}
                    className="mx-auto w-[220px] h-[220px] object-cover mb-6"
                  />

                  <h3 className="text-[26px] font-semibold text-black mb-4">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-[15px] leading-[26px] px-4">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-[-40px] top-1/2 -translate-y-1/2 text-3xl text-gray-500 hover:text-black cursor-pointer"
          >
            ›
          </button>

        </div>
      </div>
    </section>
  );
}