import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
  // State to control button visibility
  const [isVisible, setIsVisible] = useState(false);

  // Function to toggle button visibility based on slider section position
  const toggleVisibility = () => {
    const sliderSection = document.querySelector('.slider-section');
    const sliderHeight = sliderSection ? sliderSection.offsetHeight : 1000;

    if (window.scrollY > sliderHeight) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div 
      onClick={scrollToTop}
      className={`fixed bottom-10 right-6 z-50 cursor-pointer group transition-all duration-300 ease-in-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg 
        transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl
        bg-custom-orange hover:bg-custom-orange-dark border-2 border-custom-black p-2"
      >
        <FaArrowUp 
          className="text-white text-2xl animate-bounce group-hover:animate-none" 
          aria-hidden="true"
        />
      </div>
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-3 py-1 
        rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        Scroll to top
      </span>
    </div>
  );
};

export default ScrollToTop;