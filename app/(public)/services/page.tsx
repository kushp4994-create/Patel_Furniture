export default function ServicesPage() {
  const services = [
    {
      image: "/images/s1.png",
      title: "Individual Design",
      desc: "Short ribs tri-tip drumstick ribeye turducken pastrami frankfurter prosciutto shankle pork sausage shoulder.",
    },
    {
      image: "/images/s2.png",
      title: "Fast Delivery",
      desc: "Picanha ham short loin, t-bone strip steak ball tip chicken shankle venison doner. Alcatra shank shankle.",
    },
    {
      image: "/images/s3.png",
      title: "Free Assembly",
      desc: "Corned beef drumstick andouille venison turducken alcatra. Drumstick flank short loin, pancetta salami spare ribs.",
    },
    {
      image: "/images/s4.png",
      title: "Service B2B",
      desc: "Ball tip drumstick rump, flank landjaeger short ribs filet mignon cow corned beef ribeye burgdoggen porchetta ham.",
    },
    {
      image: "/images/s5.png",
      title: "Warranty 5 years",
      desc: "Biltong ham andouille corned beef salami spare ribs, shank pork beef ham hock drumstick turducken flank chuck.",
    },
    {
      image: "/images/s6.png",
      title: "Credit",
      desc: "Andouille fatback pig burgdoggen. Tri-tip kevin sausage, jowl hamburger bacon cow turducken beef.",
    },
  ];

  return (
    <>
      {/* ================= SERVICES BANNER ================= */}
      <section className="relative w-full h-[350px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/about-banner.png')" }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative text-center text-white">
          <h1 className="text-5xl font-semibold text-[#e0b15c] mb-4">
            Services
          </h1>

          <p className="text-sm tracking-widest uppercase">
            HOME &nbsp; / &nbsp; SERVICES
          </p>
        </div>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <section className="py-[120px] bg-[#fffff]">
        <div className="max-w-[1200px] mx-auto px-6">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

            {services.map((service, i) => (
              <div
                key={i}
                className="bg-[#f5f5f5] shadow-sm hover:shadow-xl transition duration-500 group"
              >

                {/* IMAGE */}
                <div className="overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-[220px] object-cover transition duration-500"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-8 text-center">

                  <h3 className="text-[35px] font-semi text-gray-800 mb-6 transition duration-300 group-hover:text-[#5fb3a9]">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 text-[15px] leading-7">
                    {service.desc}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>
      </section>
    </>
  );
}