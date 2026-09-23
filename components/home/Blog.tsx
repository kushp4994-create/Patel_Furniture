// "use client";

// export default function Blog() {
//   const posts = [
//     {
//       image: "/images/Blog3.jpg",
//       date: "JULY 11, 2025",
//       title: "Cupim bacon short ribs picanha",
//       desc: "Tri-tip bacon salami pork chop pork loin leberkas ham hock venison pork belly prosciutto pancetta.",
//     },
//     {
//       image: "/images/Blog2.jpg",
//       date: "JULY 7, 2025",
//       title: "Swine short loin boud spare ribs capi",
//       desc: "Strip steak bacon boudin biltong swine ham. Sausage turkey frankfurter tri-tip pancetta ground round ball tip.",
//     },
//     {
//       image: "/images/Blog1.jpg",
//       date: "JULY 6, 2025",
//       title: "Ham venison spare ribs strip steak",
//       desc: "Shankle boudin pork loin, t-bone pastrami jerky beef. Filet mignon strip steak doner meatball, porchetta biltong.",
//     },
//   ];

//   return (
//     <section className="w-full bg-[#f4f4f4] py-[120px]">
//       <div className="max-w-[1200px] mx-auto px-6 text-center">

//         <h2 className="text-[40px] font-semibold text-gray-800 mb-4">
//           Our Blog
//         </h2>

//         <div className="w-[40px] h-[3px] bg-[#d4a762] mx-auto mb-6"></div>

//         <p className="text-gray-600 max-w-[710px] mx-auto mb-16 leading-[28px]">
//           Strip steak pork prosciutto salami capicola cow, meatball tri-tip. Pork belly alcatra t-bone chicken.
// Ham hock tenderloin pork belly flank. Jerky ham short ribs.
//         </p>

//         <div className="grid md:grid-cols-3 gap-10">

//           {posts.map((post, index) => (
//             <div
//               key={index}
//               className="bg-white shadow-md hover:shadow-xl transition duration-300 group"
//             >

//               {/* IMAGE WITH DARK OVERLAY */}
//               <div className="relative overflow-hidden cursor-pointer">
//                 <img
//                   src={post.image}
//                   className="w-full h-[260px] object-cover"
//                 />
//                 <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition duration-300"></div>
//               </div>

//               {/* CONTENT */}
//               <div className="p-8 text-center">

//                 {/* DATE */}
//                 <p className="text-[#5fb3a9] text-sm font-semibold tracking-widest mb-4 cursor-pointer hover:text-black transition">
//                   {post.date}
//                 </p>

//                 {/* TITLE */}
//                 <h3 className="text-[30px] font-medium text-gray-800 mb-4 cursor-pointer hover:text-[#5fb3a9] transition">
//                   {post.title}
//                 </h3>

//                 <p className="text-gray-600 text-[15px] leading-[26px] mb-6">
//                   {post.desc}
//                 </p>

//                 {/* BUTTON */}
//                 <button className="bg-[#5fb3a9] text-white px-6 py-3 text-sm font-semibold cursor-pointer hover:text-black transition">
//                   READ MORE
//                 </button>

//               </div>
//             </div>
//           ))}

//         </div>

//       </div>
//     </section>
//   );
// }






"use client";

export default function Blog() {
  const posts = [
    {
      image: "/images/Blog3.jpg",
      date: "JULY 11, 2025",
      title: "Cupim bacon short ribs picanha",
      desc: "Tri-tip bacon salami pork chop pork loin leberkas ham hock venison pork belly prosciutto pancetta.",
    },
    {
      image: "/images/Blog2.jpg",
      date: "JULY 7, 2025",
      title: "Swine short loin boud spare ribs capi",
      desc: "Strip steak bacon boudin biltong swine ham. Sausage turkey frankfurter tri-tip pancetta ground round ball tip.",
    },
    {
      image: "/images/Blog1.jpg",
      date: "JULY 6, 2025",
      title: "Ham venison spare ribs strip steak",
      desc: "Shankle boudin pork loin, t-bone pastrami jerky beef. Filet mignon strip steak doner meatball, porchetta biltong.",
    },
  ];

  return (
    <section className="w-full bg-[#f5f5f5] py-20 sm:py-24 lg:py-[120px]">
      <div className="mx-auto max-w-[1200px] px-5 text-center sm:px-6">

        {/* HEADING */}
        <h2 className="mb-4 text-4xl font-semibold tracking-tight text-[#252525] sm:text-[40px]">
          Our Blog
        </h2>

        {/* GOLD LINE */}
        <div className="mx-auto mb-6 h-[2px] w-12 bg-[#e0b15c]" />

        {/* DESCRIPTION */}
        <p className="mx-auto mb-14 max-w-[710px] text-sm leading-7 text-[#6b7280] sm:mb-16 sm:text-[15px]">
          Strip steak pork prosciutto salami capicola cow, meatball tri-tip.
          Pork belly alcatra t-bone chicken. Ham hock tenderloin pork belly
          flank. Jerky ham short ribs.
        </p>

        {/* BLOG CARDS */}
        <div className="grid grid-cols-1 gap-7 md:grid-cols-3 lg:gap-8">

          {posts.map((post, index) => (
            <div
              key={index}
              className="group overflow-hidden border border-[#e4e4e4] bg-white text-center shadow-[0_5px_20px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-[#5fb3a9] hover:shadow-[0_15px_35px_rgba(0,0,0,0.10)]"
            >

              {/* IMAGE */}
              <div className="relative h-[245px] cursor-pointer overflow-hidden sm:h-[260px]">

                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/20" />

                {/* TOP ACCENT */}
                <div className="absolute left-0 top-0 h-[3px] w-0 bg-[#e0b15c] transition-all duration-500 group-hover:w-full" />
              </div>

              {/* CONTENT */}
              <div className="px-6 py-8 sm:px-7 sm:py-9">

                {/* DATE */}
                <p className="mb-4 text-[11px] font-semibold tracking-[2px] text-[#5fb3a9] transition-colors duration-300 group-hover:text-[#252525]">
                  {post.date}
                </p>

                {/* SMALL LINE */}
                <div className="mx-auto mb-5 h-[2px] w-7 bg-[#e0b15c] transition-all duration-300 group-hover:w-11" />

                {/* TITLE */}
                <h3 className="mb-4 text-[24px] font-medium leading-[1.35] text-[#252525] transition-colors duration-300 group-hover:text-[#5fb3a9] sm:text-[26px]">
                  {post.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="mb-7 text-sm leading-7 text-[#6b7280] sm:text-[15px]">
                  {post.desc}
                </p>

                {/* BUTTON */}
                <button
                  type="button"
                  className="border border-[#5fb3a9] bg-[#5fb3a9] px-7 py-3 text-[11px] font-semibold uppercase tracking-[1.5px] text-white transition-all duration-300 hover:bg-transparent hover:text-[#252525] focus:outline-none focus:ring-2 focus:ring-[#e0b15c] focus:ring-offset-2"
                >
                  READ MORE
                </button>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}