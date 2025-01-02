import React, { useState, useEffect } from 'react';
import { FiFilter } from 'react-icons/fi';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm"
        >
          <FiFilter />
          <span>Filters</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden'} lg:block`}>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-3 py-2 rounded-md ${
                  selectedCategory === 'all'
                    ? 'bg-custom-orange text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                All Products
              </button>
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => setSelectedCategory(category._id)}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    selectedCategory === category._id
                      ? 'bg-custom-orange text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 rounded-lg h-48"></div>
                  <div className="mt-4 h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-custom-orange font-bold">
                        ৳{product.price}
                      </span>
                      <button className="bg-custom-orange text-white px-4 py-2 rounded-md hover:bg-custom-orange-dark transition-colors duration-300">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg text-gray-600">No products found</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products; 