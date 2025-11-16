import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-scroll";

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
            <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl md:text-7xl">
              Membantu Temukan Teman UMKM.
            </h1>
            <div className="mt-10">
              <Link
                to="info-section"
                smooth={true}
                duration={500}
                offset={-80}
                className="group inline-flex items-center gap-3 rounded-sm bg-brand-brown px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-brand-brown-dark focus:outline-none focus:ring-2 focus:ring-brand-brown focus:ring-offset-2 cursor-pointer sm:px-8 sm:py-4 sm:text-lg"
              >
                <span>Temukan UMKM</span>
                <FiChevronRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default HeroSection;
