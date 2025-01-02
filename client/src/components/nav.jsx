import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Logo from "../assets/tr/BetarBazarlogo.png";
import { MdOutlineSpaceDashboard, MdPriceChange } from "react-icons/md";
import { TbLogin2 } from "react-icons/tb";
import { LuShoppingCart } from "react-icons/lu";
import Login from './LoginPage';
import Dashboard from './dashboard';
import MP from './marketPrice';

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state
  const [searchQuery, setSearchQuery] = useState(""); // For search query
  const [searchSuggestions, setSearchSuggestions] = useState([]); // For search autocomplete
  const [language, setLanguage] = useState("bn"); // Default language is Bangla (bn)

  // Sample data for autocomplete (you can replace it with dynamic data)
  const sampleData = [
    language === "bn" ? "ল্যাপটপ" : "Laptop",
    language === "bn" ? "ফোন" : "Phone",
    language === "bn" ? "হেডফোন" : "Headphones",
    language === "bn" ? "ক্যামেরা" : "Camera",
    language === "bn" ? "স্মার্টওয়াচ" : "Smartwatch",
  ];

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);

    // Filter suggestions based on search query
    if (e.target.value) {
      const filtered = sampleData.filter((item) =>
        item.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearchSuggestions(filtered);
    } else {
      setSearchSuggestions([]);
    }
  };

  // Toggle language
  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "bn" ? "en" : "bn"));
  };

  useEffect(() => {

  }, []);

  return (
    <div style={{ fontFamily: language === "bn" ? "'Hind Siliguri', sans-serif" : "'Montserrat', sans-serif" }}>
      {/* Navbar */}
      <nav className="bg-white text-black px-4 py-3">
        <div className="flex max-w-screen-2xl mx-auto justify-between items-center">
          {/* Left Side: Logo and Language Toggle */}
          <div className="flex items-center">
            <Link to="/">
              <div className="flex-shrink-0">
                <img
                  className="w-10 h-6 xl:w-14 xl:h-10 sm:w-7 sm:h-5 cursor-pointer"
                  src={Logo}
                  alt="Logo"
                />
              </div>
            </Link>
            <Link to=''>
              <div className="flex items-center mx-4">
                {/* Language Toggle */}
                <button
                  onClick={toggleLanguage}
                  className="px-3 py-1 bg-blue-500 text-white rounded-full focus:outline-none hover:bg-custom-orange"
                >
                  {language === "bn" ? "English" : "বাংলা"}
                </button>
              </div>
            </Link>
          </div>

          {/* Center: Search Bar */}
          <div className="hidden md:flex flex-1 mx-4">
            <input
              type="text"
              placeholder={language === "bn" ? "অনুসন্ধান করুন..." : "Search..."}
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchSuggestions.length > 0 && (
              <ul className="absolute bg-white border border-gray-300 w-full mt-1 rounded-md shadow-lg z-10">
                {searchSuggestions.map((suggestion, index) => (
                  <li key={index} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right Side: Login, Market Price, Cart */}
          <ul className="flex items-center gap-4">
            <li>
              <Link to={isLoggedIn ? '/Dashboard' : '/Login'}>
                <div className="flex items-center hover:text-custom-orange">
                  {isLoggedIn ? (
                    <>
                      <MdOutlineSpaceDashboard className="mr-1" />
                      {language === "bn" ? "ড্যাশবোর্ড" : "Dashboard"}
                    </>
                  ) : (
                    <>
                      <TbLogin2 className="mr-1" />
                      {language === "bn" ? "লগইন" : "Login"}
                    </>
                  )}
                </div>
              </Link>
            </li>
            <li>
              <Link to='MP' className="flex items-center hover:text-custom-orange">
                <MdPriceChange className="mr-1" />
                {language === "bn" ? "বাজার মূল্য" : "Market Price"}
              </Link>
            </li>
            <li>
              <Link to='/cart' className="flex items-center hover:text-custom-orange">
                <LuShoppingCart className="mr-1" />
                {language === "bn" ? "কার্ট" : "Cart"}
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile view */}
      <div className="md:hidden flex flex-col items-center mr-2 ml-2 mb-4">
        {/* Language Toggle */}
        <input
          type="text"
          placeholder={language === "bn" ? "অনুসন্ধান করুন..." : "Search..."}
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {searchSuggestions.length > 0 && (
          <ul className="absolute bg-white border border-gray-300 w-full mt-1 rounded-md shadow-lg z-10">
            {searchSuggestions.map((suggestion, index) => (
              <li key={index} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NavBar;

