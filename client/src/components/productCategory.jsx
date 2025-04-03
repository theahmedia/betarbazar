import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for API call

const BannerSlider = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories'); // Replace with your backend API endpoint
        setCategories(response.data); // Assuming the API returns an array of categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []); // Empty array means the effect runs once when the component mounts

  return (
    <div className="container mx-auto">
      <div className="w-full overflow-hidden py-6 mx-auto px-4 sm:px-6 lg:px-16">
        <h2 className="text-center text-custom-orange font-bold text-3xl mb-8 py-5">
          {t('productCategories')}
        </h2>

        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={4} // Default 5 slides
          spaceBetween={30} // Increased space between slides
          coverflowEffect={{
            modifier: 1,
            slideShadows: false, // Removes shadow for a cleaner look
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true} // Infinite loop
          speed={500}
          slidesPerGroup={1} // Moves one slide at a time
          modules={[EffectCoverflow, Autoplay]}
          breakpoints={{
            1200: { slidesPerView: 3.5,
              coverflowEffect: {
                rotate: -12,
                stretch: 60,
                depth: 100,
              }
             },
            1024: { slidesPerView: 2.3,
              coverflowEffect: {
                rotate: -12,
                stretch: 50,
                depth: 180,
              }},
            768: { slidesPerView: 2,
              coverflowEffect: {
                rotate: -12,
                stretch: 50,
                depth: 170,
              }},
            0: { slidesPerView: 1.5,
              coverflowEffect: {
                rotate: -22,
                stretch: 60,
                depth: 150
              }},
          }}
          className="swiper-container"
        >
          {categories.map((category, index) => (
            <SwiperSlide key={category.id} className="w-64 sm:w-72 md:w-80 lg:w-[500px] m-0 z-10">
              <Link to={`/category/${category._id}`} key={index}>
                <div className="relative group border-orange-500 w-full h-[270px] md:h-[300px] 2xl:h-[350px] overflow-visible z-0">
                  <div className="absolute z-10 m-auto right-0 left-0 w-3/5 bottom-0">
                    <h2 className="text-sm sm:text-base font-semibold text-white text-center rounded-full bg-orange-500 px-1 py-2 z-0">
                      {t(category.name)} {/* Translated category name */}
                    </h2>
                  </div>
                  <div className="w-full px-7 h-[250px] md:h-[280px] 2xl:h-[330px] rounded-lg overflow-hidden z-0">
                    <img
                      src={category.image ? `${import.meta.env.VITE_API_URL}/${category.image}` : '/default-image.jpg'}
                      alt={category.name}
                      className="w-full h-full object-cover object-center transition-transform duration-300 transform rounded-xl z-0"
                      loading="lazy"
                    />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BannerSlider;
