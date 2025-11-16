import React, { useState, useEffect, useRef } from "react";
import {
  FiSearch,
  FiX,
  FiChevronDown,
  FiMenu,
  FiShoppingBag,
  FiCoffee,
  FiTool,
} from "react-icons/fi";
import logoUmkm from "../../assets/images/logo-umkm.jpeg";
import { Link } from "react-scroll";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { foodData } from "../../data/foodData.js";
import { drinkData } from "../../data/drinkData.js";
import { serviceData } from "../../data/serviceData.js";

type FoodItem = (typeof foodData)[0];
type SuggestionType = "search" | "random";

const allData = [
  ...foodData.map((item) => ({ ...item, type: "food" })),
  ...drinkData.map((item) => ({ ...item, type: "drink" })),
  ...serviceData.map((item) => ({ ...item, type: "service" })),
];

interface NavbarProps {
  isTransparent?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isTransparent = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<FoodItem[]>([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [suggestionType, setSuggestionType] =
    useState<SuggestionType>("search");
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const desktopSearchRef = useRef<HTMLFormElement>(null);
  const mobileSearchRef = useRef<HTMLFormElement>(null);

  const showSolidBg = isScrolled || isMenuOpen || !isTransparent;

  const inputBg = !showSolidBg ? "bg-white/30 backdrop-blur-sm" : "bg-white";
  const borderColor = !showSolidBg ? "border-gray-400/50" : "border-gray-300";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOutsideDesktop =
        desktopSearchRef.current &&
        !desktopSearchRef.current.contains(event.target as Node);
      const isOutsideMobile =
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target as Node);

      if (isOutsideDesktop && isOutsideMobile) {
        setIsSuggestionsOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    setActiveIndex(-1);
    setSuggestionType("search");

    if (newQuery.trim().length > 0) {
      const matches = allData.filter((item) =>
        item.title.toLowerCase().includes(newQuery.toLowerCase())
      );
      setSuggestions(matches);
      setIsSuggestionsOpen(matches.length > 0);
    } else {
      setSuggestions([]);
      setIsSuggestionsOpen(false);
    }
  };

  const handleFocus = () => {
    if (searchQuery.trim().length === 0) {
      const randomSuggestions = [...allData]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      setSuggestions(randomSuggestions);
      setSuggestionType("random");
      setIsSuggestionsOpen(true);
    } else {
      setIsSuggestionsOpen(suggestions.length > 0);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeIndex > -1 && suggestions[activeIndex]) {
      navigate(`/${suggestions[activeIndex].slug}`);
    } else if (suggestions.length > 0) {
      navigate(`/${suggestions[0].slug}`);
    } else {
      alert("UMKM tidak ditemukan.");
      return;
    }

    setSearchQuery("");
    setSuggestions([]);
    setIsSuggestionsOpen(false);
    setActiveIndex(-1);
    setIsMenuOpen(false);
  };

  const handleSuggestionClick = () => {
    setSearchQuery("");
    setIsSuggestionsOpen(false);
    setActiveIndex(-1);
    setIsMenuOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(
        (prev) => (prev - 1 + suggestions.length) % suggestions.length
      );
    }
  };

