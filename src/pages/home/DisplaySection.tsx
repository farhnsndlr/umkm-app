import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DisplaySection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&h=600&fit=crop",
      title: "Makanan",
    },
    {
      image:
        "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&h=600&fit=crop",
      title: "Barbershop",
    },
    {
      image:
        "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&h=600&fit=crop",
      title: "Minuman",
    },
    {
      image:
        "https://images.unsplash.com/photo-1610970881699-44a587cabec?w=800&h=600&fit=crop",
      title: "Loundry",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="bg-bg-main py-16">
      {" "}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-amber-900 mb-2">
            Tampilan UMKM-i
          </h2>
          <p className="text-amber-700">Temukan UMKM Pilihan Anda</p>
        </div>
      </div>
      <div className="relative">
        {" "}
        <div className="relative h-96 overflow-hidden shadow-2xl">
          {" "}
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <h3 className="absolute bottom-8 left-8 text-white text-4xl font-bold px-6 md:px-10 lg:px-12">
            {" "}
            {slides[currentSlide].title}
          </h3>
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-6 md:left-10 lg:left-12 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition transform hover:scale-110 z-10" // Sesuaikan posisi kiri dan tambahkan z-index
          aria-label="Previous slide"
        >
          <ChevronLeft size={28} className="text-amber-900" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 md:right-10 lg:right-12 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition transform hover:scale-110 z-10" // Sesuaikan posisi kanan dan tambahkan z-index
          aria-label="Next slide"
        >
          <ChevronRight size={28} className="text-amber-900" />
        </button>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === index ? "bg-white w-8" : "bg-white/50 w-2"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DisplaySection;
