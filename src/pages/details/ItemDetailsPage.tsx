import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { foodData } from "../../data/foodData.js";
import { drinkData } from "../../data/drinkData.js";
import { serviceData } from "../../data/serviceData.js";
import {
  FiStar,
  FiMapPin,
  FiShare2,
  FiPhone,
  FiChevronLeft,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

type Tab = "ringkasan" | "menu";
type ItemData = (typeof foodData)[0];

const allData: { [key: string]: ItemData[] } = {
  food: foodData,
  drink: drinkData,
  service: serviceData,
};

const tabTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

const ItemDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();

  const path = location.pathname.split("/")[1];
  const category =
    path === "food" ? "food" : path === "drink" ? "drink" : "service";

  const [activeTab, setActiveTab] = useState<Tab>("ringkasan");
  const [item, setItem] = useState<ItemData | undefined>(undefined);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>("");

  useEffect(() => {
    const dataList = allData[category];
    if (dataList) {
      const foundItem = dataList.find((i) => i.slug === slug);
      setItem(foundItem);
    }

    if (category === "service") {
      setActiveTab("ringkasan");
    }
  }, [slug, location.pathname, category]);

  const handleShare = async () => {
    if (!item) return;
    const shareData = {
      title: item.title,
      text: item.description,
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
    if (!item || !item.phoneNumber) return;
    const waUrl = `https://wa.me/${item.phoneNumber}`;
    window.open(waUrl, "_blank");
  };

  const openImageModal = (imgSrc: string) => {
    setCurrentImage(imgSrc);
    setIsImageModalOpen(true);
  };

  if (!item) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg-main">
        <h1 className="text-2xl font-bold text-gray-800">
          Item tidak ditemukan...
        </h1>
        <Link to="/" className="ml-4 text-brand-brown hover:underline">
          Kembali ke Home
        </Link>
      </div>
    );
  }

  const mainImage = item.imageSrc;
  const sideImage1 =
    item.tampilan?.images[0] || item.menu?.images[0] || item.imageSrc;
  const sideImage2 =
    item.tampilan?.images[1] || item.menu?.images[1] || sideImage1;

  return (
    <div className="min-h-screen bg-bg-main">
      <Link
        to="/"
        className="hidden lg:flex absolute top-6 left-6 z-20 items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-gray-800 shadow-lg hover:bg-white"
      >
        <FiChevronLeft className="h-4 w-4" />
        Kembali ke Home
      </Link>
      <Link
        to="/"
        className="lg:hidden fixed bottom-8 right-8 z-50 flex items-center justify-center h-14 w-14 bg-brand-brown text-white rounded-full shadow-lg transition-all duration-300 hover:bg-brand-brown-dark"
        aria-label="Kembali ke Home"
      >
        <FiChevronLeft className="h-6 w-6" />
      </Link>

      <div className="w-full flex flex-col lg:grid lg:grid-cols-2 lg:h-screen">
        <div className="h-64 w-full lg:hidden">
          <iframe
            src={item.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="hidden lg:block lg:h-full w-full lg:order-2">
          <iframe
            src={item.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="flex flex-col h-full overflow-y-auto lg:order-1">
          <img
            src={item.imageSrc}
            alt={item.title}
            className="w-full h-80 object-cover hidden lg:block"
          />
          <div className="p-6 md:p-10">
            <h1 className="text-4xl font-bold text-gray-900">{item.title}</h1>

            <div className="flex items-center gap-2 my-3 text-gray-700">
              <span className="font-bold text-lg">{item.ratings}</span>
              <div className="flex text-yellow-500">
                <FiStar fill="currentColor" />
                <FiStar fill="currentColor" />
                <FiStar fill="currentColor" />
                <FiStar fill="currentColor" />
                <FiStar fill="currentColor" className="opacity-30" />
              </div>
              <span className="text-gray-500">({item.reviews})</span>
            </div>

            <p className="text-gray-600 mb-6">{item.description}</p>

            <div className="border-b border-gray-200 mb-6">
              <nav className="flex justify-center -mb-px space-x-8">
                <button
                  className={`py-4 px-1 font-medium text-lg relative
                    ${
                      activeTab === "ringkasan"
                        ? "text-brand-brown"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  onClick={() => setActiveTab("ringkasan")}
                >
                  Ringkasan
                  {activeTab === "ringkasan" && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-brown"
                      layoutId="underline"
                    />
                  )}
                </button>

                {category !== "service" && (
                  <button
                    className={`py-4 px-1 font-medium text-lg relative
                      ${
                        activeTab === "menu"
                          ? "text-brand-brown"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    onClick={() => setActiveTab("menu")}
                  >
                    Menu
                    {activeTab === "menu" && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-brown"
                        layoutId="underline"
                      />
                    )}
                  </button>
                )}
              </nav>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "ringkasan" && (
                <motion.div
                  key="ringkasan"
                  variants={tabTransition}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <div className="flex items-center justify-center gap-12 border-b border-gray-200 py-4 mb-6">
                    <button
                      onClick={handleShare}
                      className="flex flex-col items-center gap-1 text-gray-600 hover:text-brand-brown"
                    >
                      <FiShare2 className="h-6 w-6" />
                      <span className="text-xs">Bagikan</span>
                    </button>
                    {item.phoneNumber && (
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
                        <p className="text-gray-600">{item.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <FiMapPin className="h-6 w-6 text-gray-500 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold">Ringkasan</h3>
                        <p className="text-gray-600">{item.details}</p>
                      </div>
                    </div>

                    {category !== "service" && (
                      <div className="lg:hidden grid grid-cols-3 gap-0.5 h-64 rounded-lg overflow-hidden mt-6">
                        <div className="col-span-2">
                          <img
                            src={mainImage}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="col-span-1 grid grid-rows-2 gap-0.5">
                          <img
                            src={sideImage1}
                            alt={`${item.title} 1`}
                            className="w-full h-full object-cover"
                          />
                          <img
                            src={sideImage2}
                            alt={`${item.title} 2`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}

                    {category === "service" &&
                      item.tampilan &&
                      item.tampilan.images.length > 0 && (
                        <div className="pt-6">
                          <h3 className="text-2xl font-bold mb-4">Tampilan</h3>
                          <div className="flex flex-row overflow-x-auto items-start gap-4 py-2">
                            {item.tampilan.images.map((imgSrc, index) => (
                              <img
                                key={`tampilan-${index}`}
                                src={imgSrc}
                                alt={`Tampilan ${item.title} ${index + 1}`}
                                className="w-56 h-auto object-contain rounded-lg shadow-md cursor-pointer transition-transform duration-200 hover:scale-105 flex-shrink-0"
                                onClick={() => openImageModal(imgSrc)}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </motion.div>
              )}

              {activeTab === "menu" && category !== "service" && (
                <motion.div
                  key="menu"
                  variants={tabTransition}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-10"
                >
                  {item.menu && item.menu.images.length > 0 && (
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Menu</h3>
                      <div className="flex flex-col items-start gap-4">
                        {item.menu.images.map((imgSrc, index) => (
                          <img
                            key={`menu-${index}`}
                            src={imgSrc}
                            alt={`Menu ${item.title} ${index + 1}`}
                            className="w-80 h-auto object-contain rounded-lg shadow-md cursor-pointer transition-transform duration-200 hover:scale-105"
                            onClick={() => openImageModal(imgSrc)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {item.tampilan && item.tampilan.images.length > 0 && (
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Tampilan</h3>
                      <div className="flex flex-row overflow-x-auto items-start gap-4 py-2">
                        {item.tampilan.images.map((imgSrc, index) => (
                          <img
                            key={`tampilan-${index}`}
                            src={imgSrc}
                            alt={`Tampilan ${item.title} ${index + 1}`}
                            className="w-56 h-auto object-contain rounded-lg shadow-md cursor-pointer transition-transform duration-200 hover:scale-105 flex-shrink-0"
                            onClick={() => openImageModal(imgSrc)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {(!item.menu || item.menu.images.length === 0) &&
                    (!item.tampilan || item.tampilan.images.length === 0) && (
                      <p className="text-gray-500 text-center">
                        Menu dan Tampilan tidak tersedia untuk tempat ini.
                      </p>
                    )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {isImageModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div className="relative max-w-full max-h-full">
            <img
              src={currentImage}
              alt="Full size menu"
              className="max-w-full max-h-[90vh] object-contain cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-4 right-4 text-white text-4xl font-bold bg-gray-800 bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ItemDetailsPage;
