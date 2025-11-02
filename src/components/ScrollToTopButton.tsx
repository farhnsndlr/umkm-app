import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { FiArrowUp } from "react-icons/fi";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Link
        to="home"
        smooth={true}
        duration={500}
        className={`
          flex items-center justify-center
          h-12 w-12 rounded-full bg-brand-brown text-white shadow-lg
          transition-all duration-300 ease-in-out
          hover:scale-110 hover:shadow-xl hover:bg-brand-brown-dark
          cursor-pointer
          ${
            isVisible
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }
        `}
        aria-label="Kembali ke atas"
      >
        <FiArrowUp className="h-6 w-6" />
      </Link>
    </div>
  );
};

export default ScrollToTopButton;
