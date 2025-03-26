import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

const Review = () => {
  const { t, i18n } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Function to get number of visible cards based on screen width
  const getVisibleCards = () => {
    if (typeof window !== 'undefined') {
      // if (window.innerWidth >= 1280) return 5; // xl
      if (window.innerWidth >= 1024) return 3; // lg
      if (window.innerWidth >= 768) return 2;  // md
      return 1; // mobile
    }
    return 5; // default for SSR
  };

  const nextSlide = () => {
    const visibleCards = getVisibleCards();
    setCurrentSlide((prev) => 
      prev >= reviews.length - visibleCards ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    const visibleCards = getVisibleCards();
    setCurrentSlide((prev) => 
      prev === 0 ? reviews.length - visibleCards : prev - 1
    );
  };

  // Update autoplay to use visibleCards
  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        const visibleCards = getVisibleCards();
        setCurrentSlide((prev) => 
          prev >= reviews.length - visibleCards ? 0 : prev + 1
        );
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [isPaused]);

  // Add resize listener
  useEffect(() => {
    const handleResize = () => {
      const visibleCards = getVisibleCards();
      if (currentSlide > reviews.length - visibleCards) {
        setCurrentSlide(0);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentSlide]);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setTouchEnd(null);
    setTouchStart(null);
  };

  const reviews = [
    {
      name: "clientName",
      // avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      occupation: "occupation",
      location: "location",
      rating: 5,
      reviewText: "reviewText"
    },
    {
      name: "clientName",
      // avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      occupation: "occupation",
      location: "location",
      rating: 4,
      reviewText: "reviewText"
    },
    {
      name: "clientName",
      // avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      occupation: "occupation",
      location: "location",
      rating: 5,
      reviewText: "reviewText"
    },
    {
      name: "clientName",
      // avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      occupation: "occupation",
      location: "location",
      rating: 5,
      reviewText: "reviewText"
    },
    {
      name: "clientName",
      // avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      occupation: "occupation",
      location: "location",
      rating: 4,
      reviewText: "reviewText"
    },
    {
      name: "clientName",
      // avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      occupation: "occupation",
      location: "location",
      rating: 5,
      reviewText: "reviewText"
    },
    {
      name: "clientName",
      // avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      occupation: "occupation",
      location: "location",
      rating: 5,
      reviewText: "reviewText"
    }
  ];

  return (
    <div 
      className="container mx-auto px-4 py-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <h1 className="text-3xl font-bold text-center mb-12">{t('ClientReviews')}</h1>
      
      <div className="relative">
        <div className="flex items-center justify-center mb-4">
          <button 
            onClick={prevSlide}
            className="absolute -left-4 z-0 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-300"
          >
            <BsChevronLeft size={24} />
          </button>

          <div 
            className="w-full overflow-hidden mx-8"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentSlide * (100 / getVisibleCards())}%)` 
              }}
            >
              {reviews.map((review, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 w-full px-2 md:w-1/2 lg:w-1/3 xl:w-1/5"
                  style={{ 
                    flex: `0 0 ${100 / getVisibleCards()}%`
                  }}
                >
                  <div className="bg-white rounded-lg shadow-lg p-6 h-full mx-2">
                    <div className="flex flex-col items-center">
                      <img 
                        src={review.avatar} 
                        alt={review.name}
                        className="w-20 h-20 md:w-16 md:h-16 rounded-full object-cover mb-4"
                      />
                      
                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, index) => (
                          <FaStar
                            key={index}
                            size={16}
                            className={`${
                              index < review.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>

                      <p className="text-gray-600 text-center mb-4 text-base md:text-sm review-text">
                        "{t(review.reviewText)}"
                      </p>

                      <h3 className="font-semibold text-lg md:text-base mb-1">{t(review.name)}</h3>
                      <p className="text-gray-600 text-base md:text-sm mb-1">{t(review.occupation)}</p>
                      <p className="text-gray-500 text-base md:text-sm">{t(review.location)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={nextSlide}
            className="absolute -right-4 z-0 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-300"
          >
            <BsChevronRight size={24} />
          </button>
        </div>
        {/* Pagination */}
        {/* <div className="flex justify-center mt-8 gap-2">
          {reviews.slice(0, reviews.length - (getVisibleCards() - 1)).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                currentSlide === index ? 'bg-custom-orange' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Review;
