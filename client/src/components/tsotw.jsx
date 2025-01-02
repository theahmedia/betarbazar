import React from 'react';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';

const formatPrice = (price) => {
  return `৳${price.toLocaleString('bn-BD', {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })}`;
};

const TopSellingProducts = () => {
  const products = [
    {
      id: 1,
      name: "Premium Chicken Breast",
      price: 450,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3",
      category: "Chicken",
      weight: "1kg pack"
    },
    {
      id: 2,
      name: "Fresh Mixed Vegetables",
      price: 180,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3",
      category: "Vegetables",
      weight: "500g pack"
    },
    {
      id: 3,
      name: "Premium Beef Steak", 
      price: 850,
      rating: 4.9,
      image: "https://images.pexels.com/photos/618775/pexels-photo-618775.jpeg",
      category: "Beef",
      weight: "500g pack"
    },
    {
      id: 4,
      name: "Jasmine Rice Premium",
      price: 320,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3",
      category: "Rice",
      weight: "5kg pack"
    },
  ];

  // Add these functions to handle button clicks
  const handleAddToCart = (productId) => {
    // Add to cart logic
    console.log('Added to cart:', productId);
  };

  const handleOrderNow = (productId) => {
    // Order now logic
    console.log('Ordering:', productId);
  };

  const handleViewMore = () => {
    // View more logic
    console.log('Viewing more products');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">Top Selling Products of the Week</h2>
        <button 
          onClick={handleViewMore}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-300"
        >
          View More 
          <BsArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden group">
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-white/90 px-2 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="mb-2">
                <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                <p className="text-gray-500 text-sm">{product.weight}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`w-4 h-4 ${
                      index < Math.floor(product.rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  ({product.rating})
                </span>
              </div>

              {/* Price with Taka Symbol */}
              <div className="mb-4">
                <span className="text-xl font-bold text-blue-600">
                  {formatPrice(product.price)}
                </span>
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button 
                  onClick={() => handleAddToCart(product.id)}
                  className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2 text-sm"
                >
                  <FaShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
                <button 
                  onClick={() => handleOrderNow(product.id)}
                  className="flex-1 border-2 border-blue-600 text-blue-600 py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors duration-300 flex items-center justify-center gap-2 text-sm"
                >
                  Order Now
                  <BsArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellingProducts;
