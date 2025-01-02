// src/components/productCategory.jsx

import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import beef from "../assets/category/beef.png";
import chicken from "../assets/category/chicken.png";
import fish from "../assets/category/fish.png";
import mutton from "../assets/category/mutton.png";
import rice from "../assets/category/kataribhog.png";
import kettle from "../assets/category/kettle.png";
import musteredoil from "../assets/category/musteredoil.png";
import vagetables from "../assets/category/vagetables.png";
import wheatPowder from "../assets/category/wheatPowder.png";

const categories = [
  { id: 1, name: 'Beef', imageUrl: beef },
  { id: 2, name: 'Chicken', imageUrl: chicken },
  { id: 3, name: 'Fish', imageUrl: fish },
  { id: 4, name: 'Mutton', imageUrl: mutton },
  { id: 5, name: 'Rice', imageUrl: rice },
  { id: 6, name: 'Kitchen Applience', imageUrl: kettle },
  { id: 7, name: 'Edible Oil', imageUrl: musteredoil },
  { id: 8, name: 'Vagetables', imageUrl: vagetables },
  { id: 9, name: 'Flour', imageUrl: wheatPowder },
];

const CategorySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          return nextIndex;
        });
      }, 3000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAutoPlaying]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex - 1);
  };

  const getTransformX = () => {
    const normalizedIndex = currentIndex % categories.length;
    return `translateX(-${normalizedIndex * 220}px)`;
  };

  return (
    <div className="max-w-screen-2xl mx-auto my-2">
      <div className="relative overflow-hidden">
        <div className="flex">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: getTransformX(),
            }}
          >
            {[...categories, ...categories, ...categories].map((category, index) => (
              <div
                key={`${category.id}-${index}`}
                className="flex-shrink-0 mx-2 rounded-lg flex flex-col items-center justify-center"
              >
                <img 
                  src={category.imageUrl} 
                  alt={category.name} 
                  className="w-32 h-32 rounded-full object-cover shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                />
                <h3 className="text-center mt-1 text-md font-light">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
          <button
            onClick={handlePrev}
            className="bg-white rounded-full p-1 shadow-lg hover:bg-gray-100"
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
          <button
            onClick={handleNext}
            className="bg-white rounded-full p-1 shadow-lg hover:bg-gray-100"
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;
