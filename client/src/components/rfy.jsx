import React, { useState } from 'react';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';

const Rfy = () => {
  const [activeTab, setActiveTab] = useState('bestSeller');

  const products = {
    bestSeller: [
      {
        id: 'bs1',
        name: "Sony WH-1000XM4 Wireless Headphones",
        price: 35999,
        rating: 4.8,
        image: "/images/headphones-sony.jpg",
        discount: "20%",
      },
      {
        id: 'bs2',
        name: "Apple Watch Series 7",
        price: 42999,
        rating: 4.9,
        image: "/images/watch-apple.jpg",
        discount: "15%",
      },
      {
        id: 'bs3',
        name: "Best Seller Products",
        price: 999.99,
        rating: 4.9,
        image: "/images/macbook-air.jpg",
        discount: "10%",
      },
      {
        id: 'bs4',
        name: "Best Seller Products",
        price: 1199.99,
        rating: 4.7,
        image: "/images/samsung-s22.jpg",
        discount: "25%",
      },
      {
        id: 'bs5',
        name: "Best Seller Products",
        price: 1099.99,
        rating: 4.8,
        image: "/images/ipad-pro.jpg",
        discount: "12%",
      },
      {
        id: 'bs6',
        name: "Best Seller Products",
        price: 349.99,
        rating: 4.7,
        image: "/images/switch-oled.jpg",
        discount: "15%",
      },
      {
        id: 'bs7',
        name: "Best Seller Products",
        price: 1999.99,
        rating: 4.9,
        image: "/images/lg-c1.jpg",
        discount: "30%",
      },
      {
        id: 'bs8',
        name: "Best Seller Products",
        price: 279.99,
        rating: 4.6,
        image: "/images/bose-earbuds.jpg",
        discount: "20%",
      },
      {
        id: 'bs9',
        name: "Best Seller Products",
        price: 399.99,
        rating: 4.8,
        image: "/images/ps5-digital.jpg",
        discount: "10%",
      },
      {
        id: 'bs10',
        name: "Best Seller Products",
        price: 1299.99,
        rating: 4.7,
        image: "/images/dell-xps.jpg",
        discount: "18%",
      },
      {
        id: 'bs11',
        name: "Best Seller Products",
        price: 1099.99,
        rating: 4.9,
        image: "/images/iphone-14.jpg",
        discount: "15%",
      },
      {
        id: 'bs12',
        name: "Best Seller Products",
        price: 999.99,
        rating: 4.6,
        image: "/images/surface-pro.jpg",
        discount: "22%",
      },
    ],
    newArrival: [
      {
        id: 'na1',
        name: "Google Pixel 7 Pro",
        price: 89999,
        rating: 4.7,
        image: "/images/pixel-7.jpg",
        isNew: true,
      },
      {
        id: 'na2',
        name: "New Arrival Products",
        price: 1899.99,
        rating: 4.8,
        image: "/images/galaxy-book.jpg",
        isNew: true,
      },
      {
        id: 'na3',
        name: "New Arrival Products",
        price: 249.99,
        rating: 4.8,
        image: "/images/airpods-pro.jpg",
        isNew: true,
      },
      {
        id: 'na4',
        name: "New Arrival Products",
        price: 999.99,
        rating: 4.6,
        image: "/images/quest-pro.jpg",
        isNew: true,
      },
      {
        id: 'na5',
        name: "New Arrival Products",
        price: 1699.99,
        rating: 4.7,
        image: "/images/rog-zephyrus.jpg",
        isNew: true,
      },
      {
        id: 'na6',
        name: "New Arrival Products",
        price: 1799.99,
        rating: 4.6,
        image: "/images/fold-4.jpg",
        isNew: true,
      },
      {
        id: 'na7',
        name: "New Arrival Products",
        price: 599.99,
        rating: 4.8,
        image: "/images/mac-mini.jpg",
        isNew: true,
      },
      {
        id: 'na8',
        name: "New Arrival Products",
        price: 279.99,
        rating: 4.7,
        image: "/images/sony-earbuds.jpg",
        isNew: true,
      },
      {
        id: 'na9',
        name: "New Arrival Products",
        price: 1499.99,
        rating: 4.8,
        image: "/images/proart-display.jpg",
        isNew: true,
      },
      {
        id: 'na10',
        name: "New Arrival Products",
        price: 649.99,
        rating: 4.7,
        image: "/images/steam-deck.jpg",
        isNew: true,
      },
      {
        id: 'na11',
        name: "New Arrival Products",
        price: 759.99,
        rating: 4.8,
        image: "/images/dji-mini.jpg",
        isNew: true,
      },
      {
        id: 'na12',
        name: "New Arrival Products",
        price: 499.99,
        rating: 4.7,
        image: "/images/gopro-11.jpg",
        isNew: true,
      },
    ],
    topRated: [
      {
        id: 'tr1',
        name: "Top Rated Products",
        price: 2499.99,
        rating: 4.9,
        image: "/images/sony-a7.jpg",
      },
      {
        id: 'tr2',
        name: "Top Rated Products",
        price: 4999.99,
        rating: 4.9,
        image: "/images/lg-g2.jpg",
      },
      {
        id: 'tr3',
        name: "Top Rated Products",
        price: 3999.99,
        rating: 4.9,
        image: "/images/mac-studio.jpg",
      },
      {
        id: 'tr4',
        name: "Top Rated Products",
        price: 2499.99,
        rating: 4.8,
        image: "/images/kef-ls50.jpg",
      },
      {
        id: 'tr5',
        name: "Top Rated Products",
        price: 3899.99,
        rating: 4.8,
        image: "/images/canon-r5.jpg",
      },
      {
        id: 'tr6',
        name: "Top Rated Products",
        price: 3499.99,
        rating: 4.9,
        image: "/images/macbook-pro.jpg",
      },
      {
        id: 'tr7',
        name: "Top Rated Products",
        price: 5999.99,
        rating: 4.8,
        image: "/images/samsung-neo.jpg",
      },
      {
        id: 'tr8',
        name: "Top Rated Products",
        price: 3299.99,
        rating: 4.8,
        image: "/images/devialet.jpg",
      },
      {
        id: 'tr9',
        name: "Top Rated Products",
        price: 4999.99,
        rating: 4.8,
        image: "/images/pro-display.jpg",
      },
      {
        id: 'tr10',
        name: "Top Rated Products",
        price: 8999.99,
        rating: 4.9,
        image: "/images/hasselblad.jpg",
      },
      {
        id: 'tr11',
        name: "Top Rated Products",
        price: 16999.99,
        rating: 4.9,
        image: "/images/dji-inspire.jpg",
      },
      {
        id: 'tr12',
        name: "Top Rated Products",
        price: 39999.99,
        rating: 4.9,
        image: "/images/red-raptor.jpg",
      },
    ],
    featured: [
      {
        id: 'f1',
        name: "featured products",
        price: 999.99,
        rating: 4.8,
        image: "/images/iphone-14-pro.jpg",
        featured: true,
      },
      {
        id: 'f2',
        name: "featured products",
        price: 1199.99,
        rating: 4.7,
        image: "/images/s23-ultra.jpg",
        featured: true,
      },
      {
        id: 'f3',
        name: "featured products",
        price: 1299.99,
        rating: 4.8,
        image: "/images/macbook-m2.jpg",
        featured: true,
      },
      {
        id: 'f4',
        name: "featured products",
        price: 599.99,
        rating: 4.7,
        image: "/images/ipad-air.jpg",
        featured: true,
      },
      {
        id: 'f5',
        name: "featured products",
        price: 3499.99,
        rating: 4.8,
        image: "/images/sony-a7s.jpg",
        featured: true,
      },
      {
        id: 'f6',
        name: "featured products",
        price: 499.99,
        rating: 4.7,
        image: "/images/xbox-x.jpg",
        featured: true,
      },
      {
        id: 'f7',
        name: "featured products",
        price: 2299.99,
        rating: 4.8,
        image: "/images/mavic-3.jpg",
        featured: true,
      },
      {
        id: 'f8',
        name: "featured products",
        price: 1599.99,
        rating: 4.7,
        image: "/images/studio-display.jpg",
        featured: true,
      },
      {
        id: 'f9',
        name: "featured products",
        price: 1299.99,
        rating: 4.6,
        image: "/images/odyssey-g9.jpg",
        featured: true,
      },
      {
        id: 'f10',
        name: "featured products",
        price: 899.99,
        rating: 4.7,
        image: "/images/sonos-arc.jpg",
        featured: true,
      },
      {
        id: 'f11',
        name: "featured products",
        price: 549.99,
        rating: 4.6,
        image: "/images/airpods-max.jpg",
        featured: true,
      },
      {
        id: 'f12',
        name: "featured products",
        price: 1599.99,
        rating: 4.7,
        image: "/images/studio-display.jpg",
        featured: true,
      },
    ],
  };

  const tabs = [
    { id: 'bestSeller', label: 'Best Seller' },
    { id: 'newArrival', label: 'New Arrival' },
    { id: 'topRated', label: 'Top Rated' },
    { id: 'featured', label: 'Featured' },
  ];

  // Price formatter function for Taka
  const formatPrice = (price) => {
    return `৳${price.toLocaleString('bn-BD')}`;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Recommended For You</h2>
      
      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300
              ${activeTab === tab.id 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products[activeTab].map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden group">
            {/* Product Image */}
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              {product.discount && (
                <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                  {product.discount} OFF
                </span>
              )}
              {product.isNew && (
                <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-md text-sm">
                  NEW
                </span>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 truncate">{product.name}</h3>
              
              {/* Rating */}
              <div className="flex items-center mb-2">
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
                <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-blue-600">
                  {formatPrice(product.price)}
                </span>
                {product.discount && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(Math.round(product.price * 1.2))}
                  </span>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2">
                  <FaShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
                <button className="flex-1 border border-blue-600 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-50 transition-colors duration-300 flex items-center justify-center gap-2">
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

export default Rfy;