  const renderSuggestions = (isMobile = false) => {
    if (!isSuggestionsOpen) return null;

    return (
      <div
        className={`absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto z-50 ${
          isMobile ? "border border-gray-200" : ""
        }`}
      >
        {suggestionType === "random" && (
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Rekomendasi
          </div>
        )}
        {suggestions.map((item, index) => {
          const isHighlighted = index === activeIndex;
          return (
            <RouterLink
              to={`/${item.slug}`}
              key={item.id}
              onClick={handleSuggestionClick}
              onMouseEnter={() => setActiveIndex(index)}
              className={`block px-4 py-3 text-sm transition-colors
                ${
                  isHighlighted
                    ? "bg-brand-brown text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              {item.title}
            </RouterLink>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 z-50 w-full px-6 py-5 md:px-10 lg:px-12
          transition-all duration-300 ease-in-out
          ${showSolidBg ? "bg-bg-main shadow-lg" : "bg-transparent"}
        `}
      >
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

          <form
            ref={desktopSearchRef}
            onSubmit={handleSearchSubmit}
            className="relative hidden w-full max-w-sm lg:block"
          >
            <input
              type="text"
              placeholder="Cari makanan, minuman, atau jasa..."
              className={`w-full rounded-full border ${borderColor} ${inputBg} py-2.5 pl-10 pr-10 text-sm text-gray-800 placeholder-gray-600 focus:border-gray-500 focus:outline-none`}
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleFocus}
              onKeyDown={handleKeyDown}
            />
            <button
              type="submit"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600"
            >
              <FiSearch className="h-4 w-4" />
            </button>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600"
              >
                <FiX className="h-4 w-4" />
              </button>
            )}
            {renderSuggestions()}
          </form>

          <div className="hidden items-center gap-8 lg:flex">
            <Link
              to="home"
              smooth={true}
              duration={500}
              className="text-lg font-medium text-gray-900 hover:text-black cursor-pointer"
            >
              Home
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setIsCategoryOpen(true)}
              onMouseLeave={() => setIsCategoryOpen(false)}
            >
              <button className="flex items-center gap-1 text-lg font-medium text-gray-900 hover:text-black">
                <span>Category</span>
                <FiChevronDown
                  className={`h-5 w-5 transition-transform ${
                    isCategoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`
                  absolute top-full right-0 w-52 z-50 origin-top-right
                  transition-all duration-200 ease-out
                  ${
                    isCategoryOpen
                      ? "opacity-100 scale-100 visible"
                      : "opacity-0 scale-95 invisible"
                  }
                `}
              >
                <div className="mt-3 bg-brand-brown rounded-lg shadow-xl overflow-hidden">
                  <Link
                    to="makanan"
                    smooth={true}
                    duration={500}
                    offset={-80}
                    onClick={() => setIsCategoryOpen(false)}
                    className="flex items-center justify-start gap-3 w-full px-5 py-3 text-left text-base font-medium text-white transition hover:bg-brand-brown-dark cursor-pointer border-b border-brand-brown-dark"
                  >
                    <FiShoppingBag className="h-5 w-5" />
                    <span>Makanan</span>
                  </Link>
                  <Link
                    to="minuman"
                    smooth={true}
                    duration={500}
                    offset={-80}
                    onClick={() => setIsCategoryOpen(false)}
                    className="flex items-center justify-start gap-3 w-full px-5 py-3 text-left text-base font-medium text-white transition hover:bg-brand-brown-dark cursor-pointer border-b border-brand-brown-dark"
                  >
                    <FiCoffee className="h-5 w-5" />
                    <span>Minuman</span>
                  </Link>
                  <Link
                    to="jasa"
                    smooth={true}
                    duration={500}
                    offset={-80}
                    onClick={() => setIsCategoryOpen(false)}
                    className="flex items-center justify-start gap-3 w-full px-5 py-3 text-left text-base font-medium text-white transition hover:bg-brand-brown-dark cursor-pointer"
                  >
                    <FiTool className="h-5 w-5" />
                    <span>Jasa</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <button
            className="z-50 text-2xl text-gray-900 lg:hidden"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              setIsCategoryOpen(false);
              setIsMobileCategoryOpen(false);
            }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </nav>
      </header>

      <div
        className={`fixed top-0 left-0 z-40 h-screen w-full transform bg-bg-main p-6 pt-24 shadow-xl transition-transform duration-300 ease-in-out lg:hidden
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <form
          ref={mobileSearchRef}
          onSubmit={handleSearchSubmit}
          className="relative w-full mb-8"
        >
          <input
            type="text"
            placeholder="Cari UMKM..."
            className="w-full rounded-full border border-gray-300 bg-gray-100 py-3 pl-10 pr-10 text-sm text-gray-800 placeholder-gray-600 focus:border-gray-500 focus:outline-none"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
          />
          <button
            type="submit"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600"
          >
            <FiSearch className="h-5 w-5" />
          </button>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600"
            >
              <FiX className="h-5 w-5" />
            </button>
          )}
          {renderSuggestions(true)}
        </form>

        <nav className="flex flex-col gap-4">
          <Link
            to="home"
            smooth={true}
            duration={500}
            onClick={() => setIsMenuOpen(false)}
            className="text-xl font-medium text-gray-900 cursor-pointer p-3 rounded-lg hover:bg-gray-200"
          >
            Home
          </Link>

          <div className="w-full">
            <button
              onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)}
              className="w-full flex items-center justify-between text-xl font-medium text-gray-900 cursor-pointer p-3 rounded-lg hover:bg-gray-200"
            >
              <span>Category</span>
              <FiChevronDown
                className={`h-5 w-5 transition-transform ${
                  isMobileCategoryOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isMobileCategoryOpen ? "max-h-96 mt-2" : "max-h-0"
              }`}
            >
              <div className="bg-brand-brown rounded-lg shadow-lg overflow-hidden">
                <Link
                  to="makanan"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-start gap-3 w-full px-5 py-4 text-left text-lg font-medium text-white transition hover:bg-brand-brown-dark cursor-pointer border-b border-brand-brown-dark"
                >
                  <FiShoppingBag className="h-5 w-5" />
                  <span>Makanan</span>
                </Link>
                <Link
                  to="minuman"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-start gap-3 w-full px-5 py-4 text-left text-lg font-medium text-white transition hover:bg-brand-brown-dark cursor-pointer border-b border-brand-brown-dark"
                >
                  <FiCoffee className="h-5 w-5" />
                  <span>Minuman</span>
                </Link>
                <Link
                  to="jasa"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-start gap-3 w-full px-5 py-4 text-left text-lg font-medium text-white transition hover:bg-brand-brown-dark cursor-pointer"
                >
                  <FiTool className="h-5 w-5" />
                  <span>Jasa</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
