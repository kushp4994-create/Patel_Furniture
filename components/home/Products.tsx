// "use client";

// import { useState, useEffect } from "react";

// export default function Products() {
//   const products = [
//     {
//       image: "/images/bedroom.png",
//       title: "Bedroom Furniture",
//       desc: "Bacon meatloaf cupim, t-bone short loin spare ribs alcatra swine andouille. Pork chop landjaeger andouille boudin ball tip",
//     },
//     {
//       image: "/images/kitchen.png",
//       title: "Kitchen Furniture",
//       desc: "Frankfurter sirloin drumstick turducken, spare ribs venison cow salami burgdoggen tongue shoulder fatback chicken jerky biltong.",
//     },
//     {
//       image: "/images/hall.png",
//       title: "Hall Furniture",
//       desc: "Chicken tenderloin swine, turducken pastrami shoulder alcatra short ribs pork ham shan.",
//     },
//     {
//       image: "/images/dining.png",
//       title: "Dining Room furniture",
//       desc: "Ham jerky in pastrami, andouille ham hock nisi ut pig ground round pork chop sint kevin porchetta.",
//     },
//     {
//       image: "/images/bathroom.png",
//       title: "Bathroom Furniture",
//       desc: "Pancetta jerky porchetta chicken, doner capicola venison pork chop pastrami tail tongue meatball.",
//     },
//     {
//       image: "/images/nursery.png",
//       title: "Nursery Furniture",
//       desc: "Chuck landjaeger drumstick spare ribs sausage ground round porchetta pork swine meatloaf.",
//     },
//   ];

//   // clone first 3 items for smooth infinite effect
//   const extended = [...products, ...products.slice(0, 3)];

//   const [index, setIndex] = useState(0);
//   const [transition, setTransition] = useState(true);

//   const nextSlide = () => {
//     setIndex((prev) => prev + 1);
//   };

//   const prevSlide = () => {
//     if (index === 0) {
//       setIndex(products.length);
//     } else {
//       setIndex((prev) => prev - 1);
//     }
//   };

//   // Reset smoothly when reach cloned slides
//   useEffect(() => {
//     if (index === products.length) {
//       setTimeout(() => {
//         setTransition(false);
//         setIndex(0);
//       }, 500);
//     }
//   }, [index, products.length]);

//   useEffect(() => {
//     if (!transition) {
//       setTimeout(() => setTransition(true), 50);
//     }
//   }, [transition]);

//   return (
//     <section className="w-full bg-[#f2f2f2] py-[120px]">
//       <div className="max-w-[1200px] mx-auto px-6 text-center">

//         <h2 className="text-[42px] font-semibold text-gray-800 mb-4">
//           Our Products
//         </h2>

//         <div className="w-[40px] h-[3px] bg-[#d4a762] mx-auto mb-6"></div>

//         <p className="text-gray-600 text-[18px] max-w-[730px] mx-auto mb-16 leading-[30px]">
//           Leberkas turkey kielbasa, alcatra cupim ball tip pig biltong shank salami.
//         </p>

//         <div className="relative">

//           <button
//             onClick={prevSlide}
//             className="absolute left-[-40px] top-1/2 -translate-y-1/2 text-3xl text-gray-500 hover:text-black cursor-pointer"
//           >
//             ‹
//           </button>

//           <div className="overflow-hidden">
//             <div
//               className={`flex ${transition ? "transition-transform duration-500 ease-in-out" : ""
//                 }`}
//               style={{
//                 transform: `translateX(-${index * 33.333}%)`,
//               }}
//             >
//               {extended.map((item, i) => (
//                 <div key={i} className="min-w-[33.333%] px-4 text-center">
//                   <img
//                     src={item.image}
//                     className="mx-auto w-[220px] h-[220px] object-cover mb-6"
//                   />

//                   <h3 className="text-[26px] font-semibold text-black mb-4">
//                     {item.title}
//                   </h3>

//                   <p className="text-gray-600 text-[15px] leading-[26px] px-4">
//                     {item.desc}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <button
//             onClick={nextSlide}
//             className="absolute right-[-40px] top-1/2 -translate-y-1/2 text-3xl text-gray-500 hover:text-black cursor-pointer"
//           >
//             ›
//           </button>

//         </div>
//       </div>
//     </section>
//   );
// }




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

  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = products.length - 2;

  // Next
  const nextSlide = () => {
    setIndex((prev) => {
      if (prev >= totalSlides - 1) {
        return 0;
      }

      return prev + 1;
    });
  };

  // Previous
  const prevSlide = () => {
    setIndex((prev) => {
      if (prev <= 0) {
        return totalSlides - 1;
      }

      return prev - 1;
    });
  };

  // Auto slide
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setIndex((prev) => {
        if (prev >= totalSlides - 1) {
          return 0;
        }

        return prev + 1;
      });
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused, totalSlides]);

  return (
    <section className="w-full bg-[#f2f2f2] py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-[42px] font-semibold text-gray-800 mb-4">
          Our Products
        </h2>

        <div className="w-[40px] h-[3px] bg-[#d4a762] mx-auto mb-6"></div>

        <p className="text-gray-600 text-[18px] max-w-[730px] mx-auto mb-16 leading-[30px]">
          Leberkas turkey kielbasa, alcatra cupim ball tip pig biltong shank
          salami.
        </p>

        {/* Slider */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >

          {/* Previous Button */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous product"
            className="
              absolute left-[-40px] top-1/2 -translate-y-1/2 z-20
              flex items-center justify-center
              w-11 h-11
              rounded-full
              bg-white
              shadow-md
              text-2xl text-gray-500
              hover:text-black
              hover:scale-110
              transition-all duration-300
              cursor-pointer
            "
          >
            ‹
          </button>

          {/* Viewport */}
          <div className="overflow-hidden">

            {/* Track */}
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${index * 33.333333}%)`,
              }}
            >
              {products.map((item, i) => (
                <div
                  key={i}
                  className="w-1/3 shrink-0 px-4 text-center"
                >
                  {/* Image */}
                  <div className="group overflow-hidden rounded-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="
                        mx-auto
                        w-[220px]
                        h-[220px]
                        object-cover
                        mb-6
                        rounded-lg
                        transition-transform
                        duration-500
                        ease-out
                        group-hover:scale-105
                      "
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-[26px] font-semibold text-black mb-4">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-[15px] leading-[26px] px-4">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next product"
            className="
              absolute right-[-40px] top-1/2 -translate-y-1/2 z-20
              flex items-center justify-center
              w-11 h-11
              rounded-full
              bg-white
              shadow-md
              text-2xl text-gray-500
              hover:text-black
              hover:scale-110
              transition-all duration-300
              cursor-pointer
            "
          >
            ›
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`
                h-2 rounded-full
                transition-all duration-300
                cursor-pointer
                ${index === i
                  ? "w-6 bg-[#d4a762]"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
                }
              `}
            />
          ))}
        </div>

      </div>
    </section>
  );
}