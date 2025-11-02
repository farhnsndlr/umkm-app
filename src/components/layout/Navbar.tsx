import React, { useState, useRef, useEffect } from "react";
import { FiSearch, FiX, FiChevronDown, FiMenu } from "react-icons/fi";
import logoUmkm from "../../assets/images/logo-umkm.png";
import { Link } from "react-scroll";

interface NavbarProps {
  isTransparent?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isTransparent = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryMenuRef = useRef<HTMLDivElement>(null);

  const inputBg = isTransparent
    ? "bg-white/30 backdrop-blur-sm"
    : "bg-gray-100";
  const borderColor = isTransparent ? "border-gray-400/50" : "border-gray-300";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryMenuRef.current &&
        !categoryMenuRef.current.contains(event.target as Node)
      ) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [categoryMenuRef]);

  return (
    <>
      <header className="absolute top-0 left-0 z-30 w-full px-6 py-5 md:px-10 lg:px-12">
        <nav className="flex w-full items-center justify-between">
          <Link
            to="home"
            smooth={true}
            duration={500}
            className="flex items-center gap-2 text-2xl font-bold text-gray-900 cursor-pointer"
          >
            <img src={logoUmkm} alt="UMKM-i Logo" className="h-6 w-auto" />
            <span>UMKM-i</span>
          </Link>

          <div className="relative hidden w-full max-w-sm lg:block">
            <input
              type="text"
              placeholder="Search"
              className={`w-full rounded-full border ${borderColor} ${inputBg} py-2.5 pl-10 pr-10 text-sm text-gray-800 placeholder-gray-600 focus:border-gray-500 focus:outline-none`}
            />
            <FiSearch className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />
            <button className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600">
              <FiX className="h-4 w-4" />
            </button>
          </div>

          <div className="hidden items-center gap-8 lg:flex">
            <Link
              to="home"
              smooth={true}
              duration={500}
              className="text-lg font-medium text-gray-700 hover:text-black cursor-pointer"
            >
              Home
            </Link>

            <div className="relative" ref={categoryMenuRef}>
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center gap-1 text-lg font-medium text-gray-700 hover:text-black"
              >
                <span>Category</span>
                <FiChevronDown
                  className={`h-5 w-5 transition-transform ${
                    isCategoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`
                  absolute top-full right-0 mt-3 w-52 z-50 origin-top-right
                  transition-all duration-200 ease-out
                  ${
                    isCategoryOpen
                      ? "opacity-100 scale-100 visible"
                      : "opacity-0 scale-95 invisible"
                  }
                `}
              >
                <Link
                  to="makanan"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  onClick={() => setIsCategoryOpen(false)}
                  className="mb-2 block w-full rounded-lg bg-brand-brown px-4 py-3 text-center text-lg font-medium text-white transition hover:bg-brand-brown-dark cursor-pointer"
                >
                  Makanan
                </Link>
                <Link
                  to="minuman"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  onClick={() => setIsCategoryOpen(false)}
                  className="mb-2 block w-full rounded-lg bg-brand-brown px-4 py-3 text-center text-lg font-medium text-white transition hover:bg-brand-brown-dark cursor-pointer"
                >
                  Minuman
                </Link>
                <Link
                  to="jasa"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  onClick={() => setIsCategoryOpen(false)}
                  className="block w-full rounded-lg bg-brand-brown px-4 py-3 text-center text-lg font-medium text-white transition hover:bg-brand-brown-dark cursor-pointer"
                >
                  Jasa
                </Link>
              </div>
            </div>
          </div>

          <button
            className="z-50 text-2xl text-gray-900 lg:hidden"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              setIsCategoryOpen(false);
            }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </nav>
      </header>

      <div
        className={`fixed top-0 left-0 z-40 h-screen w-full transform bg-bg-main p-6 pt-24 shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative w-full mb-6">
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-full border border-gray-300 bg-gray-100 py-3 pl-10 pr-10 text-sm text-gray-800 placeholder-gray-600 focus:border-gray-500 focus:outline-none"
          />
          <FiSearch className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-600" />
          <button className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600">
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-6">
          <Link
            to="home"
            smooth={true}
            duration={500}
            onClick={() => setIsMenuOpen(false)}
            className="text-xl font-medium text-gray-800 hover:text-brand-brown cursor-pointer"
          >
            Home
          </Link>
          <a
            href="#"
            className="flex items-center justify-between text-xl font-medium text-gray-800 hover:text-brand-brown"
          >
            <span>Category</span>
            <FiChevronDown className="h-5 w-5" />
          </a>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
