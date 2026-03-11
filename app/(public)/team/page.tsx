import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function TeamPage() {
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

  return (
    <>
      {/* ================= TEAM BANNER ================= */}
      <section className="relative w-full h-[350px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/about-banner.png')" }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative text-center text-white">
          <h1 className="text-5xl font-semibold text-[#e0b15c] mb-4">
            Team
          </h1>

          <p className="text-sm tracking-widest uppercase">
            HOME &nbsp; / &nbsp; TEAM
          </p>
        </div>
      </section>

      {/* ================= TEAM GRID SECTION ================= */}
      <section className="py-[120px] bg-[#f5f5f5]">
        <div className="max-w-[1300px] mx-auto px-6">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-10 text-center">

            {members.map((member, i) => (
              <div key={i} className="group">

                {/* IMAGE */}
                <div className="w-[370px] h-[370px] mx-auto rounded-full overflow-hidden mb-6 shadow-lg transition duration-500 group-hover:scale-105">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* NAME */}
                <h3 className="text-xl font-semibold text-gray-800 mb-1 hover:text-[#5fb3a9] cursor-pointer ">
                  {member.name}
                </h3>

                {/* ROLE */}
                <p className="text-[#5fb3a9] text-sm font-semibold mb-6 uppercase tracking-widest">
                  {member.role}
                </p>

                {/* DESCRIPTION */}
                <p className="text-gray-500 text-[17px] leading-6 max-w-[500px] mx-auto mb-6">
                  {member.desc}
                </p>

                {/* SOCIAL ICONS */}
                <div className="flex justify-center gap-8 text-gray-400">
                  <FaFacebookF className="cursor-pointer hover:text-[#5fb3a9] transition" />
                  <FaTwitter className="cursor-pointer hover:text-[#5fb3a9] transition" />
                  <FaInstagram className="cursor-pointer hover:text-[#5fb3a9] transition" />
                </div>

              </div>
            ))}

          </div>

        </div>
      </section>
    </>
  );
}