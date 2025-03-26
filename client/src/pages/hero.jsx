import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from 'react-i18next';
import TranslatedText from '../components/TranslatedText';  
import "../i18n";

import CenterText1 from "../assets/imageSlider/centertext1.webp"
import CenterText2 from "../assets/imageSlider/centertext2.webp"
import CenterText3 from "../assets/imageSlider/centertext3.webp";
import LeftText1 from "../assets/imageSlider/lefttext1.webp";
import LeftText2 from "../assets/imageSlider/lefttext2.webp";
import RightText1 from "../assets/imageSlider/righttext1.webp";



const slides = [
  { image: CenterText1, title: "FreshGroceries", description: "FreshGroceriesDescription", link: "/" },
  { image: LeftText1, title: "DailyEssentials", description: "DailyEssentialsDescription", link: "/" },
  { image: RightText1, title: "Protein&Meat", description: "Protein&MeatDescription", link: "/" },
  { image: CenterText3, title: "FreshVegetables", description: "FreshVegetablesDescription", link: "/" },
  { image: LeftText2, title: "OrganicGreens", description: "OrganicGreensDescription", link: "/" },
];

// Define alignment styles (left, center, right) in a cyclic order
const alignments = ["text-center items-center", "text-left items-start", "text-right items-end"];

const Hero = () => {
  const { t } = useTranslation();


  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 1600,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <div className="w-full overflow-hidden h-auto mt-[80px]">
      <Slider {...settings} className="w-full max-w-screen">
        {slides.map(({ image, title, description, link }, index) => {
          const alignment = alignments[index % alignments.length];
          const isCenterAligned = alignment.includes("text-center");
          const buttonColor = isCenterAligned ? "bg-orange-500 hover:bg-orange-600 shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.4)]" : "bg-green-500 hover:bg-green-600 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)]";
          
          return (
            <div key={index} className="relative w-full">
              <img src={image} alt={title} loading="lazy" className="w-full h-auto object-cover min-h-44" />
              <div className={`absolute inset-0 flex flex-col ${alignment} justify-center p-6 sm:p-8 lg:p-28`}>
                <TranslatedText className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 sm:mb-2">
                  {t(title)}
                </TranslatedText>
                <TranslatedText className="text-sm sm:text-md md:text-lg max-w-60 sm:max-w-full mb-2 sm:mb-4">
                  {t(description)}
                </TranslatedText>
                <a
                  href={link}
                  className={`relative p-2 px-6 text-white font-medium rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 overflow-hidden block before:content-[''] before:absolute before:inset-0 before:rounded-full before:border-2 before:border-transparent before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:animate-shimmer ${buttonColor}`}
                  aria-label={`${t('OrderNow')} - ${t(title)}`}
                >
                  <TranslatedText>
                    {t('OrderNow')}
                  </TranslatedText>
                </a>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Hero;
