// loadFromTop.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const LoadFromTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [pathname]);

  return null;
};

export default LoadFromTop;