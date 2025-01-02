import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sliderBanner1 from "../assets/sliderBanner/kataribhog.jpeg";
import sliderBanner2 from "../assets/sliderBanner/murgi.jpeg";
import sliderBanner3 from "../assets/sliderBanner/vagetables.jpeg";


const BannerSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const banners = [
    {
      id: 1,
      image: sliderBanner1,
    },
    {
      id: 2,
      image: sliderBanner2,
    },
    {
      id: 3,
      image: sliderBanner3,
    }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id}>
            <div className="relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[450px]">
              <img 
                src={banner.image} 
                alt={banner.title}
                className="w-full h-full object-cover object-center rounded-lg"
              />
              <div className="absolute inset-0 rounded-lg">
                <div className="flex flex-col justify-center h-full text-white text-center">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{banner.title}</h2>
                  <p className="text-base sm:text-lg md:text-xl">{banner.subtitle}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;
