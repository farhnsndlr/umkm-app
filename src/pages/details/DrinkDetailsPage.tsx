import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { drinkData } from "../../data/drinkData";
import {
  FiStar,
  FiMapPin,
  FiShare2,
  FiPhone,
  FiChevronLeft,
} from "react-icons/fi";

type Tab = "ringkasan" | "menu";

const drinkDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const drink = drinkData.find((item) => item.slug === slug);

  const [activeTab, setActiveTab] = useState<Tab>("ringkasan");

  const handleShare = async () => {
    if (!drink) return;
    const shareData = {
      title: drink.title,
      text: drink.description,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link disalin ke clipboard!");
    }
  };

  const handleContact = () => {
    if (!drink || !drink.phoneNumber) return;
    const waUrl = `https_://wa.me/${drink.phoneNumber}`;
    window.open(waUrl, "_blank");
  };

  if (!drink) {
    return <div>Tempat tidak ditemukan</div>;
  }

  return (
    <div className="min-h-screen bg-bg-main">
      <Link
        to="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-gray-800 shadow-lg hover:bg-white"
      >
        <FiChevronLeft className="h-4 w-4" />
        Kembali ke Home
      </Link>

      <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col h-full overflow-y-auto">
          <img
            src={drink.imageSrc}
            alt={drink.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6 md:p-10">
            <h1 className="text-4xl font-bold text-gray-900">{drink.title}</h1>
            <div className="flex items-center gap-2 my-3 text-gray-700">
              <span className="font-bold text-lg">{drink.ratings}</span>
              <div className="flex text-yellow-500">
                <FiStar fill="currentColor" />
                <FiStar fill="currentColor" />
                <FiStar fill="currentColor" />
                <FiStar fill="currentColor" />
                <FiStar fill="currentColor" className="opacity-30" />
              </div>
              <span className="text-gray-500">({drink.reviews})</span>
            </div>
            <p className="text-gray-600 mb-6">{drink.description}</p>

            <div className="border-b border-gray-200 mb-6">
              <nav className="flex justify-center -mb-px space-x-8">
                <button
                  className={`py-4 px-1 border-b-2 font-medium text-lg
                    ${
                      activeTab === "ringkasan"
                        ? "border-brand-brown text-brand-brown"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  onClick={() => setActiveTab("ringkasan")}
                >
                  Ringkasan
                </button>
                <button
                  className={`py-4 px-1 border-b-2 font-medium text-lg
                    ${
                      activeTab === "menu"
                        ? "border-brand-brown text-brand-brown"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  onClick={() => setActiveTab("menu")}
                >
                  Menu
                </button>
              </nav>
            </div>

            {activeTab === "ringkasan" && (
              <div>
                <div className="flex items-center justify-center gap-12 border-b border-gray-200 py-4 mb-6">
                  <button
                    onClick={handleShare}
                    className="flex flex-col items-center gap-1 text-gray-600 hover:text-brand-brown"
                  >
                    <FiShare2 className="h-6 w-6" />
                    <span className="text-xs">Bagikan</span>
                  </button>
                  {drink.phoneNumber && (
                    <button
                      onClick={handleContact}
                      className="flex flex-col items-center gap-1 text-gray-600 hover:text-brand-brown"
                    >
                      <FiPhone className="h-6 w-6" />
                      <span className="text-xs">Hubungi</span>
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <FiMapPin className="h-6 w-6 text-gray-500 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Alamat</h3>
                      <p className="text-gray-600">{drink.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <FiMapPin className="h-6 w-6 text-gray-500 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Ringkasan</h3>
                      <p className="text-gray-600">{drink.details}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "menu" && (
              <div className="space-y-10">
                {drink.menu && drink.menu.images.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Menu</h3>
                    <div className="space-y-4">
                      {drink.menu.images.map((imgSrc, index) => (
                        <img
                          key={`menu-${index}`}
                          src={imgSrc}
                          alt={`Menu ${drink.title} ${index + 1}`}
                          className="w-full rounded-lg shadow-md"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {drink.tampilan && drink.tampilan.images.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Tampilan</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {drink.tampilan.images.map((imgSrc, index) => (
                        <img
                          key={`tampilan-${index}`}
                          src={imgSrc}
                          alt={`Tampilan ${drink.title} ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg shadow-md"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {(!drink.menu || drink.menu.images.length === 0) &&
                  (!drink.tampilan || drink.tampilan.images.length === 0) && (
                    <p className="text-gray-500 text-center">
                      Menu dan Tampilan tidak tersedia untuk tempat ini.
                    </p>
                  )}
              </div>
            )}
          </div>
        </div>

        <div className="h-full w-full hidden lg:block">
          <iframe
            src={drink.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default drinkDetailsPage;
