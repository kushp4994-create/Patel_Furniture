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
    <section className="w-full bg-[#f4f4f4] py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6 text-center">

        <h2 className="text-[40px] font-semibold text-gray-800 mb-4">
          Our Blog
        </h2>

        <div className="w-[40px] h-[3px] bg-[#d4a762] mx-auto mb-6"></div>

        <p className="text-gray-600 max-w-[710px] mx-auto mb-16 leading-[28px]">
          Strip steak pork prosciutto salami capicola cow, meatball tri-tip. Pork belly alcatra t-bone chicken.
Ham hock tenderloin pork belly flank. Jerky ham short ribs.
        </p>

        <div className="grid md:grid-cols-3 gap-10">

          {posts.map((post, index) => (
            <div
              key={index}
              className="bg-white shadow-md hover:shadow-xl transition duration-300 group"
            >

              {/* IMAGE WITH DARK OVERLAY */}
              <div className="relative overflow-hidden cursor-pointer">
                <img
                  src={post.image}
                  className="w-full h-[260px] object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition duration-300"></div>
              </div>

              {/* CONTENT */}
              <div className="p-8 text-center">

                {/* DATE */}
                <p className="text-[#5fb3a9] text-sm font-semibold tracking-widest mb-4 cursor-pointer hover:text-black transition">
                  {post.date}
                </p>

                {/* TITLE */}
                <h3 className="text-[30px] font-medium text-gray-800 mb-4 cursor-pointer hover:text-[#5fb3a9] transition">
                  {post.title}
                </h3>

                <p className="text-gray-600 text-[15px] leading-[26px] mb-6">
                  {post.desc}
                </p>

                {/* BUTTON */}
                <button className="bg-[#5fb3a9] text-white px-6 py-3 text-sm font-semibold cursor-pointer hover:text-black transition">
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