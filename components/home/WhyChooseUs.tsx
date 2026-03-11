"use client";

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-[#ffffff] py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-[80px] items-center">

        {/* LEFT SIDE IMAGES */}
        <div className="relative flex justify-center md:justify-start">

          {/* BACK IMAGE */}
          <img
            src="/images/i1.png"
            className="w-[450px] h-[590px]"
          />

        </div>

        {/* RIGHT CONTENT */}
        <div>

          <h2 className="text-[40px] font-semibold text-gray-800 mb-4">
            Why You Should Choose Us?
          </h2>

          {/* Small underline */}
          <div className="w-[40px] h-[3px] bg-[#d4a762] mb-6"></div>

          <p className="text-gray-600 leading-[28px] mb-6">
            Drumstick pastrami picanha kevin, pork chop shoulder andouille ground
            round pancetta fatback.
          </p>

          <p className="text-gray-500 leading-[28px] mb-8">
            Chuck pastrami shank prosciutto, turkey salami capicola venison
            tri-tip jowl. Sausage cupim beef, meatball landjaeger ball tip
            kielbasa bacon jerky porchetta venison tri-tip cow ham shank.
          </p>

          {/* FEATURES */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-10 text-gray-600">

            <div>✔ Pleasant Staff</div>
            <div>✔ Best Quality</div>
            <div>✔ Convenient Location</div>
            <div>✔ Individual Design</div>
            <div>✔ Non-standard Offers</div>
            <div>✔ Very Fast Delivery</div>

          </div>

          {/* BUTTON */}
          <button className="bg-[#d4a762] px-10 py-4 text-white font-medium hover:bg-[#c3944f] transition text-white px-8 py-3 font-semibold cursor-pointer hover:text-black transition-all duration-300">
            READ MORE
          </button>

        </div>

      </div>
    </section>
  );
}