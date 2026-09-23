// "use client";

// import { useState, useEffect } from "react";
// import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
// import { socialLinks } from "@/lib/socialLinks";

// export default function Team() {
//   const members = [
//     { image: "/images/t3.png", name: "Beatrice Rose", role: "DIRECTOR", desc: "Sausage ground round salami leberkas. Meatloaf jerky sausage ball tip turkey pork belly. Sausage pork chop cow." },
//     { image: "/images/t4.png", name: "Ruby Ruiz", role: "MANAGER", desc: "Meatloaf alcatra porchetta ground round turducken shankle swine cow beef, strip steak hamburger picanha frank." },
//     { image: "/images/t5.png", name: "Lucy Garrett", role: "DESIGNER", desc: "Ribeye hamburger cow turducken andouille. Brisket sausage pork belly frankfurter. Tenderloin filet mignon pork belly." },
//     { image: "/images/t6.png", name: "Olivia Hopkins", role: "SELLER", desc: "Chicken sirloin bresaola turducken ham hock drumstick frankfurter ribeye beef ribs alcatra andouille pork chop cupim." },
//     { image: "/images/t1.png", name: "Edna Jensen", role: "MANAGER", desc: "Pork loin rump hamburger turkey sausage ham hock beef ribs strip steak capicola chuck kevin leberkas drumstick pork chop." },
//     { image: "/images/t2.png", name: "Mike Oliver", role: "SELLER", desc: "Pastrami brisket pork belly, andouille corned beef turducken beef ribs drumstick leberkas ball tip prosciutto kielbasa boudin." },
//   ];

//   const extendedMembers = [...members, ...members.slice(0, 3)];

//   const [index, setIndex] = useState(0);
//   const [transition, setTransition] = useState(true);

//   const nextSlide = () => setIndex((prev) => prev + 1);
//   const prevSlide = () =>
//     setIndex((prev) => (prev === 0 ? members.length - 1 : prev - 1));

//   useEffect(() => {
//     if (index === members.length) {
//       setTimeout(() => {
//         setTransition(false);
//         setIndex(0);
//       }, 500);
//     }
//   }, [index, members.length]);

//   useEffect(() => {
//     if (!transition) {
//       setTimeout(() => setTransition(true), 50);
//     }
//   }, [transition]);

//   const centerIndex = index + 1;

//   return (
//     <section className="w-full bg-[#f5f5f5] py-[120px] overflow-visible">
//       <div className="max-w-[1200px] mx-auto px-6 text-center">

//         <h2 className="text-[40px] font-semibold text-gray-800 mb-4">
//           Our Team of Professionals
//         </h2>

//         <div className="w-[40px] h-[3px] bg-[#d4a762] mx-auto mb-6"></div>

//         <p className="text-gray-600 max-w-[750px] mx-auto mb-20 leading-[28px]">
//           Picanha spare ribs pariatur velit pork sirloin. Consequat capicola
//           pastrami non, minim ribeye meatloaf consectetur pork loin ground round
//           bacon quis t-bone labore.
//         </p>

//         <div className="relative">

//           {/* LEFT ARROW */}
//           <button
//             onClick={prevSlide}
//             className="absolute left-[-40px] top-[35%] text-3xl text-gray-500 hover:text-black z-10"
//           >
//             ‹
//           </button>

//           {/* SLIDER */}
//           <div className="overflow-hidden">
//             <div
//               className={`flex ${transition ? "transition-all duration-500 ease-in-out" : ""}`}
//               style={{ transform: `translateX(-${index * 33.333}%)` }}
//             >
//               {extendedMembers.map((member, i) => {
//                 const isActive = i === centerIndex;

//                 return (
//                   <div
//                     key={i}
//                     className={`min-w-[33.333%] px-6 transition-all duration-500 ${isActive
//                         ? "scale-105 opacity-100"
//                         : "scale-95 opacity-60"
//                       }`}
//                   >
//                     <div className="relative group">

//                       {/* IMAGE */}
//                       <div className="overflow-hidden rounded-full mx-auto w-[260px] h-[260px]">
//                         <img
//                           src={member.image}
//                           className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
//                         />
//                       </div>


//                       {/* SOCIAL ICONS */}
//                       <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition duration-500">

//                         <div className="bg-[#5fb3a9] w-10 h-10 rounded-full flex items-center justify-center text-white hover:text-black transition-colors duration-300 cursor-pointer">
//                           <a
//                             href={socialLinks.facebook}
//                             target="_blank"
//                             className="bg-[#5fb3a9] w-10 h-10 rounded-full flex items-center justify-center text-white hover:text-black transition-colors duration-300"
//                           >
//                             <FaFacebookF size={16} />
//                           </a>
//                         </div>

