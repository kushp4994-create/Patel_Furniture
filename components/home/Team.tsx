"use client";

import { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { socialLinks } from "@/lib/socialLinks";

export default function Team() {
  const members = [
    { image: "/images/t3.png", name: "Beatrice Rose", role: "DIRECTOR", desc: "Sausage ground round salami leberkas. Meatloaf jerky sausage ball tip turkey pork belly. Sausage pork chop cow." },
    { image: "/images/t4.png", name: "Ruby Ruiz", role: "MANAGER", desc: "Meatloaf alcatra porchetta ground round turducken shankle swine cow beef, strip steak hamburger picanha frank." },
    { image: "/images/t5.png", name: "Lucy Garrett", role: "DESIGNER", desc: "Ribeye hamburger cow turducken andouille. Brisket sausage pork belly frankfurter. Tenderloin filet mignon pork belly." },
    { image: "/images/t6.png", name: "Olivia Hopkins", role: "SELLER", desc: "Chicken sirloin bresaola turducken ham hock drumstick frankfurter ribeye beef ribs alcatra andouille pork chop cupim." },
    { image: "/images/t1.png", name: "Edna Jensen", role: "MANAGER", desc: "Pork loin rump hamburger turkey sausage ham hock beef ribs strip steak capicola chuck kevin leberkas drumstick pork chop." },
    { image: "/images/t2.png", name: "Mike Oliver", role: "SELLER", desc: "Pastrami brisket pork belly, andouille corned beef turducken beef ribs drumstick leberkas ball tip prosciutto kielbasa boudin." },
  ];

  const extendedMembers = [...members, ...members.slice(0, 3)];

  const [index, setIndex] = useState(0);
  const [transition, setTransition] = useState(true);

  const nextSlide = () => setIndex((prev) => prev + 1);
  const prevSlide = () =>
    setIndex((prev) => (prev === 0 ? members.length - 1 : prev - 1));

  useEffect(() => {
    if (index === members.length) {
      setTimeout(() => {
        setTransition(false);
        setIndex(0);
      }, 500);
    }
  }, [index, members.length]);

  useEffect(() => {
    if (!transition) {
      setTimeout(() => setTransition(true), 50);
    }
  }, [transition]);

  const centerIndex = index + 1;

  return (
    <section className="w-full bg-[#f5f5f5] py-[120px] overflow-visible">
      <div className="max-w-[1200px] mx-auto px-6 text-center">

        <h2 className="text-[40px] font-semibold text-gray-800 mb-4">
          Our Team of Professionals
        </h2>

        <div className="w-[40px] h-[3px] bg-[#d4a762] mx-auto mb-6"></div>

        <p className="text-gray-600 max-w-[750px] mx-auto mb-20 leading-[28px]">
          Picanha spare ribs pariatur velit pork sirloin. Consequat capicola
          pastrami non, minim ribeye meatloaf consectetur pork loin ground round
          bacon quis t-bone labore.
        </p>

        <div className="relative">

          {/* LEFT ARROW */}
          <button
            onClick={prevSlide}
            className="absolute left-[-40px] top-[35%] text-3xl text-gray-500 hover:text-black z-10"
          >
            ‹
          </button>

          {/* SLIDER */}
          <div className="overflow-hidden">
            <div
              className={`flex ${transition ? "transition-all duration-500 ease-in-out" : ""}`}
              style={{ transform: `translateX(-${index * 33.333}%)` }}
            >
              {extendedMembers.map((member, i) => {
                const isActive = i === centerIndex;

                return (
                  <div
                    key={i}
                    className={`min-w-[33.333%] px-6 transition-all duration-500 ${
                      isActive
                        ? "scale-105 opacity-100"
                        : "scale-95 opacity-60"
                    }`}
                  >
                    <div className="relative group">

                      {/* IMAGE */}
                      <div className="overflow-hidden rounded-full mx-auto w-[260px] h-[260px]">
                        <img
                          src={member.image}
                          className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

            
{/* SOCIAL ICONS */}
<div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition duration-500">
  
  <div className="bg-[#5fb3a9] w-10 h-10 rounded-full flex items-center justify-center text-white hover:text-black transition-colors duration-300 cursor-pointer">
    <a
  href={socialLinks.facebook}
  target="_blank"
  className="bg-[#5fb3a9] w-10 h-10 rounded-full flex items-center justify-center text-white hover:text-black transition-colors duration-300"
>
  <FaFacebookF size={16} />
</a>
  </div>

  <div className="bg-[#5fb3a9] w-10 h-10 rounded-full flex items-center justify-center text-white hover:text-black transition-colors duration-300 cursor-pointer">
    <a
  href={socialLinks.instagram}
  target="_blank"
  className="bg-[#5fb3a9] w-10 h-10 rounded-full flex items-center justify-center text-white hover:text-black transition-colors duration-300"
>
  <FaInstagram size={16} />
</a>
  </div>

  <div className="bg-[#5fb3a9] w-10 h-10 rounded-full flex items-center justify-center text-white hover:text-black transition-colors duration-300 cursor-pointer">
    <a
  href={socialLinks.whatsapp}
  target="_blank"
  className="bg-[#5fb3a9] w-10 h-10 rounded-full flex items-center justify-center text-white hover:text-black transition-colors duration-300"
>
  <FaWhatsapp size={16} />
</a>
  </div>

</div>
                    </div>

                    {/* TEXT AREA */}
                    <div className="mt-8 min-h-[180px]">
                      <h3 className="text-[24px] font-medium text-gray-800 mb-2 cursor-pointer hover:text-[#66ccbe] transition duration-300">
                        {member.name}
                      </h3>

                      <p className="text-[#5fb3a9] font-semibold text-sm mb-4">
                        {member.role}
                      </p>

                      <p className="text-gray-600 text-sm leading-[24px] px-4">
                        {member.desc}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT ARROW */}
          <button
            onClick={nextSlide}
            className="absolute right-[-40px] top-[35%] text-3xl text-gray-500 hover:text-black z-10"
          >
            ›
          </button>

        </div>
      </div>
    </section>
  );
}