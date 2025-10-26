import React from "react";
import { FiChevronRight } from "react-icons/fi";

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-hero-bg bg-cover bg-center"
      />

      <div aria-hidden="true" className="absolute inset-0 z-1 bg-white/70" />

      <div className="relative z-10 flex min-h-screen flex-col justify-center">
        <main className="px-6 md:px-10 lg:px-12">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold text-gray-900 sm:text-6xl md:text-7xl">
              Membantu Temukan Teman UMKM.
            </h1>
            <div className="mt-10 flex items-center gap-5">
              <button className="rounded-sm bg-brand-brown px-8 py-4 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-brand-brown-dark focus:outline-none focus:ring-2 focus:ring-brand-brown focus:ring-offset-2">
                Temukan Umkm
              </button>
              <button
                className="text-4xl text-brand-brown transition-transform hover:scale-110"
                aria-label="Lanjutkan"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default HeroSection;