//                         <div className="bg-[#5fb3a9] w-10 h-10 rounded-full flex items-center justify-center text-white hover:text-black transition-colors duration-300 cursor-pointer">
//                           <a
//                             href={socialLinks.instagram}
//                             target="_blank"
//                             className="bg-[#5fb3a9] w-10 h-10 rounded-full flex items-center justify-center text-white hover:text-black transition-colors duration-300"
//                           >
//                             <FaInstagram size={16} />
//                           </a>
//                         </div>

//                         <div className="bg-[#5fb3a9] w-10 h-10 rounded-full flex items-center justify-center text-white hover:text-black transition-colors duration-300 cursor-pointer">
//                           <a
//                             href={socialLinks.whatsapp}
//                             target="_blank"
//                             className="bg-[#5fb3a9] w-10 h-10 rounded-full flex items-center justify-center text-white hover:text-black transition-colors duration-300"
//                           >
//                             <FaWhatsapp size={16} />
//                           </a>
//                         </div>

//                       </div>
//                     </div>

//                     {/* TEXT AREA */}
//                     <div className="mt-8 min-h-[180px]">
//                       <h3 className="text-[24px] font-medium text-gray-800 mb-2 cursor-pointer hover:text-[#66ccbe] transition duration-300">
//                         {member.name}
//                       </h3>

//                       <p className="text-[#5fb3a9] font-semibold text-sm mb-4">
//                         {member.role}
//                       </p>

//                       <p className="text-gray-600 text-sm leading-[24px] px-4">
//                         {member.desc}
//                       </p>
//                     </div>

//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* RIGHT ARROW */}
//           <button
//             onClick={nextSlide}
//             className="absolute right-[-40px] top-[35%] text-3xl text-gray-500 hover:text-black z-10"
//           >
//             ›
//           </button>

//         </div>
//       </div>
//     </section>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { socialLinks } from "@/lib/socialLinks";

