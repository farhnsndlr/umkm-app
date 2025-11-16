import React from "react";
import { FiMapPin } from "react-icons/fi";
import { serviceData } from "../../data/serviceData.js";
import { Link } from "react-router-dom";

const ServiceSection: React.FC = () => {
  return (
    <section id="jasa" className="bg-bg-main py-20 px-6 md:px-10 lg:px-12">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900">
          Rekomendasi Jasa Di Sekitarmu
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {serviceData.slice(0, 2).map((item) => (
          <Link
            to={`/service/${item.slug}`}
            key={item.id}
            className="group rounded-lg shadow-lg overflow-hidden transition-all duration-300
                       bg-white text-gray-900
                       hover:shadow-2xl hover:-translate-y-1
                       hover:bg-brand-brown hover:text-white"
          >
            <img
              src={item.imageSrc}
              alt={item.title}
              className="w-full h-56 object-cover"
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
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;