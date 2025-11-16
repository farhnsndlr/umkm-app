import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const slides = [
  {
    image: "../../Makanan/bakso-citra.jpg",
    title: "Bakso Malang Citra Margonda",
  },
  {
    image: "../../Jasa/gwapo.jpeg",
    title: "Gwapo",
  },
  {
    image: "../../Minuman/ce-hun-tiaw.png",
    title: "Es Ce Hun Tiaw",
  },
  {
    image: "../../Jasa/laundry-rakyat.jpg",
    title: "Laundry Rakyat",
  },
];

const DisplaySection: React.FC = () => {
  return (
    <section id="display-section" className="bg-bg-main py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Tampilan UMKM-i
          </h2>
          <p className="text-center mb-12 max-w-2xl mx-auto text-gray-700">Temukan UMKM Pilihan Anda</p>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
        <Swiper
          modules={[Navigation, Autoplay]}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: ".display-prev-btn",
            nextEl: ".display-next-btn",
          }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          className="!pb-4"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-96 overflow-hidden rounded-lg shadow-lg">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-8 left-8 text-white text-4xl font-bold">
                  {slide.title}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className="display-prev-btn absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition transform hover:scale-110 z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={28} className="text-amber-900" />
        </button>
        <button
          className="display-next-btn absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition transform hover:scale-110 z-10"
          aria-label="Next slide"
        >
          <ChevronRight size={28} className="text-amber-900" />
        </button>
      </div>
    </section>
  );
};

export default DisplaySection;