export default function Team() {
  const members = [
    {
      image: "/images/t3.png",
      name: "Beatrice Rose",
      role: "DIRECTOR",
      desc: "Sausage ground round salami leberkas. Meatloaf jerky sausage ball tip turkey pork belly. Sausage pork chop cow.",
    },
    {
      image: "/images/t4.png",
      name: "Ruby Ruiz",
      role: "MANAGER",
      desc: "Meatloaf alcatra porchetta ground round turducken shankle swine cow beef, strip steak hamburger picanha frank.",
    },
    {
      image: "/images/t5.png",
      name: "Lucy Garrett",
      role: "DESIGNER",
      desc: "Ribeye hamburger cow turducken andouille. Brisket sausage pork belly frankfurter. Tenderloin filet mignon pork belly.",
    },
    {
      image: "/images/t6.png",
      name: "Olivia Hopkins",
      role: "SELLER",
      desc: "Chicken sirloin bresaola turducken ham hock drumstick frankfurter ribeye beef ribs alcatra andouille pork chop cupim.",
    },
    {
      image: "/images/t1.png",
      name: "Edna Jensen",
      role: "MANAGER",
      desc: "Pork loin rump hamburger turkey sausage ham hock beef ribs strip steak capicola chuck kevin leberkas drumstick pork chop.",
    },
    {
      image: "/images/t2.png",
      name: "Mike Oliver",
      role: "SELLER",
      desc: "Pastrami brisket pork belly, andouille corned beef turducken beef ribs drumstick leberkas ball tip prosciutto kielbasa boudin.",
    },
  ];

  /*
   * Extra copies for seamless looping
   */
  const extendedMembers = [
    ...members,
    ...members,
    ...members,
  ];

  /*
   * Start from the middle copy.
   * This gives us room to move both directions.
   */
  const [index, setIndex] = useState(members.length);
  const [isPaused, setIsPaused] = useState(false);

  /*
   * Prevent multiple clicks during animation
   */
  const [isAnimating, setIsAnimating] = useState(true);

  /*
   * Number of items visible on desktop
   */
  const visibleSlides = 3;

  /*
   * Move NEXT
   */
  const nextSlide = () => {
    if (!isAnimating) return;

    setIsAnimating(false);

    setIndex((prev) => prev + 1);

    setTimeout(() => {
      setIsAnimating(true);
    }, 650);
  };

  /*
   * Move PREVIOUS
   */
  const prevSlide = () => {
    if (!isAnimating) return;

    setIsAnimating(false);

    setIndex((prev) => prev - 1);

    setTimeout(() => {
      setIsAnimating(true);
    }, 650);
  };

  /*
   * After reaching the end of the middle copy,
   * silently move back to the same position in the middle.
   */
  useEffect(() => {
    if (index >= members.length * 2) {
      const timer = setTimeout(() => {
        setIndex(members.length);
      }, 700);

      return () => clearTimeout(timer);
    }

    if (index < members.length) {
      const timer = setTimeout(() => {
        setIndex(members.length * 2 - 1);
      }, 700);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [index, members.length]);

  /*
   * Auto slide
   */
  useEffect(() => {
    if (isPaused || !isAnimating) return;

    const timer = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, isAnimating]);

  /*
   * Current dot
   */
  const activeDot =
    ((index - members.length) % members.length + members.length) %
    members.length;

  return (
    <section className="w-full overflow-hidden bg-[#f7f7f5] py-20 sm:py-24 lg:py-[120px]">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">

        {/* ================= HEADER ================= */}

        <div className="mx-auto max-w-[760px] text-center">

          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[4px] text-[#5fb3a9] sm:text-xs">
            Meet The People
          </p>

          <h2 className="text-4xl font-semibold leading-tight tracking-tight text-[#222222] sm:text-5xl lg:text-[46px]">
            Our Team of Professionals
          </h2>

          <div className="mx-auto mt-5 h-[2px] w-12 bg-[#c9a66b]" />

          <p className="mx-auto mt-6 max-w-[750px] text-sm leading-7 text-[#777777] sm:text-[15px]">
            Picanha spare ribs pariatur velit pork sirloin. Consequat capicola
            pastrami non, minim ribeye meatloaf consectetur pork loin ground
            round bacon quis t-bone labore.
          </p>

        </div>

        {/* ================= CAROUSEL ================= */}

        <div
          className="relative mt-14 sm:mt-16 lg:mt-20"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >

          {/* LEFT BUTTON */}

          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous team member"
            className="
              absolute left-0 top-[125px] z-30
              flex h-11 w-11
              -translate-y-1/2
              items-center justify-center
              rounded-full
              border border-[#ddddda]
              bg-white
              text-[#333333]
              shadow-[0_5px_18px_rgba(0,0,0,0.07)]
              transition-all duration-300
              hover:-translate-x-1
              hover:border-[#5fb3a9]
              hover:bg-[#5fb3a9]
              hover:text-white
              focus:outline-none
              focus:ring-2
              focus:ring-[#c9a66b]
              focus:ring-offset-2
              sm:-left-1
              lg:-left-5
            "
          >
            <FaChevronLeft size={13} />
          </button>

          {/* VIEWPORT */}

          <div className="overflow-hidden px-10 sm:px-8 lg:px-5">

            {/* TRACK */}

            <div
              className="
                flex
                transition-transform
                duration-[650ms]
                ease-[cubic-bezier(0.22,1,0.36,1)]
              "
              style={{
                transform: `translateX(calc(-${index} * (100% / ${visibleSlides})))`,
              }}
            >

              {extendedMembers.map((member, i) => {

                /*
                 * Middle copy is used to calculate active member.
                 */
                const realIndex = i % members.length;

                const isActive = realIndex === activeDot;

                return (
                  <div
                    key={`${member.name}-${i}`}
                    className="
                      min-w-[33.333333%]
                      shrink-0
                      px-3
                      sm:px-4
                      lg:px-5
                    "
                  >

                    <article
                      className={`
                        mx-auto
                        max-w-[350px]
                        text-center
                        transition-all
                        duration-500
                        ${isActive
                          ? "scale-100 opacity-100"
                          : "scale-[0.96] opacity-60"
                        }
                      `}
                    >

                      {/* ================= IMAGE ================= */}

                      <div className="group relative mx-auto w-fit">

                        <div
                          className={`
                            rounded-full
                            p-[5px]
                            transition-all
                            duration-500
                            ${isActive
                              ? "bg-gradient-to-br from-[#c9a66b] via-[#e6d3ae] to-[#5fb3a9] shadow-[0_15px_35px_rgba(0,0,0,0.10)]"
                              : "bg-[#e4e4df] shadow-[0_8px_25px_rgba(0,0,0,0.05)]"
                            }
                          `}
                        >

                          <div className="rounded-full bg-white p-[3px]">

                            <div className="relative h-[210px] w-[210px] overflow-hidden rounded-full sm:h-[235px] sm:w-[235px] lg:h-[265px] lg:w-[265px]">

                              <img
                                src={member.image}
                                alt={`${member.name} - ${member.role}`}
                                className="
                                  h-full
                                  w-full
                                  object-cover
                                  transition-transform
                                  duration-700
                                  ease-out
                                  group-hover:scale-105
                                "
                              />

                              {/* IMAGE OVERLAY */}

                              <div className="
                                absolute
                                inset-0
                                bg-[#111111]/0
                                transition-all
                                duration-500
                                group-hover:bg-[#111111]/45
                              " />

                              {/* SOCIAL ICONS */}

                              <div className="
                                absolute
                                inset-0
                                flex
                                items-center
                                justify-center
                                gap-2.5
                                opacity-0
                                transition-all
                                duration-500
                                group-hover:opacity-100
                              ">

                                <a
                                  href={socialLinks.facebook}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`${member.name} Facebook`}
                                  className="
                                    flex
                                    h-10
                                    w-10
                                    translate-y-3
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-white/30
                                    bg-[#5fb3a9]
                                    text-white
                                    shadow-lg
                                    transition-all
                                    duration-300
                                    group-hover:translate-y-0
                                    hover:-translate-y-1
                                    hover:bg-white
                                    hover:text-[#252525]
                                  "
                                >
                                  <FaFacebookF size={14} />
                                </a>

                                <a
                                  href={socialLinks.instagram}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`${member.name} Instagram`}
                                  className="
                                    flex
                                    h-10
                                    w-10
                                    translate-y-3
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-white/30
                                    bg-[#5fb3a9]
                                    text-white
                                    shadow-lg
                                    transition-all
                                    delay-75
                                    duration-300
                                    group-hover:translate-y-0
                                    hover:-translate-y-1
                                    hover:bg-white
                                    hover:text-[#252525]
                                  "
                                >
                                  <FaInstagram size={14} />
                                </a>

                                <a
                                  href={socialLinks.whatsapp}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`${member.name} WhatsApp`}
                                  className="
                                    flex
                                    h-10
                                    w-10
                                    translate-y-3
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-white/30
                                    bg-[#5fb3a9]
                                    text-white
                                    shadow-lg
                                    transition-all
                                    delay-150
                                    duration-300
                                    group-hover:translate-y-0
                                    hover:-translate-y-1
                                    hover:bg-white
                                    hover:text-[#252525]
                                  "
                                >
                                  <FaWhatsapp size={14} />
                                </a>

                              </div>

                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ================= INFO ================= */}

                      <div className="mx-auto mt-7 min-h-[190px] max-w-[330px]">

                        <h3 className="
                          text-[22px]
                          font-semibold
                          leading-tight
                          text-[#222222]
                          transition-colors
                          duration-300
                          hover:text-[#5fb3a9]
                          sm:text-[24px]
                        ">
                          {member.name}
                        </h3>

                        <div className="mx-auto mt-3 flex items-center justify-center gap-2">

                          <span className="h-px w-5 bg-[#ddddda]" />

                          <p className="
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[2.5px]
                            text-[#5fb3a9]
                          ">
                            {member.role}
                          </p>

                          <span className="h-px w-5 bg-[#ddddda]" />

                        </div>

                        <p className="
                          mx-auto
                          mt-5
                          max-w-[310px]
                          text-sm
                          leading-7
                          text-[#777777]
                        ">
                          {member.desc}
                        </p>

                      </div>

                    </article>

                  </div>
                );
              })}

            </div>
          </div>

          {/* RIGHT BUTTON */}

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next team member"
            className="
              absolute right-0 top-[125px] z-30
              flex h-11 w-11
              -translate-y-1/2
              items-center justify-center
              rounded-full
              border border-[#ddddda]
              bg-white
              text-[#333333]
              shadow-[0_5px_18px_rgba(0,0,0,0.07)]
              transition-all duration-300
              hover:translate-x-1
              hover:border-[#5fb3a9]
              hover:bg-[#5fb3a9]
              hover:text-white
              focus:outline-none
              focus:ring-2
              focus:ring-[#c9a66b]
              focus:ring-offset-2
              sm:-right-1
              lg:-right-5
            "
          >
            <FaChevronRight size={13} />
          </button>

        </div>

        {/* ================= DOTS ================= */}

        <div className="mt-7 flex items-center justify-center gap-2 sm:mt-9">

          {members.map((_, dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              aria-label={`Show team member ${dotIndex + 1}`}
              onClick={() => {
                setIndex(members.length + dotIndex);
              }}
              className={`
                h-[2px]
                transition-all
                duration-300
                focus:outline-none
                focus:ring-2
                focus:ring-[#c9a66b]
                ${activeDot === dotIndex
                  ? "w-8 bg-[#5fb3a9]"
                  : "w-4 bg-[#d5d5d0] hover:bg-[#c9a66b]"
                }
              `}
            />
          ))}

        </div>

      </div>
    </section>
  );
}
