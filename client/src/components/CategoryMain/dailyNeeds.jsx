
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import { MdArrowBack } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";

const formatPrice = (price) => {
  return `৳${price.toLocaleString('bn-BD', {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })}`;
};

const AllHotDeals = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); 
  const [quantity, setQuantity] = useState(1);// Track selected image for pop-up modal

  const products = [
    { id: 1, name: "Premium Chicken Breast", description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus sint, dolor aliquid quos ducimus libero pariatur illum beatae labore debitis.", price: 450, rating: 4.8, image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3", category: "Chicken", weight: "1kg pack" },
    { id: 2, name: "Fresh Mixed Vegetables", description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus sint, dolor aliquid quos ducimus libero pariatur illum beatae labore debitis.", price: 180, rating: 4.6, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3", category: "Vegetables", weight: "500g pack" },
    { id: 3, name: "Premium Beef Steak", description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus sint, dolor aliquid quos ducimus libero pariatur illum beatae labore debitis.", price: 850, rating: 4.9, image: "https://images.pexels.com/photos/618775/pexels-photo-618775.jpeg", category: "Beef", weight: "500g pack" },
    { id: 4, name: "Jasmine Rice Premium", description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus sint, dolor aliquid quos ducimus libero pariatur illum beatae labore debitis.", price: 320, rating: 4.7, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3", category: "Rice", weight: "5kg pack" },
  ];

  const handleImageClick = (image) => {
    setSelectedImage(image); // Set the selected image to show in the modal
  };

  const closeModal = () => {
    setSelectedImage(null); // Close the modal by resetting the selected image
  };

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));
  };

  return (
    <div className="container mt-28 mx-auto px-4 py-7">
      {/* Header Section */}
      <div className='mb-8' style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link to="/category">
            <button className="bg-custom-orange flex gap-2 items-center text-white p-2 rounded-md shadow-md hover:shadow-lg hover:bg-orange-600 transition duration-300">
                    <MdArrowBack />
                    Back to category page
                </button>
            </Link>
      </div>

      <div className='flex justify-center items-center mb-8'>
        <h2 className='text-2xl md:text-3xl font-bold text-center text-custom-orange'>Baby & Child Care</h2>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-5 sm:gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white flex flex-col justify-between rounded-xl shadow-lg overflow-hidden relative cursor-pointer transition-all duration-300 group"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <div className=""
                  onClick={() => handleImageClick(product.image)} >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onClick={() => handleImageClick(product.image)} // Set selected image on click
                />
                <div className="absolute top-2 left-2">
                  <span className="bg-orange-100 text-custom-orange px-2 py-[2px] rounded-full text-xs font-medium">
                    {product.category}
                  </span>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="bg-green-100 text-green-600 px-2 py-[2px] rounded-full text-xs font-medium">
                    Details
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
              </div>
            </div>
            <div className="p-4 pt-0">

              {/* Buttons */}
              <div>
                <button className="w-full mt-2 border-2 border-custom-orange bg-custom-orange text-white py-2 sm:px-3 rounded-lg hover:bg-orange-50 hover:text-custom-orange transition-colors duration-100 ease-in flex items-center justify-center gap-1 sm:gap-2 text-sm">
                  Add to bag
                  <BsArrowRight className="w-4 h-4" />
                </button>
                <button className="w-full mt-2 border-2 border-green-600 bg-green-50 text-green-600 py-2 sm:px-3 rounded-lg hover:bg-green-600 hover:text-white transition-colors duration-100 ease-in flex items-center justify-center gap-1 sm:gap-2 text-sm">
                  <FaShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Modal for Image Pop-up */}
      {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center p-2 sm:p-6 z-50" onClick={() => setSelectedImage(null)}>
          <div className="relative bg-white sm:p-5 rounded-lg shadow-lg max-w-5xl max-h-[90vh] md:max-h-[540px] overflow-y-scroll no-scrollbar" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-2 right-2 z-40" onClick={() => setSelectedImage(null)}>
              <IoCloseCircleOutline className='text-2xl text-slate-900 hover:text-custom-orange ' />
            </button>
            <div className="grid md:grid-cols-2 items-center">
                <div className="overflow-hidden rounded-lg w-2/3 h-2/3 md:w-full mx-auto md:h-auto">
                    <img src={selectedImage} alt="Selected Product" className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-150" />
                </div>
                <div className="p-4">
                    <span className="text-green-600 bg-green-100 text-xs px-3 py-[2px] rounded-full">{products.find(product => product.image === selectedImage)?.category}</span>
                    <h3 className="text-xl text-slate-900 font-semibold my-1">{products.find(product => product.image === selectedImage)?.name}</h3>
                    <p className="text-gray-500 text-sm">{products.find(product => product.image === selectedImage)?.description}</p>
                    
                    
                    <div className="mt-2">
                        <span className="text-xl font-bold text-custom-orange">{formatPrice(products.find(product => product.image === selectedImage)?.price)}</span>
                    </div>
                    <div className="flex items-center mt-2">
                        {[...Array(5)].map((_, index) => (
                            <FaStar key={index} className={`w-4 h-4 ${index < Math.floor(products.find(product => product.image === selectedImage)?.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">({products.find(product => product.image === selectedImage)?.rating})</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">Sold Count: {products.find(product => product.image === selectedImage)?.soldCount || 0}</p>
                    <p className="text-gray-500 text-sm mt-2">SKU: {products.find(product => product.image === selectedImage)?.sku || 'N/A'}</p>
                    
                    <div className="">
                      <h6>Quantity</h6>
                      <div className="flex items-center mt-2">
                        <button className="border px-2 text-xl rounded-full hover:border-custom-orange hover:text-custom-orange" onClick={decreaseQuantity}>−</button>
                        <span className="mx-5">{quantity}</span>
                        <button className="border px-2 text-xl rounded-full hover:border-custom-orange hover:text-custom-orange" onClick={increaseQuantity}>+</button>
                      </div>
                    </div>

                    <div className='mt-4'>
                        <button className="w-full border-2 border-custom-orange bg-custom-orange text-white py-2 rounded-lg hover:bg-orange-50 hover:text-custom-orange transition-colors duration-100 ease-in flex items-center justify-center gap-1 text-sm">
                            Add to bag
                        </button>
                        <button className="w-full mt-2 border-2 border-green-600 bg-green-50 text-green-600 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors duration-100 ease-in flex items-center justify-center gap-1 text-sm">
                            <FaShoppingCart className="w-4 h-4" />
                            Add to Cart
                        </button>
                    </div>
                </div>

            </div>
          </div>
      </div>
      )}
    </div>
  );
};

export default AllHotDeals;
