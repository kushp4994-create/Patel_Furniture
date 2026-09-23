// "use client";

// import { useState } from "react";

// export default function FAQ() {
//   const [openIndex, setOpenIndex] = useState(0);

//   const faqs = [
//     {
//       question: "WHAT'S TRENDING IN FURNITURE FOR THE FAST APPROACHING 2017?",
//       answer:
//         "Biltong bacon pancetta corned beef filet mignon andouille cow burgdoggen. Pork chop beef ball tip shank, brisket kielbasa turkey andouille biltong alcatra filet mignon. Swine rump meatloaf pork alcatra strip steak turducken.",
//     },
//     {
//       question: "WHAT ARE 5 WAYS TO BOOST WORKPLACE PRODUCTIVITY?",
//       answer:
//         "Stet clita kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet ipsum dolor sit amet, consetetur elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
//     },
//     {
//       question: "WHAT LOFT REMODEL IN DOWNTOWN MIAMI?",
//       answer:
//         "Stet clita kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet ipsum dolor sit amet, consetetur elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
//     },
//   ];

//   const toggleFAQ = (index: number) => {
//     setOpenIndex(openIndex === index ? -1 : index);
//   };

//   return (
//     <section className="w-full bg-[#ffffff]">

//       <div className="grid md:grid-cols-2">

//         {/* LEFT IMAGE */}
//         <div className="h-[730px]">
//           <img
//             src="/images/half_image.jpg"
//             alt="FAQ"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* RIGHT CONTENT */}
//         <div className="bg-[#ffffff] px-12 py-20">

//           <h2 className="text-[36px] font-semibold text-gray-800 mb-4">
//             Frequently Asked Questions
//           </h2>

//           <div className="w-[40px] h-[3px] bg-[#d4a762] mb-6"></div>

//           <p className="text-gray-600 mb-10 leading-[26px]">
//             T-bone frankfurter prosciutto bacon ribeye ham hock doner rump
//             chicken ground round landjaeger shankle pancetta.
//           </p>

//           <div className="space-y-4">

//             {faqs.map((faq, index) => (
//               <div key={index} className="border border-gray-200">

//                 <button
//                   onClick={() => toggleFAQ(index)}
//                   className={`w-full text-left px-6 py-4 flex justify-between items-center text-sm font-medium transition ${
//                     openIndex === index
//                       ? "bg-[#5fb3a9] text-white"
//                       : "bg-white text-gray-700 cursor-pointer"
//                   }`}
//                 >
//                   {faq.question}
//                   <span className="text-xl ">
//                     {openIndex === index ? "−" : "+"}
//                   </span>
//                 </button>

//                 {openIndex === index && (
//                   <div className="px-6 py-5 bg-#f2f2f2 text-gray-600 text-sm leading-[26px] ">
//                     {faq.answer}
//                   </div>
//                 )}

//               </div>
//             ))}

//           </div>

//         </div>

//       </div>

//     </section>
//   );
// }






"use client";

import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "WHAT'S TRENDING IN FURNITURE FOR THE FAST APPROACHING 2017?",
      answer:
        "Biltong bacon pancetta corned beef filet mignon andouille cow burgdoggen. Pork chop beef ball tip shank, brisket kielbasa turkey andouille biltong alcatra filet mignon. Swine rump meatloaf pork alcatra strip steak turducken.",
    },
    {
      question: "WHAT ARE 5 WAYS TO BOOST WORKPLACE PRODUCTIVITY?",
      answer:
        "Stet clita kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet ipsum dolor sit amet, consetetur elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
    },
    {
      question: "WHAT LOFT REMODEL IN DOWNTOWN MIAMI?",
      answer:
        "Stet clita kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet ipsum dolor sit amet, consetetur elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="w-full bg-white">
      <div className="grid md:grid-cols-2">
        {/* LEFT IMAGE */}
        <div className="h-[730px] overflow-hidden">
          <img
            src="/images/half_image.jpg"
            alt="FAQ"
            className="w-full h-full object-cover transition-transform duration-[3000ms] ease-out hover:scale-110"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="bg-white px-12 py-20">
          <h2 className="text-[36px] font-semibold text-gray-800 mb-4">
            Frequently Asked Questions
          </h2>

          <div className="w-[40px] h-[3px] bg-[#d4a762] mb-6"></div>

          <p className="text-gray-600 mb-10 leading-[26px]">
            T-bone frankfurter prosciutto bacon ribeye ham hock doner rump
            chicken ground round landjaeger shankle pancetta.
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`border rounded-md overflow-hidden transition-all duration-300 ${isOpen
                    ? "border-[#5fb3a9] shadow-md"
                    : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className={`w-full text-left px-6 py-4 flex justify-between items-center gap-4 text-sm font-medium transition-colors duration-300 cursor-pointer ${isOpen
                      ? "bg-[#5fb3a9] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`flex items-center justify-center w-6 h-6 shrink-0 rounded-full text-lg leading-none transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"
                        }`}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {/* smooth expand/collapse via grid-template-rows trick */}
                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                    }}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 py-5 bg-[#f2f2f2] text-gray-600 text-sm leading-[26px]">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}