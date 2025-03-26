import { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import WB01 from "../assets/webBanner/webBanner01BB1.webp";
import WB02 from "../assets/webBanner/webBanner01BB1Bangla.webp";
import { useTranslation } from "react-i18next";

const TopNav = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Define images for different languages (use actual image imports)
  const bannerImages = {
    en: WB01,
    bn: WB02,
  };

  return (
    <Motion.div
      initial={{ height: "auto" }}
      animate={{ height: scrolled ? 0 : "auto" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full overflow-hidden"
    >
      <img
        className="w-full h-full object-cover"
        src={bannerImages[currentLanguage] || WB01} // Use dynamic image selection
        alt="WebBanner"
      />
    </Motion.div>
  );
};

export default TopNav;
