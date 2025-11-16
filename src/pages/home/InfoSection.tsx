import React from "react";

const serviceData = [
  {
    id: 1,
    icon: "/icon1.png",
    title: "Jelajahi UMKM",
    description:
      "Telusuri direktori lengkap kami untuk menemukan produk dan jasa unik dari UMKM terbaik di sekitar Anda.",
  },
  {
    id: 2,
    icon: "/icon2.png",
    title: "Navigasi Cerdas",
    description:
      "Dapatkan arahan instan. Peta interaktif kami memandu Anda langsung ke pintu UMKM favorit Anda tanpa repot.",
  },
  {
    id: 3,
    icon: "/icon3.png",
    title: "Sorotan UMKM",
    description:
      "Lihat apa yang sedang populer. Kami mengurasi UMKM unggulan dan rekomendasi terbaik khusus untuk Anda.",
  },
];

const InfoSection: React.FC = () => {
  return (
    <section
      id="info-section"
      className="bg-bg-main py-20 px-6 md:px-10 lg:px-12"
    >
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">Layanan Kami</h2>
        <p className="text-lg text-gray-600">
          UMKM Kami Hadir Menjadi Solusi Bagi Anda
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {serviceData.map((service) => (
          <div
            key={service.id}
            className="group rounded-xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300
                       bg-white text-gray-800
                       hover:shadow-2xl hover:-translate-y-2
                       hover:bg-brand-brown hover:text-white
                       h-full"
          >
            <img
              src={service.icon}
              alt={`${service.title} icon`}
              className="h-16 w-16 object-contain mb-6"
            />
            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
            <p className="text-sm text-gray-600 group-hover:text-gray-200">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InfoSection;
