import { prisma } from "@/lib/prisma";

export default async function MapSection() {

  const admin = await prisma.user.findFirst({
    where: { role: "ADMIN" },
  });

  return (
    <section className="w-full relative">

      {/* GOOGLE MAP */}
      <div className="w-full h-[500px] relative">

        <iframe
          src="https://www.google.com/maps?q=169+Adams+Ave,+Miami&output=embed"
          className="w-full h-full"
          loading="lazy"
        ></iframe>

        {/* SOFA LOGO CENTER */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white p-4 rounded-full shadow-lg">
            <img
              src="/images/logo-1.png"
              alt="Logo"
              className="w-10 h-10"
            />
          </div>
        </div>

      </div>

      {/* INFO BOX */}
      <div className="absolute bottom-0 left-0 w-full bg-[#e8c178] py-8">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-10 px-6 text-center md:text-left">

          {/* CALL */}
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="text-[#5fb3a9] text-3xl">📞</div>
            <div>
              <p className="text-sm text-gray-700">CALL US TODAY:</p>
              <p className="text-lg font-semibold text-gray-800">
                {admin?.phone}
              </p>
            </div>
          </div>

          {/* LOCATION */}
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="text-[#5fb3a9] text-3xl">📍</div>
            <div>
              <p className="text-sm text-gray-700">OUR LOCATION:</p>
              <p className="text-lg font-semibold text-gray-800">
                {admin?.address}
              </p>
            </div>
          </div>

          {/* HOURS */}
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="text-[#5fb3a9] text-3xl">🕒</div>
            <div>
              <p className="text-sm text-gray-700">OPEN HOURS:</p>
              <p className="text-lg font-semibold text-gray-800">
                Mon - Sat 8 am - 6 pm
              </p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}