
import React, { useState } from 'react';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';

const formatPrice = (price) => {
  return `৳${price.toLocaleString('bn-BD', {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })}`;
};

const AllHotDeals = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // Track selected image for pop-up modal

  const products = [
    { id: 1, name: "Premium Chicken Breast", price: 450, rating: 4.8, image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3", category: "Chicken", weight: "1kg pack" },
    { id: 2, name: "Fresh Mixed Vegetables", price: 180, rating: 4.6, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3", category: "Vegetables", weight: "500g pack" },
    { id: 3, name: "Premium Beef Steak", price: 850, rating: 4.9, image: "https://images.pexels.com/photos/618775/pexels-photo-618775.jpeg", category: "Beef", weight: "500g pack" },
    { id: 4, name: "Jasmine Rice Premium", price: 320, rating: 4.7, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3", category: "Rice", weight: "5kg pack" },
  ];

  const handleImageClick = (image) => {
    setSelectedImage(image); // Set the selected image to show in the modal
  };

  const closeModal = () => {
    setSelectedImage(null); // Close the modal by resetting the selected image
  };

  return (
    <div className="container mt-28 mx-auto px-4 py-7">
      {/* Header Section */}
      <div className='flex justify-center items-center mb-8'>
        <h2 className='text-2xl md:text-3xl font-bold text-center'>Hot Deals</h2>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden relative cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                onClick={() => handleImageClick(product.image)} // Set selected image on click
              />
              <div className="absolute top-3 left-3">
                <span className="bg-white/90 px-2 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
              <p className="text-gray-500 text-sm">{product.weight}</p>

              {/* Rating */}
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} className={`w-4 h-4 ${index < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                ))}
                <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
              </div>

              {/* Price */}
              <div className="mb-2">
                <span className="text-xl font-bold text-custom-black">{formatPrice(product.price)}</span>
              </div>

              {/* Buttons */}
              <div>
                <button className="w-full mt-2 border-2 border-custom-orange bg-custom-orange text-white py-2 px-3 rounded-lg hover:bg-orange-50 hover:text-custom-orange transition-colors duration-100 ease-in flex items-center justify-center gap-2 text-sm">
                  Add to bag
                  <BsArrowRight className="w-4 h-4" />
                </button>
                <button className="w-full mt-2 border-2 border-green-600 bg-green-50 text-green-600 py-2 px-3 rounded-lg hover:bg-green-600 hover:text-white transition-colors duration-100 ease-in flex items-center justify-center gap-2 text-sm">
                  <FaShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      {/* <div className='text-center mt-8'>
        <button className="flex items-center gap-2 mx-auto bg-custom-orange hover:bg-orange-600 text-white px-6 py-2 rounded">
          বিস্তারিত দেখুন
        </button>
      </div> */}

      {/* Modal for Image Pop-up */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={closeModal}>
          <div className="relative">
            <img
              src={selectedImage}
              alt="Selected Product"
              className="max-w-full max-h-screen object-contain hover:scale-125 transition-transform duration-300 cursor-pointer"
            />
            <button
              className="absolute top-2 right-2 bg-white text-black rounded-full p-2 hover:bg-gray-200"
              onClick={closeModal}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllHotDeals;
