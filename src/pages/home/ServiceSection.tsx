import React from "react";
import { FiMapPin } from "react-icons/fi";

const recommendationData = [
  {
    id: 1,
    imageSrc: "/rekom-1.jpg",
    title: "Geprekin By Gondes",
    description: "Restoran ayam geprek",
    address:
      "Jl. Akses UI No.18, Tugu, Kec. Cimanggis, Kota Depok, Jawa Barat 16451",
  },
  {
    id: 2,
    imageSrc: "/rekom-2.jpg",
    title: "Mie Ayam Gurita",
    description: "Usaha ayam crispy dengan konsep unik.",
    address: "Jl. Rtm No.8, Tugu, Kec. Cimanggis, Kota Depok, Jawa Barat 16451",
  },
  {
    id: 3,
    imageSrc: "/rekom-3.jpg",
    title: "Warung Goceng",
    description: "Warung makan yang populer dengan konsep serba Rp6.000",
    address:
      "Jalan Raya Akses UI, Depok, di samping Bakso Aci Akang, dekat Gedung H Kampus Gunadarma.",
  },
  {
    id: 4,
    imageSrc: "/rekom-4.jpg",
    title: "Bakso Malang Citra",
    description:
      "Tempat makan bakso malang di Depok yang populer dan paling enak.",
    address:
      "Jl. Margonda No.515, Pondok Cina, Kecamatan Beji, Kota Depok, Jawa Barat 16424",
  },
  {
    id: 5,
    imageSrc: "/rekom-5.jpg",
    title: "Warung Boboko",
    description: "Warung khas sunda di sekitar Universitas Gunadarma.",
    address:
      "Jl. Kelapa Dua Wetan No.10, Tugu, Kec. Cimanggis, Kota Depok, Jawa Barat 16451",
  },
  {
    id: 6,
    imageSrc: "/rekom-6.jpg",
    title: "Warung Gembira",
    description: "Warung Khas Sunda",
    address:
      "Jl. Palem II No.40, Tugu, Kec. Cimanggis, Kota Depok, Jawa Barat 16451",
  },
];

const Servicesection: React.FC = () => {
  return (
    <section className="bg-bg-main py-20 px-6 md:px-10 lg:px-12">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900">
          Rekomendasi Jasa Di Sekitar Mu
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendationData.map((item) => (
          <div
            key={item.id}
            className="group rounded-lg shadow-lg overflow-hidden transition-all duration-300
                       bg-white text-gray-900
                       hover:shadow-2xl hover:-translate-y-1
                       hover:bg-brand-brown hover:text-white"
          >
            <img
              src={item.imageSrc}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
              <p className="text-sm mb-4 text-gray-600 group-hover:text-gray-200">
                {item.description}
              </p>
              <div className="flex items-start gap-3">
                <FiMapPin className="h-5 w-5 flex-shrink-0 mt-0.5 text-gray-500 group-hover:text-gray-200" />
                <p className="text-xs text-gray-600 group-hover:text-gray-200">
                  {item.address}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Servicesection;
